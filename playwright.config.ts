import { defineConfig, devices } from '@playwright/test'

const previewPort = Number.parseInt(process.env.SEC_PREVIEW_PORT ?? '4174', 10)
if (!Number.isInteger(previewPort) || previewPort < 1 || previewPort > 65535) {
  throw new Error(`Invalid SEC preview port: ${process.env.SEC_PREVIEW_PORT ?? ''}`)
}
const previewOrigin = `http://127.0.0.1:${previewPort}`

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: previewOrigin,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: `npm run build && npm run preview:serve -- --port ${previewPort}`,
    url: `${previewOrigin}/en`,
    reuseExistingServer: false,
    timeout: 120_000,
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 5'], viewport: { width: 390, height: 844 } } },
  ],
})
