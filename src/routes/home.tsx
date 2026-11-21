import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ChevronRight,
  Pencil,
  Plus,
  Zap,
} from "lucide-react";

import { readProfile, type OnboardingProfile } from "@/lib/onboarding";
import { PaywallModal } from "@/components/paywall-modal";
import { SaveMyExamsNavbar } from "@/components/save-my-exams-navbar";
import { SaveMyExamsSidebar } from "@/components/save-my-exams-sidebar";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Dashboard | ExamGlow" },
      {
        name: "description",
        content: "Welcome to your ExamGlow account and launchpad to stress-free and effective study.",
      },
    ],
  }),
  component: SaveMyExamsDashboardPage,
});

export function SaveMyExamsDashboardPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<OnboardingProfile>({});
  const [paywallOpen, setPaywallOpen] = useState(false);

  useEffect(() => {
    try {
      setProfile(readProfile());
    } catch {}
  }, []);

  const userName = profile.name || "Heue";

  return (
    <div className="flex flex-col h-dvh bg-[#f8fafc] font-sans text-slate-900 overflow-hidden">
      {/* ── 1. Top Navbar (Save My Exams with mega dropdowns) ── */}
      <SaveMyExamsNavbar />

      {/* ── 2. Body: Left Sidebar + Main Content ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar (Clean Save My Exams sidebar) */}
        <SaveMyExamsSidebar />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#f8fafc] p-5 sm:p-8 lg:p-10">
          <div className="mx-auto max-w-6xl space-y-7">
            {/* Greeting Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Hi, {userName}
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 font-normal">
                Welcome to your ExamGlow account and launchpad to stress-free and effective study.
              </p>
            </div>

            {/* 2-Column Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column (8 cols): My Courses */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                    My courses
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => void navigate({ to: "/syllabus-notes" })}
                      className="size-8 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-colors cursor-pointer"
                      title="Edit courses"
                    >
                      <Pencil className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => void navigate({ to: "/syllabus-notes" })}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#155dfc] hover:bg-[#004ce6] text-white px-4 py-1.5 text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
                    >
                      <Plus className="size-3.5" />
                      <span>Add course</span>
                    </button>
                  </div>
                </div>

                {/* Continue Revising Active Course Card */}
                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-800">Continue revising</span>
                    <button
                      type="button"
                      onClick={() => void navigate({ to: "/syllabus-notes", search: { subject: "biology", view: "hub" } })}
                      className="text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      <ChevronRight className="size-4" />
                    </button>
                  </div>

                  {/* Course Item (Navigates to Subject Hub like savemyexams.com/igcse/biology/) */}
                  <button
                    type="button"
                    onClick={() => void navigate({ to: "/syllabus-notes", search: { subject: "biology", view: "hub" } })}
                    className="w-full flex items-center gap-4 text-left p-2 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer"
                  >
                    {/* Realistic Cobalt Blue Tile with Vector DNA Graphic (No Emojis) */}
                    <div className="w-18 h-22 sm:w-20 sm:h-24 rounded-2xl bg-gradient-to-br from-[#0052ff] to-[#0042d9] flex flex-col items-center justify-center text-white shrink-0 shadow-xs relative overflow-hidden">
                      <div className="size-11 rounded-full bg-white/15 backdrop-blur-xs flex items-center justify-center border border-white/20">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="size-6 text-white"
                        >
                          <path d="M4 18c2-2 4-5 8-5s6 3 8 5" />
                          <path d="M4 6c2 2 4 5 8 5s6-3 8-5" />
                          <path d="M8 9.5v5" />
                          <path d="M12 7v10" />
                          <path d="M16 9.5v5" />
                        </svg>
                      </div>
                      <Zap className="size-3 text-white/40 absolute bottom-2 left-2 fill-white/30" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                          IGCSE
                        </span>
                        <span className="text-[11px] font-semibold text-[#1c4d16] bg-[#d9f99d] px-2 py-0.5 rounded">
                          Last viewed
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        Biology
                      </h3>
                    </div>

                    <ChevronRight className="size-5 text-slate-300 group-hover:text-slate-800 group-hover:translate-x-1 transition-all" />
                  </button>
                </div>

                {/* Got Another Course Prompt Card */}
                <div className="rounded-2xl border border-slate-200/90 bg-white p-7 text-center shadow-xs space-y-2.5">
                  <h3 className="text-sm font-bold text-slate-900">
                    Got another course?
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Save your courses for easy access
                  </p>
                  <div>
                    <button
                      type="button"
                      onClick={() => void navigate({ to: "/syllabus-notes" })}
                      className="inline-flex items-center justify-center rounded-full bg-[#155dfc] hover:bg-[#004ce6] text-white px-7 py-2 text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
                    >
                      Add course
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column (4 cols): Study Plan & Jump Back In */}
              <div className="lg:col-span-4 space-y-4">
                {/* 1. Study Plan Card */}
                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs relative overflow-hidden">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-600 block">Study plan</span>
                      <h3 className="text-sm font-bold text-slate-900">
                        Stay on track for your exams
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed pt-1 max-w-[200px]">
                        Structured by experienced teachers, tailored to your courses
                      </p>
                    </div>

                    {/* Hand-Drawn Notebook Vector Illustration (Matches Save My Exams) */}
                    <div className="shrink-0">
                      <svg viewBox="0 0 100 85" fill="none" className="w-24 h-20 text-slate-900">
                        {/* Sparkles */}
                        <path d="M12 25 L14 18 L16 25 L23 27 L16 29 L14 36 L12 29 L5 27 Z" fill="#2563eb" />
                        <path d="M78 12 L79 7 L80 12 L85 13 L80 14 L79 19 L78 14 L73 13 Z" fill="#2563eb" />
                        <path d="M88 40 L89 36 L90 40 L94 41 L90 42 L89 46 L88 42 L84 41 Z" fill="#2563eb" />
                        {/* 3D Stacked book */}
                        <path d="M25 45 L50 30 L85 45 L60 60 Z" fill="#1e3a8a" stroke="#0f172a" strokeWidth="2" strokeLinejoin="round" />
                        <path d="M25 45 L25 55 L60 70 L60 60 Z" fill="#2563eb" stroke="#0f172a" strokeWidth="2" strokeLinejoin="round" />
                        <path d="M85 45 L85 55 L60 70 L60 60 Z" fill="#3b82f6" stroke="#0f172a" strokeWidth="2" strokeLinejoin="round" />
                        {/* White bolt on cover */}
                        <path d="M55 42 L48 48 L52 49 L46 56 L56 48 L51 47 Z" fill="#ffffff" />
                      </svg>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => void navigate({ to: "/study-plan" })}
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 transition-colors shadow-2xs cursor-pointer"
                    >
                      <Plus className="size-3.5" />
                      <span>Create Study Plan</span>
                    </button>
                  </div>
                </div>

                {/* 2. Jump Back In Card */}
                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-1">
                    <span className="text-xs font-semibold text-slate-800">Jump back in</span>
                    <button
                      type="button"
                      onClick={() => void navigate({ to: "/syllabus-notes", search: { subject: "biology", chapter: 1 } })}
                      className="text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      <ChevronRight className="size-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => void navigate({ to: "/syllabus-notes", search: { subject: "biology", chapter: 1 } })}
                    className="w-full text-left group flex items-start justify-between gap-3 p-1 rounded-xl cursor-pointer"
                  >
                    <div className="space-y-1 flex-1 min-w-0 pr-2">
                      <span className="text-xs font-bold text-[#155dfc] block">Revision Notes</span>
                      <p className="text-xs font-semibold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                        Biology / The Purpose of Biological Molecules &amp; Carbohydrates
                      </p>
                      <span className="text-[11px] text-slate-400 font-medium block">
                        IGCSE · Cambridge (CIE)
                      </span>
                    </div>

                    {/* Realistic Miniature Document Preview with multi-curve chart */}
                    <div className="relative w-14 h-18 shrink-0">
                      {/* Back sheet */}
                      <div className="absolute right-0 top-0 w-11 h-15 rounded-md border border-slate-200 bg-slate-100 rotate-6 shadow-2xs" />
                      {/* Front sheet */}
                      <div className="absolute left-0 top-1 w-12 h-16 rounded-md border border-slate-200 bg-white shadow-xs p-1.5 flex flex-col justify-between">
                        <div>
                          <div className="h-1 w-6 bg-blue-500 rounded-full mb-1" />
                          <div className="space-y-0.5">
                            <div className="h-0.5 w-full bg-slate-200 rounded-full" />
                            <div className="h-0.5 w-4/5 bg-slate-200 rounded-full" />
                          </div>
                        </div>
                        {/* Mini curve graph */}
                        <svg viewBox="0 0 40 20" className="w-full h-4">
                          <line x1="0" y1="18" x2="40" y2="18" stroke="#e2e8f0" strokeWidth="1" />
                          <line x1="0" y1="0" x2="0" y2="18" stroke="#e2e8f0" strokeWidth="1" />
                          <path d="M2 17 Q 15 2, 38 6" fill="none" stroke="#f43f5e" strokeWidth="1.2" strokeLinecap="round" />
                          <path d="M2 17 Q 20 14, 38 2" fill="none" stroke="#06b6d4" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Paywall / Upgrade Modal */}
      {paywallOpen && <PaywallModal onClose={() => setPaywallOpen(false)} />}
    </div>
  );
}
