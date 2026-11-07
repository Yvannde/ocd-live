/** Studio timezone (Lomé, Togo = GMT+0, no DST). */
export const LOME_TZ = "Africa/Lome";

export const OPEN_HOUR = 9;
export const CLOSE_HOUR = 20;
export const SLOT_STEP_MINUTES = 30;
export const BUFFER_MINUTES = 15;

/** Start of ISO week (Monday 00:00 UTC) for a given Date. */
export function startOfWeek(date: Date): Date {
  const d = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
  const day = d.getUTCDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setUTCDate(d.getUTCDate() + diff);
  return d;
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

export function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60_000);
}

/** Build a Date for a Lomé wall-clock time (treated as UTC since Lomé = GMT). */
export function lomeWallTime(year: number, monthIndex: number, day: number, hour: number, minute = 0): Date {
  return new Date(Date.UTC(year, monthIndex, day, hour, minute, 0, 0));
}

export function formatLomeTime(iso: string | Date): string {
  const d = typeof iso === "string" ? new Date(iso) : iso;
  const h = d.getUTCHours();
  const m = d.getUTCMinutes();
  return `${h} h ${String(m).padStart(2, "0")}`;
}

export function formatLomeDateShort(iso: string | Date): string {
  const d = typeof iso === "string" ? new Date(iso) : iso;
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone: "UTC",
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(d);
}

export function formatLomeDateLong(iso: string | Date): string {
  const d = typeof iso === "string" ? new Date(iso) : iso;
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(d);
}

/** Client-local display of a Lomé UTC instant. */
export function formatLocalTime(iso: string | Date, timeZone?: string): string {
  const d = typeof iso === "string" ? new Date(iso) : iso;
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone: timeZone || undefined,
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  })
    .format(d)
    .replace(":", " h ");
}

export function weekLabel(weekStart: Date): string {
  const end = addDays(weekStart, 6);
  const a = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "UTC",
    day: "numeric",
    month: "short",
  }).format(weekStart);
  const b = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "UTC",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(end);
  return `${a} – ${b}`;
}

export function sameUtcDay(a: Date, b: Date): boolean {
  return (
    a.getUTCFullYear() === b.getUTCFullYear() &&
    a.getUTCMonth() === b.getUTCMonth() &&
    a.getUTCDate() === b.getUTCDate()
  );
}
