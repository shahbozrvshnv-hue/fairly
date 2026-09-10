import { Hero } from "@/sections/Hero";
import { TrustBand } from "@/sections/TrustBand";
import { Fairer } from "@/sections/Fairer";
import { Problem } from "@/sections/Problem";
import { Guides } from "@/sections/Guides";
import { Scanner } from "@/sections/Scanner";
import { Volunteer } from "@/sections/Volunteer";
import { Host } from "@/sections/Host";
import { Platform } from "@/sections/Platform";
import { Community } from "@/sections/Community";
import { HowItWorks } from "@/sections/HowItWorks";
import { Faq } from "@/sections/Faq";
import { GuideCta } from "@/sections/GuideCta";
import { Students } from "@/sections/Students";
import { TrustSafety } from "@/sections/TrustSafety";
import { Vision } from "@/sections/Vision";
import { FinalCta } from "@/sections/FinalCta";

export function Home() {
  return (
    <>
      <Hero />
      <TrustBand />
      <Fairer />
      <Problem />
      <Guides />
      <Scanner />
      <Volunteer />
      <Host />
      <Platform />
      <Community />
      <HowItWorks />
      <Faq />
      <GuideCta />
      <Students />
      <TrustSafety />
      <Vision />
      <FinalCta />
    </>
  );
}
