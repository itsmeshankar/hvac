import { FaqAccordion } from "@/components/sections/faq-accordion";
import { HeroSection } from "@/components/sections/hero-section";
import { getFaqs, getPageHero } from "@/lib/api";

export const metadata = { title: "FAQ" };
export default async function FaqPage() { const [hero, faqItems] = await Promise.all([getPageHero("faq"), getFaqs()]); return <><HeroSection {...hero} /><FaqAccordion items={faqItems} /></>; }
