#!/usr/bin/env bash
set -euo pipefail

FRONTEND_DIR="/var/www/takehome-assignment/frontend"
NGINX_DIR="/var/www/takehome-assignment/frontend/dist"

cd "$FRONTEND_DIR"

npm install
npm run build

sudo mkdir -p "$NGINX_DIR"
sudo rm -rf "$NGINX_DIR"/*
sudo cp -r dist/* "$NGINX_DIR"/
sudo chmod -R o+rx /var/www/takehome-assignment

sudo nginx -t
sudo systemctl restart nginx

echo "Frontend rebuilt and deployed successfully."
