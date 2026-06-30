import Link from "next/link";

export function AdminCard({ eyebrow, title, description, children, className = "" }) {
  return (
    <section
      className={`rounded-3xl border border-teal-100 bg-white p-5 shadow-xl shadow-teal-900/5 sm:p-6 ${className}`}
    >
      {(eyebrow || title || description) && (
        <div>
          {eyebrow && (
            <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-700">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="mt-2 text-2xl font-black tracking-tight text-[#0d4050]">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
              {description}
            </p>
          )}
        </div>
      )}
      <div className={eyebrow || title || description ? "mt-5" : ""}>{children}</div>
    </section>
  );
}

export function PageIntro({ eyebrow, title, description, actionHref, actionLabel }) {
  return (
    <section className="rounded-3xl border border-teal-100 bg-white p-5 shadow-xl shadow-teal-900/5 sm:p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-700">
            {eyebrow}
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-[#0d4050] sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-3xl text-base font-semibold leading-7 text-slate-600">
            {description}
          </p>
        </div>
        {actionHref && actionLabel && (
          <Link
            href={actionHref}
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#08aa9c] px-5 text-sm font-black text-white shadow-lg shadow-teal-700/20 transition hover:bg-[#07998c] active:scale-[0.98]"
          >
            {actionLabel}
          </Link>
        )}
      </div>
    </section>
  );
}

export function ActionButton({ children, tone = "teal" }) {
  const classes =
    tone === "danger"
      ? "border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
      : tone === "solid"
        ? "border-[#08aa9c] bg-[#08aa9c] text-white shadow-md shadow-teal-700/20 hover:bg-[#07998c]"
        : "border-teal-200 bg-white text-teal-700 hover:bg-teal-50";

  return (
    <button
      type="button"
      className={`min-h-10 rounded-xl border px-3 text-sm font-black transition active:scale-[0.98] ${classes}`}
    >
      {children}
    </button>
  );
}

export function StatusBadge({ children, tone = "teal" }) {
  const classes =
    tone === "danger"
      ? "bg-red-50 text-red-700"
      : tone === "amber"
        ? "bg-amber-50 text-amber-700"
        : "bg-teal-50 text-teal-700";

  return (
    <span className={`w-fit rounded-full px-3 py-1 text-xs font-black ${classes}`}>
      {children}
    </span>
  );
}

export function ResponsiveTable({ columns, rows, renderActions }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-teal-100 bg-white shadow-xl shadow-teal-900/5">
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead className="bg-teal-50 text-xs font-black uppercase tracking-[0.14em] text-teal-700">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-5 py-4">
                  {column.label}
                </th>
              ))}
              {renderActions && <th className="px-5 py-4">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-teal-100">
            {rows.map((row, index) => (
              <tr key={row.id || row.email || row.name || index} className="bg-white">
                {columns.map((column) => (
                  <td key={column.key} className="px-5 py-4 text-sm font-bold text-slate-700">
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
                {renderActions && (
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-2">{renderActions(row)}</div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 p-3 lg:hidden">
        {rows.map((row, index) => (
          <article
            key={row.id || row.email || row.name || index}
            className="rounded-2xl border border-teal-100 bg-[#fbfdfd] p-4"
          >
            <div className="grid gap-3">
              {columns.map((column) => (
                <div key={column.key}>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-teal-700">
                    {column.label}
                  </p>
                  <div className="mt-1 text-sm font-bold leading-6 text-slate-700">
                    {column.render ? column.render(row) : row[column.key]}
                  </div>
                </div>
              ))}
            </div>
            {renderActions && (
              <div className="mt-4 flex flex-wrap gap-2">{renderActions(row)}</div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

export function BarChartCard({ title, data }) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <AdminCard eyebrow="Mock analytics" title={title}>
      <div className="grid gap-4">
        {data.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-black text-slate-700">{item.label}</span>
              <span className="text-sm font-black text-teal-700">{item.value}</span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-teal-50">
              <div
                className="h-full rounded-full bg-[#08aa9c]"
                style={{ width: `${Math.max((item.value / max) * 100, 8)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </AdminCard>
  );
}
