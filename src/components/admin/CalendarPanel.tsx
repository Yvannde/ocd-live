"use client";

import { useMemo, useState } from "react";
import type { DemoBlock, DemoBooking } from "@/config/demo-admin";
import { copy } from "@/config/copy.fr";
import { formatLomeDateLong, formatLomeTime } from "@/lib/time";
import { DemoToast } from "@/components/admin/DemoToast";

function startOfWeek(d: Date): Date {
  const x = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = x.getUTCDay();
  const diff = day === 0 ? -6 : 1 - day;
  x.setUTCDate(x.getUTCDate() + diff);
  x.setUTCHours(0, 0, 0, 0);
  return x;
}

function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setUTCDate(x.getUTCDate() + n);
  return x;
}

function dayKey(iso: string): string {
  const d = new Date(iso);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
}

const dayNames = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export function CalendarPanel({
  bookings,
  blocks: initialBlocks,
}: {
  bookings: DemoBooking[];
  blocks: DemoBlock[];
}) {
  const [weekStart, setWeekStart] = useState(() =>
    startOfWeek(
      new Date(bookings[0]?.startsAt ?? "2026-11-10T00:00:00.000Z"),
    ),
  );
  const [blocks, setBlocks] = useState(initialBlocks);
  const [label, setLabel] = useState("Blocage");
  const [dayOffset, setDayOffset] = useState(0);
  const [hour, setHour] = useState(10);
  const [toast, setToast] = useState(false);
  const c = copy.admin.calendar;

  const days = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart],
  );

  const byDay = useMemo(() => {
    const map = new Map<
      string,
      { bookings: DemoBooking[]; blocks: DemoBlock[] }
    >();
    for (const d of days) {
      const key = dayKey(d.toISOString());
      map.set(key, { bookings: [], blocks: [] });
    }
    for (const b of bookings) {
      if (b.status === "cancelled" || b.status === "expired") continue;
      const key = dayKey(b.startsAt);
      const bucket = map.get(key);
      if (bucket) bucket.bookings.push(b);
    }
    for (const blk of blocks) {
      const key = dayKey(blk.startsAt);
      const bucket = map.get(key);
      if (bucket) bucket.blocks.push(blk);
    }
    return map;
  }, [bookings, blocks, days]);

  function addBlock() {
    const start = addDays(weekStart, dayOffset);
    start.setUTCHours(hour, 0, 0, 0);
    const end = new Date(start);
    end.setUTCHours(hour + 2, 0, 0, 0);
    setBlocks((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        label: label.trim() || "Blocage",
        startsAt: start.toISOString(),
        endsAt: end.toISOString(),
      },
    ]);
    setToast(true);
  }

  return (
    <div>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="h-9 border border-line px-3 text-[13px] hover:border-ink"
          onClick={() => setWeekStart((w) => addDays(w, -7))}
        >
          ←
        </button>
        <p className="font-mono text-[13px] text-ink">
          Semaine du {formatLomeDateLong(weekStart.toISOString())}
        </p>
        <button
          type="button"
          className="h-9 border border-line px-3 text-[13px] hover:border-ink"
          onClick={() => setWeekStart((w) => addDays(w, 7))}
        >
          →
        </button>
      </div>

      <div className="mt-6 grid gap-2 sm:grid-cols-7">
        {days.map((d, i) => {
          const key = dayKey(d.toISOString());
          const bucket = byDay.get(key) ?? { bookings: [], blocks: [] };
          return (
            <div key={key} className="min-h-[140px] border border-line p-2">
              <p className="font-mono text-[11px] text-ink-muted">
                {dayNames[i]} {d.getUTCDate()}
              </p>
              <ul className="mt-2 space-y-1">
                {bucket.bookings.map((b) => (
                  <li
                    key={b.id}
                    className="border border-line bg-bg-muted/40 px-1.5 py-1 text-[11px] leading-snug"
                  >
                    <span className="font-medium">{formatLomeTime(b.startsAt)}</span>{" "}
                    {b.businessName}
                  </li>
                ))}
                {bucket.blocks.map((blk) => (
                  <li
                    key={blk.id}
                    className="border border-dashed border-ink/40 px-1.5 py-1 text-[11px] text-ink-muted"
                  >
                    {c.blocked}: {blk.label}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="mt-8 border border-line p-4">
        <h2 className="text-[15px] font-semibold text-ink">{c.block}</h2>
        <p className="mt-1 font-mono text-[12px] text-ink-muted">{c.blockHint}</p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-end">
          <label className="flex flex-col gap-1 text-[12px] text-ink-muted">
            Libellé
            <input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="h-10 border border-line bg-bg px-3 text-[14px] text-ink"
            />
          </label>
          <label className="flex flex-col gap-1 text-[12px] text-ink-muted">
            Jour
            <select
              value={dayOffset}
              onChange={(e) => setDayOffset(Number(e.target.value))}
              className="h-10 border border-line bg-bg px-2 text-[14px] text-ink"
            >
              {dayNames.map((n, i) => (
                <option key={n} value={i}>
                  {n}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-[12px] text-ink-muted">
            Heure (Lomé)
            <select
              value={hour}
              onChange={(e) => setHour(Number(e.target.value))}
              className="h-10 border border-line bg-bg px-2 text-[14px] text-ink"
            >
              {Array.from({ length: 12 }, (_, i) => i + 8).map((h) => (
                <option key={h} value={h}>
                  {h}:00
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={addBlock}
            className="h-10 bg-ink px-4 text-[13px] font-medium text-bg"
          >
            {c.addBlock}
          </button>
        </div>
      </div>

      <DemoToast open={toast} onClose={() => setToast(false)} />
    </div>
  );
}
