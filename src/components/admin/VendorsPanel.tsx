"use client";

import Link from "next/link";
import { useState } from "react";
import type { DemoVendor } from "@/config/demo-admin";
import { copy } from "@/config/copy.fr";
import { formatLomeDateLong } from "@/lib/time";
import { DemoToast } from "@/components/admin/DemoToast";

export function VendorsPanel({ initial }: { initial: DemoVendor[] }) {
  const [rows, setRows] = useState(initial);
  const [toast, setToast] = useState(false);
  const v = copy.admin.vendors;

  function toggle(id: string) {
    setRows((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, vitrinePublic: !row.vitrinePublic } : row,
      ),
    );
    setToast(true);
  }

  if (rows.length === 0) {
    return <p className="mt-8 text-[14px] text-ink-muted">{copy.admin.empty}</p>;
  }

  return (
    <div className="mt-6">
      <ul className="divide-y divide-line border border-line">
        {rows.map((vendor) => (
          <li
            key={vendor.id}
            className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium text-ink">{vendor.businessName}</p>
              <p className="mt-0.5 text-[13px] text-ink-muted">
                {vendor.contactName} · {vendor.city}
              </p>
              <p className="mt-1 font-mono text-[11px] text-ink-muted">
                {vendor.vitrinePublic ? v.vitrineOn : v.vitrineOff}
                {vendor.lastLiveAt
                  ? ` · ${formatLomeDateLong(vendor.lastLiveAt)}`
                  : ""}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => toggle(vendor.id)}
                className="h-10 border border-line px-3 text-[13px] hover:border-ink"
              >
                {v.toggle}
              </button>
              {vendor.vitrinePublic ? (
                <Link
                  href={`/v/${vendor.slug}`}
                  className="inline-flex h-10 items-center border border-ink px-3 text-[13px] hover:bg-ink hover:text-bg"
                >
                  {v.openVitrine}
                </Link>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
      <DemoToast open={toast} onClose={() => setToast(false)} />
    </div>
  );
}
