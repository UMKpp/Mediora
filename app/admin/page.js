"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "../lib/api";
import { saveSession } from "../lib/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      nextErrors.email = "Admin email is required.";
    } else if (!emailPattern.test(email)) {
      nextErrors.email = "Enter a valid admin email.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    }

    setErrors(nextErrors);
    setError("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await api.login(email.trim(), password);
      if (result.user?.role === "Admin") {
        saveSession(result);
        router.replace("/admin/dashboard");
        return;
      }

      setError("Admin access only");
      setIsSubmitting(false);
    } catch (loginError) {
      setIsSubmitting(false);
      setError("Invalid admin credentials");
    }
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
                setErrors((current) => ({ ...current, email: "" }));
                setError("");
              }}
              autoComplete="username"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "admin-email-error" : undefined}
              className={`mt-2 min-h-12 w-full rounded-xl border bg-white px-4 text-base font-semibold text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                errors.email
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                  : "border-slate-200 focus:border-teal-400 focus:ring-teal-100"
              }`}
              placeholder="admin@mediora.com"
            />
            {errors.email && (
              <p id="admin-email-error" className="mt-2 text-sm font-bold text-red-700">
                {errors.email}
              </p>
            )}
          </label>

          <label className="block">
            <span className="text-sm font-black text-slate-900">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setErrors((current) => ({ ...current, password: "" }));
                setError("");
              }}
              autoComplete="current-password"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "admin-password-error" : undefined}
              className={`mt-2 min-h-12 w-full rounded-xl border bg-white px-4 text-base font-semibold text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                errors.password
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                  : "border-slate-200 focus:border-teal-400 focus:ring-teal-100"
              }`}
              placeholder="Enter admin password"
            />
            {errors.password && (
              <p id="admin-password-error" className="mt-2 text-sm font-bold text-red-700">
                {errors.password}
              </p>
            )}
          </label>

          {error && (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-black text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="min-h-12 rounded-xl bg-[#08aa9c] px-5 text-base font-black text-white shadow-lg shadow-teal-700/20 transition hover:bg-[#07998c] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Signing in as admin..." : "Sign in as Admin"}
          </button>
        </form>
      </section>
    </main>
  );
}
