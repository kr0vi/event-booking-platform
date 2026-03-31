import { eventType } from "@/utils/interfaces";

export function EventAboutSection({ event }: { event: eventType }) {
  return (
    <section className="mt-7">
      <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
        About
      </h2>
      <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600">
        {event.description}
      </p>
      <button
        type="button"
        className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-slate-900"
      >
        Read more
        <span aria-hidden="true" className="text-xs text-slate-500">
          v
        </span>
      </button>
    </section>
  );
}
