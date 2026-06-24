import Link from 'next/link';

export default function AdminHandoversPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Handovers</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-950">Shift handover tracker</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Manage handovers, share shift notes, and make sure every incoming team member has the context they need.
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
        {['Pending handovers', 'Completed handovers', 'Unassigned'].map((label) => (
          <div key={label} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <p className="mt-4 text-3xl font-semibold text-slate-950">{label === 'Pending handovers' ? '8' : label === 'Completed handovers' ? '19' : '2'}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
        <h2 className="text-xl font-semibold text-slate-950">Handover notes</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          See the latest handover items, update next steps, and confirm shift readiness for the upcoming crew.
        </p>
      </div>
    </div>
  );
}
