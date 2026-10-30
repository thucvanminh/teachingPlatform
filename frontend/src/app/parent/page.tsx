'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, getUser } from '@/lib/api';
import { FormattedContent } from '@/components/KatexMath';
import {
  Eye,
  ShieldCheck,
  CheckCircle,
  Clock,
  Award,
  BookOpen,
  Calendar,
  Lock,
} from 'lucide-react';

export default function ParentDashboard() {
  const router = useRouter();
  const [childrenAssignments, setChildrenAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<'vi' | 'en'>('vi');
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const user = getUser();
    if (!user || user.role !== 'PARENT') {
      router.push('/login');
      return;
    }
    setCurrentUser(user);
    if (user.username === 'parent_keithley' || user.username?.includes('keithley')) {
      setLang('en');
    }

    const loadData = async () => {
      try {
        const data = await api.getParentChildren();
        setChildrenAssignments(data);
        if (data.some((a: any) => a.users_daily_student_assignments_student_idTousers?.username === 'keithley')) {
          setLang('en');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-600 flex items-center justify-center p-8 text-sm">
        {lang === 'en' ? 'Loading Parent Portal...' : 'Đang tải cổng phụ huynh...'}
      </div>
    );
  }

  const isEn = lang === 'en';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Banner Read-Only */}
        <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 relative">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                {isEn ? 'PARENT PORTAL • READ-ONLY' : 'CỔNG PHỤ HUYNH • READ-ONLY PORTAL'}
              </span>
              <h1 className="text-2xl font-bold text-slate-900 mt-0.5">
                {isEn ? "Monitor Your Child's Learning Progress" : 'Theo Dõi Tiến Độ Học Tập Của Con'}
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Language Switcher */}
            <div className="flex items-center space-x-1 p-1 bg-white border border-emerald-200 rounded-xl text-xs font-semibold shadow-xs">
              <button
                type="button"
                onClick={() => setLang('vi')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  !isEn ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tiếng Việt
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  isEn ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                English
              </button>
            </div>

            <div className="hidden sm:flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-white border border-emerald-200 text-emerald-800 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{isEn ? 'Read-Only Access' : 'Quyền Chỉ Đọc (Không can thiệp bài làm)'}</span>
            </div>
          </div>
        </div>

        {/* Lộ trình & Kết quả bài tập của các con */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <span>{isEn ? 'Daily Learning & Mission Progress:' : 'Nhật Ký Học Tập Hàng Ngày Của Con:'}</span>
          </h2>

          {childrenAssignments.length === 0 ? (
            <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center text-slate-500 text-sm shadow-sm">
              {isEn
                ? 'No student learning records currently linked to this parent account.'
                : 'Hiện tại chưa có dữ liệu buổi học nào được liên kết với tài khoản phụ huynh.'}
            </div>
          ) : (
            childrenAssignments.map((asgn) => {
              const studentName = asgn.users_daily_student_assignments_student_idTousers?.full_name;
              const dateStr = new Date(asgn.assigned_date).toLocaleDateString(isEn ? 'en-US' : 'vi-VN');

              return (
                <div key={asgn.id} className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
                  {/* Header ngày học */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-xs font-bold text-emerald-700">
                        {isEn ? `Student: ${studentName} • Date: ${dateStr}` : `Học sinh: ${studentName} • Ngày ${dateStr}`}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 mt-1">{asgn.learning_units?.title}</h3>
                    </div>

                    <div className="text-xs text-slate-500">
                      {asgn.lecture_viewed_at ? (
                        <span className="text-emerald-700 flex items-center space-x-1 font-semibold">
                          <CheckCircle className="w-4 h-4" />
                          <span>{isEn ? 'Student reviewed Flight Briefing' : 'Bé đã xem bài giảng'}</span>
                        </span>
                      ) : (
                        <span className="text-slate-400">
                          {isEn ? 'Flight Briefing pending review' : 'Chưa mở xem bài giảng'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Lời dặn dò của giáo viên */}
                  {asgn.teacher_daily_note && (
                    <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 italic">
                      💬 <strong>{isEn ? 'Tutor Command Note (Thầy Thức):' : 'Lời dặn của Thầy Thức:'}</strong> "{asgn.teacher_daily_note}"
                    </div>
                  )}

                  {/* Danh sách bài tập và điểm số con đạt được */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {asgn.assessment_attempts?.map((att: any) => {
                      const isDone = att.status === 'GRADED';
                      const isSub = att.status === 'SUBMITTED';
                      const answeredCount = att._count?.student_answers ?? att.student_answers?.length ?? 0;
                      const totalQuestions = att.assessments?._count?.questions ?? att.assessments?.questions?.length ?? 0;

                      return (
                        <div key={att.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-700">{att.assessments?.title}</span>
                            <span
                              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                                isDone
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                  : isSub
                                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                  : 'bg-slate-200 text-slate-600'
                              }`}
                            >
                              {isDone
                                ? (isEn ? 'Graded & Evaluated' : 'Đã chấm điểm')
                                : isSub
                                ? (isEn ? `Submitted (${answeredCount}/${totalQuestions})` : `Đã nộp (${answeredCount}/${totalQuestions} câu)`)
                                : (isEn ? 'Not Started' : 'Chưa làm')}
                            </span>
                          </div>

                          {(isDone || isSub) && (
                            <div className="p-2 rounded-xl bg-white border border-slate-200 text-xs flex items-center justify-between">
                              <span className="text-slate-500">{isEn ? 'Progress:' : 'Số câu đã hoàn thành:'}</span>
                              <span className="font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                                {answeredCount} / {totalQuestions} {isEn ? 'questions' : 'câu'}
                              </span>
                            </div>
                          )}

                          {isDone ? (
                            <div className="space-y-1">
                              <p className="text-sm font-bold text-slate-900 flex items-center space-x-1">
                                <Award className="w-4 h-4 text-amber-500" />
                                <span>
                                  {isEn ? 'Score: ' : 'Điểm: '}{att.total_score} / {att.assessments?.max_score}
                                </span>
                              </p>
                              {att.overall_feedback && (
                                <p className="text-xs text-slate-600 italic">
                                  {isEn ? 'Feedback: ' : 'Nhận xét: '}"{att.overall_feedback}"
                                </p>
                              )}
                            </div>
                          ) : (
                            <p className="text-xs text-slate-500">
                              {isSub
                                ? (isEn ? 'Submission awaiting tutor evaluation' : 'Bài làm đang đợi thầy chấm điểm tự luận')
                                : (isEn ? 'No submission recorded yet' : 'Chưa có kết quả làm bài')}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
