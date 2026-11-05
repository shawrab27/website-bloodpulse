# Technical Requirements Document (TRD) — BloodPulse Website

## 1. System Architecture
The BloodPulse marketing website is designed as a high-performance, single-page, scroll-driven visual application. It is engineered with vanilla modern JavaScript (ES Modules), Vite as the bundler, and GSAP (GreenSock Animation Platform) paired with Lenis for physics-based inertial scrolling.

```
+-----------------------------------------------------------------------------------+
|                                  Browser Viewport                                 |
+-----------------------------------------------------------------------------------+
       |                                                               |
       v                                                               v
+----------------------------+                               +--------------------+
|  Lenis Scroll Engine       |                               | Window Resize /    |
|  (Inertial Smoothing)      |                               | MatchMedia Events  |
+----------------------------+                               +--------------------+
       |                                                               |
       | requestAnimationFrame (Ticker)                                |
       v                                                               v
+----------------------------+                               +--------------------+
|  GSAP ScrollTrigger Plugin |                               | Dynamic CSS Scale  |
|  (Scroll Velocity Sensor)  |                               | (--stage-scale)    |
+----------------------------+                               +--------------------+
       |                                                               |
       +-------------------------------+-------------------------------+
                                       |
                                       v
                     +-----------------------------------+
                     |   Master GSAP Timeline (Paused)   |
                     |   Labels: s1 -> s12               |
                     +-----------------------------------+
                                       |
       +-------------------------------+-------------------------------+
       |                               |                               |
       v                               v                               v
+------------------+         +--------------------+          +--------------------+
| Butterfly Wing   |         | Scene Module Tree  |          | Real App UI Stack  |
| Kinematics Loop  |         | (Scene 1 -> 12)    |          | (19 WebP Screens)  |
+------------------+         +--------------------+          +--------------------+
       |                               |                               |
       +-------------------------------+-------------------------------+
                                       |
                                       v
                     +-----------------------------------+
                     | Pinned 1920x1080 SVG Design Stage |
                     | (GPU-Composited Transform/Opacity)|
                     +-----------------------------------+
```

---

## 2. Directory & File Structure

```
website-bloodpulse/
├── docs/                     # Technical, product, and operational documentation
│   ├── PRD.md
│   ├── TRD.md
│   ├── DESIGN.md
│   ├── PERFORMANCE.md
│   ├── SECURITY.md
│   ├── DEPLOYMENT.md
│   ├── ASSETS.md
│   ├── PHASES.md
│   ├── TESTING.md
│   └── CHANGELOG.md
├── public/                   # Static unbundled files (favicon, robots.txt)
├── src/
│   ├── assets/
│   │   ├── img/              # App screenshots (WebP) & raster photography
│   │   └── svg/              # Raw vector assets (butterfly, ambulance, map)
│   ├── engine/               # Core framework & animation runtimes
│   │   ├── device.js         # Breakpoints & CSS transform scale controller
│   │   ├── hud.js            # In-browser performance & telemetry overlay
│   │   ├── scroll.js         # Lenis smooth-scroll + GSAP tick integration
│   │   ├── timeline.js       # Master scrub timeline & label orchestrator
│   │   └── wings.js          # Velocity-driven butterfly flapping engine
│   ├── scenes/               # Modular scene implementations
│   │   ├── scene01.js        # Scene 1: Normalcy & top CTAs
│   │   ├── scene02.js        # Scene 2: Ambulance approach & impact
│   │   ├── scene03.js        # Scene 3: Ambulance departure & injured butterfly
│   │   ├── scene04.js        # Scene 4: Arrival of Butterfly 2
│   │   ├── scene05.js        # Scene 5: Device elevation & app segments
│   │   ├── scene06.js        # Scene 6: Request to All trigger
│   │   ├── scene07.js        # Scene 7: Nationwide map & donor nodes
│   │   ├── scene08.js        # Scene 8: Matching sequence
│   │   ├── scene09.js        # Scene 9: Live tracking & standby fail-safe
│   │   ├── scene10.js        # Scene 10: Revival and takeoff
│   │   ├── scene11.js        # Scene 11: 6-feature tour inside phone frame
│   │   └── scene12.js        # Scene 12: Particle convergence & final CTAs
│   ├── styles/
│   │   ├── base.css          # CSS resets, Lenis utilities, fallback styles
│   │   ├── stage.css         # Pinned viewport, design canvas, HUD styling
│   │   └── tokens.css        # Palette, typography, spacing, and z-index vars
│   └── main.js               # Application bootstrap & dependency wiring
├── .gitignore
├── AGENTS.md                 # Agent execution guidelines and boundaries
├── index.html                # Single HTML document and SVG stage template
├── package.json              # Dependencies and build script specifications
├── package-lock.json
└── README.md                 # Project quickstart and developer documentation
```

---

## 3. Engine Design & Subsystems

### 3.1 Scroll Engine (`src/engine/scroll.js`)
Lenis provides inertial scroll interpolation while GSAP drives the global render loop.
- **Lenis Configuration**: Initialized with `autoRaf: false` to allow the GSAP ticker to govern animation frame delivery.
- **GSAP Ticker Integration**: `gsap.ticker.add((time) => lenis.raf(time * 1000))` guarantees microsecond frame synchronization.
- **Lag Smoothing**: Set to `gsap.ticker.lagSmoothing(0)` to prevent GSAP from artificially skipping animation ticks when the browser experiences heavy rendering load.
- **Reduced Motion**: Disables `smoothWheel` when the client media query `(prefers-reduced-motion: reduce)` evaluates to true.

### 3.2 Master Timeline (`src/engine/timeline.js`)
- **Structure**: A single, global, paused GSAP timeline (`masterTimeline = gsap.timeline({ paused: true, defaults: { ease: 'none' } })`).
- **ScrollTrigger Attachment**: Bound to `#scroll-track` with `start: 'top top'` and `end: 'bottom bottom'`.
- **Scrub Behavior**: Configured with `scrub: 1` (or `true`) under normal operation; set to `scrub: false` under reduced motion.
- **Scene Labels**: Pre-populated with equidistant labels (`s1` through `s12`). Each scene module attaches its animations relative to these label coordinates.

### 3.3 Butterfly Wing Controller (`src/engine/wings.js`)
The red butterfly is the central metaphor of the application. The flapping mechanic operates on biological kinematics modulated by scroll velocity:
- **Baseline Idle Motion**: At rest (velocity = 0), wings continuously flap with an idle `timeScale: 0.3`.
- **Velocity Coupling**: Querying `ScrollTrigger.getVelocity()` dynamically computes scroll momentum:
  $$\text{targetTimeScale} = \text{clamp}(0.3, 1.8, 0.3 + \frac{|\text{velocity}|}{1000} \times 1.5)$$
- **Return Damping**: When scrolling ceases, the controller smoothly interpolates back down to 0.3 using GSAP's `gsap.to(wingTimeline, { timeScale: 0.3, duration: 0.6, ease: 'power2.out' })`.
- **Kinematic Rule**: Wings **never stop moving entirely** at any point in the lifecycle (even when injured, weak spasms are maintained until revival).

### 3.4 Responsive Viewport & Breakpoint Controller (`src/engine/device.js`)
- **Stage Scaling**: Measures `window.innerWidth` and `window.innerHeight` on resize and computes:
  $$\text{scale} = \min\left(\frac{\text{window.innerWidth}}{1920}, \frac{\text{window.innerHeight}}{1080}\right)$$
  The calculated scalar is assigned to the CSS variable `--stage-scale`, centering and letterboxing the fixed 1920x1080 canvas without aspect ratio distortion.
- **Breakpoints**: Governed by `gsap.matchMedia()`:
  - **Desktop**: `(min-width: 1024px)` -> Complete interactive SVG choreography.
  - **Tablet**: `(min-width: 600px) and (max-width: 1023px)` -> Adapted or simplified canvas.
  - **Mobile**: `(max-width: 599px)` -> Mobile portrait layout.

---

## 4. Scene Module Contract
To prevent monolithic file sprawl, every scene is strictly isolated into its own file inside `src/scenes/sceneXX.js`.

### Contract Rules
1. Every scene module must export a single initialization function: `export function initSceneXX(timeline)`.
2. All scene tweens must anchor to their corresponding label (e.g. `timeline.to(target, { ... }, 's2')`).
3. Elements must be scoped to their respective SVG group container (e.g. `<g id="scene-02-root">`).
4. **Zero Layout Shifts**: No scene may alter DOM layout or read dimensions causing synchronous layout reflows during scroll ticks.
5. **Continuous Continuity**: The final transform state of scene $N$ must exactly equal the initial transform state of scene $N+1$.

```javascript
// Example Scene Module Boilerplate (src/scenes/scene02.js)
import gsap from 'gsap';

export function initScene02(timeline) {
  const ambulance = document.getElementById('scene-ambulance');
  const sirenLight = document.getElementById('scene-siren');

  timeline
    .fromTo(ambulance, 
      { x: -600, y: 700 }, 
      { x: 960, y: 700, duration: 1, ease: 'power1.in' }, 
      's2'
    )
    .to(sirenLight, { opacity: 1, repeat: 5, yoyo: true, duration: 0.1 }, 's2');
}
```

---

## 5. Data Flow Specification

```
[User Scroll Gesture / Touch]
           │
           ▼
[Lenis Scroll Interpolation] ─── (Scroll Position / Velocity)
           │
           ├───► [wings.js] ──────────► Adjusts Wing timeScale (0.3 -> 1.8)
           │
           └───► [ScrollTrigger] ─────► Scrubs masterTimeline (0.0 -> 1.0)
                       │
                       ▼
           [Scene 01..12 Tweens]
                       │
                       ▼
           [Direct GPU Property Updates (transform: translate3d/scale, opacity)]
                       │
                       ▼
           [Browser Compositor -> Display Refresh (60 Hz / 120 Hz)]
```

---

## 6. Build and Deployment Pipeline
- **Bundler**: Vite 6+ utilizing Rollup under the hood.
- **Asset Optimization**: SVG optimization via SVGO; WebP screenshot encoding; font subsetting.
- **Atomic Deployment**: GitHub Actions pushes built static directory (`dist/`) to target VPS over SSH, unpacking into timestamped release folders with atomic symlink switching (`current -> releases/YYYYMMDDHHMMSS`).

---

## 7. Browser Support Matrix

| Browser | Minimum Version | Operating Systems | Status |
| :--- | :---: | :--- | :--- |
| **Google Chrome / Chromium** | 100+ | Windows, macOS, Linux, Android | Fully Supported (Tier 1) |
| **Microsoft Edge** | 100+ | Windows, macOS | Fully Supported (Tier 1) |
| **Apple Safari** | 15.4+ | macOS, iOS, iPadOS | Fully Supported (Tier 1) |
| **Mozilla Firefox** | 102+ | Windows, macOS, Linux, Android | Fully Supported (Tier 1) |
| **Brave / Opera / Vivaldi** | Chromium 100+ | All | Fully Supported (Tier 1) |
| **Legacy IE / Pre-Chromium Edge**| Any | All | Explicitly Unsupported (Blocked) |

---

## 8. Architectural Decision Log

### Decision: Vanilla JavaScript + GSAP instead of React or Vue
- **Context**: Evaluating frontend frameworks for an animation-heavy, single-page presentation site.
- **Problem**: React and Vue introduce virtual DOM diffing, component reconciliation overhead, and potential state re-render hiccups that drop frames during 60fps/120fps continuous scroll-driven scrubbing.
- **Resolution**: Selected pure Vanilla JS (ES Modules) + GSAP. GSAP operates directly on DOM/SVG element attributes with zero virtual DOM overhead, eliminating render lag and yielding an ultra-compact production JS footprint ($< 140\text{ KB}$ minified/gzipped).

### Decision: Fixed 1920x1080 Aspect Stage with Letterboxing
- **Context**: Determining responsive strategy for a cinematic visual story.
- **Problem**: Fluid liquid responsive layouts cause spatial drift between flying butterflies, colliding ambulances, and target map coordinates across varying screen aspect ratios.
- **Resolution**: Locked the narrative coordinate space into an immutable 1920x1080 canvas scaled dynamically via CSS transforms (`Math.min(vw/1920, vh/1080)`). This guarantees identical spatial geometry across all displays.

### Decision: Lenis Driven by GSAP Ticker
- **Context**: Coordinating Lenis inertial smoothing with GSAP ScrollTrigger.
- **Problem**: Running dual independent `requestAnimationFrame` loops introduces micro-stutters and race conditions between scroll measurement and tween updates.
- **Resolution**: Lenis is set to `autoRaf: false` and driven strictly by GSAP’s internal ticker with `lagSmoothing(0)`.
