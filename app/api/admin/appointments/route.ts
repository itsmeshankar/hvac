import { queryRows } from "@/lib/server/db";
import { ok, requireAdmin, serverError, unauthorized } from "@/lib/server/responses";
export async function GET() { try { const user = await requireAdmin(); if (!user) return unauthorized(); return ok(await queryRows("SELECT * FROM appointments ORDER BY created_at DESC")); } catch (error) { return serverError(error); } }
