import { useState, useCallback } from 'react'
import './LanguageGuide.css'

const DEFAULT_PHRASES = [
  { category: 'Essentials', phrase: 'Hello', translation: 'こんにちは', pronunciation: 'Konnichiwa', language: 'Japanese' },
  { category: 'Essentials', phrase: 'Thank you', translation: 'ありがとう', pronunciation: 'Arigatou', language: 'Japanese' },
  { category: 'Essentials', phrase: 'Excuse me', translation: 'すみません', pronunciation: 'Sumimasen', language: 'Japanese' },
  { category: 'Essentials', phrase: 'I don\'t understand', translation: 'わかりません', pronunciation: 'Wakarimasen', language: 'Japanese' },
  { category: 'Food', phrase: 'Delicious!', translation: 'おいしい！', pronunciation: 'Oishii!', language: 'Japanese' },
  { category: 'Food', phrase: 'The check, please', translation: 'お会計お願いします', pronunciation: 'Okaikei onegaishimasu', language: 'Japanese' },
  { category: 'Food', phrase: 'No spicy please', translation: '辛くしないでください', pronunciation: 'Karaku shinai de kudasai', language: 'Japanese' },
  { category: 'Navigation', phrase: 'Where is...?', translation: 'どこですか？', pronunciation: '...wa doko desu ka?', language: 'Japanese' },
  { category: 'Navigation', phrase: 'Train station', translation: '駅', pronunciation: 'Eki', language: 'Japanese' },
  { category: 'Navigation', phrase: 'Toilet / Bathroom', translation: 'トイレ', pronunciation: 'Toire', language: 'Japanese' },
  { category: 'Emergency', phrase: 'Help!', translation: '助けて！', pronunciation: 'Tasukete!', language: 'Japanese' },
  { category: 'Emergency', phrase: 'Call the police', translation: '警察を呼んでください', pronunciation: 'Keisatsu wo yonde kudasai', language: 'Japanese' },
]

const CATEGORIES = [...new Set(DEFAULT_PHRASES.map((p) => p.category))]

function useTTS() {
  const speak = useCallback((text, lang = 'ja-JP') => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = 0.85
    window.speechSynthesis.speak(utterance)
  }, [])

  const isTTSSupported = 'speechSynthesis' in window
  return { speak, isTTSSupported }
}

export default function LanguageGuide({ phrases = DEFAULT_PHRASES }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [copiedId, setCopiedId] = useState(null)
  const { speak, isTTSSupported } = useTTS()

  const displayCategories = ['All', ...CATEGORIES]
  const filtered =
    activeCategory === 'All'
      ? phrases
      : phrases.filter((p) => p.category === activeCategory)

  const handleCopy = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 1800)
  }

  return (
    <section className="language-guide">
      <h2 className="lg-title">Language Guide</h2>
      <p className="lg-subtitle">Tap to copy · 🔊 to hear pronunciation</p>

      <nav className="lg-categories">
        {displayCategories.map((cat) => (
          <button
            key={cat}
            className={`lg-cat-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      <div className="lg-grid">
        {filtered.map((item, idx) => {
          const id = `${item.category}-${idx}`
          const isCopied = copiedId === id
          return (
            <article key={id} className="lg-card glass">
              <div className="lg-card-header">
                <span className="lg-category-tag">{item.category}</span>
              </div>
              <p className="lg-phrase">{item.phrase}</p>
              <p className="lg-translation">{item.translation}</p>
              <p className="lg-pronunciation">[{item.pronunciation}]</p>
              <div className="lg-actions">
                <button
                  className={`lg-copy-btn ${isCopied ? 'copied' : ''}`}
                  onClick={() => handleCopy(item.translation, id)}
                  title="Copy to clipboard"
                >
                  {isCopied ? '✓' : '📋'}
                </button>
                {isTTSSupported && (
                  <button
                    className="lg-tts-btn"
                    onClick={() => speak(item.translation)}
                    title="Hear pronunciation"
                    aria-label="Speak"
                  >
                    🔊
                  </button>
                )}
              </div>
            </article>
          )
        })}
      </div>

      {!isTTSSupported && (
        <p className="lg-tts-unsupported">
          ⚠️ Text-to-speech is not supported in your browser.
        </p>
      )}
    </section>
  )
}
