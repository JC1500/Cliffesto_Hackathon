"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { CatalogProduct } from "@/lib/catalog";
import { ProductGrid } from "@/components/products/ProductGrid";
import { EmptyState } from "@/components/feedback/EmptyState";

type ResponseData = { data: CatalogProduct[]; total: number; page: number; limit: number; error?: string };

export function ProductBrowser() {
  const router = useRouter();
  const params = useSearchParams();
  const initialQuery = params.get("q") ?? "";
  const [result, setResult] = useState<ResponseData>({ data: [], total: 0, page: Number(params.get("page") ?? 1) || 1, limit: 12 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const requestId = useRef(0);

  useEffect(() => {
    const id = ++requestId.current;
    const query = new URLSearchParams({ q: initialQuery, page: params.get("page") ?? "1", limit: "12" });
    const controller = new AbortController();
    fetch(`/api/products/search?${query}`, { signal: controller.signal })
      .then(async (response) => {
        const body = await response.json() as ResponseData;
        if (!response.ok) throw new Error(body.error ?? "Unable to load products.");
        if (id === requestId.current) setResult(body);
      })
      .catch((reason: unknown) => { if ((reason as { name?: string }).name !== "AbortError" && id === requestId.current) setError("Unable to load products. Please try again."); })
      .finally(() => { if (id === requestId.current) setLoading(false); });
    return () => controller.abort();
  }, [initialQuery, params]);

  const totalPages = Math.max(1, Math.ceil(result.total / result.limit));
  const page = result.page;
  return <div>
    {initialQuery && <div className="mb-6"><h1 className="text-3xl font-bold">Search results for &quot;{initialQuery}&quot;</h1><p className="mt-2 text-sm text-slate-600">{loading ? "Loading products..." : `${result.total} ${result.total === 1 ? "product" : "products"} found`}</p></div>}
    {!initialQuery && <p className="mb-6 text-sm text-slate-600">{loading ? "Loading products..." : `${result.total} products found`}</p>}
    {error ? <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700"><p>{error}</p><button type="button" onClick={() => router.refresh()} className="mt-4 rounded-xl bg-red-600 px-4 py-2 font-semibold text-white">Retry</button></div> : loading ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }, (_, index) => <div key={index} className="h-96 animate-pulse rounded-2xl bg-slate-100" />)}</div> : result.data.length ? <ProductGrid products={result.data} /> : <EmptyState title="No products found">Try another search or clear the current filters.</EmptyState>}
    {totalPages > 1 && <nav className="mt-10 flex items-center justify-center gap-4" aria-label="Product pagination"><button type="button" disabled={page <= 1} onClick={() => router.push(`/search?q=${encodeURIComponent(initialQuery)}&page=${page - 1}`)} className="rounded-xl border px-4 py-2 disabled:opacity-40">Previous</button><span className="text-sm text-slate-600">Page {page} of {totalPages}</span><button type="button" disabled={page >= totalPages} onClick={() => router.push(`/search?q=${encodeURIComponent(initialQuery)}&page=${page + 1}`)} className="rounded-xl border px-4 py-2 disabled:opacity-40">Next</button></nav>}
  </div>;
}
