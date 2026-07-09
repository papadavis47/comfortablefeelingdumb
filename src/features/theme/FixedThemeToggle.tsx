'use client'

import ThemeToggle from '@/features/theme/ThemeToggle'

export default function FixedThemeToggle(): React.JSX.Element {
  return (
    <div className="fixed top-4 right-4 z-40 hidden sm:block rounded-md bg-surface/80 border border-border p-1.5 shadow-sm backdrop-blur-sm text-fg-muted">
      <ThemeToggle size={20} />
    </div>
  )
}
