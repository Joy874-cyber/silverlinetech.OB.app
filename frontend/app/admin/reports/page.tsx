import Link from 'next/link';

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Reports</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-950">Operational reporting</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              View incident trends, response times, and team performance across shifts.
            </p>
          </div>
          <Link
            href="/admin"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Back to overview
          </Link>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {['Weekly summary', 'Response trend', 'Activity score'].map((label) => (
          <div key={label} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <p className="mt-4 text-3xl font-semibold text-slate-950">{label === 'Weekly summary' ? '35' : label === 'Response trend' ? '8.2m' : '92%'}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
        <h2 className="text-xl font-semibold text-slate-950">Report exports</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Export incident and handover data for audits, compliance, and shift reviews.
        </p>
      </div>
    </div>
  );
}
