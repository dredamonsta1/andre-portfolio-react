# CLAUDE.md — Andre Portfolio React

## Project overview
Personal portfolio site for Andre Wilkinson. Built with React 19 + Vite. Deployed on Netlify.
Live repo: `dredamonsta1/andre-portfolio-react` on GitHub, branch `main`.

## Stack
- **React 19** + **Vite 5** (not CRA)
- **CSS Modules** for all component styles
- **`@chenglou/pretext`** for DOM-free text measurement on the canvas
- **EmailJS** for the contact form
- **react-switch** for the light/dark toggle
- **use-local-storage** to persist theme choice
- **FontAwesome** for icons
- Build: `yarn build` · Dev: `yarn dev` · Preview: `yarn preview`
- Always run `yarn build` to verify before committing

## Design system — Quantum Mechanical theme
All colors come from CSS variables defined in `src/App.css`:

| Variable | Dark | Light |
|---|---|---|
| `--qm-bg` | `#050510` | `#f0f4ff` |
| `--qm-cyan` | `#00d4ff` | `#0077aa` |
| `--qm-purple` | `#7b2fff` | `#5500cc` |
| `--qm-text` | `#c8d8ff` | `#0a1030` |
| `--qm-dim` | `#4a5a8a` | `#3a4a7a` |
| `--qm-border` | `rgba(0,212,255,0.18)` | `rgba(0,100,180,0.3)` |

Dark mode is the default (`useLocalStorage("theme", "dark")`).
Always use `var(--qm-*)` tokens — never hardcode colors.
Fonts: **Space Mono** (monospace / equations / labels) and **Nunito** (body text).

## Key architectural decisions

### Canvas overlay (`PortfolioCanvas`)
- `position: fixed; pointer-events: none; z-index: 999` — sits above everything, DOM elements remain clickable through it
- A sibling transparent `<div>` at `z-index: 1000` captures clicks for the LINAC (top-left, `top: 55px`)
- Uses `document.fonts.ready.then()` to gate canvas init — ensures fonts are loaded before `ctx.measureText()`
- DPR scaling: canvas sized at `W*dpr × H*dpr`, then `ctx.scale(dpr, dpr)` — all coordinates in logical CSS pixels
- Hides the DOM `innerParagraph` (`opacity: 0`) because the canvas draws those same text elements
- **Never add `pointer-events` to the canvas itself** — it must stay `none` so DOM buttons work

### Stacking / z-index
- Canvas: `z-index: 999` (`pointer-events: none`)
- LINAC click overlay: `z-index: 1000`
- `.small-container`: `position: relative; z-index: 10`
- Nav panel: `position: fixed; z-index: 50` (right side, vertically centered)
- Resume button corner: `position: fixed; z-index: 100`
- Modal overlay: `z-index: 2000` (renders via React portal to `#modal` in `index.html`)

### Nav buttons — Quantum State Selector Panel
Fixed right-side glass panel (`position: fixed; right: 1.5rem; top: 50%; transform: translateY(-50%)`).
Each button is a quantum state: `|Intro⟩` `|Work⟩` `|About⟩` `|Contact⟩`.
Hover effect: `box-shadow: inset 3px 0 0 var(--qm-cyan)` (left accent bar — "state collapse").
On mobile (≤600px) the panel becomes a horizontal bar at the bottom center.

**Important CSS split**: button styles are spread across multiple files:
- `ModalWork.js` imports from `LandingPageModal.module.css` → uses `.work`
- `ModalIntro.js` imports from `ModalIntro.module.css` → uses `.intro`
- `ModalAbout.js` imports from `ModalAbout.module.css` → uses `.about`
- `ModalContact.js` imports from `ModalContact.module.css` → uses `.contact`

When changing button styles, update ALL four files.

### forwardRef pattern (Pdf / resume)
`Pdf.js` is a `forwardRef` component exposing `openModal()` via `useImperativeHandle`.
`App.js` holds `pdfRef` and passes `handleResumeOpen` down to `PortfolioCanvas` as `onResumeOpen`.
The canvas fires `cbRef.current?.()` (via a ref to avoid stale closures) when the LINAC projectile lands.

### LINAC particle accelerator
- Position: top-left, `y = 80px` from top, `x` from `18` to `195`
- Particle exponentially accelerates: `speed *= 1.07` per frame
- On exit → bezier arc to resume button (top-right), control point arcs upward
- After hit: spawns particles, calls `onResumeOpen`, reloads after 1s
- `fireRef.current = function fire()` is set inside `useEffect` and exposed to the click overlay div

### Canvas physics constants
```
SPRING_K = 0.08   DAMPING = 0.75
REPEL_RADIUS = 85  REPEL_STR = 5
OBSERVE_R = 80     (wave-function collapse cursor radius)
```

## Component map
```
App.js
├── PortfolioCanvas        — canvas overlay, LINAC, physics, interference
├── Pdf                    — resume button (fixed top-right) + modal
└── app-background
    └── small-container
        ├── LandingPageCircle    — profile photo + SVG orbital rings
        ├── LandigPageContainer  — name/bio/equation (hidden by canvas)
        ├── LandingPageModal     — quantum state panel (fixed right)
        │   ├── ModalIntro
        │   ├── ModalWork
        │   ├── ModalAbout
        │   └── ModalContact
        ├── bottom-bar           — light/dark toggle (ReactSwitch)
        └── LandingPageFooter    — social icons
```

Note: `LandigPageContainer` has a typo in the directory name — do not rename it (would break imports).

## QM aesthetic conventions
- Text uses Dirac notation: `|Andre Wilkinson⟩`, `|Intro⟩`, `|Work⟩`, etc.
- Schrödinger equation displayed: `iħ ∂|ψ⟩/∂t = Ĥ|ψ⟩`
- Random chars pool includes Greek/physics symbols: `ψΨħΔ∇αβγ`
- Canvas cursor effect = "wave-function collapse" (letters glow cyan when observed)
- Double-slit interference waves drawn in background at very low opacity
- SVG orbital rings (3 tilted ellipses, animated electrons) around profile photo

## What to avoid
- Do not add `pointer-events` to the canvas element
- Do not hardcode colors — always use `var(--qm-*)`
- Do not remove `document.fonts.ready` gate from canvas init
- Do not rename the `LandigPageContainer` directory (typo is intentional to preserve)
- Do not add `text-transform: uppercase` to Dirac notation buttons (breaks `|State⟩` appearance)
