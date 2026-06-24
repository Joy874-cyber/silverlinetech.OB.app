'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  approveSupervisor,
  getIncidents,
  getPendingSupervisorRequests,
  Incident,
} from '../../lib/auth';

const quickActions = [
  { title: 'Review open incidents', description: 'See all active entries that need follow-up.' },
  { title: 'Assign a response', description: 'Route urgent incidents to a team member.' },
  { title: 'Export latest logs', description: 'Download recent incident reports for audit.' },
];

export default function AdminDashboardPage() {
  const [pendingRequests, setPendingRequests] = useState<{ email: string; name: string }[]>([]);
  const [stats, setStats] = useState({ open: 0, pending: 0, resolved: 0, today: 0 });
  const [message, setMessage] = useState('');
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    const requests = getPendingSupervisorRequests();
    setPendingRequests(requests.map((request) => ({ email: request.email, name: request.name })));

    const storedIncidents = getIncidents();
    const open = storedIncidents.filter((incident) => incident.status === 'Pending').length;
    const resolved = storedIncidents.filter((incident) => incident.status === 'Resolved').length;

    setIncidents(storedIncidents);
    setStats({
      open,
      pending: open,
      resolved,
      today: storedIncidents.length,
    });
  }, []);

  const handleApprove = (email: string) => {
    const approved = approveSupervisor(email);
    if (approved) {
      setPendingRequests((current) => current.filter((request) => request.email !== email));
      setMessage(`Approved supervisor request for ${email}.`);
    } else {
      setMessage(`Unable to approve account for ${email}.`);
    }
  };

  const dashboardStats = [
    { label: 'Open incidents', value: `${stats.open}` },
    { label: 'Pending actions', value: `${stats.pending}` },
    { label: 'Resolved reports', value: `${stats.resolved}` },
    { label: 'Entries today', value: `${stats.today}` },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
        <div className="flex flex-col gap-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50 sm:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Supervisor dashboard</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Monitor incidents, handovers, and response status in one place.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Get a quick operational overview, track active cases, and keep your frontline teams aligned with today’s activity.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/incident"
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Log a new incident
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Back to home
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dashboardStats.map((item) => (
              <article key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-medium text-slate-500">{item.label}</p>
                <p className="mt-4 text-3xl font-semibold text-slate-950">{item.value}</p>
              </article>
            ))}
          </div>

          {message ? (
            <div className="rounded-3xl bg-emerald-500/10 p-4 text-sm text-emerald-900">{message}</div>
          ) : null}

          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <aside className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-200/50">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Supervisor navigation</p>
                <h2 className="mt-3 text-xl font-semibold text-slate-950">Control panel</h2>
              </div>

              <nav className="space-y-2 rounded-3xl bg-white p-4 shadow-sm shadow-slate-200/40">
                {['Overview', 'Incidents', 'Reports', 'Settings'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  >
                    {item}
                  </a>
                ))}
              </nav>

              <div className="rounded-3xl bg-slate-950/95 p-5 text-slate-100">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">Team status</p>
                <div className="mt-4 space-y-3 text-sm text-slate-300">
                  <p>On duty: <span className="font-semibold text-white">4 teams</span></p>
                  <p>Nearby support: <span className="font-semibold text-white">2 officers</span></p>
                  <p>Response target: <span className="font-semibold text-white">12 min</span></p>
                </div>
              </div>

              <div className="rounded-3xl bg-emerald-600/5 p-5 text-sm leading-6 text-slate-700">
                Use the dashboard to manage active cases and monitor the response pipeline.
              </div>
            </aside>

            <div className="space-y-6">
              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-950">Pending supervisor approvals</h2>
                    <p className="mt-2 text-sm text-slate-600">Approve new supervisor accounts created by the field team.</p>
                  </div>
                  <span className="inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                    {pendingRequests.length} pending
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  {pendingRequests.length > 0 ? (
                    pendingRequests.map((request) => (
                      <div key={request.email} className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="font-semibold text-slate-950">{request.name || request.email}</p>
                          <p className="text-sm text-slate-600">{request.email}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleApprove(request.email)}
                          className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                        >
                          Approve
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                      No supervisor requests are waiting for approval.
                    </div>
                  )}
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-950">Recent incident entries</h2>
                    <p className="mt-2 text-sm text-slate-600">Quickly review the latest occurrences and status updates.</p>
                  </div>
                  <span className="inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                    Live
                  </span>
                </div>

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
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Quick actions</p>
                  <h2 className="mt-3 text-xl font-semibold text-slate-950">Stay on top of priorities</h2>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {quickActions.map((action) => (
                    <div key={action.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                      <p className="font-semibold text-slate-950">{action.title}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{action.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
