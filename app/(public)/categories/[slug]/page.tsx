import { notFound } from "next/navigation";
import { ProductBrowser } from "@/features/products/ProductBrowser";
import { searchCatalog } from "@/lib/catalog";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = decodeURIComponent((await params).slug).toLowerCase();
  const catalog = await searchCatalog({ query: "", page: 1, limit: 1 });
  const category = catalog.categories.find((item) =>
    item.slug.toLowerCase() === slug || item.name.toLowerCase().replace(/\s+/g, "-") === slug
  );
  if (!category) notFound();

  return (
    <main className="mx-auto min-h-screen max-w-[1440px] px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <ProductBrowser initialCategorySlug={category.slug} categoryTitle={category.name} />
    </main>
  );
}
