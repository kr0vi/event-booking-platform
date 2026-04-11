"use client";
import { useUser } from "@/lib/auth/useUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MePage() {
  const { user, isLoaded, isSignedIn, logout } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("account");

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/login");
    }
  }, [isLoaded, isSignedIn, router]);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1a56ff] px-6 md:px-12 font-sans overflow-hidden">
        <div className="text-white text-lg font-light animate-pulse">
          Loading your profile...
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen  items-center justify-center bg-[#1a56ff] overflow-hidden ">
      <div className="w-full max-w-2xl bg-white/10 rounded-3xl border border-white/20 backdrop-blur-sm  p-12">
        <h1 className="text-white text-xl font-bold mb-2">My Profile</h1>
        <p className="text-white/80  mb-8">
          Here you can view and manage your profile information.
        </p>
        <div className="flex items-center gap-2 mb-10 rounded-full border border-white/30 px-3 py-2">
          <h5
            className={`text-white  font-medium cursor-pointer px-3 py-1 border rounded-full border-transparent transition-all duration-300 ${activeTab === "account" ? " bg-white/10 border-white/20" : ""}`}
            onClick={() => {
              setActiveTab("account");
            }}
          >
            Account
          </h5>
          <h5
            className={`text-white  font-medium cursor-pointer px-3 py-1 border rounded-full border-transparent transition-all duration-300 ${activeTab === "tickets" ? " bg-white/10 border-white/20" : ""}`}
            onClick={() => setActiveTab("tickets")}
          >
            Tickets
          </h5>
          <h5
            className={`text-white font-medium cursor-pointer px-3 py-1 border rounded-full border-transparent transition-all duration-300 ${activeTab === "orders" ? " bg-white/10 border-white/20" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </h5>
        </div>

        <div className="flex flex-col gap-6">
          <div className="relative group p-4 pb-4">
            <div className="absolute inset-0 rounded-3xl border border-white/20 backdrop-blur-sm pointer-events-none transition-all"></div>

            <div className="relative z-10 flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <span className="text-white/60 text-xs font-medium uppercase tracking-wider">
                  Name
                </span>
                <span className="text-white text-base font-medium">
                  {user?.name || "N/A"}
                </span>
              </div>

              <div className="h-px bg-white/20 w-full rounded-full"></div>

              <div className="flex flex-col gap-1">
                <span className="text-white/60 text-xs font-medium uppercase tracking-wider">
                  Email Address
                </span>
                <span className="text-white text-base font-medium">
                  {user?.email || "N/A"}
                </span>
              </div>

              <div className="h-px bg-white/20 w-full rounded-full"></div>

              <div className="flex flex-col gap-1">
                <span className="text-white/60 text-xs font-medium uppercase tracking-wider">
                  User ID
                </span>
                <span className="text-white text-base font-medium">
                  {user?.id || "N/A"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex sm:flex-row items-center gap-6">
            <button
              onClick={handleLogout}
              className="w-full sm:w-auto bg-white text-[#1a56ff] font-medium rounded-full px-8 py-3 hover:bg-gray-50 transition-colors shadow-sm text-sm cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
