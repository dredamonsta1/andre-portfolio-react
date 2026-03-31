import { useEffect, useRef, useState } from 'react'
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

const NAME = 'ANDRE WILKINSON'
const BIO = 'Fullstack trained frontend dev just enjoying learning everyday, embracing the chaos.'
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
const SPRING_K = 0.08
const DAMPING = 0.75
const REPEL_RADIUS = 85
const REPEL_STRENGTH = 5
const NAME_FONT = 'bold 28px Nunito, sans-serif'
const BIO_FONT = '13px Nunito, sans-serif'
const NAME_LINE_H = 40
const BIO_LINE_H = 20

// Catapult arm angles (canvas y-down coords)
// Loaded: arm tip pointing upper-left (cup is behind, ready to throw right)
// Released: arm tip pointing upper-right (just fired)
const ARM_LOADED   = -2.3
const ARM_RELEASED = -0.8
const ARM_LENGTH   = 50
const CW_LENGTH    = 15   // counterweight arm

function rand(a, b) { return a + Math.random() * (b - a) }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }

function bezierPoint(t, sx, sy, cpx, cpy, ex, ey) {
  const mt = 1 - t
  return {
    x: mt * mt * sx + 2 * mt * t * cpx + t * t * ex,
    y: mt * mt * sy + 2 * mt * t * cpy + t * t * ey,
  }
}

export default function PortfolioCanvas({ theme, onResumeOpen }) {
  const canvasRef   = useRef(null)
  const cbRef       = useRef(onResumeOpen)
  const themeRef    = useRef(theme)
  const mouseRef    = useRef(null)
  const rafRef      = useRef(null)
  const fireRef     = useRef(null)   // called from JSX click handler → updates canvas state
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

    // Catapult position — lower-left corner
    const CAT_PIVOT_X = 110
    const CAT_PIVOT_Y = H - 130
    const CAT_BASE_Y  = CAT_PIVOT_Y + 32

    function onMouseMove(e) { mouseRef.current = { x: e.clientX, y: e.clientY } }
    function onMouseLeave() { mouseRef.current = null }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)

    const state = {
      phase: 'scatter',
      letters: [],
      projectile: null,   // single catapult shot
      particles: [],
      frame: 0,
      catapult: {
        angle: ARM_LOADED,
        animating: false,
        animFrame: 0,
        launched: false,
        isLoaded: true,
      },
    }

    const innerPara = document.querySelector('[class*="innerParagraph"]')
    if (innerPara) {
      innerPara.style.opacity = '0'
      innerPara.style.transition = 'opacity 0.7s ease'
    }

    function textColor() {
      return themeRef.current === 'dark' ? '#ffffff' : '#000000'
    }
    function accentColor(a) {
      return themeRef.current === 'dark'
        ? `rgba(200,150,255,${a})`
        : `rgba(70,4,94,${a})`
    }

    // ── Physics ───────────────────────────────────────────────────────────────

    function applyPhysics(l, targetX, targetY) {
      l.vx += (targetX - l.x) * SPRING_K
      l.vy += (targetY - l.y) * SPRING_K

      const m = mouseRef.current
      if (m) {
        const dx   = l.x - m.x
        const dy   = l.y - m.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < REPEL_RADIUS && dist > 0.5) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH
          l.vx += (dx / dist) * force
          l.vy += (dy / dist) * force
        }
      }

      l.vx *= DAMPING
      l.vy *= DAMPING
      l.x  += l.vx
      l.y  += l.vy
    }

    // ── Letter targets ────────────────────────────────────────────────────────

    function buildLetters() {
      const container = document.querySelector('.small-container')
      if (!container) return

      const cRect   = container.getBoundingClientRect()
      const padH    = 32
      const textW   = cRect.width - padH * 2
      const textLeft = cRect.left + padH

      const para  = document.querySelector('[class*="innerParagraph"]')
      const pRect = para ? para.getBoundingClientRect() : null
      const nameStartY = pRect ? pRect.top + 48 + 28 : cRect.top + 260
      const bioStartY  = nameStartY + NAME_LINE_H + 20

      const namePrepared = prepareWithSegments(NAME, NAME_FONT)
      const { lines: nameLines } = layoutWithLines(namePrepared, textW, NAME_LINE_H)

      const bioPrepared = prepareWithSegments(BIO, BIO_FONT)
      const { lines: bioLines } = layoutWithLines(bioPrepared, textW, BIO_LINE_H)

      ctx.save()

      for (let li = 0; li < nameLines.length; li++) {
        const line  = nameLines[li]
        const lineY = nameStartY + li * NAME_LINE_H
        const lineX = textLeft + (textW - line.width) / 2
        ctx.font = NAME_FONT
        let x = lineX
        for (const char of line.text) {
          const cw = ctx.measureText(char).width
          if (char.trim()) {
            state.letters.push({
              char,
              x: rand(0, W), y: rand(-H * 0.5, H * 1.5),
              vx: rand(-12, 12), vy: rand(-12, 12),
              tx: x, ty: lineY,
              font: NAME_FONT, isName: true, alpha: 1,
              baseY: lineY, wavePhase: state.letters.length * 0.35,
            })
          }
          x += cw
        }
      }

      for (let li = 0; li < bioLines.length; li++) {
        const line  = bioLines[li]
        const lineY = bioStartY + li * BIO_LINE_H
        const lineX = textLeft + (textW - line.width) / 2
        ctx.font = BIO_FONT
        let x = lineX
        for (const char of line.text) {
          const cw = ctx.measureText(char).width
          if (char.trim()) {
            state.letters.push({
              char,
              x: rand(0, W), y: rand(-H * 0.5, H * 1.5),
              vx: rand(-7, 7), vy: rand(-7, 7),
              tx: x, ty: lineY,
              font: BIO_FONT, isName: false, alpha: 1,
              baseY: lineY, wavePhase: state.letters.length * 0.2,
            })
          }
          x += cw
        }
      }

      ctx.restore()
    }

    // ── Catapult fire (called from JSX via fireRef) ───────────────────────────

    fireRef.current = function fire() {
      const cat = state.catapult
      if (cat.animating || !cat.isLoaded) return
      cat.animating = true
      cat.animFrame = 0
      cat.launched  = false
    }

    // ── Main loop ─────────────────────────────────────────────────────────────

    function loop() {
      state.frame++
      ctx.clearRect(0, 0, W, H)

      if (state.phase === 'scatter') {
        updateScatter()
      } else {
        updateIdle()
      }

      drawLetters()
      drawCircleGlow()
      updateCatapultAnim()
      drawCatapult()
      updateProjectile()
      drawProjectile()
      drawParticles()
      updateParticles()

      rafRef.current = requestAnimationFrame(loop)
    }

    function updateScatter() {
      let settled = true
      for (const l of state.letters) {
        applyPhysics(l, l.tx, l.ty)
        if (Math.abs(l.tx - l.x) > 0.8 || Math.abs(l.ty - l.y) > 0.8) settled = false
      }
      if (settled && state.frame > 80) state.phase = 'idle'
    }

    function updateIdle() {
      for (const l of state.letters) {
        const ty = l.isName
          ? l.baseY + Math.sin(state.frame * 0.04 + l.wavePhase) * 3
          : l.ty
        applyPhysics(l, l.tx, ty)
      }
    }

    // ── Draw letters ──────────────────────────────────────────────────────────

    function drawLetters() {
      const color = textColor()
      for (const l of state.letters) {
        ctx.font     = l.font
        ctx.fillStyle = color
        ctx.fillText(l.char, l.x, l.y)
      }
    }

    // ── Circle glow ───────────────────────────────────────────────────────────

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
      const a1 = 0.4 + pulse * 0.15
      const a2 = 0.15 + pulse * 0.07

      ctx.beginPath()
      ctx.arc(cx, cy, r1, 0, Math.PI * 2)
      ctx.strokeStyle = accentColor(a1)
      ctx.lineWidth   = 2
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(cx, cy, r2, 0, Math.PI * 2)
      ctx.strokeStyle = accentColor(a2)
      ctx.lineWidth   = 1
      ctx.stroke()
    }

    // ── Catapult arm animation ────────────────────────────────────────────────

    function updateCatapultAnim() {
      const cat = state.catapult
      if (!cat.animating) return

      cat.animFrame++
      const t    = Math.min(cat.animFrame / 18, 1)
      const ease = 1 - Math.pow(1 - t, 3)          // ease-out cubic
      cat.angle  = ARM_LOADED + (ARM_RELEASED - ARM_LOADED) * ease

      // Launch letter at 55% of swing
      if (!cat.launched && cat.animFrame >= 10) {
        cat.launched = true
        launchProjectile()
      }

      if (t >= 1) {
        cat.animating = false
        cat.isLoaded  = false
        // Small bounce-back
        cat.angle = ARM_RELEASED + 0.15
      }
    }

    function launchProjectile() {
      const btn = document.querySelector('[class*="resumeButton"]')
      if (!btn) return
      const br   = btn.getBoundingClientRect()
      const endX = br.left + br.width  / 2 + rand(-10, 10)
      const endY = br.top  + br.height / 2 + rand(-5, 5)

      // Start position = arm tip at launch moment
      const angle = state.catapult.angle
      const startX = CAT_PIVOT_X + Math.cos(angle) * ARM_LENGTH
      const startY = CAT_PIVOT_Y + Math.sin(angle) * ARM_LENGTH

      state.projectile = {
        char: CHARS[Math.floor(Math.random() * CHARS.length)],
        startX, startY,
        x: startX, y: startY,
        endX, endY,
        cpX: (startX + endX) / 2 + rand(-30, 30),
        cpY: Math.min(startY, endY) - rand(30, 80),
        progress: 0,
        speed: 0.032,
        trail: [],
        done: false,
      }
    }

    // ── Projectile ────────────────────────────────────────────────────────────

    function updateProjectile() {
      const p = state.projectile
      if (!p || p.done) return

      p.trail.push({ x: p.x, y: p.y })
      if (p.trail.length > 10) p.trail.shift()

      p.progress = Math.min(p.progress + p.speed, 1)
      const pos  = bezierPoint(p.progress, p.startX, p.startY, p.cpX, p.cpY, p.endX, p.endY)
      p.x = pos.x
      p.y = pos.y

      if (p.progress >= 1) {
        p.done = true
        spawnParticles(p.endX, p.endY)
        cbRef.current?.()                         // open resume
        setTimeout(() => reloadCatapult(), 900)   // reload after short delay
      }
    }

    function drawProjectile() {
      const p = state.projectile
      if (!p || p.done) return

      const accent = themeRef.current === 'dark' ? '#c896ff' : '#46045e'
      const bright = themeRef.current === 'dark' ? '#e0b0ff' : '#5a0878'

      for (let i = 0; i < p.trail.length; i++) {
        ctx.globalAlpha = (i / p.trail.length) * 0.3
        ctx.font = '11px Nunito, sans-serif'
        ctx.fillStyle = accent
        ctx.fillText(p.char, p.trail[i].x, p.trail[i].y)
      }
      ctx.globalAlpha = 0.95
      ctx.font = '14px Nunito, sans-serif'
      ctx.fillStyle = bright
      ctx.fillText(p.char, p.x, p.y)
      ctx.globalAlpha = 1
    }

    function reloadCatapult() {
      const cat      = state.catapult
      cat.angle      = ARM_LOADED
      cat.isLoaded   = true
      cat.launched   = false
      cat.animating  = false
      cat.animFrame  = 0
      state.projectile = null
    }

    // ── Particles ─────────────────────────────────────────────────────────────

    function spawnParticles(x, y) {
      for (let i = 0; i < 7; i++) {
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
        p.x  += p.vx
        p.y  += p.vy
        p.vy += 0.18
        p.life -= 0.055
      }
      for (let i = state.particles.length - 1; i >= 0; i--) {
        if (state.particles[i].life <= 0) state.particles.splice(i, 1)
      }
    }

    function drawParticles() {
      const accent = themeRef.current === 'dark' ? '#e0b0ff' : '#46045e'
      for (const p of state.particles) {
        ctx.globalAlpha = Math.max(0, p.life)
        ctx.font = '10px Nunito, sans-serif'
        ctx.fillStyle = accent
        ctx.fillText(p.char, p.x, p.y)
      }
      ctx.globalAlpha = 1
    }

    // ── Catapult drawing ──────────────────────────────────────────────────────

    function drawCatapult() {
      const cat    = state.catapult
      const angle  = cat.angle
      const pivotX = CAT_PIVOT_X
      const pivotY = CAT_PIVOT_Y
      const baseY  = CAT_BASE_Y

      const tipX = pivotX + Math.cos(angle) * ARM_LENGTH
      const tipY = pivotY + Math.sin(angle) * ARM_LENGTH
      const cwX  = pivotX - Math.cos(angle) * CW_LENGTH
      const cwY  = pivotY - Math.sin(angle) * CW_LENGTH

      const color = textColor()
      ctx.save()
      ctx.strokeStyle = color
      ctx.fillStyle   = color
      ctx.lineWidth   = 2
      ctx.lineCap     = 'round'

      // Base
      ctx.beginPath()
      ctx.moveTo(pivotX - 36, baseY)
      ctx.lineTo(pivotX + 36, baseY)
      ctx.stroke()

      // Wheels
      ctx.lineWidth = 1.5
      ;[pivotX - 28, pivotX + 28].forEach(wx => {
        ctx.beginPath()
        ctx.arc(wx, baseY, 5, 0, Math.PI * 2)
        ctx.stroke()
        // Spokes
        ctx.beginPath()
        ctx.moveTo(wx - 4, baseY); ctx.lineTo(wx + 4, baseY)
        ctx.moveTo(wx, baseY - 4); ctx.lineTo(wx, baseY + 4)
        ctx.stroke()
      })

      // Frame legs (angled uprights to pivot)
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(pivotX - 20, baseY)
      ctx.lineTo(pivotX - 4, pivotY + 4)
      ctx.moveTo(pivotX + 20, baseY)
      ctx.lineTo(pivotX + 4, pivotY + 4)
      ctx.stroke()

      // Arm (counterweight end → tip)
      ctx.lineWidth = 2.5
      ctx.beginPath()
      ctx.moveTo(cwX, cwY)
      ctx.lineTo(tipX, tipY)
      ctx.stroke()

      // Pivot dot
      ctx.beginPath()
      ctx.arc(pivotX, pivotY, 4, 0, Math.PI * 2)
      ctx.fill()

      // Counterweight box
      ctx.fillRect(cwX - 5, cwY - 5, 10, 10)

      // Cup at tip (small half-circle opening away from arm)
      ctx.lineWidth = 1.5
      ctx.beginPath()
      const cupOpen = angle + Math.PI / 2
      ctx.arc(tipX, tipY, 6, cupOpen, cupOpen + Math.PI)
      ctx.stroke()

      // Letter sitting in cup (when loaded)
      if (cat.isLoaded && !cat.launched) {
        ctx.font = 'bold 11px Nunito, sans-serif'
        ctx.fillStyle = accentColor(1)
        ctx.textAlign = 'center'
        ctx.fillText('R', tipX, tipY - 3)
        ctx.textAlign = 'left'
      }

      // Pulsing "click to open resume" label below catapult
      if (cat.isLoaded) {
        const pulse = 0.6 + Math.sin(state.frame * 0.07) * 0.4
        ctx.globalAlpha = pulse
        ctx.font = '10px Nunito, sans-serif'
        ctx.fillStyle = color
        ctx.textAlign = 'center'
        ctx.fillText('click to open resume', pivotX, baseY + 18)
        ctx.textAlign = 'left'
        ctx.globalAlpha = 1
      }

      ctx.restore()
    }

    // ── Boot ──────────────────────────────────────────────────────────────────

    document.fonts.ready.then(() => {
      buildLetters()
      rafRef.current = requestAnimationFrame(loop)
      setReady(true)
    })

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      const para = document.querySelector('[class*="innerParagraph"]')
      if (para) para.style.opacity = '1'
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── JSX ───────────────────────────────────────────────────────────────────

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 999 }}
      />
      {/* Transparent click target over the catapult drawing */}
      {ready && (
        <div
          onClick={() => fireRef.current?.()}
          title="Launch!"
          style={{
            position: 'fixed',
            // matches CAT_PIVOT_X = 110, click area ~80px wide centered on pivot
            left: '70px',
            bottom: '70px',
            width: '80px',
            height: '110px',
            cursor: 'crosshair',
            zIndex: 1000,
          }}
        />
      )}
    </>
  )
}
