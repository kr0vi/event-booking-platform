"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { api } from "@/utils/api";

export default function HostSignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await api.post("/auth/org/signup", {
      name: fullName,
      email,
      password,
    });
    if (data.success) {
      window.location.href = "/login";
    } else {
      alert("Signup failed: " + data.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#131517] text-white flex flex items-center justify-center overflow-hidden relative">
      <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] md:text-[200px] font-black text-white/5 whitespace-nowrap pointer-events-none tracking-tighter">
        moment
      </h1>

      <main className="w-full max-w-md relative z-10 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight text-center">
          Start Hosting Events.
        </h1>
        <p className="text-white/60 mb-10 text-center text-lg">
          Join us as a host to start hosting events in your own university.
        </p>

        <form className="w-full space-y-4" onSubmit={handleSignup}>
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-4 bg-white/10 border backdrop-blur-sm border-white/20 rounded-2xl text-white placeholder-white/50 outline-none focus:border-white/40 focus:bg-white/20 transition-all font-medium"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Business Email"
              className="w-full p-4 bg-white/10 border backdrop-blur-sm border-white/20 rounded-2xl text-white placeholder-white/50 outline-none focus:border-white/40 focus:bg-white/20 transition-all font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 bg-white/10 border backdrop-blur-sm border-white/20 rounded-2xl text-white placeholder-white/50 outline-none focus:border-white/40 focus:bg-white/20 transition-all font-medium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="w-full p-4 mt-2 bg-white text-[#131517] font-bold rounded-2xl hover:bg-white/90 transition-all flex items-center justify-center gap-2">
            Register as Host <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-8 text-center text-white/50 font-medium">
          Already have an account?{" "}
          <Link href="/login" className="text-white hover:underline ml-1">
            Log in
          </Link>
        </div>
      </main>
    </div>
  );
}
