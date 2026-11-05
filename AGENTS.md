# AI Agent Rules & Operational Guidelines — BloodPulse Website

Every AI agent working on this repository **MUST** strictly adhere to the rules below. These rules are mandatory and take precedence over default autonomous agent behaviors.

---

## 1. Golden Rules for Agents

1. **Read Docs First**: Always consult `docs/PRD.md`, `docs/TRD.md`, `docs/DESIGN.md`, and `docs/PHASES.md` before generating or modifying any code.
2. **One Phase at a Time**: Never implement multiple phases in a single turn. Strictly complete the designated phase, verify its acceptance criteria, and wait for confirmation.
3. **Strict Workspace Isolation**: Never touch, read, write, or reference any directory outside `D:\Study\CSE\Real life project\website-bloodpulse`. This is a standalone website separate from the Flutter app.
4. **Animate Only Transform & Opacity**: In GSAP tweens and CSS transitions, **ONLY** animate `transform` (`x`, `y`, `scale`, `rotation`, `skew`) and `opacity`. Never animate `top`, `left`, `width`, `height`, `margin`, `padding`, or dynamic filters during scroll ticks.
5. **Butterfly Wings Never Fully Stop**: The red butterfly wings must always flap (idle `timeScale: 0.3`, accelerating up to `1.8` with scroll velocity, easing back on stop). Even when injured in Scene 3, wings retain weak, faint spasms; they **never freeze**.
6. **No Text in Story Scenes**: Scenes 1 through 10 tell an emotional narrative purely through visual animation. Do not insert dialogue boxes, explainer cards, subtitles, or speech bubbles into the animation stage.
7. **No New Dependencies without Asking**: Do not install any additional npm packages or third-party libraries without explicit user permission. The approved stack is strictly Vite, Vanilla JS, GSAP (with ScrollTrigger), and Lenis.
8. **Keep Files Small and Modular**: Every scene must live in its own module inside `src/scenes/sceneXX.js`. Never write monolithic animation scripts.
9. **Comment in Simple English**: All code comments, docstrings, and commit messages must be written in clear, concise, simple English.
10. **Track Progress Diligently**: After completing each phase, update the respective checklist in `docs/PHASES.md` and log changes in `docs/CHANGELOG.md`.
11. **Commit Per Phase**: Create an isolated git commit at the end of each phase (e.g. `git commit -m "phase X"`). Do not push; let the user push manually.

---

## 2. Technical Contracts for Code Changes

### Scene Module Contract
Every scene file `src/scenes/sceneXX.js` must implement:
```javascript
/**
 * Initializes Scene XX and attaches tweens to the master timeline at label 'sXX'.
 * @param {gsap.core.Timeline} timeline - The global master timeline.
 */
export function initSceneXX(timeline) {
  // 1. Query elements within their dedicated SVG group
  // 2. Attach tweens anchored to timeline label 'sXX'
  // 3. Guarantee seamless continuity into scene XX + 1
}
```

### Canvas Coordinate Contract
- All SVG elements must be mapped strictly to the $1920 \times 1080$ coordinate space.
- Never hardcode element dimensions or absolute coordinates in window viewport pixels (`px` based on `window.innerWidth`). All calculations must use design space coordinates.

### Reduced Motion Contract
Whenever adding new animations, verify that `prefers-reduced-motion` is checked and respected. Animations must degrade gracefully to static positions without jarring transitions.
