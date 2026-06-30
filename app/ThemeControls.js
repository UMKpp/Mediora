"use client";

export function notifyPreferenceChange() {
  window.dispatchEvent(new Event("mediora-preferences-change"));
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
