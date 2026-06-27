const provinceDistricts = {
  "Central Province": ["Kandy", "Matale", "Nuwara Eliya"],
  "Eastern Province": ["Ampara", "Batticaloa", "Trincomalee"],
  "North Central Province": ["Anuradhapura", "Polonnaruwa"],
  "North Western Province": ["Kurunegala", "Puttalam"],
  "Northern Province": ["Jaffna", "Kilinochchi", "Mannar", "Mullaitivu", "Vavuniya"],
  "Sabaragamuwa Province": ["Kegalle", "Ratnapura"],
  "Southern Province": ["Galle", "Hambantota", "Matara"],
  "Uva Province": ["Badulla", "Monaragala"],
  "Western Province": ["Colombo", "Gampaha", "Kalutara"],
};

const majorDistricts = [
  "Colombo",
  "Kandy",
  "Galle",
  "Jaffna",
  "Kurunegala",
  "Anuradhapura",
  "Trincomalee",
];

const pharmacyNames = [
  "Mediora Pharmacy",
  "CarePlus Pharmacy",
  "GreenLife Pharmacy",
  "HealthFirst Pharmacy",
  "WellnessCare Pharmacy",
  "CityCare Pharmacy",
  "FamilyHealth Pharmacy",
  "VitalCare Pharmacy",
];

const services = [
  "Prescription medicines",
  "Over-the-counter medicines",
  "Health supplements",
  "Basic first aid supplies",
  "Wellness products",
];

export const provinces = ["All Provinces", ...Object.keys(provinceDistricts)];
export const districts = Object.values(provinceDistricts).flat();
export const districtsByProvince = provinceDistricts;

export const pharmacies = Object.entries(provinceDistricts).flatMap(
  ([province, provinceDistrictsList], provinceIndex) =>
    provinceDistrictsList.flatMap((district, districtIndex) => {
      const count = majorDistricts.includes(district)
        ? 3 + ((provinceIndex + districtIndex) % 2)
        : 2;

      return Array.from({ length: count }, (_, pharmacyIndex) => {
        const nameIndex = (provinceIndex * 6 + districtIndex + pharmacyIndex) % pharmacyNames.length;
        const rating = (4.2 + ((districtIndex + pharmacyIndex) % 7) * 0.1).toFixed(1);
        const is24Hours = pharmacyIndex === 0 && majorDistricts.includes(district);
        const isOpenNow = is24Hours || (districtIndex + pharmacyIndex) % 2 === 0;
        const homeDelivery = (provinceIndex + districtIndex + pharmacyIndex) % 2 === 0;

        return {
          id: `${district.toLowerCase().replaceAll(" ", "-")}-${pharmacyIndex + 1}`,
          name: `${district} ${pharmacyNames[nameIndex]}`,
          province,
          district,
          city: district,
          address: `${24 + pharmacyIndex * 11} Wellness Road, ${district}`,
          phone: `+94 7${(provinceIndex + pharmacyIndex) % 9} ${String(3200000 + provinceIndex * 2400 + districtIndex * 310 + pharmacyIndex * 71).slice(0, 7)}`,
          openingHours: is24Hours ? "Open 24 hours" : "8:00 AM - 10:00 PM",
          isOpenNow,
          is24Hours,
          homeDelivery,
          rating,
          image: "/images/pharmacy.png",
          services,
        };
      });
    })
);
