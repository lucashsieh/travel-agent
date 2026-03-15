---
name: cross-agent-coding-sync
description: 跨代理代碼同步與護鎖機制。Use before any write operation to acquire a Tier 1 (physical path) lock via agent-sync-hub MCP server.
---

# Skill: cross-agent-coding-sync (跨代理編碼同步)

## 🎯 技能描述
本技能實施 2026 Hybrid V4 架構中的 **Tier 1 (物理路徑鎖)** 規範。
在對任何檔案執行寫入、修改或刪除操作前，必須先透過 `agent-sync-hub` MCP Server 取得對應路徑的排除鎖 (`acquire_lock`)，以防止多個 AI 實體 (如 AG 與 Claude) 同時寫入造成的數據損毀或 Git 衝突。

## 🛠️ 執行指令 (Instructions)

### 1. [Lock] 取得路徑鎖定 (Acquire Lock)
在呼叫任何寫入工具 (`write_to_file`, `replace_file_content`, `multi_replace_file_content`) 之前：
- **操作**：呼叫 `mcp:agent-sync-hub:acquire_lock` 工具。
- **參數**：
  - `path`: 檔案的絕對路徑。
  - `owner`: 當前實體名稱 (例如: `'AG'`, `'Claude'`)。
- **衝突處理**：
  - 若返回 `LOCKED`: 繼續執行寫入。
  - 若返回 `REJECTED`: 偵測到路徑已被其他實體鎖定。**必須**依據 `specs/core-agents.md` 規範：
    1. 等待一段時間後重試。
    2. 若持續失敗，主動回報指揮官並標註 `[LOCK_CONFLICT]`。
    3. 嚴禁在未取得鎖定的情況下強行寫入。

### 2. [Unlock] 釋放路徑鎖定 (Release Lock)
當檔案修改完成、驗證成功且不需要進一步變動時：
- **操作**：呼叫 `mcp:agent-sync-hub:release_lock` 工具。
- **參數**：
  - `path`: 檔案的絕對路徑。
- **注意事項**：任務結束或對話結束前，必須清理所有已持有的路徑鎖，確保存放給其他代理。

### 3. [Emergency] 緊急重置 (Emergency Hub Reset)
若發現環境中存在大量殭屍鎖定導致無法開發：
- **操作**：呼叫 `mcp:agent-sync-hub:release_all_locks` 工具。
- **警告**：此為破壞性重置，須確保當前沒有其他代理正在進行寫入操作。

## 📋 範例流程
1. `mcp:agent-sync-hub:acquire_lock(path="/path/to/app.py", owner="AG")`
2. `write_to_file(TargetFile="/path/to/app.py", ...)`
3. `mcp:agent-sync-hub:release_lock(path="/path/to/app.py")`
