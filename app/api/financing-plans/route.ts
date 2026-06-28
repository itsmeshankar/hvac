import { queryRows } from "@/lib/server/db";
import { ok, serverError } from "@/lib/server/responses";

export async function GET() {
  try {
    const rows = await queryRows("SELECT * FROM financing_plans WHERE status='published' ORDER BY sort_order ASC, id ASC");
    return ok(rows);
  } catch (error) { return serverError(error); }
}
