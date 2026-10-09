
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
<<<<<<< HEAD
import { formatPrice, products } from "@/lib/products";
import { getCatalogProduct } from "@/lib/catalog";
import { ProductActions } from "@/features/products/ProductActions";
import { ProductGrid } from "@/components/products/ProductGrid";
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) { const product = await getCatalogProduct((await params).id); if (!product) notFound(); const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3); return <main className="mx-auto min-h-screen max-w-7xl px-6 py-14"><div className="grid gap-10 md:grid-cols-2"><div className="relative flex min-h-96 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-100 to-pink-100 text-9xl" aria-label={`${product.name} image`}>{product.imageUrl ? <Image src={product.imageUrl} alt={product.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /> : product.emoji}</div><div className="py-4"><Link href="/products" className="text-sm font-semibold text-indigo-600">← Back to products</Link><p className="mt-8 font-semibold uppercase tracking-wide text-indigo-600">{product.category}</p><h1 className="mt-3 text-4xl font-bold">{product.name}</h1><p className="mt-5 text-3xl font-bold">{formatPrice(product.price)}</p><p className="mt-6 leading-7 text-slate-600">{product.description}</p><p className="mt-5 text-sm text-slate-500">{product.stock > 0 ? `${product.stock} available` : "Out of stock"}</p><ProductActions product={product} /></div></div>{related.length > 0 && <section className="mt-20"><h2 className="mb-6 text-2xl font-bold">You may also like</h2><ProductGrid products={related} /></section>}</main>; }
=======
import {
  getProduct,
  formatPrice,
  products,
} from "@/lib/products";
import { ProductActions } from "@/features/products/ProductActions";
import { ProductGrid } from "@/components/products/ProductGrid";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="grid grid-cols-[110px_minmax(0,1fr)] gap-4 border-b border-slate-100 py-4 last:border-0 sm:grid-cols-[170px_minmax(0,1fr)]">
      <dt className="text-sm font-medium text-slate-500">
        {label}
      </dt>
      <dd className="break-words text-sm font-semibold text-slate-900">
        {value}
      </dd>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-7">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-700">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) {
    notFound();
  }

  const related = products
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    )
    .slice(0, 4);

  const inStock = product.stock > 0;

  const stockMessage = !inStock
    ? "Currently unavailable"
    : product.stock <= 5
      ? `Only ${product.stock} left in stock`
      : "Available to order";

  const description =
    product.description?.trim() || "No description available.";

  const paragraphs = description
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-[#f8f9fc] text-slate-900">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-slate-200 bg-white"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-5 py-4 text-sm sm:px-8">
          <Link
            href="/"
            className="text-slate-500 hover:text-violet-700"
          >
            Home
          </Link>
          <span className="text-slate-400">/</span>
          <Link
            href="/products"
            className="text-slate-500 hover:text-violet-700"
          >
            Products
          </Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-500">
            {product.category}
          </span>
          <span className="text-slate-400">/</span>
          <span
            className="max-w-[220px] truncate font-semibold text-slate-900"
            aria-current="page"
          >
            {product.name}
          </span>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-5 pb-20 pt-8 sm:px-8">
        {/* Main product section */}
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-9">
          {/* Product image */}
          <section
            className="lg:col-span-5"
            aria-label="Product image"
          >
            <div className="lg:sticky lg:top-8">
              <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="absolute inset-5 rounded-2xl bg-gradient-to-br from-violet-50 via-slate-50 to-pink-50" />

                <span
                  className="relative text-[9rem] sm:text-[11rem]"
                  role="img"
                  aria-label={product.name}
                >
                  {product.emoji}
                </span>

                <span className="absolute left-5 top-5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600">
                  {product.category}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Product preview
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Catalog illustration
                  </p>
                </div>

                <span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700">
                  Cliffesto
                </span>
              </div>
            </div>
          </section>

          {/* Product details */}
          <section className="min-w-0 lg:col-span-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-violet-100 px-3 py-1.5 text-xs font-bold text-violet-800">
                {product.category}
              </span>

              <span
                className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                  inStock
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {inStock ? "In stock" : "Out of stock"}
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-[#211637] sm:text-4xl">
              {product.name}
            </h1>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              Product information, availability, and purchase details.
            </p>

            {/* Price */}
            <div className="mt-7 border-y border-slate-200 py-6">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Price
              </p>

              <p className="mt-2 text-4xl font-extrabold tracking-tight text-[#211637]">
                {formatPrice(product.price)}
              </p>

              <p className="mt-3 text-xs leading-6 text-slate-500">
                Any applicable delivery charges or additional costs
                should be confirmed at checkout.
              </p>
            </div>

            {/* About */}
            <section className="mt-8">
              <h2 className="text-lg font-bold text-slate-950">
                About this product
              </h2>

              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
                {description}
              </p>

              <a
                href="#description"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-violet-700 hover:text-violet-900"
              >
                Read full description
                <span aria-hidden="true">↓</span>
              </a>
            </section>

            {/* Product highlights */}
            <section className="mt-9 rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-base font-bold text-slate-950">
                Product overview
              </h2>

              <dl className="mt-3">
                <DetailRow
                  label="Category"
                  value={product.category}
                />
                <DetailRow
                  label="Product ID"
                  value={String(product.id)}
                />
                <DetailRow
                  label="Price"
                  value={formatPrice(product.price)}
                />
                <DetailRow
                  label="Availability"
                  value={stockMessage}
                />
              </dl>
            </section>

            {/* Section navigation */}
            <div className="mt-8">
              <p className="text-sm font-bold text-slate-900">
                More information
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="#description"
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:border-violet-400 hover:text-violet-700"
                >
                  Description ↓
                </a>

                <a
                  href="#specifications"
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:border-violet-400 hover:text-violet-700"
                >
                  Specifications ↓
                </a>

                <a
                  href="#shopping-details"
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:border-violet-400 hover:text-violet-700"
                >
                  Shopping details ↓
                </a>
              </div>
            </div>
          </section>

          {/* Purchase panel */}
          <aside className="lg:col-span-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                Purchase options
              </p>

              <p className="mt-4 text-3xl font-extrabold text-[#211637]">
                {formatPrice(product.price)}
              </p>

              <div className="mt-6 border-t border-slate-100 pt-5">
                <p className="text-sm font-semibold">
                  Availability
                </p>

                <p
                  className={`mt-2 text-sm font-bold ${
                    inStock
                      ? "text-emerald-700"
                      : "text-red-600"
                  }`}
                >
                  {stockMessage}
                </p>
              </div>

              {/* Existing working cart functionality */}
              <div className="mt-6">
                <ProductActions product={product} />
              </div>

              <p className="mt-5 text-xs leading-6 text-slate-500">
                Final product availability and order details are
                confirmed during checkout.
              </p>

              <div className="mt-6 space-y-5 border-t border-slate-100 pt-6">
                <div className="flex items-start gap-3">
                  <span className="text-xl">📦</span>
                  <div>
                    <p className="text-sm font-semibold">
                      Order details
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Review order totals before placing your order.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl">🔒</span>
                  <div>
                    <p className="text-sm font-semibold">
                      Checkout
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Continue through the existing checkout flow.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/products"
              className="mt-4 flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-violet-700 hover:border-violet-300 hover:bg-violet-50"
              style={{ color: "#6d28d9" }}
            >
              Continue shopping
              <span className="ml-2">→</span>
            </Link>
          </aside>
        </div>

        {/* Lower information layout */}
        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            {/* Full description */}
            <section
              id="description"
              className="scroll-mt-8 rounded-3xl border border-slate-200 bg-white p-7 sm:p-9"
            >
              <SectionHeading
                eyebrow="The details"
                title="Product description"
              />

              <div className="space-y-5 text-sm leading-8 text-slate-600 sm:text-base">
                {paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>

            {/* Specifications */}
            <section
              id="specifications"
              className="scroll-mt-8 rounded-3xl border border-slate-200 bg-white p-7 sm:p-9"
            >
              <SectionHeading
                eyebrow="Product information"
                title="Specifications"
              />

              <p className="mb-6 text-sm leading-7 text-slate-500">
                Information currently available in the product catalog.
              </p>

              <dl className="rounded-2xl border border-slate-200 px-5">
                <DetailRow
                  label="Product name"
                  value={product.name}
                />
                <DetailRow
                  label="Product ID"
                  value={String(product.id)}
                />
                <DetailRow
                  label="Category"
                  value={product.category}
                />
                <DetailRow
                  label="Price"
                  value={formatPrice(product.price)}
                />
                <DetailRow
                  label="Stock status"
                  value={stockMessage}
                />
                <DetailRow
                  label="Available units"
                  value={product.stock}
                />
              </dl>

              <p className="mt-5 text-xs leading-6 text-slate-500">
                Additional technical details will be shown when
                available in the catalog.
              </p>
            </section>

            {/* Shopping information */}
            <section
              id="shopping-details"
              className="scroll-mt-8 rounded-3xl border border-slate-200 bg-white p-7 sm:p-9"
            >
              <SectionHeading
                eyebrow="Before purchasing"
                title="Shopping information"
              />

              <div className="divide-y divide-slate-100">
                <details className="group py-5" open>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-slate-900">
                    Stock availability
                    <span className="text-lg text-violet-700">
                      +
                    </span>
                  </summary>

                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {inStock
                      ? `${product.stock} unit${product.stock === 1 ? "" : "s"} currently listed as available. Availability can change before checkout.`
                      : "This product is currently unavailable."}
                  </p>
                </details>

                <details className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-slate-900">
                    Delivery information
                    <span className="text-lg text-violet-700">
                      +
                    </span>
                  </summary>

                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    Delivery estimates and shipping charges
                    are not currently available in the product catalog.
                  </p>
                </details>

                <details className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-slate-900">
                    Returns and replacements
                    <span className="text-lg text-violet-700">
                      +
                    </span>
                  </summary>

                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    Product-specific return and replacement
                    policies have not been provided.
                    Confirm the applicable terms before purchasing.
                  </p>
                </details>

                <details className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-slate-900">
                    Warranty information
                    <span className="text-lg text-violet-700">
                      +
                    </span>
                  </summary>

                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    Warranty information is currently unavailable
                    for this product.
                  </p>
                </details>
              </div>
            </section>
          </div>

          {/* Side cards */}
          <aside className="space-y-6 lg:col-span-4">
            {/* FIXED BUTTON CARD */}
            <div className="rounded-3xl border border-violet-100 bg-[#f1ecff] p-7 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-700">
                Cliffesto buying guide
              </p>

              <h2 className="mt-4 text-2xl font-bold leading-tight text-[#211637]">
                Find the details that matter.
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                Review the product specifications, availability,
                and essential details before making your choice.
              </p>

              <a
                href="#specifications"
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#211637] px-5 py-3 text-center text-sm font-bold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#39245e] hover:shadow-md sm:w-auto"
                style={{ color: "#ffffff" }}
              >
                <span style={{ color: "#ffffff" }}>
                  View specifications
                </span>
                <span
                  aria-hidden="true"
                  style={{ color: "#ffffff" }}
                >
                  ↗
                </span>
              </a>
            </div>

            {/* Summary */}
            <div className="rounded-3xl border border-slate-200 bg-white p-7">
              <h2 className="text-lg font-bold text-slate-950">
                At a glance
              </h2>

              <dl className="mt-5 space-y-4">
                <div className="flex justify-between gap-4 border-b border-slate-100 pb-4">
                  <dt className="text-sm text-slate-500">
                    Category
                  </dt>
                  <dd className="text-right text-sm font-semibold text-slate-900">
                    {product.category}
                  </dd>
                </div>

                <div className="flex justify-between gap-4 border-b border-slate-100 pb-4">
                  <dt className="text-sm text-slate-500">
                    Price
                  </dt>
                  <dd className="text-right text-sm font-bold text-slate-900">
                    {formatPrice(product.price)}
                  </dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="text-sm text-slate-500">
                    Availability
                  </dt>
                  <dd
                    className={`text-right text-sm font-bold ${
                      inStock
                        ? "text-emerald-700"
                        : "text-red-600"
                    }`}
                  >
                    {inStock ? "In stock" : "Out of stock"}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-20">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-violet-700">
                  Discover more
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                  You might also like
                </h2>

                <p className="mt-3 text-sm text-slate-500">
                  Similar products in {product.category}.
                </p>
              </div>

              <Link
                href="/products"
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-violet-700 hover:border-violet-300"
              >
                View all products →
              </Link>
            </div>

            <ProductGrid products={related} />
          </section>
        )}

        {/* FIXED BOTTOM CTA */}
        <section className="mt-20 overflow-hidden rounded-3xl bg-[#211637] px-7 py-10 sm:px-10 lg:px-12">
          <div className="flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-300">
                Discover more with Cliffesto
              </p>

              <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Find what fits your everyday.
              </h2>

              <p className="mt-3 text-sm leading-7 text-violet-200">
                Explore more products and discover something new.
              </p>
            </div>

            <Link
              href="/products"
              className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-3 rounded-xl border border-white bg-white px-7 py-3.5 text-center text-sm font-bold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-100 hover:shadow-lg sm:w-auto"
              style={{ color: "#211637" }}
            >
              <span style={{ color: "#211637" }}>
                Continue shopping
              </span>
              <span
                aria-hidden="true"
                style={{ color: "#211637" }}
              >
                →
              </span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
>>>>>>> ec3c3e6 (Redesign homepage and improve product details page)
