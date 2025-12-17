interface AccessibleEmojiProps {
  emoji: string
  label?: string // Optional
  decorative?: boolean // For hiding from screen readers
}

export default function AccessibleEmoji({
  emoji,
  label,
  decorative = false,
}: AccessibleEmojiProps) {
  if (decorative) {
    return <span aria-hidden="true">{emoji}</span>
  }

  return (
    <span role="img" aria-label={label}>
      {emoji}
    </span>
  )
}
