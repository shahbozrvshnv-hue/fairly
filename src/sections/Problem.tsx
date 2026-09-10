"use client";

import { useContent } from "@/components/ContentContext";
import { Reveal } from "@/components/Reveal";
import { IconInfo } from "@/components/Icons";

export function Problem() {
  const { content: c } = useContent();
  const p = c.problem;

  return (
    <section id="problem" className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute right-0 top-1/4 h-[360px] w-[360px] rounded-full bg-amber-100/50 blur-3xl" />
      <div className="container-x relative">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="eyebrow">{p.eyebrow}</span>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-[2.7rem]">
                {p.heading}
              </h2>
            </Reveal>
            <Reveal delay={170}>
              <p className="mt-6 text-lg font-medium leading-relaxed text-ink-700">{p.lede}</p>
            </Reveal>
            <Reveal delay={230}>
              <p className="mt-4 leading-relaxed text-ink-500">{p.p1}</p>
            </Reveal>
            <Reveal delay={290}>
              <p className="mt-4 leading-relaxed text-ink-500">{p.p2}</p>
            </Reveal>
            <Reveal delay={350}>
              <div className="card-soft-inset mt-7 flex gap-3.5 rounded-2xl p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                  <IconInfo size={18} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">{p.nuanceLabel}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{p.nuance}</p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="relative mx-auto max-w-[520px]">
              <div className="card-soft overflow-hidden rounded-[2rem] p-3">
                <img
                  src={p.image}
                  alt={p.imageAlt}
                  width={1040}
                  height={780}
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-[1.5rem] object-cover"
                />
              </div>

              {/* price comparison card */}
              <div className="card-dark relative -mt-16 mx-4 rounded-[1.8rem] p-6 sm:mx-8 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-ink-300">{p.exActualLabel}</p>
                    <p className="mt-1 font-display text-xl font-bold text-teal-300">{p.exActual}</p>
                  </div>
                  <div className="min-w-0 text-right">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-ink-300">{p.exPresentedLabel}</p>
                    <p className="mt-1 font-display text-xl font-bold text-amber-300">{p.exPresented}</p>
                  </div>
                </div>
                <div className="my-4 h-px bg-white/10" />
                <div className="flex items-end justify-between gap-3">
                  <p className="text-xs font-medium uppercase tracking-wider text-ink-300">{p.exDiffLabel}</p>
                  <p className="font-display text-2xl font-bold text-amber-400 sm:text-3xl">{p.exDiff}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
