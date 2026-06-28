export const dynamic = "force-dynamic";
import { queryOne, queryRows } from "@/lib/server/db";

export default async function DashboardPage() {
  const stats = await queryOne<any>(`SELECT (SELECT COUNT(*) FROM appointments WHERE status='new') AS newAppointments, (SELECT COUNT(*) FROM contact_leads WHERE status='new') AS newLeads, (SELECT COUNT(*) FROM blog_posts) AS blogPosts, (SELECT COUNT(*) FROM services) AS services`);
  const appointments = await queryRows<any>("SELECT * FROM appointments ORDER BY created_at DESC LIMIT 5");
  return <div><h1 className="text-3xl font-black text-navy-900">Dashboard</h1><div className="mt-8 grid gap-5 md:grid-cols-4">{[["New Appointments", stats?.newAppointments], ["New Leads", stats?.newLeads], ["Blog Posts", stats?.blogPosts], ["Services", stats?.services]].map(([label, value]) => <article key={String(label)} className="rounded-brand bg-white p-6 shadow-sm"><p className="text-sm font-bold text-graphite-500">{label}</p><p className="mt-3 text-4xl font-black text-navy-900">{String(value ?? 0)}</p></article>)}</div><section className="mt-8 rounded-brand bg-white p-6 shadow-sm"><h2 className="text-xl font-bold text-navy-900">Latest Appointments</h2><div className="mt-4 divide-y divide-graphite-100">{appointments.map((item) => <div key={item.id} className="py-4"><p className="font-bold">{item.full_name} · {item.service_needed}</p><p className="text-sm text-graphite-500">{item.phone} · {item.status}</p></div>)}</div></section></div>;
}

