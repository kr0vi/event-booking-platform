"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "My Tickets", href: "/tickets" },
  { name: "About", href: "/about" },
];

export function DistrictHeader() {
  const [loginModal, setLoginModal] = useState(false);
  const pathname = usePathname();

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
            <button
              className="rounded-lg px-3 py-1.5 text-sm font-semibold text-white"
            >
              All Events
            </button>
            <button
              onClick={() => setLoginModal(true)}
              className="rounded-lg px-3 py-1.5 text-sm font-semibold text-white"
            >
              Login
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
