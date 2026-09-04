import { useMemo } from "react";
import { motion } from "motion/react";

export type BrainState = "idle" | "listening" | "processing";

const COUNT = 320;
const RADIUS = 150;

function useSpherePoints() {
  return useMemo(() => {
    const pts: { x: number; y: number; z: number }[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      pts.push({
        x: Number((Math.cos(theta) * r * RADIUS).toFixed(2)),
        y: Number((y * RADIUS).toFixed(2)),
        z: Number((Math.sin(theta) * r * RADIUS).toFixed(2)),
      });
    }
    return pts;
  }, []);
}

export function ParticleSphere({ state }: { state: BrainState }) {
  const points = useSpherePoints();

  const spin =
    state === "listening" ? 5 : state === "processing" ? 12 : 26;

  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        aria-hidden
        className="absolute rounded-full border border-kanto-line"
        style={{ width: RADIUS * 2.4, height: RADIUS * 2.4 }}
        animate={
          state === "listening"
            ? { scale: [1, 1.06, 1], opacity: [0.5, 1, 0.5] }
            : { scale: 1, opacity: 0.35 }
        }
        transition={{
          duration: state === "listening" ? 0.7 : 0.6,
          repeat: state === "listening" ? Infinity : 0,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="relative"
        style={{
          width: RADIUS * 2,
          height: RADIUS * 2,
          perspective: 900,
        }}
        animate={
          state === "listening"
            ? { scale: [1, 1.09, 1] }
            : state === "processing"
              ? { scale: [1, 1.02, 1] }
              : { scale: 1 }
        }
        transition={{
          duration: state === "listening" ? 0.42 : 2.4,
          repeat: state === "idle" ? 0 : Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: 360, rotateX: [0, 12, 0, -12, 0] }}
          transition={{
            rotateY: { duration: spin, repeat: Infinity, ease: "linear" },
            rotateX: { duration: spin * 1.6, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          {points.map((p, i) => {
            const depth = (p.z + RADIUS) / (RADIUS * 2);
            return (
              <motion.span
                key={i}
                className="absolute left-1/2 top-1/2 -ml-[2px] -mt-[2px] h-1 w-1 rounded-full bg-kanto-black"
                style={{
                  x: p.x,
                  y: p.y,
                  z: p.z,
                  opacity: Number((0.18 + depth * 0.72).toFixed(3)),
                }}
                animate={
                  state === "listening"
                    ? { scale: [1, 1.9, 1] }
                    : { scale: [1, 1.25, 1] }
                }
                transition={{
                  duration: state === "listening" ? 0.5 : 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (i % 24) * (state === "listening" ? 0.02 : 0.12),
                }}
              />
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
