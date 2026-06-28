import { itemHandlers } from "@/lib/server/admin-crud";
const handlers = itemHandlers({ table: "service_areas", fields: ["city", "state", "slug", "hero_title", "description", "featured_image", "meta_title", "meta_description", "status"] });
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
