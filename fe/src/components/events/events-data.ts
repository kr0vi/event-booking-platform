export type EventCardData = {
  id: number;
  dateLabel: string;
  title: string;
  venue: string;
  price: string;
  posterClassName: string;
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
  },
  {
    id: 2,
    dateLabel: "Sat, 23 May, 8:00 PM",
    title: "Ye Live in India",
    venue: "Jawaharlal Nehru Stadium, Delhi/NCR",
    price: "9500 onwards",
    posterClassName:
      "bg-gradient-to-b from-neutral-800 via-neutral-600 to-neutral-300",
  },
  {
    id: 3,
    dateLabel: "Tue, 31 Mar, 7:30 PM",
    title: "TATA IPL 2026: Match 4 | Punjab Kings vs Gujarat Titans",
    venue: "Maharaja Yadavindra Singh Cricket Stadium",
    price: "2000 onwards",
    posterClassName:
      "bg-gradient-to-br from-red-700 via-orange-600 to-indigo-900",
  },
  {
    id: 4,
    dateLabel: "Sun, 05 Apr, 5:00 PM",
    title: "ISL 2025-26: Sporting Club Delhi vs Kerala Blosters FC",
    venue: "Jawaharlal Nehru Stadium, Delhi/NCR",
    price: "50 onwards",
    posterClassName: "bg-gradient-to-b from-red-950 via-red-800 to-orange-700",
  },
  {
    id: 5,
    dateLabel: "Fri, 11 Apr, 6:00 PM",
    title: "Delhi Capitals Fan Park Night",
    venue: "Major Dhyan Chand National Stadium, Delhi",
    price: "1200 onwards",
    posterClassName: "bg-gradient-to-b from-blue-900 via-blue-700 to-cyan-500",
  },
  {
    id: 6,
    dateLabel: "Sat, 12 Apr, 7:00 PM",
    title: "Heritage India Tour - Live Concert",
    venue: "Nehru Place Open Grounds, Delhi",
    price: "799 onwards",
    posterClassName:
      "bg-gradient-to-br from-amber-100 via-stone-200 to-amber-300",
  },
  {
    id: 7,
    dateLabel: "Sun, 13 Apr, 7:30 PM",
    title: "Sufi Night with Arijit Ensemble",
    venue: "Talkatora Indoor Stadium, New Delhi",
    price: "1800 onwards",
    posterClassName: "bg-gradient-to-br from-amber-700 via-orange-900 to-black",
  },
  {
    id: 8,
    dateLabel: "Sun, 13 Apr, 8:00 PM",
    title: "Food and Music Carnival",
    venue: "DLF Avenue Courtyard, Saket",
    price: "499 onwards",
    posterClassName:
      "bg-gradient-to-br from-emerald-900 via-teal-700 to-lime-700",
  },
];
