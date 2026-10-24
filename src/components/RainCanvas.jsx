import { useEffect, useRef, useState } from 'react'

/**
 * RainCanvas: Ultra-realistic, high-performance HTML5 Canvas rain engine.
 * Includes:
 * 1. Multilayered falling rain streaks with realistic angle, velocity, and motion blur.
 * 2. Condensation / water droplets on the glass pane that bead up and drip down.
 * 3. Subtle splash ripples when rain impacts.
 * 4. Specular reflections catching ambient light.
 */
export default function RainCanvas({ intensity = 'romantic', interactive = true, className = '' }) {
  const canvasRef = useRef(null)
  const animFrameRef = useRef(null)
  const stateRef = useRef({
    drops: [],
    splashes: [],
    glassDrops: [],
    width: 0,
    height: 0,
    dpr: 1,
    intensity: intensity,
  })

  // Update intensity ref when prop changes
  useEffect(() => {
    stateRef.current.intensity = intensity
  }, [intensity])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const config = {
      romantic: { count: 180, glassCount: 38, speedMult: 1.0, wind: 2.2 },
      heavy: { count: 320, glassCount: 65, speedMult: 1.45, wind: 3.5 },
      gentle: { count: 90, glassCount: 22, speedMult: 0.7, wind: 1.2 },
      off: { count: 0, glassCount: 0, speedMult: 0, wind: 0 },
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      stateRef.current.width = w
      stateRef.current.height = h
      stateRef.current.dpr = dpr
      initParticles(w, h)
    }

    const initParticles = (w, h) => {
      const currentConfig = config[stateRef.current.intensity] || config.romantic
      const drops = []
      for (let i = 0; i < currentConfig.count; i++) {
        drops.push(createDrop(w, h, true))
      }

      const glassDrops = []
      for (let i = 0; i < currentConfig.glassCount; i++) {
        glassDrops.push(createGlassDrop(w, h))
      }

      stateRef.current.drops = drops
      stateRef.current.glassDrops = glassDrops
      stateRef.current.splashes = []
    }

    const createDrop = (w, h, randomY = false) => {
      // 3 layers of rain: 0 = far/misty, 1 = mid, 2 = foreground
      const layer = Math.random() < 0.25 ? 2 : Math.random() < 0.6 ? 1 : 0
      const speeds = [14, 22, 32]
      const lengths = [14, 26, 42]
      const opacities = [0.22, 0.45, 0.72]
      const widths = [0.9, 1.3, 1.8]

      return {
        x: Math.random() * (w + 200) - 100,
        y: randomY ? Math.random() * h : -Math.random() * 80 - 20,
        layer,
        speed: (speeds[layer] + Math.random() * 6) * (config[stateRef.current.intensity]?.speedMult || 1),
        length: lengths[layer] + Math.random() * 12,
        opacity: opacities[layer] * (0.8 + Math.random() * 0.4),
        width: widths[layer],
        tint: Math.random() < 0.3 ? 'pink' : Math.random() < 0.6 ? 'cyan' : 'white',
      }
    }

    const createGlassDrop = (w, h) => {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: 1.5 + Math.random() * 3.2,
        opacity: 0.35 + Math.random() * 0.4,
        isDripping: Math.random() < 0.2,
        dripSpeed: 0.4 + Math.random() * 0.8,
        trail: [],
        dripLength: 0,
        maxDrip: 60 + Math.random() * 160,
      }
    }

    const addSplash = (x, y) => {
      if (stateRef.current.splashes.length > 50) return
      stateRef.current.splashes.push({
        x,
        y,
        radius: 1,
        maxRadius: 6 + Math.random() * 10,
        opacity: 0.65,
        color: Math.random() < 0.4 ? 'rgba(255, 180, 215, ' : 'rgba(220, 245, 255, ',
      })
    }

    let lastTime = performance.now()

    const animate = (time) => {
      const dt = Math.min((time - lastTime) / 1000, 0.08)
      lastTime = time

      const { width: w, height: h, intensity: curIntensity } = stateRef.current
      if (curIntensity === 'off') {
        ctx.clearRect(0, 0, w, h)
        animFrameRef.current = requestAnimationFrame(animate)
        return
      }

      ctx.clearRect(0, 0, w, h)

      const curConf = config[curIntensity] || config.romantic
      const windOffset = curConf.wind

      // 1. Draw falling raindrops
      const drops = stateRef.current.drops
      for (let i = 0; i < drops.length; i++) {
        const d = drops[i]
        d.y += d.speed
        d.x += windOffset * (d.speed / 20)

        // Draw streak
        ctx.save()
        ctx.beginPath()
        const endX = d.x + windOffset * (d.length / 20)
        const endY = d.y + d.length

        const grad = ctx.createLinearGradient(d.x, d.y, endX, endY)
        if (d.tint === 'pink') {
          grad.addColorStop(0, 'rgba(255, 140, 195, 0)')
          grad.addColorStop(0.7, `rgba(255, 180, 220, ${d.opacity * 0.7})`)
          grad.addColorStop(1, `rgba(255, 255, 255, ${d.opacity})`)
        } else if (d.tint === 'cyan') {
          grad.addColorStop(0, 'rgba(120, 220, 255, 0)')
          grad.addColorStop(0.7, `rgba(160, 235, 255, ${d.opacity * 0.7})`)
          grad.addColorStop(1, `rgba(255, 255, 255, ${d.opacity})`)
        } else {
          grad.addColorStop(0, 'rgba(255, 255, 255, 0)')
          grad.addColorStop(0.7, `rgba(240, 245, 255, ${d.opacity * 0.8})`)
          grad.addColorStop(1, `rgba(255, 255, 255, ${d.opacity})`)
        }

        ctx.strokeStyle = grad
        ctx.lineWidth = d.width
        ctx.lineCap = 'round'
        ctx.moveTo(d.x, d.y)
        ctx.lineTo(endX, endY)
        ctx.stroke()
        ctx.restore()

        // Recycle drop
        if (d.y > h - 10) {
          if (Math.random() < 0.45 && d.layer >= 1) {
            addSplash(d.x, h - Math.random() * 25)
          }
          drops[i] = createDrop(w, h, false)
        }
      }

      // 2. Draw splashes
      const splashes = stateRef.current.splashes
      for (let i = splashes.length - 1; i >= 0; i--) {
        const s = splashes[i]
        s.radius += 0.8
        s.opacity -= 0.04
        if (s.opacity <= 0 || s.radius >= s.maxRadius) {
          splashes.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.beginPath()
        ctx.ellipse(s.x, s.y, s.radius * 1.8, s.radius * 0.6, 0, 0, Math.PI * 2)
        ctx.strokeStyle = `${s.color}${s.opacity})`
        ctx.lineWidth = 1
        ctx.stroke()
        ctx.restore()
      }

      // 3. Draw water droplets on the glass pane
      const glass = stateRef.current.glassDrops
      for (let i = 0; i < glass.length; i++) {
        const gd = glass[i]

        // Handle dripping down the glass
        if (gd.isDripping) {
          gd.y += gd.dripSpeed
          gd.dripLength += gd.dripSpeed

          // Keep a short wet trail
          if (Math.random() < 0.4) {
            gd.trail.push({ x: gd.x + (Math.random() - 0.5) * 0.5, y: gd.y, r: gd.r * 0.4, op: gd.opacity * 0.5 })
            if (gd.trail.length > 14) gd.trail.shift()
          }

          if (gd.dripLength > gd.maxDrip || gd.y > h + 20) {
            glass[i] = createGlassDrop(w, h)
            glass[i].y = Math.random() * (h * 0.4) // start higher
            continue
          }
        }

        // Draw trail
        for (let t = 0; t < gd.trail.length; t++) {
          const pt = gd.trail[t]
          pt.op -= 0.003
          if (pt.op > 0) {
            ctx.beginPath()
            ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(255, 255, 255, ${pt.op * 0.4})`
            ctx.fill()
          }
        }

        // Draw main glass droplet (with realistic specular highlight)
        ctx.save()
        // Base translucent body
        ctx.beginPath()
        ctx.arc(gd.x, gd.y, gd.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${gd.opacity * 0.3})`
        ctx.fill()

        // Outer soft droplet rim
        ctx.strokeStyle = `rgba(255, 255, 255, ${gd.opacity * 0.6})`
        ctx.lineWidth = 0.75
        ctx.stroke()

        // Specular highlight: white reflection glint on top-left
        ctx.beginPath()
        ctx.arc(gd.x - gd.r * 0.35, gd.y - gd.r * 0.35, gd.r * 0.35, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${gd.opacity * 0.95})`
        ctx.fill()

        // Tiny bottom refraction shadow
        ctx.beginPath()
        ctx.arc(gd.x + gd.r * 0.25, gd.y + gd.r * 0.3, gd.r * 0.3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(30, 10, 40, ${gd.opacity * 0.25})`
        ctx.fill()

        ctx.restore()
      }

      animFrameRef.current = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener('resize', resize)
    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [intensity])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-30 ${className}`}
      aria-hidden="true"
    />
  )
}
