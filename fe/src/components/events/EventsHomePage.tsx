import { EventCard } from "./EventCard";
import { EventFilters } from "./EventFilters";
import { eventCards } from "./events-data";
import { DistrictHeader } from "./DistrictHeader";

export function EventsHomePage() {
  return (
    // TODO: remove debug background color from the root container.
    <div className="min-h-screen bg-[#f1f1ee] text-slate-900 [font-family:var(--font-geist-sans)]">
      <DistrictHeader />

      {/* TODO: remove debug background color from main content wrapper. */}
      <main className="mx-auto w-full max-w-[1120px] bg-[#f4f4ef] px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <section>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            All events
          </h1>
          <EventFilters />
        </section>

        <section className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {eventCards.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </section>
      </main>
    </div>
  );
}
