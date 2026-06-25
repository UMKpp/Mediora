import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 shadow-2xl shadow-teal-900/10 backdrop-blur md:grid-cols-[0.95fr_1.05fr]">
        <div className="hidden bg-gradient-to-br from-teal-700 via-emerald-600 to-sky-600 p-10 text-white md:flex md:flex-col md:justify-between">
          <div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-2xl font-bold ring-1 ring-white/25">
              M
            </div>
            <h1 className="mt-8 text-4xl font-bold tracking-tight">Mediora</h1>
            <p className="mt-4 max-w-sm text-base leading-7 text-teal-50">
              A modern care workspace for patients and healthcare teams.
            </p>
          </div>

          <div className="rounded-3xl bg-white/14 p-6 ring-1 ring-white/20">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-50">
              Care Access
            </p>
            <p className="mt-3 text-2xl font-semibold leading-snug">
              Sign in to continue managing your health journey.
            </p>
          </div>
        </div>

        <div className="px-6 py-8 sm:px-10 sm:py-12 lg:px-14">
          <div className="mx-auto w-full max-w-md">
            <div className="md:hidden">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-600 text-2xl font-bold text-white">
                M
              </div>
            </div>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
              Welcome back
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Sign in to Mediora
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Enter your details to access your healthcare dashboard.
            </p>

            <form className="mt-8 space-y-5">
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">
                  Username or email
                </span>
                <input
                  type="text"
                  name="identifier"
                  autoComplete="username"
                  placeholder="name@example.com"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700">
                  Password
                </span>
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                />
              </label>

              <button
                type="button"
                className="w-full rounded-2xl bg-gradient-to-r from-teal-600 to-sky-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition hover:from-teal-700 hover:to-sky-700 focus:outline-none focus:ring-4 focus:ring-teal-100"
              >
                Sign In
              </button>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-800 transition hover:border-teal-200 hover:bg-teal-50 focus:outline-none focus:ring-4 focus:ring-teal-100"
              >
                <span className="grid h-5 w-5 place-items-center rounded-full border border-slate-300 text-xs font-black text-sky-600">
                  G
                </span>
                Continue with Google
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-600">
              New to Mediora?{" "}
              <Link
                href="/register"
                className="font-bold text-teal-700 transition hover:text-teal-900"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
