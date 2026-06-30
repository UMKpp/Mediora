"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import AdminProtectedPage from "./AdminProtectedPage";
import { ActionButton, PageIntro, ResponsiveTable } from "./AdminUI";

export default function AdminResourcePage({
  intro,
  columns,
  emptyMessage,
  loadRecords,
  createRecord,
  updateRecord,
  deleteRecord,
  fields,
  defaultForm,
  mapRecordToForm = (record) => record,
}) {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [editing, setEditing] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const formTitle = editing ? "Edit record" : "Add new record";

  const refreshRecords = useCallback(async ({ quiet = false } = {}) => {
    if (!quiet) setIsLoading(true);
    setStatus("");

    try {
      const data = await loadRecords();
      setRecords(data);
    } catch (error) {
      setStatus(emptyMessage || "Unable to load records.");
      setRecords([]);
    } finally {
      setIsLoading(false);
    }
  }, [emptyMessage, loadRecords]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      refreshRecords({ quiet: true });
    }, 0);

    return () => window.clearTimeout(timer);
  }, [refreshRecords]);

  const requiredFields = useMemo(
    () => fields.filter((field) => field.required).map((field) => field.name),
    [fields],
  );

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setStatus("");
  }

  function validate() {
    const nextErrors = {};
    requiredFields.forEach((field) => {
      if (String(form[field] ?? "").trim() === "") {
        nextErrors[field] = "This field is required.";
      }
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) return;

    setIsSaving(true);
    setStatus("");

    try {
      if (editing) {
        await updateRecord(editing.id, form);
        setStatus("Record updated successfully.");
      } else {
        await createRecord(form);
        setStatus("Record added successfully.");
      }
      setForm(defaultForm);
      setEditing(null);
      await refreshRecords();
    } catch (error) {
      setStatus(error.message || "Unable to save this record.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(record) {
    setStatus("");
    try {
      await deleteRecord(record.id);
      setStatus("Record deleted successfully.");
      await refreshRecords();
    } catch (error) {
      setStatus(error.message || "Unable to delete this record.");
    }
  }

  function startEdit(record) {
    setEditing(record);
    setForm(mapRecordToForm(record));
    setErrors({});
    setStatus("");
  }

  function resetForm() {
    setEditing(null);
    setForm(defaultForm);
    setErrors({});
  }

  return (
    <AdminProtectedPage>
      <div className="space-y-6">
        <PageIntro {...intro} />

        <section className="rounded-3xl border border-teal-100 bg-white p-5 shadow-xl shadow-teal-900/5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-700">
                Backend form
              </p>
              <h2 className="mt-2 text-2xl font-black text-[#0d4050]">{formTitle}</h2>
            </div>
            {editing && <ActionButton onClick={resetForm}>Cancel edit</ActionButton>}
          </div>

          <form className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3" onSubmit={handleSubmit}>
            {fields.map((field) => (
              <label key={field.name} className={field.wide ? "md:col-span-2 xl:col-span-3" : "block"}>
                <span className="text-sm font-black text-slate-900">{field.label}</span>
                {field.type === "checkbox" ? (
                  <span className="mt-2 flex min-h-12 items-center gap-3 rounded-xl border border-teal-100 bg-teal-50 px-4 text-sm font-black text-teal-800">
                    <input
                      type="checkbox"
                      checked={Boolean(form[field.name])}
                      onChange={(event) => updateField(field.name, event.target.checked)}
                      className="h-5 w-5 rounded border-teal-300"
                    />
                    Enabled
                  </span>
                ) : (
                  <input
                    type={field.type || "text"}
                    value={form[field.name] ?? ""}
                    onChange={(event) =>
                      updateField(
                        field.name,
                        field.type === "number" ? Number(event.target.value) : event.target.value,
                      )
                    }
                    className={`mt-2 min-h-12 w-full rounded-xl border bg-white px-4 text-base font-semibold text-slate-900 shadow-sm outline-none transition focus:ring-4 ${
                      errors[field.name]
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : "border-slate-200 focus:border-teal-400 focus:ring-teal-100"
                    }`}
                  />
                )}
                {errors[field.name] && (
                  <p className="mt-2 text-sm font-bold text-red-700">{errors[field.name]}</p>
                )}
              </label>
            ))}

            <div className="flex items-end md:col-span-2 xl:col-span-3">
              <button
                type="submit"
                disabled={isSaving}
                className="min-h-12 w-full rounded-xl bg-[#08aa9c] px-5 text-sm font-black text-white shadow-lg shadow-teal-700/20 transition hover:bg-[#07998c] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {isSaving ? "Saving..." : editing ? "Save Changes" : "Add New"}
              </button>
            </div>
          </form>

          {status && (
            <p className="mt-5 rounded-2xl border border-teal-100 bg-teal-50 px-4 py-3 text-sm font-black text-teal-800">
              {status}
            </p>
          )}
        </section>

        {isLoading ? (
          <section className="rounded-3xl border border-teal-100 bg-white p-5 shadow-xl shadow-teal-900/5">
            <div className="mediora-skeleton h-4 w-48 rounded-full" />
            <div className="mediora-skeleton mt-4 h-12 w-full rounded-2xl" />
            <div className="mediora-skeleton mt-3 h-12 w-full rounded-2xl" />
          </section>
        ) : (
          <ResponsiveTable
            columns={columns}
            rows={records}
            renderActions={(record) => (
              <>
                <ActionButton onClick={() => startEdit(record)}>Edit</ActionButton>
                <ActionButton tone="danger" onClick={() => handleDelete(record)}>
                  Delete
                </ActionButton>
              </>
            )}
          />
        )}
      </div>
    </AdminProtectedPage>
  );
}
