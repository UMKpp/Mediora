"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const features = [
  {
    title: "Symptom Checker",
    description: "Preview guided symptom support before signing in.",
    icon: "/images/stethoscope.png",
    video: "/videos/symptom-checker.mp4",
  },
  {
    title: "Doctor Locator",
    description: "Find nearby care options from your secure dashboard.",
    icon: "/images/map-marker.png",
    video: "/videos/doctor-locator.mp4",
  },
  {
    title: "Pharmacy Locator",
    description: "Discover pharmacy access once your account is ready.",
    icon: "/images/care.png",
    video: "/videos/pharmacy-locator.mp4",
  },
  {
    title: "Emergency Guidance",
    description: "Access urgent medical guidance after signing in.",
    icon: "/images/ambulance.png",
    video: "/videos/emergency-guidance.mp4",
  },
];

function PlayIcon({ className = "h-5 w-5" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M9 7.3v9.4c0 .8.9 1.3 1.6.9l7.3-4.7c.6-.4.6-1.4 0-1.8l-7.3-4.7C9.9 6 9 6.5 9 7.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path
        d="m6 6 12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedFeature = features[activeFeature];

  useEffect(() => {
    if (isModalOpen) {
      return undefined;
    }

    const rotation = window.setInterval(() => {
      setActiveFeature((current) => (current + 1) % features.length);
    }, 4200);

    return () => window.clearInterval(rotation);
  }, [isModalOpen]);

  useEffect(() => {
    const revealItems = document.querySelectorAll(".reveal-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      return undefined;
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f4fbfa] text-slate-950">
      <header className="sticky top-0 z-30 border-b border-teal-100/70 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-8 sm:py-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl transition duration-300 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-teal-200"
          >
            <Image
              src="/images/mediora_textlogo.png"
              alt="Mediora"
              width={120}
              height={87}
              priority
              className="h-auto w-20 sm:w-24"
            />
          </Link>

          <div className="hidden items-center gap-8 text-sm font-bold text-slate-600 md:flex">
            {[
              ["Home", "/"],
              ["Features", "#features"],
              ["About", "#about"],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="rounded-lg transition duration-300 hover:-translate-y-0.5 hover:text-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-100"
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-teal-100 bg-white px-3 py-2 text-sm font-bold text-teal-700 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-teal-300 hover:bg-teal-50 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-teal-100 active:scale-[0.98] sm:px-4"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#08aa9c] px-3 py-2 text-sm font-bold text-white shadow-lg shadow-teal-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-[#07998c] hover:shadow-xl hover:shadow-teal-700/25 focus:outline-none focus:ring-4 focus:ring-teal-200 active:scale-[0.98] sm:px-4"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      <section className="reveal-on-scroll mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-8 sm:py-14 lg:grid-cols-[1fr_0.95fr] lg:gap-10 lg:py-20">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-700 sm:text-sm sm:tracking-[0.22em]">
            Mediora Healthcare
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-tight text-[#0d4050] sm:mt-5 sm:text-5xl lg:text-6xl">
            Your Digital Healthcare Companion
          </h1>
          <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
            Mediora helps users check symptoms, find nearby doctors and
            pharmacies, and access emergency medical guidance in one secure
            platform.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#08aa9c] px-7 text-base font-bold text-white shadow-lg shadow-teal-600/20 transition duration-300 hover:-translate-y-1 hover:bg-[#07998c] hover:shadow-xl hover:shadow-teal-700/25 focus:outline-none focus:ring-4 focus:ring-teal-200 active:scale-[0.98]"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-7 text-base font-bold text-[#0d4050] shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-300 hover:bg-teal-50 hover:shadow-lg hover:shadow-teal-900/10 focus:outline-none focus:ring-4 focus:ring-teal-100 active:scale-[0.98]"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="min-w-0 w-full">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            aria-label={`Play ${selectedFeature.title} preview`}
            className="group relative block aspect-square w-full overflow-hidden rounded-3xl border border-teal-100 bg-white shadow-2xl shadow-teal-900/10 transition duration-500 hover:-translate-y-1 hover:border-teal-300 hover:shadow-[0_28px_70px_rgba(13,148,136,0.24)] focus:outline-none focus:ring-4 focus:ring-teal-200 sm:rounded-[2rem]"
          >
            <video
              key={selectedFeature.video}
              src={selectedFeature.video}
              className="h-full w-full object-cover"
              muted
              loop
              autoPlay
              playsInline
              preload="metadata"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-teal-500/10" />
            <span className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3 rounded-2xl border border-white/25 bg-white/90 p-3 text-left shadow-lg backdrop-blur transition duration-300 group-hover:bg-white sm:bottom-5 sm:left-5 sm:right-5 sm:gap-4 sm:p-4">
              <span className="min-w-0">
                <span className="block text-xs font-black uppercase tracking-[0.18em] text-teal-700">
                  Preview
                </span>
                <span className="mt-1 block text-base font-black text-[#0d4050] sm:text-lg">
                  {selectedFeature.title}
                </span>
              </span>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-red-600 text-white shadow-lg shadow-red-700/25 transition duration-300 group-hover:scale-110 sm:h-12 sm:w-12">
                <PlayIcon />
              </span>
            </span>
          </button>

          <div className="mt-4 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:mt-5 sm:grid-cols-4">
            {features.map((feature, index) => (
              <button
                key={feature.title}
                type="button"
                onClick={() => setActiveFeature(index)}
                className={`min-h-12 rounded-xl border px-3 text-sm font-black transition duration-300 hover:-translate-y-0.5 hover:border-teal-300 hover:bg-teal-50 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-teal-100 active:scale-[0.98] ${
                  index === activeFeature
                    ? "border-teal-300 bg-teal-50 text-teal-800 shadow-md shadow-teal-900/10"
                    : "border-teal-100 bg-white text-slate-600"
                }`}
              >
                {feature.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="bg-white py-16">
        <div className="reveal-on-scroll mx-auto max-w-7xl px-4 sm:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-black tracking-tight text-[#0d4050] sm:text-4xl">
              Unlock the Full Mediora Experience
            </h2>
            <p className="mt-4 text-base font-medium leading-7 text-slate-600">
              Sign in or create an account to access personalized healthcare
              tools designed to support you every step of the way.
            </p>
          </div>

          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Link
                key={feature.title}
                href="/login"
                className="group rounded-2xl border border-slate-100 bg-[#fbfdfd] p-5 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-teal-300 hover:shadow-2xl hover:shadow-teal-900/12 focus:outline-none focus:ring-4 focus:ring-teal-100 active:scale-[0.99]"
              >
                <span className="relative block aspect-square overflow-hidden rounded-2xl border border-teal-100 bg-teal-50 shadow-inner">
                  <video
                    src={feature.video}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent" />
                  <span className="absolute bottom-3 left-3 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-red-600 shadow-lg transition duration-300 group-hover:scale-110">
                    <PlayIcon className="h-4 w-4" />
                  </span>
                  <span className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-2xl bg-white/95">
                    <Image
                      src={feature.icon}
                      alt=""
                      width={28}
                      height={28}
                      className="h-7 w-7 object-contain"
                    />
                  </span>
                </span>
                <h3 className="mt-5 text-xl font-black text-slate-950 transition duration-300 group-hover:text-teal-800">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
                  {feature.description}
                </p>
                <p className="mt-5 text-sm font-bold text-teal-700 transition duration-300 group-hover:translate-x-1">
                  Sign in to use
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="reveal-on-scroll rounded-3xl bg-gradient-to-br from-teal-700 via-[#08aa9c] to-emerald-600 px-5 py-8 text-white shadow-2xl shadow-teal-900/15 transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(13,148,136,0.24)] sm:rounded-[2rem] sm:px-10 sm:py-10 lg:px-14">
          <h2 className="text-2xl font-black tracking-tight sm:text-4xl">
            Why Mediora?
          </h2>
          <p className="mt-4 max-w-3xl text-base font-medium leading-7 text-teal-50 sm:mt-5 sm:text-lg sm:leading-8">
            Mediora is designed for trusted healthcare access, fast guidance,
            and a simple user-friendly experience. It brings symptom support,
            location-based care discovery, pharmacy access, and emergency
            guidance into one secure place.
          </p>
        </div>
      </section>

      <footer className="border-t border-teal-100 bg-white px-5 py-7 text-center text-sm font-semibold text-slate-500">
        &copy; 2026 Mediora. All rights reserved.
      </footer>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/70 p-3 backdrop-blur-sm sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedFeature.title} video preview`}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="my-auto w-full max-w-3xl rounded-3xl border border-teal-100 bg-white p-3 shadow-2xl shadow-slate-950/30 sm:rounded-[2rem] sm:p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-700">
                  Mediora feature preview
                </p>
                <h2 className="mt-1 text-lg font-black text-[#0d4050] sm:text-xl">
                  {selectedFeature.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-black text-slate-700 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-teal-300 hover:bg-teal-50 focus:outline-none focus:ring-4 focus:ring-teal-100 active:scale-[0.98] sm:px-4"
              >
                <CloseIcon />
                Close
              </button>
            </div>
            <video
              key={`modal-${selectedFeature.video}`}
              src={selectedFeature.video}
              className="aspect-square max-h-[72vh] w-full rounded-2xl border border-teal-100 bg-slate-950 object-cover shadow-xl shadow-teal-900/10 sm:rounded-[1.5rem]"
              muted
              autoPlay
              loop
              playsInline
              controls
            />
          </div>
        </div>
      )}
    </main>
  );
}
