"use client";
import Link from "next/link";
import { useUser } from "@/lib/auth/useUser";
import { useEffect, useState } from "react";
import { Bell, Compass, House, MicVocal, Settings, Ticket } from "lucide-react";
import Logo from "../Logo";
import { UserAvatar } from "../UserAvatar";

export function DistrictHeader() {
  const { isSignedIn, isLoaded, user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (isLoaded) {
      setIsAdmin(user?.role === "HOST" || user?.role === "ADMIN");
    }
  }, [isLoaded]);
  return (
    <>
      <header className="w-full bg-[#131517] text-white shadow-sm border-b border-white/20">
        <div className="mx-auto flex w-7xl  items-center justify-between py-6">
          <div className="flex items-center">
            <div className="leading-none">
              {isSignedIn && isLoaded && !isAdmin && <Logo href="/home" />}
              {isSignedIn && isLoaded && isAdmin && <Logo href="/dashboard" />}
              {isSignedIn && isLoaded ? null : <Logo href="/" />}
            </div>
          </div>

          <div className="flex items-center gap-6">
            {isAdmin && (
              <Link
                href={"/dashboard"}
                className="rounded-lg px-3 py-1.5 text-sm font-semibold text-white"
              >
                <div className="flex items-center justify-center gap-2">
                  <MicVocal size={18} /> <p>Your Events</p>
                </div>
              </Link>
            )}
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
                  className="rounded-lg group flex items-center gap-2 text-sm font-semibold text-white"
                >
                   <UserAvatar userId={user?.id} name={user?.name} size={28} />
                  <span className="overflow-hidden max-w-0 opacity-0 transition-all duration-500 group-hover:max-w-28 group-hover:opacity-100">
                    <span className="block whitespace-nowrap -translate-x-2 transition-transform duration-500 group-hover:translate-x-0">
                      My Account
                    </span>
                  </span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={"/login"}
                  className="rounded-lg px-3 py-1.5 text-sm font-semibold text-white"
                >
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
