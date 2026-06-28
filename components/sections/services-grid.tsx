import { ServiceCard } from "@/components/cards/service-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { services as fallbackServices } from "@/lib/site";
import type { Service } from "@/types/content";

export function ServicesGrid({ limit, items = fallbackServices }: { limit?: number; items?: Service[] }) {
  const visible = typeof limit === "number" ? items.slice(0, limit) : items;
  return <section className="py-20"><div className="container-shell"><SectionHeading eyebrow="Services" title="Everything your HVAC system needs." text="Repairs, replacements, maintenance, and comfort upgrades organized around clear choices and reliable results." /><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{visible.map((service) => <ServiceCard key={service.slug} service={service} />)}</div></div></section>;
}
