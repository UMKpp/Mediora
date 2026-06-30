import AdminProtectedPage from "../AdminProtectedPage";
import { ActionButton, PageIntro, ResponsiveTable, StatusBadge } from "../AdminUI";
import { users } from "../mockData";

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  {
    key: "status",
    label: "Status",
    render: (user) => (
      <StatusBadge tone={user.status === "Inactive" ? "danger" : user.status === "Pending" ? "amber" : "teal"}>
        {user.status}
      </StatusBadge>
    ),
  },
];

export default function AdminUsersPage() {
  return (
    <AdminProtectedPage>
      <div className="space-y-6">
        <PageIntro
          eyebrow="People"
          title="User Management"
          description="Review mock patient, doctor, and pharmacy accounts registered in Mediora."
        />

        <ResponsiveTable
          columns={columns}
          rows={users}
          renderActions={() => (
            <>
              <ActionButton>View</ActionButton>
              <ActionButton>Edit</ActionButton>
              <ActionButton tone="danger">Deactivate</ActionButton>
            </>
          )}
        />
      </div>
    </AdminProtectedPage>
  );
}
