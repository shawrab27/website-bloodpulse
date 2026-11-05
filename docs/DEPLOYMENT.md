# Deployment & Infrastructure Guide — BloodPulse Website

## 1. Hosting Architecture
The BloodPulse marketing website is hosted as a high-performance static site on a Linux Virtual Private Server (VPS) running Ubuntu 22.04+ LTS and Nginx. It operates in isolation from other web services or backend API microservices hosted on the same server.

```
+-------------------------------------------------------------------------+
|                           DNS / CDN (Cloudflare)                        |
|                     A Record -> [VPS Static Public IP]                  |
+-------------------------------------------------------------------------+
                                    |
                                    v (Port 80 / 443)
+-------------------------------------------------------------------------+
|                               Ubuntu VPS                                |
|  +-------------------------------------------------------------------+  |
|  |                            Nginx Core                             |  |
|  |  - TLS Termination (Let's Encrypt SSL)                            |  |
|  |  - Gzip / Brotli Compression                                      |  |
|  |  - Immutable Asset Cache / Short HTML Cache                       |  |
|  +-------------------------------------------------------------------+  |
|                                   |                                     |
|                                   v (Root Path)                         |
|  /var/www/bloodpulse/current/dist -> /releases/20261105_150000/dist     |
+-------------------------------------------------------------------------+
```

---

## 2. Nginx Server Configuration Block

Create `/etc/nginx/sites-available/bloodpulse.conf`:

```nginx
# HTTP - Redirect all traffic to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name bloodpulse.org www.bloodpulse.org; # Replace with production domain

    # Allow Let's Encrypt ACME challenge
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

# HTTPS - Primary Production Host
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name bloodpulse.org www.bloodpulse.org;

    # Document Root (points to the atomic symlink)
    root /var/www/bloodpulse/current/dist;
    index index.html;

    # SSL Certificates (managed by Certbot)
    ssl_certificate /etc/letsencrypt/live/bloodpulse.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/bloodpulse.org/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;

    # Security Headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none';" always;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript application/rss+xml application/atom+xml image/svg+xml;

    # HTML: Short cache with mandatory revalidation
    location = /index.html {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # Hashed Static Assets (Vite produces content hashes like index-CX9VEV86.js): Immutable 1-Year Cache
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Public static assets (favicons, manifest)
    location ~* \.(ico|png|jpg|jpeg|webp|svg|woff|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # Fallback routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Access & Error Logs
    access_log /var/log/nginx/bloodpulse_access.log;
    error_log /var/log/nginx/bloodpulse_error.log warn;
}
```

Enable configuration:
```bash
sudo ln -s /etc/nginx/sites-available/bloodpulse.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 3. SSL Configuration (Let's Encrypt)
Execute Certbot to provision TLS certificates:
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d bloodpulse.org -d www.bloodpulse.org
```

---

## 4. Cloudflare Proxy Option (Recommended)
If using Cloudflare CDN:
1. Set SSL/TLS Encryption Mode to **Full (Strict)**.
2. Enable **Auto Minify** (HTML, CSS, JS).
3. Enable **Brotli** compression.
4. Set **Security Level** to Medium.
5. In Nginx, restore visitor real IP addresses via `set_real_ip_from` Cloudflare IP ranges.

---

## 5. Atomic Deployment Pipeline

Deployments employ an atomic symlink pattern to guarantee zero-downtime releases:

```
/var/www/bloodpulse/
├── releases/
│   ├── 20261105_140000/
│   │   └── dist/
│   └── 20261105_150000/
│       └── dist/
└── current -> /var/www/bloodpulse/releases/20261105_150000
```

### Deployment Script (`deploy.sh`)
```bash
#!/usr/bin/env bash
set -e

REPO_DIR="/var/www/bloodpulse/repo"
RELEASES_DIR="/var/www/bloodpulse/releases"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
TARGET_RELEASE="$RELEASES_DIR/$TIMESTAMP"

echo "--> Pulling latest code..."
cd "$REPO_DIR"
git fetch origin main
git checkout main
git pull origin main

echo "--> Installing dependencies & building..."
npm ci
npm run build

echo "--> Creating release folder: $TARGET_RELEASE"
mkdir -p "$TARGET_RELEASE"
cp -r dist "$TARGET_RELEASE/"

echo "--> Atomic symlink switch..."
ln -sfn "$TARGET_RELEASE" /var/www/bloodpulse/current

echo "--> Purging old releases (keep last 5)..."
cd "$RELEASES_DIR"
ls -1dt * | tail -n +6 | xargs rm -rf 2>/dev/null || true

echo "--> Reloading Nginx..."
sudo systemctl reload nginx

echo "Deployment complete at $TIMESTAMP."
```

---

## 6. Rollback Procedure
If a defect is observed post-deployment, instant rollback requires only pointing the symlink to the previous release folder:

```bash
# View previous releases
ls -la /var/www/bloodpulse/releases/

# Re-point symlink to desired previous release
ln -sfn /var/www/bloodpulse/releases/<PREVIOUS_TIMESTAMP> /var/www/bloodpulse/current

# Reload Nginx
sudo systemctl reload nginx
```
**Time to rollback: $< 10\text{ seconds}$.**

---

## 7. Pre-Launch DNS Checklist

- [ ] **A Record**: Root domain (`@` or `bloodpulse.org`) pointing to VPS static IPv4 (`TBD`).
- [ ] **AAAA Record**: Root domain pointing to VPS static IPv6 (`TBD`).
- [ ] **CNAME Record**: Subdomain `www` pointing to `bloodpulse.org`.
- [ ] **TTL**: Configured to 300 seconds during rollout, switching to 86400 seconds post-stabilization.
- [ ] **DNSSEC**: Enabled on the registrar.
