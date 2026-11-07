import Link from "next/link";
import { demoDashboardStats } from "@/config/demo-admin";
import { copy } from "@/config/copy.fr";
import { formatLomeDateLong, formatLomeTime } from "@/lib/time";
import { formatFcfa } from "@/lib/utils";

export const metadata = {
  title: `Admin — ${copy.meta.title}`,
  robots: { index: false, follow: false },
};

export default function AdminDashboardPage() {
  const stats = demoDashboardStats();
  const d = copy.admin.dashboard;

  return (
    <div>
      <h1 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[0.95] text-ink">
        {d.title}
      </h1>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <div className="border border-line p-5">
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">
            {d.bookings}
          </p>
          <p className="mt-2 font-display text-[40px] leading-none text-ink">
            {stats.bookingsMonth}
          </p>
        </div>
        <div className="border border-line p-5">
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">
            {d.revenue}
          </p>
          <p className="mt-2 font-display text-[28px] leading-none text-ink sm:text-[32px]">
            {formatFcfa(stats.revenueFcfa)}
          </p>
        </div>
        <div className="border border-line p-5">
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">
            {d.fill}
          </p>
          <p className="mt-2 font-display text-[40px] leading-none text-mode-a">
            {stats.fillRate}&nbsp;%
          </p>
        </div>
      </div>

      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-[18px] font-semibold text-ink">{d.upcoming}</h2>
          <Link
            href="/admin/reservations"
            className="font-mono text-[12px] text-ink-muted underline underline-offset-4"
          >
            {copy.admin.nav.reservations}
          </Link>
        </div>
        {stats.upcoming.length === 0 ? (
          <p className="mt-4 text-[14px] text-ink-muted">{copy.admin.empty}</p>
        ) : (
          <ul className="mt-4 divide-y divide-line border border-line">
            {stats.upcoming.map((b) => (
              <li
                key={b.id}
                className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-ink">{b.businessName}</p>
                  <p className="font-mono text-[12px] text-ink-muted">
                    {formatLomeDateLong(b.startsAt)} · {formatLomeTime(b.startsAt)} ·{" "}
                    {b.mode === "onsite" ? "Lomé" : "Distance"}
                  </p>
                </div>
                <span className="font-mono text-[11px] text-ink-muted">
                  {copy.admin.statuses[b.status]}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
