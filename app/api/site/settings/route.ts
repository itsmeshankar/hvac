import { queryOne } from "@/lib/server/db";
import { ok, serverError } from "@/lib/server/responses";

export async function GET() {
  try {
    const settings = await queryOne("SELECT * FROM website_settings ORDER BY id ASC LIMIT 1");
    return ok(settings);
  } catch (error) { return serverError(error); }
}
