import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { business } from "@/lib/site";
import { formatPhoneHref } from "@/lib/utils";
import type { HeroContent } from "@/types/content";

export function HeroSection({ eyebrow = "Premium HVAC Service", title = "Comfort that holds up in every season.", text = "Repair, replacement, indoor air quality, and maintenance from licensed technicians who keep the process clear from first call to final walkthrough.", image = "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1200&q=80", imageAlt = "HVAC technician working on outdoor condenser", primaryLabel = "Book Appointment", primaryHref = "/contact", secondaryLabel = "Emergency Call", secondaryHref = formatPhoneHref(business.phone) }: HeroContent) {
  return (
    <section className="bg-navy-900 text-white">
      <div className="container-shell grid min-h-[680px] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          {eyebrow ? <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-100">{eyebrow}</p> : null}
          <h1 className="mt-5 max-w-3xl text-5xl font-black tracking-normal md:text-7xl">{title}</h1>
          {text ? <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">{text}</p> : null}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {primaryLabel && primaryHref ? <Button asChild size="lg"><Link href={primaryHref}>{primaryLabel} <ArrowRight size={18} /></Link></Button> : null}
            {secondaryLabel && secondaryHref ? <Button asChild variant="outline" size="lg" className="border-white/25 bg-white/10 text-white hover:bg-white hover:text-navy-900"><Link href={secondaryHref}><Phone size={18} /> {secondaryLabel}</Link></Button> : null}
          </div>
        </div>
        <div className="relative min-h-[420px] overflow-hidden rounded-brand bg-white/10 shadow-soft">
          {image ? <img className="h-full min-h-[420px] w-full object-cover" src={image} alt={imageAlt} /> : null}
          <div className="absolute bottom-5 left-5 right-5 grid gap-3 rounded-brand bg-white p-5 text-navy-900 shadow-soft sm:grid-cols-3">
            <Stat value={business.rating} label="Google rating" />
            <Stat value={business.reviews} label="local reviews" />
            <Stat value="24/7" label="emergency help" />
          </div>
        </div>
      </div>
    </section>
  );
}
function Stat({ value, label }: { value: string; label: string }) { return <div><p className="text-2xl font-black">{value}</p><p className="text-xs font-semibold uppercase tracking-[0.14em] text-graphite-500">{label}</p></div>; }
