import { queryOne } from "@/lib/server/db";
import { ok, serverError } from "@/lib/server/responses";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const row = await queryOne("SELECT bp.*, bc.name AS category_name FROM blog_posts bp LEFT JOIN blog_categories bc ON bc.id=bp.category_id WHERE bp.slug=:slug AND bp.status='published' LIMIT 1", { slug });
    return ok(row);
  } catch (error) { return serverError(error); }
}
