"use client";

import { useUser } from "@/lib/auth/useUser";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const { isSignedIn, isLoaded } = useUser();
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      window.location.href = "/home";
    }
  }, [isLoaded, isSignedIn]);
  // return <EventsHomePage />;
  return (
    <div className="min-h-screen bg-[#131517] text-white  px-6 md:px-12    relative overflow-hidden">
      <main className="flex items-center justify-center max-w-7xl mx-auto">
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
      </main>

      {/* About Section - Immense Typography split */}
      <section
        id="about"
        className="py-32 px-6 md:px-12 border-t border-white/10 bg-[#17191b] -mx-6 md:-mx-12"
      >
        <div className="max-w-7xl b mx-auto px-6 md:px-12">
          <div className=" text-center">
            <div className="flex-1">
              <h2 className="text-6xl leading-[0.9] tracking-tighter font-light mb-8">
                Just for <br />
                <span className="font-med ">Students.</span>
              </h2>
              <p className="text-lg text-white/60 font-light leading-relaxed max-w-2xl mx-auto">
                By verifying academic emails, we ensure a safe, relevant, and
                entirely exclusive ecosystem for every campus we support.
              </p>
              <Link
                href={"/signup"}
                className="my-12 inline-flex items-center gap-1 p-2 px-3 bg-white/5 hover:bg-white  hover:text-black transition-all duration-500 cursor-pointer text-white border-white/10 border rounded-full  tracking-tight group"
              >
                Join your campus
                <ArrowUpRight className="group-hover:rotate-45 transition-transform scale-90" />
              </Link>
            </div>
            <div className="flex-1 w-full relative">
              <div className="h-[50vh] bg-white/5 rounded-[3rem] border border-white/50 overflow-hidden relative group">
                <img
                  src="https://imgs.search.brave.com/_EEEowecHdQcjUIiaI0Jot1yhVNXfmsF5m--EwrPm5o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9lZHV2/b3cuY29tL2ltYWdl/cy9jb2xsZWdlLzMw/Nl9rci5qcGc"
                  alt=""
                  className="object-cover w-full h-full transition-transform"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Full bleed CTA */}
      <section
        id="contact"
        className="py-32 px-6 md:px-12 border-t border-white/10 mb-20"
      >
        <div className="max-w-7xl mx-auto bg-[#1a1c1e] rounded-[3rem] p-12 md:p-24 text-center border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05)_0%,transparent_50%)] group-hover:opacity-50 transition-opacity"></div>
          <h2 className="text-5xl leading-none tracking-tighter mb-8 relative z-10 font-light">
            Lets get you going to your
            <br />
            <span className="font-bold">first event.</span>
          </h2>
          <p className="text-white/60 font-light text-sm max-w-2xl mx-auto mb-12 relative z-10">
            Whether you want to explore, share, or create events, moment is your
            campus companion. Join us and make the most of your university
            experience.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10 w-full sm:w-auto max-w-md mx-auto">
            <Link
              href={"/events"}
              className="p-3 px-22 hover:bg-white/6 hover:border-white/20 transition-all duration-300 cursor-pointer  text-white border-white/10 border backdrop-blur-sm bg-white/5  outline-none rounded-2xl  relative z-10 text-sm"
            >
              Explore Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
