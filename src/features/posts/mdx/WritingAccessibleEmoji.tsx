interface WritingAccessibleEmojiProps {
  emoji: string
  label?: string // Optional
  decorative?: boolean // For hiding from screen readers
}

export default function WritingAccessibleEmoji({
  emoji,
  label,
  decorative = false,
}: WritingAccessibleEmojiProps) {
  if (decorative) {
    return <span aria-hidden="true">{emoji}</span>
  }

  return (
    <span role="img" aria-label={label}>
      {emoji}
    </span>
  )
}
