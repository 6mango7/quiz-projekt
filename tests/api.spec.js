const { test, expect } = require('@playwright/test');

test('API przez frontend widzi bazę z przykładowymi quizami', async ({ request }) => {
    const response = await request.get('/api/');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const dane = await response.json();
    expect(dane.database).toBe('connected');
    expect(Number.isInteger(dane.quizzes)).toBe(true);
    expect(dane.quizzes).toBeGreaterThanOrEqual(25);
});
