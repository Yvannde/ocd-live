"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { leaveAdminDemo } from "@/app/admin/actions";
import { brand } from "@/config/site";
import { copy } from "@/config/copy.fr";
import { cn } from "@/lib/utils";

const links: Array<{ href: string; label: string; exact?: boolean }> = [
  { href: "/admin", label: copy.admin.nav.dashboard, exact: true },
  { href: "/admin/reservations", label: copy.admin.nav.reservations },
  { href: "/admin/calendrier", label: copy.admin.nav.calendar },
  { href: "/admin/packages", label: copy.admin.nav.packages },
  { href: "/admin/vendeurs", label: copy.admin.nav.vendors },
  { href: "/admin/candidatures", label: copy.admin.nav.candidates },
  { href: "/admin/reglages", label: copy.admin.nav.settings },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/connexion";

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-full flex-col bg-bg md:flex-row">
      <aside className="shrink-0 border-b border-line md:w-[220px] md:border-b-0 md:border-r">
        <div className="flex items-center justify-between px-4 py-4 md:block">
          <div>
            <p className="text-[15px] font-semibold text-ink">{brand.name}</p>
            <p className="font-mono text-[11px] text-ink-muted">Admin démo</p>
          </div>
          <form action={leaveAdminDemo} className="md:mt-4">
            <button
              type="submit"
              className="font-mono text-[12px] text-ink-muted underline underline-offset-4 hover:text-ink"
            >
              {copy.admin.nav.logout}
            </button>
          </form>
        </div>
        <nav
          className="flex gap-1 overflow-x-auto px-2 pb-3 md:flex-col md:overflow-visible md:px-2 md:pb-6"
          aria-label="Navigation admin"
        >
          {links.map((link) => {
            const active = link.exact
              ? pathname === link.href
              : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "shrink-0 px-3 py-2 text-[13px] whitespace-nowrap transition-colors duration-150",
                  active
                    ? "bg-ink text-bg"
                    : "text-ink-muted hover:bg-bg-muted hover:text-ink",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden border-t border-line px-4 py-4 md:block">
          <Link
            href="/"
            className="font-mono text-[12px] text-ink-muted underline underline-offset-4 hover:text-ink"
          >
            {copy.admin.nav.site}
          </Link>
        </div>
      </aside>
      <div className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}
