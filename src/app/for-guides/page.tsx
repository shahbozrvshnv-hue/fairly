import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content";
import { hreflangMap } from "@/lib/locales";
import { Shell } from "@/components/Shell";
import { renderPageBody, pageMeta } from "@/components/LocalePages";

const KEY = "forGuides" as const;

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  const c = getSiteContent("en");
  const m = pageMeta(c, KEY);
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: "/for-guides", languages: hreflangMap() },
    openGraph: { title: m.title, description: m.description },
  };
}

export default function Page() {
  const c = getSiteContent("en");
  return (
    <Shell locale="en" content={c}>
      {renderPageBody(KEY, c)}
    </Shell>
  );
}
