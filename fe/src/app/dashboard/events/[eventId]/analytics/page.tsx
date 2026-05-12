"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { LineChart, ArrowLeft, CalendarDays, Users, UserCheck, Gauge, Lock } from "lucide-react";
import { useUser } from "@/lib/auth/useUser";
import { api, getErrorMessage } from "@/utils/api";
import type {
  HostEventAnalytics,
  HostEventSummary,
} from "@/utils/interfaces";

type AnalyticsState = {
  data: HostEventAnalytics | null;
  loading: boolean;
  error: string | null;
};

export default function HostEventAnalyticsPage() {
  const params = useParams<{ eventId: string }>();
  const eventId = params?.eventId;
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const [events, setEvents] = useState<HostEventSummary[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsState>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn || user?.role !== "HOST") {
      router.push("/login");
      return;
    }

    const loadEvents = async () => {
      try {
        setEventsLoading(true);
        setEventsError(null);
        const { data } = await api.get("/host/events");
        if (data.success) {
          setEvents(data.data ?? []);
        } else {
          setEvents([]);
          setEventsError(data.message || "Failed to load events");
        }
      } catch (error) {
        setEvents([]);
        setEventsError(getErrorMessage(error));
      } finally {
        setEventsLoading(false);
      }
    };

    loadEvents();
  }, [isLoaded, isSignedIn, router, user?.role]);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || user?.role !== "HOST" || !eventId) {
      return;
    }

    const loadAnalytics = async () => {
      try {
        setAnalytics({ data: null, loading: true, error: null });
        const { data } = await api.get(`/host/events/${eventId}/analytics`);
        if (data.success) {
          setAnalytics({ data: data.data, loading: false, error: null });
          return;
        }

        setAnalytics({
          data: null,
          loading: false,
          error: data.message || "Failed to load analytics",
        });
      } catch (error) {
        setAnalytics({
          data: null,
          loading: false,
          error: getErrorMessage(error),
        });
      }
    };

    loadAnalytics();
  }, [eventId, isLoaded, isSignedIn, user?.role]);

  const activeEvent = useMemo(
    () => events.find((event) => event.id === eventId),
    [events, eventId],
  );

  const maxTimelineCount = Math.max(
    1,
    ...(analytics.data?.registrationTimeline.map((point) => point.count) ?? [1]),
  );

  if (!isLoaded || !isSignedIn || user?.role !== "HOST") {
    return (
      <div className="min-h-screen bg-[#111111] pt-28 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm text-white/55">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#111111] pt-24 pb-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Link
              href="/dashboard"
              className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              <ArrowLeft size={16} /> Back to dashboard
            </Link>
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              Event Analytics
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
              Operational metrics for the selected host event. The view stays
              intentionally spare so the numbers carry the weight.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">
              Current event
            </p>
            <p className="mt-1 font-medium text-white">
              {activeEvent?.title ?? eventId ?? "Unknown event"}
            </p>
          </div>
        </div>

        <section className="mb-8 rounded-3xl border border-white/10 bg-white/4 p-4 md:p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                Switch event
              </p>
              <p className="mt-1 text-sm text-white/55">
                Open analytics for any event you own.
              </p>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 md:max-w-[70%] md:justify-end">
              {eventsLoading ? (
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/45">
                  Loading events...
                </span>
              ) : events.length === 0 ? (
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/45">
                  No host events found
                </span>
              ) : (
                events.map((event) => {
                  const isActive = event.id === eventId;
                  return (
                    <Link
                      key={event.id}
                      href={`/dashboard/events/${event.id}/analytics`}
                      className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                        isActive
                          ? "border-white bg-white text-black"
                          : "border-white/10 bg-white/5 text-white/65 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {event.title}
                    </Link>
                  );
                })
              )}
            </div>
          </div>
          {eventsError ? (
            <p className="mt-3 text-sm text-white/45">{eventsError}</p>
          ) : null}
        </section>

        {analytics.loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/55">
            Loading analytics...
          </div>
        ) : analytics.error ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-start gap-3">
              <div className="rounded-full border border-white/10 bg-black/40 p-2">
                <Lock size={16} className="text-white/65" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-white">
                  Analytics unavailable
                </h2>
                <p className="mt-1 text-sm text-white/55">{analytics.error}</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                Back to dashboard
              </Link>
              <Link
                href="/create-event"
                className="rounded-full border border-white/10 bg-white px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-white/90"
              >
                Create event
              </Link>
            </div>
          </div>
        ) : analytics.data ? (
          <>
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                icon={<Users size={18} />}
                label="Total registrations"
                value={analytics.data.totalRegistrations.toLocaleString()}
                note="All ticket rows for this event"
              />
              <MetricCard
                icon={<UserCheck size={18} />}
                label="Total attendees"
                value={analytics.data.totalAttendees.toLocaleString()}
                note="Tickets marked as USED"
              />
              <MetricCard
                icon={<Gauge size={18} />}
                label="Attendance rate"
                value={`${analytics.data.attendanceRate.toFixed(1)}%`}
                note="Attendees divided by registrations"
              />
              <MetricCard
                icon={<CalendarDays size={18} />}
                label="Remaining capacity"
                value={analytics.data.remainingCapacity.toLocaleString()}
                note="Event capacity minus registrations"
              />
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                      Registration timeline
                    </p>
                    <h2 className="mt-1 text-xl font-medium text-white">
                      Daily registrations
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/55">
                    <LineChart size={14} /> Chronological
                  </div>
                </div>

                <div className="mt-6 overflow-x-auto pb-2">
                  {analytics.data.registrationTimeline.length === 0 ? (
                    <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-black/20 text-sm text-white/45">
                      No registrations yet.
                    </div>
                  ) : (
                    <div className="min-w-[560px] rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="flex h-64 items-end gap-3">
                        {analytics.data.registrationTimeline.map((point) => {
                          const heightPercent =
                            (point.count / maxTimelineCount) * 100;
                          return (
                            <div
                              key={point.date}
                              className="flex min-w-0 flex-1 flex-col items-center justify-end"
                            >
                              <div className="flex w-full flex-1 items-end justify-center">
                                <div className="flex w-full flex-col items-center justify-end gap-2">
                                  <span className="text-[11px] font-medium text-white/55">
                                    {point.count}
                                  </span>
                                  <div className="flex h-52 w-full items-end rounded-t-2xl border border-white/10 bg-white/5 p-1">
                                    <div
                                      className="w-full rounded-t-xl border border-white/15 bg-white"
                                      style={{
                                        height: `${Math.max(heightPercent, 4)}%`,
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                              <span className="mt-3 text-[11px] text-white/45">
                                {point.date}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <aside className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                  Event snapshot
                </p>
                <h2 className="mt-1 text-xl font-medium text-white">
                  {activeEvent?.title ?? "Selected event"}
                </h2>
                <div className="mt-5 space-y-4 text-sm text-white/65">
                  <Row label="Date" value={activeEvent?.date ?? "-"} />
                  <Row label="Time" value={activeEvent?.time ?? "-"} />
                  <Row label="Location" value={activeEvent?.location ?? "-"} />
                  <Row
                    label="Price"
                    value={
                      typeof activeEvent?.price === "number"
                        ? activeEvent.price.toLocaleString()
                        : "-"
                    }
                  />
                  <Row
                    label="Tickets sold"
                    value={
                      typeof activeEvent?.ticketsSold === "number"
                        ? activeEvent.ticketsSold.toLocaleString()
                        : "-"
                    }
                  />
                  <Row label="Status" value={activeEvent?.status ?? "-"} />
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                    Capacity check
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/55">
                    Remaining capacity is calculated from the event cap minus
                    the total registrations count. Once the value drops below 0,
                    the event is oversold.
                  </p>
                </div>
              </aside>
            </section>
          </>
        ) : null}
      </div>
    </main>
  );
}

function MetricCard({
  icon,
  label,
  value,
  note,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-white/40">
            {label}
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
            {value}
          </p>
        </div>
        <div className="rounded-full border border-white/10 bg-black/30 p-2 text-white/70">
          {icon}
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-white/50">{note}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0">
      <span className="text-white/40">{label}</span>
      <span className="text-right font-medium text-white">{value}</span>
    </div>
  );
}