"use client";

import { useContent } from "@/components/ContentContext";
import { useLead } from "@/components/LeadContext";
import { Reveal } from "@/components/Reveal";
import { TilePattern } from "@/components/TilePattern";
import { IconArrowRight, IconCheckCircle } from "@/components/Icons";

export function GuideCta() {
  const { content: c } = useContent();
  const g = c.guideCta;
  const { openLead } = useLead();

  return (
    <section id="guides-cta" className="section-pad pt-0">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.4rem] bg-teal-700 px-7 py-12 text-white shadow-lift sm:px-12 md:py-16">
            <TilePattern className="text-white" opacity={0.14} />
            <div className="pointer-events-none absolute -right-24 -top-24 h-[320px] w-[320px] rounded-full bg-teal-500/40 blur-3xl" />
            <div className="relative grid items-center gap-10 lg:grid-cols-2">
              <div>
                <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                  {g.heading}
                </h2>
                <p className="mt-5 max-w-xl leading-relaxed text-teal-100">{g.sub}</p>
                <button
                  type="button"
                  onClick={() => openLead("guide")}
                  className="btn btn-amber btn-lg mt-8"
                >
                  {g.cta}
                  <IconArrowRight size={18} />
                </button>
              </div>
              <ul className="space-y-4">
                {g.bullets.map((b: string, i: number) => (
                  <Reveal as="li" key={b} delay={150 + i * 100}>
                    <div className="flex items-start gap-3.5 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15 text-teal-100">
                        <IconCheckCircle size={16} />
                      </span>
                      <p className="text-[15px] leading-relaxed text-teal-50">{b}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
