"use client";

import { useState } from "react";
import type { DemoPackage } from "@/config/site";
import { copy } from "@/config/copy.fr";
import { formatFcfa, formatEurHint } from "@/lib/utils";
import { DemoToast } from "@/components/admin/DemoToast";

export function PackagesPanel({ initial }: { initial: DemoPackage[] }) {
  const [rows, setRows] = useState(
    () => [...initial].sort((a, b) => a.order - b.order),
  );
  const [toast, setToast] = useState(false);
  const p = copy.admin.packages;

  function update(slug: string, patch: Partial<DemoPackage>) {
    setRows((prev) =>
      prev.map((row) => (row.slug === slug ? { ...row, ...patch } : row)),
    );
  }

  return (
    <div className="mt-6 space-y-3">
      {rows.map((pkg) => (
        <article key={pkg.slug} className="border border-line p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-[17px] font-semibold text-ink">{pkg.name}</h2>
              <p className="mt-1 text-[14px] text-ink-muted">{pkg.tagline}</p>
              <p className="mt-2 font-mono text-[12px] text-ink-muted">
                {formatFcfa(pkg.priceFcfa)} · {formatEurHint(pkg.priceFcfa)}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="border border-line px-2 py-1 font-mono text-[11px]">
                {pkg.active ? p.active : p.inactive}
              </span>
              {pkg.featured ? (
                <span className="border border-ink px-2 py-1 font-mono text-[11px]">
                  {p.featured}
                </span>
              ) : null}
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
            <label className="flex flex-col gap-1 text-[12px] text-ink-muted">
              {p.price}
              <input
                type="number"
                min={0}
                step={1000}
                value={pkg.priceFcfa}
                onChange={(e) =>
                  update(pkg.slug, {
                    priceFcfa: Math.max(0, Number(e.target.value) || 0),
                  })
                }
                className="h-10 w-full border border-line bg-bg px-3 text-[14px] text-ink sm:w-[160px]"
              />
            </label>
            <label className="flex h-10 items-center gap-2 text-[13px] text-ink">
              <input
                type="checkbox"
                checked={pkg.active}
                onChange={(e) => update(pkg.slug, { active: e.target.checked })}
              />
              {p.active}
            </label>
            <label className="flex h-10 items-center gap-2 text-[13px] text-ink">
              <input
                type="checkbox"
                checked={pkg.featured}
                onChange={(e) =>
                  update(pkg.slug, { featured: e.target.checked })
                }
              />
              {p.featured}
            </label>
            <button
              type="button"
              onClick={() => setToast(true)}
              className="h-10 bg-ink px-4 text-[13px] font-medium text-bg sm:ml-auto"
            >
              {p.save}
            </button>
          </div>
        </article>
      ))}
      <DemoToast open={toast} onClose={() => setToast(false)} />
    </div>
  );
}
