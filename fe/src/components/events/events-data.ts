import { eventType } from "@/utils/interfaces";
import axios from "axios";

export async function getEventById(id: string): Promise<null | eventType> {
  const { data } = await axios.get(`http://localhost:3000/api/v1/events/${id}`);
  if (!data.success) {
    return null;
  }
  return data.data;
}

