import { NextResponse } from "next/server";
import { getAdminFromCookie } from "@/lib/server/auth";

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ success: true, data }, init);
}

export function created<T>(data: T) {
  return ok(data, { status: 201 });
}

export function badRequest(message = "Invalid request") {
  return NextResponse.json({ success: false, message }, { status: 400 });
}

export function unauthorized(message = "Unauthorized") {
  return NextResponse.json({ success: false, message }, { status: 401 });
}

export function forbidden(message = "Forbidden") {
  return NextResponse.json({ success: false, message }, { status: 403 });
}

export function serverError(error: unknown) {
  console.error(error);
  return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
}

export async function requireAdmin() {
  const user = await getAdminFromCookie();
  if (!user) return null;
  return user;
}
