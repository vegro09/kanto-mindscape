import { AnimatePresence, motion } from "motion/react";
import { X, FileText, Download, ImageIcon } from "lucide-react";

export function AssetCanvas({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-kanto-cream"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[440px] flex-col border-l border-kanto-line bg-kanto-white"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            <header className="flex items-center justify-between border-b border-kanto-line px-6 py-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
                  Generated
                </p>
                <h2 className="font-serif text-xl italic">Asset Canvas</h2>
              </div>
              <button
                type="button"
                aria-label="Close asset canvas"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-kanto-line bg-kanto-white transition-colors hover:bg-kanto-grey"
              >
                <X strokeWidth={1.5} className="h-4 w-4" />
              </button>
            </header>

            <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
              <section className="space-y-3">
                <p className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
                  Image
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 }}
                  className="overflow-hidden rounded-[8px] border border-kanto-line bg-kanto-grey"
                >
                  <div className="flex aspect-[4/3] items-center justify-center">
                    <ImageIcon strokeWidth={1} className="h-10 w-10 opacity-30" />
                  </div>
                  <div className="flex items-center justify-between border-t border-kanto-line bg-kanto-white px-4 py-3">
                    <span className="text-sm">kanto-render-01.png</span>
                    <span className="text-xs text-muted-foreground">1024 × 768</span>
                  </div>
                </motion.div>
              </section>

              <section className="space-y-3">
                <p className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
                  Document
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-[8px] border border-kanto-line bg-kanto-white p-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] bg-kanto-grey">
                      <FileText strokeWidth={1.5} className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        Empire_Strategy_Brief.pdf
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        PDF · 12 pages · 486 KB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-[8px] bg-kanto-black px-4 py-2.5 text-xs uppercase tracking-[0.22em] text-kanto-white transition-opacity hover:opacity-85"
                  >
                    <Download strokeWidth={1.5} className="h-3.5 w-3.5" />
                    Download
                  </button>
                </motion.div>
              </section>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
