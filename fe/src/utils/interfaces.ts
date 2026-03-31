export interface eventType {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  totalTickets: number;
  ticketsSold: number;
  price: number;
  posterImage: string;
  galleryImages: string[];
  highlights: { title: string; description: string }[];
  thingsToKnow: string[];
  status: "OPEN" | "CLOSED" | "SOON";
  organizerId: number;
  createdAt: string;
  updatedAt: string;
}

const example = {
  id: 1,
  title: "TATA IPL 2026: Match 3 | Rajasthan Royals vs Chennai Super Kings",
  description:
    "Rajasthan Royals and Chennai Super Kings open the evening with contrasting styles and plenty of star power. Expect a packed crowd, high-tempo cricket, and a dramatic finish under lights.",
  location: "ACA Stadium, Barsapara, Guwahati",
  date: "Mon, 30 Mar, 7:30 PM",
  time: "6:30 PM",
  price: 2300,
  posterImage: "imageToPoster.jpg",
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
};
