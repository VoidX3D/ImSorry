import { useCallback, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ParticleBackground from "./components/ParticleBackground.jsx";
import HeartIntro from "./components/HeartIntro.jsx";
import ApologyEngine from "./components/ApologyEngine.jsx";
import FinalScreen from "./components/FinalScreen.jsx";
import FullLetter from "./pages/FullLetter.jsx";

function Experience() {
  const [phase, setPhase] = useState("heart"); // heart | messages
  const [finished, setFinished] = useState(false);
  const [key, setKey] = useState(0);
  const [burst, setBurst] = useState(0);

  const handleEnter = useCallback(() => {
    setBurst((b) => b + 1);
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

      <ParticleBackground burst={burst} subtle={finished} />

      {phase === "heart" && <HeartIntro key={`heart-${key}`} onEnter={handleEnter} />}

      {phase === "messages" && (
        <main id="main" className="engine-host">
          <ApologyEngine key={`engine-${key}`} onComplete={handleComplete} />
        </main>
      )}

      {finished && <FinalScreen />}

      {finished && (
        <div className="replay-wrap" role="status" aria-live="polite" style={{ bottom: "86px" }}>
          <button type="button" className="replay-btn" onClick={handleReplay} aria-label="Replay from the beginning">
            replay
          </button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Experience />} />
        <Route path="/full-letter" element={<FullLetter />} />
        {/* fallback — any unknown goes to experience */}
        <Route path="*" element={<Experience />} />
      </Routes>
    </BrowserRouter>
  );
}
