import type { ReactNode } from 'react';
import Link from 'next/link';

const navItems = [
  { label: 'Overview', href: '/admin' },
  { label: 'Incidents', href: '/admin/incidents' },
  { label: 'Handovers', href: '/admin/handovers' },
  { label: 'Reports', href: '/admin/reports' },
  { label: 'Settings', href: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-200/50">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Admin</p>
              <h1 className="mt-3 text-2xl font-semibold text-slate-950">Dashboard</h1>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Navigate admin areas for incidents, handovers, reports, and settings.
              </p>
            </div>

            <nav className="space-y-2 rounded-3xl bg-white p-4 shadow-sm shadow-slate-200/40">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="rounded-3xl bg-slate-950/95 p-5 text-slate-100">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">Team status</p>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <p>
                  On duty: <span className="font-semibold text-white">4 teams</span>
                </p>
                <p>
                  Nearby support: <span className="font-semibold text-white">2 officers</span>
                </p>
                <p>
                  Response target: <span className="font-semibold text-white">12 min</span>
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-emerald-600/5 p-5 text-sm leading-6 text-slate-700">
              Use this sidebar to jump between admin pages and manage operational activity across the team.
            </div>
          </aside>

          <div className="space-y-6">{children}</div>
        </div>
      </section>
    </main>
  );
}
