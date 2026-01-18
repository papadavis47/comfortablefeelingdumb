'use client'

import ThemeToggle from '@/components/ThemeToggle'

export default function FixedThemeToggle(): React.JSX.Element {
  return (
    <div className="fixed top-4 right-4 z-40 hidden sm:block rounded-lg bg-original border-2 border-subtle/20 p-2 shadow-lg backdrop-blur-md text-darkness">
      <ThemeToggle size={28} />
    </div>
  )
}
