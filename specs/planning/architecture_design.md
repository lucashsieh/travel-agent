# Architecture Design - travel-agent

## 1. System Overview
The app is a "Side-loading Client". It does not have a backend for AI; instead, it generates prompts for the user to use on external AI web platforms and provides a way to ingest the resulting structured data.

## 2. Data Schema (IndexedDB)

### Trips
- `id`: UUID
- `name`: string (e.g., "Japan 2026")
- `startDate`: string
- `endDate`: string
- `destination`: string

### ItineraryItems
- `id`: UUID
- `tripId`: UUID (foreign key)
- `type`: 'activity' | 'transport' | 'lodging'
- `time`: string
- `description`: string
- `locationUrl`: string (Direct Maps Link)
- `structuredData`: object (JSON from AI)

### MediaEmbeds
- `id`: UUID
- `tripId`: UUID
- `url`: string (Threads/IG/YT)
- `type`: 'video' | 'post'
- `summary`: string
- `extractedInfo`: { price: string, location: string, tags: string[] }

### Checklists
- `id`: UUID
- `tripId`: UUID
- `item`: string
- `completed`: boolean
- `category`: string

### Documents (Offline)
- `id`: UUID
- `tripId`: UUID
- `title`: string (e.g., "Lodging", "eSIM")
- `content`: string (Markdown/JSON)
- `isCritical`: boolean (Prioritize for local cache)

## 3. Technology Strategy
- **Service Worker**: For caching application shells and static assets.
- **Dexie.js**: Wrapper for IndexedDB to manage trip data locally.
- **Native Web Components/React**: For building the rich UI.
- **CSS Variables**: For a dynamic, high-end design system supporting dark mode and premium aesthetics.
