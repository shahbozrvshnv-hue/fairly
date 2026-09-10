import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content";
import { renderPageBody, pageMeta } from "@/components/LocalePages";

type PageProps = { params: Promise<{ locale: string }> };

const KEY = "volunteer" as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const c = getSiteContent(locale);
  const m = pageMeta(c, KEY);
  return { title: m.title, description: m.description, openGraph: { title: m.title, description: m.description } };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  const c = getSiteContent(locale);
  return renderPageBody(KEY, c);
}
