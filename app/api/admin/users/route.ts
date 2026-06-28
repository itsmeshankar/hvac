import { z } from "zod";
import { execute, queryRows } from "@/lib/server/db";
import { hashPassword } from "@/lib/server/auth";
import { badRequest, created, forbidden, ok, requireAdmin, serverError, unauthorized } from "@/lib/server/responses";

const schema = z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(8).optional(), role: z.enum(["superadmin", "admin"]), status: z.enum(["active", "inactive"]).default("active") });

export async function GET() {
  try { const user = await requireAdmin(); if (!user) return unauthorized(); return ok(await queryRows("SELECT id, name, email, role, status, last_login_at, created_at FROM users ORDER BY id DESC")); } catch (error) { return serverError(error); }
}

export async function POST(request: Request) {
  try {
    const user = await requireAdmin(); if (!user) return unauthorized(); if (user.role !== "superadmin") return forbidden("Super admin required");
    const parsed = schema.safeParse(await request.json()); if (!parsed.success || !parsed.data.password) return badRequest("Valid user and password required");
    if (parsed.data.role === "superadmin" && user.role !== "superadmin") return forbidden("Cannot create super admin");
    const password_hash = await hashPassword(parsed.data.password);
    const result = await execute("INSERT INTO users (name, email, password_hash, role, status) VALUES (:name, :email, :password_hash, :role, :status)", { ...parsed.data, password_hash });
    return created({ id: result.insertId });
  } catch (error) { return serverError(error); }
}
