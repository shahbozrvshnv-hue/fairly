"use client";

import { useContent } from "@/components/ContentContext";
import { useLead } from "@/components/LeadContext";
import { Reveal } from "@/components/Reveal";
import { Parallax } from "@/components/Parallax";
import { IconArrowRight } from "@/components/Icons";

export function FinalCta() {
  const { content: c, locale } = useContent();
  const fc = c.finalCta;
  const { openLead } = useLead();
  const p = (href: string) =>
    locale === "en" ? href : `/${locale}${href === "/" ? "" : href}`;

  return (
    <section id="get-started" className="section-pad pt-0">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-lift">
            <div className="absolute inset-0">
              <Parallax factor={0.07} className="h-full w-full">
                <img
                  src={fc.image}
                  alt={fc.imageAlt}
                  width={1600}
                  height={900}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </Parallax>
              <div className="absolute inset-0 bg-gradient-to-r from-night-950/85 via-night-950/60 to-night-950/40" />
            </div>
            <div className="relative px-7 py-20 sm:px-14 md:py-28">
              <div className="max-w-2xl">
                <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[3rem]">
                  {fc.heading}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-cream-200/90">{fc.sub}</p>
                <div className="mt-10 flex flex-col gap-3.5 sm:flex-row">
                  <a href={p("/") + "#explore"} className="btn btn-amber btn-lg">
                    {fc.primary}
                    <IconArrowRight size={18} />
                  </a>
                  <button type="button" onClick={() => openLead("join")} className="btn btn-white btn-lg">
                    {fc.secondary}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
