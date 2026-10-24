import { useRef, useState } from 'react'
import { BOY, GIRL } from '../lib/assets'
import Confetti from './Confetti'

const sprinkles = [
  { bottom: '20%', left: '22%', color: '#ffffff' },
  { bottom: '24%', left: '38%', color: '#ffe9a8' },
  { bottom: '17%', left: '56%', color: '#bff0ff' },
  { bottom: '26%', left: '72%', color: '#ffffff' },
  { bottom: '35%', left: '30%', color: '#ffffff' },
  { bottom: '39%', left: '46%', color: '#ffd76e' },
  { bottom: '34%', left: '62%', color: '#ffffff' },
  { bottom: '50%', left: '38%', color: '#ffe9a8' },
  { bottom: '53%', left: '52%', color: '#ffffff' },
  { bottom: '49%', left: '62%', color: '#bff0ff' },
]

function CakeArt() {
  return (
    <div className="absolute inset-0">
      <div className="cake-shadow" />
      <div className="cake-plate" />

      <div className="tier tier-1">
        <div className="frosting" />
      </div>
      <div className="tier tier-2">
        <div className="frosting" />
      </div>
      <div className="tier tier-3">
        <div className="frosting" />
      </div>

      <span className="cherry" style={{ bottom: '61%', left: '35%' }} />
      <span className="cherry" style={{ bottom: '62%', left: '59%' }} />
      <span className="cherry" style={{ bottom: '60%', left: '47%' }} />

      {sprinkles.map((s, i) => (
        <span
          key={i}
          className="sprinkle"
          style={{ bottom: s.bottom, left: s.left, background: s.color, transform: `rotate(${i * 37}deg)` }}
        />
      ))}
    </div>
  )
}

function formatDate(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 4)
  const parts = [digits.slice(0, 2), digits.slice(2, 4)].filter(Boolean)
  return parts.join('/')
}

export default function CakeScene({ onNext }) {
  const [date, setDate] = useState('')
  const [cut, setCut] = useState(false)
  const [error, setError] = useState(false)
  const [shakeKey, setShakeKey] = useState(0)
  const [burstKey, setBurstKey] = useState(0)
  const [ready, setReady] = useState(false)
  const inputRef = useRef(null)

  const performCut = () => {
    setCut(true)
    setError(false)
    setBurstKey((k) => k + 1)
    // Slower, graceful cutting sequence: 3.8s before showing the final prompt
    window.setTimeout(() => setReady(true), 3800)
  }

  const handleSubmit = (event) => {
    event?.preventDefault?.()
    const clean = date.trim().replace(/\s+/g, '')
    if (clean === '25/10' || clean === '25-10' || clean === '2510' || clean === '25') {
      performCut()
      return
    }
    setError(true)
    setShakeKey((k) => k + 1)
    window.setTimeout(() => inputRef.current?.focus(), 0)
  }

  return (
    <section className="stage-shell min-h-[100dvh] justify-center pt-4 sm:pt-8 select-none">
      {/* Top Header */}
      <header className="fade-up text-center px-4">
        <p className="eyebrow">A wish, a candle, a thousand dreams 🎂</p>
        <h1 className="script script-glow mt-1 text-[2.7rem] leading-none text-blush-700 sm:text-6xl">
          Make a wish, My Princess
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-xs sm:text-sm font-medium text-ink/70">
          Blow out the candle and cut our special birthday cake together ✨
        </p>
      </header>

      {/* Main Cake Stage flanked by 3D Sam and Birthday Girl */}
      <div
        className="fade-up fade-up-delay-1 relative mt-4 sm:mt-6 w-full max-w-4xl flex items-center justify-center gap-2 sm:gap-6 lg:gap-10"
        style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
      >
        {/* Left 3D Character: Sam cheering */}
        <div
          className="hidden sm:flex flex-col items-center flex-shrink-0 z-20 relative"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <span className="text-xl animate-float mb-1" aria-hidden="true">🎉</span>
          <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
            <div className="char-3d-ground-shadow" />
            <img
              src={BOY}
              alt="Sam"
              className={`dance-dancer dance-boy h-32 sm:h-44 md:h-52 w-auto drop-shadow-lg select-none pointer-events-none transition-transform duration-700 ${
                cut ? 'scale-110' : ''
              }`}
              draggable="false"
            />
          </div>
          <span className="mt-1.5 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md border border-blush-200 text-[0.62rem] font-bold uppercase tracking-wider text-blush-700">
            Sam 👦🏻
          </span>
        </div>

        {/* Center: The Grand Birthday Cake */}
        <div className="relative w-full max-w-sm flex flex-col items-center">
          <div className={`cake cake-scene relative mx-auto ${cut ? 'cut' : ''}`}>
            {/* Candlelight Warm Halo */}
            <div className="cake-halo" />

            {/* Sliced Halves with slower deliberate parting */}
            <div className="cake-half left">
              <CakeArt />
            </div>
            <div className="cake-half right">
              <CakeArt />
            </div>

            {/* Candle and Flame */}
            <div className="candle z-20">
              <div className="wick" />
              <div className="flame" />
            </div>

            {/* Golden Knife slicing deliberately */}
            <div className="knife" />

            {/* Inner Glowing Heart Reveal on Cut */}
            {cut && (
              <div className="cake-heart-reveal">
                <span className="text-4xl">💖</span>
                <span className="text-xs font-bold text-pink-600 bg-white/90 px-2.5 py-0.5 rounded-full shadow-md mt-1 whitespace-nowrap">
                  Sweetest Love ✨
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right 3D Character: Birthday Girl with Crown */}
        <div
          className="hidden sm:flex flex-col items-center flex-shrink-0 z-20 relative"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <span className="text-xl animate-float-slow mb-1" aria-hidden="true">👑</span>
          <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
            <div className="char-3d-ground-shadow" />
            <img
              src={GIRL}
              alt="Birthday Girl"
              className={`dance-dancer dance-girl h-32 sm:h-44 md:h-52 w-auto drop-shadow-lg select-none pointer-events-none transition-transform duration-700 ${
                cut ? 'scale-110' : ''
              }`}
              draggable="false"
            />
          </div>
          <span className="mt-1.5 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md border border-blush-200 text-[0.62rem] font-bold uppercase tracking-wider text-blush-700">
            My Princess 👧🏻
          </span>
        </div>
      </div>

      {/* Interactive Controls & Message */}
      {!cut ? (
        <form
          key={shakeKey}
          onSubmit={handleSubmit}
          className={`fade-up fade-up-delay-2 mt-4 w-full max-w-sm px-4 ${error ? 'shake' : ''}`}
        >
          <div className="text-center mb-2">
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-blush-600/90">
              Enter your birthday date (25/10)
            </span>
          </div>

          <div className={`rounded-2xl p-1 transition-all duration-300 ${error ? 'bg-blush-200/80 ring-2 ring-blush-400' : 'bg-white/50 backdrop-blur-md'}`}>
            <input
              ref={inputRef}
              id="birthday-date"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              placeholder="dd/mm (e.g. 25/10)"
              value={date}
              onChange={(e) => {
                setDate(formatDate(e.target.value))
                if (error) setError(false)
              }}
              className="field text-center font-bold tracking-widest text-lg"
            />
          </div>

          {error && (
            <p className="mt-1.5 text-center text-xs font-semibold text-blush-600 animate-fade-in">
              Hint: It&apos;s 25th October (25/10) 💗
            </p>
          )}

          {/* Action Buttons: Cut Cake Directly or Submit Date */}
          <div className="mt-3 flex flex-col sm:flex-row items-center justify-center gap-2">
            <button type="submit" className="btn-love w-full sm:w-auto shadow-md">
              <span>Cut the Cake</span>
              <span aria-hidden="true">🎂</span>
            </button>

            {/* Quick 1-click shortcut so user never gets stuck */}
            <button
              type="button"
              onClick={performCut}
              className="px-4 py-2 rounded-full bg-white/70 hover:bg-white text-blush-700 text-xs font-bold border border-blush-200 transition-all hover:scale-105 shadow-xs"
            >
              <span>Instant Cut ✨</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="fade-up mt-4 flex w-full max-w-sm flex-col items-center text-center px-4">
          <div className="glass-card w-full px-6 py-4 shadow-xl border border-white/80">
            <p className="text-xl font-black text-blush-700">
              Happy Birthday, My Princess! 🎂👑
            </p>
            <p className="mt-1.5 text-xs sm:text-sm font-medium leading-relaxed text-ink/75">
              Every wish on this candle came true the day I found you. You make my entire world sweet.
            </p>
          </div>

          <button
            type="button"
            onClick={onNext}
            className={`btn-love mt-4 transition-all duration-700 ${
              ready ? 'opacity-100 scale-100' : 'pointer-events-none opacity-0 scale-95'
            }`}
          >
            <span>I have a tiny question</span>
            <span aria-hidden="true">💌 →</span>
          </button>
        </div>
      )}

      {/* Celebration Confetti */}
      <Confetti burstKey={burstKey} count={cut ? 75 : 0} />
    </section>
  )
}
