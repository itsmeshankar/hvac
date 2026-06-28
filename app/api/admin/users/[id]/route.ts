import { z } from "zod";
import { execute } from "@/lib/server/db";
import { hashPassword } from "@/lib/server/auth";
import { badRequest, forbidden, ok, requireAdmin, serverError, unauthorized } from "@/lib/server/responses";

const schema = z.object({ name: z.string().min(2).optional(), email: z.string().email().optional(), password: z.string().min(8).optional(), role: z.enum(["superadmin", "admin"]).optional(), status: z.enum(["active", "inactive"]).optional() });

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireAdmin(); if (!user) return unauthorized(); if (user.role !== "superadmin") return forbidden("Super admin required");
    const { id } = await params; const parsed = schema.safeParse(await request.json()); if (!parsed.success) return badRequest("Invalid user");
    const data: Record<string, unknown> = { ...parsed.data };
    if (data.password) { data.password_hash = await hashPassword(String(data.password)); delete data.password; }
    const fields = Object.keys(data); if (!fields.length) return badRequest("No fields to update");
    await execute(`UPDATE users SET ${fields.map((f) => `${f}=:${f}`).join(", ")} WHERE id=:id`, { ...data, id: Number(id) });
    return ok({ id: Number(id) });
  } catch (error) { return serverError(error); }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try { const user = await requireAdmin(); if (!user) return unauthorized(); if (user.role !== "superadmin") return forbidden("Super admin required"); const { id } = await params; if (Number(id) === user.id) return badRequest("Cannot delete yourself"); await execute("DELETE FROM users WHERE id=:id AND role <> 'superadmin'", { id: Number(id) }); return ok({ id: Number(id) }); } catch (error) { return serverError(error); }
}
