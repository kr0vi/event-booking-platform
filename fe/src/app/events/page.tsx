import Link from "next/link";
import { Search, MapPin, Landmark, Rss } from "lucide-react";
import axios from "axios";

export default async function EventsPage() {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/events`,
  );
  if (!data.success) {
    console.error("Failed to fetch events:", data.message);
    return (
      <div className="p-10 text-center text-red-500">
        Failed to load events. Please try again later.
      </div>
    );
  }
  let allEvents = data.data || [];
  console.log(data);

  return (
    <div className="min-h-screen flex flex-col font-sans overflow-x-hidden">
      <article className=" w-full h-[70vh]  border-white/70 border-b-2 bg-blue-900 relative p-1 flex overflow-hidden items-center justify-center">
        {/* <img
          src="/assets/images/graphic-buildings.jpg"
          alt="Event Placeholder"
          className="object-cover object-[0_0] w-full h-full m inset-0 mix-blend-screen absolute blur-lg"
        /> */}
        <div className=" mr-80 z-20">
          <h3 className="text-2xl font-medium text-white/60">
            Whats Happening in
          </h3>
          <h1 className=" text-5xl font-bold text-white  ">
            K R Mangalam University
          </h1>
        </div>
      </article>

      {/* Main Content Section */}
      <article className="flex-1 bg-[#1a56ff] w-full px-4 md:px-8 py-12">
        <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-20">
          {/* Left Column: Timeline & Events */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[26px] font-bold text-white tracking-tight">
                Events
              </h2>
              <div className="flex items-center gap-1.5">
                <button className="bg-white/10 hover:bg-white/20 text-white px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-colors border border-white/10 flex items-center gap-1.5">
                  <span className="text-lg leading-none mb-0.5">+</span> Submit
                  Event
                </button>
              </div>
            </div>

            {/* One Event Set */}
            {allEvents.map((event: any, index: number) => (
              <div
                key={index}
                className="relative border-l border-white/20 ml-2.5 pl-6 sm:pl-8 pb-12"
              >
                {/* CARD MARGIN SET */}
                <div
                  className={`${index === allEvents.length - 1 ? "" : "mb-10"}`}
                >
                  {/* Date Header */}
                  <div className="relative mb-5">
                    <div className="absolute -left-[29px] sm:-left-[37px] top-2 w-2 h-2 rounded-full bg-[#1a56ff] border-[2px] border-white/70"></div>
                    <h3 className="text-white font-bold text-base flex items-baseline gap-2 leading-none">
                      Saturday,
                      <span className="text-white/50 font-medium text-sm">
                        {event.date.split("-").reverse().join("-")}
                      </span>
                    </h3>
                  </div>
                  {/* Date Header */}

                  {/* Event Cards Set */}
                  <div className="flex flex-col gap-3.5">
                    <Link
                      href={`/events`}
                      className="block group focus:outline-none"
                    >
                      <div className="flex justify-between items-center bg-white/10 hover:bg-white/20 border border-white/30 rounded-2xl p-4 transition-all duration-300">
                        <div className="flex flex-col pr-4 overflow-hidden flex-1">
                          <span className="text-white/50 text-[13px] font-medium mb-1.5 tracking-wide">
                            {event.time}
                          </span>
                          <h4 className="text-white font-semibold text-[17px] leading-snug tracking-tight mb-2 group-hover:text-amber-100 transition-colors line-clamp-2 pr-2">
                            {event.title}
                          </h4>
                          <div className="flex items-center text-white/60 text-[13px] mb-1.5 min-w-0">
                            <div className="w-[18px] h-[18px] rounded-full bg-indigo-500/80 mr-2 shrink-0 border border-white/20 flex items-center justify-center text-[8px] text-white font-bold shadow-sm">
                              H
                            </div>
                            <span className="truncate pr-2">By Host Name</span>
                          </div>
                          <div className="flex items-center text-white/50 text-[13px]">
                            <MapPin
                              size={13}
                              className="mr-2 shrink-0 opacity-70"
                            />
                            <span className="truncate pr-2">
                              {event.location}
                            </span>
                          </div>
                        </div>

                        {/* Image right */}
                        <div className="w-[100px] h-[100px] sm:w-[124px] sm:h-[100px] bg-white/5 rounded-[12px] shrink-0 overflow-hidden relative border border-white/5 group-hover:border-white/15 transition-colors">
                          <img
                              src={event.posterImage}
                              className="w-full h-full object-cover transition-transform duration-700 ease-out"
                              alt="Event Cover"
                            />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                {/* CARD MARGIN SET */}
              </div>
            ))}
          </div>

          {/* Right Column: Sidebar */}
          <div className="w-full lg:w-[280px] xl:w-[320px] shrink-0 pt-2 lg:pt-14 pb-20">
            <div className="sticky top-10 flex flex-col">
              {/* Logo */}
              <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center mb-5 shadow-inner">
                <Landmark size={20} className="opacity-90" />
              </div>

              <h3 className="text-white font-bold text-[20px] tracking-tight mb-2.5">
                KRMU
              </h3>
              <p className="text-white/60 text-[13px] leading-relaxed mb-6 font-medium pr-4">
                Discover the hottest events in KRMU, and get notified of new
                events before they sell out.
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
