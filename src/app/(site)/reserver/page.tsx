import { Suspense } from "react";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { copy } from "@/config/copy.fr";

export const metadata = {
  title: `Réserver — ${copy.meta.title}`,
  description: copy.booking.lead,
};

export default function ReserverPage() {
  return (
    <Suspense
      fallback={
        <div className="container-page section-y">
          <p className="font-mono text-[14px] text-ink-muted">Chargement…</p>
        </div>
      }
    >
      <BookingFlow />
    </Suspense>
  );
}
