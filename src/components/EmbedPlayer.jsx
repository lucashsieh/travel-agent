import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Youtube, Instagram, MessageCircle, ExternalLink } from 'lucide-react'
import './EmbedPlayer.css'

const PLATFORM_META = {
  youtube:   { label: 'YouTube',   Icon: Youtube,       color: '#ff4444', ratio: '16/9' },
  instagram: { label: 'Instagram', Icon: Instagram,     color: '#e1306c', ratio: '1/1' },
  threads:   { label: 'Threads',   Icon: MessageCircle, color: '#888',     ratio: 'auto' },
}

export default function EmbedPlayer({ platform, embedId, embedUrl, title, url }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const meta = PLATFORM_META[platform] ?? { label: platform, Icon: ExternalLink, color: '#888', ratio: '16/9' }
  const { label, Icon, color, ratio } = meta

  const renderEmbed = () => {
    if (platform === 'youtube' || platform === 'instagram') {
      if (!isPlaying) {
        return (
          <div 
            className="embed-placeholder" 
            style={{ aspectRatio: ratio }}
            onClick={() => setIsPlaying(true)}
          >
            <div className="embed-placeholder-overlay">
              <Icon size={48} color={color} opacity={0.8} />
              <button className="embed-play-hint">點擊載入內容</button>
            </div>
          </div>
        )
      }

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

    // Threads: link card fallback
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
