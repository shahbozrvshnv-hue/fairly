import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 20, children, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const IconCheck = (p: IconProps) => (
  <Svg {...p}><path d="M20 6 9 17l-5-5" /></Svg>
);

export const IconCheckCircle = (p: IconProps) => (
  <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="m8.5 12.2 2.4 2.4 4.6-5" /></Svg>
);

export const IconShieldCheck = (p: IconProps) => (
  <Svg {...p}><path d="M12 2.8 4.5 5.6v5.6c0 4.6 3.2 8.4 7.5 9.9 4.3-1.5 7.5-5.3 7.5-9.9V5.6L12 2.8z" /><path d="m8.8 11.8 2.2 2.2 4.2-4.6" /></Svg>
);

export const IconBadgeCheck = (p: IconProps) => (
  <Svg {...p}><path d="M12 2.7 14.4 4.5l3.1-.3 1 3 2.8 1.4-.7 3.1 1.7 2.7-2.3 2.1.1 3.1-3.1.7-1.7 2.7-3-.9-3 .9-1.7-2.7-3.1-.7.1-3.1L2.7 14.4l1.7-2.7-.7-3.1L6.5 7.2l1-3 3.1.3L12 2.7z" /><path d="m9 12 2.1 2.1L15.3 10" /></Svg>
);

export const IconStar = ({ size = 20, ...rest }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...rest}>
    <path d="M12 2.6l2.8 5.9 6.4.8-4.7 4.5 1.2 6.4L12 17.1l-5.7 3.1 1.2-6.4-4.7-4.5 6.4-.8L12 2.6z" />
  </svg>
);

export const IconGlobe = (p: IconProps) => (
  <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z" /></Svg>
);

export const IconMapPin = (p: IconProps) => (
  <Svg {...p}><path d="M12 21.5s7-6.2 7-11.3A7 7 0 0 0 5 10.2c0 5.1 7 11.3 7 11.3z" /><circle cx="12" cy="10" r="2.6" /></Svg>
);

export const IconClock = (p: IconProps) => (
  <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5.2l3.4 2" /></Svg>
);

export const IconUsers = (p: IconProps) => (
  <Svg {...p}><circle cx="9" cy="8.5" r="3.4" /><path d="M2.8 20c.6-3.3 3.1-5.3 6.2-5.3s5.6 2 6.2 5.3" /><path d="M15.5 5.6a3.4 3.4 0 1 1 .6 6.6M17.7 14.9c2.1.5 3.5 2.1 3.9 4.3" /></Svg>
);

export const IconHome = (p: IconProps) => (
  <Svg {...p}><path d="m3.5 10.6 8.5-7 8.5 7" /><path d="M5.5 9.5V20h13V9.5" /><path d="M10 20v-5.5h4V20" /></Svg>
);

export const IconChat = (p: IconProps) => (
  <Svg {...p}><path d="M20.5 11.5a8 8 0 0 1-11.6 7.1L4 20l1.5-4.6a8 8 0 1 1 15-3.9z" /><path d="M8.5 10.5h7M8.5 13.5h4.5" /></Svg>
);

export const IconScan = (p: IconProps) => (
  <Svg {...p}><path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" /><path d="M4 12h16" /></Svg>
);

export const IconBarcode = (p: IconProps) => (
  <Svg {...p}><path d="M4 6v12M8 6v12M11 6v12M14.5 6v12M17.5 6v12M20 6v12" strokeWidth={1.6} /></Svg>
);

export const IconCamera = (p: IconProps) => (
  <Svg {...p}><path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1.6-2.2h5.8L16.5 7h2A1.5 1.5 0 0 1 20 8.5v9A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5v-9z" /><circle cx="12" cy="12.8" r="3.2" /></Svg>
);

export const IconTag = (p: IconProps) => (
  <Svg {...p}><path d="m12.7 3.5 7.8 7.8a1.5 1.5 0 0 1 0 2.1l-7.1 7.1a1.5 1.5 0 0 1-2.1 0l-7.8-7.8V4.5a1 1 0 0 1 1-1h8.2z" /><circle cx="8" cy="8" r="1.4" /></Svg>
);

export const IconArrowRight = (p: IconProps) => (
  <Svg {...p}><path d="M4.5 12h15M13.5 6l6 6-6 6" /></Svg>
);

export const IconArrowUpRight = (p: IconProps) => (
  <Svg {...p}><path d="M7 17 17 7M9 7h8v8" /></Svg>
);

export const IconMenu = (p: IconProps) => (
  <Svg {...p}><path d="M4 7h16M4 12h16M4 17h10" /></Svg>
);

export const IconX = (p: IconProps) => (
  <Svg {...p}><path d="m6 6 12 12M18 6 6 18" /></Svg>
);

export const IconChevronDown = (p: IconProps) => (
  <Svg {...p}><path d="m6 9.5 6 6 6-6" /></Svg>
);

export const IconPlus = (p: IconProps) => (
  <Svg {...p}><path d="M12 5v14M5 12h14" /></Svg>
);

export const IconTrash = (p: IconProps) => (
  <Svg {...p}><path d="M4.5 7h15M9.5 7V4.8A.8.8 0 0 1 10.3 4h3.4a.8.8 0 0 1 .8.8V7M7 7l.8 12.2a1 1 0 0 0 1 .8h6.4a1 1 0 0 0 1-.8L17 7" /></Svg>
);

export const IconArrowUp = (p: IconProps) => (
  <Svg {...p}><path d="M12 19.5v-15M6 10.5l6-6 6 6" /></Svg>
);

export const IconArrowDown = (p: IconProps) => (
  <Svg {...p}><path d="M12 4.5v15M6 13.5l6 6 6-6" /></Svg>
);

export const IconUpload = (p: IconProps) => (
  <Svg {...p}><path d="M12 16V4.5M7.5 9 12 4.5 16.5 9" /><path d="M4.5 16.5v2a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5v-2" /></Svg>
);

export const IconSend = (p: IconProps) => (
  <Svg {...p}><path d="M20.5 3.5 3.5 10.2l6.2 2.6 2.6 6.2 8.2-15.5z" /><path d="M9.7 12.8 20.5 3.5" /></Svg>
);

export const IconMail = (p: IconProps) => (
  <Svg {...p}><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="m4.5 7.5 7.5 5.5 7.5-5.5" /></Svg>
);

export const IconPhone = (p: IconProps) => (
  <Svg {...p}><path d="M7.6 3.8 9.4 7a1.5 1.5 0 0 1-.4 1.9L7.2 10.3a12.5 12.5 0 0 0 6.5 6.5l1.4-1.8a1.5 1.5 0 0 1 1.9-.4l3.2 1.8a1.5 1.5 0 0 1 .7 1.8l-.7 1.9a1.5 1.5 0 0 1-1.7.9C10.6 19.8 4.2 13.4 3 5.9a1.5 1.5 0 0 1 .9-1.7l1.9-.7a1.5 1.5 0 0 1 1.8.7z" /></Svg>
);

export const IconInstagram = (p: IconProps) => (
  <Svg {...p}><rect x="4" y="4" width="16" height="16" rx="4.5" /><circle cx="12" cy="12" r="3.6" /><circle cx="16.8" cy="7.2" r="0.9" fill="currentColor" stroke="none" /></Svg>
);

export const IconTelegram = (p: IconProps) => (
  <Svg {...p}><path d="M20.7 4.2 3.4 11a.6.6 0 0 0 .05 1.13l4.4 1.3 1.7 5.2a.6.6 0 0 0 1 .25l2.6-2.6 4.4 3.2a.6.6 0 0 0 .95-.35l2.15-13.6a.6.6 0 0 0-.95-.53z" /><path d="m8 13.4 8.5-6.9" /></Svg>
);

export const IconFacebook = (p: IconProps) => (
  <Svg {...p}><path d="M14.5 8.5H17V5h-2.5A4.5 4.5 0 0 0 10 9.5V12H7.5v3.5H10V21h3.5v-5.5H16l.5-3.5h-3v-2a1.5 1.5 0 0 1 1-1.5z" /></Svg>
);

export const IconYoutube = (p: IconProps) => (
  <Svg {...p}><rect x="3" y="6" width="18" height="12.5" rx="3.5" /><path d="m10.3 9.6 4.6 2.65-4.6 2.65V9.6z" fill="currentColor" stroke="none" /></Svg>
);

export const IconHeart = (p: IconProps) => (
  <Svg {...p}><path d="M12 20.5S4 15.3 4 9.9A4.4 4.4 0 0 1 8.4 5.5c1.6 0 3 .8 3.6 2 .6-1.2 2-2 3.6-2A4.4 4.4 0 0 1 20 9.9c0 5.4-8 10.6-8 10.6z" /></Svg>
);

export const IconAward = (p: IconProps) => (
  <Svg {...p}><circle cx="12" cy="9" r="5.5" /><path d="m8.8 13.5-1.3 7 4.5-2.6 4.5 2.6-1.3-7" /><path d="m10 8.7 1.5 1.5 2.7-2.9" /></Svg>
);

export const IconSparkles = (p: IconProps) => (
  <Svg {...p}><path d="M12 4.5 13.8 9l4.5 1.8-4.5 1.8L12 17l-1.8-4.4L5.7 10.8 10.2 9 12 4.5z" /><path d="M18.8 15.8l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2zM5.5 4l.6 1.5L7.6 6l-1.5.6L5.5 8l-.6-1.4L3.4 6l1.5-.5L5.5 4z" /></Svg>
);

export const IconInfo = (p: IconProps) => (
  <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 11v5.5M12 7.6v.2" /></Svg>
);

export const IconLock = (p: IconProps) => (
  <Svg {...p}><rect x="5" y="10.5" width="14" height="9.5" rx="2.5" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" /><path d="M12 14.5v2" /></Svg>
);

export const IconEye = (p: IconProps) => (
  <Svg {...p}><path d="M2.8 12S6.2 5.8 12 5.8 21.2 12 21.2 12 17.8 18.2 12 18.2 2.8 12 2.8 12z" /><circle cx="12" cy="12" r="2.8" /></Svg>
);

export const IconCompass = (p: IconProps) => (
  <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2z" /></Svg>
);

export const IconImage = (p: IconProps) => (
  <Svg {...p}><rect x="4" y="5" width="16" height="14" rx="2.5" /><circle cx="9" cy="10" r="1.6" /><path d="m5.5 17 4.3-4 3.2 2.8 2.5-2.1 3 3" /></Svg>
);

export const IconUser = (p: IconProps) => (
  <Svg {...p}><circle cx="12" cy="8.2" r="3.6" /><path d="M5 20.2c.8-3.6 3.7-5.8 7-5.8s6.2 2.2 7 5.8" /></Svg>
);

export const IconWallet = (p: IconProps) => (
  <Svg {...p}><path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5v-9z" /><path d="M15 12.5h5" /><circle cx="15.5" cy="12.5" r="0.5" fill="currentColor" /></Svg>
);

export const IconQuote = (p: IconProps) => (
  <Svg {...p}><path d="M9.5 6.5c-3 1.4-4.5 3.7-4.5 7v4h5.5v-5.5H7.2c.2-1.8 1.2-3 3.3-4l-1-1.5zm10 0c-3 1.4-4.5 3.7-4.5 7v4H20.5v-5.5h-3.3c.2-1.8 1.2-3 3.3-4l-1-1.5z" fill="currentColor" stroke="none" /></Svg>
);
