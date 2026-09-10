import fs from "node:fs";
import path from "node:path";
import en from "@/i18n/en.json";
import uz from "@/i18n/uz.json";
import ru from "@/i18n/ru.json";
import tr from "@/i18n/tr.json";
import zh from "@/i18n/zh.json";

export type LocaleContent = Record<string, any>;

const LOCALE_FILES: Record<string, LocaleContent> = { en, uz, ru, tr, zh };
const DATA_DIR = path.join(process.cwd(), "data");
const CONTENT_FILE = path.join(DATA_DIR, "content.json");

/**
 * Deep-merge `extra` over `base`. Arrays in `extra` replace arrays in `base`
 * wholesale (editors manage arrays as whole units).
 */
export function deepMerge(base: any, extra: any): any {
  if (extra === undefined) return base;
  if (Array.isArray(base) || Array.isArray(extra)) return extra;
  if (typeof base === "object" && base !== null && typeof extra === "object" && extra !== null) {
    const out: Record<string, any> = { ...base };
    for (const key of Object.keys(extra)) {
      out[key] = deepMerge(base?.[key], extra[key]);
    }
    return out;
  }
  return extra;
}

function clone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v));
}

/** Base (file) content for a locale, with English as the fallback layer. */
export function getBaseContent(locale: string): LocaleContent {
  const code = LOCALE_FILES[locale] ? locale : "en";
  if (code === "en") return clone(LOCALE_FILES.en);
  return deepMerge(clone(LOCALE_FILES.en), clone(LOCALE_FILES[code]));
}

export function readOverrides(): { site: LocaleContent; locales: Record<string, LocaleContent> } {
  try {
    const raw = JSON.parse(fs.readFileSync(CONTENT_FILE, "utf8"));
    return { site: raw.site ?? {}, locales: raw.locales ?? {} };
  } catch {
    return { site: {}, locales: {} };
  }
}

/** Merged public content for one locale: defaults < admin overrides. */
export function getSiteContent(locale: string): LocaleContent {
  const ov = readOverrides();
  const base = getBaseContent(locale);
  const content = deepMerge(base, ov.locales?.[locale] ?? {});
  content.site = deepMerge(base.site, ov.site ?? {});
  return content;
}

/** Merged content for every locale (used by the admin panel). */
export function getAllContent(): { site: LocaleContent; locales: Record<string, LocaleContent> } {
  const ov = readOverrides();
  const locales: Record<string, LocaleContent> = {};
  for (const code of Object.keys(LOCALE_FILES)) {
    const base = getBaseContent(code);
    const content = deepMerge(base, ov.locales?.[code] ?? {});
    content.site = deepMerge(base.site, ov.site ?? {});
    locales[code] = content;
  }
  return { site: ov.site ?? {}, locales };
}

function writeOverrides(data: { site?: LocaleContent; locales?: Record<string, LocaleContent> }) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const tmp = `${CONTENT_FILE}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2));
  fs.renameSync(tmp, CONTENT_FILE);
}

export type ContentScope = "site" | "locale" | "all";

/** Persist an editor scope. `value === null` clears the stored overrides. */
export function saveScope(scope: ContentScope, locale: string | null, value: any): void {
  const ov = readOverrides();
  if (scope === "all") {
    const next = (value ?? {}) as { site?: LocaleContent; locales?: Record<string, LocaleContent> };
    writeOverrides({ site: next.site ?? {}, locales: next.locales ?? {} });
    return;
  }
  if (scope === "site") {
    ov.site = value === null ? {} : value;
  } else {
    if (!locale) throw new Error("locale is required for scope=locale");
    if (value === null) delete ov.locales[locale];
    else ov.locales[locale] = value;
  }
  writeOverrides(ov);
}

/** Append a lead-form submission (public endpoint). */
export function addLead(lead: Record<string, unknown>): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const file = path.join(DATA_DIR, "leads.json");
  let all: unknown[] = [];
  try {
    all = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    /* first lead */
  }
  all.push({ id: `lead-${Date.now()}`, at: new Date().toISOString(), ...lead });
  fs.writeFileSync(file, JSON.stringify(all, null, 2));
}
