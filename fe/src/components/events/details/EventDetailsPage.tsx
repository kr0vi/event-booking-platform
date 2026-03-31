import { eventType } from "@/utils/interfaces";
import { DistrictHeader } from "../DistrictHeader";
import { EventAboutSection } from "./EventAboutSection";
import { EventBookingCard } from "./EventBookingCard";
import { EventDetailHeader } from "./EventDetailHeader";
import { EventHighlights } from "./EventHighlights";
import { EventImageGallery } from "./EventImageGallery";
import { EventThingsToKnow } from "./EventThingsToKnow";

export function EventDetailsPage({ event }: { event: eventType }) {
  return (
    // TODO: remove debug background color from details page root.
    <div className="min-h-screen bg-[#efefee] text-slate-900 [font-family:var(--font-geist-sans)]">
      {/* TODO: remove debug background color from details page content wrapper. */}
      <main className="mx-auto w-full max-w-330 bg-[#f4f4f1] px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <EventDetailHeader event={event} />
        <EventImageGallery event={event} />

        {/* TODO: remove debug background color from details two-column section. */}
        <section className="mt-4 grid gap-10 bg-[#f3f4e5]/50 py-2 lg:grid-cols-[1.9fr_1fr]">
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
