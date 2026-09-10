import { useMemo, useState } from "react";

const CATS = {
  Love: ["❤️", "💋", "💌", "💘", "💝", "💖", "💗", "💓", "🤍", "🖤"],
  Smile: ["😊", "😘", "🥺", "🥲", "😔", "😭", "🥹", "🤗", "🫶", "🫂"],
  Magic: ["✨", "⚡", "🌙", "☁️", "🦉", "🏰", "🪄", "✨", "💫", "🌟"],
  Fun: ["💀", "😂", "🥳", "🤍", "🫶", "😇", "😎", "🤭", "😜", "🙈"],
};

const ALL = Object.values(CATS).flat();

export default function EmojiPicker({ onPick, onClose }) {
  const [active, setActive] = useState("Love");
  const [recent, setRecent] = useState(() => {
    try { return JSON.parse(localStorage.getItem("chat-recent-emoji") || "[]"); } catch { return []; }
  });

  const list = useMemo(() => {
    if (active === "Recent") return recent.length ? recent : ALL.slice(0, 10);
    return CATS[active] || ALL;
  }, [active, recent]);

  const pick = (e) => {
    const next = [e, ...recent.filter((x) => x !== e)].slice(0, 12);
    setRecent(next);
    try { localStorage.setItem("chat-recent-emoji", JSON.stringify(next)); } catch {}
    onPick(e);
  };

  const tabs = ["Recent", ...Object.keys(CATS)];

  return (
    <div className="emoji-picker">
      <div className="emoji-tabs">
        {tabs.map((t) => (
          <button key={t} type="button" className={`emoji-tab ${active === t ? "is-active" : ""}`} onClick={() => setActive(t)}>
            {t}
          </button>
        ))}
        <button type="button" className="emoji-close" onClick={onClose} aria-label="Close">×</button>
      </div>
      <div className="emoji-grid">
        {list.map((e) => (
          <button key={e + Math.random()} type="button" className="emoji-btn" onClick={() => pick(e)} aria-label={`Add ${e}`}>
            {e}
          </button>
        ))}
      </div>
    </div>
  );
}
