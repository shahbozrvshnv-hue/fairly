"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

/** Subtle Uzbek-inspired geometric tile motif, kept minimal for a modern feel. */
export function TilePattern({ className, opacity = 0.55 }: { className?: string; opacity?: number }) {
  const raw = useId();
  const id = `fgtile${raw.replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <svg
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      style={{ opacity }}
      aria-hidden="true"
    >
      <defs>
        <pattern id={id} width="56" height="56" patternUnits="userSpaceOnUse">
          <path
            d="M28 7l5.8 12.4L46.5 17.9 40.7 28l5.8 10.1-12.7-1.5L28 48.5l-5.8-11.9-12.7 1.5L15.3 28 9.5 17.9l12.7 1.5L28 7z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          />
          <circle cx="28" cy="28" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
