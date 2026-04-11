"use client";
import { api } from "@/utils/api";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { use, useEffect } from "react";

// const ticket = {
//   event: {
//     id: "56be366b-b63f-482c-8120-e7face61dff3",
//     title: "Cosmic Night Festival",
//     description: "A high-energy music night with cosmic visuals and live DJs.",
//     date: "2026-04-10",
//     time: "19:00",
//     location: "Delhi",
//     price: 499,
//     status: "OPEN",
//     totalTickets: 150,
//     ticketsSold: 1,
//     organizerId: 5,
//     posterImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
//     galleryImages: [
//       "https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
//       "https://images.unsplash.com/photo-1506157786151-b8491531f063",
//       "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc",
//     ],
//     highlights: [{}, {}],
//     thingsToKnow: ["Carry ID", "No outside food", "Gates close at 9 PM"],
//     createdAt: "2026-03-31T08:34:35.144Z",
//     updatedAt: "2026-04-11T11:27:00.782Z",
//   },
//   ticket: {
//     id: "6cd95bb4-9d4d-4b8d-b94a-f7ee746ba30c",
//     eventId: "56be366b-b63f-482c-8120-e7face61dff3",
//     orderId: "96122a2f-2a41-434e-b6c8-41595c7dac8a",
//     userId: 12,
//     status: "VALID",
//     usedAt: null,
//     qrToken:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmRlcklkIjoiOTYxMjJhMmYtMmE0MS00MzRlLWI2YzgtNDE1OTVjN2RhYzhhIiwidXNlcklkIjoxMiwiZXZlbnRJZCI6IjU2YmUzNjZiLWI2M2YtNDgyYy04MTIwLWU3ZmFjZTYxZGZmMyIsImlhdCI6MTc3NTkwNjgyMX0.v6qmVwMJn4y-3lHWnInfh76SiGjPPCqJqX3i8IYDRtQ",
//     qrImage:
//       "data:image/png;base64,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",
//   },
// };

function page({ params }: { params: Promise<{ id: string }> }) {
  const id = use(params).id;
  const [ticket, setTicket] = React.useState<any>(null);
  useEffect(() => {
    // Fetch ticket details using the ID
    //@ts-ignore
    const fetchData = async () => {
      const { data } = await api.get(`/tickets/${id}`);
      setTicket(data.data);
    };
    fetchData();
  }, [id]);
  console.log("Fetched ticket details:", ticket);

  return (
    <div className="h-screen bg-[#1a56ff] flex items-center justify-center relative">
      <div>{ticket && <FullTicketCard ticket={ticket} />}</div>
      <Link
        href="/tickets"
        className="absolute top-[5%] left-[15%] text-white/80 hover:text-white transition-colors flex items-center gap-1"
      >
        <ArrowLeft size={18} />
        Back to Tickets
      </Link>

    </div>
  );
}

export default page;

function FullTicketCard({ ticket }: { ticket: any }) {
  return (
    <div className="bg-white/10 w-[25vw] p-6 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden flex flex-col  relative shadow-lg  transition-all">
      {/* Deco dots */}
      <div className="absolute top-[40%] -left-3 w-12 h-12 bg-[#1a56ff] rounded-full transform -translate-y-1/2 md:block hidden opacity-80 border-r border-white/20"></div>
      <div className="absolute top-[40%] -right-3 w-12 h-12 bg-[#1a56ff] rounded-full transform -translate-y-1/2 md:block hidden opacity-80 border-l border-white/20"></div>

      <div className="">
        <div className="flex justify-between items-center  ">
          <p className="text-sm px-3 py-1 rounded-full bg-green-400/50 border border-green-400 text-white">
            {" "}
            VALID
          </p>
          <span className="text-lg font-mono text-white/50 tracking-wider">
            #{ticket.id ? String(ticket.id).split("-")[0] : "das341"}
          </span>

          {/* Event details would go here */}
        </div>
        <div className="mt-16 mb-8">
          <p className="text-base text-center mb-3  text-white/50">
            {ticket.event ? ticket.event.title : "Event Title"}
          </p>
          {/* <p className="text-sm text-center mb-4 text-white/50">11:00 AM</p> */}
          <h1 className="text-center text-2xl font-semibold text-white">
            Your entry is confirmed
          </h1>
          <img
            src="https://em-content.zobj.net/source/apple/453/star-struck_1f929.png"
            className="w-8 mx-auto"
          />
        </div>
      </div>

      <div className="w-full  flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-white/20 border-dashed relative">
        <div className=" bg-white w-2/3 rounded-xl p-2 mb-3 shadow-inner">
          {true ? (
            <img
              src="data:image/png;base64,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"
              alt="Ticket QR"
              className=" h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center text-gray-400 text-[10px] uppercase font-bold text-center border-2 border-dashed border-gray-300">
              QR Pending
            </div>
          )}
          <p className="text-center font-semibold">Krishna Vohra</p>
        </div>
        <p className="text-center text-sm text-white/70">
          Show this QR code at the event entrance
        </p>
        <p className="text-center text-xs text-white/70">
          {ticket.quantity} hello
        </p>
      </div>
    </div>
  );
}
