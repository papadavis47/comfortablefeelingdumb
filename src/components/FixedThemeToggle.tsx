'use client'

import ThemeToggle from '@/components/ThemeToggle'

export default function FixedThemeToggle(): React.JSX.Element {
  return (
    <div className="fixed top-4 right-4 z-40 hidden sm:block rounded-md bg-original/80 border border-subtle/10 p-1.5 shadow-sm backdrop-blur-sm text-darkness">
      <ThemeToggle size={20} />
    </div>
  )
}
