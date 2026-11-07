import { copy } from "@/config/copy.fr";

export function FeatureBlocks() {
  const { features } = copy;

  return (
    <section className="bg-dark-bg text-dark-text">
      <div className="container-page section-y">
        <h2 className="font-display text-h2 whitespace-pre-line text-dark-text">
          {features.sectionTitle}
        </h2>

        <div className="mt-16 space-y-20 md:space-y-28">
          {features.items.map((item, index) => {
            const flip = index % 2 === 1;
            return (
              <div
                key={item.title}
                className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
                  flip ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <h3 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] whitespace-pre-line leading-[0.95]">
                    {item.title}
                  </h3>
                  <p className="mt-5 max-w-[40ch] text-[16px] leading-relaxed text-dark-body">
                    {item.body}
                  </p>
                </div>
                <div className="flex aspect-[4/3] items-end border border-dark-rule bg-dark-surface p-6">
                  <p className="font-mono text-[13px] text-dark-dim">
                    {String(index + 1).padStart(2, "0")} / {String(features.items.length).padStart(2, "0")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
