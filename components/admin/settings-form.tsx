"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageUploadField } from "@/components/admin/fields/image-upload-field";

type Settings = Record<string, string | null>;

const fields = [
  ["site_name", "Site name"], ["primary_phone", "Primary phone"], ["secondary_phone", "Secondary phone"], ["email", "Email"], ["address", "Address"], ["business_hours", "Business hours"], ["favicon", "Favicon path"], ["facebook_url", "Facebook URL"], ["instagram_url", "Instagram URL"], ["linkedin_url", "LinkedIn URL"], ["google_business_url", "Google Business URL"],
];

export function SettingsForm({ settings }: { settings: Settings | null }) {
  const [message, setMessage] = useState("");

  async function save(formData: FormData) {
    setMessage("");
    const res = await fetch("/api/admin/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(formData)) });
    setMessage(res.ok ? "Organization information saved." : "Save failed.");
  }

  return <form action={save} className="mt-8 rounded-brand bg-white p-6 shadow-sm"><div className="grid gap-4 md:grid-cols-2"><ImageUploadField name="logo" label="Logo" value={settings?.logo ?? ""} folder="settings" /><div className="rounded-brand bg-graphite-50 p-4 text-sm text-graphite-600"><p className="font-bold text-navy-900">Logo usage</p><p className="mt-2">The uploaded logo appears in the public header and footer. Use PNG, WEBP, JPG, or SVG.</p></div>{fields.map(([name, label]) => <label key={name} className="text-sm font-bold text-navy-900">{label}<input name={name} defaultValue={settings?.[name] ?? ""} className="mt-2 w-full rounded-brand border border-graphite-100 p-3 font-normal" /></label>)}</div><Button className="mt-6">Save Settings</Button>{message ? <p className="mt-4 text-sm font-bold text-sky-600">{message}</p> : null}</form>;
}
