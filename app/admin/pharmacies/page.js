import AdminProtectedPage from "../AdminProtectedPage";
import { ActionButton, PageIntro, ResponsiveTable } from "../AdminUI";
import { pharmacies } from "../mockData";

const columns = [
  { key: "name", label: "Pharmacy Name" },
  { key: "district", label: "District" },
  { key: "phone", label: "Phone Number" },
];

export default function AdminPharmaciesPage() {
  return (
    <AdminProtectedPage>
      <div className="space-y-6">
        <PageIntro
          eyebrow="Medicine access"
          title="Pharmacy Management"
          description="Manage mock pharmacy listings, districts, and contact numbers."
        />

        <div className="flex justify-end">
          <ActionButton tone="solid">Add Pharmacy</ActionButton>
        </div>

        <ResponsiveTable
          columns={columns}
          rows={pharmacies}
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
