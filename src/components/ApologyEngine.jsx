import { useEffect, useRef, useState, useCallback } from "react";
import MessageDisplay from "./MessageDisplay.jsx";
import { messages, continuationMessages } from "../data/messages.js";

/**
 * Data-driven sequential engine.
 * Phases per message: hidden → in → visible → out → gap → next
 * Single text node — never renders two messages simultaneously.
 */
export default function ApologyEngine({ onComplete }) {
  // combine both sections with an intermission marker
  const allMessages = messages; // first section only initially
  const secondSection = continuationMessages;

  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState("hidden"); // hidden | in | visible | out
  const [section, setSection] = useState(0); // 0 = first, 1 = second
  const [intermission, setIntermission] = useState(false);
  const [finished, setFinished] = useState(false);

  const timersRef = useRef([]);

  const clearTimers = useCallback(() => {
    for (const id of timersRef.current) clearTimeout(id);
    timersRef.current = [];
  }, []);

  const schedule = useCallback(
    (fn, ms) => {
      const id = window.setTimeout(fn, ms);
      timersRef.current.push(id);
      return id;
    },
    []
  );

  const currentList = section === 0 ? allMessages : secondSection;
  const current = currentList[index];

  // drives the state machine for current message
  useEffect(() => {
    if (finished || intermission) return;
    if (!current) return;

    clearTimers();

    // hidden -> in (next frame so transition triggers)
    const startId = schedule(() => setPhase("in"), 40);

    // in -> visible (after fadeIn)
    schedule(
      () => setPhase("visible"),
      40 + current.fadeIn * 1000
    );

    // visible -> out (after fadeIn + hold)
    schedule(
      () => setPhase("out"),
      40 + (current.fadeIn + current.hold) * 1000
    );

    // out -> gap finished -> next index or section complete
    schedule(
      () => {
        setPhase("hidden");
        // small gap before next message — handled as delay before index increment
        schedule(() => {
          const isLastInSection = index === currentList.length - 1;
          if (isLastInSection) {
            if (section === 0) {
              // intermission before second section — several seconds of black
              setIntermission(true);
              // 4.2s black pause (matches spec "several seconds") then start section 2
              schedule(() => {
                setIntermission(false);
                setSection(1);
                setIndex(0);
                setPhase("hidden");
              }, 4200);
            } else {
              // truly finished — leave black, notify parent
              setFinished(true);
              if (onComplete) onComplete();
            }
          } else {
            setIndex((i) => i + 1);
            // phase will become hidden briefly then next effect sets to 'in'
          }
        }, current.gap * 1000);
      },
      40 + (current.fadeIn + current.hold + current.fadeOut) * 1000
    );

    return clearTimers;
  }, [index, section, current, intermission, finished, schedule, clearTimers, currentList.length, onComplete]);

  // respect prefers-reduced-motion: we keep logic but CSS reduces movement
  useEffect(() => () => clearTimers(), [clearTimers]);

  if (finished) {
    return (
      <div className="engine-root is-finished" aria-hidden="true">
        <p className="end-hint">—</p>
      </div>
    );
  }

  if (intermission) {
    return <div className="engine-root is-intermission" aria-hidden="true" />;
  }

  if (!current) return null;

  return (
    <div className="engine-root">
      {/* key forces remount only when text changes — but we intentionally avoid remount for transition continuity,
          so we render one node and update via props */}
      <MessageDisplay
        text={current.text}
        phase={phase}
        timings={current}
        size={current.size}
        glow={current.glow}
      />
    </div>
  );
}
