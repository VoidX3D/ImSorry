import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let particles = [];
    let w = 0;
    let h = 0;
    let dpr = 1;

    const isReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const countForWidth = () => {
      if (window.innerWidth < 480) return 28;
      if (window.innerWidth < 768) return 45;
      if (window.innerWidth < 1024) return 65;
      return 85;
    };

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // re-seed if count changed significantly
      const target = countForWidth();
      if (Math.abs(particles.length - target) > 10 || particles.length === 0) {
        init(target);
      }
    }

    function init(count) {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        // very slow drift — dust in darkness
        vx: (Math.random() - 0.5) * (isReducedMotion ? 0.07 : 0.22),
        vy: (Math.random() - 0.5) * (isReducedMotion ? 0.07 : 0.18),
        r: 0.4 + Math.random() * 1.05, // 0.4–1.45px
        baseAlpha: 0.18 + Math.random() * 0.42, // 0.18–0.6
        // subtle twinkle
        twinkleSpeed: 0.0006 + Math.random() * 0.0018,
        twinkleOffset: Math.random() * Math.PI * 2,
      }));
    }

    let paused = false;

    function frame(t) {
      if (paused) {
        rafRef.current = requestAnimationFrame(frame);
        return;
      }
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        if (!isReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // wrap around edges — never disappear
          if (p.x < -4) p.x = w + 4;
          if (p.x > w + 4) p.x = -4;
          if (p.y < -4) p.y = h + 4;
          if (p.y > h + 4) p.y = -4;
        }

        const alphaPhase = Math.sin(t * p.twinkleSpeed + p.twinkleOffset);
        // alpha oscillates ±0.22 around base
        const alpha = Math.max(
          0.06,
          Math.min(0.82, p.baseAlpha + alphaPhase * 0.18)
        );

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        // tiny soft edge — subtle glow without cost
        ctx.shadowColor = `rgba(255,255,255,${alpha * 0.45})`;
        ctx.shadowBlur = p.r > 1 ? 3 : 1.5;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    // Visibility handling — pause when tab hidden to save battery
    function onVisibility() {
      paused = document.hidden;
    }

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="particle-canvas"
    />
  );
}
