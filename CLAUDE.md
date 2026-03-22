<!-- AG_CORE_START -->
# 📜 Claude CLI Protocol Bootloader

I am using the **agent-core-brain** framework. This project follows the **Chief Architect Global Protocol v4**.

## ⚖️ Hardened Protocol (MEG)
- **Wait for Approval**: **Strictly** forbidden to use write tools unless the User provides explicit `[Y]` approval.
- **Identify Switch**: **Must** declare `"Switching to @DEV [Claude] role..."` before starting any implementation.
- **Write Tool Blocker**: **Never** modify source code if the Roadmap status is `[Plan]` or if you are not the assigned `Owner`.

## 🎭 Your Current Role: [Claude] @DEV
- **Primary Responsibility**: Implementation of **Phase 3 (Offline & Checklists)**.
- **Planning Reference**: [phase_3_offline_checklists.md](file:///Users/lucas/Projects/travel-agent/specs/planning/phase_3_offline_checklists.md).
- **Status Sync**: Run `/run sync-state` after every major state change (e.g., [x] in Roadmap).

## 🔗 Key References
- [Global Protocol (GEMINI.md)](file:///Users/lucas/Projects/travel-agent/.agent/core-skills/GEMINI.md)
- [Project Roadmap](file:///Users/lucas/Projects/travel-agent/specs/roadmap.md)
- [PRD](file:///Users/lucas/Projects/travel-agent/specs/prd.md)

<!-- AG_CORE_END -->

## Project Context
This is the `travel-agent` project, a web app for personal travel planning.
- **Stack**: Vite + React + Vanilla CSS.
- **DB**: Dexie.js (IndexedDB).


<!-- AG_SKILLS_START -->

### 🛠️ Available Agent Skills
- **claude-bridge** (Core): 核心智慧投影機。負責將全域 GEMINI.md 與 Roadmap 狀態同步至專案 CLAUDE.md，並生成動態技能索引清單，確保 CLI 代理遵循最新規範並能發現可用技能。 (See: `.agent/core-skills/claude-bridge/SKILL.md`)
- **cross-agent-coding-sync** (Core): 跨代理代碼同步與護鎖機制。Use before any write operation to acquire a Tier 1 (physical path) lock via agent-sync-hub MCP server. (See: `.agent/core-skills/cross-agent-coding-sync/SKILL.md`)
- **env-manager** (Core): 用於透過 Infisical CLI 管理與提取環境變數與金鑰。Use when an Agent needs to fetch a secret (e.g. GEMINI_API_KEY) or verify if the developer's environment is properly synced with Infisical. (See: `.agent/core-skills/env-manager/SKILL.md`)
- **skill-evals** (Core): 技能評估指南與反退化框架 (Anti-Regression)。強制進行 Continuous Development QA。使用時機：開發新技能後、核心模組大改版後，或進行總結報告時，用於驗證工具行為是否符合預期與安全規範。 (See: `.agent/core-skills/evals/SKILL.md`)
- **git-manager** (Core): 處理所有與 Git 相關的操作。Use when user asks to "開新分支", "create branch", "commit code", "push", or "open PR". (See: `.agent/core-skills/git-manager/SKILL.md`)
- **intelligence-handoff** (Core): 智慧交接與決策固化。負責維護交接上下文與決策日誌，確保跨任務與跨實體的連續智商。使用時機：重大決策後、切換 Agent 實體前、發生 Blocker 需要交接時。 (See: `.agent/core-skills/intelligence-handoff/SKILL.md`)
- **mobile-mode** (Core): 針對手機遠端操控優化的輸出格式與互動模式。Use when user explicitly mentions "手機模式", "#mobile", "我在用手機", or when the environment state dictates mobile output is needed. (See: `.agent/core-skills/mobile-mode/SKILL.md`)
- **protocol-guard** (Core): 強制 Agent 在執行任何寫入/修改工具前，必須執行「狀態與身分校驗」。Use when starting or switching between Planning/Execution/Verification phases. (See: `.agent/core-skills/protocol-guard/SKILL.md`)
- **sync-hub** (Core): 本地 MCP Server 控制端。用於啟動、重啟或狀態查詢 agent-sync-hub，提供 Tier 1 物理路徑鎖定服務。使用時機：需要跨實體鎖定檔案編輯權限時。 (See: `.agent/core-skills/sync-hub/SKILL.md`)
- **sync-state** (Core): 強制 Agent 重新掃描專案進度看板、比對本地端程式碼實際變更，並更新當前上下文。包含 Heartbeat 技能結構異動偵測。Use when user asks to "同步進度", "sync", or when starting a new task, after git commit, or after QA verification. (See: `.agent/core-skills/sync-state/SKILL.md`)
- **update-core-agents** (Core): Use when you need to update the core agent skills and global instructions to the latest version. This will pull the latest changes from the agent-core-brain submodule. (See: `.agent/core-skills/update-core-agents/SKILL.md`)

<!-- AG_SKILLS_END -->
