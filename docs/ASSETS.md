# Asset Inventory & Specification Registry — BloodPulse Website

## 1. Asset Registry Table

Every visual, vector, and raster asset required for the 12-scene animation experience is inventoried below with explicit ownership, format, and size budgets.

| Asset Identifier | File Path | Owner | Status | Format | Dimensions | Target Max Size | Usage & Notes |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Butterfly Master Vector** | `src/assets/svg/butterfly.svg` | Agent | Ready | SVG | Vector ($200 \times 150$) | $< 8\text{ KB}$ (3.2 KB) | Articulated left/right wings + body. Reused in Scenes 1, 4, 7, 8, 9, 10, 12. |
| **Emergency Ambulance** | `src/assets/svg/ambulance.svg` | Agent | Ready | SVG | Vector ($440 \times 220$) | $< 12\text{ KB}$ (3.7 KB) | High-contrast emergency vehicle with active siren light layer. Scenes 2 & 3. |
| **Smartphone Chassis Mock** | `src/assets/svg/phone-frame.svg` | Agent | Ready | SVG | Vector ($404 \times 860$) | $< 15\text{ KB}$ (1.1 KB) | Modern bezel-less chassis with speaker notch and display mask cutout. Scene 5 & 11. |
| **Bangladesh Vector Map** | `src/assets/svg/bangladesh-map.svg`| Agent | Pending | SVG | Vector ($800 \times 1000$)| $< 30\text{ KB}$ | Stylized administrative district borders of Bangladesh. Scene 7 & 8. |
| **ECG Pulse Line** | `src/assets/svg/ecg-pulse.svg` | Agent | Pending | SVG | Vector ($600 \times 120$) | $< 4\text{ KB}$ | Vital sign heartbeat wave used in transitions and loading pulses. |
| **BloodPulse Official Logo** | `src/assets/svg/logo-bloodpulse.svg`| User | TBD | SVG | Vector | $< 15\text{ KB}$ | Official logomark. User will supply final production SVG. Scene 1 & 12. |
| **Store Badge: Google Play** | `src/assets/svg/badge-googleplay.svg`| Agent | Ready | SVG | $180 \times 54$ | $< 6\text{ KB}$ | Official Play Store download pill. Scene 1 & 12. |
| **Store Badge: App Store** | `src/assets/svg/badge-appstore.svg` | Agent | Ready | SVG | $180 \times 54$ | $< 6\text{ KB}$ | Official Apple Store download pill. Scene 1 & 12. |
| **Store Badge: Web App** | `src/assets/svg/badge-webapp.svg` | Agent | Ready | SVG | $180 \times 54$ | $< 4\text{ KB}$ | "Open Web App" crimson pill. Scene 1 & 12. |
| **Poster Interlude Frame** | `src/assets/svg/poster-template.svg`| Agent | Pending | SVG | Vector ($400 \times 600$) | $< 10\text{ KB}$ | Emergency blood request poster mockup. Scene 11 interlude. |

---

## 2. Real Flutter App UI Screenshots (19 Screens)

All app screenshots are provided by the **User** (exported from the Flutter app) and processed by the **Agent** into compressed WebP format.

| Screen # | Asset Filename | Expected UI Content | Owner | Status | Format | Max Dimensions | Target Size |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **01** | `screen-search-donor.webp` | Search for Donor segment with blood type selector | User | TBD | WebP | $840 \times 1720$ | $< 90\text{ KB}$ |
| **02** | `screen-emergency-blood.webp` | Emergency urgent requests broadcast list | User | TBD | WebP | $840 \times 1720$ | $< 90\text{ KB}$ |
| **03** | `screen-blood-campaigns.webp` | Scheduled nationwide university / red crescent drives | User | TBD | WebP | $840 \times 1720$ | $< 90\text{ KB}$ |
| **04** | `screen-request-to-all.webp` | "Request to All" confirmation dialog & broadcast trigger | User | TBD | WebP | $840 \times 1720$ | $< 80\text{ KB}$ |
| **05** | `screen-map-view.webp` | Geographic donor proximity radius | User | TBD | WebP | $840 \times 1720$ | $< 95\text{ KB}$ |
| **06** | `screen-matching-donor.webp` | Verified matching donor profile card | User | TBD | WebP | $840 \times 1720$ | $< 85\text{ KB}$ |
| **07** | `screen-donor-tracking.webp` | Live donor transit route & ETA | User | TBD | WebP | $840 \times 1720$ | $< 90\text{ KB}$ |
| **08** | `screen-standby-donor.webp` | Standby fail-safe donor confirmation card | User | TBD | WebP | $840 \times 1720$ | $< 85\text{ KB}$ |
| **09** | `screen-feed.webp` | Community news feed, donations, stories | User | TBD | WebP | $840 \times 1720$ | $< 95\text{ KB}$ |
| **10** | `screen-blood-hub.webp` | Blood Hub inventory matrix & hospital sync | User / Agent | Ready | WebP | $1179 \times 2556$ | $119\text{ KB}$ |
| **11** | `screen-health-ai-report.webp` | PulseAI automated CBC lab report analyzer | User | TBD | WebP | $840 \times 1720$ | $< 90\text{ KB}$ |
| **12** | `screen-health-calculators.webp`| Blood volume and eligibility calculators | User | TBD | WebP | $840 \times 1720$ | $< 85\text{ KB}$ |
| **13** | `screen-health-accessories.webp`| Medical accessories and donation logistics | User | TBD | WebP | $840 \times 1720$ | $< 85\text{ KB}$ |
| **14** | `screen-health-recovery.webp` | Post-donation recovery tracker and nutrition advice | User | TBD | WebP | $840 \times 1720$ | $< 85\text{ KB}$ |
| **15** | `screen-health-guide.webp` | Pre-donation guidelines and health prerequisites | User | TBD | WebP | $840 \times 1720$ | $< 85\text{ KB}$ |
| **16** | `screen-community.webp` | Donor ranking, discussion clubs, badges | User | TBD | WebP | $840 \times 1720$ | $< 90\text{ KB}$ |
| **17** | `screen-pulseai-prompt.webp` | PulseAI clinical chat assistance interface | User | TBD | WebP | $840 \times 1720$ | $< 85\text{ KB}$ |
| **18** | `screen-pulseai-route-cost.webp`| PulseAI voice triage, hospital route & cost estimate | User | TBD | WebP | $840 \times 1720$ | $< 95\text{ KB}$ |
| **19** | `screen-profile.webp` | User donor card, blood type, digital donor certificate | User | TBD | WebP | $840 \times 1720$ | $< 85\text{ KB}$ |

---

## 3. Feed Collage Photography

Used as secondary decorative media elements inside Scene 11 (Feed overview):

| Asset Name | File Path | Owner | Status | Format | Target Size |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Donation Drive Photo 1** | `src/assets/img/feed-photo-01.webp` | User | TBD | WebP ($400 \times 300$) | $< 35\text{ KB}$ |
| **Donation Drive Photo 2** | `src/assets/img/feed-photo-02.webp` | User | TBD | WebP ($400 \times 300$) | $< 35\text{ KB}$ |
| **Volunteer Award Photo** | `src/assets/img/feed-photo-03.webp` | User | TBD | WebP ($400 \times 300$) | $< 35\text{ KB}$ |

---

## 4. Asset Ingestion Protocol
1. User provides raw screenshots/assets in high resolution (`src/assets/img/screen-bloodhub.png`).
2. Agent validates that filenames strictly match the table above.
3. Assets are converted to WebP (quality 85) via sharp, with UI cleanup scripts where required.
4. SVGs are sanitized with SVGO to strip editor metadata, inline styles, and unneeded attributes before committing.
