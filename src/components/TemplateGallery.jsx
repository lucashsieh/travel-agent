import { useState } from 'react'
import './TemplateGallery.css'

const CATEGORIES = [
  {
    id: 'food',
    label: 'Food & Dining',
    emoji: '🍜',
    prompts: [
      {
        title: 'Local Restaurant Finder',
        template: `Find the best local restaurants near [LOCATION] that are:
- Authentic & non-touristy
- Open at [TIME]
- Budget: [BUDGET_RANGE]
- Cuisine type: [CUISINE]

Provide: name, address, must-order dish, price range, and a one-line reason why it's worth visiting.

FORMAT: STRUCTURED_BLOCK`,
      },
      {
        title: 'Street Food Guide',
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
    label: 'Shopping',
    emoji: '🛍️',
    prompts: [
      {
        title: 'Local Market Guide',
        template: `What are the best local markets in [LOCATION] for:
- Souvenirs & handicrafts
- Fresh produce
- Clothing & textiles

Include: market name, location, operating hours, and what to look for.

FORMAT: STRUCTURED_BLOCK`,
      },
      {
        title: 'Bargaining Tips',
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
    label: 'Attractions',
    emoji: '🏛️',
    prompts: [
      {
        title: 'Hidden Gems',
        template: `What are the hidden gems or underrated attractions in [LOCATION] that most tourists miss?

For each: name, why it's special, best time to visit, how to get there, estimated time needed.

FORMAT: STRUCTURED_BLOCK`,
      },
      {
        title: 'Day Trip Planner',
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
    label: 'Events',
    emoji: '🎉',
    prompts: [
      {
        title: 'Local Events & Festivals',
        template: `What local events, festivals, or cultural happenings are in [LOCATION] during [MONTH/DATES]?

Include: event name, dates, location, significance, and how to participate or attend.

FORMAT: STRUCTURED_BLOCK`,
      },
      {
        title: 'Nightlife Guide',
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
    label: 'Transport',
    emoji: '🚌',
    prompts: [
      {
        title: 'Getting Around Guide',
        template: `How do I get around [LOCATION] efficiently?
- Available transport options (metro, bus, taxi, rideshare)
- Recommended apps for [COUNTRY]
- Estimated costs per trip type
- Tourist passes or day cards worth buying
- Tips to avoid scams

FORMAT: STRUCTURED_BLOCK`,
      },
      {
        title: 'Airport to City Transfer',
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

  const activePrompts = CATEGORIES.find((c) => c.id === activeCategory)?.prompts ?? []

  const handleCopy = async (prompt, id) => {
    try {
      await navigator.clipboard.writeText(prompt.template)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      // fallback for older browsers
      const el = document.createElement('textarea')
      el.value = prompt.template
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  return (
    <section className="template-gallery">
      <h2 className="tg-title">AI Prompt Templates</h2>
      <p className="tg-subtitle">One-tap prompts optimized for AI travel research</p>

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
                aria-label={isCopied ? 'Copied!' : 'Copy prompt'}
              >
                {isCopied ? '✓ Copied!' : '📋 Copy Prompt'}
              </button>
            </article>
          )
        })}
      </div>
    </section>
  )
}
