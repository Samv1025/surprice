import { useMemo } from 'react'

/**
 * HeartBgAnimation:
 * Luminous, multi-layered heart-shaped background animation:
 * 1. Giant beating heart core with radiant ambient glow.
 * 2. Concentric expanding heart ripple waves.
 * 3. Rising floating hearts with natural sway.
 * 4. Twinkling sparkles and soft bokeh dots.
 */
export default function HeartBgAnimation({ className = '' }) {
  // Generate random rising heart particles
  const floatingHearts = useMemo(() => {
    const emojis = ['💗', '💖', '💕', '🩷', '❤️', '💓', '✨']
    return Array.from({ length: 24 }, (_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      left: `${(i * 4.2 + (i % 5) * 3) % 94 + 3}%`,
      bottom: `-${10 + (i % 6) * 12}px`,
      size: 14 + (i % 5) * 6,
      duration: 10 + (i % 7) * 2.5,
      delay: -(i * 1.4),
      sway: 35 + (i % 4) * 25,
      opacity: 0.45 + (i % 4) * 0.15,
    }))
  }, [])

  // Floating sparkling dust motes
  const sparkles = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${(i * 6.1 + 8) % 90 + 5}%`,
      top: `${(i * 7.3 + 12) % 85 + 5}%`,
      size: 2 + (i % 4) * 2.5,
      duration: 2.5 + (i % 5) * 0.8,
      delay: (i % 6) * 0.5,
    }))
  }, [])

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {/* ── 1. Giant Pulsating Heart Core Aura ── */}
      <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        {/* Deep ambient radial glow */}
        <div className="absolute w-[85vw] max-w-[650px] h-[85vw] max-h-[650px] rounded-full bg-gradient-to-tr from-pink-400/25 via-rose-300/20 to-sky-200/15 blur-3xl animate-pulse-glow" />

        {/* Concentric Heart Ripple Waves */}
        <div className="heart-wave-ring heart-wave-1" />
        <div className="heart-wave-ring heart-wave-2" />
        <div className="heart-wave-ring heart-wave-3" />

        {/* Center Luminous SVG Heart */}
        <svg
          viewBox="0 0 24 24"
          className="relative w-64 h-64 sm:w-96 sm:h-96 heart-beating-core drop-shadow-[0_0_50px_rgba(255,105,180,0.65)]"
          fill="url(#heartBgGrad)"
        >
          <defs>
            <linearGradient id="heartBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff7eb3" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#ff758c" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#ffb199" stopOpacity="0.25" />
            </linearGradient>
            <filter id="heartGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            filter="url(#heartGlow)"
          />
        </svg>
      </div>

      {/* ── 2. Floating Heart Particles ── */}
      {floatingHearts.map((h) => (
        <span
          key={`fh-${h.id}`}
          className="floating-bg-heart"
          style={{
            left: h.left,
            bottom: h.bottom,
            fontSize: `${h.size}px`,
            opacity: h.opacity,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            '--sway': `${h.sway}px`,
          }}
        >
          {h.emoji}
        </span>
      ))}

      {/* ── 3. Twinkling Sparkle Lights ── */}
      {sparkles.map((s) => (
        <span
          key={`sp-${s.id}`}
          className="heart-sparkle-dot"
          style={{
            left: s.left,
            top: s.top,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
