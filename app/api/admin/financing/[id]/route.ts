import { itemHandlers } from "@/lib/server/admin-crud";
import { parseJsonList } from "@/lib/server/format";
const handlers = itemHandlers({ table: "financing_plans", fields: ["title", "description", "features", "button_text", "button_url", "sort_order", "status"], beforeSave: (d) => ({ ...d, features: parseJsonList(d.features) }) });
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
