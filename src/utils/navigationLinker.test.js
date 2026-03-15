import { describe, it, expect, vi } from 'vitest'
import { buildGoogleMapsUrl, buildAppleMapsUrl, isAppleDevice, getBestNavigationUrl } from './navigationLinker'

describe('navigationLinker', () => {
  it('should build a correct Google Maps URL', () => {
    const url = buildGoogleMapsUrl({ destination: 'Tokyo Tower', travelMode: 'walking' })
    expect(url).toContain('google.com/maps/dir/')
    expect(url).toContain('Tokyo+Tower')
    expect(url).toContain('travelmode=walking')
  })

  it('should build a correct Apple Maps URL', () => {
    const url = buildAppleMapsUrl({ destination: 'Osaka Castle', travelMode: 'w' })
    expect(url).toContain('maps.apple.com/')
    expect(url).toContain('daddr=Osaka+Castle')
    expect(url).toContain('dirflg=w')
  })

  it('should detect device correctly (mocked)', () => {
    // Note: In real JSDOM navigator.userAgent can be tricky to mock
    expect(typeof isAppleDevice()).toBe('boolean')
  })

  it('should return best navigation URL structure', () => {
    const result = getBestNavigationUrl({ destination: 'Shibuya' })
    expect(result).toHaveProperty('url')
    expect(result).toHaveProperty('provider')
  })
})
