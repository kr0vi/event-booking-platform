import z from "zod";

export const createEventSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(10, "Description is required")
    .max(200, "Description must be less than 200 characters"),
  location: z
    .string()
    .min(1, "Location is required")
    .max(100, "Location must be less than 100 characters"),
  eventDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  eventTime: z.string(),
  posterImage: z.string().url("Invalid image URL"),
  galleryImages: z.array(z.string().url("Invalid image URL")).default([]),
  highlights: z.array(
    z.object({
      title: z
        .string()
        .max(100, "Highlight title must be less than 100 characters"),
      description: z
        .string()
        .max(200, "Highlight description must be less than 200 characters"),
    }),
  ),
  thingsToKnow: z
    .array(
      z.string().max(100, "Thing to know must be less than 100 characters"),
    )
    .default([]),
  price: z.number().min(0, "Price must be a positive number"),
  totalTickets: z.number().min(0, "Total tickets must be a positive number"),
  ticketPerStudent: z.number().min(1, "Ticket per student must be at least 1").max(8, "We dont recommed setting more than 8").default(1),
});
