const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: '.',
    workers: 1,
    forbidOnly: Boolean(process.env.CI),
    timeout: 45_000,
    reporter: [['list'], ['html', { open: 'never' }]],
    use: {
        baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:8080',
        browserName: 'chromium',
        viewport: { width: 1440, height: 900 },
        reducedMotion: 'reduce',
        trace: 'retain-on-failure',
    },
});
