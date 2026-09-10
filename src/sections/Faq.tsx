"use client";

import { useState } from "react";
import { useContent } from "@/components/ContentContext";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";
import { IconPlus } from "@/components/Icons";

export function Faq() {
  const { content: c } = useContent();
  const f = c.faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-pad">
      <div className="container-x max-w-4xl">
        <div className="text-center">
          <Reveal>
            <span className="eyebrow">{f.eyebrow}</span>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-ink-900 sm:text-4xl">
              {f.heading}
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 text-lg text-ink-500">{f.sub}</p>
          </Reveal>
        </div>

        <div className="mt-12 space-y-4">
          {f.items.map((item: any, i: number) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 70}>
                <div className={cn("card-soft rounded-2xl transition-shadow duration-300", isOpen && "shadow-lift")}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-display text-[16px] font-semibold text-ink-900">{item.q}</span>
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream-100 text-teal-700 shadow-soft-inset-sm transition-transform duration-300",
                        isOpen && "rotate-45 bg-teal-600 text-white"
                      )}
                    >
                      <IconPlus size={15} />
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-400 ease-out",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-[15px] leading-relaxed text-ink-500">{item.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
