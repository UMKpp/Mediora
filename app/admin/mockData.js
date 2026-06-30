export const adminStats = [
  { label: "Total Users", value: "1,245", detail: "128 active this week" },
  { label: "Registered Doctors", value: "96", detail: "12 pending review" },
  { label: "Registered Pharmacies", value: "74", detail: "8 open 24 hours" },
  { label: "Emergency Contacts", value: "18", detail: "5 national hotlines" },
];

export const recentActivities = [
  {
    action: "User registered",
    description: "New patient account created for an urban clinic referral.",
    time: "10 minutes ago",
  },
  {
    action: "Doctor added",
    description: "General physician profile submitted for Colombo district.",
    time: "42 minutes ago",
  },
  {
    action: "Pharmacy updated",
    description: "Opening hours changed for City Health Pharmacy.",
    time: "Today",
  },
  {
    action: "Emergency contact modified",
    description: "National mental health helpline details reviewed.",
    time: "Yesterday",
  },
];

export const users = [
  {
    name: "Mihira Upul",
    email: "mihira.upul@example.com",
    role: "Patient",
    status: "Active",
  },
  {
    name: "Anjali Perera",
    email: "anjali.perera@example.com",
    role: "Patient",
    status: "Active",
  },
  {
    name: "Dr. Nuwan Silva",
    email: "nuwan.silva@example.com",
    role: "Doctor",
    status: "Pending",
  },
  {
    name: "City Health Pharmacy",
    email: "admin@cityhealth.lk",
    role: "Pharmacy",
    status: "Active",
  },
  {
    name: "Kasun Fernando",
    email: "kasun.fernando@example.com",
    role: "Patient",
    status: "Inactive",
  },
];

export const doctors = [
  {
    name: "Dr. Nuwan Silva",
    specialization: "General Physician",
    district: "Colombo",
    hospital: "National Hospital of Colombo",
  },
  {
    name: "Dr. Amara Jayasinghe",
    specialization: "Cardiologist",
    district: "Kandy",
    hospital: "Kandy General Hospital",
  },
  {
    name: "Dr. Harini Fernando",
    specialization: "Dermatologist",
    district: "Galle",
    hospital: "Karapitiya Teaching Hospital",
  },
  {
    name: "Dr. Isuru Wijeratne",
    specialization: "Pediatrician",
    district: "Gampaha",
    hospital: "District General Hospital Gampaha",
  },
];

export const pharmacies = [
  {
    name: "City Health Pharmacy",
    district: "Colombo",
    phone: "011 245 7788",
  },
  {
    name: "Green Cross Pharmacy",
    district: "Kandy",
    phone: "081 223 4455",
  },
  {
    name: "MediQuick Pharmacy",
    district: "Galle",
    phone: "091 224 1880",
  },
  {
    name: "CarePlus Pharmacy",
    district: "Gampaha",
    phone: "033 224 7781",
  },
];

export const emergencyServices = [
  {
    name: "Sri Lanka Police",
    type: "Emergency contact",
    hotline: "119",
    coverage: "National",
  },
  {
    name: "Suwa Seriya Ambulance",
    type: "Hotline number",
    hotline: "1990",
    coverage: "Island-wide",
  },
  {
    name: "Fire & Rescue Service",
    type: "Emergency contact",
    hotline: "110",
    coverage: "National",
  },
  {
    name: "National Hospital Accident Service",
    type: "Hospital information",
    hotline: "011 269 1111",
    coverage: "Colombo",
  },
];

export const analytics = {
  registrations: [
    { label: "Jan", value: 120 },
    { label: "Feb", value: 168 },
    { label: "Mar", value: 210 },
    { label: "Apr", value: 255 },
    { label: "May", value: 318 },
    { label: "Jun", value: 374 },
  ],
  symptoms: [
    { label: "Fever", value: 82 },
    { label: "Headache", value: 68 },
    { label: "Cough", value: 56 },
    { label: "Chest Pain", value: 34 },
  ],
  doctorSearches: [
    { label: "General", value: 96 },
    { label: "Cardiology", value: 54 },
    { label: "Pediatric", value: 42 },
    { label: "Dermatology", value: 38 },
  ],
  pharmacySearches: [
    { label: "Colombo", value: 92 },
    { label: "Kandy", value: 61 },
    { label: "Galle", value: 45 },
    { label: "Gampaha", value: 39 },
  ],
};
