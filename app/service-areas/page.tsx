import { HeroSection } from "@/components/sections/hero-section";
import { ServiceAreasGrid } from "@/components/sections/service-areas-grid";
import { getPageHero, getServiceAreas } from "@/lib/api";

export const metadata = { title: "Service Areas" };
export default async function ServiceAreasPage() { const [hero, areaItems] = await Promise.all([getPageHero("service-areas"), getServiceAreas()]); return <><HeroSection {...hero} /><ServiceAreasGrid items={areaItems} /></>; }
