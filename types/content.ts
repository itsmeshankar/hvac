import type { LucideIcon } from "lucide-react";

export type NavItem = { label: string; href: string; children?: NavItem[] };

export type FaqItem = {
  question: string;
  answer: string;
  category?: string | null;
  id?: number;
};

export type Service = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  benefits: string[];
  symptoms: string[];
  processSteps?: string[];
  faqs: FaqItem[];
  icon: LucideIcon;
  featuredImage?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
};

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  publishedAt: string;
  content?: string;
  featuredImage?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
};

export type Project = {
  title: string;
  location: string;
  service: string;
  summary: string;
  before: string;
  after: string;
  beforeImage?: string | null;
  afterImage?: string | null;
  customerReview?: string | null;
  rating?: number;
};

export type Testimonial = {
  name: string;
  text: string;
  rating: number;
  location?: string | null;
  image?: string | null;
  videoUrl?: string | null;
  source?: string | null;
};

export type SiteSettings = {
  name: string;
  phone: string;
  secondaryPhone?: string | null;
  email: string;
  address: string;
  hours: string;
  logo?: string | null;
  favicon?: string | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  linkedinUrl?: string | null;
  googleBusinessUrl?: string | null;
};

export type ServiceArea = {
  city: string;
  state?: string | null;
  slug: string;
  description?: string | null;
};

export type FinancingPlan = {
  title: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonUrl?: string | null;
};


export type HeroContent = {
  eyebrow?: string;
  title?: string;
  text?: string;
  image?: string | null;
  imageAlt?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};
