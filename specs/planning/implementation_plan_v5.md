# Implementation Plan - travel-agent Web App (v5 Refined)

This plan details the technical execution, organized by user-designated phases.

## Phase 1: Foundation & Core Utility

### 1.1 UI System & Database Setup
- **Framework**: Vite + React.
- **Aesthetics**: Glassmorphism, dynamic dark mode, and Google Fonts (Outfit/Inter).
- **Core CSS**: `src/styles/design-tokens.css` (Premium color palette).
- **Storage Layer**: Dexie.js for IndexedDB sync.

### 1.2 Expansive AI Prompt Templates
- **Categories**: 
    - **Food**: Business Lunch, Michelin, All-you-can-eat.
    - **Shopping**: Creative Boutiques, Electronics, 2nd-hand Luxury, K-pop, Trend Fashion.
    - **Attractions**: Must-visit landmarks and hidden gems.
    - **Events/Seasonal**: Festivals, markets, and promotions.
    - **Transport**: Departure Times (range-based), Distance/Time estimates.

### 1.3 Local Language Guide (Keywords & TTS)
- **Utility & Food Categories**: One-tap copy for maps/searching.
- **Pronunciation**: Native TTS using **Web Speech API** (`window.speechSynthesis`).

### 1.4 Mobile Workflow & Navigation
- **Prompt-to-Ingest**: Strict structured code-block outputs for mobile clipboard detection.
- **Link-First Navigation**: Direct Google/Apple Maps URL schemes (cost-free).

---

## Phase 2: Social Media Insight Hub

### 2.1 Media Integration
- **Platform Support**: YouTube, Instagram, Threads.
- **Technical Approach**: 
    - **Native oEmbed/iframes**: For lightweight playback.
    - **Platform SDKs**: As fallback for consistent IG/Threads styling.
- **Feature**: Video Thumbnail Cards with "Quick Highlights" (Location, Price extracted from notes).

---

## Phase 3: Advanced Storage & Checklists

### 3.1 Storage & Offline Strategy (Critical Fallback)
- **Mechanic**: User toggles "Available Offline" for specific high-priority items.
- **Storage**: Tickets (QR codes), eSIM, Flight info, and Hotel addresses stored as Blobs/Base64 in IndexedDB.
- **Emergency Page**: Minimalist offline-first UI for critical document access.

### 3.2 Checklist & Trip Management
- **Shopping/To-do**: Store-based categorization (e.g., Don Quijote, Pharmacy) with large mobile-friendly checkboxes.
- **Itinerary View**: Timeline integration of all tasks and spots.

---

## Verification Plan
- **Phase 1 Validation**: Verify prompt generation accuracy and TTS accessibility.
- **Phase 2 Validation**: Verify embed stability and metadata extraction.
- **Phase 3 Validation**: Verify 100% offline access to documents via Service Worker and IndexedDB.
