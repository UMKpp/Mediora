"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  districts,
  districtsByProvince,
  pharmacies,
  provinces,
} from "../../../data/pharmacies";

const quickFilters = ["Open Now", "24 Hours", "Home Delivery"];

function ArrowLeftIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none">
      <path
        d="M19 12H5m6-6-6 6 6 6"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none">
      <path
        d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none">
      <path
        d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StatusBadge({ children, tone = "teal" }) {
  const toneClass =
    tone === "amber"
      ? "bg-amber-50 text-amber-700"
      : tone === "emerald"
        ? "bg-emerald-50 text-emerald-700"
        : "bg-teal-50 text-teal-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-black ${toneClass}`}>
      {children}
    </span>
  );
}

export default function PharmaciesPage() {
  const [selectedProvince, setSelectedProvince] = useState("All Provinces");
  const [selectedDistrict, setSelectedDistrict] = useState("All Districts");
  const [pharmacySearch, setPharmacySearch] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);

  const districtOptions = useMemo(() => {
    if (selectedProvince === "All Provinces") {
      return ["All Districts", ...districts];
    }

    return ["All Districts", ...districtsByProvince[selectedProvince]];
  }, [selectedProvince]);

  const filteredPharmacies = useMemo(() => {
    const query = pharmacySearch.trim().toLowerCase();

    return pharmacies.filter((pharmacy) => {
      const matchesProvince =
        selectedProvince === "All Provinces" || pharmacy.province === selectedProvince;
      const matchesDistrict =
        selectedDistrict === "All Districts" || pharmacy.district === selectedDistrict;
      const matchesSearch =
        query.length === 0 ||
        pharmacy.name.toLowerCase().includes(query) ||
        pharmacy.city.toLowerCase().includes(query) ||
        pharmacy.address.toLowerCase().includes(query);
      const matchesQuickFilters = activeFilters.every((filter) => {
        if (filter === "Open Now") {
          return pharmacy.isOpenNow;
        }

        if (filter === "24 Hours") {
          return pharmacy.is24Hours;
        }

        if (filter === "Home Delivery") {
          return pharmacy.homeDelivery;
        }

        return true;
      });

      return matchesProvince && matchesDistrict && matchesSearch && matchesQuickFilters;
    });
  }, [activeFilters, pharmacySearch, selectedDistrict, selectedProvince]);

  function handleProvinceChange(province) {
    setSelectedProvince(province);
    setSelectedDistrict("All Districts");
  }

  function toggleQuickFilter(filter) {
    setActiveFilters((currentFilters) =>
      currentFilters.includes(filter)
        ? currentFilters.filter((item) => item !== filter)
        : [...currentFilters, filter]
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-teal-100 bg-white p-6 shadow-xl shadow-teal-900/5 sm:p-8">
        <Link
          href="/dashboard"
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-teal-100 bg-white px-4 text-sm font-black text-teal-700 shadow-sm transition hover:bg-teal-50 active:scale-[0.98]"
        >
          <ArrowLeftIcon />
          Back to Dashboard
        </Link>

        <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-700">
              Mediora Medicine Access
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-[#0d4050] sm:text-4xl">
              Pharmacy Locator
            </h1>
            <p className="mt-4 text-base font-medium leading-7 text-slate-600">
              Find nearby pharmacies quickly and easily.
            </p>
          </div>
          <span className="grid h-16 w-16 place-items-center rounded-3xl bg-teal-50">
            <Image
              src="/images/pharmacy.png"
              alt=""
              width={34}
              height={34}
              className="h-8 w-8 object-contain"
            />
          </span>
        </div>
      </section>

      <section className="rounded-3xl border border-teal-100 bg-white p-6 shadow-xl shadow-teal-900/5 sm:p-8">
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-[0.95fr_0.9fr_1.2fr_auto] xl:items-end">
          <label className="block">
            <span className="text-sm font-black text-slate-900">Province</span>
            <select
              value={selectedProvince}
              onChange={(event) => handleProvinceChange(event.target.value)}
              className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base font-bold text-slate-700 shadow-sm outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
            >
              {provinces.map((province) => (
                <option key={province}>{province}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-black text-slate-900">District</span>
            <select
              value={selectedDistrict}
              onChange={(event) => setSelectedDistrict(event.target.value)}
              className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base font-bold text-slate-700 shadow-sm outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
            >
              {districtOptions.map((district) => (
                <option key={district}>{district}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-black text-slate-900">Pharmacy name</span>
            <input
              type="search"
              value={pharmacySearch}
              onChange={(event) => setPharmacySearch(event.target.value)}
              placeholder="Search pharmacy name..."
              className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base font-medium text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
            />
          </label>

          <button
            type="button"
            className="min-h-12 rounded-xl bg-[#08aa9c] px-6 text-sm font-black text-white shadow-lg shadow-teal-700/20 transition hover:bg-[#07998c] active:scale-[0.98]"
          >
            Find Pharmacies
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {quickFilters.map((filter) => {
            const isActive = activeFilters.includes(filter);

            return (
              <button
                key={filter}
                type="button"
                onClick={() => toggleQuickFilter(filter)}
                className={`min-h-11 rounded-xl border px-4 text-sm font-black transition focus:outline-none focus:ring-4 focus:ring-teal-100 ${
                  isActive
                    ? "border-[#08aa9c] bg-[#08aa9c] text-white shadow-md shadow-teal-700/20"
                    : "border-teal-100 bg-white text-slate-600 hover:bg-teal-50 hover:text-teal-700"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-sm font-bold text-slate-500">
          Showing {filteredPharmacies.length} mock pharmacies across Sri Lanka.
        </p>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
        <section>
          {filteredPharmacies.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
              {filteredPharmacies.map((pharmacy) => (
                <article
                  key={pharmacy.id}
                  className="rounded-3xl border border-teal-100 bg-white p-5 shadow-lg shadow-teal-900/5 transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-2xl hover:shadow-teal-900/10"
                >
                  <div className="flex items-start gap-4">
                    <span className="grid h-16 w-16 shrink-0 place-items-center rounded-3xl bg-teal-50">
                      <Image
                        src={pharmacy.image}
                        alt=""
                        width={34}
                        height={34}
                        className="h-8 w-8 object-contain"
                      />
                    </span>
                    <div className="min-w-0">
                      <h2 className="text-xl font-black text-[#0d4050]">
                        {pharmacy.name}
                      </h2>
                      <p className="mt-1 flex items-center gap-2 text-sm font-black text-teal-700">
                        <PinIcon />
                        {pharmacy.district}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-sm font-semibold text-slate-600">
                    <p>{pharmacy.address}</p>
                    <p>{pharmacy.openingHours}</p>
                    <p className="inline-flex items-center gap-1 font-black text-amber-700">
                      <StarIcon />
                      Rating: {pharmacy.rating}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {pharmacy.isOpenNow && <StatusBadge>Open Now</StatusBadge>}
                    {pharmacy.is24Hours && <StatusBadge tone="emerald">24 Hours</StatusBadge>}
                    {pharmacy.homeDelivery && <StatusBadge tone="amber">Home Delivery</StatusBadge>}
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setSelectedPharmacy(pharmacy)}
                      className="min-h-11 rounded-xl bg-[#08aa9c] px-4 text-sm font-black text-white shadow-lg shadow-teal-700/20 transition hover:bg-[#07998c] active:scale-[0.98]"
                    >
                      View Details
                    </button>
                    <a
                      href={`tel:${pharmacy.phone.replaceAll(" ", "")}`}
                      className="inline-flex min-h-11 items-center justify-center rounded-xl border border-teal-200 bg-white px-4 text-sm font-black text-teal-700 shadow-sm transition hover:bg-teal-50 active:scale-[0.98]"
                    >
                      Call Pharmacy
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-teal-200 bg-white p-8 text-center shadow-xl shadow-teal-900/5">
              <h2 className="text-2xl font-black text-[#0d4050]">
                No pharmacies found.
              </h2>
              <p className="mt-3 text-base font-semibold text-slate-600">
                Try changing your search filters.
              </p>
            </div>
          )}
        </section>

        <aside className="h-fit rounded-3xl border border-teal-100 bg-white p-6 shadow-xl shadow-teal-900/5">
          <h2 className="text-2xl font-black text-[#0d4050]">
            Need urgent medication?
          </h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
            If symptoms need medical attention, find a doctor or check emergency
            guidance.
          </p>
          <div className="mt-5 space-y-3">
            <Link
              href="/dashboard/doctors"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#08aa9c] px-5 text-sm font-black text-white shadow-lg shadow-teal-700/20 transition hover:bg-[#07998c] active:scale-[0.98]"
            >
              Find Doctors
            </Link>
            <Link
              href="/dashboard/emergency"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-rose-200 bg-rose-50 px-5 text-sm font-black text-rose-700 shadow-sm transition hover:bg-rose-100 active:scale-[0.98]"
            >
              Emergency Guidance
            </Link>
          </div>
        </aside>
      </div>

      {selectedPharmacy && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-4 backdrop-blur-sm sm:items-center">
          <section className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl shadow-slate-950/20 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <span className="grid h-24 w-24 shrink-0 place-items-center rounded-3xl bg-teal-50">
                <Image
                  src={selectedPharmacy.image}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain"
                />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-700">
                  Pharmacy Details
                </p>
                <h2 className="mt-2 text-3xl font-black text-[#0d4050]">
                  {selectedPharmacy.name}
                </h2>
                <p className="mt-2 text-base font-black text-teal-700">
                  {selectedPharmacy.district}, {selectedPharmacy.province}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPharmacy(null)}
                className="min-h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-600 transition hover:bg-slate-50"
              >
                Close
              </button>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {[
                ["Full address", selectedPharmacy.address],
                ["Contact number", selectedPharmacy.phone],
                ["Opening hours", selectedPharmacy.openingHours],
                ["Home delivery", selectedPharmacy.homeDelivery ? "Available" : "Not available"],
                ["Services available", selectedPharmacy.services.join(", ")],
                ["Rating", selectedPharmacy.rating],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-teal-100 bg-[#fbfdfd] p-4"
                >
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-700">
                    {label}
                  </p>
                  <p className="mt-2 text-sm font-bold leading-6 text-slate-700">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <a
                href={`tel:${selectedPharmacy.phone.replaceAll(" ", "")}`}
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#08aa9c] px-5 text-sm font-black text-white shadow-lg shadow-teal-700/20 transition hover:bg-[#07998c] active:scale-[0.98]"
              >
                Call Pharmacy
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedPharmacy.address)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-teal-200 bg-white px-5 text-sm font-black text-teal-700 shadow-sm transition hover:bg-teal-50 active:scale-[0.98]"
              >
                Get Directions
              </a>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
