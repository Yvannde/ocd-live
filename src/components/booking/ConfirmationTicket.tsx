import Link from "next/link";
import type { DemoPackage } from "@/config/site";
import { brand } from "@/config/site";
import { copy } from "@/config/copy.fr";
import type { CalendarSlot } from "@/lib/availability";
import type { BusinessData } from "./BusinessForm";
import { depositAmount } from "@/lib/pricing";
import {
  formatLomeDateLong,
  formatLomeTime,
  formatLocalTime,
} from "@/lib/time";
import { formatFcfa } from "@/lib/utils";

export function ConfirmationTicket({
  refCode,
  mode,
  pkg,
  slot,
  business,
}: {
  refCode: string;
  mode: "onsite" | "remote";
  pkg: DemoPackage;
  slot: CalendarSlot;
  business: BusinessData;
}) {
  const d = copy.booking.done;
  const wa = brand.whatsapp
    ? `https://wa.me/${brand.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
        `Réservation ${refCode} — ${business.businessName}`,
      )}`
    : null;

  return (
    <div className="mx-auto max-w-[560px]">
      <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[0.95] text-ink">
        {d.title}
      </h2>

      <div className="mt-8 border-2 border-ink p-6">
        <p className="font-mono text-[12px] uppercase tracking-wide text-ink-muted">
          {d.ticket}
        </p>
        <p className="mt-2 font-display text-[32px] leading-none text-ink">
          {refCode}
        </p>
        <dl className="mt-6 space-y-3 text-[14px]">
          <div className="flex justify-between gap-4 border-b border-line pb-2">
            <dt className="text-ink-muted">Business</dt>
            <dd className="text-right font-medium">{business.businessName}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-line pb-2">
            <dt className="text-ink-muted">Mode</dt>
            <dd className="text-right font-medium">
              {mode === "onsite" ? "Live à Lomé" : "Live à distance"}
            </dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-line pb-2">
            <dt className="text-ink-muted">Package</dt>
            <dd className="text-right font-medium">{pkg.name}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-line pb-2">
            <dt className="text-ink-muted">Créneau</dt>
            <dd className="text-right font-medium">
              {formatLomeDateLong(slot.start)}
              <br />
              {formatLocalTime(slot.start)} ({formatLomeTime(slot.start)} à Lomé)
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ink-muted">Acompte payé</dt>
            <dd className="text-right font-medium">
              {formatFcfa(depositAmount(pkg.priceFcfa))}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex h-12 items-center border border-ink px-5 text-[15px] font-medium text-ink transition-colors duration-150 hover:bg-ink hover:text-bg"
        >
          {d.backHome}
        </Link>
        <Link
          href="/v/saveurs-de-tokoin"
          className="inline-flex h-12 items-center border border-line px-5 text-[15px] font-medium text-ink transition-colors duration-150 hover:border-ink"
        >
          {d.vitrine}
        </Link>
        {wa ? (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center bg-mode-a px-5 text-[15px] font-medium text-white"
          >
            {d.whatsapp}
          </a>
        ) : null}
      </div>
    </div>
  );
}
