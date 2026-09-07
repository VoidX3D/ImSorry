import { Link } from "react-router-dom";
import ParticleBackground from "../components/ParticleBackground.jsx";
import "../styles/full-letter.css";

export default function NewMsgs() {
  return (
    <div className="full-letter-shell">
      <ParticleBackground subtle />
      <article className="full-letter-inner">
        <p className="letter-kicker">New messages</p>
        <h1 className="letter-title">Coming soon.</h1>

        <div className="letter-body">
          <p>
            I’ll add more messages here whenever I get the chance — check back at this page.
            Same place, same site, new words when I can.
          </p>
          <p className="letter-muted">/new-msgs — stay tuned ;)</p>
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
