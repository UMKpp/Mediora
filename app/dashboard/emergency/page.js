"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { api } from "../../lib/api";

const emergencySections = [
  {
    id: "ambulance",
    title: "Free Emergency Ambulance Service",
    eyebrow: "Recommended first call",
    hotline: "1990",
    description:
      "The 1990 Suwa Seriya is a toll-free, island-wide pre-hospital care service. It is government-operated, fully equipped, and staffed with trained Emergency Medical Technicians who can reach users almost anywhere.",
    tip: "Users can request an ambulance directly via the 1990 Suwa Seriya Android App.",
    calls: [{ label: "Call 1990 Now", href: "tel:1990" }],
    urgent: true,
  },
  {
    id: "police",
    title: "General Emergency & Police Assistance",
    eyebrow: "National emergency lines",
    description:
      "Use these national hotlines for urgent emergency, police, fire, rescue, mental health, and health guidance support.",
    emergencyServices: [
      {
        name: "Sri Lanka Police",
        description:
          "Public safety emergencies, accidents, and emergency coordination.",
        call: { label: "Call 119", href: "tel:119" },
      },
      {
        name: "Ministry of Defence / National Help Desk",
        description:
          "National emergencies, disaster response, and large-scale rescue operations.",
        call: { label: "Call 118", href: "tel:118" },
      },
      {
        name: "Fire & Rescue Service",
        description: "Emergency physical rescue from accidents or fire hazards.",
        call: { label: "Call 110", href: "tel:110" },
      },
      {
        name: "National Mental Health Helpline",
        description: "24/7 psychiatric support and crisis intervention.",
        call: { label: "Call 1926", href: "tel:1926" },
      },
      {
        name: "Trilingual Health Line",
        description: "General health guidance and healthcare information.",
        call: { label: "Call 1999", href: "tel:1999" },
      },
    ],
  },
];

const quickAccessItems = [
  { label: "Ambulance", target: "ambulance" },
  { label: "Police", target: "police" },
  { label: "Fire & Rescue", target: "police" },
  { label: "Private Hospitals", target: "specialized-hospitals" },
  { label: "Government Hospitals", target: "specialized-hospitals" },
  { label: "Specialized Hospitals", target: "specialized-hospitals" },
];

const specializedInstitutions = [
  {
    hospital: "Apeksha Hospital (Cancer Hospital)",
    position: "Medical Superintendent",
    phone: "011 256 6566",
    email: "director@apeksha.lk",
  },
  {
    hospital: "Castle Street Hospital for Women",
    position: "Deputy Director",
    phone: "011 269 1111",
    email: "info@castlestreet.lk",
  },
  {
    hospital: "Kandy Base Hospital",
    position: "Chief Medical Officer",
    phone: "081 222 2222",
    email: "info@kandyhospital.lk",
  },
  {
    hospital: "Lady Ridgeway Hospital for Children",
    position: "Deputy Director",
    phone: "011 269 7111",
    email: "info@lrh.lk",
  },
  {
    hospital: "National Eye Hospital",
    position: "Chief Medical Officer",
    phone: "011 267 1111",
    email: "info@eyehospital.lk",
  },
  {
    hospital: "National Hospital of Colombo",
    position: "Medical Superintendent",
    phone: "011 269 1111",
    email: "director@nationalhospital.lk",
  },
  {
    hospital: "Lanka Hospitals",
    position: "24/7 Emergency Care",
    phone: "1566",
    alternative: "011 453 0000",
    category: "Private emergency care",
  },
  {
    hospital: "Nawaloka Hospitals",
    position: "24/7 Emergency Care",
    phone: "0779 511 929",
    category: "Private emergency care",
  },
  {
    hospital: "Durdans Hospital",
    position: "24/7 Emergency Care",
    phone: "011 214 0000",
    category: "Private emergency care",
  },
  {
    hospital: "Colombo National Hospital - Accident Service",
    position: "Government Accident Service",
    phone: "011 269 1111",
    category: "Government emergency care",
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

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path
        d="M7.3 4.8 9 4.2c.8-.3 1.7.1 2 .9l.9 2.4c.3.7.1 1.5-.5 1.9l-1.1.9a11.2 11.2 0 0 0 4.5 4.5l.9-1.1c.5-.6 1.3-.8 2-.5l2.4.9c.8.3 1.2 1.2.9 2l-.6 1.7c-.3.8-1 1.3-1.9 1.3C10.5 19 5 13.5 5 6.7c0-.8.5-1.6 1.3-1.9Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7" fill="none">
      <path
        d="M12 3 5 6v5c0 4.5 2.9 8.3 7 10 4.1-1.7 7-5.5 7-10V6l-7-3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path
        d="M4 6.5h16v11H4v-11Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m5 7.5 7 5 7-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CallButton({ call, featured = false, pulse = false, compact = false }) {
  return (
    <a
      href={call.href}
      className={`inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-center font-black text-white shadow-lg shadow-red-700/20 transition hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-red-700/30 active:scale-[0.98] ${
        featured ? "text-base sm:text-lg" : "text-sm"
      } ${compact ? "w-full sm:w-auto" : ""} ${pulse ? "motion-safe:animate-pulse" : ""}`}
    >
      <PhoneIcon />
      {call.label}
    </a>
  );
}

function ContactCard({ section }) {
  const buttonGridClass =
    section.calls?.length >= 3
      ? "grid gap-3 sm:grid-cols-2"
      : section.calls?.length === 2
        ? "grid gap-3 sm:grid-cols-2"
        : "grid gap-3";

  return (
    <article
      id={section.id}
      className={`flex h-full flex-col overflow-hidden rounded-3xl border bg-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl ${
        section.urgent
          ? "border-teal-100 shadow-red-900/5 hover:shadow-red-900/10"
          : "border-teal-100 shadow-teal-900/5 hover:shadow-teal-900/10"
      }`}
    >
      <div className={`h-2 ${section.urgent ? "bg-red-600" : "bg-[#08aa9c]"}`} />
      <div className="flex flex-1 flex-col p-6 sm:p-7">
      <div className="flex items-start gap-4">
        <div
          className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl shadow-sm ${
            section.urgent ? "bg-red-50 text-red-700" : "bg-teal-50 text-teal-700"
          }`}
        >
          <ShieldIcon />
        </div>
        <div className="min-w-0">
          <p
            className={`text-xs font-black uppercase tracking-[0.18em] ${
              section.urgent ? "text-red-700" : "text-teal-700"
            }`}
          >
            {section.eyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-black leading-tight text-[#0d4050]">
            {section.title}
          </h2>
          {section.hotline && (
            <p className="mt-3 text-4xl font-black tracking-tight text-red-700 sm:text-5xl">
              {section.hotline}
            </p>
          )}
        </div>
      </div>

      {section.hospital && (
        <div className="mt-6 rounded-2xl border border-teal-100 bg-[#fbfdfd] p-5">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-teal-700">
            Hospital
          </p>
          <p className="mt-2 text-lg font-black text-slate-800">{section.hospital}</p>
          <p className="mt-2 text-4xl font-black text-red-700">{section.hotline}</p>
        </div>
      )}

      {section.description && (
        <p className="mt-5 text-base font-semibold leading-7 text-slate-600 sm:text-lg sm:leading-8">
          {section.description}
        </p>
      )}

      {section.tip && (
        <div className="mt-5 rounded-2xl border border-teal-100 bg-teal-50/70 p-5">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-teal-700">
            Tip
          </p>
          <p className="mt-2 text-base font-semibold leading-7 text-slate-700">
            {section.tip}
          </p>
        </div>
      )}

      {section.hotlines && (
        <div className="mt-5 grid gap-3">
          {section.hotlines.map((hotline) => (
            <p
              key={hotline}
              className="rounded-2xl border border-teal-100 bg-[#fbfdfd] px-5 py-4 text-lg font-black leading-7 text-slate-800"
            >
              {hotline}
            </p>
          ))}
        </div>
      )}

      {section.emergencyServices && (
        <div className="mt-5 grid gap-3">
          {section.emergencyServices.map((service) => (
            <div
              key={service.name}
              className="flex flex-col gap-4 rounded-2xl border border-teal-100 bg-[#fbfdfd] p-5 shadow-sm shadow-teal-900/5 transition hover:-translate-y-0.5 hover:border-teal-300 hover:bg-teal-50/40 hover:shadow-md hover:shadow-teal-900/10 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <h3 className="text-lg font-black leading-6 text-[#0d4050]">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                  {service.description}
                </p>
              </div>
              <CallButton call={service.call} compact />
            </div>
          ))}
        </div>
      )}

      {section.hospitals && (
        <div className="mt-5 grid gap-3">
          {section.hospitals.map((hospital) => (
            <div
              key={hospital.name}
              className="rounded-2xl border border-teal-100 bg-[#fbfdfd] p-5"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <h3 className="text-lg font-black text-[#0d4050]">{hospital.name}</h3>
                <span className="w-fit rounded-full bg-teal-50 px-3 py-1 text-xs font-black text-teal-700">
                  {hospital.badge}
                </span>
              </div>
              <div className="mt-3 space-y-1">
                <p className="text-base font-bold leading-6 text-slate-700">
                  Hotline: <span className="font-black text-red-700">{hospital.hotline}</span>
                </p>
                {hospital.alternative && (
                  <p className="text-base font-bold leading-6 text-slate-700">
                    Alternative: {hospital.alternative}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {section.calls && (
        <div className={`mt-auto pt-6 ${buttonGridClass}`}>
          {section.calls.map((call) => (
            <CallButton key={call.href} call={call} featured={section.calls.length === 1} />
          ))}
        </div>
      )}
      </div>
    </article>
  );
}

function InstitutionCard({ institution, onViewDetails }) {
  const telHref = `tel:${institution.phone.replaceAll(" ", "")}`;
  const mailHref = institution.email ? `mailto:${institution.email}` : "";

  return (
    <article className="flex h-full flex-col rounded-3xl border border-teal-100 bg-white p-6 shadow-xl shadow-teal-900/5 transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-2xl hover:shadow-teal-900/10">
      <div className="flex items-start gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-teal-50 text-teal-700 shadow-sm">
          <ShieldIcon />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-700">
            {institution.category || "National institution"}
          </p>
          <h3 className="mt-2 text-xl font-black leading-tight text-[#0d4050]">
            {institution.hospital}
          </h3>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <div className="rounded-2xl border border-teal-100 bg-[#fbfdfd] p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-700">
            Contact person
          </p>
          <p className="mt-2 text-base font-black text-slate-800">
            {institution.position}
          </p>
        </div>
        <div className="rounded-2xl border border-teal-100 bg-[#fbfdfd] p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-700">
            Phone
          </p>
          <p className="mt-2 text-3xl font-black tracking-tight text-red-700">
            {institution.phone}
          </p>
        </div>
        {institution.alternative && (
          <div className="rounded-2xl border border-teal-100 bg-[#fbfdfd] p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-700">
              Alternative
            </p>
            <p className="mt-2 text-xl font-black text-slate-800">
              {institution.alternative}
            </p>
          </div>
        )}
        {institution.email && (
        <div className="rounded-2xl border border-teal-100 bg-[#fbfdfd] p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-700">
            Email
          </p>
          <p className="mt-2 break-words text-base font-bold text-slate-700">
            {institution.email}
          </p>
        </div>
        )}
      </div>

      <div className="mt-auto grid gap-3 pt-6 sm:grid-cols-2">
        <a
          href={telHref}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-center text-sm font-black text-white shadow-lg shadow-red-700/20 transition hover:bg-red-700 active:scale-[0.98]"
        >
          <PhoneIcon />
          Call Hospital
        </a>
        {institution.email && (
        <a
          href={mailHref}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-teal-200 bg-white px-5 text-center text-sm font-black text-teal-700 shadow-sm transition hover:bg-teal-50 active:scale-[0.98]"
        >
          <MailIcon />
          Send Email
        </a>
        )}
        <button
          type="button"
          onClick={() => onViewDetails(institution)}
          className={`inline-flex min-h-12 items-center justify-center rounded-xl border border-teal-200 bg-teal-50 px-5 text-center text-sm font-black text-teal-700 shadow-sm transition hover:bg-teal-100 active:scale-[0.98] ${
            institution.email ? "sm:col-span-2" : ""
          }`}
        >
          View Details
        </button>
      </div>
    </article>
  );
}

export default function EmergencyPage() {
  const [apiServices, setApiServices] = useState([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [servicesError, setServicesError] = useState("");
  const [selectedInstitution, setSelectedInstitution] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadEmergencyServices() {
      setIsLoadingServices(true);
      setServicesError("");

      try {
        const records = await api.emergencyServices();
        if (!active) return;
        setApiServices(records);
      } catch (error) {
        if (!active) return;
        setServicesError("Unable to load emergency services from the backend.");
        setApiServices([]);
      } finally {
        if (active) setIsLoadingServices(false);
      }
    }

    loadEmergencyServices();
    return () => {
      active = false;
    };
  }, []);

  const contactSections = useMemo(() => {
    if (apiServices.length === 0) return emergencySections;

    const hotlineRows = apiServices
      .filter((service) => service.hotline !== "1990")
      .map((service) => ({
        name: service.serviceName,
        description: service.description,
        call: { label: `Call ${service.hotline}`, href: `tel:${service.hotline}` },
      }));

    return emergencySections.map((section) =>
      section.id === "police" ? { ...section, emergencyServices: hotlineRows } : section,
    );
  }, [apiServices]);

  function scrollToSection(target) {
    document.getElementById(target)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <div className="space-y-6 pb-24 md:pb-0">
      <section className="overflow-hidden rounded-3xl border border-teal-100 bg-white shadow-xl shadow-teal-900/5">
        <div className="grid gap-0 lg:grid-cols-[1.45fr_0.55fr]">
          <div className="p-5 sm:p-6">
            <Link
              href="/dashboard"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-teal-100 bg-white px-4 text-sm font-black text-teal-700 shadow-sm transition hover:bg-teal-50 active:scale-[0.98]"
            >
              <ArrowLeftIcon />
              Back to Dashboard
            </Link>
            <div className="mt-5 max-w-4xl">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-teal-700">
                Emergency contacts
              </p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-[#0d4050] sm:text-4xl lg:text-5xl">
                Emergency & Urgent Care Guidance
              </h1>
              <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                Get key emergency contact numbers and urgent support options in Sri Lanka.
              </p>
            </div>
          </div>
          <aside className="flex flex-col justify-center bg-gradient-to-br from-red-50 via-white to-teal-50 p-5 sm:p-6">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-red-700">
              Life-threatening emergency
            </p>
            <p className="mt-2 text-4xl font-black tracking-tight text-red-700">1990</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
              Recommended first call for medical emergencies.
            </p>
            <div className="mt-4">
              <CallButton
                call={{ label: "Call 1990 Now", href: "tel:1990" }}
                featured
                pulse
              />
            </div>
          </aside>
        </div>
      </section>

      <nav
        aria-label="Emergency quick access"
        className="rounded-3xl border border-teal-100 bg-white p-4 shadow-xl shadow-teal-900/5"
      >
        <div className="flex flex-wrap gap-3">
          {quickAccessItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => scrollToSection(item.target)}
              className="min-h-11 rounded-full border border-teal-200 bg-teal-50 px-4 text-sm font-black text-teal-700 transition hover:bg-teal-100 active:scale-[0.98]"
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <section className="grid items-stretch gap-5 lg:grid-cols-2">
        {contactSections.map((section) => (
          <ContactCard key={section.title} section={section} />
        ))}
      </section>

      {isLoadingServices && (
        <section className="rounded-3xl border border-teal-100 bg-white p-5 shadow-xl shadow-teal-900/5">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-700">
            Loading emergency services
          </p>
          <div className="mt-4 grid gap-3">
            {[1, 2].map((item) => (
              <div key={item} className="rounded-2xl border border-teal-100 bg-[#fbfdfd] p-4">
                <div className="mediora-skeleton h-4 w-2/3 rounded-full" />
                <div className="mediora-skeleton mt-3 h-3 w-full rounded-full" />
              </div>
            ))}
          </div>
        </section>
      )}

      {servicesError && (
        <section className="rounded-3xl border border-red-200 bg-red-50 p-5 text-sm font-black text-red-700 shadow-xl shadow-red-900/5">
          No emergency services found. {servicesError}
        </section>
      )}

      <section
        id="specialized-hospitals"
        className="rounded-3xl border border-teal-100 bg-white p-5 shadow-xl shadow-teal-900/5 sm:p-8"
      >
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-teal-700">
            National care access
          </p>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-[#0d4050] sm:text-4xl">
            Specialized National Healthcare Institutions
          </h2>
          <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
            Quick access to major national healthcare institutions in Sri Lanka.
          </p>
        </div>

        <div className="mt-7 grid items-stretch gap-5 md:grid-cols-2 2xl:grid-cols-3">
          {specializedInstitutions.map((institution) => (
            <InstitutionCard
              key={institution.hospital}
              institution={institution}
              onViewDetails={setSelectedInstitution}
            />
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-teal-100 bg-white p-5 shadow-xl shadow-teal-900/5 sm:p-8">
        <h2 className="text-2xl font-black text-[#0d4050]">
          Need emergency care near you?
        </h2>
        <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
          Location-based emergency hospital recommendations will be available in future
          updates.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2" aria-hidden="true">
          {[1, 2].map((item) => (
            <div key={item} className="rounded-2xl border border-teal-100 bg-[#fbfdfd] p-4">
              <div className="mediora-skeleton h-4 w-2/3 rounded-full" />
              <div className="mediora-skeleton mt-3 h-3 w-full rounded-full" />
              <div className="mediora-skeleton mt-3 h-3 w-1/2 rounded-full" />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-amber-200 bg-amber-50 p-5 shadow-lg shadow-amber-900/5">
        <p className="mb-3 text-sm font-black text-amber-900">
          Emergency information last reviewed: June 2026
        </p>
        <p className="text-sm font-black leading-6 text-amber-800">
          This feature provides general emergency contact information only. If you are
          experiencing a life-threatening emergency, call emergency services immediately or
          go to the nearest hospital.
        </p>
      </section>

      {selectedInstitution && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-3 backdrop-blur-sm sm:items-center sm:p-4">
          <section className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl shadow-slate-950/20 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-700">
                  Institution details
                </p>
                <h2 className="mt-2 text-2xl font-black leading-tight text-[#0d4050]">
                  {selectedInstitution.hospital}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInstitution(null)}
                className="min-h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-600 transition hover:bg-slate-50 sm:shrink-0"
              >
                Close
              </button>
            </div>

            <div className="mt-6 grid gap-3">
              {[
                ["Position / Contact person", selectedInstitution.position],
                ["Phone number", selectedInstitution.phone],
                selectedInstitution.alternative
                  ? ["Alternative number", selectedInstitution.alternative]
                  : null,
                selectedInstitution.email
                  ? ["Email address", selectedInstitution.email]
                  : null,
                selectedInstitution.category
                  ? ["Care category", selectedInstitution.category]
                  : null,
              ]
                .filter(Boolean)
                .map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-teal-100 bg-[#fbfdfd] p-4"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-700">
                      {label}
                    </p>
                    <p className="mt-2 break-words text-base font-bold text-slate-800">
                      {value}
                    </p>
                  </div>
                ))}
            </div>

            <p className="mt-5 rounded-2xl border border-teal-100 bg-teal-50/70 p-4 text-base font-semibold leading-7 text-slate-700">
              Detailed hospital information will be available in future updates.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a
                href={`tel:${selectedInstitution.phone.replaceAll(" ", "")}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-center text-sm font-black text-white shadow-lg shadow-red-700/20 transition hover:bg-red-700 active:scale-[0.98]"
              >
                <PhoneIcon />
                Call Hospital
              </a>
              {selectedInstitution.email && (
                <a
                  href={`mailto:${selectedInstitution.email}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-teal-200 bg-white px-5 text-center text-sm font-black text-teal-700 shadow-sm transition hover:bg-teal-50 active:scale-[0.98]"
                >
                  <MailIcon />
                  Send Email
                </a>
              )}
            </div>
          </section>
        </div>
      )}

      <div className="fixed inset-x-4 bottom-4 z-40 md:hidden">
        <a
          href="tel:1990"
          className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 text-base font-black text-white shadow-2xl shadow-red-900/25 transition active:scale-[0.98] motion-safe:animate-pulse"
        >
          <PhoneIcon />
          Call 1990
        </a>
      </div>
    </div>
  );
}
