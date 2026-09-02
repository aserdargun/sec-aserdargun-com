import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

for (const route of ['/en', '/en/trust-path?node=authorization', '/tr/controls', '/en/scenarios?scenario=remote-mcp']) {
  test(`${route} has no serious axe violations`, async ({ page }) => {
    await page.goto(route)
    const results = await new AxeBuilder({ page }).analyze()
    expect(results.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([])
  })
}

test('Trust Path remains operable at 200% zoom', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('/en/trust-path')
  await page.evaluate(() => { document.documentElement.style.zoom = '2' })
  await page.getByRole('button', { name: /^01 Model/i }).focus()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('button', { name: /^02 Agent/i })).toBeFocused()
  expect(await page.evaluate(() => document.documentElement.scrollWidth === document.documentElement.clientWidth)).toBe(true)
})
