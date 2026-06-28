import path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import { execute } from "@/lib/server/db";
import { badRequest, created, requireAdmin, serverError, unauthorized } from "@/lib/server/responses";

const allowed = new Set(["image/jpeg", "image/png", "image/webp", "image/svg+xml"]);
const maxSize = 2 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const user = await requireAdmin();
    if (!user) return unauthorized();

    const formData = await request.formData();
    const file = formData.get("file");
    const folder = String(formData.get("folder") ?? "general").replace(/[^a-z0-9-]/gi, "") || "general";
    const altText = String(formData.get("alt_text") ?? "");

    if (!(file instanceof File)) return badRequest("Image is required");
    if (!allowed.has(file.type)) return badRequest("Only JPG, PNG, WEBP, and SVG images are allowed");
    if (file.size > maxSize) return badRequest("Image must be 2MB or smaller");

    const ext = path.extname(file.name).toLowerCase() || ".jpg";
    const base = path.basename(file.name, ext).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "image";
    const fileName = `${base}-${Date.now()}${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
    await mkdir(uploadDir, { recursive: true });
    const bytes = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(uploadDir, fileName), bytes);

    const filePath = `/uploads/${folder}/${fileName}`;
    await execute("INSERT INTO media_library (file_name, file_path, file_type, file_size, alt_text, uploaded_by) VALUES (:file_name, :file_path, :file_type, :file_size, :alt_text, :uploaded_by)", { file_name: fileName, file_path: filePath, file_type: file.type, file_size: file.size, alt_text: altText || null, uploaded_by: user.id });

    return created({ path: filePath, fileName });
  } catch (error) { return serverError(error); }
}
