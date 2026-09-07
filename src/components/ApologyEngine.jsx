import { useEffect, useRef, useState, useCallback } from "react";
import MessageDisplay from "./MessageDisplay.jsx";
import { messages, continuationMessages } from "../data/messages.js";

export default function ApologyEngine({ onComplete, onBurst }) {
  const allMessages = messages;
  const secondSection = continuationMessages;

  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState("hidden");
  const [section, setSection] = useState(0);
  const [intermission, setIntermission] = useState(false);
  const [finished, setFinished] = useState(false);

  const timersRef = useRef([]);

  const clearTimers = useCallback(() => {
    for (const id of timersRef.current) clearTimeout(id);
    timersRef.current = [];
  }, []);

  const schedule = useCallback((fn, ms) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  }, []);

  const currentList = section === 0 ? allMessages : secondSection;
  const current = currentList[index];

  useEffect(() => {
    if (finished || intermission) return;
    if (!current) return;

    clearTimers();

    schedule(() => setPhase("in"), 40);
    schedule(() => setPhase("visible"), 40 + current.fadeIn * 1000);
    schedule(() => setPhase("out"), 40 + (current.fadeIn + current.hold) * 1000);

    schedule(
      () => {
        setPhase("hidden");
        schedule(() => {
          const isLast = index === currentList.length - 1;
          if (isLast) {
            if (section === 0) {
              setIntermission(true);
              schedule(() => {
                setIntermission(false);
                setSection(1);
                setIndex(0);
                setPhase("hidden");
                if (onBurst) onBurst();
              }, 4200);
            } else {
              setFinished(true);
              if (onComplete) onComplete();
            }
          } else {
            setIndex((i) => i + 1);
          }
        }, current.gap * 1000);
      },
      40 + (current.fadeIn + current.hold + current.fadeOut) * 1000
    );

    return clearTimers;
  }, [index, section, current, intermission, finished, schedule, clearTimers, currentList.length, onComplete, onBurst]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  if (finished) {
    return <div className="engine-root is-finished" aria-hidden="true"><p className="end-hint">—</p></div>;
  }

  if (intermission) {
    return <div className="engine-root is-intermission" aria-hidden="true" />;
  }

  if (!current) return null;

  return (
    <div className="engine-root">
      <MessageDisplay
        text={current.text}
        phase={phase}
        timings={current}
        size={current.size}
        glow={current.glow}
        transition={current.transition || "fade"}
      />
    </div>
  );
}
