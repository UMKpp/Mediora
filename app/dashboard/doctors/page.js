"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const provinceDistricts = {
  "Central Province": ["Kandy", "Matale", "Nuwara Eliya"],
  "Eastern Province": ["Ampara", "Batticaloa", "Trincomalee"],
  "North Central Province": ["Anuradhapura", "Polonnaruwa"],
  "North Western Province": ["Kurunegala", "Puttalam"],
  "Northern Province": ["Jaffna", "Kilinochchi", "Mannar", "Mullaitivu", "Vavuniya"],
  "Sabaragamuwa Province": ["Kegalle", "Ratnapura"],
  "Southern Province": ["Galle", "Hambantota", "Matara"],
  "Uva Province": ["Badulla", "Monaragala"],
  "Western Province": ["Colombo", "Gampaha", "Kalutara"],
};

const majorDistricts = [
  "Colombo",
  "Kandy",
  "Galle",
  "Jaffna",
  "Kurunegala",
  "Anuradhapura",
  "Badulla",
  "Trincomalee",
  "Ratnapura",
];

const commonSymptoms = [
  "fever",
  "cough",
  "headache",
  "fatigue",
  "sore throat",
  "runny nose",
];

const symptomOptions = [
  "All Symptoms",
  "fever",
  "cough",
  "headache",
  "fatigue",
  "sore throat",
  "runny nose",
  "chest pain",
  "skin rash",
  "joint pain",
  "pregnancy care",
  "dizziness",
];

const symptomSpecializationMap = {
  fever: ["General Physician"],
  cough: ["General Physician", "ENT Specialist"],
  "sore throat": ["ENT Specialist"],
  "child fever": ["Pediatrician"],
  "chest pain": ["Cardiologist"],
  "skin rash": ["Dermatologist"],
  headache: ["General Physician", "Neurologist"],
  dizziness: ["General Physician", "Neurologist"],
  "stomach pain": ["General Physician"],
  "joint pain": ["Orthopedic Specialist"],
  "ear pain": ["ENT Specialist"],
};

const baseSpecialists = [
  {
    specialization: "General Physician",
    symptoms: [...commonSymptoms, "dizziness", "stomach pain"],
    qualification: "MBBS, Diploma in Family Medicine",
  },
  {
    specialization: "Pediatrician",
    symptoms: [...commonSymptoms, "child fever", "child cough"],
    qualification: "MBBS, MD Pediatrics",
  },
  {
    specialization: "ENT Specialist",
    symptoms: [...commonSymptoms, "ear pain", "blocked nose"],
    qualification: "MBBS, MS ENT",
  },
];

const extraSpecialists = [
  {
    specialization: "Cardiologist",
    symptoms: ["chest pain", "shortness of breath", "palpitations", "fatigue"],
    qualification: "MBBS, MD Cardiology",
  },
  {
    specialization: "Dermatologist",
    symptoms: ["skin rash", "itching", "acne", "allergy"],
    qualification: "MBBS, Diploma in Dermatology",
  },
  {
    specialization: "Neurologist",
    symptoms: ["headache", "dizziness", "migraine", "numbness"],
    qualification: "MBBS, MD Neurology",
  },
  {
    specialization: "Gynecologist",
    symptoms: ["pregnancy care", "pelvic pain", "fatigue", "women health"],
    qualification: "MBBS, MD Obstetrics and Gynecology",
  },
  {
    specialization: "Orthopedic Specialist",
    symptoms: ["joint pain", "back pain", "body aches", "sports injury"],
    qualification: "MBBS, MS Orthopedics",
  },
];

const doctorNames = [
  "Ayan Perera",
  "Mihiri Silva",
  "Sanjaya Fernando",
  "Nadeesha Jayawardena",
  "Ruwan Samarasinghe",
  "Tharushi Gunawardena",
  "Arun Rajendran",
  "Fathima Ameen",
  "Kavindu Wickrama",
  "Ishara Senanayake",
  "Malith Abeysekara",
  "Yasmin Rahman",
  "Suresh Nadarajah",
  "Dinuka Herath",
  "Anjali Weerasinghe",
  "Harini Dissanayake",
  "Nimal Karunaratne",
  "Lasith Gunasekara",
  "Meera Selvarajah",
  "Chamari Edirisinghe",
  "Pradeep Nanayakkara",
  "Shanika Hettiarachchi",
  "Dinesh Pathirana",
  "Arosha Kularatne",
  "Ravindu Mallawarachchi",
  "Keshini Wijesuriya",
  "Mahesh Ilangasinghe",
  "Sahana Balasooriya",
  "Roshan Thilakarathna",
  "Navodi Ekanayake",
];

const specializations = [
  "All Specializations",
  "General Physician",
  "Pediatrician",
  "ENT Specialist",
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Gynecologist",
  "Orthopedic Specialist",
];

const quickFilters = [
  "Available Today",
  "Nearby",
  "Top Rated",
  "Online Consultation",
];

const provinces = ["All Provinces", ...Object.keys(provinceDistricts)];
const districts = Object.values(provinceDistricts).flat();

function getInitials(name) {
  return name
    .replace("Dr. ", "")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getDoctorName(index) {
  return `Dr. ${doctorNames[index % doctorNames.length]}`;
}

function createDoctor({ province, district, specialist, index, specialistIndex }) {
  const city = district;
  const rating = (4.3 + ((index + specialistIndex) % 7) * 0.1).toFixed(1);
  const availability =
    (index + specialistIndex) % 3 === 0
      ? "Available Today"
      : (index + specialistIndex) % 3 === 1
        ? "Next Available Tomorrow"
        : "Available This Week";
  const name = getDoctorName(index * 8 + specialistIndex);

  return {
    id: `${district.toLowerCase().replaceAll(" ", "-")}-${specialist.specialization.toLowerCase().replaceAll(" ", "-")}`,
    name,
    initials: getInitials(name),
    specialization: specialist.specialization,
    province,
    district,
    city,
    hospital: `${district} Mediora Care Centre`,
    symptoms: specialist.symptoms,
    experience: `${6 + ((index + specialistIndex) % 12)} years experience`,
    rating,
    availability,
    phone: `+94 7${(index + specialistIndex) % 9} ${String(2100000 + index * 1137 + specialistIndex * 271).slice(0, 7)}`,
    consultationHours:
      specialistIndex % 2 === 0
        ? "Mon - Fri, 9:00 AM - 4:00 PM"
        : "Tue - Sat, 10:00 AM - 5:00 PM",
    languages:
      province === "Northern Province" || province === "Eastern Province"
        ? "Tamil, Sinhala, English"
        : "Sinhala, Tamil, English",
    qualifications: specialist.qualification,
    online: (index + specialistIndex) % 2 === 0,
    nearby: (index + specialistIndex) % 3 !== 1,
  };
}

const doctors = Object.entries(provinceDistricts).flatMap(
  ([province, provinceDistrictList], provinceIndex) =>
    provinceDistrictList.flatMap((district, districtIndex) => {
      const districtSpecialists = majorDistricts.includes(district)
        ? [...baseSpecialists, ...extraSpecialists]
        : baseSpecialists;
      const index = provinceIndex * 10 + districtIndex;

      return districtSpecialists.map((specialist, specialistIndex) =>
        createDoctor({ province, district, specialist, index, specialistIndex })
      );
    })
);

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
  const [selectedProvince, setSelectedProvince] = useState("All Provinces");
  const [selectedDistrict, setSelectedDistrict] = useState("All Districts");
  const [selectedSpecialization, setSelectedSpecialization] = useState("All Specializations");
  const [selectedSymptom, setSelectedSymptom] = useState("All Symptoms");
  const [activeFilters, setActiveFilters] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const districtOptions = useMemo(() => {
    if (selectedProvince === "All Provinces") {
      return ["All Districts", ...districts];
    }

    return ["All Districts", ...provinceDistricts[selectedProvince]];
  }, [selectedProvince]);
  const activeSymptom = selectedSymptom === "All Symptoms" ? "" : selectedSymptom;

  const filteredDoctors = useMemo(() => {
    const symptomQuery = activeSymptom;
    const mappedSpecializations = symptomSpecializationMap[symptomQuery] || [];

    return doctors.filter((doctor) => {
      const matchesRecommendedSpecialization =
        mappedSpecializations.length === 0 ||
        selectedSpecialization !== "All Specializations" ||
        mappedSpecializations.includes(doctor.specialization);
      const matchesProvince =
        selectedProvince === "All Provinces" || doctor.province === selectedProvince;
      const matchesDistrict =
        selectedDistrict === "All Districts" || doctor.district === selectedDistrict;
      const matchesSpecialization =
        selectedSpecialization === "All Specializations" ||
        doctor.specialization === selectedSpecialization;
      const matchesSymptom =
        symptomQuery.length === 0 ||
        doctor.symptoms.some((symptom) => symptom.includes(symptomQuery)) ||
        mappedSpecializations.includes(doctor.specialization);
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

      return (
        matchesRecommendedSpecialization &&
        matchesProvince &&
        matchesDistrict &&
        matchesSpecialization &&
        matchesSymptom &&
        matchesQuickFilters
      );
    });
  }, [
    activeFilters,
    activeSymptom,
    selectedDistrict,
    selectedProvince,
    selectedSpecialization,
  ]);

  function toggleQuickFilter(filter) {
    setActiveFilters((currentFilters) =>
      currentFilters.includes(filter)
        ? currentFilters.filter((item) => item !== filter)
        : [...currentFilters, filter]
    );
  }

  function handleProvinceChange(province) {
    setSelectedProvince(province);
    setSelectedDistrict("All Districts");
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-teal-100 bg-white p-5 shadow-xl shadow-teal-900/5 sm:p-8">
        <Link
          href="/dashboard"
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-teal-100 bg-white px-4 text-sm font-black text-teal-700 shadow-sm transition hover:bg-teal-50 active:scale-[0.98]"
        >
          <ArrowLeftIcon />
          Back to Dashboard
        </Link>

        <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 max-w-2xl">
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
          <span className="grid h-16 w-16 place-items-center rounded-3xl bg-teal-50">
            <Image
              src="/images/doctor.png"
              alt=""
              width={34}
              height={34}
              className="h-8 w-8 object-contain"
            />
          </span>
        </div>
      </section>

      <section className="rounded-3xl border border-teal-100 bg-white p-5 shadow-xl shadow-teal-900/5 sm:p-8">
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-[1fr_0.95fr_0.9fr_0.95fr_auto] xl:items-end">
          <label className="block">
            <span className="text-sm font-black text-slate-900">Symptom</span>
            <select
              value={selectedSymptom}
              onChange={(event) => setSelectedSymptom(event.target.value)}
              className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base font-bold text-slate-700 shadow-sm outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
            >
              {symptomOptions.map((symptom) => (
                <option key={symptom}>{symptom}</option>
              ))}
            </select>
          </label>

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

        <p className="mt-4 text-sm font-bold text-slate-500">
          Showing {filteredDoctors.length} mock doctors across Sri Lanka.
        </p>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
        <section>
          {filteredDoctors.length > 0 ? (
            <div className="grid items-stretch gap-5 md:grid-cols-2 2xl:grid-cols-3">
              {filteredDoctors.map((doctor) => (
                <article
                  key={doctor.id}
                  className="flex h-full flex-col rounded-3xl border border-teal-100 bg-white p-5 shadow-lg shadow-teal-900/5 transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-2xl hover:shadow-teal-900/10 sm:min-h-[452px]"
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
                      <span>{doctor.district}, {doctor.province}</span>
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

                  <div className="mt-4 flex flex-wrap gap-2">
                    {doctor.symptoms.slice(0, 3).map((symptom) => (
                      <span
                        key={symptom}
                        className="rounded-full bg-slate-50 px-3 py-1 text-xs font-bold text-slate-500"
                      >
                        {symptom}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto grid gap-3 pt-6 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setSelectedDoctor(doctor)}
                      className="flex h-12 items-center justify-center rounded-xl bg-[#08aa9c] px-4 text-center text-sm font-black leading-5 text-white shadow-lg shadow-teal-700/20 transition hover:bg-[#07998c] active:scale-[0.98]"
                    >
                      View
                    </button>
                    <a
                      href={`tel:${doctor.phone.replaceAll(" ", "")}`}
                      className="inline-flex h-12 items-center justify-center rounded-xl border border-teal-200 bg-white px-4 text-center text-sm font-black leading-5 text-teal-700 shadow-sm transition hover:bg-teal-50 active:scale-[0.98]"
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
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-3 backdrop-blur-sm sm:items-center sm:p-4">
          <section className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl shadow-slate-950/20 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <ProfileAvatar doctor={selectedDoctor} size="modal" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-700">
                  Doctor Profile
                </p>
                <h2 className="mt-2 text-2xl font-black text-[#0d4050] sm:text-3xl">
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
                ["District", `${selectedDoctor.district}, ${selectedDoctor.province}`],
                ["Contact number", selectedDoctor.phone],
                ["Consultation hours", selectedDoctor.consultationHours],
                ["Languages spoken", selectedDoctor.languages],
                ["Common symptoms", selectedDoctor.symptoms.join(", ")],
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
                href={`tel:${selectedDoctor.phone.replaceAll(" ", "")}`}
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
