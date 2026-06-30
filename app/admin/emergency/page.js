import AdminProtectedPage from "../AdminProtectedPage";
import { ActionButton, PageIntro, ResponsiveTable } from "../AdminUI";
import { emergencyServices } from "../mockData";

const columns = [
  { key: "name", label: "Service Name" },
  { key: "hotline", label: "Hotline" },
  { key: "type", label: "Type" },
];

export default function AdminEmergencyPage() {
  return (
    <AdminProtectedPage>
      <div className="space-y-6">
        <PageIntro
          eyebrow="Emergency operations"
          title="Emergency Services"
          description="Manage mock emergency contacts, hospital information, and hotline numbers."
        />

        <div className="flex justify-end">
          <ActionButton tone="solid">Add New</ActionButton>
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
    </AdminProtectedPage>
  );
}
