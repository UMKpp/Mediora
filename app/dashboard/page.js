"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const featureCards = [
  {
    title: "Symptom Checker",
    description: "Start a guided health check and organize symptoms before seeking care.",
    href: "/dashboard/symptom-checker",
    icon: "/images/symptom_checker.png",
    cta: "Start Check",
    hint: "Resume your last check-in",
    progress: 40,
  },
  {
    title: "Find Doctors",
    description: "Explore nearby medical professionals and prepare for appointments.",
    href: "/dashboard/doctors",
    icon: "/images/stethoscope.png",
    cta: "Find Doctors",
    hint: "Recommended for your area",
  },
  {
    title: "Find Pharmacies",
    description: "Locate pharmacy options and plan convenient access to medicines.",
    href: "/dashboard/pharmacies",
    icon: "/images/pharmacy.png",
    cta: "Find Pharmacies",
    hint: "Open-now options available",
  },
  {
    title: "Emergency Guidance",
    description: "Review clear next-step guidance for urgent healthcare situations.",
    href: "/dashboard/emergency",
    icon: "/images/alert.png",
    cta: "View Guidance",
    hint: "Quick help categories ready",
  },
];

const activityItems = [
  {
    title: "Symptom check started",
    description: "You began a guided check-in for recent symptoms.",
    time: "Today",
  },
  {
    title: "Doctor profiles viewed",
    description: "Care options were opened from your dashboard.",
    time: "Yesterday",
  },
  {
    title: "Pharmacy search opened",
    description: "Nearby medicine access was reviewed.",
    time: "2 days ago",
  },
];

const healthTips = [
  "Stay hydrated during warm days",
  "Keep emergency contacts ready",
  "Review symptoms before visiting a doctor",
];

export default function DashboardPage() {
  const [simpleMode, setSimpleMode] = useState(false);
  const [olderAdultText, setOlderAdultText] = useState(false);

  const pageSpacing = simpleMode ? "space-y-8" : "space-y-6";
  const cardPadding = simpleMode ? "p-7 sm:p-8" : "p-6";
  const gridClass = simpleMode
    ? "grid gap-6 md:grid-cols-2"
    : "grid gap-5 sm:grid-cols-2 xl:grid-cols-4";
  const eyebrowText = olderAdultText ? "text-base" : "text-sm";
  const helperText = olderAdultText ? "text-base leading-7" : "text-sm";
  const bodyText = olderAdultText ? "text-lg leading-8" : "text-base leading-7";
  const heroTitle = olderAdultText
    ? "text-4xl sm:text-5xl"
    : "text-3xl sm:text-4xl";
  const sectionTitle = olderAdultText ? "text-3xl" : "text-2xl";
  const cardTitle = olderAdultText ? "text-2xl" : "text-xl";
  const cardBody = olderAdultText ? "text-base leading-7" : "text-sm leading-6";
  const buttonText = olderAdultText ? "text-base" : "text-sm";

  return (
    <div className={pageSpacing}>
      <section className="flex flex-col gap-4 rounded-3xl border border-teal-100 bg-white p-4 shadow-xl shadow-teal-900/5 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <p className={`${eyebrowText} font-black uppercase tracking-[0.2em] text-teal-700`}>
            Dashboard controls
          </p>
          <p className={`mt-1 font-semibold text-slate-500 ${helperText}`}>
            Adjust the dashboard view for clearer reading and simpler scanning.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex min-h-11 items-center justify-between gap-3 rounded-2xl border border-teal-100 bg-teal-50/70 px-3">
            <span className={`${buttonText} font-black text-[#0d4050]`}>
              Simple Mode
            </span>
            <button
              type="button"
              onClick={() => setSimpleMode((enabled) => !enabled)}
              aria-pressed={simpleMode}
              className={`relative h-8 w-14 rounded-full transition focus:outline-none focus:ring-4 focus:ring-teal-100 ${
                simpleMode ? "bg-[#08aa9c]" : "bg-slate-300"
              }`}
            >
              <span
                className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-sm transition ${
                  simpleMode ? "left-7" : "left-1"
                }`}
              />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setOlderAdultText((enabled) => !enabled)}
            aria-pressed={olderAdultText}
            className={`min-h-11 rounded-2xl border px-4 font-black shadow-sm transition focus:outline-none focus:ring-4 focus:ring-teal-100 ${buttonText} ${
              olderAdultText
                ? "border-[#08aa9c] bg-[#08aa9c] text-white shadow-md shadow-teal-700/20"
                : "border-teal-100 bg-white text-slate-600 hover:bg-teal-50 hover:text-teal-700"
            }`}
          >
            A+ Older Adult Text
          </button>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.5fr_0.85fr]">
        <div className="rounded-3xl border border-teal-100 bg-white p-6 shadow-xl shadow-teal-900/5 sm:p-8">
          <p className={`${eyebrowText} font-black uppercase tracking-[0.2em] text-teal-700`}>
            Health tools
          </p>
          <h2 className={`mt-3 font-black tracking-tight text-[#0d4050] ${heroTitle}`}>
            Your Mediora care hub
          </h2>
          <p className={`mt-3 max-w-2xl font-medium text-slate-600 ${bodyText}`}>
            Search symptoms, find care, and access guidance from one secure dashboard.
          </p>

          <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-teal-100 bg-[#f7fbfa] p-3 sm:flex-row">
            <input
              type="search"
              placeholder="What is bothering you today?"
              className={`min-h-12 min-w-0 flex-1 rounded-xl border border-transparent bg-white px-4 font-medium text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:ring-4 focus:ring-teal-100 ${olderAdultText ? "text-lg" : "text-base"}`}
            />
            <Link
              href="/dashboard/symptom-checker"
              className={`inline-flex min-h-12 items-center justify-center rounded-xl bg-[#08aa9c] px-5 font-black text-white shadow-lg shadow-teal-700/20 transition hover:bg-[#07998c] active:scale-[0.98] sm:w-auto ${buttonText}`}
            >
              Start Symptom Check
            </Link>
          </div>
        </div>

        <aside className="rounded-3xl border border-teal-100 bg-white p-6 shadow-xl shadow-teal-900/5 sm:p-8">
          <p className={`${eyebrowText} font-black uppercase tracking-[0.2em] text-teal-700`}>
            New here?
          </p>
          <h3 className={`mt-3 font-black text-[#0d4050] ${sectionTitle}`}>
            Complete your profile to personalize care suggestions.
          </h3>
          <div className="mt-6">
            <div className={`flex items-center justify-between gap-3 font-black text-slate-700 ${buttonText}`}>
              <span>Profile setup</span>
              <span>60%</span>
            </div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-teal-50">
              <div className="h-full w-[60%] rounded-full bg-[#08aa9c]" />
            </div>
          </div>
          <Link
            href="/dashboard/profile"
            className={`mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-teal-200 bg-white px-5 font-black text-teal-700 shadow-sm transition hover:bg-teal-50 active:scale-[0.98] ${buttonText}`}
          >
            Continue Setup
          </Link>
        </aside>
      </section>

      <section className={gridClass}>
        {featureCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className={`group rounded-3xl border border-teal-100 bg-white ${cardPadding} shadow-lg shadow-teal-900/5 transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-teal-300 hover:shadow-2xl hover:shadow-teal-900/10 active:scale-[0.98]`}
          >
            <div className="flex items-start justify-between gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-teal-50 transition group-hover:bg-[#08aa9c]">
                <Image
                  src={card.icon}
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-8 animate-pulse object-contain transition group-hover:invert"
                />
              </span>
              <span className={`rounded-full bg-teal-50 px-3 py-1 font-black text-teal-700 ${olderAdultText ? "text-sm" : "text-xs"}`}>
                {card.hint}
              </span>
            </div>

            <h3 className={`mt-5 font-black text-slate-950 ${cardTitle}`}>
              {card.title}
            </h3>
            <p className={`mt-3 font-medium text-slate-600 ${cardBody}`}>
              {card.description}
            </p>

            {card.progress && (
              <div className="mt-5">
                <div className={`flex items-center justify-between font-black text-slate-600 ${olderAdultText ? "text-sm" : "text-xs"}`}>
                  <span>Check-in progress</span>
                  <span>{card.progress}%</span>
                </div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-teal-50">
                  <div className="h-full w-[40%] rounded-full bg-[#08aa9c]" />
                </div>
              </div>
            )}

            <span className={`mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#08aa9c] px-4 font-black text-white shadow-lg shadow-teal-700/20 transition group-hover:bg-[#07998c] ${buttonText}`}>
              {card.cta}
            </span>
          </Link>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_1.25fr]">
        <div className="rounded-3xl border border-teal-100 bg-white p-6 shadow-xl shadow-teal-900/5 sm:p-8">
          <h2 className={`font-black tracking-tight text-[#0d4050] ${sectionTitle}`}>
            Recent Activity
          </h2>
          <div className="mt-5 space-y-3">
            {activityItems.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-100 bg-[#fbfdfd] p-4 transition hover:border-teal-200 hover:shadow-lg hover:shadow-teal-900/5"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className={`font-black text-slate-900 ${olderAdultText ? "text-lg" : ""}`}>
                    {item.title}
                  </h3>
                  <span className={`shrink-0 font-black text-teal-700 ${olderAdultText ? "text-sm" : "text-xs"}`}>
                    {item.time}
                  </span>
                </div>
                <p className={`mt-2 font-medium text-slate-600 ${cardBody}`}>
                  {item.description}
                </p>
              </div>
            ))}

            <div className="rounded-2xl border border-dashed border-teal-200 bg-teal-50/50 p-4">
              <div className="h-3 w-28 animate-pulse rounded-full bg-teal-100" />
              <div className="mt-3 h-3 w-full animate-pulse rounded-full bg-teal-100" />
              <div className="mt-2 h-3 w-2/3 animate-pulse rounded-full bg-teal-100" />
              <p className={`mt-4 font-black text-teal-800 ${buttonText}`}>
                Backend connections will appear here soon.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-teal-100 bg-white p-6 shadow-xl shadow-teal-900/5 sm:p-8">
          <h2 className={`font-black tracking-tight text-[#0d4050] ${sectionTitle}`}>
            Health Tips
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {healthTips.map((tip, index) => (
              <article
                key={tip}
                className="rounded-2xl border border-teal-100 bg-[#fbfdfd] p-5 shadow-sm transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl hover:shadow-teal-900/10"
              >
                <span className={`grid h-10 w-10 place-items-center rounded-xl bg-teal-50 font-black text-teal-700 ${buttonText}`}>
                  {index + 1}
                </span>
                <h3 className={`mt-4 font-black text-slate-950 ${olderAdultText ? "text-xl leading-7" : "leading-6"}`}>
                  {tip}
                </h3>
                <p className={`mt-3 font-medium text-slate-600 ${cardBody}`}>
                  Small habits can make care decisions easier and more confident.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
