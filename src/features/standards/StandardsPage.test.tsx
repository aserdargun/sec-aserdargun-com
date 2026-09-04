import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from '../../app/App'

describe('Standards crosswalk', () => {
  it('labels synthesis mappings and rejects compliance claims', async () => {
    window.history.pushState({}, '', '/en/standards')
    render(<App />)

    expect(await screen.findAllByText('Synthesis')).not.toHaveLength(0)
    expect(screen.getByText(/research aid, not compliance advice/i)).toBeVisible()
    expect(screen.queryByText(/certified|compliant score/i)).not.toBeInTheDocument()
  })

  it('shows the current MITRE release and OWASP runtime-control preview', async () => {
    window.history.pushState({}, '', '/en/standards')
    render(<App />)

    expect(await screen.findByRole('heading', { name: 'MITRE ATLAS' })).toBeVisible()
    expect(screen.getByText('v2026.08 · 2026-08-31')).toBeVisible()
    expect(screen.getByRole('heading', { name: 'OWASP Agent Control Standard' })).toBeVisible()
    expect(screen.getByText('v0.1 · 2026-09-01')).toBeVisible()
  })

  it('localizes the Turkish section label and framework terminology', async () => {
    window.history.pushState({}, '', '/tr/standards')
    render(<App />)

    expect(await screen.findByText('SEC / 06 / STANDART EŞLEMESİ')).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Yanlış eşdeğerlik kurmadan çerçeve karşılıkları' })).toBeVisible()
    expect(screen.queryByText('2026 initial public draft')).not.toBeInTheDocument()
    expect(screen.queryByText('Service Desk checked 2026-09-04')).not.toBeInTheDocument()
  })
})
