import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  GraduationCap,
  HelpCircle,
  Layers,
  Sparkles,
} from "lucide-react";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { STUDY_ARTICLES } from "@/lib/articles-data";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Study Dashboard | ExamGlow" },
      {
        name: "description",
        content: "Track your IGCSE revision progress, read teacher-written chapter notes, and practice exam questions.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-dvh overflow-hidden app-frame">
      <DashboardSidebar />

      <main className="app-panel min-w-0 flex-1 overflow-y-auto bg-[#F0F2E4]">
        <div className="mx-auto max-w-[1180px] p-5 sm:p-7 lg:p-8 font-sans">
          {/* Welcome Header */}
          <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D8E0D2]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#CBD5C6] bg-white/80 px-3 py-0.5 text-xs font-semibold text-[#173128] shadow-2xs mb-2">
                <span className="size-2 rounded-full bg-[#233831]" />
                <span>IGCSE Curriculum · 2026/27 Syllabus Aligned</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-normal font-display tracking-tight text-[#0D170C]">
                Welcome back to <span className="italic font-display font-medium text-[#173128]">ExamGlow</span>
              </h1>
              <p className="mt-1 text-sm text-[#465A4D]">
                Continue your syllabus revision, test your recall, and prepare for your upcoming exams.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/syllabus-notes"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#233831] text-white px-5 py-2.5 text-xs sm:text-sm font-semibold hover:bg-[#2C443C] transition-all cursor-pointer shadow-xs"
              >
                <span>Go to Courses</span>
                <ChevronRight className="size-4" />
              </Link>
            </div>
          </header>

          {/* Primary In-Progress Hero Banner: IGCSE Biology */}
          <div className="mb-8 rounded-3xl border border-[#D8E0D2] bg-white p-6 sm:p-8 shadow-xs relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] font-bold text-[#173128] bg-[#E2EBDE] px-2.5 py-0.5 rounded-full border border-[#CBD5C6]">
                    Active Subject: 0610 / 0970
                  </span>
                  <span className="text-[11px] font-semibold text-[#233831] bg-[#F0F2E4] px-2.5 py-0.5 rounded-full">
                    120 Chapters
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D170C] tracking-tight">
                  IGCSE Biology Revision Notes
                </h2>
                <p className="mt-2 text-sm text-[#465A4D] leading-relaxed">
                  Chapter 1.1: Biological Molecules — Monomers, condensation reactions, carbohydrates, and molecular structures.
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => void navigate({ to: "/syllabus-notes", search: { subject: "biology", chapter: 1 } })}
                    className="inline-flex items-center gap-3 rounded-full bg-[#233831] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-[#2C443C] transition-all cursor-pointer"
                  >
                    <span>Continue Reading Chapter 1</span>
                    <span className="size-5 rounded-full bg-white/20 flex items-center justify-center">
                      <ArrowRight className="size-3 text-white" />
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => void navigate({ to: "/syllabus-notes", search: { subject: "biology", view: "topics" } })}
                    className="inline-flex items-center gap-2 rounded-full border border-[#CBD5C6] bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#173128] hover:bg-[#F0F2E4] transition-all cursor-pointer shadow-2xs"
                  >
                    <span>Browse All 120 Chapters</span>
                  </button>
                </div>
              </div>

              {/* Progress Summary Pill Card */}
              <div className="rounded-2xl border border-[#D8E0D2] bg-[#F7F8F4] p-5 shrink-0 w-full lg:w-72 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-[#173128]">
                  <span>Syllabus Mastery</span>
                  <span className="font-bold text-[#233831]">CIE / Edexcel</span>
                </div>
                <div className="h-2 w-full rounded-full bg-[#E2EBDE] overflow-hidden">
                  <div className="h-full bg-[#233831] rounded-full w-1/4" />
                </div>
                <div className="pt-2 border-t border-[#D8E0D2] flex items-center justify-between text-[11px] text-[#5B6E62]">
                  <span>Ready for 2026/27</span>
                  <span className="font-bold text-[#173128]">Exam Spec Aligned</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Study Resources Grid */}
          <div className="mb-10">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#D8E0D2]">
              <h3 className="text-lg font-bold text-[#0D170C]">Biology Revision Resources</h3>
              <Link to="/syllabus-notes" className="text-xs font-semibold text-[#173128] hover:underline">
                View all courses →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                type="button"
                onClick={() => void navigate({ to: "/syllabus-notes", search: { subject: "biology", view: "boards" } })}
                className="group p-5 rounded-2xl border border-[#D8E0D2] bg-white hover:border-[#233831] hover:shadow-xs transition-all text-left flex flex-col justify-between h-40 cursor-pointer"
              >
                <div className="size-9 rounded-xl bg-[#E2EBDE] text-[#233831] flex items-center justify-center shadow-xs border border-[#CBD5C6]">
                  <BookOpen className="size-4.5" />
                </div>
                <div>
                  <p className="text-xs text-[#5B6E62] font-medium">120 Detailed Chapters</p>
                  <div className="flex items-center justify-between gap-1 mt-0.5">
                    <h4 className="font-bold text-sm text-[#0D170C]">Revision Notes</h4>
                    <ChevronRight className="size-4 text-[#233831] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => void navigate({ to: "/test" })}
                className="group p-5 rounded-2xl border border-[#D8E0D2] bg-white hover:border-[#233831] hover:shadow-xs transition-all text-left flex flex-col justify-between h-40 cursor-pointer"
              >
                <div className="size-9 rounded-xl bg-[#E2EBDE] text-[#233831] flex items-center justify-center shadow-xs border border-[#CBD5C6]">
                  <HelpCircle className="size-4.5" />
                </div>
                <div>
                  <p className="text-xs text-[#5B6E62] font-medium">Past Paper Format</p>
                  <div className="flex items-center justify-between gap-1 mt-0.5">
                    <h4 className="font-bold text-sm text-[#0D170C]">Exam Questions</h4>
                    <ChevronRight className="size-4 text-[#233831] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => void navigate({ to: "/syllabus-notes", search: { subject: "biology", chapter: 1 } })}
                className="group p-5 rounded-2xl border border-[#D8E0D2] bg-white hover:border-[#233831] hover:shadow-xs transition-all text-left flex flex-col justify-between h-40 cursor-pointer"
              >
                <div className="size-9 rounded-xl bg-[#E2EBDE] text-[#233831] flex items-center justify-center shadow-xs border border-[#CBD5C6]">
                  <Layers className="size-4.5" />
                </div>
                <div>
                  <p className="text-xs text-[#5B6E62] font-medium">Active Recall</p>
                  <div className="flex items-center justify-between gap-1 mt-0.5">
                    <h4 className="font-bold text-sm text-[#0D170C]">Flashcards</h4>
                    <ChevronRight className="size-4 text-[#233831] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => void navigate({ to: "/test" })}
                className="group p-5 rounded-2xl border border-[#D8E0D2] bg-white hover:border-[#233831] hover:shadow-xs transition-all text-left flex flex-col justify-between h-40 cursor-pointer"
              >
                <div className="size-9 rounded-xl bg-[#E2EBDE] text-[#233831] flex items-center justify-center shadow-xs border border-[#CBD5C6]">
                  <FileText className="size-4.5" />
                </div>
                <div>
                  <p className="text-xs text-[#5B6E62] font-medium">Timed Assessments</p>
                  <div className="flex items-center justify-between gap-1 mt-0.5">
                    <h4 className="font-bold text-sm text-[#0D170C]">Mock Exams</h4>
                    <ChevronRight className="size-4 text-[#233831] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Student Resource Articles & Guides */}
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#D8E0D2]">
              <h3 className="text-lg font-bold text-[#0D170C]">Latest Revision Guides &amp; Timetables</h3>
              <span className="text-xs font-semibold text-[#5B6E62] bg-[#E2EBDE] border border-[#CBD5C6] px-3 py-0.5 rounded-full">
                Updated for 2026/27
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {STUDY_ARTICLES.slice(0, 3).map((article) => (
                <button
                  key={article.id}
                  type="button"
                  onClick={() =>
                    void navigate({
                      to: "/syllabus-notes",
                      search: { subject: "biology", view: "article", article: article.id },
                    })
                  }
                  className="group rounded-2xl border border-[#D8E0D2] bg-white p-4 shadow-2xs hover:border-[#233831] hover:shadow-sm transition-all text-left cursor-pointer flex flex-col gap-3"
                >
                  <div className="w-full h-24 rounded-xl bg-gradient-to-br from-[#E2EBDE] to-[#D5DEC9] flex flex-col justify-between p-3 shrink-0 border border-[#CBD5C6]">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#173128] bg-white/70 w-fit px-1.5 py-0.5 rounded">
                      {article.category}
                    </span>
                    <span className="text-xs font-extrabold text-[#0D170C] leading-tight line-clamp-2">
                      {article.title}
                    </span>
                  </div>

                  <div className="flex-1 space-y-1">
                    <h4 className="font-bold text-sm text-[#0D170C] leading-snug line-clamp-2">
                      {article.title}
                    </h4>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] font-medium text-[#5B6E62]">
                        {article.readTime} read
                      </span>
                      <span className="text-[11px] font-semibold text-[#173128] group-hover:text-[#233831] transition-colors">
                        Read →
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
