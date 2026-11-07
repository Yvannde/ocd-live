"use client";

import type { DemoPackage } from "@/config/site";
import { copy } from "@/config/copy.fr";
import type { HourRange } from "@/lib/availability";
import { addDays, formatLomeDateShort, weekLabel } from "@/lib/time";
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

  return (
    <div className="sticky top-16 z-30 space-y-3 bg-bg/95 py-3 backdrop-blur-xl">
      {/* Jour — chips mobiles */}
      <div className="md:hidden">
        <div className="mb-2 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onPrevWeek}
            aria-label={f.prevWeek}
            className="h-9 w-9 border border-line text-ink-muted hover:border-ink hover:text-ink"
          >
            ←
          </button>
          <p className="font-mono text-[12px] text-ink-muted">
            {weekLabel(weekStart)}
          </p>
          <button
            type="button"
            onClick={onNextWeek}
            aria-label={f.nextWeek}
            className="h-9 w-9 border border-line text-ink-muted hover:border-ink hover:text-ink"
          >
            →
          </button>
        </div>
        <div className="flex gap-1 overflow-x-auto pb-1">
          {DAY_SHORT.map((label, i) => {
            const day = addDays(weekStart, i);
            const active = mobileDayIndex === i;
            return (
              <button
                key={label}
                type="button"
                onClick={() => onMobileDay(i)}
                className={cn(
                  "flex min-w-[3.25rem] shrink-0 flex-col items-center border px-2 py-2",
                  active
                    ? "border-ink bg-ink text-bg"
                    : "border-line bg-bg text-ink-muted",
                )}
              >
                <span className="font-mono text-[10px] uppercase">{label}</span>
                <span className="text-[13px] font-medium tabular-nums">
                  {day.getUTCDate()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <FilterPanel title="Filtres">
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

        <FilterField label={f.week} className="hidden md:flex">
          <div className="flex h-11 items-stretch border border-line">
            <button
              type="button"
              onClick={onPrevWeek}
              aria-label={f.prevWeek}
              className="w-11 border-r border-line text-ink-muted transition-colors duration-150 hover:bg-ink hover:text-bg"
            >
              ←
            </button>
            <span className="flex flex-1 items-center justify-center px-2 font-mono text-[12px] text-ink-2 sm:text-[13px]">
              {weekLabel(weekStart)}
            </span>
            <button
              type="button"
              onClick={onNextWeek}
              aria-label={f.nextWeek}
              className="w-11 border-l border-line text-ink-muted transition-colors duration-150 hover:bg-ink hover:text-bg"
            >
              →
            </button>
          </div>
        </FilterField>

        <FilterField label={f.hours}>
          <FilterSelect
            value={hourRange}
            onChange={(v) => onHourRange(v as HourRange)}
          >
            <option value="all">{f.allHours}</option>
            <option value="morning">Matin</option>
            <option value="afternoon">Après-midi</option>
            <option value="evening">Soir</option>
          </FilterSelect>
        </FilterField>

        <FilterField label="Affichage" className="md:col-span-2 lg:col-span-1">
          <FilterToggleGroup
            value={freeOnly ? "free" : "all"}
            onChange={(v) => onFreeOnly(v === "free")}
            options={[
              { value: "all", label: "Tous" },
              { value: "free", label: f.freeOnly },
            ]}
          />
        </FilterField>
      </FilterPanel>

      <div className="hidden border border-line bg-bg px-4 py-3 md:block md:px-5">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-muted">
          Légende
        </p>
        <BookingLegend />
      </div>

      <p className="font-mono text-[11px] text-ink-muted md:hidden">
        Jour sélectionné · {formatLomeDateShort(addDays(weekStart, mobileDayIndex))}
      </p>
    </div>
  );
}
