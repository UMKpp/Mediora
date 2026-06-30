"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { notifyPreferenceChange, TextSizeSelector } from "../../ThemeControls";

const initialSettings = {
  simpleMode: false,
  textSize: "Normal",
  highContrast: false,
  emailAlerts: true,
  emergencyReminders: true,
  healthTips: false,
  dataSharing: false,
};

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

function SettingsIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-8 w-8" fill="none">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 3.5v2M12 18.5v2M4.6 7.8l1.7 1M17.7 15.2l1.7 1M4.6 16.2l1.7-1M17.7 8.8l1.7-1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SectionCard({ eyebrow, title, description, children, className = "" }) {
  return (
    <section
      className={`rounded-3xl border border-teal-100 bg-white p-5 shadow-xl shadow-teal-900/5 sm:p-6 ${className}`}
    >
      <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-700">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-tight text-[#0d4050]">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
          {description}
        </p>
      )}
      <div className="mt-5 grid gap-4">{children}</div>
    </section>
  );
}

function ToggleRow({ label, description, checked, onChange }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-teal-100 bg-[#fbfdfd] p-4 transition hover:border-teal-300 hover:shadow-lg hover:shadow-teal-900/5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h3 className="text-base font-black text-[#0d4050]">{label}</h3>
        <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">
          {description}
        </p>
      </div>
      <button
        type="button"
        onClick={onChange}
        aria-pressed={checked}
        className={`relative h-9 w-16 shrink-0 rounded-full transition focus:outline-none focus:ring-4 focus:ring-teal-100 ${
          checked ? "bg-[#08aa9c]" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 h-7 w-7 rounded-full bg-white shadow-md transition ${
            checked ? "left-8" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function ActionCard({ title, description, buttonText, tone = "teal" }) {
  const isDanger = tone === "danger";

  return (
    <article className="flex h-full flex-col rounded-2xl border border-teal-100 bg-[#fbfdfd] p-4 transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl hover:shadow-teal-900/10">
      <div>
        <h3 className="text-base font-black text-[#0d4050]">{title}</h3>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
          {description}
        </p>
      </div>
      <button
        type="button"
        className={`mt-5 min-h-11 rounded-xl px-4 text-sm font-black shadow-sm transition active:scale-[0.98] ${
          isDanger
            ? "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
            : "border border-teal-200 bg-white text-teal-700 hover:bg-teal-50"
        }`}
      >
        {buttonText}
      </button>
    </article>
  );
}

export default function SettingsPage() {
  const [settings, setSettings] = useState(initialSettings);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const storedTextSize = window.localStorage.getItem("medioraTextSize");

      if (storedTextSize) {
        setSettings((current) => ({
          ...current,
          textSize: storedTextSize,
        }));
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  function updateSetting(key, value) {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));

    if (key === "textSize") {
      window.localStorage.setItem("medioraTextSize", value);
      notifyPreferenceChange();
    }
  }

  function toggleSetting(key) {
    setSettings((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-teal-100 bg-white p-5 shadow-xl shadow-teal-900/5 sm:p-6">
        <Link
          href="/dashboard"
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-teal-100 bg-white px-4 text-sm font-black text-teal-700 shadow-sm transition hover:bg-teal-50 active:scale-[0.98]"
        >
          <ArrowLeftIcon />
          Back to Dashboard
        </Link>

        <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-3xl bg-teal-50 text-teal-700">
            <SettingsIcon />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-700">
              Dashboard preferences
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-[#0d4050] sm:text-4xl">
              Settings
            </h1>
            <p className="mt-3 max-w-3xl text-base font-semibold leading-7 text-slate-600">
              Manage account preferences, accessibility, notifications, privacy,
              and security options for your Mediora dashboard.
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <SectionCard
          eyebrow="Account"
          title="Account Settings"
          description="Review the account connected to this dashboard."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-teal-100 bg-[#fbfdfd] p-4">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-teal-700">
                Account Name
              </p>
              <p className="mt-2 text-base font-bold text-slate-800">
                Mihira Upul
              </p>
            </div>
            <div className="rounded-2xl border border-teal-100 bg-[#fbfdfd] p-4">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-teal-700">
                Account Email
              </p>
              <p className="mt-2 text-base font-bold text-slate-800">
                mihira.upul@example.com
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/profile"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#08aa9c] px-5 text-sm font-black text-white shadow-lg shadow-teal-700/20 transition hover:bg-[#07998c] active:scale-[0.98]"
          >
            Open Profile
          </Link>
        </SectionCard>

        <SectionCard
          eyebrow="Accessibility"
          title="Accessibility Settings"
          description="Adjust the dashboard for clearer reading and simpler scanning."
        >
          <ToggleRow
            label="Simple Mode"
            description="Reduce visual density and make key actions easier to scan."
            checked={settings.simpleMode}
            onChange={() => toggleSetting("simpleMode")}
          />
          <div className="rounded-2xl border border-teal-100 bg-[#fbfdfd] p-4">
            <h3 className="text-base font-black text-[#0d4050]">Text Size</h3>
            <div className="mt-3">
              <TextSizeSelector
                value={settings.textSize}
                onChange={(size) => updateSetting("textSize", size)}
              />
            </div>
          </div>
          <ToggleRow
            label="High Contrast Mode"
            description="Increase contrast for stronger visual separation."
            checked={settings.highContrast}
            onChange={() => toggleSetting("highContrast")}
          />
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <SectionCard
          eyebrow="Notifications"
          title="Notification Preferences"
          description="Choose which Mediora updates should reach you."
        >
          <ToggleRow
            label="Email Alerts"
            description="Receive account and health tool alerts by email."
            checked={settings.emailAlerts}
            onChange={() => toggleSetting("emailAlerts")}
          />
          <ToggleRow
            label="Emergency Reminders"
            description="Keep emergency contact guidance visible when needed."
            checked={settings.emergencyReminders}
            onChange={() => toggleSetting("emergencyReminders")}
          />
          <ToggleRow
            label="Health Tips"
            description="Receive occasional wellness and care planning tips."
            checked={settings.healthTips}
            onChange={() => toggleSetting("healthTips")}
          />
        </SectionCard>

        <SectionCard
          eyebrow="Privacy"
          title="Privacy Settings"
          description="Control mock privacy preferences for this frontend."
        >
          <ToggleRow
            label="Data Sharing Preference"
            description="Allow Mediora to use profile details for future personalized suggestions."
            checked={settings.dataSharing}
            onChange={() => toggleSetting("dataSharing")}
          />
          <ActionCard
            title="Delete Account"
            description="Request account deletion when backend account management is available."
            buttonText="Delete Account"
            tone="danger"
          />
        </SectionCard>

        <SectionCard
          eyebrow="Security"
          title="Security Settings"
          description="Manage mock security actions for your account."
        >
          <ActionCard
            title="Change Password"
            description="Update your password regularly to keep your account protected."
            buttonText="Change Password"
          />
          <ActionCard
            title="Logout From All Devices"
            description="End other active sessions once device management is connected."
            buttonText="Logout From All Devices"
          />
        </SectionCard>
      </div>
    </div>
  );
}
