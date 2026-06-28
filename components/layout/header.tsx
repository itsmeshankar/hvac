import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminAccessLink } from "@/components/layout/admin-access-link";
import { business, navItems } from "@/lib/site";
import { formatPhoneHref } from "@/lib/utils";
import type { SiteSettings } from "@/types/content";

export function Header({ settings = business }: { settings?: SiteSettings }) {
  return (
    <header className="sticky top-0 z-40 border-b border-graphite-100 bg-white/95 backdrop-blur">
      <div className="bg-navy-900 py-2 text-center text-sm font-medium text-white">
        24/7 emergency HVAC help available. Call {settings.phone}
      </div>
      <div className="container-shell flex min-h-20 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-3 text-xl font-black text-navy-900"
        >
          {settings.logo ? (
            <img
              src={settings.logo}
              alt={settings.name}
              className="h-11 w-auto max-w-[160px] object-contain"
            />
          ) : (
            <span>{settings.name}</span>
          )}
        </Link>
        <nav
          className="hidden items-center gap-6 lg:flex"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-graphite-700 transition hover:text-orange-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <AdminAccessLink />
          {/* <Button asChild variant="outline">
            <Link href={formatPhoneHref(settings.phone)}>
              <Phone size={18} />
              {settings.phone}
            </Link>
          </Button> */}
          <Button asChild>
            <Link href="/contact">Book Appointment</Link>
          </Button>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <AdminAccessLink compact />
          <Button variant="ghost" size="sm" aria-label="Open menu">
            <Menu size={22} />
          </Button>
        </div>
      </div>
    </header>
  );
}
