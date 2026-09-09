import { Link } from "react-router-dom";
import ParticleBackground from "../components/ParticleBackground.jsx";
import "../styles/full-letter.css";

export default function NewMsgs() {
  return (
    <div className="full-letter-shell">
      <ParticleBackground subtle />
      <article className="full-letter-inner">
        <p className="letter-kicker">New messages</p>
        <h1 className="letter-title">New message</h1>

        <div className="letter-body">
          <p style={{ fontSize: "1.52rem", lineHeight: 1.6 }}>
            How did you like that flying kiss babe? ❤️
          </p>
          <p className="letter-muted" style={{ marginTop: 18 }}>
            — added just now · more coming soon at /new-msgs ;)
          </p>
        </div>

        <nav className="letter-nav" aria-label="New messages navigation">
          <Link to="/full-letter" className="letter-back">
            ← Back to the letter
          </Link>
          <span className="letter-nav-sep" aria-hidden="true">
            {" "}
            ·{" "}
          </span>
          <Link to="/" className="letter-back">
            Back to the beginning
          </Link>
        </nav>
      </article>
    </div>
  );
}
