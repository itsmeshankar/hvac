import { z } from "zod";
import { execute } from "@/lib/server/db";
import { findAdminByEmail, setAdminCookie, verifyPassword } from "@/lib/server/auth";
import { badRequest, ok, serverError, unauthorized } from "@/lib/server/responses";

const schema = z.object({ email: z.string().email(), password: z.string().min(1) });

export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return badRequest("Invalid login");
    const user = await findAdminByEmail(parsed.data.email);
    if (!user || user.status !== "active") return unauthorized("Invalid credentials");
    const valid = await verifyPassword(parsed.data.password, user.password_hash);
    if (!valid) return unauthorized("Invalid credentials");
    await execute("UPDATE users SET last_login_at = NOW() WHERE id = :id", { id: user.id });
    const safeUser = { id: user.id, name: user.name, email: user.email, role: user.role };
    await setAdminCookie(safeUser);
    return ok(safeUser);
  } catch (error) { return serverError(error); }
}
