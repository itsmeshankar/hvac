import { NextResponse } from "next/server";
import { execute, queryRows } from "@/lib/server/db";
import { badRequest, created, forbidden, ok, requireAdmin, serverError, unauthorized } from "@/lib/server/responses";
import { slugify } from "@/lib/server/format";

type CrudConfig = {
  table: string;
  fields: string[];
  required?: string[];
  orderBy?: string;
  superAdminOnlyDelete?: boolean;
  beforeSave?: (data: Record<string, unknown>) => Record<string, unknown>;
};

function cleanData(config: CrudConfig, input: Record<string, unknown>) {
  const data: Record<string, unknown> = {};
  for (const field of config.fields) {
    if (field in input) data[field] = input[field] === "" ? null : input[field];
  }
  if ("title" in data && !("slug" in data && data.slug)) data.slug = slugify(String(data.title));
  if ("city" in data && !("slug" in data && data.slug)) data.slug = slugify(String(data.city));
  return config.beforeSave ? config.beforeSave(data) : data;
}

function validateRequired(config: CrudConfig, data: Record<string, unknown>) {
  for (const field of config.required ?? []) {
    if (!data[field]) return `${field} is required`;
  }
  return null;
}

export function collectionHandlers(config: CrudConfig) {
  return {
    async GET() {
      try {
        const user = await requireAdmin();
        if (!user) return unauthorized();
        const rows = await queryRows(`SELECT * FROM ${config.table} ORDER BY ${config.orderBy ?? "id DESC"}`);
        return ok(rows);
      } catch (error) { return serverError(error); }
    },
    async POST(request: Request) {
      try {
        const user = await requireAdmin();
        if (!user) return unauthorized();
        const data = cleanData(config, await request.json());
        const missing = validateRequired(config, data);
        if (missing) return badRequest(missing);
        const fields = Object.keys(data);
        const columns = fields.join(", ");
        const values = fields.map((field) => `:${field}`).join(", ");
        const result = await execute(`INSERT INTO ${config.table} (${columns}) VALUES (${values})`, data);
        return created({ id: result.insertId });
      } catch (error) { return serverError(error); }
    },
  };
}

export function itemHandlers(config: CrudConfig) {
  return {
    async PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
      try {
        const user = await requireAdmin();
        if (!user) return unauthorized();
        const { id } = await params;
        const data = cleanData(config, await request.json());
        const fields = Object.keys(data);
        if (!fields.length) return badRequest("No fields to update");
        const assignments = fields.map((field) => `${field} = :${field}`).join(", ");
        await execute(`UPDATE ${config.table} SET ${assignments} WHERE id = :id`, { ...data, id: Number(id) });
        return ok({ id: Number(id) });
      } catch (error) { return serverError(error); }
    },
    async DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
      try {
        const user = await requireAdmin();
        if (!user) return unauthorized();
        if (config.superAdminOnlyDelete && user.role !== "superadmin") return forbidden("Super admin required");
        const { id } = await params;
        await execute(`DELETE FROM ${config.table} WHERE id = :id`, { id: Number(id) });
        return ok({ id: Number(id) });
      } catch (error) { return serverError(error); }
    },
  };
}

export function jsonRoute(handler: () => Promise<unknown>) {
  return async function GET() {
    try {
      const user = await requireAdmin();
      if (!user) return unauthorized();
      return NextResponse.json({ success: true, data: await handler() });
    } catch (error) { return serverError(error); }
  };
}
