"use client";

import { useContent } from "@/components/ContentContext";
import { Reveal } from "@/components/Reveal";

export function HowItWorks() {
  const { content: c } = useContent();
  const h = c.how;

  return (
    <section id="how-it-works" className="section-pad">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow">{h.eyebrow}</span>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-[2.7rem]">
              {h.heading}
            </h2>
          </Reveal>
          <Reveal delay={170}>
            <p className="mt-5 text-lg leading-relaxed text-ink-500">{h.sub}</p>
          </Reveal>
        </div>

        <div className="relative mt-16">
          <div
            className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-cream-300 to-transparent lg:block"
            aria-hidden
          />
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {h.steps.map((s: any, i: number) => (
              <Reveal key={s.num} delay={i * 120}>
                <div className="relative text-center lg:text-left">
                  <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cream-50 shadow-soft lg:mx-0">
                    <span className="font-display text-lg font-bold text-teal-700">{s.num}</span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-ink-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
