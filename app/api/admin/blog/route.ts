import { collectionHandlers } from "@/lib/server/admin-crud";
const handlers = collectionHandlers({ table: "blog_posts", fields: ["category_id", "title", "slug", "excerpt", "content", "featured_image", "author_name", "meta_title", "meta_description", "keywords", "status", "published_at"], required: ["title", "slug", "content"], orderBy: "created_at DESC" });
export const GET = handlers.GET;
export const POST = handlers.POST;
