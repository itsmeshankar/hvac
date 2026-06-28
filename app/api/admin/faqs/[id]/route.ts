import { itemHandlers } from "@/lib/server/admin-crud";
const handlers = itemHandlers({ table: "faqs", fields: ["question", "answer", "category", "sort_order", "status"] });
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
