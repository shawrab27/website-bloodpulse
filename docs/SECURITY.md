# Security Architecture & Operations — BloodPulse Website

## 1. Threat Model for Static Storytelling Site
The BloodPulse marketing site is 100% static client-side code (HTML, CSS, JS, SVG, WebP). It possesses **no server-side runtime, no API endpoints, no database connections, and handles zero user credentials or financial transactions**.

### Assets to Protect
1. **Domain & Brand Integrity**: Preventing DNS hijacking, defacement, or unauthorized modifications that erode public trust in Bangladesh's emergency blood network.
2. **Visitor Privacy**: Protecting visitors from tracking, eavesdropping, or man-in-the-middle (MitM) content injection.
3. **App Store Referrals**: Ensuring app store links remain untampered and point strictly to verified official releases.

---

## 2. Secrets & Repository Hygiene
- **Zero Secrets Policy**: No API keys, server passwords, SSH keys, or environment credentials are ever committed to this repository.
- **Git Guardian Auditing**: Pre-commit hooks reject any files matching `.env`, `id_rsa`, or high-entropy credentials.
- **No Private Data**: No personally identifiable information (PII) of real blood donors or patients is stored in markup or assets. All mock records depicted in UI screenshots are anonymized test fixtures.

---

## 3. Web & Transport Security

### 3.1 HTTPS & Strict Transport Security (HSTS)
- All traffic is forced to HTTPS over TLS 1.3 (with TLS 1.2 fallback).
- HSTS enabled with `preload` and a 1-year max-age.

### 3.2 Nginx Security Headers Configuration
The following block must be included in the Nginx server block:

```nginx
# Security Headers Configuration
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=(), payment=(), usb=()" always;

# Strict Content Security Policy (Zero inline scripts, self-hosted assets only)
add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';" always;

# Strict Transport Security (HSTS)
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
```

### 3.3 External Outbound Links
All outbound links to Google Play, Apple App Store, and the BloodPulse Web App must include:
```html
<a href="https://play.google.com/store/apps/details?id=..." target="_blank" rel="noopener noreferrer">
```
This protects visitors against `window.opener` exploitation and tabnabbing attacks.

---

## 4. Dependency Governance
- **Lockfile Enforcement**: All CI and server builds must use `npm ci` rather than `npm install` to enforce exact checksum resolution from `package-lock.json`.
- **Automated Vulnerability Scans**: Run `npm audit` on every PR; any High or Critical vulnerability halts merging.
- **No Foreign CDNs**: All libraries (GSAP, Lenis) are bundled and served from the first-party origin. If an external CDN is ever evaluated, Subresource Integrity (`integrity="sha384-..."`) is mandatory.
- **Tracker Prohibition**: No unvetted third-party analytics (Google Analytics, Meta Pixel, tracking pixels) may be added without explicit consent and privacy policy alignment.

---

## 5. VPS Infrastructure Hardening Checklist

When deploying to the production Ubuntu Linux VPS:

- [ ] **SSH Hardening**:
  - Disable password authentication (`PasswordAuthentication no` in `/etc/ssh/sshd_config`).
  - Require Ed25519 or RSA 4096-bit SSH keys.
  - Disable root SSH login (`PermitRootLogin no`).
- [ ] **Firewall (UFW)**:
  - Default deny incoming: `ufw default deny incoming`.
  - Default allow outgoing: `ufw default allow outgoing`.
  - Open only necessary ports: `ufw allow 22/tcp`, `ufw allow 80/tcp`, `ufw allow 443/tcp`.
  - Enable: `ufw enable`.
- [ ] **Intrusion Prevention (Fail2ban)**:
  - Install and configure `fail2ban` targeting SSH and Nginx auth abuses.
- [ ] **Automated OS Patching**:
  - Install `unattended-upgrades` to automatically patch Linux kernel and critical security updates.
- [ ] **Filesystem Isolation**:
  - The website directory (`/var/www/bloodpulse`) must be owned by a dedicated deploy user, with Nginx (`www-data`) granted read-only permissions (`chmod 755`).

---

## 6. Disaster Recovery & Backup Plan
- **Git Origin**: GitHub is the primary single source of truth.
- **Static Artifact Snapshots**: The compiled `dist/` directory is version-tagged in deployment archives (`/var/www/bloodpulse/releases/`).
- **Recovery Time Objective (RTO)**: Under 5 minutes (point symlink to previous release folder).
- **Recovery Point Objective (RPO)**: Zero data loss (static code repository).

---

## 7. Product Claims Accuracy Policy
As an emergency healthcare platform, **trust is vital**.
- The marketing website must accurately reflect actual features present in the current production Flutter mobile application.
- The website must **never** claim unreleased features (e.g., automated drone delivery, commercial blood sales, blood test lab claims) unless verified and functional in the Flutter backend.
- Mark all experimental or roadmap features in documentation as **TBD**.
