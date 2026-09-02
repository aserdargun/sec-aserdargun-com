import { expect, test } from '@playwright/test'

test('Security Brief opens the selected trust boundary', async ({ page }) => {
  const errors: string[] = []
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()) })
  await page.goto('/en')
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Identity is becoming|Kimlik/)
  await page.getByRole('link', { name: 'Inspect the trust path' }).click()
  await page.getByRole('button', { name: /^05 Authorization/i }).click()
  await expect(page).toHaveURL(/\/en\/trust-path\?node=authorization$/)
  await expect(page.getByRole('heading', { name: 'Authorization' })).toBeVisible()
  expect(errors).toEqual([])
})

test('mobile Trust Path has no page overflow and full-size targets', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/en/trust-path')
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth === document.documentElement.clientWidth)).toBe(true)
  const buttons = await page.locator('.trust-path button').all()
  expect(buttons).toHaveLength(11)
  for (const button of buttons) expect((await button.boundingBox())?.height).toBeGreaterThanOrEqual(44)
})

test('Turkish controls use the mobile record view without losing fields', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium', 'mobile-only assertion')
  await page.goto('/tr/controls?assurance=proven')
  await expect(page.locator('.mobile-control-records')).toBeVisible()
  await expect(page.locator('.control-matrix')).toBeHidden()
  await expect(page.locator('.mobile-control-records').getByRole('heading', { name: 'Açık araç izin listesi' })).toBeVisible()
  await expect(page.locator('.mobile-control-records').getByText('Kanıtlandı').first()).toBeVisible()
})
