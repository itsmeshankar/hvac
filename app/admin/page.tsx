export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";
import { getAdminFromCookie } from "@/lib/server/auth";
export default async function AdminIndex() { if (await getAdminFromCookie()) redirect("/admin/dashboard"); redirect("/admin/login"); }

