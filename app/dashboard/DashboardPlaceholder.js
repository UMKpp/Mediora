import Link from "next/link";
import { DashboardIcon } from "./DashboardShell";

export default function DashboardPlaceholder({ icon, title, description, stepLabel }) {
  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-teal-100 bg-white p-6 shadow-xl shadow-teal-900/5 sm:p-8">
        <Link
          href="/dashboard"
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-teal-100 bg-white px-4 text-sm font-black text-teal-700 shadow-sm transition hover:bg-teal-50 active:scale-[0.98]"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <path d="M19 12H5m6-6-6 6 6 6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Dashboard
        </Link>

        <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-teal-50 text-teal-700">
            <DashboardIcon name={icon} className="h-7 w-7" />
          </span>
          <div className="max-w-2xl">
            {stepLabel && (
              <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-700">
                {stepLabel}
              </p>
            )}
            <h2 className="text-3xl font-black tracking-tight text-[#0d4050]">
              {title}
            </h2>
            <p className="mt-4 text-base font-medium leading-7 text-slate-600">
              {description}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
