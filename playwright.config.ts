import { defineConfig, devices } from '@playwright/test';

const port = process.env.EXPO_WEB_PORT || '8082';
const apiBaseURL = process.env.EXPO_PUBLIC_API_URL || 'http://127.0.0.1:8000';
const baseURL = process.env.PLAYWRIGHT_BASE_URL || `http://127.0.0.1:${port}`;

process.env.EXPO_PUBLIC_API_URL = apiBaseURL;

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  webServer: {
    command: `EXPO_PUBLIC_API_URL=${JSON.stringify(apiBaseURL)} npm run web -- --port ${port}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
});
