import { NextResponse } from "next/server";
import { searchCatalog } from "@/lib/catalog";
export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = Math.max(1, Number(url.searchParams.get("page") ?? 1) || 1);
  const limit = Math.min(48, Math.max(1, Number(url.searchParams.get("limit") ?? 12) || 12));
  try {
    const result = await searchCatalog({ query: url.searchParams.get("q") ?? "", page, limit, category: url.searchParams.get("category") ?? undefined });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Product catalog API error", error);
    return NextResponse.json({ error: "Unable to load products." }, { status: 500 });
  }
}
