# Design System & Motion Specification — BloodPulse Website

## 1. Brand Tokens & Visual Identity

### 1.1 Color Palette
The color scheme reflects blood, warmth, medical precision, and human care.

| Token Name | Hex Code | Role & Usage | Contrast Ratio on `--bg` |
| :--- | :--- | :--- | :--- |
| `--bg` | `#FFF8F7` | Warm porcelain / sterile ivory background. | Base Canvas |
| `--primary` | `#C30121` | Crimson pulse / Arterial red. Butterfly bodies, accents, primary buttons. | $5.9:1$ (WCAG AA pass) |
| `--maroon` | `#4A1A22` | Deep venous maroon. Headings, high-contrast typography, shadows. | $12.4:1$ (WCAG AAA pass) |
| `--grey` | `#B5B0AE` | Clinical titanium grey. Secondary labels, subtle borders, inactive indicators. | $2.3:1$ (Decorative / disabled only) |
| `--white` | `#FFFFFF` | Pure white. Phone chassis highlight, icon punch-outs, card backgrounds. | N/A |

### 1.2 Typography Hierarchy

| Style Role | Font Family | Weight | Scale / Size | Line Height | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Heading** | `Georgia, serif` | 700 (Bold) | 48px – 64px | 1.15 | Brand titles, opening monogram |
| **Section Title** | `Georgia, serif` | 400 (Regular) | 32px – 40px | 1.25 | Scene transitions, modal headers |
| **Body / Labels** | `Inter, sans-serif` | 500 (Medium) | 16px – 18px | 1.50 | CTAs, UI segment text, button labels |
| **Telemetry HUD** | `ui-monospace, Consolas` | 600 (SemiBold)| 12px – 13px | 1.60 | Debug stats, coordinate markers |

### 1.3 Spacing & Layer Scale

```css
/* Spacing Scale */
--space-3xs: 2px;
--space-2xs: 4px;
--space-xs:  8px;
--space-sm:  12px;
--space-md:  16px;
--space-lg:  24px;
--space-xl:  32px;
--space-2xl: 48px;
--space-3xl: 64px;

/* Elevation & Stacking Order */
--z-background:   0;   /* Passive background layers & grid */
--z-stage:       10;   /* Primary 1920x1080 animated SVG canvas */
--z-content:     20;   /* HTML overlays and actionable CTAs */
--z-overlay:     50;   /* Notification pills, alerts */
--z-hud:        100;   /* Debug performance HUD */
--z-modal:     1000;   /* Fallbacks, device warning modal */
```

---

## 2. Pinned 1920x1080 Stage Rules

1. **Immutable Coordinate Grid**: The virtual design space is strictly $1920\text{px} \times 1080\text{px}$ (`viewBox="0 0 1920 1080"`). Center origin is coordinate $(960, 540)$.
2. **Letterbox Guarantee**: On screens with aspect ratios wider than $16:9$ (e.g., $21:9$ ultra-wides), horizontal pillarboxing occurs automatically. On screens taller than $16:9$ (e.g., tablets or vertical monitors), vertical letterboxing occurs.
3. **No Dynamic Geometry**: SVG artwork must never calculate fluid percentages (`width="50%"`) inside child vectors; all coordinate geometry must be fixed SVG integers relative to $1920 \times 1080$.
4. **CSS Centering**: `#canvas-stage` is centered in `#stage-viewport` via flexbox with `transform-origin: center center; transform: scale(var(--stage-scale))`.

---

## 3. Motion Principles & Performance Rules

1. **Only Animate Composited Properties**: Only animate `transform` (`x`, `y`, `scale`, `rotation`) and `opacity`.
2. **Never Animate Reflow Triggers**: Never animate `width`, `height`, `top`, `left`, `margin`, `padding`, or `border-width`.
3. **Filter Restraint**: Avoid live animations on SVG filters (`<feGaussianBlur>`, `<feDropShadow>`). Use pre-baked layered paths or toggle opacity of pre-rendered blurred shapes instead.
4. **Easing Archetypes**:
   - Mechanical acceleration (Ambulance): `power2.in` for entry, `power2.out` for exit.
   - Organic flight (Butterflies): `sine.inOut` or `power1.inOut` for natural aerodynamic drift.
   - UI Segment Taps: `back.out(1.7)` for responsive tactile bounce.

---

## 4. Butterfly Kinematic Specification

The red butterfly symbolizes an ordinary citizen of Bangladesh.

```
       \   /
     (o) (o)       <--- Antennae (delicate SVG curves)
     /  |  \
   /    |    \
 [Left] | [Right]  <--- Mirrored SVG wings (3D transform origin along central body axis)
 [Wing] | [Wing]
   \    |    /
     \  |  /
        |          <--- Abdomen / Thorax (#C30121 crimson with #4A1A22 maroon core)
```

### Wing Flap Mechanics
- **Wing Articulation**: Left wing flaps via `transform: scaleX(...)` or `rotateY(...)` around right edge origin (`transform-origin: 100% 50%`); right wing mirrors around left edge origin (`transform-origin: 0% 50%`).
- **Idle Motion**: When scroll velocity is 0, wings continuously flap at idle speed: `timeScale = 0.3`.
- **Velocity Coupling**: As the user scrolls, `ScrollTrigger.getVelocity()` accelerates the flapping frequency up to `timeScale = 1.8`.
- **Return Damping**: When scrolling pauses, a GSAP tween smoothly eases `timeScale` back to `0.3` over 600ms (`ease: 'power2.out'`).
- **Never Dead**: When Butterfly 1 is struck by the ambulance, wing flap amplitude and frequency drop sharply to a weak, fragile tremor, but **wings never fully freeze**.

---

## 5. Scene-by-Scene Storyboard

All story transitions are continuous: the final frame of Scene $N$ is identically the first frame of Scene $N+1$.

| Scene | Label | Scroll Range | Visual Elements | Core Motion & Narrative Action | Transition into Next Scene |
| :---: | :---: | :---: | :--- | :--- | :--- |
| **01** | `s1` | 0% – 8.3% | Butterfly 1 (center-left), BloodPulse logo, 3 CTAs (Web, Play, App Store). | Butterfly 1 hovers at idle ($x=700, y=500$). Logo and buttons gently fade on scroll. | Butterfly 1 drifts downward toward street level ($y \to 750$). |
| **02** | `s2` | 8.3% – 16.6% | Butterfly 1, Vector Ambulance entering from left ($x=-400$), Siren beacon flashing. | Ambulance accelerates from left across road plane, colliding with Butterfly 1 at $(x=900, y=750)$. | Screen flashes subtle crimson impact ring; ambulance continues moving right. |
| **03** | `s3` | 16.6% – 25.0% | Ambulance speeding off stage right ($x \to 2300$), Butterfly 1 injured in bottom-right corner. | Ambulance exits. Butterfly 1 tumbles into lower corner ($x=1600, y=920$), wings faintly trembling. | Camera focus pivots to upper sky area; Butterfly 1 remains visible in corner. |
| **04** | `s4` | 25.0% – 33.3% | Butterfly 1 in corner, Butterfly 2 descending from top ($y=-100$). | Butterfly 2 glides in from top, sweeps in an arc, notices Butterfly 1, and hovers in distress. | Butterfly 2 ascends to center stage as digital glow emerges from below. |
| **05** | `s5` | 33.3% – 41.6% | Smartphone device frame, BloodPulse top bar, 3 segment cards (Search, Emergency, Campaigns). | Phone elevates from bottom ($y=1200 \to 540$); screen glass illuminates. | Butterfly 2 hovers directly above the "Search for Donor" segment. |
| **06** | `s6` | 41.6% – 50.0% | Phone screen showing Search UI, "Request to All" floating action button. | Butterfly 2 touches the button; pulse wave expands across screen. | Phone smoothly scales down and recedes to reveal national map. |
| **07** | `s7` | 50.0% – 58.3% | Bangladesh stylized vector map, 15+ small butterfly beacons with blood labels (A+, B+, O+, AB+). | Map outlines draw on; butterfly beacons appear across Dhaka, Chittagong, Sylhet, etc. | Camera zooms into matching region; peripheral beacons desaturate. |
| **08** | `s8` | 58.3% – 66.6% | Candidate donor beacons, 1 matching beacon, glowing focus halo. | Matching donor beacon pulses with bright crimson energy; unmatched beacons gently blur. | Matching donor node expands into an active dispatch trajectory. |
| **09** | `s9` | 66.6% – 75.0% | Live route path, Donor butterfly in transit, "Standby Donor" fail-safe indicator. | Donor butterfly flies along trajectory line. Standby indicator illuminates as backup. | Energy stream connects from incoming donor to injured Butterfly 1. |
| **10** | `s10`| 75.0% – 83.3% | Butterfly 1 in corner, Butterfly 2, healing energy particle stream. | Butterfly 1 absorbs crimson life pulse; wings expand and beat rapidly; ascends to center. | Both butterflies fly side-by-side toward the phone frame. |
| **11** | `s11`| 83.3% – 91.6% | Phone frame displaying 19 authentic app screens (Feed, Blood Hub, Health Hub morphs, Community, PulseAI, Profile). | Butterfly 2 navigates through features: Health Hub morphs across AI report, calculators, recovery. "Create Poster" flashes. | Phone gracefully slides downward into the backdrop; butterflies swarm the canvas. |
| **12** | `s12`| 91.6% – 100% | Swarm of 50+ butterfly particles, BloodPulse central brand logo, final CTA cluster, footer. | Swarm converges into central BloodPulse blood-drop/heart logo; final install CTAs and footer lock into position. | Steady terminal state at bottom of scroll (1200vh). |

---

## 6. Responsive Rules across Viewport Tiers

| Parameter | Desktop ($\ge 1024\text{px}$) | Tablet ($600\text{px} - 1023\text{px}$) | Mobile ($\le 599\text{px}$) |
| :--- | :--- | :--- | :--- |
| **Canvas Handling** | Full letterboxed $1920 \times 1080$ stage. | Scaled $1920 \times 1080$ or vertical card flow. | Dedicated vertical card sequence or simplified stage. |
| **Butterfly Particles** | Up to 20 active simultaneous nodes. | Maximum 12 active nodes. | Maximum 8 active nodes. |
| **Phone Frame Render** | Centered $420\text{px} \times 860\text{px}$ vector chassis. | Scaled down to $320\text{px}$ width. | Full-width container ($90\text{vw}$). |
| **Interaction Mode** | Mouse wheel, trackpad, Lenis smoothing. | Touch drag with Lenis syncTouch. | Native touch scroll. |

---

## 7. Accessibility Specification
- **Reduced Motion**: If `(prefers-reduced-motion: reduce)` is active:
  - Disable Lenis smoothing (`smoothWheel: false`).
  - ScrollTrigger `scrub` is disabled (`scrub: false`).
  - Wing animation runs at a continuous, steady low frequency without sudden bursts.
- **Color Contrast**: All textual typography conforms to WCAG 2.1 AA (minimum $4.5:1$ for regular text, $3.0:1$ for large text).
- **Assistive Technology**:
  - The animated SVG stage includes `<svg role="img" aria-label="Animated story depicting blood donation in Bangladesh">`.
  - Hidden accessible text summary (`.sr-only`) provided for visually impaired users outlining the narrative arc and direct app download links.
