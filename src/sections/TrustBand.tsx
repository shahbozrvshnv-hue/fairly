"use client";

import { useContent } from "@/components/ContentContext";
import { Reveal } from "@/components/Reveal";

export function TrustBand() {
  const { content: c } = useContent();
  const t = c.trustBand;
  const values = [t.v1, t.v2, t.v3];

  return (
    <section className="relative py-14 md:py-20">
      <div className="container-x">
        <Reveal>
          <p className="mx-auto max-w-3xl text-center font-display text-2xl font-semibold leading-snug tracking-tight text-ink-800 sm:text-[1.9rem]">
            “{t.text}”
          </p>
        </Reveal>
        <Reveal delay={140}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-0">
            {values.map((v, i) => (
              <div key={v} className="flex items-center gap-4 sm:gap-0">
                <span className="font-display text-sm font-bold uppercase tracking-[0.28em] text-teal-700">
                  {v}
                </span>
                {i < values.length - 1 && (
                  <span className="mx-4 hidden h-1.5 w-1.5 rounded-full bg-amber-400 sm:block" aria-hidden />
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
