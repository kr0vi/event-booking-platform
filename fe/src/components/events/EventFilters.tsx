const filters = [
  "Filters",
  "Today",
  "Tomorrow",
  "This Weekend",
  "Under 10 km",
  "Music",
  "TV Screenings",
];

export function EventFilters() {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {filters.map((label, index) => {
        const hasDropdown = index === 0;

        return (
          <button
            key={label}
            type="button"
            className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
          >
            {hasDropdown ? (
              <span
                className="inline-block h-3 w-3 rounded-full border border-slate-500"
                aria-hidden="true"
              />
            ) : null}
            {label}
            {hasDropdown ? (
              <svg
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M5 7L10 12L15 7"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
