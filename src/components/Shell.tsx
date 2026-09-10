import type { ReactNode } from "react";
import { ContentProvider } from "./ContentContext";
import { LeadProvider } from "./LeadContext";
import { HashScroll } from "./HashScroll";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function Shell({
  locale,
  content,
  children,
}: {
  locale: string;
  content: Record<string, any>;
  children: ReactNode;
}) {
  return (
    <ContentProvider locale={locale} content={content}>
      <LeadProvider>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-teal-600 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <HashScroll />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </LeadProvider>
    </ContentProvider>
  );
}
