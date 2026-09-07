import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { ParticleSphere, type BrainState } from "@/components/kanto/ParticleSphere";
import { KantoHeader, type PanelId } from "@/components/kanto/KantoHeader";
import { VoiceControls } from "@/components/kanto/VoiceControls";
import { ApiControlPanel } from "@/components/kanto/ApiControlPanel";
import { DataIngestionDropzone } from "@/components/kanto/DataIngestionDropzone";
import { NeuralMemoryDashboard } from "@/components/kanto/NeuralMemoryDashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kanto Brain OS — Voice-First AI Console" },
      {
        name: "description",
        content:
          "Kanto Brain OS: a flat, zero-distraction voice console with a particle brain, memory map, data port, and API vault.",
      },
      { property: "og:title", content: "Kanto Brain OS — Voice-First AI Console" },
      {
        property: "og:description",
        content:
          "A minimalist push-to-talk console for the Kanto Empire with memory graph, ingestion bay, and credential vault.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [state, setState] = useState<BrainState>("idle");
  const [panel, setPanel] = useState<PanelId | null>(null);

  const engage = useCallback(() => setState("listening"), []);
  const release = useCallback(() => {
    setState((prev) => (prev === "listening" ? "speaking" : prev));
  }, []);

  useEffect(() => {
    if (state !== "speaking") return;
    const t = setTimeout(() => setState("idle"), 2600);
    return () => clearTimeout(t);
  }, [state]);

  return (
    <main className="flex min-h-screen flex-col overflow-hidden bg-kanto-cream text-kanto-black">
      <KantoHeader onOpen={setPanel} />

      <div className="flex flex-1 items-center justify-center">
        <ParticleSphere state={state} />
      </div>

      <VoiceControls state={state} onEngage={engage} onRelease={release} />

      <NeuralMemoryDashboard open={panel === "memory"} onClose={() => setPanel(null)} />
      <DataIngestionDropzone open={panel === "data"} onClose={() => setPanel(null)} />
      <ApiControlPanel open={panel === "api"} onClose={() => setPanel(null)} />
    </main>
  );
}
