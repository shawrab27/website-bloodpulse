# Quality Assurance & Testing Protocol — BloodPulse Website

## 1. Scene-by-Scene Manual QA Checklist

| Scene | Inspection Points | Expected Outcome | Pass/Fail |
| :---: | :--- | :--- | :---: |
| **01** | Butterfly 1 idle flap, logo rendering, 3 CTA buttons. | Wings flap smoothly at idle ($0.3\times$). CTAs clickable. No layout jump on initial scroll. | [ ] |
| **02** | Ambulance entry from left, siren light flash, collision with Butterfly 1. | Ambulance accelerates smoothly across road plane. Collision frame aligns with butterfly coordinate. | [ ] |
| **03** | Ambulance exit to right, Butterfly 1 tumbling to bottom-right corner. | Ambulance exits off-screen cleanly ($x > 1920$). Butterfly 1 rests in corner with faint, weak wing spasms. | [ ] |
| **04** | Butterfly 2 arrival from top, observation of Butterfly 1. | Butterfly 2 glides in gracefully. Both butterflies remain on stage simultaneously. | [ ] |
| **05** | Phone elevation, screen illumination, 3 segment items. | Phone rises smoothly to center. Top bar and segments render crisply without skew. | [ ] |
| **06** | Butterfly 2 tapping "Search for Donor", "Request to All" trigger. | Tapping animation triggers a visual pulse. No text or dialogue cards displayed. | [ ] |
| **07** | Bangladesh map reveal, distribution of blood-group tagged butterflies. | Map path renders cleanly. Butterfly nodes positioned accurately across divisions. | [ ] |
| **08** | Candidate selection, matching pulse, peripheral node blur. | Matching node illuminates brightly. Unmatched nodes desaturate without FPS drops. | [ ] |
| **09** | Live transit path, donor butterfly flight, Standby Donor indicator. | Donor trajectory draws cleanly. Standby Donor pill lights up as a fail-safe backup. | [ ] |
| **10** | Healing energy transfer, Butterfly 1 recovery and flight. | Energy stream connects to corner. Butterfly 1 regains full color and takes flight. | [ ] |
| **11** | Phone tour of 6 features (Feed, Blood Hub, Health Hub morphs, Community, PulseAI, Profile). | All 19 screenshots load without distortion. Health Hub sub-feature morphs transition seamlessly. "Create Poster" flashes in gaps. | [ ] |
| **12** | Swarm convergence into BP logo, final CTA cluster, footer links. | Particles converge smoothly into final brand mark. All footer and download links work properly. | [ ] |

---

## 2. Browser & Device Verification Matrix

| Device Category | Browser | Operating System | Min Resolution | Target FPS | Tested By | Status |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: |
| **Desktop Workstation** | Chrome Latest | Windows 11 / 10 | $1920 \times 1080$ | 60 fps | TBD | [ ] |
| **Desktop High-DPI** | Safari Latest | macOS Sonoma | $2560 \times 1440$ | 60 fps | TBD | [ ] |
| **Desktop Linux** | Firefox Latest | Ubuntu 22.04+ | $1920 \times 1080$ | 60 fps | TBD | [ ] |
| **Desktop Windows** | Edge Latest | Windows 11 | $1920 \times 1080$ | 60 fps | TBD | [ ] |
| **Tablet (Landscape)** | Mobile Safari | iPadOS 17+ | $1024 \times 768$ | 60 fps | TBD | [ ] |
| **Tablet (Portrait)** | Chrome Mobile | Android 13+ | $800 \times 1280$ | 45+ fps | TBD | [ ] |
| **Budget Smartphone** | Chrome Mobile | Android (Redmi/Moto) | $360 \times 800$ | 30+ fps | TBD | [ ] |
| **Flagship Smartphone** | Safari Mobile | iOS 17+ (iPhone 14+) | $393 \times 852$ | 60 fps | TBD | [ ] |

---

## 3. Performance & Budget Audits

- [ ] **JavaScript Payload Check**: Verify `dist/assets/*.js` total size is $< 150\text{ KB}$ gzipped.
- [ ] **CSS Payload Check**: Verify `dist/assets/*.css` total size is $< 20\text{ KB}$ gzipped.
- [ ] **Total Asset Weight**: Total initial network download $< 3.0\text{ MB}$.
- [ ] **HUD Telemetry Validation**:
  - Open page and press <kbd>D</kbd> to reveal Debug HUD.
  - Scroll from top to bottom (0% to 100%) continuously.
  - Verify FPS does not dip below 55 fps on desktop.
  - Verify velocity values react proportionally to scroll intensity.
- [ ] **Lighthouse Performance Score**: Minimum score of 95 on desktop profile.

---

## 4. Accessibility & Inclusive Motion Checks

- [ ] **Prefers-Reduced-Motion Test**:
  - In Windows: Settings -> Accessibility -> Visual effects -> Turn off "Animation effects".
  - In macOS: System Settings -> Accessibility -> Display -> Check "Reduce motion".
  - In Chrome DevTools: Rendering -> Emulate CSS media feature `prefers-reduced-motion: reduce`.
  - **Expected**: Smooth wheel scrolling is completely disabled. ScrollTrigger timeline scrub is disabled. Butterfly wings operate at a gentle, non-accelerating constant pace.
- [ ] **Keyboard Navigation**:
  - Tab through all actionable links (Web App, Google Play, App Store, Footer links).
  - Verify high-contrast focus rings appear on all active elements.
- [ ] **Screen Reader Verification**:
  - Test with NVDA / VoiceOver.
  - Verify SVG stage has appropriate `role="img"` and `aria-label`.
  - Verify visually hidden text provides a descriptive summary of the story and app links.

---

## 5. Security & Link Health Verification

- [ ] All external links include `target="_blank"` and `rel="noopener noreferrer"`.
- [ ] Outbound links point strictly to official BloodPulse URLs (`TBD` until production store listing).
- [ ] Content Security Policy (CSP) validates in browser console with zero blocked local asset errors.
- [ ] Automated dependency vulnerability check via `npm audit` returns 0 vulnerabilities.
