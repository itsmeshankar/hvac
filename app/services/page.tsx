import { ServicesGrid } from "@/components/sections/services-grid";
import { HeroSection } from "@/components/sections/hero-section";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { getFaqs, getPageHero, getServices } from "@/lib/api";

export const metadata = { title: "Services" };

export default async function ServicesPage() {
  const [hero, serviceItems, faqItems] = await Promise.all([getPageHero("services"), getServices(), getFaqs()]);
  return <><HeroSection {...hero} /><ServicesGrid items={serviceItems} /><FaqAccordion limit={4} items={faqItems} /></>;
}
