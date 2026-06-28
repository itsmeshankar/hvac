import { queryOne, queryRows } from "@/lib/server/db";
import { ok, requireAdmin, serverError, unauthorized } from "@/lib/server/responses";

export async function GET() {
  try {
    const user = await requireAdmin();
    if (!user) return unauthorized();
    const stats = await queryOne(`SELECT
      (SELECT COUNT(*) FROM appointments WHERE status='new') AS newAppointments,
      (SELECT COUNT(*) FROM contact_leads WHERE status='new') AS newLeads,
      (SELECT COUNT(*) FROM blog_posts) AS blogPosts,
      (SELECT COUNT(*) FROM services) AS services`);
    const appointments = await queryRows("SELECT * FROM appointments ORDER BY created_at DESC LIMIT 5");
    const leads = await queryRows("SELECT * FROM contact_leads ORDER BY created_at DESC LIMIT 5");
    return ok({ stats, appointments, leads });
  } catch (error) { return serverError(error); }
}
