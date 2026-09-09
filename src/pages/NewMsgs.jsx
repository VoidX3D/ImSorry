import { Link } from "react-router-dom";
import SideNav from "../components/SideNav.jsx";
import ParticleBackground from "../components/ParticleBackground.jsx";
import NewMsgPost from "../components/NewMsgPost.jsx";
import { getNewMsgs } from "../data/newMsgs.js";
import "../styles/full-letter.css";
import "../styles/newmsgs.css";

export default function NewMsgs() {
  const posts = getNewMsgs();
  return (
    <div className="full-letter-shell">
      <ParticleBackground subtle />
      <SideNav />
      <article className="full-letter-inner newmsgs-inner">
        <p className="letter-kicker">New messages</p>
        <h1 className="letter-title">Flying kisses & more</h1>

        <div className="newmsgs-feed">
          {posts.map((p) => (
            <NewMsgPost key={p.id} post={p} />
          ))}
          {posts.length === 0 && <p className="letter-muted">No messages yet — check back soon.</p>}
        </div>

        <nav className="letter-nav" aria-label="New messages navigation">
          <Link to="/full-letter" className="letter-back">
            ← Back to the letter
          </Link>
          <span className="letter-nav-sep" aria-hidden="true">
            {" "}
            ·{" "}
          </span>
          <Link to="/home" className="letter-back">
            Home
          </Link>
          <span className="letter-nav-sep" aria-hidden="true">
            {" "}
            ·{" "}
          </span>
          <Link to="/" className="letter-back">
            Heart
          </Link>
        </nav>
      </article>
    </div>
  );
}
