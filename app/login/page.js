import Link from "next/link";
import Image from "next/image";

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

function Feature({ icon, title, subtitle }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/75 text-teal-600 shadow-sm">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold leading-5 text-slate-900">
          {title}
        </span>
        <span className="block text-sm font-semibold leading-5 text-slate-900">
          {subtitle}
        </span>
      </span>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f2fbfa] p-0 text-slate-900 sm:p-4 lg:p-6">
      <section className="mx-auto grid min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#effbfa] via-white to-[#f7fcff] shadow-2xl shadow-slate-200/80 sm:min-h-[calc(100vh-2rem)] sm:rounded-[2rem] lg:min-h-[calc(100vh-3rem)] lg:max-w-[1520px] lg:grid-cols-[1.08fr_1fr]">
        <div className="relative flex min-h-[560px] flex-col overflow-hidden px-6 py-7 sm:px-10 lg:min-h-0 lg:px-14 lg:py-12">
          <div className="absolute inset-0 opacity-100">
            <Image
              src="/images/login-family.png"
              alt="Smiling family sitting together in a calm healthcare setting"
              fill
              priority
              sizes="(min-width: 1024px) 54vw, 100vw"
              className="object-cover object-[36%_72%]"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#eefcfb]/78 via-[#eefcfb]/28 to-white/10" />
          <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-l from-white/64 to-transparent lg:block" />

          <div className="relative z-10 flex items-center gap-4">
            <div className="relative grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-600/20">
              <span className="absolute h-12 w-12 rounded-2xl bg-teal-500" />
              <span className="absolute h-12 w-12 rotate-90 rounded-2xl bg-emerald-500" />
              <span className="relative text-4xl font-black leading-none">+</span>
            </div>
            <div>
              <p className="text-4xl font-bold tracking-tight text-[#0c4050]">
                Mediora
              </p>
              <p className="mt-1 text-sm font-medium text-slate-700">
                Your Health, Our Priority
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-20 max-w-lg lg:mt-24">
            <h1 className="text-5xl font-bold leading-[1.12] tracking-tight text-[#0d4854] sm:text-6xl">
              Better Health.
              <br />
              Better Life.
            </h1>
            <p className="mt-7 max-w-md text-xl font-medium leading-8 text-slate-700">
              Mediora is your smart healthcare companion for a healthier you
              and your loved ones.
            </p>
          </div>

          <div className="relative z-10 mt-auto hidden rounded-[2rem] bg-white/70 px-7 py-6 backdrop-blur sm:block">
            <div className="grid gap-5 sm:grid-cols-3">
              <Feature
                title="Trusted"
                subtitle="Care"
                icon={
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7" fill="none">
                    <path
                      d="M12 3.5 19 6v5.3c0 4.3-2.8 7.6-7 9.2-4.2-1.6-7-4.9-7-9.2V6l7-2.5Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    <path
                      d="m8.8 12 2 2 4.4-5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              />
              <Feature
                title="Find Doctors"
                subtitle="Nearby"
                icon={
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7" fill="none">
                    <path
                      d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                }
              />
              <Feature
                title="Health"
                subtitle="Guidance"
                icon={
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7" fill="none">
                    <path
                      d="M3 12h4l2-5 4 10 2-5h6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.4 8.4A4 4 0 0 1 12 5.2a4 4 0 0 1 6.6 3.2c0 4.1-6.6 8.6-6.6 8.6s-2-1.4-3.8-3.2"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-5 py-8 sm:px-8 lg:px-10">
          <section className="w-full max-w-[560px] rounded-[2rem] bg-white/92 px-6 py-8 shadow-2xl shadow-slate-300/40 ring-1 ring-white sm:rounded-[2.2rem] sm:px-10 sm:py-10 lg:px-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-[#0d4050] sm:text-4xl">
                Welcome Back
              </h2>
              <p className="mt-4 text-lg font-medium text-slate-500">
                Sign in to your Mediora account
              </p>
            </div>

            <form className="mt-9 space-y-6">
              <label className="block">
                <span className="text-base font-medium text-slate-800">
                  Username or Email
                </span>
                <span className="mt-3 flex h-14 items-center rounded-xl border border-slate-200 bg-white px-4 shadow-sm transition focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-100">
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
                <span className="text-base font-medium text-slate-800">
                  Password
                </span>
                <span className="mt-3 flex h-14 items-center rounded-xl border border-slate-200 bg-white px-4 shadow-sm transition focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-100">
                  <Icon>
                    <FieldIcon type="lock" />
                  </Icon>
                  <input
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="h-full min-w-0 flex-1 bg-transparent px-2 text-base text-slate-900 outline-none placeholder:text-slate-400"
                  />
                  <Icon>
                    <FieldIcon type="eye" />
                  </Icon>
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
                className="h-14 w-full rounded-xl bg-[#08aa9c] px-6 text-lg font-bold text-white shadow-lg shadow-teal-600/20 transition hover:bg-[#07998c] focus:outline-none focus:ring-4 focus:ring-teal-100"
              >
                Sign In
              </button>

              <div className="flex items-center gap-6 text-slate-400">
                <span className="h-px flex-1 bg-slate-200" />
                <span className="text-base font-medium">or</span>
                <span className="h-px flex-1 bg-slate-200" />
              </div>

              <button
                type="button"
                className="flex h-14 w-full items-center justify-center gap-4 rounded-xl border border-slate-200 bg-white px-6 text-lg font-bold text-slate-900 shadow-sm transition hover:border-teal-200 hover:bg-teal-50 focus:outline-none focus:ring-4 focus:ring-teal-100"
              >
                <span className="text-3xl font-black leading-none">
                  <span className="text-blue-500">G</span>
                </span>
                Continue with Google
              </button>
            </form>

            <p className="mt-9 text-center text-base font-medium text-slate-500">
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
