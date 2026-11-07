import Link from "next/link";
import { notFound } from "next/navigation";
import { brand } from "@/config/site";
import { copy } from "@/config/copy.fr";
import { getProgrammeBySlug, programmeItems } from "@/config/programme";
import { getPublicVitrine } from "@/config/vitrines";
import { formatLomeDateLong, formatLomeTime } from "@/lib/time";

export function generateStaticParams() {
  return programmeItems.map((item) => ({ slug: item.slug }));
}

export default async function ProgrammeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getProgrammeBySlug(slug);
  if (!item) notFound();

  const p = copy.programmePage;
  const vitrine = getPublicVitrine(item.slug);
  const remindHref = brand.whatsapp
    ? `https://wa.me/${brand.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
        `Rappelle-moi pour le live de ${item.businessName}`,
      )}`
    : null;

  return (
    <article className="container-page section-y max-w-[720px]">
      <Link
        href="/programme"
        className="font-mono text-[13px] text-ink-muted underline underline-offset-4"
      >
        ← {p.backToList}
      </Link>

      <p className="mt-8 font-mono text-[13px] text-ink-muted">
        {formatLomeDateLong(item.startsAt)} · {formatLomeTime(item.startsAt)} à
        Lomé
      </p>
      <h1 className="mt-3 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[0.95] text-ink">
        {item.businessName}
      </h1>
      <p className="mt-2 text-[15px] text-ink-muted">
        {copy.booking.business.categories[item.category]} ·{" "}
        {item.mode === "onsite" ? "Studio Lomé" : "Live à distance"} ·{" "}
        {item.city}
      </p>

      <div className="mt-10 space-y-4 border-t border-line pt-8">
        <h2 className="font-mono text-[12px] uppercase tracking-wide text-ink-muted">
          {p.whatHappens}
        </h2>
        <p className="text-[17px] leading-relaxed text-ink-2">{item.description}</p>
        {item.offer ? (
          <p className="border border-mode-a/30 bg-mode-a/5 px-4 py-3 font-mono text-[14px] text-mode-a">
            {item.offer}
          </p>
        ) : null}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        {vitrine ? (
          <Link
            href={`/v/${vitrine.slug}`}
            className="inline-flex h-12 items-center bg-ink px-5 text-[15px] font-medium text-bg"
          >
            {p.seeVitrine}
          </Link>
        ) : null}
        {remindHref ? (
          <a
            href={remindHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center border border-ink px-5 text-[15px] font-medium"
          >
            {p.remind}
          </a>
        ) : null}
        <Link
          href="/programme"
          className="inline-flex h-12 items-center border border-line px-5 text-[15px] font-medium"
        >
          {p.backToList}
        </Link>
      </div>

      <p className="mt-12 text-[14px] text-ink-muted">
        {p.vendorCta}{" "}
        <Link href="/reserver" className="text-ink underline underline-offset-4">
          {p.vendorLink}
        </Link>
      </p>
    </article>
  );
}
