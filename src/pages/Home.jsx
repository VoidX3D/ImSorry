import ParticleBackground from "../components/ParticleBackground.jsx";
import SideNav from "../components/SideNav.jsx";
import LoveCounter from "../components/LoveCounter.jsx";
import { getNewMsgs } from "../data/new-msgs.js";
import "../styles/full-letter.css";
import "../styles/newmsgs.css";

export default function Home() {
  const latest = getNewMsgs().slice(0, 2);
  return (
    <div className="full-letter-shell">
      <ParticleBackground subtle />
      <SideNav />
      <article className="full-letter-inner">
        <p className="letter-kicker">Home — Mischief managed</p>
        <h1 className="letter-title">Our Space</h1>
        <p className="letter-muted" style={{ fontStyle: "italic", marginTop: 4 }}>&quot;After all this time? Always.&quot; — Severus Snape</p>

        <LoveCounter />
        <div className="hp-houses" aria-hidden>
          <span className="hp-house gryffindor" title="Gryffindor" />
          <span className="hp-house hufflepuff" title="Hufflepuff" />
          <span className="hp-house ravenclaw" title="Ravenclaw" />
          <span className="hp-house slytherin" title="Slytherin" />
        </div>

        <div className="newmsgs-feed" style={{ marginTop: 18 }}>
          {latest.map((p) => (
            <article key={p.id} className="newmsg-post">
              <p className="newmsg-text">{p.text}</p>
              <p className="letter-muted" style={{ marginTop: 8 }}>{new Date(p.createdAt).toLocaleDateString()} · {p.author}</p>
            </article>
          ))}
        </div>
      </article>
    </div>
  );
}
