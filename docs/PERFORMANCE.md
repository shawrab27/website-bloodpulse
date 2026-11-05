# Performance Budgets & Optimization Engineering — BloodPulse Website

## 1. Quantitative Performance Budgets

| Metric | Budget Ceiling | Target Goal | Measurement Method |
| :--- | :---: | :---: | :--- |
| **Total First Load Payload** | $< 3.0\text{ MB}$ | $< 2.0\text{ MB}$ | Chrome DevTools Network Tab (Disable Cache) |
| **Total JavaScript (Gzip)** | $< 150\text{ KB}$ | $< 120\text{ KB}$ | Vite build asset report / gzip analysis |
| **Total CSS (Gzip)** | $< 20\text{ KB}$ | $< 10\text{ KB}$ | Vite build asset report |
| **Desktop Frame Rate** | $\ge 58\text{ fps}$ | $60\text{ fps}$ rock solid | Built-in HUD FPS Counter & Chrome Frame Telemetry |
| **Budget Android Frame Rate** | $\ge 30\text{ fps}$ | $45\text{ fps}$ | Remote ADB Debugging (e.g., Moto G / Redmi 9) |
| **Largest Contentful Paint (LCP)** | $< 2.5\text{ s}$ | $< 1.8\text{ s}$ | Google Lighthouse (Simulated 4G Broadband) |
| **First Input Delay (FID) / INP** | $< 100\text{ ms}$ | $< 50\text{ ms}$ | Web Vitals Chrome extension / Lighthouse |
| **Cumulative Layout Shift (CLS)** | $0.00$ | $0.00$ | Zero dynamic layout shifts during scroll ticks |

---

## 2. Core Rendering Rules & Optimization Directives

### 2.1 CSS & Compositor Rules
- **Hardware Acceleration Only**: Only animate CSS `transform` (`translate3d`, `scale`, `rotate`) and `opacity`.
- **Will-Change Restraint**: Do not apply `will-change: transform` indiscriminately to hundreds of elements; apply it only to active animating nodes (e.g., active butterfly wings and the ambulance) and remove it when off-screen.
- **Zero Layout Thrashing**: Never query `getBoundingClientRect()`, `offsetWidth`, or `scrollTop` inside `gsap.ticker` or requestAnimationFrame loops. All measurements are cached during initialization or on throttled window resize.

### 2.2 SVG Optimization & Node Budgets
- **Reuse with `<defs>` and `<use>`**: Master butterfly geometries, map pins, and blood drops must reside once inside `<defs>` and be instanced via `<use href="#butterfly-symbol" />`.
- **No Dynamic Filters**: Animating `<feGaussianBlur>` or `<feDropShadow>` triggers severe GPU-CPU memory bandwidth bottlenecks. Blur effects on inactive map nodes must be achieved via pre-rendered blurred layers toggled via `opacity`.
- **Node Capping across Breakpoints**:

| Screen Category | Maximum Simultaneous Butterfly Nodes | Max Active SVG Path Nodes |
| :--- | :---: | :---: |
| **Desktop** ($\ge 1024\text{px}$) | 20 nodes | 600 paths |
| **Tablet** ($600 - 1023\text{px}$) | 12 nodes | 350 paths |
| **Mobile** ($\le 599\text{px}$) | 8 nodes | 200 paths |

### 2.3 Image Handling (App Screenshots)
- **Format**: All 19 Flutter application screenshots must be encoded in high-efficiency **WebP** (quality factor 82) or **AVIF**.
- **Resolution**: Dimensions matched to 2x phone chassis viewport ($840\text{px} \times 1720\text{px}$ maximum).
- **Off-Screen Culling & Lazy Decoding**: Offscreen images within the phone stack must set `loading="lazy"` and `decoding="async"`, or be dynamically attached/detached as the phone enters Scene 05 and Scene 11.
- **Hidden Layer Culling**: Unmounted or passed scene groups must receive `visibility: hidden` (or `display: none`) to allow the browser compositor to drop their paint layers from the active GPU buffer.

---

## 3. Real-Time Telemetry & Measurement

### 3.1 Built-in Debug HUD
The engine includes a zero-dependency telemetry HUD toggled by pressing key <kbd>D</kbd>:
- **Scroll Progress**: Displays exact scroll percentage (`0.0%` to `100.0%`).
- **Current Scene Label**: Displays active timeline label (`s1` through `s12`).
- **Real-Time FPS**: Rolling 500ms window measuring actual browser rendering frames per second.
- **Scroll Velocity**: Instantaneous Lenis velocity in pixels per second.

### 3.2 Lighthouse Testing Protocol
Run Lighthouse audits with the following automated profile:
```bash
# Production preview audit
npm run build
npm run preview

# In Chrome DevTools:
# - Device: Desktop
# - Categories: Performance, Accessibility, Best Practices, SEO
# - Throttling: Simulated 4G, 4x CPU slowdown
```

---

## 4. Low-End Hardware Test Plan

To ensure the website remains accessible to all citizens of Bangladesh regardless of hardware wealth, manual validation must take place on budget hardware:

1. **Target Benchmark Devices**:
   - Primary: Standard Desktop (Intel Core i5 / 8GB RAM / Integrated GPU).
   - Secondary: Low-end Android Smartphone (e.g. MediaTek Helio G35 / Snapdragon 450, 3GB RAM).
   - Tertiary: Mid-tier iPad / Android Tablet.
2. **Stress Test Scenarios**:
   - **Continuous Scroll Scrubbing**: Rapidly fling mouse wheel or swipe up/down across 1200vh. Ensure frame rate does not drop below 30 fps and no tearing occurs.
   - **Scene 07 Map Population**: Monitor frame rate as 15+ butterfly donor nodes illuminate simultaneously.
   - **Scene 11 Screen Switching**: Ensure rapid morphing through the 19 screenshots does not trigger garbage collection pauses ($> 16\text{ms}$).
   - **Scene 12 Particle Convergence**: Validate that the particle swarm converges into the logo without exceeding the GPU compositor memory quota.
