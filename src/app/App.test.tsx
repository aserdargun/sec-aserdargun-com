import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from './App'

function renderAt(path: string) {
  window.history.pushState({}, '', path)
  return render(<App />)
}

describe('SEC application shell', () => {
  it('renders the Turkish shell and current navigation state', async () => {
    renderAt('/tr/trust-path')

    expect(await screen.findByRole('banner')).toHaveTextContent('AI Sistemleri Güvenlik Gözlemevi')
    expect(screen.getByRole('link', { name: 'Güven zinciri' })).toHaveAttribute('aria-current', 'page')
  })

  it('redirects the root route to English brief', async () => {
    renderAt('/')

    expect(await screen.findByRole('heading', { name: 'Security Brief' })).toBeVisible()
    expect(window.location.pathname).toBe('/en')
  })

  it('renders a localized not-found state', async () => {
    renderAt('/tr/bilinmeyen')

    expect(await screen.findByRole('heading', { name: 'Sayfa bulunamadı' })).toBeVisible()
  })
})
