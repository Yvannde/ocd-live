import { CalendarPanel } from "@/components/admin/CalendarPanel";
import { demoBlocks, demoBookings } from "@/config/demo-admin";
import { copy } from "@/config/copy.fr";

export const metadata = {
  title: `Calendrier — Admin`,
  robots: { index: false, follow: false },
};

export default function AdminCalendarPage() {
  return (
    <div>
      <h1 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[0.95] text-ink">
        {copy.admin.calendar.title}
      </h1>
      <CalendarPanel bookings={demoBookings} blocks={demoBlocks} />
    </div>
  );
}
