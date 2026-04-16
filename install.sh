#!/usr/bin/env bash
set -e

NAME=homebridge-cli
REPO_URL=https://github.com/liam-hales/homebridge-cli

echo "Installing ${NAME}..."
echo ""
echo "  Version:     latest"
echo "  Repository:  $REPO_URL"
echo ""

if ! command -v node &> /dev/null; then
  echo "× Error: Node.js not installed — please install a version >=24.13"
  exit 1
fi

if ! (command -v git &> /dev/null); then
  echo "× Error: Git not installed"
  exit 1
fi

echo "➤ Creating temp directory..."

TEMP_DIR=$(mktemp -d)
trap 'rm -rf $TEMP_DIR' EXIT

echo "➤ Downloading..."
git clone --quiet "$REPO_URL.git" "$TEMP_DIR"
cd "$TEMP_DIR"

echo "➤ Enabling corepack..."
corepack enable

echo "➤ Installing dependencies..."
yarn install > /dev/null

echo "➤ Building..."
yarn build

echo "➤ Packaging..."
yarn pack --out "$NAME.tgz" > /dev/null

echo "➤ Linking..."
npm install --silent --global "./$NAME.tgz"

echo ""
echo "✔ Install complete!"
echo ""
echo "  Run \`$NAME\` to start"
echo "  Run \`npm uninstall -g $NAME\` to uninstall"
