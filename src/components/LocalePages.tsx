import type { ReactNode } from "react";
import { PageHero } from "./PageHero";
import { Reveal } from "./Reveal";
import { TilePattern } from "./TilePattern";
import { HowItWorks } from "@/sections/HowItWorks";
import { Fairer } from "@/sections/Fairer";
import { Scanner } from "@/sections/Scanner";
import { Guides } from "@/sections/Guides";
import { GuideCta } from "@/sections/GuideCta";
import { Volunteer } from "@/sections/Volunteer";
import { Students } from "@/sections/Students";
import { Host } from "@/sections/Host";
import { TrustSafety } from "@/sections/TrustSafety";
import { Faq } from "@/sections/Faq";
import { Vision } from "@/sections/Vision";
import { FinalCta } from "@/sections/FinalCta";

export type PageKey =
  | "howItWorks"
  | "forTourists"
  | "forGuides"
  | "volunteer"
  | "host"
  | "about"
  | "privacy"
  | "terms";

/** Renders a full secondary page for the given merged locale content. */
export function renderPageBody(key: PageKey, c: Record<string, any>): ReactNode {
  const page = c.pages[key];
  switch (key) {
    case "howItWorks":
      return (
        <>
          <PageHero eyebrow={c.site.name} title={page.title} sub={page.sub} intro={page.intro} />
          <HowItWorks />
          <Faq />
          <FinalCta />
        </>
      );
    case "forTourists":
      return (
        <>
          <PageHero eyebrow={c.site.name} title={page.title} sub={page.sub} intro={page.intro} />
          <Fairer />
          <Scanner />
          <TrustSafety />
          <Faq />
          <FinalCta />
        </>
      );
    case "forGuides":
      return (
        <>
          <PageHero eyebrow={c.site.name} title={page.title} sub={page.sub} intro={page.intro} />
          <Guides />
          <GuideCta />
          <TrustSafety />
          <FinalCta />
        </>
      );
    case "volunteer":
      return (
        <>
          <PageHero eyebrow={c.site.name} title={page.title} sub={page.sub} intro={page.intro} />
          <Volunteer />
          <Students />
          <FinalCta />
        </>
      );
    case "host":
      return (
        <>
          <PageHero eyebrow={c.site.name} title={page.title} sub={page.sub} intro={page.intro} />
          <Host />
          <FinalCta />
        </>
      );
    case "about":
      return (
        <>
          <PageHero eyebrow={c.site.name} title={page.title} sub={page.sub} intro={page.intro} />
          <section className="pb-8">
            <div className="container-x">
              <Reveal>
                <div className="card-soft relative overflow-hidden rounded-[2rem] p-8 sm:p-10">
                  <TilePattern className="text-teal-600" opacity={0.1} />
                  <h2 className="relative font-display text-xl font-bold text-ink-900">{page.valuesTitle}</h2>
                  <div className="relative mt-6 flex flex-wrap gap-3">
                    {(page.values ?? []).map((v: string, i: number) => (
                      <Reveal key={v} delay={i * 80}>
                        <span className="chip border border-teal-100 bg-white/70 px-5 py-2.5 text-sm text-teal-800">
                          {v}
                        </span>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
          <Vision />
          <TrustSafety />
          <FinalCta />
        </>
      );
    case "privacy":
    case "terms":
      return (
        <>
          <PageHero eyebrow={c.site.name} title={page.title} sub={page.updated} />
          <section className="pb-24">
            <div className="container-x">
              <Reveal>
                <div className="card-soft max-w-3xl rounded-[2rem] p-8 sm:p-10">
                  {page.body
                    .split("\n\n")
                    .map((para: string, i: number) => (
                      <p
                        key={i}
                        className={i > 0 ? "mt-5 leading-relaxed text-ink-600" : "leading-relaxed text-ink-600"}
                      >
                        {para}
                      </p>
                    ))}
                </div>
              </Reveal>
            </div>
          </section>
        </>
      );
  }
}

export function pageMeta(c: Record<string, any>, key: PageKey) {
  const page = c.pages[key];
  return { title: page.title, description: key === "privacy" || key === "terms" ? page.title : page.sub };
}
