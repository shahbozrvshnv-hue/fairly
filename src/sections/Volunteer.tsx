"use client";

import { useContent } from "@/components/ContentContext";
import { useLead } from "@/components/LeadContext";
import { Reveal } from "@/components/Reveal";
import { IconArrowRight, IconAward, IconCheckCircle, IconUsers } from "@/components/Icons";

export function Volunteer() {
  const { content: c } = useContent();
  const v = c.volunteer;
  const { openLead } = useLead();

  return (
    <section id="volunteer" className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[380px] w-[380px] rounded-full bg-teal-100/60 blur-3xl" />
      <div className="container-x relative">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal delay={150} className="order-2 lg:order-1">
            <div className="relative mx-auto max-w-[520px]">
              <div className="card-soft overflow-hidden rounded-[2rem] p-3">
                <img
                  src={v.image}
                  alt={v.imageAlt}
                  width={1040}
                  height={840}
                  loading="lazy"
                  className="aspect-[5/4] w-full rounded-[1.5rem] object-cover"
                />
              </div>
              <div className="anim-float absolute -right-3 top-8 sm:-right-6">
                <div className="card-soft flex items-center gap-3 rounded-2xl py-3 pl-3 pr-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 shadow-soft-inset-sm">
                    <IconAward size={20} />
                  </span>
                  <span className="text-sm font-semibold text-ink-900">
                    10+
                    <span className="block text-[11px] font-medium text-ink-500">verified sessions</span>
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="chip chip-amber mb-4">{v.badge}</span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-[2.7rem]">
                {v.heading}
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 text-lg leading-relaxed text-ink-500">{v.sub}</p>
            </Reveal>

            <div className="mt-7 space-y-3">
              {v.points.map((pt: string, i: number) => (
                <Reveal key={pt} delay={220 + i * 80}>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                      <IconCheckCircle size={15} />
                    </span>
                    <p className="text-[15px] leading-relaxed text-ink-700">{pt}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* progression */}
            <Reveal delay={480}>
              <div className="card-soft-inset mt-8 rounded-2xl p-5">
                <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
                  {v.steps.map((step: string, i: number) => (
                    <li key={step} className="flex items-center gap-2">
                      <span className="chip border border-teal-100 bg-white/70 px-3 py-1.5 text-[11px] text-teal-800">
                        {step}
                      </span>
                      {i < v.steps.length - 1 && (
                        <IconArrowRight size={13} className="text-ink-300" aria-hidden />
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            {/* milestone */}
            <Reveal delay={560}>
              <div className="card-soft mt-5 rounded-2xl p-6">
                <span className="chip chip-amber">
                  <IconAward size={13} />
                  {v.ministryLabel}
                </span>
                <p className="mt-3.5 text-[15px] leading-relaxed text-ink-700">
                  <strong className="font-semibold text-ink-900">{v.milestoneTitle}</strong> {v.milestoneDesc}
                </p>
                <p className="mt-2.5 text-xs leading-relaxed text-ink-400">{v.ministryNote}</p>
              </div>
            </Reveal>

            <Reveal delay={620}>
              <button
                type="button"
                onClick={() => openLead("volunteer")}
                className="btn btn-primary btn-lg mt-8"
              >
                {v.cta}
                <IconArrowRight size={18} />
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
