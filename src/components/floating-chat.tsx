import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Sparkles, X } from "lucide-react";

import { StudyChat } from "@/components/study-chat";

const hiddenOn = ["/chat", "/login", "/signup", "/onboarding", "/syllabus-notes"];

export function FloatingChat() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  // Hide on public landing page, auth pages, and when reading syllabus chapter notes
  if (
    pathname === "/" ||
    hiddenOn.some((path) => pathname.startsWith(path)) ||
    (typeof document !== "undefined" && document.body.dataset["readingChapter"] === "true")
  ) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex flex-col items-end justify-end p-4 sm:p-6">
      {open && (
        <div className="pointer-events-auto mb-3 flex h-[min(70dvh,560px)] w-[min(92vw,400px)] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
          <StudyChat className="rounded-none border-0" onClose={() => setOpen(false)} isMini={true} />
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close AI tutor chat" : "Open AI tutor chat"}
        className="pointer-events-auto flex size-11 items-center justify-center rounded-full bg-white border border-slate-200 shadow-md text-blue-600 hover:text-blue-700 hover:shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer"
      >
        {open ? (
          <X className="size-5 text-slate-600" aria-hidden />
        ) : (
          <div className="relative flex items-center justify-center">
            <span className="size-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <Sparkles className="size-3.5 fill-blue-600" aria-hidden />
            </span>
          </div>
        )}
      </button>
    </div>
  );
}
