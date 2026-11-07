import { mockOccupiedSlots, type OccupiedSlot } from "./mock-slots";
import {
  BUFFER_MINUTES,
  CLOSE_HOUR,
  OPEN_HOUR,
  SLOT_STEP_MINUTES,
  addDays,
  addMinutes,
  lomeWallTime,
  sameUtcDay,
} from "./time";

export type SlotStatus = "free" | "taken" | "blocked";

export type CalendarSlot = {
  id: string;
  start: string;
  end: string;
  status: SlotStatus;
  label?: string;
};

export type HourRange = "all" | "morning" | "afternoon" | "evening";

function overlaps(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date): boolean {
  return aStart < bEnd && bStart < aEnd;
}

function withBuffer(end: Date): Date {
  return addMinutes(end, BUFFER_MINUTES);
}

/**
 * Generate candidate starts for one UTC calendar day in Lomé,
 * then mark free/taken based on occupied slots + duration + buffer.
 */
export function getDaySlots(
  day: Date,
  durationMinutes: number,
  occupied: OccupiedSlot[] = mockOccupiedSlots,
): CalendarSlot[] {
  const y = day.getUTCFullYear();
  const m = day.getUTCMonth();
  const d = day.getUTCDate();
  const slots: CalendarSlot[] = [];

  for (let hour = OPEN_HOUR; hour < CLOSE_HOUR; hour++) {
    for (let minute = 0; minute < 60; minute += SLOT_STEP_MINUTES) {
      const start = lomeWallTime(y, m, d, hour, minute);
      const end = addMinutes(start, durationMinutes);
      const close = lomeWallTime(y, m, d, CLOSE_HOUR, 0);
      if (end > close) continue;

      const blockedBy = occupied.find((o) => {
        const oStart = new Date(o.start);
        const oEnd = withBuffer(new Date(o.end));
        return overlaps(start, end, oStart, oEnd);
      });

      let status: SlotStatus = "free";
      if (blockedBy?.kind === "block") status = "blocked";
      else if (blockedBy) status = "taken";

      slots.push({
        id: start.toISOString(),
        start: start.toISOString(),
        end: end.toISOString(),
        status,
        label: blockedBy?.label,
      });
    }
  }

  return slots;
}

export function getWeekSlots(
  weekStart: Date,
  durationMinutes: number,
  occupied: OccupiedSlot[] = mockOccupiedSlots,
): CalendarSlot[][] {
  return Array.from({ length: 7 }, (_, i) =>
    getDaySlots(addDays(weekStart, i), durationMinutes, occupied),
  );
}

export function filterByHourRange(
  slots: CalendarSlot[],
  range: HourRange,
): CalendarSlot[] {
  if (range === "all") return slots;
  return slots.filter((s) => {
    const h = new Date(s.start).getUTCHours();
    if (range === "morning") return h >= 9 && h < 12;
    if (range === "afternoon") return h >= 12 && h < 17;
    return h >= 17;
  });
}

export function hourRows(): number[] {
  const rows: number[] = [];
  for (let h = OPEN_HOUR; h < CLOSE_HOUR; h++) rows.push(h);
  return rows;
}

export function slotsForHour(slots: CalendarSlot[], hour: number): CalendarSlot[] {
  return slots.filter((s) => new Date(s.start).getUTCHours() === hour);
}

export function findSlot(
  weekStart: Date,
  durationMinutes: number,
  slotId: string,
): CalendarSlot | undefined {
  for (let i = 0; i < 7; i++) {
    const day = getDaySlots(addDays(weekStart, i), durationMinutes);
    const found = day.find((s) => s.id === slotId);
    if (found) return found;
  }
  return undefined;
}

export function occupiedOnDay(day: Date): OccupiedSlot[] {
  return mockOccupiedSlots.filter((o) =>
    sameUtcDay(new Date(o.start), day),
  );
}
