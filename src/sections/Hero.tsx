"use client";

import Link from "next/link";
import { pathFor } from "@/lib/locales";
import { useContent } from "@/components/ContentContext";
import { Reveal } from "@/components/Reveal";
import { Parallax } from "@/components/Parallax";
import { IconArrowRight, IconBadgeCheck, IconScan, IconStar } from "@/components/Icons";

export function Hero() {
  const { content: c, locale } = useContent();
  const h = c.hero;
  const p = (href: string) => pathFor(locale, href);
  const avatars = c.guides.cards.slice(0, 3);

  return (
    <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
      {/* soft ambient tints */}
      <div className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-teal-100/80 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-[380px] w-[380px] rounded-full bg-amber-100/70 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-cream-200/60 blur-3xl" />

      <div className="container-x relative">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <span className="eyebrow">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                {h.badge}
              </span>
            </Reveal>
            <Reveal delay={90}>
              <h1 className="mt-6 font-display text-[2.6rem] font-bold leading-[1.06] tracking-tight text-ink-900 sm:text-5xl xl:text-[3.9rem]">
                {h.heading}
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-500">{h.sub}</p>
            </Reveal>
            <Reveal delay={270}>
              <div className="mt-9 flex flex-col gap-3.5 sm:flex-row">
                <a href={p("/") + "#explore"} className="btn btn-primary btn-lg">
                  {h.ctaPrimary}
                  <IconArrowRight size={18} />
                </a>
                <Link href={p("/for-guides")} className="btn btn-soft btn-lg">
                  {h.ctaSecondary}
                </Link>
              </div>
            </Reveal>
            <Reveal delay={360}>
              <div className="mt-10 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {avatars.map((g: any) => (
                    <img
                      key={g.name}
                      src={g.image}
                      alt=""
                      width={40}
                      height={40}
                      loading="lazy"
                      className="h-10 w-10 rounded-full border-2 border-cream-50 object-cover shadow-soft-sm"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-amber-500">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <IconStar key={i} size={13} />
                    ))}
                    <span className="ml-1 text-xs font-semibold text-ink-700">4.9</span>
                  </div>
                  <p className="mt-1 text-xs font-medium text-ink-500">{h.trustLine}</p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={200}>
              <div className="relative mx-auto max-w-[560px]">
                <div className="card-soft rounded-[2.2rem] p-3">
                  <div className="relative overflow-hidden rounded-[1.7rem]">
                    <Parallax factor={0.06}>
                      <img
                        src={h.image}
                        alt={h.imageAlt}
                        width={1120}
                        height={840}
                        fetchPriority="high"
                        className="anim-kenburns aspect-[4/3] w-full object-cover"
                      />
                    </Parallax>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/25 via-transparent to-transparent" />
                  </div>
                </div>

                {/* floating verification card */}
                <div className="anim-float absolute -left-3 top-8 sm:-left-8">
                  <div className="card-soft flex items-center gap-3 rounded-2xl py-3 pl-3 pr-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600 shadow-soft-inset-sm">
                      <IconBadgeCheck size={22} />
                    </span>
                    <span>
                      <span className="block text-[11px] font-medium uppercase tracking-wider text-ink-400">
                        {h.float1Title}
                      </span>
                      <span className="mt-0.5 block text-sm font-semibold text-ink-900">{h.float1Text}</span>
                    </span>
                  </div>
                </div>

                {/* floating price-check card */}
                <div className="anim-float-2 absolute -right-2 bottom-8 sm:-right-7">
                  <div className="card-soft rounded-2xl py-3 pl-3 pr-5">
                    <span className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 shadow-soft-inset-sm">
                        <IconScan size={20} />
                      </span>
                      <span>
                        <span className="block text-[11px] font-medium uppercase tracking-wider text-ink-400">
                          {h.float2Title}
                        </span>
                        <span className="mt-0.5 block text-sm font-semibold text-ink-900">{h.float2Text}</span>
                      </span>
                    </span>
                    <span className="chip chip-teal mt-2.5 !text-[10px]">{h.float2Badge}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
