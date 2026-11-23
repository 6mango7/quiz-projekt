const { test, expect } = require('@playwright/test');

test('motyw przełączony klawiaturą pozostaje aktywny po nawigacji i odświeżeniu', async ({ page }) => {
    await page.goto('/');
    const tloStrony = page.locator('body');
    const naglowek = page.getByRole('banner');
    const przelacznik = naglowek.getByRole('button', { name: 'motyw', exact: true });
    const jasneTlo = 'rgb(251, 242, 226)';
    const ciemneTlo = 'rgb(22, 22, 47)';

    await expect(tloStrony).toHaveCSS('background-color', jasneTlo);
    await przelacznik.press('Space');
    await expect(tloStrony).toHaveCSS('background-color', ciemneTlo);

    await naglowek.getByRole('link', { name: 'kontakt', exact: true }).press('Enter');
    await expect(page.getByRole('heading', { name: 'napisz do nas' })).toBeVisible();
    await expect(tloStrony).toHaveCSS('background-color', ciemneTlo);
    await page.reload();
    await expect(tloStrony).toHaveCSS('background-color', ciemneTlo);

    await przelacznik.press('Space');
    await expect(tloStrony).toHaveCSS('background-color', jasneTlo);
    await page.reload();
    await expect(tloStrony).toHaveCSS('background-color', jasneTlo);
});

test('strona 404 pozwala wrócić na stronę główną klawiaturą', async ({ page }) => {
    const response = await page.goto('/nieistniejaca/sciezka');
    expect(response?.status()).toBe(404);

    const main = page.getByRole('main');
    await expect(main.getByRole('heading', { name: '404', exact: true })).toBeVisible();
    await main.getByRole('link', { name: 'wróć na start' }).press('Enter');

    await expect(page).toHaveURL(/\/index\.php$/);
    await expect(main.getByRole('heading', { name: 'Wybieraj, aż zostanie jeden.' })).toBeVisible();
});
