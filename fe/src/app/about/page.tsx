export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
        About District Events
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
        District Events is built for discovering city experiences and booking
        seats in seconds. The platform helps attendees browse upcoming events,
        reserve tickets, and access QR-based passes from one place.
      </p>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold text-slate-900">Discover</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Browse music, sports, screenings, and community experiences from
            across your city.
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold text-slate-900">Book</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Secure your spot with a fast booking flow designed around simple
            quantity and pricing details.
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold text-slate-900">Attend</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Receive QR-based tickets instantly and keep your upcoming passes
            accessible from any device.
          </p>
        </article>
      </section>
    </main>
  );
}
