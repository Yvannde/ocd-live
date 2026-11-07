import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { copy } from "@/config/copy.fr";
import {
  getPublicVitrine,
  getPublicVitrineSlugs,
} from "@/config/vitrines";
import { toQrDataUrl } from "@/lib/qr";
import { getSiteUrl } from "@/lib/site-url";
import { formatLomeDateLong, formatLomeTime } from "@/lib/time";

export const instant = false;

export function generateStaticParams() {
  return getPublicVitrineSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getPublicVitrine(slug);
  if (!item) return { title: copy.vitrine.notFound };
  return {
    title: `${item.businessName} — vitrine`,
    description: item.description,
  };
}

async function VitrineBody({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getPublicVitrine(slug);
  if (!item) notFound();

  const v = copy.vitrine;
  const url = `${getSiteUrl()}/v/${item.slug}`;
  const qr = await toQrDataUrl(url);
  const wa = `https://wa.me/${item.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Bonjour ${item.businessName}, je vous contacte depuis votre vitrine OCD Live.`,
  )}`;

  return (
    <article className="container-page section-y max-w-[800px]">
      <p className="font-mono text-[12px] uppercase tracking-wide text-ink-muted">
        {copy.booking.business.categories[item.category]} · {item.city},{" "}
        {item.country}
      </p>
      <h1 className="mt-3 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[0.95] text-ink">
        {item.businessName}
      </h1>
      <p className="mt-2 text-[15px] text-ink-muted">
        {item.mode === "onsite" ? "Studio Lomé" : "Live à distance"}
      </p>

      {item.startsAt ? (
        <p className="mt-4 font-mono text-[13px] text-ink">
          {v.slot} · {formatLomeDateLong(item.startsAt)} ·{" "}
          {formatLomeTime(item.startsAt)} à Lomé
        </p>
      ) : null}

      <p className="mt-8 max-w-[56ch] text-[17px] leading-relaxed text-ink-2">
        {item.description}
      </p>

      {item.offer ? (
        <p className="mt-6 border border-mode-a/30 bg-mode-a/5 px-4 py-3 font-mono text-[14px] text-mode-a">
          {v.offer} : {item.offer}
        </p>
      ) : null}

      {item.photos.length > 0 ? (
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {item.photos.map((src) => (
            <div key={src} className="relative aspect-[4/3] border border-line bg-bg-muted">
              <Image
                src={src}
                alt={`Produit — ${item.businessName}`}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>
      ) : null}

      <div className="mt-10 flex flex-col gap-6 border border-line p-5 sm:flex-row sm:items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={qr}
          alt={v.qrLabel}
          width={160}
          height={160}
          className="border border-line bg-bg"
        />
        <div>
          <p className="font-mono text-[12px] uppercase tracking-wide text-ink-muted">
            {v.qrLabel}
          </p>
          <p className="mt-2 text-[15px] text-ink-2">{v.qrHint}</p>
          <p className="mt-2 break-all font-mono text-[11px] text-ink-muted">
            {url}
          </p>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center bg-ink px-5 text-[15px] font-medium text-bg"
        >
          {v.contact}
        </a>
        <Link
          href="/programme"
          className="inline-flex h-12 items-center border border-ink px-5 text-[15px] font-medium"
        >
          {v.backProgramme}
        </Link>
      </div>
    </article>
  );
}

export default function VitrinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="container-page section-y">
          <p className="font-mono text-[13px] text-ink-muted">Chargement…</p>
        </div>
      }
    >
      <VitrineBody params={params} />
    </Suspense>
  );
}
