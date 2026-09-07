export default function MessageDisplay({ text, phase, timings, size, glow, transition = "fade" }) {
  const duration =
    phase === "in" ? timings.fadeIn : phase === "out" ? timings.fadeOut : 0.6;

  const easing = "cubic-bezier(0.22, 1, 0.36, 1)";

  let opacity = 0;
  let transform = "translateY(10px)";
  let filter = "blur(0px)";

  if (phase === "in" || phase === "visible") {
    opacity = 1;
    transform = "translateY(0px)";
    filter = "blur(0px)";
  } else if (phase === "out") {
    opacity = 0;
    // transition variants for out
    if (transition === "fade-down") transform = "translateY(10px)";
    else if (transition === "rise") transform = "translateY(-10px)";
    else if (transition === "blur") {
      transform = "translateY(0px)";
      filter = "blur(6px)";
    } else if (transition === "focus") {
      transform = "scale(0.985)";
      filter = "blur(2px)";
    } else {
      transform = "translateY(-8px)";
    }
  } else {
    // hidden
    opacity = 0;
    if (transition === "rise") transform = "translateY(14px)";
    else if (transition === "blur") {
      transform = "translateY(0px)";
      filter = "blur(8px)";
    } else {
      transform = "translateY(10px)";
    }
  }

  // entering blur
  if (phase === "in" && (transition === "blur" || transition === "focus")) {
    // start blurred then clear — handled via initial hidden state + transition
    filter = "blur(0px)";
  }
  if (phase === "hidden" && (transition === "blur" || transition === "focus")) {
    filter = "blur(8px)";
  }

  return (
    <p
      className={`message-text size-${size} glow-${glow} phase-${phase} trans-${transition}`}
      style={{
        opacity,
        transform,
        filter,
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
