import { queryRows } from "@/lib/server/db";
import { ok, serverError } from "@/lib/server/responses";

export async function GET() {
  try {
    const rows = await queryRows("SELECT * FROM service_areas WHERE status='published' ORDER BY city ASC");
    return ok(rows);
  } catch (error) { return serverError(error); }
}
