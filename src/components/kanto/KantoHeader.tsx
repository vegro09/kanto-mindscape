export type PanelId = "memory" | "data" | "api";

const NAV: { id: PanelId; label: string }[] = [
  { id: "memory", label: "MEMORY MAP" },
  { id: "data", label: "DATA PORT" },
  { id: "api", label: "API VAULT" },
];

export function KantoHeader({ onOpen }: { onOpen: (id: PanelId) => void }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 px-6 py-6">
      <h1 className="font-serif text-lg italic tracking-wide">Kanto Brain OS</h1>
      <nav className="flex items-center gap-2">
        {NAV.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onOpen(item.id)}
            className="border border-kanto-black bg-transparent px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] transition-colors hover:bg-kanto-black hover:text-kanto-cream"
          >
            [ {item.label} ]
          </button>
        ))}
      </nav>
    </header>
  );
}
