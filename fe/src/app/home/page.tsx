"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/lib/auth/context";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api";
import { EventCard } from "@/components/events/EventCard";
import Link from "next/link";
import { useUser } from "@/lib/auth/useUser";
import { Compass, Landmark, MapPin } from "lucide-react";
import { getDayFromDate } from "@/utils/helper";

export default function HomePage() {
  const { isSignedIn, isLoaded, user } = useUser();
  const router = useRouter();
  const [events, setEvents] = useState<any[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn) {
        router.push("/login");
      }
    }
    else{
      fetchMyEvents();
    }
  }, [isLoaded, isSignedIn, user, router]);

  const fetchMyEvents = async () => {
    try {
      setLoadingEvents(true);
      const res = await api.get(`/events/my-events`);
      if (res.data.success) {
        setEvents(res.data.data);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error("Failed to fetch events", error);
      setEvents([]);
    } finally {
      setLoadingEvents(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#131517]">
        <p className="text-white/50">Loading...</p>
      </div>
    );
  }
console.log(events[0]);
  return (
    <div className="min-h-screen bg-[#131517] pt-24 pb-12 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Events
            </h1>
            <p className="text-white/60 mt-1 text-sm font-medium">
              All Events you are going to.
            </p>
          </div>
          <Link
            href="/events"
            className="rounded-lg text-sm font-semibold text-white transition-colors"
          >
            <div className="flex items-center justify-center gap-2">
              <Compass size={18} /> <p>Discover</p>
            </div>
          </Link>
        </div>

        {loadingEvents ? (
          <p className="text-white/50 text-sm font-medium">
            Loading your events...
          </p>
        ) : events.length === 0 ? (
          <div className="lp-12 text-center">
            <div className="w-40 h-40 mx-auto bg-white/10 border border-dashed border-white/40 rounded-full flex items-center justify-center">
              <Landmark className="text-white/50 w-30 h-30" />
            </div>
            <h3 className=" text-2xl font-medium mt-4 text-white">No events</h3>
            <p className="mt-1 text-sm text-white/50">
              You haven't created any events yet.
            </p>
            <div className="mt-6">
              <Link
                href="/create-event"
                className="inline-flex items-center rounded-lg bg-white/10 border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
              >
                + New Event
              </Link>
            </div>
          </div>
        ) : (
          <article className="flex-1 bg-[#131517] w-full px-4 md:px-8 py-12">
            <div className=" w-275 mx-auto relative mb-12 flex items-center justify-end">
              {/* <div className="flex items-center justify-evenly bg-white/5 w-[18%] rounded-lg gap-4">
                <p className=" font-medium text-white tracking-tight px-3 py-2 bg-white/10 rounded-lg flex-1">
                  Upcoming
                </p>
                <p className="  text-white tracking-tight px-3 flex-1 ">Past</p>
              </div> */}{" "}
              {/*UPCOMING PAST CARD*/}
            </div>
            <div className="max-w-275 mx-auto flex flex-col lg:flex-row gap-10 lg:gap-20">
              <div className="flex-1 max-w-2xl mx-auto">
                {events.map((evn: any, index: number) => {
                  let event = evn.event;
                  return (
                    <div
                      key={index}
                      className="relative border-l border-white/20  ml-2.5 pl-6 sm:pl-8 pb-2"
                    >
                      <div
                        className={`${index === events.length - 1 ? "" : "mb-5"} `}
                      >
                        {/* Date Header */}
                        <div className="mb-2 absolute top-[20%] -left-[35%]">
                          <h3 className="text-white font-bold text-base flex items-baseline gap-2 leading-none">
                            {getDayFromDate(event.date)},{" "}
                            <span className="text-white/50 font-medium ">
                              {event.date
                                .split("-")
                                .reverse()
                                .join("-")
                                .slice(0, 5)}
                            </span>
                          </h3>
                        </div>

                        <div className="absolute sm:-left-1 top-2 w-2 h-2 rounded-full bg-[#ffffff] border-2 border-white/70"></div>

                        {/* Event Cards Set */}
                        <div className="flex flex-col gap-3.5 mb-15">
                          <Link
                            href={`/events/${event.id}`}
                            className="block group focus:outline-none"
                          >
                            <div className="flex justify-between items-center  bg-white/3 hover:bg-white/10 border border-white/20 rounded-2xl p-6 transition-all duration-300">
                              <div className="flex flex-col pr-4 overflow-hidden flex-1 ">
                                <span className="text-white/50 text-base font-medium mb-1.5 tracking-wide">
                                  {event.time}
                                </span>
                                <h4 className="text-white font-semibold text-xl pb-3 leading-snug tracking-tight mb-2  transition-all duration-300 line-clamp-2 pr-2">
                                  {event.title}
                                </h4>
                                <div className="flex items-center text-white/60 text-[13px] mb-1.5 min-w-0">
                                  <div className="w-[18px] h-[18px] rounded-full bg-indigo-500/80 mr-2 shrink-0 border border-white/20 flex items-center justify-center text-[8px] text-white font-bold shadow-sm">
                                    H
                                  </div>
                                  <span className="truncate pr-2">
                                    By Host Name
                                  </span>
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
                                <div className="bg-green-500 p-1 mt-4 text-white rounded-sm w-fit text-xs font-semibold ">
                                  {" "}
                                  Going
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
                  );
                })}
              </div>
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
