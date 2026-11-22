const { test, expect } = require('@playwright/test');

test('gracz otwiera katalog quizów i wysyła formularz filtrów', async ({ page }) => {
    await page.goto('/');
    const graj = page.getByRole('main').getByRole('link', { name: 'graj', exact: true });
    await graj.press('Enter');

    await expect(page).toHaveURL(/\/quizzes\.php$/);
    await expect(page.getByRole('heading', { name: 'wszystkie quizy' })).toBeVisible();

    const formularz = page.locator('#filters');
    const wyszukiwarka = formularz.getByRole('textbox');
    const fraza = 'Najlepsze jedzenie świata';
    await formularz.locator('select[name="sort"]').selectOption('new');
    await wyszukiwarka.fill(fraza);
    await wyszukiwarka.press('Enter');

    await expect(page).toHaveURL(url =>
        url.pathname === '/quizzes.php' &&
        url.searchParams.get('search') === fraza &&
        url.searchParams.get('sort') === 'new',
    );
    await expect(page.getByRole('heading', { name: 'wszystkie quizy' })).toBeVisible();
});
