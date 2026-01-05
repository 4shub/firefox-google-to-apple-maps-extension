#!/bin/bash

# Build script for Firefox Apple Maps Redirector extension

set -e  # Exit on error

echo "🔨 Building Firefox Apple Maps Redirector..."

# Get version from manifest.json
VERSION=$(grep -o '"version": "[^"]*' manifest.json | grep -o '[0-9.]*$')
echo "📦 Version: $VERSION"

# Create build directory if it doesn't exist
mkdir -p build

# Output filename
OUTPUT="build/firefox-apple-maps-redirect-v${VERSION}.zip"

# Remove old build if exists
if [ -f "$OUTPUT" ]; then
    echo "🗑️  Removing old build..."
    rm "$OUTPUT"
fi

# Create the zip file with only necessary files
echo "📁 Packaging extension..."
zip -r "$OUTPUT" \
    manifest.json \
    background.js \
    icons/icon-48.png \
    icons/icon-96.png \
    README.md \
    LICENSE \
    -x "*.DS_Store" "*.af" "*.af~lock~"

echo "✅ Build complete: $OUTPUT"
echo ""
echo "📊 Package contents:"
unzip -l "$OUTPUT"

echo ""
echo "🚀 Next steps:"
echo "   1. Test the extension: about:debugging -> Load Temporary Add-on -> Select $OUTPUT"
echo "   2. Submit to Mozilla: https://addons.mozilla.org/developers/addon/submit/distribution"
echo ""
echo "   Or use web-ext for automated testing:"
echo "   npx web-ext run --source-dir=."
