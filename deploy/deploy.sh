#!/bin/bash
# deploy.sh — run on VPS to deploy/update Geeta Portal
# Usage: bash deploy.sh
set -e

APP_DIR="/var/www/geeta-portal"
REPO="https://github.com/YOUR_USERNAME/geeta-portal.git"   # update this

echo "==> Pulling latest code..."
if [ -d "$APP_DIR/.git" ]; then
  cd "$APP_DIR" && git pull origin main
else
  git clone "$REPO" "$APP_DIR"
  cd "$APP_DIR"
fi

# ── Backend ──────────────────────────────────────────────────────────────────
echo "==> Installing backend dependencies..."
cd "$APP_DIR/backend"
npm install --omit=dev

echo "==> Running seed (optional, comment out after first deploy)..."
# npm run seed

# ── Frontend ──────────────────────────────────────────────────────────────────
echo "==> Building frontend..."
cd "$APP_DIR/frontend"
pnpm install
pnpm build

# ── PM2 ───────────────────────────────────────────────────────────────────────
echo "==> Restarting API with PM2..."
cd "$APP_DIR/backend"
pm2 startOrRestart "$APP_DIR/deploy/ecosystem.config.js" --env production
pm2 save

echo "==> Reloading Nginx..."
sudo nginx -t && sudo systemctl reload nginx

echo ""
echo "Deployment complete!"
