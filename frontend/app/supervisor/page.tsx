'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCurrentUser, getIncidents, Incident } from '../../lib/auth';

export default function SupervisorPage() {
  const [userName, setUserName] = useState('Supervisor');
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    const user = getCurrentUser();
    if (user?.name) {
      setUserName(user.name);
    }

    setIncidents(getIncidents());
  }, []);

  const openCount = incidents.filter((incident) => incident.status === 'Pending').length;
  const resolvedCount = incidents.filter((incident) => incident.status === 'Resolved').length;
  const totalCount = incidents.length;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-10 sm:px-8">
        <div className="flex flex-col gap-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Supervisor view</p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Welcome back, {userName}</h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-600">
              Review frontline activity, check incident details, and stay in contact with the operational team.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: 'Open incidents', value: `${openCount}` },
                { label: 'Resolved items', value: `${resolvedCount}` },
                { label: 'Total entries', value: `${totalCount}` },
              ].map((item) => (
                <div key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-medium text-slate-500">{item.label}</p>
                  <p className="mt-3 text-2xl font-semibold text-slate-950">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/incident"
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                New incident entry
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Back to home
              </Link>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <aside className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-200/50">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Supervisor actions</p>
                <h2 className="mt-3 text-xl font-semibold text-slate-950">Keep the shift aligned</h2>
              </div>

              <nav className="space-y-2 rounded-3xl bg-white p-4 shadow-sm shadow-slate-200/40">
                {['Review incidents', 'Confirm handovers', 'Request clarifications'].map((item) => (
                  <a key={item} href="#" className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
                    {item}
                  </a>
                ))}
              </nav>

              <div className="rounded-3xl bg-emerald-600/5 p-5 text-sm leading-6 text-slate-700">
                Supervisors may review incident context, confirm handover accuracy, and validate client follow-up items.
              </div>
            </aside>

            <div className="space-y-6">
              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-950">Latest incident activity</h2>
                    <p className="mt-2 text-sm text-slate-600">Monitor recent incident records and follow-up status.</p>
                  </div>
                  <span className="inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                    Supervisor
                  </span>
                </div>

                {incidents.length === 0 ? (
                  <div className="mt-6 rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
                    No incident records yet. Log a new incident to get started.
                  </div>
                ) : (
                  <div className="mt-6 overflow-x-auto rounded-3xl border border-slate-200 bg-slate-50">
                    <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                      <thead className="bg-slate-100 text-slate-500">
                        <tr>
                          <th className="px-4 py-3 font-medium">ID</th>
                          <th className="px-4 py-3 font-medium">Type</th>
                          <th className="px-4 py-3 font-medium">Location</th>
                          <th className="px-4 py-3 font-medium">Status</th>
                          <th className="px-4 py-3 font-medium">Updated</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                        {incidents.map((incident) => (
                          <tr key={incident.id} className="transition hover:bg-slate-50">
                            <td className="px-4 py-4 font-semibold text-slate-900">{incident.id}</td>
                            <td className="px-4 py-4">{incident.type}</td>
                            <td className="px-4 py-4">{incident.location}</td>
                            <td className="px-4 py-4">
                              <span className="inline-flex rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-700">
                                {incident.status}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-slate-500">{new Date(incident.updatedAt).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
