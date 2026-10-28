'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api, getUser } from '@/lib/api';
import { SpaceBackground } from '@/components/SpaceBackground';
import { FormattedContent } from '@/components/KatexMath';
import {
  Rocket,
  Compass,
  Clock,
  CheckCircle,
  AlertCircle,
  Sparkles,
  BookOpen,
  Calendar,
  Flame,
  Star,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [todayAssignment, setTodayAssignment] = useState<any>(null);
  const [allAssignments, setAllAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLectureModal, setShowLectureModal] = useState(false);

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
        setAllAssignments(all);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [router]);

  const handleMarkViewed = async () => {
    if (todayAssignment && !todayAssignment.lecture_viewed_at) {
      await api.markLectureViewed(todayAssignment.id).catch(() => {});
      setTodayAssignment({ ...todayAssignment, lecture_viewed_at: new Date() });
    }
    setShowLectureModal(true);
  };

  const isCosmic = user?.username === 'keithley' || user?.studentProfile?.grade_level === 7 || user?.studentProfile?.grade_level === 9;
  const isKids = user?.studentProfile?.grade_level === 2;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Rocket className="w-10 h-10 text-cyan-400 animate-bounce" />
          <p className="text-cyan-400 font-semibold tracking-wider text-sm">Đang kết nối trạm vũ trụ...</p>
        </div>
      </div>
    );
  }

  // Giao diện Vũ Trụ dành cho Keithley (Toán 7 & Hóa 9)
  if (isCosmic) {
    return (
      <SpaceBackground>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Cosmic HUD Header */}
          <div className="relative rounded-3xl p-6 sm:p-8 bg-slate-900/80 border border-cyan-500/30 backdrop-blur-xl shadow-[0_0_30px_rgba(6,182,212,0.15)] mb-8 overflow-hidden">
            <div
              className="absolute right-0 top-0 bottom-0 w-1/3 bg-cover bg-center opacity-20 pointer-events-none"
              style={{ backgroundImage: `url('/images/cosmic/bg_nebula.jpg')` }}
            />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 tracking-widest uppercase mb-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>TRẠM CHỈ HUY KHÔNG GIAN • KEITHLEY MISSION CONTROL</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center space-x-3">
                  <span>Chào mừng, Phi Hành Gia Keithley!</span>
                  <Rocket className="w-7 h-7 text-cyan-400 hidden sm:inline-block animate-pulse" />
                </h1>
                <p className="text-sm text-slate-300 mt-2 max-w-xl">
                  {todayAssignment?.teacher_daily_note ? (
                    <span className="text-amber-300 italic">
                      "Thông điệp từ Thầy Minh: {todayAssignment.teacher_daily_note}"
                    </span>
                  ) : (
                    'Hôm nay hệ thống đã chuẩn bị sẵn nhiên liệu kiến thức và các nhiệm vụ quỹ đạo cho con.'
                  )}
                </p>
              </div>

              {/* Status Badges */}
              <div className="flex items-center space-x-4">
                <div className="px-4 py-3 rounded-2xl bg-slate-800/80 border border-cyan-500/20 text-center">
                  <span className="text-xs text-slate-400 block">Cấp Độ</span>
                  <span className="text-base font-bold text-cyan-400 flex items-center justify-center space-x-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>Lớp 7 & 9</span>
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

          {/* Today's Mission (Nhiệm vụ hôm nay) */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-cyan-300 flex items-center space-x-2 mb-6 tracking-wide">
              <Compass className="w-5 h-5 text-cyan-400" />
              <span>NHIỆM VỤ HÔM NAY (TODAY'S MISSION)</span>
            </h2>

            {todayAssignment ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 1. Lý Thuyết & Bài Giảng Card */}
                <div className="lg:col-span-1 rounded-3xl p-6 bg-slate-900/90 border border-cyan-500/30 backdrop-blur-xl flex flex-col justify-between shadow-lg">
                  <div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-400">
                      Trạm Lý Thuyết
                    </span>
                    <h3 className="text-lg font-bold text-white mt-3 leading-snug">
                      {todayAssignment.learning_units?.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-3">
                      {todayAssignment.learning_units?.description || 'Nắm vững quy tắc dấu và bài toán tìm x.'}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800">
                    <button
                      onClick={handleMarkViewed}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-cyan-500/30 text-cyan-300 text-sm font-semibold flex items-center justify-center space-x-2 transition"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>
                        {todayAssignment.lecture_viewed_at ? 'Đã xem lý thuyết (Mở lại)' : 'Đọc Bài Giảng & Công Thức'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* 2 & 3: Các Bài tập / Đề thi trong ngày */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {todayAssignment.assessment_attempts?.map((attempt: any) => {
                    const is90m = attempt.assessments?.type === 'IN_SESSION_90M';
                    const isDone = attempt.status === 'GRADED';
                    const isSubmitted = attempt.status === 'SUBMITTED';
                    const isProgress = attempt.status === 'IN_PROGRESS';

                    return (
                      <div
                        key={attempt.id}
                        className={`rounded-3xl p-6 flex flex-col justify-between border backdrop-blur-xl transition duration-300 ${
                          isDone
                            ? 'bg-slate-900/90 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                            : isSubmitted
                            ? 'bg-slate-900/90 border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                            : 'bg-slate-900/90 border-cyan-500/40 hover:border-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.15)]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span
                              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                                is90m ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/30' : 'bg-purple-950 text-purple-400 border border-purple-500/30'
                              }`}
                            >
                              {is90m ? 'Nhiệm Vụ 90 Phút' : 'Thử Thách BTVN'}
                            </span>
                            <span
                              className={`text-xs font-semibold ${
                                isDone ? 'text-emerald-400' : isSubmitted ? 'text-amber-400' : 'text-slate-400'
                              }`}
                            >
                              {isDone
                                ? 'Đã chấm điểm'
                                : isSubmitted
                                ? 'Đã nộp bài (Chờ chấm)'
                                : isProgress
                                ? 'Đang làm dở'
                                : 'Chưa bắt đầu'}
                            </span>
                          </div>

                          <h4 className="text-base font-bold text-white leading-tight">
                            {attempt.assessments?.title}
                          </h4>

                          <div className="mt-4 flex items-center space-x-4 text-xs text-slate-400">
                            {attempt.assessments?.time_limit_minutes && (
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                                <span>{attempt.assessments.time_limit_minutes} phút</span>
                              </div>
                            )}
                            <div className="flex items-center space-x-1">
                              <Star className="w-3.5 h-3.5 text-amber-400" />
                              <span>Thang điểm: {attempt.assessments?.max_score}</span>
                            </div>
                          </div>

                          {isDone && (
                            <div className="mt-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs">
                              <p className="font-bold text-sm">
                                Điểm số đạt được: {attempt.total_score} / {attempt.assessments?.max_score}
                              </p>
                              {attempt.overall_feedback && (
                                <p className="mt-1 italic opacity-90">Lời phê: "{attempt.overall_feedback}"</p>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="mt-6">
                          {isDone ? (
                            <Link
                              href={`/student/results/${attempt.id}`}
                              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/40 border border-emerald-500/50 text-emerald-300 text-sm font-semibold flex items-center justify-center space-x-2 transition"
                            >
                              <span>Xem Chi Tiết Bài Chữa</span>
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          ) : (
                            <Link
                              href={`/student/mission/${attempt.id}`}
                              className={`w-full py-2.5 px-4 rounded-xl text-white text-sm font-semibold flex items-center justify-center space-x-2 transition shadow-lg ${
                                isSubmitted
                                  ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                                  : 'bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                              }`}
                            >
                              <span>{isProgress ? 'Tiếp tục làm bài' : 'Khởi Động Nhiệm Vụ (Bắt Đầu)'}</span>
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="rounded-3xl p-8 bg-slate-900/60 border border-slate-800 text-center">
                <Rocket className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-300">Hôm nay chưa có bài học mới</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Thầy Minh sẽ lên lịch và giao bài tiếp theo vào trạm không gian của con sớm nhé!
                </p>
              </div>
            )}
          </div>

          {/* Modal Xem Lý Thuyết Bài Giảng */}
          {showLectureModal && todayAssignment && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
              <div className="w-full max-w-3xl max-h-[85vh] bg-slate-900 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 flex flex-col overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                      Nạp Nhiên Liệu Tri Thức
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1">
                      {todayAssignment.learning_units?.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowLectureModal(false)}
                    className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto py-6 pr-2">
                  <FormattedContent
                    text={todayAssignment.learning_units?.lecture_content_markdown || ''}
                    className="text-slate-200 text-sm leading-relaxed"
                  />
                </div>

                <div className="border-t border-slate-800 pt-4 flex justify-end">
                  <button
                    onClick={() => setShowLectureModal(false)}
                    className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold rounded-xl transition"
                  >
                    Đã Hiểu, Sẵn Sàng Làm Bài!
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </SpaceBackground>
    );
  }

  // Giao diện Bé An (Toán Lớp 2 - Kids Wonderland)
  return (
    <div className="min-h-screen bg-amber-50 text-slate-900 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-3xl p-6 bg-pink-100 border-2 border-pink-300 shadow-xl flex flex-col sm:flex-row items-center gap-6 mb-8">
          <img
            src="/images/kids/princess_math.png"
            alt="Toán lớp 1"
            className="w-32 h-32 object-cover rounded-2xl shadow-md border-2 border-pink-400"
          />
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-pink-700 font-serif">
              Chào Bé An Nhiên! 👑
            </h1>
            <p className="text-sm text-pink-900 mt-2 font-medium">
              Hôm nay chúng mình cùng học toán với Công Chúa và giải các câu đố rồng xanh nhé!
            </p>
          </div>
        </div>

        <h2 className="text-xl font-extrabold text-pink-800 mb-4">⭐ Bài Tập Của Bé Hôm Nay:</h2>

        {todayAssignment ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {todayAssignment.assessment_attempts?.map((att: any) => (
              <div key={att.id} className="p-6 rounded-3xl bg-white border-2 border-pink-200 shadow-lg">
                <span className="text-xs font-bold px-3 py-1 bg-pink-500 text-white rounded-full">
                  {att.assessments?.title}
                </span>
                <h3 className="text-lg font-bold text-slate-800 mt-3">
                  {att.assessments?.instructions || 'Bé bấm vào nút bên dưới để bắt đầu làm bài nhé!'}
                </h3>
                <Link
                  href={`/student/mission/${att.id}`}
                  className="mt-6 block w-full py-3 text-center bg-pink-500 hover:bg-pink-600 text-white font-extrabold text-base rounded-2xl shadow-[0_4px_0_#db2777] active:translate-y-1 transition"
                >
                  Bắt Đầu Làm Bài Ngay! 🎈
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 bg-white rounded-3xl text-center border-2 border-amber-200">
            <p className="text-pink-600 font-bold">Hôm nay bé chưa có bài tập mới. Chúc bé một ngày vui vẻ!</p>
          </div>
        )}
      </div>
    </div>
  );
}
