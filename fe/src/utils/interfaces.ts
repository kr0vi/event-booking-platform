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
  status: "OPEN" | "CLOSED" | "SOON";
  organizerId: number;
  createdAt: string;
  updatedAt: string;
}
