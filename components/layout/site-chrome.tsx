"use client";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingCallButton } from "@/components/layout/floating-call-button";
import type { SiteSettings } from "@/types/content";

export function SiteChrome({ children, settings }: { children: ReactNode; settings: SiteSettings }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Header settings={settings} />
      <main>{children}</main>
      <Footer settings={settings} />
      <FloatingCallButton phone={settings.phone} />
    </>
  );
}
