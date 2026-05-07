"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useUser } from "@/lib/auth/useUser";
import { login } from "@/utils/api";
import { toast } from "sonner";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isSignedIn, isLoaded, refresh } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }
    try {
      const data = await login(email, password);
      if (!data.success) {
        toast.error(data.message || "Login failed");
        setLoading(false);
        return;
      }
      toast.success("Login successful!");
      await refresh();
    } catch (err) {
      console.error("Login failed:", err);
    }
    finally{
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      window.location.href = "/events";
    }
  }, [isLoaded, isSignedIn]);

  return (
    <div className="min-h-screen bg-[#131517] text-white flex flex-col items-center justify-center py-24 px-6 overflow-hidden relative">
      {/* Background Watermark effect */}
      <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] md:text-[200px] font-black text-white/5 whitespace-nowrap pointer-events-none tracking-tighter">
        moment
      </h1>

      <main className="w-full max-w-md relative z-10 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight text-center">
          Welcome back,
        </h1>
        <p className="text-white/60 mb-10 text-center text-lg">
          Log in to access your tickets and discover new events.
        </p>

        <form className="w-full space-y-4" onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-4 bg-white/10 border backdrop-blur-sm border-white/20  rounded-2xl text-white placeholder-white/50 outline-none focus:border-white/40 focus:bg-white/20 transition-all font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 bg-white/10 border backdrop-blur-sm border-white/20  rounded-2xl text-white placeholder-white/50 outline-none focus:border-white/40 focus:bg-white/20 transition-all font-medium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button disabled={loading} className="w-full p-4 mt-2 bg-white text-[#131517] font-bold rounded-2xl hover:bg-white/90 transition-all flex items-center justify-center gap-2">
            {loading ? "Logging in..." : "Login"} <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-8 text-center text-white/50 font-medium">
          Don't have an account?{" "}
          <Link href="/signup" className="text-white hover:underline ml-1">
            Register here
          </Link>
        </div>
      </main>
    </div>
  );
}
