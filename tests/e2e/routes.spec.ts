import { readFile } from 'node:fs/promises'
import { expect, test } from '@playwright/test'

test('root route resolves to the English brief', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL(/\/en$/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Identity is becoming')
})

test('deep Turkish route and localized 404 survive direct navigation', async ({ page }) => {
  await page.goto('/tr/methodology')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('SEC kanıtı editoryal yargıdan nasıl ayırır')
  await page.goto('/tr/olmayan')
  await expect(page.getByRole('heading', { name: 'Sayfa bulunamadı' })).toBeVisible()
})

test('Static Web Apps configuration is fail-closed', async () => {
  const config = JSON.parse(await readFile('public/staticwebapp.config.json', 'utf8'))
  expect(config.navigationFallback).toEqual({ rewrite: '/index.html', exclude: ['/assets/*', '/*.json'] })
  expect(config.routes.find((route: { route: string }) => route.route === '/')).toEqual({ route: '/', redirect: '/en', statusCode: 301 })
  expect(config.globalHeaders['Content-Security-Policy']).not.toMatch(/unsafe-inline|unsafe-eval/)
})
