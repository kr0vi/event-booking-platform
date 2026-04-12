import axios from "axios";
import Link from "next/link";
import { ArrowLeft, MapPin, CalendarDays, Clock } from "lucide-react";
import ConfirmOrderButton from "@/components/checkout/ConfirmOrderButton";
import BuyEventForm from "@/components/events/BuyEventForm";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function CheckoutPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const eventId = searchParams.eventId as string;

  if (!eventId) {
    return (
      <main className="min-h-screen bg-[#1a56ff] text-white flex flex-col items-center justify-center p-6">
        <p className="text-xl mb-4 font-semibold text-white/80">No event selected.</p>
        <Link href="/events" className="text-blue-200 hover:text-white underline underline-offset-4 transition">
          Return to Events
        </Link>
      </main>
    );
  }

  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events/${eventId}`);

  if (!data.success) {
    return (
      <main className="min-h-screen bg-[#1a56ff] text-white flex flex-col items-center justify-center p-6">
        <p className="text-xl mb-4 font-semibold text-red-300">Failed to load event details.</p>
        <Link href="/events" className="text-blue-200 hover:text-white underline underline-offset-4 transition">
          Return to Events
        </Link>
      </main>
    );
  }

  const event = data.data;

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
                  src={event.posterImage}
                  // src="https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=1,background=white,quality=75,width=400,height=400/gallery-images/ta/8c12c847-8485-42ff-ab48-eaf02538477a"
                  alt={event.title}
                  className="w-full object-cover h-full z-10"
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

            <BuyEventForm eventId={event.id} />

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

      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-100 h-screen flex items-center justify-center ">
        <div className="relative z-10 max-w-xl mx-auto">
          <Link
            href={`/events/${eventId}`}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition font-medium text-sm"
          >
            <ArrowLeft size={16} />
            Back to Event
          </Link>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <h1 className="text-3xl font-bold mb-2">Checkout</h1>
            <p className="text-white/60 mb-8 pb-6 border-b border-white/10">
              Review your selection below to complete the free registration.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center mb-8">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-white/5 border border-white/10 overflow-hidden shrink-0">
                <img
                  src={
                    event.posterImage 
                    // "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=1,background=white,quality=75,width=400,height=400/gallery-images/ta/8c12c847-8485-42ff-ab48-eaf02538477a"
                  }
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 overflow-hidden">
                <h2 className="text-xl font-bold leading-tight mb-3 truncate">
                  {event.title}
                </h2>
                <div className="space-y-1.5 text-sm text-white/70">
                  <div className="flex items-center gap-2.5">
                    <CalendarDays size={14} className="opacity-70 shrink-0" />
                    <span className="truncate">
                      {event.date.split("-").reverse().join("-")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock size={14} className="opacity-70 shrink-0" />
                    <span className="truncate">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin size={14} className="opacity-70 shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <ConfirmOrderButton eventId={eventId} />
          </div>
        </div>
      </div>
    </main>
  );
}