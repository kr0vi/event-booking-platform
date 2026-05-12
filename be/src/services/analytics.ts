import { Prisma } from "@prisma/client";
import { prisma } from "../index.js";

export type RegistrationTimelinePoint = {
  date: string;
  count: number;
};

export type EventAnalytics = {
  totalRegistrations: number;
  totalAttendees: number;
  attendanceRate: number;
  remainingCapacity: number;
  registrationTimeline: RegistrationTimelinePoint[];
};

export const getEventAnalyticsForHost = async (
  hostId: number,
  eventId: string,
): Promise<EventAnalytics | null> => {
  const event = await prisma.event.findFirst({
    where: {
      id: eventId,
      hostId,
    },
    select: {
      id: true,
      totalTickets: true,
    },
  });

  if (!event) {
    return null;
  }

  const [totalRegistrations, totalAttendees, registrationTimeline] =
    await prisma.$transaction([
      prisma.ticket.count({
        where: {
          eventId,
        },
      }),
      prisma.ticket.count({
        where: {
          eventId,
          status: "USED",
        },
      }),
      prisma.$queryRaw<Array<{ date: string; count: number }>>(
        Prisma.sql`
          SELECT
            to_char(date_trunc('day', o."createdAt"), 'YYYY-MM-DD') AS date,
            COUNT(*)::int AS count
          FROM "tickets" t
          INNER JOIN "orders" o ON o."id" = t."orderId"
          WHERE t."eventId" = ${eventId}
          GROUP BY 1
          ORDER BY 1 ASC
        `,
      ),
    ]);

  const attendanceRate =
    totalRegistrations === 0
      ? 0
      : Number(((totalAttendees / totalRegistrations) * 100).toFixed(1));

  return {
    totalRegistrations,
    totalAttendees,
    attendanceRate,
    remainingCapacity: event.totalTickets - totalRegistrations,
    registrationTimeline: registrationTimeline.map((item) => ({
      date: item.date,
      count: Number(item.count),
    })),
  };
};
