export type ProgrammeItem = {
  id: string;
  businessName: string;
  category: "alimentation" | "mode" | "beaute" | "tech" | "services" | "autre";
  mode: "onsite" | "remote";
  /** ISO start in Lomé/UTC */
  startsAt: string;
  city: string;
  weekOffset: number;
  /** Ce qui sera présenté pendant le live */
  description: string;
  offer?: string;
  slug: string;
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

export const programmeItems: ProgrammeItem[] = [
  {
    id: "1",
    slug: "saveurs-de-tokoin",
    businessName: "Saveurs de Tokoin",
    category: "alimentation",
    mode: "onsite",
    startsAt: at(0, 0, 10),
    city: "Lomé",
    weekOffset: 0,
    description:
      "Plats maison togolais, sauces et snacks prêts à commander pendant le live.",
    offer: "−15 % sur la première commande WhatsApp",
  },
  {
    id: "2",
    slug: "atelier-wax-douala",
    businessName: "Atelier Wax Douala",
    category: "mode",
    mode: "remote",
    startsAt: at(0, 1, 15),
    city: "Douala",
    weekOffset: 0,
    description:
      "Nouvelle collection wax : robes, chemises et accessoires. Essayage commenté en direct.",
    offer: "Livraison groupée Cameroun cette semaine",
  },
  {
    id: "3",
    slug: "karite-nord",
    businessName: "Karité Nord",
    category: "beaute",
    mode: "onsite",
    startsAt: at(0, 2, 9),
    city: "Lomé",
    weekOffset: 0,
    description:
      "Beurres de karité, huiles et soins capillaires naturels fabriqués au Togo.",
    offer: "Duo visage + corps offert dès 25 000 FCFA",
  },
  {
    id: "4",
    slug: "tech-lome-hub",
    businessName: "Tech Lomé Hub",
    category: "tech",
    mode: "onsite",
    startsAt: at(0, 4, 11),
    city: "Lomé",
    weekOffset: 0,
    description:
      "Accessoires téléphone, écouteurs et chargeurs — démo en studio.",
  },
  {
    id: "5",
    slug: "mode-accra-express",
    businessName: "Mode Accra Express",
    category: "mode",
    mode: "remote",
    startsAt: at(1, 0, 10),
    city: "Accra",
    weekOffset: 1,
    description:
      "Streetwear et sneakers — live à distance depuis Accra.",
    offer: "2 articles = −10 %",
  },
  {
    id: "6",
    slug: "beaute-diaspora",
    businessName: "Beauté Diaspora",
    category: "beaute",
    mode: "remote",
    startsAt: at(1, 1, 16),
    city: "Paris",
    weekOffset: 1,
    description:
      "Soins pour peaux mates et cheveux texturés, pour la diaspora.",
  },
  {
    id: "7",
    slug: "services-pro-lome",
    businessName: "Services Pro Lomé",
    category: "services",
    mode: "onsite",
    startsAt: at(1, 3, 14),
    city: "Lomé",
    weekOffset: 1,
    description:
      "Offres de formation et coaching business présentées en live.",
  },
  {
    id: "8",
    slug: "epicerie-centrale",
    businessName: "Épicerie Centrale",
    category: "alimentation",
    mode: "onsite",
    startsAt: at(2, 2, 11),
    city: "Lomé",
    weekOffset: 2,
    description:
      "Produits d'épicerie fine et paniers découverte à commander en direct.",
    offer: "Panier découverte à 8 000 FCFA",
  },
];

export function getProgrammeBySlug(slug: string) {
  return programmeItems.find((i) => i.slug === slug);
}
