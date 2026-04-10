
import { api } from "@/utils/api";
import { ApiResponse, EventType } from "@/utils/interfaces";

export async function getAllEvents(): Promise<EventType[]> {
  const { data } = await api.get<ApiResponse<EventType[]>>("/events");
  if (!data.success) {
    return [];
  }
  return data.data;
}

export async function getEventById(id: string): Promise<EventType | null> {
  const { data } = await api.get<ApiResponse<EventType | null>>(
    `/events/${id}`,
  );
  if (!data.success) {
    return null;
  }
  return data.data;
}
