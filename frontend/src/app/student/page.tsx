'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { api, getUser } from '@/lib/api';
import { SpaceBackground } from '@/components/SpaceBackground';
import { FormattedContent } from '@/components/KatexMath';

const Wonderland3D = dynamic(
  () => import('@/components/3d/Wonderland3D').then((mod) => mod.Wonderland3D),
  { ssr: false }
);
import {
  Rocket,
  Clock,
  Sparkles,
  BookOpen,
  Calendar,
  Flame,
  Star,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileText,
  Target,
  Layers,
  Volume2,
  Quote,
  Award,
  CheckCircle2,
} from 'lucide-react';

function formatAssignmentDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    const day = String(d.getUTCDate()).padStart(2, '0');
    const month = String(d.getUTCMonth() + 1).padStart(2, '0');
    const year = d.getUTCFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return dateStr;
  }
}

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [todayAssignment, setTodayAssignment] = useState<any>(null);
  const [allAssignments, setAllAssignments] = useState<any[]>([]);
  const [expandedAssignmentId, setExpandedAssignmentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeLectureAssignment, setActiveLectureAssignment] = useState<any>(null);
  const [lectureViewMode, setLectureViewMode] = useState<'interactive' | 'briefing'>('interactive');

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser || currentUser.role !== 'STUDENT') {
      router.push('/login');
      return;
    }
    setUser(currentUser);

    const loadData = async () => {
      try {
        const [today, all] = await Promise.all([
          api.getTodayStudent().catch(() => null),
          api.getAllStudent().catch(() => []),
        ]);
        setTodayAssignment(today);

        // Ghép danh sách bài tập đầy đủ
        let list: any[] = Array.isArray(all) ? all : [];
        if (today && !list.some((a) => a.id === today.id)) {
          list = [today, ...list];
        }
        setAllAssignments(list);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [router]);

  const toggleExpand = (assignmentId: string) => {
    setExpandedAssignmentId((prev) => (prev === assignmentId ? null : assignmentId));
  };

  const handleOpenLecture = async (assignment: any, mode: 'interactive' | 'briefing' = 'interactive') => {
    if (assignment && !assignment.lecture_viewed_at) {
      await api.markLectureViewed(assignment.id).catch(() => {});
      setAllAssignments((prev) =>
        prev.map((a) => (a.id === assignment.id ? { ...a, lecture_viewed_at: new Date() } : a)),
      );
      if (todayAssignment?.id === assignment.id) {
        setTodayAssignment({ ...todayAssignment, lecture_viewed_at: new Date() });
      }
    }

    setLectureViewMode(mode);

    const appMatch = assignment?.learning_units?.lecture_content_markdown?.match(/\/lectures\/[a-zA-Z0-9_\-\/]+\.html/);
    const interactiveUrl = appMatch ? appMatch[0] : (
      assignment?.learning_units?.title?.toLowerCase().includes('ôn tập thi giữa kì') ||
      assignment?.learning_units?.lecture_content_markdown?.includes('/lectures/eng11-midterm')
        ? '/lectures/eng11-midterm/index.html'
        : null
    );

    if (mode === 'interactive' && interactiveUrl) {
      window.open(interactiveUrl, '_blank');
      return;
    }

    setActiveLectureAssignment(assignment);
  };

  const isCosmic =
    user?.username === 'keithley' ||
    user?.full_name?.includes('Keithley') ||
    user?.fullName?.includes('Keithley');
  const isKids =
    user?.username === 'an_lake' ||
    user?.studentProfile?.grade_level === 1 ||
    user?.student_profiles?.grade_level === 1;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Rocket className="w-10 h-10 text-cyan-400 animate-bounce" />
          <p className="text-cyan-400 font-semibold tracking-wider text-sm">Đang tải không gian học tập...</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // 1. GIAO DIỆN VŨ TRỤ (COSMIC SPACE THEME - KEITHLEY LAKE LỚP 7 & 9)
  // ==========================================
  if (isCosmic) {
    return (
      <SpaceBackground>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Bảng Điều Khiển Vũ Trụ */}
          <div className="relative rounded-3xl p-6 sm:p-8 bg-slate-900/80 border border-cyan-500/30 backdrop-blur-xl shadow-[0_0_30px_rgba(6,182,212,0.15)] mb-8 overflow-hidden">
            <div
              className="absolute right-0 top-0 bottom-0 w-1/3 bg-cover bg-center opacity-20 pointer-events-none"
              style={{ backgroundImage: `url('/images/cosmic/bg_nebula.jpg')` }}
            />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 tracking-widest uppercase mb-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>SPACE COMMAND CONTROL • KEITHLEY LAKE MISSION CONTROL</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center space-x-3">
                  <span>Welcome aboard, Astronaut Keithley Lake!</span>
                  <Rocket className="w-7 h-7 text-cyan-400 hidden sm:inline-block animate-pulse" />
                </h1>
                <p className="text-sm text-slate-300 mt-2 max-w-xl">
                  {todayAssignment?.teacher_daily_note ? (
                    <span className="text-amber-300 italic">
                      "Tutor Note: {todayAssignment.teacher_daily_note}"
                    </span>
                  ) : (
                    'Orbital coordinates and daily flight missions are ready. Click any mission card below to begin!'
                  )}
                </p>
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <div className="px-4 py-3 rounded-2xl bg-slate-800/80 border border-cyan-500/20 text-center">
                  <span className="text-xs text-slate-400 block">Cadet Rank</span>
                  <span className="text-base font-bold text-cyan-400 flex items-center justify-center space-x-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>Grade 7 Math & Chem 9</span>
                  </span>
                </div>
                <div className="px-4 py-3 rounded-2xl bg-slate-800/80 border border-purple-500/20 text-center">
                  <span className="text-xs text-slate-400 block">Flight Streak</span>
                  <span className="text-base font-bold text-purple-400 flex items-center justify-center space-x-1">
                    <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                    <span>5 Days</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* DANH SÁCH BÀI HỌC THEO NGÀY */}
          <div className="mb-12">
            <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 className="text-xl font-bold text-cyan-300 flex items-center space-x-2 tracking-wide">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <span>DAILY MISSIONS & FLIGHT SCHEDULE</span>
              </h2>
              <span className="text-xs text-slate-400">
                Click each flight date to access Briefing, In-Session Practice, and Homework
              </span>
            </div>

            {allAssignments.length > 0 ? (
              <div className="space-y-6">
                {allAssignments.map((assignment: any) => {
                  const isExpanded = expandedAssignmentId === assignment.id;
                  const dateLabel = formatAssignmentDate(assignment.assigned_date);
                  const title = assignment.learning_units?.title || 'Flight Objective';
                  const subjectName = assignment.learning_units?.subjects?.name || 'Subject';
                  const inSessionAttempt = assignment.assessment_attempts?.find(
                    (a: any) => a.assessments?.type === 'IN_SESSION_90M',
                  );
                  const homeworkAttempt = assignment.assessment_attempts?.find(
                    (a: any) => a.assessments?.type === 'HOMEWORK',
                  );
                  const totalAttempts = assignment.assessment_attempts?.length || 0;
                  const gradedCount =
                    assignment.assessment_attempts?.filter((a: any) => a.status === 'GRADED')
                      .length || 0;

                  return (
                    <div
                      key={assignment.id}
                      className={`rounded-3xl border transition-all duration-300 backdrop-blur-xl overflow-hidden ${
                        isExpanded
                          ? 'bg-slate-900/95 border-cyan-400 shadow-[0_0_35px_rgba(6,182,212,0.25)] ring-1 ring-cyan-500/40'
                          : 'bg-slate-900/80 border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                      }`}
                    >
                      {/* CARD HEADER GHI NGÀY VÀ TÊN BÀI GIẢNG */}
                      <button
                        onClick={() => toggleExpand(assignment.id)}
                        className="w-full p-6 text-left flex flex-col md:flex-row md:items-center justify-between gap-4 transition hover:bg-slate-800/40"
                      >
                        <div className="flex min-w-0 items-start space-x-4">
                          <div
                            className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center transition-transform ${
                              isExpanded
                                ? 'bg-gradient-to-tr from-cyan-500 to-purple-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)] scale-105'
                                : 'bg-slate-800 border border-cyan-500/30 text-cyan-400'
                            }`}
                          >
                            <Calendar className="w-6 h-6" />
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                                {isCosmic
                                  ? (assignment.learning_units?.subjects?.code === 'CHEM_9'
                                      ? 'Chemistry 9'
                                      : assignment.learning_units?.subjects?.code === 'MATH_7'
                                      ? 'Grade 7 Math'
                                      : subjectName)
                                  : subjectName}
                              </span>
                              {assignment.assigned_date && (
                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300">
                                  Flight Date: {dateLabel}
                                </span>
                              )}
                              {totalAttempts > 0 ? (
                                <span className="text-xs text-slate-400">
                                  Progress: {gradedCount}/{totalAttempts} completed
                                </span>
                              ) : (
                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                                  3D Virtual Lab & Theory
                                </span>
                              )}
                            </div>

                            {/* Format rõ ràng */}
                            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight break-words">
                              <span>{title}</span>
                            </h3>

                            {assignment.teacher_daily_note && (
                              <p className="text-xs text-amber-300/90 mt-1.5 italic line-clamp-1">
                                💬 Note: "{assignment.teacher_daily_note}"
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Nút Toggle mở/đóng */}
                        <div className="flex items-center space-x-3 self-end md:self-center">
                          <div
                            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition ${
                              isExpanded
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                                : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
                            }`}
                          >
                            <span>{isExpanded ? 'Active Sector' : 'Open Mission'}</span>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-cyan-400" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-slate-400" />
                            )}
                          </div>
                        </div>
                      </button>

                      {/* NỘI DUNG CHI TIẾT KHI NHẤN VÀO CARD */}
                      {isExpanded && (() => {
                        const appMatch = assignment.learning_units?.lecture_content_markdown?.match(/\/lectures\/[a-zA-Z0-9_\-\/]+\.html/);
                        const interactiveUrl = appMatch ? appMatch[0] : null;
                        const hasInteractive = !!interactiveUrl;
                        const hasExercises = !!inSessionAttempt || !!homeworkAttempt;

                        return (
                          <div className="p-6 pt-2 border-t border-slate-800/80 bg-slate-950/40">
                            {/* Thông báo nếu buổi học là thuần lý thuyết (Lecture Only) */}
                            {!hasExercises && (
                              <div className="mt-4 px-4 py-3 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-200 text-xs flex flex-wrap items-center justify-between gap-2 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                                <span className="font-semibold flex items-center space-x-2">
                                  <span>🚀</span>
                                  <span>Core Theory &amp; Virtual Lab Simulation</span>
                                </span>
                                <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-cyan-900 text-cyan-300 border border-cyan-500/50">
                                  Lab &amp; Theory
                                </span>
                              </div>
                            )}

                            <div className={`grid grid-cols-1 ${hasExercises ? 'lg:grid-cols-3' : 'lg:grid-cols-1'} gap-6 mt-4`}>
                              {/* 1. KHỐI BÀI GIẢNG */}
                              <div className={`rounded-2xl p-6 bg-slate-900/90 border border-cyan-500/30 flex flex-col justify-between shadow-lg ${
                                !hasExercises ? 'lg:col-span-1 ring-1 ring-cyan-500/20' : ''
                              }`}>
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center space-x-1.5">
                                      <BookOpen className="w-3.5 h-3.5" />
                                      <span>{hasInteractive ? 'Station 1: 3D Virtual Lab' : 'Station 1: Core Briefing'}</span>
                                    </span>
                                    <div className="flex items-center space-x-2">
                                      {hasInteractive && interactiveUrl && (
                                        <a
                                          href={interactiveUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-xs text-cyan-400 hover:text-cyan-200 font-semibold flex items-center space-x-1 px-2 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-500/30 transition"
                                          title="Open Full Screen in New Tab"
                                        >
                                          <span>Full Screen</span>
                                          <ExternalLink className="w-3 h-3" />
                                        </a>
                                      )}
                                      <span
                                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                                          assignment.lecture_viewed_at
                                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                                            : 'bg-amber-950 text-amber-400 border border-amber-500/30'
                                        }`}
                                      >
                                        {assignment.lecture_viewed_at ? '✓ Reviewed' : 'Pending'}
                                      </span>
                                    </div>
                                  </div>

                                  <h4 className="text-base font-bold text-white mt-2 leading-snug">
                                    {assignment.learning_units?.title}
                                  </h4>
                                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                                    {assignment.learning_units?.description ||
                                      'Review geometric properties and computational formulas.'}
                                  </p>
                                </div>

                                <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap gap-3">
                                  {hasInteractive ? (
                                    <>
                                      <button
                                        onClick={() => {
                                          handleOpenLecture(assignment, 'interactive');
                                        }}
                                        className="flex-1 min-w-[180px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-sm font-semibold flex items-center justify-center space-x-2 transition shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                                      >
                                        <Sparkles className="w-4 h-4 text-cyan-200" />
                                        <span>Launch Virtual Lab</span>
                                      </button>
                                      <button
                                        onClick={() => {
                                          handleOpenLecture(assignment, 'briefing');
                                        }}
                                        className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-cyan-500/40 text-cyan-300 text-sm font-semibold flex items-center justify-center space-x-2 transition shadow"
                                      >
                                        <BookOpen className="w-4 h-4 text-cyan-400" />
                                        <span>Core Briefing</span>
                                      </button>
                                    </>
                                  ) : (
                                    <button
                                      onClick={() => handleOpenLecture(assignment, 'briefing')}
                                      className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-cyan-500/40 text-cyan-300 text-sm font-semibold flex items-center justify-center space-x-2 transition shadow"
                                    >
                                      <BookOpen className="w-4 h-4 text-cyan-400" />
                                      <span>
                                        {assignment.lecture_viewed_at
                                          ? 'Core Briefing'
                                          : 'Read Core Briefing'}
                                      </span>
                                    </button>
                                  )}
                                </div>
                              </div>

                              {/* 2. KHỐI BÀI TẬP TẠI LỚP (90 PHÚT) */}
                              {hasExercises && (
                                inSessionAttempt ? (
                                  <div
                                    className={`rounded-2xl p-6 flex flex-col justify-between border backdrop-blur-xl transition duration-300 ${
                                      inSessionAttempt.status === 'GRADED'
                                        ? 'bg-slate-900/90 border-emerald-500/40 shadow-[0_0_20px_rgba(168,85,247,0.15)]'
                                        : inSessionAttempt.status === 'SUBMITTED'
                                        ? 'bg-slate-900/90 border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                                        : 'bg-slate-900/90 border-cyan-500/40 hover:border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.1)]'
                                    }`}
                                  >
                                    <div>
                                      <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30 flex items-center space-x-1.5">
                                          <Clock className="w-3.5 h-3.5" />
                                          <span>Station 2: In-Session Practice</span>
                                        </span>
                                        <span
                                          className={`text-[11px] font-semibold ${
                                            inSessionAttempt.status === 'GRADED'
                                              ? 'text-emerald-400'
                                              : inSessionAttempt.status === 'SUBMITTED'
                                              ? 'text-amber-400'
                                              : inSessionAttempt.status === 'IN_PROGRESS'
                                              ? 'text-cyan-400'
                                              : 'text-slate-400'
                                          }`}
                                        >
                                          {inSessionAttempt.status === 'GRADED'
                                            ? 'Graded & Reviewed'
                                            : inSessionAttempt.status === 'SUBMITTED'
                                            ? 'Submitted (Pending Review)'
                                            : inSessionAttempt.status === 'IN_PROGRESS'
                                            ? 'In Progress'
                                            : 'Not Started'}
                                        </span>
                                      </div>

                                      <h4 className="text-base font-bold text-white leading-tight">
                                        {inSessionAttempt.assessments?.title || 'In-Session Assessment'}
                                      </h4>

                                      <div className="mt-4 flex items-center space-x-4 text-xs text-slate-400">
                                        <div className="flex items-center space-x-1">
                                          <Clock className="w-3.5 h-3.5 text-cyan-400" />
                                          <span>
                                            {inSessionAttempt.assessments?.time_limit_minutes || 90} mins
                                          </span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                          <Star className="w-3.5 h-3.5 text-amber-400" />
                                          <span>Max Score: {inSessionAttempt.assessments?.max_score || 10}</span>
                                        </div>
                                      </div>

                                      {inSessionAttempt.status === 'SUBMITTED' && (
                                        <div className="mt-4 p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs">
                                          <p className="font-bold text-sm">
                                            Completed: {inSessionAttempt._count?.student_answers ?? inSessionAttempt.student_answers?.length ?? 0} / {inSessionAttempt.assessments?._count?.questions ?? inSessionAttempt.assessments?.questions?.length ?? 0} problems
                                          </p>
                                          <p className="mt-1 text-[11px] text-amber-200/80">
                                            Telemetry transmitted • Pending flight review from Command
                                          </p>
                                        </div>
                                      )}

                                      {inSessionAttempt.status === 'GRADED' && (
                                        <div className="mt-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs">
                                          <div className="flex items-center justify-between">
                                            <p className="font-bold text-sm">
                                              Score: {inSessionAttempt.total_score} / {inSessionAttempt.assessments?.max_score}
                                            </p>
                                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300">
                                              {inSessionAttempt._count?.student_answers ?? inSessionAttempt.student_answers?.length ?? 0} / {inSessionAttempt.assessments?._count?.questions ?? inSessionAttempt.assessments?.questions?.length ?? 0} completed
                                            </span>
                                          </div>
                                          {inSessionAttempt.overall_feedback && (
                                            <p className="mt-1.5 italic opacity-90">
                                              Tutor Flight Log: "{inSessionAttempt.overall_feedback}"
                                            </p>
                                          )}
                                        </div>
                                      )}
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-slate-800">
                                      {inSessionAttempt.status === 'GRADED' ? (
                                        <Link
                                          href={`/student/results/${inSessionAttempt.id}`}
                                          className="w-full py-2.5 px-4 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/40 border border-emerald-500/50 text-emerald-300 text-sm font-semibold flex items-center justify-center space-x-2 transition"
                                        >
                                          <span>View Detailed Graded Review</span>
                                          <ExternalLink className="w-4 h-4" />
                                        </Link>
                                      ) : inSessionAttempt.status === 'SUBMITTED' ? (
                                        <Link
                                          href={`/student/results/${inSessionAttempt.id}`}
                                          className="w-full py-2.5 px-4 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/40 text-amber-300 text-sm font-semibold flex items-center justify-center space-x-2 transition"
                                        >
                                          <span>View Submission Debrief ({inSessionAttempt._count?.student_answers ?? inSessionAttempt.student_answers?.length ?? 0}/{inSessionAttempt.assessments?._count?.questions ?? 0} solved)</span>
                                          <ExternalLink className="w-4 h-4" />
                                        </Link>
                                      ) : (
                                        <Link
                                          href={`/student/mission/${inSessionAttempt.id}`}
                                          className="w-full py-2.5 px-4 rounded-xl text-white text-sm font-semibold flex items-center justify-center space-x-2 transition shadow-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                                        >
                                          <span>
                                            {inSessionAttempt.status === 'IN_PROGRESS'
                                              ? 'Resume In-Session Flight'
                                              : 'Launch In-Session Mission (90-120m)'}
                                          </span>
                                          <ArrowRight className="w-4 h-4" />
                                        </Link>
                                      )}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="rounded-2xl p-6 bg-slate-900/60 border border-slate-800 flex items-center justify-center text-center text-xs text-slate-500">
                                    No in-session mission for this date
                                  </div>
                                )
                              )}

                              {/* 3. KHỐI BÀI TẬP VỀ NHÀ */}
                              {hasExercises && (
                                homeworkAttempt ? (
                                  <div
                                    className={`rounded-2xl p-6 flex flex-col justify-between border backdrop-blur-xl transition duration-300 ${
                                      homeworkAttempt.status === 'GRADED'
                                        ? 'bg-slate-900/90 border-emerald-500/40 shadow-[0_0_20px_rgba(168,85,247,0.15)]'
                                        : homeworkAttempt.status === 'SUBMITTED'
                                        ? 'bg-slate-900/90 border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                                        : 'bg-slate-900/90 border-purple-500/40 hover:border-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.1)]'
                                    }`}
                                  >
                                    <div>
                                      <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-950 text-purple-400 border border-purple-500/30 flex items-center space-x-1.5">
                                          <FileText className="w-3.5 h-3.5" />
                                          <span>Station 3: Orbital Homework</span>
                                        </span>
                                        <span
                                          className={`text-[11px] font-semibold ${
                                            homeworkAttempt.status === 'GRADED'
                                              ? 'text-emerald-400'
                                              : homeworkAttempt.status === 'SUBMITTED'
                                              ? 'text-amber-400'
                                              : homeworkAttempt.status === 'IN_PROGRESS'
                                              ? 'text-purple-400'
                                              : 'text-slate-400'
                                          }`}
                                        >
                                          {homeworkAttempt.status === 'GRADED'
                                            ? 'Graded & Reviewed'
                                            : homeworkAttempt.status === 'SUBMITTED'
                                            ? 'Submitted (Pending Review)'
                                            : homeworkAttempt.status === 'IN_PROGRESS'
                                            ? 'In Progress'
                                            : 'Not Started'}
                                        </span>
                                      </div>

                                      <h4 className="text-base font-bold text-white leading-tight">
                                        {homeworkAttempt.assessments?.title || 'Orbital Homework'}
                                      </h4>

                                      <div className="mt-4 flex items-center space-x-4 text-xs text-slate-400">
                                        <div className="flex items-center space-x-1">
                                          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                                          <span>Self-paced orbital consolidation</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                          <Star className="w-3.5 h-3.5 text-amber-400" />
                                          <span>Max Score: {homeworkAttempt.assessments?.max_score || 10}</span>
                                        </div>
                                      </div>

                                      {homeworkAttempt.status === 'SUBMITTED' && (
                                        <div className="mt-4 p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs">
                                          <p className="font-bold text-sm">
                                            Completed: {homeworkAttempt._count?.student_answers ?? homeworkAttempt.student_answers?.length ?? 0} / {homeworkAttempt.assessments?._count?.questions ?? homeworkAttempt.assessments?.questions?.length ?? 0} problems
                                          </p>
                                          <p className="mt-1 text-[11px] text-amber-200/80">
                                            Telemetry transmitted • Pending flight review from Command
                                          </p>
                                        </div>
                                      )}

                                      {homeworkAttempt.status === 'GRADED' && (
                                        <div className="mt-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs">
                                          <div className="flex items-center justify-between">
                                            <p className="font-bold text-sm">
                                              Score: {homeworkAttempt.total_score} / {homeworkAttempt.assessments?.max_score}
                                            </p>
                                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300">
                                              {homeworkAttempt._count?.student_answers ?? homeworkAttempt.student_answers?.length ?? 0} / {homeworkAttempt.assessments?._count?.questions ?? homeworkAttempt.assessments?.questions?.length ?? 0} completed
                                            </span>
                                          </div>
                                          {homeworkAttempt.overall_feedback && (
                                            <p className="mt-1.5 italic opacity-90">
                                              Tutor Flight Log: "{homeworkAttempt.overall_feedback}"
                                            </p>
                                          )}
                                        </div>
                                      )}
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-slate-800">
                                      {homeworkAttempt.status === 'GRADED' ? (
                                        <Link
                                          href={`/student/results/${homeworkAttempt.id}`}
                                          className="w-full py-2.5 px-4 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/40 border border-emerald-500/50 text-emerald-300 text-sm font-semibold flex items-center justify-center space-x-2 transition"
                                        >
                                          <span>View Graded Homework</span>
                                          <ExternalLink className="w-4 h-4" />
                                        </Link>
                                      ) : homeworkAttempt.status === 'SUBMITTED' ? (
                                        <Link
                                          href={`/student/results/${homeworkAttempt.id}`}
                                          className="w-full py-2.5 px-4 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/40 text-amber-300 text-sm font-semibold flex items-center justify-center space-x-2 transition"
                                        >
                                          <span>View Homework Debrief ({homeworkAttempt._count?.student_answers ?? homeworkAttempt.student_answers?.length ?? 0}/{homeworkAttempt.assessments?._count?.questions ?? 0} solved)</span>
                                          <ExternalLink className="w-4 h-4" />
                                        </Link>
                                      ) : (
                                        <Link
                                          href={`/student/mission/${homeworkAttempt.id}`}
                                          className="w-full py-2.5 px-4 rounded-xl text-white text-sm font-semibold flex items-center justify-center space-x-2 transition shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                                        >
                                          <span>
                                            {homeworkAttempt.status === 'IN_PROGRESS'
                                              ? 'Resume Homework'
                                              : 'Launch Orbital Homework'}
                                          </span>
                                          <ArrowRight className="w-4 h-4" />
                                        </Link>
                                      )}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="rounded-2xl p-6 bg-slate-900/60 border border-slate-800 flex items-center justify-center text-center text-xs text-slate-500">
                                    No orbital homework assigned for this date
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-3xl p-8 bg-slate-900/60 border border-slate-800 text-center">
                <Rocket className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-300">No missions currently assigned</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Tutor Thức will schedule your next celestial flight missions soon!
                </p>
              </div>
            )}
          </div>

          {/* Modal Xem Lý Thuyết Bài Giảng KaTeX */}
          {activeLectureAssignment && (() => {
            const appMatch = activeLectureAssignment.learning_units?.lecture_content_markdown?.match(/\/lectures\/[a-zA-Z0-9_\-\/]+\.html/);
            const interactiveUrl = appMatch ? appMatch[0] : (
              activeLectureAssignment.learning_units?.title?.toLowerCase().includes('ôn tập thi giữa kì') ||
              activeLectureAssignment.learning_units?.lecture_content_markdown?.includes('/lectures/eng11-midterm')
                ? '/lectures/eng11-midterm/index.html'
                : null
            );
            const hasInteractive = !!interactiveUrl;
            const showInteractive = hasInteractive && lectureViewMode === 'interactive';

            return (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4">
                <div
                  className={`w-full ${
                    hasInteractive ? 'max-w-6xl h-[92vh] max-h-[92vh]' : 'max-w-3xl max-h-[85vh]'
                  } bg-slate-900 border border-cyan-500/40 rounded-3xl p-4 sm:p-8 flex flex-col overflow-hidden shadow-2xl transition-all`}
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 flex-shrink-0 flex-wrap gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                          {isCosmic
                            ? (hasInteractive ? 'ORBITAL LIVE STUDIO & TELEMETRY' : 'FLIGHT BRIEFING STATION')
                            : (hasInteractive ? 'PHÒNG HỌC TƯƠNG TÁC' : 'Nạp Nhiên Liệu Tri Thức')} •{' '}
                          {formatAssignmentDate(activeLectureAssignment.assigned_date)}
                        </span>
                        {hasInteractive && (
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/50">
                            Live Studio
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-white mt-1">
                        {activeLectureAssignment.learning_units?.title}
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      {/* Tab Switcher for Interactive Studio vs KaTeX Notes */}
                      {hasInteractive && (
                        <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-slate-800/90 border border-slate-700">
                          <button
                            onClick={() => setLectureViewMode('interactive')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                              lectureViewMode === 'interactive'
                                ? 'bg-cyan-500 text-slate-950 shadow-md'
                                : 'text-slate-300 hover:text-white'
                            }`}
                          >
                            <span>🔬 Interactive Lab</span>
                          </button>
                          <button
                            onClick={() => setLectureViewMode('briefing')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                              lectureViewMode === 'briefing'
                                ? 'bg-cyan-500 text-slate-950 shadow-md'
                                : 'text-slate-300 hover:text-white'
                            }`}
                          >
                            <span>📖 Flight Briefing (KaTeX)</span>
                          </button>
                        </div>
                      )}

                      {hasInteractive && interactiveUrl && (
                        <a
                          href={interactiveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/80 text-cyan-300 hover:bg-cyan-900 text-xs font-bold border border-cyan-500/40 transition"
                        >
                          <span>{isCosmic ? 'Full Screen' : 'Toàn Màn Hình'}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <button
                        onClick={() => setActiveLectureAssignment(null)}
                        className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  {showInteractive && interactiveUrl ? (
                    <div className="flex-1 w-full h-full min-h-0 py-3">
                      <iframe
                        src={interactiveUrl}
                        className="w-full h-full border border-slate-700 rounded-2xl shadow-inner bg-slate-900"
                        title={isCosmic ? 'Interactive Live Studio' : 'Bài Giảng Tương Tác'}
                      />
                    </div>
                  ) : (
                    <div className="flex-1 overflow-y-auto py-6 pr-2">
                      <FormattedContent
                        text={activeLectureAssignment.learning_units?.lecture_content_markdown || ''}
                        className="text-slate-200 text-sm leading-relaxed"
                      />

                      {/* Sơ đồ đính kèm */}
                      {activeLectureAssignment.learning_units?.lecture_attachments?.map((att: any, idx: number) => (
                        <div key={idx} className="mt-6 p-4 rounded-2xl bg-slate-800/80 border border-cyan-500/20">
                          <p className="text-xs font-semibold text-cyan-300 mb-2">
                            {isCosmic ? '📌 Concept Mind Map / Schematics:' : '📌 Sơ đồ tư duy / Tài liệu học tập:'}
                          </p>
                          <img
                            src={att.url}
                            alt={att.name || (isCosmic ? 'Study Resource' : 'Tài liệu')}
                            className="max-h-72 w-auto mx-auto rounded-xl shadow-md border border-slate-700 object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="border-t border-slate-800 pt-4 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between flex-shrink-0">
                    <div className="text-xs text-slate-400">
                      {hasInteractive ? (
                        <span className="hidden sm:inline">
                          {isCosmic
                            ? '💡 Switch between the Interactive Lab Simulation and the deep space Flight Briefing notes above.'
                            : '🚀 Live Studio tự động chấm điểm phản xạ, phát hiện bẫy ngữ pháp và hỗ trợ phát âm bản xứ.'}
                        </span>
                      ) : null}
                    </div>
                    <button
                      onClick={() => setActiveLectureAssignment(null)}
                      className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-sm font-semibold rounded-xl transition shadow"
                    >
                      {isCosmic ? 'Briefing Acknowledged, Telemetry Logged!' : 'Đã Hiểu Bài, Sẵn Sàng Làm Bài!'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </SpaceBackground>
    );
  }

  // ==========================================
  // 2. GIAO DIỆN BÉ AN (TOÁN LỚP 1 - KIDS WONDERLAND)
  // ==========================================
  if (isKids) {
    return (
      <div className="min-h-screen bg-amber-50 text-slate-900 py-10 px-4 relative overflow-hidden">
        {/* Three.js Wonderland 3D Interactive Mascot & Magical Sparkles */}
        <Wonderland3D />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Banner Công Chúa & Rồng Xanh */}
          <div className="rounded-3xl p-6 bg-pink-100 border-2 border-pink-300 shadow-xl flex flex-col sm:flex-row items-center gap-6 mb-8">
            <img
              src="/images/kids/princess_math.png"
              alt="Toán lớp 1"
              className="w-32 h-32 object-cover rounded-2xl shadow-md border-2 border-pink-400"
            />
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-pink-700 font-serif">
                Chào bạn An Lake! 👑
              </h1>
              <p className="text-sm text-pink-900 mt-2 font-medium">
                Chào mừng bạn đến với Vương Quốc Toán Học Lớp 1. Bạn hãy bấm vào từng ngày bên dưới để xem bài học và đố vui nhé!
              </p>
            </div>
          </div>

          {/* DANH SÁCH BÀI HỌC THEO NGÀY CỦA AN LAKE */}
          <h2 className="text-xl font-extrabold text-pink-800 mb-4 flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-pink-600" />
            <span>⭐ Lịch Học Và Bài Tập Theo Ngày Của An Lake:</span>
          </h2>

          {allAssignments.length > 0 ? (
            <div className="space-y-5">
              {allAssignments.map((assignment: any) => {
                const isExpanded = expandedAssignmentId === assignment.id;
                const dateLabel = formatAssignmentDate(assignment.assigned_date);
                const title = assignment.learning_units?.title || 'Bài học của An Lake';
                const hasLecture = Boolean(
                  assignment.learning_units?.lecture_content_markdown &&
                  assignment.learning_units.lecture_content_markdown.trim() !== ''
                );
                const attempts = assignment.assessment_attempts || [];
                const firstAttempt = attempts[0];

                return (
                  <div
                    key={assignment.id}
                    className={`rounded-3xl border-2 transition duration-300 overflow-hidden bg-white ${
                      isExpanded ? 'border-pink-500 shadow-xl ring-2 ring-pink-300' : 'border-pink-200 hover:border-pink-400 shadow-md'
                    }`}
                  >
                    {/* Card Header ghi ngày */}
                    <div className="w-full p-6 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-pink-50/50 transition">
                      <div
                        onClick={() => toggleExpand(assignment.id)}
                        className="cursor-pointer flex-1"
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-xs font-extrabold px-3 py-0.5 rounded-full bg-pink-500 text-white">
                            Ngày {dateLabel}
                          </span>
                          <span className="text-xs font-bold text-pink-700">Toán Lớp 1</span>
                          {!hasLecture && (
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                              Chuyên đề bài tập
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg sm:text-xl font-extrabold text-slate-800">
                          {dateLabel} : {title}
                        </h3>
                        {assignment.teacher_daily_note && (
                          <p className="text-xs text-pink-600 mt-1 font-semibold italic">
                            💌 Thầy Thức dặn dò: "{assignment.teacher_daily_note}"
                          </p>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 self-end sm:self-center">
                        {firstAttempt && (
                          <Link
                            href={`/student/mission/${firstAttempt.id}`}
                            className="px-4 py-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-extrabold text-xs sm:text-sm shadow-[0_3px_0_#be185d] active:translate-y-0.5 transition flex items-center space-x-1.5"
                          >
                            <span>Làm Bài Tập Ngay 🚀</span>
                          </Link>
                        )}
                        <button
                          onClick={() => toggleExpand(assignment.id)}
                          className="text-xs font-bold text-pink-600 bg-pink-100 hover:bg-pink-200 px-3 py-2 rounded-2xl flex items-center space-x-1 transition"
                        >
                          <span>{isExpanded ? 'Thu gọn' : hasLecture ? 'Xem bài học & bài tập' : 'Xem bài tập'}</span>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Chi tiết khi mở card: CHỈ HIỂN THỊ BÀI HỌC NẾU CÓ hasLecture */}
                    {isExpanded && (
                      <div className="p-6 pt-2 border-t-2 border-pink-100 bg-pink-50/30">
                        <div className={`grid grid-cols-1 ${hasLecture ? 'md:grid-cols-2' : ''} gap-6 mt-4`}>
                          {/* 1. Bài giảng của An Lake (CHỈ HIỆN KHI CÓ BÀI HỌC) */}
                          {hasLecture && (
                            <div className="p-5 rounded-2xl bg-white border-2 border-pink-200 flex flex-col justify-between">
                              <div>
                                <span className="text-xs font-bold px-2.5 py-1 bg-amber-400 text-amber-950 rounded-full">
                                  📖 Bài Giảng Thần Tiên
                                </span>
                                <h4 className="text-base font-extrabold text-slate-800 mt-3">
                                  {assignment.learning_units?.title}
                                </h4>
                                <p className="text-xs text-slate-600 mt-1">
                                  {assignment.learning_units?.description || 'Bé xem ví dụ và hình vẽ phép tính nhé!'}
                                </p>
                              </div>
                              <button
                                onClick={() => handleOpenLecture(assignment)}
                                className="mt-6 w-full py-2.5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-extrabold text-sm rounded-xl transition shadow"
                              >
                                Đọc Bài Giảng Của An Lake 🎈
                              </button>
                            </div>
                          )}

                          {/* 2. Danh sách bài tập */}
                          {attempts.map((att: any) => {
                            const answeredCount = att._count?.student_answers ?? att.student_answers?.length ?? 0;
                            const totalQuestions = att.assessments?._count?.questions ?? att.assessments?.questions?.length ?? 0;

                            return (
                              <div
                                key={att.id}
                                className={`p-6 rounded-3xl bg-white border-2 border-pink-200 flex flex-col justify-between shadow-sm ${
                                  !hasLecture ? 'max-w-2xl mx-auto w-full' : ''
                                }`}
                              >
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold px-3 py-1 bg-pink-500 text-white rounded-full">
                                      {att.assessments?.title || 'Bài tập'}
                                    </span>
                                    <span className="text-xs font-extrabold text-pink-700 bg-pink-100 px-2.5 py-1 rounded-full">
                                      {att.status === 'GRADED'
                                        ? `⭐ Đạt ${att.total_score} điểm`
                                        : att.status === 'SUBMITTED'
                                        ? `Đã làm ${answeredCount}/${totalQuestions} câu`
                                        : 'Chưa làm'}
                                    </span>
                                  </div>
                                  <h4 className="text-base font-bold text-slate-800 mt-3">
                                    {att.assessments?.instructions || 'Bé bấm vào làm bài để nhận thật nhiều sao phép thuật nhé!'}
                                  </h4>

                                  {(att.status === 'SUBMITTED' || att.status === 'GRADED') && (
                                    <div className="mt-3 p-3 bg-pink-50 border border-pink-200 rounded-2xl flex items-center justify-between text-xs font-extrabold text-pink-700">
                                      <span>🌟 Đã hoàn thành:</span>
                                      <span className="bg-white px-2.5 py-1 rounded-xl shadow-xs border border-pink-200">
                                        {answeredCount} / {totalQuestions} câu
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <Link
                                  href={att.status === 'GRADED' || att.status === 'SUBMITTED' ? `/student/results/${att.id}` : `/student/mission/${att.id}`}
                                  className="mt-6 block w-full py-3.5 text-center bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-extrabold text-base rounded-2xl shadow-[0_4px_0_#be185d] active:translate-y-1 transition"
                                >
                                  {att.status === 'GRADED'
                                    ? `Xem Lại Bài Làm (${answeredCount}/${totalQuestions} câu) ⭐`
                                    : att.status === 'SUBMITTED'
                                    ? `Xem Lại Bài Đã Nộp (${answeredCount}/${totalQuestions} câu) 🌟`
                                    : 'Bắt Đầu Làm Bài Tập Ngay! 🚀'}
                                </Link>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 bg-white rounded-3xl text-center border-2 border-amber-200">
              <p className="text-pink-600 font-bold">Hôm nay An Lake chưa có bài tập mới. Chúc bạn một ngày vui vẻ!</p>
            </div>
          )}

          {/* Modal Bài Giảng của An Lake */}
          {activeLectureAssignment && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
              <div className="w-full max-w-2xl max-h-[85vh] bg-white border-4 border-pink-300 rounded-3xl p-6 sm:p-8 flex flex-col overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between border-b-2 border-pink-100 pb-4">
                  <div>
                    <span className="text-xs font-extrabold text-pink-600 uppercase">
                      Bài Học Của An Lake • {formatAssignmentDate(activeLectureAssignment.assigned_date)}
                    </span>
                    <h3 className="text-xl font-extrabold text-pink-800 mt-1">
                      {activeLectureAssignment.learning_units?.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveLectureAssignment(null)}
                    className="p-2 text-slate-400 hover:text-pink-600 rounded-lg hover:bg-pink-50 transition"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto py-6">
                  <FormattedContent
                    text={activeLectureAssignment.learning_units?.lecture_content_markdown || ''}
                    className="text-slate-800 text-sm leading-relaxed"
                  />
                </div>

                <div className="border-t-2 border-pink-100 pt-4 flex justify-end">
                  <button
                    onClick={() => setActiveLectureAssignment(null)}
                    className="px-6 py-2.5 bg-pink-500 hover:bg-pink-600 text-white font-extrabold text-sm rounded-2xl shadow-[0_3px_0_#db2777] transition"
                  >
                    Đã Hiểu Bài Rồi! 🌟
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // 3. GIAO DIỆN TRUNG HỌC & LUYỆN THI (THÁI LỚP 11 & NAM VIỆT LỚP 12)
  // ==========================================
  const studentName = user?.fullName || user?.full_name || user?.username || 'Học Sinh';
  const gradeLabel = user?.studentProfile?.grade_level || user?.student_profiles?.grade_level || 11;

  const isThai =
    user?.username === 'thai' ||
    user?.full_name?.toLowerCase().includes('thái') ||
    user?.fullName?.toLowerCase().includes('thái');
  const isNamViet =
    user?.username === 'nam_viet' ||
    user?.full_name?.toLowerCase().includes('việt') ||
    user?.fullName?.toLowerCase().includes('việt');

  const studentTarget = isThai
    ? '8.5+ Giữa Kì & THPT Chuyên Sâu'
    : isNamViet
    ? '7+ THPT Quốc Gia'
    : `${gradeLabel === 12 ? '7+ THPTQG' : '8.0+ Giữa Kì'}`;

  const studentSubject = isThai
    ? 'Tiếng Anh 11 • Global Success'
    : isNamViet
    ? 'Tiếng Anh 12 • Global Success'
    : `Tiếng Anh ${gradeLabel} • Global Success`;

  const studentFocus = isThai
    ? 'Khai phá từ vựng học thuật B2/C1, Collocations, Cây từ loại (Word Family) và tư duy làm chủ đề thi 8.5+.'
    : isNamViet
    ? (todayAssignment?.learning_units?.title?.includes('Unit 7')
        ? 'Luyện phản xạ 12 từ vựng cốt lõi Unit 7 (Mass Media) bằng Flashcard 3D hai chiều, làm chủ Mệnh đề cách thức (As if/were) & Mệnh đề kết quả, khóa chắc 7+ THPTQG.'
        : 'Luyện phản xạ từ vựng trọng tâm bằng Flashcard 3D hai chiều, khóa chắc điểm ngữ pháp & Chắc suất 7+ THPTQG.')
    : 'Tập trung rèn luyện tư duy, chiến thuật làm bài và tăng tốc độ giải đề.';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Luyện Thi - Taste Skill Edition */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200/90 shadow-sm relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all">
          <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 absolute top-0 left-0 right-0" />

          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200/80 px-2.5 py-0.5 rounded-full tracking-wide">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{studentSubject}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
                <Target className="w-3.5 h-3.5 text-emerald-600" />
                <span>{studentTarget}</span>
              </span>
              <span className="text-xs text-slate-500 font-medium px-2 py-0.5 bg-slate-100 rounded-full border border-slate-200">
                Lớp {gradeLabel}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Chào mừng, {studentName}!
            </h1>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              {studentFocus}
            </p>

            {todayAssignment?.teacher_daily_note && (
              <div className="mt-4 p-3.5 sm:p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-950 text-sm flex items-start gap-3">
                <Quote className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-900 block text-xs uppercase tracking-wider mb-0.5">
                    Lời dặn hôm nay từ Thầy Thức:
                  </span>
                  <p className="italic font-medium leading-relaxed">
                    "{todayAssignment.teacher_daily_note}"
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 self-stretch lg:self-center">
            <div className="flex-1 sm:flex-initial px-5 py-3.5 rounded-2xl bg-slate-50/90 border border-slate-200 text-center shadow-xs transition hover:translate-y-[-2px] hover:shadow-sm">
              <div className="flex items-center justify-center gap-1.5 text-slate-500 text-xs font-semibold mb-1">
                <Target className="w-3.5 h-3.5 text-emerald-600" />
                <span>Mục Tiêu</span>
              </div>
              <span className="text-base font-extrabold text-slate-900 block">
                {isThai ? '8.5+ THPT' : isNamViet ? '7+ THPTQG' : `${gradeLabel === 12 ? '7+' : '8.0+'}`}
              </span>
            </div>

            <div className="flex-1 sm:flex-initial px-5 py-3.5 rounded-2xl bg-slate-50/90 border border-slate-200 text-center shadow-xs transition hover:translate-y-[-2px] hover:shadow-sm">
              <div className="flex items-center justify-center gap-1.5 text-slate-500 text-xs font-semibold mb-1">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>Chuỗi Học</span>
              </div>
              <span className="text-base font-extrabold text-blue-600 block">
                7 Ngày
              </span>
            </div>

            <div className="flex-1 sm:flex-initial px-5 py-3.5 rounded-2xl bg-blue-50/60 border border-blue-200/80 text-center shadow-xs transition hover:translate-y-[-2px] hover:shadow-sm">
              <div className="flex items-center justify-center gap-1.5 text-blue-700 text-xs font-semibold mb-1">
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span>Đặc Quyền</span>
              </div>
              <span className="text-xs font-extrabold text-blue-800 block">
                Live Studio 3D
              </span>
            </div>
          </div>
        </div>

        {/* Lịch Học Theo Ngày */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>Lịch Bài Học & Bài Tập Theo Ngày:</span>
            </h2>
            <span className="text-xs text-slate-500">Nhấn vào ngày để mở rộng bài học</span>
          </div>

          {allAssignments.length > 0 ? (
            <div className="space-y-6">
              {allAssignments.map((assignment: any) => {
                const isExpanded = expandedAssignmentId === assignment.id;
                const dateLabel = formatAssignmentDate(assignment.assigned_date);
                const title = assignment.learning_units?.title || 'Bài học';

                return (
                  <div
                    key={assignment.id}
                    className={`rounded-3xl border transition duration-300 overflow-hidden bg-white ${
                      isExpanded ? 'border-blue-500 shadow-md ring-1 ring-blue-500/30' : 'border-slate-200 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <button
                      onClick={() => toggleExpand(assignment.id)}
                      className="w-full p-6 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-bold">
                          <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                              Ngày {dateLabel}
                            </span>
                            <span className="text-xs text-slate-500">Lớp {gradeLabel}</span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                            {dateLabel} : {title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 self-end sm:self-center">
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-xl flex items-center space-x-1">
                          <span>{isExpanded ? 'Thu gọn' : 'Xem chi tiết bài học'}</span>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </span>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="p-6 pt-2 border-t border-slate-100 bg-slate-50/50">
                        {/* Thông báo nếu buổi học không có BTVN */}
                        {assignment.assessment_attempts?.every((a: any) => a.assessments?.type !== 'HOMEWORK') && (
                          <div className="mt-4 px-4 py-2.5 rounded-2xl bg-blue-50/80 border border-blue-200/80 text-blue-900 text-xs flex flex-wrap items-center justify-between gap-2">
                            <span className="font-semibold flex items-center space-x-2">
                              <span>🎉</span>
                              <span>Hôm nay toàn bộ bài tập được dồn làm trực tiếp tại lớp (không có BTVN).</span>
                            </span>
                            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                              {assignment.assessment_attempts?.[0]?.assessments?.title?.match(/\d+\s*câu/)?.[0] ? `${assignment.assessment_attempts[0].assessments.title.match(/\d+\s*câu/)[0]} luyện tập tại lớp` : 'Luyện tập tại lớp'}
                            </span>
                          </div>
                        )}

                        <div className={`grid grid-cols-1 ${assignment.assessment_attempts?.length === 1 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-4 mt-5`}>
                          {/* Station 1: Giảng Đường Tương Tác & Flashcard 3D */}
                          {(() => {
                            const appMatch = assignment.learning_units?.lecture_content_markdown?.match(/\/lectures\/[a-zA-Z0-9_\-\/]+\.html/);
                            const interactiveUrl = appMatch ? appMatch[0] : (
                              assignment.learning_units?.title?.toLowerCase().includes('ôn tập thi giữa kì') ||
                              assignment.learning_units?.lecture_content_markdown?.includes('/lectures/eng11-midterm')
                                ? '/lectures/eng11-midterm/index.html'
                                : null
                            );
                            const hasInteractive = !!interactiveUrl;

                            return (
                              <div
                                className={`group p-5 rounded-2xl bg-white border flex flex-col justify-between shadow-xs transition duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                                  hasInteractive
                                    ? 'border-blue-300/80 bg-gradient-to-b from-blue-50/40 via-white to-white ring-1 ring-blue-100'
                                    : 'border-slate-200 hover:border-slate-300'
                                }`}
                              >
                                <div>
                                  <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-1.5">
                                      <span
                                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border ${
                                          hasInteractive
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                                            : 'bg-slate-50 text-slate-700 border-slate-200'
                                        }`}
                                      >
                                        <Layers className="w-3.5 h-3.5" />
                                        <span>{hasInteractive ? 'Trạm 1: Phòng Học Tương Tác' : 'Trạm 1: Lý Thuyết & Từ Vựng'}</span>
                                      </span>
                                    </div>
                                    {hasInteractive && interactiveUrl && (
                                      <a
                                        href={interactiveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-slate-500 hover:text-blue-600 font-medium inline-flex items-center gap-1 px-2 py-1 rounded-md hover:bg-blue-50 transition"
                                        title="Mở toàn màn hình trong tab mới"
                                      >
                                        <span>Mở tab mới</span>
                                        <ExternalLink className="w-3 h-3" />
                                      </a>
                                    )}
                                  </div>

                                  <h4 className="text-base font-bold text-slate-900 mt-3.5 leading-snug tracking-tight group-hover:text-blue-900 transition-colors">
                                    {assignment.learning_units?.title}
                                  </h4>
                                  <p className="text-xs text-slate-500 mt-1.5 line-clamp-3 leading-relaxed">
                                    {assignment.learning_units?.description || 'Nắm vững hệ thống từ vựng, ngữ pháp và bài tập phản xạ.'}
                                  </p>

                                  {hasInteractive && (
                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100 inline-flex items-center gap-1">
                                        <Volume2 className="w-3 h-3 text-blue-500" /> Phát âm AI
                                      </span>
                                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100 inline-flex items-center gap-1">
                                        <Sparkles className="w-3 h-3 text-emerald-500" /> Flashcard 2 chiều
                                      </span>
                                    </div>
                                  )}
                                </div>

                                <div className="mt-5 pt-3 border-t border-slate-100">
                                  {hasInteractive && interactiveUrl ? (
                                    <a
                                      href={interactiveUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={() => {
                                        if (!assignment.lecture_viewed_at) {
                                          api.markLectureViewed(assignment.id).catch(() => {});
                                          setAllAssignments((prev) =>
                                            prev.map((a) => (a.id === assignment.id ? { ...a, lecture_viewed_at: new Date() } : a)),
                                          );
                                        }
                                      }}
                                      className="w-full py-2.5 px-4 font-semibold text-xs sm:text-sm rounded-xl border transition-all duration-150 active:scale-[0.98] inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white border-blue-600 shadow-xs hover:shadow-blue-500/20"
                                    >
                                      <BookOpen className="w-4 h-4" />
                                      <span>Vào phòng học tương tác</span>
                                      <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                                    </a>
                                  ) : (
                                    <button
                                      onClick={() => handleOpenLecture(assignment)}
                                      className="w-full py-2.5 px-4 font-semibold text-xs sm:text-sm rounded-xl border transition-all duration-150 active:scale-[0.98] inline-flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                                    >
                                      <BookOpen className="w-4 h-4" />
                                      <span>Xem Lý Thuyết</span>
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })()}

                          {/* Station 2 & 3: Luyện tập tại lớp & Bài tập về nhà */}
                          {assignment.assessment_attempts?.map((att: any) => {
                            const isHw = att.assessments?.type === 'HOMEWORK';
                            const isGraded = att.status === 'GRADED';
                            const isSubmitted = att.status === 'SUBMITTED';
                            const answeredCount = att._count?.student_answers ?? att.student_answers?.length ?? 0;
                            const totalQuestions = att.assessments?._count?.questions ?? att.assessments?.questions?.length ?? 0;

                            return (
                              <div
                                key={att.id}
                                className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 flex flex-col justify-between shadow-xs transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
                              >
                                <div>
                                  <div className="flex items-center justify-between gap-2">
                                    <span
                                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border ${
                                        isHw
                                          ? 'bg-amber-50 text-amber-800 border-amber-200/80'
                                          : 'bg-indigo-50 text-indigo-800 border-indigo-200/80'
                                      }`}
                                    >
                                      {isHw ? <FileText className="w-3.5 h-3.5 text-amber-600" /> : <Clock className="w-3.5 h-3.5 text-indigo-600" />}
                                      <span>{isHw ? 'Trạm 3: Bài Tập Về Nhà' : 'Trạm 2: Luyện Tập Tại Lớp'}</span>
                                    </span>
                                    {totalQuestions > 0 && (
                                      <span className="text-xs font-medium text-slate-600 bg-slate-50 px-2.5 py-0.5 rounded-md border border-slate-200 font-mono">
                                        {totalQuestions} câu
                                      </span>
                                    )}
                                  </div>

                                  <h4 className="text-base font-bold text-slate-900 mt-3.5 leading-snug tracking-tight group-hover:text-blue-900 transition-colors">
                                    {att.assessments?.title}
                                  </h4>
                                  <p className="text-xs text-slate-500 mt-1.5">
                                    Thang điểm: {att.assessments?.max_score || 10}đ • Thời lượng: {att.assessments?.time_limit_minutes || 90} phút
                                  </p>

                                  {(isSubmitted || isGraded) && (
                                    <div className="mt-3 p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between text-xs">
                                      <span className="text-slate-600 font-medium">Tiến độ bài nộp:</span>
                                      <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded-md border border-slate-200 font-mono">
                                        {answeredCount}/{totalQuestions} câu
                                      </span>
                                    </div>
                                  )}
                                </div>

                                <div className="mt-5 pt-3 border-t border-slate-100">
                                  {isGraded ? (
                                    <Link
                                      href={`/student/results/${att.id}`}
                                      className="block w-full py-2.5 px-4 text-center bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold text-xs sm:text-sm rounded-xl transition-all duration-150 active:scale-[0.98]"
                                    >
                                      Xem Kết Quả: {att.total_score}đ ({answeredCount}/{totalQuestions} câu)
                                    </Link>
                                  ) : isSubmitted ? (
                                    <Link
                                      href={`/student/results/${att.id}`}
                                      className="block w-full py-2.5 px-4 text-center bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-semibold text-xs sm:text-sm rounded-xl transition-all duration-150 active:scale-[0.98]"
                                    >
                                      Đã nộp bài ({answeredCount}/{totalQuestions} câu) • Xem lại
                                    </Link>
                                  ) : (
                                    <Link
                                      href={`/student/mission/${att.id}`}
                                      className={`block w-full py-2.5 px-4 text-center text-white font-semibold text-xs sm:text-sm rounded-xl transition-all duration-150 active:scale-[0.98] shadow-xs ${
                                        isHw
                                          ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20'
                                          : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'
                                      }`}
                                    >
                                      {att.status === 'IN_PROGRESS'
                                        ? 'Tiếp Tục Làm Bài'
                                        : `Bắt Đầu Làm Bài ${
                                            totalQuestions
                                              ? `(${totalQuestions} câu)`
                                              : ''
                                          }`}
                                    </Link>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 bg-white rounded-3xl text-center border border-slate-200 shadow-sm">
              <p className="text-slate-500">Chưa có bài học mới được giao.</p>
            </div>
          )}
        </div>

        {/* Modal Bài Giảng */}
        {activeLectureAssignment && (() => {
          const appMatch = activeLectureAssignment.learning_units?.lecture_content_markdown?.match(/\/lectures\/[a-zA-Z0-9_\-\/]+\.html/);
          const interactiveUrl = appMatch ? appMatch[0] : (
            activeLectureAssignment.learning_units?.title?.toLowerCase().includes('ôn tập thi giữa kì') ||
            activeLectureAssignment.learning_units?.lecture_content_markdown?.includes('/lectures/eng11-midterm')
              ? '/lectures/eng11-midterm/index.html'
              : null
          );
          const hasInteractive = !!interactiveUrl;

          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-sm p-2 sm:p-4 animate-in fade-in duration-200">
              <div
                className={`w-full ${
                  hasInteractive ? 'max-w-6xl h-[92vh] max-h-[92vh]' : 'max-w-3xl max-h-[85vh]'
                } bg-white border border-slate-200/80 rounded-2xl flex flex-col overflow-hidden shadow-2xl transition-all`}
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5 bg-slate-50/50 flex-shrink-0">
                  <div className="min-w-0 pr-4">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px]">
                        {hasInteractive ? 'Giảng Đường Tương Tác' : 'Lý Thuyết & Từ Vựng'}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500 font-mono text-[11px]">
                        {formatAssignmentDate(activeLectureAssignment.assigned_date)}
                      </span>
                      {hasInteractive && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          Studio Live
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1 truncate">
                      {activeLectureAssignment.learning_units?.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {hasInteractive && interactiveUrl && (
                      <>
                        <a
                          href={`${interactiveUrl}?fullscreen=1#tab-flashcards`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 text-xs font-bold border border-blue-200 shadow-2xs transition"
                          title="Mở riêng phòng Flashcards toàn màn hình"
                        >
                          <span>⚡ Flashcard Toàn màn hình</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={interactiveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-slate-700 hover:text-blue-600 hover:border-blue-300 text-xs font-semibold border border-slate-200 shadow-2xs transition"
                          title="Mở toàn bộ phòng học trong tab mới"
                        >
                          <span>Mở tab mới</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </>
                    )}
                    <button
                      onClick={() => setActiveLectureAssignment(null)}
                      className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-200/70 transition"
                      aria-label="Đóng bài giảng"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Content / Iframe Frame */}
                {hasInteractive && interactiveUrl ? (
                  <div className="flex-1 w-full h-full min-h-0 bg-slate-100 p-2">
                    <iframe
                      src={interactiveUrl}
                      className="w-full h-full border border-slate-200 rounded-xl shadow-xs bg-white"
                      title={activeLectureAssignment.learning_units?.title || "Bài Giảng Tương Tác"}
                    />
                  </div>
                ) : (
                  <div className="flex-1 overflow-y-auto p-6 sm:p-8">
                    <FormattedContent
                      text={activeLectureAssignment.learning_units?.lecture_content_markdown || ''}
                      className="text-slate-700 text-sm leading-relaxed"
                    />
                  </div>
                )}

                {/* Footer */}
                <div className="border-t border-slate-200 px-5 py-3 bg-white flex flex-col sm:flex-row items-center justify-between gap-2.5 flex-shrink-0">
                  <div className="text-xs text-slate-500 flex items-center gap-3">
                    {hasInteractive ? (
                      <div className="flex flex-wrap items-center gap-2 text-slate-500 text-[11px]">
                        <span className="font-semibold text-slate-600">Phím tắt:</span>
                        <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 text-slate-700">Space: Lật thẻ</span>
                        <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 text-slate-700">← / →: Chuyển</span>
                        <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 text-slate-700">P: Phát âm</span>
                        <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 text-slate-700">F: Toàn màn hình</span>
                        <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 text-slate-700">Esc: Thoát</span>
                      </div>
                    ) : (
                      <span className="font-medium text-slate-600">Thầy Thức chúc bạn học tốt! Nắm chắc từ vựng & cấu trúc ngữ pháp.</span>
                    )}
                  </div>
                  <button
                    onClick={() => setActiveLectureAssignment(null)}
                    className="w-full sm:w-auto px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm rounded-xl transition duration-150 active:scale-[0.98] shadow-xs"
                  >
                    Đã Hoàn Thành Buổi Học
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
