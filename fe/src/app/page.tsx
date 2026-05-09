"use client";

import { useUser } from "@/lib/auth/useUser";
import {
  ArrowUpRight,
  ArrowRight,
  Lock,
  Shield,
  CreditCard,
  Mail,
  CheckCircle2,
  Ticket,
  Users,
  Calendar,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const { isSignedIn, isLoaded, user } = useUser();
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      if (user?.role === "HOST") {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/home";
      }
    }
  }, [isLoaded, isSignedIn]);

  return (
    <div className="min-h-screen bg-[#131517] text-white relative selection:bg-white/20 overflow-x-hidden">
      {/* Background Gradients (Greyish/Subtle) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white/[0.03] blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-white/[0.02] blur-[120px] animate-pulse-slow delay-500"></div>
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[60%] h-[60%] rounded-full bg-white/[0.01] blur-[150px]"></div>
      </div>

      <div className="relative z-10">
        {/* Original Hero Section Structure */}
        <section className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 pt-24 md:pt-32 min-h-[80vh]">
          <article className="w-full md:w-1/2 pb-10 md:pb-32 mt-20 opacity-0-start animate-fade-in-up">
            <img src="/logo.png" alt="" className="w-12 mb-4" />
            <h1 className="text-6xl md:text-[70px] leading-none tracking-tighter mb-6">
              Delightful
              <br /> Events
              <br /> <span className="font-bold gradient-text">start here</span>
            </h1>

            <p className="text-lg font-light text-white/90 max-w-xl mb-8">
              All your university events, in one place. Discover, share,
              <br className="hidden md:block" /> and attend events that matter
              to you.
            </p>
            <div className="gap-3 flex items-center">
              <Link
                href={"/events"}
                className="p-3 px-8 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer text-white border-white/10 border backdrop-blur-sm bg-white/5 outline-none rounded-2xl relative z-10 text-sm shadow-[0_0_20px_rgba(255,255,255,0.05)]"
              >
                Explore Events
              </Link>
              <span className="font-light text-white/60 mx-2">or</span>
              <Link
                href={"/events"}
                className="underline font-light cursor-pointer text-white hover:text-white/80 transition-colors outline-none rounded-2xl relative z-10 text-sm"
              >
                Create your own
              </Link>
              <ArrowUpRight className="-ml-1 text-white/70" size={18} />
            </div>
          </article>

          <article className="w-full md:w-1/2 pb-20 md:pb-32 mt-10 md:mt-20 flex items-center justify-center opacity-0-start animate-fade-in-up delay-300">
            <img
              src={"/assets/images/tickets.png"}
              className="mix-blend-lighten w-full max-w-[500px] animate-float"
              alt=""
            />
          </article>
        </section>

        {/* Dashboard Preview Section (original 3-Card Row equivalent) */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mt-10 md:mt-20 opacity-0-start animate-fade-in-up delay-400">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-light mb-4">
              What's going on at the{" "}
              <span className="italic font-semibold">moment</span>
            </h3>
            <p className="text-white/50 text-lg max-w-xl mx-auto font-light">
              All your university events, in one place. Discover, share, and
              attend events that matter to you.
            </p>
          </div>
          <div className="w-full h-[1px] mb-8 bg-white/10"></div>
          <div className="bg-black/20 border mx-auto border-white/10 p-3 rounded-lg hover:border-white/20 transition-all duration-700 shadow-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]">
            <img
              src="/dashboard.png"
              className="rounded-lg object-cover w-full h-full"
              alt="Dashboard Preview"
            />
          </div>
        </section>

        {/* Trusted By / Logos */}
        <section className="mt-40 border-y border-white/5 bg-white/[0.01] py-12">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center opacity-0-start animate-fade-in">
            <span className="text-xs font-mono text-white/40 uppercase tracking-widest mb-8">
              Trusted by Universities everywhere
            </span>
            <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
              <span className="text-2xl font-bold tracking-tight">
                Stanford
              </span>
              <span className="text-2xl font-bold tracking-tight">Harvard</span>
              <span className="text-2xl font-bold tracking-tight">MIT</span>
              <span className="text-2xl font-bold tracking-tight">Oxford</span>
              <span className="text-2xl font-bold tracking-tight">
                Cambridge
              </span>
            </div>
          </div>
        </section>

        {/* Bento Grid */}
        <section className="py-32 px-6 max-w-7xl mx-auto mt-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <h3 className="text-4xl md:text-5xl font-light leading-tight">
              Experience what you <br /> meant to feel
            </h3>
            <p className="text-white/40 text-sm max-w-sm text-right font-mono">
              Everything you need to run perfect events, wrapped in an interface
              you'll love.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
            {/* Feature 1 */}
            <div className="col-span-1 md:col-span-2 rounded-2xl border border-white/5 bg-[#1a1c1e] relative overflow-hidden p-8 flex flex-col justify-between group hover:border-white/10 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Ticket className="text-white/20 w-12 h-12 relative z-10" />
              <div className="relative z-10">
                <h4 className="text-xl font-medium mb-2">Fast Checkout</h4>
                <p className="text-white/50 text-sm">
                  One-click purchasing for verified students. No long forms.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="col-span-1 rounded-2xl border border-white/5 bg-[#1a1c1e] relative overflow-hidden p-8 flex flex-col justify-between group hover:border-white/10 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-bl from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Users className="text-white/20 w-12 h-12 relative z-10" />
              <div className="relative z-10">
                <h4 className="text-xl font-medium mb-2">Exclusive</h4>
                <p className="text-white/50 text-sm">
                  Restrict events to specific university emails.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="col-span-1 rounded-2xl border border-white/5 bg-[#1a1c1e] relative overflow-hidden p-8 flex flex-col justify-between group hover:border-white/10 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Calendar className="text-white/20 w-12 h-12 relative z-10" />
              <div className="relative z-10">
                <h4 className="text-xl font-medium mb-2">Calendar Sync</h4>
                <p className="text-white/50 text-sm">
                  Automatically add events to Apple or Google Calendar.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="col-span-1 md:col-span-2 rounded-2xl border border-white/5 bg-[#1a1c1e] relative overflow-hidden p-8 flex flex-col justify-between group hover:border-white/10 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-tl from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <TrendingUp className="text-white/20 w-12 h-12 relative z-10" />
              <div className="relative z-10">
                <h4 className="text-xl font-medium mb-2">Deep Analytics</h4>
                <p className="text-white/50 text-sm">
                  Track views, ticket sales velocity, and scan rates in
                  real-time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Security / Privacy */}
        <section className="mt-40 border-t border-white/5 pt-32 pb-20 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-white/10 to-transparent"></div>
          <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
            <Shield className="w-16 h-16 text-white/80 mb-8" />
            <h3 className="text-3xl md:text-5xl font-light mb-16">
              Privacy is built into Moment
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
              {[
                { icon: CheckCircle2, text: ["Verified", "Students Only"] },
                { icon: CreditCard, text: ["Secure", "Payments"] },
                { icon: Mail, text: ["No Spam", "Guarantee"] },
                { icon: Lock, text: ["Encrypted", "Data"] },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-4 text-center group"
                >
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-6 h-6 text-white/40 group-hover:text-white/80 transition-colors" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-white/50">
                    {item.text[0]}
                    <br />
                    {item.text[1]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="max-w-5xl mx-auto px-6 md:px-12 mt-20 mb-40">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-6xl font-light mb-4">Pricing</h3>
            <p className="text-white/40 font-mono text-sm">
              Simple, transparent pricing for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free Tier */}
            <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-[#1a1c1e] to-[#131517] p-10 flex flex-col hover:border-white/10 transition-colors">
              <div className="px-3 py-1 rounded bg-white/5 text-xs text-white/60 self-start mb-6 font-mono border border-white/5">
                For Students & Clubs
              </div>
              <h4 className="text-4xl font-light mb-8">Free</h4>

              <ul className="flex flex-col gap-4 text-sm text-white/60 mb-12 flex-1">
                {[
                  "Create unlimited events",
                  "Student verification",
                  "Basic analytics",
                  "Standard support",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/signup"
                className="w-full py-4 rounded bg-white/5 border border-white/10 text-white text-center font-medium hover:bg-white/10 transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Premium Tier */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#1a1c1e] to-[#131517] p-10 flex flex-col relative overflow-hidden group hover:border-white/20 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[50px] group-hover:bg-white/10 transition-colors duration-700"></div>

              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="px-3 py-1 rounded bg-white/5 text-xs text-white/60 font-mono border border-white/5">
                  For Large Organizations
                </div>
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white/80"></div>
                </div>
              </div>

              <h4 className="text-4xl font-light mb-8 relative z-10">
                $50<span className="text-lg text-white/40 font-sans">/yr</span>
              </h4>

              <ul className="flex flex-col gap-4 text-sm text-white/60 mb-12 flex-1 relative z-10">
                {[
                  "Everything in Free",
                  "Advanced analytics",
                  "Custom branding",
                  "Priority support",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                    {feature}
                  </li>
                ))}
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
    </div>
  );
}
