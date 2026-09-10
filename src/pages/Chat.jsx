import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ParticleBackground from "../components/ParticleBackground.jsx";
import { loadMsgs, saveMsgs, createMsg } from "../lib/chatStore.js";
import { chatBubbleThemes } from "../data/chatThemes.js";
import ChatThemePicker from "../components/ChatThemePicker.jsx";
import EmojiPicker from "../components/EmojiPicker.jsx";
import "../styles/chat.css";

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
  const [msgs, setMsgs] = useState(() => loadMsgs());
  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [showThemes, setShowThemes] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  // Theme engine — persisted
  const [bg, setBg] = useState(() => {
    try { return localStorage.getItem("chat-bg") || "none"; } catch { return "none"; }
  });
  const [font, setFont] = useState(() => {
    try { return localStorage.getItem("chat-font") || `"Google Sans", "DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`; } catch { return `"Google Sans", "DM Sans", sans-serif`; }
  });
  const [bubble, setBubble] = useState(() => {
    try { return localStorage.getItem("chat-bubble") || "default"; } catch { return "default"; }
  });

  useEffect(() => { try { localStorage.setItem("chat-bg", bg); } catch {} }, [bg]);
  useEffect(() => { try { localStorage.setItem("chat-font", font); } catch {} }, [font]);
  useEffect(() => { try { localStorage.setItem("chat-bubble", bubble); } catch {} }, [bubble]);

  const bubbleTheme = chatBubbleThemes.find((t) => t.id === bubble) || chatBubbleThemes[0];

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs]);

  useEffect(() => { saveMsgs(msgs); }, [msgs]);

  const send = () => {
    const t = input.trim();
    if (!t) return;
    const newMsg = createMsg({ text: t, replyTo: replyTo?.id || null, authorId: "you", authorName: "you" });
    setMsgs((m) => [...m, newMsg]);
    setInput("");
    setReplyTo(null);
    setShowEmoji(false);
    setTimeout(() => inputRef.current?.focus(), 50);
    // TODO: ws + DB logging later — POST /api/chat/messages { text, replyTo }
  };

  const addEmoji = (e) => setInput((s) => s + e);

  const bgStyle = bg === "none" ? {} : { backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" };

  return (
    <div className="chat-page" style={{ fontFamily: font }}>
      <ParticleBackground subtle />
      <div className="chat-container" style={bgStyle}>
        {/* Invisible overlay for readability when background image is set */}
        {bg !== "none" && <div className="chat-bg-overlay" aria-hidden />}

        <header className="chat-header">
          <div className="chat-header-left">
            <div className="chat-header-avatar hogwarts-avatar" aria-hidden>
              <svg width="22" height="22" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M50 18 L20 82 L80 82 Z" />
                <circle cx="50" cy="52" r="14" />
                <path d="M50 18 L50 82" />
              </svg>
            </div>
            <div className="chat-header-info">
              <strong>Owl Post</strong>
              <span>Hogwarts</span>
            </div>
          </div>
          <nav className="chat-header-nav" aria-label="Chat navigation">
            <Link to="/" className="chat-nav-link" title="Heart" aria-label="Heart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><path d="M12 21s-6.7-4.35-8.5-8.5C2.2 8.0 3.9 4.5 8 4.5c1.9 0 3.1 1.0 4 2.1 0.9-1.1 2.1-2.1 4-2.1 4.1 0 5.8 3.5 4.5 8C18.7 16.65 12 21 12 21z" /></svg>
            </Link>
            <Link to="/home" className="chat-nav-link" title="Home" aria-label="Home">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><path d="M3 9L12 2l9 7v11a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" /></svg>
            </Link>
            <Link to="/full-letter" className="chat-nav-link" title="Letter" aria-label="Letter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
            </Link>
            <Link to="/new-msgs" className="chat-nav-link" title="New messages" aria-label="New messages">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><path d="M6 8a6 6 0 0 1 12 0c0 7-6 11-6 11S6 15 6 8" /><path d="M10 21a2 2 0 0 0 4 0" /></svg>
            </Link>
            <Link to="/chat" className="chat-nav-link is-active" title="Owl Post" aria-label="Owl Post" aria-current="page">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><path d="M21 15a4 4 0 0 1-4 4H7l-4 4V5a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" /><path d="M8 10h8 M8 14h5" /></svg>
            </Link>
            <button type="button" className="chat-theme-btn" onClick={() => setShowThemes((v) => !v)} aria-label="Themes" title="Themes">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 3a9 9 0 0 0 0 18" fill="currentColor" opacity="0.12" />
                <path d="M12 7a5 5 0 0 0 0 10" />
              </svg>
            </button>
          </nav>
        </header>

        {showThemes && (
          <ChatThemePicker bg={bg} setBg={setBg} font={font} setFont={setFont} bubble={bubble} setBubble={setBubble} onClose={() => setShowThemes(false)} />
        )}

        <div className="chat-list" ref={listRef} role="log" aria-live="polite">
          {msgs.map((m) => {
            const replied = m.replyTo ? msgs.find((x) => x.id === m.replyTo) : null;
            const isYou = m.from === "you";
            const style = isYou
              ? { background: bubbleTheme.you, color: bubbleTheme.youText, borderColor: bubbleTheme.you }
              : { background: bubbleTheme.them, color: bubbleTheme.themText };
            return (
              <div key={m.id} className={`chat-bubble ${isYou ? "from-you" : "from-them"}`} style={style} onClick={() => setReplyTo(m)} role="button" tabIndex={0}>
                {replied && <div className="chat-reply-quote">↳ {replied.text.slice(0, 60)}</div>}
                <p className="chat-text">{m.text}</p>
                <span className="chat-time">{timeAgo(m.at)}</span>
              </div>
            );
          })}
        </div>

        {replyTo && (
          <div className="chat-reply-bar">
            <span>Replying to: {replyTo.text.slice(0, 40)}</span>
            <button type="button" onClick={() => setReplyTo(null)} aria-label="Cancel reply">×</button>
          </div>
        )}

        {showEmoji && <EmojiPicker onPick={addEmoji} onClose={() => setShowEmoji(false)} />}

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
              if (e.key === "Escape") {
                setShowEmoji(false);
                setReplyTo(null);
              }
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
