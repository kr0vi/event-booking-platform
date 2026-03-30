const navItems = [
  "For you",
  "Dining",
  "Movies",
  "Events",
  "IPL",
  "Stores",
  "Activities",
  "Play",
];

export function DistrictHeader() {
  return (
    // TODO: remove debug background color from the page header container.
    <header className="w-full border-b border-black/10 bg-[#fbf9ee]">
      <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <div className="leading-none">
            <p className="text-[38px] font-black lowercase tracking-[-0.06em] text-slate-900">district</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-800">by zomato</p>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <svg
              className="h-4 w-4 text-violet-600"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M12 22C16.5 16 19 12.8 19 9A7 7 0 1 0 5 9c0 3.8 2.5 7 7 13Z"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <circle cx="12" cy="9" r="2.2" fill="currentColor" />
            </svg>
            <div className="leading-tight">
              <p className="text-base font-semibold text-slate-900">Gurugram</p>
              <p className="text-xs font-medium text-slate-500">Haryana</p>
            </div>
          </div>
        </div>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => {
            const isActive = item === "Events";

            return (
              <button
                key={item}
                type="button"
                className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                  isActive ? "bg-[#ece5be] text-slate-900" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {item}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="grid h-8 w-8 place-content-center rounded-full text-violet-600 transition hover:bg-violet-100"
            aria-label="Search"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" />
              <path d="M16 16L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <button
            type="button"
            className="grid h-9 w-9 place-content-center rounded-full bg-slate-200 text-slate-500"
            aria-label="Profile"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.7" />
              <path
                d="M5 19.5C6.5 16.8 9 15.5 12 15.5C15 15.5 17.5 16.8 19 19.5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
