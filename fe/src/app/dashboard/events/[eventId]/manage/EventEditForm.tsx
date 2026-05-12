"use client";

import Link from "next/link";
import { useEffect, useState, useRef, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, CircleAlert, PencilLine } from "lucide-react";
import { useUser } from "@/lib/auth/useUser";
import { getErrorMessage, updateHostEvent } from "@/utils/api";
import { toast } from "sonner";
import type { HostEventSummary } from "@/utils/interfaces";

type ManageEventFormState = {
  title: string;
  description: string;
  location: string;
  eventDate: string;
  eventTime: string;
  posterImage: string;
  price: number;
  totalTickets: number;
  ticketPerStudent: number;
};

export default function EditEventForm({ currentEvent }: { currentEvent: any }) {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<ManageEventFormState>({
    title: "",
    description: "",
    location: "",
    eventDate: "",
    eventTime: "",
    posterImage: "",
    price: 0,
    totalTickets: 0,
    ticketPerStudent: 1,
  });
  const initializedRef = useRef(false);
  const isLocked =
    currentEvent?.isDeleted ||
    currentEvent?.status === "CANCELLED" ||
    currentEvent?.status === "COMPLETED";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "price" ||
        name === "totalTickets" ||
        name === "ticketPerStudent"
          ? Number(value)
          : value,
    }));
  };

  useEffect(() => {
    if (!currentEvent || initializedRef.current) return;

    setForm({
      title: currentEvent.title || "",
      description: currentEvent.description || "",
      location: currentEvent.location || "",
      eventDate: currentEvent.eventDate || currentEvent.date || "",
      eventTime: currentEvent.eventTime || currentEvent.time || "",
      posterImage:
        currentEvent.posterImage ||
        currentEvent.poster ||
        currentEvent.image ||
        "",
      price: Number(currentEvent.price ?? 0),
      totalTickets: Number(
        currentEvent.totalTickets ?? currentEvent.tickets ?? 0,
      ),
      ticketPerStudent: Number(
        currentEvent.ticketPerStudent ?? currentEvent.maxTicketPerStudent ?? 1,
      ),
    });

    initializedRef.current = true;
  }, [currentEvent]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLocked) {
      toast.error("This event can no longer be updated.");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        title: form.title,
        description: form.description,
        location: form.location,
        eventDate: form.eventDate,
        eventTime: form.eventTime,
        posterImage: form.posterImage,
        price: form.price,
        totalTickets: form.totalTickets,
        ticketPerStudent: form.ticketPerStudent,
      };

      const data = await updateHostEvent(currentEvent.id, payload);
      if (data.success) {
        toast.success("Event updated successfully");
        router.refresh();
        return;
      }

      toast.error(data.message || "Failed to update event");
    } catch (updateError) {
      toast.error(getErrorMessage(updateError));
    } finally {
      setSaving(false);
    }
  };

  if (!isLoaded || !isSignedIn || user?.role !== "HOST") {
    return (
      <div className="min-h-screen bg-[#111111] pt-28 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm text-white/55">Loading event manager...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <form onSubmit={handleUpdate} className=" ">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/55">
            {isLocked ? "Locked" : "Editable"}
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Field label="Title" full>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              maxLength={100}
              className="input"
            />
          </Field>

          <Field label="Poster Image URL" full>
            <input
              type="url"
              name="posterImage"
              value={form.posterImage}
              onChange={handleChange}
              className="input"
            />
          </Field>

          <Field label="Location">
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              maxLength={100}
              className="input"
            />
          </Field>

          <Field label="Price">
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              min="0"
              className="input"
            />
          </Field>

          <Field label="Date">
            <input
              type="date"
              name="eventDate"
              value={form.eventDate}
              onChange={handleChange}
              className="input"
            />
          </Field>

          <Field label="Time">
            <input
              type="time"
              name="eventTime"
              value={form.eventTime}
              onChange={handleChange}
              className="input"
            />
          </Field>

          <Field label="Total Tickets">
            <input
              type="number"
              name="totalTickets"
              value={form.totalTickets}
              onChange={handleChange}
              min="1"
              className="input"
            />
          </Field>

          <Field label="Max Tickets / Student">
            <input
              type="number"
              name="ticketPerStudent"
              value={form.ticketPerStudent}
              onChange={handleChange}
              min="1"
              max="8"
              className="input"
            />
          </Field>

          <Field label="Description" full>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={6}
              className="input resize-none"
            />
          </Field>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 border-t border-white/10 pt-5">
          <button
            type="submit"
            disabled={saving || isLocked}
            className="rounded-md bg-white/5 px-3 py-2 text-center justify-center font-medium flex items-center  gap-2 disabled:cursor-not-allowed disabled:opacity-50 w-2/3 mx-auto"
          >
            <PencilLine size={16} />
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  children,
  full = false,
}: {
  label: string;
  children: ReactNode;
  full?: boolean;
}) {
  return (
    <label className={full ? "md:col-span-2" : ""}>
      <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/40">
        {label}
      </span>
      {children}
    </label>
  );
}
