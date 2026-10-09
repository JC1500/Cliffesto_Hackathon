import Link from "next/link";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";

const categoryStyles = [
  { icon: "👗", bg: "bg-rose-50", accent: "text-rose-700" },
  { icon: "✨", bg: "bg-violet-50", accent: "text-violet-700" },
  { icon: "🏡", bg: "bg-amber-50", accent: "text-amber-700" },
  { icon: "📱", bg: "bg-sky-50", accent: "text-sky-700" },
  { icon: "💄", bg: "bg-pink-50", accent: "text-pink-700" },
  { icon: "👟", bg: "bg-emerald-50", accent: "text-emerald-700" },
  { icon: "🎒", bg: "bg-orange-50", accent: "text-orange-700" },
  { icon: "🎁", bg: "bg-indigo-50", accent: "text-indigo-700" },
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-violet-600">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500 md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

export default function HomePage() {
  const featured = products.filter((product) => product.featured);
  const displayedProducts = (featured.length ? featured : products).slice(0, 8);

  const categories = Array.from(
    new Set(products.map((product) => product.category).filter(Boolean))
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[#faf9f7] text-slate-950">
      {/* Announcement banner */}
      <div className="bg-[#181329] px-4 py-2.5 text-center text-xs font-medium tracking-wide text-white sm:text-sm">
        Discover something different. Made for everyday life.
        <Link
          href="/products"
          className="ml-2 font-bold text-amber-300 underline underline-offset-4 hover:text-white"
        >
          Shop now ↗
        </Link>
      </div>

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-5 pb-12 pt-8 sm:px-8 lg:pb-20 lg:pt-12">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-[#ede6ff] lg:rounded-[2.75rem]">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-violet-300/50 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-pink-200/60 blur-3xl" />

          <div className="relative grid items-center gap-10 px-7 py-12 sm:px-12 lg:grid-cols-2 lg:px-16 lg:py-20">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/70 px-4 py-2 text-xs font-bold text-violet-800 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-violet-500" />
                YOUR EVERYDAY DISCOVERY STORE
              </div>

              <h1 className="mt-7 max-w-2xl text-5xl font-black leading-[1.06] tracking-[-0.055em] text-[#24133f] sm:text-6xl lg:text-[4.6rem]">
                Find your next
                <span className="block text-violet-700">
                  little obsession.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-8 text-slate-600 sm:text-lg">
                Fresh finds, clever essentials, and products worth
                falling for. Explore collections curated for your
                everyday moments.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/products"
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#24133f] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-900/15 transition hover:-translate-y-0.5 hover:bg-violet-800"
                >
                  Explore the collection
                  <span aria-hidden="true">↗</span>
                </Link>

                <a
                  href="#categories"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-violet-300 bg-white/60 px-6 py-3.5 text-sm font-bold text-[#24133f] transition hover:bg-white"
                >
                  Browse categories ↓
                </a>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-violet-900/10 pt-6">
                <div>
                  <p className="text-2xl font-black text-[#24133f]">
                    {products.length}+
                  </p>
                  <p className="text-xs font-medium text-slate-500">
                    Products to explore
                  </p>
                </div>
                <div className="h-9 w-px bg-violet-900/15" />
                <div>
                  <p className="text-2xl font-black text-[#24133f]">
                    {categories.length}
                  </p>
                  <p className="text-xs font-medium text-slate-500">
                    Collections
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative editorial composition */}
            <div
              className="relative flex min-h-[300px] items-center justify-center sm:min-h-[410px] lg:min-h-[480px]"
              aria-hidden="true"
            >
              <div className="absolute h-64 w-64 rounded-full border border-white/80 sm:h-96 sm:w-96" />
              <div className="absolute h-52 w-52 rounded-full border border-white/70 sm:h-80 sm:w-80" />

              <div className="relative z-10 w-56 rotate-[-9deg] rounded-[2rem] border-4 border-white bg-gradient-to-br from-[#ffd8d6] to-[#f4a6bf] p-5 shadow-2xl shadow-violet-900/15 transition-transform duration-500 hover:rotate-0 sm:w-64">
                <div className="flex justify-between text-xs font-bold text-rose-900/70">
                  <span>THE DAILY EDIT</span>
                  <span>✦</span>
                </div>
                <div className="flex h-44 items-center justify-center text-[7rem] sm:h-52">
                  🛍️
                </div>
                <div className="rounded-xl bg-white/70 px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-rose-800">
                    New discoveries
                  </p>
                  <p className="mt-1 text-lg font-black text-[#24133f]">
                    Little joys, big love.
                  </p>
                </div>
              </div>

              <div className="absolute right-1 top-1/4 z-20 rotate-12 rounded-2xl border border-white bg-[#fff0c8] p-4 text-5xl shadow-xl sm:right-5 sm:p-6 sm:text-6xl">
                ✨
              </div>

              <div className="absolute bottom-7 left-0 z-20 -rotate-12 rounded-2xl border border-white bg-white p-4 shadow-xl sm:left-5 sm:p-5">
                <span className="text-3xl">💜</span>
                <p className="mt-2 text-xs font-black text-violet-900">
                  Discover more
                </p>
              </div>

              <div className="absolute bottom-4 right-0 rounded-full bg-violet-700 px-5 py-3 text-sm font-extrabold text-white shadow-xl sm:right-4">
                MADE TO DISCOVER ✦
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value propositions */}
      <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-8">
        <div className="grid gap-4 rounded-3xl border border-slate-200/80 bg-white p-6 sm:grid-cols-3 sm:p-8">
          {[
            {
              icon: "🔎",
              title: "Discover with ease",
              text: "Explore products across collections.",
            },
            {
              icon: "💜",
              title: "Find your favorites",
              text: "Thoughtful finds for everyday moments.",
            },
            {
              icon: "✨",
              title: "Fresh inspiration",
              text: "Something interesting around every corner.",
            },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-2xl">
                {item.icon}
              </span>
              <div>
                <h3 className="font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section
        id="categories"
        className="mx-auto max-w-7xl scroll-mt-24 px-5 py-10 sm:px-8"
      >
        <div className="flex flex-wrap items-end justify-between gap-5">
          <SectionHeading
            eyebrow="Find your kind of thing"
            title="Explore by category."
            description="Whatever you're into, there's something here worth discovering."
          />
          <Link
            href="/products"
            className="text-sm font-bold text-violet-700 hover:text-violet-900"
          >
            Explore all products ↗
          </Link>
        </div>

        {categories.length > 0 ? (
          <div className="mt-9 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((category, index) => {
              const style = categoryStyles[index % categoryStyles.length];
              const count = products.filter(
                (product) => product.category === category
              ).length;

              return (
                <Link
                  key={category}
                  href={`/categories/${encodeURIComponent(category.toLowerCase())}`}
                  className={`group relative flex min-h-44 flex-col justify-between overflow-hidden rounded-3xl border border-transparent p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-900/5 sm:min-h-52 sm:p-6 ${style.bg}`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-4xl transition-transform duration-300 group-hover:scale-110 sm:text-5xl">
                      {style.icon}
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-lg text-slate-700 transition group-hover:bg-violet-700 group-hover:text-white">
                      ↗
                    </span>
                  </div>

                  <div>
                    <h3 className={`text-lg font-extrabold sm:text-xl ${style.accent}`}>
                      {category}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-slate-500">
                      {count} {count === 1 ? "product" : "products"} to explore
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="mt-8 text-slate-500">
            New collections are on their way.
          </p>
        )}
      </section>

      {/* Editorial promotional banner */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#211637] px-7 py-12 text-white sm:px-12 lg:px-16 lg:py-16">
          <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-violet-500/30 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-pink-500/20 blur-3xl" />

          <div className="relative z-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-300">
                THE DISCOVERY EDIT
              </p>
              <h2 className="mt-4 max-w-xl text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                Unexpected finds.
                <br />
                Everyday favorites.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-violet-100/75">
                Explore the collection and find something that feels
                just right for you.
              </p>
            </div>

            <Link
              href="/products"
              className="inline-flex shrink-0 items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-extrabold text-[#211637] transition hover:bg-violet-100"
            >
              Start exploring
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-5 pb-20 pt-6 sm:px-8">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
          <SectionHeading
            eyebrow="Curated for you"
            title="Worth a closer look."
            description="Explore standout picks from our growing collection."
          />

          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-violet-400 hover:text-violet-700"
          >
            View all products ↗
          </Link>
        </div>

        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="text-5xl">📦</div>
            <h3 className="mt-5 text-xl font-bold">
              Something good is coming.
            </h3>
            <p className="mt-2 text-slate-500">
              Products will appear here as soon as they are added.
            </p>
          </div>
        )}
      </section>

      {/* Closing call to action */}
      <section className="border-t border-slate-200 bg-white px-5 py-16 text-center sm:px-8">
        <span className="text-4xl">✦</span>
        <h2 className="mt-4 text-3xl font-black tracking-tight text-[#211637] sm:text-4xl">
          Your next favorite is waiting.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-500 sm:text-base">
          From everyday essentials to delightful discoveries,
          explore products that fit your lifestyle.
        </p>
        <Link
          href="/products"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-violet-700 px-8 py-4 text-sm font-bold text-white transition hover:bg-violet-800"
        >
          Discover all products ↗
        </Link>
      </section>
    </main>
  );
}
