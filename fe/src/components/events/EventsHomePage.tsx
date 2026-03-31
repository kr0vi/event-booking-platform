import { eventType } from "@/utils/interfaces";
import { EventCard } from "./EventCard";
import { EventFilters } from "./EventFilters";
import axios from "axios";

export async function EventsHomePage() {
  const { data } = await axios.get("http://localhost:3000/api/v1/events");
  if (!data.success) {
    return <div>Failed to fetch events</div>;
  }
  const events: eventType[] = data.data;
  return (
    // TODO: remove debug background color from the root container.
    <div className="min-h-screen bg-white text-slate-900 [font-family:var(--font-geist-sans)]">
      {/* TODO: remove debug background color from main content wrapper. */}
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <section>
          <h1 className="text-xl font-bold tracking-tight text-black">
            All events
          </h1>
          <EventFilters />
        </section>

        <section className="mt-8 grid w-full  grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </section>
      </main>
    </div>
  );
}
