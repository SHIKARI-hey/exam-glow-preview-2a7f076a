import { Link, useNavigate } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  FileText,
  GraduationCap,
  HelpCircle,
  Layers,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Search,
  Settings,
  Sparkles,
  User,
  Zap,
} from "lucide-react";

import { readProfile, type OnboardingProfile } from "@/lib/onboarding";
import { markLoggedOut } from "@/lib/auth";
import { PaywallModal } from "@/components/paywall-modal";

export function SaveMyExamsNavbar({
  showBrand = true,
  className = "",
}: {
  showBrand?: boolean;
  className?: string;
}) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<OnboardingProfile>({});
  const [studyingOpen, setStudyingOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [paywallOpen, setPaywallOpen] = useState(false);

  const studyingRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const p = readProfile();
      setProfile(p);
    } catch {}
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (studyingRef.current && !studyingRef.current.contains(target)) {
        setStudyingOpen(false);
      }
      if (toolsRef.current && !toolsRef.current.contains(target)) {
        setToolsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(target)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userName = profile.name || "Student";
  const userInitial = userName.charAt(0).toUpperCase() || "S";

  const popularSubjects = [
    { name: "Biology", code: "0610", active: true, desc: "120 Revision Chapters · CIE, Edexcel" },
    { name: "Chemistry", code: "0620", active: false, desc: "Atomic structure, organic, reactions" },
    { name: "Physics", code: "0625", active: false, desc: "Forces, electricity, thermal, waves" },
    { name: "Mathematics", code: "0580", active: false, desc: "Algebra, calculus, statistics" },
    { name: "Economics", code: "0455", active: false, desc: "Microeconomics, global trade" },
    { name: "Computer Science", code: "0478", active: false, desc: "Algorithms, python, data logic" },
  ];

  const levels = [
    { name: "IGCSE", badge: "Primary", active: true },
    { name: "GCSE", badge: "UK", active: false },
    { name: "International A-Level", badge: "AS / A2", active: true },
    { name: "O Level", badge: "Intl", active: false },
  ];

  const examBoards = [
    { name: "Cambridge (CIE)", count: "120 Chapters" },
    { name: "Edexcel International", count: "Complete Spec" },
    { name: "AQA Curriculum", count: "Higher / Core" },
    { name: "OCR / Eduqas", count: "Exam Aligned" },
  ];

  const studyTools = [
    {
      title: "Revision Notes",
      desc: "Teacher-written summaries with worked examples and molecular illustrations",
      icon: BookOpen,
      to: "/syllabus-notes",
      badge: "Popular",
    },
    {
      title: "Topic Questions",
      desc: "Exam-style practice questions with detailed mark schemes",
      icon: HelpCircle,
      to: "/test",
      badge: "Essential",
    },
    {
      title: "Flashcards",
      desc: "Spaced-repetition active recall decks for key terms and formulas",
      icon: Layers,
      to: "/flashcards",
    },
    {
      title: "Mock Exams",
      desc: "Timed full-length exam simulations with model solutions",
      icon: FileText,
      to: "/test",
    },
    {
      title: "Study Plan",
      desc: "Personalized revision planner built around your exam dates",
      icon: Calendar,
      to: "/study-plan",
    },
    {
      title: "DueOtter AI Tutor",
      desc: "24/7 syllabus helper for instant concept explanations and question hints",
      icon: Sparkles,
      to: "/chat",
      badge: "AI",
    },
  ];

  const filteredSearchSubjects = popularSubjects.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.code.includes(searchQuery)
  );

  return (
    <>
      <header
        className={`h-16 shrink-0 border-b border-slate-200 bg-white px-4 sm:px-6 flex items-center justify-between gap-4 z-40 relative font-sans ${className}`}
      >
        {/* Left: Brand Logo & Mega Menu Dropdowns */}
        <div className="flex items-center gap-6">
          {showBrand && (
            <Link
              to="/home"
              className="flex items-center gap-1.5 font-extrabold text-xl tracking-tight text-slate-900 group"
            >
              <Zap className="size-6 text-blue-600 fill-blue-600 group-hover:scale-110 transition-transform" />
              <span className="font-extrabold text-[21px] tracking-tight">ExamGlow</span>
            </Link>
          )}

          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-700">
            {/* 1. Start studying Dropdown */}
            <div className="relative" ref={studyingRef}>
              <button
                type="button"
                onClick={() => {
                  setStudyingOpen(!studyingOpen);
                  setToolsOpen(false);
                }}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                  studyingOpen ? "bg-slate-100 text-slate-950" : "hover:text-slate-950 hover:bg-slate-50"
                }`}
              >
                <span>Start studying</span>
                <ChevronDown
                  className={`size-3.5 text-slate-400 transition-transform duration-200 ${
                    studyingOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Mega Menu Window */}
              {studyingOpen && (
                <div className="absolute left-0 top-full mt-2 w-[720px] rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="grid grid-cols-12 gap-6">
                    {/* Col 1: Levels (3 cols) */}
                    <div className="col-span-3 border-r border-slate-100 pr-4 space-y-3">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Qualification
                      </p>
                      <div className="space-y-1">
                        {levels.map((lvl) => (
                          <button
                            key={lvl.name}
                            type="button"
                            onClick={() => {
                              setStudyingOpen(false);
                              void navigate({ to: "/syllabus-notes" });
                            }}
                            className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs font-semibold transition-colors ${
                              lvl.active
                                ? "bg-blue-50 text-blue-700"
                                : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                            }`}
                          >
                            <span>{lvl.name}</span>
                            <span className="text-[10px] text-slate-400">{lvl.badge}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Col 2: Popular Subjects (5 cols) */}
                    <div className="col-span-5 border-r border-slate-100 pr-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Subjects
                        </p>
                        <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          IGCSE
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {popularSubjects.map((sub) => (
                          <button
                            key={sub.code}
                            type="button"
                            onClick={() => {
                              setStudyingOpen(false);
                              void navigate({
                                to: "/syllabus-notes",
                                search: { subject: sub.name.toLowerCase() },
                              });
                            }}
                            className="w-full flex items-center justify-between p-2 rounded-xl text-left hover:bg-slate-50 transition-colors group cursor-pointer"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                  {sub.name}
                                </span>
                                <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded">
                                  {sub.code}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 mt-0.5">{sub.desc}</p>
                            </div>
                            <ChevronRight className="size-3.5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Col 3: Exam Boards (4 cols) */}
                    <div className="col-span-4 space-y-3">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Exam Boards
                      </p>
                      <div className="space-y-2">
                        {examBoards.map((b) => (
                          <button
                            key={b.name}
                            type="button"
                            onClick={() => {
                              setStudyingOpen(false);
                              void navigate({
                                to: "/syllabus-notes",
                                search: { subject: "biology", view: "boards" },
                              });
                            }}
                            className="w-full p-2.5 rounded-xl border border-slate-100 hover:border-slate-300 bg-slate-50/50 hover:bg-white text-left transition-all cursor-pointer group"
                          >
                            <span className="block text-xs font-bold text-slate-900 group-hover:text-blue-600">
                              {b.name}
                            </span>
                            <span className="text-[10px] text-slate-500 mt-0.5 block">
                              {b.count}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Mega Menu Footer */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                      Need another subject or curriculum?
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setStudyingOpen(false);
                        void navigate({ to: "/syllabus-notes" });
                      }}
                      className="font-bold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <span>Explore all courses &amp; notes</span>
                      <ArrowRight className="size-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Study tools Dropdown */}
            <div className="relative" ref={toolsRef}>
              <button
                type="button"
                onClick={() => {
                  setToolsOpen(!toolsOpen);
                  setStudyingOpen(false);
                }}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                  toolsOpen ? "bg-slate-100 text-slate-950" : "hover:text-slate-950 hover:bg-slate-50"
                }`}
              >
                <span>Study tools</span>
                <ChevronDown
                  className={`size-3.5 text-slate-400 transition-transform duration-200 ${
                    toolsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Study Tools Dropdown Window */}
              {toolsOpen && (
                <div className="absolute left-0 top-full mt-2 w-[380px] rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-1">
                  {studyTools.map((tool) => (
                    <button
                      key={tool.title}
                      type="button"
                      onClick={() => {
                        setToolsOpen(false);
                        void navigate({ to: tool.to });
                      }}
                      className="w-full flex items-start gap-3 p-2.5 rounded-xl text-left hover:bg-slate-50 transition-colors group cursor-pointer"
                    >
                      <div className="size-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <tool.icon className="size-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {tool.title}
                          </span>
                          {tool.badge && (
                            <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                              {tool.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug mt-0.5 line-clamp-1">
                          {tool.desc}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Center: Search Bar with Autocomplete Dropdown */}
        <div className="flex-1 max-w-md hidden sm:block relative" ref={searchRef}>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setSearchOpen(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchOpen(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSearchOpen(false);
                  void navigate({ to: "/syllabus-notes", search: { subject: "biology" } });
                }
              }}
              placeholder="Search for a subject"
              className="w-full rounded-full border border-slate-200 bg-slate-50/70 py-2 pl-4 pr-10 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
            />
            <Search className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-blue-600 pointer-events-none" />
          </div>

          {/* Search Dropdown Results */}
          {searchOpen && (
            <div className="absolute left-0 top-full mt-2 w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl z-50 animate-in fade-in duration-100">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 pb-1.5">
                Suggested Subjects
              </p>
              <div className="space-y-1">
                {filteredSearchSubjects.slice(0, 4).map((sub) => (
                  <button
                    key={sub.code}
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      void navigate({
                        to: "/syllabus-notes",
                        search: { subject: sub.name.toLowerCase() },
                      });
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl text-left hover:bg-slate-50 text-xs font-semibold text-slate-800 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-blue-600" />
                      <span>{sub.name}</span>
                      <span className="text-[10px] text-slate-400">({sub.code})</span>
                    </div>
                    <span className="text-[10px] text-blue-600 font-bold">Open Notes →</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Dashboard Link, Upgrade Pill, User Profile Dropdown */}
        <div className="flex items-center gap-4 shrink-0">
          <Link
            to="/home"
            className="hidden sm:inline-block text-xs font-semibold text-slate-700 hover:text-slate-950 transition-colors"
          >
            Dashboard
          </Link>

          <button
            type="button"
            onClick={() => setPaywallOpen(true)}
            className="rounded-full bg-[#f43f5e] hover:bg-[#e11d48] text-white px-4 py-2 text-xs font-bold transition-all shadow-xs hover:shadow-sm cursor-pointer"
          >
            Try 7 days free
          </button>

          {/* User Profile Avatar with Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setProfileOpen(!profileOpen)}
              className="size-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer ring-2 ring-transparent hover:ring-slate-300"
              aria-label="User menu"
            >
              {userInitial}
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 border-b border-slate-100 mb-1">
                  <p className="text-xs font-bold text-slate-900 truncate">{userName}</p>
                  <p className="text-[11px] text-slate-400 truncate">{profile.email || "student@examglow.com"}</p>
                </div>

                <div className="space-y-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      void navigate({ to: "/home" });
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-50 rounded-xl text-left"
                  >
                    <LayoutDashboard className="size-3.5 text-slate-500" />
                    <span>My Dashboard</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      void navigate({ to: "/syllabus-notes" });
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-50 rounded-xl text-left"
                  >
                    <BookOpen className="size-3.5 text-slate-500" />
                    <span>My Courses</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      setPaywallOpen(true);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-amber-700 hover:bg-amber-50 rounded-xl text-left"
                  >
                    <Sparkles className="size-3.5 text-amber-600" />
                    <span>Upgrade Membership</span>
                  </button>
                </div>

                <div className="pt-1 mt-1 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      markLoggedOut();
                      void navigate({ to: "/login" });
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-xl text-left"
                  >
                    <LogOut className="size-3.5" />
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Paywall Modal */}
      {paywallOpen && <PaywallModal onClose={() => setPaywallOpen(false)} />}
    </>
  );
}
