import { useEffect, useRef, useState, useCallback } from 'react'
import { memories } from '../data/memories'
import { asset } from '../lib/assets'
import RainCanvas from './RainCanvas'

const captions = [
  'Every moment with you is magic ✨',
  'That smile makes my heart melt 🌸',
  'My favourite place is next to you 💖',
  'You make every day feel like a fairytale 🏰',
  'With you, even forever feels too short 💕',
  'My calm, my chaos, and my safest home 💫',
  'A piece of my heart in every picture 📸',
  'I would choose you in every lifetime 💍',
  'You and me, our little universe 🌌',
  'Making memories, one heartbeat at a time 💓',
  'Still falling for you every single day 🌹',
  'You are the brightest light in my life 🌟',
  'My heart found its true rhythm in you 🎶',
  'Every glance reminds me how lucky I am 🦋',
  'You are my today and all of my tomorrows 💌',
]

const KEN_BURNS_MODES = [
  'mem-kb-zoom-in',
  'mem-kb-pan-left',
  'mem-kb-zoom-out',
  'mem-kb-pan-right',
  'mem-kb-dolly-drift',
]

const TRANSITIONS = [
  'mem-trans-bloom',
  'mem-trans-fade',
  'mem-trans-drift',
]

const PLAYLIST = [
  { id: 1, title: 'Romantic Melody', src: '/audio1.mp3', fallback: '/audio1.mpeg' },
  { id: 2, title: 'Sweet Love Beats', src: '/audio2.mp3', fallback: '/audio2.mpeg' },
]

const SLIDE_DURATION = 6000 // 6 seconds per slide x 15 slides = 90s (1:30 total)
const TOTAL_DURATION_SEC = 90

/**
 * Minimal Circular Countdown Timer
 */
function SlideTimer({ duration, running, onComplete }) {
  const [progress, setProgress] = useState(0)
  const startRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    setProgress(0)
    startRef.current = null
    if (!running) return
    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts
      const p = Math.min((ts - startRef.current) / duration, 1)
      setProgress(p)
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        onComplete?.()
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [running, duration, onComplete])

  const r = 13
  const circ = 2 * Math.PI * r
  return (
    <svg className="w-7 h-7 flex-shrink-0 drop-shadow-[0_0_6px_rgba(255,132,186,0.5)]" viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r={r} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="2.5" />
      <circle
        cx="16"
        cy="16"
        r={r}
        fill="none"
        stroke="#ff70b0"
        strokeWidth="2.5"
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - progress)}
        strokeLinecap="round"
        transform="rotate(-90 16 16)"
      />
    </svg>
  )
}

/**
 * Floating Romantic Hearts on Slide Change
 */
function FloatingHearts({ triggerKey }) {
  const hearts = ['💗', '💖', '💕', '✨', '🌸']
  const [items, setItems] = useState([])

  useEffect(() => {
    const newHearts = Array.from({ length: 6 }, (_, i) => ({
      id: `${triggerKey}-${i}`,
      emoji: hearts[Math.floor(Math.random() * hearts.length)],
      left: `${20 + Math.random() * 60}%`,
      delay: `${i * 0.12}s`,
      size: `${14 + Math.random() * 14}px`,
      drift: `${(Math.random() - 0.5) * 60}px`,
    }))
    setItems(newHearts)
    const t = setTimeout(() => setItems([]), 2200)
    return () => clearTimeout(t)
  }, [triggerKey])

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden" aria-hidden="true">
      {items.map((h) => (
        <span
          key={h.id}
          className="mem-float-heart"
          style={{ left: h.left, fontSize: h.size, animationDelay: h.delay, '--drift': h.drift }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  )
}

export default function MemoriesScene({ onFinish }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [transIdx, setTransIdx] = useState(0)
  const [heartKey, setHeartKey] = useState(0)
  const [slideKey, setSlideKey] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(true)

  const touchStart = useRef(null)
  const audioRef = useRef(null)
  const audioCtxRef = useRef(null)
  const analyserRef = useRef(null)
  const sourceNodeRef = useRef(null)
  const dataArrayRef = useRef(null)
  const timelineRef = useRef(null)
  const photoContainerRef = useRef(null)

  const length = memories.length
  const last = index === length - 1
  const activeTrack = PLAYLIST[currentTrack]

  // Slide advance
  const advance = useCallback(() => {
    if (last) {
      setPaused(true)
      onFinish?.()
      return
    }
    setIndex((i) => i + 1)
    setTransIdx((t) => (t + 1) % TRANSITIONS.length)
    setHeartKey((k) => k + 1)
    setSlideKey((k) => k + 1)
  }, [last, onFinish])

  const go = useCallback(
    (delta) => {
      setIndex((i) => (i + delta + length) % length)
      setTransIdx((t) => (t + (delta > 0 ? 1 : TRANSITIONS.length - 1)) % TRANSITIONS.length)
      setHeartKey((k) => k + 1)
      setSlideKey((k) => k + 1)
    },
    [length]
  )

  const jumpTo = (i) => {
    if (i === index) return
    setIndex(i)
    setTransIdx((t) => (t + 1) % TRANSITIONS.length)
    setHeartKey((k) => k + 1)
    setSlideKey((k) => k + 1)
  }

  // Preload next image
  useEffect(() => {
    const next = memories[(index + 1) % length]
    if (!next) return
    const img = new Image()
    img.src = asset(next.src)
  }, [index, length])

  // Fullscreen listener
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }
    document.addEventListener('fullscreenchange', handleFsChange)
    return () => document.removeEventListener('fullscreenchange', handleFsChange)
  }, [])

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen?.()
      } else {
        await document.exitFullscreen?.()
      }
    } catch {
      // Ignore
    }
  }

  // Audio Context for subtle beat reactiveness
  const initWebAudio = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext
        audioCtxRef.current = new AudioCtx()
      }
      const ctx = audioCtxRef.current
      if (ctx.state === 'suspended') {
        ctx.resume()
      }
      if (!sourceNodeRef.current && audioRef.current) {
        const analyser = ctx.createAnalyser()
        analyser.fftSize = 64
        analyserRef.current = analyser

        const source = ctx.createMediaElementSource(audioRef.current)
        source.connect(analyser)
        analyser.connect(ctx.destination)
        sourceNodeRef.current = source

        dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount)
      }
    } catch {
      // Ignore
    }
  }, [])

  // Audio Track switching & loop
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.src = activeTrack.src
    audio.load()

    if (!paused) {
      const p = audio.play()
      if (p !== undefined) {
        p.then(() => {
          setHasInteracted(true)
          initWebAudio()
        }).catch(() => {
          setHasInteracted(false)
        })
      }
    }
  }, [currentTrack, activeTrack.src, initWebAudio])

  // Play / Pause sync
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (paused) {
      audio.pause()
    } else {
      const p = audio.play()
      if (p !== undefined) {
        p.then(() => {
          setHasInteracted(true)
          initWebAudio()
        }).catch(() => {
          setHasInteracted(false)
        })
      }
    }
  }, [paused, initWebAudio])

  // Mute sync
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted
    }
  }, [isMuted])

  // Seamless track loop (audio1 -> audio2 -> audio1 -> audio2)
  const handleTrackEnded = () => {
    setCurrentTrack((prev) => (prev + 1) % PLAYLIST.length)
  }

  // Real-time subtle camera beat reactiveness
  useEffect(() => {
    let animId
    const tick = () => {
      if (analyserRef.current && dataArrayRef.current && !paused) {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current)
        const bassVal = (dataArrayRef.current[0] + dataArrayRef.current[1] + dataArrayRef.current[2]) / 3
        const bassNorm = bassVal / 255

        if (photoContainerRef.current) {
          const beatScale = 1 + bassNorm * 0.035
          const beatZ = bassNorm * 16
          photoContainerRef.current.style.setProperty('--beat-scale', beatScale)
          photoContainerRef.current.style.setProperty('--beat-z', `${beatZ}px`)
        }
      }
      animId = requestAnimationFrame(tick)
    }
    animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId)
  }, [paused])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        go(1)
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        go(-1)
      } else if (e.key === ' ') {
        e.preventDefault()
        setPaused((p) => !p)
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen()
      } else if (e.key === 'm' || e.key === 'M') {
        setIsMuted((m) => !m)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [go])

  // Swipe handlers
  const onTouchStart = (e) => {
    touchStart.current = e.changedTouches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchStart.current == null) return
    const delta = e.changedTouches[0].clientX - touchStart.current
    if (Math.abs(delta) > 36) go(delta < 0 ? 1 : -1)
    touchStart.current = null
  }

  // Timeline click
  const handleTimelineClick = (e) => {
    if (!timelineRef.current) return
    const rect = timelineRef.current.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const pct = Math.max(0, Math.min(1, clickX / rect.width))
    const targetIdx = Math.floor(pct * length)
    jumpTo(Math.min(targetIdx, length - 1))
  }

  const startPlaybackWithSound = () => {
    setHasInteracted(true)
    setPaused(false)
    initWebAudio()
    if (audioRef.current) {
      audioRef.current.play().catch(() => {})
    }
  }

  // Format elapsed time in 1:30 timeline
  const elapsedSec = Math.floor(index * (TOTAL_DURATION_SEC / length))
  const formatSec = (s) => {
    const m = Math.floor(s / 60)
    const rem = Math.floor(s % 60)
    return `${m}:${String(rem).padStart(2, '0')}`
  }

  const current = memories[index]
  const caption = captions[index % captions.length]
  const kbMode = KEN_BURNS_MODES[index % KEN_BURNS_MODES.length]
  const transition = TRANSITIONS[transIdx % TRANSITIONS.length]

  return (
    <section
      className="mem-cinema-stage fixed inset-0 z-20 flex flex-col justify-between overflow-hidden select-none bg-[#090310]"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onClick={() => {
        if (!hasInteracted) startPlaybackWithSound()
      }}
    >
      {/* ── Background Audio Track (Repeated loop) ── */}
      <audio
        ref={audioRef}
        onEnded={handleTrackEnded}
        playsInline
        preload="auto"
      >
        <source src={activeTrack.src} type="audio/mpeg" />
        <source src={activeTrack.fallback} type="audio/mpeg" />
      </audio>

      {/* ── 1. Romantic Rain Layer ── */}
      <RainCanvas intensity="romantic" className="z-20 pointer-events-none" />

      {/* ── 2. Atmospheric Ambient Backdrop ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          key={`bg-${slideKey}`}
          src={asset(current.src)}
          alt=""
          aria-hidden="true"
          className="mem-cinema-backdrop"
          draggable="false"
        />
        <div className="mem-cinema-ambilight" aria-hidden="true" />
        <div className="mem-cinema-vignette" aria-hidden="true" />
        <div className="mem-cinema-grain" aria-hidden="true" />
      </div>

      {/* ── 3. Clean Minimalist Top HUD ── */}
      <header className="relative z-30 flex items-center justify-between px-4 pt-3 sm:px-8 sm:pt-5">
        {/* Memory Counter */}
        <div className="mem-hud-badge">
          <span className="mem-neon-dot" aria-hidden="true" />
          <span>{String(index + 1).padStart(2, '0')} / {String(length).padStart(2, '0')}</span>
        </div>

        {/* Minimal Music Pill */}
        <button
          type="button"
          onClick={() => setIsMuted((m) => !m)}
          title={isMuted ? 'Unmute music' : 'Mute music'}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/15 text-white/90 text-xs shadow-md transition-all hover:bg-black/60"
        >
          <span className="text-pink-400">{isMuted ? '🔇' : '🎵'}</span>
          <span className="text-[0.7rem] font-semibold tracking-wide">
            {activeTrack.title}
          </span>
          <span className="text-white/40 text-[0.65rem]">({isMuted ? 'Muted' : 'Playing'})</span>
        </button>

        {/* Right: Fullscreen & Minimal Timer */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            className="mem-hud-btn !px-2.5 !py-1.5"
          >
            <span className="text-xs sm:text-sm">⛶</span>
          </button>

          <SlideTimer
            key={`timer-${slideKey}`}
            duration={SLIDE_DURATION}
            running={!paused}
            onComplete={advance}
          />
        </div>
      </header>

      {/* ── 4. Main Photo Stage (Clean & Elegant) ── */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center w-full px-2 sm:px-6 my-auto">
        <div className="mem-cinema-frame relative flex items-center justify-center">
          {/* Main Photo with Ken Burns Camera Motion */}
          <div
            ref={photoContainerRef}
            className={`mem-photo-container ${transition}`}
          >
            <div key={slideKey} className="mem-photo-inner">
              <img
                src={asset(current.src)}
                alt={`Memory ${index + 1}`}
                className={`mem-cinema-photo ${kbMode}`}
                draggable="false"
              />
            </div>
          </div>

          {/* Floating Hearts burst on slide change */}
          <FloatingHearts triggerKey={heartKey} />

          {/* Clean Navigation Arrows */}
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous memory"
            className="mem-cinema-nav mem-cinema-prev"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next memory"
            className="mem-cinema-nav mem-cinema-next"
          >
            ›
          </button>

          {/* Simple Romantic Caption */}
          <div className="mem-caption-capsule">
            <p key={`cap-${index}`} className="mem-caption-content text-center">
              {caption}
            </p>
          </div>
        </div>
      </main>

      {/* ── 5. Simple & Efficient Bottom Controls ── */}
      <footer className="relative z-30 pb-[clamp(56px,8.5vh,78px)] pt-1 px-4 sm:px-10">
        <div className="mx-auto w-full max-w-3xl">
          {/* 1:30 Timeline Scrubber Bar */}
          <div
            ref={timelineRef}
            onClick={handleTimelineClick}
            className="mem-timeline-bar"
            title="Click to jump"
          >
            <div className="mem-timeline-track">
              <div
                className="mem-timeline-fill"
                style={{ width: `${((index + 1) / length) * 100}%` }}
              />
              <div
                className="mem-timeline-thumb"
                style={{ left: `${((index + 1) / length) * 100}%` }}
              />
            </div>
          </div>

          {/* Clean Controls Bar */}
          <div className="flex items-center justify-between gap-4 mt-1 px-1">
            {/* 1:30 Time indicator */}
            <div className="text-white/70 text-xs font-semibold tracking-wide">
              <span className="text-pink-300 font-bold">{formatSec(elapsedSec)}</span>
              <span className="text-white/40"> / </span>
              <span>1:30</span>
            </div>

            {/* Playback Actions: Prev, Play/Pause, Next */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous"
                className="mem-ctrl-action !w-9 !h-9 text-base"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? 'Play' : 'Pause'}
                className="mem-play-btn !w-11 !h-11 text-sm"
              >
                {paused ? '▶' : '❚❚'}
              </button>

              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next"
                className="mem-ctrl-action !w-9 !h-9 text-base"
              >
                ›
              </button>
            </div>

            {/* Skip / Finish Button */}
            <div>
              {last ? (
                <button
                  type="button"
                  onClick={onFinish}
                  className="mem-finish-btn"
                >
                  <span>Letter 💌</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onFinish}
                  className="mem-skip-action"
                  title="Skip to final letter"
                >
                  <span>Skip →</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </footer>

      {/* ── Autoplay Tap Prompt (Only if browser blocked initial play) ── */}
      {!hasInteracted && (
        <div
          onClick={startPlaybackWithSound}
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md cursor-pointer"
        >
          <div className="mem-autoplay-prompt">
            <span className="text-3xl animate-bounce">🎬</span>
            <h3 className="text-lg font-bold text-white">Tap to Play Video & Music</h3>
            <button
              type="button"
              className="mem-start-btn"
              onClick={startPlaybackWithSound}
            >
              ▶ Play
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
