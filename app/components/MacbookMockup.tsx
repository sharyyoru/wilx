import { ReactNode } from "react";

export function MacbookMockup({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Screen */}
      <div className="relative rounded-t-xl border-[10px] border-neutral-800 bg-neutral-800 shadow-2xl">
        {/* Camera notch */}
        <div className="absolute left-1/2 top-1 z-10 h-1.5 w-10 -translate-x-1/2 rounded-full bg-neutral-700" />
        {/* Screen content */}
        <div className="relative overflow-hidden rounded-md bg-black" style={{ aspectRatio: "16/10" }}>
          {children}
        </div>
      </div>
      {/* Base */}
      <div className="relative">
        <div className="mx-auto h-[18px] w-full rounded-b-xl bg-neutral-700" />
        <div className="mx-auto h-[6px] w-[60%] rounded-b-xl bg-neutral-600" />
      </div>
    </div>
  );
}
