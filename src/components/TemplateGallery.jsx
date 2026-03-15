import { useState } from 'react'
import './TemplateGallery.css'
import { useToast } from './Toast'

const CATEGORIES = [
  {
    id: 'food',
    label: '美食餐廳',
    emoji: '🍜',
    prompts: [
      {
        title: '在地餐廳搜尋',
        template: `Find the best local restaurants near [LOCATION] that are:
- Authentic & non-touristy
- Open at [TIME]
- Budget: [BUDGET_RANGE]
- Cuisine type: [CUISINE]

Provide: name, address, must-order dish, price range, and a one-line reason why it's worth visiting.

FORMAT: STRUCTURED_BLOCK`,
      },
      {
        title: '街頭小吃指南',
        template: `List the top street food spots in [LOCATION] with:
- Name of dish and vendor location
- Best time to visit
- Estimated cost per serving
- Any dietary notes (vegetarian, halal, etc.)

FORMAT: STRUCTURED_BLOCK`,
      },
    ],
  },
  {
    id: 'shopping',
    label: '購物逛街',
    emoji: '🛍️',
    prompts: [
      {
        title: '在地市場指南',
        template: `What are the best local markets in [LOCATION] for:
- Souvenirs & handicrafts
- Fresh produce
- Clothing & textiles

Include: market name, location, operating hours, and what to look for.

FORMAT: STRUCTURED_BLOCK`,
      },
      {
        title: '殺價技巧指南',
        template: `Provide cultural bargaining tips for shopping in [COUNTRY/REGION]:
- Is bargaining acceptable?
- Starting price strategy
- Key phrases in local language
- What NOT to do

FORMAT: STRUCTURED_BLOCK`,
      },
    ],
  },
  {
    id: 'attractions',
    label: '景點探索',
    emoji: '🏛️',
    prompts: [
      {
        title: '隱藏秘境探訪',
        template: `What are the hidden gems or underrated attractions in [LOCATION] that most tourists miss?

For each: name, why it's special, best time to visit, how to get there, estimated time needed.

FORMAT: STRUCTURED_BLOCK`,
      },
      {
        title: '一日行程規劃',
        template: `Plan a full-day itinerary in [LOCATION] starting at [START_TIME]:
- Morning, afternoon, and evening activities
- Include meal breaks
- Transportation between spots
- Estimated costs

FORMAT: STRUCTURED_BLOCK`,
      },
    ],
  },
  {
    id: 'events',
    label: '活動節慶',
    emoji: '🎉',
    prompts: [
      {
        title: '在地活動與節慶',
        template: `What local events, festivals, or cultural happenings are in [LOCATION] during [MONTH/DATES]?

Include: event name, dates, location, significance, and how to participate or attend.

FORMAT: STRUCTURED_BLOCK`,
      },
      {
        title: '夜生活指南',
        template: `What is the nightlife scene like in [LOCATION]?
- Top areas/neighborhoods
- Best bars, clubs, or live music venues
- Opening hours and dress codes
- Safety tips

FORMAT: STRUCTURED_BLOCK`,
      },
    ],
  },
  {
    id: 'transport',
    label: '交通移動',
    emoji: '🚌',
    prompts: [
      {
        title: '當地交通全攻略',
        template: `How do I get around [LOCATION] efficiently?
- Available transport options (metro, bus, taxi, rideshare)
- Recommended apps for [COUNTRY]
- Estimated costs per trip type
- Tourist passes or day cards worth buying
- Tips to avoid scams

FORMAT: STRUCTURED_BLOCK`,
      },
      {
        title: '機場往返市區交通',
        template: `What are the options for traveling from [AIRPORT] to [DESTINATION] in [CITY]?

Compare: taxi, public transit, shuttle, rideshare — by cost, time, and ease.

FORMAT: STRUCTURED_BLOCK`,
      },
    ],
  },
]

export default function TemplateGallery() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id)
  const [copiedId, setCopiedId] = useState(null)
  const { showToast } = useToast()

  const activePrompts = CATEGORIES.find((c) => c.id === activeCategory)?.prompts ?? []

  const handleCopy = async (prompt, id) => {
    try {
      await navigator.clipboard.writeText(prompt.template)
    } catch {
      const el = document.createElement('textarea')
      el.value = prompt.template
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
    showToast('📋 提示詞已複製！', 'success')
  }

  return (
    <section className="template-gallery">
      <h2 className="tg-title">AI 提示詞模板</h2>
      <p className="tg-subtitle">一鍵複製，專為 AI 旅遊研究優化</p>

      <nav className="tg-categories" role="tablist">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            role="tab"
            aria-selected={activeCategory === cat.id}
            className={`tg-cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            <span className="tg-cat-emoji">{cat.emoji}</span>
            <span className="tg-cat-label">{cat.label}</span>
          </button>
        ))}
      </nav>

      <div className="tg-prompts">
        {activePrompts.map((prompt, idx) => {
          const id = `${activeCategory}-${idx}`
          const isCopied = copiedId === id
          return (
            <article key={id} className="tg-card glass">
              <h3 className="tg-card-title">{prompt.title}</h3>
              <pre className="tg-card-preview">{prompt.template}</pre>
              <button
                className={`tg-copy-btn ${isCopied ? 'copied' : ''}`}
                onClick={() => handleCopy(prompt, id)}
                aria-label={isCopied ? '已複製！' : '複製提示詞'}
              >
                {isCopied ? '✓ 已複製！' : '📋 複製提示詞'}
              </button>
            </article>
          )
        })}
      </div>
    </section>
  )
}
