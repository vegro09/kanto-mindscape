import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import { ParticleSphere, type BrainState } from "@/components/kanto/ParticleSphere";
import { PushToTalkButton } from "@/components/kanto/PushToTalkButton";
import { AssetCanvas } from "@/components/kanto/AssetCanvas";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kanto Brain OS — Voice-First AI Interface" },
      {
        name: "description",
        content:
          "Kanto Brain OS is a zero-distraction, voice-first AI workspace: hold to speak and generated assets appear only when you need them.",
      },
      { property: "og:title", content: "Kanto Brain OS — Voice-First AI Interface" },
      {
        property: "og:description",
        content:
          "A minimalist push-to-talk interface for the Kanto Empire Brain OS with a living particle sphere and an on-demand asset canvas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [state, setState] = useState<BrainState>("idle");
  const [assetOpen, setAssetOpen] = useState(false);

  const engage = useCallback(() => setState("listening"), []);
  const release = useCallback(() => {
    setState((prev) => (prev === "listening" ? "processing" : prev));
  }, []);

  useEffect(() => {
    if (state !== "processing") return;
    const t = setTimeout(() => setState("idle"), 2600);
    return () => clearTimeout(t);
  }, [state]);

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-kanto-cream text-kanto-black">
      <header className="relative z-10 flex items-center justify-between px-6 py-6">
        <span className="w-[140px]" />
        <h1 className="font-serif text-lg italic tracking-wide">Kanto Brain OS</h1>
        <div className="flex w-[140px] justify-end">
          <button
            type="button"
            onClick={() => setAssetOpen(true)}
            className="rounded-[8px] border border-kanto-line bg-kanto-white/60 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:bg-kanto-white hover:text-kanto-black"
          >
            Test Asset Render
          </button>
        </div>
      </header>

      <div className="relative z-10 flex flex-1 items-center justify-center">
        <ParticleSphere state={state} />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-3 pb-16">
        <motion.p
          key={state}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
        >
          {state === "listening"
            ? "Receiving"
            : state === "processing"
              ? "Processing"
              : "Standby"}
        </motion.p>
        <PushToTalkButton
          active={state === "listening"}
          onEngage={engage}
          onRelease={release}
        />
      </div>

      <AssetCanvas open={assetOpen} onClose={() => setAssetOpen(false)} />
    </main>
  );
}
