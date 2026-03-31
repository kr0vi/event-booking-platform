import { EventDetailsPage } from "@/components/events/details/EventDetailsPage";
import { getEventById } from "@/components/events/events-data";
import { notFound } from "next/navigation";

type EventPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EventPage({ params }: EventPageProps) {
  const { id: eventId } = await params;

  const event = await getEventById(eventId);

  if (!event) {
    return (
      <>
        <h1>Event not found</h1>
        <p>The event you are looking for does not exist.</p>
      </>
    );
  }

  return <EventDetailsPage event={event} />;
}
