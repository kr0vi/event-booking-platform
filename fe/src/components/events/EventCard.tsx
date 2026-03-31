import Link from "next/link";
import type { EventCardData } from "./events-data";

type EventCardProps = {
  event: EventCardData;
};

export function EventCard({ event }: EventCardProps) {
  return (
    <Link
      href={`/events/${event.id}`}
      className="block overflow-hidden rounded-2xl border border-slate-300/80 bg-white shadow-[0_1px_0_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <article>
        <div className={`relative h-[320px] w-full ${event.posterClassName}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_55%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
          <p className="absolute bottom-3 left-3 rounded bg-black/55 px-2 py-1 text-[10px] font-bold tracking-[0.2em] text-white">
            EVENT POSTER
          </p>
        </div>

        <div className="space-y-1 px-4 py-3">
          <p className="text-sm font-semibold text-amber-700">
            {event.dateLabel}
          </p>
          <h3 className="line-clamp-2 text-xl leading-tight font-bold text-slate-900">
            {event.title}
          </h3>
          <p className="truncate text-sm font-medium text-slate-500">
            {event.venue}
          </p>
          <p className="text-sm font-semibold text-slate-700">{event.price}</p>
        </div>
      </article>
    </Link>
  );
}
