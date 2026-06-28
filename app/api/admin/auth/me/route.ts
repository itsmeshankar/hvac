import { getAdminFromCookie } from "@/lib/server/auth";
import { ok, unauthorized } from "@/lib/server/responses";

export async function GET() {
  const user = await getAdminFromCookie();
  if (!user) return unauthorized();
  return ok(user);
}
