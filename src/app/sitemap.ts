import type { MetadataRoute } from "next";

const LOCALES = ["en", "uz", "ru", "tr", "zh"];
const PAGES = ["", "how-it-works", "for-tourists", "for-guides", "volunteer", "host", "about", "privacy", "terms"];
const BASE = "https://fairguide.uz";

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap((locale) =>
    PAGES.map((page) => {
      const prefix = locale === "en" ? "" : `/${locale}`;
      const path = page ? `/${page}` : "";
      return {
        url: `${BASE}${prefix}${path}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(LOCALES.map((l) => [l, `${BASE}${l === "en" ? "" : `/${l}`}${path}`])),
        },
      };
    })
  );
}
