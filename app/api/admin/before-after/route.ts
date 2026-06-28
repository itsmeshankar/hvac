import { collectionHandlers } from "@/lib/server/admin-crud";
const handlers = collectionHandlers({ table: "before_after_projects", fields: ["title", "slug", "location", "service_type", "before_image", "after_image", "project_summary", "completion_time", "customer_review", "rating", "is_featured", "status"], required: ["title", "slug", "before_image", "after_image"], orderBy: "is_featured DESC, id DESC" });
export const GET = handlers.GET;
export const POST = handlers.POST;
