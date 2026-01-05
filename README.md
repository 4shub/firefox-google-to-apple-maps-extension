# Google Maps to Apple Maps Redirector

A lightweight Firefox extension that automatically redirects Google Maps to the native Apple Maps desktop app on macOS.

## Features

- **Lightweight** - Only runs when you visit Google Maps (no performance impact on other sites)
- Automatically redirects Google Maps URLs to Apple Maps when you navigate
- Opens the native Apple Maps desktop application on macOS
- Works seamlessly with the macOS protocol handler dialog
- Converts Google Maps coordinates, searches, and place URLs to Apple Maps format
- Works with various Google Maps URL formats including:
  - Direct links (maps.google.com)
  - Google.com/maps URLs
  - Shortened goo.gl links
  - Place searches and coordinates

## Installation

### For Development/Testing:

1. Open Firefox and navigate to `about:debugging`
2. Click "This Firefox" in the left sidebar
3. Click "Load Temporary Add-on"
4. Navigate to this directory and select the `manifest.json` file
5. The extension is now loaded and will work until you restart Firefox

### For Permanent Installation:

1. Package the extension:
   - Zip all files in this directory (manifest.json, background.js, icons folder)
   - Name it something like `maps-redirector.xpi`
2. In Firefox, go to `about:addons`
3. Click the gear icon and select "Install Add-on From File"
4. Select your .xpi file

## How It Works

The extension uses Firefox's `webRequest` API to intercept navigation to Google Maps URLs. It:

1. Only activates when you navigate to a Google Maps URL
2. Intercepts the request before the page loads
3. Parses the Google Maps URL to extract location information (coordinates, search queries, addresses)
4. Redirects to a `maps://` URL instead
5. The browser's native protocol handler opens Apple Maps
6. On first use, macOS will ask for permission to open links in Apple Maps (click "Always Allow")

**Performance**: This approach is extremely lightweight because:
- No scanning of web pages
- No MutationObservers or content scripts
- Only runs when you actually visit Google Maps (not on every page you browse)
- Zero impact on browsing performance

## Icons

Note: The extension currently references icon files in the `icons/` folder. You'll want to add proper icon images:
- `icons/icon-48.png` (48x48 pixels)
- `icons/icon-96.png` (96x96 pixels)

You can create simple icons or use any image editing tool to create them.

## Testing

Try clicking on these Google Maps links to test:
- https://www.google.com/maps/place/Eiffel+Tower
- https://maps.google.com/?q=San+Francisco,CA
- Any Google Maps link with coordinates

## License

MIT
