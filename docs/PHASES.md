# Implementation Roadmap & Phase Deliverables — BloodPulse Website

## Overview
Development is strictly partitioned into linear, verifiable phases. No subsequent phase begins until all acceptance criteria of the current phase are verified and committed.

```
[Phase 0: Project Setup] (DONE)
          │
          ▼
[Phase 1: Butterfly Engine & Kinematics]
          │
          ▼
[Phase 2: Scenes 1-3 (Normalcy, Accident & Aftermath)]
          │
          ▼
[Phase 3: Scenes 4-5 (Witness Arrival & Phone Elevation)]
          │
          ▼
[Phase 4: Scenes 6-9 (Dispatch, Map Beacon, Match & Standby)]
          │
          ▼
[Phase 5: Scenes 10-11 (Revival & 6-Feature Tour)]
          │
          ▼
[Phase 6: Finale, Swarm Convergence & Footer CTA]
          │
          ▼
[Phase 7: Responsive Tablet, Mobile & Reduced Motion]
          │
          ▼
[Phase 8: Performance Audit, Cross-Browser QA & Deployment]
```

---

## Phase 0: Project Setup & Foundation
- **Status**: [x] Completed
- **Deliverables**:
  - [x] Vite Vanilla JS project initialization with GSAP and Lenis.
  - [x] Pinned $1920 \times 1080$ letterboxed stage with CSS scaling.
  - [x] 1200vh total scroll distance defined via `--scroll-height`.
  - [x] Core style tokens (`tokens.css`, `base.css`, `stage.css`).
  - [x] Scroll engine (`scroll.js`) with Lenis and GSAP ScrollTrigger sync.
  - [x] Master timeline (`timeline.js`) with scene labels `s1`..`s9`.
  - [x] Debug HUD toggled with key <kbd>D</kbd> (progress, label, FPS, velocity).
  - [x] Git repository initialized, `.gitignore` set, first commit "phase 0".
- **Acceptance Criteria**:
  - `npm run build` generates valid `dist/` bundle without errors.

---

## Phase 1: Butterfly Kinematics & Wing Engine
- **Status**: [ ] Pending
- **Deliverables**:
  - [ ] Implement `src/engine/wings.js` velocity controller.
  - [ ] Author articulated vector butterfly component in `src/assets/svg/butterfly.svg`.
  - [ ] Integrate `ScrollTrigger.getVelocity()` to scale wing flap frequency (`timeScale: 0.3` idle to `1.8` peak).
  - [ ] Implement smooth return damping when scroll velocity returns to zero.
- **Acceptance Criteria**:
  - Wings continuously flap at 0.3 timeScale when static.
  - Fast scroll elevates wing speed up to 1.8 timeScale smoothly.
  - Wings never come to a full stop.

---

## Phase 2: Scenes 1–3 (Normalcy, Accident & Aftermath)
- **Status**: [ ] Pending
- **Deliverables**:
  - [ ] `src/scenes/scene01.js`: Butterfly 1 idle flight, BloodPulse logo, top CTA buttons (Web App, Google Play, App Store).
  - [ ] `src/scenes/scene02.js`: Butterfly 1 descends; vector ambulance accelerates in from left ($x < 0$) with flashing siren and strikes Butterfly 1.
  - [ ] `src/scenes/scene03.js`: Ambulance exits rapidly to the right; Butterfly 1 lies injured in lower-right canvas corner with feeble wing spasms.
- **Acceptance Criteria**:
  - Seamless continuity: Scene 1 seamlessly transitions to Scene 2 collision; Scene 2 cleanly hands off to Scene 3.
  - Zero text or dialogue in narrative animations.
  - Butterfly 1 remains visible in the corner throughout subsequent scenes.

---

## Phase 3: Scenes 4–5 (Witness Arrival & The Digital Lifeline)
- **Status**: [ ] Pending
- **Deliverables**:
  - [ ] `src/scenes/scene04.js`: Butterfly 2 glides into view from upper viewport, discovers wounded Butterfly 1, and hovers anxiously.
  - [ ] `src/scenes/scene05.js`: Vector smartphone rises from bottom ($y=1080 \to 540$); illuminates display showing authentic top bar and 3 segments (Search for Donor, Emergency Blood, Blood Campaigns).
- **Acceptance Criteria**:
  - Phone elevation coordinates lock accurately to center stage without jitter.
  - Butterfly 2 moves in relation to the phone screen with natural organic easing.

---

## Phase 4: Scenes 6–9 (Dispatch, Map Beacon, Match & Standby)
- **Status**: [ ] Pending
- **Deliverables**:
  - [ ] `src/scenes/scene06.js`: Butterfly 2 taps "Search for Donor" and triggers "Request to All" floating action button.
  - [ ] `src/scenes/scene07.js`: Stylized vector map of Bangladesh unfolds; multiple small butterfly nodes labeled with blood types (A+, B+, O+, AB+) flare to life across districts.
  - [ ] `src/scenes/scene08.js`: Candidate matching sequence; matching donor beacon illuminates brightly while peripheral beacons soften/blur.
  - [ ] `src/scenes/scene09.js`: Live donor transit tracking; incoming donor butterfly flies toward emergency location; Standby Donor indicator activates as fail-safe backup.
- **Acceptance Criteria**:
  - Map coordinates accurately reflect geographic proportions of Bangladesh.
  - Matching transition clearly distinguishes the primary donor while highlighting standby redundancy.

---

## Phase 5: Scenes 10–11 (Revival & 6-Feature Ecosystem Tour)
- **Status**: [ ] Pending
- **Deliverables**:
  - [ ] `src/scenes/scene10.js`: Transfusion energy stream links to Butterfly 1; Butterfly 1 regains vibrant red hue, recovers, and takes flight beside Butterfly 2.
  - [ ] `src/scenes/scene11.js`: Phone returns to focus; Butterfly 2 conducts deep tour of 6 core app sections:
    1. Feed (with community collage photos).
    2. Blood Hub.
    3. Health Hub (morphing between AI Report, Calculators, Accessories, Recovery, and Guide).
    4. Community.
    5. PulseAI (question prompt, voice interaction, hospital route and cost estimate).
    6. Profile.
    - "Create Poster" appears in transitional gaps.
- **Acceptance Criteria**:
  - All 19 WebP app screenshots render crisply inside phone viewport without distortion.
  - Morph transitions between Health Hub sub-features execute smoothly without visual pops.

---

## Phase 6: Finale, Swarm Convergence & Footer
- **Status**: [ ] Pending
- **Deliverables**:
  - [ ] `src/scenes/scene12.js`: Butterfly swarm converges from edges into central BloodPulse official logomark.
  - [ ] Final call-to-action cluster (Open Web App, Google Play, App Store).
  - [ ] Clean institutional footer with copyright, links, and emergency helpline.
- **Acceptance Criteria**:
  - Particle convergence completes cleanly into the vector logo mark.
  - All CTA links point to valid destination URLs with `target="_blank"` and `rel="noopener noreferrer"`.

---

## Phase 7: Responsive Tablet, Mobile & Reduced Motion
- **Status**: [ ] Pending
- **Deliverables**:
  - [ ] Implement responsive layouts inside `src/engine/device.js` for Tablet (`600-1023px`) and Mobile (`<600px`).
  - [ ] Node budget capping enforced (Desktop: 20, Tablet: 12, Mobile: 8).
  - [ ] Full verification of `prefers-reduced-motion` compliance.
- **Acceptance Criteria**:
  - Smooth user experience on mobile touch viewports without horizontal clipping.
  - Zero motion sickness or scrubbing jumps when reduced motion is requested.

---

## Phase 8: Performance Audit, Cross-Browser QA & Deployment
- **Status**: [ ] Pending
- **Deliverables**:
  - [ ] Final Lighthouse audit ($>95$ across Performance and Accessibility).
  - [ ] Cross-browser validation across Chrome, Edge, Safari, Firefox.
  - [ ] Production build and Nginx deployment script configuration.
- **Acceptance Criteria**:
  - First load bundle $< 3.0\text{ MB}$; JavaScript $< 150\text{ KB}$ gzipped.
  - Stable $60\text{ fps}$ desktop performance during full scrub.
