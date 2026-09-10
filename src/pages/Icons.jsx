import { useEffect, useState } from "react";
import SideNav from "../components/SideNav.jsx";
import ParticleBackground from "../components/ParticleBackground.jsx";
import "../styles/full-letter.css";

const SETS = [
  { id: "lucide", label: "Lucide (1833)", path: "/icons/lucide", count: 1833 },
  { id: "heroicons", label: "Heroicons 24 Outline (324)", path: "/icons/heroicons-24/outline", count: 324 },
  { id: "feather", label: "Feather (287)", path: "/icons/feather", count: 287 },
];

export default function Icons() {
  const [active, setActive] = useState("lucide");
  const [icons, setIcons] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    // For demo, load a sample of Lucide icons via fetch of directory listing is not available statically,
    // so we show a curated sample and note full sets are in public/icons
    const sample = {
      lucide: ["heart", "home", "mail", "bell", "message-circle", "calendar", "clock", "cake", "paperclip", "activity", "history", "settings", "star", "zap", "shield", "crown"],
      heroicons: ["academic-cap", "heart", "home", "envelope", "bell", "chat-bubble-oval-left", "calendar", "clock"],
      feather: ["heart", "home", "mail", "bell", "message-circle", "calendar", "clock", "gift"],
    };
    setIcons(sample[active] || []);
  }, [active]);

  const filtered = icons.filter((n) => n.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="full-letter-shell">
      <ParticleBackground subtle />
      <SideNav />
      <article className="full-letter-inner" style={{ maxWidth: 900 }}>
        <p className="letter-kicker">Icons</p>
        <h1 className="letter-title">Full SVG sets</h1>
        <p className="letter-muted">Downloaded from GitHub — Lucide, Heroicons, Feather. All SVGs in <code>public/icons/*</code> (11M). Use via <code>&lt;Icon name=&quot;heart&quot; /&gt;</code> or direct <code>/icons/lucide/heart.svg</code>.</p>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "16px 0" }}>
          {SETS.map((s) => (
            <button key={s.id} type="button" className={`letter-back ${active === s.id ? "is-active" : ""}`} onClick={() => setActive(s.id)} style={{ background: active === s.id ? "#fff" : "rgba(255,255,255,0.06)", color: active === s.id ? "#000" : "#fff" }}>
              {s.label}
            </button>
          ))}
        </div>

        <input className="chat-input" placeholder="Search icons…" value={q} onChange={(e) => setQ(e.target.value)} style={{ marginBottom: 16 }} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 10 }}>
          {filtered.map((name) => (
            <div key={name} className="newmsg-post" style={{ padding: 14, display: "grid", placeItems: "center", gap: 8 }}>
              <img src={`/icons/${active === "lucide" ? "lucide" : active === "heroicons" ? "heroicons-24/outline" : "feather"}/${name}.svg`} alt={name} width="28" height="28" style={{ filter: "invert(1) brightness(1.2)" }} onError={(e) => (e.currentTarget.style.display = "none")} />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.62)", wordBreak: "break-all", textAlign: "center" }}>{name}</span>
            </div>
          ))}
        </div>

        <p className="letter-muted" style={{ marginTop: 16 }}>Full sets: <code>public/icons/lucide (1833)</code> · <code>public/icons/heroicons-24</code> · <code>public/icons/feather</code> — all SVGs, as good as possible. Add more via <code>git clone</code> to <code>references/</code> + copy to <code>public/icons/</code>.</p>
      </article>
    </div>
  );
}
