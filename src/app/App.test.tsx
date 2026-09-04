import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from './App'

function renderAt(path: string) {
  window.history.pushState({}, '', path)
  return render(<App />)
}

describe('SEC application shell', () => {
  it('renders the Turkish shell and current navigation state', async () => {
    renderAt('/tr/trust-path')

    expect(await screen.findByRole('banner', { name: 'Yapay Zekâ Sistemleri Güvenlik Gözlemevi' })).toHaveTextContent('Yapay Zekâ Sistemleri Güvenlik Gözlemevi')
    expect(screen.getByRole('link', { name: 'Güven zinciri' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByText('01 / Model')).toBeVisible()
    await waitFor(() => expect(document.title).toBe('SEC - Yapay Zekâ Sistemleri Güvenliği'))
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      'Yapay zekâ sistemlerinin güvenliği, devredilen yetki, kontroller ve kanıtlar için kaynak destekli gözlemevi.',
    )
  })

  it('redirects the root route to English brief', async () => {
    renderAt('/')

    expect(await screen.findByRole('heading', { name: /Identity is becoming the control plane/i })).toBeVisible()
    expect(window.location.pathname).toBe('/en')
  })

  it('renders a localized not-found state', async () => {
    renderAt('/tr/bilinmeyen')

    expect(await screen.findByRole('heading', { name: 'Sayfa bulunamadı' })).toBeVisible()
  })
})
