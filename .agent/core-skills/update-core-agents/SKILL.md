---
name: update-core-agents
description: Use when you need to update the core agent skills and global instructions to the latest version. This will pull the latest changes from the agent-core-brain submodule.
---

# `update-core-agents` Skill

## 🎯 目的 (Purpose)
透過執行 Git Submodule 指令，一鍵拉取並更新 `agent-core-brain` (位於 `.agent/core-skills/`) 的最新版本內容。

## ⚙️ 執行步驟 (Execution Steps)
當指揮官要求「更新 Agent」、「抓取最新能力」或「Update Core Skills」時，請依序執行以下步驟：

1. **詢問更新範圍 (Scope Prompt)**：
   在真正執行任何更新指令前，**必須**先向指揮官提問確認更新範圍：
   > 「請問您只要更新所有的 Core Skills 模組？還是要同時更新/覆寫您的 Core Agent Behavior 設定檔 (`GEMINI.md`, `specs/core-agents.md`)？」

2. **根據回覆執行更新**：
   - **選項 A (僅更新 Core Skills)**：
     執行 Submodule 更新指令：
     ```bash
     git submodule update --remote .agent/core-skills
     ```
   - **選項 B (同時更新 Core Skills 與 Agent Behaviors)**：
     除了上述 `submodule update` 指令外，還需要將拉取下來的最新設定檔，完整同步至專案中。
     **重要：同步時必須確保頂層 `.md` 檔案與資料夾皆被包含：**
     ```bash
     # 正確的同步指令 (確保來源目錄末端有 /.)
     cp -rv .agent/core-skills/. /Users/lucas/Projects/travel-agent/.agent/core-skills/
     ```

3. **強制驗證 (Mandatory Verification)**：
   同步完成後，Agent **必須**執行 `ls -F` 檢查目標目錄，確認以下檔案未遺失：
   - [ ] `GEMINI.md`
   - [ ] `README.md`
   - [ ] `core-agents.md`
   - [ ] 各個技能資料夾 (如 `sync-state/`, `git-manager/` 等)

4. **處理變更與 Commit (可選)**：
   如果指令成功且有新變更拉取下來，您可以詢問指揮官是否需要幫忙 commit 這個更新的指標。

## ⚠️ 防呆機制 (Safety Checks)
1. **全域檔案遺失 (The Markdown Trap)**：嚴禁僅使用 `cp -rv source_dir/ target_dir/` 而不加 `/.`，這可能導致頂層檔案被略過或目錄結構異常。
2. **報錯檢查**：如果指令報錯，請先檢查專案根目錄下是否有 `.gitmodules` 檔案，確認是否已經正確掛載。
3. **Head 狀態**：遇到 `Detached HEAD` 警告是正常現象。直接回報「Core Skills 已更新至最新版」。
