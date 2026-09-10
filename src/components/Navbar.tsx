"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { pathFor } from "@/lib/locales";
import { useContent } from "./ContentContext";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/cn";
import { IconMenu, IconX } from "./Icons";
import { LOCALES } from "@/lib/locales";

const LINKS = [
  { key: "home", href: "/" },
  { key: "how", href: "/how-it-works" },
  { key: "tourists", href: "/for-tourists" },
  { key: "guides", href: "/for-guides" },
  { key: "volunteer", href: "/volunteer" },
  { key: "host", href: "/host" },
  { key: "about", href: "/about" },
] as const;

export function Navbar() {
  const { content: c, locale } = useContent();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const p = (href: string) => pathFor(locale, href);
  const isActive = (href: string) => {
    const target = p(href);
    if (target === "/") return pathname === "/";
    return pathname === target || pathname.startsWith(target + "/");
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-2.5" : "py-4 md:py-5"
        )}
      >
        <div className="container-x">
          <div
            className={cn(
              "flex items-center justify-between gap-3 rounded-full transition-all duration-500",
              scrolled
                ? "bg-cream-50/90 px-3 py-2 shadow-soft backdrop-blur-xl"
                : "bg-transparent px-1.5 py-1"
            )}
          >
            <Link
              href={p("/")}
              onClick={() => setOpen(false)}
              className="shrink-0 rounded-full"
              aria-label={c.site.name}
            >
              <Logo
                image={c.site.logoImage || undefined}
                word={c.site.logoText}
                markSize={scrolled ? 32 : 38}
              />
            </Link>

            <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Main navigation">
              {LINKS.map((l) => (
                <Link
                  key={l.key}
                  href={p(l.href)}
                  className={cn(
                    "rounded-full px-3 py-2 text-[13px] font-medium transition-all duration-300",
                    isActive(l.href)
                      ? "bg-cream-100 text-ink-900 shadow-soft-inset-sm"
                      : "text-ink-700 hover:bg-cream-100/70 hover:text-teal-700"
                  )}
                >
                  {c.nav[l.key]}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <Link href={p("/") + "#get-started"} className="btn btn-primary btn-md hidden md:inline-flex">
                {c.nav.getStarted}
              </Link>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="btn btn-soft h-11 w-11 rounded-full !px-0 xl:hidden"
                aria-label="Open menu"
                aria-expanded={open}
              >
                <IconMenu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-[70] xl:hidden",
          open ? "visible" : "invisible",
          "transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0"
        )}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-ink-900/45 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <div
          className={cn(
            "no-scrollbar absolute inset-x-3 bottom-3 top-3 overflow-y-auto rounded-[2rem] bg-cream-50 p-5 shadow-soft-lg transition-transform duration-500 sm:inset-x-6 sm:inset-y-6",
            open ? "translate-y-0" : "-translate-y-6"
          )}
        >
          <div className="flex items-center justify-between">
            <Logo image={c.site.logoImage || undefined} word={c.site.logoText} markSize={34} />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="btn btn-soft h-11 w-11 rounded-full !px-0"
              aria-label="Close menu"
            >
              <IconX size={18} />
            </button>
          </div>

          <nav className="mt-8 space-y-1" aria-label="Mobile navigation">
            {LINKS.map((l, i) => (
              <Link
                key={l.key}
                href={p(l.href)}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-lg font-semibold transition-colors",
                  isActive(l.href)
                    ? "bg-teal-50 text-teal-700"
                    : "text-ink-800 hover:bg-cream-100"
                )}
              >
                {c.nav[l.key]}
                <span className="text-xs font-body font-medium text-ink-300">0{i + 1}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-7">
            <p className="px-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-400">
              Language
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 px-1">
              {LOCALES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => {
                    const stripped = window.location.pathname.replace(/^\/(uz|ru|tr|zh)(?=\/|$)/, "") || "/";
                    const target = l.code === "en" ? stripped : `/${l.code}${stripped === "/" ? "" : stripped}`;
                    setOpen(false);
                    window.location.href = target;
                  }}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-colors",
                    l.code === locale
                      ? "bg-teal-600 text-white shadow-glow-teal"
                      : "bg-cream-100 text-ink-800 shadow-soft-inset-sm"
                  )}
                >
                  <span className="mr-2">{l.flag}</span>
                  {l.native}
                </button>
              ))}
            </div>
          </div>

          <Link
            href={p("/") + "#get-started"}
            onClick={() => setOpen(false)}
            className="btn btn-primary btn-lg mt-8 w-full"
          >
            {c.nav.getStarted}
          </Link>
        </div>
      </div>
    </>
  );
}
