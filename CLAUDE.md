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


# andrewilkinson.com — Portfolio Site Context

## Tech Stack
- Vite + React + TypeScript
- Deployed on Netlify

## Design System — Quantum Theme

### Fonts
- **Space Mono** — monospace, used for code/technical elements
- **Nunito** — primary UI font (weights: 200, 300, 400)
- **Lato** — secondary (weights: 100, 300, 400, 700)

### Color Palette (Dark Mode default)
| Token          | Value                   | Role                    |
| -------------- | ----------------------- | ----------------------- |
| `--qm-bg`      | `#050510`               | Main background         |
| `--qm-bg2`     | `#0a0a1e`               | Secondary background    |
| `--qm-surface` | `#0d1030`               | Surface/card background |
| `--qm-border`  | `rgba(0,212,255,0.18)`  | Borders                 |
| `--qm-cyan`    | `#00d4ff`               | Primary accent          |
| `--qm-purple`  | `#7b2fff`               | Secondary accent        |
| `--qm-green`   | `#00ff88`               | Tertiary accent         |
| `--qm-text`    | `#c8d8ff`               | Primary text            |
| `--qm-dim`     | `#4a5a8a`               | Muted/dim text          |
| `--qm-glow-c`  | `rgba(0,212,255,0.18)`  | Cyan glow               |
| `--qm-glow-p`  | `rgba(123,47,255,0.18)` | Purple glow             |

Light mode variants exist under `[data-theme="light"]` — cyan shifts to `#0077aa`, purple to `#5500cc`, bg to `#f0f4ff`.

### Theme
Deep space / quantum physics aesthetic. Dark near-black backgrounds, electric cyan and purple accents, soft blue-tinted text. Feels like CERN visualization software or a physics simulation interface.

## Layout (Desktop)

```
[ Nav buttons (right) ]
[ Particle accelerator (left) ] [ Name + Pretext message (center) ] [ Resume button (right) ]
[ Photo of Andre ]
[ Socials ]
[ Footer ]
```

- **Center**: Name displayed prominently, tagline/message rendered with Pretext (text animation library)
- **Left of center**: Photo of Andre + particle accelerator animation that shoots toward the resume button
- **Right side**: Nav buttons (vertical), Resume button (opens PDF) — target of the particle accelerator animation
- **Bottom**: Social icons, footer
- **Resume corner**: Fixed position, top-right (`position: fixed; top: 1rem; right: 1.5rem`)
- **Small container**: `600px` wide, centered, `z-index: 10`, holds core content

## Planned Addition — NASA API Integration

### Goal
Add a NASA live feed or imagery display to the site. Candidate APIs:
- **APOD** (Astronomy Picture of the Day) — simplest, daily image/video, clean JSON
- **EPIC** — near-real-time Earth imagery from DSCOVR satellite, visually striking
- **NeoWS** — Near Earth Object data, asteroid proximity, good for data visualization
- **DONKI** — Space weather (solar flares, geomagnetic storms)

### Placement
To be decided — either left or right side of the site where screen-like open space exists. Thematically consistent with the quantum/space aesthetic.

### Docker Goal
The NASA integration will be containerized (Node or FastAPI proxy backend to keep API key server-side + frontend service) as a Docker Compose project — serves as a portfolio piece demonstrating containerization for job applications (particularly Runpod).

### Style Guidelines for NASA Component
- Match `--qm-bg` / `--qm-surface` backgrounds
- Use `--qm-cyan` and `--qm-border` for borders/frames
- Consider CRT scanline or terminal-style frame around imagery
- Circular "viewport" frame works well for EPIC Earth feed
- Font: Space Mono for any data labels, Nunito for UI text
- Glow effects using `--qm-glow-c` or `--qm-glow-p` on borders

- The screen element will embed a live containerized Galaga game via noVNC iframe (see Galaga repo CLAUDE.md for container details)