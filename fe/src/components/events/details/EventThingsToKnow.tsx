import { eventType } from "@/utils/interfaces";


export function EventThingsToKnow({ event }: { event: eventType }) {
  return (
    <section className="mt-14 pb-14">
      <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
        Things to know
      </h2>
      <ul className="mt-5 grid grid-cols-1 gap-x-10 gap-y-4 text-sm font-medium text-slate-800 md:grid-cols-2">
       things to know section
      </ul>
    </section>
  );
}
