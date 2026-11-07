"use client";

import type { DemoPackage } from "@/config/site";
import { copy } from "@/config/copy.fr";
import type { CalendarSlot } from "@/lib/availability";
import { DEPOSIT_PERCENT, depositAmount } from "@/lib/pricing";
import {
  formatLomeDateLong,
  formatLomeTime,
  formatLocalTime,
} from "@/lib/time";
import { formatEurHint, formatFcfa } from "@/lib/utils";

export function BookingSummary({
  mode,
  pkg,
  slot,
  onContinue,
  sticky = true,
}: {
  mode: "onsite" | "remote";
  pkg: DemoPackage;
  slot: CalendarSlot | null;
  onContinue: () => void;
  sticky?: boolean;
}) {
  const s = copy.booking.summary;
  const deposit = depositAmount(pkg.priceFcfa);

  return (
    <aside
      className={`border border-line bg-bg p-5 ${
        sticky ? "md:sticky md:top-36" : ""
      }`}
    >
      <h2 className="font-display text-[22px] leading-none text-ink">
        {s.title}
      </h2>

      <dl className="mt-5 space-y-3 text-[14px]">
        <Row label={s.mode}>
          {mode === "onsite" ? "Live à Lomé" : "Live à distance"}
        </Row>
        <Row label={s.package}>
          {pkg.name} · {formatFcfa(pkg.priceFcfa)}
        </Row>
        <Row label={s.slot}>
          {slot ? (
            <span>
              {formatLomeDateLong(slot.start)}
              <br />
              {formatLocalTime(slot.start)}{" "}
              <span className="text-ink-muted">
                ({formatLomeTime(slot.start)} {s.lomeHint})
              </span>
            </span>
          ) : (
            <span className="text-ink-muted">{s.pickSlot}</span>
          )}
        </Row>
        <Row label={s.total}>
          {formatFcfa(pkg.priceFcfa)}
          <span className="ml-2 font-mono text-[12px] text-ink-muted">
            {formatEurHint(pkg.priceFcfa)}
          </span>
        </Row>
        <Row label={`${s.deposit}`}>
          {formatFcfa(deposit)}
          <span className="ml-2 font-mono text-[12px] text-ink-muted">
            {DEPOSIT_PERCENT}&nbsp;%
          </span>
        </Row>
      </dl>

      <button
        type="button"
        disabled={!slot}
        onClick={onContinue}
        className="mt-6 inline-flex h-12 w-full items-center justify-center bg-ink text-[15px] font-medium text-bg transition-opacity duration-150 enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {s.continue}
      </button>
    </aside>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-line/60 pb-3">
      <dt className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">
        {label}
      </dt>
      <dd className="mt-1 text-ink">{children}</dd>
    </div>
  );
}
