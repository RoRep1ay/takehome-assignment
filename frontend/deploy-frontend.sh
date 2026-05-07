#!/usr/bin/env bash
set -euo pipefail

FRONTEND_DIR="/var/www/takehome-assignment/frontend"

cd "$FRONTEND_DIR"

npm install
npm run build

sudo chmod -R o+rx /var/www/takehome-assignment

sudo nginx -t
sudo systemctl restart nginx

echo "Frontend rebuilt and deployed successfully."
