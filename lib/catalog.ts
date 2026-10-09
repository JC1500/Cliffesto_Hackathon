import { query } from "@/lib/db";
import { products as mockProducts, type Product } from "@/lib/products";

export type CatalogProduct = Product & { imageUrl?: string };

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  price: string;
  stock: number;
  image_url: string | null;
};

const selectProducts = `
  SELECT p.id, p.slug, p.name, COALESCE(c.name, 'Uncategorized') AS category,
         p.description, p.price::text, p.stock, pi.url AS image_url
  FROM products p
  LEFT JOIN categories c ON c.id = p.category_id
  LEFT JOIN LATERAL (
    SELECT url FROM product_images WHERE product_id = p.id ORDER BY sort_order, id LIMIT 1
  ) pi ON true
  WHERE p.is_active = true
`;

function mapProduct(row: ProductRow): CatalogProduct {
  return { id: row.slug, name: row.name, category: row.category, description: row.description, price: Number(row.price), stock: row.stock, emoji: "🛍️", imageUrl: row.image_url ?? undefined };
}

function canUseDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

function escapeLike(value: string) {
  return value.replace(/[\\%_]/g, (character) => `\\${character}`);
}

export async function listCatalog() {
  if (!canUseDatabase()) return mockProducts;
  try {
    const result = await query<ProductRow>(`${selectProducts} ORDER BY p.created_at DESC, p.name ASC`);
    return result.rows.map(mapProduct);
  } catch (error) {
    console.error("Catalog database read failed; using demo catalog.", error);
    return mockProducts;
  }
}

export async function searchCatalog(input: { query: string; page: number; limit: number; category?: string }) {
  const q = input.query.trim().slice(0, 100);
  const offset = (input.page - 1) * input.limit;
  if (!canUseDatabase()) {
    const normalized = q.toLowerCase();
    const filtered = mockProducts.filter((product) => !normalized || [product.name, product.category, product.description].some((value) => value.toLowerCase().includes(normalized)));
    return { data: filtered.slice(offset, offset + input.limit), total: filtered.length, page: input.page, limit: input.limit, source: "mock" as const };
  }

  const values: unknown[] = [];
  const conditions = ["p.is_active = true"];
  if (q) {
    values.push(escapeLike(q));
    conditions.push(`(
      p.name ILIKE '%' || $${values.length} || '%' ESCAPE '\\' OR
      p.description ILIKE '%' || $${values.length} || '%' ESCAPE '\\' OR
      c.name ILIKE '%' || $${values.length} || '%' ESCAPE '\\'
    )`);
  }
  if (input.category) {
    values.push(input.category);
    conditions.push(`c.slug = $${values.length}`);
  }
  const where = ` WHERE ${conditions.join(" AND ")}`;
  const searchRank = q ? `CASE
    WHEN lower(p.name) = lower($1) THEN 100
    WHEN lower(p.name) LIKE lower($1) || '%' ESCAPE '\\' THEN 80
    WHEN lower(p.name) ILIKE '%' || $1 || '%' ESCAPE '\\' THEN 60
    WHEN c.name ILIKE '%' || $1 || '%' ESCAPE '\\' THEN 40
    WHEN p.description ILIKE '%' || $1 || '%' ESCAPE '\\' THEN 20
    ELSE 10
  END` : "";
  const countResult = await query<{ count: string }>(`SELECT count(*)::text AS count FROM products p LEFT JOIN categories c ON c.id = p.category_id${where}`, values);
  const pageValues = [...values, input.limit, offset];
  const orderBy = searchRank ? `${searchRank} DESC, ` : "";
  const result = await query<ProductRow>(`${selectProducts.replace("WHERE p.is_active = true", "")}${where} ORDER BY ${orderBy}p.created_at DESC, p.name ASC LIMIT $${pageValues.length - 1} OFFSET $${pageValues.length}`, pageValues);
  return { data: result.rows.map(mapProduct), total: Number(countResult.rows[0]?.count ?? 0), page: input.page, limit: input.limit, source: "database" as const };
}

export async function getCatalogProduct(slug: string) {
  try {
    const result = await searchCatalog({ query: "", page: 1, limit: 100 });
    return result.data.find((product) => product.id === slug) ?? mockProducts.find((product) => product.id === slug);
  } catch (error) {
    console.error("Catalog product read failed; using demo catalog.", error);
    return mockProducts.find((product) => product.id === slug);
  }
}
