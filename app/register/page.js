"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function FieldIcon({ type }) {
  if (type === "email") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="m4.5 7 7.5 6 7.5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "lock") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path d="M7 10V8a5 5 0 0 1 10 0v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <rect x="5.5" y="10" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 14.5v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "eye") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path d="M2.5 12s3.4-5.5 9.5-5.5 9.5 5.5 9.5 5.5-3.4 5.5-9.5 5.5S2.5 12 2.5 12Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="2.3" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function TextField({
  label,
  placeholder,
  type = "text",
  name,
  autoComplete,
  icon,
  visible,
  onToggleVisibility,
  value,
  onChange,
  hasError = false,
  error,
}) {
  const isPassword = type === "password";
  const fieldStateClass = hasError
    ? "border-rose-300 bg-rose-50 text-slate-400 focus-within:border-rose-400 focus-within:ring-4 focus-within:ring-rose-100"
    : "border-slate-200 bg-white text-slate-400 focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-100";

  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-900">{label}</span>
      <span className={`mt-2 flex h-12 items-center rounded-xl border px-3 shadow-sm transition ${fieldStateClass}`}>
        <span className="grid h-8 w-8 shrink-0 place-items-center">
          <FieldIcon type={icon} />
        </span>
        <input
          type={isPassword && visible ? "text" : type}
          name={name}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          aria-invalid={hasError}
          aria-describedby={error ? `${name}-error` : undefined}
          className="h-full min-w-0 flex-1 bg-transparent px-2 text-base font-medium text-slate-900 outline-none placeholder:text-slate-400"
        />
        {isPassword && (
          <button
            type="button"
            onClick={onToggleVisibility}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg transition hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-100"
            aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
            aria-pressed={visible}
          >
            <Image
              src={visible ? "/images/eye-crossed.png" : "/images/eye.png"}
              alt=""
              width={20}
              height={20}
              className="h-5 w-5 object-contain opacity-70"
            />
          </button>
        )}
      </span>
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm font-bold text-red-700">
          {error}
        </p>
      )}
    </label>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const passwordsMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    setStatusMessage("");

    if (field === "password") {
      setPassword(value);
    }

    if (field === "confirmPassword") {
      setConfirmPassword(value);
    }
  }

  function validateForm() {
    const nextErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!form.username.trim()) nextErrors.username = "Username is required.";
    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailPattern.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!form.password) {
      nextErrors.password = "Password is required.";
    } else if (form.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }
    if (!form.confirmPassword) {
      nextErrors.confirmPassword = "Confirm your password.";
    } else if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setStatusMessage("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    window.setTimeout(() => {
      window.localStorage.setItem(
        "medioraMockUser",
        JSON.stringify({
          fullName: form.fullName.trim(),
          username: form.username.trim(),
          email: form.email.trim(),
          password: form.password,
        }),
      );
      setStatusMessage("Account created successfully. Redirecting to sign in...");
      router.replace("/login");
    }, 500);
  }

  return (
    <main className="flex min-h-screen items-center justify-center overflow-x-hidden bg-[#f5fbfa] p-3 text-slate-950 sm:p-6 lg:p-12">
      <section className="mx-auto grid w-full max-w-[1440px] overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-200/80 sm:rounded-[2rem] lg:min-h-[calc(100vh-6rem)] lg:grid-cols-[0.98fr_1.12fr]">
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

            <div className="mt-3 text-center">
              <h1 className="text-2xl font-bold tracking-tight text-[#0d4050] sm:text-3xl">
                Create <span className="text-teal-600">your account</span>
              </h1>
              <p className="mx-auto mt-3 max-w-sm text-base font-medium leading-6 text-slate-500">
                Join Mediora and take the first step towards better health.
              </p>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
              <TextField
                label="Full Name"
                name="fullName"
                autoComplete="name"
                placeholder="Enter your full name"
                value={form.fullName}
                onChange={(event) => updateField("fullName", event.target.value)}
                hasError={Boolean(errors.fullName)}
                error={errors.fullName}
              />
              <TextField
                label="Username"
                name="username"
                autoComplete="username"
                placeholder="Choose a username"
                value={form.username}
                onChange={(event) => updateField("username", event.target.value)}
                hasError={Boolean(errors.username)}
                error={errors.username}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                icon="email"
                autoComplete="email"
                placeholder="Enter your email address"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                hasError={Boolean(errors.email)}
                error={errors.email}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  icon="lock"
                  autoComplete="new-password"
                  placeholder="Create a password"
                  visible={showPassword}
                  value={password}
                  onChange={(event) => updateField("password", event.target.value)}
                  hasError={Boolean(errors.password)}
                  error={errors.password}
                  onToggleVisibility={() => setShowPassword((visible) => !visible)}
                />
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  icon="lock"
                  autoComplete="new-password"
                  placeholder="Confirm your password"
                  visible={showConfirmPassword}
                  value={confirmPassword}
                  onChange={(event) => updateField("confirmPassword", event.target.value)}
                  hasError={passwordsMismatch || Boolean(errors.confirmPassword)}
                  error={errors.confirmPassword}
                  onToggleVisibility={() =>
                    setShowConfirmPassword((visible) => !visible)
                  }
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#08aa9c] px-6 text-base font-bold text-white shadow-lg shadow-teal-600/20 transition hover:bg-[#07998c] focus:outline-none focus:ring-4 focus:ring-teal-100 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Creating account..." : "Create Account"}
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
                  <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {statusMessage && (
                <p className="rounded-2xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-black text-teal-700">
                  {statusMessage}
                </p>
              )}

            </form>

            <p className="mt-6 text-center text-base font-medium text-slate-500">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-teal-600 transition hover:text-teal-800">
                Sign in
              </Link>
            </p>

            <p className="mt-6 flex items-center justify-center gap-3 text-center text-xs font-semibold text-slate-500">
              <span className="grid h-8 w-8 shrink-0 place-items-center text-teal-600">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                  <path d="M12 3.5 18 5.7v5.2c0 3.8-2.4 6.8-6 8.2-3.6-1.4-6-4.4-6-8.2V5.7l6-2.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="m9.2 11.8 1.8 1.8 3.9-4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              We protect your privacy and your data is secure with us.
            </p>
          </section>
        </div>

        <div
          aria-label="Elderly couple smiling while using a smartphone"
          className="relative hidden min-h-[380px] overflow-hidden bg-cover bg-center md:block lg:min-h-full"
          style={{ backgroundImage: "url('/images/register-couple.webp')" }}
        />
      </section>
    </main>
  );
}
