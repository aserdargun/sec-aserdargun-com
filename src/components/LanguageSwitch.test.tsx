import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from '../app/App'

describe('LanguageSwitch', () => {
  it('preserves route and scenario query when switching language', async () => {
    window.history.pushState({}, '', '/en/scenarios?scenario=remote-mcp')
    render(<App />)

    expect(await screen.findByRole('link', { name: 'TR' })).toHaveAttribute(
      'href',
      '/tr/scenarios?scenario=remote-mcp',
    )
  })

  it('shows Turkish as the current language on Turkish routes', async () => {
    window.history.pushState({}, '', '/tr/scenarios?scenario=remote-mcp')
    const { container } = render(<App />)

    expect(await screen.findByRole('link', { name: 'EN' })).toHaveAttribute(
      'href',
      '/en/scenarios?scenario=remote-mcp',
    )
    expect(container.querySelector('.language-switch [aria-current="true"]')).toHaveTextContent('TR')
  })
})
