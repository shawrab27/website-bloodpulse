# Product Requirements Document (PRD) — BloodPulse Website

## 1. Vision & Overview
BloodPulse is the national blood donation and emergency life-saving platform of Bangladesh. While the core operational platform is built with Flutter as a cross-platform mobile application, this repository houses the standalone **scroll-driven storytelling website**.

The website delivers an emotional, visual-first narrative without dialogue or text during story scenes. Through symbolic animation (red butterflies representing citizens of Bangladesh, an ambulance incident representing acute medical emergencies, and a mobile phone displaying the authentic BloodPulse app UI), visitors experience how community solidarity and algorithmic dispatch save lives in Bangladesh.

---

## 2. Product Goals
1. **Emotional Connection**: Communicate the urgency and nobility of blood donation through visual narrative rather than clinical marketing copy.
2. **Product Awareness & Trust**: Showcase authentic, production Flutter app screens inside a photorealistic device frame, demonstrating that BloodPulse is an active, functional, and technologically advanced platform.
3. **App Adoption & Conversion**: Drive app installs (Google Play, Apple App Store) and web application usage through contextual calls-to-action (CTAs).
4. **Performance & Elegance**: Deliver a smooth, 60fps experience on desktop and responsive performance on mobile/tablet via efficient SVG and GPU-accelerated GSAP pipelines.

---

## 3. Target User Personas

| Persona | Role / Description | Primary Motivation | Key On-Site Action |
| :--- | :--- | :--- | :--- |
| **Voluntary Donors** | Healthy individuals (aged 18–55) across divisions of Bangladesh. | Desire to save lives, track personal donation history, join community blood drives. | Click "Google Play" or "App Store" button to register as an active donor. |
| **Patients' Families** | Relatives or caregivers under extreme stress seeking urgent blood/platelets. | Fast response time, verified donors, zero extortion or broker interference. | Click "Open Web App" for immediate emergency donor search. |
| **Hospitals & Blood Banks** | Medical directors, transfusion medicine officers, and emergency ward staff. | Systematic request tracking, bulk emergency coordination, verification badges. | Explore feature ecosystem; reach out for organizational integration. |
| **Institutional Partners** | NGOs, Red Crescent, university clubs, corporate CSR programs. | Collaborative campaigns, nationwide reach, verifiable donation transparency. | Scroll to footer; contact partnership desk. |
| **Researchers / Public Health** | Data analysts, healthcare journalists, policy advocates. | Understanding geographic blood shortages, donation trends, digital health impact. | Review features (AI reports, dispatch network); download app. |

---

## 4. Success Metrics & Key Performance Indicators (KPIs)

| Metric | Target Baseline | Measurement Mechanism |
| :--- | :--- | :--- |
| **CTA Click-Through Rate (CTR)** | $\ge 8.5\%$ of unique visitors | Tracking outbound clicks to App Store, Google Play, and Web App. |
| **Scroll Completion Rate** | $\ge 45\%$ reaching Scene 12 / Footer | GSAP ScrollTrigger completion milestone callback. |
| **Average Dwell Time** | $\ge 90\text{ seconds}$ | Client-side session analytics (privacy-respecting). |
| **Performance (Lighthouse)** | $\ge 95$ Performance, $100$ Accessibility | Automated CI Lighthouse run & field RUM metrics. |
| **Frame Rate** | Constant $60\text{ fps}$ desktop, $\ge 30\text{ fps}$ low-end mobile | Built-in FPS HUD counter / rAF telemetry. |

---

## 5. Scope & Non-Goals

### In Scope
- Single-page scroll-driven SVG animation orchestrated via GSAP ScrollTrigger and Lenis smooth scroll.
- Universal 1920x1080 design stage letterboxed and scaled for any viewport.
- Butterfly wing kinematics modulated dynamically by user scroll velocity.
- 12 continuous scenes connected by seamless spatial/elemental transitions without cuts or textual narration.
- Integration of 19 authentic BloodPulse Flutter mobile app UI screenshots within an animated phone viewport.
- Accessibility compliance (`prefers-reduced-motion`, WCAG 2.1 AA keyboard & contrast guidelines).
- Production-ready static Nginx deployment configurations with security hardening.

### Non-Goals (Out of Scope)
- Direct user authentication or blood request submission on the marketing website itself (all transaction flows occur inside the Flutter mobile app or Web App).
- Backend database or server-side dynamic rendering (the site is purely static HTML/JS/CSS/SVG).
- Heavy raster 3D assets or WebGL shaders that penalize low-end devices.
- Video playback embeds (all animations are native SVG transforms).

---

## 6. User Journey
1. **Arrival**: Land on clean, warm cream background (`#FFF8F7`) with the BloodPulse title mark, top CTA buttons, and a gently flapping red butterfly (Butterfly 1).
2. **Inciting Incident**: As the user begins scrolling, Butterfly 1 drifts downward; an ambulance rushes in from the left with pulsing siren lights and strikes the butterfly.
3. **The Crisis**: The ambulance speeds away to the right; Butterfly 1 lies injured and helpless in the lower corner of the canvas.
4. **Community Awareness**: A second red butterfly (Butterfly 2) glides into view from above and discovers Butterfly 1.
5. **Digital Intermediation**: A modern smartphone frame elevates from the bottom, illuminating the actual BloodPulse application interface.
6. **Emergency Dispatch**: Butterfly 2 taps the "Search for Donor" segment and triggers "Request to All".
7. **Nationwide Network**: The canvas opens to a stylized vector map of Bangladesh, populating with distributed butterfly donor beacons tagged by blood group.
8. **Match Found**: The optimal matching donor butterfly illuminates sharply while peripheral candidates gently blur.
9. **Dispatch & Fail-Safe**: Donor tracking initiates in real time. A Standby Donor indicator activates to provide fail-safe redundancy.
10. **Recovery**: Butterfly 1 absorbs the vital red energy, regenerates, and ascends back into flight alongside Butterfly 2.
11. **Platform Deep Dive**: Butterfly 2 guides the viewer through 6 core app sections inside the phone (Feed, Blood Hub, Health Hub with 5 sub-feature morphs, Community, PulseAI, Profile), with "Create Poster" interludes.
12. **Finale**: Multitudes of butterflies converge from all directions, coalescing into the BloodPulse logomark, resolving into final store download CTAs and footer.

---

## 7. Scene Catalog

| Scene # | Narrative Title | Core Visual Elements | Key Motion Behavior |
| :---: | :--- | :--- | :--- |
| **01** | Peaceful Normalcy | Butterfly 1, BloodPulse logo, 3 CTAs (Open Web App, Google Play, App Store). | Wings flap slowly at idle; gentle hovering; CTAs fade on initial scroll. |
| **02** | Sudden Trauma | Butterfly 1 descending, vector ambulance entering from left, emergency siren beacon. | Ambulance accelerates from x < 0 across stage; collision impact pulse. |
| **03** | The Aftermath | Ambulance exiting stage right, Butterfly 1 grounded in corner, dimmed vitality. | Ambulance rushes off; butterfly rests wounded with faint, weak wing spasms. |
| **04** | A Witness Arrives | Butterfly 1 (corner), Butterfly 2 descending from top viewport. | Butterfly 2 sweeps downward, hovers attentively beside Butterfly 1. |
| **05** | The Digital Lifeline | Smartphone frame ascending, top navigation bar, 3 service segment cards. | Phone rises from y = 1080px to center stage; screen backlight turns on. |
| **06** | The Distress Signal | Phone screen, "Search for Donor", "Request to All" floating button. | Butterfly 2 taps button; ripple animation radiates outward. |
| **07** | Nationwide Beacon | Bangladesh district map, multiple small butterfly markers labeled with blood types (A+, B+, O+, AB+, etc.). | Map expands across stage; donor beacons flare to life across Bangladesh. |
| **08** | Algorithmic Match | Candidate markers, selected donor beacon, focus vignette. | Peripheral nodes fade/soften; exact match glows with high contrast ring. |
| **09** | Dispatch & Standby | Live tracking path, approaching donor butterfly, Standby Donor fail-safe pill. | Path draws along coordinates; standby donor illuminates as safety backup. |
| **10** | Revival & Flight | Butterfly 1, Butterfly 2, ascending flight path. | Butterfly 1 rises; wings regain vibrant flap frequency; both fly together. |
| **11** | Ecosystem Exploration | Smartphone frame showcasing 19 Flutter screenshots (Feed, Blood Hub, Health Hub, Community, PulseAI, Profile). | Morph transitions between Health Hub sub-features; poster generation flash. |
| **12** | Collective Resonance | Hundreds of butterfly particles, BloodPulse central brand mark, final CTA cluster, footer. | Swarm converges into official logo; secondary store links and footer lock into place. |

---

## 8. Requirements Matrix

### Functional Requirements (FR)

| Req ID | Category | Description | Priority |
| :--- | :--- | :--- | :--- |
| **FR-01** | Core Stage | Pinned 1920x1080 design stage letterboxed and scaled via CSS to any screen size. | Must Have |
| **FR-02** | Scroll Scrub | Smooth scroll synchronized with a master GSAP timeline across 1200vh total height. | Must Have |
| **FR-03** | Wing Kinematics | Butterfly wing flap frequency must scale with scroll velocity (idle `timeScale: 0.3`, peak `1.8`, return ease). | Must Have |
| **FR-04** | Continuous Story | No hard camera cuts; every scene's final visual frame must constitute the subsequent scene's initial frame. | Must Have |
| **FR-05** | Silent Narrative | No instructional or storytelling text cards inside scenes 1–10; story is told purely through visual animation. | Must Have |
| **FR-06** | Real UI Showcase | Real Flutter application screenshots (19 screens) must render inside the phone mock without distortion. | Must Have |
| **FR-07** | Morph Transitions | Health Hub sub-features (AI Report, Calculators, Accessories, Recovery, Guide) must morph seamlessly. | Must Have |
| **FR-08** | Debug HUD | Toggleable HUD on key <kbd>D</kbd> displaying scroll %, active scene label (`s1`..`s9`), FPS, and velocity. | Must Have |
| **FR-09** | Outbound Routing | Functional links to Web App, Google Play, and App Store with secure link attributes. | Must Have |
| **FR-10** | Responsive Modes | Desktop full experience (1024px+); tablet/mobile dedicated layouts or progressive fallback. | Must Have |

### Non-Functional Requirements (NFR)

| Req ID | Category | Metric / Specification | Priority |
| :--- | :--- | :--- | :--- |
| **NFR-01** | Performance | Initial load bundle size $< 3.0\text{ MB}$; compressed JavaScript $< 150\text{ KB}$ gzip. | Must Have |
| **NFR-02** | Frame Budget | Stable $60\text{ fps}$ on standard desktop GPUs; $\ge 30\text{ fps}$ on budget mobile devices. | Must Have |
| **NFR-03** | First Render | Largest Contentful Paint (LCP) $< 2.5\text{ seconds}$ on standard broadband connection. | Must Have |
| **NFR-04** | GPU Optimization | Animation strictly restricted to GPU-composited CSS properties (`transform`, `opacity`). | Must Have |
| **NFR-05** | Reduced Motion | Complete bypass of smooth scroll and timeline scrubbing when `prefers-reduced-motion` is active. | Must Have |
| **NFR-06** | Security | Zero third-party runtime tracking scripts; strict Content Security Policy; 100% static output. | Must Have |
| **NFR-07** | Browser Matrix | Modern Chromium (Chrome, Edge, Brave), Safari 15+, and Firefox 100+ on Windows, macOS, Linux, Android, iOS. | Must Have |

---

## 9. Risk Assessment & Mitigations

| Risk Description | Severity | Probability | Mitigation Strategy |
| :--- | :---: | :---: | :--- |
| **Lag / Dropped Frames on Low-End Devices** | High | Medium | Enforce strict element caps (max 20 butterflies desktop, 8 mobile). Avoid costly SVG filters like `feGaussianBlur` during active motion. |
| **Lenis & ScrollTrigger De-synchronization** | High | Low | Use `gsap.ticker` to drive `lenis.raf()` with `lagSmoothing(0)` and explicit `lenis.on('scroll', ScrollTrigger.update)`. |
| **Image Asset Bloat from 19 Screenshots** | Medium | High | Convert all UI screenshots to WebP/AVIF with responsive `srcset` and lazy decode before entering phone viewport. |
| **Scale Letterbox Distortion on Ultra-Wide or Mobile** | Medium | Low | Stage relies on mathematical aspect-ratio letterboxing (`Math.min(vw/1920, vh/1080)`) with pinned center origin. |
| **Premature SVG Complexity** | Medium | Medium | Consolidate common SVG nodes via `<defs>` and `<use>` elements to keep DOM tree lightweight. |
