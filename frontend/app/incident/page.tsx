'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

const incidentTypes = ['Incident', 'Complaint', 'Shift Handover', 'Daily Event'];
const incidentCategories: Record<string, string[]> = {
  Incident: ['Theft', 'Shoplifting', 'Vandalism', 'Accident', 'Other'],
  Complaint: ['Customer complaint', 'Supplier issue', 'Employee concern', 'Service failure', 'Other'],
};

export default function IncidentPage() {
  const [type, setType] = useState('Incident');
  const [category, setCategory] = useState(incidentCategories.Incident[0]);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [reportedBy, setReportedBy] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const handleTypeChange = (value: string) => {
    setType(value);
    if (incidentCategories[value]) {
      setCategory(incidentCategories[value][0]);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-slate-100 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <div className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-8 shadow-xl shadow-slate-950/20">
          <Link href="/" className="text-sm font-semibold text-emerald-400 hover:text-emerald-200">
            ← Back to home
          </Link>

          <h1 className="mt-6 text-3xl font-semibold text-white">Create a new incident entry</h1>
          <p className="mt-3 text-slate-400">Capture details for complaints, handovers, events, or safety incidents.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300" htmlFor="type">
                Entry type
              </label>
              <select
                id="type"
                value={type}
                onChange={(event) => handleTypeChange(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
              >
                {incidentTypes.map((item) => (
                  <option key={item} value={item} className="bg-slate-950 text-slate-100">
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {(type === 'Incident' || type === 'Complaint') && (
              <div>
                <label className="block text-sm font-medium text-slate-300" htmlFor="category">
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
                >
                  {incidentCategories[type].map((item) => (
                    <option key={item} value={item} className="bg-slate-950 text-slate-100">
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300" htmlFor="location">
                Location
              </label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                required
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Aisle 5, Main Entrance, Back Office"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300" htmlFor="reportedBy">
                Reported by
              </label>
              <input
                id="reportedBy"
                type="text"
                value={reportedBy}
                onChange={(event) => setReportedBy(event.target.value)}
                required
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Officer name or team"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
                rows={5}
                className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Describe the incident, action taken, and next steps..."
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Save entry
            </button>
          </form>

          {submitted ? (
            <div className="mt-6 rounded-3xl bg-emerald-500/10 p-4 text-sm text-emerald-200">
              Incident form submitted. Backend integration will be added next.
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
