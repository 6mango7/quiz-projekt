const { default: AxeBuilder } = require('@axe-core/playwright');
const { test, expect } = require('@playwright/test');

const standardy = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

async function sprawdzDostepnosc(page, nazwa) {
    const { violations, incomplete } = await new AxeBuilder({ page }).withTags(standardy).analyze();
    await test.info().attach(nazwa, {
        body: JSON.stringify({ violations, incomplete }, null, 2),
        contentType: 'application/json',
    });

    const blokujace = violations
        .filter(({ impact }) => impact === 'critical' || impact === 'serious')
        .map(({ id, impact, nodes }) => ({ id, impact, elementy: nodes.map(node => node.target) }));
    expect.soft(blokujace, nazwa).toEqual([]);
}

const widoki = [
    { motyw: 'light', nazwa: 'jasny', viewport: { width: 1440, height: 900 } },
    { motyw: 'dark', nazwa: 'ciemny', viewport: { width: 390, height: 844 } },
];

for (const { motyw, nazwa, viewport } of widoki) {
    test(`axe i klawiatura: motyw ${nazwa}, szerokość ${viewport.width} px`, async ({ page }) => {
        await page.setViewportSize(viewport);
        await page.addInitScript(wybranyMotyw => localStorage.setItem('theme', wybranyMotyw), motyw);

        await page.goto('/');
        await expect(page.locator('html')).toHaveClass(motyw === 'dark' ? 'dark' : '');
        await page.keyboard.press('Tab');
        const logo = page.getByRole('banner').getByRole('link', { name: /quizownia/ });
        await expect(logo).toBeFocused();
        await expect(logo.and(page.locator(':focus-visible'))).toBeInViewport();
        await sprawdzDostepnosc(page, 'Strona główna');

        await page.goto('/login.php');
        const login = page.getByLabel('login albo e-mail');
        const haslo = page.getByLabel('hasło', { exact: true });
        const zaloguj = page.getByRole('button', { name: 'zaloguj', exact: true });
        await login.focus();
        await page.keyboard.press('Tab');
        await expect(haslo).toBeFocused();
        await page.keyboard.press('Tab');
        await expect(zaloguj).toBeFocused();
        await expect(zaloguj.and(page.locator(':focus-visible'))).toBeInViewport();
        await sprawdzDostepnosc(page, 'Formularze konta');

        await page.goto('/contact.php');
        await expect(page.getByRole('heading', { name: 'napisz do nas' })).toBeVisible();
        await sprawdzDostepnosc(page, 'Kontakt');
    });
}
