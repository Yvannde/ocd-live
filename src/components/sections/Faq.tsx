"use client";

import { useState } from "react";
import { IconMinus, IconPlus } from "@/components/icons";
import { copy } from "@/config/copy.fr";
import { cn } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-y border-b border-line bg-bg">
      <div className="container-page grid gap-10 md:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] md:gap-16">
        <h2 className="font-display text-h2 text-ink">{copy.faq.title}</h2>

        <div className="border-y border-ink">
          {copy.faq.items.map((item, index) => {
            const isOpen = open === index;
            return (
              <div
                key={item.q}
                className={cn(
                  index < copy.faq.items.length - 1 && "border-b border-line",
                )}
              >
                <button
                  type="button"
                  className="flex min-h-16 w-full items-center justify-between gap-4 py-4 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : index)}
                >
                  <span className="text-[16px] font-medium text-ink">{item.q}</span>
                  {isOpen ? (
                    <IconMinus size={18} className="shrink-0 text-ink" />
                  ) : (
                    <IconPlus size={18} className="shrink-0 text-ink" />
                  )}
                </button>
                {isOpen ? (
                  <p className="pb-5 pr-10 text-[15px] leading-relaxed text-ink-muted">
                    {item.a}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
