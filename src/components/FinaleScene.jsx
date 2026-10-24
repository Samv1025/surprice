import { useState } from 'react'
import Confetti from './Confetti'
import HeartBgAnimation from './HeartBgAnimation'
import { BOY, GIRL } from '../lib/assets'

export default function FinaleScene({ onReplay }) {
  const [loveCount, setLoveCount] = useState(0)
  const [loveBurstKey, setLoveBurstKey] = useState(0)
  const [sentMessage, setSentMessage] = useState(false)

  const handleSendLove = () => {
    setLoveCount((c) => c + 1)
    setLoveBurstKey((k) => k + 1)
    setSentMessage(true)
  }

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-2 sm:px-6 py-6 overflow-hidden select-none">
      {/* ── 1. Animated Heart-Shaped Background ── */}
      <HeartBgAnimation />

      {/* ── 2. Celebratory Confetti Burst on Entrance ── */}
      <Confetti burstKey={1} count={45} />

      {/* ── 3. Interactive Floating Hearts Shower (Spawn on tap) ── */}
      {loveBurstKey > 0 && (
        <div key={loveBurstKey} className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="floating-interactive-heart"
              style={{
                left: `${20 + Math.random() * 60}%`,
                bottom: '22%',
                fontSize: `${18 + Math.random() * 22}px`,
                animationDelay: `${i * 0.07}s`,
                '--drift': `${(Math.random() - 0.5) * 120}px`,
              }}
            >
              {['💖', '💗', '💕', '❤️', '🥰', '✨'][i % 6]}
            </span>
          ))}
        </div>
      )}

      {/* ── 4. Main Stage Content ── */}
      <div className="fade-up relative z-10 w-full max-w-4xl text-center flex flex-col items-center">
        {/* Sweet Floating Crown */}
        <span className="inline-block text-3xl sm:text-4xl animate-bounce-gentle" aria-hidden="true">
          👑
        </span>

        {/* Title */}
        <h1 className="script script-glow text-[2.6rem] sm:text-5xl md:text-6xl leading-tight text-blush-700 mt-0.5">
          Thank You, <span className="text-love-gradient">My Love</span>
        </h1>

        {/* ── 5. Three-Column Stage: [Boy on Left] - [Card in Center] - [Girl on Right] ── */}
        <div className="w-full flex items-center justify-center gap-1.5 sm:gap-4 md:gap-8 mt-3 sm:mt-5" style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>
          {/* ── LEFT: Boy Character (Sam) ── */}
          <div className="flex flex-col items-center flex-shrink-0 z-20 relative" style={{ transformStyle: 'preserve-3d' }}>
            <span className="text-sm sm:text-lg animate-float" aria-hidden="true">🎵</span>
            <div className="relative mt-0.5" style={{ transformStyle: 'preserve-3d' }}>
              <div className="char-3d-ground-shadow" />
              <img
                src={BOY}
                alt="Sam"
                className="dance-dancer dance-boy h-20 sm:h-32 md:h-44 w-auto drop-shadow-md select-none pointer-events-none"
                draggable="false"
              />
            </div>
            <span className="mt-1 px-2 sm:px-3 py-0.5 rounded-full bg-white/85 backdrop-blur-md border border-blush-200/80 text-[0.55rem] sm:text-xs font-bold uppercase tracking-widest text-blush-700 shadow-xs whitespace-nowrap">
              Sam 👦🏻
            </span>
          </div>

          {/* ── CENTER: Luxury Love Card (Simple & Attractive) ── */}
          <div className="finale-letter-card flex-1 max-w-[280px] sm:max-w-md relative px-3.5 py-4 sm:px-6 sm:py-5 text-center shadow-xl">
            {/* Decorative Corner Glows */}
            <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-pink-300/30 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-sky-200/30 blur-2xl pointer-events-none" />

            {/* Date Badge */}
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blush-50/90 border border-blush-200/80 text-[0.52rem] sm:text-[0.58rem] font-bold uppercase tracking-[0.2em] text-blush-700 mb-2">
              <span aria-hidden="true">💌</span>
              <span>25 · 10 · FOREVER</span>
            </div>

            {/* Golden Romantic Quote */}
            <p className="script text-xl sm:text-2xl md:text-3xl text-blush-700 leading-snug px-1">
              “You are my favourite hello, and my forever love.”
            </p>

            {/* 3 Simple, Beautiful Romantic Pills */}
            <div className="mt-3 space-y-1.5 sm:space-y-2 text-center">
              <div className="flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-white/75 border border-pink-100/90 shadow-xs text-[0.68rem] sm:text-xs md:text-sm font-semibold text-blush-800">
                <span className="text-xs sm:text-sm">🌸</span>
                <span>You make ordinary days feel magical.</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-white/75 border border-pink-100/90 shadow-xs text-[0.68rem] sm:text-xs md:text-sm font-semibold text-blush-800">
                <span className="text-xs sm:text-sm">💫</span>
                <span>My heart found its safest home in you.</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-white/75 border border-pink-100/90 shadow-xs text-[0.68rem] sm:text-xs md:text-sm font-semibold text-blush-800">
                <span className="text-xs sm:text-sm">💖</span>
                <span>In a hundred lifetimes, I'd still choose you.</span>
              </div>
            </div>

            {/* Signature */}
            <div className="mt-3 pt-2 border-t border-blush-100/70 flex items-center justify-center gap-1.5">
              <p className="script text-xl sm:text-2xl md:text-3xl text-blush-700">
                Forever yours, Sam
              </p>
              <span className="text-lg animate-pulse" aria-hidden="true">💗</span>
            </div>

            {/* Interactive Tap to Send Love */}
            <div className="mt-2.5 flex flex-col items-center">
              <button
                type="button"
                onClick={handleSendLove}
                className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-bold text-[0.65rem] sm:text-xs uppercase tracking-wider shadow-md shadow-pink-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span className="text-xs sm:text-sm group-hover:scale-125 transition-transform">💖</span>
                <span>{sentMessage ? 'Love Received!' : 'Tap To Send Love'}</span>
                {loveCount > 0 && (
                  <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-white/25 text-[0.55rem] font-black">
                    +{loveCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* ── RIGHT: Girl Character (My Love) ── */}
          <div className="flex flex-col items-center flex-shrink-0 z-20 relative" style={{ transformStyle: 'preserve-3d' }}>
            <span className="text-sm sm:text-lg animate-float-slow" aria-hidden="true">💖</span>
            <div className="relative mt-0.5" style={{ transformStyle: 'preserve-3d' }}>
              <div className="char-3d-ground-shadow" />
              <img
                src={GIRL}
                alt="My Love"
                className="dance-dancer dance-girl h-20 sm:h-32 md:h-44 w-auto drop-shadow-md select-none pointer-events-none"
                draggable="false"
              />
            </div>
            <span className="mt-1 px-2 sm:px-3 py-0.5 rounded-full bg-white/85 backdrop-blur-md border border-blush-200/80 text-[0.55rem] sm:text-xs font-bold uppercase tracking-widest text-blush-700 shadow-xs whitespace-nowrap">
              My Love 👧🏻
            </span>
          </div>
        </div>

        {/* ── 6. Compact Replay Button ── */}
        <div className="mt-4 flex flex-col items-center gap-1">
          <button
            type="button"
            onClick={onReplay}
            className="btn-love !px-6 !py-2 text-xs sm:text-sm font-bold shadow-lg hover:scale-105 transition-transform"
          >
            <span>Play our story again ↺</span>
          </button>
          <p className="text-[0.55rem] font-bold uppercase tracking-[0.24em] text-blush-600/70">
            made with all my heart · just for you
          </p>
        </div>
      </div>
    </section>
  )
}
