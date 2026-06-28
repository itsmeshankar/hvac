import { collectionHandlers } from "@/lib/server/admin-crud";
import { parseJsonList } from "@/lib/server/format";
const handlers = collectionHandlers({ table: "services", fields: ["title", "slug", "short_description", "description", "icon", "featured_image", "benefits", "common_problems", "process_steps", "faq_content", "meta_title", "meta_description", "status", "sort_order"], required: ["title", "slug"], orderBy: "sort_order ASC, id DESC", beforeSave: (d) => ({ ...d, benefits: parseJsonList(d.benefits), common_problems: parseJsonList(d.common_problems), process_steps: parseJsonList(d.process_steps) }) });
export const GET = handlers.GET;
export const POST = handlers.POST;
