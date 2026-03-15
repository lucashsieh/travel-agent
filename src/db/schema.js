import Dexie from 'dexie'

/**
 * Travel Agent Database Schema
 * Powered by Dexie.js (IndexedDB wrapper)
 *
 * Tables:
 *   trips           — top-level trip records
 *   itineraryItems  — day-by-day plan items linked to a trip
 *   mediaEmbeds     — YouTube/IG/Threads embed records
 *   checklists      — shopping/packing checklist items
 *   documents       — uploaded or generated documents (notes, PDFs)
 *   languageGuide   — saved keyword/phrase entries for the language vault
 */

const db = new Dexie('TravelAgentDB')

db.version(1).stores({
  trips: '++id, name, destination, startDate, endDate, createdAt',
  itineraryItems: '++id, tripId, date, order, category, title',
  mediaEmbeds: '++id, tripId, platform, url, title, addedAt',
  checklists: '++id, tripId, category, item, checked, createdAt',
  documents: '++id, tripId, type, title, content, createdAt',
  languageGuide: '++id, tripId, language, category, phrase, translation, pronunciation',
})

db.version(2).stores({
  languageGuide: '++id, tripId, language, category, phrase, translation, pronunciation, isCustom',
})

export default db
