import { notFound } from "next/navigation";
import type { BlogPost, FaqItem, FinancingPlan, HeroContent, Project, Service, ServiceArea, SiteSettings, Testimonial } from "@/types/content";
import { blogPosts, business, faqs, projects, serviceAreas, serviceIconMap, services, testimonials } from "@/lib/site";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || "";
const IS_PRODUCTION_BUILD = process.env.NEXT_PHASE === "phase-production-build";
const ENABLE_LIVE_API = process.env.NEXT_PUBLIC_ENABLE_LIVE_API === "true" && !IS_PRODUCTION_BUILD && Boolean(API_BASE);

type ApiEnvelope<T> = T | { data: T } | { success: boolean; data?: T };

async function getJson<T>(path: string, fallback: T): Promise<T> {
  if (!ENABLE_LIVE_API) return fallback;

  try {
    const response = await fetch(`${API_BASE}${path}`, { next: { revalidate: 60 } });
    if (!response.ok) return fallback;
    const payload = (await response.json()) as ApiEnvelope<T>;
    if (payload && typeof payload === "object" && "data" in payload && payload.data !== undefined) {
      return payload.data;
    }
    return payload as T;
  } catch {
    return fallback;
  }
}

function readJsonList(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value !== "string" || !value.trim()) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : value.split("\n").filter(Boolean);
  } catch {
    return value.split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean);
  }
}

function readFaqs(value: unknown): FaqItem[] {
  if (Array.isArray(value)) return value as FaqItem[];
  if (typeof value !== "string" || !value.trim()) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function iconForService(rawIcon: unknown, slug: string) {
  const icon = String(rawIcon ?? slug).toLowerCase();
  if (icon.includes("install") || icon.includes("fan")) return serviceIconMap.fan;
  if (icon.includes("heat-pump") || icon.includes("pump")) return serviceIconMap.heatPump;
  if (icon.includes("furnace")) return serviceIconMap.furnace;
  if (icon.includes("heat")) return serviceIconMap.heating;
  if (icon.includes("air") || icon.includes("quality")) return serviceIconMap.airQuality;
  if (icon.includes("commercial")) return serviceIconMap.commercial;
  if (icon.includes("maintenance")) return serviceIconMap.maintenance;
  if (icon.includes("ac") || icon.includes("cool")) return serviceIconMap.ac;
  return serviceIconMap.default;
}

function mapService(item: any): Service {
  const slug = String(item.slug ?? "service");
  return {
    slug,
    title: String(item.title ?? "HVAC Service"),
    summary: String(item.short_description ?? item.summary ?? "Professional HVAC service."),
    description: String(item.description ?? item.short_description ?? "Professional HVAC service from licensed technicians."),
    benefits: readJsonList(item.benefits),
    symptoms: readJsonList(item.common_problems ?? item.symptoms),
    processSteps: readJsonList(item.process_steps),
    faqs: readFaqs(item.faq_content),
    icon: iconForService(item.icon, slug),
    featuredImage: item.featured_image ?? null,
    metaTitle: item.meta_title ?? null,
    metaDescription: item.meta_description ?? null,
  };
}

function mapPost(item: any): BlogPost {
  return {
    slug: String(item.slug ?? "post"),
    title: String(item.title ?? "HVAC Article"),
    category: String(item.category?.name ?? item.category_name ?? item.category ?? "HVAC"),
    excerpt: String(item.excerpt ?? ""),
    readTime: String(item.read_time ?? "5 min read"),
    publishedAt: String(item.published_at ?? item.publishedAt ?? item.created_at ?? ""),
    content: String(item.content ?? ""),
    featuredImage: item.featured_image ?? null,
    metaTitle: item.meta_title ?? null,
    metaDescription: item.meta_description ?? null,
  };
}

function mapProject(item: any): Project {
  return {
    title: String(item.title ?? "HVAC Project"),
    location: String(item.location ?? ""),
    service: String(item.service_type ?? item.service ?? "HVAC"),
    summary: String(item.project_summary ?? item.summary ?? ""),
    before: String(item.before ?? "Before"),
    after: String(item.after ?? "After"),
    beforeImage: item.before_image ?? null,
    afterImage: item.after_image ?? null,
    customerReview: item.customer_review ?? null,
    rating: Number(item.rating ?? 5),
  };
}

function mapTestimonial(item: any): Testimonial {
  return {
    name: String(item.customer_name ?? item.name ?? "Customer"),
    text: String(item.review_text ?? item.text ?? ""),
    rating: Number(item.rating ?? 5),
    location: item.customer_location ?? null,
    image: item.customer_image ?? null,
    videoUrl: item.video_url ?? null,
    source: item.source ?? null,
  };
}

function mapFaq(item: any): FaqItem {
  return { question: String(item.question ?? ""), answer: String(item.answer ?? ""), category: item.category ?? null };
}

function mapArea(item: any): ServiceArea {
  return { city: String(item.city ?? item.name ?? ""), state: item.state ?? null, slug: String(item.slug ?? item.city ?? "").toLowerCase().replace(/\s+/g, "-"), description: item.description ?? null };
}

function mapSettings(item: any): SiteSettings {
  return {
    name: String(item.site_name ?? item.name ?? business.name),
    phone: String(item.primary_phone ?? item.phone ?? business.phone),
    secondaryPhone: item.secondary_phone ?? null,
    email: String(item.email ?? business.email),
    address: String(item.address ?? business.address),
    hours: String(item.business_hours ?? item.hours ?? business.hours),
    logo: item.logo ?? null,
    favicon: item.favicon ?? null,
    facebookUrl: item.facebook_url ?? null,
    instagramUrl: item.instagram_url ?? null,
    linkedinUrl: item.linkedin_url ?? null,
    googleBusinessUrl: item.google_business_url ?? null,
  };
}

export async function getSiteSettings() {
  const data = await getJson<any>("/api/site/settings", business);
  return mapSettings(data);
}

export async function getServices() {
  const data = await getJson<any[]>("/api/services", services);
  return data.map(mapService);
}

export async function getService(slug: string) {
  const fallback = services.find((service) => service.slug === slug);
  const data = await getJson<any | null>(`/api/services/${slug}`, fallback ?? null);
  if (!data) notFound();
  return mapService(data);
}

export async function getBlogPosts() {
  const data = await getJson<any[]>("/api/blog", blogPosts);
  return data.map(mapPost);
}

export async function getBlogPost(slug: string) {
  const fallback = blogPosts.find((post) => post.slug === slug);
  const data = await getJson<any | null>(`/api/blog/${slug}`, fallback ?? null);
  if (!data) notFound();
  return mapPost(data);
}

export async function getProjects() {
  const data = await getJson<any[]>("/api/before-after", projects);
  return data.map(mapProject);
}

export async function getFaqs() {
  const data = await getJson<any[]>("/api/faqs", faqs);
  return data.map(mapFaq);
}

export async function getTestimonials() {
  const data = await getJson<any[]>("/api/testimonials", testimonials);
  return data.map(mapTestimonial);
}

export async function getServiceAreas() {
  const data = await getJson<any[]>("/api/service-areas", serviceAreas);
  return data.map(mapArea);
}

export async function getFinancingPlans(): Promise<FinancingPlan[]> {
  const fallback = [{ title: "Flexible Monthly Payments", description: "Qualified customers can choose payment options for repairs, replacements, and air quality upgrades.", features: ["Fast application", "Clear terms", "Replacement-ready"], buttonText: "Apply Now", buttonUrl: "/contact" }];
  const data = await getJson<any[]>("/api/financing-plans", fallback);
  return data.map((item) => ({ title: String(item.title), description: String(item.description ?? ""), features: readJsonList(item.features), buttonText: String(item.button_text ?? "Apply Now"), buttonUrl: item.button_url ?? "/contact" }));
}



const heroFallbacks: Record<string, HeroContent> = {
  home: { eyebrow: "Premium HVAC Service", title: "Comfort that holds up in every season.", text: "Repair, replacement, indoor air quality, and maintenance from licensed technicians who keep the process clear from first call to final walkthrough.", primaryLabel: "Book Appointment", primaryHref: "/contact" },
  about: { eyebrow: "About us", title: "A local HVAC team built for premium service.", text: "We combine licensed technical work with clean communication, careful home protection, and practical comfort planning." },
  services: { eyebrow: "HVAC services", title: "Repair, replace, maintain, and improve comfort.", text: "Explore premium HVAC services for residential and light commercial properties." },
  "before-after": { eyebrow: "Before and after", title: "See what better comfort looks like.", text: "Project snapshots that show the work, the improvement, and the service outcome." },
  financing: { eyebrow: "Financing", title: "Comfort upgrades with flexible payments.", text: "Qualified customers can finance replacement systems, major repairs, and indoor air quality improvements." },
  reviews: { eyebrow: "Reviews", title: `${business.rating}-star local HVAC service.`, text: `${business.reviews} homeowners and property managers trust Apex HVAC for clear recommendations and reliable workmanship.` },
  "service-areas": { eyebrow: "Service areas", title: "Fast local dispatch across the metro.", text: "Residential and light commercial HVAC support in nearby neighborhoods and surrounding communities." },
  blog: { eyebrow: "HVAC blog", title: "Seasonal tips and repair guidance.", text: "Practical content for energy savings, maintenance, indoor air quality, and replacement planning." },
  faq: { eyebrow: "FAQ", title: "Answers before your appointment.", text: "Quick guidance on service, pricing, maintenance, financing, and emergency HVAC support." },
  contact: { eyebrow: "Contact", title: "Book HVAC service today.", text: "Tell us what is going on and our team will help you choose the right next step." },
};

function mapHero(page: any, slug: string): HeroContent {
  const fallback = heroFallbacks[slug] ?? heroFallbacks.home;
  const section = Array.isArray(page?.sections) ? page.sections.find((item: any) => item.section_key === `${slug}_hero`) : null;
  if (!section) return fallback;
  return {
    eyebrow: section.content || fallback.eyebrow,
    title: section.section_title || fallback.title,
    text: section.section_subtitle || fallback.text,
    image: section.image || fallback.image,
    imageAlt: section.section_title || fallback.imageAlt,
    primaryLabel: section.button_text || fallback.primaryLabel || "Book Appointment",
    primaryHref: section.button_url || fallback.primaryHref || "/contact",
    secondaryLabel: fallback.secondaryLabel,
    secondaryHref: fallback.secondaryHref,
  };
}

export async function getPageHero(slug: string) {
  const data = await getJson<any | null>(`/api/pages/${slug}`, null);
  return mapHero(data, slug);
}
