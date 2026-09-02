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
})
