import { ReviewCard } from "@/components/cards/review-card";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getPageHero, getTestimonials } from "@/lib/api";

export const metadata = { title: "Reviews" };
export default async function ReviewsPage() { const [hero, reviewItems] = await Promise.all([getPageHero("reviews"), getTestimonials()]); return <><HeroSection {...hero} /><section className="py-20"><div className="container-shell"><SectionHeading eyebrow="Customer stories" title="What clients say after service." /><div className="mt-10 grid gap-5 md:grid-cols-3">{reviewItems.map((review, i) => <ReviewCard key={`${review.name}-${i}`} {...review} />)}</div></div></section></>; }
