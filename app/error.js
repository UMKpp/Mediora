"use client";

export default function ErrorPage({ error, reset }) {
  return (
    <main className="grid min-h-screen place-items-center overflow-x-hidden bg-[#f7fbfa] px-4 text-slate-950">
      <section className="w-full max-w-lg rounded-3xl border border-red-100 bg-white p-8 text-center shadow-xl shadow-red-900/5">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-red-700">
          Something went wrong
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-[#0d4050]">
          Mediora could not load this page
        </h1>
        <p className="mt-4 text-base font-semibold leading-7 text-slate-600">
          {error?.message || "Please try again."}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 min-h-12 rounded-xl bg-[#08aa9c] px-5 text-sm font-black text-white shadow-lg shadow-teal-700/20 transition hover:bg-[#07998c] active:scale-[0.98]"
        >
          Try Again
        </button>
      </section>
    </main>
  );
}
