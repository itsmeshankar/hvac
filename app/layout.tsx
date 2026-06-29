import "./globals.css";
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteChrome } from "@/components/layout/site-chrome";
import { getSiteSettings } from "@/lib/api";
import { business } from "@/lib/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: `${business.name} | Premium HVAC Services`,
    template: `%s | ${business.name}`,
  },
  description:
    "Premium HVAC repair, installation, maintenance, financing, and indoor air quality services.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-white text-graphite-900 antialiased`}
      >
        <SiteChrome settings={settings}>{children}</SiteChrome>
      </body>
    </html>
  );
}
