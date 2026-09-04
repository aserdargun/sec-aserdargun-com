import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from '../../app/App'

describe('Security Brief', () => {
  it('distinguishes evidence, synthesis, and watch signals', async () => {
    window.history.pushState({}, '', '/en')
    render(<App />)

    expect(await screen.findAllByText('Evidence')).not.toHaveLength(0)
    expect(screen.getAllByText('Synthesis')).not.toHaveLength(0)
    expect(screen.getAllByText('Watch signal')).not.toHaveLength(0)
    expect(screen.getByText('Research cutoff: 2026-09-04')).toBeVisible()
    expect(screen.getByText('9 authoritative sources')).toBeVisible()
  })

  it('localizes the Turkish signal section marker', async () => {
    window.history.pushState({}, '', '/tr')
    render(<App />)

    expect(await screen.findByText('01A / GÜNCEL SİNYALLER')).toBeVisible()
  })
})
