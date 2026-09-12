// Chat store — unhardcoded, DB-ready, easy to delete/migrate
// Schema for future Postgres: id (cuid), text, createdAt (ISO), authorId, authorName, replyTo (id|null), updatedAt, deletedAt
// Current persistence: localStorage ("chat-msgs-v1"). Swap to API by replacing load/save with fetch.

import { initialChatMsgs } from "../data/chatMsgs.js";

const STORAGE_KEY = "chat-msgs-v1";

export function loadMsgs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch {}
  return initialChatMsgs;
}

export function saveMsgs(msgs) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs)); } catch {}
}

export function createMsg({ text, replyTo = null, authorId = "you", authorName = "you" }) {
  return {
    id: `c${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    from: authorId, // keep "from" for compat with current UI (you / Sin)
    authorId,
    authorName,
    text: text.trim(),
    at: new Date().toISOString(), // createdAt
    createdAt: new Date().toISOString(),
    replyTo,
    updatedAt: null,
    deletedAt: null,
  };
}

// Future DB migration: replace loadMsgs/saveMsgs with:
// export async function loadMsgs() { return fetch("/api/chat/messages").then(r=>r.json()); }
// export async function saveMsgs(msg) { return fetch("/api/chat/messages", {method:"POST", body: JSON.stringify(msg)}); }
