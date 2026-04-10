import { EventType } from "@/utils/interfaces";
import { EventAboutSection } from "./EventAboutSection";
import { EventBookingCard } from "./EventBookingCard";
import { EventDetailHeader } from "./EventDetailHeader";
import { EventHighlights } from "./EventHighlights";
import { EventImageGallery } from "./EventImageGallery";
import { EventThingsToKnow } from "./EventThingsToKnow";

export function EventDetailsPage({ event }: { event: EventType }) {
  return (
    <div className="min-h-screen bg-white text-black [font-family:var(--font-geist-sans)]">
      <main className="mx-auto w-full max-w-330  px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <EventDetailHeader event={event} />
        <EventImageGallery event={event} />

        <section className="mt-4 grid gap-10 py-2 lg:grid-cols-[1.9fr_1fr]">
          <div>
            <EventAboutSection event={event} />
            <EventHighlights event={event} />
            <EventThingsToKnow event={event} />
          </div>

          <div className="lg:sticky lg:top-6 lg:self-start">
            <EventBookingCard event={event} />
          </div>
        </section>
      </main>
    </div>
  );
}
