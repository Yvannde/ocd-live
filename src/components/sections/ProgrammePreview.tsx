import Link from "next/link";
import { copy } from "@/config/copy.fr";
import { programmeItems } from "@/config/programme";
import { formatLomeDateLong, formatLomeTime } from "@/lib/time";

export function ProgrammePreview() {
  const { programme } = copy;
  const items = programmeItems
    .slice()
    .sort(
      (a, b) =>
        new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
    )
    .slice(0, 3);

  return (
    <section id="programme" className="section-y border-b border-line bg-bg">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-h2 whitespace-pre-line text-ink">
            {programme.title}
          </h2>
          <Link
            href="/programme"
            className="font-mono text-[14px] text-ink underline underline-offset-4"
          >
            {programme.seeAll}
          </Link>
        </div>

        {items.length === 0 ? (
          <p className="mt-10 text-[16px] text-ink-muted">{programme.empty}</p>
        ) : (
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {items.map((item) => (
              <article
                key={item.id}
                className="flex flex-col border border-line bg-bg p-6 transition-[border-color] duration-150 hover:border-ink"
              >
                <p className="font-mono text-[13px] text-ink-muted">
                  {formatLomeDateLong(item.startsAt)} ·{" "}
                  {formatLomeTime(item.startsAt)}
                </p>
                <h3 className="mt-3 text-[20px] font-semibold text-ink">
                  {item.businessName}
                </h3>
                <p className="mt-1 text-[14px] text-ink-muted">
                  {copy.booking.business.categories[item.category]} ·{" "}
                  {item.mode === "onsite" ? programme.onsite : programme.remote}
                </p>
                <Link
                  href={`/programme/${item.slug}`}
                  className="mt-6 inline-flex h-11 items-center justify-center border border-ink text-[14px] font-medium transition-colors duration-150 hover:bg-ink hover:text-bg"
                >
                  Voir le détail
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
