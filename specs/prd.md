# PRD - travel-agent

## 1. Product Vision
A cost-efficient, offline-ready travel planning web app. It bridges external AI (Gemini/ChatGPT) with a structured dashboard for itinerary management, social media insights, and emergency document access.

## 2. Core Features

### 2.1 AI Side-loading & Prompt Templates
- **Template Library**: Pre-defined prompts for specialized categories:
    - **Food**: Business Lunch, Michelin, All-you-can-eat.
    - **Shopping**: Creative boutiques, Electronics, Luxury, K-pop, Trend fashion.
    - **Attractions**: Landmarks and gems.
    - **Events**: Festivals and seasonal promotions.
    - **Transport**: Dynamic departure times and distance estimates.
- **Structured Mobile Ingest**: Forcing code-block outputs for fast app-switching copy/paste.

### 2.2 Local Language Guide
- **Keyword Vault**: Critical travel words (Utilities, Food, Emergency).
- **One-tap Copy**: For maps/search integration.
- **Pronunciation**: Native Text-to-Speech (TTS) via Web Speech API.

### 2.3 Social Media Insight Hub
- **Multi-platform Embeds**: Support for Threads, Instagram, and YouTube.
- **Tech**: Native oEmbed/iframes with platform SDK fallbacks.
- **Highlights**: Thumbnail cards with extracted Price/Location notes.

### 2.4 Itinerary & Navigation
- **Link-First Map**: No-cost navigation via direct Google/Apple Maps URL schemes.
- **Timeline View**: Visual schedule integration.

### 2.5 Checklist Management
- **Shopping/To-do**: Organized by store or context for quick in-store verification.

### 2.6 Offline-First "Critical Vault"
- **Selective Storage**: Persistent local access to Tickets (QR), eSIM, and Hotel info.
- **Emergency Page**: High-contrast, minimalist UI for offline critical access.

## 3. Tech Stack
- **Frontend**: Vite + React.
- **Design**: Premium Glassmorphism UI with native CSS variables.
- **Storage**: Dexie.js (IndexedDB).
- **Communication**: Native Clipboard + Web Speech APIs.
