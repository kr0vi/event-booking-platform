import { eventType } from "@/utils/interfaces";

export function EventDetailHeader({ event }: { event: eventType }) {
  return (
    <section>
      <h1 className="text-xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-[30px] md:leading-[1.15]">
        {event.title}
      </h1>
      <p className="mt-2 text-xs font-semibold text-slate-500 md:text-sm">
        <span className="text-violet-600">{event.date}</span>
        <span className="px-2 text-slate-400">|</span>
        <span>{event.location}</span>
      </p>
    </section>
  );
}
