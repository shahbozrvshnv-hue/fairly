import { cn } from "@/lib/cn";

export function LogoMark({ size = 38, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="fg-logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#17947F" />
          <stop offset="1" stopColor="#0B6A5D" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="17" fill="url(#fg-logo-grad)" />
      <path
        d="M32 13.5c-7.6 0-13.5 5.8-13.5 13.2C18.5 36.6 32 51.5 32 51.5s13.5-14.9 13.5-24.8c0-7.4-5.9-13.2-13.5-13.2z"
        fill="none"
        stroke="#F5F3EE"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M32 22l4.5 6.4L32 34.8l-4.5-6.4z" fill="#F5F3EE" />
      <circle cx="45" cy="18" r="4" fill="#E9A23B" stroke="#F5F3EE" strokeWidth="1.5" />
    </svg>
  );
}

export function Logo({
  image,
  word = "FairGuide",
  dark = false,
  markSize = 38,
  className,
}: {
  image?: string;
  word?: string;
  dark?: boolean;
  markSize?: number;
  className?: string;
}) {
  if (image) {
    return <img src={image} alt={word} className={cn("h-10 w-auto object-contain", className)} />;
  }
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark size={markSize} />
      <span
        className={cn(
          "font-display text-[21px] font-bold leading-none tracking-tight",
          dark ? "text-white" : "text-ink-900"
        )}
      >
        {word.slice(0, 4)}
        <span className={dark ? "text-teal-300" : "text-teal-600"}>{word.slice(4)}</span>
      </span>
    </span>
  );
}
