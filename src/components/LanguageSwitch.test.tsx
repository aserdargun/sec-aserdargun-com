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
})
