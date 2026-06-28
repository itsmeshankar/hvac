import { queryRows } from "@/lib/server/db";
import { ok, serverError } from "@/lib/server/responses";

export async function GET() {
  try {
    const rows = await queryRows("SELECT bp.*, bc.name AS category_name FROM blog_posts bp LEFT JOIN blog_categories bc ON bc.id=bp.category_id WHERE bp.status='published' ORDER BY bp.published_at DESC, bp.created_at DESC");
    return ok(rows);
  } catch (error) { return serverError(error); }
}
