import { useEffect, useRef, useState } from 'react'
import { BOY, GIRL } from '../lib/assets'
import Confetti from './Confetti'

export default function QuestionScene({ onYes }) {
  const [mode, setMode] = useState('idle')
  const [girlComing, setGirlComing] = useState(false)
  const [pressing, setPressing] = useState(false)
  const answered = useRef(false)
  const charsRef = useRef(null)
  const onYesRef = useRef(onYes)
  onYesRef.current = onYes

  const finish = () => {
    if (answered.current) return
    answered.current = true
    onYesRef.current()
  }

  useEffect(() => {
    if (mode !== 'no') return
    const t1 = window.setTimeout(() => setGirlComing(true), 800)
    const t2 = window.setTimeout(() => setPressing(true), 3150)
    const t3 = window.setTimeout(() => finish(), 4700)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.clearTimeout(t3)
    }
  }, [mode])

  useEffect(() => {
    if (mode !== 'no') return
    const t = window.setTimeout(() => {
      const el = charsRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const safeBottom = window.innerHeight - 110
      if (rect.bottom > safeBottom) {
        window.scrollBy({ top: rect.bottom - safeBottom + 10, behavior: 'smooth' })
      }
    }, 380)
    return () => window.clearTimeout(t)
  }, [mode])

  const message =
    mode === 'no'
      ? pressing
        ? 'She walked over and pressed YES herself 😌💖'
        : girlComing
          ? 'Wait... she is coming to press it herself 😳'
          : 'Sam is on his knees, crying. Please be gentle 🥺'
      : 'Choose carefully... one answer changes my whole day 💗'

  return (
    <section className="stage-shell min-h-[100dvh] justify-center pt-6 sm:pt-10">
      <header className="fade-up text-center">
        <p className="eyebrow">The most important question</p>
        <h1 className="script script-glow mt-2 text-[2.6rem] leading-none text-blush-700 sm:text-6xl">
          A tiny question for you
        </h1>
      </header>

      <div className="fade-up fade-up-delay-1 relative mt-6 w-full max-w-md">
        <div className="glass-card relative overflow-hidden px-5 py-7 text-center sm:px-8">
          <div className="absolute -left-12 -top-12 h-36 w-36 rounded-full bg-blush-200/50 blur-2xl" />
          <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-skyblue-200/60 blur-2xl" />

          <div className="relative">
            <span className="inline-block text-3xl animate-heart-beat">💗</span>
            <h2 className="script script-glow mt-1 text-[2.6rem] leading-none text-blush-700 sm:text-5xl">
              Did you love Sam?
            </h2>
            <p className="mx-auto mt-3 max-w-xs text-sm font-medium text-ink/65">
              No pressure. But one boy&apos;s entire heart is standing right here.
            </p>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={finish}
                className={`btn-love ${pressing ? 'yes-pressed' : ''}`}
              >
                Yes, always
                <span aria-hidden="true">💖</span>
              </button>
              <button
                type="button"
                onClick={() => setMode('no')}
                disabled={mode === 'no'}
                className="btn-ghost disabled:cursor-not-allowed disabled:opacity-50"
              >
                No
                <span aria-hidden="true">🙈</span>
              </button>
            </div>

            {pressing && <span className="tap-heart" aria-hidden="true">💗</span>}

            <p
              aria-live="polite"
              className={`mx-auto mt-5 min-h-[2.5rem] max-w-xs text-xs font-semibold leading-relaxed ${
                mode === 'no' ? 'text-blush-600' : 'text-blush-500/80'
              }`}
            >
              {message}
            </p>
          </div>
        </div>
      </div>

      <div ref={charsRef} className="relative mt-1 h-[172px] w-full max-w-md sm:h-[200px]" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
        <div
          className="absolute bottom-0 left-[8%] h-[150px] w-auto sm:left-[12%] sm:h-[176px]"
          style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d' }}
        >
          <img
            src={BOY}
            alt="Sam"
            className={`h-full w-auto char-shadow ${mode === 'no' ? 'boy-crying' : 'boy-3d-idle'}`}
            draggable="false"
          />
          {mode === 'no' && (
            <>
              <span className="tear left-[43%] top-[17%]" style={{ '--delay': '0s' }} />
              <span className="tear left-[55%] top-[19%]" style={{ '--delay': '0.7s' }} />
              <span className="absolute -top-2 left-[54%] rounded-full border border-white/80 bg-white/85 px-2 py-1 text-[0.6rem] font-bold text-blush-600 shadow-glass backdrop-blur-sm">
                please... 🥺
              </span>
            </>
          )}
        </div>

        <div
          className={`absolute bottom-0 right-[6%] h-[150px] w-auto sm:right-[10%] sm:h-[176px] ${
            girlComing ? 'girl-arrive' : 'opacity-0'
          }`}
        >
          <img src={GIRL} alt="His girl" className="h-full w-auto char-shadow" draggable="false" />
          {girlComing && (
            <span className="absolute -top-3 right-[48%] whitespace-nowrap rounded-full border border-white/80 bg-white/85 px-2 py-1 text-[0.6rem] font-bold text-blush-600 shadow-glass backdrop-blur-sm">
              I&apos;ll do it myself 😌
            </span>
          )}
        </div>
      </div>

      <Confetti burstKey={pressing ? 1 : 0} count={pressing ? 34 : 0} />
    </section>
  )
}
