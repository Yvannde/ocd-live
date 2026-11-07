import { copy } from "@/config/copy.fr";

export function BookingLegend() {
  const items = [
    { label: copy.booking.legend.free, className: "bg-slot-free" },
    { label: copy.booking.legend.taken, className: "bg-slot-taken" },
    { label: copy.booking.legend.selected, className: "bg-slot-selected" },
    {
      label: copy.booking.legend.blocked,
      className:
        "bg-[repeating-linear-gradient(-45deg,var(--slot-taken),var(--slot-taken)_2px,transparent_2px,transparent_6px)]",
    },
  ];

  return (
    <ul className="flex flex-wrap gap-4 font-mono text-[12px] text-ink-muted">
      {items.map((item) => (
        <li key={item.label} className="inline-flex items-center gap-2">
          <span className={`h-3 w-5 border border-line ${item.className}`} />
          {item.label}
        </li>
      ))}
    </ul>
  );
}
