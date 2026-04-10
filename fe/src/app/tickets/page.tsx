"use client";

import { useEffect, useState } from "react";
import { api, getErrorMessage } from "@/utils/api";
import { useAuth } from "@/utils/auth/AuthContext";
import { ApiResponse, TicketType } from "@/utils/interfaces";
import Link from "next/link";

export default function TicketsPage() {
  const { token, isAuthenticated, isBootstrapping } = useAuth();
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTickets() {
      if (!isAuthenticated || !token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get<ApiResponse<TicketType[]>>("/tickets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!data.success) {
          setError(data.message || "Failed to fetch tickets.");
          return;
        }

        setTickets(data.data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }

    void loadTickets();
  }, [isAuthenticated, token]);

  if (isBootstrapping) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-10 text-sm font-semibold text-slate-700 sm:px-6 lg:px-8">
        Checking your session...
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-slate-900">My Tickets</h1>
        <p className="mt-2 text-sm text-slate-600">
          Please login to view your booked tickets.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
        My Tickets
      </h1>

      {loading ? (
        <p className="mt-6 text-sm font-semibold text-slate-700">
          Loading your tickets...
        </p>
      ) : error ? (
        <p className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : tickets.length === 0 ? (
        <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 px-4 py-5 text-sm font-medium text-slate-700">
          No tickets found. Browse events and make your first booking.
          <div className="mt-3">
            <Link
              href="/events"
              className="font-bold text-slate-900 underline underline-offset-2"
            >
              Explore events
            </Link>
          </div>
        </div>
      ) : (
        <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tickets.map((ticket) => (
            <article
              key={ticket.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                Ticket
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                ID: {ticket.id.slice(0, 8)}...
              </p>

              <div className="mt-3 rounded-lg border border-slate-200 p-2">
                <img
                  src={ticket.qrImage}
                  alt="Ticket QR"
                  className="h-48 w-full rounded object-contain"
                />
              </div>

              <div className="mt-3 space-y-1 text-sm font-medium text-slate-700">
                <p>Status: {ticket.status}</p>
                <p>Event ID: {ticket.eventId}</p>
                <p>Order ID: {ticket.orderId}</p>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
