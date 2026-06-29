"use client";

export function ScrollToExplore({ targetId }: { targetId: string }) {
  const handleClick = () => {
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      className="group flex items-center gap-3 border-2 border-white bg-black px-4 py-2 text-xs font-bold uppercase tracking-widest text-white"
      aria-label="Scroll to explore"
    >
      <span>Scroll to explore</span>
      <span className="flex h-5 w-5 items-center justify-center overflow-hidden">
        <svg
          className="animate-bounce-down h-4 w-4"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="3 6 8 11 13 6" />
        </svg>
      </span>
    </button>
  );
}
