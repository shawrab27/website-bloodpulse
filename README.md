# BloodPulse Website

An interactive, scroll-driven storytelling web experience for BloodPulse. Built with Vanilla JavaScript, Vite, GSAP, and Lenis.

> **Note**: This is a standalone web project, separate from the BloodPulse Flutter mobile application.

---

## Documentation

Full project specifications, design rules, and operational guidelines are available in the [`docs/`](docs/) directory and repository root:

- [**AGENTS.md**](AGENTS.md) — Mandatory execution rules and constraints for all AI agents.
- [**Product Requirements Document (PRD)**](docs/PRD.md) — Vision, user personas, success metrics, user journey, scene catalog, and requirements matrix.
- [**Technical Requirements Document (TRD)**](docs/TRD.md) — Architecture, engine subsystems, scene module contracts, data flow, and architectural decision records.
- [**Design System & Storyboard (DESIGN.md)**](docs/DESIGN.md) — Tokens, canvas rules, motion principles, butterfly kinematics, and scene-by-scene storyboard.
- [**Performance Budgets (PERFORMANCE.md)**](docs/PERFORMANCE.md) — Size & FPS budgets, compositor rules, node capping, telemetry HUD, and low-end device testing.
- [**Security Policy (SECURITY.md)**](docs/SECURITY.md) — Static site threat model, HTTPS/HSTS, CSP headers, outbound link hygiene, and VPS hardening.
- [**Deployment Guide (DEPLOYMENT.md)**](docs/DEPLOYMENT.md) — Production Nginx configuration, SSL setup, atomic symlink releases, and rollback protocols.
- [**Asset Registry (ASSETS.md)**](docs/ASSETS.md) — Master inventory of vectors, app UI screenshots (19 screens), ownership, and size budgets.
- [**Implementation Roadmap (PHASES.md)**](docs/PHASES.md) — Linear phase breakdown (Phase 0 to 8) with deliverables and acceptance criteria.
- [**Testing Protocol (TESTING.md)**](docs/TESTING.md) — Scene-by-scene manual QA checklist, browser matrix, and accessibility verification.
- [**Changelog (CHANGELOG.md)**](docs/CHANGELOG.md) — Complete record of versioned milestones and feature releases.

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation
```bash
npm install
```

### Development
Start the local Vite development server:
```bash
npm run dev
```

### Production Build
Build optimized production static assets into `dist/`:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## Architecture & Features (Phase 0)

- **Vite Vanilla JS**: Ultra-fast build tool and ES modules development environment.
- **GSAP & Lenis Engine**:
  - `src/engine/scroll.js`: Smooth scroll driven by Lenis and synchronized with GSAP ScrollTrigger (`lagSmoothing(0)`).
  - `src/engine/timeline.js`: One master GSAP timeline scrubbed across the 1200vh scroll height with 9 equally spaced scene labels (`s1` through `s9`).
  - `src/engine/device.js`: Responsive layout breakpoints via `gsap.matchMedia` (Desktop: 1024px+, Tablet: 600-1023px, Mobile: <600px). Tablet/mobile show a "Coming soon" notice.
- **Fixed 1920x1080 Design Canvas**:
  - Pinned full-viewport stage letterboxed and scaled with CSS (`--stage-scale`) to fit any display without distortion.
  - Future SVG scenes use `viewBox="0 0 1920 1080"`.
- **Debug HUD**:
  - Press <kbd>D</kbd> on desktop to toggle HUD overlay.
  - Monitors scroll progress (%), active scene label (`s1` - `s9`), real-time FPS, and scroll velocity.
- **Accessibility & Motion Preferences**:
  - Automatically respects `prefers-reduced-motion: reduce` by disabling smooth scrolling and scrub animations.

---

## Project Structure

```
website-bloodpulse/
├── docs/                   # Full documentation suite
├── public/                 # Static assets
├── src/
│   ├── assets/
│   │   ├── img/            # Raster images & app screenshots
│   │   └── svg/            # SVG vector assets
│   ├── engine/
│   │   ├── device.js       # Breakpoints & canvas letterbox scaling
│   │   ├── hud.js          # Debug HUD overlay (key 'D')
│   │   ├── scroll.js       # Lenis + GSAP ScrollTrigger sync
│   │   └── timeline.js     # Master timeline (labels s1..s9)
│   ├── scenes/             # Scene modules (to be implemented in future phases)
│   ├── styles/
│   │   ├── base.css        # Resets, Lenis rules, fallback modal
│   │   ├── stage.css       # Viewport, 1920x1080 canvas, HUD styles
│   │   └── tokens.css      # Colors, typography, spacing, z-index, scroll height
│   └── main.js             # Application entrypoint
├── index.html              # Root HTML & design canvas container
├── package.json            # Scripts & dependencies (vite, gsap, lenis)
├── .gitignore              # Ignored paths (node_modules, dist)
├── AGENTS.md               # Mandatory agent execution rules
└── README.md               # Documentation & setup guide
```

---

## Deploy to VPS (Nginx static)

For detailed production instructions, see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

Quick Nginx configuration snippet (`/etc/nginx/sites-available/bloodpulse`):
```nginx
server {
    listen 80;
    server_name bloodpulse.example.com;

    root /var/www/bloodpulse/current/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
}
```
