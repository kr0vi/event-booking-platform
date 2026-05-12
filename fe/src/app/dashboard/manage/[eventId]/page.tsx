"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { api } from "@/utils/api";
import {
  ArrowLeft,
  Users,
  CalendarDays,
  MapPin,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useUser } from "@/lib/auth/useUser";
import {
  changeTimeFormat,
  getDayFromDate,
  getMonthFromDate,
} from "@/utils/helper";
import EditEventForm from "../../events/[eventId]/manage/EventEditForm";
import CancelEventPanel from "../../events/[eventId]/manage/CancelEventPanel";

export default function StaticManagePage() {
  const params = useParams<{ eventId: string }>();
  const { user, isSignedIn } = useUser();
  const [eventData, setEventData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const eventId = params?.eventId ?? "unknown";

  useEffect(() => {
    if (!isSignedIn || !user || user.role !== "HOST") {
      window.location.href = "/login";
    }
  }, [isSignedIn, user]);
  useEffect(() => {
    const fetchData = async () => {
      if (eventId === "unknown") return;
      try {
        const { data } = await api.get(`/host/events/${eventId}`);
        if (data.success) {
          setEventData(data.data);
        } else {
          console.error("Failed to fetch analytics: ", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch analytics", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [eventId]);
  if (!eventData || loading) {
    return (
      <main className="min-h-screen bg-[#131517] text-white pt-20 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60 mt-1">
                Personal • Hosted by Aditya Wadhawan
              </p>
            </div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white/80"
            >
              <ArrowLeft size={14} /> Event Page
            </Link>
          </div>
          <div className="rounded-lg border border-white/8 bg-[#111214] p-6"></div>
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-[#131517] text-white pt-20 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{eventData.title}</h1>
            <p className="text-sm text-white/60 mt-1">
              Personal • Hosted by {user?.name || "You"}
            </p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm font-medium text-white/80"
          >
            Event Page <ArrowUpRight size={14} />
          </Link>
        </div>

        <nav className="mb-6 flex gap-6 border-b border-white/6 pb-4 text-sm text-white/60">
          <span className="border-b-2 border-white pb-2">Overview</span>
          <span>Guests</span>
          <span>Registration</span>
          <span>Blasts</span>
          <span>Insights</span>
          <span>More</span>
        </nav>

        <div className="mb-6 flex items-center gap-3 justify-evenly w-full ">
          <button className="rounded-lg flex-1 bg-white/5 px-4 py-3 text-sm font-medium text-white/90">
            Invite Guests
          </button>
          <button className="rounded-lg flex-1 bg-white/5 px-4 py-3 text-sm font-medium text-white/90">
            Send a Blast
          </button>
          <button className="rounded-lg flex-1 bg-white/5 px-4 py-3 text-sm font-medium text-white/90">
            Share Event
          </button>
        </div>

        <div className="">
          <div className="rounded-2xl border border-white/8 bg-[#111214] p-6">
           

            <aside className=" border-white/8 bg-[#111214] p-6">
              <EditEventForm currentEvent={eventData} />
            </aside>

          </div>
        </div>

        <section className="my-8">
          <h3 className="text-lg font-semibold mb-3">Guests</h3>
          <div className="rounded-lg border border-white/8 bg-[#0e1011] p-4 text-sm text-white/60">
            Guest list preview — empty for now.
          </div>
        </section>
            <CancelEventPanel currentEvent={eventData} />

   
      </div>
    </main>
  );
}
