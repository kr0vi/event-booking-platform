import { eventType } from "@/utils/interfaces";


export function EventImageGallery({ event }: { event: eventType }) {
  return (
    <section className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-[2fr_1fr_1fr_1fr]">
      <div
        className={`relative min-h-70 overflow-hidden rounded-2xl lg:min-h-90 `}
      >
        <img src={event.posterImage} className="w-full h-full object-cover" />
        <p className="absolute bottom-4 left-4 rounded bg-black/55 px-2 py-1 text-[10px] font-bold tracking-[0.2em] text-white">
          {event.galleryImages.length} PHOTOS
        </p>
      </div>

      {event.galleryImages.map((image, index) => (
        <div
          key={index}
          className={`relative min-h-55 overflow-hidden rounded-2xl lg:min-h-90 `}
        >
         <img src={image} className="h-full w-full object-cover" />
        </div>
      ))}
    </section>
  );
}
