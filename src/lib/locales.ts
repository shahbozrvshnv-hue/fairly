export const LOCALES = [
  { code: "en", label: "English", native: "English", flag: "🌍" },
  { code: "uz", label: "Uzbek", native: "O‘zbekcha", flag: "🇺🇿" },
  { code: "ru", label: "Russian", native: "Русский", flag: "🇷🇺" },
  { code: "tr", label: "Turkish", native: "Türkçe", flag: "🇹🇷" },
  { code: "zh", label: "Chinese", native: "中文", flag: "🇨🇳" },
] as const;

export type Locale = (typeof LOCALES)[number]["code"];

export function isLocale(value: string): value is Locale {
  return LOCALES.some((l) => l.code === value);
}

export function localeMeta(code: string) {
  return LOCALES.find((l) => l.code === code) ?? LOCALES[0];
}

/** Build a locale-aware path. English lives at the site root. */
export function pathFor(locale: string, path: string): string {
  if (locale === "en") return path;
  return `/${locale}${path === "/" ? "" : path}`;
}

export function hreflangMap(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of LOCALES) out[l.code] = l.code === "en" ? "/" : `/${l.code}`;
  return out;
}
