"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { DemoPackage } from "@/config/site";
import { copy } from "@/config/copy.fr";
import type { HourRange } from "@/lib/availability";
import { addDays, weekLabel } from "@/lib/time";
import {
  FilterField,
  FilterPanel,
  FilterSelect,
  FilterToggleGroup,
} from "@/components/ui/FilterPanel";
import { BookingLegend } from "./BookingLegend";
import { cn } from "@/lib/utils";

const DAY_SHORT = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export function BookingFilters({
  mode,
  packageSlug,
  packages,
  weekStart,
  hourRange,
  freeOnly,
  onMode,
  onPackage,
  onPrevWeek,
  onNextWeek,
  onHourRange,
  onFreeOnly,
  mobileDayIndex,
  onMobileDay,
}: {
  mode: "onsite" | "remote";
  packageSlug: string;
  packages: DemoPackage[];
  weekStart: Date;
  hourRange: HourRange;
  freeOnly: boolean;
  onMode: (m: "onsite" | "remote") => void;
  onPackage: (slug: string) => void;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onHourRange: (r: HourRange) => void;
  onFreeOnly: (v: boolean) => void;
  mobileDayIndex: number;
  onMobileDay: (i: number) => void;
}) {
  const f = copy.booking.filters;
  const [sheetOpen, setSheetOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pkgName = packages.find((p) => p.slug === packageSlug)?.name ?? packageSlug;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!sheetOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [sheetOpen]);

  const filterFields = (
    <>
      <FilterField label={f.mode}>
        <FilterToggleGroup
          value={mode}
          onChange={(v) => onMode(v as "onsite" | "remote")}
          options={[
            { value: "onsite", label: "Lomé" },
            { value: "remote", label: "Distance" },
          ]}
        />
      </FilterField>

      <FilterField label={f.package}>
        <FilterSelect value={packageSlug} onChange={onPackage}>
          {packages.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </FilterSelect>
      </FilterField>

      <FilterField label={f.hours}>
        <FilterSelect
          value={hourRange}
          onChange={(v) => onHourRange(v as HourRange)}
        >
          <option value="all">{f.allHours}</option>
          <option value="morning">Matin (9–12 h)</option>
          <option value="afternoon">Après-midi (12–17 h)</option>
          <option value="evening">Soir (17–20 h)</option>
        </FilterSelect>
      </FilterField>

      <FilterField label="Affichage">
        <FilterToggleGroup
          value={freeOnly ? "free" : "all"}
          onChange={(v) => onFreeOnly(v === "free")}
          options={[
            { value: "all", label: "Tous les créneaux" },
            { value: "free", label: f.freeOnly },
          ]}
        />
      </FilterField>
    </>
  );

  const sheet = sheetOpen ? (
    <div
      className="fixed inset-0 z-[110] flex flex-col justify-end md:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-filters-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink/40"
        aria-label="Fermer les filtres"
        onClick={() => setSheetOpen(false)}
      />
      <div
        className="relative max-h-[85dvh] overflow-y-auto border-t border-line bg-bg"
        style={{ backgroundColor: "var(--bg)" }}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-line bg-bg px-4 py-3">
          <h2
            id="booking-filters-title"
            className="font-mono text-[12px] uppercase tracking-wide text-ink"
          >
            Filtres
          </h2>
          <button
            type="button"
            onClick={() => setSheetOpen(false)}
            className="font-mono text-[12px] text-ink underline underline-offset-4"
          >
            Fermer
          </button>
        </div>
        <div className="space-y-4 p-4">{filterFields}</div>
        <div className="border-t border-line p-4">
          <button
            type="button"
            onClick={() => setSheetOpen(false)}
            className="inline-flex h-12 w-full items-center justify-center bg-ink text-[15px] font-medium text-bg"
          >
            Voir les créneaux
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* Mobile : barre compacte + jours — le calendrier reste visible */}
      <div className="sticky top-16 z-30 space-y-2 border-b border-line bg-bg py-2 md:hidden">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrevWeek}
            aria-label={f.prevWeek}
            className="h-9 w-9 shrink-0 border border-line text-ink-muted"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="flex h-9 min-w-0 flex-1 items-center justify-between border border-ink px-3 text-left"
          >
            <span className="truncate text-[13px] font-medium text-ink">
              {mode === "onsite" ? "Lomé" : "Distance"} · {pkgName}
            </span>
            <span className="shrink-0 font-mono text-[11px] text-ink-muted">
              Filtres
            </span>
          </button>
          <button
            type="button"
            onClick={onNextWeek}
            aria-label={f.nextWeek}
            className="h-9 w-9 shrink-0 border border-line text-ink-muted"
          >
            →
          </button>
        </div>
        <div className="flex gap-1 overflow-x-auto pb-0.5">
          {DAY_SHORT.map((label, i) => {
            const day = addDays(weekStart, i);
            const active = mobileDayIndex === i;
            return (
              <button
                key={label}
                type="button"
                onClick={() => onMobileDay(i)}
                className={cn(
                  "flex min-w-[2.75rem] shrink-0 flex-col items-center border px-1.5 py-1.5",
                  active
                    ? "border-ink bg-ink text-bg"
                    : "border-line bg-bg text-ink-muted",
                )}
              >
                <span className="font-mono text-[9px] uppercase">{label}</span>
                <span className="text-[12px] font-medium tabular-nums">
                  {day.getUTCDate()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {mounted && sheet ? createPortal(sheet, document.body) : null}

      {/* Desktop : panneau complet */}
      <div className="sticky top-16 z-30 hidden space-y-4 bg-bg/90 py-4 backdrop-blur-xl md:block">
        <FilterPanel title="Filtres du calendrier">
          {filterFields}
          <FilterField label={f.week} className="lg:col-span-2">
            <div className="flex h-11 items-stretch border border-line">
              <button
                type="button"
                onClick={onPrevWeek}
                aria-label={f.prevWeek}
                className="w-11 border-r border-line text-ink-muted hover:bg-ink hover:text-bg"
              >
                ←
              </button>
              <span className="flex flex-1 items-center justify-center px-2 font-mono text-[13px] text-ink-2">
                {weekLabel(weekStart)}
              </span>
              <button
                type="button"
                onClick={onNextWeek}
                aria-label={f.nextWeek}
                className="w-11 border-l border-line text-ink-muted hover:bg-ink hover:text-bg"
              >
                →
              </button>
            </div>
          </FilterField>
        </FilterPanel>
        <div className="border border-line bg-bg px-5 py-3">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-muted">
            Légende
          </p>
          <BookingLegend />
        </div>
      </div>
    </>
  );
}
