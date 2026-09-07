export default function MessageDisplay({ text, phase, timings, size, glow }) {
  // phase: 'in' | 'visible' | 'out' | 'hidden'
  const opacity =
    phase === "in" || phase === "visible" ? 1 : phase === "out" ? 0 : 0;

  // translateY gives a subtle cinematic rise
  const translateY =
    phase === "in" || phase === "visible" ? "0px" : phase === "out" ? "-8px" : "10px";

  const duration =
    phase === "in"
      ? timings.fadeIn
      : phase === "out"
        ? timings.fadeOut
        : 0.6;

  // keep easing consistent with spec
  const easing = "cubic-bezier(0.22, 1, 0.36, 1)";

  return (
    <p
      className={`message-text size-${size} glow-${glow} phase-${phase}`}
      style={{
        opacity,
        transform: `translateY(${translateY})`,
        transition:
          phase === "hidden"
            ? "none"
            : `opacity ${duration}s ${easing}, transform ${duration}s ${easing}, filter ${duration}s ${easing}`,
      }}
      aria-live="polite"
      aria-atomic="true"
    >
      {text}
    </p>
  );
}
