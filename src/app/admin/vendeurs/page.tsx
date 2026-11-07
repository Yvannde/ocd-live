import { VendorsPanel } from "@/components/admin/VendorsPanel";
import { demoVendors } from "@/config/demo-admin";
import { copy } from "@/config/copy.fr";

export const metadata = {
  title: `Vendeurs — Admin`,
  robots: { index: false, follow: false },
};

export default function AdminVendorsPage() {
  return (
    <div>
      <h1 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[0.95] text-ink">
        {copy.admin.vendors.title}
      </h1>
      <VendorsPanel initial={demoVendors} />
    </div>
  );
}
