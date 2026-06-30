"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (email.trim() === "admin@mediora.com" && password === "admin123") {
      window.localStorage.setItem("medioraAdminAuthenticated", "true");
      router.replace("/admin/dashboard");
      return;
    }

    setError("Invalid admin credentials");
  }

  return (
    <main className="grid min-h-screen place-items-center overflow-x-hidden bg-[#f4fbfa] px-4 py-10 text-slate-950">
      <section className="w-full max-w-md rounded-3xl border border-teal-100 bg-white p-6 shadow-2xl shadow-teal-900/10 sm:p-8">
        <div className="flex justify-center">
          <Image
            src="/images/mediora_textlogo.png"
            alt="Mediora"
            width={160}
            height={116}
            priority
            className="h-auto w-28"
          />
        </div>

        <div className="mt-5 text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-700">
            Admin portal
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-[#0d4050]">
            Admin Access
          </h1>
          <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
            Sign in with admin credentials to manage Mediora platform data.
          </p>
        </div>

        <form className="mt-7 grid gap-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm font-black text-slate-900">Admin Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
              autoComplete="username"
              className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base font-semibold text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
              placeholder="admin@mediora.com"
            />
          </label>

          <label className="block">
            <span className="text-sm font-black text-slate-900">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
              autoComplete="current-password"
              className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base font-semibold text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
              placeholder="Enter admin password"
            />
          </label>

          {error && (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-black text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="min-h-12 rounded-xl bg-[#08aa9c] px-5 text-base font-black text-white shadow-lg shadow-teal-700/20 transition hover:bg-[#07998c] active:scale-[0.98]"
          >
            Sign in as Admin
          </button>
        </form>
      </section>
    </main>
  );
}
