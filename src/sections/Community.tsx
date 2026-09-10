"use client";

import { useContent } from "@/components/ContentContext";
import { Reveal } from "@/components/Reveal";
import { TilePattern } from "@/components/TilePattern";
import { cn } from "@/lib/cn";

const TINTS = [
  "text-teal-600 bg-teal-50/70",
  "text-amber-600 bg-amber-50/70",
  "text-teal-700 bg-teal-50/60",
  "text-amber-700 bg-amber-50/60",
  "text-teal-600 bg-cream-100",
  "text-amber-600 bg-cream-100",
];

export function Community() {
  const { content: c } = useContent();
  const cm = c.community;

  return (
    <section id="explore" className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-teal-100/50 blur-3xl" />
      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow">{cm.eyebrow}</span>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-[2.7rem]">
              {cm.heading}
            </h2>
          </Reveal>
          <Reveal delay={170}>
            <p className="mt-5 text-lg leading-relaxed text-ink-500">{cm.sub}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cm.places.map((place: any, i: number) => (
            <Reveal key={place.name} delay={(i % 3) * 110}>
              <article
                className={cn(
                  "group relative h-full overflow-hidden rounded-[1.9rem] p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift",
                  TINTS[i % TINTS.length]
                )}
              >
                <TilePattern className="text-current transition-opacity duration-500 group-hover:opacity-90" opacity={0.16} />
                {place.image ? (
                  <div className="relative">
                    <img
                      src={place.image}
                      alt={place.name}
                      width={640}
                      height={420}
                      loading="lazy"
                      className="h-44 w-full rounded-2xl object-cover shadow-soft-sm"
                    />
                    <div className="relative mt-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-70">{place.localName}</p>
                      <h3 className="mt-1 font-display text-2xl font-bold text-ink-900">{place.name}</h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-ink-700">{place.caption}</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative flex h-full min-h-[220px] flex-col justify-between">
                    <span className="font-display text-5xl font-bold leading-none text-ink-900/90">
                      {place.name}
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-60">
                        {place.localName}
                      </p>
                      <p className="mt-2.5 text-sm leading-relaxed text-ink-700">{place.caption}</p>
                    </div>
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <p className="mx-auto mt-14 max-w-2xl text-center font-display text-xl font-semibold leading-relaxed text-ink-700 sm:text-2xl">
            {cm.message}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
