"use client";
import Link from "next/link";
import { useUser } from "@/lib/auth/useUser";


export function DistrictHeader() {
  const { isSignedIn, isLoaded } = useUser();
  return (
    <>
      <header className="w-full bg-[#1a56ff] text-white shadow-sm border-b border-white/20">
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
            {isSignedIn && isLoaded ? (
              <>
                <Link
                  href={"/tickets"}
                  className="rounded-lg px-3 py-1.5 text-sm font-semibold text-white"
                >
                  My Tickets
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
