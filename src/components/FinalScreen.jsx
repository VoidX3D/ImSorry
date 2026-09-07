import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FinalScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // brief demands: let screen remain black for a few seconds, let particles settle, then reveal
    const id = window.setTimeout(() => setVisible(true), 2600);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className={`final-screen ${visible ? "is-visible" : ""}`} aria-live="polite">
      <Link to="/full-letter" className="full-letter-link" aria-label="Read the full letter">
        Read the full letter
      </Link>
    </div>
  );
}
