"use client";

import AdminResourcePage from "../AdminResourcePage";
import { StatusBadge } from "../AdminUI";
import { api } from "../../lib/api";

const defaultForm = {
  name: "",
  province: "",
  district: "",
  city: "",
  address: "",
  phone: "",
  openingHours: "",
  isOpenNow: true,
  is24Hours: false,
  homeDelivery: false,
  rating: 4.5,
};

const fields = [
  { name: "name", label: "Pharmacy Name", required: true },
  { name: "province", label: "Province", required: true },
  { name: "district", label: "District", required: true },
  { name: "city", label: "City", required: true },
  { name: "address", label: "Address", required: true, wide: true },
  { name: "phone", label: "Phone", required: true },
  { name: "openingHours", label: "Opening Hours", required: true },
  { name: "rating", label: "Rating", type: "number", required: true },
  { name: "isOpenNow", label: "Open Now", type: "checkbox" },
  { name: "is24Hours", label: "24 Hours", type: "checkbox" },
  { name: "homeDelivery", label: "Home Delivery", type: "checkbox" },
];

const columns = [
  { key: "name", label: "Pharmacy Name" },
  { key: "district", label: "District" },
  { key: "phone", label: "Phone" },
  {
    key: "isOpenNow",
    label: "Status",
    render: (pharmacy) => (
      <StatusBadge tone={pharmacy.isOpenNow ? "teal" : "amber"}>
        {pharmacy.isOpenNow ? "Open" : "Closed"}
      </StatusBadge>
    ),
  },
];

export default function AdminPharmaciesPage() {
  return (
    <AdminResourcePage
      intro={{
        eyebrow: "Medicine access",
        title: "Pharmacy Management",
        description: "Manage pharmacy listings, districts, and contact numbers from the backend.",
      }}
      columns={columns}
      fields={fields}
      defaultForm={defaultForm}
      emptyMessage="No pharmacies found."
      loadRecords={api.pharmacies}
      createRecord={api.createPharmacy}
      updateRecord={api.updatePharmacy}
      deleteRecord={api.deletePharmacy}
      mapRecordToForm={(record) => ({ ...defaultForm, ...record })}
    />
  );
}
