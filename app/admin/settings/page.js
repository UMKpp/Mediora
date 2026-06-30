import AdminProtectedPage from "../AdminProtectedPage";
import { ActionButton, AdminCard, PageIntro } from "../AdminUI";

const videoItems = [
  "Symptom Checker Preview",
  "Doctor Locator Preview",
  "Pharmacy Locator Preview",
  "Emergency Guidance Preview",
];

const landingItems = [
  "Hero headline",
  "Feature card descriptions",
  "Why Mediora section",
  "Footer copyright text",
];

function SettingRow({ label, description, action }) {
  return (
    <article className="rounded-2xl border border-teal-100 bg-[#fbfdfd] p-4 transition hover:border-teal-300 hover:shadow-lg hover:shadow-teal-900/5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h3 className="text-base font-black text-[#0d4050]">{label}</h3>
          <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">
            {description}
          </p>
        </div>
        <div className="shrink-0">{action}</div>
      </div>
    </article>
  );
}

export default function AdminSettingsPage() {
  return (
    <AdminProtectedPage>
      <div className="space-y-6">
        <PageIntro
          eyebrow="Admin controls"
          title="Admin Settings"
          description="Manage mock platform information, featured videos, and landing page content."
        />

        <section className="grid gap-6 xl:grid-cols-3">
          <AdminCard
            eyebrow="Platform"
            title="Update Platform Information"
            description="Frontend-only controls for public platform metadata."
          >
            <div className="grid gap-4">
              <SettingRow
                label="Platform Name"
                description="Mediora healthcare platform branding."
                action={<ActionButton>Edit</ActionButton>}
              />
              <SettingRow
                label="Support Email"
                description="admin-support@mediora.example"
                action={<ActionButton>Edit</ActionButton>}
              />
              <SettingRow
                label="Review Notice"
                description="Emergency information last reviewed June 2026."
                action={<ActionButton>Edit</ActionButton>}
              />
            </div>
          </AdminCard>

          <AdminCard
            eyebrow="Media"
            title="Manage Featured Videos"
            description="Mock controls for the landing page feature preview videos."
          >
            <div className="grid gap-4">
              {videoItems.map((item) => (
                <SettingRow
                  key={item}
                  label={item}
                  description="Assigned to public landing page video preview."
                  action={<ActionButton>Update</ActionButton>}
                />
              ))}
            </div>
          </AdminCard>

          <AdminCard
            eyebrow="Landing"
            title="Manage Landing Page Content"
            description="Mock content controls for homepage sections."
          >
            <div className="grid gap-4">
              {landingItems.map((item) => (
                <SettingRow
                  key={item}
                  label={item}
                  description="Editable content block placeholder."
                  action={<ActionButton>Edit</ActionButton>}
                />
              ))}
            </div>
          </AdminCard>
        </section>
      </div>
    </AdminProtectedPage>
  );
}
