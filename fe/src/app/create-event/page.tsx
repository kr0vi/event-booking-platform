"use client";
import React, { useEffect, useState } from "react";
import { MapPin, Image as ImageIcon, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/auth/useUser";
import { api } from "@/utils/api";
import { toast } from "sonner";

export default function CreateEventPage() {
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  // const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    eventDate: "",
    eventTime: "",
    posterImage: "",
    galleryImages: [] as string[],
    highlights: [{ title: "", description: "" }],
    thingsToKnow: [""],
    price: 0,
    totalTickets: 0,
    ticketPerStudent: 1,
  });
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/host/signup");
    } else {
      if (isLoaded && user?.role !== "HOST") {
        router.push("/events");
      }
    }
  }, [isLoaded, isSignedIn, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      let newValue: any = value;
      if (name === "price" || name === "totalTickets") {
        newValue = Number(value);
      } else if (name === "ticketPerStudent") {
        newValue = Math.min(Number(value), 8);
      }
      return {
        ...prev,
        [name]: newValue,
      };
    });
  };

  const handleHighlightChange = (
    index: number,
    field: "title" | "description",
    value: string,
  ) => {
    const newHighlights = [...formData.highlights];
    newHighlights[index][field] = value;
    setFormData({ ...formData, highlights: newHighlights });
  };

  const addHighlight = () => {
    setFormData({
      ...formData,
      highlights: [...formData.highlights, { title: "", description: "" }],
    });
  };

  const removeHighlight = (index: number) => {
    const newHighlights = formData.highlights.filter((_, i) => i !== index);
    setFormData({ ...formData, highlights: newHighlights });
  };

  const handleThingToKnowChange = (index: number, value: string) => {
    const newThings = [...formData.thingsToKnow];
    newThings[index] = value;
    setFormData({ ...formData, thingsToKnow: newThings });
  };

  const addThingToKnow = () => {
    setFormData({
      ...formData,
      thingsToKnow: [...formData.thingsToKnow, ""],
    });
  };

  const removeThingToKnow = (index: number) => {
    const newThings = formData.thingsToKnow.filter((_, i) => i !== index);
    setFormData({ ...formData, thingsToKnow: newThings });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Filter out empty thingsToKnow
      const cleanThingsToKnow = formData.thingsToKnow.filter(
        (t) => t.trim() !== "",
      );

      const payload = {
        ...formData,
        thingsToKnow: cleanThingsToKnow,
      };

      const { data } = await api.post("/events", payload);

      if (data.sucess || data.success) {
        // API docs state 'sucess' typo
        toast.success("Event created successfully!");
        setTimeout(() => {
          router.push("/events");
        }, 2000);
      } else {
        // setError(data.message || "Failed to create event");
        toast.error(data.message || "Failed to create event");
      }
    } catch (err: any) {
      // setError(err.response?.data?.message || "An error occurred");
      toast.error(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Helper to extract day and date nicely for preview
  const previewMonth = formData.eventDate
    ? new Date(formData.eventDate).toLocaleString("default", { month: "short" })
    : "Mth";
  const previewDate = formData.eventDate
    ? formData.eventDate.split("-")[2]
    : "DD";

  return (
    <main className="relative min-h-screen bg-[#131517] text-white overflow-hidden pb-20">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed opacity-20 block inset-0 h-full w-full object-cover mix-blend-screen pointer-events-none"
        src={"/assets/video/warp-effect.mp4"}
      ></video>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 mx-auto max-w-6xl px-6 py-8 md:px-10 md:py-10"
      >
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Create New Event</h1>
          <button
            type="submit"
            disabled={loading}
            className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition disabled:opacity-50"
          >
            {loading ? "Publishing..." : "Publish Event"}
          </button>
        </div>

        <section className="grid gap-10 lg:grid-cols-2">
          {/* Left Column */}
          <div>
            <div className="h-95 w-full rounded-2xl relative bg-white/5 border border-dashed border-white/30 flex flex-col items-center justify-center overflow-hidden">
              {formData.posterImage ? (
                <>
                  <img
                    src={formData.posterImage}
                    alt="Poster Preview"
                    className="w-full object-contain h-full z-10"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <img
                    src={formData.posterImage}
                    alt=""
                    className="w-full object-cover h-full -z-0 scale-120 absolute top-0 left-0 blur-sm opacity-50"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </>
              ) : (
                <div className="flex flex-col items-center text-white/40">
                  <ImageIcon size={48} className="mb-2" />
                  <p>Poster Image Preview</p>
                </div>
              )}

              <div className="absolute bottom-4 left-4 right-4 z-20">
                <input
                  type="url"
                  name="posterImage"
                  placeholder="Poster Image URL (https://...)"
                  value={formData.posterImage}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/60 backdrop-blur-md border border-white/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-white/50"
                />
              </div>
            </div>

            <div className="mt-8 space-y-5 text-sm">
              <div className="flex items-center justify-between gap-2">
                <div className="w-1/3 pr-1">
                  <label className="block mb-2 text-white/60">
                    Total Tickets
                  </label>
                  <input
                    type="number"
                    name="totalTickets"
                    value={formData.totalTickets || ""}
                    onChange={handleChange}
                    required
                    min="1"
                    placeholder="e.g. 500"
                    className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:border-white/50"
                  />
                </div>
                <div className="w-1/3 px-1">
                  <label className="block mb-2 text-white/60">
                    Price (in currency)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price || ""}
                    onChange={handleChange}
                    required
                    min="0"
                    placeholder="e.g. 2000"
                    className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:border-white/50"
                  />
                </div>
                <div className="w-1/3 pl-1">
                  <label className="block mb-2 text-white/60">
                    Max Tickets/Student
                  </label>
                  <input
                    type="number"
                    name="ticketPerStudent"
                    value={formData.ticketPerStudent || ""}
                    onChange={handleChange}
                    required
                    min="1"
                    max="8"
                    placeholder="e.g. 2"
                    className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:border-white/50"
                  />
                </div>
              </div>

              <div>
                <p className="w-fit rounded-full border border-white/20 px-3 py-1 text-xs text-white/60 bg-white/5">
                  # Configuration
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="h-auto lg:h-screen lg:overflow-y-auto lg:pr-4 custom-scrollbar">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Event Title..."
              required
              maxLength={100}
              className="w-full bg-transparent text-4xl font-bold leading-tight focus:outline-none placeholder-white/30 border-b border-white/10 pb-2 mb-4"
            />

            <div className="mt-3 space-y-4 text-sm text-white/60 font-medium">
              <div className="flex items-start gap-4 mb-3">
                <div className="bg-white/10 border relative border-white/20 rounded-lg text-center w-12 h-12 flex-shrink-0 flex flex-col overflow-hidden">
                  <div className="bg-white/20 w-full text-[10px] py-0.5">
                    {previewMonth}
                  </div>
                  <div className="flex-1 flex items-center justify-center text-white font-bold">
                    {previewDate}
                  </div>
                </div>
                <div className="flex gap-4 w-full">
                  <div className="flex-1">
                    <label className="block text-xs mb-1">Date</label>
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-1.5 focus:outline-none focus:border-white/50 text-white"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs mb-1">Time</label>
                    <input
                      type="time"
                      name="eventTime"
                      value={formData.eventTime}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-1.5 focus:outline-none focus:border-white/50 text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <div className="bg-white/10 border border-white/20 rounded-lg scale-90 p-2">
                  <MapPin size={18} />
                </div>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Event Location (e.g. Mumbai, India)"
                  required
                  maxLength={100}
                  className="flex-1 bg-transparent border-b border-white/20 px-2 py-1 focus:outline-none focus:border-white/50 text-base text-white placeholder-white/30"
                />
              </div>
            </div>

            <div className="mt-8">
              <h2 className="border-b border-white/20 pb-2 text-2xl font-semibold mb-4">
                About Event
              </h2>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a long descriptive text for your event..."
                required
                minLength={10}
                rows={5}
                className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-sm leading-relaxed text-white/80 focus:outline-none focus:border-white/50 resize-y"
              ></textarea>

              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-white/80">Highlights</h3>
                  <button
                    type="button"
                    onClick={addHighlight}
                    className="text-xs flex items-center gap-1 bg-white/10 hover:bg-white/20 px-2 py-1 rounded"
                  >
                    <Plus size={12} /> Add
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-2 items-start bg-white/5 p-3 rounded-lg border border-white/10"
                    >
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          placeholder="Highlight Title (e.g. Networking)"
                          value={item.title}
                          onChange={(e) =>
                            handleHighlightChange(idx, "title", e.target.value)
                          }
                          required
                          maxLength={100}
                          className="w-full bg-transparent border-b border-white/20 px-2 py-1 text-sm focus:outline-none focus:border-white/50"
                        />
                        <input
                          type="text"
                          placeholder="Short description"
                          value={item.description}
                          onChange={(e) =>
                            handleHighlightChange(
                              idx,
                              "description",
                              e.target.value,
                            )
                          }
                          required
                          maxLength={200}
                          className="w-full bg-transparent border-b border-white/20 px-2 py-1 text-xs text-white/60 focus:outline-none focus:border-white/50"
                        />
                      </div>
                      {formData.highlights.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeHighlight(idx)}
                          className="text-red-400 hover:text-red-300 p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 mb-12">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-white/80">
                    Things to Know
                  </h3>
                  <button
                    type="button"
                    onClick={addThingToKnow}
                    className="text-xs flex items-center gap-1 bg-white/10 hover:bg-white/20 px-2 py-1 rounded"
                  >
                    <Plus size={12} /> Add
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.thingsToKnow.map((item, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
                      <input
                        type="text"
                        placeholder="e.g. Bring ID Proof"
                        value={item}
                        onChange={(e) =>
                          handleThingToKnowChange(idx, e.target.value)
                        }
                        maxLength={100}
                        className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-white/40"
                      />
                      {formData.thingsToKnow.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeThingToKnow(idx)}
                          className="text-red-400 hover:text-red-300 p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </main>
  );
}
