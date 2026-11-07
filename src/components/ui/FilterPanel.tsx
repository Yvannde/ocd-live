import { cn } from "@/lib/utils";

export function FilterPanel({
  title,
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border border-line bg-bg shadow-[0_0_0_1px_rgba(14,14,12,0.02)]",
        className,
      )}
    >
      {title ? (
        <div className="flex items-center justify-between border-b border-line px-4 py-3 md:px-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted">
            {title}
          </p>
        </div>
      ) : null}
      <div className="grid gap-4 p-4 md:grid-cols-2 md:gap-5 md:p-5 lg:grid-cols-4">
        {children}
      </div>
    </div>
  );
}

export function FilterField({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink-muted">
        {label}
      </span>
      {children}
    </div>
  );
}

export function FilterSelect({
  value,
  onChange,
  children,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "h-11 w-full border border-line bg-bg px-3 text-[14px] text-ink transition-colors duration-150 hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        className,
      )}
    >
      {children}
    </select>
  );
}

export function FilterInput({
  value,
  onChange,
  placeholder,
  type = "text",
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "h-11 w-full border border-line bg-bg px-3 text-[14px] text-ink placeholder:text-ink-muted/70 transition-colors duration-150 hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        className,
      )}
    />
  );
}

export function FilterToggleGroup({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex h-11 w-full overflow-hidden border border-line">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "flex-1 px-2 text-[12px] font-medium transition-colors duration-150 sm:text-[13px]",
              active
                ? "bg-ink text-bg"
                : "bg-bg text-ink-muted hover:bg-bg-muted hover:text-ink",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
