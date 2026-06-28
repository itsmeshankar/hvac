import { BlogCard } from "@/components/cards/blog-card";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getBlogPosts, getPageHero } from "@/lib/api";

export const metadata = { title: "Blog" };
export default async function BlogPage() { const [hero, postItems] = await Promise.all([getPageHero("blog"), getBlogPosts()]); return <><HeroSection {...hero} /><section className="py-20"><div className="container-shell"><SectionHeading eyebrow="Latest posts" title="Helpful HVAC articles." /><div className="mt-10 grid gap-5 md:grid-cols-3">{postItems.map((post) => <BlogCard key={post.slug} post={post} />)}</div></div></section><section className="bg-navy-900 py-16 text-white"><div className="container-shell"><h2 className="text-3xl font-black">Get seasonal HVAC reminders.</h2><NewsletterForm /></div></section></>; }
