import mysql, { type QueryResult, type ResultSetHeader } from "mysql2/promise";

type DbParams = Record<string, unknown> | unknown[];

let pool: mysql.Pool | null = null;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DATABASE_HOST ?? "localhost",
      port: Number(process.env.DATABASE_PORT ?? 3306),
      database: process.env.DATABASE_NAME ?? "hvac_website",
      user: process.env.DATABASE_USER ?? "root",
      password: process.env.DATABASE_PASSWORD ?? "",
      waitForConnections: true,
      connectionLimit: 10,
      namedPlaceholders: true,
    });
  }
  return pool;
}

export async function queryRows<T>(sql: string, params: DbParams = []) {
  const [rows] = await getPool().execute<QueryResult>(sql, params as any);
  return rows as T[];
}

export async function queryOne<T>(sql: string, params: DbParams = []) {
  const rows = await queryRows<T>(sql, params);
  return rows[0] ?? null;
}

export async function execute(sql: string, params: DbParams = []) {
  const [result] = await getPool().execute<ResultSetHeader>(sql, params as any);
  return result;
}

