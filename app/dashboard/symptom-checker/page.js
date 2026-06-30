"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { api } from "../../lib/api";

const steps = [
  "Select Symptoms",
  "Review Symptoms",
  "Analyze",
  "Results",
];

const categories = ["All", "General", "Respiratory", "Digestive", "Pain", "Skin"];

const symptoms = [
  { name: "Fever", category: "General" },
  { name: "Cough", category: "Respiratory" },
  { name: "Headache", category: "Pain" },
  { name: "Fatigue", category: "General" },
  { name: "Sore throat", category: "Respiratory" },
  { name: "Runny nose", category: "Respiratory" },
  { name: "Body aches", category: "Pain" },
  { name: "Nausea", category: "Digestive" },
  { name: "Vomiting", category: "Digestive" },
  { name: "Dizziness", category: "General" },
  { name: "Shortness of breath", category: "Respiratory" },
  { name: "Chest pain", category: "Pain" },
  { name: "Stomach pain", category: "Digestive" },
  { name: "Skin rash", category: "Skin" },
];

const possibleConditions = [
  {
    name: "Common Cold",
    description:
      "A viral infection affecting the nose and throat. It usually improves within a few days.",
  },
  {
    name: "Flu",
    description:
      "A respiratory illness that may cause fever, fatigue, body aches, and general weakness.",
  },
  {
    name: "Seasonal Allergy",
    description:
      "An immune response to allergens such as pollen or dust, often causing sneezing or a runny nose.",
  },
];

const recommendations = [
  {
    title: "Rest and Recover",
    description: "Get enough sleep and avoid strenuous activities while you monitor your symptoms.",
  },
  {
    title: "Stay Hydrated",
    description: "Drink plenty of water and fluids throughout the day to support recovery.",
  },
  {
    title: "Monitor Symptoms",
    description: "Keep track of symptom changes over the next 24-48 hours.",
  },
  {
    title: "Seek Medical Advice",
    description: "Consult a healthcare professional if symptoms worsen or do not improve.",
  },
];

const urgentSigns = [
  "Severe chest pain",
  "Difficulty breathing",
  "Loss of consciousness",
  "Persistent high fever",
  "Severe dehydration",
];

const analysisCards = [
  {
    title: "Scanning symptoms",
    description: "Matching your symptoms with possible conditions.",
    icon: "/images/search_symptomckpg.png",
  },
  {
    title: "Analyzing patterns",
    description: "Reviewing symptom patterns and health guidance.",
    icon: "/images/shield_symptomckpg.png",
  },
  {
    title: "Generating guidance",
    description: "Preparing personalized recommendations for you.",
    icon: "/images/document_symptomckpg.png",
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

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none">
      <path
        d="m5 12 4 4L19 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoIcon({ className = "h-5 w-5" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 10.5V16M12 7.5h.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AlertIcon({ className = "h-5 w-5" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M12 3 21 19H3L12 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M12 8.5v5M12 16.8h.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LoaderIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 motion-safe:animate-spin"
      fill="none"
    >
      <path
        d="M12 3a9 9 0 1 0 9 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Stepper({ currentStep }) {
  return (
    <div className="grid gap-3 sm:grid-cols-4">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber;
        const isComplete = currentStep > stepNumber;

        return (
          <div
            key={step}
            className={`rounded-2xl border p-3 transition ${
              isActive
                ? "border-teal-300 bg-teal-50 shadow-md shadow-teal-900/5"
                : isComplete
                  ? "border-teal-100 bg-white"
                  : "border-slate-100 bg-white"
            }`}
          >
            <div className="flex min-h-11 items-center gap-3">
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-black ${
                  isActive || isComplete
                    ? "bg-[#08aa9c] text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {isComplete ? <CheckIcon /> : stepNumber}
              </span>
              <span
                className={`text-sm font-black ${
                  isActive ? "text-[#0d4050]" : "text-slate-600"
                }`}
              >
                {step}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function SymptomCheckerPage() {
  const [apiSymptoms, setApiSymptoms] = useState([]);
  const [symptomError, setSymptomError] = useState("");
  const [analysisResults, setAnalysisResults] = useState([]);
  const [analysisError, setAnalysisError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [analysisProgress, setAnalysisProgress] = useState([96, 96, 96]);
  const symptomList = apiSymptoms.length > 0 ? apiSymptoms : symptoms;
  const categoryList = useMemo(
    () => ["All", ...Array.from(new Set(symptomList.map((symptom) => symptom.category)))],
    [symptomList],
  );

  const filteredSymptoms = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return symptomList.filter((symptom) => {
      const matchesSearch = symptom.name.toLowerCase().includes(query);
      const matchesCategory =
        activeCategory === "All" || symptom.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [activeCategory, searchTerm, symptomList]);

  const selectedSymptomDetails = symptomList.filter((symptom) =>
    selectedSymptoms.includes(symptom.name)
  );
  const analysisComplete = analysisProgress.every((progress) => progress === 100);

  useEffect(() => {
    let active = true;

    async function loadSymptoms() {
      try {
        const records = await api.symptoms();
        if (!active) return;
        setApiSymptoms(records);
      } catch (error) {
        if (!active) return;
        setSymptomError("Unable to load backend symptoms. Showing starter symptoms.");
      }
    }

    loadSymptoms();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (currentStep !== 3) {
      return undefined;
    }

    const progressTimer = setInterval(() => {
      setAnalysisProgress((currentProgress) => {
        if (currentProgress.every((progress) => progress === 100)) {
          clearInterval(progressTimer);
          return currentProgress;
        }

        return currentProgress.map((progress) => Math.min(progress + 1, 100));
      });
    }, 260);

    return () => clearInterval(progressTimer);
  }, [currentStep]);

  function toggleSymptom(symptomName) {
    setSelectedSymptoms((current) =>
      current.includes(symptomName)
        ? current.filter((name) => name !== symptomName)
        : [...current, symptomName]
    );
  }

  async function startAnalysis() {
    setAnalysisProgress([96, 96, 96]);
    setAnalysisError("");
    setCurrentStep(3);

    try {
      const results = await api.analyzeSymptoms({ symptomNames: selectedSymptoms });
      setAnalysisResults(results);
    } catch (error) {
      setAnalysisError("Unable to analyze symptoms with the backend right now.");
      setAnalysisResults([]);
    }
  }

  function startNewCheck() {
    setCurrentStep(1);
    setSearchTerm("");
    setActiveCategory("All");
    setSelectedSymptoms([]);
    setAnalysisResults([]);
    setAnalysisError("");
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

        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-700">
              Step {currentStep} of 4
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-[#0d4050] sm:text-4xl">
              Symptom Checker
            </h1>
            <p className="mt-4 text-base font-medium leading-7 text-slate-600">
              Select your symptoms and get basic health guidance.
            </p>
          </div>
          <div className="rounded-2xl bg-teal-50 px-4 py-3 text-sm font-black text-teal-800">
            {steps[currentStep - 1]}
          </div>
        </div>

        <div className="mt-7">
          <Stepper currentStep={currentStep} />
        </div>
      </section>

      {currentStep === 1 && (
        <section className="rounded-3xl border border-teal-100 bg-white p-6 shadow-xl shadow-teal-900/5 sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-2xl font-black text-[#0d4050]">
                Select Symptoms
              </h2>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                Choose one or more symptoms that best match how you feel.
              </p>
            </div>
            <div className="text-sm font-black text-teal-700">
              {selectedSymptoms.length} selected
            </div>
          </div>

          <div className="mt-6">
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search symptoms..."
              className="min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-base font-medium text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {categoryList.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`min-h-11 rounded-xl border px-4 text-sm font-black transition focus:outline-none focus:ring-4 focus:ring-teal-100 ${
                  activeCategory === category
                    ? "border-[#08aa9c] bg-[#08aa9c] text-white shadow-md shadow-teal-700/20"
                    : "border-teal-100 bg-white text-slate-600 hover:bg-teal-50 hover:text-teal-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredSymptoms.map((symptom) => {
              const isSelected = selectedSymptoms.includes(symptom.name);

              return (
                <button
                  key={symptom.name}
                  type="button"
                  onClick={() => toggleSymptom(symptom.name)}
                  className={`flex min-h-24 items-start gap-4 rounded-2xl border p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-lg hover:shadow-teal-900/5 active:scale-[0.98] ${
                    isSelected
                      ? "border-teal-400 bg-teal-50"
                      : "border-slate-100 bg-white"
                  }`}
                  aria-pressed={isSelected}
                >
                  <span
                    className={`mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-lg border ${
                      isSelected
                        ? "border-[#08aa9c] bg-[#08aa9c] text-white"
                        : "border-slate-300 bg-white text-transparent"
                    }`}
                  >
                    <CheckIcon />
                  </span>
                  <span>
                    <span className="block text-base font-black text-slate-950">
                      {symptom.name}
                    </span>
                    <span className="mt-2 inline-flex rounded-full bg-slate-50 px-3 py-1 text-xs font-black text-slate-500">
                      {symptom.category}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {filteredSymptoms.length === 0 && (
            <div className="mt-6 rounded-2xl border border-dashed border-teal-200 bg-teal-50/50 p-5 text-sm font-bold text-teal-800">
              No symptoms match your search.
            </div>
          )}

          {symptomError && (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm font-bold text-amber-900">
              {symptomError}
            </div>
          )}

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setSelectedSymptoms([])}
              disabled={selectedSymptoms.length === 0}
              className="min-h-12 rounded-xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-600 shadow-sm transition hover:bg-slate-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              Clear All
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              disabled={selectedSymptoms.length === 0}
              className="min-h-12 rounded-xl bg-[#08aa9c] px-5 text-sm font-black text-white shadow-lg shadow-teal-700/20 transition hover:bg-[#07998c] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none sm:w-auto"
            >
              Continue
            </button>
          </div>
        </section>
      )}

      {currentStep === 2 && (
        <section className="rounded-3xl border border-teal-100 bg-white p-6 shadow-xl shadow-teal-900/5 sm:p-8">
          <h2 className="text-2xl font-black text-[#0d4050]">
            Review Symptoms
          </h2>
          <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
            Confirm your selected symptoms before Mediora prepares mock guidance.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {selectedSymptomDetails.map((symptom) => (
              <span
                key={symptom.name}
                className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-teal-200 bg-teal-50 px-4 text-sm font-black text-teal-800"
              >
                <CheckIcon />
                {symptom.name}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="min-h-12 rounded-xl border border-teal-200 bg-white px-5 text-sm font-black text-teal-700 shadow-sm transition hover:bg-teal-50 active:scale-[0.98]"
            >
              Edit Selection
            </button>
            <button
              type="button"
              onClick={startAnalysis}
              className="min-h-12 rounded-xl bg-[#08aa9c] px-5 text-sm font-black text-white shadow-lg shadow-teal-700/20 transition hover:bg-[#07998c] active:scale-[0.98]"
            >
              Analyze Symptoms
            </button>
          </div>
        </section>
      )}

      {currentStep === 3 && (
        <section className="rounded-3xl border border-teal-100 bg-white p-6 shadow-xl shadow-teal-900/5 sm:p-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-black text-[#0d4050]">
              Analyzing your symptoms
            </h2>
            <p className="mt-3 text-base font-medium leading-7 text-slate-600">
              Mediora is checking possible guidance based on your selected symptoms.
            </p>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {analysisCards.map((card, index) => {
              const isComplete = analysisProgress[index] === 100;
              const isLoading = !isComplete;

              return (
                <div
                  key={card.title}
                  className="analysis-live-card rounded-3xl border border-teal-100 bg-teal-50/70 p-6 shadow-xl shadow-teal-900/5"
                  style={{ "--analysis-delay": `${index * 120}ms` }}
                >
                  <div className="flex justify-center">
                    <div className="relative grid h-28 w-28 place-items-center">
                      <span className="absolute inset-0 rounded-full border-2 border-teal-100" />
                      <span
                        className={`absolute inset-1 rounded-full border-2 border-transparent border-t-[#08aa9c] border-r-[#08aa9c] ${
                          isLoading ? "analysis-ring-spin" : ""
                        }`}
                      />
                      <span className="absolute left-3 top-5 h-2.5 w-2.5 rounded-full bg-teal-400 motion-safe:animate-pulse" />
                      <span className="absolute right-4 top-7 h-2 w-2 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
                      <span className="absolute bottom-4 left-7 h-2 w-2 rounded-full bg-cyan-400 motion-safe:animate-pulse" />
                      <span
                        className={`grid h-16 w-16 place-items-center rounded-2xl bg-white text-teal-700 shadow-lg transition ${
                          isComplete
                            ? "shadow-teal-700/20 ring-4 ring-teal-100"
                            : "shadow-teal-900/10 motion-safe:animate-pulse"
                        }`}
                      >
                        {isComplete ? (
                          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#08aa9c] text-white">
                            <CheckIcon />
                          </span>
                        ) : (
                          <Image
                            src={card.icon}
                            alt=""
                            width={42}
                            height={42}
                            className="h-10 w-10 object-contain"
                          />
                        )}
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-5 text-center text-xl font-black text-[#0d4050]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-center text-sm font-semibold leading-6 text-slate-600">
                    {card.description}
                  </p>

                  <div className="mt-6">
                    <div className="flex items-center justify-between text-xs font-black text-teal-800">
                      <span>{isComplete ? "Complete" : "Progress"}</span>
                      <span>{analysisProgress[index]}%</span>
                    </div>
                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white">
                      <div
                        className="h-full rounded-full bg-[#08aa9c] transition-all duration-200 ease-out"
                        style={{ width: `${analysisProgress[index]}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            aria-live="polite"
            className="mt-6 flex min-h-11 items-center justify-center gap-3 rounded-2xl bg-teal-50 px-4 text-sm font-black text-teal-800"
          >
            {analysisComplete ? (
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[#08aa9c] text-white">
                <CheckIcon />
              </span>
            ) : (
              <LoaderIcon />
            )}
            <span>
              {analysisComplete
                ? "Analysis complete. You can now view your results."
                : "This may take a few seconds. Please wait..."}
            </span>
          </div>

          <div className="mt-7 flex justify-end">
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              disabled={!analysisComplete}
              className={`min-h-12 w-full rounded-xl px-5 text-sm font-black transition sm:w-auto ${
                analysisComplete
                  ? "bg-[#08aa9c] text-white shadow-lg shadow-teal-700/20 hover:bg-[#07998c] active:scale-[0.98]"
                  : "cursor-not-allowed bg-slate-200 text-slate-500 shadow-none"
              }`}
            >
              {analysisComplete ? "View Results" : "Analyzing..."}
            </button>
          </div>
        </section>
      )}

      {currentStep === 4 && (
        <section className="space-y-5">
          <div className="rounded-3xl border border-teal-100 bg-white p-6 shadow-xl shadow-teal-900/5 sm:p-8">
            <div className="grid gap-5 lg:grid-cols-[1.35fr_0.9fr]">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-700">
                  Results
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0d4050]">
                  Here&apos;s what we found
                </h2>
                <p className="mt-4 text-lg font-medium leading-8 text-slate-600">
              Based on the symptoms you selected, Mediora checked backend condition
                  data and prepared the guidance below.
                </p>
                <p className="mt-4 rounded-2xl bg-teal-50 p-4 text-base font-bold leading-7 text-teal-800">
                  This is general health guidance only and not a medical
                  diagnosis.
                </p>
              </div>

              <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-100 text-amber-700">
                    <InfoIcon />
                  </span>
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.18em] text-amber-700">
                      Risk Level
                    </p>
                    <h3 className="mt-2 text-2xl font-black text-amber-900">
                      {analysisResults[0]?.riskLevel || "Low to Moderate"}
                    </h3>
                    <p className="mt-3 text-base font-semibold leading-7 text-amber-900">
                      {analysisResults[0]?.recommendation ||
                        "Your symptoms do not currently indicate an emergency, but monitoring your condition is recommended."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {analysisError && (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-5 text-sm font-black text-red-700 shadow-xl shadow-red-900/5">
              {analysisError}
            </div>
          )}

          <div className="rounded-3xl border border-teal-100 bg-white p-6 shadow-xl shadow-teal-900/5 sm:p-8">
            <h3 className="text-2xl font-black text-[#0d4050]">
              Possible Conditions
            </h3>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {(analysisResults.length > 0
                ? analysisResults.map((result) => ({
                    name: result.conditionName,
                    description: result.recommendation,
                  }))
                : possibleConditions
              ).map((condition) => (
                <article
                  key={condition.name}
                  className="rounded-2xl border border-teal-100 bg-[#fbfdfd] p-5 shadow-sm transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl hover:shadow-teal-900/10"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-teal-50 text-teal-700">
                    <CheckIcon />
                  </span>
                  <h4 className="mt-4 text-xl font-black text-slate-950">
                    {condition.name}
                  </h4>
                  <p className="mt-3 text-base font-medium leading-7 text-slate-600">
                    {condition.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-teal-100 bg-white p-6 shadow-xl shadow-teal-900/5 sm:p-8">
            <h3 className="text-2xl font-black text-[#0d4050]">
              Recommendations
            </h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {(analysisResults.length > 0
                ? analysisResults.slice(0, 4).map((result) => ({
                    title: result.conditionName,
                    description: result.recommendation,
                  }))
                : recommendations
              ).map((recommendation) => (
                <article
                  key={recommendation.title}
                  className="rounded-2xl border border-teal-100 bg-[#fbfdfd] p-5 shadow-sm transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl hover:shadow-teal-900/10"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-teal-50 text-teal-700">
                    <InfoIcon />
                  </span>
                  <h4 className="mt-4 text-lg font-black text-slate-950">
                    {recommendation.title}
                  </h4>
                  <p className="mt-3 text-base font-medium leading-7 text-slate-600">
                    {recommendation.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-red-200 bg-red-50 p-6 shadow-xl shadow-red-900/5 sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-red-100 text-red-700">
                  <AlertIcon />
                </span>
                <div>
                  <h3 className="text-2xl font-black text-red-950">
                    When should I seek immediate medical help?
                  </h3>
                  <p className="mt-3 text-base font-bold leading-7 text-red-900">
                    Seek urgent medical attention if you experience:
                  </p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[420px]">
                {urgentSigns.map((sign) => (
                  <div
                    key={sign}
                    className="flex min-h-11 items-center gap-3 rounded-xl bg-white px-4 text-sm font-black text-red-900 shadow-sm"
                  >
                    <AlertIcon className="h-4 w-4" />
                    {sign}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-teal-100 bg-white p-6 shadow-xl shadow-teal-900/5 sm:p-8">
            <h3 className="text-2xl font-black text-[#0d4050]">
              Recommended Next Steps
            </h3>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <Link
                href="/dashboard/doctors"
                className="group rounded-2xl border border-teal-100 bg-[#fbfdfd] p-5 shadow-sm transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl hover:shadow-teal-900/10 active:scale-[0.98]"
              >
                <h4 className="text-xl font-black text-slate-950">
                  Find a Doctor
                </h4>
                <p className="mt-3 text-base font-medium leading-7 text-slate-600">
                  Locate healthcare professionals near you.
                </p>
                <span className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-teal-200 bg-white px-4 text-sm font-black text-teal-700 transition group-hover:bg-teal-50">
                  Open Doctors
                </span>
              </Link>
              <Link
                href="/dashboard/pharmacies"
                className="group rounded-2xl border border-teal-100 bg-[#fbfdfd] p-5 shadow-sm transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl hover:shadow-teal-900/10 active:scale-[0.98]"
              >
                <h4 className="text-xl font-black text-slate-950">
                  Find a Pharmacy
                </h4>
                <p className="mt-3 text-base font-medium leading-7 text-slate-600">
                  Search nearby pharmacies for medications.
                </p>
                <span className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-teal-200 bg-white px-4 text-sm font-black text-teal-700 transition group-hover:bg-teal-50">
                  Open Pharmacies
                </span>
              </Link>
              <button
                type="button"
                onClick={startNewCheck}
                className="group rounded-2xl border border-teal-100 bg-[#fbfdfd] p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl hover:shadow-teal-900/10 active:scale-[0.98]"
              >
                <h4 className="text-xl font-black text-slate-950">
                  Start a New Check
                </h4>
                <p className="mt-3 text-base font-medium leading-7 text-slate-600">
                  Begin another symptom assessment.
                </p>
                <span className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-teal-200 bg-white px-4 text-sm font-black text-teal-700 transition group-hover:bg-teal-50">
                  Start Again
                </span>
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-teal-100 bg-teal-50 p-6 text-lg font-bold leading-8 text-[#0d4050] shadow-sm sm:p-8">
            Take care and continue monitoring your health. If you are concerned
            about your symptoms, please consult a qualified healthcare
            professional.
          </div>
        </section>
      )}

      <aside className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm font-bold leading-6 text-amber-900 shadow-sm">
        This symptom checker provides general health guidance only and does not
        provide a medical diagnosis. Please consult a qualified healthcare
        professional for medical advice.
      </aside>
    </div>
  );
}
