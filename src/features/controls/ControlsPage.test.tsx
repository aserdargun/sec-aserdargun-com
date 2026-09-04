import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from '../../app/App'

describe('Control matrix', () => {
  it('exposes distinct assurance levels without an aggregate score', async () => {
    window.history.pushState({}, '', '/en/controls')
    render(<App />)

    expect(await screen.findAllByText('Declared')).not.toHaveLength(0)
    expect(screen.getAllByText('Proven')).not.toHaveLength(0)
    expect(screen.queryByText(/security score|trust score|\d+%/i)).not.toBeInTheDocument()
    expect(screen.getAllByRole('columnheader').map((item) => item.textContent)).toEqual(
      expect.arrayContaining(['Node', 'Threat', 'Control', 'Type', 'Assurance', 'Required evidence', 'Reviewed']),
    )
  })

  it('filters controls by assurance from the URL', async () => {
    window.history.pushState({}, '', '/en/controls?assurance=proven')
    render(<App />)

    expect(await screen.findAllByText('Explicit tool allowlist')).not.toHaveLength(0)
    expect(screen.queryByText('Short-lived credentials')).not.toBeInTheDocument()
  })

  it('localizes Turkish control and assurance values', async () => {
    window.history.pushState({}, '', '/tr/controls')
    render(<App />)

    expect(await screen.findByRole('option', { name: 'Önle' })).toHaveValue('prevent')
    expect(screen.getByRole('option', { name: 'Algıla' })).toHaveValue('detect')
    expect(screen.getByRole('option', { name: 'Sınırla' })).toHaveValue('contain')
    expect(screen.getByRole('option', { name: 'Kurtar' })).toHaveValue('recover')
    expect(screen.getByRole('option', { name: 'Beyan' })).toHaveValue('declared')
    expect(screen.getByRole('option', { name: 'Uygulandı' })).toHaveValue('enforced')
    expect(screen.getByRole('option', { name: 'Gözlendi' })).toHaveValue('observed')
    expect(screen.getByRole('option', { name: 'Kanıtlandı' })).toHaveValue('proven')
  })
})
