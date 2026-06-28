"use client";
import { ImagePlus, Loader2, X } from "lucide-react";
import { useState } from "react";

export function ImageUploadField({ name, label, value, folder = "general", required }: { name: string; label: string; value?: string; folder?: string; required?: boolean }) {
  const [path, setPath] = useState(value ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function upload(file?: File) {
    if (!file) return;
    setLoading(true);
    setError("");
    const form = new FormData();
    form.set("file", file);
    form.set("folder", folder);
    form.set("alt_text", label);
    const res = await fetch("/api/admin/media/upload", { method: "POST", body: form });
    const json = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) { setError(json.message ?? "Upload failed"); return; }
    setPath(json.data?.path ?? "");
  }

  return (
    <div className="text-sm font-bold text-navy-900">
      <span>{label}</span>
      <input name={name} value={path} required={required} readOnly className="sr-only" />
      <div className="mt-2 rounded-brand border border-dashed border-graphite-100 bg-graphite-50 p-4">
        {path ? <div className="mb-3 overflow-hidden rounded-brand border border-graphite-100 bg-white"><img src={path} alt="" className="h-40 w-full object-contain p-3" /></div> : null}
        <div className="flex flex-wrap items-center gap-3">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-brand bg-navy-900 px-4 py-2 text-sm font-bold text-white hover:bg-navy-800">
            {loading ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />}
            {path ? "Replace image" : "Upload image"}
            <input type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml" className="sr-only" onChange={(event) => upload(event.target.files?.[0])} />
          </label>
          {path ? <button type="button" onClick={() => setPath("")} className="inline-flex items-center gap-2 rounded-brand px-3 py-2 text-sm font-bold text-orange-600 hover:bg-orange-100"><X size={16} />Remove</button> : null}
        </div>
        {path ? <p className="mt-3 break-all text-xs font-normal text-graphite-500">{path}</p> : <p className="mt-3 text-xs font-normal text-graphite-500">JPG, PNG, WEBP, or SVG up to 2MB.</p>}
        {error ? <p className="mt-2 text-sm text-orange-600">{error}</p> : null}
      </div>
    </div>
  );
}
