import type { Metadata, Viewport } from "next";
import "./globals.css";
import { hreflangMap } from "@/lib/locales";

export const metadata: Metadata = {
  metadataBase: new URL("https://fairguide.uz"),
  title: {
    default: "FairGuide — Experience Uzbekistan through its people",
    template: "%s | FairGuide",
  },
  description:
    "A community-powered tourism platform connecting international visitors with trusted guides, translators, students and families across Uzbekistan.",
  keywords: [
    "Uzbekistan travel",
    "local guides Uzbekistan",
    "fair prices Uzbekistan",
    "Samarkand",
    "Bukhara",
    "Tashkent",
    "tourism technology",
    "volunteer Uzbekistan",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "FairGuide",
    title: "FairGuide — Experience Uzbekistan through its people",
    description:
      "Find verified local guides, scan fair reference prices, and experience Uzbekistan through the people who call it home.",
    images: [
      { url: "/images/hero.jpg", width: 1200, height: 630, alt: "A tourist and a local Uzbek guide laughing together in Samarkand" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FairGuide — Experience Uzbekistan through its people",
    description:
      "Find verified local guides, scan fair reference prices, and experience Uzbekistan through the people who call it home.",
    images: ["/images/hero.jpg"],
  },
  icons: { icon: "/favicon.svg" },
  alternates: { languages: hreflangMap() },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F5F3EE",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
