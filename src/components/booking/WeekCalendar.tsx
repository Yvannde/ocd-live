"use client";

import type { CalendarSlot } from "@/lib/availability";
import { hourRows } from "@/lib/availability";
import {
  OPEN_HOUR,
  SLOT_STEP_MINUTES,
  addDays,
  formatLomeDateShort,
  formatLomeTime,
} from "@/lib/time";
import { cn } from "@/lib/utils";

const HOUR_PX = 64;

function topForStart(iso: string): number {
  const d = new Date(iso);
  const minutes = (d.getUTCHours() - OPEN_HOUR) * 60 + d.getUTCMinutes();
  return (minutes / 60) * HOUR_PX;
}

function heightForDuration(startIso: string, endIso: string): number {
  const mins =
    (new Date(endIso).getTime() - new Date(startIso).getTime()) / 60_000;
  return Math.max((mins / 60) * HOUR_PX, 22);
}

export function WeekCalendar({
  weekStart,
  days,
  selectedId,
  onSelect,
  mobileDayIndex,
}: {
  weekStart: Date;
  days: CalendarSlot[][];
  selectedId: string | null;
  onSelect: (id: string) => void;
  /** If set, only show that day (mobile). */
  mobileDayIndex?: number;
}) {
  const hours = hourRows();
  const visibleDays =
    mobileDayIndex !== undefined
      ? [[days[mobileDayIndex], mobileDayIndex] as const]
      : days.map((d, i) => [d, i] as const);

  return (
    <div className="w-full">
      <div className="overflow-x-auto border border-line bg-bg">
        <div
          className="grid min-w-[720px]"
          style={{
            gridTemplateColumns: `48px repeat(${visibleDays.length}, minmax(0, 1fr))`,
          }}
        >
          <div className="border-b border-line bg-bg" />
          {visibleDays.map(([, i]) => {
            const day = addDays(weekStart, i);
            return (
              <div
                key={i}
                className="border-b border-l border-line px-2 py-3 text-center"
              >
                <p className="font-mono text-[12px] capitalize text-ink-muted">
                  {formatLomeDateShort(day)}
                </p>
              </div>
            );
          })}

          <div className="relative">
            {hours.map((h) => (
              <div
                key={h}
                className="flex h-16 items-start justify-end border-b border-line/50 pr-2"
              >
                <span className="font-mono text-[11px] text-ink-muted">
                  {h} h
                </span>
              </div>
            ))}
          </div>

          {visibleDays.map(([daySlots, i]) => (
            <div
              key={i}
              className="relative border-l border-line"
              style={{ height: hours.length * HOUR_PX }}
            >
              {hours.map((h) => (
                <div
                  key={h}
                  className="absolute inset-x-0 border-b border-line/40"
                  style={{ top: (h - OPEN_HOUR) * HOUR_PX, height: HOUR_PX }}
                />
              ))}

              {daySlots.map((slot) => {
                const selected = selectedId === slot.id;
                const free = slot.status === "free";
                const blocked = slot.status === "blocked";
                return (
                  <button
                    key={slot.id}
                    type="button"
                    disabled={!free}
                    onClick={() => free && onSelect(slot.id)}
                    aria-pressed={selected}
                    aria-label={`${formatLomeTime(slot.start)} ${slot.status}`}
                    className={cn(
                      "absolute inset-x-1 z-[1] overflow-hidden border px-1 py-0.5 text-left font-mono text-[10px] leading-tight transition-colors duration-150",
                      free &&
                        !selected &&
                        "border-slot-free-strong/50 bg-slot-free text-ink hover:bg-slot-free-strong hover:text-bg",
                      selected && "border-ink bg-slot-selected text-bg",
                      slot.status === "taken" &&
                        "cursor-not-allowed border-transparent bg-slot-taken/80 text-ink-2",
                      blocked &&
                        "cursor-not-allowed border-transparent bg-[repeating-linear-gradient(-45deg,var(--slot-taken),var(--slot-taken)_2px,transparent_2px,transparent_5px)] text-ink-muted",
                    )}
                    style={{
                      top: topForStart(slot.start) + 1,
                      height: heightForDuration(slot.start, slot.end) - 2,
                    }}
                  >
                    <span className="block truncate">
                      {free || selected
                        ? formatLomeTime(slot.start)
                        : slot.label || formatLomeTime(slot.start)}
                    </span>
                    {!free && slot.label ? (
                      <span className="block truncate opacity-80">
                        {slot.label}
                      </span>
                    ) : null}
                  </button>
                );
              })}

              {/* half-hour guides */}
              {hours.map((h) => (
                <div
                  key={`half-${h}`}
                  className="pointer-events-none absolute inset-x-0 border-b border-dashed border-line/30"
                  style={{
                    top: (h - OPEN_HOUR) * HOUR_PX + (SLOT_STEP_MINUTES / 60) * HOUR_PX,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
