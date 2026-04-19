"use client";
import Link from "next/link";
import { useUser } from "@/lib/auth/useUser";
import { useEffect, useState } from "react";

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
          <div className="flex items-center ">
            <div className="leading-none">
              <Link href="/">
                <p className="text-[20px] font-black  tracking-[-0.06em] ">
                  moment
                </p>
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href={"/events"}
              className="rounded-lg px-3 py-1.5 text-sm font-semibold text-white"
            >
              Discover
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
                  Tickets
                </Link>
                <Link
                  href={"/me"}
                  className="rounded-lg px-3 py-1.5 text-sm font-semibold text-white"
                >
                  Me
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
