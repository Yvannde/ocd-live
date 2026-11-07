import { ReservationsPanel } from "@/components/admin/ReservationsPanel";
import { demoBookings } from "@/config/demo-admin";
import { copy } from "@/config/copy.fr";

export const metadata = {
  title: `Réservations — Admin`,
  robots: { index: false, follow: false },
};

export default function AdminReservationsPage() {
  return (
    <div>
      <h1 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[0.95] text-ink">
        {copy.admin.reservations.title}
      </h1>
      <ReservationsPanel initial={demoBookings} />
    </div>
  );
}
