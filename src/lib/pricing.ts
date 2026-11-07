const DEPOSIT_PERCENT = 30;

/** Round up to next 100 FCFA. */
export function roundUp100(amount: number): number {
  return Math.ceil(amount / 100) * 100;
}

export function depositAmount(totalFcfa: number, percent = DEPOSIT_PERCENT): number {
  return roundUp100((totalFcfa * percent) / 100);
}

export function remainingAmount(totalFcfa: number, percent = DEPOSIT_PERCENT): number {
  return totalFcfa - depositAmount(totalFcfa, percent);
}

export { DEPOSIT_PERCENT };
