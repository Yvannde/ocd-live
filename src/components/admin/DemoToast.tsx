"use client";

import { useEffect } from "react";
import { copy } from "@/config/copy.fr";
import { cn } from "@/lib/utils";

export function DemoToast({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(onClose, 2200);
    return () => window.clearTimeout(t);
  }, [open, onClose]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 border border-ink bg-ink px-4 py-2 font-mono text-[12px] text-bg transition-opacity duration-150",
        open ? "opacity-100" : "opacity-0",
      )}
    >
      {copy.admin.demoToast}
    </div>
  );
}
