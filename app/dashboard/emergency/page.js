"use client";

import Link from "next/link";
import { useState } from "react";

const guidanceTypes = [
  {
    title: "Emergency Escalation",
    description:
      "Get immediate instructions for serious red-flag symptoms and know when to contact emergency services.",
    examples: [
      "Severe chest pain",
      "Trouble breathing",
      "Uncontrolled bleeding",
      "Stroke symptoms",
    ],
    button: "View Red Flags",
    tone: "red",
  },
  {
    title: "Virtual Urgent Care Triage",
    description:
      "Check urgent but non-life-threatening symptoms and understand whether to visit urgent care or consult a doctor.",
    examples: ["High fever", "Persistent vomiting", "Severe headache", "Moderate injury"],
    button: "Start Triage",
    tone: "teal",
  },
  {
    title: "Self-Care & First Aid",
    description: "Follow simple step-by-step guidance for minor health situations.",
    examples: ["Small burns", "Nosebleeds", "Minor cuts", "Mild cold symptoms"],
    button: "View First Aid",
    tone: "green",
  },
  {
    title: "Safety-Netting Instructions",
    description:
      "Learn when symptoms should improve and when to seek medical help if they worsen.",
    examples: [
      "Fever not improving",
      "Breathing changes",
      "Symptoms lasting too long",
      "Pain getting worse",
    ],
    button: "View Safety Advice",
    tone: "amber",
  },
];

const emergencyCategories = [
  {
    title: "Chest Pain",
    summary: "Pressure, tightness, or pain in the chest needs urgent attention.",
    steps: [
      "Stop activity and sit upright in a safe place.",
      "Loosen tight clothing and keep breathing slowly.",
      "Do not eat or drink while symptoms are severe.",
      "Keep the person calm and monitor breathing.",
    ],
    callWhen: [
      "Pain is severe, crushing, or spreading to the arm, jaw, back, or shoulder.",
      "There is sweating, shortness of breath, faintness, or nausea.",
      "Symptoms last longer than a few minutes or keep returning.",
    ],
  },
  {
    title: "Trouble Breathing",
    summary: "Breathing difficulty can become serious quickly.",
    steps: [
      "Help the person sit upright and lean slightly forward.",
      "Keep the area calm and well ventilated.",
      "Use prescribed inhalers only if already advised by a doctor.",
      "Watch for blue lips, confusion, or worsening breathing.",
    ],
    callWhen: [
      "The person cannot speak full sentences.",
      "Breathing is noisy, very fast, or getting worse.",
      "Lips, face, or fingers look blue or pale.",
    ],
  },
  {
    title: "Stroke Signs",
    summary: "Stroke symptoms need immediate emergency care.",
    steps: [
      "Check face drooping, arm weakness, and speech changes.",
      "Note the time symptoms first appeared.",
      "Keep the person lying safely with head slightly raised.",
      "Do not give food, drink, or medication unless instructed by professionals.",
    ],
    callWhen: [
      "Face, arm, or speech changes appear suddenly.",
      "There is sudden confusion, vision loss, or severe dizziness.",
      "A sudden severe headache appears with weakness or confusion.",
    ],
  },
  {
    title: "Severe Bleeding",
    summary: "Heavy bleeding needs firm pressure and urgent help.",
    steps: [
      "Apply firm pressure with a clean cloth or dressing.",
      "Keep pressing and do not repeatedly lift the dressing.",
      "Raise the injured area if possible and safe.",
      "Keep the person warm and still.",
    ],
    callWhen: [
      "Bleeding does not slow after firm pressure.",
      "Blood is spurting or soaking through dressings.",
      "The person is weak, pale, confused, or faint.",
    ],
  },
  {
    title: "Choking",
    summary: "A blocked airway needs fast action.",
    steps: [
      "Ask if the person can cough, speak, or breathe.",
      "Encourage coughing if they can breathe.",
      "If they cannot breathe, seek trained help immediately.",
      "Prepare for emergency support if the person becomes unresponsive.",
    ],
    callWhen: [
      "The person cannot breathe, speak, or cough effectively.",
      "The person becomes blue, weak, or unconscious.",
      "Choking continues after initial attempts to clear the airway.",
    ],
  },
  {
    title: "Burns",
    summary: "Cooling early can reduce burn damage.",
    steps: [
      "Cool the burn under clean cool running water for 20 minutes.",
      "Remove tight items near the burn if not stuck to skin.",
      "Cover loosely with a clean non-stick dressing.",
      "Do not apply oils, toothpaste, or butter.",
    ],
    callWhen: [
      "The burn is large, deep, chemical, electrical, or on the face or genitals.",
      "A child, elderly person, or pregnant person is burned.",
      "There are signs of shock, severe pain, or breathing difficulty.",
    ],
  },
  {
    title: "Poisoning",
    summary: "Poisoning needs careful handling and rapid advice.",
    steps: [
      "Move the person away from the source if safe.",
      "Check breathing and level of alertness.",
      "Keep the container, label, or substance details available.",
      "Do not induce vomiting unless told by emergency professionals.",
    ],
    callWhen: [
      "The person is drowsy, confused, vomiting repeatedly, or has trouble breathing.",
      "A chemical, medicine overdose, or unknown substance was swallowed.",
      "Poisoning involves a child or vulnerable adult.",
    ],
  },
  {
    title: "Fainting",
    summary: "Fainting can be minor, but some causes need urgent care.",
    steps: [
      "Lay the person flat and raise their legs if possible.",
      "Check breathing and loosen tight clothing.",
      "Keep them still until fully alert.",
      "Offer water only after they are fully awake and able to swallow.",
    ],
    callWhen: [
      "The person does not wake quickly.",
      "Fainting happened with chest pain, breathing trouble, or injury.",
      "There is pregnancy, diabetes, seizure, or repeated fainting.",
    ],
  },
];

const emergencyContacts = [
  { name: "Suwa Seriya Ambulance", number: "1990" },
  { name: "Police Emergency", number: "119" },
  { name: "Fire & Rescue", number: "110" },
  { name: "Accident Service", number: "011 2691111" },
];

const hospitals = [
  {
    name: "Colombo Central Emergency Hospital",
    district: "Colombo",
    address: "24 Care Avenue, Colombo 07",
    availability: "24-hour emergency unit",
    phone: "011 245 7788",
  },
  {
    name: "Kandy Mediora Urgent Care Centre",
    district: "Kandy",
    address: "12 Lake View Road, Kandy",
    availability: "Emergency doctors available today",
    phone: "081 223 6190",
  },
  {
    name: "Galle Southern Care Hospital",
    district: "Galle",
    address: "7 Lighthouse Street, Galle",
    availability: "Emergency and trauma support",
    phone: "091 224 5581",
  },
  {
    name: "Jaffna Northway Emergency Clinic",
    district: "Jaffna",
    address: "41 Hospital Lane, Jaffna",
    availability: "Urgent care open now",
    phone: "021 225 4402",
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

function AmbulanceIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 120 120" className="h-full w-full" fill="none">
      <rect x="17" y="42" width="70" height="38" rx="10" fill="#e9fbf7" />
      <path
        d="M87 54h10.5l10 12.5V80H87V54Z"
        fill="#d9f8f0"
        stroke="#08aa9c"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M24 42h61a8 8 0 0 1 8 8v30H17V49a7 7 0 0 1 7-7Z"
        stroke="#08aa9c"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M50 52v18M41 61h18" stroke="#dc2626" strokeWidth="5" strokeLinecap="round" />
      <circle cx="35" cy="83" r="9" fill="white" stroke="#0d4050" strokeWidth="3" />
      <circle cx="89" cy="83" r="9" fill="white" stroke="#0d4050" strokeWidth="3" />
      <path d="M74 31h13M80.5 24.5v13" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function GuidanceIcon({ tone = "teal" }) {
  const color =
    tone === "red"
      ? "#dc2626"
      : tone === "amber"
        ? "#d97706"
        : tone === "green"
          ? "#059669"
          : "#08aa9c";

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <path
        d="M12 3 5 6v5c0 4.5 2.9 8.3 7 10 4.1-1.7 7-5.5 7-10V6l-7-3Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M12 8v8M8 12h8" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none">
      <path
        d="M7.3 4.8 9 4.2c.8-.3 1.7.1 2 .9l.9 2.4c.3.7.1 1.5-.5 1.9l-1.1.9a11.2 11.2 0 0 0 4.5 4.5l.9-1.1c.5-.6 1.3-.8 2-.5l2.4.9c.8.3 1.2 1.2.9 2l-.6 1.7c-.3.8-1 1.3-1.9 1.3C10.5 19 5 13.5 5 6.7c0-.8.5-1.6 1.3-1.9Z"
        stroke="currentColor"
        strokeWidth="1.8"
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

function StatusPill({ children, tone = "teal" }) {
  const classes =
    tone === "red"
      ? "bg-red-50 text-red-700"
      : tone === "amber"
        ? "bg-amber-50 text-amber-700"
        : tone === "green"
          ? "bg-emerald-50 text-emerald-700"
          : "bg-teal-50 text-teal-700";

  return <span className={`rounded-full px-3 py-1 text-xs font-black ${classes}`}>{children}</span>;
}

export default function EmergencyPage() {
  const [selectedCategory, setSelectedCategory] = useState(emergencyCategories[0]);

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
            Urgent Care
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-[#0d4050] sm:text-5xl">
            Emergency & Urgent Care Guidance
          </h1>
          <p className="mt-4 text-base font-semibold leading-7 text-slate-600">
            Get urgent guidance, first-aid steps, and emergency support when you need it.
          </p>
        </div>
      </section>

      <section className="grid gap-6 rounded-3xl border border-red-100 bg-gradient-to-br from-white via-white to-red-50 p-6 shadow-xl shadow-red-900/5 lg:grid-cols-[1.15fr_0.85fr] lg:items-center sm:p-8">
        <div>
          <StatusPill tone="red">Emergency support</StatusPill>
          <h2 className="mt-5 text-3xl font-black text-[#0d4050] sm:text-4xl">
            Need urgent medical guidance?
          </h2>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-slate-600">
            Get immediate emergency instructions, first-aid support, and urgent care
            recommendations whenever you need them.
          </p>
          <div className="mt-7 grid gap-3 sm:flex">
            <a
              href="tel:1990"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-red-600 px-6 text-sm font-black text-white shadow-lg shadow-red-700/20 transition hover:bg-red-700 active:scale-[0.98]"
            >
              <PhoneIcon />
              Call Ambulance
            </a>
            <a
              href="#nearby-hospitals"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-teal-200 bg-white px-6 text-sm font-black text-teal-700 shadow-sm transition hover:bg-teal-50 active:scale-[0.98]"
            >
              <PinIcon />
              Find Nearby Hospital
            </a>
          </div>
        </div>
        <div className="relative min-h-[260px] overflow-hidden rounded-3xl border border-teal-100 bg-[#f0fffb] p-6 shadow-inner">
          <div className="absolute right-4 top-4 h-20 w-20 rounded-full bg-white/70" />
          <div className="absolute bottom-5 left-5 rounded-full bg-red-50 px-4 py-2 text-sm font-black text-red-700">
            Fast action matters
          </div>
          <div className="mx-auto h-56 max-w-sm">
            <AmbulanceIcon />
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-black text-[#0d4050]">Core Guidance Types</h2>
          <p className="mt-2 text-sm font-semibold text-slate-600">
            Choose the type of help that best matches your situation.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {guidanceTypes.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-teal-100 bg-white p-6 shadow-xl shadow-teal-900/5 transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-2xl hover:shadow-teal-900/10"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal-50">
                  <GuidanceIcon tone={item.tone} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#0d4050]">{item.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.examples.map((example) => (
                  <StatusPill key={example} tone={item.tone}>
                    {example}
                  </StatusPill>
                ))}
              </div>
              <button
                type="button"
                className="mt-6 min-h-12 w-full rounded-xl border border-teal-200 bg-white px-5 text-sm font-black text-teal-700 shadow-sm transition hover:bg-teal-50 active:scale-[0.98] sm:w-auto"
              >
                {item.button}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-teal-100 bg-white p-6 shadow-xl shadow-teal-900/5 sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-black text-[#0d4050]">
              Quick Emergency Categories
            </h2>
            <p className="mt-2 text-sm font-semibold text-slate-600">
              Select a situation to view immediate mock guidance.
            </p>
          </div>
          <StatusPill tone="red">Use emergency services for life-threatening symptoms</StatusPill>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {emergencyCategories.map((category) => {
            const isSelected = selectedCategory.title === category.title;

            return (
              <button
                key={category.title}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`min-h-16 rounded-2xl border px-4 text-left text-sm font-black transition active:scale-[0.98] ${
                  isSelected
                    ? "border-red-300 bg-red-50 text-red-700 shadow-lg shadow-red-900/10"
                    : "border-teal-100 bg-white text-[#0d4050] hover:border-teal-300 hover:bg-teal-50"
                }`}
                aria-pressed={isSelected}
              >
                {category.title}
              </button>
            );
          })}
        </div>

        <div className="mt-6 rounded-3xl border border-red-100 bg-[#fffafa] p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-red-700">
                Selected guidance
              </p>
              <h3 className="mt-2 text-3xl font-black text-[#0d4050]">
                {selectedCategory.title}
              </h3>
              <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-slate-600">
                {selectedCategory.summary}
              </p>
            </div>
            <StatusPill tone="red">Urgent attention may be needed</StatusPill>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-red-100 bg-white p-5">
              <h4 className="text-lg font-black text-[#0d4050]">Immediate steps</h4>
              <ul className="mt-4 space-y-3">
                {selectedCategory.steps.map((step) => (
                  <li key={step} className="flex gap-3 text-sm font-semibold leading-6 text-slate-700">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal-600" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-red-100 bg-white p-5">
              <h4 className="text-lg font-black text-red-700">
                When to call emergency services
              </h4>
              <ul className="mt-4 space-y-3">
                {selectedCategory.callWhen.map((step) => (
                  <li key={step} className="flex gap-3 text-sm font-semibold leading-6 text-slate-700">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-red-600" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:flex">
            <a
              href="tel:1990"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-red-600 px-6 text-sm font-black text-white shadow-lg shadow-red-700/20 transition hover:bg-red-700 active:scale-[0.98]"
            >
              <PhoneIcon />
              Call Ambulance
            </a>
            <Link
              href="/dashboard/doctors"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-teal-200 bg-white px-6 text-sm font-black text-teal-700 shadow-sm transition hover:bg-teal-50 active:scale-[0.98]"
            >
              Find a Doctor
            </Link>
            <a
              href="#nearby-hospitals"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-teal-200 bg-white px-6 text-sm font-black text-teal-700 shadow-sm transition hover:bg-teal-50 active:scale-[0.98]"
            >
              Nearby Hospitals
            </a>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-teal-100 bg-white p-6 shadow-xl shadow-teal-900/5 sm:p-8">
        <h2 className="text-2xl font-black text-[#0d4050]">
          Emergency Contacts in Sri Lanka
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {emergencyContacts.map((contact) => (
            <article
              key={contact.name}
              className="rounded-2xl border border-teal-100 bg-[#fbfdfd] p-5 shadow-sm"
            >
              <h3 className="text-lg font-black text-[#0d4050]">{contact.name}</h3>
              <p className="mt-2 text-2xl font-black text-red-700">{contact.number}</p>
              <a
                href={`tel:${contact.number.replaceAll(" ", "")}`}
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-black text-white shadow-lg shadow-red-700/20 transition hover:bg-red-700 active:scale-[0.98]"
              >
                <PhoneIcon />
                Call Now
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="nearby-hospitals">
        <div className="mb-4">
          <h2 className="text-2xl font-black text-[#0d4050]">
            Nearby Emergency Hospitals
          </h2>
          <p className="mt-2 text-sm font-semibold text-slate-600">
            Mock hospital information for the current frontend preview.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {hospitals.map((hospital) => (
            <article
              key={hospital.name}
              className="rounded-3xl border border-teal-100 bg-white p-6 shadow-xl shadow-teal-900/5 transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-2xl hover:shadow-teal-900/10"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-xl font-black text-[#0d4050]">{hospital.name}</h3>
                  <p className="mt-2 text-sm font-black text-teal-700">
                    {hospital.district}
                  </p>
                </div>
                <StatusPill tone="red">{hospital.availability}</StatusPill>
              </div>
              <div className="mt-5 space-y-3 text-sm font-semibold leading-6 text-slate-600">
                <p className="flex gap-2">
                  <span className="mt-1 text-teal-700"><PinIcon /></span>
                  <span>{hospital.address}</span>
                </p>
                <p className="flex gap-2">
                  <span className="mt-1 text-teal-700"><PhoneIcon /></span>
                  <span>{hospital.phone}</span>
                </p>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <a
                  href={`tel:${hospital.phone.replaceAll(" ", "")}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-black text-white shadow-lg shadow-red-700/20 transition hover:bg-red-700 active:scale-[0.98]"
                >
                  <PhoneIcon />
                  Call Hospital
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${hospital.name} ${hospital.district}`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-teal-200 bg-white px-5 text-sm font-black text-teal-700 shadow-sm transition hover:bg-teal-50 active:scale-[0.98]"
                >
                  <PinIcon />
                  Get Directions
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-amber-200 bg-amber-50 p-5 shadow-lg shadow-amber-900/5">
        <p className="text-sm font-black leading-6 text-amber-800">
          This feature provides general emergency and first-aid guidance only. If you are
          experiencing a life-threatening emergency, contact emergency services immediately or
          go to the nearest hospital.
        </p>
      </section>
    </div>
  );
}
