import { EventDetailsClient } from "@/components/events/details/EventDetailsClient";

type EventPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EventPage({ params }: EventPageProps) {
  const { id: eventId } = await params;
  return <EventDetailsClient eventId={eventId} />;
}
