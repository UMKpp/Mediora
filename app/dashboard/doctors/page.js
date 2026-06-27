"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const specializations = [
  "All Specializations",
  "General Physician",
  "Cardiology",
  "Dermatology",
  "Pediatrics",
  "Neurology",
  "Orthopedics",
  "Gynecology",
];

const cities = ["Colombo", "Kandy", "Galle", "Jaffna", "Negombo", "Kurunegala"];

const quickFilters = [
  "Available Today",
  "Nearby",
  "Top Rated",
  "Online Consultation",
];

const doctors = [
  {
    name: "Dr. Nimal Perera",
    initials: "NP",
    specialization: "Cardiology",
    hospital: "Colombo National Hospital",
    city: "Colombo",
    experience: "12 years experience",
    rating: "4.8",
    availability: "Available Today",
    qualifications: "MBBS, MD Cardiology",
    contact: "+94 77 123 4567",
    hours: "Mon - Fri, 9:00 AM - 4:00 PM",
    languages: "Sinhala, English",
    online: true,
    nearby: true,
  },
  {
    name: "Dr. Anjali Fernando",
    initials: "AF",
    specialization: "Pediatrics",
    hospital: "Lady Ridgeway Children Hospital",
    city: "Colombo",
    experience: "9 years experience",
    rating: "4.9",
    availability: "Available Today",
    qualifications: "MBBS, MD Pediatrics",
    contact: "+94 76 225 8841",
    hours: "Tue - Sat, 8:30 AM - 2:30 PM",
    languages: "Sinhala, Tamil, English",
    online: true,
    nearby: false,
  },
  {
    name: "Dr. Suresh Rajan",
    initials: "SR",
    specialization: "Neurology",
    hospital: "Kandy Teaching Hospital",
    city: "Kandy",
    experience: "15 years experience",
    rating: "4.7",
    availability: "Next Available Tomorrow",
    qualifications: "MBBS, MD Neurology",
    contact: "+94 71 420 9932",
    hours: "Mon - Thu, 10:00 AM - 3:00 PM",
    languages: "Tamil, English",
    online: false,
    nearby: true,
  },
  {
    name: "Dr. Kavindi Silva",
    initials: "KS",
    specialization: "Dermatology",
    hospital: "Galle Skin Care Clinic",
    city: "Galle",
    experience: "8 years experience",
    rating: "4.6",
    availability: "Available Today",
    qualifications: "MBBS, Diploma in Dermatology",
    contact: "+94 75 610 2114",
    hours: "Wed - Sun, 11:00 AM - 5:00 PM",
    languages: "Sinhala, English",
    online: true,
    nearby: false,
  },
  {
    name: "Dr. Harith Wijesinghe",
    initials: "HW",
    specialization: "Orthopedics",
    hospital: "Negombo General Hospital",
    city: "Negombo",
    experience: "11 years experience",
    rating: "4.5",
    availability: "Available This Week",
    qualifications: "MBBS, MS Orthopedics",
    contact: "+94 70 908 4512",
    hours: "Mon - Fri, 1:00 PM - 6:00 PM",
    languages: "Sinhala, English",
    online: false,
    nearby: true,
  },
  {
    name: "Dr. Fathima Ameen",
    initials: "FA",
    specialization: "Gynecology",
    hospital: "Kurunegala Women Health Centre",
    city: "Kurunegala",
    experience: "10 years experience",
    rating: "4.8",
    availability: "Available Today",
    qualifications: "MBBS, MD Obstetrics and Gynecology",
    contact: "+94 72 332 1870",
    hours: "Tue - Sat, 9:30 AM - 4:30 PM",
    languages: "Tamil, Sinhala, English",
    online: true,
    nearby: false,
  },
  {
    name: "Dr. Lasith Gunasekara",
    initials: "LG",
    specialization: "General Physician",
    hospital: "Jaffna Family Medical Centre",
    city: "Jaffna",
    experience: "7 years experience",
    rating: "4.4",
    availability: "Available Today",
    qualifications: "MBBS, Diploma in Family Medicine",
    contact: "+94 78 654 2301",
    hours: "Daily, 8:00 AM - 12:00 PM",
    languages: "Tamil, English",
    online: true,
    nearby: true,
  },
];

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

function DoctorIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <circle cx="12" cy="7.5" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18 12.5v2.7a3 3 0 0 1-6 0V14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
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

function ProfileAvatar({ doctor, size = "large" }) {
  const sizeClass = size === "large" ? "h-16 w-16 text-lg" : "h-24 w-24 text-2xl";

  return (
    <div
      className={`${sizeClass} grid shrink-0 place-items-center rounded-3xl bg-gradient-to-br from-teal-100 to-emerald-50 font-black text-teal-800 ring-1 ring-teal-100`}
    >
      {doctor.initials}
    </div>
  );
}

export default function DoctorsPage() {
  const [doctorSearch, setDoctorSearch] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("All Specializations");
  const [selectedCity, setSelectedCity] = useState("Colombo");
  const [activeFilters, setActiveFilters] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const filteredDoctors = useMemo(() => {
    const query = doctorSearch.trim().toLowerCase();

    return doctors.filter((doctor) => {
      const matchesSearch =
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialization.toLowerCase().includes(query) ||
        doctor.city.toLowerCase().includes(query);
      const matchesSpecialization =
        selectedSpecialization === "All Specializations" ||
        doctor.specialization === selectedSpecialization;
      const matchesCity = doctor.city === selectedCity;
      const matchesQuickFilters = activeFilters.every((filter) => {
        if (filter === "Available Today") {
          return doctor.availability === "Available Today";
        }

        if (filter === "Nearby") {
          return doctor.nearby;
        }

        if (filter === "Top Rated") {
          return Number(doctor.rating) >= 4.8;
        }

        if (filter === "Online Consultation") {
          return doctor.online;
        }

        return true;
      });

      return matchesSearch && matchesSpecialization && matchesCity && matchesQuickFilters;
    });
  }, [activeFilters, doctorSearch, selectedCity, selectedSpecialization]);

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
              Mediora Care Network
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-[#0d4050] sm:text-4xl">
              Doctor Locator
            </h1>
            <p className="mt-4 text-base font-medium leading-7 text-slate-600">
              Find trusted healthcare professionals near you.
            </p>
          </div>
          <span className="grid h-16 w-16 place-items-center rounded-3xl bg-teal-50 text-teal-700">
            <DoctorIcon />
          </span>
        </div>
      </section>

      <section className="rounded-3xl border border-teal-100 bg-white p-6 shadow-xl shadow-teal-900/5 sm:p-8">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.95fr_0.8fr_auto] lg:items-end">
          <label className="block">
            <span className="text-sm font-black text-slate-900">Search doctor</span>
            <input
              type="search"
              value={doctorSearch}
              onChange={(event) => setDoctorSearch(event.target.value)}
              placeholder="Search doctor name..."
              className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base font-medium text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
            />
          </label>

          <label className="block">
            <span className="text-sm font-black text-slate-900">Specialization</span>
            <select
              value={selectedSpecialization}
              onChange={(event) => setSelectedSpecialization(event.target.value)}
              className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base font-bold text-slate-700 shadow-sm outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
            >
              {specializations.map((specialization) => (
                <option key={specialization}>{specialization}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-black text-slate-900">City</span>
            <select
              value={selectedCity}
              onChange={(event) => setSelectedCity(event.target.value)}
              className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base font-bold text-slate-700 shadow-sm outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
            >
              {cities.map((city) => (
                <option key={city}>{city}</option>
              ))}
            </select>
          </label>

          <button
            type="button"
            className="min-h-12 rounded-xl bg-[#08aa9c] px-6 text-sm font-black text-white shadow-lg shadow-teal-700/20 transition hover:bg-[#07998c] active:scale-[0.98]"
          >
            Find Doctors
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
      </section>

      <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
        <section>
          {filteredDoctors.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
              {filteredDoctors.map((doctor) => (
                <article
                  key={doctor.name}
                  className="rounded-3xl border border-teal-100 bg-white p-5 shadow-lg shadow-teal-900/5 transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-2xl hover:shadow-teal-900/10"
                >
                  <div className="flex items-start gap-4">
                    <ProfileAvatar doctor={doctor} />
                    <div className="min-w-0">
                      <h2 className="text-xl font-black text-[#0d4050]">
                        {doctor.name}
                      </h2>
                      <p className="mt-1 text-sm font-black text-teal-700">
                        {doctor.specialization}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-sm font-semibold text-slate-600">
                    <p className="flex items-start gap-2">
                      <span className="mt-0.5 text-teal-700"><PinIcon /></span>
                      <span>{doctor.hospital}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-teal-700"><PinIcon /></span>
                      <span>{doctor.city}</span>
                    </p>
                    <p>{doctor.experience}</p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-black text-teal-700">
                      {doctor.availability}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-700">
                      <StarIcon />
                      Rating: {doctor.rating}
                    </span>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setSelectedDoctor(doctor)}
                      className="min-h-11 rounded-xl bg-[#08aa9c] px-4 text-sm font-black text-white shadow-lg shadow-teal-700/20 transition hover:bg-[#07998c] active:scale-[0.98]"
                    >
                      View Profile
                    </button>
                    <a
                      href={`tel:${doctor.contact.replaceAll(" ", "")}`}
                      className="inline-flex min-h-11 items-center justify-center rounded-xl border border-teal-200 bg-white px-4 text-sm font-black text-teal-700 shadow-sm transition hover:bg-teal-50 active:scale-[0.98]"
                    >
                      Contact
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-teal-200 bg-white p-8 text-center shadow-xl shadow-teal-900/5">
              <h2 className="text-2xl font-black text-[#0d4050]">
                No doctors found.
              </h2>
              <p className="mt-3 text-base font-semibold text-slate-600">
                Try changing your search filters.
              </p>
            </div>
          )}
        </section>

        <aside className="h-fit rounded-3xl border border-teal-100 bg-white p-6 shadow-xl shadow-teal-900/5">
          <h2 className="text-2xl font-black text-[#0d4050]">Need urgent help?</h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
            If symptoms feel severe or urgent, use emergency guidance right away.
          </p>
          <div className="mt-5 space-y-3">
            <Link
              href="/dashboard/emergency"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#08aa9c] px-5 text-sm font-black text-white shadow-lg shadow-teal-700/20 transition hover:bg-[#07998c] active:scale-[0.98]"
            >
              Emergency Guidance
            </Link>
            <a
              href="tel:1990"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-rose-200 bg-rose-50 px-5 text-sm font-black text-rose-700 shadow-sm transition hover:bg-rose-100 active:scale-[0.98]"
            >
              Call Ambulance
            </a>
          </div>
        </aside>
      </div>

      {selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-4 backdrop-blur-sm sm:items-center">
          <section className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl shadow-slate-950/20 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <ProfileAvatar doctor={selectedDoctor} size="modal" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-700">
                  Doctor Profile
                </p>
                <h2 className="mt-2 text-3xl font-black text-[#0d4050]">
                  {selectedDoctor.name}
                </h2>
                <p className="mt-2 text-base font-black text-teal-700">
                  {selectedDoctor.specialization}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDoctor(null)}
                className="min-h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-600 transition hover:bg-slate-50"
              >
                Close
              </button>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {[
                ["Qualifications", selectedDoctor.qualifications],
                ["Experience", selectedDoctor.experience],
                ["Hospital", selectedDoctor.hospital],
                ["Contact number", selectedDoctor.contact],
                ["Consultation hours", selectedDoctor.hours],
                ["Languages spoken", selectedDoctor.languages],
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
                href={`tel:${selectedDoctor.contact.replaceAll(" ", "")}`}
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#08aa9c] px-5 text-sm font-black text-white shadow-lg shadow-teal-700/20 transition hover:bg-[#07998c] active:scale-[0.98]"
              >
                Contact Doctor
              </a>
              <Link
                href="/dashboard/pharmacies"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-teal-200 bg-white px-5 text-sm font-black text-teal-700 shadow-sm transition hover:bg-teal-50 active:scale-[0.98]"
              >
                Find Nearby Pharmacy
              </Link>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
