"use client";

import { useContent } from "@/components/ContentContext";
import { useLead } from "@/components/LeadContext";
import { Reveal } from "@/components/Reveal";
import { IconArrowRight, IconAward, IconCheck } from "@/components/Icons";

export function Students() {
  const { content: c } = useContent();
  const s = c.students;
  const { openLead } = useLead();

  return (
    <section id="students" className="section-pad pt-0">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-[2.7rem]">
                {s.heading}
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-500">{s.sub}</p>
            </Reveal>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {s.list.map((item: string, i: number) => (
                <Reveal as="li" key={item} delay={160 + i * 60}>
                  <div className="card-soft-inset flex items-start gap-3 rounded-xl p-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white">
                      <IconCheck size={13} />
                    </span>
                    <p className="text-sm leading-snug text-ink-700">{item}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={620}>
              <button
                type="button"
                onClick={() => openLead("volunteer")}
                className="btn btn-primary btn-lg mt-9"
              >
                {s.cta}
                <IconArrowRight size={18} />
              </button>
            </Reveal>
          </div>

          {/* certificate mock */}
          <Reveal delay={250}>
            <div className="relative mx-auto max-w-[440px]">
              <div className="absolute inset-0 translate-x-4 translate-y-5 rounded-[2rem] bg-cream-200/80" />
              <div className="absolute inset-0 -translate-x-3 translate-y-2.5 rounded-[2rem] bg-teal-100/70" />
              <div className="card-soft relative -rotate-2 rounded-[2rem] p-8 transition-transform duration-500 hover:rotate-0">
                <div className="flex items-center justify-between">
                  <span className="chip chip-teal">FairGuide</span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600 shadow-soft-inset-sm">
                    <IconAward size={24} />
                  </span>
                </div>
                <div className="mt-7 text-center">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-400">
                    {s.certName}
                  </p>
                  <p className="mt-3 font-display text-2xl font-bold leading-snug text-ink-900">
                    {s.certTitle}
                  </p>
                  <div className="mx-auto mt-5 h-px w-24 bg-cream-300" />
                  <p className="mt-5 text-sm text-ink-500">{s.certText}</p>
                </div>
                <div className="mt-7 flex items-end justify-between">
                  <div>
                    <div className="h-1 w-28 rounded bg-cream-300" />
                    <p className="mt-2 text-[10px] uppercase tracking-wider text-ink-400">Signature</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed border-teal-300 text-teal-600">
                    <IconAward size={16} />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
