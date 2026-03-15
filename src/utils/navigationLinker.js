/**
 * Navigation Linker Utilities
 * Generates deep-link URLs for Google Maps and Apple Maps
 */

/**
 * Detect if the current device is iOS/macOS (for Apple Maps preference)
 * @returns {boolean}
 */
export function isAppleDevice() {
  if (typeof navigator === 'undefined') return false
  return /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent)
}

/**
 * Build a Google Maps directions URL.
 *
 * @param {Object} options
 * @param {string} [options.origin]       - Starting address or "lat,lng" (omit for "My Location")
 * @param {string} options.destination    - Destination address or "lat,lng"
 * @param {string} [options.travelMode]   - 'driving' | 'walking' | 'bicycling' | 'transit'
 * @returns {string} Full Google Maps URL
 */
export function buildGoogleMapsUrl({ origin = '', destination, travelMode = 'driving' }) {
  const base = 'https://www.google.com/maps/dir/'
  const params = new URLSearchParams({
    api: '1',
    destination,
    travelmode: travelMode,
  })
  if (origin) params.set('origin', origin)
  return `${base}?${params.toString()}`
}

/**
 * Build an Apple Maps URL.
 * Works as a universal deep-link on iOS/macOS; falls back to web on other platforms.
 *
 * @param {Object} options
 * @param {string} [options.origin]       - Starting address or "lat,lng"
 * @param {string} options.destination    - Destination address or "lat,lng"
 * @param {string} [options.travelMode]   - 'd' | 'w' | 'r' (driving/walking/transit)
 * @returns {string} Apple Maps URL
 */
export function buildAppleMapsUrl({ origin = '', destination, travelMode = 'd' }) {
  const base = 'https://maps.apple.com/'
  const params = new URLSearchParams({
    daddr: destination,
    dirflg: travelMode,
  })
  if (origin) params.set('saddr', origin)
  return `${base}?${params.toString()}`
}

/**
 * Build a Google Maps place search URL.
 *
 * @param {string} query - Place name or address to search
 * @returns {string} Google Maps search URL
 */
export function buildGoogleMapsSearchUrl(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

/**
 * Build an Apple Maps place search URL.
 *
 * @param {string} query - Place name or address to search
 * @returns {string} Apple Maps search URL
 */
export function buildAppleMapsSearchUrl(query) {
  return `https://maps.apple.com/?q=${encodeURIComponent(query)}`
}

/**
 * Return the best navigation link for the current device.
 * Prefers Apple Maps on Apple devices, Google Maps otherwise.
 *
 * @param {Object} options
 * @param {string} [options.origin]
 * @param {string} options.destination
 * @param {'driving'|'walking'|'transit'} [options.travelMode]
 * @returns {{ url: string, provider: 'google' | 'apple' }}
 */
export function getBestNavigationUrl({ origin = '', destination, travelMode = 'driving' }) {
  if (isAppleDevice()) {
    const appleMode = travelMode === 'transit' ? 'r' : travelMode === 'walking' ? 'w' : 'd'
    return {
      url: buildAppleMapsUrl({ origin, destination, travelMode: appleMode }),
      provider: 'apple',
    }
  }
  return {
    url: buildGoogleMapsUrl({ origin, destination, travelMode }),
    provider: 'google',
  }
}

/**
 * Open the best navigation link in a new tab.
 *
 * @param {Object} options - Same as getBestNavigationUrl
 * @returns {{ url: string, provider: string }}
 */
export function openNavigation(options) {
  const result = getBestNavigationUrl(options)
  window.open(result.url, '_blank', 'noopener,noreferrer')
  return result
}
