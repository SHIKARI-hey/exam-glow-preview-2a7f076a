import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ChevronRight,
  Pencil,
  Plus,
  Sparkles,
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
      const p = readProfile();
      setProfile(p);
    } catch {}
  }, []);

  const userName = profile.name || "Heue";

  return (
    <div className="flex flex-col h-dvh bg-[#f8fafc] font-sans text-slate-900 overflow-hidden">
      {/* ── 1. Top Navbar (Save My Exams with mega dropdowns) ── */}
      <SaveMyExamsNavbar />

      {/* ── 2. Body: Left Sidebar + Main Content ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <SaveMyExamsSidebar />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-5 sm:p-8 lg:p-10">
          <div className="mx-auto max-w-6xl space-y-8">
            {/* Greeting Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Hi, {userName} 👋
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-500">
                Welcome to your ExamGlow account and launchpad to stress-free and effective study.
              </p>
            </div>

            {/* 2-Column Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column (8 cols): My Courses */}
              <div className="lg:col-span-8 space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
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
                      className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 text-white px-3.5 py-1.5 text-xs font-semibold hover:bg-blue-700 transition-colors shadow-2xs cursor-pointer"
                    >
                      <Plus className="size-3.5" />
                      <span>Add course</span>
                    </button>
                  </div>
                </div>

                {/* Continue Revising Active Course Card */}
                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-800">Continue revising</span>
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
                    className="w-full flex items-center gap-4 text-left p-2 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer"
                  >
                    <div className="size-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-xs">
                      <span className="font-extrabold text-xl">🧬</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          IGCSE
                        </span>
                        <span className="text-[10px] font-bold text-lime-800 bg-[#E4F8B8] px-2 py-0.5 rounded">
                          Last viewed
                        </span>
                      </div>
                      <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                        Biology
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Chapter 1: Characteristics &amp; Classification of Living Organisms
                      </p>
                    </div>

                    <ChevronRight className="size-5 text-slate-300 group-hover:text-slate-800 group-hover:translate-x-1 transition-all" />
                  </button>
                </div>

                {/* Got Another Course Prompt Card */}
                <div className="rounded-2xl border border-slate-200/90 bg-white p-8 text-center shadow-xs space-y-3">
                  <h3 className="text-sm font-bold text-slate-900">
                    Got another course?
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Save your courses for easy access and personalized revision tracking.
                  </p>
                  <button
                    type="button"
                    onClick={() => void navigate({ to: "/syllabus-notes" })}
                    className="inline-flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
                  >
                    Add course
                  </button>
                </div>
              </div>

              {/* Right Column (4 cols): Study Plan & Jump Back In */}
              <div className="lg:col-span-4 space-y-5">
                {/* Study Plan Card */}
                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs relative overflow-hidden">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-slate-400">Study plan</span>
                      <h3 className="text-sm font-bold text-slate-900">
                        Stay on track for your exams
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed pt-1">
                        Structured by experienced teachers, tailored to your courses.
                      </p>
                    </div>

                    {/* Doodle Illustration */}
                    <div className="size-14 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                      <Sparkles className="size-7" />
                    </div>
                  </div>

                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={() => void navigate({ to: "/study-plan" })}
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-800 transition-colors shadow-2xs cursor-pointer"
                    >
                      <Plus className="size-3.5" />
                      <span>Create Study Plan</span>
                    </button>
                  </div>
                </div>

                {/* Jump Back In Card */}
                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800">Jump back in</span>
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
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-blue-600">Revision Notes</span>
                      <p className="text-xs font-semibold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                        Biology / 1.1 Characteristics of Living Organisms
                      </p>
                      <p className="text-[11px] text-slate-400">
                        IGCSE · CIE (0610)
                      </p>
                    </div>

                    {/* Miniature Document Preview */}
                    <div className="size-12 rounded-lg border border-slate-200 bg-slate-50 p-1.5 flex flex-col justify-between shrink-0 shadow-2xs">
                      <div className="h-1 w-3/4 bg-blue-400 rounded-full" />
                      <div className="space-y-0.5">
                        <div className="h-0.5 w-full bg-slate-300 rounded-full" />
                        <div className="h-0.5 w-4/5 bg-slate-300 rounded-full" />
                        <div className="h-0.5 w-2/3 bg-slate-300 rounded-full" />
                      </div>
                      <div className="h-1.5 w-full bg-slate-200 rounded" />
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
