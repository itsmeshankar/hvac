import { ReviewCard } from "@/components/cards/review-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials as fallbackTestimonials } from "@/lib/site";
import type { Testimonial } from "@/types/content";

export function TestimonialsSection({ items = fallbackTestimonials }: { items?: Testimonial[] }) {
  return <section className="bg-graphite-50 py-20"><div className="container-shell"><SectionHeading eyebrow="Reviews" title="Neighbors trust us with their comfort." align="center" /><div className="mt-10 grid gap-5 md:grid-cols-3">{items.map((review, index) => <ReviewCard key={`${review.name}-${index}`} {...review} />)}</div></div></section>;
}
