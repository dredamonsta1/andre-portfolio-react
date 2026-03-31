import { useEffect, useRef, useState } from 'react'
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

const NAME  = '|ANDRE WILKINSON\u27E9'  // ⟩ = U+27E9
const BIO   = 'Fullstack trained frontend dev just enjoying learning everyday, embracing the chaos.'
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*\u03C8\u03A8\u0127\u0394\u2207\u03B1\u03B2\u03B3'

const SPRING_K      = 0.08
const DAMPING       = 0.75
const REPEL_RADIUS  = 85
const REPEL_STR     = 5
const OBSERVE_R     = 80   // wave-function collapse radius

// Drag / chain-string physics
const DRAG_HIT_R   = 22   // px radius to grab a letter
const CHAIN_K      = 0.28  // spring strength toward dragged letter
const CHAIN_DECAY  = 0.50  // falloff multiplier per chain step
const CHAIN_REACH  = 6    // max letters in chain

const NAME_FONT   = 'bold 24px Nunito, sans-serif'
const BIO_FONT    = '12px Nunito, sans-serif'
const EQ_FONT     = '11px Space Mono, monospace'
const NAME_LINE_H = 36
const BIO_LINE_H  = 18

// Particle accelerator (linear accelerator / linac) constants
const LINAC_LEFT  = 18
const LINAC_RIGHT = 195
const LINAC_Y     = 80     // fixed distance from top of screen
const LINAC_H     = 14     // rail gap
const COIL_COUNT  = 6

function rand(a, b)  { return a + Math.random() * (b - a) }

function bezierPoint(t, sx, sy, cpx, cpy, ex, ey) {
  const mt = 1 - t
  return {
    x: mt*mt*sx + 2*mt*t*cpx + t*t*ex,
    y: mt*mt*sy + 2*mt*t*cpy + t*t*ey,
  }
}

// Linearly interpolate between two RGB arrays
function lerpRgb(c1, c2, t) {
  return [
    Math.round(c1[0] + (c2[0]-c1[0])*t),
    Math.round(c1[1] + (c2[1]-c1[1])*t),
    Math.round(c1[2] + (c2[2]-c1[2])*t),
  ]
}

export default function PortfolioCanvas({ theme, onResumeOpen }) {
  const canvasRef  = useRef(null)
  const cbRef      = useRef(onResumeOpen)
  const themeRef   = useRef(theme)
  const mouseRef   = useRef(null)
  const rafRef     = useRef(null)
  const fireRef    = useRef(null)
  const dragRef    = useRef({ active: false, idx: -1 })
  const [ready, setReady] = useState(false)

  useEffect(() => { cbRef.current = onResumeOpen })
  useEffect(() => { themeRef.current = theme }, [theme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1
    const W   = window.innerWidth
    const H   = window.innerHeight
    canvas.width  = W * dpr
    canvas.height = H * dpr
    canvas.style.width  = W + 'px'
    canvas.style.height = H + 'px'

    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)

    // Linac position (top-left)
    const LINAC_Y_TOP = LINAC_Y - LINAC_H / 2
    const LINAC_Y_BOT = LINAC_Y + LINAC_H / 2
    const COIL_STEP   = (LINAC_RIGHT - LINAC_LEFT) / (COIL_COUNT + 1)

    function onMouseMove(e) { mouseRef.current = { x: e.clientX, y: e.clientY } }
    function onMouseLeave() {
      mouseRef.current = null
      onMouseUp()
    }

    function onMouseDown(e) {
      if (e.button !== 0 || state.phase !== 'idle') return
      if (e.target.closest('button, a, [role="button"], input, label, select')) return
      const mx = e.clientX, my = e.clientY
      let best = -1, bestD = DRAG_HIT_R
      for (let i = 0; i < state.letters.length; i++) {
        const l = state.letters[i]
        const d = Math.hypot(l.x - mx, l.y - my)
        if (d < bestD) { bestD = d; best = i }
      }
      if (best !== -1) {
        dragRef.current = { active: true, idx: best }
        state.letters[best].dragging = true
        document.body.style.cursor = 'grabbing'
      }
    }

    function onMouseUp() {
      if (dragRef.current.active) {
        const { idx } = dragRef.current
        if (state.letters[idx]) state.letters[idx].dragging = false
        dragRef.current = { active: false, idx: -1 }
        document.body.style.cursor = ''
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    const state = {
      phase: 'scatter',
      letters: [],
      projectile: null,
      particles: [],
      frame: 0,
      schroY: 0,
      centerX: W / 2,
      linac: {
        ready: true,
        inTube: false,
        particleX: LINAC_LEFT,
        particleSpeed: 0,
        char: 'e',
        launched: false,
      },
    }

    // Hide DOM text — canvas draws it
    const innerPara = document.querySelector('[class*="innerParagraph"]')
    if (innerPara) {
      innerPara.style.opacity = '0'
      innerPara.style.transition = 'opacity 0.7s ease'
    }

    // ── Color helpers ──────────────────────────────────────────────────────

    function textRgb() {
      return themeRef.current === 'dark' ? [200, 216, 255] : [10, 16, 48]
    }

    function textColor() {
      const [r,g,b] = textRgb()
      return `rgb(${r},${g},${b})`
    }

    function cyanColor(a) {
      return themeRef.current === 'dark'
        ? `rgba(0,212,255,${a})`
        : `rgba(0,119,170,${a})`
    }

    function cyanRgb() {
      return themeRef.current === 'dark' ? [0,212,255] : [0,119,170]
    }

    function purpleColor(a) {
      return themeRef.current === 'dark'
        ? `rgba(123,47,255,${a})`
        : `rgba(85,0,204,${a})`
    }

    // ── Physics ────────────────────────────────────────────────────────────

    function applyPhysics(l, targetX, targetY) {
      l.vx += (targetX - l.x) * SPRING_K
      l.vy += (targetY - l.y) * SPRING_K

      const m = mouseRef.current
      if (m) {
        const dx   = l.x - m.x
        const dy   = l.y - m.y
        const dist = Math.sqrt(dx*dx + dy*dy)
        if (dist < REPEL_RADIUS && dist > 0.5) {
          const f = (1 - dist / REPEL_RADIUS) * REPEL_STR
          l.vx += (dx / dist) * f
          l.vy += (dy / dist) * f
        }
      }

      l.vx *= DAMPING
      l.vy *= DAMPING
      l.x  += l.vx
      l.y  += l.vy
    }

    // ── Build letter targets ───────────────────────────────────────────────

    function buildLetters() {
      const container = document.querySelector('.small-container')
      if (!container) return

      const cRect    = container.getBoundingClientRect()
      const padH     = 32
      const textW    = cRect.width - padH * 2
      const textLeft = cRect.left + padH

      const para  = document.querySelector('[class*="innerParagraph"]')
      const pRect = para ? para.getBoundingClientRect() : null
      const nameY = pRect ? pRect.top + 40 + 24 : cRect.top + 260
      const bioY  = nameY + NAME_LINE_H + 16

      const namePrepared = prepareWithSegments(NAME, NAME_FONT)
      const { lines: nameLines } = layoutWithLines(namePrepared, textW, NAME_LINE_H)

      const bioPrepared = prepareWithSegments(BIO, BIO_FONT)
      const { lines: bioLines } = layoutWithLines(bioPrepared, textW, BIO_LINE_H)

      ctx.save()

      // Name
      for (let li = 0; li < nameLines.length; li++) {
        const line  = nameLines[li]
        const ly    = nameY + li * NAME_LINE_H
        const lineX = textLeft + (textW - line.width) / 2
        ctx.font = NAME_FONT
        let x = lineX
        for (const char of line.text) {
          const cw = ctx.measureText(char).width
          if (char.trim()) {
            state.letters.push({
              char, x: rand(0, W), y: rand(-H*.5, H*1.5),
              vx: rand(-12,12), vy: rand(-12,12),
              tx: x, ty: ly,
              font: NAME_FONT, isName: true,
              alpha: 1, baseY: ly,
              wavePhase: state.letters.length * 0.35,
              dragging: false,
            })
          }
          x += cw
        }
      }

      // Bio
      for (let li = 0; li < bioLines.length; li++) {
        const line  = bioLines[li]
        const ly    = bioY + li * BIO_LINE_H
        const lineX = textLeft + (textW - line.width) / 2
        ctx.font = BIO_FONT
        let x = lineX
        for (const char of line.text) {
          const cw = ctx.measureText(char).width
          if (char.trim()) {
            state.letters.push({
              char, x: rand(0, W), y: rand(-H*.5, H*1.5),
              vx: rand(-7,7), vy: rand(-7,7),
              tx: x, ty: ly,
              font: BIO_FONT, isName: false,
              alpha: 1, baseY: ly,
              wavePhase: state.letters.length * 0.2,
              dragging: false,
            })
          }
          x += cw
        }
      }

      // Store position for Schrödinger equation (drawn after scatter)
      state.schroY  = bioY + bioLines.length * BIO_LINE_H + 18
      state.centerX = textLeft + textW / 2

      ctx.restore()
    }

    // ── Main loop ──────────────────────────────────────────────────────────

    function loop() {
      state.frame++
      ctx.clearRect(0, 0, W, H)

      // Background interference waves
      drawInterference()

      if (state.phase === 'scatter') {
        updateScatter()
      } else {
        updateIdle()
      }

      drawObservationIndicator()
      drawLetters()

      if (state.phase !== 'scatter') {
        drawSchrodinger()
      }

      drawCircleGlow()
      updateLinacAnim()
      drawLinac()
      updateProjectile()
      drawProjectile()
      drawParticles()
      updateParticles()

      rafRef.current = requestAnimationFrame(loop)
    }

    // ── Interference background ────────────────────────────────────────────

    function drawInterference() {
      const s1 = { x: W * 0.04, y: H * 0.43 }
      const s2 = { x: W * 0.04, y: H * 0.57 }
      const wl = 90
      const speed = 0.5
      const off = (state.frame * speed) % wl

      ctx.save()
      for (let r = off; r < W * 1.5; r += wl) {
        ctx.lineWidth = 0.5

        ctx.beginPath()
        ctx.arc(s1.x, s1.y, r, 0, Math.PI * 2)
        ctx.strokeStyle = cyanColor(0.022)
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(s2.x, s2.y, r, 0, Math.PI * 2)
        ctx.strokeStyle = purpleColor(0.018)
        ctx.stroke()
      }
      ctx.restore()
    }

    // ── Observation indicator ──────────────────────────────────────────────

    function drawObservationIndicator() {
      const m = mouseRef.current
      if (!m) return
      ctx.beginPath()
      ctx.arc(m.x, m.y, OBSERVE_R, 0, Math.PI * 2)
      ctx.strokeStyle = cyanColor(0.07)
      ctx.lineWidth = 1
      ctx.setLineDash([4, 6])
      ctx.stroke()
      ctx.setLineDash([])

      ctx.beginPath()
      ctx.arc(m.x, m.y, 2, 0, Math.PI * 2)
      ctx.fillStyle = cyanColor(0.35)
      ctx.fill()
    }

    // ── Scatter update ─────────────────────────────────────────────────────

    function updateScatter() {
      let settled = true
      for (const l of state.letters) {
        applyPhysics(l, l.tx, l.ty)
        if (Math.abs(l.tx - l.x) > 0.8 || Math.abs(l.ty - l.y) > 0.8) settled = false
      }
      if (settled && state.frame > 80) state.phase = 'idle'
    }

    // ── Idle update (wave + physics + drag chain) ─────────────────────────

    function updateIdle() {
      const dragIdx = dragRef.current.active ? dragRef.current.idx : -1

      for (let i = 0; i < state.letters.length; i++) {
        const l = state.letters[i]

        // Dragged letter snaps to cursor
        if (l.dragging) {
          const m = mouseRef.current
          if (m) {
            l.x += (m.x - l.x) * 0.45
            l.y += (m.y - l.y) * 0.45
            l.vx = 0
            l.vy = 0
          }
          continue
        }

        // Chain pull: spring toward dragged letter, strength decays per step
        if (dragIdx >= 0) {
          const chainDist = Math.abs(i - dragIdx)
          if (chainDist > 0 && chainDist <= CHAIN_REACH) {
            const dragged = state.letters[dragIdx]
            const f = CHAIN_K * Math.pow(CHAIN_DECAY, chainDist - 1)
            l.vx += (dragged.x - l.x) * f
            l.vy += (dragged.y - l.y) * f
          }
        }

        const ty = l.isName
          ? l.baseY + Math.sin(state.frame * 0.04 + l.wavePhase) * 3
          : l.ty
        applyPhysics(l, l.tx, ty)
      }
    }

    // ── Draw letters with wave-function collapse glow ──────────────────────

    function drawLetters() {
      const m      = mouseRef.current
      const tRgb   = textRgb()
      const cRgb   = cyanRgb()

      for (const l of state.letters) {
        let color = textColor()

        if (m) {
          const dx   = l.x - m.x
          const dy   = l.y - m.y
          const dist = Math.sqrt(dx*dx + dy*dy)
          if (dist < OBSERVE_R) {
            const t   = (1 - dist / OBSERVE_R) * 0.75
            const rgb = lerpRgb(tRgb, cRgb, t)
            color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`

            // Glow — wave-function collapse effect
            ctx.shadowColor = cyanColor(0.8)
            ctx.shadowBlur  = 10 * (1 - dist / OBSERVE_R)
          }
        }

        ctx.font      = l.font
        ctx.fillStyle = color
        ctx.fillText(l.char, l.x, l.y)
        ctx.shadowBlur = 0
      }
    }

    // ── Schrödinger equation ───────────────────────────────────────────────

    function drawSchrodinger() {
      ctx.save()
      ctx.font      = EQ_FONT
      ctx.fillStyle = cyanColor(0.35)
      ctx.textAlign = 'center'
      ctx.fillText('i\u0127 \u2202|\u03C8\u27E9/\u2202t = \u0124|\u03C8\u27E9', state.centerX, state.schroY)
      ctx.textAlign = 'left'
      ctx.restore()
    }

    // ── Circle glow ────────────────────────────────────────────────────────

    function drawCircleGlow() {
      const el = document.querySelector('[class*="circle"]')
      if (!el) return
      const r      = el.getBoundingClientRect()
      const cx     = r.left + r.width  / 2
      const cy     = r.top  + r.height / 2
      const radius = r.width / 2
      const pulse  = Math.sin(state.frame * 0.05)

      const r1 = radius + 10 + pulse * 6
      const r2 = r1 + 14 + Math.sin(state.frame * 0.03) * 4

      ctx.beginPath()
      ctx.arc(cx, cy, r1, 0, Math.PI * 2)
      ctx.strokeStyle = cyanColor(0.4 + pulse * 0.15)
      ctx.lineWidth   = 1.5
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(cx, cy, r2, 0, Math.PI * 2)
      ctx.strokeStyle = purpleColor(0.18 + pulse * 0.07)
      ctx.lineWidth   = 1
      ctx.stroke()
    }

    // ── Linac (particle accelerator) ───────────────────────────────────────

    fireRef.current = function fire() {
      const l = state.linac
      if (!l.ready || l.inTube) return
      l.ready        = false
      l.inTube       = true
      l.particleX    = LINAC_LEFT
      l.particleSpeed = 0.6
      l.char         = CHARS[Math.floor(Math.random() * CHARS.length)]
      l.launched     = false
    }

    function updateLinacAnim() {
      const l = state.linac
      if (!l.inTube) return

      l.particleSpeed *= 1.07
      l.particleX     += l.particleSpeed

      if (l.particleX >= LINAC_RIGHT) {
        l.inTube   = false
        l.launched = true
        launchProjectile(LINAC_RIGHT + 10, LINAC_Y)
      }
    }

    function drawLinac() {
      const l   = state.linac
      const yT  = LINAC_Y_TOP
      const yB  = LINAC_Y_BOT
      const cy  = LINAC_Y

      ctx.save()

      // Rails
      ctx.strokeStyle = cyanColor(0.55)
      ctx.lineWidth   = 1.5

      ctx.beginPath()
      ctx.moveTo(LINAC_LEFT, yT)
      ctx.lineTo(LINAC_RIGHT, yT)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(LINAC_LEFT, yB)
      ctx.lineTo(LINAC_RIGHT, yB)
      ctx.stroke()

      // Nozzle tip
      ctx.beginPath()
      ctx.moveTo(LINAC_RIGHT,    yT - 4)
      ctx.lineTo(LINAC_RIGHT + 12, cy)
      ctx.lineTo(LINAC_RIGHT,    yB + 4)
      ctx.stroke()

      // Acceleration coils
      for (let i = 1; i <= COIL_COUNT; i++) {
        const cx = LINAC_LEFT + i * COIL_STEP
        const isActive = l.inTube && l.particleX > cx - 5 && l.particleX <= cx + 10
        ctx.strokeStyle = cyanColor(isActive ? 0.95 : 0.3)
        ctx.lineWidth   = isActive ? 2.5 : 1.5

        if (isActive) {
          ctx.shadowColor = cyanColor(1)
          ctx.shadowBlur  = 8
        }

        ctx.beginPath()
        ctx.moveTo(cx, yT - 7)
        ctx.lineTo(cx, yB + 7)
        ctx.stroke()
        ctx.shadowBlur = 0
      }

      // Particle in tube
      if (l.inTube) {
        const px       = l.particleX
        const progress = (px - LINAC_LEFT) / (LINAC_RIGHT - LINAC_LEFT)
        const gr       = ctx.createRadialGradient(px, cy, 0, px, cy, 5 + progress * 5)
        gr.addColorStop(0, 'rgba(0,212,255,1)')
        gr.addColorStop(1, 'rgba(0,212,255,0)')
        ctx.beginPath()
        ctx.arc(px, cy, 4 + progress * 4, 0, Math.PI * 2)
        ctx.fillStyle  = gr
        ctx.shadowColor = 'rgba(0,212,255,0.9)'
        ctx.shadowBlur  = 12
        ctx.fill()
        ctx.shadowBlur = 0

        ctx.font      = 'bold 8px Nunito, sans-serif'
        ctx.fillStyle = '#ffffff'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(l.char, px, cy)
        ctx.textBaseline = 'alphabetic'
        ctx.textAlign    = 'left'
      }

      // Labels
      const pulse    = 0.55 + Math.sin(state.frame * 0.07) * 0.45
      const midX     = (LINAC_LEFT + LINAC_RIGHT) / 2

      ctx.globalAlpha = l.ready ? pulse : 0.25
      ctx.font        = 'bold 9px Space Mono, monospace'
      ctx.fillStyle   = cyanColor(1)
      ctx.textAlign   = 'center'
      ctx.fillText('[ LINAC ]', midX, LINAC_Y_BOT + 15)

      ctx.globalAlpha = l.ready ? (pulse * 0.85) : 0.2
      ctx.font        = '9px Nunito, sans-serif'
      ctx.fillStyle   = textColor()
      ctx.fillText(l.ready ? 'click to accelerate' : '...charging', midX, LINAC_Y_BOT + 27)
      ctx.textAlign   = 'left'
      ctx.globalAlpha = 1

      ctx.restore()
    }

    // ── Projectile ─────────────────────────────────────────────────────────

    function launchProjectile(startX, startY) {
      const btn = document.querySelector('[class*="resumeButton"]')
      if (!btn) return
      const br   = btn.getBoundingClientRect()
      const endX = br.left + br.width  / 2 + rand(-10, 10)
      const endY = br.top  + br.height / 2 + rand(-5, 5)

      state.projectile = {
        char: CHARS[Math.floor(Math.random() * CHARS.length)],
        startX, startY,
        x: startX, y: startY,
        endX, endY,
        cpX: (startX + endX) / 2 + rand(-40, 40),
        cpY: (startY + endY) / 2 - rand(30, 80),
        progress: 0,
        speed: 0.028,
        trail: [],
        done: false,
      }
    }

    function updateProjectile() {
      const p = state.projectile
      if (!p || p.done) return

      p.trail.push({ x: p.x, y: p.y })
      if (p.trail.length > 12) p.trail.shift()

      p.progress = Math.min(p.progress + p.speed, 1)
      const pos  = bezierPoint(p.progress, p.startX, p.startY, p.cpX, p.cpY, p.endX, p.endY)
      p.x = pos.x
      p.y = pos.y

      if (p.progress >= 1) {
        p.done = true
        spawnParticles(p.endX, p.endY)
        cbRef.current?.()
        setTimeout(() => reloadLinac(), 1000)
      }
    }

    function drawProjectile() {
      const p = state.projectile
      if (!p || p.done) return

      for (let i = 0; i < p.trail.length; i++) {
        ctx.globalAlpha = (i / p.trail.length) * 0.35
        ctx.font        = '10px Nunito, sans-serif'
        ctx.fillStyle   = cyanColor(1)
        ctx.fillText(p.char, p.trail[i].x, p.trail[i].y)
      }

      ctx.globalAlpha  = 1
      ctx.font         = '13px Nunito, sans-serif'
      ctx.fillStyle    = cyanColor(1)
      ctx.shadowColor  = cyanColor(1)
      ctx.shadowBlur   = 10
      ctx.fillText(p.char, p.x, p.y)
      ctx.shadowBlur   = 0
    }

    function reloadLinac() {
      const l   = state.linac
      l.ready   = true
      l.inTube  = false
      l.launched = false
      state.projectile = null
    }

    // ── Particles ──────────────────────────────────────────────────────────

    function spawnParticles(x, y) {
      for (let i = 0; i < 8; i++) {
        const angle = rand(0, Math.PI * 2)
        const speed = rand(1.5, 5)
        state.particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          char: CHARS[Math.floor(Math.random() * CHARS.length)],
          life: 1,
        })
      }
    }

    function updateParticles() {
      for (const p of state.particles) {
        p.x += p.vx; p.y += p.vy
        p.vy += 0.18
        p.life -= 0.05
      }
      for (let i = state.particles.length - 1; i >= 0; i--) {
        if (state.particles[i].life <= 0) state.particles.splice(i, 1)
      }
    }

    function drawParticles() {
      for (const p of state.particles) {
        ctx.globalAlpha = Math.max(0, p.life)
        ctx.font        = '10px Nunito, sans-serif'
        ctx.fillStyle   = cyanColor(1)
        ctx.shadowColor = cyanColor(0.8)
        ctx.shadowBlur  = 6
        ctx.fillText(p.char, p.x, p.y)
        ctx.shadowBlur  = 0
      }
      ctx.globalAlpha = 1
    }

    // ── Boot ───────────────────────────────────────────────────────────────

    document.fonts.ready.then(() => {
      buildLetters()
      rafRef.current = requestAnimationFrame(loop)
      setReady(true)
    })

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      dragRef.current = { active: false, idx: -1 }
      document.body.style.cursor = ''
      const para = document.querySelector('[class*="innerParagraph"]')
      if (para) para.style.opacity = '1'
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 999 }}
      />
      {ready && (
        <div
          onClick={() => fireRef.current?.()}
          title="Accelerate particle"
          style={{
            position: 'fixed',
            left: '10px',
            top: '55px',
            width: '210px',
            height: '65px',
            cursor: 'crosshair',
            zIndex: 1000,
          }}
        />
      )}
    </>
  )
}
