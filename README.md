![icon](icons/icon-48.png)
# Google Maps to Apple Maps Redirector

A lightweight Firefox extension that automatically redirects Google Maps to the native Apple Maps desktop app on macOS.

## How it works
When you visit a google maps url, the browser extension will automatically forward you to apple maps desktop. This does not replace the URLs of the links on a page you visit as that can slow down your browser performance.

One caveat is if the link you click on opens google maps in a new tab, it will keep that dead tab open.


## Contributing
Feel free to contribute, it's not really that complex.

## Local Development
1. Clone the repository
1. Run `npm install` to install dependencies
1. Run `npm run start` to start a development server with hot reloading (You need normal Firefox to test, not Firefox Developer Edition)

## Testing

Try clicking on these Google Maps links to test:
- https://www.google.com/maps/place/Eiffel+Tower
- https://maps.google.com/?q=San+Francisco,CA
- Any Google Maps link with coordinates


### Linting

```bash
npm run test
```

## Releasing
Only I can release new versions of this extension, but here is release instructions for future reference.

### Building the Extension

```bash
# Simple build (just the script)
./build.sh

# Or using npm (after running npm install)
npm run build
```

This creates a zip file in `build/` directory ready for submission.


## License

MIT License - See [LICENSE](LICENSE) file for details
