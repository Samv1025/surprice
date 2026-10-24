import { useState } from 'react'
import { BOY, GIRL } from '../lib/assets'

export default function StartScreen({ onStart }) {
  const [clickBursts, setClickBursts] = useState([])

  // Spawn floating sparkles/hearts wherever the user clicks
  const handleScreenClick = (e) => {
    if (e.target.closest('button')) return
    const id = Date.now() + Math.random()
    const x = e.clientX
    const y = e.clientY
    const items = ['💖', '✨', '🌸', '💗']
    const emoji = items[Math.floor(Math.random() * items.length)]

    setClickBursts((prev) => [...prev.slice(-6), { id, x, y, emoji }])
    setTimeout(() => {
      setClickBursts((prev) => prev.filter((item) => item.id !== id))
    }, 1600)
  }

  return (
    <section
      onClick={handleScreenClick}
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-4 py-8 select-none"
    >
      {/* ── 1. Rotating Radiant Sunbeams & Aura Rays ── */}
      <div className="entrance-sunbeams" aria-hidden="true" />

      {/* Pulsing Center Heart Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[650px] h-[85vw] max-h-[650px] rounded-full bg-gradient-to-tr from-pink-400/20 via-rose-300/20 to-sky-200/15 blur-3xl animate-pulse-glow"
        aria-hidden="true"
      />

      {/* Interactive Click Hearts */}
      {clickBursts.map((b) => (
        <span
          key={b.id}
          className="pointer-events-none fixed z-50 text-2xl animate-float-heart"
          style={{
            left: `${b.x}px`,
            top: `${b.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {b.emoji}
        </span>
      ))}

      {/* ── 2. Three-Part Stage: [Sam on Left] - [Invitation Card in Center] - [Girl on Right] ── */}
      <div
        className="relative z-10 w-full max-w-5xl flex items-center justify-center gap-3 sm:gap-8 lg:gap-14"
        style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
      >
        {/* ── LEFT CHARACTER: Sam (Boy) ── */}
        <div
          className="hidden sm:flex flex-col items-center flex-shrink-0 z-20 relative animate-fade-in"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <span className="text-xl animate-float mb-1" aria-hidden="true">🌹</span>

          {/* Character Sprite with realistic 3D human dance */}
          <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
            <div className="char-3d-ground-shadow" />
            <img
              src={BOY}
              alt="Sam"
              className="dance-dancer dance-boy h-36 sm:h-48 md:h-60 lg:h-72 w-auto drop-shadow-xl select-none pointer-events-none"
              draggable="false"
            />
          </div>

          <span className="mt-2 px-3 py-0.5 rounded-full bg-white/85 backdrop-blur-md border border-blush-200/80 text-[0.68rem] font-bold uppercase tracking-widest text-blush-700 shadow-xs">
            Sam 👦🏻
          </span>
        </div>

        {/* ── CENTER: Clean & Elegant Invitation Card ── */}
        <div className="entrance-card relative z-10 w-full max-w-md px-6 py-9 sm:px-10 sm:py-10 text-center">
          {/* Ambient Corner Blooms */}
          <div className="absolute -left-10 -top-10 h-36 w-36 rounded-full bg-pink-300/35 blur-2xl pointer-events-none" />
          <div className="absolute -right-10 top-8 h-36 w-36 rounded-full bg-sky-200/35 blur-2xl pointer-events-none" />

          {/* Floating Love Envelope */}
          <div className="entrance-envelope-wrap mb-4">
            <div className="relative grid h-16 w-16 place-items-center rounded-2xl border-2 border-white/90 bg-gradient-to-tr from-pink-400 via-rose-400 to-pink-500 text-3xl shadow-lg shadow-pink-500/35">
              <span className="drop-shadow-md select-none">💌</span>
              <span className="absolute -top-2.5 -right-2 text-base animate-bounce-gent">👑</span>
            </div>
          </div>

          {/* Clean Main Title */}
          <h1 className="script script-glow text-4xl sm:text-6xl md:text-7xl leading-tight text-blush-700">
            Happy Birthday,
            <span className="block mt-1 text-love-gradient">My Love</span>
          </h1>

          {/* Minimal 1-Line Sweet Note */}
          <p className="mt-3 text-xs sm:text-sm font-medium text-ink/75">
            A special little surprise made just for you ✨
          </p>

          {/* ── Magnetic Grand Portal Button ── */}
          <div className="relative mt-8 inline-block">
            {/* Concentric Expanding Portal Rings */}
            <div className="pulse-portal-ring" />
            <div className="pulse-portal-ring pulse-portal-ring-2" />

            <button
              type="button"
              onClick={onStart}
              className="entrance-portal-btn group"
            >
              <span className="text-xl animate-pulse">💗</span>
              <span>Open Surprise</span>
              <span className="text-xl transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </button>
          </div>
        </div>

        {/* ── RIGHT CHARACTER: My Love (Girl) ── */}
        <div
          className="hidden sm:flex flex-col items-center flex-shrink-0 z-20 relative animate-fade-in"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <span className="text-xl animate-float-slow mb-1" aria-hidden="true">✨</span>

          {/* Character Sprite with realistic 3D human dance */}
          <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
            <div className="char-3d-ground-shadow" />
            <img
              src={GIRL}
              alt="My Love"
              className="dance-dancer dance-girl h-36 sm:h-48 md:h-60 lg:h-72 w-auto drop-shadow-xl select-none pointer-events-none"
              draggable="false"
            />
          </div>

          <span className="mt-2 px-3 py-0.5 rounded-full bg-white/85 backdrop-blur-md border border-blush-200/80 text-[0.68rem] font-bold uppercase tracking-widest text-blush-700 shadow-xs">
            My Love 👧🏻
          </span>
        </div>
      </div>

      {/* Mobile-Only Characters Row (Clean & Compact) */}
      <div
        className="sm:hidden flex items-center justify-around w-full max-w-xs mt-6 z-20"
        style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      >
        <div className="flex flex-col items-center relative" style={{ transformStyle: 'preserve-3d' }}>
          <div className="char-3d-ground-shadow" />
          <img
            src={BOY}
            alt="Sam"
            className="dance-dancer dance-boy h-24 w-auto drop-shadow-md select-none pointer-events-none"
            draggable="false"
          />
          <span className="text-[0.62rem] font-bold text-blush-700 bg-white/85 px-2.5 py-0.5 rounded-full mt-1 border border-blush-200">
            Sam 👦🏻
          </span>
        </div>

        <span className="text-2xl animate-float">💗</span>

        <div className="flex flex-col items-center relative" style={{ transformStyle: 'preserve-3d' }}>
          <div className="char-3d-ground-shadow" />
          <img
            src={GIRL}
            alt="My Love"
            className="dance-dancer dance-girl h-24 w-auto drop-shadow-md select-none pointer-events-none"
            draggable="false"
          />
          <span className="text-[0.62rem] font-bold text-blush-700 bg-white/85 px-2.5 py-0.5 rounded-full mt-1 border border-blush-200">
            My Love 👧🏻
          </span>
        </div>
      </div>
    </section>
  )
}
