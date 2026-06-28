export function parseJsonList(value: unknown) {
  if (Array.isArray(value)) return JSON.stringify(value);
  if (typeof value === "string") {
    const items = value.split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean);
    return JSON.stringify(items);
  }
  return JSON.stringify([]);
}

export function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
