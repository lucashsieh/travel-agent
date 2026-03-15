# 🌉 Claude-Bridge Skill (核心智慧投影機)

此技能定義了如何將「全域核心大腦」(Global SSoT) 的智慧同步投影至「局部專案」(Project Context) 的行為準則，特別是維護 `CLAUDE.md` 作為 Claude CLI 的啟動加載器。

## 🎯 核心目標
1. **知識向下投影**：確保 `CLAUDE.md` 永遠包含最新的全域安全、行為與協作法規。
2. **守護手動編輯**：透過安全標記 (Safety Markers) 防止自動化投影覆寫人類或特定專案的自訂規則。
3. **啟動引導**：為不同的開發環境 (Entity) 產出最佳化的啟動入徑。

---

## 🛠️ 行為準則 (Behaviors)

### 1. 安全同步檢核 (Safe-Sync Protocol)
當你準備更新專案的 `CLAUDE.md` 時，必須執行以下邏輯：
- **尋找標記**：偵測是否存在 `<!-- AG_CORE_START -->` 與 `<!-- AG_CORE_END -->`。
- **侷限寫入**：僅允許對標記區域內的內容進行「完全替換」。
- **保護外部**：嚴禁修改或刪除標記區域之外的任何文字。
- **缺失處理**：若標記不存在，應先在檔案頂部插入標記對，並向指揮官報告。

### 2. 智慧同步內容 (What to Project)
投影至標記區的內容應包含：
- **SSoT 連結**：明確指向 `GEMINI.md` 與 `specs/roadmap.md`。
- **Tier 1-3 法規**：引用最新的衝突防護邏輯。
- **角色行為**：針對該專案目前指派實體 (Entity) 的特定行為導引。

### 3. 同步觸發點 (Sync Triggers)
- 偵測到全域 `GEMINI.md` 或 `core-agents.md` 有重大更新時。
- 專案初始化新實體 (如第一次引入 Claude) 時。
- 執行 `/run sync-bridge` 指令時。

---

## ⚡ 快捷指令 (Shortcuts)
- `/run sync-bridge`：強制執行從全域到專案的智慧同步。
- `/check-claude-health`：驗證 `CLAUDE.md` 的標記完整性與規則版本。
