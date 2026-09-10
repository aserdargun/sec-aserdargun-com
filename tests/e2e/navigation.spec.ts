import { expect, test } from '@playwright/test'

test('section navigation announces the new page and leaves query controls focused', async ({ page }) => {
  await page.goto('/en/methodology')
  await expect(page).toHaveTitle('Methodology | SEC - AI Systems Security')
  await page.getByRole('link', { name: 'Trust path', exact: true }).click()
  await expect(page.getByRole('main')).toBeFocused()
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
  const authorization = page.getByRole('button', { name: /^05 Authorization/ })
  await authorization.focus()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/node=authorization/)
  await expect(authorization).toBeFocused()
  await expect(page).toHaveTitle('Trust path | SEC - AI Systems Security')
})

test('skip link moves keyboard focus into the main content', async ({ page }) => {
  await page.goto('/tr/controls')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'İçeriğe geç' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('main')).toBeFocused()
})

test('unsupported locale has recovery navigation and an English document', async ({ page }) => {
  await page.goto('/fr/controls')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.getByRole('main')).toContainText('Page not found')
  await expect(page).toHaveTitle('Page not found | SEC - AI Systems Security')
  await page.getByRole('link', { name: 'Return to Security Brief' }).click()
  await expect(page).toHaveURL(/\/en$/)
})

test('control links focus the selected detail even when the fragment stays the same', async ({ page }) => {
  await page.goto('/en/controls?control=first-class-agent-identity#control-detail')
  await expect(page.locator('#control-detail')).toBeFocused()
  await page.getByRole('link', { name: 'Short-lived credentials', exact: true }).filter({ visible: true }).click()
  await expect(page).toHaveURL(/control=short-lived-credentials#control-detail$/)
  await expect(page.locator('#control-detail')).toBeFocused()
  await expect(page.locator('#control-detail h2')).toHaveText('Short-lived credentials')
})
