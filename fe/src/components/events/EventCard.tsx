import Link from "next/link";
import { EventType } from "@/utils/interfaces";

const FALLBACK_POSTER =
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1100&q=80";

export function EventCard({ event }: { event: EventType }) {
  return (
    <Link
      href={`/events/${event.id}`}
      className="block overflow-hidden rounded-2xl border border-slate-300/80 bg-white shadow-[0_1px_0_rgba(15,23,42,0.04)]"
    >
      <article>
        <div className={`relative h-80 w-full `}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_55%)]" />
          <img
            src={event.posterImage || FALLBACK_POSTER}
            className="absolute inset-0 h-full w-full object-cover"
            alt={event.title}
          />
          <p className="absolute bottom-3 left-3 rounded bg-black/55 px-2 py-1 text-[10px] font-bold tracking-[0.2em] text-white">
            EVENT POSTER
          </p>
        </div>

        <div className="space-y-1 px-4 py-3">
          <p className="text-sm font-semibold text-amber-700">
            {event.date} at {event.time}
          </p>
          <h3 className="line-clamp-2 text-xl leading-tight font-bold text-slate-900">
            {event.title}
          </h3>
          <p className="truncate text-sm font-medium text-slate-500">
            {event.location}
          </p>
          <p className="text-sm font-semibold text-slate-700">
            {event.price.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
          </p>
        </div>
      </article>
    </Link>
  );
}
