import Link from "next/link";
import { enterAdminDemo } from "@/app/admin/actions";
import { copy } from "@/config/copy.fr";

export const metadata = {
  title: `Connexion équipe — ${copy.meta.title}`,
  robots: { index: false, follow: false },
};

export default function AdminConnexionPage() {
  const a = copy.admin.login;

  return (
    <div className="flex min-h-full items-center justify-center bg-bg px-4 py-16">
      <div className="w-full max-w-[420px] border border-line p-8">
        <h1 className="font-display text-[clamp(2rem,4vw,2.75rem)] leading-[0.95] text-ink">
          {a.title}
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">{a.lead}</p>
        <p className="mt-2 font-mono text-[12px] text-ink-muted">{a.hint}</p>
        <form action={enterAdminDemo} className="mt-8">
          <button
            type="submit"
            className="inline-flex h-12 w-full items-center justify-center bg-ink text-[15px] font-medium text-bg transition-opacity duration-150 hover:opacity-90"
          >
            {a.cta}
          </button>
        </form>
        <Link
          href="/"
          className="mt-6 inline-block font-mono text-[13px] text-ink-muted underline underline-offset-4"
        >
          {a.back}
        </Link>
      </div>
    </div>
  );
}
