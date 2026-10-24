import { useMemo } from 'react'

const hearts = ['💗', '💖', '💕', '🩷', '✨']

export default function HeartBurst({ count = 16 }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        emoji: hearts[i % hearts.length],
        angle: i * (360 / count) + (i % 3) * 7,
        distance: 70 + (i % 4) * 26,
        delay: (i % 5) * 0.05,
        size: 12 + (i % 4) * 4,
      })),
    [count],
  )

  return (
    <div className="heart-burst" aria-hidden="true">
      {pieces.map((p, i) => (
        <span
          key={i}
          style={{
            fontSize: `${p.size}px`,
            '--a': `${p.angle}deg`,
            '--d': `${p.distance}px`,
            '--delay': `${p.delay}s`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}
