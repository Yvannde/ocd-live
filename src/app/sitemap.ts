import type { MetadataRoute } from "next";
import { getPublicVitrineSlugs } from "@/config/vitrines";
import { programmeItems } from "@/config/programme";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/programme",
    "/reserver",
    "/recrutement",
    "/mentions-legales",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
  }));

  const programmeRoutes = programmeItems.map((item) => ({
    url: `${base}/programme/${item.slug}`,
    lastModified: now,
  }));

  const vitrineRoutes = getPublicVitrineSlugs().map((slug) => ({
    url: `${base}/v/${slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...programmeRoutes, ...vitrineRoutes];
}
