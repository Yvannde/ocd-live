import { copy } from "@/config/copy.fr";
import { StepIndicator, type BookingStep } from "./StepIndicator";

export function BookingHeader({ step }: { step: BookingStep }) {
  return (
    <div className="border-b border-line/60 pb-8">
      <h1 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[0.92] text-ink">
        {copy.booking.title}
      </h1>
      <p className="mt-4 max-w-[48ch] text-[16px] leading-relaxed text-ink-muted md:text-[17px]">
        {copy.booking.lead}
      </p>
      <div className="mt-8">
        <StepIndicator step={step} />
      </div>
    </div>
  );
}
