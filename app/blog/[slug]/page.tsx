import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { getBlogPost, getFaqs } from "@/lib/api";
import { blogPosts } from "@/lib/site";
import { sanitizeHtml } from "@/lib/sanitize";

export function generateStaticParams() { return blogPosts.map((post) => ({ slug: post.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const post = await getBlogPost(slug); return { title: post.metaTitle ?? post.title, description: post.metaDescription ?? post.excerpt }; }
export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const [post, faqItems] = await Promise.all([getBlogPost(slug), getFaqs()]); const html = sanitizeHtml(post.content || `<p>${post.excerpt}</p>`); return <><article className="container-shell max-w-3xl py-20"><p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">{post.category}</p><h1 className="mt-4 text-5xl font-black text-navy-900 md:text-6xl">{post.title}</h1><p className="mt-5 text-graphite-500">{post.publishedAt} - {post.readTime}</p>{post.featuredImage ? <img src={post.featuredImage} alt="" className="mt-8 h-auto w-full rounded-brand object-cover shadow-soft" /> : null}<div className="mt-10 space-y-6 text-lg leading-9 text-graphite-700 [&_a]:font-bold [&_a]:text-orange-600 [&_h2]:text-3xl [&_h2]:font-black [&_h2]:text-navy-900 [&_li]:ml-6 [&_li]:list-disc" dangerouslySetInnerHTML={{ __html: html }} /><Button asChild className="mt-10"><Link href="/contact">Book HVAC Service</Link></Button></article><FaqAccordion limit={3} items={faqItems} /></>; }
