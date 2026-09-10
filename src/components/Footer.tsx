"use client";

import Link from "next/link";
import { pathFor } from "@/lib/locales";
import { useContent } from "./ContentContext";
import { Logo } from "./Logo";
import {
  IconFacebook,
  IconInstagram,
  IconMail,
  IconMapPin,
  IconPhone,
  IconTelegram,
  IconYoutube,
} from "./Icons";

export function Footer() {
  const { content: c, locale } = useContent();
  const p = (href: string) => pathFor(locale, href);
  const f = c.footer;
  const s = c.site;
  const n = c.nav;

  const socials = [
    { href: s.instagram, icon: IconInstagram, label: "Instagram" },
    { href: s.telegram, icon: IconTelegram, label: "Telegram" },
    { href: s.facebook, icon: IconFacebook, label: "Facebook" },
    { href: s.youtube, icon: IconYoutube, label: "YouTube" },
  ];

  return (
    <footer className="relative overflow-hidden bg-night-950 text-cream-200">
      <div className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-teal-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[380px] w-[380px] rounded-full bg-amber-500/10 blur-3xl" />

      <div className="container-x relative py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <Logo image={s.logoImage || undefined} word={s.logoText} dark markSize={40} />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-300">{s.footerDesc}</p>
            <div className="mt-7 flex gap-2.5">
              {socials.map((sm) => (
                <a
                  key={sm.label}
                  href={sm.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={sm.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-night-800 text-cream-200 shadow-dark-inset transition-all duration-300 hover:-translate-y-0.5 hover:text-teal-300"
                >
                  <sm.icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Platform">
            <h4 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-cream-100">
              {f.platformTitle}
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link className="text-ink-300 transition-colors hover:text-teal-300" href={p("/") + "#explore"}>{n.explore}</Link></li>
              <li><Link className="text-ink-300 transition-colors hover:text-teal-300" href={p("/") + "#scanner"}>{f.scanLink}</Link></li>
              <li><Link className="text-ink-300 transition-colors hover:text-teal-300" href={p("/how-it-works")}>{n.how}</Link></li>
              <li><Link className="text-ink-300 transition-colors hover:text-teal-300" href={p("/") + "#get-started"}>{n.getStarted}</Link></li>
            </ul>
          </nav>

          <nav aria-label="For you">
            <h4 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-cream-100">
              {f.forYouTitle}
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link className="text-ink-300 transition-colors hover:text-teal-300" href={p("/for-tourists")}>{f.touristsLink}</Link></li>
              <li><Link className="text-ink-300 transition-colors hover:text-teal-300" href={p("/for-guides")}>{f.guidesLink}</Link></li>
              <li><Link className="text-ink-300 transition-colors hover:text-teal-300" href={p("/volunteer")}>{f.volunteerLink}</Link></li>
              <li><Link className="text-ink-300 transition-colors hover:text-teal-300" href={p("/host")}>{f.hostLink}</Link></li>
              <li><Link className="text-ink-300 transition-colors hover:text-teal-300" href={p("/about")}>{f.aboutLink}</Link></li>
            </ul>
          </nav>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-cream-100">
              {f.contactTitle}
            </h4>
            <ul className="mt-5 space-y-3.5 text-sm">
              <li>
                <a href={`mailto:${s.contactEmail}`} className="group flex items-center gap-3 text-ink-300 transition-colors hover:text-teal-300">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-night-800 shadow-dark-inset">
                    <IconMail size={15} />
                  </span>
                  {s.contactEmail}
                </a>
              </li>
              <li>
                <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="group flex items-center gap-3 text-ink-300 transition-colors hover:text-teal-300">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-night-800 shadow-dark-inset">
                    <IconPhone size={15} />
                  </span>
                  {s.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-ink-300">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-night-800 shadow-dark-inset">
                  <IconMapPin size={15} />
                </span>
                {s.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-ink-400">{f.rights}</p>
          <div className="flex gap-6 text-xs">
            <Link className="text-ink-400 transition-colors hover:text-teal-300" href={p("/privacy")}>
              {f.privacy}
            </Link>
            <Link className="text-ink-400 transition-colors hover:text-teal-300" href={p("/terms")}>
              {f.terms}
            </Link>
          </div>
          <p className="text-xs text-ink-400">{f.madeIn}</p>
        </div>
      </div>
    </footer>
  );
}
