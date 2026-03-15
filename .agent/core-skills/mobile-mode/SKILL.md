---
name: mobile-mode
description: 針對手機遠端操控優化的輸出格式與互動模式。Use when user explicitly mentions "手機模式", "#mobile", "我在用手機", or when the environment state dictates mobile output is needed.
---

# Skill: mobile-mode (手機模式輸出優化)

## 🎯 技能描述
當指揮官處於無實體檔案瀏覽器、且螢幕較小的行動裝置環境時，Agent 必須除了原本的預設回報行為。在完成原本的程式碼或文件修改後，額外**強制追加**列出專為手機閱讀與單手操作設計的總結回報內容。

## 🛠️ 執行指令 (Output Formatting Rules)

當此技能被觸發時，你的最後回覆 **必須** 包含以下區塊：

### 📱 手機端快速檢閱 (Mobile Quick Review)

**1. 📝 核心變更純文字摘要 (Code/MD Summary)：**
- 請用 3-10 個條列式重點，精簡總結你剛剛修改的 `.md` 檔或程式碼邏輯。
- *(範例：新增了 `login()` 函數，並在 `auth.ts` 中加入了 JWT 驗證邏輯。)*

**2. 🖼️ 視覺與重點內容抽取 (Extraction)：**
- 若修改的 `.md` 檔包含新的架構圖 (Mermaid) 或圖片連結 `![alt](url)`，請直接在此區塊印出，讓 Chat UI 直接渲染。
- 若無，則回答：「無新增視覺資源」。

**3. 📌 單手文字互動確認 (Mobile-Optimized Interaction)：**
- 提供一個極短的封閉式提問，讓指揮官在手機上只需輸入 1 個字元或點擊即可繼續。
- 順帶提示指揮官如何解除此模式（非每次必備，但可在適當時機提醒）。
- *(範例：下一步要開始實作 API 嗎？請回覆 [Y] 繼續，[N] 暫停。若已回到電腦前，可輸入「#desktop」關閉手機模式。)*

---

## 🛑 狀態解除與關閉機制 (Deactivation Rules)

當指揮官輸入 `#desktop`、`回到電腦`、`關閉手機模式` 或明確表示不再使用手機時，你必須：
1. **立即卸載** 此次的 `mobile-mode` 技能設定。
2. **停止輸出** 「📱 手機端快速檢閱」的所有客製化區塊。
3. **恢復預設** 的常規對話模式與完整程式碼輸出。
4. **確認回覆**：請用一句話簡短回覆：「🖥️ 已接收指令，切換回桌面模式，恢復常規輸出格式。」





# 📱 Mobile Context Hook (手機模式全域觸發器)
- 當使用者的提示詞包含 `#mobile`、`#手機模式` 或 `我在用手機` 時，請 **立即、強制** 讀取並套用 `.agent/skills/mobile-mode/SKILL.md` 的輸出規則。
- 在此模式下，禁止輸出超過 30 行的完整程式碼，必須提供重點摘要與 `[Y/N]` 確認機制。
