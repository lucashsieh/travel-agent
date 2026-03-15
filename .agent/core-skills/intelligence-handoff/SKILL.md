# 🧠 Intelligence Handoff Skill (智慧交接與決策固化)

此技能賦能 Agent 自動管理跨實體、跨團隊的「上下文記憶」，確保開發智慧不因工具切換或任務中斷而消失。

## 🎯 核心目標
1. **決策追蹤**：自動判斷並格式化重大設計決策，寫入 `decision-contexts.md`。
2. **狀態錨定**：在實體切換前，生成精確的 `handoff-contexts.md`。
3. **智慧提取**：從歷史決策中提取「踩雷經驗」，防止邏輯倒退。

---

## 🛠️ 行為準則 (Behaviors)

### 1. 決策提議觸發 (Decision Trigger)
當你執行以下動作後，**必須**提議更新 `decision-contexts.md`：
- 修改關鍵數據結構 (Schema)。
- 大規模重構代碼邏輯。
- 解決耗時超過 1 小時的複雜 Bug。
- 引入新的外部依賴或基建 (如 Infisical, MCP)。

**產出格式**：
| 日期 | 實體 | 決策主題 | 採用方案 | 關鍵原因 (Vs. 備選) |
| :--- | :--- | :--- | :--- | :--- |

### 2. 交接錨點產出 (Handoff Anchor)
在以下情況下，**必須**更新 `handoff-contexts.md`：
- 你準備發起 Pull Request 並交回主控權給指揮官。
- 任務被指派給另一位實體 (如從 AG 切換至 Claude)。
- 偵測到重大卡點 (Blocker)，需要向他人請求背景資訊。

**內容要求**：
- **Progress**：當前完成百分比。
- **Remaining**：剩下的技術待辦清單 (Checkbox)。
- **Next Command**：建議承接者輸入的第一條 CLI 指令。

---

## ⚡ 快捷指令 (Shortcuts)
- `/handoff`：手動觸發交接上下文生成流程。
- `/archive-decision`：將一段設計討論轉化為決策日誌。
