import { useEffect, useRef } from "react";

export type BrainState = "idle" | "listening" | "speaking";

const COUNT = 420;
const SIZE = 420;

type Point = { x: number; y: number; z: number; drift: number };

function buildPoints(): Point[] {
  const pts: Point[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < COUNT; i++) {
    const y = 1 - (i / (COUNT - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    pts.push({
      x: Math.cos(theta) * r,
      y,
      z: Math.sin(theta) * r,
      drift: (i % 17) / 17,
    });
  }
  return pts;
}

export function ParticleSphere({ state }: { state: BrainState }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef<BrainState>(state);
  stateRef.current = state;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    ctx.scale(dpr, dpr);

    const points = buildPoints();
    let raf = 0;
    let t = 0;

    const render = () => {
      const s = stateRef.current;
      const speed = s === "listening" ? 0.018 : s === "speaking" ? 0.009 : 0.004;
      t += speed;

      ctx.clearRect(0, 0, SIZE, SIZE);
      const cx = SIZE / 2;
      const cy = SIZE / 2;
      const baseRadius = SIZE * 0.36;

      const pulse =
        s === "speaking"
          ? 1 + Math.sin(t * 4) * 0.09
          : s === "listening"
            ? 1 + Math.sin(t * 9) * 0.03
            : 1;

      const cosY = Math.cos(t);
      const sinY = Math.sin(t);
      const tilt = Math.sin(t * 0.4) * 0.25;
      const cosX = Math.cos(tilt);
      const sinX = Math.sin(tilt);

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        let wobble = 0;
        if (s === "idle") {
          wobble = Math.sin(t * 1.2 + p.drift * 10) * 0.02;
        } else if (s === "listening") {
          // dots align into sound-wave bands
          wobble = Math.sin(t * 6 + p.y * 8) * 0.09;
        } else {
          wobble = Math.sin(t * 5 - p.drift * 6) * 0.05;
        }

        const scale = (1 + wobble) * pulse;

        // rotate around Y
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        // rotate around X
        const y1 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        const px = cx + x1 * baseRadius * scale;
        const py = cy + y1 * baseRadius * scale;

        const depth = (z2 + 1) / 2;
        const dotSize = 0.7 + depth * 1.2;
        ctx.globalAlpha = 0.15 + depth * 0.75;
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(px, py, dotSize, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-label="Kanto brain particle sphere"
      role="img"
      style={{ width: SIZE, height: SIZE }}
      className="max-w-full"
    />
  );
}
