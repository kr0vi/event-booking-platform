"use client";

import { useState, useEffect } from "react";
import { api } from "@/utils/api";
import Link from "next/link";
import { ArrowLeft, Ticket as TicketIcon } from "lucide-react";
import { useUser } from "@/lib/auth/useUser";
import { UserAvatar } from "@/components/UserAvatar";

function TicketCard({ ticket }: { ticket: any }) {
  const ticketIdPrefix = ticket?.id ? String(ticket.id).split("-")[0] : "N/A";
  const eventDate = ticket?.event?.date
    ? String(ticket.event.date).split("-").reverse().join("-")
    : "Date TBD";
  const eventTime = ticket?.event?.time || "Time TBD";
  const eventLocation = ticket?.event?.location || "Location TBD";
  const eventHref = ticket?.eventId ? `/events/${ticket.eventId}` : "/events";

  // console.log("Rendering TicketCard for ticket ID:", ticket);
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden flex flex-col md:flex-row relative shadow-lg hover:shadow-xl transition-all">
      {/* Deco dots */}
      <Link
        href={`/tickets/${ticket.id}`}
        className="flex-1 flex flex-col md:flex-row"
      >
        <div className="absolute top-[40%] -left-3 w-6 h-6 bg-[#131517] rounded-full transform -translate-y-1/2 md:block hidden opacity-80 border-r border-white/20"></div>
        <div className="absolute top-[40%] -right-3 w-6 h-6 bg-[#131517] rounded-full transform -translate-y-1/2 md:block hidden opacity-80 border-l border-white/20"></div>

        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {ticket.status || "VALID"}
              </span>
              <span className="text-xs font-mono text-white/50 tracking-wider">
                #{ticketIdPrefix}
              </span>
            </div>

            {ticket.event ? (
              <>
                <h2 className="text-xl font-bold mb-2 leading-tight pr-4">
                  {ticket.event.title}
                </h2>
                <p className="text-sm text-white/70 mb-1">
                  {eventDate} &bull; {eventTime}
                </p>
                <p className="text-sm text-white/70 mb-5 line-clamp-1">
                  {eventLocation}
                </p>
              </>
            ) : (
              <div className="animate-pulse space-y-3 mb-6 mt-1">
                <div className="h-5 bg-white/20 rounded w-3/4"></div>
                <div className="h-3 bg-white/20 rounded w-1/2"></div>
                <div className="h-3 bg-white/20 rounded w-2/3"></div>
              </div>
            )}
          </div>

          <Link
            href={eventHref}
            className="text-sm font-medium text-white/70 hover:text-white transition w-fit inline-flex items-center gap-1.5"
          >
            View Event <ArrowLeft size={14} className="rotate-180" />
          </Link>
        </div>

        <div className="w-full md:w-48 bg-white/5 p-6 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-white/20 border-dashed relative">
          <div className="w-28 h-28 bg-white rounded-xl p-2 mb-3 shadow-inner">
            {ticket.qrImage ? (
              <img
                src={ticket.qrImage}
                alt="Ticket QR"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center text-gray-400 text-[10px] uppercase font-bold text-center border-2 border-dashed border-gray-300">
                QR Pending
              </div>
            )}
          </div>
          <p className="text-[10px] text-white/50 uppercase tracking-widest text-center font-semibold">
            Scan to Enter
          </p>
        </div>
      </Link>
    </div>
  );
}

export default function TicketsPage() {
  const { user, isLoaded, isSignedIn, logout } = useUser();
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      window.location.href = "/login";
    }
  }, [isLoaded, isSignedIn]);
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const { data } = await api.get("/tickets");
        if (data.success) {
          setTickets(data.data);
        } else {
          setError(data.message || "Failed to load tickets");
        }
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch tickets. Are you logged in?",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return (
    <main className="relative min-h-screen bg-[#131517] text-white overflow-hidden py-12 px-6">
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/10 gap-4">
          <div className="flex items-center gap-3">
            <TicketIcon size={32} className="opacity-80" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                My Tickets
              </h1>
              <p className="text-sm text-white/50 mt-1">
                Your booked events and entry passes.
              </p>
            </div>
          </div>
          {isSignedIn && isLoaded ? (
            <Link
              href="/me"
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-2 py-1.5 text-sm font-medium text-white/75 hover:bg-white/10 transition-colors"
            >
              <UserAvatar userId={user?.id} name={user?.name} size={28} />
              <span className="hidden sm:inline">{user?.name || "My Account"}</span>
            </Link>
          ) : null}
        </div>

        <Link
          href="/events"
          className="mb-10 inline-flex text-sm font-medium text-white/70 hover:text-white transition items-center gap-1.5 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full"
        >
          Browse Events <ArrowLeft size={14} className="rotate-180" />
        </Link>

        {loading ? (
          <div className="flex flex-col gap-5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 bg-white/10 animate-pulse rounded-2xl border border-white/10 shadow-sm"
              ></div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-8 text-center text-red-100 max-w-lg mx-auto mt-10">
            <p className="text-lg font-medium mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-red-500/20 hover:bg-red-500/30 rounded-xl text-sm font-semibold transition"
            >
              Try Again
            </button>
          </div>
        ) : tickets.length === 0 ? (
          <div className=" p-16 text-center max-w-xl mx-auto mt-10 ">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <TicketIcon size={40} className="text-white/40" />
            </div>
            <h2 className="text-2xl font-bold mb-3">No tickets found</h2>
            <p className="text-white/60 mb-8 leading-relaxed max-w-xs mx-auto">
              You haven't registered for any events yet. Discover upcoming
              events and secure your spot!
            </p>
            <Link
              href="/events"
              className="inline-flex bg-white rounded-2xl text-black px-8 py-3 font-bold hover:bg-[#131517] hover:text-white  transition shadow-white/20"
            >
              Explore Events
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {tickets.map((ticket, index) => (
              <TicketCard
                key={ticket?.id ? `${ticket.id}-${index}` : `ticket-${index}`}
                ticket={ticket}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
