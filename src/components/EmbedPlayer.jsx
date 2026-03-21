import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Youtube, Instagram, MessageCircle, ExternalLink, Play } from 'lucide-react'
import './EmbedPlayer.css'

const PLATFORM_META = {
  youtube:   { label: 'YouTube',   Icon: Youtube,       color: '#ff4444', ratio: '16/9' },
  instagram: { label: 'Instagram', Icon: Instagram,     color: '#e1306c', ratio: '1/1' },
  threads:   { label: 'Threads',   Icon: MessageCircle, color: '#888',     ratio: 'auto' },
}

function useInView(ref) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.2 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
  return inView
}

export default function EmbedPlayer({ platform, embedId, embedUrl, title, url }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const containerRef = useRef(null)
  const inView = useInView(containerRef)
  const meta = PLATFORM_META[platform] ?? { label: platform, Icon: ExternalLink, color: '#888', ratio: '16/9' }
  const { label, Icon, color, ratio } = meta

  // Auto-load Instagram/Threads when scrolled into view
  useEffect(() => {
    if (inView && (platform === 'instagram' || platform === 'threads')) {
      setIsPlaying(true)
    }
  }, [inView, platform])

  const renderEmbed = () => {
    // YouTube: show real thumbnail with play overlay
    if (platform === 'youtube') {
      if (!isPlaying) {
        return (
          <div
            className="embed-placeholder embed-placeholder--youtube"
            style={{ aspectRatio: ratio }}
            onClick={() => setIsPlaying(true)}
          >
            {embedId && (
              <img
                className="embed-thumbnail"
                src={`https://img.youtube.com/vi/${embedId}/hqdefault.jpg`}
                alt={title || 'YouTube video'}
                loading="lazy"
              />
            )}
            <div className="embed-placeholder-overlay">
              <div className="embed-play-button">
                <Play size={28} fill="white" color="white" />
              </div>
            </div>
          </div>
        )
      }
    }

    // Instagram/Threads: auto-loaded via IntersectionObserver; show skeleton until ready
    if (platform === 'youtube' || platform === 'instagram') {
      return (
        <div className="embed-frame-wrapper" style={{ aspectRatio: ratio }}>
          {!loaded && (
            <div className="embed-skeleton">
              <motion.div
                className="embed-skeleton-shimmer"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
              />
            </div>
          )}
          <iframe
            className={`embed-iframe ${loaded ? 'embed-iframe--loaded' : ''}`}
            src={embedUrl}
            title={title || label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            onLoad={() => setLoaded(true)}
          />
        </div>
      )
    }

    // Threads: link card fallback (auto-loaded, no iframe)
    return (
      <a
        className="embed-link-card"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="embed-link-card-text">{title || url}</span>
        <ExternalLink size={16} />
      </a>
    )
  }

  return (
    <motion.div
      ref={containerRef}
      className={`embed-player glass platform-${platform}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
    >
      <div className="embed-player-header">
        <span className="embed-platform-badge" style={{ '--badge-color': color }}>
          <Icon size={13} />
          {label}
        </span>
        {title && <span className="embed-player-title">{title}</span>}
        <a className="embed-external-link" href={url} target="_blank" rel="noopener noreferrer">
          <ExternalLink size={14} />
        </a>
      </div>
      {renderEmbed()}
    </motion.div>
  )
}
