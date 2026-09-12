import { chatBackgrounds, chatFonts, chatBubbleThemes, chatPageThemes } from "../data/chat-themes.js";

export default function ChatThemePicker({ bg, setBg, font, setFont, bubble, setBubble, pageTheme, setPageTheme, onClose }) {
  return (
    <div className="theme-popup-backdrop" onClick={onClose} aria-hidden>
      <div className="theme-popup" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Themes">
        <div className="theme-popup-handle" />
        <div className="theme-popup-head">
          <strong>Themes</strong>
          <button type="button" className="theme-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className="theme-section">
          <p className="theme-label">Page</p>
          <div className="theme-row">
            {chatPageThemes.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`theme-pill ${pageTheme === t.id ? "is-active" : ""}`}
                onClick={() => setPageTheme(t.id)}
              >
                <span className="theme-bubble-preview" style={{ background: t.preview, border: "1px solid rgba(0,0,0,0.1)" }} />
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="theme-section">
          <p className="theme-label">Chat background — fits chat only</p>
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
        </div>

        <div className="theme-section">
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
        </div>

        <div className="theme-section">
          <p className="theme-label">Bubbles — solid & gradient</p>
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
        </div>


      </div>
    </div>
  );
}
