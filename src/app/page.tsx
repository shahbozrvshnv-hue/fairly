import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content";
import { hreflangMap } from "@/lib/locales";
import { Shell } from "@/components/Shell";
import { Home } from "@/components/Home";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  const c = getSiteContent("en");
  return {
    title: `${c.site.name} — ${c.site.tagline}`,
    description: c.site.ogDescription,
    alternates: { canonical: "/", languages: hreflangMap() },
    openGraph: {
      title: `${c.site.name} — ${c.site.tagline}`,
      description: c.site.ogDescription,
      url: "/",
      images: [
        {
          url: c.hero.image || "/images/hero.jpg",
          width: 1200,
          height: 630,
          alt: c.hero.imageAlt,
        },
      ],
    },
  };
}

export default function RootPage() {
  const content = getSiteContent("en");
  return (
    <Shell locale="en" content={content}>
      <Home />
    </Shell>
  );
}
