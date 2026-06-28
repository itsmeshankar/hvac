import { collectionHandlers } from "@/lib/server/admin-crud";
const handlers = collectionHandlers({ table: "faqs", fields: ["question", "answer", "category", "sort_order", "status"], required: ["question", "answer"], orderBy: "sort_order ASC, id DESC" });
export const GET = handlers.GET;
export const POST = handlers.POST;
