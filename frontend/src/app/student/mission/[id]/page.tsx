'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { api, getUser } from '@/lib/api';
import { FormattedContent } from '@/components/KatexMath';
import {
  Clock,
  Send,
  Upload,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Check,
  Grid,
  X,
  BookOpen,
  HelpCircle,
  Award,
} from 'lucide-react';

export default function MissionRoomPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const attemptId = resolvedParams.id;
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [attempt, setAttempt] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeLeft, setTimeLeft] = useState<number>(5400); // 90 mins default
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showGridDrawer, setShowGridDrawer] = useState(false);
  const [passageExpanded, setPassageExpanded] = useState(false);

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser || currentUser.role !== 'STUDENT') {
      router.push('/login');
      return;
    }
    setUser(currentUser);

    const initAttempt = async () => {
      try {
        await api.startAttempt(attemptId).catch(() => {});
        const data = await api.getAttemptDetails(attemptId);
        setAttempt(data);

        if (data.assessments?.time_limit_minutes) {
          const totalSecs = data.assessments.time_limit_minutes * 60;
          setTimeLeft(totalSecs);
        }

        if (data.student_answers && data.student_answers.length > 0) {
          const ansMap: Record<string, any> = {};
          data.student_answers.forEach((sa: any) => {
            ansMap[sa.question_id] = sa.answer_payload;
          });
          setAnswers(ansMap);
        }
      } catch (err: any) {
        alert(err.message || 'Lỗi tải bài tập');
      } finally {
        setLoading(false);
      }
    };

    initAttempt();
  }, [attemptId, router]);

  // Countdown Timer
  useEffect(() => {
    if (loading || !attempt) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, attempt]);

  const questions = attempt?.assessments?.questions || [];
  const totalQuestions = questions.length;
  const currentQ = questions[currentIndex] || null;

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (currentIndex < totalQuestions - 1) {
          setCurrentIndex((prev) => prev + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          setCurrentIndex((prev) => prev - 1);
        }
      } else if (['1', '2', '3', '4'].includes(e.key)) {
        const optionMap = ['A', 'B', 'C', 'D'];
        const chosen = optionMap[parseInt(e.key, 10) - 1];
        if (currentQ?.type === 'MULTIPLE_CHOICE' && chosen) {
          handleSelectOption(currentQ.id, chosen);
        }
      } else if (['a', 'b', 'c', 'd', 'A', 'B', 'C', 'D'].includes(e.key)) {
        const chosen = e.key.toUpperCase();
        if (currentQ?.type === 'MULTIPLE_CHOICE') {
          handleSelectOption(currentQ.id, chosen);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, totalQuestions, currentQ]);

  const handleSelectOption = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        selected_option_id: optionId,
      },
    }));
  };

  const handleFillText = (questionId: string, text: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        text,
      },
    }));
  };

  const handleEssayText = (questionId: string, textResponse: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        text_response: textResponse,
      },
    }));
  };

  const handleAddSampleImage = (questionId: string, imageUrl: string) => {
    setAnswers((prev) => {
      const currentImages = prev[questionId]?.image_urls || [];
      return {
        ...prev,
        [questionId]: {
          ...prev[questionId],
          image_urls: [...currentImages, imageUrl],
        },
      };
    });
  };

  const handleSubmit = async () => {
    const answeredCount = Object.keys(answers).length;
    const confirm = window.confirm(
      `Con đã làm ${answeredCount}/${totalQuestions} câu hỏi. Con có chắc chắn muốn nộp bài không?`
    );
    if (!confirm) return;

    setSubmitting(true);
    try {
      const formattedAnswers = Object.entries(answers).map(([qId, payload]) => ({
        questionId: qId,
        answerPayload: payload,
      }));

      const timeSpent = (attempt.assessments?.time_limit_minutes || 90) * 60 - timeLeft;

      await api.submitAttempt({
        attemptId,
        answers: formattedAnswers,
        timeSpentSeconds: Math.max(timeSpent, 60),
      });

      alert('🎉 Nộp bài thành công! Thầy Thức đã nhận được bài làm của con.');
      router.push('/student');
    } catch (err: any) {
      alert(`Nộp bài thất bại: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isCosmic =
    user?.username === 'keithley' ||
    user?.studentProfile?.grade_level === 7 ||
    user?.studentProfile?.grade_level === 9;

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isCosmic ? 'bg-[#05070E] text-cyan-400' : 'bg-slate-50 text-slate-600'
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium">Đang nạp đề bài luyện tập...</span>
        </div>
      </div>
    );
  }

  const currentAnswer = currentQ ? answers[currentQ.id] || {} : {};
  const progressPercent = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;
  const answeredCount = questions.filter((q: any) => {
    const ans = answers[q.id];
    return ans && (ans.selected_option_id || ans.text || ans.text_response || (ans.image_urls && ans.image_urls.length > 0));
  }).length;

  return (
    <div
      className={`min-h-[100dvh] flex flex-col justify-between ${
        isCosmic ? 'bg-[#05070E] text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* 1. TOP HEADER (Fixed / Sticky on Mobile) */}
      <header
        className={`sticky top-0 z-30 px-3 sm:px-6 py-2.5 sm:py-3 border-b backdrop-blur-md transition-colors ${
          isCosmic
            ? 'bg-[#05070E]/90 border-cyan-500/30 text-white'
            : 'bg-white/95 border-slate-200 text-slate-900 shadow-xs'
        }`}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
          {/* Back button */}
          <button
            onClick={() => {
              if (window.confirm('Con có chắc muốn rời phòng làm bài không? Bài làm chưa nộp sẽ cần làm lại.')) {
                router.push('/student');
              }
            }}
            className={`flex items-center space-x-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-xl transition ${
              isCosmic
                ? 'text-slate-300 hover:bg-slate-800'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Rời phòng</span>
          </button>

          {/* Center Timer & Drawer Button */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Timer Badge */}
            <div
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-xl font-mono text-xs sm:text-sm font-bold border ${
                timeLeft < 600
                  ? 'bg-red-50 border-red-300 text-red-600 animate-pulse'
                  : isCosmic
                  ? 'bg-cyan-950/80 border-cyan-500/50 text-cyan-400'
                  : 'bg-slate-100 border-slate-200 text-slate-800'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTimer(timeLeft)}</span>
            </div>

            {/* Question count toggle drawer */}
            <button
              onClick={() => setShowGridDrawer(true)}
              className={`flex items-center space-x-1 px-3 py-1 rounded-xl text-xs font-semibold border transition ${
                isCosmic
                  ? 'bg-slate-900 border-cyan-500/30 text-cyan-300 hover:bg-slate-800'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
              title="Xem toàn bộ câu hỏi"
            >
              <Grid className="w-3.5 h-3.5" />
              <span>
                Câu <strong>{currentIndex + 1}</strong>/{totalQuestions}
              </span>
            </button>
          </div>

          {/* Quick Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className={`py-1.5 px-3.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition shadow-xs disabled:opacity-40 ${
              isCosmic
                ? 'bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>{submitting ? '...' : 'Nộp bài'}</span>
          </button>
        </div>

        {/* Progress Bar Line */}
        <div className="w-full bg-slate-200/60 dark:bg-slate-800 h-1 mt-2.5 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              isCosmic ? 'bg-cyan-400' : 'bg-blue-600'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* 2. MAIN SINGLE-QUESTION VIEW (Compact, No scroll needed) */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-3.5 sm:px-6 py-4 flex flex-col justify-center">
        {currentQ ? (
          <div
            className={`rounded-2xl sm:rounded-3xl p-4 sm:p-7 border shadow-sm transition flex flex-col justify-between ${
              isCosmic
                ? 'bg-[#0A0E1A]/95 border-cyan-500/30 text-slate-100 shadow-[0_0_25px_rgba(6,182,212,0.1)]'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Header of Question */}
            <div className="flex items-center justify-between border-b pb-3 mb-3 border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2">
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    isCosmic
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/30'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}
                >
                  {currentQ.question_payload?.sectionName ||
                    (currentQ.type === 'MULTIPLE_CHOICE'
                      ? 'Trắc nghiệm'
                      : currentQ.type === 'FILL_IN_BLANK'
                      ? 'Điền từ'
                      : 'Tự luận')}
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                  Câu {currentIndex + 1} của {totalQuestions}
                </span>
              </div>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                {currentQ.points} điểm
              </span>
            </div>

            {/* Optional Collapsible Passage (Reading Cloze / Comprehension) */}
            {currentQ.question_payload?.passage && (
              <div className="mb-3">
                <button
                  type="button"
                  onClick={() => setPassageExpanded(!passageExpanded)}
                  className={`w-full py-1.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition ${
                    isCosmic
                      ? 'bg-slate-800/80 border-cyan-500/30 text-cyan-300'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center space-x-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    <span>Bài đọc hiểu (Reading Passage)</span>
                  </span>
                  <span className="text-blue-600 font-bold">
                    {passageExpanded ? '▲ Thu gọn' : '▼ Bấm để đọc'}
                  </span>
                </button>

                {passageExpanded && (
                  <div
                    className={`mt-2 p-3.5 rounded-xl border max-h-48 overflow-y-auto text-xs leading-relaxed font-sans ${
                      isCosmic
                        ? 'bg-slate-900 border-slate-800 text-slate-200'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <FormattedContent text={currentQ.question_payload.passage} />
                  </div>
                )}
              </div>
            )}

            {/* Question Stem / Content */}
            <div className="text-sm sm:text-base font-semibold leading-relaxed mb-4 text-slate-900 dark:text-slate-100">
              <FormattedContent
                text={
                  currentQ.question_payload?.content_markdown ||
                  currentQ.question_payload?.prompt_markdown ||
                  ''
                }
              />
            </div>

            {/* Options Area */}
            <div className="space-y-2.5">
              {/* MULTIPLE_CHOICE OPTIONS */}
              {currentQ.type === 'MULTIPLE_CHOICE' && currentQ.question_payload?.options && (
                <div className="grid grid-cols-1 gap-2.5">
                  {currentQ.question_payload.options.map((opt: any) => {
                    const isSelected = currentAnswer.selected_option_id === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelectOption(currentQ.id, opt.id)}
                        className={`w-full p-3 sm:p-3.5 rounded-xl text-left border text-xs sm:text-sm font-medium transition-all flex items-center justify-between active:scale-[0.99] ${
                          isSelected
                            ? isCosmic
                              ? 'bg-cyan-950 border-cyan-400 text-white shadow-sm ring-1 ring-cyan-400'
                              : 'bg-blue-50 border-blue-600 text-blue-950 ring-1 ring-blue-600 shadow-xs'
                            : isCosmic
                            ? 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                            : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300 shadow-2xs'
                        }`}
                      >
                        <div className="flex items-center space-x-3 pr-2 min-w-0">
                          <span
                            className={`w-7 h-7 flex-shrink-0 rounded-lg flex items-center justify-center font-bold text-xs transition-colors ${
                              isSelected
                                ? isCosmic
                                  ? 'bg-cyan-500 text-slate-950'
                                  : 'bg-blue-600 text-white'
                                : isCosmic
                                ? 'bg-slate-700 text-slate-300'
                                : 'bg-slate-100 text-slate-700 border border-slate-200'
                            }`}
                          >
                            {opt.id}
                          </span>
                          <span className="leading-snug break-words">
                            <FormattedContent text={opt.text} />
                          </span>
                        </div>
                        {isSelected && (
                          <Check
                            className={`w-4 h-4 flex-shrink-0 ${
                              isCosmic ? 'text-cyan-400' : 'text-blue-600'
                            }`}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* FILL_IN_BLANK INPUT */}
              {currentQ.type === 'FILL_IN_BLANK' && (
                <div>
                  <input
                    type="text"
                    placeholder="Gõ đáp số hoặc từ của con vào đây..."
                    value={currentAnswer.text || ''}
                    onChange={(e) => handleFillText(currentQ.id, e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>
              )}

              {/* ESSAY_UPLOAD INPUT */}
              {currentQ.type === 'ESSAY_UPLOAD' && (
                <div className="space-y-3">
                  <textarea
                    rows={3}
                    placeholder="Gõ lời giải ngắn gọn tại đây..."
                    value={currentAnswer.text_response || ''}
                    onChange={(e) => handleEssayText(currentQ.id, e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddSampleImage(currentQ.id, '/images/kids/princess_math.png')}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold flex items-center space-x-1.5 border border-blue-200"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Đính kèm ảnh bài làm</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500">Đang nạp câu hỏi...</div>
        )}
      </main>

      {/* 3. BOTTOM CONTROL BAR (Thumb-friendly on Mobile) */}
      <footer
        className={`sticky bottom-0 z-30 px-3.5 sm:px-6 py-2.5 sm:py-3 border-t backdrop-blur-md ${
          isCosmic
            ? 'bg-[#05070E]/95 border-cyan-500/20'
            : 'bg-white/95 border-slate-200/90 shadow-sm'
        }`}
      >
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-2">
          {/* Previous Button */}
          <button
            type="button"
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className={`px-3.5 sm:px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold flex items-center space-x-1.5 transition disabled:opacity-40 disabled:cursor-not-allowed ${
              isCosmic
                ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Câu trước</span>
          </button>

          {/* Quick status pill */}
          <div className="text-center">
            <span className="text-[11px] text-slate-600 dark:text-slate-300 font-medium block">
              Đã làm: <strong className="text-blue-600">{answeredCount}</strong>/{totalQuestions}
            </span>
          </div>

          {/* Next or Finish Button */}
          {currentIndex < totalQuestions - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-1.5 transition shadow-sm active:scale-95 ${
                isCosmic
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <span>Câu tiếp theo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center space-x-1.5 transition shadow-sm active:scale-95 disabled:opacity-50"
            >
              <span>{submitting ? 'Đang nộp...' : 'Hoàn tất & Nộp'}</span>
              <Send className="w-4 h-4" />
            </button>
          )}
        </div>
      </footer>

      {/* 4. QUESTION DRAWER MODAL (Jump to any question) */}
      {showGridDrawer && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/50 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-150">
          <div
            className={`w-full max-w-lg rounded-t-3xl sm:rounded-3xl border p-5 sm:p-6 shadow-2xl max-h-[80vh] flex flex-col ${
              isCosmic
                ? 'bg-[#0A0E1A] border-cyan-500/40 text-white'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between border-b pb-3 mb-4 border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-bold text-sm">Danh Sách Câu Hỏi</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                  Đã trả lời {answeredCount} trên tổng số {totalQuestions} câu
                </p>
              </div>
              <button
                onClick={() => setShowGridDrawer(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Grid of numbers */}
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 overflow-y-auto p-1 flex-1">
              {questions.map((q: any, i: number) => {
                const ans = answers[q.id];
                const hasAnswer =
                  ans &&
                  (ans.selected_option_id ||
                    ans.text ||
                    ans.text_response ||
                    (ans.image_urls && ans.image_urls.length > 0));
                const isCurrent = i === currentIndex;

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => {
                      setCurrentIndex(i);
                      setShowGridDrawer(false);
                    }}
                    className={`h-10 rounded-xl text-xs font-bold transition flex items-center justify-center relative ${
                      isCurrent
                        ? 'ring-2 ring-blue-600 ring-offset-2'
                        : ''
                    } ${
                      hasAnswer
                        ? isCosmic
                          ? 'bg-cyan-500 text-slate-950 font-black'
                          : 'bg-blue-600 text-white'
                        : isCosmic
                        ? 'bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700'
                        : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-md bg-blue-600" />
                <span>Đã làm</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-md bg-slate-200" />
                <span>Chưa làm</span>
              </div>
              <button
                type="button"
                onClick={() => setShowGridDrawer(false)}
                className="px-4 py-1.5 rounded-lg bg-slate-900 text-white font-medium text-xs"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
