import Link from "next/link";
import { business, navItems, services } from "@/lib/site";
import type { SiteSettings } from "@/types/content";

export function Footer({ settings = business }: { settings?: SiteSettings }) {
  return (
    <footer className="bg-navy-900 py-14 text-white">
      <div className="container-shell grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          {settings.logo ? (
            <img
              src={settings.logo}
              alt={settings.name}
              className="h-[60px] w-[140px] max-w-[140px] object-fit "
            />
          ) : (
            <h2 className="text-2xl font-black">{settings.name}</h2>
          )}
          <p className="mt-4 max-w-sm text-white/70">
            Premium heating, cooling, air quality, and maintenance service built
            around comfort that lasts.
          </p>
          <p className="mt-5 text-sm text-white/60">
            Copyright 2026 {settings.name}
          </p>
        </div>
        <FooterList
          title="Quick Links"
          items={navItems
            .slice(0, 6)
            .map(({ label, href }) => ({ label, href }))}
        />
        <FooterList
          title="Services"
          items={services
            .slice(0, 6)
            .map((s) => ({ label: s.title, href: `/services/${s.slug}` }))}
        />
        <div>
          <h3 className="font-bold">Contact</h3>
          <div className="mt-4 space-y-2 text-sm text-white/70">
            <p>{settings.phone}</p>
            <p>{settings.email}</p>
            <p>{settings.address}</p>
            <p>{settings.hours}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterList({
  title,
  items,
}: {
  title: string;
  items: Array<{ label: string; href: string }>;
}) {
  return (
    <div>
      <h3 className="font-bold">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm text-white/70">
        {items.map((item) => (
          <li key={item.href}>
            <Link className="hover:text-white" href={item.href}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
