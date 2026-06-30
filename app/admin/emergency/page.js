import { ActionButton, PageIntro, ResponsiveTable } from "../AdminUI";
import { emergencyServices } from "../mockData";

const columns = [
  { key: "name", label: "Service / Hospital" },
  { key: "type", label: "Type" },
  { key: "hotline", label: "Hotline Number" },
  { key: "coverage", label: "Coverage" },
];

export default function AdminEmergencyPage() {
  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Emergency operations"
        title="Emergency Services"
        description="Manage mock emergency contacts, hospital information, and hotline numbers."
      />

      <div className="flex justify-end">
        <ActionButton tone="solid">Add</ActionButton>
      </div>

      <ResponsiveTable
        columns={columns}
        rows={emergencyServices}
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
