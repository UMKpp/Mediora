import AdminProtectedPage from "../AdminProtectedPage";
import { AdminCard, PageIntro } from "../AdminUI";
import { adminStats, recentActivities } from "../mockData";

export default function AdminDashboardPage() {
  return (
    <AdminProtectedPage>
      <div className="space-y-6">
        <PageIntro
          eyebrow="Platform overview"
          title="Admin Dashboard"
          description="Monitor Mediora platform activity, content, emergency resources, and registered care providers from one admin workspace."
        />

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {adminStats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-3xl border border-teal-100 bg-white p-5 shadow-xl shadow-teal-900/5 transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-2xl hover:shadow-teal-900/10"
            >
              <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-700">
                {stat.label}
              </p>
              <p className="mt-3 text-4xl font-black tracking-tight text-[#0d4050]">
                {stat.value}
              </p>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                {stat.detail}
              </p>
            </article>
          ))}
        </section>

        <AdminCard
          eyebrow="Recent activity"
          title="Activity Feed"
          description="Latest mock administrative actions across the platform."
        >
          <div className="grid gap-3">
            {recentActivities.map((activity) => (
              <article
                key={`${activity.action}-${activity.time}`}
                className="rounded-2xl border border-teal-100 bg-[#fbfdfd] p-4 transition hover:border-teal-300 hover:shadow-lg hover:shadow-teal-900/5"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="text-lg font-black text-[#0d4050]">
                      {activity.action}
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                      {activity.description}
                    </p>
                  </div>
                  <span className="w-fit rounded-full bg-teal-50 px-3 py-1 text-xs font-black text-teal-700">
                    {activity.time}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </AdminCard>
      </div>
    </AdminProtectedPage>
  );
}
