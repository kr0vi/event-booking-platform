import { eventType } from "@/utils/interfaces";

export function EventHighlights({ event }: { event: eventType }) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
        Highlights
      </h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {event.highlights.map((highlight) => (
          <article
            key={highlight.title}
            className="rounded-2xl border border-slate-200 bg-white px-6 py-6"
          >
            <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
              {highlight.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {highlight.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
