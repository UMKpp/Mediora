"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
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

function PosterIcon({ type }) {
  if (type === "pin") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path
          d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (type === "heart") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path
          d="M3.5 12h3l2-5 3.5 10 2.5-6H20"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path
        d="M12 3.5 18 5.7v5.2c0 3.8-2.4 6.8-6 8.2-3.6-1.4-6-4.4-6-8.2V5.7l6-2.2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M12 8v6M9 11h6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validateForm() {
    const nextErrors = {};

    if (!identifier.trim()) {
      nextErrors.identifier = "Username or email is required.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFormError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    window.setTimeout(() => {
      const storedUser = JSON.parse(window.localStorage.getItem("medioraMockUser") || "null");
      const normalizedIdentifier = identifier.trim().toLowerCase();
      const fallbackMatch =
        (normalizedIdentifier === "user@mediora.com" ||
          normalizedIdentifier === "mediorauser") &&
        password === "user12345";
      const storedMatch =
        storedUser &&
        (storedUser.email?.toLowerCase() === normalizedIdentifier ||
          storedUser.username?.toLowerCase() === normalizedIdentifier) &&
        storedUser.password === password;

      if (fallbackMatch || storedMatch) {
        window.localStorage.setItem("medioraUserAuthenticated", "true");
        window.localStorage.setItem(
          "medioraCurrentUser",
          JSON.stringify(
            storedMatch
              ? storedUser
              : {
                  fullName: "Mediora User",
                  username: "mediorauser",
                  email: "user@mediora.com",
                },
          ),
        );
        router.replace("/dashboard");
        return;
      }

      setIsSubmitting(false);
      setFormError("Invalid username/email or password.");
    }, 450);
  }

  return (
    <main className="flex min-h-screen items-center justify-center overflow-x-hidden bg-[#f5fbfa] p-3 text-slate-900 sm:p-6 lg:p-12">
      <section className="mx-auto grid w-full max-w-[1440px] overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-200/80 sm:rounded-[2rem] lg:min-h-[calc(100vh-6rem)] lg:grid-cols-[0.98fr_1.12fr]">
        <div className="hidden items-center justify-center bg-[#f1fbf8] p-3 md:flex lg:p-5">
          <section className="relative flex aspect-[3/4] w-full max-w-[620px] flex-col overflow-hidden rounded-[2rem] border border-teal-100 bg-gradient-to-b from-[#dcfbf4] via-[#f7fffc] to-white p-7 shadow-2xl shadow-teal-900/10 lg:p-9">
            <div
              className="absolute right-0 top-0 h-48 w-56 opacity-45"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(8,170,156,0.26) 1.4px, transparent 1.5px)",
                backgroundSize: "18px 18px",
              }}
            />

            <svg
              aria-hidden="true"
              viewBox="0 0 220 220"
              className="absolute -right-24 top-12 h-64 w-64 text-white/80"
              fill="none"
            >
              <path
                d="M110 18 180 44v58c0 48-28 86-70 108-42-22-70-60-70-108V44l70-26Z"
                stroke="currentColor"
                strokeWidth="10"
                strokeLinejoin="round"
              />
              <path
                d="M110 68v72M74 104h72"
                stroke="currentColor"
                strokeWidth="10"
                strokeLinecap="round"
              />
            </svg>

            <div className="relative z-10 flex items-center gap-3">
              <Image
                src="/images/mediora_logo.png"
                alt=""
                width={52}
                height={52}
                priority
                className="h-auto w-11"
              />
              <div>
                <p className="text-2xl font-black leading-none tracking-tight text-[#0d4050]">
                  Mediora
                </p>
                <p className="mt-1 text-xs font-bold text-slate-500">
                  Your Health, Our Priority.
                </p>
              </div>
            </div>

            <div className="relative z-10 mt-9">
              <h2 className="text-4xl font-black leading-tight tracking-tight text-[#0d4050] lg:text-5xl">
                Better Health.
                <span className="block">Better Life.</span>
              </h2>
              <p className="mt-5 max-w-sm text-base font-semibold leading-7 text-slate-500">
                Mediora is your smart healthcare companion for a healthier you
                and your loved ones.
              </p>
            </div>

            <div className="relative z-10 mx-[-0.35rem] mt-8 min-h-[265px] overflow-hidden rounded-[1.75rem] lg:min-h-[330px]">
              <div
                aria-label="Smiling family sitting together in a cozy home"
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/login-family.webp')" }}
              />
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white via-white/75 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/75 to-transparent" />
            </div>

            <div className="relative z-10 mt-auto grid grid-cols-3 gap-3 pt-7">
              {[
                ["shield", "Trusted Care"],
                ["pin", "Find Doctors Nearby"],
                ["heart", "Health Guidance"],
              ].map(([icon, label]) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 px-1 text-center text-teal-700"
                >
                  <span className="grid h-9 w-9 place-items-center">
                    <PosterIcon type={icon} />
                  </span>
                  <span className="text-xs font-black leading-4 text-[#0d4050]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="flex min-w-0 items-center justify-center px-3 py-7 sm:px-8 sm:py-10 lg:px-16">
          <section className="w-full max-w-[480px] rounded-3xl bg-white px-5 py-7 shadow-2xl shadow-slate-300/45 ring-1 ring-slate-100 sm:rounded-[1.75rem] sm:px-10 sm:py-9">
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
              <h1 className="mt-3 text-2xl font-bold tracking-tight text-[#0d4050] sm:text-3xl">
                Welcome Back
              </h1>
              <p className="mx-auto mt-3 max-w-sm text-base font-medium leading-6 text-slate-500">
                Sign in to your Mediora account
              </p>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
              <label className="block">
                <span className="text-sm font-bold text-slate-900">
                  Username or Email
                </span>
                <span className={`mt-2 flex h-12 items-center rounded-xl border bg-white px-3 shadow-sm transition focus-within:ring-4 ${
                  errors.identifier
                    ? "border-red-300 focus-within:border-red-400 focus-within:ring-red-100"
                    : "border-slate-200 focus-within:border-teal-500 focus-within:ring-teal-100"
                }`}>
                  <Icon>
                    <FieldIcon />
                  </Icon>
                  <input
                    type="text"
                    name="identifier"
                    value={identifier}
                    onChange={(event) => {
                      setIdentifier(event.target.value);
                      setErrors((current) => ({ ...current, identifier: "" }));
                      setFormError("");
                    }}
                    autoComplete="username"
                    placeholder="Enter your username or email"
                    aria-invalid={Boolean(errors.identifier)}
                    aria-describedby={errors.identifier ? "identifier-error" : undefined}
                    className="h-full min-w-0 flex-1 bg-transparent px-2 text-base text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </span>
                {errors.identifier && (
                  <p id="identifier-error" className="mt-2 text-sm font-bold text-red-700">
                    {errors.identifier}
                  </p>
                )}
              </label>

              <label className="block">
                <span className="text-sm font-bold text-slate-900">
                  Password
                </span>
                <span className={`mt-2 flex h-12 items-center rounded-xl border bg-white px-3 shadow-sm transition focus-within:ring-4 ${
                  errors.password
                    ? "border-red-300 focus-within:border-red-400 focus-within:ring-red-100"
                    : "border-slate-200 focus-within:border-teal-500 focus-within:ring-teal-100"
                }`}>
                  <Icon>
                    <FieldIcon type="lock" />
                  </Icon>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setErrors((current) => ({ ...current, password: "" }));
                      setFormError("");
                    }}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={errors.password ? "password-error" : undefined}
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
                {errors.password && (
                  <p id="password-error" className="mt-2 text-sm font-bold text-red-700">
                    {errors.password}
                  </p>
                )}
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
                type="submit"
                disabled={isSubmitting}
                className="h-12 w-full rounded-xl bg-[#08aa9c] px-6 text-base font-bold text-white shadow-lg shadow-teal-600/20 transition hover:bg-[#07998c] focus:outline-none focus:ring-4 focus:ring-teal-100 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>

              {formError && (
                <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-black text-red-700">
                  {formError}
                </p>
              )}

              <div className="flex items-center gap-4 text-slate-400">
                <span className="h-px flex-1 bg-slate-200" />
                <span className="text-base font-medium">or</span>
                <span className="h-px flex-1 bg-slate-200" />
              </div>

              <button
                type="button"
                className="flex min-h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2 text-base font-bold text-slate-900 shadow-sm transition hover:border-teal-200 hover:bg-teal-50 focus:outline-none focus:ring-4 focus:ring-teal-100"
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
