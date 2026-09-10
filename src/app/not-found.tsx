import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <Logo markSize={44} />
      <p className="font-display text-6xl font-bold text-ink-900">404</p>
      <p className="max-w-sm text-ink-500">
        The page you're looking for doesn't exist. Let's get you back on the road.
      </p>
      <Link href="/" className="btn btn-primary btn-md">
        Back to home
      </Link>
    </main>
  );
}
