# BloodPulse Website

An interactive, scroll-driven storytelling web experience for BloodPulse. Built with Vanilla JavaScript, Vite, GSAP, and Lenis.

> **Note**: This is a standalone web project, separate from the BloodPulse Flutter mobile application.

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
├── public/                 # Static assets
├── src/
│   ├── assets/
│   │   ├── img/            # Raster images
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
└── README.md               # Documentation
```

---

## Deploy to VPS (Nginx static)

When deploying to a Linux VPS:

1. Build the production bundle:
   ```bash
   npm run build
   ```
2. Upload the `dist/` directory to your web server (e.g. `/var/www/bloodpulse/dist`).
3. Example Nginx configuration block (`/etc/nginx/sites-available/bloodpulse`):
   ```nginx
   server {
       listen 80;
       server_name bloodpulse.example.com;

       root /var/www/bloodpulse/dist;
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
4. Enable the site and reload Nginx:
   ```bash
   sudo ln -s /etc/nginx/sites-available/bloodpulse /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```
