import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import type { ReactNode } from "react";

export function KantoModal({
  open,
  title,
  subtitle,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-kanto-cream p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 8, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex h-full max-h-[86vh] w-full max-w-3xl flex-col border border-kanto-black bg-kanto-white"
          >
            <header className="flex items-start justify-between border-b border-kanto-black px-6 py-5">
              <div>
                <h2 className="font-serif text-xl italic">{title}</h2>
                {subtitle && (
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em]">
                    {subtitle}
                  </p>
                )}
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center border border-kanto-black bg-kanto-white transition-colors hover:bg-kanto-cream"
              >
                <X strokeWidth={1.5} className="h-4 w-4" />
              </button>
            </header>
            <div className="flex-1 overflow-y-auto">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
