import Link from "next/link";

const emergencySections = [
  {
    title: "Free Emergency Ambulance Service",
    hotline: "1990",
    description:
      "The 1990 Suwa Seriya is a toll-free, island-wide pre-hospital care service. It is government-operated, fully equipped, and staffed with trained Emergency Medical Technicians who can reach users almost anywhere.",
    tip: "Users can request an ambulance directly via the 1990 Suwa Seriya Android App.",
    calls: [{ label: "Call 1990", href: "tel:1990" }],
    urgent: true,
  },
  {
    title: "General Emergency & Police Assistance",
    description: "Use these national hotlines for urgent emergency, police, ambulance, fire, and rescue support.",
    hotlines: [
      "119 or 118 - Police Emergency Hotline",
      "110 - Ambulance / Fire & Rescue",
    ],
    calls: [
      { label: "Call 119", href: "tel:119" },
      { label: "Call 118", href: "tel:118" },
      { label: "Call 110", href: "tel:110" },
    ],
  },
  {
    title: "Major Private Hospitals - 24/7 Accident & Emergency",
    description:
      "For users near major cities who prefer private hospital emergency responses, these hospitals operate 24/7 emergency care departments and ambulance services.",
    hospitals: [
      {
        name: "Lanka Hospitals",
        details: ["Hotline: 1566", "Alternative: 011 453 0000"],
      },
      {
        name: "Nawaloka Hospitals",
        details: ["Hotline: 0779 511 929"],
      },
      {
        name: "Durdans Hospital",
        details: ["Hotline: 011 214 0000"],
      },
    ],
    calls: [
      { label: "Call Lanka Hospitals", href: "tel:1566" },
      { label: "Call Nawaloka Hospitals", href: "tel:0779511929" },
      { label: "Call Durdans Hospital", href: "tel:0112140000" },
    ],
  },
  {
    title: "Government Hospital Emergency",
    hospital: "Colombo National Hospital - Accident Service",
    hotline: "011 269 1111",
    calls: [{ label: "Call Accident Service", href: "tel:0112691111" }],
    urgent: true,
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

function ContactCard({ section }) {
  return (
    <article className="flex h-full flex-col rounded-3xl border border-teal-100 bg-white p-6 shadow-xl shadow-teal-900/5 sm:p-7">
      <div className="flex items-start gap-4">
        <div
          className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${
            section.urgent ? "bg-red-50 text-red-700" : "bg-teal-50 text-teal-700"
          }`}
        >
          <ShieldIcon />
        </div>
        <div className="min-w-0">
          <h2 className="text-2xl font-black leading-tight text-[#0d4050]">
            {section.title}
          </h2>
          {section.hotline && (
            <p className="mt-3 text-4xl font-black tracking-tight text-red-700">
              {section.hotline}
            </p>
          )}
        </div>
      </div>

      {section.hospital && (
        <div className="mt-6 rounded-2xl border border-teal-100 bg-[#fbfdfd] p-4">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-teal-700">
            Hospital
          </p>
          <p className="mt-2 text-lg font-black text-slate-800">{section.hospital}</p>
          <p className="mt-2 text-3xl font-black text-red-700">{section.hotline}</p>
        </div>
      )}

      {section.description && (
        <p className="mt-5 text-base font-semibold leading-7 text-slate-600">
          {section.description}
        </p>
      )}

      {section.tip && (
        <div className="mt-5 rounded-2xl border border-teal-100 bg-teal-50/70 p-4">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-teal-700">
            Tip
          </p>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
            {section.tip}
          </p>
        </div>
      )}

      {section.hotlines && (
        <div className="mt-5 space-y-3">
          {section.hotlines.map((hotline) => (
            <p
              key={hotline}
              className="rounded-2xl border border-teal-100 bg-[#fbfdfd] px-4 py-3 text-lg font-black text-slate-800"
            >
              {hotline}
            </p>
          ))}
        </div>
      )}

      {section.hospitals && (
        <div className="mt-5 grid gap-3">
          {section.hospitals.map((hospital) => (
            <div
              key={hospital.name}
              className="rounded-2xl border border-teal-100 bg-[#fbfdfd] p-4"
            >
              <h3 className="text-lg font-black text-[#0d4050]">{hospital.name}</h3>
              <div className="mt-2 space-y-1">
                {hospital.details.map((detail) => (
                  <p key={detail} className="text-base font-bold text-slate-700">
                    {detail}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-auto grid gap-3 pt-6 sm:grid-cols-2">
        {section.calls.map((call) => (
          <a
            key={call.href}
            href={call.href}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-center text-sm font-black text-white shadow-lg shadow-red-700/20 transition hover:bg-red-700 active:scale-[0.98]"
          >
            <PhoneIcon />
            {call.label}
          </a>
        ))}
      </div>
    </article>
  );
}

export default function EmergencyPage() {
  return (
    <div className="space-y-7">
      <section className="rounded-3xl border border-teal-100 bg-white p-6 shadow-xl shadow-teal-900/5 sm:p-8">
        <Link
          href="/dashboard"
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-teal-100 bg-white px-4 text-sm font-black text-teal-700 shadow-sm transition hover:bg-teal-50 active:scale-[0.98]"
        >
          <ArrowLeftIcon />
          Back to Dashboard
        </Link>
        <div className="mt-7 max-w-4xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-teal-700">
            Emergency contacts
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-[#0d4050] sm:text-5xl">
            Emergency & Urgent Care Guidance
          </h1>
          <p className="mt-4 text-base font-semibold leading-7 text-slate-600">
            Get key emergency contact numbers and urgent support options in Sri Lanka.
          </p>
        </div>
      </section>

      <section className="grid items-stretch gap-5 lg:grid-cols-2">
        {emergencySections.map((section) => (
          <ContactCard key={section.title} section={section} />
        ))}
      </section>

      <section className="rounded-3xl border border-teal-100 bg-white p-6 shadow-xl shadow-teal-900/5 sm:p-8">
        <h2 className="text-2xl font-black text-[#0d4050]">
          Need location-specific emergency care?
        </h2>
        <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
          If you know your nearest major city or town, Mediora can help guide you toward
          private hospitals or local emergency care options in your area when backend
          location services are added.
        </p>
      </section>

      <section className="rounded-3xl border border-amber-200 bg-amber-50 p-5 shadow-lg shadow-amber-900/5">
        <p className="text-sm font-black leading-6 text-amber-800">
          This feature provides general emergency contact information only. If you are
          experiencing a life-threatening emergency, call emergency services immediately or
          go to the nearest hospital.
        </p>
      </section>
    </div>
  );
}
