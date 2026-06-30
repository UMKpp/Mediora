import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center overflow-x-hidden bg-[#f7fbfa] px-4 text-slate-950">
      <section className="w-full max-w-lg rounded-3xl border border-teal-100 bg-white p-8 text-center shadow-xl shadow-teal-900/5">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-700">
          Page not found
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-[#0d4050]">
          This Mediora page is not available
        </h1>
        <p className="mt-4 text-base font-semibold leading-7 text-slate-600">
          The page may have moved, or the link may be incorrect.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#08aa9c] px-5 text-sm font-black text-white shadow-lg shadow-teal-700/20 transition hover:bg-[#07998c] active:scale-[0.98]"
        >
          Go to Home
        </Link>
      </section>
    </main>
  );
}
