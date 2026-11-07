"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { brand } from "@/config/site";
import { copy } from "@/config/copy.fr";
import { programmeItems } from "@/config/programme";
import { getPublicVitrine } from "@/config/vitrines";
import { formatLomeDateLong, formatLomeTime } from "@/lib/time";
import { cn } from "@/lib/utils";

type ProgrammeItemCategory = (typeof programmeItems)[number]["category"];
type ModeFilter = "all" | "onsite" | "remote";

export function ProgrammeView() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<ModeFilter>("all");
  const [category, setCategory] = useState<"all" | ProgrammeItemCategory>("all");
  const [date, setDate] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const p = copy.programmePage;

  const categories = Array.from(
    new Set(programmeItems.map((i) => i.category)),
  ) as ProgrammeItemCategory[];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return programmeItems
      .filter((item) => {
        if (!q) return true;
        const hay =
          `${item.businessName} ${item.city} ${item.description} ${item.offer ?? ""}`.toLowerCase();
        return hay.includes(q);
      })
      .filter((item) => (mode === "all" ? true : item.mode === mode))
      .filter((item) => (category === "all" ? true : item.category === category))
      .filter((item) => {
        if (!date) return true;
        const d = new Date(item.startsAt);
        const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
        return key === date;
      })
      .sort(
        (a, b) =>
          new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
      );
  }, [query, mode, category, date]);

  const hasFilters = Boolean(query || mode !== "all" || category !== "all" || date);

  return (
    <div className="container-page section-y">
      <h1 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[0.92] text-ink">
        {p.title}
      </h1>
      <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-ink-muted md:text-[17px]">
        {p.lead}
      </p>

      {/* Une seule ligne de filtres — consultation, pas réservation */}
      <div className="sticky top-16 z-20 mt-8 flex flex-wrap items-center gap-1.5 border border-line bg-bg/95 p-1.5 backdrop-blur-xl">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={p.filters.searchPlaceholder}
          aria-label={p.filters.search}
          className="h-9 min-w-[10rem] flex-1 border-0 bg-transparent px-2.5 text-[13px] text-ink placeholder:text-ink-muted/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          aria-label={p.filters.date}
          className="h-9 w-[9.5rem] border border-line bg-bg px-2 text-[12px] text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent"
        />
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as ModeFilter)}
          aria-label={p.filters.mode}
          className="h-9 border border-line bg-bg px-2 text-[12px] text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent"
        >
          <option value="all">{p.filters.allModes}</option>
          <option value="onsite">Lomé</option>
          <option value="remote">Distance</option>
        </select>
        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value as "all" | ProgrammeItemCategory)
          }
          aria-label={p.filters.category}
          className="h-9 border border-line bg-bg px-2 text-[12px] text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent"
        >
          <option value="all">{p.filters.allCategories}</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {copy.booking.business.categories[c]}
            </option>
          ))}
        </select>
        {hasFilters ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setMode("all");
              setCategory("all");
              setDate("");
            }}
            className="h-9 shrink-0 px-2 font-mono text-[11px] text-ink-muted underline underline-offset-4 hover:text-ink"
          >
            {p.filters.reset}
          </button>
        ) : null}
        <p className="ml-auto shrink-0 px-2 font-mono text-[11px] text-ink-muted">
          {filtered.length} live{filtered.length > 1 ? "s" : ""}
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-[15px] text-ink-muted">{p.empty}</p>
      ) : (
        <ul className="mt-8 divide-y divide-line border border-line">
          {filtered.map((item) => {
            const open = openId === item.id;
            const vitrine = getPublicVitrine(item.slug);
            const remindHref = brand.whatsapp
              ? `https://wa.me/${brand.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
                  `Rappelle-moi pour le live de ${item.businessName} (${formatLomeDateLong(item.startsAt)})`,
                )}`
              : null;

            return (
              <li key={item.id} className="bg-bg">
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : item.id)}
                  aria-expanded={open}
                  className="flex w-full flex-col gap-1 px-4 py-4 text-left transition-colors duration-150 hover:bg-bg-muted/40 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-5"
                >
                  <div className="min-w-0">
                    <p className="font-mono text-[12px] text-ink-muted">
                      {formatLomeDateLong(item.startsAt)} ·{" "}
                      {formatLomeTime(item.startsAt)} à Lomé
                    </p>
                    <h2 className="mt-1 text-[18px] font-semibold text-ink sm:text-[20px]">
                      {item.businessName}
                    </h2>
                    <p className="mt-0.5 text-[13px] text-ink-muted">
                      {copy.booking.business.categories[item.category]} ·{" "}
                      {item.mode === "onsite" ? "Studio Lomé" : "À distance"} ·{" "}
                      {item.city}
                    </p>
                  </div>
                  <span className="mt-2 shrink-0 font-mono text-[12px] text-ink underline underline-offset-4 sm:mt-0">
                    {open ? p.hideDetail : p.seeDetail}
                  </span>
                </button>

                <div
                  className={cn(
                    "overflow-hidden border-t border-line/60 bg-bg-muted/30 transition-[max-height,opacity] duration-200",
                    open ? "max-h-[320px] opacity-100" : "max-h-0 opacity-0 border-t-0",
                  )}
                >
                  <div className="space-y-3 px-4 py-4 sm:px-5">
                    <p className="max-w-[56ch] text-[15px] leading-relaxed text-ink-2">
                      {item.description}
                    </p>
                    {item.offer ? (
                      <p className="font-mono text-[13px] text-mode-a">
                        Offre : {item.offer}
                      </p>
                    ) : null}
                    <div className="flex flex-wrap gap-3 pt-1">
                      <Link
                        href={`/programme/${item.slug}`}
                        className="inline-flex h-10 items-center border border-ink px-4 text-[13px] font-medium text-ink transition-colors duration-150 hover:bg-ink hover:text-bg"
                      >
                        {p.fullDetail}
                      </Link>
                      {vitrine ? (
                        <Link
                          href={`/v/${vitrine.slug}`}
                          className="inline-flex h-10 items-center border border-line px-4 text-[13px] font-medium text-ink-2 transition-colors duration-150 hover:border-ink hover:text-ink"
                        >
                          {p.seeVitrine}
                        </Link>
                      ) : null}
                      {remindHref ? (
                        <a
                          href={remindHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-10 items-center border border-line px-4 text-[13px] font-medium text-ink-2 transition-colors duration-150 hover:border-ink hover:text-ink"
                        >
                          {p.remind}
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <p className="mt-10 max-w-[48ch] text-[14px] text-ink-muted">
        {p.vendorCta}{" "}
        <Link href="/reserver" className="text-ink underline underline-offset-4">
          {p.vendorLink}
        </Link>
      </p>
    </div>
  );
}
