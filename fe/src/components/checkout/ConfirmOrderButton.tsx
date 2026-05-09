"use client";

import { useState } from "react";
import { api } from "@/utils/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ConfirmOrderButton({ eventId, maxQuantity }: { eventId: string; maxQuantity: number }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const handleOrder = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/orders", { eventId, quantity });
      if (res.data.success) {
        // Redriect to success animation page
        router.push("/success");
      } else {
        setError(res.data.message || "Failed to place order.");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "An error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white/5 rounded-2xl p-5 border border-white/10 mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-white/70">Price</span>
          <span className="font-semibold ">Free</span>
        </div>
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
          <span className="text-white/70">Quantity</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition cursor-pointer font-bold select-none"
            >
              -
            </button>
            <span className="font-semibold w-4 text-center">{quantity}</span>
            <button
              onClick={() =>{
                if(quantity == maxQuantity) {
                  toast.error(`Maximum quantity is ${maxQuantity}`);
                  return;
                }
                 setQuantity((q) => Math.min(maxQuantity, q + 1))
              }}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition cursor-pointer font-bold select-none"
            >
              +
            </button>
            
          </div>
        </div>
        <div className="flex justify-between items-center text-lg mt-2">
          <span className="font-medium text-white/80">Total</span>
          <span className="font-bold text-green-400">Free</span>
        </div>
      </div>

      <div className="mt-8">
        {error && <p className="mb-4 text-red-400 text-sm">{error}</p>}
        <button
          onClick={handleOrder}
          disabled={loading}
          className="w-full rounded-xl bg-white px-6 py-3 text-base font-bold text-[#131517] transition hover:bg-white/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Complete Order"}
        </button>
      </div>
    </>
  );
}
