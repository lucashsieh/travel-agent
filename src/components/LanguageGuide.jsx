import { useState, useCallback, useEffect } from 'react'
import db from '../db/schema'
import { useToast } from './Toast'
import './LanguageGuide.css'

const LANG_TABS = [
  { id: 'JP', label: '🇯🇵 日本語', ttsLang: 'ja-JP' },
  { id: 'KR', label: '🇰🇷 한국어', ttsLang: 'ko-KR' },
]

const DEFAULT_PHRASES = [
  // ── 日本語 ──
  { language: 'JP', category: '基礎用語', phrase: '你好', translation: 'こんにちは', pronunciation: 'Konnichiwa' },
  { language: 'JP', category: '基礎用語', phrase: '謝謝', translation: 'ありがとう', pronunciation: 'Arigatou' },
  { language: 'JP', category: '基礎用語', phrase: '不好意思', translation: 'すみません', pronunciation: 'Sumimasen' },
  { language: 'JP', category: '基礎用語', phrase: '我不懂', translation: 'わかりません', pronunciation: 'Wakarimasen' },
  { language: 'JP', category: '餐飲美食', phrase: '好吃！', translation: 'おいしい！', pronunciation: 'Oishii!' },
  { language: 'JP', category: '餐飲美食', phrase: '買單', translation: 'お会計お願いします', pronunciation: 'Okaikei onegaishimasu' },
  { language: 'JP', category: '餐飲美食', phrase: '不要辣', translation: '辛くしないでください', pronunciation: 'Karaku shinai de kudasai' },
  { language: 'JP', category: '交通導航', phrase: '...在哪裡？', translation: '...はどこですか？', pronunciation: '...wa doko desu ka?' },
  { language: 'JP', category: '交通導航', phrase: '火車站', translation: '駅', pronunciation: 'Eki' },
  { language: 'JP', category: '交通導航', phrase: '廁所', translation: 'トイレ', pronunciation: 'Toire' },
  { language: 'JP', category: '緊急求助', phrase: '救命！', translation: '助けて！', pronunciation: 'Tasukete!' },
  { language: 'JP', category: '緊急求助', phrase: '請叫警察', translation: '警察を呼んでください', pronunciation: 'Keisatsu wo yonde kudasai' },

  // ── 韓語 ──
  { language: 'KR', category: '基礎用語', phrase: '你好', translation: '안녕하세요', pronunciation: 'Annyeonghaseyo' },
  { language: 'KR', category: '基礎用語', phrase: '謝謝', translation: '감사합니다', pronunciation: 'Gamsahamnida' },
  { language: 'KR', category: '基礎用語', phrase: '不好意思', translation: '실례합니다', pronunciation: 'Sillyehamnida' },
  { language: 'KR', category: '基礎用語', phrase: '我不懂', translation: '모르겠어요', pronunciation: 'Moreugesseoyo' },
  { language: 'KR', category: '餐飲美食', phrase: '好吃！', translation: '맛있어요！', pronunciation: 'Massisseoyo!' },
  { language: 'KR', category: '餐飲美食', phrase: '買單', translation: '계산해 주세요', pronunciation: 'Gyesanhae juseyo' },
  { language: 'KR', category: '餐飲美食', phrase: '不要辣', translation: '맵지 않게 해주세요', pronunciation: 'Maepji aneun ge haejuseyo' },
  { language: 'KR', category: '交通導航', phrase: '...在哪裡？', translation: '...어디예요？', pronunciation: '...eodiyeyo?' },
  { language: 'KR', category: '交通導航', phrase: '地鐵站', translation: '지하철역', pronunciation: 'Jihacheol yeok' },
  { language: 'KR', category: '交通導航', phrase: '廁所', translation: '화장실', pronunciation: 'Hwajangsil' },
  { language: 'KR', category: '緊急求助', phrase: '救命！', translation: '도와주세요！', pronunciation: 'Dowajuseyo!' },
  { language: 'KR', category: '緊急求助', phrase: '請叫警察', translation: '경찰을 불러주세요', pronunciation: 'Gyeongchareul bulleo juseyo' },
]

const CATEGORY_OPTIONS = ['基礎用語', '餐飲美食', '交通導航', '緊急求助']

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

const EMPTY_FORM = { phrase: '', translation: '', pronunciation: '', category: CATEGORY_OPTIONS[0] }

export default function LanguageGuide() {
  const [activeLang, setActiveLang] = useState('JP')
  const [activeCategory, setActiveCategory] = useState('全部')
  const [copiedId, setCopiedId] = useState(null)
  const [customPhrases, setCustomPhrases] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const { speak, isTTSSupported } = useTTS()
  const { showToast } = useToast()

  const currentLangMeta = LANG_TABS.find((t) => t.id === activeLang)

  // Load custom phrases from Dexie on mount / lang switch
  useEffect(() => {
    db.languageGuide
      .where('language')
      .equals(activeLang)
      .and((p) => p.isCustom === 1)
      .toArray()
      .then(setCustomPhrases)
      .catch(() => setCustomPhrases([]))
  }, [activeLang])

  const defaultForLang = DEFAULT_PHRASES.filter((p) => p.language === activeLang)
  const allPhrases = [...defaultForLang, ...customPhrases]

  const categories = ['全部', ...CATEGORY_OPTIONS]
  const filtered =
    activeCategory === '全部'
      ? allPhrases
      : allPhrases.filter((p) => p.category === activeCategory)

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
    showToast('📋 已複製到剪貼簿！', 'success')
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!form.phrase.trim() || !form.translation.trim()) return
    setSaving(true)
    try {
      const newEntry = {
        language: activeLang,
        category: form.category,
        phrase: form.phrase.trim(),
        translation: form.translation.trim(),
        pronunciation: form.pronunciation.trim(),
        isCustom: 1,
        tripId: null,
      }
      const id = await db.languageGuide.add(newEntry)
      setCustomPhrases((prev) => [...prev, { ...newEntry, id }])
      setForm(EMPTY_FORM)
      setShowForm(false)
      showToast('✅ 單字已儲存！', 'success')
    } catch {
      showToast('❌ 儲存失敗，請重試', 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="language-guide">
      <h2 className="lg-title">語言手冊</h2>
      <p className="lg-subtitle">點擊複製 · 🔊 聆聽發音</p>

      {/* Language Tabs */}
      <div className="lg-lang-tabs">
        {LANG_TABS.map((tab) => (
          <button
            key={tab.id}
            className={`lg-lang-tab ${activeLang === tab.id ? 'active' : ''}`}
            onClick={() => { setActiveLang(tab.id); setActiveCategory('全部') }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Category Filters */}
      <nav className="lg-categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`lg-cat-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Phrase Grid */}
      <div className="lg-grid">
        {filtered.map((item, idx) => {
          const id = `${activeLang}-${item.category}-${idx}`
          const isCopied = copiedId === id
          return (
            <article key={id} className={`lg-card glass ${item.isCustom ? 'lg-card--custom' : ''}`}>
              <div className="lg-card-header">
                <span className="lg-category-tag">{item.category}</span>
                {item.isCustom ? <span className="lg-custom-badge">自訂</span> : null}
              </div>
              <p className="lg-phrase">{item.phrase}</p>
              <p className="lg-translation">{item.translation}</p>
              <p className="lg-pronunciation">[{item.pronunciation}]</p>
              <div className="lg-actions">
                <button
                  className={`lg-copy-btn ${isCopied ? 'copied' : ''}`}
                  onClick={() => handleCopy(item.translation, id)}
                  title="複製到剪貼簿"
                >
                  {isCopied ? '✓' : '📋'}
                </button>
                {isTTSSupported && (
                  <button
                    className="lg-tts-btn"
                    onClick={() => speak(item.translation, currentLangMeta.ttsLang)}
                    title="聆聽發音"
                    aria-label="朗讀"
                  >
                    🔊
                  </button>
                )}
              </div>
            </article>
          )
        })}
      </div>

      {/* Add Phrase Button */}
      <button className="lg-add-btn" onClick={() => setShowForm((v) => !v)}>
        {showForm ? '✕ 取消' : '＋ 新增單字'}
      </button>

      {/* UGC Form */}
      {showForm && (
        <form className="lg-form glass" onSubmit={handleSave}>
          <h3 className="lg-form-title">新增自訂單字</h3>
          <div className="lg-form-row">
            <label className="lg-form-label">
              分類
              <select
                className="lg-form-input"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              >
                {CATEGORY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
          </div>
          <div className="lg-form-row">
            <label className="lg-form-label">
              中文說明
              <input
                className="lg-form-input"
                type="text"
                placeholder="例：早安"
                value={form.phrase}
                onChange={(e) => setForm((f) => ({ ...f, phrase: e.target.value }))}
                required
              />
            </label>
          </div>
          <div className="lg-form-row">
            <label className="lg-form-label">
              原文
              <input
                className="lg-form-input"
                type="text"
                placeholder="例：おはようございます"
                value={form.translation}
                onChange={(e) => setForm((f) => ({ ...f, translation: e.target.value }))}
                required
              />
            </label>
          </div>
          <div className="lg-form-row">
            <label className="lg-form-label">
              發音（選填）
              <input
                className="lg-form-input"
                type="text"
                placeholder="例：Ohayou gozaimasu"
                value={form.pronunciation}
                onChange={(e) => setForm((f) => ({ ...f, pronunciation: e.target.value }))}
              />
            </label>
          </div>
          <button className="lg-form-submit" type="submit" disabled={saving}>
            {saving ? '儲存中…' : '💾 儲存單字'}
          </button>
        </form>
      )}

      {!isTTSSupported && (
        <p className="lg-tts-unsupported">⚠️ 您的瀏覽器不支援語音朗讀功能。</p>
      )}
    </section>
  )
}
