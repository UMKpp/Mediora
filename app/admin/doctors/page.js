"use client";

import AdminResourcePage from "../AdminResourcePage";
import { api } from "../../lib/api";

const defaultForm = {
  name: "",
  specialization: "",
  province: "",
  district: "",
  city: "",
  hospital: "",
  symptoms: "",
  experience: "",
  rating: 4.5,
  availability: "",
  phone: "",
  consultationHours: "",
  languages: "",
};

const fields = [
  { name: "name", label: "Doctor Name", required: true },
  { name: "specialization", label: "Specialization", required: true },
  { name: "province", label: "Province", required: true },
  { name: "district", label: "District", required: true },
  { name: "city", label: "City", required: true },
  { name: "hospital", label: "Hospital", required: true },
  { name: "symptoms", label: "Symptoms", required: true, wide: true },
  { name: "experience", label: "Experience", required: true },
  { name: "rating", label: "Rating", type: "number", required: true },
  { name: "availability", label: "Availability", required: true },
  { name: "phone", label: "Phone", required: true },
  { name: "consultationHours", label: "Consultation Hours", required: true },
  { name: "languages", label: "Languages", required: true },
];

const columns = [
  { key: "name", label: "Doctor Name" },
  { key: "specialization", label: "Specialization" },
  { key: "district", label: "District" },
  { key: "hospital", label: "Hospital" },
];

export default function AdminDoctorsPage() {
  return (
    <AdminResourcePage
      intro={{
        eyebrow: "Care providers",
        title: "Doctor Management",
        description: "Manage doctor profiles, hospital assignments, and specialties from the backend.",
      }}
      columns={columns}
      fields={fields}
      defaultForm={defaultForm}
      emptyMessage="No doctors found."
      loadRecords={api.doctors}
      createRecord={api.createDoctor}
      updateRecord={api.updateDoctor}
      deleteRecord={api.deleteDoctor}
      mapRecordToForm={(record) => ({ ...defaultForm, ...record })}
    />
  );
}
