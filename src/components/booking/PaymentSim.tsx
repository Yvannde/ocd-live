"use client";

import type { DemoPackage } from "@/config/site";
import { copy } from "@/config/copy.fr";
import { DEPOSIT_PERCENT, depositAmount, remainingAmount } from "@/lib/pricing";
import { formatFcfa } from "@/lib/utils";

export function PaymentSim({
  pkg,
  onPay,
  onBack,
}: {
  pkg: DemoPackage;
  onPay: () => void;
  onBack: () => void;
}) {
  const p = copy.booking.payment;
  const deposit = depositAmount(pkg.priceFcfa);
  const remaining = remainingAmount(pkg.priceFcfa);

  return (
    <div className="mx-auto max-w-[560px]">
      <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[0.95] text-ink">
        {p.title}
      </h2>
      <p className="mt-4 text-[15px] text-ink-muted">{p.hint}</p>

      <div className="mt-8 border border-line p-6">
        <div className="flex justify-between text-[15px]">
          <span className="text-ink-muted">Total</span>
          <span className="font-medium text-ink">{formatFcfa(pkg.priceFcfa)}</span>
        </div>
        <div className="mt-3 flex justify-between text-[15px]">
          <span className="text-ink-muted">
            Acompte ({DEPOSIT_PERCENT}&nbsp;%)
          </span>
          <span className="font-medium text-ink">{formatFcfa(deposit)}</span>
        </div>
        <div className="mt-3 flex justify-between border-t border-line pt-3 text-[15px]">
          <span className="text-ink-muted">{p.remaining}</span>
          <span className="font-medium text-ink">{formatFcfa(remaining)}</span>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-12 items-center border border-ink px-5 text-[15px] font-medium text-ink transition-colors duration-150 hover:bg-ink hover:text-bg"
        >
          Retour
        </button>
        <button
          type="button"
          onClick={onPay}
          className="inline-flex h-12 items-center bg-mode-a px-5 text-[15px] font-medium text-white transition-opacity duration-150 hover:opacity-90"
        >
          {p.pay}
        </button>
      </div>
    </div>
  );
}
