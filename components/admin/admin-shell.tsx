"use client";
import type React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  CalendarDays,
  ExternalLink,
  FileQuestion,
  Gauge,
  Images,
  Layers3,
  LogOut,
  MapPin,
  Menu,
  MessageSquareText,
  Newspaper,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Sparkles,
  Star,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const publicPaths = ["/admin/login", "/admin/forgot-password"];
const links = [
  { label: "Dashboard", href: "/admin/dashboard", icon: Gauge },
  { label: "Organization", href: "/admin/settings", icon: Settings },
  { label: "Hero Sections", href: "/admin/heroes", icon: Sparkles },
  { label: "Services", href: "/admin/services", icon: Layers3 },
  { label: "Blog", href: "/admin/blog", icon: Newspaper },
  { label: "FAQ", href: "/admin/faqs", icon: FileQuestion },
  { label: "Reviews", href: "/admin/testimonials", icon: Star },
  { label: "Before/After", href: "/admin/before-after", icon: Images },
  { label: "Service Areas", href: "/admin/service-areas", icon: MapPin },
  { label: "Financing", href: "/admin/financing", icon: WalletCards },
  { label: "Appointments", href: "/admin/appointments", icon: CalendarDays },
  { label: "Leads", href: "/admin/leads", icon: MessageSquareText },
  { label: "Users", href: "/admin/users", icon: Users },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (publicPaths.includes(pathname)) return <>{children}</>;

  async function logout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-graphite-50">
      <DesktopSidebar
        collapsed={collapsed}
        pathname={pathname}
        onToggle={() => setCollapsed((value) => !value)}
        onLogout={logout}
      />
      <MobileTopbar onOpen={() => setMobileOpen(true)} />
      <MobileDrawer
        open={mobileOpen}
        pathname={pathname}
        onClose={() => setMobileOpen(false)}
        onLogout={logout}
      />
      <main
        className={cn(
          "transition-[padding] duration-brand",
          collapsed ? "lg:pl-24" : "lg:pl-72",
        )}
      >
        <div className="container-shell py-6 lg:py-8">{children}</div>
      </main>
    </div>
  );
}

function DesktopSidebar({
  collapsed,
  pathname,
  onToggle,
  onLogout,
}: {
  collapsed: boolean;
  pathname: string;
  onToggle: () => void;
  onLogout: () => void;
}) {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 hidden border-r border-graphite-100 bg-white p-2 transition-[width] duration-brand lg:block",
        collapsed ? "w-24" : "w-72",
      )}
    >
      <div
        className={cn(
          "flex items-center",
          collapsed ? "justify-center" : "justify-between",
        )}
      >
        <Link
          href="/admin/dashboard"
          className={cn(
            "font-black text-navy-900",
            collapsed ? "text-lg" : "text-xl",
          )}
        >
          {collapsed ? "AH" : "Apex Admin"}
        </Link>
        {!collapsed ? (
          <button
            onClick={onToggle}
            className="rounded-brand p-2 text-graphite-500 hover:bg-graphite-50"
            aria-label="Collapse sidebar"
          >
            <PanelLeftClose size={20} />
          </button>
        ) : null}
      </div>
      {collapsed ? (
        <button
          onClick={onToggle}
          className="mx-auto mt-2 flex h-10 w-10 items-center justify-center rounded-brand text-graphite-500 hover:bg-graphite-50"
          aria-label="Expand sidebar"
        >
          <PanelLeftOpen size={20} />
        </button>
      ) : (
        <p className="mt-2 text-sm text-graphite-500">Website control panel</p>
      )}
      <nav className="mt-6 space-y-1" aria-label="Admin navigation">
        {links.map((item) => (
          <SidebarLink
            key={item.href}
            item={item}
            active={pathname === item.href}
            collapsed={collapsed}
          />
        ))}
      </nav>
      <a
        href="/admin/dashboard"
        target="_blank"
        rel="noreferrer"
        className={cn(
          "mt-2 flex w-full items-center rounded-brand px-4 py-3 text-sm font-bold text-sky-600 hover:bg-sky-100",
          collapsed ? "justify-center" : "gap-3",
        )}
        title="Open dashboard in new tab"
      >
        <ExternalLink size={18} />
        {!collapsed ? "Dashboard tab" : null}
      </a>
      <button
        onClick={onLogout}
        className={cn(
          "mt-2 flex w-full items-center rounded-brand px-4 py-3 text-sm font-bold text-orange-600 hover:bg-orange-100",
          collapsed ? "justify-center" : "gap-3",
        )}
        title="Logout"
      >
        <LogOut size={18} />
        {!collapsed ? "Logout" : null}
      </button>
    </aside>
  );
}

function SidebarLink({
  item,
  active,
  collapsed,
}: {
  item: (typeof links)[number];
  active: boolean;
  collapsed: boolean;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      title={item.label}
      className={cn(
        "flex items-center rounded-brand px-4 py-2 text-sm font-semibold transition",
        collapsed ? "justify-center" : "gap-3",
        active
          ? "bg-navy-900 text-white"
          : "text-graphite-700 hover:bg-graphite-50 hover:text-orange-600",
      )}
    >
      <Icon size={19} />
      {!collapsed ? <span>{item.label}</span> : null}
    </Link>
  );
}

function MobileTopbar({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="sticky top-0 z-30 border-b border-graphite-100 bg-white p-4 lg:hidden">
      <div className="container-shell flex items-center justify-between">
        <Link href="/admin/dashboard" className="font-black text-navy-900">
          Apex Admin
        </Link>
        <button
          onClick={onOpen}
          className="rounded-brand border border-graphite-100 p-2 text-navy-900"
          aria-label="Open admin menu"
        >
          <Menu size={22} />
        </button>
      </div>
    </div>
  );
}

function MobileDrawer({
  open,
  pathname,
  onClose,
  onLogout,
}: {
  open: boolean;
  pathname: string;
  onClose: () => void;
  onLogout: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        className="absolute inset-0 bg-navy-900/50"
        onClick={onClose}
        aria-label="Close admin menu"
      />
      <aside className="absolute inset-y-0 left-0 w-[min(88vw,320px)] overflow-y-auto bg-white p-5 shadow-soft">
        <div className="flex items-center justify-between">
          <Link
            onClick={onClose}
            href="/admin/dashboard"
            className="text-xl font-black text-navy-900"
          >
            Apex Admin
          </Link>
          <button
            onClick={onClose}
            className="rounded-brand p-2 text-graphite-500 hover:bg-graphite-50"
            aria-label="Close admin menu"
          >
            <X size={22} />
          </button>
        </div>
        <nav className="mt-6 space-y-1" aria-label="Mobile admin navigation">
          {links.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                onClick={onClose}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-brand px-4 py-3 text-sm font-semibold",
                  active
                    ? "bg-navy-900 text-white"
                    : "text-graphite-700 hover:bg-graphite-50 hover:text-orange-600",
                )}
              >
                <Icon size={19} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={onLogout}
          className="mt-6 flex w-full items-center gap-3 rounded-brand px-4 py-3 text-sm font-bold text-orange-600 hover:bg-orange-100"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>
    </div>
  );
}
