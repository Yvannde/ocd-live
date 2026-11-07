import { PackagesPanel } from "@/components/admin/PackagesPanel";
import { packages } from "@/config/site";
import { copy } from "@/config/copy.fr";

export const metadata = {
  title: `Packages — Admin`,
  robots: { index: false, follow: false },
};

export default function AdminPackagesPage() {
  return (
    <div>
      <h1 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[0.95] text-ink">
        {copy.admin.packages.title}
      </h1>
      <PackagesPanel initial={packages} />
    </div>
  );
}
