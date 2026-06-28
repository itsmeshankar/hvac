import type { BlogPost } from "@/types/content";
import Link from "next/link";

export function BlogCard({ post }: { post: BlogPost }) {
  return <Link href={`/blog/${post.slug}`} className="overflow-hidden rounded-brand border border-graphite-100 bg-white shadow-sm transition hover:shadow-soft">{post.featuredImage ? <img src={post.featuredImage} alt="" className="h-48 w-full object-cover" /> : null}<div className="p-6"><p className="text-sm font-bold text-orange-600">{post.category}</p><h3 className="mt-3 text-xl font-bold text-navy-900">{post.title}</h3><p className="mt-3 text-sm leading-6 text-graphite-500">{post.excerpt}</p><p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-graphite-500">{post.readTime}</p></div></Link>;
}
