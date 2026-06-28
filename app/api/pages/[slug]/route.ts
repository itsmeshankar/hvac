import { queryOne, queryRows } from "@/lib/server/db";
import { ok, serverError } from "@/lib/server/responses";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const page = await queryOne<any>("SELECT * FROM pages WHERE slug=:slug AND status='published' LIMIT 1", { slug });
    if (!page) return ok(null);
    const sections = await queryRows<any>("SELECT * FROM page_sections WHERE page_id=:page_id AND is_active=1 ORDER BY sort_order ASC, id ASC", { page_id: page.id });
    return ok({ ...page, sections });
  } catch (error) { return serverError(error); }
}
