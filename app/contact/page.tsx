import { ContactForm } from "@/components/forms/contact-form";
import { HeroSection } from "@/components/sections/hero-section";
import { getPageHero, getSiteSettings } from "@/lib/api";

export const metadata = { title: "Contact" };
export default async function ContactPage() { const [hero, settings] = await Promise.all([getPageHero("contact"), getSiteSettings()]); return <><HeroSection {...hero} /><section className="py-20"><div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.8fr]"><ContactForm /><aside className="rounded-brand bg-graphite-50 p-8"><h2 className="text-2xl font-bold text-navy-900">Business info</h2><div className="mt-6 space-y-3 text-graphite-700"><p>{settings.phone}</p><p>{settings.email}</p><p>{settings.address}</p><p>{settings.hours}</p></div><iframe className="mt-8 h-72 w-full rounded-brand border-0" loading="lazy" src={`https://www.google.com/maps?q=${encodeURIComponent(settings.address || "Springfield")}&output=embed`} title="Service map" /></aside></div></section></>; }
