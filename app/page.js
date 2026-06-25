import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "Symptom Checker",
    description: "Preview guided symptom support before signing in.",
    icon: "/images/stethoscope.png",
  },
  {
    title: "Doctor Locator",
    description: "Find nearby care options from your secure dashboard.",
    icon: "/images/map-marker.png",
  },
  {
    title: "Pharmacy Locator",
    description: "Discover pharmacy access once your account is ready.",
    icon: "/images/care.png",
  },
  {
    title: "Emergency Guidance",
    description: "Access urgent medical guidance after signing in.",
    icon: "/images/ambulance.png",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4fbfa] text-slate-950">
      <header className="sticky top-0 z-30 border-b border-teal-100/70 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/mediora_logo_clean.png"
              alt="Mediora"
              width={120}
              height={87}
              priority
              className="h-auto w-24"
            />
          </Link>

          <div className="hidden items-center gap-8 text-sm font-bold text-slate-600 md:flex">
            <Link href="/" className="transition hover:text-teal-700">
              Home
            </Link>
            <Link href="#features" className="transition hover:text-teal-700">
              Features
            </Link>
            <Link href="#about" className="transition hover:text-teal-700">
              About
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="rounded-xl border border-teal-100 bg-white px-4 py-2 text-sm font-bold text-teal-700 shadow-sm transition hover:bg-teal-50"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="rounded-xl bg-[#08aa9c] px-4 py-2 text-sm font-bold text-white shadow-lg shadow-teal-600/20 transition hover:bg-[#07998c]"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-teal-700">
            Mediora Healthcare
          </p>
          <h1 className="mt-5 max-w-3xl text-5xl font-black leading-tight tracking-tight text-[#0d4050] sm:text-6xl">
            Your Digital Healthcare Companion
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-600">
            Mediora helps users check symptoms, find nearby doctors and
            pharmacies, and access emergency medical guidance in one secure
            platform.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-[#08aa9c] px-7 text-base font-bold text-white shadow-lg shadow-teal-600/20 transition hover:bg-[#07998c]"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-7 text-base font-bold text-[#0d4050] shadow-sm transition hover:border-teal-200 hover:bg-teal-50"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] bg-cover bg-center shadow-2xl shadow-teal-900/10 lg:min-h-[520px]"
          style={{ backgroundImage: "url('/images/login-family.webp')" }}
          aria-label="Happy family using Mediora healthcare support"
        />
      </section>

      <section id="features" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-black tracking-tight text-[#0d4050] sm:text-4xl">
              Features available after sign in
            </h2>
            <p className="mt-4 text-base font-medium leading-7 text-slate-600">
              Explore what Mediora offers. To actually use these tools, create
              an account or sign in first.
            </p>
          </div>

          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Link
                key={feature.title}
                href="/login"
                className="group rounded-2xl border border-slate-100 bg-[#fbfdfd] p-6 shadow-sm transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-900/10"
              >
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-teal-50">
                  <Image
                    src={feature.icon}
                    alt=""
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain"
                  />
                </span>
                <h3 className="mt-5 text-xl font-black text-slate-950">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
                  {feature.description}
                </p>
                <p className="mt-5 text-sm font-bold text-teal-700">
                  Sign in to use
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="rounded-[2rem] bg-gradient-to-br from-teal-700 via-[#08aa9c] to-emerald-600 px-6 py-10 text-white shadow-2xl shadow-teal-900/15 sm:px-10 lg:px-14">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Why Mediora?
          </h2>
          <p className="mt-5 max-w-3xl text-lg font-medium leading-8 text-teal-50">
            Mediora is designed for trusted healthcare access, fast guidance,
            and a simple user-friendly experience. It brings symptom support,
            location-based care discovery, pharmacy access, and emergency
            guidance into one secure place.
          </p>
        </div>
      </section>

      <footer className="border-t border-teal-100 bg-white px-5 py-7 text-center text-sm font-semibold text-slate-500">
        © 2026 Mediora. All rights reserved.
      </footer>
    </main>
  );
}
