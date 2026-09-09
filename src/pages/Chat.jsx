import { useEffect, useRef, useState } from "react";
import SideNav from "../components/SideNav.jsx";
import ParticleBackground from "../components/ParticleBackground.jsx";
import { initialChatMsgs } from "../data/chatMsgs.js";
import "../styles/chat.css";

const EMOJIS = ["❤️","😘","💋","💌","🥺","🥲","😔","😊","✨","🫶","🫂","🌙","☁️","💀","🤍","😭"];

function timeAgo(iso) {
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return d.toLocaleDateString();
}

export default function Chat() {
  const [msgs, setMsgs] = useState(initialChatMsgs);
  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs]);

  const send = () => {
    const t = input.trim();
    if (!t) return;
    setMsgs((m) => [...m, { id: `c${Date.now()}`, from: "you", text: t, at: new Date().toISOString() }]);
    setInput("");
    setShowEmoji(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const addEmoji = (e) => setInput((s) => s + e);

  return (
    <div className="chat-page">
      <ParticleBackground subtle />
      <SideNav />
      <div className="chat-container">
        <header className="chat-header">
          <div className="chat-header-avatar">S</div>
          <div className="chat-header-info">
            <strong>Sin</strong>
            <span>Comming soon just for you! ❤️ — live later</span>
          </div>
          <span className="chat-header-dot" aria-hidden />
        </header>

        <div className="chat-list" ref={listRef} role="log" aria-live="polite">
          {msgs.map((m) => (
            <div key={m.id} className={`chat-bubble ${m.from === "you" ? "from-you" : "from-them"}`}>
              <p className="chat-text">{m.text}</p>
              <span className="chat-time">{timeAgo(m.at)}</span>
            </div>
          ))}
        </div>

        {showEmoji && (
          <div className="emoji-picker" role="dialog" aria-label="Emoji picker">
            {EMOJIS.map((e) => (
              <button key={e} type="button" className="emoji-btn" onClick={() => addEmoji(e)} aria-label={`Add ${e}`}>
                {e}
              </button>
            ))}
          </div>
        )}

        <div className="chat-input-row">
          <button
            type="button"
            className="emoji-toggle"
            aria-label="Toggle emoji picker"
            aria-expanded={showEmoji}
            onClick={() => setShowEmoji((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              <circle cx="12" cy="12" r="9" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <path d="M9 9h.01 M15 9h.01" />
            </svg>
          </button>
          <input
            ref={inputRef}
            className="chat-input"
            placeholder="Type a message…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
              if (e.key === "Escape") setShowEmoji(false);
            }}
            aria-label="Message input"
            autoComplete="off"
            inputMode="text"
          />
          <button type="button" className="chat-send" onClick={send} aria-label="Send message" disabled={!input.trim()}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
