import { itemHandlers } from "@/lib/server/admin-crud";
const handlers = itemHandlers({ table: "testimonials", fields: ["customer_name", "customer_location", "rating", "review_text", "customer_image", "video_url", "source", "is_featured", "status"] });
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
