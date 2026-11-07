export type PackageMode = "onsite" | "remote" | "both";

export type DemoPackage = {
  slug: string;
  name: string;
  tagline: string;
  durationMinutes: number;
  sessions: number;
  priceFcfa: number;
  modes: PackageMode;
  features: string[];
  featured: boolean;
  order: number;
  active: boolean;
};

export const brand = {
  name: "OCD Live", // à confirmer : transcription audio peu fiable
  owner: "Bovane Group",
  channel: "House of Challenge",
  studioCity: "Lomé, Togo",
  whatsapp: "", // DEMO : numéro à fournir
  // DEMO : remplacer par les vrais chiffres avant mise en ligne réelle
  stats: {
    lives: 48,
    vendors: 31,
    views: 120_000,
  },
  /** Présentation Bovane — brancher l'URL MP4 / fichier quand dispo. */
  video: {
    src: "",
    poster: "",
    label: "Voir la présentation",
  },
};

export const packages: DemoPackage[] = [
  {
    slug: "flash",
    name: "Flash",
    tagline: "Un live pour tester.",
    durationMinutes: 90,
    sessions: 1,
    priceFcfa: 15_000,
    modes: "both",
    features: [
      "1 h 30 de live",
      "Régie ou assistante incluse",
      "Vitrine vendeur avec QR",
      "Annonce de ton offre",
    ],
    featured: false,
    order: 1,
    active: true,
  },
  {
    slug: "demi-journee",
    name: "Demi-journée",
    tagline: "Plus de temps, moins cher à l'heure.",
    durationMinutes: 240,
    sessions: 1,
    priceFcfa: 35_000,
    modes: "both",
    features: [
      "4 h de live",
      "8 750 FCFA / heure",
      "Vitrine vendeur avec QR",
      "Temps pour plusieurs produits",
    ],
    featured: false,
    order: 2,
    active: true,
  },
  {
    slug: "annonce",
    name: "Annonce",
    tagline: "Bovane annonce ton live à son audience.",
    durationMinutes: 90,
    sessions: 1,
    priceFcfa: 30_000,
    modes: "both",
    features: [
      "1 h 30 de live",
      "Annonce par Bovane avant le live",
      "Vitrine vendeur avec QR",
      "Mise en avant sur le programme",
    ],
    featured: true,
    order: 3,
    active: true,
  },
  {
    slug: "duo",
    name: "Duo",
    tagline: "Deux sessions pour ancrer.",
    durationMinutes: 90,
    sessions: 2,
    priceFcfa: 27_000,
    modes: "both",
    features: [
      "2 × 1 h 30",
      "Deuxième date planifiée avec l'équipe",
      "Vitrine vendeur avec QR",
      "Suivi entre les deux lives",
    ],
    featured: false,
    order: 4,
    active: true,
  },
  {
    slug: "mensuel",
    name: "Mensuel",
    tagline: "Huit lives, un rythme commercial.",
    durationMinutes: 90,
    sessions: 8,
    priceFcfa: 99_000,
    modes: "both",
    features: [
      "8 × 1 h 30 sur le mois",
      "Planning fixé avec l'équipe",
      "Vitrine vendeur avec QR",
      "Priorité sur les créneaux",
    ],
    featured: false,
    order: 5,
    active: true,
  },
  {
    slug: "vip",
    name: "VIP",
    tagline: "La demi-journée premium.",
    durationMinutes: 240,
    sessions: 1,
    priceFcfa: 75_000,
    modes: "both",
    features: [
      "4 h de live",
      "Annonce prioritaire",
      "Accompagnement dédié",
      "Vitrine vendeur avec QR",
    ],
    featured: false,
    order: 6,
    active: true,
  },
];

/** @deprecated Prefer programmeItems from config/programme — kept for landing preview labels. */
export const demoProgramme = [
  {
    id: "1",
    businessName: "Saveurs de Tokoin",
    category: "alimentation",
    mode: "onsite" as const,
    startsAtLabel: "cette semaine · 10 h 00",
    city: "Lomé",
  },
  {
    id: "2",
    businessName: "Atelier Wax Douala",
    category: "mode",
    mode: "remote" as const,
    startsAtLabel: "cette semaine · 15 h 00",
    city: "Douala",
  },
  {
    id: "3",
    businessName: "Karité Nord",
    category: "beauté",
    mode: "onsite" as const,
    startsAtLabel: "cette semaine · 9 h 00",
    city: "Lomé",
  },
];

export const lowestPriceFcfa = Math.min(
  ...packages.filter((p) => p.active).map((p) => p.priceFcfa),
);
