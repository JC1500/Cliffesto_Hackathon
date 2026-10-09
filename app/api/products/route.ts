import { NextResponse } from "next/server";
import { searchCatalog } from "@/lib/catalog";
export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = Math.max(1, Math.floor(Number(url.searchParams.get("page") ?? 1) || 1));
  const limit = Math.min(48, Math.max(1, Math.floor(Number(url.searchParams.get("limit") ?? 12) || 12)));
  const rawMinPrice = url.searchParams.get("minPrice");
  const rawMaxPrice = url.searchParams.get("maxPrice");
  const minPrice = rawMinPrice === null || rawMinPrice === "" ? undefined : Number(rawMinPrice);
  const maxPrice = rawMaxPrice === null || rawMaxPrice === "" ? undefined : Number(rawMaxPrice);
  if ((minPrice !== undefined && (!Number.isFinite(minPrice) || minPrice < 0)) ||
    (maxPrice !== undefined && (!Number.isFinite(maxPrice) || maxPrice < 0)) ||
    (minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice)) {
    return NextResponse.json({ error: "Price range is invalid." }, { status: 400 });
  }
  const requestedSort = url.searchParams.get("sort");
  const sort = requestedSort === "smart" || requestedSort === "price-asc" || requestedSort === "price-desc" || requestedSort === "newest"
    ? requestedSort
    : "relevance";
  try {
    const result = await searchCatalog({
      query: url.searchParams.get("q") ?? "",
      page,
      limit,
      category: url.searchParams.get("category") ?? undefined,
      minPrice,
      maxPrice,
      inStock: url.searchParams.get("inStock") === "true",
      sort,
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Product catalog API error", error);
    return NextResponse.json({ error: "Unable to load products." }, { status: 500 });
  }
}
