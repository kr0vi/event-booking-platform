"use client";

import { useEffect, useState } from "react";
import { EventType } from "@/utils/interfaces";
import { EventDetailsPage } from "./EventDetailsPage";
import { getEventById } from "../events-data";
import { getErrorMessage } from "@/utils/api";

type EventDetailsClientProps = {
  eventId: string;
};

export function EventDetailsClient({ eventId }: EventDetailsClientProps) {
  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadEvent() {
      try {
        const response = await getEventById(eventId);
        if (!response) {
          setError("Event not found.");
          return;
        }
        setEvent(response);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }

    void loadEvent();
  }, [eventId]);

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-10 text-sm font-semibold text-slate-700 sm:px-6 lg:px-8">
        Loading event details...
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-slate-900">Event unavailable</h1>
        <p className="mt-2 text-sm font-medium text-slate-600">
          {error || "Event not found."}
        </p>
      </div>
    );
  }

  return <EventDetailsPage event={event} />;
}
