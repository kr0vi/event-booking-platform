"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { api, getErrorMessage } from "@/utils/api";
import { useAuth } from "@/utils/auth/AuthContext";
import {
  ApiResponse,
  EventType,
  OrderType,
  TicketType,
} from "@/utils/interfaces";

type CreateOrderResponse = {
  order: OrderType;
  ticket: TicketType;
};

export function EventBookingCard({ event }: { event: EventType }) {
  const { token, isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const ticketsLeft = Math.max(event.totalTickets - event.ticketsSold, 0);
  const isSoldOut = ticketsLeft <= 0 || event.status !== "OPEN";
  const numericPrice = event.price;
  const totalAmount = useMemo(
    () => numericPrice * quantity,
    [numericPrice, quantity],
  );

  const handleBook = async () => {
    if (!isAuthenticated || !token) {
      setError("Please login first to book tickets.");
      return;
    }

    if (isSoldOut) {
      setError("This event is sold out.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const { data } = await api.post<ApiResponse<CreateOrderResponse>>(
        "/orders",
        {
          eventId: event.id,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!data.success) {
        setError(data.message || "Failed to book tickets.");
        return;
      }

      setSuccessMessage(
        "Booking confirmed. Your ticket is now available in My Tickets.",
      );
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_0_rgba(15,23,42,0.04)]">
      <div className="space-y-4 border-b border-slate-200 pb-5">
        <div className="flex items-start gap-3">
          <span className="mt-1 grid h-10 w-10 place-content-center rounded-xl border border-slate-200 text-slate-500">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M12 21C16.5 15.7 19 12.6 19 9A7 7 0 1 0 5 9c0 3.6 2.5 6.7 7 12Z"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <circle cx="12" cy="9" r="2.2" fill="currentColor" />
            </svg>
          </span>
          <div className="flex-1">
            <p className="text-base font-bold leading-6 text-slate-900">
              {event.location}
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-500">
              {ticketsLeft} tickets left
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="mt-1 grid h-10 w-10 place-content-center rounded-xl border border-slate-200 text-slate-500">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect
                x="4"
                y="6"
                width="16"
                height="14"
                rx="3"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <path
                d="M8 3V8M16 3V8M4 10.5H20"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <div className="flex-1">
            <p className="text-base font-bold leading-6 text-slate-900">
              Gates open at {event.time}
            </p>
            <button
              type="button"
              className="mt-1 text-sm font-semibold text-slate-600 hover:text-slate-900"
            >
              View full schedule and timeline
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-slate-100 p-3">
        <p className="text-sm font-semibold text-slate-700">Quantity</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
            className="grid h-8 w-8 place-content-center rounded-md border border-slate-300 bg-white text-sm font-bold text-slate-700"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="w-8 text-center text-sm font-bold text-slate-900">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() =>
              setQuantity((prev) =>
                Math.min(prev + 1, Math.max(ticketsLeft, 1)),
              )
            }
            className="grid h-8 w-8 place-content-center rounded-md border border-slate-300 bg-white text-sm font-bold text-slate-700"
            aria-label="Increase quantity"
            disabled={quantity >= ticketsLeft}
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="text-2xl font-extrabold text-slate-900">
          INR{" "}
          {Number.isFinite(numericPrice)
            ? numericPrice.toLocaleString("en-IN")
            : event.price}
          <span className="ml-1 text-xs font-medium text-slate-400">
            x {quantity}
          </span>
        </p>
        <button
          type="button"
          onClick={handleBook}
          disabled={loading || isSoldOut}
          className="rounded-2xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {loading ? "Booking..." : isSoldOut ? "Sold out" : "Book Tickets"}
        </button>
      </div>

      <p className="mt-2 text-right text-xs font-semibold text-slate-500">
        Total: INR {totalAmount.toLocaleString("en-IN")}
      </p>

      {!isAuthenticated ? (
        <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-700">
          Login from the top-right to complete booking.
        </p>
      ) : null}

      {error ? (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}

      {successMessage ? (
        <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
          {successMessage}{" "}
          <Link href="/tickets" className="underline">
            View tickets
          </Link>
        </p>
      ) : null}
    </aside>
  );
}
