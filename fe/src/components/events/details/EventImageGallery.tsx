import type { EventCardData } from "../events-data";

type EventImageGalleryProps = {
  event: EventCardData;
};

export function EventImageGallery({ event }: EventImageGalleryProps) {
  return (
    <section className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-[2fr_1fr_1fr_1fr]">
      <div
        className={`relative min-h-[280px] overflow-hidden rounded-2xl lg:min-h-[360px] ${event.posterClassName}`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
        <p className="absolute bottom-4 left-4 rounded bg-black/55 px-2 py-1 text-[10px] font-bold tracking-[0.2em] text-white">
          EVENT POSTER
        </p>
      </div>

      {event.galleryClassNames.map((className, index) => (
        <div
          key={index}
          className={`relative min-h-[220px] overflow-hidden rounded-2xl lg:min-h-[360px] ${className}`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/65 via-transparent to-black/20" />
          {index === event.galleryClassNames.length - 1 ? (
            <button
              type="button"
              className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-xl bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow"
            >
              Show all photos
            </button>
          ) : null}
        </div>
      ))}
    </section>
  );
}
