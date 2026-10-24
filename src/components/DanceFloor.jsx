import { BOY, GIRL } from '../lib/assets'

const notes = [
  { note: '🎵', left: '18%', dur: 3.4, delay: 0 },
  { note: '🎶', left: '31%', dur: 4.1, delay: 0.9 },
  { note: '🎵', left: '55%', dur: 3.8, delay: 1.8 },
  { note: '🎶', left: '70%', dur: 4.4, delay: 0.4 },
  { note: '🎵', left: '86%', dur: 3.6, delay: 2.4 },
]

export default function DanceFloor({ stage }) {
  const isCinema = stage === 'memories'
  return (
    <div className={`dance-floor ${isCinema ? 'dance-floor-cinema' : ''}`} aria-hidden="true">
      <div className="dance-floor-inner relative mx-auto flex w-full max-w-4xl items-end justify-center gap-3 px-4 pb-1 sm:gap-6">
        <div className="flex flex-col items-center relative" style={{ transformStyle: 'preserve-3d' }}>
          <div className="char-3d-ground-shadow" />
          <img src={BOY} alt="Sam" className="dance-dancer dance-boy" draggable="false" />
          <span className="mt-0.5 text-[0.55rem] font-bold uppercase tracking-[0.2em] text-blush-600/80">
            Sam
          </span>
        </div>

        <div className="relative mb-4 flex flex-col items-center">
          <span className="text-xl dance-heart sm:text-2xl">💗</span>
          <span className="mt-0.5 hidden text-[0.55rem] font-semibold uppercase tracking-[0.25em] text-blush-500/70 sm:block">
            our little dance
          </span>
        </div>

        <div className="flex flex-col items-center relative" style={{ transformStyle: 'preserve-3d' }}>
          <div className="char-3d-ground-shadow" />
          <img src={GIRL} alt="My love" className="dance-dancer dance-girl" draggable="false" />
          <span className="mt-0.5 text-[0.55rem] font-bold uppercase tracking-[0.2em] text-blush-600/80">
            My love
          </span>
        </div>

        {notes.map((n, i) => (
          <span
            key={i}
            className="music-note"
            style={{
              left: n.left,
              '--dur': `${n.dur}s`,
              '--delay': `${n.delay}s`,
            }}
          >
            {n.note}
          </span>
        ))}
      </div>
    </div>
  )
}
