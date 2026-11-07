"use client";

import Link from "next/link";
import { useState } from "react";
import { IconCheck } from "@/components/icons";
import { packages } from "@/config/site";
import { copy } from "@/config/copy.fr";
import { formatEurHint, formatFcfa } from "@/lib/utils";

export function PackagesGrid() {
  const [showAll, setShowAll] = useState(false);
  const active = [...packages]
    .filter((p) => p.active)
    .sort((a, b) => a.order - b.order);
  const visible = showAll ? active : active.slice(0, 3);

  return (
    <section id="packages" className="section-y border-b border-line bg-bg">
      <div className="container-page">
        <h2 className="font-display text-h2 whitespace-pre-line text-ink">
          {copy.packages.title}
        </h2>

        <div className="mt-10 hidden gap-4 md:grid md:grid-cols-3">
          {visible.map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </div>

        <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:hidden">
          {active.map((pkg) => (
            <div key={pkg.slug} className="w-[300px] shrink-0 snap-start">
              <PackageCard pkg={pkg} />
            </div>
          ))}
        </div>

        {!showAll && active.length > 3 ? (
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="mt-8 hidden h-12 items-center border border-ink px-6 text-[15px] font-medium transition-colors duration-150 hover:bg-ink hover:text-bg md:inline-flex"
          >
            {copy.packages.seeAll}
          </button>
        ) : null}
      </div>
    </section>
  );
}

function PackageCard({
  pkg,
}: {
  pkg: (typeof packages)[number];
}) {
  const featured = pkg.featured;

  return (
    <article
      className={`flex h-full flex-col border p-6 ${
        featured
          ? "border-2 border-ink bg-dark-bg text-dark-text"
          : "border-line bg-bg text-ink"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[20px] font-semibold">{pkg.name}</h3>
          <p
            className={`mt-1 text-[15px] ${
              featured ? "text-dark-muted" : "text-ink-muted"
            }`}
          >
            {pkg.tagline}
          </p>
        </div>
        {featured ? (
          <span className="shrink-0 border border-dark-text px-2 py-1 font-mono text-[11px] uppercase">
            {copy.packages.featured}
          </span>
        ) : null}
      </div>

      <p className="mt-6">
        <span className="font-display text-[40px] leading-none">
          {formatFcfa(pkg.priceFcfa).replace(/\u00a0FCFA$/, "")}
        </span>
        <span
          className={`ml-2 text-[16px] ${
            featured ? "text-dark-body" : "text-ink-2"
          }`}
        >
          FCFA
        </span>
      </p>
      <p
        className={`mt-1 font-mono text-[13px] ${
          featured ? "text-dark-dim" : "text-ink-muted"
        }`}
      >
        {formatEurHint(pkg.priceFcfa)} · {Math.floor(pkg.durationMinutes / 60)} h
        {pkg.durationMinutes % 60
          ? `\u00a0${String(pkg.durationMinutes % 60).padStart(2, "0")}`
          : ""}
        {pkg.sessions > 1 ? ` · ${pkg.sessions} sessions` : ""}
      </p>

      <ul className="mt-6 flex flex-1 flex-col gap-3">
        {pkg.features.map((f) => (
          <li key={f} className="flex gap-2 text-[14px]">
            <IconCheck
              size={16}
              className={`mt-0.5 shrink-0 ${
                featured ? "text-dark-mode-a" : "text-mode-a"
              }`}
            />
            <span className={featured ? "text-dark-body" : "text-ink-2"}>{f}</span>
          </li>
        ))}
      </ul>

      <Link
        href={`/reserver?package=${pkg.slug}`}
        className={`mt-8 inline-flex h-12 items-center justify-center text-[15px] font-medium transition-opacity duration-150 hover:opacity-90 ${
          featured ? "bg-bg text-ink" : "bg-ink text-bg"
        }`}
      >
        {copy.packages.cta}
      </Link>
    </article>
  );
}
