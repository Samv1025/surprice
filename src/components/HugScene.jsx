import { useEffect, useState } from 'react'
import { BOY, GIRL } from '../lib/assets'
import Confetti from './Confetti'
import HeartBurst from './HeartBurst'

function HeartGlow() {
  return (
    <svg viewBox="0 0 120 110" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="hugHeartFill" cx="50%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#fff1f7" />
          <stop offset="42%" stopColor="#ffb0d3" />
          <stop offset="78%" stopColor="#ff5fa2" />
          <stop offset="100%" stopColor="#f23f8b" />
        </radialGradient>
        <filter id="hugHeartBlur" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>
      <path
        d="M60 100C20 72 4 48 14 28c8-16 28-20 46-4 18-16 38-12 46 4 10 20-6 44-46 72Z"
        fill="#ff84ba"
        opacity="0.55"
        filter="url(#hugHeartBlur)"
      />
      <path
        d="M60 96C23 70 8 47 17 29c7-14 25-18 43-3 18-15 36-11 43 3 9 18-6 41-43 67Z"
        fill="url(#hugHeartFill)"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="1.4"
      />
      <path
        d="M36 34c4-8 13-10 19-4"
        fill="none"
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

function Crown() {
  return (
    <svg viewBox="0 0 140 92" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="crownGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff3c4" />
          <stop offset="38%" stopColor="#ffd76e" />
          <stop offset="100%" stopColor="#e0a91f" />
        </linearGradient>
        <filter id="crownGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#crownGlow)">
        <path
          d="M14 72 22 24l23 20L70 12l25 32 23-20 8 48Z"
          fill="url(#crownGold)"
          stroke="#fff6d6"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <rect x="18" y="72" width="104" height="12" rx="6" fill="url(#crownGold)" stroke="#fff6d6" strokeWidth="2" />
        <circle cx="22" cy="24" r="6" fill="#fff9d8" stroke="#e0a91f" strokeWidth="2" />
        <circle cx="70" cy="12" r="7" fill="#fff9d8" stroke="#e0a91f" strokeWidth="2" />
        <circle cx="118" cy="24" r="6" fill="#fff9d8" stroke="#e0a91f" strokeWidth="2" />
        <circle cx="44" cy="78" r="3" fill="#ff84ba" />
        <circle cx="70" cy="78" r="3.5" fill="#5ed6ff" />
        <circle cx="96" cy="78" r="3" fill="#ff84ba" />
      </g>
    </svg>
  )
}

export default function HugScene({ onNext }) {
  const [hugged, setHugged] = useState(false)
  const [ready, setReady] = useState(false)
  const [burstKey, setBurstKey] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => {
      setHugged(true)
      setBurstKey((k) => k + 1)
    }, 1780)
    const t2 = setTimeout(() => setReady(true), 2500)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <section className="stage-shell min-h-[100dvh] justify-center pt-6 sm:pt-10">
      <header className="fade-up text-center">
        <p className="eyebrow">Two sides. One heart.</p>
        <h1 className="script script-glow mt-2 text-[2.7rem] leading-none text-blush-700 sm:text-6xl">
          And then, our hearts met
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm font-medium text-ink/65 sm:text-base">
          No matter how far apart we start, I will always run back to you.
        </p>
      </header>

      <div className="relative mt-1 h-[clamp(280px,46vh,430px)] w-full max-w-3xl runner-stage">
        <div
          className={`hug-heart pointer-events-none absolute left-1/2 top-[41%] w-[clamp(220px,52vw,340px)] -translate-x-1/2 -translate-y-1/2 ${
            hugged ? 'on' : ''
          }`}
        >
          <HeartGlow />
        </div>

        <div
          className={`crown pointer-events-none absolute left-1/2 top-0 z-20 h-[clamp(46px,12vw,84px)] w-[clamp(70px,18vw,130px)] -translate-x-1/2 ${
            hugged ? 'on' : ''
          }`}
        >
          <Crown />
        </div>

        <div className="hug-shadow" />

        <img
          src={BOY}
          alt="Sam running towards his girl"
          className={`runner boy char-shadow z-10 ${hugged ? 'hugging' : ''}`}
          draggable="false"
        />
        <img
          src={GIRL}
          alt="His girl running towards him"
          className={`runner girl char-shadow z-10 ${hugged ? 'hugging' : ''}`}
          draggable="false"
        />

        {hugged && <HeartBurst />}
      </div>

      <div
        className={`mt-2 flex flex-col items-center text-center transition-all duration-700 ${
          hugged ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
        }`}
      >
        <div className="rounded-full border border-white/80 bg-white/65 px-4 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-blush-600 shadow-glass backdrop-blur-md">
          home is wherever you are 💗
        </div>
        <p className="mt-3 px-4 text-sm font-semibold text-blush-700 sm:text-base">
          Some hugs feel like forever. Yours does.
        </p>
        <button
          type="button"
          onClick={onNext}
          className={`btn-love mt-6 transition-all duration-500 ${
            ready ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
          }`}
        >
          Let&apos;s celebrate you
          <span aria-hidden="true">💗</span>
        </button>
      </div>

      <Confetti burstKey={burstKey} count={40} />
    </section>
  )
}
