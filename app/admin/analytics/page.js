import AdminProtectedPage from "../AdminProtectedPage";
import { BarChartCard, PageIntro } from "../AdminUI";
import { analytics } from "../mockData";

export default function AdminAnalyticsPage() {
  return (
    <AdminProtectedPage>
      <div className="space-y-6">
        <PageIntro
          eyebrow="Platform insights"
          title="Analytics"
          description="Review mock usage charts for registrations, symptom searches, doctor searches, and pharmacy searches."
        />

        <section className="grid gap-6 lg:grid-cols-2">
          <BarChartCard title="User Registrations" data={analytics.registrations} />
          <BarChartCard title="Most Searched Symptoms" data={analytics.symptoms} />
          <BarChartCard title="Doctor Searches" data={analytics.doctorSearches} />
          <BarChartCard title="Pharmacy Searches" data={analytics.pharmacySearches} />
        </section>
      </div>
    </AdminProtectedPage>
  );
}
