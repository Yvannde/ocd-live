import { copy } from "@/config/copy.fr";

export const metadata = {
  title: `Réglages — Admin`,
  robots: { index: false, follow: false },
};

export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[0.95] text-ink">
        {copy.admin.settings.title}
      </h1>
      <p className="mt-6 max-w-[48ch] border border-line p-5 text-[15px] leading-relaxed text-ink-muted">
        {copy.admin.stubSoon}
      </p>
    </div>
  );
}
