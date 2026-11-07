"use client";

import type { DemoPackage } from "@/config/site";
import { copy } from "@/config/copy.fr";
import type { HourRange } from "@/lib/availability";
import { weekLabel } from "@/lib/time";
import {
  FilterField,
  FilterPanel,
  FilterSelect,
  FilterToggleGroup,
} from "@/components/ui/FilterPanel";
import { BookingLegend } from "./BookingLegend";

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
    <div className="sticky top-16 z-30 space-y-4 bg-bg/90 py-4 backdrop-blur-xl">
      <FilterPanel title="Filtres du calendrier">
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
          <FilterSelect
            value={packageSlug}
            onChange={onPackage}
          >
            {packages.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name} — {Math.round(p.durationMinutes / 60)} h
                {p.durationMinutes % 60
                  ? String(p.durationMinutes % 60).padStart(2, "0")
                  : ""}
              </option>
            ))}
          </FilterSelect>
        </FilterField>

        <FilterField label={f.week}>
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
            <option value="morning">Matin (9–12 h)</option>
            <option value="afternoon">Après-midi (12–17 h)</option>
            <option value="evening">Soir (17–20 h)</option>
          </FilterSelect>
        </FilterField>

        <FilterField label="Affichage" className="lg:col-span-2">
          <FilterToggleGroup
            value={freeOnly ? "free" : "all"}
            onChange={(v) => onFreeOnly(v === "free")}
            options={[
              { value: "all", label: "Tous les créneaux" },
              { value: "free", label: f.freeOnly },
            ]}
          />
        </FilterField>

        <FilterField label="Jour (mobile)" className="md:hidden lg:col-span-2">
          <FilterSelect
            value={String(mobileDayIndex)}
            onChange={(v) => onMobileDay(Number(v))}
          >
            {["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"].map(
              (label, i) => (
                <option key={label} value={i}>
                  {label}
                </option>
              ),
            )}
          </FilterSelect>
        </FilterField>
      </FilterPanel>

      <div className="border border-line bg-bg px-4 py-3 md:px-5">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-muted">
          Légende
        </p>
        <BookingLegend />
      </div>
    </div>
  );
}
