import Link from "next/link";
import { copy } from "@/config/copy.fr";

export function RecruitmentBand() {
  const { recruit } = copy;

  return (
    <section id="recrutement" className="section-y border-b border-line bg-bg">
      <div className="container-page grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="font-display text-h2 whitespace-pre-line text-ink">
            {recruit.title}
          </h2>
          <p className="mt-5 max-w-[40ch] text-[17px] leading-relaxed text-ink-muted">
            {recruit.body}
          </p>
          <Link
            href="/recrutement"
            className="mt-8 inline-flex h-12 items-center justify-center bg-ink px-6 text-[15px] font-medium text-bg transition-opacity duration-150 hover:opacity-90"
          >
            {recruit.cta}
          </Link>
        </div>

        <div className="border border-line">
          {recruit.qualities.map((q, i) => (
            <div
              key={q.title}
              className={`p-6 ${
                i < recruit.qualities.length - 1 ? "border-b border-line" : ""
              }`}
            >
              <h3 className="font-display text-[24px] leading-none text-ink">
                {q.title}
              </h3>
              <p className="mt-2 text-[15px] text-ink-muted">{q.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
