'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerSupervisorAccount } from '../../lib/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = registerSupervisorAccount({ name, email, password });

    if (!result.success) {
      setError(result.message);
      setMessage('');
      return;
    }

    setError('');
    setMessage(result.message);
    setName('');
    setEmail('');
    setPassword('');

    setTimeout(() => {
      router.push('/login');
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-slate-100 sm:px-8">
      <div className="mx-auto flex max-w-2xl flex-col gap-8">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/95 p-8 shadow-xl shadow-slate-950/20">
          <h1 className="text-3xl font-semibold text-white">Register as a supervisor</h1>
          <p className="mt-3 text-slate-400">Create a supervisor account for review by the operational manager.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300">
                Full name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Jane Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">
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
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Enter a secure password"
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Submit registration
            </button>
          </form>

          {error ? (
            <div className="mt-6 rounded-3xl bg-rose-500/10 p-4 text-sm text-rose-200">{error}</div>
          ) : null}

          {message ? (
            <div className="mt-6 rounded-3xl bg-emerald-500/10 p-4 text-sm text-emerald-200">{message}</div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
