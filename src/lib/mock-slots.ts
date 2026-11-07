import { addDays, lomeWallTime, startOfWeek } from "./time";

export type OccupiedSlot = {
  id: string;
  start: string; // ISO UTC
  end: string;
  kind: "booking" | "block";
  label?: string;
};

/** Anchor mock data around current week (Lomé = UTC). */
function baseMonday(): Date {
  const now = new Date();
  const utc = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
  return startOfWeek(utc);
}

function slot(
  dayOffset: number,
  hour: number,
  minute: number,
  durationMin: number,
  kind: "booking" | "block",
  label?: string,
): OccupiedSlot {
  const monday = baseMonday();
  const day = addDays(monday, dayOffset);
  const start = lomeWallTime(
    day.getUTCFullYear(),
    day.getUTCMonth(),
    day.getUTCDate(),
    hour,
    minute,
  );
  const end = new Date(start.getTime() + durationMin * 60_000);
  return {
    id: `${kind}-${dayOffset}-${hour}${minute}`,
    start: start.toISOString(),
    end: end.toISOString(),
    kind,
    label,
  };
}

/** Occupied / blocked slots for ~3 weeks of demo calendar. */
export const mockOccupiedSlots: OccupiedSlot[] = [
  slot(0, 10, 0, 90, "booking", "Saveurs de Tokoin"),
  slot(1, 15, 0, 90, "booking", "Atelier Wax"),
  slot(2, 9, 0, 240, "booking", "Karité Nord"),
  slot(3, 14, 0, 90, "block", "Régie / setup"),
  slot(4, 11, 0, 90, "booking", "Tech Lomé"),
  slot(7, 10, 0, 90, "booking", "Mode Accra"),
  slot(8, 16, 0, 90, "booking", "Beauté remote"),
  slot(9, 9, 30, 90, "block", "Congé studio"),
  slot(10, 13, 0, 240, "booking", "VIP session"),
  slot(11, 10, 0, 90, "booking", "Alimentation"),
  slot(14, 11, 0, 90, "booking", "Services"),
  slot(15, 15, 30, 90, "booking", "Duo live"),
];
