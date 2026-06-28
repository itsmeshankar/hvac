"use client";
import { useEffect, useState } from "react";
import { ImageUploadField } from "@/components/admin/fields/image-upload-field";
import { Button } from "@/components/ui/button";

type HeroRow = {
  page_id: number;
  page_title: string;
  page_slug: string;
  section_title?: string | null;
  section_subtitle?: string | null;
  content?: string | null;
  image?: string | null;
  button_text?: string | null;
  button_url?: string | null;
};

export default function HeroSectionsAdminPage() {
  const [rows, setRows] = useState<HeroRow[]>([]);
  const [selected, setSelected] = useState<HeroRow | null>(null);
  const [message, setMessage] = useState("");

  async function load() {
    const res = await fetch("/api/admin/hero-sections");
    const json = await res.json();
    const data = json.data ?? [];
    setRows(data);
    setSelected((current) => current ?? data[0] ?? null);
  }

  useEffect(() => { load(); }, []);

  async function save(formData: FormData) {
    if (!selected) return;
    setMessage("");
    const payload = { ...Object.fromEntries(formData), page_id: selected.page_id, page_slug: selected.page_slug };
    const res = await fetch("/api/admin/hero-sections", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setMessage(res.ok ? "Hero section saved." : "Hero save failed.");
    if (res.ok) await load();
  }

  return <div><div className="mb-8"><h1 className="text-3xl font-black text-navy-900">Hero Sections</h1><p className="mt-2 text-graphite-500">Manage every page hero: eyebrow, title, subtitle, image, and primary CTA.</p></div><div className="grid gap-6 lg:grid-cols-[280px_1fr]"><aside className="rounded-brand bg-white p-4 shadow-sm"><p className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-graphite-500">Pages</p><div className="space-y-1">{rows.map((row) => <button key={row.page_id} onClick={() => setSelected(row)} className={`block w-full rounded-brand px-4 py-3 text-left text-sm font-bold ${selected?.page_id === row.page_id ? "bg-navy-900 text-white" : "text-graphite-700 hover:bg-graphite-50"}`}>{row.page_title}</button>)}</div></aside>{selected ? <form key={selected.page_id} action={save} className="rounded-brand bg-white p-6 shadow-sm"><h2 className="text-2xl font-black text-navy-900">{selected.page_title}</h2><div className="mt-6 grid gap-4 md:grid-cols-2"><label className="text-sm font-bold text-navy-900">Eyebrow<input name="content" defaultValue={selected.content ?? ""} className="mt-2 w-full rounded-brand border border-graphite-100 p-3 font-normal" /></label><label className="text-sm font-bold text-navy-900">Title<input name="section_title" defaultValue={selected.section_title ?? ""} className="mt-2 w-full rounded-brand border border-graphite-100 p-3 font-normal" /></label><label className="text-sm font-bold text-navy-900 md:col-span-2">Subtitle<textarea name="section_subtitle" defaultValue={selected.section_subtitle ?? ""} rows={4} className="mt-2 w-full rounded-brand border border-graphite-100 p-3 font-normal" /></label><ImageUploadField name="image" label="Hero image" value={selected.image ?? ""} folder="pages" /><div className="grid gap-4"><label className="text-sm font-bold text-navy-900">CTA button text<input name="button_text" defaultValue={selected.button_text ?? ""} className="mt-2 w-full rounded-brand border border-graphite-100 p-3 font-normal" /></label><label className="text-sm font-bold text-navy-900">CTA button URL<input name="button_url" defaultValue={selected.button_url ?? ""} placeholder="/contact" className="mt-2 w-full rounded-brand border border-graphite-100 p-3 font-normal" /></label></div></div><Button className="mt-6">Save Hero</Button>{message ? <p className="mt-4 text-sm font-bold text-sky-600">{message}</p> : null}</form> : null}</div></div>;
}
