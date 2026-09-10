import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteContent } from "@/lib/content";
import { isLocale, hreflangMap } from "@/lib/locales";
import { Shell } from "@/components/Shell";

export const dynamic = "force-dynamic";

type LocaleParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "en") return {};
  const c = getSiteContent(locale);
  const ogLocale =
    locale === "zh" ? "zh_CN" : locale === "uz" ? "uz_UZ" : locale === "ru" ? "ru_RU" : locale === "tr" ? "tr_TR" : "en_US";
  return {
    alternates: { canonical: `/${locale}`, languages: hreflangMap() },
    openGraph: { locale: ogLocale, siteName: c.site.name },
  };
}

export default async function LocaleLayout({ children, params }: LocaleParams & { children: React.ReactNode }) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "en") notFound();
  const content = getSiteContent(locale);
  return (
    <Shell locale={locale} content={content}>
      {children}
    </Shell>
  );
}
