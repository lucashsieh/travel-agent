# 專案技能庫總綱 (Skills Ecosystem Architecture)

## 🎯 設計哲學：漸進式載入與微型資料夾
本專案的 Agent 採用 2026 年最新的「漸進式載入 (Progressive Disclosure)」。Agent 本身僅具備基礎推理能力，所有領域知識與特定任務 SOP，皆必須封裝為獨立的「Skill 資料夾」。

## 📁 技能資料夾結構 (Skill Directory Pattern)
每一個 Skill 必須是一個獨立的資料夾，嚴格遵循以下標準結構：

    .agent/core-skills/[skill-name]/  (或 .agent/custom-skills/)
      ├── SKILL.md       <-- (必填) 進入點。頂部必須包含 YAML Frontmatter。
      ├── scripts/       <-- (選填) 確定性腳本（如 .py, .sh），取代模糊的語言指令。
      ├── references/    <-- (選填) 詳細的參考文件，SKILL.md 內只做指標引用。
      └── assets/        <-- (選填) 模板或靜態素材。

## ⚖️ 核心律法：YAML Frontmatter 觸發機制
每個 SKILL.md 檔案的最頂部，必須包含以下 YAML 格式，這是 Agent 決定是否載入該技能的「唯一依據」：

    ---
    name: kebab-case-skill-name
    description: 具體說明此技能的功能。**必須包含 "Use when..."** 明確定義觸發情境與關鍵字。
    ---

⚠️ **警告**：嚴禁使用「幫助處理專案」這類模糊描述。若描述不精準，Agent 將無法在正確時機觸發技能。

## 🧩 技能分類 (Skill Categories)
- **(A) Orchestration Skills**：如 sync-state，管理狀態與進度。
- **(B) Execution & MCP Skills**：如 git-manager，封裝腳本與外部 API。
- **(C) Procedural Knowledge Skills**：如 format-prd，規範文件或程式碼產出標準。

## 🔄 載入原則 (Loading Protocol)
1. **探索 (Discover)**：遇到未知任務時，僅讀取此 README.md 的 metadata。
2. **載入 (Load)**：確定需要某技能後，才讀取對應資料夾內的 SKILL.md。

## 🤝 混合式協作協議 (Hybrid Collaboration Protocol)
當專案中存在多個 AI 實體（如 Antigravity 與 Claude CLI）時，必須遵守以下 SSoT 原則：

1. **共享規劃 (Shared Planning)**：所有 `implementation_plan.md` 必須實體化至 `specs/planning/` 目錄，確保跨代理讀取權限。任務完成後由指揮官決定是否封存或刪除。
2. **狀態同步 (State Sync)**：
   - 任何代理在修改檔案前，必須先在 `specs/roadmap.md` 將任務狀態標註為 `[In Progress]`。
   - 任務完成後，必須更新 `roadmap.md` 並說明變更內容，狀態轉為 `[Ready for QA]`。
3. **物理隔離 (Physical Lock)**：遵循 `cross-agent-coding-sync` 技能，寫入前必須取得 `acquire_lock`。

## 已註冊技能目錄 (Registered Skills)
- sync-state: 狀態同步機制 (確保進度看板一致)
- git-manager: 版本控制管家 (處理分支與 Commit)
- mobile-mode: 手機模式輸出優化 (提供精簡純文字總結與單手互動)
- env-manager: 環境變數管家 (整合 Infisical 金鑰提取)
- cross-agent-coding-sync: 跨代理代碼同步與護鎖機制 (Tier 1 物理鎖)

---

## 🚀 Quick Start: Importing to Google Antigravity

如果你想在其他專案或電腦直接導入此核心大腦，請參考以下步驟：

### 1. 導入倉庫 (Clone / Submodule)
建議將此倉庫作為 `submodule` 放入專案的 `.agent/core-skills`：

```bash
git submodule add https://github.com/lucashsieh/agent-core-brain.git .agent/core-skills
```

### 2. 啟動 Prompt (Bootstrap Prompt)
在 Google Antigravity 的對話視窗中輸入以下 Prompt 來立即激活核心協議：

> "I am using the `agent-core-brain` framework. Please: 
> 1. Read `.agent/core-skills/GEMINI.md` to adopt the 'Chief Architect Global Protocol v4'.
> 2. Read `.agent/core-skills/README.md` to understand the skill-based architecture.
> 3. Check `specs/roadmap.md` and `specs/core-agents.md` for project context.
> 4. From now on, follow the State Machine Protocol and use the `sync-state` skill for all progress tracking."

### 3. 初始化 CLAUDE.md (Claude CLI Sync)
為了讓 Claude CLI 也能同步核心協定，你**必須**指示 Antigravity 投影智慧：

1. **執行同步**：要求 Antigravity 「執行 `claude-bridge` 技能以產生 `CLAUDE.md`」。
2. **驗證行為**：切換至 Claude CLI 並輸入：
   - `"Verify your current agent protocol and single source of truth."`
   - **預期結果**：Claude 應能正確指出它必須遵循 `.agent/core-skills/GEMINI.md` 並使用 `specs/roadmap.md` 作為 SSoT。

### 4. 初始化現況調查
激活後，Agent 會自動進入 「Tech Lead」模式。請確保你的專案中存在 `specs/roadmap.md`，這是 Agent 運作的單一真理來源。
