"use client";

import { useEffect, useState } from "react";

export function notifyPreferenceChange() {
  window.dispatchEvent(new Event("mediora-preferences-change"));
}

export function ThemeToggle({ compact = false }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setEnabled(window.localStorage.getItem("medioraDarkMode") === "true");
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  function toggleDarkMode() {
    const nextValue = !enabled;
    setEnabled(nextValue);
    window.localStorage.setItem("medioraDarkMode", String(nextValue));
    notifyPreferenceChange();
  }

  return (
    <button
      type="button"
      onClick={toggleDarkMode}
      aria-pressed={enabled}
      aria-label={enabled ? "Switch to light mode" : "Switch to dark mode"}
      className={`inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-teal-100 bg-white px-3 text-sm font-black text-teal-700 shadow-sm transition hover:bg-teal-50 focus:outline-none focus:ring-4 focus:ring-teal-100 active:scale-[0.98] ${
        compact ? "w-11 px-0" : ""
      }`}
    >
      <span aria-hidden="true" className="grid h-5 w-5 place-items-center rounded-full border-2 border-current">
        <span className={`h-2.5 w-2.5 rounded-full ${enabled ? "bg-current" : "bg-transparent"}`} />
      </span>
      {!compact && <span>{enabled ? "Dark" : "Light"}</span>}
    </button>
  );
}

export function TextSizeSelector({ value, onChange }) {
  return (
    <div className="grid gap-2 min-[420px]:grid-cols-3">
      {["Normal", "Large", "Extra Large"].map((size) => {
        const selected = value === size;

        return (
          <button
            key={size}
            type="button"
            onClick={() => onChange(size)}
            aria-pressed={selected}
            className={`min-h-11 rounded-xl border px-4 text-sm font-black transition focus:outline-none focus:ring-4 focus:ring-teal-100 ${
              selected
                ? "border-[#08aa9c] bg-[#08aa9c] text-white shadow-md shadow-teal-700/20"
                : "border-teal-100 bg-white text-slate-600 hover:bg-teal-50 hover:text-teal-700"
            }`}
          >
            {selected ? `${size} selected` : size}
          </button>
        );
      })}
    </div>
  );
}
