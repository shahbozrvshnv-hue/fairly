import { Reveal } from "./Reveal";
import { TilePattern } from "./TilePattern";

export function PageHero({ eyebrow, title, sub, intro }: { eyebrow?: string; title: string; sub?: string; intro?: string }) {
  return (
    <section className="relative overflow-hidden pb-14 pt-36 md:pb-20 md:pt-44">
      <div className="pointer-events-none absolute -right-32 -top-24 h-[380px] w-[380px] rounded-full bg-teal-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 top-40 h-[300px] w-[300px] rounded-full bg-amber-100/60 blur-3xl" />
      <div className="container-x relative">
        <div className="max-w-3xl">
          {eyebrow && (
            <Reveal>
              <span className="eyebrow">{eyebrow}</span>
            </Reveal>
          )}
          <Reveal delay={80}>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink-900 sm:text-5xl lg:text-[3.4rem]">
              {title}
            </h1>
          </Reveal>
          {sub && (
            <Reveal delay={160}>
              <p className="mt-5 text-lg leading-relaxed text-ink-500">{sub}</p>
            </Reveal>
          )}
          {intro && (
            <Reveal delay={240}>
              <div className="card-soft mt-8 max-w-2xl rounded-2xl p-5 relative overflow-hidden">
                <TilePattern className="text-teal-600" opacity={0.12} />
                <p className="relative text-[15px] leading-relaxed text-ink-700">{intro}</p>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
