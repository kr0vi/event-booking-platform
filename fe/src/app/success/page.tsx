"use client";

import { useEffect, useState } from "react";
import { Check, Ticket, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger entrance animation on mount
    setMounted(true);
    
    // Auto-redirect to tickets after 5 seconds
    const timer = setTimeout(() => {
      router.push("/tickets");
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="relative min-h-screen bg-[#1a56ff] text-white overflow-hidden flex flex-col items-center justify-center p-6">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed opacity-30 block inset-0 h-full w-full object-cover mix-blend-screen pointer-events-none"
        src={"/assets/video/warp-effect.mp4"}
      ></video>


      <div 
        className={`relative z-10 max-w-sm w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 text-center shadow-2xl transition-all duration-1000 ease-out transform ${
          mounted ? "translate-y-0 opacity-100 scale-100" : "translate-y-16 opacity-0 scale-95"
        }`}
      >
        <div className="relative flex items-center justify-center w-16 h-16 mx-auto mb-5">
          {/* Ring pulsing outward */}
          <div className="absolute inset-0 bg-green-400/80 rounded-full animate-ping [animation-duration:2s]"></div>
          
          {/* Glowing Green Main Circle */}
          <div className="relative bg-green-500 rounded-full w-full h-full flex items-center justify-center shadow-[0_0_50px_rgba(52,211,153,0.5)] z-10">
            <Check size={36} strokeWidth={3} className="text-white drop-shadow-lg" />
          </div>
          
        </div>

        <h1 className="text-3xl font-extrabold mb-3 tracking-tight">Success</h1>
        <p className="text-white/70 mb-8 leading-tighter font-medium">
          Your purchase was successful. We've generated your digital entrance ticket.
        </p>

        <div className="flex flex-col gap-3">
          <Link 
            href="/tickets" 
            className="w-full group inline-flex justify-center items-center gap-2 bg-white text-black px-6 py-3.5 rounded-xl font-bold transition shadow-lg shadow-yellow-500/20"
          >
            <Ticket size={20} className="group-hover:-rotate-12 transition-transform duration-300" />
            View My Tickets
          </Link>
          <Link 
            href="/events" 
            className="w-full group inline-flex justify-center items-center gap-2 bg-white/10 text-white hover:bg-white/20 px-6 py-3.5 rounded-xl font-semibold transition border border-transparent hover:border-white/10"
          >
            Browse More Events
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="mt-8">
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
             <div className="h-full bg-white/30 rounded-full w-full animate-[shrink_5s_linear_forwards]" style={{ animationName: mounted ? 'shrink' : 'none' }}>
                <style jsx>{`
                  @keyframes shrink {
                    from { transform: translateX(0); }
                    to { transform: translateX(-100%); }
                  }
                `}</style>
             </div>
          </div>
          <p className="mt-3 text-[11px] font-medium text-white/40 uppercase tracking-widest">Redirecting to tickets</p>
        </div>
      </div>
    </main>
  );
}
