"use client";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function getToken() {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem("medioraAuthToken") || "";
}

export async function apiRequest(path, options = {}) {
  const token = options.token ?? getToken();
  const headers = {
    Accept: "application/json",
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
      body:
        options.body && typeof options.body !== "string"
          ? JSON.stringify(options.body)
          : options.body,
    });
  } catch {
    throw new ApiError(
      `Cannot reach the Mediora API at ${API_BASE_URL}. Please start the backend server and try again.`,
      0
    );
  }

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new ApiError(data?.message || "Something went wrong. Please try again.", response.status);
  }

  return data;
}

export const api = {
  register: (payload) => apiRequest("/auth/register", { method: "POST", body: payload }),
  login: (identifier, password) =>
    apiRequest("/auth/login", { method: "POST", body: { identifier, password } }),
  doctors: () => apiRequest("/doctors"),
  pharmacies: () => apiRequest("/pharmacies"),
  emergencyServices: () => apiRequest("/emergency-services"),
  symptoms: () => apiRequest("/symptoms"),
  analyzeSymptoms: (payload) =>
    apiRequest("/symptom-checker/analyze", { method: "POST", body: payload }),
  createDoctor: (payload) => apiRequest("/doctors", { method: "POST", body: payload }),
  updateDoctor: (id, payload) => apiRequest(`/doctors/${id}`, { method: "PUT", body: payload }),
  deleteDoctor: (id) => apiRequest(`/doctors/${id}`, { method: "DELETE" }),
  createPharmacy: (payload) => apiRequest("/pharmacies", { method: "POST", body: payload }),
  updatePharmacy: (id, payload) => apiRequest(`/pharmacies/${id}`, { method: "PUT", body: payload }),
  deletePharmacy: (id) => apiRequest(`/pharmacies/${id}`, { method: "DELETE" }),
  createEmergencyService: (payload) =>
    apiRequest("/emergency-services", { method: "POST", body: payload }),
  updateEmergencyService: (id, payload) =>
    apiRequest(`/emergency-services/${id}`, { method: "PUT", body: payload }),
  deleteEmergencyService: (id) => apiRequest(`/emergency-services/${id}`, { method: "DELETE" }),
};
