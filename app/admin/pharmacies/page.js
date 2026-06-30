import AdminProtectedPage from "../AdminProtectedPage";
import { ActionButton, PageIntro, ResponsiveTable, StatusBadge } from "../AdminUI";
import { pharmacies } from "../mockData";

const columns = [
  { key: "name", label: "Pharmacy Name" },
  { key: "district", label: "District" },
  { key: "phone", label: "Phone" },
  {
    key: "status",
    label: "Status",
    render: (pharmacy) => (
      <StatusBadge tone={pharmacy.status === "Pending" ? "amber" : "teal"}>
        {pharmacy.status}
      </StatusBadge>
    ),
  },
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
          <ActionButton tone="solid">Add New</ActionButton>
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
