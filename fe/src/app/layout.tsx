import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DistrictHeader } from "@/components/events/DistrictHeader";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/lib/auth/context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "100", "200", "300", "800", "900"],
});

export const metadata: Metadata = {
  title: "Moment",
  description: "Browse and book live events in your university.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#f8f9fa] relative">
        <AuthProvider>
          <div className="bg-linear-to-b from-[#426384]/40 pointer-events-none  to-transparent w-full absolute h-20"></div>
          <DistrictHeader />
          {children}
          <Footer></Footer>
        </AuthProvider>
      </body>
    </html>
  );
}
