# Phase 1 Implementation Plan: Foundation & Utility

This plan directs **[Claude]** to implement the core shell and utility features of `travel-agent`.

## 1. Technical Requirements
- **Architecture**: Vite + React + Vanilla CSS.
- **Persistence**: IndexedDB via Dexie.js.
- **Styling**: Premium "Rich Aesthetics" (Glassmorphism, Dark Mode).

## 2. Granular Task Breakdown (For [Claude])

### Task 1.2: Project Scaffolding
- Initialize Vite project in root: `npm create vite@latest ./ -- --template react`.
- Setup folder structure: `src/components`, `src/styles`, `src/db`, `src/utils`, `src/hooks`.
- Create `src/styles/design-tokens.css` with HSL color variables and glassmorphism utilities.

### Task 1.3: Storage Engine
- Install `dexie`.
- Initialize `src/db/schema.js` with tables: `trips`, `itineraryItems`, `mediaEmbeds`, `checklists`, `documents`, `languageGuide`.

### Task 1.4: AI Template Hub
- Implement `TemplateGallery.jsx`.
- Categories: Food, Shopping, Attractions, Events, Transport.
- Add "Copy Prompt" functionality with mobile-optimized `STRUCTURED_BLOCK` enforcement.

### Task 1.5: Language Guide & TTS
- Implement `LanguageGuide.jsx`.
- Features: One-tap copy to clipboard, Web Speech API integration for pronunciation.

### Task 1.6: Navigation Linker
- Utility function to generate `https://www.google.com/maps/dir/...` links.

---

## 3. Handoff Protocol
- **@Claude**: Read `specs/roadmap.md` and this `specs/planning/phase_1_implementation.md`.
- Mark tasks as `[In Progress]` in `roadmap.md` before starting.
- All code must adhere to the styles defined in `design-tokens.css`.
