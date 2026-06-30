"use client";

import AdminResourcePage from "../AdminResourcePage";
import { api } from "../../lib/api";

const defaultForm = {
  serviceName: "",
  hotline: "",
  serviceType: "",
  description: "",
  email: "",
  isUrgent: true,
};

const fields = [
  { name: "serviceName", label: "Service Name", required: true },
  { name: "hotline", label: "Hotline", required: true },
  { name: "serviceType", label: "Type", required: true },
  { name: "description", label: "Description", required: true, wide: true },
  { name: "email", label: "Email" },
  { name: "isUrgent", label: "Urgent", type: "checkbox" },
];

const columns = [
  { key: "serviceName", label: "Service Name" },
  { key: "hotline", label: "Hotline" },
  { key: "serviceType", label: "Type" },
];

export default function AdminEmergencyPage() {
  return (
    <AdminResourcePage
      intro={{
        eyebrow: "Emergency operations",
        title: "Emergency Services",
        description: "Manage emergency contacts, hospital information, and hotline numbers from the backend.",
      }}
      columns={columns}
      fields={fields}
      defaultForm={defaultForm}
      emptyMessage="No emergency services found."
      loadRecords={api.emergencyServices}
      createRecord={api.createEmergencyService}
      updateRecord={api.updateEmergencyService}
      deleteRecord={api.deleteEmergencyService}
      mapRecordToForm={(record) => ({ ...defaultForm, ...record })}
    />
  );
}
