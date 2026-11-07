import Link from "next/link";
import { copy } from "@/config/copy.fr";

export function FinalCta() {
  const { hero, finalCta } = copy;

  return (
    <section className="bg-bg">
      <div className="container-page pt-[var(--section-y-mobile)] md:pt-[var(--section-y)]">
        <h2 className="font-display text-h2 text-ink">{finalCta.title}</h2>
      </div>

      <div className="mt-10 grid md:grid-cols-2">
        <Link
          href="/reserver?mode=onsite"
          className="group flex flex-col justify-between gap-8 bg-mode-a px-6 py-10 text-white transition-opacity duration-150 hover:opacity-95 md:px-10 md:py-14"
        >
          <div>
            <p className="font-mono text-[14px] text-white/80">
              {hero.onsite.eyebrow}
            </p>
            <h3 className="font-display mt-4 border-t border-white/25 pt-4 text-[clamp(2rem,4vw,3rem)] leading-[0.95]">
              {hero.onsite.title}
            </h3>
            <p className="mt-4 max-w-[36ch] text-[15px] text-white/85">
              {hero.onsite.description}
            </p>
          </div>
          <span className="inline-flex h-12 w-fit items-center bg-ink px-5 text-[15px] font-medium text-bg">
            {hero.onsite.cta}
          </span>
        </Link>

        <Link
          href="/reserver?mode=remote"
          className="group flex flex-col justify-between gap-8 bg-mode-b px-6 py-10 text-white transition-opacity duration-150 hover:opacity-95 md:px-10 md:py-14"
        >
          <div>
            <p className="font-mono text-[14px] text-white/80">
              {hero.remote.eyebrow}
            </p>
            <h3 className="font-display mt-4 border-t border-white/25 pt-4 text-[clamp(2rem,4vw,3rem)] leading-[0.95]">
              {hero.remote.title}
            </h3>
            <p className="mt-4 max-w-[36ch] text-[15px] text-white/85">
              {hero.remote.description}
            </p>
          </div>
          <span className="inline-flex h-12 w-fit items-center bg-ink px-5 text-[15px] font-medium text-bg">
            {hero.remote.cta}
          </span>
        </Link>
      </div>
    </section>
  );
}
