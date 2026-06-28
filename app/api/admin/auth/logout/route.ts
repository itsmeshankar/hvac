import { clearAdminCookie } from "@/lib/server/auth";
import { ok } from "@/lib/server/responses";

export async function POST() {
  await clearAdminCookie();
  return ok({ loggedOut: true });
}
