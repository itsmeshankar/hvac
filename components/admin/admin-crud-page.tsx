"use client";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageUploadField } from "@/components/admin/fields/image-upload-field";
import { RichTextField } from "@/components/admin/fields/rich-text-field";

type Field = { name: string; label: string; type?: "text" | "textarea" | "number" | "select" | "date" | "password" | "image" | "richtext"; options?: string[]; required?: boolean; placeholder?: string; folder?: string };

type Props = { title: string; endpoint: string; fields: Field[]; idField?: string; note?: string };

export function AdminCrudPage({ title, endpoint, fields, idField = "id", note }: Props) {
  const [rows, setRows] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [message, setMessage] = useState("");
  const empty = useMemo(() => Object.fromEntries(fields.map((field) => [field.name, field.options?.[0] ?? ""])), [fields]);

  async function load() {
    const res = await fetch(endpoint);
    const json = await res.json();
    setRows(json.data ?? []);
  }

  useEffect(() => { load(); }, []);

  async function submit(formData: FormData) {
    setMessage("");
    const data = Object.fromEntries(fields.map((field) => [field.name, formData.get(field.name)]));
    const id = editing?.[idField];
    const res = await fetch(id ? `${endpoint}/${id}` : endpoint, { method: id ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setMessage(res.ok ? "Saved." : "Save failed.");
    if (res.ok) { setEditing(null); await load(); }
  }

  async function remove(row: any) {
    if (!confirm("Delete this record?")) return;
    const res = await fetch(`${endpoint}/${row[idField]}`, { method: "DELETE" });
    setMessage(res.ok ? "Deleted." : "Delete failed.");
    await load();
  }

  const values = editing ?? empty;

  return <div><div className="mb-8"><h1 className="text-3xl font-black text-navy-900">{title}</h1>{note ? <p className="mt-2 text-graphite-500">{note}</p> : null}</div><form action={submit} className="rounded-brand bg-white p-6 shadow-sm"><div className="grid gap-4 md:grid-cols-2">{fields.map((field) => renderField(field, values[field.name]))}</div><div className="mt-5 flex gap-3"><Button>{editing ? "Update" : "Create"}</Button>{editing ? <Button type="button" variant="outline" onClick={() => setEditing(null)}>Cancel</Button> : null}</div>{message ? <p className="mt-4 text-sm font-bold text-sky-600">{message}</p> : null}</form><div className="mt-8 overflow-x-auto rounded-brand bg-white shadow-sm"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-graphite-50 text-xs uppercase tracking-[0.14em] text-graphite-500"><tr>{fields.slice(0, 4).map((field) => <th key={field.name} className="p-4">{field.label}</th>)}<th className="p-4">Actions</th></tr></thead><tbody>{rows.map((row) => <tr key={row[idField]} className="border-t border-graphite-100">{fields.slice(0, 4).map((field) => <td key={field.name} className="max-w-xs truncate p-4">{field.type === "image" && row[field.name] ? <img src={String(row[field.name])} alt="" className="h-12 w-16 rounded object-cover" /> : stripHtml(String(row[field.name] ?? ""))}</td>)}<td className="p-4"><button className="font-bold text-sky-600" onClick={() => setEditing(row)}>Edit</button><button className="ml-4 font-bold text-orange-600" onClick={() => remove(row)}>Delete</button></td></tr>)}</tbody></table></div></div>;
}

function renderField(field: Field, value: unknown) {
  const stringValue = String(value ?? "");
  if (field.type === "image") return <ImageUploadField key={field.name} name={field.name} label={field.label} value={stringValue} folder={field.folder} required={field.required} />;
  if (field.type === "richtext") return <RichTextField key={field.name} name={field.name} label={field.label} value={stringValue} required={field.required} />;

  const common = { name: field.name, defaultValue: stringValue, required: field.required, placeholder: field.placeholder, className: "mt-2 w-full rounded-brand border border-graphite-100 p-3 font-normal text-graphite-900" };
  const control = field.type === "textarea" ? <textarea {...common} rows={4} /> : field.type === "select" ? <select {...common}>{(field.options ?? []).map((option) => <option key={option} value={option}>{option}</option>)}</select> : <input {...common} type={field.type ?? "text"} />;
  return <label key={field.name} className="text-sm font-bold text-navy-900">{field.label}{control}</label>;
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
