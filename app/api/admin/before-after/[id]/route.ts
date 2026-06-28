import { itemHandlers } from "@/lib/server/admin-crud";
const handlers = itemHandlers({ table: "before_after_projects", fields: ["title", "slug", "location", "service_type", "before_image", "after_image", "project_summary", "completion_time", "customer_review", "rating", "is_featured", "status"] });
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
