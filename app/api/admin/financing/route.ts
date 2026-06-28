import { collectionHandlers } from "@/lib/server/admin-crud";
import { parseJsonList } from "@/lib/server/format";
const handlers = collectionHandlers({ table: "financing_plans", fields: ["title", "description", "features", "button_text", "button_url", "sort_order", "status"], required: ["title"], orderBy: "sort_order ASC, id DESC", beforeSave: (d) => ({ ...d, features: parseJsonList(d.features) }) });
export const GET = handlers.GET;
export const POST = handlers.POST;
