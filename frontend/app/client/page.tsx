'use client';

import Link from 'next/link';

export default function ClientPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-10 sm:px-8">
        <div className="flex flex-col gap-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">Client view</p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Client dashboard</h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-600">
              Track incident status, view action progress, and receive updates from your operations team.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Active cases', value: '5' },
              { label: 'Updates today', value: '2' },
              { label: 'Responses delivered', value: '17' },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-500">{item.label}</p>
                <p className="mt-3 text-2xl font-semibold text-slate-950">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <aside className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-200/50">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">Client quick view</p>
                <h2 className="mt-3 text-xl font-semibold text-slate-950">Key updates</h2>
              </div>

              <div className="rounded-3xl bg-white p-4 shadow-sm shadow-slate-200/40">
                <p className="text-sm text-slate-700">Latest delivery</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Receive fast visibility into new incident summaries and next-step actions.
                </p>
              </div>
            </aside>

            <div className="space-y-6">
              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-950">Recent client updates</h2>
                    <p className="mt-2 text-sm text-slate-600">Status notes from operations and supervisory checks.</p>
                  </div>
                  <span className="inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
                    Client
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  {[
                    { title: 'Response delivered', subtitle: 'Issue resolved in 12 min' },
                    { title: 'Site review added', subtitle: 'Handover completed by shift lead' },
                  ].map((item) => (
                    <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                      <p className="mt-2 text-sm text-slate-600">{item.subtitle}</p>
                    </div>
                  ))}
                </div>
              </section>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                <Link
                  href="/incident"
                  className="inline-flex items-center justify-center rounded-2xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
                >
                  View incidents
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Back to home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
