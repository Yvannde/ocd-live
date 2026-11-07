import Link from "next/link";
import { copy } from "@/config/copy.fr";

export default function NotFound() {
  return (
    <div className="container-page section-y max-w-[560px]">
      <p className="font-mono text-[13px] text-ink-muted">404</p>
      <h1 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] leading-[0.95] text-ink">
        Page introuvable.
      </h1>
      <p className="mt-4 text-[16px] leading-relaxed text-ink-muted">
        Cette adresse n’existe pas ou la page a été déplacée.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex h-12 items-center bg-ink px-5 text-[15px] font-medium text-bg"
        >
          {copy.stub.back}
        </Link>
        <Link
          href="/programme"
          className="inline-flex h-12 items-center border border-ink px-5 text-[15px] font-medium"
        >
          {copy.nav.programme}
        </Link>
      </div>
    </div>
  );
}
