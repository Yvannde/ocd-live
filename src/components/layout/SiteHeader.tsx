"use client";

import Link from "next/link";
import { useState } from "react";
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

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-line/60 bg-bg/70 backdrop-blur-xl">
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

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 top-16 z-40 bg-bg/95 backdrop-blur-xl md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="flex flex-col px-5 py-6" aria-label="Mobile">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex min-h-14 items-center border-b border-line/60 text-[20px] font-medium text-ink-2 transition-colors duration-150 hover:text-ink"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
