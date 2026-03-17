/**
 * embed-parser.js
 * Parses social media URLs into structured embed metadata.
 * Supports: YouTube, Instagram, Threads
 */

const PATTERNS = {
  youtube: [
    /(?:youtube\.com\/watch\?(?:.*&)?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/,
    /youtube\.com\/embed\/([A-Za-z0-9_-]{11})/,
    /youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/,
  ],
  instagram: [
    /instagram\.com\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)/,
  ],
  threads: [
    /threads\.(?:net|com)\/@[\w.]+\/post\/([A-Za-z0-9_-]+)/,
    /threads\.(?:net|com)\/t\/([A-Za-z0-9_-]+)/,
  ],
}

/**
 * Parses a URL and returns { platform, embedId, embedUrl } or null.
 */
export function parseEmbedUrl(url) {
  for (const [platform, patterns] of Object.entries(PATTERNS)) {
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) {
        const embedId = match[1]
        return { platform, embedId, embedUrl: buildEmbedUrl(platform, embedId, url) }
      }
    }
  }
  return null
}

function buildEmbedUrl(platform, embedId, originalUrl) {
  switch (platform) {
    case 'youtube':
      return `https://www.youtube.com/embed/${embedId}`
    case 'instagram':
      return `https://www.instagram.com/p/${embedId}/embed/`
    case 'threads':
      return originalUrl
    default:
      return originalUrl
  }
}

export function getPlatformLabel(platform) {
  return { youtube: 'YouTube', instagram: 'Instagram', threads: 'Threads' }[platform] ?? platform
}
