import Image from 'next/image';
import Link from 'next/link';

const features = [
  { title: 'Instant record capture', description: 'Log incidents, complaints, handovers, and daily updates in seconds.' },
  { title: 'Team-ready handovers', description: 'Keep shift transitions clear with structured notes and status updates.' },
  { title: 'Actionable insights', description: 'Track repeat issues, response times, and daily operational trends.' },
  { title: 'Mobile-first workflow', description: 'Built for busy staff to record events on the floor, not behind a desk.' }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-10 sm:px-8 lg:flex-row lg:items-center lg:gap-16">
        <div className="space-y-8 lg:w-1/2">
          <div className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Occurrence Book
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Turn daily incident notes into fast, reliable action.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-slate-600">
              Replace paper logs and manual handovers with a digital occurrence book built for supermarkets, malls, and frontline teams.
              Capture events, assign follow-ups, and keep everyone aligned from every shift.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/incident" className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-emerald-700">
              Log a new incident
            </Link>
            <Link href="/admin" className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-50">
              Admin dashboard
            </Link>
            <Link href="/login" className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-50">
              Go to login
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <article key={feature.title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50">
                <h2 className="text-base font-semibold text-slate-950">{feature.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="lg:w-1/2">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50">
            <Image
              src="/hero-illustration.svg"
              alt="Illustration showing a mobile app recording incidents and handovers"
              width={760}
              height={520}
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
