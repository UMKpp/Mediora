"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "../ThemeControls";

const navigation = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Users", href: "/admin/users" },
  { label: "Doctors", href: "/admin/doctors" },
  { label: "Pharmacies", href: "/admin/pharmacies" },
  { label: "Emergency Services", href: "/admin/emergency" },
  { label: "Analytics", href: "/admin/analytics" },
  { label: "Settings", href: "/admin/settings" },
];

const pageTitles = {
  "/admin/dashboard": "Admin Dashboard",
  "/admin/users": "User Management",
  "/admin/doctors": "Doctor Management",
  "/admin/pharmacies": "Pharmacy Management",
  "/admin/emergency": "Emergency Services",
  "/admin/analytics": "Analytics",
  "/admin/settings": "Admin Settings",
};

function MenuIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <path
        d="M5 7h14M5 12h14M5 17h14"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
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

function NavLink({ item, active, onClick }) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`flex min-h-11 items-center rounded-xl px-4 py-2.5 text-sm font-black transition ${
        active
          ? "bg-[#08aa9c] text-white shadow-lg shadow-teal-700/20"
          : "text-slate-600 hover:bg-teal-50 hover:text-teal-700"
      }`}
    >
      {item.label}
    </Link>
  );
}

function Sidebar({ pathname, onNavigate, onLogout }) {
  return (
    <div className="flex h-full flex-col">
      <Link href="/" className="mx-auto flex w-fit items-center justify-center">
        <Image
          src="/images/mediora_textlogo.png"
          alt="Mediora"
          width={150}
          height={106}
          priority
          className="h-auto w-36 max-w-full"
        />
      </Link>

      <div className="mt-6 rounded-2xl border border-teal-100 bg-teal-50/70 p-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-700">
          Admin Portal
        </p>
        <p className="mt-2 text-sm font-bold leading-6 text-slate-700">
          Manage Mediora platform data and frontend content.
        </p>
      </div>

      <nav className="mt-6 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            active={pathname === item.href}
            onClick={onNavigate}
          />
        ))}
      </nav>

      <button
        type="button"
        onClick={onLogout}
        className="mt-auto flex min-h-11 items-center rounded-xl px-4 py-2.5 text-left text-sm font-black text-red-700 transition hover:bg-red-50"
      >
        Logout
      </button>
    </div>
  );
}

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const title = pageTitles[pathname] || "Admin";

  function handleLogout() {
    window.localStorage.removeItem("medioraAdminAuthenticated");
    setDrawerOpen(false);
    router.replace("/admin");
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7fbfa] text-slate-950">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-teal-100 bg-white px-5 py-6 shadow-xl shadow-teal-900/5 lg:block">
        <Sidebar pathname={pathname} onLogout={handleLogout} />
      </aside>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close admin menu"
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="relative h-full w-[min(20rem,88vw)] overflow-y-auto border-r border-teal-100 bg-white px-5 py-6 shadow-2xl shadow-slate-950/20">
            <div className="mb-4 flex justify-end">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-xl border border-teal-100 bg-white text-teal-700 shadow-sm transition hover:bg-teal-50"
                aria-label="Close admin menu"
              >
                <CloseIcon />
              </button>
            </div>
            <Sidebar
              pathname={pathname}
              onNavigate={() => setDrawerOpen(false)}
              onLogout={handleLogout}
            />
          </aside>
        </div>
      )}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-teal-100 bg-white/95 backdrop-blur">
          <div className="flex min-h-20 items-center justify-between gap-3 px-3 py-4 sm:px-6 lg:px-8">
            <div className="min-w-0">
              <p className="truncate text-xs font-black uppercase tracking-[0.18em] text-teal-700 sm:text-sm">
                Mediora Administration
              </p>
              <h1 className="truncate text-2xl font-black tracking-tight text-[#0d4050] sm:text-3xl">
                {title}
              </h1>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <ThemeToggle compact />
              <div className="hidden text-right sm:block">
                <p className="text-sm font-black text-slate-900">Admin User</p>
                <p className="text-xs font-semibold text-slate-500">Platform manager</p>
              </div>
              <div className="hidden h-11 w-11 place-items-center rounded-full bg-teal-100 text-sm font-black text-teal-800 ring-4 ring-white min-[380px]:grid">
                AD
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="grid h-11 w-11 place-items-center rounded-xl border border-teal-100 bg-white text-teal-800 shadow-sm transition hover:bg-teal-50 lg:hidden"
                aria-label="Open admin menu"
              >
                <MenuIcon />
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
