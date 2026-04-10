import { EventsHomePage } from "@/components/events/EventsHomePage";

export default function EventsPage() {
  // return <EventsHomePage />;
  return (
    <main className="min-h-screen bg-[#1a56ff] text-white   relative overflow-hidden">
      <article className=" w-full h-[70vh]  border-white/30 border-b-2 relative p-1 flex overflow-hidden items-center justify-center">
        <img
          src="/assets/images/graphic-buildings.jpg"
          alt="Event Placeholder"
          className="object-cover object-[0_0] w-full h-full m inset-0 absolute blur-lg"
        />
        <div className=" mr-80 z-20">
          <h3 className="text-2xl font-medium text-white/60">
            Whats Happening in
          </h3>
          <h1 className=" text-5xl font-bold text-white  ">
            K R Mangalam University
          </h1>
        </div>
      </article>
    </main>
  );
}
