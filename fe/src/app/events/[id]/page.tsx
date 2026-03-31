import { EventDetailsPage } from "@/components/events/details/EventDetailsPage";
import { getEventById } from "@/components/events/events-data";
import { notFound } from "next/navigation";

type EventPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;
  const eventId = Number(id);

  if (!Number.isInteger(eventId)) {
    notFound();
  }

  const event = getEventById(eventId);

  if (!event) {
    notFound();
  }

  return <EventDetailsPage event={event} />;
}
