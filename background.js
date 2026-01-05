// Redirect Google Maps to Apple Maps desktop app

function isGoogleMapsUrl(url) {
  return (
    (url.hostname === 'www.google.com' || url.hostname === 'google.com') && url.pathname.startsWith('/maps') ||
    url.hostname === 'maps.google.com' ||
    url.hostname === 'www.maps.google.com' ||
    url.hostname === 'goo.gl' ||
    url.hostname === 'maps.app.goo.gl'
  );
}

function convertToAppleMapsUrl(googleUrl) {
  const params = new URLSearchParams(googleUrl.search);
  
  // Extract location info from various Google Maps URL formats
  let query = params.get('q');
  let place = params.get('place');
  let address = params.get('query');
  let daddr = params.get('daddr');
  
  // Build Apple Maps URL with maps:// protocol
  let appleMapsUrl = 'maps://';
  
  if (query) {
    appleMapsUrl += '?q=' + encodeURIComponent(query);
  } else if (place) {
    appleMapsUrl += '?q=' + encodeURIComponent(place);
  } else if (daddr) {
    appleMapsUrl += '?daddr=' + encodeURIComponent(daddr);
    if (params.get('saddr')) {
      appleMapsUrl += '&saddr=' + encodeURIComponent(params.get('saddr'));
    }
  } else if (address) {
    appleMapsUrl += '?address=' + encodeURIComponent(address);
  } else {
    // Try to extract place name from path (e.g., /maps/place/Golden+Gate+Bridge)
    const placeMatch = googleUrl.pathname.match(/\/place\/([^\/]+)/);
    if (placeMatch) {
      const placeName = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));
      appleMapsUrl += '?q=' + encodeURIComponent(placeName);
    } else {
      // Try to extract coordinates from the path
      const coordMatch = googleUrl.pathname.match(/\/@(-?\d+\.?\d*),(-?\d+\.?\d*)/);
      if (coordMatch) {
        appleMapsUrl += '?ll=' + coordMatch[1] + ',' + coordMatch[2];
      } else {
        // Fallback: use the whole URL as a query
        appleMapsUrl += '?q=' + encodeURIComponent(googleUrl.href);
      }
    }
  }
  
  return appleMapsUrl;
}

// Intercept Google Maps requests and redirect to Apple Maps
browser.webRequest.onBeforeRequest.addListener(
  function(details) {
    const url = new URL(details.url);
    
    if (isGoogleMapsUrl(url)) {
      const appleMapsUrl = convertToAppleMapsUrl(url);
      console.log('Redirecting Google Maps to Apple Maps:', details.url, '->', appleMapsUrl);
      
      return {
        redirectUrl: appleMapsUrl
      };
    }
  },
  {
    urls: [
      "*://*.google.com/maps*",
      "*://maps.google.com/*",
      "*://goo.gl/*",
      "*://maps.app.goo.gl/*"
    ],
    types: ["main_frame"]
  },
  ["blocking"]
);

console.log('Google Maps to Apple Maps redirector loaded');
