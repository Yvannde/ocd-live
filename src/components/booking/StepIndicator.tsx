import { copy } from "@/config/copy.fr";
import { cn } from "@/lib/utils";

export type BookingStep =
  | "mode"
  | "package"
  | "date"
  | "business"
  | "payment"
  | "done";

const ORDER: BookingStep[] = [
  "mode",
  "package",
  "date",
  "business",
  "payment",
  "done",
];

export function StepIndicator({ step }: { step: BookingStep }) {
  const current = ORDER.indexOf(step);

  return (
    <ol className="flex flex-wrap gap-2" aria-label="Étapes de réservation">
      {ORDER.map((key, i) => {
        const active = i === current;
        const done = i < current;
        return (
          <li
            key={key}
            className={cn(
              "inline-flex items-center gap-2 font-mono text-[12px]",
              active && "text-ink",
              done && "text-ink-2",
              !active && !done && "text-ink-muted",
            )}
          >
            <span
              className={cn(
                "flex h-6 w-6 items-center justify-center border text-[11px]",
                active && "border-ink bg-ink text-bg",
                done && "border-ink bg-bg text-ink",
                !active && !done && "border-line text-ink-muted",
              )}
            >
              {i + 1}
            </span>
            <span className="hidden sm:inline">{copy.booking.steps[key]}</span>
          </li>
        );
      })}
    </ol>
  );
}
