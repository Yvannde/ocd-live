import { programmeItems } from "@/config/programme";

export type VitrineItem = {
  slug: string;
  businessName: string;
  category: (typeof programmeItems)[number]["category"];
  mode: "onsite" | "remote";
  city: string;
  country: string;
  description: string;
  offer?: string;
  phone: string;
  startsAt?: string;
  consentPublic: boolean;
  /** Placeholder image paths under /public */
  photos: string[];
};

/** Vitrines publiques démo — alignées sur le programme. */
export const vitrines: VitrineItem[] = [
  {
    slug: "saveurs-de-tokoin",
    businessName: "Saveurs de Tokoin",
    category: "alimentation",
    mode: "onsite",
    city: "Lomé",
    country: "Togo",
    description:
      "Plats maison togolais, sauces et snacks prêts à commander pendant le live.",
    offer: "−15 % sur la première commande WhatsApp",
    phone: "+22890000001",
    startsAt: programmeItems.find((p) => p.slug === "saveurs-de-tokoin")
      ?.startsAt,
    consentPublic: true,
    photos: ["/vitrine/placeholder-1.svg", "/vitrine/placeholder-2.svg"],
  },
  {
    slug: "atelier-wax-douala",
    businessName: "Atelier Wax Douala",
    category: "mode",
    mode: "remote",
    city: "Douala",
    country: "Cameroun",
    description:
      "Nouvelle collection wax : robes, chemises et accessoires. Essayage commenté en direct.",
    offer: "Livraison groupée Cameroun cette semaine",
    phone: "+237600000002",
    startsAt: programmeItems.find((p) => p.slug === "atelier-wax-douala")
      ?.startsAt,
    consentPublic: true,
    photos: ["/vitrine/placeholder-1.svg", "/vitrine/placeholder-2.svg"],
  },
  {
    slug: "karite-nord",
    businessName: "Karité Nord",
    category: "beaute",
    mode: "onsite",
    city: "Lomé",
    country: "Togo",
    description:
      "Beurres de karité, huiles et soins capillaires naturels fabriqués au Togo.",
    offer: "Duo visage + corps offert dès 25 000 FCFA",
    phone: "+22890000003",
    startsAt: programmeItems.find((p) => p.slug === "karite-nord")?.startsAt,
    consentPublic: true,
    photos: ["/vitrine/placeholder-1.svg"],
  },
  {
    slug: "tech-lome-hub",
    businessName: "Tech Lomé Hub",
    category: "tech",
    mode: "onsite",
    city: "Lomé",
    country: "Togo",
    description:
      "Accessoires téléphone, écouteurs et chargeurs — démo en studio.",
    phone: "+22890000004",
    startsAt: programmeItems.find((p) => p.slug === "tech-lome-hub")?.startsAt,
    consentPublic: true,
    photos: ["/vitrine/placeholder-2.svg"],
  },
  {
    slug: "mode-accra-express",
    businessName: "Mode Accra Express",
    category: "mode",
    mode: "remote",
    city: "Accra",
    country: "Ghana",
    description: "Streetwear et sneakers — live à distance depuis Accra.",
    offer: "2 articles = −10 %",
    phone: "+233200000005",
    startsAt: programmeItems.find((p) => p.slug === "mode-accra-express")
      ?.startsAt,
    consentPublic: false,
    photos: ["/vitrine/placeholder-1.svg"],
  },
];

export function getPublicVitrine(slug: string): VitrineItem | undefined {
  const item = vitrines.find((v) => v.slug === slug);
  if (!item || !item.consentPublic) return undefined;
  return item;
}

export function getPublicVitrineSlugs(): string[] {
  return vitrines.filter((v) => v.consentPublic).map((v) => v.slug);
}
