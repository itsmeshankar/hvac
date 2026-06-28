import { serviceAreas as fallbackAreas } from "@/lib/site";
import { SectionHeading } from "@/components/ui/section-heading";
import type { ServiceArea } from "@/types/content";

export function ServiceAreasGrid({ items = fallbackAreas }: { items?: ServiceArea[] }) {
  return <section className="py-20"><div className="container-shell"><SectionHeading eyebrow="Service areas" title="Local HVAC help across the metro." text="Dispatch coverage for homes and light commercial properties throughout the region." /><div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">{items.map((area) => <div key={area.slug} className="rounded-brand border border-graphite-100 bg-white p-4 font-semibold text-navy-900 shadow-sm">{area.city}{area.state ? `, ${area.state}` : ""}</div>)}</div></div></section>;
}
