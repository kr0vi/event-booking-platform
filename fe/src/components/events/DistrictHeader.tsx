"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { AuthModal } from "./AuthModal";
import { useAuth } from "@/utils/auth/AuthContext";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "My Tickets", href: "/tickets" },
  { name: "About", href: "/about" },
];

export function DistrictHeader() {
  const [loginModal, setLoginModal] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, logout, isBootstrapping } = useAuth();

  return (
    <>
      <AuthModal isOpen={loginModal} onClose={() => setLoginModal(false)} />
      <header className="w-full border-b border-black/10 bg-white">
        <div className="mx-auto flex w-full max-w-8xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <div className="leading-none">
              <Link href="/">
                <p className="text-[38px] font-semibold lowercase tracking-[-0.06em] text-slate-900">
                  district
                </p>
              </Link>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-800">
                by zomato
              </p>
            </div>

            <div className="hidden items-center gap-2 md:flex">
              <svg
                className="h-4 w-4 text-violet-600"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 22C16.5 16 19 12.8 19 9A7 7 0 1 0 5 9c0 3.8 2.5 7 7 13Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <circle cx="12" cy="9" r="2.2" fill="currentColor" />
              </svg>
              <div className="leading-tight">
                <p className="text-base font-semibold text-slate-900">Delhi</p>
                <p className="text-xs font-medium text-slate-500">NCR</p>
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item, indx) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <Link href={item.href} key={indx}>
                  <button
                    key={indx}
                    type="button"
                    className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                      isActive
                        ? "bg-[#dbbeec] text-black"
                        : "text-black/70 hover:text-slate-900"
                    }`}
                  >
                    {item.name}
                  </button>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-6">
            <button
              type="button"
              className="grid h-8 w-8 place-content-center rounded-full text-violet-600 transition hover:bg-violet-100"
              aria-label="Search"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M16 16L21 21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {isBootstrapping ? (
              <div className="h-8 w-20 animate-pulse rounded bg-slate-200" />
            ) : isAuthenticated ? (
              <button
                onClick={logout}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => setLoginModal(true)}
                className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white hover:bg-slate-700"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
