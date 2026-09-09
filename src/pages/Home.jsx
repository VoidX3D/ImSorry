import ParticleBackground from "../components/ParticleBackground.jsx";
import SideNav from "../components/SideNav.jsx";
import { getNewMsgs } from "../data/newMsgs.js";
import "../styles/full-letter.css";
import "../styles/newmsgs.css";

export default function Home() {
  const latest = getNewMsgs().slice(0, 2);
  return (
    <div className="full-letter-shell">
      <ParticleBackground subtle />
      <SideNav />
      <article className="full-letter-inner">
        <p className="letter-kicker">Home</p>
        <h1 className="letter-title">Soon.</h1>

        <div className="letter-body">
          <p>More coming here soon — this home will grow with new features, same darkness.</p>
        </div>

        <div className="newmsgs-feed" style={{ marginTop: 18 }}>
          {latest.map((p) => (
            <article key={p.id} className="newmsg-post">
              <p className="newmsg-text" style={{ fontSize: "1.2rem" }}>{p.text}</p>
              <p className="letter-muted" style={{ marginTop: 8 }}>{new Date(p.createdAt).toLocaleDateString()} · {p.author}</p>
            </article>
          ))}
        </div>
      </article>
    </div>
  );
}
