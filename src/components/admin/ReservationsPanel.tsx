"use client";

import { useMemo, useState } from "react";
import type { BookingStatus, DemoBooking } from "@/config/demo-admin";
import { copy } from "@/config/copy.fr";
import { formatLomeDateLong, formatLomeTime } from "@/lib/time";
import { formatFcfa, cn } from "@/lib/utils";
import { DemoToast } from "@/components/admin/DemoToast";

const statuses: BookingStatus[] = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
  "expired",
  "no_show",
];

export function ReservationsPanel({ initial }: { initial: DemoBooking[] }) {
  const [rows, setRows] = useState(initial);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | BookingStatus>("all");
  const [mode, setMode] = useState<"all" | "onsite" | "remote">("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [toast, setToast] = useState(false);
  const r = copy.admin.reservations;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((b) => {
      if (status !== "all" && b.status !== status) return false;
      if (mode !== "all" && b.mode !== mode) return false;
      if (!q) return true;
      return (
        b.businessName.toLowerCase().includes(q) ||
        b.contactName.toLowerCase().includes(q) ||
        b.phone.includes(q) ||
        b.ref.toLowerCase().includes(q)
      );
    });
  }, [rows, query, status, mode]);

  function simulate(id: string, next: BookingStatus) {
    setRows((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: next } : b)),
    );
    setToast(true);
  }

  const open = rows.find((b) => b.id === openId) ?? null;

  return (
    <div>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={r.search}
          aria-label={r.search}
          className="h-10 min-w-0 flex-1 border border-line bg-bg px-3 text-[14px] text-ink"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as "all" | BookingStatus)}
          className="h-10 border border-line bg-bg px-2 text-[13px]"
          aria-label={r.allStatuses}
        >
          <option value="all">{r.allStatuses}</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {copy.admin.statuses[s]}
            </option>
          ))}
        </select>
        <select
          value={mode}
          onChange={(e) =>
            setMode(e.target.value as "all" | "onsite" | "remote")
          }
          className="h-10 border border-line bg-bg px-2 text-[13px]"
          aria-label={r.allModes}
        >
          <option value="all">{r.allModes}</option>
          <option value="onsite">Lomé</option>
          <option value="remote">Distance</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 text-[14px] text-ink-muted">{copy.admin.empty}</p>
      ) : (
        <>
          {/* Desktop table */}
          <div className="mt-6 hidden overflow-x-auto border border-line md:block">
            <table className="w-full min-w-[720px] text-left text-[13px]">
              <thead className="border-b border-line bg-bg-muted/40 font-mono text-[11px] uppercase tracking-wide text-ink-muted">
                <tr>
                  <th className="px-3 py-2 font-normal">Réf.</th>
                  <th className="px-3 py-2 font-normal">Business</th>
                  <th className="px-3 py-2 font-normal">Créneau</th>
                  <th className="px-3 py-2 font-normal">Mode</th>
                  <th className="px-3 py-2 font-normal">Statut</th>
                  <th className="px-3 py-2 font-normal"> </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filtered.map((b) => (
                  <tr key={b.id}>
                    <td className="px-3 py-3 font-mono text-[12px]">{b.ref}</td>
                    <td className="px-3 py-3 font-medium">{b.businessName}</td>
                    <td className="px-3 py-3 text-ink-muted">
                      {formatLomeDateLong(b.startsAt)}
                      <br />
                      {formatLomeTime(b.startsAt)}
                    </td>
                    <td className="px-3 py-3">
                      {b.mode === "onsite" ? "Lomé" : "Distance"}
                    </td>
                    <td className="px-3 py-3">
                      {copy.admin.statuses[b.status]}
                    </td>
                    <td className="px-3 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => setOpenId(b.id)}
                        className="underline underline-offset-4"
                      >
                        {r.detail}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <ul className="mt-6 space-y-3 md:hidden">
            {filtered.map((b) => (
              <li key={b.id} className="border border-line p-4">
                <p className="font-mono text-[11px] text-ink-muted">{b.ref}</p>
                <p className="mt-1 font-medium text-ink">{b.businessName}</p>
                <p className="mt-1 text-[13px] text-ink-muted">
                  {formatLomeDateLong(b.startsAt)} · {formatLomeTime(b.startsAt)}
                </p>
                <p className="mt-1 text-[13px]">
                  {b.mode === "onsite" ? "Lomé" : "Distance"} ·{" "}
                  {copy.admin.statuses[b.status]}
                </p>
                <button
                  type="button"
                  onClick={() => setOpenId(b.id)}
                  className="mt-3 text-[13px] underline underline-offset-4"
                >
                  {r.detail}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {open ? (
        <div
          className="fixed inset-0 z-40 flex items-end justify-center bg-ink/40 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-detail-title"
        >
          <div className="max-h-[90vh] w-full max-w-[480px] overflow-y-auto border border-line bg-bg p-6">
            <h2
              id="booking-detail-title"
              className="text-[18px] font-semibold text-ink"
            >
              {open.businessName}
            </h2>
            <dl className="mt-4 space-y-2 text-[14px]">
              <div className="flex justify-between gap-4">
                <dt className="text-ink-muted">Réf.</dt>
                <dd className="font-mono">{open.ref}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-muted">Contact</dt>
                <dd>
                  {open.contactName} · {open.phone}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-muted">Package</dt>
                <dd>
                  {open.packageName} · {formatFcfa(open.priceFcfa)}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-muted">Statut</dt>
                <dd>{copy.admin.statuses[open.status]}</dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-2">
              <button
                type="button"
                className={cn(
                  "h-10 border border-ink px-3 text-[13px]",
                  "hover:bg-ink hover:text-bg",
                )}
                onClick={() => simulate(open.id, "confirmed")}
              >
                {r.confirm}
              </button>
              <button
                type="button"
                className="h-10 border border-line px-3 text-[13px] hover:border-ink"
                onClick={() => simulate(open.id, "cancelled")}
              >
                {r.cancel}
              </button>
              <button
                type="button"
                className="h-10 border border-line px-3 text-[13px] hover:border-ink"
                onClick={() => simulate(open.id, "no_show")}
              >
                {r.noShow}
              </button>
              <a
                href={`https://wa.me/${open.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center border border-line px-3 text-[13px] hover:border-ink"
                onClick={() => setToast(true)}
              >
                {r.whatsapp}
              </a>
            </div>
            <button
              type="button"
              onClick={() => setOpenId(null)}
              className="mt-6 font-mono text-[12px] text-ink-muted underline underline-offset-4"
            >
              {r.close}
            </button>
          </div>
        </div>
      ) : null}

      <DemoToast open={toast} onClose={() => setToast(false)} />
    </div>
  );
}
