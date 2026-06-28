export const dynamic = "force-dynamic";
import { queryOne } from "@/lib/server/db";
import { SectionHeading } from "@/components/ui/section-heading";
import { SettingsForm } from "@/components/admin/settings-form";

export default async function SettingsPage() {
  const settings = await queryOne<Record<string, string | null>>("SELECT * FROM website_settings ORDER BY id ASC LIMIT 1");
  return <div><SectionHeading title="Organization Information" eyebrow="Admin" text="Update global website settings used by header, footer, contact, and metadata." /><SettingsForm settings={settings} /></div>;
}
