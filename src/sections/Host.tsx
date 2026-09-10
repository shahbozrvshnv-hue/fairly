"use client";

import { useContent } from "@/components/ContentContext";
import { useLead } from "@/components/LeadContext";
import { Reveal } from "@/components/Reveal";
import { IconArrowRight, IconHome, IconMapPin, IconTag, IconUsers, IconClock } from "@/components/Icons";

const ROW_ICONS = [IconMapPin, IconClock, IconUsers, IconHome, IconTag];

export function Host() {
  const { content: c } = useContent();
  const h = c.host;
  const ex = h.example;
  const { openLead } = useLead();

  return (
    <section id="host" className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute -right-32 top-10 h-[380px] w-[380px] rounded-full bg-amber-100/60 blur-3xl" />
      <div className="container-x relative">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="chip chip-amber mb-4">{h.badge}</span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-[2.7rem]">
                {h.heading}
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-500">{h.sub}</p>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {h.steps.map((s: any, i: number) => (
                <Reveal key={s.title} delay={220 + i * 100}>
                  <div className="card-soft group h-full rounded-[1.7rem] p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-600 font-display text-base font-bold text-white shadow-glow-teal">
                      {s.num}
                    </div>
                    <h3 className="mt-4 font-display text-[17px] font-bold text-ink-900">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={300}>
              <div className="lg:sticky lg:top-28">
                <div className="card-soft rounded-[2rem] p-7">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-lg font-bold text-ink-900">{ex.title}</h3>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600 shadow-soft-inset-sm">
                      <IconHome size={19} />
                    </span>
                  </div>

                  <dl className="mt-6 space-y-4">
                    {(ex.rows ?? []).map((row: any, i: number) => {
                      const RowIcon = ROW_ICONS[i % ROW_ICONS.length];
                      return (
                        <div key={row.label} className="flex items-center justify-between gap-3">
                          <dt className="flex items-center gap-2.5 text-sm text-ink-500">
                            <RowIcon size={15} className="text-teal-600" />
                            {row.label}
                          </dt>
                          <dd className="font-semibold text-ink-900">
                            {row.highlight ? <span className="chip chip-amber">{row.value}</span> : row.value}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>

                  <button
                    type="button"
                    onClick={() => openLead("host")}
                    className="btn btn-primary btn-lg mt-6 w-full"
                  >
                    {h.cta}
                    <IconArrowRight size={18} />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
