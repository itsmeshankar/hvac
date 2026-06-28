import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/types/content";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <Link href={`/services/${service.slug}`} className="group rounded-brand border border-graphite-100 bg-white p-6 shadow-sm transition duration-brand hover:-translate-y-1 hover:shadow-soft">
      <div className="flex h-12 w-12 items-center justify-center rounded-brand bg-sky-100 text-navy-900"><Icon size={24} /></div>
      <h3 className="mt-5 text-xl font-bold text-navy-900">{service.title}</h3>
      <p className="mt-3 text-sm leading-6 text-graphite-500">{service.summary}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-orange-600">Learn more <ArrowRight size={16} /></span>
    </Link>
  );
}
