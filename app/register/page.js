import Image from "next/image";
import Link from "next/link";

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

function TextField({ label, placeholder, type = "text", name, autoComplete, icon }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-900">{label}</span>
      <span className="mt-2 flex h-14 items-center rounded-xl border border-slate-200 bg-white px-4 text-slate-400 shadow-sm transition focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-100">
        <span className="grid h-8 w-8 shrink-0 place-items-center">
          <FieldIcon type={icon} />
        </span>
        <input
          type={type}
          name={name}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className="h-full min-w-0 flex-1 bg-transparent px-2 text-base font-medium text-slate-900 outline-none placeholder:text-slate-400"
        />
        {type === "password" && (
          <span className="grid h-8 w-8 shrink-0 place-items-center">
            <FieldIcon type="eye" />
          </span>
        )}
      </span>
    </label>
  );
}

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5fbfa] p-4 text-slate-950 sm:p-6 lg:p-12">
      <section className="mx-auto grid w-full max-w-[1440px] overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-slate-200/80 lg:min-h-[calc(100vh-6rem)] lg:grid-cols-[0.98fr_1.12fr]">
        <div className="flex items-center justify-center px-6 py-9 sm:px-10 lg:px-12">
          <div className="w-full max-w-[555px]">
            <div>
              <Image
                src="/images/mediora_logo.png"
                alt="Mediora"
                width={245}
                height={122}
                priority
                className="-ml-12 -mt-8 h-auto w-56"
              />
              <p className="-mt-8 ml-12 text-xs font-semibold text-slate-600">
                Your Health, Our Priority
              </p>
            </div>

            <div className="mt-10">
              <h1 className="text-4xl font-bold tracking-tight text-slate-950">
                Create <span className="text-teal-600">your account</span>
              </h1>
              <p className="mt-5 max-w-sm text-lg font-semibold leading-7 text-slate-500">
                Join Mediora and take the first step towards better health.
              </p>
            </div>

            <form className="mt-9 space-y-5">
              <TextField
                label="Full Name"
                name="fullName"
                autoComplete="name"
                placeholder="Enter your full name"
              />
              <TextField
                label="Username"
                name="username"
                autoComplete="username"
                placeholder="Choose a username"
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                icon="email"
                autoComplete="email"
                placeholder="Enter your email address"
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  icon="lock"
                  autoComplete="new-password"
                  placeholder="Create a password"
                />
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  icon="lock"
                  autoComplete="new-password"
                  placeholder="Confirm your password"
                />
              </div>

              <button
                type="button"
                className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#079f85] px-6 text-base font-bold text-white shadow-lg shadow-teal-600/18 transition hover:bg-[#078c77] focus:outline-none focus:ring-4 focus:ring-teal-100"
              >
                Create Account
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
                  <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="flex items-center gap-5 text-slate-400">
                <span className="h-px flex-1 bg-slate-200" />
                <span className="text-base font-semibold">or</span>
                <span className="h-px flex-1 bg-slate-200" />
              </div>

              <button
                type="button"
                className="flex h-14 w-full items-center justify-center gap-4 rounded-xl border border-slate-200 bg-white px-6 text-base font-bold text-slate-900 shadow-sm transition hover:border-teal-200 hover:bg-teal-50 focus:outline-none focus:ring-4 focus:ring-teal-100"
              >
                <span className="text-2xl font-black leading-none text-blue-500">G</span>
                Sign up with Google
              </button>
            </form>

            <p className="mt-7 text-center text-base font-semibold text-slate-500">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-teal-600 transition hover:text-teal-800">
                Sign in
              </Link>
            </p>

            <p className="mt-16 flex items-center gap-4 text-sm font-semibold text-slate-500">
              <span className="grid h-8 w-8 shrink-0 place-items-center text-teal-600">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                  <path d="M12 3.5 18 5.7v5.2c0 3.8-2.4 6.8-6 8.2-3.6-1.4-6-4.4-6-8.2V5.7l6-2.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="m9.2 11.8 1.8 1.8 3.9-4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              We protect your privacy and your data is secure with us.
            </p>
          </div>
        </div>

        <div className="relative min-h-[380px] overflow-hidden lg:min-h-full">
          <Image
            src="/images/register-couple.png"
            alt="Elderly couple smiling while using a smartphone"
            fill
            priority
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="object-cover object-center"
          />
        </div>
      </section>
    </main>
  );
}
