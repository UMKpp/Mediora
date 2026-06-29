import Link from "next/link";

const profile = {
  fullName: "Mihira Upul",
  username: "@mihira.mediora",
  email: "mihira.upul@example.com",
  phone: "+94 77 245 8891",
  dateOfBirth: "14 May 1994",
  gender: "Male",
  province: "Western Province",
  district: "Colombo",
  completion: 82,
};

const medical = {
  bloodGroup: "O+",
  height: "174 cm",
  weight: "72 kg",
  allergies: ["Penicillin", "Dust"],
  medications: ["Vitamin D", "Cetirizine"],
  chronicConditions: ["Mild Asthma"],
  emergencyContactName: "Anjali Perera",
  emergencyContactNumber: "+94 71 448 2091",
};

const preferences = {
  preferredLanguage: "English",
  communicationMethod: "Email and SMS",
  preferredHospital: "National Hospital of Colombo",
};

const activities = [
  {
    title: "Symptom check completed",
    description: "Reviewed headache and fever symptoms.",
    date: "Today",
    category: "Symptom Checker",
  },
  {
    title: "Doctor locator opened",
    description: "Searched for general physicians in Colombo.",
    date: "Yesterday",
    category: "Doctor Locator",
  },
  {
    title: "Pharmacy details viewed",
    description: "Checked opening hours and contact details.",
    date: "2 days ago",
    category: "Pharmacy Locator",
  },
  {
    title: "Emergency guidance reviewed",
    description: "Viewed national emergency assistance numbers.",
    date: "Last week",
    category: "Emergency Guidance",
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

function UserIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-9 w-9" fill="none">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M5 20a7 7 0 0 1 14 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <path
        d="M7 10V8a5 5 0 0 1 10 0v2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <rect
        x="5"
        y="10"
        width="14"
        height="10"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <path
        d="M12 3.5 18.5 6v5.2c0 4-2.6 7.1-6.5 8.6-3.9-1.5-6.5-4.6-6.5-8.6V6L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m9.2 11.8 1.8 1.8 3.9-4.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SectionCard({ eyebrow, title, children, className = "" }) {
  return (
    <section
      className={`rounded-3xl border border-teal-100 bg-white p-5 shadow-xl shadow-teal-900/5 sm:p-6 ${className}`}
    >
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-700">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-[#0d4050]">
          {title}
        </h2>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function InfoField({ label, value }) {
  return (
    <div className="rounded-2xl border border-teal-100 bg-[#fbfdfd] p-4 transition hover:border-teal-300 hover:shadow-lg hover:shadow-teal-900/5">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-teal-700">
        {label}
      </p>
      <p className="mt-2 text-base font-bold leading-6 text-slate-800">{value}</p>
    </div>
  );
}

function Chip({ children }) {
  return (
    <span className="inline-flex min-h-9 items-center rounded-full border border-teal-100 bg-teal-50 px-3 text-sm font-black text-teal-700">
      {children}
    </span>
  );
}

function ChipField({ label, items }) {
  return (
    <div className="rounded-2xl border border-teal-100 bg-[#fbfdfd] p-4 transition hover:border-teal-300 hover:shadow-lg hover:shadow-teal-900/5">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-teal-700">
        {label}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <Chip key={item}>{item}</Chip>
        ))}
      </div>
    </div>
  );
}

function SecurityCard({ icon, title, description, action, muted = false }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-teal-100 bg-[#fbfdfd] p-5 shadow-sm transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl hover:shadow-teal-900/10">
      <div className="flex items-start gap-4">
        <span
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${
            muted ? "bg-slate-100 text-slate-500" : "bg-teal-50 text-teal-700"
          }`}
        >
          {icon}
        </span>
        <div className="min-w-0">
          <h3 className="text-lg font-black text-[#0d4050]">{title}</h3>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
            {description}
          </p>
        </div>
      </div>
      <button
        type="button"
        disabled={muted}
        className={`mt-auto min-h-11 rounded-xl px-4 text-sm font-black shadow-sm transition ${
          muted
            ? "cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-500"
            : "border border-teal-200 bg-white text-teal-700 hover:bg-teal-50 active:scale-[0.98]"
        }`}
      >
        {action}
      </button>
    </article>
  );
}

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-teal-100 bg-white shadow-xl shadow-teal-900/5">
        <div className="p-5 sm:p-6">
          <Link
            href="/dashboard"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-teal-100 bg-white px-4 text-sm font-black text-teal-700 shadow-sm transition hover:bg-teal-50 active:scale-[0.98]"
          >
            <ArrowLeftIcon />
            Back to Dashboard
          </Link>

          <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.42fr] lg:items-end">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="grid h-24 w-24 shrink-0 place-items-center rounded-3xl bg-gradient-to-br from-teal-100 to-emerald-50 text-teal-700 ring-8 ring-teal-50">
                <UserIcon />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-700">
                  Patient Profile
                </p>
                <h1 className="mt-2 text-3xl font-black tracking-tight text-[#0d4050] sm:text-4xl">
                  {profile.fullName}
                </h1>
                <div className="mt-3 grid gap-1 text-sm font-bold text-slate-600 sm:text-base">
                  <p>{profile.username}</p>
                  <p>{profile.email}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-teal-100 bg-teal-50/70 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-black text-[#0d4050]">
                  Profile completion
                </p>
                <p className="text-sm font-black text-teal-700">
                  {profile.completion}%
                </p>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-[#08aa9c]"
                  style={{ width: `${profile.completion}%` }}
                />
              </div>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                Add remaining health details to improve care suggestions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <SectionCard eyebrow="Account details" title="Personal Information">
          <div className="grid gap-4 md:grid-cols-2">
            <InfoField label="Full Name" value={profile.fullName} />
            <InfoField label="Username" value={profile.username} />
            <InfoField label="Email" value={profile.email} />
            <InfoField label="Phone Number" value={profile.phone} />
            <InfoField label="Date of Birth" value={profile.dateOfBirth} />
            <InfoField label="Gender" value={profile.gender} />
            <InfoField label="Province" value={profile.province} />
            <InfoField label="District" value={profile.district} />
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              className="min-h-12 rounded-xl border border-teal-200 bg-white px-5 text-sm font-black text-teal-700 shadow-sm transition hover:bg-teal-50 active:scale-[0.98]"
            >
              Edit Profile
            </button>
            <button
              type="button"
              className="min-h-12 rounded-xl bg-[#08aa9c] px-5 text-sm font-black text-white shadow-lg shadow-teal-700/20 transition hover:bg-[#07998c] active:scale-[0.98]"
            >
              Save Changes
            </button>
          </div>
        </SectionCard>

        <SectionCard eyebrow="Care profile" title="Medical Information">
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoField label="Blood Group" value={medical.bloodGroup} />
            <InfoField label="Height" value={medical.height} />
            <InfoField label="Weight" value={medical.weight} />
            <InfoField
              label="Emergency Contact Name"
              value={medical.emergencyContactName}
            />
            <InfoField
              label="Emergency Contact Number"
              value={medical.emergencyContactNumber}
            />
          </div>
          <div className="mt-4 grid gap-4">
            <ChipField label="Allergies" items={medical.allergies} />
            <ChipField label="Current Medications" items={medical.medications} />
            <ChipField
              label="Chronic Conditions"
              items={medical.chronicConditions}
            />
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
        <SectionCard eyebrow="Care preferences" title="Health Preferences">
          <div className="grid gap-4">
            <InfoField
              label="Preferred Language"
              value={preferences.preferredLanguage}
            />
            <InfoField
              label="Preferred Communication Method"
              value={preferences.communicationMethod}
            />
            <InfoField
              label="Preferred Hospital"
              value={preferences.preferredHospital}
            />
          </div>
        </SectionCard>

        <SectionCard eyebrow="Recent care" title="Activity History">
          <div className="grid gap-3">
            {activities.map((activity) => (
              <article
                key={`${activity.title}-${activity.date}`}
                className="rounded-2xl border border-teal-100 bg-[#fbfdfd] p-4 transition hover:border-teal-300 hover:shadow-lg hover:shadow-teal-900/5"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-teal-700">
                      {activity.category}
                    </p>
                    <h3 className="mt-2 text-lg font-black text-[#0d4050]">
                      {activity.title}
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                      {activity.description}
                    </p>
                  </div>
                  <span className="w-fit rounded-full bg-teal-50 px-3 py-1 text-xs font-black text-teal-700">
                    {activity.date}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard eyebrow="Account security" title="Security">
        <div className="grid gap-4 md:grid-cols-2">
          <SecurityCard
            icon={<LockIcon />}
            title="Change Password"
            description="Update your account password regularly to keep your Mediora profile protected."
            action="Change Password"
          />
          <SecurityCard
            icon={<ShieldIcon />}
            title="Two-Factor Authentication"
            description="Add an extra verification step when this feature is available."
            action="Coming Soon"
            muted
          />
        </div>
      </SectionCard>
    </div>
  );
}
