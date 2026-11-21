import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardCheck,
  Layers,
  Calendar,
  Sparkles,
  Tag,
  User,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Timer,
  Play,
  Pause,
  RotateCcw,
  X,
  Gift,
  Share2,
  Copy,
  Check,
} from "lucide-react";

import { readProfile, type OnboardingProfile } from "@/lib/onboarding";
import { markLoggedOut } from "@/lib/auth";
import { sound } from "@/components/arcade/sound-fx";

interface SaveMyExamsSidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function SaveMyExamsSidebar({
  collapsed: controlledCollapsed,
  onToggleCollapse,
}: SaveMyExamsSidebarProps) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const [profile, setProfile] = useState<OnboardingProfile>({});
  const [timerOpen, setTimerOpen] = useState(false);
  const [ambassadorOpen, setAmbassadorOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Revision Timer State (Pomodoro 25 mins)
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    try {
      setProfile(readProfile());
    } catch {}
  }, []);

  const collapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

  const toggle = () => {
    if (onToggleCollapse) {
      onToggleCollapse();
    } else {
      setInternalCollapsed(!internalCollapsed);
    }
  };

  // Timer tick
  useEffect(() => {
    let interval: any = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerActive) {
      setTimerActive(false);
      try {
        sound.correct();
      } catch {}
      alert("🎉 Revision session complete! Take a 5-minute break.");
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const navItems = [
    {
      label: "Dashboard",
      to: "/home",
      icon: LayoutDashboard,
      active: pathname === "/home" || pathname === "/",
    },
    {
      label: "Brand ambassador",
      action: () => setAmbassadorOpen(true),
      icon: Tag,
      active: false,
    },
    {
      label: "Revision Notes",
      to: "/syllabus-notes",
      icon: BookOpen,
      active: pathname.startsWith("/syllabus-notes") || pathname.startsWith("/notes"),
    },
    {
      label: "Topic Questions",
      to: "/test",
      icon: ClipboardCheck,
      active: pathname.startsWith("/test"),
    },
    {
      label: "Flashcards",
      to: "/flashcards",
      icon: Layers,
      active: pathname.startsWith("/flashcards"),
    },
    {
      label: "Study Plan",
      to: "/study-plan",
      icon: Calendar,
      active: pathname.startsWith("/study-plan") || pathname.startsWith("/calendar"),
    },
    {
      label: "DueOtter AI",
      to: "/chat",
      icon: Sparkles,
      active: pathname.startsWith("/chat"),
      badge: "AI",
    },
  ];

  const handleCopyAmbassador = () => {
    try {
      void navigator.clipboard.writeText("https://examglow.com/join?ref=heue-ambassador");
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {}
  };

  return (
    <>
      <aside
        className={`shrink-0 border-r border-slate-200/90 bg-white transition-all duration-200 flex flex-col justify-between py-4 px-3 select-none relative z-20 ${
          collapsed ? "w-[68px]" : "w-56"
        }`}
      >
        {/* Top: Hide Menu Toggle + Main Navigation Links */}
        <div className="space-y-4">
          <button
            type="button"
            onClick={toggle}
            className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-50 w-full transition-colors cursor-pointer"
            title={collapsed ? "Show menu" : "Hide menu"}
          >
            {collapsed ? (
              <PanelLeftOpen className="size-4 shrink-0 mx-auto text-slate-600" />
            ) : (
              <>
                <PanelLeftClose className="size-4 shrink-0 text-slate-600" />
                <span>Hide menu</span>
              </>
            )}
          </button>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const content = (
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    item.active
                      ? "bg-blue-50 text-blue-700 shadow-2xs"
                      : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                  } ${collapsed ? "justify-center px-2" : ""}`}
                >
                  <Icon
                    className={`size-4 shrink-0 ${
                      item.active ? "text-blue-600" : "text-slate-500 group-hover:text-slate-800"
                    }`}
                  />
                  {!collapsed && (
                    <div className="flex-1 flex items-center justify-between min-w-0">
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span className="text-[9px] font-bold text-blue-700 bg-blue-100/80 px-1.5 py-0.2 rounded">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );

              if (item.action) {
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={item.action}
                    className="w-full text-left cursor-pointer"
                    title={collapsed ? item.label : undefined}
                  >
                    {content}
                  </button>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.to!}
                  className="block cursor-pointer"
                  title={collapsed ? item.label : undefined}
                >
                  {content}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom: Profile, Settings, Log out & Floating Timer */}
        <div className="pt-4 border-t border-slate-100 space-y-1">
          <Link
            to="/settings"
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors ${
              collapsed ? "justify-center px-2" : ""
            }`}
            title={collapsed ? "Profile" : undefined}
          >
            <User className="size-4 shrink-0 text-slate-500" />
            {!collapsed && <span>Profile</span>}
          </Link>

          <Link
            to="/settings"
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors ${
              collapsed ? "justify-center px-2" : ""
            }`}
            title={collapsed ? "Settings" : undefined}
          >
            <Settings className="size-4 shrink-0 text-slate-500" />
            {!collapsed && <span>Settings</span>}
          </Link>

          <button
            type="button"
            onClick={() => {
              markLoggedOut();
              void navigate({ to: "/login" });
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-red-600 hover:bg-red-50/60 transition-colors cursor-pointer ${
              collapsed ? "justify-center px-2" : ""
            }`}
            title={collapsed ? "Log out" : undefined}
          >
            <LogOut className="size-4 shrink-0 text-slate-400" />
            {!collapsed && <span>Log out</span>}
          </button>

          {/* Quick Revision Timer Launcher (Matches bottom-left circle in Save My Exams) */}
          <div className="pt-3 flex items-center justify-start">
            <button
              type="button"
              onClick={() => setTimerOpen(true)}
              className="size-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all cursor-pointer group"
              title="Quick Revision Timer"
            >
              <Timer className="size-4 group-hover:scale-110 transition-transform" />
            </button>
            {!collapsed && (
              <span className="text-[11px] font-semibold text-slate-500 ml-2.5">
                {timerActive ? formatTimer(timerSeconds) : "Focus timer"}
              </span>
            )}
          </div>
        </div>
      </aside>

      {/* ── Revision Pomodoro Timer Modal ── */}
      {timerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-2xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 w-full max-w-sm text-center relative">
            <button
              type="button"
              onClick={() => setTimerOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100"
            >
              <X className="size-4" />
            </button>

            <div className="size-14 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-4">
              <Timer className="size-7" />
            </div>

            <h3 className="text-lg font-bold text-slate-900">ExamGlow Study Timer</h3>
            <p className="text-xs text-slate-500 mt-1">
              Focus in 25-minute study intervals to maximize memory retention.
            </p>

            <div className="my-6">
              <span className="text-5xl font-black text-slate-900 tracking-tight font-mono">
                {formatTimer(timerSeconds)}
              </span>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setTimerActive(!timerActive)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white shadow-sm transition-all cursor-pointer ${
                  timerActive
                    ? "bg-amber-600 hover:bg-amber-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {timerActive ? (
                  <>
                    <Pause className="size-4" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="size-4" />
                    <span>Start Revision</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setTimerActive(false);
                  setTimerSeconds(25 * 60);
                }}
                className="p-2.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                title="Reset timer"
              >
                <RotateCcw className="size-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Brand Ambassador Modal ── */}
      {ambassadorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-2xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 w-full max-w-md relative text-center">
            <button
              type="button"
              onClick={() => setAmbassadorOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100"
            >
              <X className="size-4" />
            </button>

            <div className="size-14 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center mb-4">
              <Gift className="size-7" />
            </div>

            <h3 className="text-xl font-bold text-slate-900">ExamGlow Brand Ambassador</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Share ExamGlow with your classmates and study group. For every 2 friends who sign up, get 1 month of ExamGlow Plus completely free!
            </p>

            <div className="my-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Your Exclusive Referral Link
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value="https://examglow.com/join?ref=heue-ambassador"
                  className="w-full text-xs font-mono bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 select-all"
                />
                <button
                  type="button"
                  onClick={handleCopyAmbassador}
                  className="shrink-0 flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  {copiedLink ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  <span>{copiedLink ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setAmbassadorOpen(false)}
              className="w-full py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
