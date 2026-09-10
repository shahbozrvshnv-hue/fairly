"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LOCALES } from "@/lib/locales";
import { useContent } from "./ContentContext";
import { cn } from "@/lib/cn";
import { IconCheck, IconChevronDown, IconGlobe } from "./Icons";

export function LanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const { locale } = useContent();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const pick = (code: string) => {
    setOpen(false);
    if (code === locale) return;
    const stripped = window.location.pathname.replace(/^\/(uz|ru|tr|zh)(?=\/|$)/, "") || "/";
    const target = code === "en" ? stripped : `/${code}${stripped === "/" ? "" : stripped}`;
    router.push(target + window.location.hash);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "btn btn-md !py-2.5",
          dark
            ? "bg-night-800 text-cream-100 shadow-dark-inset"
            : "bg-cream-50 text-ink-800 shadow-soft-sm hover:-translate-y-0.5 active:translate-y-0 active:shadow-soft-inset-sm"
        )}
      >
        <IconGlobe size={16} className={dark ? "text-teal-300" : "text-teal-600"} />
        <span className="text-[13px] font-semibold tracking-wide">{current.native}</span>
        <IconChevronDown size={14} className={cn("transition-transform duration-300", open && "rotate-180")} />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Language"
          className="anim-fade-up absolute right-0 top-full z-50 mt-2 w-52 rounded-2xl bg-cream-50 p-2 shadow-soft-lg"
        >
          {LOCALES.map((l) => (
            <button
              key={l.code}
              type="button"
              role="option"
              aria-selected={l.code === locale}
              onClick={() => pick(l.code)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                l.code === locale
                  ? "bg-teal-50 text-teal-700"
                  : "text-ink-800 hover:bg-cream-100"
              )}
            >
              <span className="text-base leading-none">{l.flag}</span>
              <span className="flex-1">
                <span className="block text-[13px] font-semibold leading-tight">{l.native}</span>
                <span className={cn("block text-[11px]", l.code === locale ? "text-teal-600/70" : "text-ink-400")}>
                  {l.label}
                </span>
              </span>
              {l.code === locale && <IconCheck size={15} className="text-teal-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
