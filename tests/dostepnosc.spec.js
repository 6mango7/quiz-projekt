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

async function sprawdzTabulacje(page, pola) {
    for (const pole of pola) {
        await page.keyboard.press('Tab');
        await expect(pole).toBeFocused();
        await expect(pole.and(page.locator(':focus-visible'))).toBeInViewport();

        const { width, height } = await pole.boundingBox();
        expect(width).toBeGreaterThanOrEqual(24);
        expect(height).toBeGreaterThanOrEqual(24);
    }
}

const widoki = [
    { motyw: 'light', nazwa: 'jasny', viewport: { width: 1440, height: 900 } },
    { motyw: 'dark', nazwa: 'ciemny', viewport: { width: 390, height: 844 } },
];

for (const { motyw, nazwa, viewport } of widoki) {
    test.describe(`motyw ${nazwa}, szerokość ${viewport.width} px`, () => {
        test.use({ viewport });

        test.beforeEach(async ({ page }) => {
            await page.addInitScript(wybranyMotyw => localStorage.setItem('theme', wybranyMotyw), motyw);
        });

        test('strona główna, konto i kontakt', async ({ page }) => {
            await page.goto('/');
            await expect(page.locator('html')).toHaveClass(motyw === 'dark' ? 'dark' : '');
            const logo = page.getByRole('banner').getByRole('link', { name: /quizownia/ });
            await sprawdzTabulacje(page, [logo]);
            await sprawdzDostepnosc(page, 'Strona główna');

            await page.goto('/login.php');
            await page.getByLabel('login albo e-mail').focus();
            await sprawdzTabulacje(page, [
                page.getByLabel('hasło', { exact: true }),
                page.getByRole('button', { name: 'zaloguj', exact: true }),
            ]);
            await sprawdzDostepnosc(page, 'Formularze konta');

            await page.goto('/contact.php');
            await expect(page.getByRole('heading', { name: 'napisz do nas' })).toBeVisible();
            await sprawdzDostepnosc(page, 'Kontakt');
        });

        test('katalog quizów ma opisane filtry dostępne z klawiatury', async ({ page }) => {
            await page.goto('/quizzes.php');
            await expect(page.getByRole('heading', { name: 'wszystkie quizy' })).toBeVisible();
            await sprawdzDostepnosc(page, 'Katalog quizów');

            await page.getByRole('banner').getByRole('link', { name: 'zaloguj się' }).focus();
            const main = page.getByRole('main');
            await sprawdzTabulacje(page, [
                main.getByLabel('szukaj quizu', { exact: true }),
                main.getByRole('combobox', { name: 'kategoria', exact: true }),
                main.getByRole('combobox', { name: 'sortowanie', exact: true }),
                main.getByRole('button', { name: 'szukaj', exact: true }),
            ]);
        });

        test('edytor ma opisaną nową opcję i można dojść do niej tabulatorem', async ({ page }) => {
            await page.goto('/editor.php');
            await expect(page.getByRole('heading', { name: 'nowy quiz' })).toBeVisible();
            await sprawdzDostepnosc(page, 'Edytor quizu');

            await page.getByRole('combobox', { name: 'kategoria', exact: true }).focus();
            await sprawdzTabulacje(page, [
                page.getByLabel('nazwa nowej opcji', { exact: true }),
                page.getByRole('button', { name: '+ dodaj', exact: true }),
                page.getByRole('button', { name: 'opublikuj', exact: true }),
            ]);
        });

        test('strona o autorach i strona 404 przechodzą audyt axe', async ({ page }) => {
            await page.goto('/authors.php');
            await expect(page.getByRole('heading', { level: 1, name: 'Kto stoi za quizownią?' })).toBeVisible();
            await sprawdzDostepnosc(page, 'O autorach');

            const response = await page.goto('/nieistniejaca/sciezka');
            expect(response?.status()).toBe(404);
            await expect(page.getByRole('heading', { name: '404', exact: true })).toBeVisible();
            await sprawdzDostepnosc(page, 'Strona 404');
        });
    });
}
