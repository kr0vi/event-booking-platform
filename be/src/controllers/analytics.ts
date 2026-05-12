import type { Request, Response } from "express";
import { getEventAnalyticsForHost } from "../services/analytics.js";

type HostRequest = Request & {
  userId?: number;
};

export const getHostEventAnalytics = async (req: Request, res: Response) => {
  const hostId = (req as HostRequest).userId;
  const eventId = req.params.eventId;

  if (!hostId) {
    return res.status(401).json({
      success: false,
      data: null,
      message: "Unauthorized",
    });
  }

  if (!eventId || Array.isArray(eventId)) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Event ID is required",
    });
  }

  try {
    const analytics = await getEventAnalyticsForHost(hostId, eventId);

    if (!analytics) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Event not found or you do not have access to this event",
      });
    }

    return res.json({
      success: true,
      data: analytics,
      message: "Event analytics retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching host analytics:", error);
    return res.status(500).json({
      success: false,
      data: null,
      message: "Failed to fetch event analytics",
    });
  }
};
