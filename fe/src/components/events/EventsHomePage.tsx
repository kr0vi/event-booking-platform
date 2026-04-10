"use client";

import { EventType } from "@/utils/interfaces";
import { EventCard } from "./EventCard";
import { EventFilters } from "./EventFilters";
import { useEffect, useMemo, useState } from "react";
import { getAllEvents } from "./events-data";
import { getErrorMessage } from "@/utils/api";

export function EventsHomePage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadEvents() {
      try {
        const response = await getAllEvents();
        setEvents(response);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }

    void loadEvents();
  }, []);

  const stateMessage = useMemo(() => {
    if (loading) {
      return "Loading events...";
    }
    if (error) {
      return error;
    }
    if (events.length === 0) {
      return "No events available right now.";
    }
    return null;
  }, [error, events.length, loading]);

  return (
    <div className="min-h-screen bg-white text-slate-900 [font-family:var(--font-geist-sans)]">
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <section>
          <h1 className="text-xl font-bold tracking-tight text-black">
            All events
          </h1>
          <EventFilters />
        </section>

        {stateMessage ? (
          <section className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm font-semibold text-slate-700">
            {stateMessage}
          </section>
        ) : (
          <section className="mt-8 grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
