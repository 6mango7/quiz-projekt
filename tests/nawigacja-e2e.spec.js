const { test, expect } = require('@playwright/test');

test('motyw przełączony klawiaturą pozostaje aktywny po nawigacji i odświeżeniu', async ({ page }) => {
    await page.goto('/');
    const dokument = page.locator('html');
    const naglowek = page.getByRole('banner');
    const przelacznik = naglowek.getByRole('button', { name: 'motyw' });
    const ciemnyMotyw = /\bdark\b/;

    await expect(dokument).not.toHaveClass(ciemnyMotyw);
    await przelacznik.press('Space');
    await expect(dokument).toHaveClass(ciemnyMotyw);

    await naglowek.getByRole('link', { name: 'kontakt', exact: true }).press('Enter');
    await expect(page.getByRole('heading', { name: 'napisz do nas' })).toBeVisible();
    await expect(dokument).toHaveClass(ciemnyMotyw);
    await page.reload();
    await expect(dokument).toHaveClass(ciemnyMotyw);

    await przelacznik.press('Space');
    await expect(dokument).not.toHaveClass(ciemnyMotyw);
    await page.reload();
    await expect(dokument).not.toHaveClass(ciemnyMotyw);
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
