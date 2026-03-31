import type { EventCardData } from "../events-data";

type EventDetailHeaderProps = {
  event: EventCardData;
};

export function EventDetailHeader({ event }: EventDetailHeaderProps) {
  const [datePart, venuePart] = event.dateLabel.includes("|")
    ? event.dateLabel.split("|")
    : [event.dateLabel, event.venue];

  return (
    <section>
      <h1 className="text-xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-[30px] md:leading-[1.15]">
        {event.title}
      </h1>
      <p className="mt-2 text-xs font-semibold text-slate-500 md:text-sm">
        <span className="text-violet-600">{datePart.trim()}</span>
        <span className="px-2 text-slate-400">|</span>
        <span>{venuePart.trim()}</span>
      </p>
    </section>
  );
}
