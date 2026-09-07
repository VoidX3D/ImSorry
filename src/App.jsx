import { useCallback, useState } from "react";
import ParticleBackground from "./components/ParticleBackground.jsx";
import HeartIntro from "./components/HeartIntro.jsx";
import ApologyEngine from "./components/ApologyEngine.jsx";

export default function App() {
  const [phase, setPhase] = useState("heart"); // heart | messages
  const [finished, setFinished] = useState(false);
  const [key, setKey] = useState(0); // to replay

  const handleEnter = useCallback(() => {
    setPhase("messages");
  }, []);

  const handleComplete = useCallback(() => {
    setFinished(true);
  }, []);

  const handleReplay = useCallback(() => {
    setFinished(false);
    setPhase("heart");
    setKey((k) => k + 1);
  }, []);

  return (
    <div className="app-shell">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <ParticleBackground />

      {phase === "heart" && <HeartIntro key={`heart-${key}`} onEnter={handleEnter} />}

      {phase === "messages" && (
        <main id="main" className="engine-host">
          <ApologyEngine key={`engine-${key}`} onComplete={handleComplete} />
        </main>
      )}

      {finished && (
        <div className="replay-wrap" role="status" aria-live="polite">
          <button type="button" className="replay-btn" onClick={handleReplay}>
            replay
          </button>
        </div>
      )}
    </div>
  );
}
