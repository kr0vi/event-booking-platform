import { EventType } from "@/utils/interfaces";

const FALLBACK_POSTER =
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1100&q=80";
const FALLBACK_GALLERY = [
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1464375117522-1311dd7d0cd7?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=900&q=80",
];

export function EventImageGallery({ event }: { event: EventType }) {
  const gallery = event.galleryImages?.length
    ? event.galleryImages
    : FALLBACK_GALLERY;

  return (
    <section className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-[2fr_1fr_1fr_1fr]">
      <div
        className={`relative min-h-70 overflow-hidden rounded-2xl lg:min-h-90 `}
      >
        <img
          src={event.posterImage || FALLBACK_POSTER}
          className="h-full w-full object-cover"
          alt={event.title}
        />
        <p className="absolute bottom-4 left-4 rounded bg-black/55 px-2 py-1 text-[10px] font-bold tracking-[0.2em] text-white">
          {gallery.length} PHOTOS
        </p>
      </div>

      {gallery.map((image, index) => (
        <div
          key={index}
          className={`relative min-h-55 overflow-hidden rounded-2xl lg:min-h-90 `}
        >
          <img
            src={image}
            className="h-full w-full object-cover"
            alt={event.title}
          />
        </div>
      ))}
    </section>
  );
}
