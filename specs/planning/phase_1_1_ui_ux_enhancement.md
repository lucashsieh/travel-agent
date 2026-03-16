# Phase 1.1: UI/UX Refinement & Localization Plan (v2)

This phase refocuses on localizing the application for Taiwan users and empowering them with custom content management.

## Proposed Changes

### 🇹🇼 Localization & Internationalization
- **繁體中文 (TW) UI**: 
  - 全面翻譯頁面文字 (Header, Buttons, Categories)。
  - 優化字體渲染，確保中文在 Apple/Android 裝置上呈現清晰 (Inter + Noto Sans TC)。
- **AI Prompt 翻譯**: 將模板標題與描述翻譯為繁體中文，方便使用者快速理解。

### 🗾 Language Guide 分區強化
- **韓文 (KR) vs 日文 (JP)**: 
  - 修改 `LanguageGuide` 組件，提供明確的國家/語言切換索引。
  - 將現有的常用單字庫依據「韓文區」與「日文區」重新分類。

### ➕ 使用者內容 (UGC) 功能
- **新增單字功能**: 
  - 提供簡易的表單，讓使用者輸入「單字內容」、「翻譯」、「發音」。
  - **Dexie.js 整合**: 將使用者新增的單字持久化儲存於 IndexedDB，確保離線後依然可用。

### ✨ UI/UX 持續優化
- **回饋系統 (Toast)**: 針對「複製成功」與「新增成功」提供精緻的玻璃擬態 (Glassmorphism) 小視窗提示。
- **佈局調整**: 優化分類標籤 (Pills) 在手機端過多時的捲動體驗。

## 實作技術
- **State Management**: 使用 React Context 或簡單的 Local State 管理多國語言切換。
- **Persistence**: 擴展 Dexie.js `languageGuide` 資料表，支援 `isCustom` 標記。

## 驗證計畫
- **功能測試**: 驗證新增單字後能否正確顯示並進行 TTS 播放。
- **語系檢查**: 確保無遺漏的英文殘留。
