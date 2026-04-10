export interface EventHighlight {
  title: string;
  description: string;
}

export interface EventType {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  totalTickets: number;
  ticketsSold: number;
  price: number;
  posterImage?: string | null;
  galleryImages?: string[] | null;
  highlights?: EventHighlight[] | null;
  thingsToKnow?: string[] | null;
  status: "OPEN" | "CLOSED" | "SOON";
  organizerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface TicketType {
  id: string;
  orderId: string;
  eventId: string;
  userId: number;
  qrToken: string;
  qrImage: string;
  status: "VALID" | "USED";
  usedAt: string | null;
}

export interface OrderType {
  id: string;
  userId: number;
  eventId: string;
  quantity: number;
  totalAmount: number;
  paymentStatus: "PENDING" | "COMPLETED" | "FAILED";
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponseData {
  token: string;
}

export interface AuthUser {
  id: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
