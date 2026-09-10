import { expect, test } from '@playwright/test'

for (const locale of ['en', 'tr']) {
  test(`${locale} control records preserve context and evidence across language changes`, async ({ page }, testInfo) => {
    await page.goto(`/${locale}/controls?node=audit`)
    const list = page.locator(testInfo.project.name === 'mobile-chromium' ? '.mobile-control-records' : '.control-matrix')
    await list.getByRole('link', { name: locale === 'en' ? 'First-class agent identity' : 'Birinci sınıf ajan kimliği', exact: true }).click()
    const detail = page.locator('#control-detail')
    await expect(detail).toBeVisible()
    await expect(detail).toBeFocused()
    await expect(page).toHaveURL(/node=audit&control=first-class-agent-identity#control-detail$/)
    await detail.locator('summary').click()
    await expect(detail.locator('.record-sources a').first()).toBeVisible()
    await expect(detail.locator('.record-sources a').first()).toHaveAttribute('href', /^https:\/\//)
    await page.getByRole('link', { name: locale === 'en' ? 'TR' : 'EN', exact: true }).click()
    await expect(page).toHaveURL(new RegExp(`/${locale === 'en' ? 'tr' : 'en'}/controls\\?node=audit&control=first-class-agent-identity#control-detail$`))
    await expect(detail.getByRole('heading', { level: 2 })).toHaveText(locale === 'en' ? 'Birinci sınıf ajan kimliği' : 'First-class agent identity')
  })
}

test('threat families are visible, validated, stable, and recoverable', async ({ page }) => {
  await page.goto('/en/threats?family=invalid&node=invalid')
  await expect(page.getByRole('status')).toHaveText('10 / 10 threat families')
  await expect(page.getByRole('combobox', { name: 'Threat family', exact: true })).toHaveValue('')
  await page.getByRole('combobox', { name: 'Threat family', exact: true }).selectOption('identity-credential-abuse')
  await expect(page.getByRole('status')).toHaveText('1 / 10 threat families')
  await expect(page.locator('.threat-number')).toHaveText('T02')
  await page.getByRole('link', { name: 'TR', exact: true }).click()
  await expect(page.getByRole('combobox', { name: 'Tehdit ailesi', exact: true })).toHaveValue('identity-credential-abuse')
  await expect(page.locator('.threat-index .eyebrow')).toHaveText('Kimlik ve kimlik bilgisi istismarı')
  await page.getByRole('button', { name: 'Filtreleri temizle' }).click()
  await expect(page.getByRole('status')).toHaveText('10 / 10 tehdit ailesi')
})

test('control filters report empty results and recover without misleading assurance', async ({ page }) => {
  await page.goto('/en/controls?node=model&controlType=recover')
  await expect(page.getByRole('status')).toHaveText('0 / 14 controls')
  await expect(page.getByText('No controls match these filters.')).toBeVisible()
  await page.getByRole('button', { name: 'Clear filters' }).click()
  await expect(page.getByRole('status')).toHaveText('14 / 14 controls')
  await expect(page.locator('.page-note')).toContainText('not measured results')
  await page.getByRole('combobox', { name: 'Assurance', exact: true }).selectOption('proven')
  await expect(page.locator('.status-proven').first()).toContainText('Target: Proven')
  await page.goBack()
  await expect(page.getByRole('status')).toHaveText('14 / 14 controls')
})

for (const locale of ['en', 'tr']) {
  for (const section of ['', '/trust-path', '/threats', '/controls', '/scenarios', '/standards', '/methodology']) {
    test(`${locale}${section || '/brief'} renders without runtime errors or page overflow`, async ({ page }) => {
      const errors: string[] = []
      page.on('pageerror', (error) => errors.push(error.message))
      page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()) })
      await page.goto(`/${locale}${section}`)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      await expect(page.locator('html')).toHaveAttribute('lang', locale)
      await expect(page).toHaveTitle(/SEC/)
      await page.evaluate(() => document.fonts.ready)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)
      await expect(page.locator('vite-error-overlay')).toHaveCount(0)
      expect(errors).toEqual([])
    })
  }
}

test('small phones and tablets retain usable layouts in both languages', async ({ page }) => {
  test.setTimeout(60_000)
  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 })
    for (const path of ['/tr/threats', '/tr/controls?control=first-class-agent-identity', '/tr/trust-path', '/en/scenarios']) {
      await page.goto(path)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      await page.evaluate(() => document.fonts.ready)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), `${width}: ${path}`).toBe(true)
    }
  }
})
