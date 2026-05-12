"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteHostEvent } from "@/utils/api";

export default function CancelEventPanel({
  currentEvent,
}: {
  currentEvent: any;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!currentEvent?.id) return;
    const ok = window.confirm(
      "Cancel and permanently delete this event? This action can't be undone.",
    );
    if (!ok) return;

    try {
      setLoading(true);
      const data = await deleteHostEvent(currentEvent.id);
      if (data?.success) {
        toast.success("Event cancelled and deleted");
        router.push("/dashboard");
        return;
      }

      toast.error(data?.message || "Failed to delete event");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-12 border-t border-white/8 pt-8">
      <h3 className="text-lg font-semibold mb-2">Cancel Event</h3>
      <p className="text-sm text-white/60 mb-4">
        Cancel and permanently delete this event. This action can't be undone.
        Any registered guests will be notified.
      </p>

      <button
        onClick={handleDelete}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
      >
        <Trash2 size={16} />
        {loading ? "Deleting..." : "Cancel Event"}
      </button>
    </div>
  );
}
