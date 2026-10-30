'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { api, getUser } from '@/lib/api';
import { FormattedContent } from '@/components/KatexMath';
import { SpaceBackground } from '@/components/SpaceBackground';
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
  Play,
  Pause,
  RotateCcw,
  Plus,
  Minus,
  Rocket,
  Compass,
  Sparkles,
  Orbit,
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
  const [shakingOption, setShakingOption] = useState<string | null>(null);

  // Per-Question Chronometer (Default: 2 minutes = 120s with +/- controls)
  const [questionTimeLeft, setQuestionTimeLeft] = useState<number>(120);
  const [isQuestionTimerRunning, setIsQuestionTimerRunning] = useState<boolean>(true);

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
        alert(err.message || (currentUser?.username === 'keithley' ? 'Failed to load mission exercises' : 'Lỗi tải bài tập'));
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

  // Reset per-question chronometer when question changes (default 2 minutes = 120s)
  useEffect(() => {
    setQuestionTimeLeft(120);
    setIsQuestionTimerRunning(true);
  }, [currentIndex]);

  // Per-Question countdown timer
  useEffect(() => {
    if (!isQuestionTimerRunning) return;
    const qInterval = setInterval(() => {
      setQuestionTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(qInterval);
  }, [isQuestionTimerRunning]);

  const adjustQuestionTimer = (deltaSecs: number) => {
    setQuestionTimeLeft((prev) => Math.max(5, prev + deltaSecs));
  };

  const resetQuestionTimer = () => {
    setQuestionTimeLeft(120);
    setIsQuestionTimerRunning(true);
  };

  const toggleQuestionTimer = () => {
    setIsQuestionTimerRunning((prev) => !prev);
  };

  const SOLAR_STATIONS = [
    { name: 'Mercury Orbit', symbol: '☿', color: 'from-amber-500 to-orange-500', desc: 'Orbital Angle Foundations' },
    { name: 'Venus Base', symbol: '♀', color: 'from-yellow-400 to-amber-500', desc: 'Linear Pairs & Adjacent Angles' },
    { name: 'Earth Mission Control', symbol: '⊕', color: 'from-cyan-400 to-blue-500', desc: 'Vertical Opposite Angles' },
    { name: 'Mars Outpost', symbol: '♂', color: 'from-red-500 to-orange-600', desc: 'Angle Equations & Computations' },
    { name: 'Jupiter Station', symbol: '♃', color: 'from-amber-600 to-yellow-600', desc: 'Angle Bisectors Trajectory' },
    { name: 'Saturn Rings', symbol: '♄', color: 'from-yellow-500 to-emerald-500', desc: 'Perpendicular Bisector Theorems' },
    { name: 'Uranus Deep Space', symbol: '♅', color: 'from-teal-400 to-cyan-600', desc: 'Multi-Step Geometric Proofs' },
    { name: 'Neptune Frontier', symbol: '♆', color: 'from-blue-600 to-indigo-600', desc: 'Interplanetary Telemetry' },
  ];

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
    const targetQ = questions.find((q: any) => q.id === questionId) || currentQ;
    const correctOpt = (
      targetQ?.grading_key_payload?.correct_option_id ||
      targetQ?.question_payload?.correct_option_id ||
      ''
    ).toString().trim().toUpperCase();

    if (correctOpt && optionId.toString().trim().toUpperCase() !== correctOpt) {
      setShakingOption(optionId);
      setTimeout(() => {
        setShakingOption((curr) => (curr === optionId ? null : curr));
      }, 500);
    } else {
      setShakingOption(null);
    }

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
    const currentAnswered = questions.filter((q: any) => {
      const ans = answers[q.id];
      return (
        ans &&
        ((ans.selected_option_id !== undefined && ans.selected_option_id !== '') ||
          (ans.text !== undefined && ans.text.toString().trim() !== '') ||
          (ans.text_response !== undefined && ans.text_response.toString().trim() !== '') ||
          (Array.isArray(ans.image_urls) && ans.image_urls.length > 0))
      );
    }).length;

    let confirmMsg = '';
    if (currentAnswered < totalQuestions) {
      const remaining = totalQuestions - currentAnswered;
      confirmMsg = isKids
        ? `Bé đã làm ${currentAnswered}/${totalQuestions} câu (còn ${remaining} câu chưa làm). Bé có muốn nộp bài luôn không?`
        : isEnglish
        ? `You have completed ${currentAnswered} of ${totalQuestions} celestial problems (${remaining} questions unanswered). Do you want to submit your mission telemetry now?`
        : `Con đã hoàn thành ${currentAnswered}/${totalQuestions} câu hỏi (còn ${remaining} câu chưa làm). Con có chắc chắn muốn nộp bài bây giờ không?`;
    } else {
      confirmMsg = isKids
        ? `Tuyệt vời! Bé đã làm đủ ${totalQuestions}/${totalQuestions} câu. Bé nộp bài nhé! 🌟`
        : isEnglish
        ? `Outstanding! You have completed all ${totalQuestions}/${totalQuestions} questions. Are you ready to transmit your telemetry?`
        : `Tuyệt vời! Con đã hoàn thành đủ ${totalQuestions}/${totalQuestions} câu hỏi. Con có chắc chắn muốn nộp bài không?`;
    }

    const confirm = window.confirm(confirmMsg);
    if (!confirm) return;

    setSubmitting(true);
    try {
      const formattedAnswers = Object.entries(answers)
        .filter(([qId, payload]) => {
          if (!payload) return false;
          if (payload.selected_option_id !== undefined && payload.selected_option_id !== '') return true;
          if (payload.text !== undefined && payload.text.toString().trim() !== '') return true;
          if (payload.text_response !== undefined && payload.text_response.toString().trim() !== '') return true;
          if (Array.isArray(payload.image_urls) && payload.image_urls.length > 0) return true;
          return false;
        })
        .map(([qId, payload]) => ({
          questionId: qId,
          answerPayload: payload,
        }));

      const timeSpent = (attempt.assessments?.time_limit_minutes || 90) * 60 - timeLeft;

      await api.submitAttempt({
        attemptId,
        answers: formattedAnswers,
        timeSpentSeconds: Math.max(timeSpent, 60),
      });

      alert(
        isEnglish
          ? `🎉 Mission transmitted successfully! Completed ${currentAnswered}/${totalQuestions} problems. Telemetry logged to Command.`
          : `🎉 Nộp bài thành công! Con đã hoàn thành ${currentAnswered}/${totalQuestions} câu. Thầy Thức đã nhận được bài làm của con.`
      );
      router.push(`/student/results/${attemptId}`);
    } catch (err: any) {
      alert(
        isEnglish
          ? `Mission submission failed: ${err.message}`
          : `Nộp bài thất bại: ${err.message}`
      );
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
    user?.full_name?.includes('Keithley') ||
    user?.fullName?.includes('Keithley') ||
    user?.studentProfile?.grade_level === 7 ||
    user?.studentProfile?.grade_level === 9 ||
    attempt?.assessments?.learning_units?.subjects?.code === 'MATH_7';

  const isKids =
    user?.username === 'an_lake' ||
    user?.studentProfile?.grade_level === 1 ||
    user?.student_profiles?.grade_level === 1 ||
    attempt?.assessments?.learning_units?.subjects?.code === 'MATH_1';

  const isEnglish =
    user?.username === 'keithley' ||
    user?.full_name?.includes('Keithley') ||
    attempt?.assessments?.learning_units?.subjects?.code?.startsWith('ENG') ||
    attempt?.assessments?.title?.toLowerCase().includes('cosmic') ||
    attempt?.assessments?.title?.toLowerCase().includes('angle');

  const stationIndex = Math.min(
    SOLAR_STATIONS.length - 1,
    Math.floor((currentIndex / Math.max(1, totalQuestions)) * SOLAR_STATIONS.length)
  );
  const currentStation = SOLAR_STATIONS[stationIndex] || SOLAR_STATIONS[0];

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isCosmic ? 'bg-[#05070E] text-cyan-400' : 'bg-slate-50 text-slate-600'
        }`}
      >
        <div className="flex flex-col items-center space-y-3">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold tracking-wider uppercase text-cyan-300">
            {isEnglish ? 'Charging Orbital Telemetry & Problems...' : 'Đang nạp đề bài luyện tập...'}
          </span>
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

  const content = (
    <div
      className={`min-h-[100dvh] flex flex-col justify-between ${
        isCosmic
          ? 'text-slate-100'
          : isKids
          ? 'bg-gradient-to-b from-amber-50/80 via-pink-50/60 to-purple-50/60 text-slate-900'
          : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* 1. TOP HEADER (Fixed / Sticky on Mobile) */}
      <header
        className={`sticky top-0 z-30 px-3 sm:px-6 py-2.5 sm:py-3 border-b backdrop-blur-md transition-colors ${
          isCosmic
            ? 'bg-[#05070E]/90 border-cyan-500/30 text-white'
            : isKids
            ? 'bg-white/95 border-pink-200 text-pink-900 shadow-sm'
            : 'bg-white/95 border-slate-200 text-slate-900 shadow-xs'
        }`}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
          {/* Back button */}
          <button
            onClick={() => {
              const msg = isKids
                ? 'Bé có chắc muốn rời phòng làm bài không? Kết quả chưa nộp sẽ cần làm lại nhé!'
                : isEnglish
                ? 'Are you sure you want to exit the cockpit? Unsaved telemetry will need to be re-entered.'
                : 'Con có chắc muốn rời phòng làm bài không? Bài làm chưa nộp sẽ cần làm lại.';
              if (window.confirm(msg)) {
                router.push('/student');
              }
            }}
            className={`flex items-center space-x-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-xl transition ${
              isCosmic
                ? 'text-slate-300 hover:bg-slate-800 border border-transparent hover:border-slate-700'
                : isKids
                ? 'text-pink-700 hover:bg-pink-100 border border-pink-200 font-bold'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{isKids ? 'Về trang chủ' : isEnglish ? 'Exit Cockpit' : 'Rời phòng'}</span>
          </button>

          {/* Center Timer & Drawer Button */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Total Timer Badge */}
            <div
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-xl font-mono text-xs sm:text-sm font-bold border ${
                timeLeft < 600
                  ? 'bg-red-500/20 border-red-400 text-red-500 animate-pulse'
                  : isCosmic
                  ? 'bg-cyan-950/80 border-cyan-500/50 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                  : isKids
                  ? 'bg-pink-50 border-pink-300 text-pink-700 shadow-2xs font-sans font-bold'
                  : 'bg-slate-100 border-slate-200 text-slate-800'
              }`}
              title="Thời gian làm bài"
            >
              <Clock className="w-3.5 h-3.5 text-pink-500" />
              <span>{formatTimer(timeLeft)}</span>
            </div>

            {/* Question count toggle drawer */}
            <button
              onClick={() => setShowGridDrawer(true)}
              className={`flex items-center space-x-1 px-3 py-1 rounded-xl text-xs font-semibold border transition ${
                isCosmic
                  ? 'bg-slate-900 border-cyan-500/40 text-cyan-300 hover:bg-slate-800 shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                  : isKids
                  ? 'bg-pink-100 border-pink-300 text-pink-800 hover:bg-pink-200 font-bold'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
              title="Xem danh sách câu hỏi"
            >
              <Grid className="w-3.5 h-3.5" />
              <span>
                {isKids ? 'Câu' : isEnglish ? 'Sector' : 'Câu'} <strong>{currentIndex + 1}</strong>/{totalQuestions}
              </span>
            </button>
          </div>

          {/* Quick Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={submitting}
            title={isEnglish ? 'Submit your telemetry anytime' : 'Nộp bài bất cứ khi nào bạn muốn'}
            className={`py-1.5 px-3.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition shadow-xs disabled:opacity-40 ${
              isCosmic
                ? 'bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : isKids
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 text-white shadow-sm font-bold'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>
              {submitting
                ? '...'
                : isKids
                ? `Nộp bài 🌟 (${answeredCount}/${totalQuestions})`
                : isEnglish
                ? `Submit (${answeredCount}/${totalQuestions})`
                : `Nộp bài (${answeredCount}/${totalQuestions})`}
            </span>
          </button>
        </div>

        {/* Progress Bar Line */}
        <div className="w-full bg-slate-200 dark:bg-slate-800/80 h-2 mt-2.5 rounded-full overflow-hidden relative">
          <div
            className={`h-full transition-all duration-300 ${
              isCosmic
                ? 'bg-gradient-to-r from-cyan-500 via-purple-500 to-amber-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]'
                : isKids
                ? 'bg-gradient-to-r from-pink-400 via-rose-400 to-amber-400 shadow-[0_0_10px_rgba(244,63,94,0.5)]'
                : 'bg-blue-600'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* 2. MAIN SINGLE-QUESTION VIEW */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-3.5 sm:px-6 py-4 flex flex-col justify-center">
        {currentQ ? (
          <div
            className={`rounded-2xl sm:rounded-3xl p-5 sm:p-8 border shadow-sm transition flex flex-col justify-between ${
              isCosmic
                ? 'bg-[#0A0E1A]/95 border-cyan-500/40 text-slate-100 shadow-[0_0_30px_rgba(6,182,212,0.15)] backdrop-blur-xl'
                : isKids
                ? 'bg-white border-2 border-pink-200 text-slate-800 shadow-xl ring-2 ring-pink-100/60'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* A. BANNER THEO CHỦ ĐỀ */}
            {isCosmic && (
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-cyan-500/20 text-xs">
                <div className="flex items-center space-x-2.5">
                  <span className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${currentStation.color} flex items-center justify-center font-bold text-white text-base shadow-[0_0_12px_rgba(6,182,212,0.4)]`}>
                    {currentStation.symbol}
                  </span>
                  <div>
                    <span className="font-bold text-cyan-300 block leading-tight text-xs sm:text-sm tracking-wide">
                      {currentStation.name}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {currentStation.desc}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-1.5 text-slate-300 text-[11px] font-mono bg-slate-900/90 px-2.5 py-1 rounded-xl border border-cyan-500/30 shadow-xs">
                  <Rocket className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span>{isEnglish ? 'Astronaut Keithley Lake' : 'Phi hành gia Keithley'}</span>
                </div>
              </div>
            )}

            {isKids && (
              <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-pink-100 text-xs">
                <div className="flex items-center space-x-3">
                  <span className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-400 to-rose-400 flex items-center justify-center font-bold text-white text-xl shadow-md">
                    👑
                  </span>
                  <div>
                    <span className="font-extrabold text-pink-700 block leading-tight text-sm sm:text-base">
                      Bé An Khám Phá Bảng Cửu Chương 8
                    </span>
                    <span className="text-[11px] text-pink-500 font-semibold">
                      Cùng Công chúa và Chú Rồng Xanh giải mã câu đố phép nhân 8
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-pink-700 text-xs font-bold bg-pink-100 px-3 py-1.5 rounded-2xl border border-pink-200">
                  <span>Toán Lớp 1</span>
                  <span>✨</span>
                </div>
              </div>
            )}

            {/* B. PER-QUESTION CHRONOMETER HUD (Chỉ hiển thị cho học sinh lớn/cosmic) */}
            {!isKids && (
              <div className={`p-2.5 sm:p-3 rounded-2xl mb-4 border flex flex-wrap items-center justify-between gap-2.5 transition-all ${
                isCosmic
                  ? questionTimeLeft <= 15
                    ? 'bg-red-950/40 border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                    : 'bg-slate-900/90 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                  : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center space-x-2.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs transition-colors ${
                    questionTimeLeft <= 15
                      ? 'bg-red-500/20 text-red-400 border border-red-500/50 animate-pulse'
                      : isCosmic
                      ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/40'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                      <span>{isEnglish ? 'Question Chronometer' : 'Đồng hồ câu hỏi'}</span>
                      <span className="text-cyan-400 font-normal">({isEnglish ? '2m default' : 'chuẩn 2 phút'})</span>
                    </div>
                    <div className={`text-base sm:text-lg font-mono font-extrabold flex items-center space-x-2 ${
                      questionTimeLeft <= 15
                        ? 'text-red-400 animate-pulse'
                        : isCosmic
                        ? 'text-cyan-300'
                        : 'text-slate-800'
                    }`}>
                      <span>{formatTimer(questionTimeLeft)}</span>
                      {questionTimeLeft === 0 && (
                        <span className="text-[11px] font-sans text-red-400 font-semibold">
                          {isEnglish ? 'Target time reached!' : 'Hết 2 phút mục tiêu!'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Chronometer User Adjust Controls (+ / - / Pause / Reset) */}
                <div className="flex items-center space-x-1 sm:space-x-1.5">
                  <button
                    type="button"
                    onClick={() => adjustQuestionTimer(-30)}
                    className="px-2 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition flex items-center space-x-0.5 active:scale-95"
                    title={isEnglish ? "Subtract 30 seconds" : "Bớt 30 giây"}
                  >
                    <Minus className="w-3 h-3" />
                    <span>30s</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => adjustQuestionTimer(30)}
                    className="px-2 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 transition flex items-center space-x-0.5 active:scale-95"
                    title={isEnglish ? "Add 30 seconds" : "Thêm 30 giây"}
                  >
                    <Plus className="w-3 h-3" />
                    <span>30s</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => adjustQuestionTimer(60)}
                    className="px-2 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 transition flex items-center space-x-0.5 active:scale-95"
                    title={isEnglish ? "Add 1 minute" : "Thêm 1 phút"}
                  >
                    <Plus className="w-3 h-3" />
                    <span>1m</span>
                  </button>

                  <button
                    type="button"
                    onClick={toggleQuestionTimer}
                    className={`p-1.5 rounded-lg border text-xs transition active:scale-95 ${
                      isQuestionTimerRunning
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                    }`}
                    title={isQuestionTimerRunning ? (isEnglish ? "Pause timer" : "Tạm dừng") : (isEnglish ? "Resume timer" : "Tiếp tục")}
                  >
                    {isQuestionTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    type="button"
                    onClick={resetQuestionTimer}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 transition active:scale-95"
                    title={isEnglish ? "Reset to 2:00" : "Đặt lại 2 phút"}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* C. QUESTION METADATA HEADER */}
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
                      ? (isEnglish ? 'Multiple Choice' : 'Trắc nghiệm')
                      : currentQ.type === 'FILL_IN_BLANK'
                      ? (isEnglish ? 'Numerical Fill-in' : 'Điền số')
                      : (isEnglish ? 'Geometric Proof / Essay' : 'Tự luận'))}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {isEnglish ? 'Question' : 'Câu'} {currentIndex + 1} / {totalQuestions}
                </span>
              </div>
              <span className="text-xs font-bold text-amber-300 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-500/40">
                {currentQ.points} {isEnglish ? 'pts' : 'điểm'}
              </span>
            </div>

            {/* Optional Collapsible Passage */}
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
                    <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                    <span>{isEnglish ? 'Mission Briefing / Reference Diagram' : 'Tài liệu / Bài đọc hiểu'}</span>
                  </span>
                  <span className="text-cyan-400 font-bold">
                    {passageExpanded ? (isEnglish ? '▲ Collapse' : '▲ Thu gọn') : (isEnglish ? '▼ Expand Briefing' : '▼ Bấm để đọc')}
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
            <div
              className={`text-base sm:text-lg font-semibold leading-relaxed mb-5 ${
                isCosmic
                  ? 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'
                  : isKids
                  ? 'text-slate-800 text-lg sm:text-xl font-bold'
                  : 'text-slate-900'
              }`}
            >
              <FormattedContent
                className={isCosmic ? 'text-white' : ''}
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
                    const correctOptionId = (
                      currentQ.grading_key_payload?.correct_option_id ||
                      currentQ.question_payload?.correct_option_id ||
                      ''
                    ).toString().trim().toUpperCase();

                    const isWrong = isSelected && Boolean(correctOptionId) && opt.id.toString().trim().toUpperCase() !== correctOptionId;
                    const isCorrect = isSelected && Boolean(correctOptionId) && opt.id.toString().trim().toUpperCase() === correctOptionId;
                    const isShaking = shakingOption === opt.id;

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelectOption(currentQ.id, opt.id)}
                        className={`w-full p-3.5 sm:p-4 rounded-2xl text-left border text-sm sm:text-base font-medium transition-all flex items-center justify-between active:scale-[0.99] ${
                          isShaking ? 'animate-shake' : ''
                        } ${
                          isSelected
                            ? isWrong
                              ? isCosmic
                                ? 'bg-rose-950/90 border-rose-500 text-rose-100 shadow-[0_0_25px_rgba(244,63,94,0.5)] ring-2 ring-rose-500/80 scale-[1.01]'
                                : isKids
                                ? 'bg-rose-100/90 border-2 border-rose-500 text-rose-950 shadow-md ring-2 ring-rose-300 font-bold scale-[1.01]'
                                : 'bg-red-50 border-2 border-red-500 text-red-950 ring-2 ring-red-200 shadow-sm'
                              : isCorrect
                              ? isCosmic
                                ? 'bg-emerald-950/90 border-emerald-400 text-white shadow-[0_0_25px_rgba(16,185,129,0.5)] ring-2 ring-emerald-400/80 scale-[1.01]'
                                : isKids
                                ? 'bg-emerald-100/90 border-2 border-emerald-500 text-emerald-950 shadow-md ring-2 ring-emerald-300 font-bold scale-[1.01]'
                                : 'bg-emerald-50 border-2 border-emerald-600 text-emerald-950 ring-2 ring-emerald-200 shadow-xs'
                              : isCosmic
                              ? 'bg-cyan-950/90 border-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] ring-1 ring-cyan-400'
                              : isKids
                              ? 'bg-pink-100/90 border-2 border-pink-500 text-pink-950 shadow-md ring-2 ring-pink-300 font-bold scale-[1.01]'
                              : 'bg-blue-50 border-blue-600 text-blue-950 ring-1 ring-blue-600 shadow-xs'
                            : isCosmic
                            ? 'bg-slate-900/80 border-slate-700/80 text-white hover:bg-slate-800 hover:border-cyan-500/50'
                            : isKids
                            ? 'bg-white border-2 border-pink-100 text-slate-800 hover:border-pink-300 hover:bg-pink-50/60 shadow-xs'
                            : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300 shadow-2xs'
                        }`}
                      >
                        <div className="flex items-center space-x-3.5 pr-2 min-w-0">
                          <span
                            className={`w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 rounded-xl flex items-center justify-center font-bold text-sm sm:text-base transition-colors ${
                              isSelected
                                ? isWrong
                                  ? isCosmic
                                    ? 'bg-rose-500 text-white font-black shadow-sm'
                                    : isKids
                                    ? 'bg-rose-500 text-white shadow-sm font-extrabold'
                                    : 'bg-red-600 text-white font-bold'
                                  : isCorrect
                                  ? isCosmic
                                    ? 'bg-emerald-500 text-slate-950 font-black shadow-sm'
                                    : isKids
                                    ? 'bg-emerald-500 text-white shadow-sm font-extrabold'
                                    : 'bg-emerald-600 text-white font-bold'
                                  : isCosmic
                                  ? 'bg-cyan-500 text-slate-950 font-black shadow-sm'
                                  : isKids
                                  ? 'bg-pink-500 text-white shadow-sm font-extrabold'
                                  : 'bg-blue-600 text-white font-bold'
                                : isCosmic
                                ? 'bg-slate-800 text-cyan-300 border border-cyan-500/30'
                                : isKids
                                ? 'bg-pink-100 text-pink-700 border border-pink-200 font-bold'
                                : 'bg-slate-100 text-slate-700 border border-slate-200'
                            }`}
                          >
                            {opt.id}
                          </span>
                          <span
                            className={`leading-snug break-words ${
                              isCosmic
                                ? isWrong ? 'text-rose-100 font-semibold' : isCorrect ? 'text-emerald-100 font-semibold' : 'text-white font-medium'
                                : isKids
                                ? 'text-slate-800 font-bold text-base sm:text-lg'
                                : 'text-slate-800'
                            }`}
                          >
                            <FormattedContent
                              text={opt.text}
                              className={isCosmic ? (isWrong ? 'text-rose-100' : isCorrect ? 'text-emerald-100' : 'text-white') : ''}
                            />
                          </span>
                        </div>
                        {isSelected && (
                          isWrong ? (
                            <X
                              className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 animate-in zoom-in-75 ${
                                isCosmic
                                  ? 'text-rose-400 stroke-[2.5]'
                                  : isKids
                                  ? 'text-rose-600 stroke-[3]'
                                  : 'text-red-600 stroke-[2.5]'
                              }`}
                            />
                          ) : isCorrect ? (
                            <Check
                              className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 animate-in zoom-in-75 ${
                                isCosmic
                                  ? 'text-emerald-400 stroke-[2.5]'
                                  : isKids
                                  ? 'text-emerald-600 stroke-[3]'
                                  : 'text-emerald-600 stroke-[2.5]'
                              }`}
                            />
                          ) : (
                            <Check
                              className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 ${
                                isCosmic
                                  ? 'text-cyan-400'
                                  : isKids
                                  ? 'text-pink-600 stroke-[3]'
                                  : 'text-blue-600'
                              }`}
                            />
                          )
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Feedback Banner for Multiple Choice */}
              {currentQ.type === 'MULTIPLE_CHOICE' && currentAnswer.selected_option_id && Boolean(
                (currentQ.grading_key_payload?.correct_option_id || currentQ.question_payload?.correct_option_id || '')
              ) && (() => {
                const correctOpt = (
                  currentQ.grading_key_payload?.correct_option_id ||
                  currentQ.question_payload?.correct_option_id ||
                  ''
                ).toString().trim().toUpperCase();
                const isWrong = currentAnswer.selected_option_id.toString().trim().toUpperCase() !== correctOpt;

                return isWrong ? (
                  <div
                    className={`mt-3 p-3 sm:p-3.5 rounded-2xl border text-xs sm:text-sm font-bold flex items-center space-x-2.5 animate-in fade-in slide-in-from-top-1 ${
                      isCosmic
                        ? 'bg-rose-950/60 border-rose-500/50 text-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.25)]'
                        : isKids
                        ? 'bg-rose-50 border-2 border-rose-300 text-rose-900'
                        : 'bg-red-50 border border-red-300 text-red-900'
                    }`}
                  >
                    <X className="w-4 h-4 text-rose-500 flex-shrink-0 stroke-[2.5]" />
                    <span>
                      {isKids
                        ? 'Ôi chưa đúng rồi! Bé An chọn thử lại đáp án khác nhé 🌸'
                        : isEnglish
                        ? 'Incorrect telemetry! Re-evaluate and select another option.'
                        : 'Chưa chính xác! Con hãy suy nghĩ kỹ và chọn lại đáp án khác nhé.'}
                    </span>
                  </div>
                ) : (
                  <div
                    className={`mt-3 p-3 sm:p-3.5 rounded-2xl border text-xs sm:text-sm font-bold flex items-center space-x-2.5 animate-in fade-in slide-in-from-top-1 ${
                      isCosmic
                        ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                        : isKids
                        ? 'bg-emerald-50 border-2 border-emerald-300 text-emerald-900'
                        : 'bg-emerald-50 border border-emerald-300 text-emerald-900'
                    }`}
                  >
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 stroke-[2.5]" />
                    <span>
                      {isKids
                        ? 'Chính xác rồi! Bé An thông minh quá! ⭐ Bấm "Next" để qua câu tiếp theo nha!'
                        : isEnglish
                        ? 'Correct telemetry locked on target! 🎯 Proceed to next sector.'
                        : 'Chính xác! Con làm rất tốt! 🎯 Bấm "Câu tiếp theo" để tiếp tục.'}
                    </span>
                  </div>
                );
              })()}

              {/* FILL_IN_BLANK INPUT */}
              {currentQ.type === 'FILL_IN_BLANK' && (
                <div>
                  <input
                    type="text"
                    placeholder={isEnglish ? "Enter numerical value or angle degree (e.g. 132 or 72°)..." : "Gõ đáp số của con vào đây..."}
                    value={currentAnswer.text || ''}
                    onChange={(e) => handleFillText(currentQ.id, e.target.value)}
                    className="w-full p-3 bg-slate-900 border border-cyan-500/40 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              )}

              {/* ESSAY_UPLOAD INPUT */}
              {currentQ.type === 'ESSAY_UPLOAD' && (
                <div className="space-y-3">
                  <textarea
                    rows={4}
                    placeholder={isEnglish ? "Type your step-by-step geometric calculations or mathematical proof here..." : "Gõ lời giải từng bước hoặc lập luận hình học tại đây..."}
                    value={currentAnswer.text_response || ''}
                    onChange={(e) => handleEssayText(currentQ.id, e.target.value)}
                    className="w-full p-3 bg-slate-900 border border-cyan-500/40 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 leading-relaxed font-mono"
                  />
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{isEnglish ? "Tip: You can use symbols like 180°, xOy, OM bisector..." : "Gợi ý: Con có thể gõ các góc xOy, 180°, tia OM..."}</span>
                    <button
                      type="button"
                      onClick={() => handleAddSampleImage(currentQ.id, '/images/kids/princess_math.png')}
                      className="px-3 py-1.5 rounded-lg bg-cyan-950 text-cyan-300 text-xs font-semibold flex items-center space-x-1.5 border border-cyan-500/40 hover:bg-cyan-900 transition"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isEnglish ? "Attach Diagram Work" : "Đính kèm ảnh bài làm"}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400">
            {isEnglish ? 'Loading orbital mission...' : 'Đang nạp câu hỏi...'}
          </div>
        )}
      </main>

      {/* 3. BOTTOM CONTROL BAR */}
      <footer
        className={`sticky bottom-0 z-30 px-3.5 sm:px-6 py-2.5 sm:py-3 border-t backdrop-blur-md ${
          isCosmic
            ? 'bg-[#05070E]/95 border-cyan-500/20'
            : isKids
            ? 'bg-white/95 border-pink-200 shadow-md'
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
                : isKids
                ? 'bg-white border-2 border-pink-200 text-pink-700 hover:bg-pink-50 font-bold'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{isKids ? 'Câu trước' : isEnglish ? 'Previous Question' : 'Câu trước'}</span>
          </button>

          {/* Quick status pill */}
          <div className="text-center">
            <span className="text-[11px] text-slate-500 font-semibold block">
              {isKids ? 'Bé đã làm:' : isEnglish ? 'Completed:' : 'Đã làm:'}{' '}
              <strong className={isKids ? 'text-pink-600 font-extrabold text-sm' : 'text-cyan-400 font-bold'}>{answeredCount}</strong>/{totalQuestions} câu
            </span>
          </div>

          {/* Next or Finish Button */}
          <div className="flex items-center space-x-2">
            {currentIndex < totalQuestions - 1 ? (
              <>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  title={isEnglish ? 'Submit your telemetry anytime' : 'Nộp bài bất cứ khi nào bạn muốn'}
                  className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold flex items-center space-x-1.5 transition border active:scale-95 disabled:opacity-40 ${
                    isCosmic
                      ? 'bg-slate-900/90 border-cyan-500/40 text-cyan-300 hover:bg-cyan-950/60 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                      : isKids
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100'
                      : 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  <Send className="w-3.5 h-3.5 text-emerald-500 dark:text-cyan-400" />
                  <span>
                    {isKids
                      ? `Nộp bài ngay (${answeredCount}/${totalQuestions})`
                      : isEnglish
                      ? `Submit (${answeredCount}/${totalQuestions})`
                      : `Nộp bài ngay (${answeredCount}/${totalQuestions})`}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
                  className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-base font-extrabold flex items-center space-x-2 transition shadow-sm active:scale-95 ${
                    isCosmic
                      ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                      : isKids
                      ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-[0_4px_0_#be185d] active:translate-y-1'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <span>{isKids ? 'Next: Câu tiếp theo ➡️' : isEnglish ? 'Next Question' : 'Câu tiếp theo'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-base font-extrabold flex items-center space-x-2 transition shadow-sm active:scale-95 disabled:opacity-50 ${
                  isKids
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 text-white shadow-[0_4px_0_#0f766e] active:translate-y-1'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                <span>
                  {submitting
                    ? isKids
                      ? 'Đang nộp bài...'
                      : isEnglish
                      ? 'Transmitting...'
                      : 'Đang nộp...'
                    : isKids
                    ? `Bé Nộp Bài! (${answeredCount}/${totalQuestions}) 🌟`
                    : isEnglish
                    ? `Submit Telemetry (${answeredCount}/${totalQuestions})`
                    : `Hoàn tất & Nộp bài (${answeredCount}/${totalQuestions})`}
                </span>
                <Send className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </footer>

      {/* 4. QUESTION DRAWER MODAL */}
      {showGridDrawer && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/70 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-150">
          <div
            className={`w-full max-w-lg rounded-t-3xl sm:rounded-3xl border p-5 sm:p-6 shadow-2xl max-h-[80vh] flex flex-col ${
              isCosmic
                ? 'bg-[#0A0E1A] border-cyan-500/40 text-white shadow-[0_0_35px_rgba(6,182,212,0.25)]'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between border-b pb-3 mb-4 border-slate-800">
              <div>
                <h3 className="font-bold text-sm text-cyan-300">
                  {isEnglish ? 'Cosmic Flight Question Roster' : 'Danh Sách Câu Hỏi'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isEnglish
                    ? `Solved ${answeredCount} of ${totalQuestions} celestial problems`
                    : `Đã trả lời ${answeredCount} trên tổng số ${totalQuestions} câu`}
                </p>
              </div>
              <button
                onClick={() => setShowGridDrawer(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
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
                        ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-950'
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

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center space-x-3 text-slate-400">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-md bg-cyan-400" />
                  <span>{isEnglish ? 'Done' : 'Đã làm'}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-md bg-slate-700" />
                  <span>{isEnglish ? 'Blank' : 'Chưa'}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowGridDrawer(false);
                    handleSubmit();
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition ${
                    isCosmic
                      ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black'
                      : isKids
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {isKids
                      ? `Nộp bài ngay (${answeredCount}/${totalQuestions})`
                      : isEnglish
                      ? `Transmit (${answeredCount}/${totalQuestions})`
                      : `Nộp bài ngay (${answeredCount}/${totalQuestions})`}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowGridDrawer(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs border border-slate-700"
                >
                  {isEnglish ? 'Close' : 'Đóng'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return isCosmic ? <SpaceBackground>{content}</SpaceBackground> : content;
}
