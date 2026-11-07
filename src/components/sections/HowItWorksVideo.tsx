import { copy } from "@/config/copy.fr";

export function HowItWorksVideo() {
  const { how } = copy;

  return (
    <section id="comment-ca-marche" className="section-y border-b border-line bg-bg">
      <div className="container-page">
        <h2 className="font-display text-h2 text-ink">{how.title}</h2>

        <div className="mt-10 grid gap-0 border border-line md:grid-cols-3">
          {how.steps.map((step, i) => (
            <div
              key={step.n}
              className={`flex flex-col gap-4 p-6 md:p-8 ${
                i < how.steps.length - 1 ? "border-b border-line md:border-b-0 md:border-r" : ""
              }`}
            >
              <span className="font-mono text-[13px] text-ink-muted">{step.n}</span>
              <h3 className="font-display text-[28px] leading-none text-ink">{step.title}</h3>
              <p className="max-w-[32ch] text-[15px] leading-relaxed text-ink-muted">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
