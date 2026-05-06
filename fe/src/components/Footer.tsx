import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#131517] border-t border-white/20 text-white pt-24 pb-8 px-6 md:px-16 w-full mt-auto">
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between w-full mb-20 gap-16 md:gap-8">
          {/* Left section */}
          <div className="flex flex-col md:w-3/5">
            <span className="text-[10px] md:text-[11px] tracking-[0.2em] text-[#d4d4d4] font-bold uppercase mb-8 md:mb-16">
              Made by Krovi
            </span>
            <h1 className="lg:text-[11rem] font-bold -tracking-[15px] text-white leading-none -ml-1 md:-ml-2">
              moment.
            </h1>
          </div>

          {/* Right section - Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-16 md:w-2/5 pt-1 md:pt-0">
            {/* Column 1 */}
            <div className="flex flex-col gap-6">
              <h3 className="text-white font-mono text-[10px] md:text-[11px] uppercase tracking-widest">
                (Product)
              </h3>
              <ul className="flex flex-col gap-3 text-sm md:text-[15px] font-medium text-white/80">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-6">
              <h3 className="text-white font-mono text-[10px] md:text-[11px] uppercase tracking-widest">
                (Resources)
              </h3>
              <ul className="flex flex-col gap-3 text-sm md:text-[15px] font-medium text-white/80">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Feedback
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-6">
              <h3 className="text-white font-mono text-[10px] md:text-[11px] uppercase tracking-widest">
                (Developer)
              </h3>
              <ul className="flex flex-col gap-3 text-sm md:text-[15px] font-medium text-white/80">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Github
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider & Bottom Section */}
        <div className="border-t border-white/60 pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] text-white/60 font-medium">
          <p>© 2026 moment. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Built by krovi.</p>
        </div>
      </div>
    </footer>
  );
}
