"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
  {
    label: "Symptom Checker",
    href: "/dashboard/symptom-checker",
    iconImage: "/images/symptom_checker.png",
  },
  {
    label: "Find Doctors",
    href: "/dashboard/doctors",
    iconImage: "/images/stethoscope.png",
  },
  {
    label: "Find Pharmacies",
    href: "/dashboard/pharmacies",
    iconImage: "/images/pharmacy.png",
  },
  {
    label: "Emergency Guidance",
    href: "/dashboard/emergency",
    iconImage: "/images/alert.png",
  },
  { label: "Profile", href: "/dashboard/profile", icon: "profile" },
];

const pageTitles = {
  "/dashboard": "Dashboard",
  "/dashboard/symptom-checker": "Symptom Checker",
  "/dashboard/doctors": "Find Doctors",
  "/dashboard/pharmacies": "Find Pharmacies",
  "/dashboard/emergency": "Emergency Guidance",
  "/dashboard/profile": "Profile",
  "/dashboard/settings": "Settings",
};

export function DashboardIcon({ name, className = "h-5 w-5" }) {
  const sharedProps = {
    "aria-hidden": "true",
    viewBox: "0 0 24 24",
    className,
    fill: "none",
  };

  if (name === "symptom") {
    return (
      <svg {...sharedProps}>
        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 21a8.5 8.5 0 0 0 7-13.3L12 3 5 7.7A8.5 8.5 0 0 0 12 21Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "doctor") {
    return (
      <svg {...sharedProps}>
        <circle cx="12" cy="7.5" r="3.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M18 12.5v2.7a3 3 0 0 1-6 0V14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "pharmacy") {
    return (
      <svg {...sharedProps}>
        <rect x="4" y="6" width="16" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 6V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V6M12 10v6M9 13h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "emergency") {
    return (
      <svg {...sharedProps}>
        <path d="M12 3 21 19H3L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M12 8.5v5M12 16.8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "profile") {
    return (
      <svg {...sharedProps}>
        <circle cx="12" cy="8" r="3.3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5.5 20a6.5 6.5 0 0 1 13 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "logout") {
    return (
      <svg {...sharedProps}>
        <path d="M10 6H6.5A2.5 2.5 0 0 0 4 8.5v7A2.5 2.5 0 0 0 6.5 18H10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M14 8l4 4-4 4M8 12h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "settings") {
    return (
      <svg {...sharedProps}>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 3.5v2M12 18.5v2M4.6 7.8l1.7 1M17.7 15.2l1.7 1M4.6 16.2l1.7-1M17.7 8.8l1.7-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg {...sharedProps}>
      <rect x="4" y="4" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="13" y="4" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="4" y="13" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="13" y="13" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function NavLink({ item, active, onClick }) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition ${
        active
          ? "bg-[#08aa9c] text-white shadow-lg shadow-teal-700/20"
          : "text-slate-600 hover:bg-teal-50 hover:text-teal-700"
      }`}
    >
      {item.iconImage ? (
        <Image
          src={item.iconImage}
          alt=""
          width={20}
          height={20}
          className={`h-5 w-5 object-contain ${active ? "invert" : ""}`}
        />
      ) : (
        <DashboardIcon name={item.icon} />
      )}
      <span>{item.label}</span>
    </Link>
  );
}

export default function DashboardShell({ children }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const title = pageTitles[pathname] || "Dashboard";

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7fbfa] text-slate-950">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-teal-100 bg-white px-5 py-6 shadow-xl shadow-teal-900/5 lg:block">
        <Link href="/" className="mx-auto flex w-fit items-center justify-center pb-2">
          <Image
            src="/images/mediora_textlogo.png"
            alt="Mediora"
            width={150}
            height={106}
            priority
            className="h-auto w-36 max-w-full"
          />
        </Link>

        <nav className="mt-8 space-y-2">
          {navigation.map((item) => (
            <NavLink key={item.href} item={item} active={pathname === item.href} />
          ))}
        </nav>

        <div className="absolute bottom-6 left-1/2 w-[210px] -translate-x-1/2">
          <Link
            href="/login"
            className="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-500 transition hover:bg-rose-50 hover:text-rose-700"
          >
            <Image
              src="/images/logout.png"
              alt=""
              width={20}
              height={20}
              className="h-5 w-5 object-contain"
            />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-teal-100 bg-white/95 backdrop-blur">
          <div className="flex min-h-20 items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div className="min-w-0">
              <p className="text-sm font-bold text-teal-700">Welcome back, Mediora user</p>
              <h1 className="truncate text-2xl font-black tracking-tight text-[#0d4050] sm:text-3xl">
                {title}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-bold text-slate-900">Patient Account</p>
                <p className="text-xs font-semibold text-slate-500">Personal dashboard</p>
              </div>
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-teal-100 text-sm font-black text-teal-800 ring-4 ring-white">
                MU
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="grid h-11 w-11 place-items-center rounded-xl border border-teal-100 bg-white text-teal-800 shadow-sm transition hover:bg-teal-50 lg:hidden"
                aria-label="Toggle dashboard menu"
                aria-expanded={menuOpen}
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
                  <path d="M5 7h14M5 12h14M5 17h14" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          {menuOpen && (
            <nav className="border-t border-teal-100 bg-white px-4 py-3 shadow-lg shadow-teal-900/5 sm:px-6 lg:hidden">
              <div className="grid gap-2 sm:grid-cols-2">
                {navigation.map((item) => (
                  <NavLink
                    key={item.href}
                    item={item}
                    active={pathname === item.href}
                    onClick={() => setMenuOpen(false)}
                  />
                ))}
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-500 transition hover:bg-rose-50 hover:text-rose-700"
                >
                  <Image
                    src="/images/logout.png"
                    alt=""
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                  />
                  <span>Logout</span>
                </Link>
              </div>
            </nav>
          )}
        </header>

        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
