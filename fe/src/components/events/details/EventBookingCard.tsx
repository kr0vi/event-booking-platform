import type { EventCardData } from "../events-data";

type EventBookingCardProps = {
  event: EventCardData;
};

export function EventBookingCard({ event }: EventBookingCardProps) {
  const numericPrice = Number.parseInt(event.price.replace(/[^0-9]/g, ""), 10);

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_0_rgba(15,23,42,0.04)]">
      <div className="space-y-4 border-b border-slate-200 pb-5">
        <div className="flex items-start gap-3">
          <span className="mt-1 grid h-10 w-10 place-content-center rounded-xl border border-slate-200 text-slate-500">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M12 21C16.5 15.7 19 12.6 19 9A7 7 0 1 0 5 9c0 3.6 2.5 6.7 7 12Z"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <circle cx="12" cy="9" r="2.2" fill="currentColor" />
            </svg>
          </span>
          <div className="flex-1">
            <p className="text-base font-bold leading-6 text-slate-900">
              {event.venue}
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-500">
              {event.distanceLabel}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="mt-1 grid h-10 w-10 place-content-center rounded-xl border border-slate-200 text-slate-500">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect
                x="4"
                y="6"
                width="16"
                height="14"
                rx="3"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <path
                d="M8 3V8M16 3V8M4 10.5H20"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <div className="flex-1">
            <p className="text-base font-bold leading-6 text-slate-900">
              {event.gatesOpenLabel}
            </p>
            <button
              type="button"
              className="mt-1 text-sm font-semibold text-slate-600 hover:text-slate-900"
            >
              View full schedule and timeline
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="text-2xl font-extrabold text-slate-900">
          INR{" "}
          {Number.isFinite(numericPrice)
            ? numericPrice.toLocaleString("en-IN")
            : event.price}
          <span className="ml-1 text-xs font-medium text-slate-400">
            onwards
          </span>
        </p>
        <button
          type="button"
          className="rounded-2xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-slate-700"
        >
          Book Tickets
        </button>
      </div>
    </aside>
  );
}
