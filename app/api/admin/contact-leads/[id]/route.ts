import { execute } from "@/lib/server/db";
import { ok, requireAdmin, serverError, unauthorized } from "@/lib/server/responses";
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) { try { const user = await requireAdmin(); if (!user) return unauthorized(); const { id } = await params; const body = await request.json(); await execute("UPDATE contact_leads SET status=:status WHERE id=:id", { id: Number(id), status: body.status ?? "new" }); return ok({ id: Number(id) }); } catch (error) { return serverError(error); } }
