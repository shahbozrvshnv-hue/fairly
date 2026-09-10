"use client";

import Link from "next/link";
import { pathFor } from "@/lib/locales";
import { useContent } from "@/components/ContentContext";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";
import {
  IconArrowUpRight,
  IconCompass,
  IconHeart,
  IconScan,
  IconUsers,
} from "@/components/Icons";

const ICONS = [IconUsers, IconScan, IconCompass, IconHeart];

export function Platform() {
  const { content: c, locale } = useContent();
  const pl = c.platform;
  const p = (href: string) => pathFor(locale, href);

  return (
    <section id="platform" className="section-pad">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-[2.7rem]">
              {pl.heading}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-5 text-lg leading-relaxed text-ink-500">{pl.sub}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pl.cards.map((card: any, i: number) => {
            const Icon = ICONS[i % ICONS.length];
            const comingSoon = /soon|скоро|yakinda|yqinda| upcoming/i.test(card.tag ?? "") ||
              i >= 2; // platform cards 3-4 are planned features
            const href = card.link?.startsWith("#") ? p("/") + card.link : p(card.link || "/");
            return (
              <Reveal key={card.title} delay={i * 110}>
                <Link
                  href={href}
                  className="card-soft group flex h-full flex-col rounded-[1.9rem] p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-lift"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cream-100 text-teal-600 shadow-soft-inset-sm transition-all duration-500 group-hover:bg-teal-600 group-hover:text-white">
                      <Icon size={26} />
                    </div>
                    <span
                      className={cn(
                        "chip",
                        comingSoon ? "chip-amber" : "chip-teal"
                      )}
                    >
                      {card.tag}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold text-ink-900">{card.title}</h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-500">{card.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 transition-all duration-300 group-hover:gap-2.5">
                    {pl.more}
                    <IconArrowUpRight size={15} />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
