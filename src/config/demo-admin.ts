import { packages } from "@/config/site";
import { programmeItems } from "@/config/programme";
import { vitrines } from "@/config/vitrines";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "expired"
  | "no_show";

export type DemoBooking = {
  id: string;
  ref: string;
  businessName: string;
  contactName: string;
  phone: string;
  mode: "onsite" | "remote";
  packageSlug: string;
  packageName: string;
  priceFcfa: number;
  status: BookingStatus;
  startsAt: string;
  city: string;
  vitrineSlug?: string;
};

export type DemoBlock = {
  id: string;
  label: string;
  startsAt: string;
  endsAt: string;
};

export type DemoVendor = {
  id: string;
  businessName: string;
  contactName: string;
  phone: string;
  city: string;
  slug: string;
  vitrinePublic: boolean;
  lastLiveAt?: string;
};

function mondayUtc(): Date {
  const now = new Date();
  const d = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
  const day = d.getUTCDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setUTCDate(d.getUTCDate() + diff);
  return d;
}

function at(weekOffset: number, dayOffset: number, hour: number, minute = 0): string {
  const m = mondayUtc();
  m.setUTCDate(m.getUTCDate() + weekOffset * 7 + dayOffset);
  m.setUTCHours(hour, minute, 0, 0);
  return m.toISOString();
}

const pkgBySlug = Object.fromEntries(packages.map((p) => [p.slug, p]));

export const demoBookings: DemoBooking[] = [
  {
    id: "b1",
    ref: "OCD-2026-0001",
    businessName: "Saveurs de Tokoin",
    contactName: "Ama Mensah",
    phone: "+22890000001",
    mode: "onsite",
    packageSlug: "annonce",
    packageName: pkgBySlug.annonce?.name ?? "Annonce",
    priceFcfa: pkgBySlug.annonce?.priceFcfa ?? 30_000,
    status: "confirmed",
    startsAt: programmeItems[0]?.startsAt ?? at(0, 0, 10),
    city: "Lomé",
    vitrineSlug: "saveurs-de-tokoin",
  },
  {
    id: "b2",
    ref: "OCD-2026-0002",
    businessName: "Atelier Wax Douala",
    contactName: "Nina Okeke",
    phone: "+237600000002",
    mode: "remote",
    packageSlug: "duo",
    packageName: pkgBySlug.duo?.name ?? "Duo",
    priceFcfa: pkgBySlug.duo?.priceFcfa ?? 27_000,
    status: "confirmed",
    startsAt: programmeItems[1]?.startsAt ?? at(0, 1, 15),
    city: "Douala",
    vitrineSlug: "atelier-wax-douala",
  },
  {
    id: "b3",
    ref: "OCD-2026-0003",
    businessName: "Karité Nord",
    contactName: "Fatou Diallo",
    phone: "+22890000003",
    mode: "onsite",
    packageSlug: "flash",
    packageName: pkgBySlug.flash?.name ?? "Flash",
    priceFcfa: pkgBySlug.flash?.priceFcfa ?? 15_000,
    status: "pending",
    startsAt: programmeItems[2]?.startsAt ?? at(0, 2, 9),
    city: "Lomé",
    vitrineSlug: "karite-nord",
  },
  {
    id: "b4",
    ref: "OCD-2026-0004",
    businessName: "Tech Lomé Hub",
    contactName: "Kwame Assou",
    phone: "+22890000004",
    mode: "onsite",
    packageSlug: "demi-journee",
    packageName: pkgBySlug["demi-journee"]?.name ?? "Demi-journée",
    priceFcfa: pkgBySlug["demi-journee"]?.priceFcfa ?? 35_000,
    status: "confirmed",
    startsAt: programmeItems[3]?.startsAt ?? at(0, 4, 11),
    city: "Lomé",
    vitrineSlug: "tech-lome-hub",
  },
  {
    id: "b5",
    ref: "OCD-2026-0005",
    businessName: "Beauté Diaspora",
    contactName: "Sophie Ndiaye",
    phone: "+33600000006",
    mode: "remote",
    packageSlug: "annonce",
    packageName: pkgBySlug.annonce?.name ?? "Annonce",
    priceFcfa: pkgBySlug.annonce?.priceFcfa ?? 30_000,
    status: "cancelled",
    startsAt: at(1, 1, 16),
    city: "Paris",
  },
  {
    id: "b6",
    ref: "OCD-2026-0006",
    businessName: "Épicerie Centrale",
    contactName: "Yao Koffi",
    phone: "+22890000007",
    mode: "onsite",
    packageSlug: "flash",
    packageName: pkgBySlug.flash?.name ?? "Flash",
    priceFcfa: pkgBySlug.flash?.priceFcfa ?? 15_000,
    status: "completed",
    startsAt: at(-1, 2, 11),
    city: "Lomé",
  },
];

export const demoBlocks: DemoBlock[] = [
  {
    id: "blk1",
    label: "Maintenance régie",
    startsAt: at(0, 3, 9),
    endsAt: at(0, 3, 12),
  },
  {
    id: "blk2",
    label: "Congé équipe",
    startsAt: at(1, 4, 9),
    endsAt: at(1, 4, 18),
  },
];

export const demoVendors: DemoVendor[] = vitrines.map((v, i) => ({
  id: `v${i + 1}`,
  businessName: v.businessName,
  contactName: demoBookings.find((b) => b.vitrineSlug === v.slug)?.contactName ?? "Contact",
  phone: v.phone,
  city: v.city,
  slug: v.slug,
  vitrinePublic: v.consentPublic,
  lastLiveAt: v.startsAt,
}));

export function demoDashboardStats() {
  const confirmed = demoBookings.filter(
    (b) => b.status === "confirmed" || b.status === "completed",
  );
  const revenue = confirmed.reduce((sum, b) => sum + b.priceFcfa, 0);
  const upcoming = demoBookings
    .filter((b) => b.status === "confirmed" || b.status === "pending")
    .sort(
      (a, b) =>
        new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
    )
    .slice(0, 5);

  const fillRate = Math.min(
    100,
    Math.round((confirmed.length / Math.max(demoBookings.length, 1)) * 100),
  );

  return {
    bookingsMonth: demoBookings.length,
    revenueFcfa: revenue,
    fillRate,
    upcoming,
  };
}
