import { collectionHandlers } from "@/lib/server/admin-crud";
const handlers = collectionHandlers({ table: "service_areas", fields: ["city", "state", "slug", "hero_title", "description", "featured_image", "meta_title", "meta_description", "status"], required: ["city", "slug"], orderBy: "city ASC" });
export const GET = handlers.GET;
export const POST = handlers.POST;
