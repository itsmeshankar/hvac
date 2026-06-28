import { execute, queryOne, queryRows } from "@/lib/server/db";
import { badRequest, ok, requireAdmin, serverError, unauthorized } from "@/lib/server/responses";

export async function GET() {
  try {
    const user = await requireAdmin();
    if (!user) return unauthorized();
    const rows = await queryRows<any>(`SELECT p.id AS page_id, p.title AS page_title, p.slug AS page_slug, s.id AS section_id, s.section_key, s.section_title, s.section_subtitle, s.content, s.image, s.button_text, s.button_url, s.sort_order, s.is_active
      FROM pages p
      LEFT JOIN page_sections s ON s.page_id=p.id AND s.section_key=CONCAT(p.slug, '_hero')
      ORDER BY p.id ASC`);
    return ok(rows);
  } catch (error) { return serverError(error); }
}

export async function PUT(request: Request) {
  try {
    const user = await requireAdmin();
    if (!user) return unauthorized();
    const body = await request.json();
    if (!body.page_id || !body.page_slug) return badRequest("Page is required");
    const section_key = `${body.page_slug}_hero`;
    const data = { page_id: Number(body.page_id), section_key, section_title: body.section_title ?? null, section_subtitle: body.section_subtitle ?? null, content: body.content ?? null, image: body.image ?? null, button_text: body.button_text ?? null, button_url: body.button_url ?? null };
    const existing = await queryOne<any>("SELECT id FROM page_sections WHERE page_id=:page_id AND section_key=:section_key LIMIT 1", data);
    if (existing) {
      await execute("UPDATE page_sections SET section_title=:section_title, section_subtitle=:section_subtitle, content=:content, image=:image, button_text=:button_text, button_url=:button_url, is_active=1 WHERE id=:id", { ...data, id: existing.id });
    } else {
      await execute("INSERT INTO page_sections (page_id, section_key, section_title, section_subtitle, content, image, button_text, button_url, sort_order, is_active) VALUES (:page_id, :section_key, :section_title, :section_subtitle, :content, :image, :button_text, :button_url, 0, 1)", data);
    }
    return ok({ page_id: data.page_id, section_key });
  } catch (error) { return serverError(error); }
}
