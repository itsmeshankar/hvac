import { z } from "zod";
import { execute } from "@/lib/server/db";
import { badRequest, created, serverError } from "@/lib/server/responses";

const schema = z.object({ email: z.string().email() });

export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return badRequest("Invalid email");
    await execute("INSERT INTO newsletter_subscribers (email, status) VALUES (:email, 'active') ON DUPLICATE KEY UPDATE status='active'", parsed.data);
    return created({ email: parsed.data.email });
  } catch (error) { return serverError(error); }
}
