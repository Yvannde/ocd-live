import Link from "next/link";
import { brand } from "@/config/site";
import { copy } from "@/config/copy.fr";

export default function MentionsLegalesPage() {
  return (
    <section className="container-page section-y max-w-[720px]">
      <h1 className="font-display text-h2 text-ink">{copy.footer.legal}</h1>
      <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-ink-muted">
        <p>
          {brand.name} est opéré par {brand.owner}, basé à {brand.studioCity}.
        </p>
        <p>
          Les informations de cette démo (prix, chiffres d&apos;audience,
          vendeurs) sont des exemples et seront remplacées avant toute mise en
          ligne réelle.
        </p>
      </div>
      <Link
        href="/"
        className="mt-10 inline-block font-mono text-[14px] underline underline-offset-4"
      >
        {copy.stub.back}
      </Link>
    </section>
  );
}
