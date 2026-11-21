import { Link, useNavigate } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import {
  ArrowRight,
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
  Target,
  BarChart3,
  CheckSquare,
  Award,
} from "lucide-react";

import { readProfile, type OnboardingProfile } from "@/lib/onboarding";
import { markLoggedOut } from "@/lib/auth";
import { PaywallModal } from "@/components/paywall-modal";

type LevelKey = "IGCSE" | "A Level" | "GCSE" | "Intl A-Level" | "O Level" | "IB";

interface SubjectItem {
  name: string;
  code: string;
  desc: string;
  popular?: boolean;
}

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
  const [activeLevel, setActiveLevel] = useState<LevelKey>("IGCSE");
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

  const qualifications: { id: LevelKey; name: string; tag: string }[] = [
    { id: "IGCSE", name: "IGCSE", tag: "Most Popular" },
    { id: "A Level", name: "A Level", tag: "AS / A2" },
    { id: "GCSE", name: "GCSE", tag: "UK" },
    { id: "Intl A-Level", name: "Intl A-Level", tag: "CIE / Edexcel" },
    { id: "O Level", name: "O Level", tag: "Intl" },
    { id: "IB", name: "IB Diploma", tag: "HL / SL" },
  ];

  const subjectsByLevel: Record<LevelKey, SubjectItem[]> = {
    IGCSE: [
      { name: "Biology", code: "0610 / 0970", desc: "120 Revision Chapters · CIE, Edexcel, AQA", popular: true },
      { name: "Chemistry", code: "0620 / 0971", desc: "Atomic structure, stoichiometry, organic" },
      { name: "Physics", code: "0625 / 0972", desc: "Forces, electricity, thermal, waves" },
      { name: "Mathematics", code: "0580 / 0980", desc: "Core & Extended syllabus with worked steps" },
      { name: "Economics", code: "0455", desc: "Microeconomics, market failure, trade" },
      { name: "Computer Science", code: "0478", desc: "Algorithms, Python, logic gates" },
      { name: "Business Studies", code: "0450", desc: "Marketing, operations, human resources" },
    ],
    "A Level": [
      { name: "Biology", code: "9700", desc: "Cell structure, genetics, energy & respiration", popular: true },
      { name: "Chemistry", code: "9701", desc: "Physical, organic, transition elements" },
      { name: "Physics", code: "9702", desc: "Fields, circular motion, astrophysics" },
      { name: "Mathematics", code: "9709", desc: "Pure Maths P1/P3, Mechanics, Statistics" },
      { name: "Economics", code: "9708", desc: "Macroeconomic policies, global economics" },
      { name: "Psychology", code: "9990", desc: "Biological, cognitive, clinical psychology" },
    ],
    GCSE: [
      { name: "Combined Science", code: "8464", desc: "Trilogy & Synergy specs for AQA / Edexcel", popular: true },
      { name: "Biology", code: "8461", desc: "Cell biology, infection, homeostasis, ecology" },
      { name: "Chemistry", code: "8462", desc: "Atomic structure, quantitative chemistry" },
      { name: "Physics", code: "8463", desc: "Energy, electricity, particle model" },
      { name: "Mathematics", code: "1MA1", desc: "Higher & Foundation calculator/non-calc" },
    ],
    "Intl A-Level": [
      { name: "Biology", code: "9700 / WBI1", desc: "International AS & A2 specifications", popular: true },
      { name: "Chemistry", code: "9701 / WCH1", desc: "Inorganic, organic, spectroscopy" },
      { name: "Physics", code: "9702 / WPH1", desc: "Waves, modern physics, nuclear decay" },
      { name: "Mathematics", code: "9709 / WMA1", desc: "Pure 1-4, Mechanics, Statistics" },
    ],
    "O Level": [
      { name: "Biology", code: "5090", desc: "Principles of biology and animal physiology", popular: true },
      { name: "Chemistry", code: "5070", desc: "Chemical reactions, metals, air & water" },
      { name: "Physics", code: "5054", desc: "General physics, waves, light, magnetism" },
      { name: "Mathematics", code: "4024", desc: "Syllabus D problem solving and geometry" },
    ],
    IB: [
      { name: "Biology HL / SL", code: "IB DP", desc: "Molecular biology, genetics, physiology", popular: true },
      { name: "Chemistry HL / SL", code: "IB DP", desc: "Energetics, periodicity, chemical bonding" },
      { name: "Physics HL / SL", code: "IB DP", desc: "Thermal physics, quantum, nuclear" },
      { name: "Maths AA & AI", code: "IB DP", desc: "Analysis & Approaches, Applications" },
    ],
  };

  const examBoards = [
    { name: "Cambridge (CIE)", spec: "0610 / 9700", count: "120 Chapters" },
    { name: "Edexcel International", spec: "4BI1 / WBI1", count: "Complete Spec" },
    { name: "AQA Curriculum", spec: "8461 / 7402", count: "Higher / Core" },
    { name: "OCR / Eduqas", spec: "H420 / H020", count: "Exam Aligned" },
  ];

  // 10 core Save My Exams Study Tools
  const studyTools = [
    {
      title: "Revision Notes",
      desc: "Concise, teacher-written summaries with worked examples and molecular illustrations",
      icon: BookOpen,
      to: "/syllabus-notes",
      badge: "Popular",
    },
    {
      title: "Topic Questions",
      desc: "Topic-by-topic exam questions with official mark schemes and worked steps",
      icon: ClipboardCheck,
      to: "/test",
      badge: "Essential",
    },
    {
      title: "Smart Mark (AI)",
      desc: "Instant AI grading against real mark scheme criteria with personal improvement tips",
      icon: CheckSquare,
      to: "/chat",
      badge: "AI Powered",
    },
    {
      title: "Strengths & Weaknesses",
      desc: "Diagnostic tracker showing which topics you have mastered and where to focus next",
      icon: BarChart3,
      to: "/home",
    },
    {
      title: "Flashcards",
      desc: "Spaced-repetition active recall decks for key definitions, terms and formulas",
      icon: Layers,
      to: "/flashcards",
    },
    {
      title: "Mock Exams",
      desc: "Timed full-length exam simulations with complete model solutions and grade boundaries",
      icon: FileText,
      to: "/test",
    },
    {
      title: "Study Planner",
      desc: "Personalized day-by-day revision schedule built around your exact exam timetable",
      icon: Calendar,
      to: "/study-plan",
    },
    {
      title: "DueOtter AI Tutor",
      desc: "24/7 syllabus helper for instant concept explanations, hints and worked solutions",
      icon: Sparkles,
      to: "/chat",
      badge: "24/7",
    },
    {
      title: "Past Papers Archive",
      desc: "Comprehensive collection of official question papers, mark schemes, and examiner reports",
      icon: Award,
      to: "/test",
    },
    {
      title: "Target Test Builder",
      desc: "Custom practice test builder tailored to your weakest subtopics and question types",
      icon: Target,
      to: "/test",
    },
  ];

  // Search filter across all subjects
  const allSearchItems = Object.entries(subjectsByLevel).flatMap(([lvl, list]) =>
    list.map((sub) => ({ ...sub, level: lvl }))
  );

  const filteredSearchSubjects = allSearchItems.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.level.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeSubjects = subjectsByLevel[activeLevel] || subjectsByLevel.IGCSE;

  return (
    <>
      <header
        className={`h-16 shrink-0 border-b border-slate-200/90 bg-white px-4 sm:px-6 flex items-center justify-between gap-4 z-40 relative font-sans ${className}`}
      >
        {/* Left: Brand Logo & Dropdown Menus */}
        <div className="flex items-center gap-6">
          {showBrand && (
            <Link
              to="/home"
              className="flex items-center gap-1.5 font-extrabold text-xl tracking-tight text-slate-900 group select-none"
            >
              <Zap className="size-6 text-blue-600 fill-blue-600 group-hover:scale-110 transition-transform" />
              <span className="font-extrabold text-[21px] tracking-tight">ExamGlow</span>
            </Link>
          )}

          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-700">
            {/* ── 1. Start studying Mega Dropdown ── */}
            <div className="relative" ref={studyingRef}>
              <button
                type="button"
                onClick={() => {
                  setStudyingOpen(!studyingOpen);
                  setToolsOpen(false);
                }}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                  studyingOpen
                    ? "bg-slate-100 text-slate-950"
                    : "hover:text-slate-950 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <span>Start studying</span>
                <ChevronDown
                  className={`size-3.5 text-slate-400 transition-transform duration-200 ${
                    studyingOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Mega Menu Overlay */}
              {studyingOpen && (
                <div className="absolute left-0 top-full mt-2 w-[760px] rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="grid grid-cols-12 gap-6">
                    {/* Col 1: Qualifications (3 cols) */}
                    <div className="col-span-3 border-r border-slate-100 pr-3 space-y-3">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Qualification
                      </p>
                      <div className="space-y-1">
                        {qualifications.map((q) => (
                          <button
                            key={q.id}
                            type="button"
                            onMouseEnter={() => setActiveLevel(q.id)}
                            onClick={() => setActiveLevel(q.id)}
                            className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer ${
                              activeLevel === q.id
                                ? "bg-blue-50 text-blue-700 shadow-2xs font-bold"
                                : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                            }`}
                          >
                            <span>{q.name}</span>
                            <span
                              className={`text-[9px] px-1.5 py-0.2 rounded font-medium ${
                                activeLevel === q.id
                                  ? "bg-blue-100 text-blue-700 font-bold"
                                  : "text-slate-400"
                              }`}
                            >
                              {q.tag}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Col 2: Subjects for Active Level (5 cols) */}
                    <div className="col-span-5 border-r border-slate-100 pr-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          {activeLevel} Subjects
                        </p>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          {activeSubjects.length} Available
                        </span>
                      </div>
                      <div className="space-y-1 max-h-[340px] overflow-y-auto pr-1">
                        {activeSubjects.map((sub) => (
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
                            <div className="min-w-0 flex-1 pr-2">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                  {sub.name}
                                </span>
                                <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded">
                                  {sub.code}
                                </span>
                                {sub.popular && (
                                  <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded">
                                    ★ Top
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500 mt-0.5 truncate">{sub.desc}</p>
                            </div>
                            <ChevronRight className="size-3.5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Col 3: Exam Boards & Fast-Track Links (4 cols) */}
                    <div className="col-span-4 space-y-3">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Exam Boards
                      </p>
                      <div className="space-y-1.5">
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
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600">
                                {b.name}
                              </span>
                              <span className="text-[10px] text-slate-400">{b.spec}</span>
                            </div>
                            <span className="text-[10px] text-slate-500 mt-0.5 block">
                              {b.count}
                            </span>
                          </button>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-slate-100">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                          Quick Study Tools
                        </p>
                        <div className="grid grid-cols-2 gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setStudyingOpen(false);
                              void navigate({ to: "/syllabus-notes" });
                            }}
                            className="p-1.5 rounded-lg text-left text-[11px] font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <BookOpen className="size-3 text-blue-600" />
                            <span>Notes</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setStudyingOpen(false);
                              void navigate({ to: "/test" });
                            }}
                            className="p-1.5 rounded-lg text-left text-[11px] font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <ClipboardCheck className="size-3 text-blue-600" />
                            <span>Questions</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setStudyingOpen(false);
                              void navigate({ to: "/flashcards" });
                            }}
                            className="p-1.5 rounded-lg text-left text-[11px] font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <Layers className="size-3 text-blue-600" />
                            <span>Flashcards</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setStudyingOpen(false);
                              void navigate({ to: "/study-plan" });
                            }}
                            className="p-1.5 rounded-lg text-left text-[11px] font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <Calendar className="size-3 text-blue-600" />
                            <span>Study Plan</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mega Menu Footer */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                      Looking for custom curriculum or past exam series?
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setStudyingOpen(false);
                        void navigate({ to: "/syllabus-notes" });
                      }}
                      className="font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore all courses &amp; notes</span>
                      <ArrowRight className="size-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ── 2. Study tools Mega Dropdown ── */}
            <div className="relative" ref={toolsRef}>
              <button
                type="button"
                onClick={() => {
                  setToolsOpen(!toolsOpen);
                  setStudyingOpen(false);
                }}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                  toolsOpen
                    ? "bg-slate-100 text-slate-950"
                    : "hover:text-slate-950 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <span>Study tools</span>
                <ChevronDown
                  className={`size-3.5 text-slate-400 transition-transform duration-200 ${
                    toolsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Study Tools Grid Window (2 columns matching Save My Exams) */}
              {toolsOpen && (
                <div className="absolute left-0 top-full mt-2 w-[540px] rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      All Study Tools &amp; Revision Aids
                    </p>
                    <span className="text-[10px] font-bold text-blue-600">
                      Exam Board Aligned
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {studyTools.map((tool) => (
                      <button
                        key={tool.title}
                        type="button"
                        onClick={() => {
                          setToolsOpen(false);
                          void navigate({ to: tool.to });
                        }}
                        className="flex items-start gap-3 p-2.5 rounded-xl text-left hover:bg-slate-50 transition-colors group cursor-pointer"
                      >
                        <div className="size-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <tool.icon className="size-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                              {tool.title}
                            </span>
                            {tool.badge && (
                              <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200 shrink-0">
                                {tool.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 leading-snug mt-0.5 line-clamp-2">
                            {tool.desc}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500">
                      Need help choosing your revision path?
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setToolsOpen(false);
                        void navigate({ to: "/study-plan" });
                      }}
                      className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Create personalized plan</span>
                      <ArrowRight className="size-3" />
                    </button>
                  </div>
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
            <div className="absolute left-0 top-full mt-2 w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl z-50 animate-in fade-in duration-100 max-h-72 overflow-y-auto">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 pb-1.5">
                Suggested Subjects &amp; Courses
              </p>
              <div className="space-y-1">
                {filteredSearchSubjects.slice(0, 5).map((sub) => (
                  <button
                    key={`${sub.level}-${sub.code}`}
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      void navigate({
                        to: "/syllabus-notes",
                        search: { subject: sub.name.toLowerCase() },
                      });
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl text-left hover:bg-slate-50 text-xs font-semibold text-slate-800 cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-blue-600" />
                      <span className="group-hover:text-blue-600 font-bold">{sub.name}</span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {sub.level} · {sub.code}
                      </span>
                    </div>
                    <span className="text-[10px] text-blue-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      Open Notes →
                    </span>
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
            className="hidden sm:inline-block text-xs font-bold text-slate-700 hover:text-slate-950 transition-colors"
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
                  <p className="text-[11px] text-slate-400 truncate">
                    {profile.email || "student@examglow.com"}
                  </p>
                </div>

                <div className="space-y-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      void navigate({ to: "/home" });
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-50 rounded-xl text-left cursor-pointer"
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
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-50 rounded-xl text-left cursor-pointer"
                  >
                    <BookOpen className="size-3.5 text-slate-500" />
                    <span>My Courses</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      void navigate({ to: "/settings" });
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-50 rounded-xl text-left cursor-pointer"
                  >
                    <Settings className="size-3.5 text-slate-500" />
                    <span>Settings</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      setPaywallOpen(true);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-amber-700 hover:bg-amber-50 rounded-xl text-left cursor-pointer"
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
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-xl text-left cursor-pointer"
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
