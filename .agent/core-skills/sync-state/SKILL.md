---
name: sync-state
description: 強制 Agent 重新掃描專案進度看板、比對本地端程式碼實際變更，並更新當前上下文。Use when user asks to "同步進度", "sync", or when starting a new task, after git commit, or after QA verification.
---

# Skill: sync-state (狀態同步機制)

## 🎯 技能描述
確保 Agent 記憶、磁碟檔案與團隊看板 (`specs/roadmap.md`) 保持 100% 一致的核心「肌肉」記憶。

## 🛠️ 執行指令 (Instructions)

### 1. [Gather] 資訊蒐集 (Ground Truth Check)
- **讀取大腦**：靜默讀取 `specs/roadmap.md` 與 `specs/prd.md`。
- **確認角色**：確認自身當前的視窗身分 (@PM, @DEV, 或 @QA)。
- **查驗磁碟**：執行 `git status` 或掃描本地工作目錄，確認實際的檔案異動。

### 2. [Analyze] 狀態與現實比對
- 根據你的角色，找出 `roadmap.md` 中指派給你的當前任務。
- 比對「實際的代碼變動」與「Roadmap 上的任務進度」是否吻合。

### 3. [Update] 狀態變更與寫入
與實作細節同步寫入 `specs/roadmap.md`（僅限活動中任務）。
- **歷史分離**：涉及 `git commit` 的詳細歷史應寫入 `specs/changelog.md`。
- **自動存檔**：若 Phase 全數完成，應提示或自動執行存檔至 `specs/archive/roadmap_history.md`。

嚴格遵循以下狀態機：
- `[Plan]` ➡️ `[Todo]`：**【簽核關卡】**@PM 必須等待人類明確回覆 `Approval` 後才可推進。
- `[Todo]` ➡️ `[In Progress]`：@DEV 認領任務，開始實作。
- `[In Progress]` ➡️ `[Ready for QA]`：@DEV 實作完成，將修改細節寫入 Roadmap。
- `[Ready for QA]` ➡️ `[Done]` 或 `[Failed]`：@QA 測試後更新（**必須**附上 `.agent/artifacts/` 內的證據路徑）。

### 4. [Report] 極簡回報
在對話視窗中輸出固定格式摘要：
```text
🔄 狀態已同步：[任務名稱]
👤 執行角色：[@PM / @DEV / @QA]
🚥 目前狀態：[Plan / Todo / In Progress / Ready for QA / Done / Failed]
🔗 Artifacts: [無 / 檔案路徑]
```
(若對話歷史過長，主動加註：💡 Context 已滿，建議重啟對話視窗。)