import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { features } from "@/lib/site";

export function WhyChooseUs() {
  return <section className="bg-graphite-50 py-20"><div className="container-shell"><SectionHeading eyebrow="Why choose us" title="High-trust service from first call to final test." align="center" /><div className="mt-10 grid gap-5 md:grid-cols-3">{features.map((item) => { const Icon = item.icon; return <article key={item.title} className="rounded-brand bg-white p-7 shadow-sm"><Icon className="text-orange-500" size={30} /><h3 className="mt-5 text-xl font-bold text-navy-900">{item.title}</h3><p className="mt-3 leading-7 text-graphite-500">{item.text}</p></article>; })}</div><div className="mt-10 grid gap-3 rounded-brand bg-navy-900 p-6 text-white md:grid-cols-4">{["Licensed and insured", "Background checked", "Maintenance plans", "Financing available"].map((text) => <p key={text} className="flex items-center gap-2 font-semibold"><CheckCircle2 size={18} className="text-orange-500" />{text}</p>)}</div></div></section>;
}
