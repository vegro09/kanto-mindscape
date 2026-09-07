import { Mic } from "lucide-react";
import type { BrainState } from "./ParticleSphere";

export function VoiceControls({
  state,
  onEngage,
  onRelease,
}: {
  state: BrainState;
  onEngage: () => void;
  onRelease: () => void;
}) {
  const status =
    state === "listening"
      ? "LISTENING — RELEASE TO SEND"
      : state === "speaking"
        ? "SPEAKING — KANTO RESPONDING"
        : "STANDBY - SAY 'KANTO'";

  return (
    <div className="flex select-none flex-col items-center gap-4 pb-14">
      <p className="font-mono text-[10px] uppercase tracking-[0.32em]">{status}</p>

      <button
        type="button"
        aria-label="Hold to talk"
        onPointerDown={onEngage}
        onPointerUp={onRelease}
        onPointerLeave={onRelease}
        onPointerCancel={onRelease}
        onContextMenu={(e) => e.preventDefault()}
        className={`flex h-16 w-16 items-center justify-center border border-kanto-black transition-colors duration-150 ${
          state === "listening"
            ? "bg-kanto-black text-kanto-cream"
            : "bg-transparent text-kanto-black hover:bg-kanto-black hover:text-kanto-cream"
        }`}
      >
        <Mic strokeWidth={1.5} className="h-6 w-6" />
      </button>

      <p className="font-mono text-[10px] uppercase tracking-[0.32em]">
        TAP FOR MANUAL OVERRIDE
      </p>
    </div>
  );
}
