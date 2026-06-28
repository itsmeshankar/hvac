import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";
import bcrypt from "bcryptjs";
import { queryOne } from "@/lib/server/db";

export type AdminUser = {
  id: number;
  name: string;
  email: string;
  role: "superadmin" | "admin";
};

type TokenPayload = AdminUser & { exp: number };

const COOKIE_NAME = "hvac_admin_token";
const DAY = 60 * 60 * 24;

function secret() {
  return process.env.JWT_SECRET || "dev-only-change-this-secret";
}

function base64url(input: string | Buffer) {
  return Buffer.from(input).toString("base64url");
}

function sign(data: string) {
  return createHmac("sha256", secret()).update(data).digest("base64url");
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function createToken(user: AdminUser, maxAge = DAY) {
  const payload: TokenPayload = { ...user, exp: Math.floor(Date.now() / 1000) + maxAge };
  const body = base64url(JSON.stringify(payload));
  return `${body}.${sign(body)}`;
}

export function verifyToken(token?: string): AdminUser | null {
  if (!token || !token.includes(".")) return null;
  const [body, signature] = token.split(".");
  const expected = sign(body);
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return null;
  const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as TokenPayload;
  if (payload.exp < Math.floor(Date.now() / 1000)) return null;
  return { id: payload.id, name: payload.name, email: payload.email, role: payload.role };
}

export async function getAdminFromCookie() {
  const store = await cookies();
  return verifyToken(store.get(COOKIE_NAME)?.value);
}

export async function setAdminCookie(user: AdminUser) {
  const store = await cookies();
  store.set(COOKIE_NAME, createToken(user), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: DAY });
}

export async function clearAdminCookie() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function findAdminByEmail(email: string) {
  return queryOne<AdminUser & { password_hash: string; status: string }>("SELECT id, name, email, role, password_hash, status FROM users WHERE email = :email LIMIT 1", { email });
}
