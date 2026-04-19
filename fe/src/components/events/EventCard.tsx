import Link from "next/link";
import { EventType } from "@/utils/interfaces";

const FALLBACK_POSTER =
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1100&q=80";

export function EventCard({ event }: { event: EventType }) {
  return (
    <Link
      href={`/events/${event.id}`}
      className="block overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors shadow-lg"
    >
      <article>
        <div className={`relative h-64 w-full `}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#131517] to-transparent z-10" />
          <img
            src={event.posterImage || FALLBACK_POSTER}
            className="absolute inset-0 h-full w-full object-cover"
            alt={event.title}
          />
          <p className="absolute top-3 right-3 z-20 rounded-md bg-black/60 backdrop-blur-sm px-2 py-1 text-[10px] font-bold tracking-widest text-white/90">
            EVENT
          </p>
        </div>

        <div className="space-y-1.5 px-5 py-4 z-20 relative">
          <p className="text-sm font-medium text-blue-400">
            {event.date} at {event.time}
          </p>
          <h3 className="line-clamp-2 text-xl leading-snug font-bold text-white tracking-tight">
            {event.title}
          </h3>
          <p className="truncate text-sm font-medium text-white/50">
            {event.location}
          </p>
          <div className="pt-2 mt-2 border-t border-white/10">
            <p className="text-sm font-semibold text-white/80">
              {event.price.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
              })}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}
