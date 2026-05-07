"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useUser } from "@/lib/auth/useUser";
import { signup } from "@/utils/api";
import { toast } from "sonner";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoaded, isSignedIn, refresh } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      window.location.href = "/events";
    }
  }, [isLoaded, isSignedIn]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password || !fullName) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }
    // Implement your signup logic here, e.g., call an API to create a new user
    // After successful signup, you might wantb to refresh the user context or redirect
    try {
      const data = await signup(email, password, fullName);
      if (!data.success) {
        toast.error(data.message || "Signup failed");
        return;
      }
      toast.success("Signup successful! Please log in.");
      await refresh(); // Refresh user data after signup
    } catch (err) {
      toast.error("Signup failed");
      console.error("Signup failed:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen  bg-[#131517] text-white flex flex-col items-center justify-center overflow-hidden relative">
      {/* Background Watermark/blur effect */}
      <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] md:text-[200px] font-black text-white/5 whitespace-nowrap pointer-events-none tracking-tighter">
        moment
      </h1>

      <main className="w-full max-w-md relative z-10 flex flex-col items-center mt-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight text-center">
          Lets get your Tickets,
        </h1>
        <p className="text-white/60 mb-10 text-center text-lg">
          Join us to start booking and hosting your favorite events.
        </p>

        <form className="w-full space-y-4" onSubmit={handleSignup}>
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-4 bg-white/10 border backdrop-blur-sm border-white/20  rounded-2xl text-white placeholder-white/50 outline-none focus:border-white/40 focus:bg-white/20 transition-all font-medium"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
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
          <button 
            type="submit"
            className="w-full p-4 mt-2 bg-white text-[#131517] font-bold rounded-2xl hover:bg-white/90 transition-all flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Register"}
            <ArrowRight size={18} />
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
