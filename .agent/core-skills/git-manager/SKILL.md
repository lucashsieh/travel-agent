---
name: git-manager
description: 處理所有與 Git 相關的操作。Use when user asks to "開新分支", "create branch", "commit code", "push", or "open PR".
---

# Skill: git-manager (版本控制管家)

## 🎯 技能描述
標準化專案的 Git 操作。嚴禁 Agent 自行拼湊零散的 git 指令，所有複雜操作必須呼叫確定性腳本。

## 🛠️ 執行指令 (Instructions)

### 情境 A：開啟新功能分支
1. 找出任務名稱，並slugify (全小寫、連字號)。
2. 強制執行 (若有提供腳本)：`bash .agent/skills/git-manager/scripts/create-feature.sh "<feature-name>"`
   *(若無腳本，則嚴格執行：stash -> checkout main -> pull -> checkout -b feature/ -> pop)*

### 情境 B：提交程式碼 (Commit & Push)
1. 執行 `git status` 確認變更。
2. **分支檢查 (Guard)**：執行 `git branch --show-current`。若當前分支為 `main` 或 `master`，**必須停止**並要求切換至功能分支。
3. 執行 `git add .` (排除金鑰檔案)。
4. 遵循 Conventional Commits：`git commit -m "feat/fix/docs: 具體說明"`
5. 執行 `git push origin HEAD`。
6. **建立 PR**：若為功能分支，必須接著執行 `gh pr create` 並回報連結。

### 📋 Report 格式
```text
📦 Git 操作完成：[情境名稱]
🌿 當前分支：[分支名稱]
📝 摘要：[成功訊息或遇到的錯誤]
```