"use client";

import Link from "next/link";
import { pathFor } from "@/lib/locales";
import { useContent } from "@/components/ContentContext";
import { Reveal } from "@/components/Reveal";
import { IconArrowRight, IconBadgeCheck, IconClock, IconMapPin, IconStar } from "@/components/Icons";

export function Guides() {
  const { content: c, locale } = useContent();
  const g = c.guides;
  const p = (href: string) => pathFor(locale, href);

  return (
    <section id="guides" className="section-pad">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <span className="eyebrow">{g.eyebrow}</span>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-[2.7rem]">
                {g.heading}
              </h2>
            </Reveal>
            <Reveal delay={170}>
              <p className="mt-5 text-lg leading-relaxed text-ink-500">{g.sub}</p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {g.cards.map((card: any, i: number) => (
            <Reveal key={card.name} delay={i * 130}>
              <article className="card-soft group h-full rounded-[1.9rem] p-3 transition-all duration-500 hover:-translate-y-2 hover:shadow-lift">
                <div className="relative overflow-hidden rounded-[1.5rem]">
                  <img
                    src={card.image}
                    alt={card.imageAlt || card.name}
                    width={480}
                    height={600}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/30 via-transparent to-transparent" />
                  <span className="chip absolute left-3.5 top-3.5 border-0 bg-white/95 text-teal-700 shadow-soft-sm backdrop-blur">
                    <IconBadgeCheck size={14} />
                    {card.verified}
                  </span>
                </div>
                <div className="px-3 pb-3 pt-5">
                  <h3 className="font-display text-lg font-bold text-ink-900">{card.name}</h3>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {card.languages.split("·").map((l: string) => (
                      <span key={l.trim()} className="chip chip-teal !px-2.5 !text-[10px] tracking-wide">
                        {l.trim()}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3 text-[13px] text-ink-500">
                    <span className="flex items-center gap-1.5">
                      <IconMapPin size={14} className="text-teal-600" />
                      {card.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <IconClock size={14} className="text-teal-600" />
                      {card.experience}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-ink-800">
                      <IconStar size={14} className="text-amber-500" />
                      {card.rating}
                    </span>
                  </div>
                  <div className="mt-4 border-t border-cream-200 pt-4">
                    <p className="font-display text-[15px] font-bold text-teal-700">{card.priceFrom}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-12 flex justify-center">
            <Link href={p("/for-tourists")} className="btn btn-primary btn-lg">
              {g.cta}
              <IconArrowRight size={18} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
