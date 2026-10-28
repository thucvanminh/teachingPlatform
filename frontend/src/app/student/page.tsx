'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api, getUser } from '@/lib/api';
import { SpaceBackground } from '@/components/SpaceBackground';
import { FormattedContent } from '@/components/KatexMath';
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

  const handleOpenLecture = async (assignment: any) => {
    if (assignment && !assignment.lecture_viewed_at) {
      await api.markLectureViewed(assignment.id).catch(() => {});
      setAllAssignments((prev) =>
        prev.map((a) => (a.id === assignment.id ? { ...a, lecture_viewed_at: new Date() } : a)),
      );
      if (todayAssignment?.id === assignment.id) {
        setTodayAssignment({ ...todayAssignment, lecture_viewed_at: new Date() });
      }
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
                  <span>TRẠM CHỈ HUY KHÔNG GIAN • KEITHLEY LAKE MISSION CONTROL</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center space-x-3">
                  <span>Chào mừng, Phi Hành Gia Keithley Lake!</span>
                  <Rocket className="w-7 h-7 text-cyan-400 hidden sm:inline-block animate-pulse" />
                </h1>
                <p className="text-sm text-slate-300 mt-2 max-w-xl">
                  {todayAssignment?.teacher_daily_note ? (
                    <span className="text-amber-300 italic">
                      "Thông điệp từ Thầy Minh: {todayAssignment.teacher_daily_note}"
                    </span>
                  ) : (
                    'Hệ thống đã sẵn sàng các tọa độ bài học theo từng ngày. Hãy nhấn vào thẻ ngày để bắt đầu nhiệm vụ!'
                  )}
                </p>
              </div>

              {/* Status Badges */}
              <div className="flex items-center space-x-4">
                <div className="px-4 py-3 rounded-2xl bg-slate-800/80 border border-cyan-500/20 text-center">
                  <span className="text-xs text-slate-400 block">Cấp Độ</span>
                  <span className="text-base font-bold text-cyan-400 flex items-center justify-center space-x-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>Toán 7 & Hóa 9</span>
                  </span>
                </div>
                <div className="px-4 py-3 rounded-2xl bg-slate-800/80 border border-purple-500/20 text-center">
                  <span className="text-xs text-slate-400 block">Chuỗi Học</span>
                  <span className="text-base font-bold text-purple-400 flex items-center justify-center space-x-1">
                    <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                    <span>5 Ngày</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* DANH SÁCH BÀI HỌC THEO NGÀY */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-cyan-300 flex items-center space-x-2 tracking-wide">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <span>LỊCH HỌC & NHIỆM VỤ THEO NGÀY (DAILY MISSIONS)</span>
              </h2>
              <span className="text-xs text-slate-400">
                Nhấn vào từng ngày để xem bài giảng, bài tập 90p và BTVN
              </span>
            </div>

            {allAssignments.length > 0 ? (
              <div className="space-y-6">
                {allAssignments.map((assignment: any) => {
                  const isExpanded = expandedAssignmentId === assignment.id;
                  const dateLabel = formatAssignmentDate(assignment.assigned_date);
                  const title = assignment.learning_units?.title || 'Bài học không tên';
                  const subjectName = assignment.learning_units?.subjects?.name || 'Môn học';
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
                        <div className="flex items-start space-x-4">
                          <div
                            className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center transition-transform ${
                              isExpanded
                                ? 'bg-gradient-to-tr from-cyan-500 to-purple-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)] scale-105'
                                : 'bg-slate-800 border border-cyan-500/30 text-cyan-400'
                            }`}
                          >
                            <Calendar className="w-6 h-6" />
                          </div>

                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                                {subjectName}
                              </span>
                              {assignment.assigned_date && (
                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300">
                                  Ngày {dateLabel}
                                </span>
                              )}
                              <span className="text-xs text-slate-400">
                                Tiến độ: {gradedCount}/{totalAttempts} bài đã hoàn thành
                              </span>
                            </div>

                            {/* Format rõ ràng: 28/10/2026 : {Tên Bài Giảng Hôm Đó} */}
                            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center space-x-2">
                              <span>
                                {dateLabel} : {title}
                              </span>
                            </h3>

                            {assignment.teacher_daily_note && (
                              <p className="text-xs text-amber-300/90 mt-1.5 italic line-clamp-1">
                                💬 Lời dặn của Thầy: "{assignment.teacher_daily_note}"
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
                            <span>{isExpanded ? 'Đang mở (Thu gọn)' : 'Nhấn để mở bài học & bài tập'}</span>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-cyan-400" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-slate-400" />
                            )}
                          </div>
                        </div>
                      </button>

                      {/* NỘI DUNG CHI TIẾT KHI NHẤN VÀO CARD: BÀI GIẢNG + BÀI TẬP 90P + BTVN */}
                      {isExpanded && (
                        <div className="p-6 pt-2 border-t border-slate-800/80 bg-slate-950/40">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
                            {/* 1. KHỐI BÀI GIẢNG (LÝ THUYẾT & KIẾN THỨC CỐT LÕI) */}
                            <div className="rounded-2xl p-6 bg-slate-900/90 border border-cyan-500/30 flex flex-col justify-between shadow-lg">
                              <div>
                                <div className="flex items-center justify-between mb-3">
                                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center space-x-1.5">
                                    <BookOpen className="w-3.5 h-3.5" />
                                    <span>Trạm 1: Bài Giảng</span>
                                  </span>
                                  <span
                                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                                      assignment.lecture_viewed_at
                                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                                        : 'bg-amber-950 text-amber-400 border border-amber-500/30'
                                    }`}
                                  >
                                    {assignment.lecture_viewed_at ? '✓ Đã đọc bài giảng' : 'Chưa đọc'}
                                  </span>
                                </div>

                                <h4 className="text-base font-bold text-white mt-2 leading-snug">
                                  {assignment.learning_units?.title}
                                </h4>
                                <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                                  {assignment.learning_units?.description ||
                                    'Nắm vững quy tắc dấu trong phép tính và ứng dụng vào bài toán tìm x.'}
                                </p>
                              </div>

                              <div className="mt-6 pt-4 border-t border-slate-800">
                                <button
                                  onClick={() => handleOpenLecture(assignment)}
                                  className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-cyan-500/40 text-cyan-300 text-sm font-semibold flex items-center justify-center space-x-2 transition shadow"
                                >
                                  <BookOpen className="w-4 h-4 text-cyan-400" />
                                  <span>
                                    {assignment.lecture_viewed_at
                                      ? 'Mở Lại Bài Giảng & KaTeX'
                                      : 'Đọc Bài Giảng & Công Thức KaTeX'}
                                  </span>
                                </button>
                              </div>
                            </div>

                            {/* 2. KHỐI BÀI TẬP TẠI LỚP (90 PHÚT) */}
                            {inSessionAttempt ? (
                              <div
                                className={`rounded-2xl p-6 flex flex-col justify-between border backdrop-blur-xl transition duration-300 ${
                                  inSessionAttempt.status === 'GRADED'
                                    ? 'bg-slate-900/90 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                                    : inSessionAttempt.status === 'SUBMITTED'
                                    ? 'bg-slate-900/90 border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                                    : 'bg-slate-900/90 border-cyan-500/40 hover:border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.1)]'
                                }`}
                              >
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30 flex items-center space-x-1.5">
                                      <Clock className="w-3.5 h-3.5" />
                                      <span>Trạm 2: Luyện Tập Tại Lớp</span>
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
                                        ? 'Đã chấm điểm'
                                        : inSessionAttempt.status === 'SUBMITTED'
                                        ? 'Đã nộp (Chờ chấm)'
                                        : inSessionAttempt.status === 'IN_PROGRESS'
                                        ? 'Đang làm dở'
                                        : 'Chưa bắt đầu'}
                                    </span>
                                  </div>

                                  <h4 className="text-base font-bold text-white leading-tight">
                                    {inSessionAttempt.assessments?.title || 'Bài kiểm tra tại lớp'}
                                  </h4>

                                  <div className="mt-4 flex items-center space-x-4 text-xs text-slate-400">
                                    <div className="flex items-center space-x-1">
                                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                                      <span>
                                        {inSessionAttempt.assessments?.time_limit_minutes || 90} phút
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Star className="w-3.5 h-3.5 text-amber-400" />
                                      <span>Thang điểm: {inSessionAttempt.assessments?.max_score || 10}</span>
                                    </div>
                                  </div>

                                  {inSessionAttempt.status === 'GRADED' && (
                                    <div className="mt-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs">
                                      <p className="font-bold text-sm">
                                        Điểm đạt được: {inSessionAttempt.total_score} /{' '}
                                        {inSessionAttempt.assessments?.max_score}
                                      </p>
                                      {inSessionAttempt.overall_feedback && (
                                        <p className="mt-1 italic opacity-90">
                                          Lời phê: "{inSessionAttempt.overall_feedback}"
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
                                      <span>Xem Chi Tiết Bài Chữa</span>
                                      <ExternalLink className="w-4 h-4" />
                                    </Link>
                                  ) : (
                                    <Link
                                      href={`/student/mission/${inSessionAttempt.id}`}
                                      className={`w-full py-2.5 px-4 rounded-xl text-white text-sm font-semibold flex items-center justify-center space-x-2 transition shadow-lg ${
                                        inSessionAttempt.status === 'SUBMITTED'
                                          ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                                          : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                                      }`}
                                    >
                                      <span>
                                        {inSessionAttempt.status === 'IN_PROGRESS'
                                          ? 'Tiếp tục làm bài 90p'
                                          : 'Khởi Động Bài Tập 90 Phút'}
                                      </span>
                                      <ArrowRight className="w-4 h-4" />
                                    </Link>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className="rounded-2xl p-6 bg-slate-900/60 border border-slate-800 flex items-center justify-center text-center text-xs text-slate-500">
                                Chưa có bài tập tại lớp
                              </div>
                            )}

                            {/* 3. KHỐI BÀI TẬP VỀ NHÀ (BTVN CỦNG CỐ) */}
                            {homeworkAttempt ? (
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
                                      <span>Trạm 3: Bài Tập Về Nhà</span>
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
                                        ? 'Đã chấm điểm'
                                        : homeworkAttempt.status === 'SUBMITTED'
                                        ? 'Đã nộp (Chờ chấm)'
                                        : homeworkAttempt.status === 'IN_PROGRESS'
                                        ? 'Đang làm dở'
                                        : 'Chưa bắt đầu'}
                                    </span>
                                  </div>

                                  <h4 className="text-base font-bold text-white leading-tight">
                                    {homeworkAttempt.assessments?.title || 'Bài tập về nhà củng cố'}
                                  </h4>

                                  <div className="mt-4 flex items-center space-x-4 text-xs text-slate-400">
                                    <div className="flex items-center space-x-1">
                                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                                      <span>Tự luyện củng cố kiến thức</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Star className="w-3.5 h-3.5 text-amber-400" />
                                      <span>Thang điểm: {homeworkAttempt.assessments?.max_score || 10}</span>
                                    </div>
                                  </div>

                                  {homeworkAttempt.status === 'GRADED' && (
                                    <div className="mt-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs">
                                      <p className="font-bold text-sm">
                                        Điểm đạt được: {homeworkAttempt.total_score} /{' '}
                                        {homeworkAttempt.assessments?.max_score}
                                      </p>
                                      {homeworkAttempt.overall_feedback && (
                                        <p className="mt-1 italic opacity-90">
                                          Lời phê: "{homeworkAttempt.overall_feedback}"
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
                                      <span>Xem Chi Tiết Bài Chữa</span>
                                      <ExternalLink className="w-4 h-4" />
                                    </Link>
                                  ) : (
                                    <Link
                                      href={`/student/mission/${homeworkAttempt.id}`}
                                      className={`w-full py-2.5 px-4 rounded-xl text-white text-sm font-semibold flex items-center justify-center space-x-2 transition shadow-lg ${
                                        homeworkAttempt.status === 'SUBMITTED'
                                          ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                                          : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                                      }`}
                                    >
                                      <span>
                                        {homeworkAttempt.status === 'IN_PROGRESS'
                                          ? 'Tiếp tục làm BTVN'
                                          : 'Bắt Đầu Làm BTVN'}
                                      </span>
                                      <ArrowRight className="w-4 h-4" />
                                    </Link>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className="rounded-2xl p-6 bg-slate-900/60 border border-slate-800 flex items-center justify-center text-center text-xs text-slate-500">
                                Chưa có bài tập về nhà
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-3xl p-8 bg-slate-900/60 border border-slate-800 text-center">
                <Rocket className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-300">Chưa có bài học nào được giao</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Thầy Minh sẽ lên lịch và giao bài mới vào trạm không gian của con sớm nhé!
                </p>
              </div>
            )}
          </div>

          {/* Modal Xem Lý Thuyết Bài Giảng KaTeX */}
          {activeLectureAssignment && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
              <div className="w-full max-w-3xl max-h-[85vh] bg-slate-900 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 flex flex-col overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                      Nạp Nhiên Liệu Tri Thức • {formatAssignmentDate(activeLectureAssignment.assigned_date)}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1">
                      {activeLectureAssignment.learning_units?.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveLectureAssignment(null)}
                    className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto py-6 pr-2">
                  <FormattedContent
                    text={activeLectureAssignment.learning_units?.lecture_content_markdown || ''}
                    className="text-slate-200 text-sm leading-relaxed"
                  />

                  {/* Sơ đồ đính kèm */}
                  {activeLectureAssignment.learning_units?.lecture_attachments?.map((att: any, idx: number) => (
                    <div key={idx} className="mt-6 p-4 rounded-2xl bg-slate-800/80 border border-cyan-500/20">
                      <p className="text-xs font-semibold text-cyan-300 mb-2">📌 Sơ đồ tư duy / Tài liệu học tập:</p>
                      <img
                        src={att.url}
                        alt={att.name || 'Tài liệu'}
                        className="max-h-72 w-auto mx-auto rounded-xl shadow-md border border-slate-700 object-contain"
                      />
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-800 pt-4 flex justify-end">
                  <button
                    onClick={() => setActiveLectureAssignment(null)}
                    className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-sm font-semibold rounded-xl transition shadow"
                  >
                    Đã Hiểu Bài, Sẵn Sàng Làm Bài!
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </SpaceBackground>
    );
  }

  // ==========================================
  // 2. GIAO DIỆN BÉ AN (TOÁN LỚP 1 - KIDS WONDERLAND)
  // ==========================================
  if (isKids) {
    return (
      <div className="min-h-screen bg-amber-50 text-slate-900 py-10 px-4">
        <div className="max-w-4xl mx-auto">
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

                return (
                  <div
                    key={assignment.id}
                    className={`rounded-3xl border-2 transition duration-300 overflow-hidden bg-white ${
                      isExpanded ? 'border-pink-500 shadow-xl ring-2 ring-pink-300' : 'border-pink-200 hover:border-pink-400 shadow-md'
                    }`}
                  >
                    {/* Card Header ghi ngày */}
                    <button
                      onClick={() => toggleExpand(assignment.id)}
                      className="w-full p-6 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-pink-50/50 transition"
                    >
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-xs font-extrabold px-3 py-0.5 rounded-full bg-pink-500 text-white">
                            Ngày {dateLabel}
                          </span>
                          <span className="text-xs font-bold text-pink-700">Toán Lớp 1</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-extrabold text-slate-800">
                          {dateLabel} : {title}
                        </h3>
                        {assignment.teacher_daily_note && (
                          <p className="text-xs text-pink-600 mt-1 font-semibold italic">
                            💌 Thầy Minh dặn dò: "{assignment.teacher_daily_note}"
                          </p>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 self-end sm:self-center">
                        <span className="text-xs font-bold text-pink-600 bg-pink-100 px-3 py-1.5 rounded-xl flex items-center space-x-1">
                          <span>{isExpanded ? 'Thu gọn' : 'Bấm xem bài học'}</span>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </span>
                      </div>
                    </button>

                    {/* Chi tiết khi mở card: Bài giảng + Bài tập tại lớp + Bài tập về nhà */}
                    {isExpanded && (
                      <div className="p-6 pt-2 border-t-2 border-pink-100 bg-pink-50/30">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                          {/* 1. Bài giảng của An Lake */}
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

                          {/* 2 & 3. Các bài tập */}
                          {assignment.assessment_attempts?.map((att: any) => (
                            <div
                              key={att.id}
                              className="p-5 rounded-2xl bg-white border-2 border-pink-200 flex flex-col justify-between shadow-sm"
                            >
                              <div>
                                <span className="text-xs font-bold px-3 py-1 bg-pink-500 text-white rounded-full">
                                  {att.assessments?.title || 'Bài tập'}
                                </span>
                                <h4 className="text-base font-bold text-slate-800 mt-3">
                                  {att.assessments?.instructions || 'Bé làm bài để nhận thật nhiều sao phép thuật nhé!'}
                                </h4>
                              </div>
                              <Link
                                href={`/student/mission/${att.id}`}
                                className="mt-6 block w-full py-3 text-center bg-pink-500 hover:bg-pink-600 text-white font-extrabold text-sm rounded-2xl shadow-[0_3px_0_#db2777] active:translate-y-1 transition"
                              >
                                Bắt Đầu Làm Bài Ngay! 🚀
                              </Link>
                            </div>
                          ))}
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Luyện Thi */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-blue-600 tracking-wider uppercase mb-1">
              <Target className="w-4 h-4 text-blue-600" />
              <span>KHÔNG GIAN HỌC TẬP • LỚP {gradeLabel}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Chào mừng, {studentName}!
            </h1>
            <p className="text-sm text-slate-500 mt-2 max-w-xl">
              {todayAssignment?.teacher_daily_note ? (
                <span className="text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/80 inline-block font-medium">
                  "Lời dặn từ Thầy Minh: {todayAssignment.teacher_daily_note}"
                </span>
              ) : (
                'Tập trung rèn luyện tư duy, chiến thuật làm bài và tăng tốc độ giải đề.'
              )}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-center shadow-xs">
              <span className="text-xs text-slate-500 block">Mục Tiêu</span>
              <span className="text-base font-bold text-amber-600">9.0+ THPTQG</span>
            </div>
            <div className="px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-center shadow-xs">
              <span className="text-xs text-slate-500 block">Chuỗi Học</span>
              <span className="text-base font-bold text-blue-600">7 Ngày</span>
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
                              100 câu luyện tập tại lớp
                            </span>
                          </div>
                        )}

                        <div className={`grid grid-cols-1 ${assignment.assessment_attempts?.length === 1 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-5 mt-4`}>
                          {/* Station 1: Bài Giảng & Từ Vựng */}
                          <div className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between shadow-sm">
                            <div>
                              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                                📖 Trạm 1: Bài Giảng & 30 Từ Vựng
                              </span>
                              <h4 className="text-base font-bold text-slate-900 mt-3">
                                {assignment.learning_units?.title}
                              </h4>
                              <p className="text-xs text-slate-500 mt-1 line-clamp-3">
                                {assignment.learning_units?.description || 'Nắm vững kiến thức trọng tâm.'}
                              </p>
                            </div>
                            <button
                              onClick={() => handleOpenLecture(assignment)}
                              className="mt-6 w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-sm rounded-xl border border-blue-200 transition"
                            >
                              Đọc Bài Giảng & Sổ Từ Vựng
                            </button>
                          </div>

                          {/* Station 2 & 3: Luyện tập tại lớp & Bài tập về nhà */}
                          {assignment.assessment_attempts?.map((att: any) => {
                            const isHw = att.assessments?.type === 'HOMEWORK';
                            const isGraded = att.status === 'GRADED';
                            const isSubmitted = att.status === 'SUBMITTED';

                            return (
                              <div
                                key={att.id}
                                className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between shadow-sm"
                              >
                                <div>
                                  <div className="flex items-center justify-between">
                                    <span
                                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                                        isHw
                                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                                          : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                                      }`}
                                    >
                                      {isHw ? '📝 Trạm 3: Bài Tập Về Nhà (BTVN)' : '⏱️ Trạm 2: Luyện Tập Tại Lớp (90p)'}
                                    </span>
                                    {att.assessments?._count?.questions && (
                                      <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                                        {att.assessments._count.questions} câu
                                      </span>
                                    )}
                                  </div>
                                  <h4 className="text-base font-bold text-slate-900 mt-3 leading-snug">
                                    {att.assessments?.title}
                                  </h4>
                                  <p className="text-xs text-slate-500 mt-1">
                                    Thang điểm: {att.assessments?.max_score || 10} điểm •{' '}
                                    {att.assessments?.time_limit_minutes || 90} phút
                                  </p>
                                </div>

                                {isGraded ? (
                                  <Link
                                    href={`/student/results/${att.id}`}
                                    className="mt-6 block w-full py-2.5 text-center bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-sm rounded-xl transition shadow-xs"
                                  >
                                    Xem Điểm: {att.total_score}đ
                                  </Link>
                                ) : isSubmitted ? (
                                  <div className="mt-6 w-full py-2.5 text-center bg-amber-50 text-amber-800 border border-amber-200 font-semibold text-xs rounded-xl">
                                    Đã nộp bài • Chờ chấm
                                  </div>
                                ) : (
                                  <Link
                                    href={`/student/mission/${att.id}`}
                                    className={`mt-6 block w-full py-2.5 text-center text-white font-semibold text-sm rounded-xl transition shadow-sm ${
                                      isHw
                                        ? 'bg-amber-600 hover:bg-amber-700'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                                  >
                                    {att.status === 'IN_PROGRESS'
                                      ? 'Tiếp Tục Làm Bài'
                                      : `Bắt Đầu Làm Bài ${
                                          att.assessments?._count?.questions
                                            ? `(${att.assessments._count.questions} câu)`
                                            : ''
                                        }`}
                                  </Link>
                                )}
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
        {activeLectureAssignment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-3xl max-h-[85vh] bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase">
                    Bài Giảng • {formatAssignmentDate(activeLectureAssignment.assigned_date)}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">
                    {activeLectureAssignment.learning_units?.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveLectureAssignment(null)}
                  className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6">
                <FormattedContent
                  text={activeLectureAssignment.learning_units?.lecture_content_markdown || ''}
                  className="text-slate-700 text-sm leading-relaxed"
                />
              </div>

              <div className="border-t border-slate-100 pt-4 flex justify-end">
                <button
                  onClick={() => setActiveLectureAssignment(null)}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition shadow-sm"
                >
                  Đã Hiểu Bài
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
