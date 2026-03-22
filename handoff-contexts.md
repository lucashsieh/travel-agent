# 🧠 Handoff Context - Threads Embed Fix

**From**: `[Antigravity] @Arch`
**To**: `[Claude] @DEV`
**Date**: 2026-03-22

---

## 🎯 Task Overview: Threads Embed Fix
Current state: Threads content only shows as a link card. Goal is to enable native iframe embedding.

### 📍 Progress & Context
- **Analysis**: Root cause found in `EmbedPlayer.jsx` (exclusion from iframe block) and `embed-parser.js` (missing `/embed` URL construction).
- **Approved Plan**: [threads_embed_fix_plan.md](file:///Users/lucas/.gemini/antigravity/brain/dd2db3fb-b0c0-4f95-b550-412a7b261762/threads_embed_fix_plan.md)

### 📝 Remaining Tasks for @DEV
- [x] Modify `src/utils/embed-parser.js` to return `threads.net/t/${embedId}/embed`.
- [x] Modify `src/components/EmbedPlayer.jsx` to include `threads` in the iframe rendering block.
- [x] Add CSS tweaks in `src/components/EmbedPlayer.css` for Threads iframes.

### ⚡ Next Command
```bash
# 1. Start by implementing the URL parser fix
# 2. Then update the player component
npm run dev
```

---
**Status**: `[x] Done`
**Roadmap Reference**: Phase 2.3.1
**Verification**: Verified by `[Antigravity] @QA` via browser. Legacy .com links fixed at runtime.
