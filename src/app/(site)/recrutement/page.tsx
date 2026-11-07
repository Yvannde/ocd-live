import Link from "next/link";
import { copy } from "@/config/copy.fr";

export default function RecrutementPage() {
  return (
    <section className="container-page section-y max-w-[720px]">
      <h1 className="font-display text-h2 whitespace-pre-line text-ink">
        {copy.recruit.title}
      </h1>
      <p className="mt-5 text-[17px] leading-relaxed text-ink-muted">
        {copy.recruit.body}
      </p>
      <p className="mt-8 border border-line p-6 text-[15px] text-ink-2">
        Le formulaire de candidature arrive bientôt. Envoie un message WhatsApp
        à l&apos;équipe en attendant.
      </p>
      <Link
        href="/"
        className="mt-10 inline-block font-mono text-[14px] underline underline-offset-4"
      >
        {copy.stub.back}
      </Link>
    </section>
  );
}
