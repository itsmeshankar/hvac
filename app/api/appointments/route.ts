import { z } from "zod";
import { execute } from "@/lib/server/db";
import { badRequest, created, serverError } from "@/lib/server/responses";

const schema = z.object({ full_name: z.string().min(2), phone: z.string().min(7), email: z.string().email().optional(), service_needed: z.string().optional(), property_type: z.enum(["residential", "commercial"]).optional(), address: z.string().optional(), preferred_date: z.string().optional(), preferred_time: z.string().optional(), message: z.string().optional(), source: z.string().optional() });

export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return badRequest("Invalid appointment");
    const v = parsed.data;
    const result = await execute("INSERT INTO appointments (full_name, phone, email, service_needed, property_type, address, preferred_date, preferred_time, message, source) VALUES (:full_name, :phone, :email, :service_needed, :property_type, :address, :preferred_date, :preferred_time, :message, :source)", { ...v, email: v.email ?? null, service_needed: v.service_needed ?? null, property_type: v.property_type ?? null, address: v.address ?? null, preferred_date: v.preferred_date || null, preferred_time: v.preferred_time ?? null, message: v.message ?? null, source: v.source ?? "website" });
    return created({ id: result.insertId });
  } catch (error) { return serverError(error); }
}
