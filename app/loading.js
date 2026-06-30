export default function Loading() {
  return (
    <main className="grid min-h-screen place-items-center overflow-x-hidden bg-[#f7fbfa] px-4 text-slate-950">
      <section className="w-full max-w-md rounded-3xl border border-teal-100 bg-white p-6 shadow-xl shadow-teal-900/5">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-700">
          Loading Mediora
        </p>
        <div className="mt-5 space-y-3" aria-hidden="true">
          <div className="mediora-skeleton h-4 w-2/3 rounded-full" />
          <div className="mediora-skeleton h-4 w-full rounded-full" />
          <div className="mediora-skeleton h-4 w-5/6 rounded-full" />
        </div>
      </section>
    </main>
  );
}
