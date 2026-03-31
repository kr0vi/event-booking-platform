export type EventCardData = {
  id: number;
  dateLabel: string;
  title: string;
  venue: string;
  price: string;
  posterClassName: string;
  about: string;
  galleryClassNames: [string, string, string];
  highlights: [
    { title: string; description: string },
    { title: string; description: string },
  ];
  thingsToKnow: string[];
  distanceLabel: string;
  gatesOpenLabel: string;
};

export const eventCards: EventCardData[] = [
  {
    id: 1,
    dateLabel: "Mon, 30 Mar, 7:30 PM",
    title: "TATA IPL 2026: Match 3 | Rajasthan Royals vs Chennai Super Kings",
    venue: "ACA Stadium, Barsapara, Guwahati",
    price: "2600 onwards",
    posterClassName:
      "bg-gradient-to-br from-fuchsia-500 via-violet-800 to-slate-900",
    about:
      "Rajasthan Royals and Chennai Super Kings open the evening with contrasting styles and plenty of star power. Expect a packed crowd, high-tempo cricket, and a dramatic finish under lights.",
    galleryClassNames: [
      "bg-gradient-to-b from-sky-100 via-emerald-100 to-lime-200",
      "bg-gradient-to-b from-slate-100 via-slate-200 to-slate-300",
      "bg-gradient-to-b from-blue-100 via-cyan-100 to-teal-200",
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
    distanceLabel: "242.8 km away",
    gatesOpenLabel: "Gates open at 3:00 PM",
  },
  {
    id: 2,
    dateLabel: "Sat, 23 May, 8:00 PM",
    title: "Ye Live in India",
    venue: "Jawaharlal Nehru Stadium, Delhi/NCR",
    price: "9500 onwards",
    posterClassName:
      "bg-gradient-to-b from-neutral-800 via-neutral-600 to-neutral-300",
    about:
      "A one-night-only stadium spectacle with immersive lights, booming bass, and arena-scale production. The set list spans career-defining tracks and exclusive live arrangements.",
    galleryClassNames: [
      "bg-gradient-to-b from-neutral-100 via-neutral-200 to-neutral-300",
      "bg-gradient-to-b from-zinc-100 via-zinc-300 to-zinc-400",
      "bg-gradient-to-b from-gray-100 via-slate-300 to-slate-400",
    ],
    highlights: [
      {
        title: "Why this event stands out",
        description:
          "Massive stage design, high-impact visuals, and a chart-topping catalog in a single headline performance.",
      },
      {
        title: "What you'll experience",
        description:
          "Arena sound, synchronized crowd moments, and a set built for sing-alongs from start to finish.",
      },
    ],
    thingsToKnow: [
      "Duration 2.5 Hours",
      "Entry allowed for ages 10 and above",
      "Seating Arrangement Mix of seated and standing",
      "Outside food not allowed",
      "Wheelchair accessible",
      "Ticket needed for all attendees",
      "Layout Indoor",
      "High-volume music expected",
      "Washrooms available",
    ],
    distanceLabel: "18.4 km away",
    gatesOpenLabel: "Gates open at 5:30 PM",
  },
  {
    id: 3,
    dateLabel: "Tue, 31 Mar, 7:30 PM",
    title: "TATA IPL 2026: Match 4 | Punjab Kings vs Gujarat Titans",
    venue: "Maharaja Yadavindra Singh Cricket Stadium",
    price: "2000 onwards",
    posterClassName:
      "bg-gradient-to-br from-red-700 via-orange-600 to-indigo-900",
    about:
      "Punjab Kings vs Gujarat Titans sets the tone for an exciting season opener for both sides. PBKS, last year's finalists, look sharp and more settled than ever. With a strong core retained, smart auction additions and a confident leadership group, expectations are sky-high for a statement start.",
    galleryClassNames: [
      "bg-gradient-to-b from-slate-100 via-emerald-100 to-lime-200",
      "bg-gradient-to-b from-slate-100 via-green-100 to-lime-100",
      "bg-gradient-to-b from-slate-100 via-teal-100 to-emerald-100",
    ],
    highlights: [
      {
        title: "Why this event stands out",
        description:
          "Punjab's relentless firepower meets Gujarat's calculated precision in a high-stakes opener.",
      },
      {
        title: "What you'll experience",
        description:
          "Explosive batting, blistering pace, tactical battles and a nail-biting finish.",
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
    distanceLabel: "266.3 km away",
    gatesOpenLabel: "Gates open at 3:30 PM",
  },
  {
    id: 4,
    dateLabel: "Sun, 05 Apr, 5:00 PM",
    title: "ISL 2025-26: Sporting Club Delhi vs Kerala Blosters FC",
    venue: "Jawaharlal Nehru Stadium, Delhi/NCR",
    price: "50 onwards",
    posterClassName: "bg-gradient-to-b from-red-950 via-red-800 to-orange-700",
    about:
      "A weekend football battle where tactical discipline meets end-to-end pace. Expect packed stands, coordinated tifos, and edge-of-your-seat transitions.",
    galleryClassNames: [
      "bg-gradient-to-b from-emerald-100 via-green-200 to-lime-300",
      "bg-gradient-to-b from-stone-100 via-zinc-200 to-zinc-300",
      "bg-gradient-to-b from-green-100 via-emerald-200 to-teal-200",
    ],
    highlights: [
      {
        title: "Why this event stands out",
        description:
          "Rival fanbases, quick transitions, and set-piece drama make this one of the loudest fixtures of the week.",
      },
      {
        title: "What you'll experience",
        description:
          "Pre-match buildup, nonstop chants, and a tense contest that can flip in minutes.",
      },
    ],
    thingsToKnow: [
      "Duration 2 Hours",
      "Entry allowed for all ages",
      "Seating Arrangement Seated",
      "No re-entry after scanning",
      "Wheelchair accessible",
      "Ticket needed for ages 3 and above",
      "Layout Outdoor",
      "Kid friendly",
      "Washrooms available",
    ],
    distanceLabel: "22.1 km away",
    gatesOpenLabel: "Gates open at 3:00 PM",
  },
  {
    id: 5,
    dateLabel: "Fri, 11 Apr, 6:00 PM",
    title: "Delhi Capitals Fan Park Night",
    venue: "Major Dhyan Chand National Stadium, Delhi",
    price: "1200 onwards",
    posterClassName: "bg-gradient-to-b from-blue-900 via-blue-700 to-cyan-500",
    about:
      "An evening built for fans with skill zones, team stories, live screens, and music between sessions. A family-friendly format keeps the energy high throughout.",
    galleryClassNames: [
      "bg-gradient-to-b from-blue-100 via-cyan-100 to-sky-200",
      "bg-gradient-to-b from-indigo-100 via-blue-200 to-cyan-200",
      "bg-gradient-to-b from-slate-100 via-blue-100 to-teal-100",
    ],
    highlights: [
      {
        title: "Why this event stands out",
        description:
          "Interactive fan activations, team trivia, and a stadium fan zone made for all age groups.",
      },
      {
        title: "What you'll experience",
        description:
          "Live hosts, games, food stalls, and crowd contests that run all evening.",
      },
    ],
    thingsToKnow: [
      "Duration 4 Hours",
      "Entry allowed for all ages",
      "Seating Arrangement Mixed",
      "Pets not allowed",
      "Wheelchair accessible",
      "Ticket needed for ages 5 and above",
      "Layout Outdoor",
      "Kid friendly",
      "Washrooms available",
    ],
    distanceLabel: "10.6 km away",
    gatesOpenLabel: "Gates open at 4:30 PM",
  },
  {
    id: 6,
    dateLabel: "Sat, 12 Apr, 7:00 PM",
    title: "Heritage India Tour - Live Concert",
    venue: "Nehru Place Open Grounds, Delhi",
    price: "799 onwards",
    posterClassName:
      "bg-gradient-to-br from-amber-100 via-stone-200 to-amber-300",
    about:
      "A culturally rich live showcase blending folk classics with modern arrangements. The evening combines visual storytelling, dance interludes, and community performances.",
    galleryClassNames: [
      "bg-gradient-to-b from-amber-100 via-orange-100 to-yellow-100",
      "bg-gradient-to-b from-stone-100 via-amber-200 to-orange-200",
      "bg-gradient-to-b from-yellow-100 via-amber-100 to-lime-100",
    ],
    highlights: [
      {
        title: "Why this event stands out",
        description:
          "Traditional instrumentation and modern staging create a distinct cross-generational concert experience.",
      },
      {
        title: "What you'll experience",
        description:
          "Live vocals, dance segments, and thematic acts inspired by regional stories.",
      },
    ],
    thingsToKnow: [
      "Duration 2.5 Hours",
      "Entry allowed for all ages",
      "Seating Arrangement Seated",
      "Outside food not allowed",
      "Wheelchair accessible",
      "Ticket needed for ages 4 and above",
      "Layout Outdoor",
      "Kid friendly",
      "Washrooms available",
    ],
    distanceLabel: "6.9 km away",
    gatesOpenLabel: "Gates open at 5:30 PM",
  },
  {
    id: 7,
    dateLabel: "Sun, 13 Apr, 7:30 PM",
    title: "Sufi Night with Arijit Ensemble",
    venue: "Talkatora Indoor Stadium, New Delhi",
    price: "1800 onwards",
    posterClassName: "bg-gradient-to-br from-amber-700 via-orange-900 to-black",
    about:
      "A meditative night of soulful melodies, long-form compositions, and atmospheric lighting. The show focuses on live instrumentation and immersive acoustics.",
    galleryClassNames: [
      "bg-gradient-to-b from-amber-100 via-orange-100 to-rose-100",
      "bg-gradient-to-b from-stone-100 via-orange-200 to-amber-300",
      "bg-gradient-to-b from-zinc-100 via-orange-100 to-yellow-100",
    ],
    highlights: [
      {
        title: "Why this event stands out",
        description:
          "An intimate production centered on live vocals and layered acoustic textures.",
      },
      {
        title: "What you'll experience",
        description:
          "Extended jams, poetic transitions, and a calm yet deeply emotional live set.",
      },
    ],
    thingsToKnow: [
      "Duration 2 Hours",
      "Entry allowed for ages 8 and above",
      "Seating Arrangement Seated",
      "No flash photography",
      "Wheelchair accessible",
      "Ticket needed for all attendees",
      "Layout Indoor",
      "Kid friendly",
      "Washrooms available",
    ],
    distanceLabel: "8.4 km away",
    gatesOpenLabel: "Gates open at 6:00 PM",
  },
  {
    id: 8,
    dateLabel: "Sun, 13 Apr, 8:00 PM",
    title: "Food and Music Carnival",
    venue: "DLF Avenue Courtyard, Saket",
    price: "499 onwards",
    posterClassName:
      "bg-gradient-to-br from-emerald-900 via-teal-700 to-lime-700",
    about:
      "A city carnival with curated food stalls, indie bands, and open-air social spaces. Designed for casual discovery, the format lets guests move between stages and pop-up counters.",
    galleryClassNames: [
      "bg-gradient-to-b from-lime-100 via-emerald-100 to-teal-100",
      "bg-gradient-to-b from-green-100 via-emerald-200 to-lime-200",
      "bg-gradient-to-b from-teal-100 via-cyan-100 to-lime-100",
    ],
    highlights: [
      {
        title: "Why this event stands out",
        description:
          "A weekend social format mixing artisanal food, live music, and interactive market booths.",
      },
      {
        title: "What you'll experience",
        description:
          "Chef specials, acoustic sets, and a festival-style atmosphere built for groups.",
      },
    ],
    thingsToKnow: [
      "Duration 5 Hours",
      "Entry allowed for all ages",
      "Seating Arrangement Open seating",
      "Pets allowed in designated zones",
      "Wheelchair accessible",
      "Ticket needed for ages 6 and above",
      "Layout Outdoor",
      "Kid friendly",
      "Washrooms available",
    ],
    distanceLabel: "4.1 km away",
    gatesOpenLabel: "Gates open at 4:00 PM",
  },
];

export function getEventById(id: number) {
  return eventCards.find((event) => event.id === id);
}
