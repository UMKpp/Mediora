import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 shadow-2xl shadow-teal-900/10 backdrop-blur md:grid-cols-[1.05fr_0.95fr]">
        <div className="px-6 py-8 sm:px-10 sm:py-12 lg:px-14">
          <div className="mx-auto w-full max-w-md">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-600 text-2xl font-bold text-white">
              M
            </div>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
              Get started
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Create your account
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Join Mediora to prepare for a connected healthcare experience.
            </p>

            <form className="mt-8 space-y-4">
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">
                  Full name
                </span>
                <input
                  type="text"
                  name="fullName"
                  autoComplete="name"
                  placeholder="Alex Morgan"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700">
                  Username
                </span>
                <input
                  type="text"
                  name="username"
                  autoComplete="username"
                  placeholder="alexmorgan"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">
                    Password
                  </span>
                  <input
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    placeholder="Create password"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">
                    Confirm password
                  </span>
                  <input
                    type="password"
                    name="confirmPassword"
                    autoComplete="new-password"
                    placeholder="Repeat password"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                  />
                </label>
              </div>

              <button
                type="button"
                className="w-full rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition hover:from-emerald-700 hover:via-teal-700 hover:to-sky-700 focus:outline-none focus:ring-4 focus:ring-teal-100"
              >
                Create Account
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-teal-700 transition hover:text-teal-900"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden bg-gradient-to-br from-sky-600 via-teal-600 to-emerald-600 p-10 text-white md:flex md:flex-col md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-50">
              Mediora Network
            </p>
            <h2 className="mt-5 text-4xl font-bold tracking-tight">
              Healthcare access with a calmer first step.
            </h2>
          </div>

          <div className="grid gap-4">
            <div className="rounded-3xl bg-white/14 p-5 ring-1 ring-white/20">
              <p className="text-lg font-semibold">Patient-ready profiles</p>
              <p className="mt-2 text-sm leading-6 text-sky-50">
                A clean account foundation before backend connections are added.
              </p>
            </div>
            <div className="rounded-3xl bg-white/14 p-5 ring-1 ring-white/20">
              <p className="text-lg font-semibold">Responsive by design</p>
              <p className="mt-2 text-sm leading-6 text-sky-50">
                Comfortable on phones, tablets, laptops, and clinic desktops.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
