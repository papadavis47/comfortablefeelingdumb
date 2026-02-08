import { render, screen } from '@testing-library/react'
import WritingAccessibleEmoji from '../writing/WritingAccessibleEmoji'

describe('WritingAccessibleEmoji', () => {
  it('renders emoji with role="img" and aria-label', () => {
    render(<WritingAccessibleEmoji emoji="🚀" label="rocket" />)

    const emoji = screen.getByRole('img', { name: 'rocket' })
    expect(emoji).toBeInTheDocument()
    expect(emoji).toHaveTextContent('🚀')
  })

  it('renders decorative emoji with aria-hidden', () => {
    render(<WritingAccessibleEmoji emoji="✨" decorative />)

    const emoji = screen.getByText('✨')
    expect(emoji).toHaveAttribute('aria-hidden', 'true')
    expect(emoji).not.toHaveAttribute('role')
  })
})
