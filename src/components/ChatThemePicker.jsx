import { chatBackgrounds, chatFonts, chatBubbleThemes } from "../data/chatThemes.js";

export default function ChatThemePicker({ bg, setBg, font, setFont, bubble, setBubble, onClose }) {
  return (
    <div className="theme-picker">
      <div className="theme-picker-head">
        <strong>Themes — Instagram-like</strong>
        <button type="button" className="theme-close" onClick={onClose} aria-label="Close themes">×</button>
      </div>

      <p className="theme-label">Background</p>
      <div className="theme-grid">
        {chatBackgrounds.map((b) => (
          <button
            key={b.id}
            type="button"
            className={`theme-thumb ${bg === b.value ? "is-active" : ""}`}
            onClick={() => setBg(b.value)}
            aria-label={b.label}
            title={b.label}
            style={{ background: b.preview || `url(${b.value}) center/cover` }}
          >
            <span>{b.label}</span>
          </button>
        ))}
      </div>

      <p className="theme-label">Font</p>
      <div className="theme-row">
        {chatFonts.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`theme-pill ${font === f.family ? "is-active" : ""}`}
            onClick={() => setFont(f.family)}
            style={{ fontFamily: f.family }}
          >
            {f.label}
          </button>
        ))}
      </div>

      <p className="theme-label">Bubbles</p>
      <div className="theme-row">
        {chatBubbleThemes.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`theme-pill ${bubble === t.id ? "is-active" : ""}`}
            onClick={() => setBubble(t.id)}
          >
            <span className="theme-bubble-preview" style={{ background: t.you }} />
            {t.label}
          </button>
        ))}
      </div>

      <p className="theme-hint">Stored locally — add more in <code>src/data/chatThemes.js</code> + <code>public/backgrounds/</code></p>
    </div>
  );
}
