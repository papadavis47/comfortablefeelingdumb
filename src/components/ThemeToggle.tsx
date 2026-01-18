'use client'

import { useSyncExternalStore } from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '@/contexts/ThemeContext'

type ThemeToggleProps = {
  size?: number
}

const emptySubscribe = (): (() => void) => () => {}

function useIsMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

export default function ThemeToggle({ size = 24 }: ThemeToggleProps): React.JSX.Element {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useIsMounted()

  function toggleTheme(): void {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  // Render placeholder with same dimensions to avoid layout shift
  if (!mounted) {
    return (
      <button className="hover:text-shift" aria-label="Toggle theme">
        <span style={{ display: 'inline-block', width: size, height: size }} />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="hover:text-shift"
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {resolvedTheme === 'dark' ? <FiSun size={size} /> : <FiMoon size={size} />}
    </button>
  )
}
