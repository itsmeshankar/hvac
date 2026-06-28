import { queryOne } from "@/lib/server/db";
import { ok, serverError } from "@/lib/server/responses";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const row = await queryOne("SELECT * FROM services WHERE slug=:slug AND status='published' LIMIT 1", { slug });
    return ok(row);
  } catch (error) { return serverError(error); }
}
