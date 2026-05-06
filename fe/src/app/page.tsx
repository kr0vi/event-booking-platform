"use client";

import { useUser } from "@/lib/auth/useUser";

import { ArrowUpRight } from "lucide-react";
import { ArrowRight, Lock, Shield, CreditCard, Mail, CheckCircle2, Ticket, Users, Calendar, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";



export default function Home() {
  const { isSignedIn, isLoaded } = useUser();
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      window.location.href = "/home";
    }
  }, [isLoaded, isSignedIn]);

  return (
    <div className="min-h-screen bg-[#131517] text-white  relative overflow-hidden">
      <section className="flex items-center justify-center max-w-7xl mx-auto">
        <article className="max-w-350 w-full mx-auto pb-20 md:pb-32 mt-20 ">
          <img src="/logo.png" alt="" className="w-12 mb-4" />
          <h1 className="text-[70px]  leading-none tracking-tighter  mb-6">
            Delightful
            <br /> Events
            <br /> <span className="font-bold">start here</span>
          </h1>

          <p className="text- font-light text-white/90 max-w-3xl mb-8">
            All your university events, in one place. Discover, share,
            <br /> and attend events that matter to you.
          </p>
          <div className="gap-3 flex items-center">
            <Link
              href={"/events"}
              className="p-3 px-22 hover:bg-white/6 hover:border-white/20 transition-all duration-300 cursor-pointer  text-white border-white/10 border backdrop-blur-sm bg-white/5  outline-none rounded-2xl  relative z-10 text-sm"
            >
              Explore Events
            </Link>
            <span className="font-light">or</span>
            <Link
              href={"/events"}
              className="underline font-light cursor-pointer  text-white   outline-none rounded-2xl  relative z-10 text-sm"
            >
              Create your own
            </Link>
            <ArrowUpRight className="-ml-3 underline" size={18} />
          </div>
        </article>
        <article className="max-w0 w-full h-200 mx-auto pb-20 md:pb-32 mt-20  flex items-center justify-center">
          <img
            src={"/assets/images/tickets.png"}
            className="mix-blend-lighten w-full "
          ></img>
        </article>
      </section>

      {/* Trusted By / Logos */}
      <section className="mt-40 border-y border-white/5 bg-white/[0.01] py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
          <span className="text-xs font-mono text-white/40 uppercase tracking-widest mb-8">
            Trusted by Universities everywhere
          </span>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-40 grayscale">
            {/* Logos replacement (text for now) */}
            <span className=" text-2xl font-bold">Stanford</span>
            <span className=" text-2xl font-bold">Harvard</span>
            <span className=" text-2xl font-bold">MIT</span>
            <span className=" text-2xl font-bold">Oxford</span>
            <span className=" text-2xl font-bold">Cambridge</span>
          </div>
        </div>
      </section>

      {/* 3-Card Row */}
      <section className="max-w-7xl  mx-auto px-6 md:px-12 mt-40">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-light mb-4">
            Whats going on at the{" "}
            <span className="italic font-semibold">moment</span>
          </h3>
          <p className="text-white/50 text-lg max-w-xl mx-auto font-light">
            All your university events, in one place. Discover, share, and
            attend events that matter to you.
          </p>
        </div>
        <div className="w-full h-[1px] mb-8 bg-white/20"></div>
        <div className="bg-black/20 border mx-auto border-white/20 p-3 rounded-lg">
          <img
            src="/dashboard.png"
            className="rounded-lg object-cover w-full h-full"
          />
        </div>
      </section>

      {/* Bento Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-40">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <h3 className="text-4xl md:text-5xl  leading-tight">
            Experience what you <br /> meant to feel
          </h3>
          <p className="text-white/40 text-sm max-w-sm text-right font-mono">
            Everything you need to run perfect events, wrapped in an interface
            you'll love.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          <div className="col-span-1 md:col-span-2 rounded-2xl border border-white/10 bg-[#0a0a0a] relative overflow-hidden p-8 flex flex-col justify-between group hover:border-white/20 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent"></div>
            <Ticket className="text-white/20 w-12 h-12" />
            <div className="relative z-10">
              <h4 className="text-xl font-medium mb-2">Fast Checkout</h4>
              <p className="text-white/50 text-sm">
                One-click purchasing for verified students. No long forms.
              </p>
            </div>
          </div>

          <div className="col-span-1 rounded-2xl border border-white/10 bg-[#0a0a0a] relative overflow-hidden p-8 flex flex-col justify-between group hover:border-white/20 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-bl from-white/[0.03] to-transparent"></div>
            <Users className="text-white/20 w-12 h-12" />
            <div className="relative z-10">
              <h4 className="text-xl font-medium mb-2">Exclusive</h4>
              <p className="text-white/50 text-sm">
                Restrict events to specific university emails.
              </p>
            </div>
          </div>

          <div className="col-span-1 rounded-2xl border border-white/10 bg-[#0a0a0a] relative overflow-hidden p-8 flex flex-col justify-between group hover:border-white/20 transition-colors">
            <Calendar className="text-white/20 w-12 h-12" />
            <div className="relative z-10">
              <h4 className="text-xl font-medium mb-2">Calendar Sync</h4>
              <p className="text-white/50 text-sm">
                Automatically add events to Apple or Google Calendar.
              </p>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 rounded-2xl border border-white/10 bg-[#0a0a0a] relative overflow-hidden p-8 flex flex-col justify-between group hover:border-white/20 transition-colors">
            <TrendingUp className="text-white/20 w-12 h-12" />
            <div className="relative z-10">
              <h4 className="text-xl font-medium mb-2">Deep Analytics</h4>
              <p className="text-white/50 text-sm">
                Track views, ticket sales velocity, and scan rates in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security / Privacy */}
      <section className="mt-40 border-t border-white/5 pt-32 pb-20 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-white/20 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
          <Shield className="w-16 h-16 text-white/80 mb-8" />
          <h3 className="text-3xl md:text-5xl  mb-16">
            Privacy is built into Moment
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
            <div className="flex flex-col items-center gap-4 text-center">
              <CheckCircle2 className="w-6 h-6 text-white/40" />
              <span className="text-xs uppercase tracking-widest text-white/50">
                Verified
                <br />
                Students Only
              </span>
            </div>
            <div className="flex flex-col items-center gap-4 text-center">
              <CreditCard className="w-6 h-6 text-white/40" />
              <span className="text-xs uppercase tracking-widest text-white/50">
                Secure
                <br />
                Payments
              </span>
            </div>
            <div className="flex flex-col items-center gap-4 text-center">
              <Mail className="w-6 h-6 text-white/40" />
              <span className="text-xs uppercase tracking-widest text-white/50">
                No Spam
                <br />
                Guarantee
              </span>
            </div>
            <div className="flex flex-col items-center gap-4 text-center">
              <Lock className="w-6 h-6 text-white/40" />
              <span className="text-xs uppercase tracking-widest text-white/50">
                Encrypted
                <br />
                Data
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 mt-20 mb-40">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-6xl  mb-4">Pricing</h3>
          <p className="text-white/40 font-mono text-sm">
            Simple, transparent pricing for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free Tier */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#111] to-[#050505] p-10 flex flex-col">
            <div className="px-3 py-1 rounded bg-white/5 text-xs text-white/60 self-start mb-6 font-mono">
              For Students & Clubs
            </div>
            <h4 className="text-4xl  mb-8">Free</h4>

            <ul className="flex flex-col gap-4 text-sm text-white/60 mb-12 flex-1">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>{" "}
                Create unlimited events
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>{" "}
                Student verification
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>{" "}
                Basic analytics
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>{" "}
                Standard support
              </li>
            </ul>

            <Link
              href="/signup"
              className="w-full py-4 rounded bg-white/5 border border-white/10 text-white text-center font-medium hover:bg-white/10 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Premium Tier */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#111] to-[#050505] p-10 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px]"></div>

            <div className="flex justify-between items-start mb-6">
              <div className="px-3 py-1 rounded bg-white/5 text-xs text-white/60 font-mono">
                For Large Organizations
              </div>
              <div className="w-8 h-8 rounded-full border border-[#6597c9]/40  flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#6597c9]"></div>
              </div>
            </div>

            <h4 className="text-4xl  mb-8">
              $50<span className="text-lg text-white/40 font-sans">/yr</span>
            </h4>

            <ul className="flex flex-col gap-4 text-sm text-white/60 mb-12 flex-1 relative z-10">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>{" "}
                Everything in Free
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>{" "}
                Advanced analytics
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>{" "}
                Custom branding
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>{" "}
                Priority support
              </li>
            </ul>

            <Link
              href="/signup"
              className="w-full py-4 rounded bg-white text-black text-center font-medium hover:bg-white/90 transition-colors relative z-10"
            >
              Upgrade to Premium
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
