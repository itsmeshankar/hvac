import { z } from "zod";
import { queryOne } from "@/lib/server/db";
import { badRequest, ok, serverError } from "@/lib/server/responses";

const schema = z.object({ email: z.string().email() });

export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return badRequest("Invalid email");
    await queryOne("SELECT id FROM users WHERE email=:email LIMIT 1", parsed.data);
    return ok({ message: "If that email exists, a reset workflow can be sent by the configured mail provider." });
  } catch (error) { return serverError(error); }
}
