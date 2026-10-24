import { useMemo } from 'react'

const petals = [
  { color: '', sway: 46, size: 12, dur: 13 },
  { color: 'sky', sway: -62, size: 10, dur: 17 },
  { color: 'white', sway: 74, size: 14, dur: 15 },
  { color: '', sway: -38, size: 9, dur: 12 },
  { color: 'sky', sway: 58, size: 13, dur: 19 },
  { color: '', sway: -84, size: 11, dur: 16 },
  { color: 'white', sway: 52, size: 8, dur: 14 },
  { color: 'sky', sway: -48, size: 12, dur: 18 },
  { color: '', sway: 68, size: 10, dur: 11 },
  { color: 'white', sway: -70, size: 13, dur: 20 },
  { color: 'sky', sway: 40, size: 9, dur: 13.5 },
  { color: '', sway: -56, size: 15, dur: 16.5 },
]

const flowers = [
  { emoji: '🌸', x: 4, y: 14, fs: 26, dur: 9, delay: 0 },
  { emoji: '🌺', x: 89, y: 9, fs: 30, dur: 11, delay: 1.5 },
  { emoji: '🌷', x: 92, y: 58, fs: 24, dur: 10, delay: 0.8 },
  { emoji: '🌼', x: 6, y: 62, fs: 22, dur: 12, delay: 2.2 },
  { emoji: '💮', x: 78, y: 78, fs: 20, dur: 9.5, delay: 1.1 },
  { emoji: '🌸', x: 16, y: 84, fs: 18, dur: 13, delay: 2.8 },
  { emoji: '🌷', x: 70, y: 24, fs: 18, dur: 10.5, delay: 3.4 },
  { emoji: '🌸', x: 44, y: 6, fs: 20, dur: 11.5, delay: 1.9 },
]

const hearts = [
  { emoji: '💗', x: 12, fs: 18, dur: 12, delay: 0, drift: 18 },
  { emoji: '💖', x: 28, fs: 14, dur: 15, delay: 2.4, drift: -14 },
  { emoji: '💕', x: 46, fs: 16, dur: 13, delay: 4.1, drift: 22 },
  { emoji: '🩷', x: 63, fs: 20, dur: 16, delay: 1.2, drift: -18 },
  { emoji: '💗', x: 81, fs: 15, dur: 14, delay: 5.2, drift: 12 },
  { emoji: '💖', x: 93, fs: 17, dur: 12.5, delay: 3.2, drift: -20 },
  { emoji: '💕', x: 38, fs: 13, dur: 17, delay: 6.3, drift: 16 },
  { emoji: '💗', x: 72, fs: 12, dur: 11.5, delay: 7.1, drift: -12 },
]

const sparkles = [
  { x: 18, y: 22, dur: 3.2, delay: 0 },
  { x: 34, y: 71, dur: 4.1, delay: 1.1 },
  { x: 57, y: 16, dur: 3.7, delay: 2.2 },
  { x: 76, y: 44, dur: 4.6, delay: 0.6 },
  { x: 88, y: 67, dur: 3.4, delay: 1.7 },
  { x: 8, y: 48, dur: 4.9, delay: 2.9 },
  { x: 48, y: 88, dur: 3.9, delay: 0.2 },
  { x: 66, y: 82, dur: 4.3, delay: 1.4 },
]

export default function Ambience() {
  const petalItems = useMemo(
    () =>
      petals.map((p, i) => ({
        ...p,
        left: `${(i * 8.3 + 3.7) % 96}%`,
        delay: `${-(i * 1.7) % 14}s`,
      })),
    [],
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="aurora"
        style={{ width: '52vw', height: '52vw', left: '-14vw', top: '-10vh', background: '#ffd3e6' }}
      />
      <div
        className="aurora"
        style={{ width: '46vw', height: '46vw', right: '-12vw', top: '8vh', background: '#bff0ff', animationDelay: '-6s' }}
      />
      <div
        className="aurora"
        style={{ width: '44vw', height: '44vw', left: '22vw', bottom: '-18vh', background: '#ffe9a8', opacity: 0.32, animationDelay: '-11s' }}
      />
      <div
        className="aurora"
        style={{ width: '38vw', height: '38vw', right: '16vw', bottom: '6vh', background: '#ffb0d3', animationDelay: '-3s' }}
      />

      {petalItems.map((p, i) => (
        <span
          key={`petal-${i}`}
          className={`petal ${p.color}`}
          style={{
            '--x': p.left,
            '--size': `${p.size}px`,
            '--dur': `${p.dur}s`,
            '--delay': p.delay,
            '--sway': `${p.sway}px`,
          }}
        />
      ))}

      {flowers.map((f, i) => (
        <span
          key={`flower-${i}`}
          className="floating-flower"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            '--fs': `${f.fs}px`,
            '--dur': `${f.dur}s`,
            '--delay': `${f.delay}s`,
          }}
        >
          {f.emoji}
        </span>
      ))}

      {hearts.map((h, i) => (
        <span
          key={`heart-${i}`}
          className="ambient-heart"
          style={{
            left: `${h.x}%`,
            bottom: '-4vh',
            '--fs': `${h.fs}px`,
            '--dur': `${h.dur}s`,
            '--delay': `${-h.delay}s`,
            '--drift': `${h.drift}px`,
          }}
        >
          {h.emoji}
        </span>
      ))}

      {sparkles.map((s, i) => (
        <span
          key={`sparkle-${i}`}
          className="sparkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            '--dur': `${s.dur}s`,
            '--delay': `${s.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
