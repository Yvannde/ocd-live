"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IconClose, IconMenu } from "@/components/icons";
import { brand } from "@/config/site";
import { copy } from "@/config/copy.fr";
import { cn } from "@/lib/utils";

const links = [
  { href: "#comment-ca-marche", label: copy.nav.how },
  { href: "#packages", label: copy.nav.packages },
  { href: "/programme", label: copy.nav.programme },
  { href: "#recrutement", label: copy.nav.recruit },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-16 border-b border-line/60 backdrop-blur-xl",
        open ? "bg-bg" : "bg-bg/70",
      )}
      style={open ? { backgroundColor: "var(--bg)" } : undefined}
    >
      <div className="container-page flex h-full items-center justify-between gap-4">
        <Link
          href="/"
          className="font-sans text-[18px] font-medium tracking-tight text-ink transition-opacity duration-150 hover:opacity-80"
        >
          {brand.name}
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Principal"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[14px] font-medium tracking-wide text-ink-muted transition-colors duration-150 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/reserver"
            className="btn-wave inline-flex h-10 items-center justify-center border border-ink px-4 text-[14px] font-medium"
          >
            <span className="btn-wave-label">{copy.nav.reserve}</span>
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border border-line/70 text-ink-muted transition-colors duration-150 hover:border-ink hover:text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose size={20} /> : <IconMenu size={20} />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-16 z-[60] overflow-y-auto bg-bg md:hidden"
          style={{ backgroundColor: "var(--bg)" }}
        >
          <nav className="flex min-h-full flex-col px-5 py-6" aria-label="Mobile">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex min-h-14 items-center border-b border-line text-[20px] font-medium text-ink transition-colors duration-150 hover:text-ink-muted"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
