"use client";
import Link from "next/link";
import { useUser } from "@/lib/auth/useUser";
import { useEffect, useState } from "react";
import { Bell, Compass, House, Settings, Ticket } from "lucide-react";
import Logo from "../Logo";

export function DistrictHeader() {
  const { isSignedIn, isLoaded, user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (isLoaded) {
      setIsAdmin(user?.role === "ORGANIZER" || user?.role === "ADMIN");
    }
  }, [isLoaded]);
  return (
    <>
      <header className="w-full bg-[#131517] text-white shadow-sm border-b border-white/20">
        <div className="mx-auto flex w-7xl  items-center justify-between py-6">
          <div className="flex items-center">
            <div className="leading-none">
              {isSignedIn && isLoaded ? (
                <Logo href="/home" />
              ) : (
                <Logo href="/" />
              )}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href={"/home"}
              className="rounded-lg px-3 py-1.5 text-sm font-semibold text-white"
            >
              <div className="flex items-center justify-center gap-2">
                <House size={18} /> <p>Home</p>
              </div>
            </Link>
            <Link
              href={"/events"}
              className="rounded-lg px-3 py-1.5 text-sm font-semibold text-white"
            >
              <div className="flex items-center justify-center gap-2">
                <Compass size={18} /> <p>Discover</p>
              </div>
            </Link>
            {isAdmin && (
              <Link
                href={"/dashboard"}
                className="rounded-lg px-3 py-1.5 text-sm font-semibold text-white"
              >
                Your Events
              </Link>
            )}
            {isSignedIn && isLoaded ? (
              <>
                <Link
                  href={"/tickets"}
                  className="rounded-lg px-3 py-1.5 text-sm font-semibold text-white"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Ticket size={18} /> <p>Tickets</p>
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={"/signup"}
                  className="rounded-lg px-3 py-1.5 text-sm font-semibold text-white"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center gap-6">
            {isSignedIn && isLoaded ? (
              <>
                <Link
                  href={"/me"}
                  className="rounded-lg  text-sm font-semibold text-white"
                >
                  <Bell size={18} />
                </Link>
                <Link
                  href={"/me"}
                  className="rounded-lg  text-sm font-semibold text-white"
                >
                  <Settings size={18} />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={"/signup"}
                  className="rounded-lg px-3 py-1.5 text-sm font-semibold text-white"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
