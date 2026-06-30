"use client";

import { useEffect } from "react";

function applyPreferences() {
  const root = document.documentElement;
  const textSize = window.localStorage.getItem("medioraTextSize") || "Normal";

  window.localStorage.removeItem("medioraDarkMode");
  root.classList.remove("dark");
  root.classList.remove("mediora-text-large", "mediora-text-extra-large");

  if (textSize === "Large") {
    root.classList.add("mediora-text-large");
  }

  if (textSize === "Extra Large") {
    root.classList.add("mediora-text-extra-large");
  }
}

export default function ThemeProvider({ children }) {
  useEffect(() => {
    applyPreferences();

    function handlePreferenceChange() {
      applyPreferences();
    }

    window.addEventListener("storage", handlePreferenceChange);
    window.addEventListener("mediora-preferences-change", handlePreferenceChange);

    return () => {
      window.removeEventListener("storage", handlePreferenceChange);
      window.removeEventListener("mediora-preferences-change", handlePreferenceChange);
    };
  }, []);

  return children;
}
