/** Lightweight class merger (no external deps required). */
export function cn(...inputs: Array<string | false | null | undefined>): string {
  return inputs.filter(Boolean).join(" ");
}

/** Format price as "15 000 FCFA" with non-breaking spaces. */
export function formatFcfa(amount: number): string {
  const formatted = new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace(/\u202f/g, "\u00a0")
    .replace(/ /g, "\u00a0");
  return `${formatted}\u00a0FCFA`;
}

/** Indicative EUR at fixed XOF rate 655.957. */
export function formatEurHint(amountFcfa: number): string {
  const eur = Math.round(amountFcfa / 655.957);
  return `≈ ${eur}\u00a0€`;
}
