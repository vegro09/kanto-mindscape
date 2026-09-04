import { motion } from "motion/react";
import { Mic } from "lucide-react";

export function PushToTalkButton({
  active,
  onEngage,
  onRelease,
}: {
  active: boolean;
  onEngage: () => void;
  onRelease: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4 select-none">
      <motion.button
        type="button"
        aria-label="Hold to talk"
        onPointerDown={onEngage}
        onPointerUp={onRelease}
        onPointerLeave={onRelease}
        onPointerCancel={onRelease}
        onContextMenu={(e) => e.preventDefault()}
        whileTap={{ scale: 0.94 }}
        animate={{ scale: active ? 1.06 : 1 }}
        transition={{ type: "spring", stiffness: 420, damping: 22 }}
        className={`relative flex h-20 w-20 items-center justify-center rounded-[8px] border transition-colors duration-200 ${
          active
            ? "border-kanto-black bg-kanto-black text-kanto-white"
            : "border-kanto-line bg-kanto-white text-kanto-black hover:bg-kanto-grey"
        }`}
      >
        <Mic strokeWidth={1.5} className="h-7 w-7" />
        {active && (
          <motion.span
            className="pointer-events-none absolute inset-0 rounded-[8px] border border-kanto-black"
            animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.button>

      <motion.p
        key={active ? "on" : "off"}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground"
      >
        {active ? "Listening" : "Hold to speak"}
      </motion.p>
    </div>
  );
}
