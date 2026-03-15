/**
 * Agent-Sync-Hub MCP Server v3.2
 * 負責處理 AG 與 Claude CLI 之間的實時鎖定與狀態廣播。
 * 
 * 部署指引：
 * 1. 安裝依賴：npm install @modelcontextprotocol/sdk zod
 * 2. 編譯：tsc agent-sync-hub.ts
 * 3. 註冊：將路徑加入 Claude Desktop 或 Antigravity 的 mcp-servers 配置。
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import * as fs from "fs";
import * as path from "path";

const server = new Server({
  name: "agent-sync-hub",
  version: "1.1.0",
}, {
  capabilities: { tools: {} },
});

// 狀態持久化路徑
const LOCK_FILE = path.join(process.cwd(), ".agent", "locks.json");

// 效能優化：確保目錄存在
if (!fs.existsSync(path.dirname(LOCK_FILE))) {
  fs.mkdirSync(path.dirname(LOCK_FILE), { recursive: true });
}

function loadLocks(): Record<string, { owner: string; time: number }> {
  try {
    if (fs.existsSync(LOCK_FILE)) {
      return JSON.parse(fs.readFileSync(LOCK_FILE, "utf-8"));
    }
  } catch (e) {
    console.error("Failed to load locks:", e);
  }
  return {};
}

function saveLocks(locks: Record<string, { owner: string; time: number }>) {
  fs.writeFileSync(LOCK_FILE, JSON.stringify(locks, null, 2));
}

// 工具定義
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "acquire_lock",
        description: "鎖定檔案路徑。防止多個工具同時寫入造成的 Git 衝突。",
        inputSchema: {
          type: "object",
          properties: {
            path: { type: "string", description: "檔案絕對路徑" },
            owner: { type: "string", description: "'Claude' | 'AG' | 'User'" }
          },
          required: ["path", "owner"]
        }
      },
      {
        name: "check_lock",
        description: "檢查路徑是否被佔用。",
        inputSchema: {
          type: "object",
          properties: { path: { type: "string" } },
          required: ["path"]
        }
      },
      {
        name: "release_lock",
        description: "釋放特定路徑的鎖定。",
        inputSchema: {
          type: "object",
          properties: { path: { type: "string" } },
          required: ["path"]
        }
      },
      {
        name: "release_all_locks",
        description: "【緊急指令】清除所有鎖定狀態，用於重置環境。",
        inputSchema: { type: "object", properties: {} }
      }
    ],
  };
});

// 工具執行邏輯
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "acquire_lock": {
      const { path: lockPath, owner } = args as { path: string; owner: string };
      const locks = loadLocks();
      const current = locks[lockPath];
      
      // 鎖定檢查邏輯
      if (current && current.owner !== owner) {
        return {
          content: [{ type: "text", text: `REJECTED: ${lockPath} is currently locked by ${current.owner}. Please wait or coordinate.` }],
          isError: true
        };
      }
      
      locks[lockPath] = { owner, time: Date.now() };
      saveLocks(locks);
      return { content: [{ type: "text", text: `LOCKED: ${lockPath} successfully acquired by ${owner}.` }] };
    }

    case "check_lock": {
      const { path: lockPath } = args as { path: string };
      const locks = loadLocks();
      const current = locks[lockPath];
      if (!current) {
        return { content: [{ type: "text", text: `FREE: No locks on ${lockPath}.` }] };
      }
      return { content: [{ type: "text", text: `OCCUPIED: Locked by ${current.owner} since ${new Date(current.time).toISOString()}.` }] };
    }

    case "release_lock": {
      const { path: lockPath } = args as { path: string };
      const locks = loadLocks();
      delete locks[lockPath];
      saveLocks(locks);
      return { content: [{ type: "text", text: `RELEASED: ${lockPath} is now free.` }] };
    }

    case "release_all_locks": {
      saveLocks({});
      return { content: [{ type: "text", text: "CLEARED: All global locks have been reset." }] };
    }

    default:
      throw new Error("Tool not implemented");
  }
});

// 啟動傳輸層
const transport = new StdioServerTransport();
await server.connect(transport);
