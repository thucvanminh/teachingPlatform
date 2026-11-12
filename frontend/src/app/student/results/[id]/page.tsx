'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { api, getUser } from '@/lib/api';
import { SpaceBackground } from '@/components/SpaceBackground';
import { FormattedContent } from '@/components/KatexMath';
import {
  Rocket,
  Award,
  Star,
  ArrowLeft,
  MessageSquare,
  CheckCircle,
  XCircle,
  Trophy,
  Target,
  Clock,
  Check,
  X,
  Filter,
  Sparkles,
  BookOpen,
  Quote,
  HelpCircle,
  GraduationCap,
} from 'lucide-react';

export default function StudentResultPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const attemptId = resolvedParams.id;
  const router = useRouter();

  const [attempt, setAttempt] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'WRONG' | 'CORRECT' | 'UNANSWERED'>('ALL');

  useEffect(() => {
    const user = getUser();
    if (!user) {
      router.push('/login');
      return;
    }

    const load = async () => {
      try {
        const data = await api.getAttemptDetails(attemptId);
        setAttempt(data);
      } catch (e: any) {
        alert(e.message || 'Lỗi tải kết quả');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [attemptId, router]);

  const user = getUser();
  const isCosmic =
    user?.username === 'keithley' ||
    user?.full_name?.toLowerCase().includes('keithley') ||
    user?.fullName?.toLowerCase().includes('keithley') ||
    attempt?.users_assessment_attempts_student_idTousers?.username === 'keithley' ||
    attempt?.users_assessment_attempts_student_idTousers?.full_name?.toLowerCase().includes('keithley') ||
    attempt?.assessments?.learning_units?.subjects?.code === 'MATH_7' ||
    attempt?.assessments?.learning_units?.subjects?.code === 'CHEM_9';

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-cyan-400">
        <Rocket className="w-8 h-8 animate-bounce mr-3" />
        <span>{isCosmic ? 'Loading mission debrief...' : 'Đang tải kết quả bài làm...'}</span>
      </div>
    );
  }

  const questions = attempt?.assessments?.questions || [];
  const answersMap = new Map<string, any>((attempt?.student_answers || []).map((a: any) => [a.question_id, a]));
  const answeredCount = attempt?.student_answers?.length || 0;
  const totalQuestions = questions.length;

  const correctCount = questions.filter((q: any) => (answersMap.get(q.id) as any)?.is_correct === true).length;
  const wrongCount = questions.filter((q: any) => (answersMap.get(q.id) as any)?.is_correct === false).length;
  const unansweredCount = questions.filter((q: any) => !answersMap.get(q.id)).length;

  const maxScore = attempt?.assessments?.max_score || 10;
  const scorePercent = maxScore > 0 ? Math.round((attempt.total_score / maxScore) * 100) : 0;

  // Đánh giá xếp loại học lực cho học sinh THPT
  const getGradeRating = (score: number, max: number) => {
    const ratio = max > 0 ? score / max : 0;
    if (ratio >= 0.85) return { label: 'Xuất Sắc • Mức 8.5+', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (ratio >= 0.7) return { label: 'Đạt Mục Tiêu • Mức 7.0+', color: 'text-blue-700 bg-blue-50 border-blue-200' };
    if (ratio >= 0.5) return { label: 'Khá • Cần Bứt Phá', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    return { label: 'Cần Ôn Luyện Lại', color: 'text-rose-700 bg-rose-50 border-rose-200' };
  };

  const rating = getGradeRating(attempt.total_score, maxScore);

  const displayedQuestions = questions.filter((q: any) => {
    const ans = answersMap.get(q.id);
    if (filter === 'CORRECT') return ans?.is_correct === true;
    if (filter === 'WRONG') return ans?.is_correct === false;
    if (filter === 'UNANSWERED') return !ans;
    return true;
  });

  // ==========================================
  // 1. GIAO DIỆN VŨ TRỤ CHO KEITHLEY (COSMIC)
  // ==========================================
  if (isCosmic) {
    return (
      <SpaceBackground>
        <div className="max-w-4xl mx-auto px-4 py-10">
          <button
            onClick={() => router.push('/student')}
            className="flex items-center space-x-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Mission Control</span>
          </button>

          {/* Score Banner */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900/90 via-slate-900/95 to-slate-900/90 border border-cyan-500/40 backdrop-blur-xl shadow-[0_0_35px_rgba(6,182,212,0.2)] mb-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">
                MISSION DEBRIEF & SUMMARY
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {attempt.assessments?.title}
              </h1>
              <p className="text-xs text-slate-400 mt-2">
                Astronaut: {attempt.users_assessment_attempts_student_idTousers?.full_name}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                  Completed: {answeredCount}/{totalQuestions} problems
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                  Time: {Math.floor((attempt.time_spent_seconds || 0) / 60)} mins
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 rounded-2xl bg-slate-800/80 border border-cyan-500/30">
              <Award className="w-10 h-10 text-amber-400" />
              <div className="text-right">
                <span className="text-xs text-slate-400 block font-semibold">
                  TOTAL SCORE
                </span>
                <span className="text-3xl font-black text-cyan-400">
                  {attempt.total_score}{' '}
                  <span className="text-sm text-slate-400 font-normal">/ {maxScore}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Teacher Feedback Message */}
          {attempt.overall_feedback && (
            <div className="p-6 rounded-3xl bg-purple-950/40 border border-purple-500/40 backdrop-blur-xl mb-10 flex items-start space-x-4">
              <MessageSquare className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-sm font-bold text-purple-300">
                  Mission Evaluation & Feedback from Command (Tutor Thức)
                </h3>
                <p className="text-slate-200 text-sm mt-1 italic leading-relaxed">
                  "{attempt.overall_feedback}"
                </p>
              </div>
            </div>
          )}

          {/* Question by Question Review */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-200">
              Question-by-Question Flight Review & Solutions:
            </h2>

            {questions.map((q: any, idx: number) => {
              const studentAns = answersMap.get(q.id) as any;
              const hasAnswered = !!studentAns;
              const isCorrect = studentAns?.is_correct;
              const pointsEarned = studentAns?.awarded_points || 0;

              return (
                <div
                  key={q.id}
                  className={`p-6 rounded-3xl border backdrop-blur-xl ${
                    !hasAnswered
                      ? 'bg-slate-900/40 border-slate-800/60'
                      : 'bg-slate-900/80 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <span className="text-sm font-bold text-white flex items-center space-x-2">
                      {!hasAnswered ? (
                        <span className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[10px] text-slate-400 font-mono">
                          -
                        </span>
                      ) : isCorrect === true ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      ) : isCorrect === false ? (
                        <XCircle className="w-4 h-4 text-red-400" />
                      ) : (
                        <Star className="w-4 h-4 text-amber-400" />
                      )}
                      <span>Question {idx + 1}</span>
                      {!hasAnswered && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                          Skipped / Unanswered
                        </span>
                      )}
                    </span>
                    <span className={`text-xs font-bold ${hasAnswered ? 'text-cyan-400' : 'text-slate-500'}`}>
                      Score: {pointsEarned} / {q.points} pts
                    </span>
                  </div>

                  <div className="text-slate-200 text-sm mb-4">
                    <FormattedContent text={q.question_payload?.content_markdown || q.question_payload?.prompt_markdown || ''} />
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 mb-3">
                    <span className="font-bold text-slate-400 block mb-1">
                      Cadet Submission:
                    </span>
                    {!hasAnswered ? (
                      <span className="italic text-slate-500 block">
                        No answer submitted for this question (skipped during mission).
                      </span>
                    ) : studentAns?.answer_payload?.selected_option_id ? (
                      <span className="font-bold text-cyan-400 text-sm">
                        Selected Option: {studentAns.answer_payload.selected_option_id}
                      </span>
                    ) : (
                      <span>{studentAns?.answer_payload?.text || studentAns?.answer_payload?.text_response || 'Written response'}</span>
                    )}
                  </div>

                  {studentAns?.teacher_comment && (
                    <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-300 mb-3">
                      <span className="font-bold block mb-1">Instructor Feedback:</span>
                      <p className="italic">"{studentAns.teacher_comment}"</p>
                    </div>
                  )}

                  {q.grading_key_payload?.explanation_markdown && (
                    <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 text-xs text-slate-300">
                      <span className="font-bold text-amber-400 block mb-1">
                        Step-by-Step Solution & Key:
                      </span>
                      <FormattedContent text={q.grading_key_payload.explanation_markdown} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </SpaceBackground>
    );
  }

  // ==========================================
  // 2. GIAO DIỆN HỌC THUẬT CHO THÁI & NAM VIỆT
  // (ACADEMIC PERFORMANCE SCORECARD - TASTE SKILL)
  // ==========================================
  const studentName = attempt?.users_assessment_attempts_student_idTousers?.full_name || 'Học Sinh';
  const timeSpentMins = Math.max(1, Math.round((attempt.time_spent_seconds || 0) / 60));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-8 sm:py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push('/student')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-blue-700 bg-white border border-slate-200 px-4 py-2 rounded-xl transition shadow-xs hover:shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Về Bảng Điều Khiển</span>
          </button>

          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            Học sinh: <strong className="text-slate-800">{studentName}</strong>
          </span>
        </div>

        {/* =========================================================
            HERO SCORECARD: TASTE SKILL ACADEMIC RESULTS
            ========================================================= */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200/90 shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 transition hover:shadow-md">
          <div className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 absolute top-0 left-0 right-0" />

          <div className="space-y-2 max-w-xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-0.5 rounded-full border border-blue-200/80">
                BẢNG BÁO CÁO KẾT QUẢ BÀI LÀM
              </span>
              <span className={`text-xs font-extrabold px-3 py-0.5 rounded-full border ${rating.color}`}>
                {rating.label}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {attempt.assessments?.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-500">
              Bài nộp được ghi nhận và chấm điểm tự động kết hợp đánh giá chi tiết từ Thầy Thức.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold border border-slate-200 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Thời gian: {timeSpentMins} phút</span>
              </span>
              <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-800 font-bold border border-blue-200 flex items-center gap-1.5 font-mono">
                <Check className="w-3.5 h-3.5 text-blue-600" />
                <span>Đã làm: {answeredCount}/{totalQuestions} câu</span>
              </span>
            </div>
          </div>

          {/* Big Score Block */}
          <div className="flex items-center gap-4 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-md border border-slate-800 shrink-0 min-w-[220px]">
            <Trophy className="w-12 h-12 text-amber-400 shrink-0" />
            <div>
              <span className="text-xs text-slate-400 uppercase font-extrabold tracking-wider block">
                TỔNG ĐIỂM ĐẠT ĐƯỢC
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400">
                  {attempt.total_score}
                </span>
                <span className="text-base text-slate-400 font-mono">/ {maxScore}</span>
              </div>
              <span className="text-xs text-slate-300 font-semibold mt-1 block">
                Độ chính xác: <strong className="text-amber-300 font-mono">{scorePercent}%</strong>
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================
            METRICS STRIP (ĐÚNG / SAI / CHƯA LÀM)
            ========================================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
            <span className="text-xs text-slate-500 font-semibold block mb-1">Tổng Số Câu</span>
            <span className="text-xl font-extrabold text-slate-900 font-mono block">{totalQuestions}</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center shadow-xs">
            <span className="text-xs text-emerald-800 font-bold block mb-1">Số Câu Đúng</span>
            <span className="text-xl font-extrabold text-emerald-700 font-mono block">
              ✅ {correctCount}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 text-center shadow-xs">
            <span className="text-xs text-rose-800 font-bold block mb-1">Số Câu Sai</span>
            <span className="text-xl font-extrabold text-rose-700 font-mono block">
              ❌ {wrongCount}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center shadow-xs">
            <span className="text-xs text-slate-500 font-semibold block mb-1">Chưa Trả Lời</span>
            <span className="text-xl font-extrabold text-slate-600 font-mono block">
              ⚪ {unansweredCount}
            </span>
          </div>
        </div>

        {/* =========================================================
            TEACHER'S EVALUATION FEEDBACK
            ========================================================= */}
        {attempt.overall_feedback && (
          <div className="p-6 rounded-3xl bg-amber-50/80 border border-amber-200/90 shadow-xs flex items-start gap-4">
            <Quote className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div className="space-y-1">
              <h3 className="text-sm font-extrabold text-amber-900 uppercase tracking-wider">
                Nhận xét & Định hướng cải thiện từ Thầy Thức:
              </h3>
              <p className="text-slate-800 text-sm leading-relaxed italic font-medium">
                "{attempt.overall_feedback}"
              </p>
            </div>
          </div>
        )}

        {/* =========================================================
            QUESTION-BY-QUESTION DEBRIEF WITH QUICK FILTER
            ========================================================= */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Chi Tiết Từng Câu Hỏi & Lời Giải Thích
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Xem lại phương án đã chọn, đối chiếu đáp án chính xác và rút kinh nghiệm từ lời giải chi tiết.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-center shrink-0">
              <button
                type="button"
                onClick={() => setFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  filter === 'ALL'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tất cả ({totalQuestions})
              </button>
              <button
                type="button"
                onClick={() => setFilter('WRONG')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  filter === 'WRONG'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-rose-700 hover:bg-rose-50'
                }`}
              >
                Câu sai ({wrongCount})
              </button>
              <button
                type="button"
                onClick={() => setFilter('CORRECT')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  filter === 'CORRECT'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                Câu đúng ({correctCount})
              </button>
              {unansweredCount > 0 && (
                <button
                  type="button"
                  onClick={() => setFilter('UNANSWERED')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    filter === 'UNANSWERED'
                      ? 'bg-slate-700 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Chưa làm ({unansweredCount})
                </button>
              )}
            </div>
          </div>

          {displayedQuestions.length > 0 ? (
            <div className="space-y-6">
              {displayedQuestions.map((q: any) => {
                const originalIndex = questions.findIndex((item: any) => item.id === q.id);
                const studentAns = answersMap.get(q.id) as any;
                const hasAnswered = !!studentAns;
                const isCorrect = studentAns?.is_correct;
                const pointsEarned = studentAns?.awarded_points || 0;

                const correctOptionId = (
                  q.grading_key_payload?.correct_option_id ||
                  q.question_payload?.correct_option_id ||
                  ''
                ).toString().trim().toUpperCase();

                const studentOptionId = (
                  studentAns?.answer_payload?.selected_option_id || ''
                ).toString().trim().toUpperCase();

                return (
                  <div
                    key={q.id}
                    className={`p-6 rounded-3xl border transition duration-200 bg-white shadow-xs ${
                      !hasAnswered
                        ? 'border-slate-200'
                        : isCorrect === true
                        ? 'border-emerald-200 hover:border-emerald-300 ring-1 ring-emerald-100'
                        : 'border-rose-200 hover:border-rose-300 ring-1 ring-rose-100'
                    }`}
                  >
                    {/* Header Card */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                      <div className="flex items-center space-x-2.5">
                        <span
                          className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                            !hasAnswered
                              ? 'bg-slate-100 text-slate-500'
                              : isCorrect === true
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {originalIndex + 1}
                        </span>

                        <span className="font-extrabold text-slate-900 text-sm">
                          Câu {originalIndex + 1}
                        </span>

                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                            !hasAnswered
                              ? 'bg-slate-100 text-slate-600 border border-slate-200'
                              : isCorrect === true
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {!hasAnswered ? (
                            <span>Chưa làm</span>
                          ) : isCorrect === true ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Chính xác</span>
                            </>
                          ) : (
                            <>
                              <X className="w-3.5 h-3.5" />
                              <span>Chưa chính xác</span>
                            </>
                          )}
                        </span>
                      </div>

                      <span className="text-xs font-bold font-mono text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                        {pointsEarned} / {q.points} điểm
                      </span>
                    </div>

                    {/* Question Content */}
                    <div className="text-slate-900 text-sm sm:text-base font-medium leading-relaxed mb-4">
                      <FormattedContent text={q.question_payload?.content_markdown || q.question_payload?.prompt_markdown || ''} />
                    </div>

                    {/* Options list if MULTIPLE_CHOICE */}
                    {q.type === 'MULTIPLE_CHOICE' && q.question_payload?.options && (
                      <div className="space-y-2 mb-4">
                        {q.question_payload.options.map((opt: any) => {
                          const optId = opt.id.toString().trim().toUpperCase();
                          const isStudentChoice = studentOptionId === optId;
                          const isTargetCorrect = correctOptionId === optId;

                          let optionStyle = 'border-slate-200 bg-slate-50 text-slate-700';
                          if (isTargetCorrect) {
                            optionStyle = 'border-emerald-300 bg-emerald-50/80 text-emerald-900 font-bold ring-1 ring-emerald-200';
                          } else if (isStudentChoice && !isTargetCorrect) {
                            optionStyle = 'border-rose-300 bg-rose-50/80 text-rose-900 font-bold ring-1 ring-rose-200';
                          }

                          return (
                            <div
                              key={opt.id}
                              className={`p-3 rounded-xl border flex items-center justify-between text-xs sm:text-sm ${optionStyle}`}
                            >
                              <div className="flex items-center space-x-2.5">
                                <span className="w-6 h-6 rounded-lg bg-white border border-slate-300 font-bold font-mono text-xs flex items-center justify-center">
                                  {opt.id}
                                </span>
                                <span>{opt.text}</span>
                              </div>

                              <div className="flex items-center gap-2">
                                {isStudentChoice && (
                                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                                    Phương án bạn chọn
                                  </span>
                                )}
                                {isTargetCorrect && (
                                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-600 text-white flex items-center gap-1">
                                    <Check className="w-3 h-3" /> Đáp án đúng
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Student Written / Numerical Answer if not multiple choice */}
                    {q.type !== 'MULTIPLE_CHOICE' && (
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 mb-4">
                        <span className="font-bold text-slate-600 block mb-1">
                          Câu trả lời của bạn:
                        </span>
                        {!hasAnswered ? (
                          <span className="italic text-slate-500">Chưa nhập câu trả lời khi nộp bài.</span>
                        ) : (
                          <span className="font-semibold text-slate-900">
                            {studentAns?.answer_payload?.text || studentAns?.answer_payload?.text_response || 'Đã nộp bài giải'}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Teacher's specific comment on this question */}
                    {studentAns?.teacher_comment && (
                      <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 mb-3 flex items-start gap-2">
                        <MessageSquare className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-extrabold block text-blue-950">Ghi chú từ Thầy:</span>
                          <p className="italic font-medium">"{studentAns.teacher_comment}"</p>
                        </div>
                      </div>
                    )}

                    {/* Detailed Explanation / Key Takeaways */}
                    {q.grading_key_payload?.explanation_markdown && (
                      <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-xs sm:text-sm text-slate-800">
                        <span className="font-extrabold text-amber-900 block mb-1.5 flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4 text-amber-700" />
                          <span>Giải thích chi tiết & Bẫy cần lưu ý:</span>
                        </span>
                        <div className="leading-relaxed text-slate-700">
                          <FormattedContent text={q.grading_key_payload.explanation_markdown} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-10 bg-white rounded-3xl border border-slate-200 text-center">
              <p className="text-slate-500 font-medium">Không có câu hỏi nào khớp với bộ lọc hiện tại.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
