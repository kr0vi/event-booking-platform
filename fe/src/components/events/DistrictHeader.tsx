"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "@/lib/auth/useUser";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "My Tickets", href: "/tickets" },
  { name: "About", href: "/about" },
];

export function DistrictHeader() {
  const { isSignedIn, isLoaded } = useUser();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(isLoaded && isSignedIn);
  }, [isLoaded, isSignedIn]);
  return (
    <>
      <header className="w-full bg-[#1a56ff] text-white shadow-sm">
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
              All Events
            </Link>
            {loggedIn ? (
              <Link
                href={"/tickets"}
                className="rounded-lg px-3 py-1.5 text-sm font-semibold text-white"
              >
                My Tickets
              </Link>
            ) : (
              <Link
                href={"/signin"}
                className="rounded-lg px-3 py-1.5 text-sm font-semibold text-white"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
