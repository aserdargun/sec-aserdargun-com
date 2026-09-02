import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from '../../app/App'

describe('Threat map', () => {
  it('keeps identity threats when filtering by identity node', async () => {
    window.history.pushState({}, '', '/en/threats?node=identity')
    render(<App />)

    expect(await screen.findByText('Identity and credential abuse')).toBeVisible()
    expect(screen.queryByText('Cascading failure and recovery')).not.toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: 'Trust node' })).toHaveValue('identity')
  })
})
