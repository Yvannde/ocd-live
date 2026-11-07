import { Faq } from "@/components/sections/Faq";
import { FeatureBlocks } from "@/components/sections/FeatureBlocks";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { HowItWorksVideo } from "@/components/sections/HowItWorksVideo";
import { PackagesGrid } from "@/components/sections/PackagesGrid";
import { ProgrammePreview } from "@/components/sections/ProgrammePreview";
import { RecruitmentBand } from "@/components/sections/RecruitmentBand";
import { StatsBand } from "@/components/sections/StatsBand";
import { brand } from "@/config/site";
import { copy } from "@/config/copy.fr";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    description: copy.meta.description,
    areaServed: brand.studioCity,
    parentOrganization: {
      "@type": "Organization",
      name: brand.owner,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <StatsBand />
      <HowItWorksVideo />
      <FeatureBlocks />
      <ProgrammePreview />
      <PackagesGrid />
      <RecruitmentBand />
      <Faq />
      <FinalCta />
    </>
  );
}
