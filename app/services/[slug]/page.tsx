import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { ServicesGrid } from "@/components/sections/services-grid";
import { getFaqs, getService, getServices } from "@/lib/api";
import { services } from "@/lib/site";

export function generateStaticParams() { return services.map((service) => ({ slug: service.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const service = await getService(slug); return { title: service.metaTitle ?? service.title, description: service.metaDescription ?? service.summary }; }

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [service, serviceItems, faqItems] = await Promise.all([getService(slug), getServices(), getFaqs()]);
  const Icon = service.icon;
  const symptomItems = service.symptoms.length ? service.symptoms : ["Comfort problem", "Efficiency concern", "System warning sign"];
  const benefitItems = service.benefits.length ? service.benefits : ["Licensed diagnostics", "Clear recommendations", "Quality workmanship"];
  return <><section className="bg-navy-900 py-20 text-white"><div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.7fr]"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-100">HVAC Service</p><h1 className="mt-4 text-5xl font-black md:text-7xl">{service.title}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">{service.description}</p><Button asChild className="mt-8"><Link href="/contact">Schedule Service</Link></Button></div><div className="rounded-brand bg-white/10 p-8"><Icon size={46} className="text-orange-500" /><h2 className="mt-6 text-2xl font-bold">Common symptoms</h2><ul className="mt-5 space-y-3">{symptomItems.map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="shrink-0 text-orange-500" size={20} />{item}</li>)}</ul></div></div></section><section className="py-20"><div className="container-shell grid gap-6 md:grid-cols-3">{benefitItems.map((benefit) => <article key={benefit} className="rounded-brand border border-graphite-100 p-6 shadow-sm"><CheckCircle2 className="text-sky-600" /><h3 className="mt-4 text-xl font-bold text-navy-900">{benefit}</h3></article>)}</div></section><FaqAccordion limit={3} items={service.faqs.length ? service.faqs : faqItems} /><ServicesGrid limit={4} items={serviceItems.filter((item) => item.slug !== service.slug)} /></>;
}
