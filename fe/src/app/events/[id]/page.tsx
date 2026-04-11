import BuyEventForm from "@/components/events/BuyEventForm";
import axios from "axios";
import { CalendarDays, MapPin } from "lucide-react";

type EventPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/events/${id}`,
  );
  console.log(data);
  if (!data.success) {
    console.error("Failed to fetch event details:", data.message);
    return (
      <div className="p-10 text-center text-red-500">
        Failed to load event details. Please try again later.
      </div>
    );
  }
  const event = data.data;
  console.log(event.highlights);
  return (
    <main className="relative  min-h-screen bg-[#1a56ff] text-white overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed opacity-50 block inset-0 h-full w-full  object-cover mix-blend-screen pointer-events-none"
        src={"/assets/video/warp-effect.mp4"}
      ></video>
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-8 md:px-10 md:py-10">
        <section className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="h-95 w-full bg-[#fff201] rounded-2xl relative ">
              <div className="absolute inset-0 bg-yellow-400 opacity-40 blur-[80px]  -z-10" />
              <div className="h-95 w-full rounded-2xl relative border  border-blue-300/40 overflow-hidden">
                <img
                  // src={event.posterImage}
                  src="https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=1,background=white,quality=75,width=400,height=400/gallery-images/ta/8c12c847-8485-42ff-ab48-eaf02538477a"
                  alt={event.title}
                  className="w-full object-contain h-full z-10"
                />
              </div>
            </div>

            <div className="mt-8 space-y-5 text-sm ">
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-2 text-blue-200">Hosted By</p>
                  <p className="font-semibold">Young Designers India UID</p>
                </div>
                <div>
                  <p className="mb-2 font-semibold text-xs rounded-full p-2 text-white/80 bg-white/10 border border-white/20">
                    {event.totalTickets - event.ticketsSold} Slots Left
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-2 text-blue-200">33 Going</p>
                <div className="flex -space-x-2">
                  {["A", "N", "R", "S", "+3"].map((name) => (
                    <div
                      key={name}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-100/70 bg-white text-xs font-semibold text-blue-900"
                    >
                      {name}
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-blue-200">
                  Srishti, Namrta Banka and 31 others
                </p>
              </div>

              <p className="w-fit rounded-full border border-blue-300/40 px-3 py-1 text-xs text-blue-100">
                # Arts &amp; Culture
              </p>
            </div>
          </div>

          <div className=" h-screen overflow-y-auto">
            <h1 className="text-4xl font-bold leading-tight ">{event.title}</h1>

            <div className="mt-3 space-y-1 text-sm text-white/60 font-medium">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-white/10 border relative border-white/20  rounded-lg text-center w-8 h-8  text-[10px]">
                  <div className="bg-white/20 w-full absolute top-0 left-0">
                    Apr
                  </div>
                  <p className="absolute bottom-0 left-0 w-full text-center">
                    11
                  </p>
                </div>
                <div>
                  <p>Saturday, {event.date.split("-").reverse()[1]} April</p>
                  <p>{event.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-white/10 border border-white/20  rounded-lg scale-90 p-1">
                  <MapPin />
                </div>
                <p className="text-base">{event.location}</p>
              </div>
            </div>

           <BuyEventForm />

            <div className="mt-8 ">
              <h2 className="border-b border-blue-200/40 pb-2 text-2xl font-semibold">
                About Event
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-blue-50">
                {event.description
                  .split(".")
                  .map((sentence: string, index: number) => (
                    <p key={index}>{sentence.trim()}</p>
                  ))}
                <ul className="list-inside list-disc space-y-1 text-blue-100">
                  {event.thingsToKnow.map(
                    (highlight: string, index: number) => (
                      <li key={index}>{highlight}</li>
                    ),
                  )}
                </ul>

                <div className=" overflow-hidden my-20 ">
                  <h1 className="font-semibold ml-3 text-white/80">Location</h1>
                  <hr className="text-white/40 w-full mb-3" />
                  <p className="text-white font-medium ml-3 mb-3">
                    {event.location}
                  </p>
                  <div className="border-2 border-white rounded-2xl overflow-hidden">
                    <iframe
                      width="100%"
                      height="200"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      src="https://www.google.com/maps?q=28.6139,77.2090&z=15&output=embed"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
