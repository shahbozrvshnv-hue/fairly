"use client";

import Link from "next/link";
import { pathFor } from "@/lib/locales";
import { useContent } from "@/components/ContentContext";
import { Reveal } from "@/components/Reveal";
import { Parallax } from "@/components/Parallax";
import { IconArrowRight, IconQuote } from "@/components/Icons";

export function Vision() {
  const { content: c, locale } = useContent();
  const v = c.vision;
  const p = (href: string) => pathFor(locale, href);

  return (
    <section id="vision" className="section-pad pt-0">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal delay={150}>
            <div className="card-soft relative mx-auto max-w-[540px] overflow-hidden rounded-[2.2rem] p-3">
              <div className="overflow-hidden rounded-[1.7rem]">
                <Parallax factor={0.05}>
                  <img
                    src={v.image}
                    alt={v.imageAlt}
                    width={1080}
                    height={840}
                    loading="lazy"
                    className="aspect-[5/4] w-full object-cover"
                  />
                </Parallax>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="eyebrow">{v.eyebrow}</span>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-[2.7rem]">
                {v.heading}
              </h2>
            </Reveal>
            <Reveal delay={170}>
              <div className="relative mt-7">
                <span className="absolute -left-2 -top-4 text-teal-200">
                  <IconQuote size={56} />
                </span>
                <p className="relative pl-8 font-display text-xl font-semibold leading-relaxed text-teal-800 sm:text-[1.35rem]">
                  {v.quote}
                </p>
              </div>
            </Reveal>
            <Reveal delay={250}>
              <p className="mt-6 leading-relaxed text-ink-500">{v.p1}</p>
            </Reveal>
            <Reveal delay={310}>
              <p className="mt-4 leading-relaxed text-ink-500">{v.p2}</p>
            </Reveal>
            <Reveal delay={370}>
              <Link href={p("/about")} className="btn btn-soft btn-md mt-8">
                {c.nav.about}
                <IconArrowRight size={16} />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
