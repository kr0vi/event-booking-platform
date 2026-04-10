import { EventsHomePage } from "@/components/events/EventsHomePage";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  // return <EventsHomePage />;
  return (
    <div className="min-h-screen bg-[#1a56ff] text-white  px-6 md:px-12    relative overflow-hidden">
      <main className="flex items-center justify-center max-w-7xl mx-auto">
        <article className="max-w-350 w-full mx-auto pb-20 md:pb-32 mt-20 ">
          <p className="text-[24px] text-white/40 ml-2 -mt-10 mb-10 font-black  tracking-[-0.06em] ">
            moment
          </p>
          <h1 className="text-[80px]  leading-none tracking-tighter  mb-6">
            Delightful
            <br /> Events
            <br /> <span className="font-bold">start here</span>
          </h1>

          <p className="text-lg font-light text-white/90 max-w-3xl mb-8">
            All your university events, in one place. Discover, share, and
            attend events that matter to you.
          </p>
          <div className="gap-3 flex items-center">
            <button
              // value={email}
              // onChange={(event) => setEmail(event.target.value)}
              className="p-3 px-22 hover:bg-white/20 transition-all duration-300 cursor-pointer  text-white border-white/20 border backdrop-blur-sm bg-white/10 placeholder-white/60  outline-none rounded-2xl  relative z-10 text-sm"
            >
              Create Your First Event
            </button>
            <span className="font-light">or</span>
            <button className="underline font-light cursor-pointer  text-white   outline-none rounded-2xl  relative z-10 text-sm">
              explore Events
            </button>
            <ArrowUpRight className="-ml-3 underline" size={18} />
          </div>
        </article>
        <article className="max-w-350 w-full h-200 mx-auto pb-20 md:pb-32 mt-20  flex items-center justify-center">
          <video
            src={"/assets/video/smile.mp4"}
            autoPlay
            loop
            muted
            className="mix-blend-lighten w-full "
          ></video>
        </article>
      </main>
    </div>
  );
}
