# Changelog — BloodPulse Website

All notable changes to the BloodPulse website codebase are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]
### Planned
- **Phase 1**: Velocity-coupled butterfly kinematics engine (`src/engine/wings.js`).
- **Phase 2**: Implementation of Scene 01, Scene 02 (ambulance collision), and Scene 03 (aftermath).
- **Phase 3**: Implementation of Scene 04 (witness butterfly) and Scene 05 (device elevation).
- **Phase 4**: Implementation of Scene 06 through Scene 09 (national map, matching, standby fail-safe).
- **Phase 5**: Implementation of Scene 10 (revival) and Scene 11 (19 Flutter app screens & 6 features).
- **Phase 6**: Implementation of Scene 12 (swarm convergence, logo lockup, footer CTAs).
- **Phase 7**: Responsive tablet and mobile layouts, strict node capping, reduced-motion audit.
- **Phase 8**: Production performance audit, cross-browser verification, and Nginx deployment pipeline.

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
