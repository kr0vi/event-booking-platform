"use client";

import { useUser } from "@/lib/auth/useUser";
import { useRouter } from "next/navigation";

function BuyEventForm() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();

  const handleClick = () => {
    if (isSignedIn && isLoaded) {
      // Redirect to checkout page
      router.push("/checkout");
    } else {
      // Redirect to login page
      router.push("/login");
    }
  };

  return (
    <div className="mt-6 rounded-xl border border-white/20 bg-white/10 backdrop-  sm">
      <div className="border-b border-blue-200/40 px-4 py-2 text-xs bg-white/20 text-white">
        Registration
      </div>
      <div className="space-y-3 px-4 py-4">
        <p className="text-sm font-medium">
          Welcome! To join the event, please register below.
        </p>
        <button
          onClick={handleClick}
          className="w-full rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#1a56ff] transition hover:bg-blue-50"
        >
          Get Your Tickets
        </button>
      </div>
    </div>
  );
}

export default BuyEventForm;
