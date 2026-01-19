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

export default function ThemeToggle({ size = 18 }: ThemeToggleProps): React.JSX.Element {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useIsMounted()

  function toggleTheme(): void {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  // Render placeholder with same dimensions to avoid layout shift
  if (!mounted) {
    return (
      <button className="opacity-60" aria-label="Toggle theme">
        <span style={{ display: 'inline-block', width: size, height: size }} />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-150"
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {resolvedTheme === 'dark' ? <FiSun size={size} /> : <FiMoon size={size} />}
    </button>
  )
}
