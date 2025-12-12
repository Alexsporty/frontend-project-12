// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5002', // твой Vite сервер
    trace: 'on-first-retry', // сбор трасс для падений тестов
    screenshot: 'only-on-failure', // делать скриншоты только при падении
    video: 'retain-on-failure', // записывать видео при падении
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  /* Поднять локальный сервер перед тестами */
  webServer: {
    command: 'npm run dev', // команда для запуска Vite
    url: 'http://localhost:5002', // URL проекта
    reuseExistingServer: !process.env.CI,
  },
});
