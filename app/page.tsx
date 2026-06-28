import { BlogCard } from "@/components/cards/blog-card";
import { ProjectCard } from "@/components/cards/project-card";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { FinancingBanner } from "@/components/sections/financing-banner";
import { HeroSection } from "@/components/sections/hero-section";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { ServiceAreasGrid } from "@/components/sections/service-areas-grid";
import { ServicesGrid } from "@/components/sections/services-grid";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { SectionHeading } from "@/components/ui/section-heading";
import { getBlogPosts, getFaqs, getPageHero, getProjects, getServiceAreas, getServices, getTestimonials } from "@/lib/api";

export default async function HomePage() {
  const [hero, serviceItems, projectItems, postItems, faqItems, reviewItems, areaItems] = await Promise.all([getPageHero("home"), getServices(), getProjects(), getBlogPosts(), getFaqs(), getTestimonials(), getServiceAreas()]);
  return <><HeroSection {...hero} /><ServicesGrid limit={4} items={serviceItems} /><WhyChooseUs /><section className="py-20"><div className="container-shell"><SectionHeading eyebrow="Before and after" title="Real comfort upgrades, clearly documented." /><div className="mt-10 grid gap-5 lg:grid-cols-3">{projectItems.map((project) => <ProjectCard key={project.title} project={project} />)}</div></div></section><FinancingBanner /><ProcessTimeline /><TestimonialsSection items={reviewItems} /><ServiceAreasGrid items={areaItems} /><FaqAccordion limit={3} items={faqItems} /><section className="bg-navy-900 py-20 text-white"><div className="container-shell"><SectionHeading eyebrow="HVAC tips" title="Helpful guidance from local comfort pros." text="Seasonal advice, repair warning signs, and replacement planning in plain language." /><div className="mt-10 grid gap-5 md:grid-cols-3">{postItems.map((post) => <BlogCard key={post.slug} post={post} />)}</div><NewsletterForm /></div></section></>;
}
