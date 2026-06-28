import Link from "next/link";
import { CreditCard, FileCheck2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getFinancingPlans, getPageHero } from "@/lib/api";

export const metadata = { title: "Financing" };
export default async function FinancingPage() { const [hero, plans] = await Promise.all([getPageHero("financing"), getFinancingPlans()]); const steps = ["Choose your comfort solution", "Review monthly payment options", "Schedule installation or repair"]; return <><HeroSection {...hero} /><section className="py-20"><div className="container-shell"><SectionHeading eyebrow="How it works" title="Simple financing steps." /><div className="mt-10 grid gap-5 md:grid-cols-3">{steps.map((step, i) => <article key={step} className="rounded-brand border border-graphite-100 p-6 shadow-sm"><p className="text-3xl font-black text-orange-500">0{i + 1}</p><h3 className="mt-5 text-xl font-bold text-navy-900">{step}</h3></article>)}</div><div className="mt-10 grid gap-5 md:grid-cols-3">{plans.map((plan, i) => { const Icon = [CreditCard, FileCheck2, ShieldCheck][i % 3]; return <article key={plan.title} className="rounded-brand bg-sky-100 p-6"><Icon className="text-sky-600" /><h3 className="mt-4 text-xl font-bold text-navy-900">{plan.title}</h3><p className="mt-3 text-graphite-700">{plan.description}</p><ul className="mt-4 space-y-2 text-sm font-semibold text-navy-900">{plan.features.map((feature) => <li key={feature}>- {feature}</li>)}</ul><Button asChild className="mt-5"><Link href={plan.buttonUrl ?? "/contact"}>{plan.buttonText}</Link></Button></article>; })}</div></div></section></>; }
