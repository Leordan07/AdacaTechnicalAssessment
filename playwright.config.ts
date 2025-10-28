import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/playwright', // where your Playwright tests live
  use: {
    headless: true,
    baseURL: 'https://www.saucedemo.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
});
