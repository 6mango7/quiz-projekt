const { test, expect } = require('@playwright/test');

test('gracz na telefonie otwiera katalog quizów i wysyła formularz filtrów', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    const graj = page.getByRole('main').getByRole('link', { name: 'graj', exact: true });
    await graj.press('Enter');

    await expect(page).toHaveURL(/\/quizzes\.php$/);
    await expect(page.getByRole('heading', { name: 'wszystkie quizy' })).toBeVisible();

    const formularz = page.locator('#filters');
    const wyszukiwarka = formularz.getByRole('textbox');
    const fraza = 'Najlepsze jedzenie świata';
    await expect(formularz).toHaveCSS('display', 'grid');
    await expect(formularz).toHaveCSS('grid-template-columns', /^\S+px \S+px$/);
    await expect(formularz.getByRole('button', { name: 'szukaj', exact: true })).toBeVisible();
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
