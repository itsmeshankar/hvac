import { queryRows } from "@/lib/server/db";
import { ok, serverError } from "@/lib/server/responses";

export async function GET() {
  try {
    const rows = await queryRows("SELECT * FROM before_after_projects WHERE status='published' ORDER BY is_featured DESC, created_at DESC");
    return ok(rows);
  } catch (error) { return serverError(error); }
}
