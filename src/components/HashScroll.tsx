"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Smooth-scroll to #anchors after client navigation. */
export function HashScroll() {
  const pathname = usePathname();
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const t = setTimeout(() => {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
    return () => clearTimeout(t);
  }, [pathname]);
  return null;
}
