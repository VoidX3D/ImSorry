import { useEffect, useRef } from "react";

export default function ParticleBackground({ subtle = false, burst = 0 }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const burstRef = useRef(0);
  const pointerRef = useRef({ x: -9999, y: -9999, active: false });

  // allow parent to trigger burst by changing burst prop (incrementing number)
  useEffect(() => {
    burstRef.current = burst;
  }, [burst]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let particles = [];
    let w = 0;
    let h = 0;
    let dpr = 1;
    let burstEnergy = 0;

    const isReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const countForWidth = () => {
      if (subtle) {
        if (window.innerWidth < 480) return 18;
        if (window.innerWidth < 768) return 26;
        return 38;
      }
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
      const target = countForWidth();
      if (Math.abs(particles.length - target) > 10 || particles.length === 0) {
        init(target);
      }
    }

    function init(count) {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * (isReducedMotion ? 0.06 : subtle ? 0.14 : 0.22),
        vy: (Math.random() - 0.5) * (isReducedMotion ? 0.06 : subtle ? 0.12 : 0.18),
        r: 0.4 + Math.random() * (subtle ? 0.8 : 1.05),
        baseAlpha: (subtle ? 0.10 : 0.18) + Math.random() * (subtle ? 0.22 : 0.42),
        twinkleSpeed: 0.0006 + Math.random() * 0.0018,
        twinkleOffset: Math.random() * Math.PI * 2,
      }));
    }

    let paused = false;
    let lastBurstSeen = burstRef.current;

    function frame(t) {
      if (paused) {
        rafRef.current = requestAnimationFrame(frame);
        return;
      }

      // detect burst trigger
      if (burstRef.current !== lastBurstSeen) {
        lastBurstSeen = burstRef.current;
        burstEnergy = 1;
        // push particles outward from center
        const cx = w * 0.5;
        const cy = h * 0.5;
        for (const p of particles) {
          const dx = p.x - cx;
          const dy = p.y - cy;
          const dist = Math.hypot(dx, dy) || 1;
          const nx = dx / dist;
          const ny = dy / dist;
          p.vx += nx * (0.9 + Math.random() * 1.1);
          p.vy += ny * (0.9 + Math.random() * 1.1);
        }
      }

      // decay burst energy — used to damp particle alpha/brightness during burst
      if (burstEnergy > 0) {
        burstEnergy = Math.max(0, burstEnergy - 0.015);
        // slowly restore velocities
        for (const p of particles) {
          p.vx *= 0.990;
          p.vy *= 0.990;
        }
      }

      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        if (!isReducedMotion) {
          // touch interaction — gently push particles away from pointer (mobile-first)
          if (pointerRef.current.active) {
            const dx = p.x - pointerRef.current.x;
            const dy = p.y - pointerRef.current.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 120 && dist > 0.1) {
              const force = (1 - dist / 120) * 0.09;
              p.vx += (dx / dist) * force;
              p.vy += (dy / dist) * force;
            }
            // slight damping
            p.vx *= 0.994;
            p.vy *= 0.994;
          }

          p.x += p.vx;
          p.y += p.vy;

          if (p.x < -4) p.x = w + 4;
          if (p.x > w + 4) p.x = -4;
          if (p.y < -4) p.y = h + 4;
          if (p.y > h + 4) p.y = -4;
        }

        const alphaPhase = Math.sin(t * p.twinkleSpeed + p.twinkleOffset);
        let alpha = p.baseAlpha + alphaPhase * (subtle ? 0.10 : 0.18);
        // during burst, slightly dim particles to let text be hero
        if (burstEnergy > 0) alpha *= 1 - burstEnergy * 0.25;
        alpha = Math.max(subtle ? 0.04 : 0.06, Math.min(subtle ? 0.55 : 0.82, alpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.shadowColor = `rgba(255,255,255,${alpha * (subtle ? 0.25 : 0.45)})`;
        ctx.shadowBlur = p.r > 1 ? (subtle ? 1.5 : 3) : (subtle ? 0.8 : 1.5);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    function onVisibility() {
      paused = document.hidden;
    }

    function onPointerMove(e) {
      const touch = e.touches ? e.touches[0] : e;
      if (!touch) return;
      pointerRef.current.x = touch.clientX;
      pointerRef.current.y = touch.clientY;
      pointerRef.current.active = true;
    }

    function onPointerLeave() {
      pointerRef.current.active = false;
    }

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    // touch/mouse — subtle interaction, not required
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("touchend", onPointerLeave);
    window.addEventListener("mouseleave", onPointerLeave);

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("touchend", onPointerLeave);
      window.removeEventListener("mouseleave", onPointerLeave);
    };
  }, [subtle, burst]);

  return <canvas ref={canvasRef} aria-hidden="true" className="particle-canvas" />;
}
