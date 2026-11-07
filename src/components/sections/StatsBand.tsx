import { brand } from "@/config/site";
import { copy } from "@/config/copy.fr";

function formatStat(n: number): string {
  return new Intl.NumberFormat("fr-FR").format(n).replace(/\u202f/g, "\u00a0");
}

export function StatsBand() {
  const { stats } = brand;
  if (!stats.lives && !stats.vendors && !stats.views) return null;

  const items = [
    { value: stats.lives, label: copy.stats.lives, color: "text-mode-b" },
    { value: stats.vendors, label: copy.stats.vendors, color: "text-mode-a" },
    { value: stats.views, label: copy.stats.views, color: "text-ink" },
  ];

  return (
    <section className="border-b border-line bg-bg" aria-label="Chiffres">
      <div className="container-page grid divide-y divide-line py-12 md:grid-cols-3 md:divide-x md:divide-y-0">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col px-0 py-6 md:px-8 md:py-2 first:md:pl-0 last:md:pr-0">
            <p className={`font-display text-[clamp(2.5rem,5vw,3.5rem)] ${item.color}`}>
              {formatStat(item.value)}
            </p>
            <p className="mt-2 font-mono text-[14px] text-ink-muted">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
