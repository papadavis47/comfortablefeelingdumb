import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

// Mock motion/react
vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { initial, animate, exit, transition, ...rest } = props
      void initial; void animate; void exit; void transition
      return <div {...rest}>{children}</div>
    },
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}))

import Modal from '../Modal'

describe('Modal', () => {
  it('renders content when isOpen is true', () => {
    render(<Modal isOpen={true} closeModal={() => {}} />)

    expect(screen.getByText('About This Blog')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
  })

  it('renders nothing when isOpen is false', () => {
    render(<Modal isOpen={false} closeModal={() => {}} />)

    expect(screen.queryByText('About This Blog')).not.toBeInTheDocument()
  })

  it('calls closeModal on Close button click', async () => {
    const user = userEvent.setup()
    const closeModal = vi.fn()

    render(<Modal isOpen={true} closeModal={closeModal} />)

    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(closeModal).toHaveBeenCalledOnce()
  })
})
