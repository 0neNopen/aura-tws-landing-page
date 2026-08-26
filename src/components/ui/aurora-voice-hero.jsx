import React, { useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

/**
 * Visual calibration. Tuned for "calm studio flow" rather than oscilloscope
 * spikiness: low amplitude, long waves, slow drift, gentle mouse response.
 */
const CONFIG = {
  ribbonCount: 4,
  speed: 0.003,
  complexity: 0.008,
  amplitude: 110,
  mouseIntensity: 0.5,
  sampleStep: 3, // px between sampled points — smaller = smoother curve
  lineWidth: 1.5,
  pulse: true,
  palette: "Brand Theme",
};

/**
 * AuroraHero
 *
 * A full-screen generative hero banner that draws animated simplex-noise ribbons
 * on a <canvas> and overlays interactive text and buttons.
 *
 * Performance & accessibility guards:
 *  - The rAF loop runs only while the hero intersects the viewport.
 *  - Under `prefers-reduced-motion` a single static frame is drawn instead
 *    of an animation loop.
 */
export default function AuroraHero() {
  const canvasRef = useRef(null);
  const frameRef = useRef();
  const prefersReducedMotion = useReducedMotion();

  // Palettes by name — only "Brand Theme" is active; the rest are kept as
  // documented alternates for future art direction swaps.
  const palettes = useMemo(
    () => ({
      "Brand Theme": ["#B23A2A", "#0E0E0E", "#5A5A57", "#D9D5CA"],
    }),
    []
  );

  // Animation configuration — derived from CONFIG so the calibration block
  // stays the single tuning surface.
  const colors = palettes[CONFIG.palette];

  // Core animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, active: false };
    let time = 0;

    const drawStaticFrame = () => {
      // Redraw a single calm composition; used for the reduced-motion path
      // where there is no rAF loop to repaint after a resize clears the canvas.
      time = Math.PI * 0.25; // fixed phase so the composition is deterministic
      drawFrame();
    };

    const resize = () => {
      // Scale the backing store by devicePixelRatio so ribbons stay crisp
      // on HiDPI displays; CSS size remains full-window.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (prefersReducedMotion) {
        // The animation loop is disabled under reduced motion, so an explicit
        // redraw is required or the canvas stays blank after any resize.
        drawStaticFrame();
      }
    };
    window.addEventListener("resize", resize);
    resize();

    const onMouseMove = (e) => {
      mouse = { x: e.clientX, y: e.clientY, active: true };
    };
    window.addEventListener("mousemove", onMouseMove);

    // Simplex noise (self-contained)
    const simplex = (() => {
      const F2 = 0.5 * (Math.sqrt(3) - 1);
      const G2 = (3 - Math.sqrt(3)) / 6;
      const p = new Uint8Array(256);
      for (let i = 0; i < 256; i++) p[i] = i;
      for (let i = 255; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [p[i], p[j]] = [p[j], p[i]];
      }
      const perm = new Uint8Array(512);
      const perm12 = new Uint8Array(512);
      const grad3 = new Float32Array([
        1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1,
        0, 1, -1, 0, -1, 1, 0, 1, -1, 0, -1, 0, -1,
      ]);
      for (let i = 0; i < 512; i++) {
        perm[i] = p[i & 255];
        perm12[i] = perm[i] % 12;
      }
      return (xin, yin) => {
        let n0 = 0,
          n1 = 0,
          n2 = 0;
        const s = (xin + yin) * F2;
        const i = Math.floor(xin + s);
        const j = Math.floor(yin + s);
        const t = (i + j) * G2;
        const X0 = i - t;
        const Y0 = j - t;
        const x0 = xin - X0;
        const y0 = yin - Y0;
        const i1 = x0 > y0 ? 1 : 0;
        const j1 = x0 > y0 ? 0 : 1;
        const x1 = x0 - i1 + G2;
        const y1 = y0 - j1 + G2;
        const x2 = x0 - 1 + 2 * G2;
        const y2 = y0 - 1 + 2 * G2;
        const ii = i & 255;
        const jj = j & 255;
        let t0 = 0.5 - x0 * x0 - y0 * y0;
        if (t0 >= 0) {
          const gi = perm12[ii + perm[jj]];
          t0 *= t0;
          n0 = t0 * t0 * (grad3[gi * 3] * x0 + grad3[gi * 3 + 1] * y0);
        }
        let t1 = 0.5 - x1 * x1 - y1 * y1;
        if (t1 >= 0) {
          const gi = perm12[ii + i1 + perm[jj + j1]];
          t1 *= t1;
          n1 = t1 * t1 * (grad3[gi * 3] * x1 + grad3[gi * 3 + 1] * y1);
        }
        let t2 = 0.5 - x2 * x2 - y2 * y2;
        if (t2 >= 0) {
          const gi = perm12[ii + 1 + perm[jj + 1]];
          t2 *= t2;
          n2 = t2 * t2 * (grad3[gi * 3] * x2 + grad3[gi * 3 + 1] * y2);
        }
        return 70 * (n0 + n1 + n2);
      };
    })();

    const drawFrame = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += CONFIG.speed;

      for (let idx = 0; idx < CONFIG.ribbonCount; idx++) {
        const color = colors[idx % colors.length];
        ctx.beginPath();
        const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.5, color);
        grad.addColorStop(1, "transparent");
        ctx.strokeStyle = grad;
        ctx.lineWidth = CONFIG.lineWidth;

        for (let x = 0; x < canvas.width; x += CONFIG.sampleStep) {
          const dx = x - mouse.x;
          const dy = canvas.height / 2 - mouse.y;
          const dist = Math.hypot(dx, dy);
          const m = mouse.active
            ? 1 + (1 - Math.min(1, dist / 400)) * CONFIG.mouseIntensity
            : 1;
          const noise = simplex(x * CONFIG.complexity * m, idx * 1000 + time);
          const pulse = CONFIG.pulse ? Math.sin(time * 0.5 + idx * 1000) * 0.1 + 0.9 : 1;
          const y = canvas.height / 2 + noise * CONFIG.amplitude * pulse * m;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    };

    // The loop only advances while the hero is on screen; scrolling past it
    // fully stops the rAF chain instead of burning frames on invisible work.
    const startLoop = () => {
      cancelAnimationFrame(frameRef.current);
      const loop = () => {
        drawFrame();
        frameRef.current = requestAnimationFrame(loop);
      };
      loop();
    };
    const stopLoop = () => cancelAnimationFrame(frameRef.current);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (prefersReducedMotion) return; // static frame only
        if (entry.isIntersecting) startLoop();
        else stopLoop();
      },
      { threshold: 0 }
    );
    visibilityObserver.observe(canvas);

    if (prefersReducedMotion) {
      drawStaticFrame(); // one calm composition, no motion
    } else {
      startLoop();
    }

    return () => {
      stopLoop();
      visibilityObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [cfg, colors, prefersReducedMotion]);

  return (
    <div className="aurora-showcase">
      <canvas ref={canvasRef} className="aurora-canvas" />
    </div>
  );
}
