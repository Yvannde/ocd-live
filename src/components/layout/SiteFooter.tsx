import Link from "next/link";
import { brand } from "@/config/site";
import { copy } from "@/config/copy.fr";

export function SiteFooter() {
  // Fixed for static prerender (Next 16); bump yearly if needed.
  const year = 2026;

  return (
    <footer className="border-t border-dark-rule bg-dark-bg text-dark-text">
      <div className="container-page grid gap-10 py-16 md:grid-cols-4">
        <div>
          <p className="font-sans text-[18px] font-semibold">{brand.name}</p>
          <p className="mt-2 font-mono text-[13px] text-dark-muted">
            {brand.owner} · {brand.studioCity}
          </p>
        </div>

        <div>
          <p className="font-mono text-[12px] uppercase tracking-wide text-dark-dim">
            {copy.footer.reserve}
          </p>
          <ul className="mt-3 space-y-2 text-[14px] text-dark-body">
            <li>
              <Link href="/reserver?mode=onsite" className="hover:text-dark-text">
                Live à Lomé
              </Link>
            </li>
            <li>
              <Link href="/reserver?mode=remote" className="hover:text-dark-text">
                Live à distance
              </Link>
            </li>
            <li>
              <Link href="/#packages" className="hover:text-dark-text">
                Packages
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[12px] uppercase tracking-wide text-dark-dim">
            {copy.footer.discover}
          </p>
          <ul className="mt-3 space-y-2 text-[14px] text-dark-body">
            <li>
              <a href="#comment-ca-marche" className="hover:text-dark-text">
                {copy.nav.how}
              </a>
            </li>
            <li>
              <Link href="/programme" className="hover:text-dark-text">
                {copy.nav.programme}
              </Link>
            </li>
            <li>
              <a href="#recrutement" className="hover:text-dark-text">
                {copy.nav.recruit}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[12px] uppercase tracking-wide text-dark-dim">
            {copy.footer.contact}
          </p>
          <ul className="mt-3 space-y-2 text-[14px] text-dark-body">
            <li>
              <span className="text-dark-muted">WhatsApp</span>
              <span className="ml-2 font-mono text-dark-dim">
                {brand.whatsapp || "à venir"}
              </span>
            </li>
            <li>
              <Link href="/mentions-legales" className="hover:text-dark-text">
                {copy.footer.legal}
              </Link>
            </li>
            <li>
              <Link
                href="/admin"
                className="text-dark-dim hover:text-dark-muted"
              >
                {copy.footer.admin}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-dark-rule">
        <div className="container-page flex flex-col gap-2 py-6 font-mono text-[12px] text-dark-dim md:flex-row md:items-center md:justify-between">
          <span>{copy.footer.rights(year)}</span>
          <span>{brand.channel}</span>
        </div>
      </div>
    </footer>
  );
}
