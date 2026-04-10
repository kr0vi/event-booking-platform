import { EventType } from "@/utils/interfaces";

export function EventThingsToKnow({ event }: { event: EventType }) {
  const thingsToKnow = event.thingsToKnow || [];

  if (thingsToKnow.length === 0) {
    return null;
  }

  return (
    <section className="mt-14 pb-14">
      <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
        Things to know
      </h2>
      <ul className="mt-5 grid grid-cols-1 gap-x-10 gap-y-4 text-sm font-medium text-slate-800 md:grid-cols-2">
        {thingsToKnow.map((item) => (
          <li key={item} className="flex items-start gap-3 leading-6">
            <span className="mt-1.5 h-2.5 w-2.5 rounded-full border border-slate-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
