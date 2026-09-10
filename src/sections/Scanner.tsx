"use client";

import { useState } from "react";
import Link from "next/link";
import { pathFor } from "@/lib/locales";
import { useContent } from "@/components/ContentContext";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";
import {
  IconArrowRight,
  IconBarcode,
  IconCamera,
  IconCheckCircle,
  IconInfo,
  IconScan,
  IconTag,
} from "@/components/Icons";
import { LogoMark } from "@/components/Logo";

export function PhoneMockup() {
  const { content: c } = useContent();
  const ph = c.scanner.phone;
  const tabs = [
    { icon: IconBarcode, label: ph.tab1 },
    { icon: IconScan, label: ph.tab2 },
    { icon: IconTag, label: ph.tab3 },
    { icon: IconCamera, label: ph.tab4 },
  ];
  const [active, setActive] = useState(1);

  return (
    <div className="relative mx-auto w-[290px] sm:w-[320px]">
      {/* glow behind the phone */}
      <div className="pointer-events-none absolute -inset-10 rounded-full bg-teal-500/20 blur-3xl" />

      <div className="card-dark relative rounded-[3rem] p-3">
        <div className="overflow-hidden rounded-[2.5rem] bg-night-950">
          {/* status bar / notch */}
          <div className="flex items-center justify-between px-6 pb-1 pt-3.5">
            <span className="text-[10px] font-semibold text-ink-300">9:41</span>
            <span className="h-4 w-20 rounded-full bg-night-800" />
            <span className="flex gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400/60" />
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400/30" />
            </span>
          </div>

          <div className="px-4 pb-5 pt-2">
            {/* app header */}
            <div className="flex items-center gap-2.5 px-1">
              <LogoMark size={26} />
              <span className="font-display text-sm font-bold text-white">{ph.title}</span>
            </div>

            {/* scan viewport */}
            <div className="card-dark-inset relative mt-4 overflow-hidden rounded-2xl">
              <img
                src="/images/product.jpg"
                alt={ph.productName}
                width={560}
                height={560}
                loading="lazy"
                className="aspect-square w-full object-cover opacity-95"
              />
              {/* corner brackets */}
              <div className="pointer-events-none absolute left-3 top-3 h-7 w-7 rounded-tl-lg border-l-[2.5px] border-t-[2.5px] border-teal-300" />
              <div className="pointer-events-none absolute right-3 top-3 h-7 w-7 rounded-tr-lg border-r-[2.5px] border-t-[2.5px] border-teal-300" />
              <div className="pointer-events-none absolute bottom-3 left-3 h-7 w-7 rounded-bl-lg border-b-[2.5px] border-l-[2.5px] border-teal-300" />
              <div className="pointer-events-none absolute bottom-3 right-3 h-7 w-7 rounded-br-lg border-b-[2.5px] border-r-[2.5px] border-teal-300" />
              {/* scan line */}
              <div className="anim-scan pointer-events-none absolute inset-x-6 h-[2px] rounded-full bg-teal-300 shadow-[0_0_16px_2px_rgba(140,207,190,0.8)]" />
            </div>

            {/* scan mode tabs */}
            <div className="mt-3.5 grid grid-cols-4 gap-1.5">
              {tabs.map((t, i) => (
                <button
                  key={t.label}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-xl px-1 py-2.5 transition-all duration-300",
                    active === i
                      ? "bg-teal-600 text-white shadow-glow-teal"
                      : "bg-night-800 text-ink-300 shadow-dark-inset hover:text-teal-300"
                  )}
                >
                  <t.icon size={16} />
                  <span className="w-full truncate text-center text-[9px] font-semibold leading-tight">{t.label}</span>
                </button>
              ))}
            </div>

            {/* result card */}
            <div className="card-dark-inset mt-3.5 rounded-2xl p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-[13px] font-semibold text-white">{ph.productName}</p>
                <span className="chip border-0 bg-night-800 !text-[9px] text-teal-300">FairGuide</span>
              </div>
              <div className="mt-3 space-y-2 text-[11px]">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-ink-300">{ph.refLabel}</span>
                  <span className="font-semibold text-teal-300">{ph.refPrice}</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-ink-300">{ph.repLabel}</span>
                  <span className="font-semibold text-amber-300">{ph.repPrice}</span>
                </div>
              </div>
              <div className="mt-3 flex items-end justify-between gap-2 border-t border-white/10 pt-3">
                <span className="text-[10px] font-medium uppercase tracking-wider text-ink-300">{ph.diffLabel}</span>
                <span className="font-display text-lg font-bold leading-none text-amber-400">{ph.diffValue}</span>
              </div>
              <div className="mt-3 flex items-start gap-2 rounded-xl bg-amber-500/10 px-3 py-2.5">
                <IconInfo size={14} className="mt-0.5 shrink-0 text-amber-400" />
                <span className="text-[10.5px] font-medium leading-snug text-amber-200">{ph.indicator}</span>
              </div>
              <p className="mt-3 text-center text-[9.5px] text-ink-400">{ph.note}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Scanner() {
  const { content: c, locale } = useContent();
  const s = c.scanner;
  const p = (href: string) => pathFor(locale, href);

  return (
    <section id="scanner" className="relative overflow-hidden bg-night-950 py-20 md:py-28">
      {/* ambient glows */}
      <div className="pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-teal-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[380px] w-[380px] rounded-full bg-amber-500/10 blur-3xl" />

      <div className="container-x relative">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="eyebrow-dark">{s.eyebrow}</span>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.9rem]">
                {s.heading}
              </h2>
            </Reveal>
            <Reveal delay={170}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-300">{s.sub}</p>
            </Reveal>
            <div className="mt-8 space-y-3.5">
              {s.bullets.map((b: string, i: number) => (
                <Reveal key={b} delay={230 + i * 90}>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-600/20 text-teal-300">
                      <IconCheckCircle size={15} />
                    </span>
                    <p className="text-[15px] leading-relaxed text-cream-200">{b}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={520}>
              <Link href={p("/for-tourists")} className="btn btn-amber btn-lg mt-10">
                {s.cta}
                <IconArrowRight size={18} />
              </Link>
            </Reveal>
            <Reveal delay={580}>
              <p className="mt-6 max-w-xl text-xs leading-relaxed text-ink-400">{s.disclaimer}</p>
            </Reveal>
          </div>

          <Reveal delay={250}>
            <PhoneMockup />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
