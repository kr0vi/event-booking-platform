"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OrganizerSignupRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/host/signup");
  }, [router]);
  return null;
}
