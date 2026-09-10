"use client";

import { useContent } from "@/components/ContentContext";
import { Reveal } from "@/components/Reveal";
import {
  IconBadgeCheck,
  IconChat,
  IconEye,
  IconInfo,
  IconLock,
  IconShieldCheck,
} from "@/components/Icons";

const ICONS = [IconBadgeCheck, IconEye, IconLock, IconShieldCheck, IconChat, IconInfo];

export function TrustSafety() {
  const { content: c } = useContent();
  const t = c.trust;

  return (
    <section id="trust" className="section-pad">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow">{t.eyebrow}</span>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-[2.7rem]">
              {t.heading}
            </h2>
          </Reveal>
          <Reveal delay={170}>
            <p className="mt-5 text-lg leading-relaxed text-ink-500">{t.sub}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((item: any, i: number) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={item.title} delay={(i % 3) * 110}>
                <div className="card-soft group h-full rounded-[1.8rem] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cream-100 text-teal-600 shadow-soft-inset-sm transition-colors duration-500 group-hover:bg-teal-600 group-hover:text-white">
                    <Icon size={23} />
                  </div>
                  <h3 className="mt-5 font-display text-[17px] font-bold text-ink-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{item.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={150}>
          <p className="mx-auto mt-10 max-w-xl text-center text-sm leading-relaxed text-ink-400">{t.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
