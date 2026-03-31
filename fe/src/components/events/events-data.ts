import { eventType } from "@/utils/interfaces";
import axios from "axios";

export async function getEventById(id: string): Promise<null | eventType> {
  const { data } = await axios.get(`http://localhost:3000/api/v1/events/${id}`);
  if (!data.success) {
    return null;
  }
  return data.data;
}

const example = {
  id: 1,
  dateLabel: "Mon, 30 Mar, 7:30 PM",
  title: "TATA IPL 2026: Match 3 | Rajasthan Royals vs Chennai Super Kings",
  venue: "ACA Stadium, Barsapara, Guwahati",
  price: "2600 onwards",
  posterImage: "imageToPoster.jpg",
  about:
    "Rajasthan Royals and Chennai Super Kings open the evening with contrasting styles and plenty of star power. Expect a packed crowd, high-tempo cricket, and a dramatic finish under lights.",
  galleryImages: [
    "imageToGallery1.jpg",
    "imageToGallery2.jpg",
    "imageToGallery3.jpg",
  ],
  highlights: [
    {
      title: "Why this event stands out",
      description:
        "Two title contenders collide in a prime-time showdown featuring power-hitters and elite death bowling.",
    },
    {
      title: "What you'll experience",
      description:
        "Loud fan sections, electric chants, and a full-stadium matchday atmosphere from first ball to final over.",
    },
  ],
  thingsToKnow: [
    "Duration 3 Hours",
    "Entry allowed for all ages",
    "Seating Arrangement Seated",
    "Pets not allowed",
    "Wheelchair accessible",
    "Ticket needed for ages 2 and above",
    "Layout Outdoor",
    "Kid friendly",
    "Washrooms available",
  ],
  entryTime: "Entry from 6:30 PM",
};
