import { execute, queryOne } from "@/lib/server/db";
import { badRequest, ok, requireAdmin, serverError, unauthorized } from "@/lib/server/responses";

export async function GET() {
  try {
    const user = await requireAdmin();
    if (!user) return unauthorized();
    return ok(await queryOne("SELECT * FROM website_settings ORDER BY id ASC LIMIT 1"));
  } catch (error) { return serverError(error); }
}

export async function PUT(request: Request) {
  try {
    const user = await requireAdmin();
    if (!user) return unauthorized();
    const data = await request.json();
    if (!data.site_name) return badRequest("site_name is required");
    await execute(`INSERT INTO website_settings (id, site_name, logo, favicon, primary_phone, secondary_phone, email, address, business_hours, facebook_url, instagram_url, linkedin_url, google_business_url)
      VALUES (1, :site_name, :logo, :favicon, :primary_phone, :secondary_phone, :email, :address, :business_hours, :facebook_url, :instagram_url, :linkedin_url, :google_business_url)
      ON DUPLICATE KEY UPDATE site_name=VALUES(site_name), logo=VALUES(logo), favicon=VALUES(favicon), primary_phone=VALUES(primary_phone), secondary_phone=VALUES(secondary_phone), email=VALUES(email), address=VALUES(address), business_hours=VALUES(business_hours), facebook_url=VALUES(facebook_url), instagram_url=VALUES(instagram_url), linkedin_url=VALUES(linkedin_url), google_business_url=VALUES(google_business_url)`, {
      site_name: data.site_name, logo: data.logo ?? null, favicon: data.favicon ?? null, primary_phone: data.primary_phone ?? null, secondary_phone: data.secondary_phone ?? null, email: data.email ?? null, address: data.address ?? null, business_hours: data.business_hours ?? null, facebook_url: data.facebook_url ?? null, instagram_url: data.instagram_url ?? null, linkedin_url: data.linkedin_url ?? null, google_business_url: data.google_business_url ?? null
    });
    return ok({ id: 1 });
  } catch (error) { return serverError(error); }
}
