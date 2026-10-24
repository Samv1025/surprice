import { useEffect, useState } from 'react'
import Ambience from './components/Ambience'
import DanceFloor from './components/DanceFloor'
import MagicSparkleTrail from './components/MagicSparkleTrail'
import StartScreen from './components/StartScreen'
import HugScene from './components/HugScene'
import CakeScene from './components/CakeScene'
import QuestionScene from './components/QuestionScene'
import MemoriesScene from './components/MemoriesScene'
import FinaleScene from './components/FinaleScene'

const stages = {
  intro: StartScreen,
  hug: HugScene,
  cake: CakeScene,
  question: QuestionScene,
  memories: MemoriesScene,
  finale: FinaleScene,
}

const stageNames = {
  intro: 'Welcome 💌',
  hug: 'Warm Hug 🫂',
  cake: 'Birthday Cake 🎂',
  question: 'One Question 💍',
  memories: 'Our Story 📸',
  finale: 'Love Letter 💖',
}

export default function App() {
  const [stage, setStage] = useState('intro')
  const Current = stages[stage]

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [stage])

  const next = {
    intro: () => setStage('hug'),
    hug: () => setStage('cake'),
    cake: () => setStage('question'),
    question: () => setStage('memories'),
    memories: () => setStage('finale'),
    finale: () => setStage('intro'),
  }[stage]

  const showChrome = stage !== 'intro'

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden">
      {/* ── Global Romantic Fairy Dust Particle Trail (Follows touches & cursor) ── */}
      <MagicSparkleTrail />

      {/* Atmospheric Ambient Background */}
      <Ambience />

      {showChrome && (
        <>
          {/* Top-Left Branding */}
          <div className="pointer-events-none fixed left-4 top-4 z-50 hidden items-center gap-1.5 rounded-full border border-white/80 bg-white/60 px-3 py-1.5 text-[0.55rem] font-bold uppercase tracking-[0.22em] text-blush-600 shadow-glass backdrop-blur-md sm:flex">
            <span aria-hidden="true">💗</span>
            for my love
          </div>

          {/* Top-Center Romantic Journey Stepper Pill */}
          <div className="pointer-events-none fixed top-3.5 left-1/2 -translate-x-1/2 z-50 hidden sm:flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/60 backdrop-blur-md border border-white/80 shadow-xs text-[0.62rem] font-bold text-blush-700 uppercase tracking-widest">
            <span className="text-pink-500 animate-pulse">✦</span>
            <span>{stageNames[stage]}</span>
            <span className="text-pink-500 animate-pulse">✦</span>
          </div>

          {/* Top-Right Start Over Button */}
          <button
            type="button"
            onClick={() => setStage('intro')}
            aria-label="Start the surprise over"
            title="Start over"
            className="round-btn fixed right-2 top-2 z-50 !h-9 !w-9 !text-sm sm:right-4 sm:top-4 sm:!h-11 sm:!w-11"
          >
            ↺
          </button>
        </>
      )}

      {/* Main Stage View */}
      <main className="relative z-10">
        <div key={stage} className="stage-in">
          <Current onStart={next} onNext={next} onYes={next} onFinish={next} onReplay={next} />
        </div>
      </main>

      {/* 3D Human Character Dance Floor (Hidden on finale and memories to let stage shine) */}
      {showChrome && stage !== 'finale' && stage !== 'memories' && <DanceFloor stage={stage} />}
    </div>
  )
}
