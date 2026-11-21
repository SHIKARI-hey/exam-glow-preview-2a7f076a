import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  ChevronRight,
  LogOut,
  Pencil,
  Plus,
  Search,
  Settings,
  Sparkles,
  User,
  Zap,
  Tag,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { readProfile, type OnboardingProfile } from "@/lib/onboarding";
import { markLoggedOut } from "@/lib/auth";
import { PaywallModal } from "@/components/paywall-modal";

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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [paywallOpen, setPaywallOpen] = useState(false);

  useEffect(() => {
    try {
      const p = readProfile();
      setProfile(p);
    } catch {}
  }, []);

  const userName = profile.name || "Heue";

  return (
    <div className="flex flex-col h-dvh bg-white font-sans text-slate-900 overflow-hidden">
      {/* ── 1. Top Navbar (Save My Exams exact style) ── */}
      <header className="h-16 shrink-0 border-b border-slate-200 bg-white px-4 sm:px-6 flex items-center justify-between gap-4 z-20">
        {/* Left: Brand + Nav dropdowns */}
        <div className="flex items-center gap-6">
          <Link to="/home" className="flex items-center gap-1.5 font-extrabold text-xl tracking-tight text-slate-900">
            <Zap className="size-6 text-blue-600 fill-blue-600" />
            <span className="font-extrabold text-[21px]">ExamGlow</span>
          </Link>

          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-700">
            <button
              type="button"
              onClick={() => void navigate({ to: "/syllabus-notes" })}
              className="flex items-center gap-1 hover:text-slate-950 transition-colors"
            >
              <span>Start studying</span>
              <ChevronDown className="size-3.5 text-slate-400" />
            </button>
            <button
              type="button"
              onClick={() => void navigate({ to: "/test" })}
              className="flex items-center gap-1 hover:text-slate-950 transition-colors"
            >
              <span>Study tools</span>
              <ChevronDown className="size-3.5 text-slate-400" />
            </button>
          </nav>
        </div>

        {/* Center: Search input */}
        <div className="flex-1 max-w-md hidden sm:block">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchQuery.trim()) {
                  void navigate({ to: "/syllabus-notes" });
                }
              }}
              placeholder="Search for a subject"
              className="w-full rounded-full border border-slate-200 bg-slate-50/70 py-2 pl-4 pr-10 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
            />
            <Search className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-blue-600" />
          </div>
        </div>

        {/* Right: Dashboard link + Free trial button + User Avatar */}
        <div className="flex items-center gap-4 shrink-0">
          <Link
            to="/home"
            className="hidden sm:inline-block text-xs font-semibold text-slate-700 hover:text-slate-950"
          >
            Dashboard
          </Link>

          <button
            type="button"
            onClick={() => setPaywallOpen(true)}
            className="rounded-full bg-[#f43f5e] hover:bg-[#e11d48] text-white px-4 py-2 text-xs font-bold transition-colors shadow-xs cursor-pointer"
          >
            Try 7 days free
          </button>

          <button
            type="button"
            onClick={() => setPaywallOpen(true)}
            className="size-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center hover:opacity-90"
          >
            {userName.charAt(0).toUpperCase()}
          </button>
        </div>
      </header>

      {/* ── 2. Body: Left Sidebar + Main Content ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside
          className={`shrink-0 border-r border-slate-200 bg-white transition-all duration-200 flex flex-col justify-between py-4 px-3 ${
            sidebarCollapsed ? "w-16" : "w-56"
          }`}
        >
          {/* Top navigation */}
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-50 w-full transition-colors"
            >
              {sidebarCollapsed ? (
                <PanelLeftOpen className="size-4" />
              ) : (
                <>
                  <PanelLeftClose className="size-4" />
                  <span>Hide menu</span>
                </>
              )}
            </button>

            <nav className="space-y-1">
              <Link
                to="/home"
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  !sidebarCollapsed ? "bg-blue-50 text-blue-700" : "text-blue-700 justify-center"
                }`}
              >
                <LayoutDashboard className="size-4 shrink-0 text-blue-600" />
                {!sidebarCollapsed && <span>Dashboard</span>}
              </Link>

              <Link
                to="/syllabus-notes"
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors ${
                  sidebarCollapsed ? "justify-center" : ""
                }`}
              >
                <BookOpen className="size-4 shrink-0 text-slate-500" />
                {!sidebarCollapsed && <span>Revision Notes</span>}
              </Link>

              <Link
                to="/test"
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors ${
                  sidebarCollapsed ? "justify-center" : ""
                }`}
              >
                <Tag className="size-4 shrink-0 text-slate-500" />
                {!sidebarCollapsed && <span>Brand ambassador</span>}
              </Link>
            </nav>
          </div>

          {/* Bottom links */}
          <div className="space-y-1 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setPaywallOpen(true)}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 w-full text-left transition-colors ${
                sidebarCollapsed ? "justify-center" : ""
              }`}
            >
              <User className="size-4 shrink-0 text-slate-500" />
              {!sidebarCollapsed && <span>Profile</span>}
            </button>

            <button
              type="button"
              onClick={() => setPaywallOpen(true)}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 w-full text-left transition-colors ${
                sidebarCollapsed ? "justify-center" : ""
              }`}
            >
              <Settings className="size-4 shrink-0 text-slate-500" />
              {!sidebarCollapsed && <span>Settings</span>}
            </button>

            <button
              type="button"
              onClick={() => {
                markLoggedOut();
                void navigate({ to: "/login" });
              }}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 w-full text-left transition-colors ${
                sidebarCollapsed ? "justify-center" : ""
              }`}
            >
              <LogOut className="size-4 shrink-0 text-slate-500" />
              {!sidebarCollapsed && <span>Log out</span>}
            </button>
          </div>
        </aside>

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
                      className="size-8 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-colors"
                      title="Edit courses"
                    >
                      <Pencil className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => void navigate({ to: "/syllabus-notes" })}
                      className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 text-white px-3.5 py-1.5 text-xs font-semibold hover:bg-blue-700 transition-colors shadow-2xs"
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
                      className="text-slate-400 hover:text-slate-700"
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
                        Chapter 1: Biological Molecules &amp; Carbohydrates
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
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-800 transition-colors shadow-2xs"
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
                      className="text-slate-400 hover:text-slate-700"
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
                        Biology / The Purpose of Biological Molecules &amp; Carbohydrates
                      </p>
                      <p className="text-[11px] text-slate-400">
                        IGCSE · Curriculum (CIE)
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
