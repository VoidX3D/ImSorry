import { useState, useRef, useCallback } from "react";

export default function HeartIntro({ onEnter }) {
  const [exiting, setExiting] = useState(false);
  const clickedRef = useRef(false);

  const handleEnter = useCallback(() => {
    if (clickedRef.current) return;
    clickedRef.current = true;
    setExiting(true);
    // heart reacts → scales slightly → glow expands → fades
    // match CSS exit duration (900ms) + short black pause (450ms) before sequence
    window.setTimeout(() => onEnter(), 1350);
  }, [onEnter]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleEnter();
      }
    },
    [handleEnter]
  );

  return (
    <div className={`heart-stage ${exiting ? "is-exiting" : ""}`} aria-hidden={exiting}>
      <button
        type="button"
        className="heart-btn"
        aria-label="Open apology"
        onClick={handleEnter}
        onKeyDown={handleKeyDown}
        disabled={exiting}
      >
        {/* Subtle outer glow */}
        <span className="heart-glow" aria-hidden="true" />
        {/* Custom SVG heart — elegant, not cartoonish */}
        <svg
          className="heart-svg"
          viewBox="0 0 100 90"
          width="92"
          height="84"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M50 82 C 50 82, 6 58, 6 32 C 6 16, 18 6, 32 6 C 41 6, 47 12, 50 18 C 53 12, 59 6, 68 6 C 82 6, 94 16, 94 32 C 94 58, 50 82, 50 82 Z"
            fill="#070708"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* inner highlight to give barely-visible shape */}
          <path
            d="M50 78 C 50 78, 14 57, 14 33 C 14 21, 22 13, 32 13 C 39 13, 45 17, 50 23 C 55 17, 61 13, 68 13 C 78 13, 86 21, 86 33 C 86 57, 50 78, 50 78 Z"
            fill="#0d0d0f"
            opacity="0.95"
          />
        </svg>
      </button>
    </div>
  );
}
