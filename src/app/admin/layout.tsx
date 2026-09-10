import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Control Panel | FairGuide",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
