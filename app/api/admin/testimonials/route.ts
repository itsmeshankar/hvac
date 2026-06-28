import { collectionHandlers } from "@/lib/server/admin-crud";
const handlers = collectionHandlers({ table: "testimonials", fields: ["customer_name", "customer_location", "rating", "review_text", "customer_image", "video_url", "source", "is_featured", "status"], required: ["customer_name", "review_text"], orderBy: "is_featured DESC, id DESC" });
export const GET = handlers.GET;
export const POST = handlers.POST;
