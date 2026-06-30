import { ActionButton, PageIntro, ResponsiveTable } from "../AdminUI";
import { doctors } from "../mockData";

const columns = [
  { key: "name", label: "Doctor Name" },
  { key: "specialization", label: "Specialization" },
  { key: "district", label: "District" },
  { key: "hospital", label: "Hospital" },
];

export default function AdminDoctorsPage() {
  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Care providers"
        title="Doctor Management"
        description="Manage mock doctor profiles, hospital assignments, and specialties."
      />

      <div className="flex justify-end">
        <ActionButton tone="solid">Add Doctor</ActionButton>
      </div>

      <ResponsiveTable
        columns={columns}
        rows={doctors}
        renderActions={() => (
          <>
            <ActionButton>Edit</ActionButton>
            <ActionButton tone="danger">Delete</ActionButton>
          </>
        )}
      />
    </div>
  );
}
