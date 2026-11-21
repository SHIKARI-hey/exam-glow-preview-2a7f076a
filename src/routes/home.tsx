import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileText,
  MessageCircle,
  Plus,
} from "lucide-react";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { ProfileAvatar } from "@/components/dashboard-page";
import {
  readProfile,
  type OnboardingProfile,
} from "@/lib/onboarding";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Study dashboard | ExamGlow" },
      {
        name: "description",
        content:
          "Plan your studies, review your progress and prepare for every exam in one focused ExamGlow workspace.",
      },
      { property: "og:title", content: "Study dashboard | ExamGlow" },
      {
        property: "og:description",
        content: "Your focused workspace for notes, assignments, quizzes and exam preparation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const quickActions = [
  { title: "Ask the tutor", meta: "Instant explanations & quiz", to: "/chat", Icon: MessageCircle },
  { title: "Quizzes & Tests", meta: "Topical practice & mocks", to: "/test", Icon: ClipboardCheck },
  { title: "My Notes", meta: "Write & edit rich notes", to: "/notes", Icon: FileText },
  { title: "Syllabus Notes", meta: "Full syllabus chapters", to: "/syllabus-notes", Icon: BookOpen },
] as const;

type StudyTask = {
  id: string;
  title: string;
  time: string;
  done: boolean;
};

const TASKS_KEY = "examglow.home_study_tasks";

export function HomePage() {
  const [profile, setProfile] = useState<OnboardingProfile>({});
  const [tasks, setTasks] = useState<StudyTask[]>([]);
  const [newTask, setNewTask] = useState("");
  const [notesCount, setNotesCount] = useState(0);

  useEffect(() => {
    setProfile(readProfile());

    try {
      const savedTasks = window.localStorage.getItem(TASKS_KEY);
      if (savedTasks) setTasks(JSON.parse(savedTasks));

      const rawNotes = window.localStorage.getItem("examglow.student_notes");
      if (rawNotes) {
        const list = JSON.parse(rawNotes);
        if (Array.isArray(list)) setNotesCount(list.length);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const toggleTask = (id: string) => {
    setTasks((prev) => {
      const next = prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
      try {
        window.localStorage.setItem(TASKS_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const addTask = () => {
    const title = newTask.trim();
    if (!title) return;
    setTasks((prev) => {
      const next = [
        ...prev,
        { id: crypto.randomUUID(), title, time: "15 min", done: false },
      ];
      try {
        window.localStorage.setItem(TASKS_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
    setNewTask("");
  };

  const firstName = profile.name?.split(" ")[0] ?? "there";
  const completedTasks = tasks.filter((t) => t.done).length;

  // Real dynamic date
  const todayFormatted = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  // Dynamic next upcoming deadline day
  const nextTargetDay = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
    weekday: "long",
  });

  const focusTitle = profile.goal
    ? `${profile.goal} Focused Revision`
    : "IGCSE Curriculum Review";

  return (
    <div className="flex h-dvh overflow-hidden app-frame">
      <DashboardSidebar />
      <main className="app-panel font-apple min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1080px] px-5 pb-24 pt-20 md:px-10 md:pt-10">
          <header className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">{todayFormatted}</p>
            <ProfileAvatar className="shrink-0" />
          </header>

          <section className="mt-16 text-center md:mt-20">
            <p className="text-sm font-semibold text-muted-foreground">{focusTitle}</p>
            <h1 className="font-apple mx-auto mt-3 max-w-3xl text-[clamp(2.6rem,6.5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
              Good to see you, {firstName}.
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-[clamp(1.05rem,1.6vw,1.3rem)] leading-relaxed text-muted-foreground">
              Every chapter, note and AI tutor session. All in one place.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              <Link
                to="/syllabus-notes"
                className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-6 py-3 text-[15px] font-medium text-background transition-opacity hover:opacity-85"
              >
                Continue learning
              </Link>
              <Link to="/notes" className="inline-flex items-center gap-1 text-[15px] font-medium text-foreground hover:underline underline-offset-4">
                Open my notes <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </section>

          <section className="mt-20 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatCard value="All" label="Syllabus open" />
            <StatCard value={notesCount.toString()} label="Personal notes" />
            <StatCard value={profile.streakDays ? `${profile.streakDays}d` : "On"} label="Study streak" />
            <StatCard value="∞" label="AI tutor" />
          </section>

          <section className="mt-20">
            <h2 className="font-apple text-[clamp(1.6rem,2.6vw,2rem)] font-semibold tracking-[-0.025em]">Get started.</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {quickActions.map(({ title, meta, to, Icon }) => (
                <Link key={title} to={to} className="apple-tile apple-tile-hover group flex items-center gap-5 p-6">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-background">
                    <Icon className="size-5 text-foreground" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[17px] font-semibold tracking-tight">{title}</span>
                    <span className="mt-0.5 block truncate text-sm text-muted-foreground">{meta}</span>
                  </span>
                  <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" aria-hidden />
                </Link>
              ))}
            </div>
          </section>

          <div className="mt-20 grid gap-3 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,1fr)]">
            <section className="apple-tile p-7 md:p-8">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-apple text-2xl font-semibold tracking-[-0.02em]">Today’s goals</h2>
                {tasks.length > 0 && (
                  <span className="text-sm text-muted-foreground">{completedTasks} of {tasks.length}</span>
                )}
              </div>
              {tasks.length > 0 && (
                <div className="mt-4 h-1 overflow-hidden rounded-full bg-background">
                  <div className="h-full rounded-full bg-foreground transition-all duration-500" style={{ width: `${(completedTasks / tasks.length) * 100}%` }} />
                </div>
              )}
              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-background px-4 py-3">
                <Plus className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTask()}
                  placeholder="Add a study goal"
                  className="min-w-0 flex-1 bg-transparent text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <button type="button" onClick={addTask} disabled={!newTask.trim()} className="shrink-0 text-sm font-medium text-foreground transition-opacity hover:opacity-60 disabled:opacity-30">
                  Add
                </button>
              </div>
              {tasks.length === 0 ? (
                <p className="mt-5 text-sm text-muted-foreground">No goals yet. Add one to start tracking today.</p>
              ) : (
                <div className="mt-3">
                  {tasks.map((task) => (
                    <button
                      key={task.id}
                      type="button"
                      onClick={() => toggleTask(task.id)}
                      className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 border-b border-border/60 py-3.5 text-left last:border-0"
                    >
                      {task.done ? (
                        <CheckCircle2 className="size-5 shrink-0 text-foreground" />
                      ) : (
                        <span className="size-5 shrink-0 rounded-full border-[1.5px] border-muted-foreground/40" />
                      )}
                      <span className={`min-w-0 truncate text-[15px] ${task.done ? "text-muted-foreground line-through" : "text-foreground"}`}>{task.title}</span>
                      <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock3 className="size-3.5" />
                        {task.time}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </section>

            <section className="apple-tile flex flex-col p-7 md:p-8">
              <p className="text-sm font-medium text-muted-foreground">Next checkpoint · {nextTargetDay}</p>
              <h2 className="font-apple mt-2 text-2xl font-semibold leading-snug tracking-[-0.02em]">
                {profile.goal ? `${profile.goal} Mock Assessment` : "IGCSE Mock Test"}
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                Practise past questions and review your formula flashcards.
              </p>
              <div className="mt-auto flex flex-col gap-2 pt-8">
                <Link to="/test" className="inline-flex items-center gap-1 text-[15px] font-medium text-foreground hover:underline underline-offset-4">
                  Open quizzes &amp; tests <ArrowRight className="size-4" />
                </Link>
                <Link to="/calendar" className="inline-flex items-center gap-1 text-[15px] font-medium text-muted-foreground hover:text-foreground">
                  Revision calendar <ArrowRight className="size-4" />
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="apple-tile flex flex-col items-center justify-center px-4 py-8 text-center">
      <strong className="font-apple block text-[clamp(2rem,3.4vw,2.6rem)] font-semibold leading-none tracking-[-0.03em]">{value}</strong>
      <span className="mt-2 text-sm text-muted-foreground">{label}</span>
    </div>
  );
}
