"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

function Icon({ children }) {
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center text-slate-400">
      {children}
    </span>
  );
}

function FieldIcon({ type }) {
  if (type === "lock") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        <path
          d="M7 10V8a5 5 0 0 1 10 0v2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <rect
          x="5.5"
          y="10"
          width="13"
          height="10"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M12 14.5v2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "eye") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        <path
          d="M2.5 12s3.4-5.5 9.5-5.5 9.5 5.5 9.5 5.5-3.4 5.5-9.5 5.5S2.5 12 2.5 12Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M5.5 20a6.5 6.5 0 0 1 13 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5fbfa] p-4 text-slate-900 sm:p-6 lg:p-12">
      <section className="mx-auto grid w-full max-w-[1440px] overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-slate-200/80 lg:min-h-[calc(100vh-6rem)] lg:grid-cols-[0.98fr_1.12fr]">
        <div
          aria-label="Smiling family sitting together in a calm healthcare setting"
          className="relative hidden min-h-[380px] overflow-hidden bg-cover bg-center md:block lg:min-h-full"
          style={{ backgroundImage: "url('/images/login-family.webp')" }}
        />

        <div className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-16">
          <section className="w-full max-w-[480px] rounded-[1.75rem] bg-white px-7 py-8 shadow-2xl shadow-slate-300/45 ring-1 ring-slate-100 sm:px-10 sm:py-9">
            <div className="flex justify-center">
              <Image
                src="/images/mediora_textlogo.png"
                alt="Mediora"
                width={220}
                height={159}
                priority
                className="h-auto w-24 sm:w-28"
              />
            </div>

            <div className="text-center">
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#0d4050]">
                Welcome Back
              </h1>
              <p className="mx-auto mt-3 max-w-sm text-base font-medium leading-6 text-slate-500">
                Sign in to your Mediora account
              </p>
            </div>

            <form className="mt-6 space-y-4">
              <label className="block">
                <span className="text-sm font-bold text-slate-900">
                  Username or Email
                </span>
                <span className="mt-2 flex h-12 items-center rounded-xl border border-slate-200 bg-white px-3 shadow-sm transition focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-100">
                  <Icon>
                    <FieldIcon />
                  </Icon>
                  <input
                    type="text"
                    name="identifier"
                    autoComplete="username"
                    placeholder="Enter your username or email"
                    className="h-full min-w-0 flex-1 bg-transparent px-2 text-base text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </span>
              </label>

              <label className="block">
                <span className="text-sm font-bold text-slate-900">
                  Password
                </span>
                <span className="mt-2 flex h-12 items-center rounded-xl border border-slate-200 bg-white px-3 shadow-sm transition focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-100">
                  <Icon>
                    <FieldIcon type="lock" />
                  </Icon>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="h-full min-w-0 flex-1 bg-transparent px-2 text-base text-slate-900 outline-none placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-lg transition hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-100"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                  >
                    <Image
                      src={showPassword ? "/images/eye-crossed.png" : "/images/eye.png"}
                      alt=""
                      width={22}
                      height={22}
                      className="h-5 w-5 object-contain opacity-70"
                    />
                  </button>
                </span>
              </label>

              <div className="text-right">
                <button
                  type="button"
                    className="text-base font-semibold text-teal-600 transition hover:text-teal-800"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="button"
                className="h-12 w-full rounded-xl bg-[#08aa9c] px-6 text-base font-bold text-white shadow-lg shadow-teal-600/20 transition hover:bg-[#07998c] focus:outline-none focus:ring-4 focus:ring-teal-100"
              >
                Sign In
              </button>

              <div className="flex items-center gap-4 text-slate-400">
                <span className="h-px flex-1 bg-slate-200" />
                <span className="text-base font-medium">or</span>
                <span className="h-px flex-1 bg-slate-200" />
              </div>

              <button
                type="button"
                className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 text-base font-bold text-slate-900 shadow-sm transition hover:border-teal-200 hover:bg-teal-50 focus:outline-none focus:ring-4 focus:ring-teal-100"
              >
                <Image
                  src="/images/circle-g.png"
                  alt=""
                  width={22}
                  height={22}
                  className="h-6 w-6 object-contain"
                />
                Continue with Google
              </button>
            </form>

            <p className="mt-6 text-center text-base font-medium text-slate-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-teal-600 transition hover:text-teal-800"
              >
                Create one
              </Link>
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
