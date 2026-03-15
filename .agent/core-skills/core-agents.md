# 數位團隊協作協定 (Team Collaboration Protocol)

## 跨代理通訊規則 (The Rules of Interaction)

1. **公告欄機制**：`specs/roadmap.md` 是唯一的任務分派與狀態同步中心。

2. **連動邏輯**：Agent 行動前必須讀取 `roadmap.md` 並執行 `sync-state` 技能。完成任務後需寫回進度，嚴禁在對話視窗私聊。

3. **Artifact-Driven**：成果必須以「實體檔案」 (Artifacts) 形式存放在 `.agent/artifacts/` 供其他 Agent 驗收。

## 🎭 去角色化與實體調度 (Decoupling & Entity Dispatching)

在 2026 架構中，角色 (Role) 與實體 (Entity) 達成解耦。任務由 `roadmap.md` 的 `[Entity]` 標籤指派，特定實體此時扮演該 `[Role]`。

### 1. 三層級衝突防護 (Tiered Conflict Prevention)
- **Tier 1 (MCP 鎖)**：修改檔案前必須透過 `cross-agent-coding-sync` 領取 `acquire_lock(path)`。若路徑被鎖定，偵測實體必須等待或跳過。
- **Tier 2 (SSoT 標籤)**：檢查任務指派。若本人非該路徑的 `Owner` (Entity)，嚴禁越權修改。
- **Tier 3 (指揮官超權)**：指揮官可透過 `#force-update` 廣播強制釋放鎖定。

---

## 🐚 記憶與決策傳遞 (Handoff & Contexts)

為了維持跨工具的連續智商，Agent 必須維護以下檔案：
1. **handoff-contexts.md**: 儲存實體切換間的當前進度、技術障礙與下一步邏輯。
2. **decision-contexts.md**: 記錄重大設計決策的原因、採坑經驗與放棄的方案，防止邏輯倒退。

---

## ⚖️ 行動準則 (Operating Rules)

- **唯一真理來源**：所有 API Key 儲存於 Infisical。強制 `infisical run --`。
- **Loader Pattern**：CLI 工具 (如 Claude) 啟動前必須讀取首項指令 `read CLAUDE.md` 以掛載此協定。
- **智慧投影**：AG 負責透過 `claude-bridge` 同步全域規範至 `CLAUDE.md`。
- **施工證明**：所有變動必須附帶 `.agent/artifacts/` 下的日誌或截圖證明。