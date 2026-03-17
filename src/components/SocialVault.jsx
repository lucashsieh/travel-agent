import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Film } from 'lucide-react'
import db from '../db/schema'
import { parseEmbedUrl, getPlatformLabel } from '../utils/embed-parser'
import EmbedPlayer from './EmbedPlayer'
import './SocialVault.css'

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] } },
  exit:    { opacity: 0, y: -8,  transition: { duration: 0.18, ease: [0.4, 0, 0.2, 1] } },
}

export default function SocialVault() {
  const [embeds, setEmbeds]         = useState([])
  const [urlInput, setUrlInput]     = useState('')
  const [titleInput, setTitleInput] = useState('')
  const [error, setError]           = useState('')
  const [adding, setAdding]         = useState(false)

  useEffect(() => {
    db.mediaEmbeds.orderBy('addedAt').reverse().toArray().then(setEmbeds)
  }, [])

  async function handleAdd(e) {
    e.preventDefault()
    setError('')
    const url = urlInput.trim()
    if (!url) return

    const parsed = parseEmbedUrl(url)
    if (!parsed) {
      setError('無法識別此連結，請使用 YouTube、Instagram 或 Threads 的網址。')
      return
    }

    setAdding(true)
    const record = {
      platform: parsed.platform,
      embedId:  parsed.embedId,
      embedUrl: parsed.embedUrl,
      url,
      title:    titleInput.trim() || getPlatformLabel(parsed.platform),
      category: 'general',
      addedAt:  new Date().toISOString(),
    }

    const id = await db.mediaEmbeds.add(record)
    setEmbeds(prev => [{ ...record, id }, ...prev])
    setUrlInput('')
    setTitleInput('')
    setAdding(false)
  }

  async function handleDelete(id) {
    await db.mediaEmbeds.delete(id)
    setEmbeds(prev => prev.filter(e => e.id !== id))
  }

  return (
    <motion.div className="social-vault" variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <div className="social-vault-header">
        <Film size={22} strokeWidth={1.8} className="social-vault-header-icon" />
        <div>
          <h2 className="section-title">社群靈感庫</h2>
          <p className="section-sub">收藏 YouTube、Instagram、Threads 旅遊靈感</p>
        </div>
      </div>

      {/* ── Add Form ── */}
      <form className="vault-form glass" onSubmit={handleAdd}>
        <div className="vault-form-fields">
          <input
            className="vault-input"
            type="url"
            placeholder="貼上 YouTube / Instagram / Threads 連結…"
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            required
          />
          <input
            className="vault-input vault-input--title"
            type="text"
            placeholder="標題（選填）"
            value={titleInput}
            onChange={e => setTitleInput(e.target.value)}
          />
        </div>
        {error && <p className="vault-error">{error}</p>}
        <motion.button
          className="vault-add-btn btn-primary"
          type="submit"
          disabled={adding}
          whileTap={{ scale: 0.96 }}
        >
          <Plus size={16} />
          新增
        </motion.button>
      </form>

      {/* ── Grid ── */}
      {embeds.length === 0 ? (
        <div className="vault-empty">
          <span className="vault-empty-icon">🎬</span>
          <p>尚未收藏任何內容，貼上連結開始吧！</p>
        </div>
      ) : (
        <div className="vault-grid">
          <AnimatePresence>
            {embeds.map(embed => (
              <motion.div
                key={embed.id}
                className="vault-card"
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.22 }}
              >
                <EmbedPlayer
                  platform={embed.platform}
                  embedId={embed.embedId}
                  embedUrl={embed.embedUrl}
                  title={embed.title}
                  url={embed.url}
                />
                <button
                  className="vault-delete-btn"
                  onClick={() => handleDelete(embed.id)}
                  title="刪除"
                >
                  <Trash2 size={14} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  )
}
