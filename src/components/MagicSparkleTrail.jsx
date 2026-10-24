import { useEffect, useState, useRef } from 'react'

const SYMBOLS = ['✨', '💖', '🌸', '✦', '⭐', '💕']

export default function MagicSparkleTrail() {
  const [particles, setParticles] = useState([])
  const lastTimeRef = useRef(0)

  useEffect(() => {
    const handlePointerMove = (e) => {
      const now = performance.now()
      // Throttle slightly so we don't spawn 100s of particles per second
      if (now - lastTimeRef.current < 45) return
      lastTimeRef.current = now

      const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX)
      const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY)
      if (clientX == null || clientY == null) return

      const id = `${now}-${Math.random()}`
      const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
      const size = 12 + Math.random() * 12
      const driftX = (Math.random() - 0.5) * 40
      const driftY = -25 - Math.random() * 35

      const newP = { id, x: clientX, y: clientY, symbol, size, driftX, driftY }

      setParticles((prev) => [...prev.slice(-18), newP])

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== id))
      }, 750)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('touchmove', handlePointerMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('touchmove', handlePointerMove)
    }
  }, [])

  if (particles.length === 0) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="magic-sparkle-dot"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            fontSize: `${p.size}px`,
            '--drift-x': `${p.driftX}px`,
            '--drift-y': `${p.driftY}px`,
          }}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  )
}
