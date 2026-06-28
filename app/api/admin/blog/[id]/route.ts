import { itemHandlers } from "@/lib/server/admin-crud";
const handlers = itemHandlers({ table: "blog_posts", fields: ["category_id", "title", "slug", "excerpt", "content", "featured_image", "author_name", "meta_title", "meta_description", "keywords", "status", "published_at"] });
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
