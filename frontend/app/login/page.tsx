'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  authenticateUser,
  roleLabels,
  routeByRole,
  saveCurrentUser,
  saveUserRole,
  UserRole,
  isValidRole,
} from '../../lib/auth';

const roles: UserRole[] = ['supervisor', 'operational-manager', 'client'];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole | ''>('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, [role, email, password]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!role || !isValidRole(role)) {
      setError('Please choose a user role before signing in.');
      return;
    }

    const authResult = authenticateUser({ email, password, role });
    if (!authResult.success) {
      setError(authResult.message);
      setSubmitted(false);
      return;
    }

    saveUserRole(role);
    saveCurrentUser({
      email: authResult.user.email,
      role: authResult.user.role,
      name: authResult.user.name || '',
    });

    setSubmitted(true);
    router.push(routeByRole[role]);
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-slate-100 sm:px-8">
      <div className="mx-auto flex max-w-2xl flex-col gap-8">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/95 p-8 shadow-xl shadow-slate-950/20">
          <Link href="/" className="text-sm font-semibold text-emerald-400 hover:text-emerald-200">
            ← Back to home
          </Link>

          <h1 className="mt-6 text-3xl font-semibold text-white">Sign in to your occurrence book</h1>
          <p className="mt-3 text-slate-400">Choose a user role to access the supervisor, operational manager, or client workflow.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Enter your password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300" htmlFor="role">
                Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(event) => setRole(event.target.value as UserRole)}
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="" disabled>
                  Select a role
                </option>
                {roles.map((item) => (
                  <option key={item} value={item} className="bg-slate-950 text-slate-100">
                    {roleLabels[item]}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="inline-flex w-full justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Sign in
            </button>
          </form>

          <div className="mt-8 rounded-3xl bg-slate-900/80 p-5 text-sm text-slate-300">
            <p className="font-medium text-slate-100">New supervisor?</p>
            <p className="mt-2 leading-6">
              Create a supervisor account first so the operational manager can approve it. Once approved, use your credentials to sign in without any additional approval step.
            </p>
            <Link href="/register" className="mt-4 inline-flex text-emerald-300 hover:text-emerald-200">
              Register as a supervisor
            </Link>
          </div>

          {error ? (
            <div className="mt-6 rounded-3xl bg-rose-500/10 p-4 text-sm text-rose-200">
              {error}
            </div>
          ) : null}

          {submitted ? (
            <div className="mt-6 rounded-3xl bg-emerald-500/10 p-4 text-sm text-emerald-200">
              Login submitted. Redirecting to the {role ? roleLabels[role] : 'selected'} dashboard.
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
