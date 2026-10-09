import Link from "next/link";

export default function CartPage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-14">
      <h1 className="text-4xl font-bold">Your cart</h1>
      <div className="mt-8 rounded-2xl border border-slate-200 p-8 text-center">
        <h2 className="text-xl font-semibold">Cart unavailable</h2>
        <p className="mt-3 text-slate-600">
          Cart persistence is not configured for the existing Supabase account and authorization setup.
        </p>
        <Link href="/products" className="mt-6 inline-block rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white">
          Continue shopping
        </Link>
      </div>
    </main>
  );
}
