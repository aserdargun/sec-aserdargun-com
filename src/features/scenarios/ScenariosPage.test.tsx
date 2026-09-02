import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from '../../app/App'

describe('Scenario workbench', () => {
  it('shows the remote MCP authority chain from a shareable URL', async () => {
    window.history.pushState({}, '', '/en/scenarios?scenario=remote-mcp')
    render(<App />)

    expect(await screen.findByRole('heading', { name: 'Remote MCP enterprise connection' })).toBeVisible()
    expect(screen.getByText(/explicit resource audience/i)).toBeVisible()
    expect(screen.getByRole('region', { name: 'Human decisions' })).toBeVisible()
    expect(screen.getByText(/Replay a token at the wrong MCP resource/i)).toBeVisible()
  })

  it('falls back to the coding-agent scenario for an invalid id', async () => {
    window.history.pushState({}, '', '/en/scenarios?scenario=unknown')
    render(<App />)

    expect(await screen.findByRole('heading', { name: 'Coding agent in a repository' })).toBeVisible()
  })
})
