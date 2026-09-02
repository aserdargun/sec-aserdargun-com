import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { App } from '../../app/App'

describe('Trust Path', () => {
  it('selects authorization and exposes its boundary, threats, controls, and evidence', async () => {
    const user = userEvent.setup()
    window.history.pushState({}, '', '/en/trust-path')
    render(<App />)

    await user.click(await screen.findByRole('button', { name: /^05 authorization/i }))

    expect(window.location.search).toBe('?node=authorization')
    expect(screen.getByRole('heading', { name: 'Authorization' })).toBeVisible()
    expect(screen.getByText(/specific and re-evaluated/i)).toBeVisible()
    expect(screen.getByRole('region', { name: 'Required evidence' })).toBeVisible()
    expect(screen.getByRole('region', { name: 'Mapped threats' })).toBeVisible()
    expect(screen.getByRole('region', { name: 'Mapped controls' })).toBeVisible()
  })

  it('moves focus through the ordered path with arrow keys', async () => {
    const user = userEvent.setup()
    window.history.pushState({}, '', '/en/trust-path?node=model')
    render(<App />)
    const model = await screen.findByRole('button', { name: /^01 model/i })
    model.focus()

    await user.keyboard('{ArrowRight}')

    expect(screen.getByRole('button', { name: /^02 agent/i })).toHaveFocus()
  })
})
