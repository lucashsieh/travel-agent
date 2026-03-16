# Roadmap - travel-agent

## Project Overview
A web application to help plan various trips.

## Current Status: Planning & Specification

## Project Roadmap

| Phase | Description | Status | Agent |
| :--- | :--- | :--- | :--- |
| **Phase 1** | **Foundation & Utility**: Scaffolding, DB, Templates, Language Hub | [x] | **[Antigravity]** (Plan/Test) / **[Claude]** (Dev) |
| **Phase 1.1** | **UI/UX Polish**: Localization, JP/KR Hub, UGC, Toast System | [x] | **[Antigravity]** (Plan/Test) / **[Claude]** (Dev) |
| **Phase 1.2** | **Modern Redesign**: Responsive Mobile App Shell, Soft UI, Animations | [x] | **[Antigravity]** (Plan/Test) / **[Claude]** (Dev) |
| **Phase 2** | **Social Insight**: YouTube/IG/Threads Embeds, Highlights Extraction | [Todo] | **[Antigravity]** (Plan/Test) / **[Claude]** (Dev) |
| **Phase 3** | **Offline & Checklists**: Advanced Storage, Shopping Checklist | [Todo] | **[Antigravity]** (Plan/Test) / **[Claude]** (Dev) |

---

## Phase 1: Foundation & Utility [In Progress]

| Task | Status | Agent | Description |
| :--- | :--- | :--- | :--- |
| **1.1 Implementation Plan (Phase 1)** | [x] | **[Antigravity]** | Detailed technical design and task orchestration |
| **1.2 Project Scaffolding** | [x] | **[Claude]** | Initialize Vite + React, setup design tokens & CSS system |
| **1.3 Storage Engine** | [x] | **[Claude]** | Setup Dexie.js (IndexedDB) and core data schema |
| **1.4 AI Template Hub** | [x] | **[Claude]** | Build UI for category-based prompts & mobile buttons |
| **1.5 Language Guide UI** | [x] | **[Claude]** | Build keyword vault with one-tap copy and TTS |
| **1.6 Navigation Linker** | [x] | **[Claude]** | Implement Google/Apple Maps URL scheme logic |
| **1.7 Automation & Unit Tests** | [x] | **[Antigravity]** | Implement and run tests to verify Phase 1 stability |

---

## Current Status: Phase 1.1 - UI/UX Polish [Plan]

| Task | Status | Agent | Description |
| :--- | :--- | :--- | :--- |
| **1.1.1 Implementation Plan (v2)** | [x] | **[Antigravity]** | 繁中化、日韓分區、UGC 單字功能設計 |
| **1.1.2 UI Localization (TW)** | [x] | **[Claude]** | 全介面翻譯為繁體中文，優化 CJK 字體 |
| **1.1.3 Language Hub Refactor** | [x] | **[Claude]** | 實作日韓分區切換與「新增單字」表單 |
| **1.1.4 Dexie.js UGC Sync** | [x] | **[Claude]** | 將使用者自定義單字持久化至 IndexedDB |
| **1.1.5 Toast Feedback System** | [x] | **[Claude]** | 實作全域玻璃擬態提示視窗 (Toast) |
| **1.1.6 Phase 1.1 Verification** | [x] | **[Antigravity]** | 驗證 UGC 儲存、翻譯完整性與手機端體驗 |

---

## Phase 1.2: Modern UI/UX Redesign [x]

| Task | Status | Agent | Description |
| :--- | :--- | :--- | :--- |
| **1.2.1 Design Proposal** | [x] | **[Antigravity]** | 擬定 Modern RWD Mobile App 風格提案 |
| **1.2.2 Design System 2.0** | [x] | **[Claude]** | 重構 CSS Tokens，引入 Soft UI 與進階玻璃擬態 |
| **1.2.3 App Shell Layout** | [x] | **[Claude]** | 實作底部導航 (Bottom Nav) 與側邊欄 (Sidebar) |
| **1.2.4 Card Components** | [x] | **[Claude]** | 重新設計全站卡片組件，優化層次感 |
| **1.2.5 Animation Layer** | [x] | **[Claude]** | 整合 Framer Motion 實作流暢轉場動畫 |
| **1.2.6 Mobile Verification** | [x] | **[Antigravity]** | 確保在各類行動裝置上具備原生 App 體驗 |

---

---

| Task | Status | Agent | Description |
| :--- | :--- | :--- | :--- |
| Draft PRD | [x] | **[Antigravity]** | Define core vision and feature list |
| Architecture Design | [x] | **[Antigravity]** | Design data schema and tech strategy |
| Phase Re-alignment | [x] | **[Antigravity]** | Sync Roadmap & Implementation Plan |
| PRD & Spec Sync | [x] | **[Antigravity]** | Finalize `specs/prd.md` based on plan v5 |
| Document Roles & Archive | [x] | **[Antigravity]** | Assign entity-specific agents & archive plan |
| Final Protocol Sync | [x] | **[Antigravity]** | Remove redundant specs and follow core skill protocol |
| User Approval | [In Progress] | **[Antigravity]** | Get final go-ahead for Phase 1 construction |
| Verification Setup | [Todo] | **[Antigravity]** | Prepare test cases for Phase 1 features |

## Legend
- `[Plan]`: Proposed by PM/Arch, needs USER approval.
- `[Todo]`: Approved, waiting for Dev to start.
- `[In Progress]`: Currently being worked on.
- `[Ready for QA]`: Dev finished, waiting for verification.
- `[x]`: Completed.
