import { useState } from "react";
import { KantoModal } from "./KantoModal";

const SECTIONS = [
  { id: "cognitive", label: "Cognitive", hint: "GEMINI / LLM KEY" },
  { id: "voice", label: "Voice", hint: "TTS ENGINE KEY" },
  { id: "visual", label: "Visual", hint: "IMAGE MODEL KEY" },
];

export function ApiControlPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<string | null>(null);

  return (
    <KantoModal open={open} onClose={onClose} title="API Vault" subtitle="Credential Bus">
      <div className="divide-y divide-kanto-black">
        {SECTIONS.map((section) => (
          <section key={section.id} className="px-6 py-6">
            <div className="flex items-baseline justify-between">
              <h3 className="font-serif text-lg italic">{section.label}</h3>
              <span className="font-mono text-[10px] uppercase tracking-[0.28em]">
                {section.hint}
              </span>
            </div>
            <form
              className="mt-4 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                setSaved(section.id);
              }}
            >
              <input
                type="password"
                aria-label={`${section.label} API key`}
                placeholder="••••••••••••••••"
                value={values[section.id] ?? ""}
                onChange={(e) =>
                  setValues((v) => ({ ...v, [section.id]: e.target.value }))
                }
                className="flex-1 border border-kanto-black bg-transparent px-3 py-2 font-mono text-xs outline-none placeholder:opacity-40 focus:bg-kanto-cream"
              />
              <button
                type="submit"
                className="border border-kanto-black px-4 py-2 font-mono text-[10px] uppercase tracking-[0.28em] transition-colors hover:bg-kanto-black hover:text-kanto-cream"
              >
                [ SAVE ]
              </button>
            </form>
            {saved === section.id && (
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] opacity-60">
                Key stored locally in session
              </p>
            )}
          </section>
        ))}
      </div>
    </KantoModal>
  );
}
