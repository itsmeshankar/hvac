import { z } from "zod";
import { execute } from "@/lib/server/db";
import { badRequest, created, serverError } from "@/lib/server/responses";

const schema = z.object({ full_name: z.string().min(2), phone: z.string().optional(), email: z.string().email().optional(), service_needed: z.string().optional(), address: z.string().optional(), message: z.string().optional() });

export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return badRequest("Invalid contact lead");
    const v = parsed.data;
    const result = await execute("INSERT INTO contact_leads (full_name, phone, email, service_needed, address, message) VALUES (:full_name, :phone, :email, :service_needed, :address, :message)", { ...v, phone: v.phone ?? null, email: v.email ?? null, service_needed: v.service_needed ?? null, address: v.address ?? null, message: v.message ?? null });
    return created({ id: result.insertId });
  } catch (error) { return serverError(error); }
}
