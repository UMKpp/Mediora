"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardShell from "./DashboardShell";

export default function UserProtectedPage({ children }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const isAuthenticated =
      window.localStorage.getItem("medioraUserAuthenticated") === "true";

    if (!isAuthenticated) {
      router.replace("/login");
      return undefined;
    }

    const frame = window.requestAnimationFrame(() => setChecked(true));
    return () => window.cancelAnimationFrame(frame);
  }, [router]);

  if (!checked) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f7fbfa] px-4 text-slate-950">
        <section className="rounded-3xl border border-teal-100 bg-white p-6 text-center shadow-xl shadow-teal-900/5">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-700">
            Mediora dashboard
          </p>
          <p className="mt-3 text-base font-bold text-slate-600">
            Checking your session...
          </p>
        </section>
      </main>
    );
  }

  return <DashboardShell>{children}</DashboardShell>;
}
