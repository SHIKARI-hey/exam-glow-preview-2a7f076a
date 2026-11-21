import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  BookOpen,
  CalendarDays,
  ChevronDown,
  ChevronsUpDown,
  MoreVertical,
  Check,
  FileText,
  ClipboardCheck,
  Home,
  Menu,
  MessageCircle,
  Mic,
  NotebookTabs,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  X,
} from "lucide-react";

import logoMark from "@/assets/logo-mark.png";
import { readProfile } from "@/lib/onboarding";

const primaryItems = [
  { label: "Home", to: "/home", Icon: Home },
  { label: "Notes", to: "/notes", Icon: FileText },
  { label: "Calendar", to: "/calendar", Icon: CalendarDays },
] as const;

const studyItems = [
  { label: "Study Plan", to: "/study-plan", Icon: BookOpen },
  { label: "Chat", to: "/chat", Icon: MessageCircle },
  { label: "Record Lecture", to: "/record-lecture", Icon: Mic },
] as const;

const practiceItems = [
  { label: "Quizzes & Tests", to: "/test", Icon: ClipboardCheck },
  { label: "Flashcards", to: "/flashcards", Icon: NotebookTabs },
  { label: "Assignments", to: "/assignments", Icon: FileText },
] as const;


const courseItems = [
  { label: "Syllabus Notes", to: "/syllabus-notes", Icon: NotebookTabs },
] as const;

type NavItem = (typeof primaryItems)[number] | (typeof studyItems)[number] | (typeof practiceItems)[number] | (typeof courseItems)[number];

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [practiceOpen, setPracticeOpen] = useState(() => {
    if (typeof window === "undefined") return true;
    const saved = localStorage.getItem("sidebar.practiceOpen");
    return saved === null ? true : saved === "true";
  });
  const [user, setUser] = useState<{ name: string; email: string }>({ name: "Student", email: "" });
  useEffect(() => {
    try {
      const p = readProfile();
      setUser({ name: p.name || "Student", email: p.email || "" });
    } catch {}
  }, []);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  // Persist practiceOpen to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("sidebar.practiceOpen", String(practiceOpen));
    } catch {}
  }, [practiceOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const navItem = ({ label, to, Icon }: NavItem, inset = false, mobile = false) => {
    const active = pathname === to;
    const showLabels = mobile || !collapsed;
    return (
      <Link
        key={label}
        to={to}
        title={!showLabels ? label : undefined}
        onClick={() => setMobileOpen(false)}
        className={`group flex h-[33px] items-center gap-3 rounded-lg px-2.5 text-[14px] transition-colors ${
          inset && showLabels ? "pl-2.5" : ""
        } ${active ? "bg-sidebar-active font-medium text-sidebar-foreground shadow-[0_1px_2px_oklch(0_0_0/0.08)]" : "text-sidebar-foreground/85 hover:bg-sidebar-hover hover:text-sidebar-foreground"}`}
      >
        <Icon className="size-[17px] shrink-0" strokeWidth={1.65} aria-hidden />
        {showLabels && <span className="truncate">{label}</span>}
      </Link>
    );
  };

  const sectionLabel = (label: string, show: boolean) =>
    show ? (
      <p className="px-2 pb-1.5 pt-2 text-[11px] font-medium uppercase tracking-[0.06em] text-sidebar-muted">{label}</p>
    ) : (
      <div className="mx-auto my-2 h-px w-6 bg-sidebar-border" />
    );

  const renderSidebar = (mobile = false) => {
    const showLabels = mobile || !collapsed;
    return (
    <aside
      className={`flex h-dvh shrink-0 flex-col overflow-hidden bg-sidebar text-sidebar-foreground ${
        mobile ? "w-full" : `transition-[width] duration-300 ${collapsed ? "w-[68px]" : "w-[244px]"}`
      }`}
    >
      <div className="px-4 pt-4">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
          <Link to="/home" className="flex min-w-0 items-center gap-2.5">
            <span className="flex size-[34px] shrink-0 items-center justify-center rounded-lg bg-sidebar-accent p-1">
              <img src={logoMark} alt="ExamGlow logo" width={26} height={26} className="size-[26px] rounded-md" />
            </span>
            {showLabels && (
              <span className="min-w-0 leading-tight">
                <span className="block truncate text-[15px] font-semibold">ExamGlow ™</span>
              </span>
            )}
          </Link>
          {mobile ? (
            <button type="button" onClick={() => setMobileOpen(false)} className="flex size-8 items-center justify-center rounded-lg text-sidebar-muted hover:bg-sidebar-hover" aria-label="Close navigation">
              <X className="size-5" />
            </button>
          ) : (
            <button type="button" onClick={() => setCollapsed((v) => !v)} className="hidden size-7 items-center justify-center rounded-md text-sidebar-muted transition-colors hover:bg-sidebar-hover hover:text-sidebar-foreground md:flex" aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} title={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
              {collapsed ? <PanelLeftOpen className="size-4" /> : <ChevronsUpDown className="size-4" />}
            </button>
          )}
        </div>
        {showLabels && (
          <div className="mt-4 flex h-[31px] items-center gap-2 rounded-lg bg-sidebar-hover px-2.5 text-sidebar-muted">
            <Search className="size-4" aria-hidden />
            <span className="flex-1 text-[14px]">Search</span>
            <kbd className="text-[12px] font-sans">⌘F</kbd>
          </div>
        )}
      </div>

      <div className="scrollbar-none min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-4 pt-3">
        <nav className="space-y-0.5" aria-label="Main navigation">
          {sectionLabel("Main menu", showLabels)}
          {primaryItems.map((item) => navItem(item, false, mobile))}
        </nav>
        <nav className="mt-3 space-y-0.5" aria-label="Study navigation">
          {sectionLabel("Study", showLabels)}
          {studyItems.map((item) => navItem(item, false, mobile))}
        </nav>
        <div className="mt-3">
          <button type="button" onClick={() => setPracticeOpen((v) => !v)} className="flex w-full items-center justify-between px-2 pb-1.5 pt-2 text-left">
            {showLabels ? (
              <>
                <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-sidebar-muted">Practice</span>
                <ChevronDown className={`size-3.5 text-sidebar-muted transition-transform duration-200 ${practiceOpen ? "" : "-rotate-90"}`} aria-hidden />
              </>
            ) : (
              <span className="mx-auto h-px w-6 bg-sidebar-border" />
            )}
          </button>
          {(!showLabels || practiceOpen) && (
            <nav className="space-y-0.5" aria-label="Practice and activities">
              {practiceItems.map((item) => navItem(item, true, mobile))}
            </nav>
          )}
        </div>
        <nav className="mt-3 space-y-0.5" aria-label="Course navigation">
          {sectionLabel("Course", showLabels)}
          {courseItems.map((item) => navItem(item, false, mobile))}
        </nav>
      </div>

      <div className="mx-4 border-t border-sidebar-border py-3">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-1">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-[13px] font-semibold text-sidebar-accent-foreground">
              {user.name.charAt(0).toUpperCase()}
            </span>
            {showLabels && (
              <span className="min-w-0 leading-tight">
                <span className="block truncate text-[13px] font-semibold uppercase">{user.name}</span>
                {user.email && <span className="block truncate text-[11px] text-sidebar-muted">{user.email}</span>}
              </span>
            )}
          </div>
          {showLabels && (
            <Link to="/settings" className="flex size-6 items-center justify-center rounded text-sidebar-muted hover:bg-sidebar-hover" aria-label="Account settings">
              <MoreVertical className="size-4" />
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed left-3 top-3 z-40 flex size-9 items-center justify-center rounded-xl border border-border/60 bg-background/90 text-foreground shadow-sm backdrop-blur md:hidden"
        aria-label="Open navigation"
      >
        <Menu className="size-4" />
      </button>
      <div className="hidden md:block">{renderSidebar()}</div>
      <div
        className={`fixed inset-0 z-50 md:hidden ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!mobileOpen}
      >
        <div
          className={`absolute inset-0 bg-overlay transition-opacity duration-300 motion-reduce:transition-none ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
        <div
          className={`absolute inset-0 transition-transform duration-300 ease-out motion-reduce:transition-none ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          {renderSidebar(true)}
        </div>
      </div>
    </>
  );
}