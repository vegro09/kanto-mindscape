import { useRef, useState } from "react";
import { X } from "lucide-react";
import { KantoModal } from "./KantoModal";

type Item = { id: string; name: string; size: string };

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function DataIngestionDropzone({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [files, setFiles] = useState<Item[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const add = (list: FileList | null) => {
    if (!list) return;
    setFiles((prev) => [
      ...prev,
      ...Array.from(list).map((f) => ({
        id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2, 7)}`,
        name: f.name,
        size: formatSize(f.size),
      })),
    ]);
  };

  return (
    <KantoModal open={open} onClose={onClose} title="Data Port" subtitle="Ingestion Bay">
      <div className="px-6 py-6">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            add(e.dataTransfer.files);
          }}
          onClick={() => inputRef.current?.click()}
          className={`flex h-56 cursor-pointer items-center justify-center border border-dashed border-kanto-black px-6 text-center transition-colors ${
            dragging ? "bg-kanto-cream" : "bg-transparent"
          }`}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.28em]">
            DROP CONSTITUTIONS, CODEBASES, OR PDFS HERE
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => add(e.target.files)}
        />

        <ul className="mt-6 divide-y divide-kanto-black border border-kanto-black">
          {files.length === 0 && (
            <li className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.28em] opacity-50">
              No files ingested
            </li>
          )}
          {files.map((f) => (
            <li key={f.id} className="flex items-center justify-between px-4 py-3">
              <span className="truncate font-mono text-xs">{f.name}</span>
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] opacity-60">{f.size}</span>
                <button
                  type="button"
                  aria-label={`Remove ${f.name}`}
                  onClick={() => setFiles((prev) => prev.filter((x) => x.id !== f.id))}
                  className="flex h-6 w-6 items-center justify-center border border-kanto-black transition-colors hover:bg-kanto-black hover:text-kanto-cream"
                >
                  <X strokeWidth={1.5} className="h-3 w-3" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </KantoModal>
  );
}
