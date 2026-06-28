"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function StatusTable({ title, endpoint, statuses }: { title: string; endpoint: string; statuses: string[] }) {
  const [rows, setRows] = useState<any[]>([]);
  async function load() { const res = await fetch(endpoint); const json = await res.json(); setRows(json.data ?? []); }
  useEffect(() => { load(); }, []);
  async function update(id: number, status: string) { await fetch(`${endpoint}/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) }); await load(); }
  return <div><h1 className="mb-8 text-3xl font-black text-navy-900">{title}</h1><div className="overflow-x-auto rounded-brand bg-white shadow-sm"><table className="w-full min-w-[900px] text-left text-sm"><thead className="bg-graphite-50 text-xs uppercase tracking-[0.14em] text-graphite-500"><tr><th className="p-4">Name</th><th className="p-4">Phone</th><th className="p-4">Email</th><th className="p-4">Service</th><th className="p-4">Message</th><th className="p-4">Status</th></tr></thead><tbody>{rows.map((row) => <tr key={row.id} className="border-t border-graphite-100"><td className="p-4 font-bold">{row.full_name}</td><td className="p-4">{row.phone}</td><td className="p-4">{row.email}</td><td className="p-4">{row.service_needed}</td><td className="max-w-xs truncate p-4">{row.message}</td><td className="p-4"><select value={row.status} onChange={(e) => update(row.id, e.target.value)} className="rounded-brand border border-graphite-100 p-2">{statuses.map((status) => <option key={status}>{status}</option>)}</select></td></tr>)}</tbody></table></div></div>;
}
