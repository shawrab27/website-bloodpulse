# Changelog — BloodPulse Website

All notable changes to the BloodPulse website codebase are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]
### Planned
- **Phase 3**: Implementation of Scene 04 (witness butterfly) and Scene 05 (device elevation).
- **Phase 4**: Implementation of Scene 06 through Scene 09 (national map, matching, standby fail-safe).
- **Phase 5**: Implementation of Scene 10 (revival) and Scene 11 (19 Flutter app screens & 6 features).
- **Phase 6**: Implementation of Scene 12 (swarm convergence, logo lockup, footer CTAs).
- **Phase 7**: Responsive tablet and mobile layouts, strict node capping, reduced-motion audit.
- **Phase 8**: Production performance audit, cross-browser verification, and Nginx deployment pipeline.

---

## [0.3.0] - Phase 2: Scenes 1 to 3 (Normalcy, Accident & Aftermath)
### Added
- **Vector Ambulance Asset (`src/assets/svg/ambulance.svg`)**:
  - High-contrast flat vector facing right with maroon body (`#4A1A22`), crimson stripe (`#C30121`), white star-of-life, windows, wheels, and red siren dome group (`#siren`) (< 3.5 KB).
- **Persistent Floating CTA**:
  - Fixed "Open Web App" pill anchored at top-right (`.floating-cta`), independent of timeline scroll scrub.
- **Modular Scene 01 (`src/scenes/scene01.js`, label 's1')**:
  - Butterfly 1 at canvas center `(960, 540)` in gentle idle flight.
  - Centered Georgia title "BloodPulse" and 3 download/action buttons near bottom.
  - Buttons and title fade out smoothly on initial scroll (`opacity: 0`).
  - Butterfly 1 begins descending toward street level as ground line appears.
- **Modular Scene 02 (`src/scenes/scene02.js`, label 's2')**:
  - Soft grey-pink street atmosphere with ground line at `y=900`.
  - Ambulance accelerates in from stage left (`x < 0`) with pulsing red siren light.
  - Collision at `s2+=0.65`: impact flash aura, butterfly tilts/rotates and gets pushed forward before falling to the ground.
- **Modular Scene 03 (`src/scenes/scene03.js`, label 's3')**:
  - Ambulance continues driving and exits off-stage to the right (`x > 1920`).
  - Butterfly 1 settles onto ground in bottom-left area (`x: 360, y: 885`), tilted, in 'injured' mode.
  - 'Injured' mode: slow weak spasms, wings NEVER fully stop, no scroll-speed boost.
  - Bidirectional scrub support: scrolling back past impact restores 'normal' flight.
  - Final frame of Scene 3 forms the exact calm street starting frame for Scene 4.

---

## [0.2.0] - Phase 1: Butterfly Kinematics & Wing Engine
### Added
- **Articulated Vector Butterfly Asset (`src/assets/svg/butterfly.svg`)**:
  - Precision vector model with crimson wings (`#C30121`), maroon body/thorax (`#4A1A22`), antennae, and wing accents (< 3 KB).
  - Independent left and right wing groups pivoted on central body axis (`0px 0px`).
- **Velocity-Coupled Wing Engine (`src/engine/wings.js`)**:
  - Single shared `gsap.ticker` callback driving all butterfly wing cycles.
  - Flapping animation using `scaleX` only (strictly transform, no filters/3D).
  - Velocity coupling using `lenis.velocity` as primary input with responsive lerp smoothing (`timeScale: 0.3` idle to `1.8` peak).
  - Smooth damping return to idle when scrolling stops (decay half-life ~0.2s).
  - State management (`normal` vs `injured` faint spasms).
  - Continuous gentle idle float (y & rotation drift, transform only).
- **Stage Integration & Test Scene**:
  - Mounted Butterfly 1 at canvas center `(960, 540)` in `index.html`.
  - Phase 1 test scene: Butterfly 1 moves slowly downward during first 10% of scroll.
  - Debug HUD telemetry: added live `Wings: X.XXx` timeScale readout.
  - Full respect for `prefers-reduced-motion` (locks at 0.3x without velocity acceleration).

---

## [0.1.0] - Phase 0: Project Setup & Core Scaffolding
### Added
- **Vite & Vanilla JS Core**: Modular development and static bundling setup.
- **GSAP & Lenis Integration**:
  - `src/engine/scroll.js`: Smooth scroll driven by Lenis and synchronized with GSAP ScrollTrigger ticker (`lagSmoothing(0)`).
  - `src/engine/timeline.js`: One global paused master timeline with 9 scene labels (`s1`..`s9`) scrubbed across 1200vh total height.
  - `src/engine/device.js`: Viewport letterbox scaling (`Math.min(vw/1920, vh/1080)`) and responsive breakpoints (`desktop`, `tablet`, `mobile`).
  - `src/engine/hud.js`: In-browser performance HUD toggled by key <kbd>D</kbd> displaying scroll progress, current label, real-time FPS, and velocity.
- **Design System Tokens (`tokens.css`)**:
  - Palette tokens: `--bg: #FFF8F7`, `--primary: #C30121`, `--maroon: #4A1A22`, `--grey: #B5B0AE`.
  - Typography: Georgia (headings) and Inter (body) with system fallbacks.
  - Spacing scale (`--space-3xs` through `--space-3xl`) and z-index scale.
- **Stage & Letterboxed Canvas (`stage.css`, `index.html`)**:
  - Pinned $1920 \times 1080$ design stage centered via CSS transform scale.
  - SVG stage configured with `viewBox="0 0 1920 1080"` for resolution-independent vector rendering.
- **Accessibility & Motion Guards**:
  - Automatic motion preference detection disabling smooth scroll and scrub when `prefers-reduced-motion` is active.
- **Project Documentation (`README.md`, `docs/`)**:
  - Comprehensive PRD, TRD, Design System, Performance Budgets, Security Architecture, Deployment Guide, Asset Registry, Phase Roadmap, and Testing Protocol.
