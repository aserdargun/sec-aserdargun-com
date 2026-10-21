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
    await waitFor(() => expect(document.title).toBe('Güven zinciri | SEC - Yapay Zekâ Sistemleri Güvenliği'))
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      'Yapay zekâ sistemlerinin güvenliği, devredilen yetki, kontroller ve kanıtlar için kaynak destekli gözlemevi.',
    )
  })

  it('redirects the root route to English brief', async () => {
    renderAt('/')

    const briefHeading = await screen.findByRole('heading', { name: /Nothing landed on the default branch. It still stands at 9c05f040, but two unmerged branches moved overnight/i })
    expect(briefHeading).toBeVisible()
    // The cut names the branch tip it measured. A later cut that moves the tip has
    // to update this assertion rather than pass on the generic opening alone.
    expect(briefHeading).toHaveTextContent('9c05f040')
    expect(window.location.pathname).toBe('/en')
  })

  it('renders a localized not-found state', async () => {
    renderAt('/tr/bilinmeyen')

    expect(await screen.findByRole('heading', { name: 'Sayfa bulunamadı' })).toBeVisible()
    expect(document.title).toBe('Sayfa bulunamadı | SEC - Yapay Zekâ Sistemleri Güvenliği')
  })

  it('provides a main landmark and recovery navigation for an unsupported locale', async () => {
    renderAt('/fr/controls')
    expect(await screen.findByRole('heading', { name: 'Page not found' })).toBeVisible()
    expect(screen.getByRole('main')).toContainElement(screen.getByRole('heading', { level: 1 }))
    expect(document.documentElement.lang).toBe('en')
    expect(document.title).toContain('Page not found')
    expect(screen.getByRole('link', { name: 'Security Brief' })).toHaveAttribute('href', '/en')
  })
})
