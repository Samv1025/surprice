import { useMemo } from 'react'

const emojis = ['💗', '💖', '💕', '🩷', '🌸', '🌷', '✨', '💫', '🎀']

export default function Confetti({ burstKey = 0, count = 46 }) {
  const pieces = useMemo(() => {
    let seed = (burstKey + 1) * 9301
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }
    return Array.from({ length: count }, () => ({
      emoji: emojis[Math.floor(rand() * emojis.length)],
      x: `${rand() * 100}%`,
      fs: `${12 + rand() * 20}px`,
      dur: `${3.2 + rand() * 3.4}s`,
      delay: `${rand() * 1.6}s`,
      drift: `${-90 + rand() * 180}px`,
    }))
  }, [burstKey, count])

  return (
    <div className="confetti-layer" aria-hidden="true">
      {pieces.map((p, i) => (
        <span
          key={`${burstKey}-${i}`}
          className="confetti-piece"
          style={{
            '--x': p.x,
            '--fs': p.fs,
            '--dur': p.dur,
            '--delay': p.delay,
            '--drift': p.drift,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}
