#!/usr/bin/env bash
set -euo pipefail

FRONTEND_DIR="$HOME/takehome-assignment/frontend"
NGINX_DIR="/var/www/takehome/frontend"

cd "$FRONTEND_DIR"

npm install
npm run build

sudo mkdir -p "$NGINX_DIR"
sudo rm -rf "$NGINX_DIR"/*
sudo cp -r dist/* "$NGINX_DIR"/

sudo nginx -t
sudo systemctl restart nginx

echo "Frontend rebuilt and deployed successfully."
