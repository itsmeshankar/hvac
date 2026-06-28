import { Star } from "lucide-react";

export function ReviewCard({ name, text, rating, location, source }: { name: string; text: string; rating: number; location?: string | null; source?: string | null }) {
  return <article className="rounded-brand border border-graphite-100 bg-white p-6 shadow-sm"><div className="flex gap-1 text-orange-500">{Array.from({ length: Math.max(1, Math.min(5, rating)) }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div><p className="mt-4 leading-7 text-graphite-700">{text}</p><p className="mt-5 font-bold text-navy-900">{name}</p>{location || source ? <p className="mt-1 text-sm text-graphite-500">{[location, source].filter(Boolean).join(" - ")}</p> : null}</article>;
}
