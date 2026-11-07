import Link from "next/link";
import { brand } from "@/config/site";
import { copy } from "@/config/copy.fr";
import { HeroVideo } from "./HeroVideo";

export function Hero() {
  const { hero } = copy;

  return (
    <section className="border-b border-line">
      <div className="container-page section-y">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-16">
          <div className="animate-hero text-left">
            <h1 className="font-display text-[clamp(2.5rem,6.5vw,4.75rem)] leading-[0.92] tracking-[-0.01em] text-ink">
              <span className="block">{hero.titleLine1}</span>
              <span className="block">{hero.titleLine2}</span>
            </h1>
            <p className="animate-hero animate-hero-delay-1 mt-6 max-w-[36ch] text-[17px] leading-relaxed text-ink-muted md:text-[18px]">
              {hero.lead}
            </p>
            <p className="animate-hero animate-hero-delay-2 mt-5 font-mono text-[13px] text-ink-muted md:text-[14px]">
              {hero.proof(brand.stats.lives, brand.stats.vendors)}
            </p>
          </div>

          <div className="animate-hero animate-hero-delay-1 w-full">
            <HeroVideo />
          </div>
        </div>
      </div>

      <div className="animate-hero animate-hero-delay-2 grid md:grid-cols-2">
        <ModeBlock
          href="/reserver?mode=onsite"
          className="bg-mode-a"
          eyebrow={hero.onsite.eyebrow}
          title={hero.onsite.title}
          description={hero.onsite.description}
          price={hero.onsite.price}
          cta={hero.onsite.cta}
        />
        <ModeBlock
          href="/reserver?mode=remote"
          className="bg-mode-b"
          eyebrow={hero.remote.eyebrow}
          title={hero.remote.title}
          description={hero.remote.description}
          price={hero.remote.price}
          cta={hero.remote.cta}
        />
      </div>
    </section>
  );
}

function ModeBlock({
  href,
  className,
  eyebrow,
  title,
  description,
  price,
  cta,
}: {
  href: string;
  className: string;
  eyebrow: string;
  title: string;
  description: string;
  price: string;
  cta: string;
}) {
  return (
    <div
      className={`flex flex-col justify-between gap-8 px-6 py-10 text-white md:px-10 md:py-14 ${className}`}
    >
      <div>
        <p className="font-mono text-[14px] text-white/80">{eyebrow}</p>
        <div className="mt-4 border-t border-white/25 pt-4">
          <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[0.95]">
            {title}
          </h2>
          <p className="mt-4 max-w-[36ch] text-[15px] leading-relaxed text-white/85">
            {description}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[14px] text-white/90">{price}</p>
        <Link
          href={href}
          className="inline-flex h-12 min-w-[200px] items-center justify-center bg-ink px-5 text-[15px] font-medium text-bg transition-opacity duration-150 hover:opacity-90"
        >
          {cta}
        </Link>
      </div>
    </div>
  );
}
