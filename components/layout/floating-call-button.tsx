import Link from "next/link";
import { Phone } from "lucide-react";
import { business } from "@/lib/site";
import { formatPhoneHref } from "@/lib/utils";

export function FloatingCallButton({ phone = business.phone }: { phone?: string }) {
  return <Link href={formatPhoneHref(phone)} className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-soft transition hover:bg-orange-600" aria-label="Call now"><Phone size={24} /></Link>;
}
