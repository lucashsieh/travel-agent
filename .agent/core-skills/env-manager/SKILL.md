---
name: env-manager
description: 用於透過 Infisical CLI 管理與提取環境變數與金鑰。Use when an Agent needs to fetch a secret (e.g. GEMINI_API_KEY) or verify if the developer's environment is properly synced with Infisical.
---

# Skill: env-manager (環境變數管家)

## 🎯 技能描述
此技能負責與 **Infisical** 金鑰中心互動。確保 Agent 在執行腳本或啟動伺服器前，能以非明文、符合安全規範的方式取得必要的環境參數。

## 🛠️ 執行指令 (Execution Rules)

### 1. 讀取金鑰 (Fetching Secrets)
當 Agent 需要特定的 API Key 時，應執行：
```bash
infisical secrets get <KEY_NAME> --plain
```
*   **安全限制**：嚴禁將輸出的值直接寫入 `roadmap.md` 或對話視窗。回報時必須進行遮罩處理 (Masking)。

### 2. 環境同步檢查 (Environment Verification)
在開始任務前，Agent 可以透過以下指令確認當前工作目錄是否已連線至正確的 Infisical 專案：
```bash
infisical status
```
*   **初次登入**：若未登入，請使用 `./setup.sh --infisical-ip [IP]` 進行引導，或執行 `infisical login --domain [IP]`。

### 3. 動態注入執行 (Running with Context)
所有的測試與啟動指令必須包含 `infisical run --` 前綴，以確保子程序能讀取到變數：
- **正確**: `infisical run -- python app.py`
- **錯誤**: `python app.py` (可能會導致 KeyError)

## ⚖️ 核心律法 (Core Protocols)
1.  **禁止明文傳遞**：任何從 Infisical 取得的敏感資訊，在 UI 回報時必須以 `AIza...****` 格式呈現。
2.  **多電腦相容性**：若執行失敗，Agent 應主動提示使用者確認 `./setup.sh` 是否已成功執行。
3.  **Core-Skill 共享**：此技能為 `agent-core-brain` 的標準組成。若在客製專案中修改，需評估是否回饋至核心庫。
