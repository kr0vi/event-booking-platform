"use client";

import { useUser } from "@/lib/auth/useUser";
import { api } from "@/utils/api";
import type { TicketType } from "@/utils/interfaces";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  LogOut,
  MapPin,
  Shield,
  Ticket,
} from "lucide-react";
import { toast } from "sonner";
import { UserAvatar } from "@/components/UserAvatar";

type TicketWithEvent = TicketType & {
  quantity?: number;
  event?: {
    id: string;
    title: string;
    location: string;
    date: string;
    time: string;
  };
};

const formatDate = (date: string) => {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return "Date TBD";
  }

  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsed);
};

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
    return "Time TBD";
  }

  const meridiem = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${String(minutes).padStart(2, "0")} ${meridiem}`;
};

export default function MePage() {
  const { user, isLoaded, isSignedIn, logout } = useUser();
  const router = useRouter();
  const [tickets, setTickets] = useState<TicketWithEvent[]>([]);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [ticketsError, setTicketsError] = useState("");

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/login");
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      return;
    }

    const fetchTickets = async () => {
      try {
        setLoadingTickets(true);
        setTicketsError("");
        const { data } = await api.get("/tickets");

        if (data.success && Array.isArray(data.data)) {
          setTickets(data.data);
        } else {
          setTickets([]);
          setTicketsError(
            data.message || "Could not load your tickets right now.",
          );
        }
      } catch (error: any) {
        setTickets([]);
        setTicketsError(
          error?.response?.data?.message ||
            error?.message ||
            "Could not load your tickets right now.",
        );
      } finally {
        setLoadingTickets(false);
      }
    };

    fetchTickets();
  }, [isLoaded, isSignedIn]);

  const upcomingTickets = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return tickets
      .filter((ticket) => {
        if (!ticket.event?.date) {
          return false;
        }

        const eventDate = new Date(ticket.event.date);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= today;
      })
      .sort((a, b) => a.event!.date.localeCompare(b.event!.date));
  }, [tickets]);

  const usedTicketsCount = useMemo(
    () => tickets.filter((ticket) => ticket.status === "USED").length,
    [tickets],
  );

  const validTicketsCount = useMemo(
    () => tickets.filter((ticket) => ticket.status === "VALID").length,
    [tickets],
  );

  const bookingCount = useMemo(() => {
    const orderIds = new Set(tickets.map((ticket) => ticket.orderId));
    return orderIds.size;
  }, [tickets]);

  const handleLogout = () => {
    logout();
    toast.success("You have been logged out.");
    router.push("/");
  };

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#131517] px-6 md:px-12 font-sans">
        <div className="text-white text-lg font-medium animate-pulse">
          Loading account...
        </div>
      </div>
    );
  }

  const displayName = user?.name?.trim() || "Student";
  const displayEmail = user?.email || "No email found";
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
  const recentTickets = [...tickets]
    .sort((a, b) => (b.event?.date || "").localeCompare(a.event?.date || ""))
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-[#131517] text-white px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-8 rounded-3xl border border-white/15 p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <UserAvatar
                userId={user?.id}
                name={user?.name}
                size={56}
                className="shrink-0 overflow-hidden"
              />
              <div>
                <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Welcome, {displayName}
                </h1>
                <p className="text-sm text-white/70 mt-1">{displayEmail}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/events"
                className="rounded-xl border border-white/20 bg-white/2 px-4 py-2.5 text-sm font-medium hover: transition-colors"
              >
                Explore Events
              </Link>

              <Link
                href="/tickets"
                className="rounded-xl border border-white/20 bg-white/2 px-4 py-2.5 text-sm font-medium hover: transition-colors"
              >
                My Tickets
              </Link>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-2.5 text-sm font-medium text-rose-100 hover:bg-rose-500/30 transition-colors cursor-pointer"
              >
                <LogOut size={16} />
                Log out
              </button>
            </div>
          </div>
        </header>

        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/15  p-5">
            <p className="text-xs uppercase tracking-wider text-white/55">
              Tickets Owned
            </p>
            <p className="mt-2 text-3xl font-semibold">{tickets.length}</p>
          </div>

          <div className="rounded-2xl border border-white/15  p-5">
            <p className="text-xs uppercase tracking-wider text-white/55">
              Valid Tickets
            </p>
            <p className="mt-2 text-3xl font-semibold">{validTicketsCount}</p>
          </div>

          <div className="rounded-2xl border border-white/15  p-5">
            <p className="text-xs uppercase tracking-wider text-white/55">
              Used Tickets
            </p>
            <p className="mt-2 text-3xl font-semibold">{usedTicketsCount}</p>
          </div>

          <div className="rounded-2xl border border-white/15  p-5">
            <p className="text-xs uppercase tracking-wider text-white/55">
              Bookings
            </p>
            <p className="mt-2 text-3xl font-semibold">{bookingCount}</p>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="rounded-2xl border border-white/15  p-6 lg:col-span-1">
            <h2 className="text-lg font-semibold tracking-tight">
              Account Details
            </h2>
            <div className="mt-5 space-y-4">
              <div>
                <p className="text-xs uppercase text-white/55 tracking-wider">
                  Name
                </p>
                <p className="mt-1 text-sm font-medium">{displayName}</p>
              </div>
              <div className="h-px bg-white/10" />
              <div>
                <p className="text-xs uppercase text-white/55 tracking-wider">
                  Email
                </p>
                <p className="mt-1 text-sm font-medium break-all">
                  {displayEmail}
                </p>
              </div>
              <div className="h-px bg-white/10" />
              <div>
                <p className="text-xs uppercase text-white/55 tracking-wider">
                  Role
                </p>
                <p className="mt-1 text-sm font-medium">
                  {user?.role || "USER"}
                </p>
              </div>
              <div className="h-px bg-white/10" />
            </div>

            <div className="mt-6 rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-4">
              <div className="flex items-start gap-3">
                <Shield size={16} className="mt-0.5 text-emerald-200" />
                <p className="text-xs leading-relaxed text-emerald-100/90">
                  Your account is secured with token-based authentication. Keep
                  your login credentials private.
                </p>
              </div>
            </div>

            {user?.role !== "ORGANIZER" ? (
              <Link
                href="/organizer/signup"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-blue-200 hover:text-white"
              >
                Become an Organizer
                <ArrowRight size={15} />
              </Link>
            ) : (
              <Link
                href="/dashboard"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-blue-200 hover:text-white"
              >
                Go to Organizer Dashboard
                <ArrowRight size={15} />
              </Link>
            )}
          </section>

          <section className="rounded-2xl border border-white/15  p-6 lg:col-span-2">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold tracking-tight">
                Upcoming Events From Your Tickets
              </h2>
              <Link
                href="/tickets"
                className="text-sm text-white/70 hover:text-white inline-flex items-center gap-1.5"
              >
                View all tickets
                <ArrowRight size={14} />
              </Link>
            </div>

            {loadingTickets ? (
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-24 rounded-xl border border-white/10  animate-pulse"
                  />
                ))}
              </div>
            ) : ticketsError ? (
              <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-100">
                {ticketsError}
              </div>
            ) : upcomingTickets.length === 0 ? (
              <div className="rounded-xl border border-white/10  p-8 text-center">
                <Ticket className="mx-auto mb-3 opacity-60" size={26} />
                <p className="font-medium">No upcoming events booked yet.</p>
                <p className="mt-2 text-sm text-white/65">
                  Browse events and book your first campus experience.
                </p>
                <Link
                  href="/events"
                  className="mt-4 inline-flex rounded-lg border border-white/5 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/20"
                >
                  Browse Events
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingTickets.slice(0, 5).map((ticket) => (
                  <Link
                    key={ticket.id}
                    href={`/tickets/${ticket.id}`}
                    className="block rounded-xl border border-white/15  p-4 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-medium text-base">
                          {ticket.event?.title || "Untitled Event"}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-3 text-xs text-white/65">
                          <span className="inline-flex items-center gap-1.5">
                            <CalendarDays size={13} />
                            {ticket.event?.date
                              ? formatDate(ticket.event.date)
                              : "Date TBD"}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Clock3 size={13} />
                            {ticket.event?.time
                              ? formatTime(ticket.event.time)
                              : "Time TBD"}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin size={13} />
                            {ticket.event?.location || "Location TBD"}
                          </span>
                        </div>
                      </div>

                      <div className="text-left sm:text-right">
                        <p className="text-xs uppercase tracking-wider text-white/55">
                          Status
                        </p>
                        <p className="mt-1 text-sm font-semibold text-emerald-200">
                          {ticket.status}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>

        <section className="mt-6 rounded-2xl border border-white/15  p-6">
          <h2 className="text-lg font-semibold tracking-tight">
            Recent Booking Activity
          </h2>

          {loadingTickets ? (
            <p className="mt-4 text-sm text-white/60">Loading activity...</p>
          ) : recentTickets.length === 0 ? (
            <p className="mt-4 text-sm text-white/60">No bookings yet.</p>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              {recentTickets.map((ticket) => (
                <Link
                  key={`${ticket.id}-activity`}
                  href={`/tickets/${ticket.id}`}
                  className="rounded-xl border border-white/10  p-4 hover:bg-white/10 transition-colors"
                >
                  <p className="font-medium">
                    {ticket.event?.title || "Event"}
                  </p>
                  <p className="mt-1 text-xs text-white/65">
                    Order #{ticket.orderId.slice(0, 8)}
                  </p>
                  <p className="mt-1 text-xs text-white/65">
                    {ticket.event?.date
                      ? formatDate(ticket.event.date)
                      : "Date TBD"}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
