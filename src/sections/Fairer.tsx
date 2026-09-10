"use client";

import { useContent } from "@/components/ContentContext";
import { Reveal } from "@/components/Reveal";
import { IconHeart, IconScan, IconUsers } from "@/components/Icons";

const ICONS = [IconUsers, IconScan, IconHeart];

export function Fairer() {
  const { content: c } = useContent();
  const f = c.fairer;

  return (
    <section id="fairer" className="section-pad">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow">{f.eyebrow}</span>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-[2.7rem]">
              {f.heading}
            </h2>
          </Reveal>
          <Reveal delay={170}>
            <p className="mt-5 text-lg leading-relaxed text-ink-500">{f.sub}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {f.pillars.map((p: any, i: number) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={p.title} delay={i * 120}>
                <div className="card-soft group h-full rounded-[1.8rem] p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 shadow-soft-inset-sm transition-colors duration-500 group-hover:bg-teal-600 group-hover:text-white">
                    <Icon size={26} />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold text-ink-900">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-500">{p.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
