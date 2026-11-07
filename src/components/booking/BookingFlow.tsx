"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { packages as allPackages } from "@/config/site";
import { copy } from "@/config/copy.fr";
import {
  filterByHourRange,
  getWeekSlots,
  type CalendarSlot,
  type HourRange,
} from "@/lib/availability";
import { addDays, startOfWeek } from "@/lib/time";
import { cn, formatFcfa } from "@/lib/utils";
import { BookingFilters } from "./BookingFilters";
import { BookingHeader } from "./BookingHeader";
import { BookingSummary } from "./BookingSummary";
import { BusinessForm, type BusinessData } from "./BusinessForm";
import { ConfirmationTicket } from "./ConfirmationTicket";
import { PaymentSim } from "./PaymentSim";
import type { BookingStep } from "./StepIndicator";
import { WeekCalendar } from "./WeekCalendar";

const STORAGE_KEY = "ocd-booking-draft";

type Draft = {
  mode: "onsite" | "remote";
  packageSlug: string;
  slotId: string | null;
  business?: BusinessData;
  refCode?: string;
};

function parseStep(raw: string | null): BookingStep {
  const allowed: BookingStep[] = [
    "mode",
    "package",
    "date",
    "business",
    "payment",
    "done",
  ];
  if (raw && allowed.includes(raw as BookingStep)) return raw as BookingStep;
  return "mode";
}

export function BookingFlow() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const modeParam = searchParams.get("mode");
  const packageParam = searchParams.get("package");
  const rawStep = searchParams.get("step");
  // From landing CTAs (?mode=…) jump to package if step omitted
  const step = parseStep(
    rawStep ?? (modeParam === "onsite" || modeParam === "remote" ? "package" : "mode"),
  );

  const activePackages = useMemo(
    () =>
      [...allPackages]
        .filter((p) => p.active)
        .sort((a, b) => a.order - b.order),
    [],
  );

  const [mode, setMode] = useState<"onsite" | "remote">(
    modeParam === "remote" ? "remote" : "onsite",
  );
  const [packageSlug, setPackageSlug] = useState(
    packageParam || activePackages[0]?.slug || "flash",
  );
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()));
  const [hourRange, setHourRange] = useState<HourRange>("all");
  const [freeOnly, setFreeOnly] = useState(false);
  const [mobileDayIndex, setMobileDayIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [business, setBusiness] = useState<BusinessData | undefined>();
  const [refCode, setRefCode] = useState<string | undefined>();

  const pkg =
    activePackages.find((p) => p.slug === packageSlug) || activePackages[0];

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const draft = JSON.parse(raw) as Draft;
        if (draft.mode) setMode(draft.mode);
        if (draft.packageSlug) setPackageSlug(draft.packageSlug);
        if (draft.slotId) setSelectedId(draft.slotId);
        if (draft.business) setBusiness(draft.business);
        if (draft.refCode) setRefCode(draft.refCode);
      } catch {
        /* ignore */
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const draft: Draft = {
      mode,
      packageSlug,
      slotId: selectedId,
      business,
      refCode,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  }, [mode, packageSlug, selectedId, business, refCode]);

  const setStep = useCallback(
    (next: BookingStep, extra?: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("step", next);
      params.set("mode", mode);
      params.set("package", packageSlug);
      if (extra) {
        Object.entries(extra).forEach(([k, v]) => {
          if (v === null) params.delete(k);
          else params.set(k, v);
        });
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams, mode, packageSlug],
  );

  const weekDays = useMemo(() => {
    const days = getWeekSlots(weekStart, pkg.durationMinutes);
    return days.map((day) => {
      let slots = filterByHourRange(day, hourRange);
      if (freeOnly) slots = slots.filter((s) => s.status === "free");
      return slots;
    });
  }, [weekStart, pkg.durationMinutes, hourRange, freeOnly]);

  const selectedSlot: CalendarSlot | null = useMemo(() => {
    if (!selectedId) return null;
    for (const day of weekDays) {
      const found = day.find((s) => s.id === selectedId && s.status === "free");
      if (found) return found;
    }
    // Keep selection if still free in unfiltered week
    const full = getWeekSlots(weekStart, pkg.durationMinutes);
    for (const day of full) {
      const found = day.find((s) => s.id === selectedId);
      if (found?.status === "free") return found;
    }
    return null;
  }, [selectedId, weekDays, weekStart, pkg.durationMinutes]);

  const displaySelectedId = selectedSlot ? selectedId : null;

  return (
    <div className="container-page section-y">
      <BookingHeader step={step} />

      {step === "mode" ? (
        <ModePicker
          mode={mode}
          onPick={(m) => {
            setMode(m);
            setStep("package", { mode: m });
          }}
        />
      ) : null}

      {step === "package" ? (
        <PackagePicker
          packages={activePackages.filter(
            (p) => p.modes === "both" || p.modes === mode,
          )}
          selected={packageSlug}
          onPick={(slug) => {
            setPackageSlug(slug);
            setSelectedId(null);
            setStep("date", { package: slug });
          }}
          onBack={() => setStep("mode")}
        />
      ) : null}

      {step === "date" ? (
        <div className="mt-6">
          <BookingFilters
            mode={mode}
            packageSlug={packageSlug}
            packages={activePackages.filter(
              (p) => p.modes === "both" || p.modes === mode,
            )}
            weekStart={weekStart}
            hourRange={hourRange}
            freeOnly={freeOnly}
            onMode={(m) => {
              setMode(m);
              setStep("date", { mode: m });
            }}
            onPackage={(slug) => {
              setPackageSlug(slug);
              setSelectedId(null);
              setStep("date", { package: slug });
            }}
            onPrevWeek={() => setWeekStart((w) => addDays(w, -7))}
            onNextWeek={() => setWeekStart((w) => addDays(w, 7))}
            onHourRange={setHourRange}
            onFreeOnly={setFreeOnly}
            mobileDayIndex={mobileDayIndex}
            onMobileDay={setMobileDayIndex}
          />

          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.9fr)]">
            <div>
              <div className="hidden md:block">
                <WeekCalendar
                  weekStart={weekStart}
                  days={weekDays}
                  selectedId={displaySelectedId}
                  onSelect={setSelectedId}
                />
              </div>
              <div className="md:hidden">
                <WeekCalendar
                  weekStart={weekStart}
                  days={weekDays}
                  selectedId={displaySelectedId}
                  onSelect={setSelectedId}
                  mobileDayIndex={mobileDayIndex}
                />
              </div>
              {weekDays.every((d) => d.filter((s) => s.status === "free").length === 0) ? (
                <p className="mt-4 text-[14px] text-ink-muted">
                  {copy.booking.emptyWeek}
                </p>
              ) : null}
            </div>
            <BookingSummary
              mode={mode}
              pkg={pkg}
              slot={selectedSlot}
              onContinue={() => setStep("business")}
            />
          </div>
        </div>
      ) : null}

      {step === "business" ? (
        <div className="mt-10">
          <BusinessForm
            initial={business}
            onBack={() => setStep("date")}
            onSubmit={(data) => {
              setBusiness(data);
              setStep("payment");
            }}
          />
        </div>
      ) : null}

      {step === "payment" ? (
        <div className="mt-10">
          <PaymentSim
            pkg={pkg}
            onBack={() => setStep("business")}
            onPay={() => {
              const code = `OCD-${new Date().getUTCFullYear()}-${String(
                Math.floor(Math.random() * 9000) + 1000,
              )}`;
              setRefCode(code);
              setStep("done");
            }}
          />
        </div>
      ) : null}

      {step === "done" && selectedSlot && business && refCode ? (
        <div className="mt-10">
          <ConfirmationTicket
            refCode={refCode}
            mode={mode}
            pkg={pkg}
            slot={selectedSlot}
            business={business}
          />
        </div>
      ) : null}
    </div>
  );
}

function ModePicker({
  mode,
  onPick,
}: {
  mode: "onsite" | "remote";
  onPick: (m: "onsite" | "remote") => void;
}) {
  const m = copy.booking.modeStep;
  return (
    <div className="mt-10">
      <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[0.95] text-ink">
        {m.title}
      </h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <button
          type="button"
          onClick={() => onPick("onsite")}
          className={cn(
            "border p-8 text-left transition-colors duration-150",
            mode === "onsite"
              ? "border-ink bg-mode-a text-white"
              : "border-line hover:border-ink",
          )}
        >
          <span className="font-display text-[28px] leading-none">
            {m.onsite}
          </span>
          <p
            className={cn(
              "mt-3 max-w-[32ch] text-[15px]",
              mode === "onsite" ? "text-white/85" : "text-ink-muted",
            )}
          >
            Tu viens au studio. Une régie dirige ton live.
          </p>
        </button>
        <button
          type="button"
          onClick={() => onPick("remote")}
          className={cn(
            "border p-8 text-left transition-colors duration-150",
            mode === "remote"
              ? "border-ink bg-mode-b text-white"
              : "border-line hover:border-ink",
          )}
        >
          <span className="font-display text-[28px] leading-none">
            {m.remote}
          </span>
          <p
            className={cn(
              "mt-3 max-w-[32ch] text-[15px]",
              mode === "remote" ? "text-white/85" : "text-ink-muted",
            )}
          >
            Tu restes chez toi. Une assistante t&apos;accompagne depuis Lomé.
          </p>
        </button>
      </div>
    </div>
  );
}

function PackagePicker({
  packages,
  selected,
  onPick,
  onBack,
}: {
  packages: typeof allPackages;
  selected: string;
  onPick: (slug: string) => void;
  onBack: () => void;
}) {
  return (
    <div className="mt-10">
      <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[0.95] text-ink">
        {copy.booking.packageStep.title}
      </h2>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((p) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => onPick(p.slug)}
            className={cn(
              "border p-5 text-left transition-colors duration-150",
              selected === p.slug
                ? "border-ink bg-ink text-bg"
                : "border-line hover:border-ink",
            )}
          >
            <span className="text-[18px] font-semibold">{p.name}</span>
            <p
              className={cn(
                "mt-1 text-[13px]",
                selected === p.slug ? "text-bg/70" : "text-ink-muted",
              )}
            >
              {p.tagline}
            </p>
            <p className="mt-3 font-mono text-[13px]">
              {formatFcfa(p.priceFcfa)} · {p.durationMinutes}&nbsp;min
            </p>
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onBack}
        className="mt-8 inline-flex h-12 items-center border border-ink px-5 text-[15px] font-medium"
      >
        Retour
      </button>
    </div>
  );
}
