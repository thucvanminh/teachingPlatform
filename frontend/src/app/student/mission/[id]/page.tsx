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
  Volume2,
  VolumeX,
} from 'lucide-react';

// Web Audio API Sound Synthesizer for instant, lag-free gamified audio
class MissionSoundFX {
  private ctx: AudioContext | null = null;
  public muted: boolean = false;

  private initCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  // Play crisp buzzer on error / wrong option selection
  playWrong() {
    if (this.muted) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Primary downward saw wave (alarm buzzer)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(190, now);
      osc1.frequency.exponentialRampToValueAtTime(110, now + 0.28);

      gain1.gain.setValueAtTime(0.2, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.3);

      // Discordant square wave pulse for authentic cosmic warning sound
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'square';
      osc2.frequency.setValueAtTime(140, now);
      osc2.frequency.exponentialRampToValueAtTime(95, now + 0.28);

      gain2.gain.setValueAtTime(0.12, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now);
      osc2.stop(now + 0.3);
    } catch {
      // Audio playback failed or blocked by policy
    }
  }

  // Play ascending harmonic chime on correct answer
  playCorrect() {
    if (this.muted) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const now = ctx.currentTime;

      // 3 ascending notes: C5 (523.25Hz), E5 (659.25Hz), G5 (783.99Hz)
      const notes = [
        { freq: 523.25, time: 0, dur: 0.16, gain: 0.15 },
        { freq: 659.25, time: 0.08, dur: 0.2, gain: 0.16 },
        { freq: 783.99, time: 0.16, dur: 0.32, gain: 0.18 },
      ];

      notes.forEach((note) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(note.freq, now + note.time);

        gain.gain.setValueAtTime(note.gain, now + note.time);
        gain.gain.exponentialRampToValueAtTime(0.001, now + note.time + note.dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + note.time);
        osc.stop(now + note.time + note.dur);
      });
    } catch {
      // Audio playback failed or blocked
    }
  }

  // Soft subtle click for UI selection
  playClick() {
    if (this.muted) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(700, now);
      osc.frequency.exponentialRampToValueAtTime(350, now + 0.04);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {}
  }
}

function splitEmbeddedImage(markdown: string) {
  const match = markdown.match(/!\[([^\]]*)\]\(([^)]+)\)/);
  if (!match) {
    return { text: markdown, imageSrc: null, imageAlt: null };
  }

  return {
    text: markdown.replace(match[0], '').trim(),
    imageSrc: match[2],
    imageAlt: match[1] || 'Hình minh họa câu hỏi',
  };
}

const sfx = new MissionSoundFX();

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
  const [soundMuted, setSoundMuted] = useState<boolean>(false);

  useEffect(() => {
    sfx.muted = soundMuted;
  }, [soundMuted]);

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

    const normalizedChosen = optionId.toString().trim().toUpperCase();

    if (correctOpt) {
      if (normalizedChosen !== correctOpt) {
        // Wrong answer: play alarm buzzer and trigger shake animation
        sfx.playWrong();
        setShakingOption(null);
        requestAnimationFrame(() => {
          setShakingOption(optionId);
          setTimeout(() => {
            setShakingOption((curr) => (curr === optionId ? null : curr));
          }, 500);
        });
      } else {
        // Correct answer: play harmonic victory chime
        sfx.playCorrect();
        setShakingOption(null);
      }
    } else {
      sfx.playClick();
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
    attempt?.assessments?.learning_units?.subjects?.code === 'MATH_7' ||
    attempt?.assessments?.learning_units?.subjects?.code === 'CHEM_9';

  const isKids =
    user?.username === 'an_lake' ||
    user?.studentProfile?.grade_level === 1 ||
    user?.student_profiles?.grade_level === 1 ||
    attempt?.assessments?.learning_units?.subjects?.code === 'MATH_1';

  const isEnglish =
    user?.username === 'keithley' ||
    user?.full_name?.includes('Keithley') ||
    attempt?.assessments?.learning_units?.subjects?.code?.startsWith('ENG') ||
    attempt?.assessments?.learning_units?.subjects?.code === 'CHEM_9' ||
    attempt?.assessments?.title?.toLowerCase().includes('cosmic') ||
    attempt?.assessments?.title?.toLowerCase().includes('angle') ||
    attempt?.assessments?.title?.toLowerCase().includes('mass percentage') ||
    attempt?.assessments?.title?.toLowerCase().includes('chemistry');

  const questionMarkdown =
    currentQ?.question_payload?.content_markdown ||
    currentQ?.question_payload?.prompt_markdown ||
    '';
  const kidsQuestionVisual = isKids ? splitEmbeddedImage(questionMarkdown) : null;
  const isParallelWorkbook = isCosmic && currentQ?.question_payload?.practice_layout === 'parallel-workbook';

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

  const getQuestionStatus = (q: any) => {
    if (!q) return 'UNANSWERED';
    const ans = answers[q.id];
    if (!ans) return 'UNANSWERED';

    const correctOpt = (
      q.grading_key_payload?.correct_option_id ||
      q.question_payload?.correct_option_id ||
      ''
    ).toString().trim().toUpperCase();

    const selectedOpt = (ans.selected_option_id || '').toString().trim().toUpperCase();

    if (selectedOpt && correctOpt) {
      return selectedOpt === correctOpt ? 'CORRECT' : 'WRONG';
    }

    if (ans.text && q.grading_key_payload?.acceptable_answers) {
      const userText = ans.text.toString().trim().toLowerCase();
      const isOk = q.grading_key_payload.acceptable_answers.some(
        (a: string) => a.toString().trim().toLowerCase() === userText
      );
      return isOk ? 'CORRECT' : 'WRONG';
    }

    if (
      ans.selected_option_id ||
      (ans.text && ans.text.toString().trim() !== '') ||
      (ans.text_response && ans.text_response.toString().trim() !== '') ||
      (Array.isArray(ans.image_urls) && ans.image_urls.length > 0)
    ) {
      return 'ANSWERED';
    }

    return 'UNANSWERED';
  };

  const getQuestionButtonClass = (q: any, i: number) => {
    const status = getQuestionStatus(q);
    const isCurrent = i === currentIndex;
    const ringClass = isCurrent
      ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-950 scale-105 z-10'
      : '';

    if (status === 'CORRECT') {
      return `border-2 border-emerald-500 bg-emerald-950/70 text-emerald-300 font-bold shadow-[0_0_10px_rgba(16,185,129,0.35)] ${ringClass}`;
    }
    if (status === 'WRONG') {
      return `border-2 border-rose-500 bg-rose-950/70 text-rose-300 font-bold shadow-[0_0_10px_rgba(244,63,94,0.35)] ${ringClass}`;
    }
    if (status === 'ANSWERED') {
      return `border-2 border-cyan-400 bg-cyan-950/70 text-cyan-200 font-bold ${ringClass}`;
    }
    if (isCosmic) {
      return `border border-slate-700/80 bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:border-slate-500 hover:text-slate-200 ${ringClass}`;
    }
    if (isKids) {
      return `border border-pink-200 bg-pink-50 text-pink-700 hover:bg-pink-100 ${ringClass}`;
    }
    return `border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 ${ringClass}`;
  };
  const progressPercent = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;
  const answeredCount = questions.filter((q: any) => {
    const ans = answers[q.id];
    return ans && (ans.selected_option_id || ans.text || ans.text_response || (ans.image_urls && ans.image_urls.length > 0));
  }).length;

  const content = (
    <div
      className={`h-screen max-h-screen min-h-0 w-full overflow-hidden flex flex-col ${
        isCosmic
          ? 'text-slate-100 bg-[#05070E]'
          : isKids
          ? 'bg-gradient-to-b from-amber-50/80 via-pink-50/60 to-purple-50/60 text-slate-900'
          : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* 1. TOP COCKPIT HEADER */}
      <header
        className={`z-30 shrink-0 px-3 sm:px-6 py-2 sm:py-2.5 border-b backdrop-blur-md transition-colors ${
          isCosmic
            ? 'bg-[#05070E]/95 border-cyan-500/30 text-white'
            : isKids
            ? 'bg-white/95 border-pink-200 text-pink-900 shadow-sm'
            : 'bg-white/95 border-slate-200 text-slate-900 shadow-xs'
        }`}
      >
        <div className="max-w-[1600px] w-full mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Exit Cockpit + Current Station Badge */}
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
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
              className={`flex shrink-0 items-center space-x-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-xl transition ${
                isCosmic
                  ? 'text-slate-300 hover:bg-slate-800/90 border border-slate-700/60 hover:border-cyan-500/50'
                  : isKids
                  ? 'text-pink-700 hover:bg-pink-100 border border-pink-200 font-bold'
                  : 'text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{isKids ? 'Về trang chủ' : isEnglish ? 'Exit Cockpit' : 'Rời phòng'}</span>
            </button>

            {/* Station indicator (Cosmic) */}
            {isCosmic && (
              <div className="hidden md:flex items-center space-x-2 px-2.5 py-1 rounded-xl bg-slate-900/90 border border-cyan-500/30">
                <span className={`w-6 h-6 rounded-lg bg-gradient-to-tr ${currentStation.color} flex items-center justify-center font-bold text-white text-xs shadow-xs`}>
                  {currentStation.symbol}
                </span>
                <div className="leading-tight">
                  <span className="font-bold text-cyan-300 text-xs block truncate max-w-[180px] xl:max-w-[240px]">
                    {currentStation.name}
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate max-w-[180px] xl:max-w-[240px]">
                    {currentStation.desc}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Center: Mission Timer & SFX & Quick Jump */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {/* Total Timer Badge */}
            <div
              className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1 rounded-xl font-mono text-xs sm:text-sm font-bold border ${
                timeLeft < 600
                  ? 'bg-red-500/20 border-red-400 text-red-500 animate-pulse'
                  : isCosmic
                  ? 'bg-cyan-950/80 border-cyan-500/50 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                  : isKids
                  ? 'bg-pink-50 border-pink-300 text-pink-700 shadow-2xs font-sans font-bold'
                  : 'bg-slate-100 border-slate-200 text-slate-800'
              }`}
              title={isEnglish ? 'Mission time remaining' : 'Thời gian làm bài'}
            >
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>{formatTimer(timeLeft)}</span>
            </div>

            {/* Question count toggle drawer */}
            <button
              onClick={() => setShowGridDrawer(true)}
              className={`flex items-center space-x-1 px-2.5 sm:px-3 py-1 rounded-xl text-xs font-semibold border transition ${
                isCosmic
                  ? 'bg-slate-900 border-cyan-500/40 text-cyan-300 hover:bg-slate-800 shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                  : isKids
                  ? 'bg-pink-100 border-pink-300 text-pink-800 hover:bg-pink-200 font-bold'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
              title={isEnglish ? 'Open question roster' : 'Xem danh sách câu hỏi'}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>
                <span className="hidden sm:inline">{isKids ? 'Câu' : isEnglish ? 'Sector' : 'Câu'} </span>
                <strong>{currentIndex + 1}</strong>/{totalQuestions}
              </span>
            </button>

            {/* Audio SFX Toggle Button */}
            <button
              onClick={() => setSoundMuted((prev) => !prev)}
              className={`p-1.5 sm:px-2.5 sm:py-1 rounded-xl text-xs font-semibold border transition flex items-center space-x-1.5 active:scale-95 ${
                soundMuted
                  ? 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                  : isCosmic
                  ? 'bg-cyan-950/90 text-cyan-300 border-cyan-500/40 hover:bg-cyan-900/60 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                  : isKids
                  ? 'bg-pink-100 text-pink-700 border-pink-300 hover:bg-pink-200'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
              title={soundMuted ? (isEnglish ? 'Unmute Sound FX' : 'Bật âm thanh') : (isEnglish ? 'Mute Sound FX' : 'Tắt âm thanh')}
            >
              {soundMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span className="hidden md:inline text-[11px] font-bold">
                {soundMuted ? (isEnglish ? 'Muted' : 'Tắt tiếng') : (isEnglish ? 'SFX ON' : 'Âm thanh')}
              </span>
            </button>
          </div>

          {/* Right: Cadet info & Quick Submit */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {isCosmic && (
              <div className="hidden lg:flex items-center space-x-1.5 text-slate-300 text-[11px] font-mono bg-slate-900/90 px-2.5 py-1.5 rounded-xl border border-cyan-500/30">
                <Rocket className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span className="truncate">{isEnglish ? 'Cadet Keithley Lake' : 'Keithley Lake'}</span>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={submitting}
              title={isEnglish ? 'Submit your telemetry anytime' : 'Nộp bài bất cứ khi nào bạn muốn'}
              className={`p-2 sm:px-3.5 sm:py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition shadow-xs disabled:opacity-40 active:scale-95 ${
                isCosmic
                  ? 'bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                  : isKids
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 text-white shadow-sm font-bold'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {submitting
                  ? '...'
                  : isKids
                  ? `Nộp bài (${answeredCount}/${totalQuestions})`
                  : isEnglish
                  ? `Submit (${answeredCount}/${totalQuestions})`
                  : `Nộp bài (${answeredCount}/${totalQuestions})`}
              </span>
            </button>
          </div>
        </div>

        {/* Progress Bar Line */}
        <div className="w-full bg-slate-200 dark:bg-slate-800/80 h-1 sm:h-1.5 mt-2 rounded-full overflow-hidden relative">
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

      {/* 2. QUESTION QUICK-JUMP TRACK (Fixed Sub-Bar) */}
      <div
        className={`z-20 shrink-0 px-3 sm:px-6 py-1.5 border-b backdrop-blur-md flex items-center justify-between gap-2 overflow-x-auto scrollbar-none ${
          isCosmic
            ? 'bg-[#070B16]/90 border-cyan-500/20'
            : isKids
            ? 'bg-pink-50/90 border-pink-200'
            : 'bg-slate-100/90 border-slate-200'
        }`}
      >
        <div className="max-w-[1600px] w-full mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center space-x-1.5 min-w-max px-0.5 py-0.5">
            {questions.map((q: any, i: number) => {
              const status = getQuestionStatus(q);
              return (
                <button
                  key={q.id || i}
                  type="button"
                  onClick={() => setCurrentIndex(i)}
                  className={`h-7 sm:h-8 min-w-[2rem] px-2 rounded-lg text-xs font-bold transition flex items-center justify-center relative ${getQuestionButtonClass(
                    q,
                    i
                  )}`}
                  title={`${isEnglish ? 'Question' : 'Câu'} ${i + 1}${
                    status === 'CORRECT'
                      ? isEnglish ? ' (Correct)' : ' (Đúng)'
                      : status === 'WRONG'
                      ? isEnglish ? ' (Incorrect - Click to review)' : ' (Sai - Bấm để xem lại)'
                      : ''
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => setShowGridDrawer(true)}
            className={`shrink-0 p-1.5 rounded-lg border text-xs flex items-center space-x-1 transition active:scale-95 ${
              isCosmic
                ? 'bg-slate-900 border-cyan-500/30 text-cyan-300 hover:bg-slate-800'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
            title={isEnglish ? 'View full roster by sector' : 'Xem toàn bộ theo sector'}
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px] font-semibold">{isEnglish ? 'Sectors' : 'Sectors'}</span>
          </button>
        </div>
      </div>

      {/* 3. MAIN COCKPIT VIEW */}
      <main className="mission-main flex-1 min-h-0 w-full max-w-[1600px] mx-auto p-3 sm:p-4 lg:p-5 overflow-hidden flex flex-col">
        {currentQ ? (
          <div className="w-full h-full min-h-0 lg:grid lg:grid-cols-12 lg:gap-5 xl:gap-6 flex flex-col overflow-y-auto lg:overflow-hidden mission-scroll">
            {/* LEFT COLUMN: Question & Reference Deck */}
            <div
              className={`lg:col-span-7 xl:col-span-7 rounded-2xl sm:rounded-3xl p-4 sm:p-5 xl:p-6 border shadow-sm transition flex flex-col min-h-0 lg:h-full shrink-0 lg:shrink ${
                isCosmic
                  ? 'bg-[#0A0E1A]/95 border-cyan-500/40 text-slate-100 shadow-[0_0_25px_rgba(6,182,212,0.12)] backdrop-blur-xl'
                  : isKids
                  ? 'bg-white border-2 border-pink-200 text-slate-800 shadow-lg'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              {/* Question Metadata Header */}
              <div className="flex items-center justify-between border-b pb-2.5 mb-3 border-cyan-500/20 shrink-0">
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider ${
                      isCosmic
                        ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 text-[11px]'
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
                <span className="text-xs font-bold text-amber-300 bg-amber-950/70 px-2.5 py-1 rounded-lg border border-amber-500/40 font-mono">
                  {currentQ.points} {isEnglish ? 'pts' : 'điểm'}
                </span>
              </div>

              {/* Reference Diagram / Illustration (if present) */}
              {currentQ.question_payload?.diagram_url && (
                <div className="shrink-0 mb-3 p-2.5 rounded-xl border border-cyan-500/30 bg-[#080d1a] flex flex-col items-center">
                  <img
                    src={currentQ.question_payload.diagram_url}
                    alt={currentQ.question_payload.diagram_alt || 'Geometry reference'}
                    className="max-h-[160px] xl:max-h-[220px] w-auto object-contain"
                  />
                  {currentQ.question_payload.reference_note && (
                    <p className="text-[11px] text-cyan-200/80 mt-1.5 text-center">{currentQ.question_payload.reference_note}</p>
                  )}
                  {currentQ.question_payload.method_markdown && (
                    <details className="mt-1 text-xs text-slate-300 w-full">
                      <summary className="cursor-pointer text-cyan-300 font-semibold hover:text-cyan-200">Flight manual · Type strategy</summary>
                      <p className="mt-1 p-2 rounded bg-slate-900/80 border border-slate-800 leading-relaxed">{currentQ.question_payload.method_markdown}</p>
                    </details>
                  )}
                </div>
              )}

              {/* Kids visual */}
              {isKids && kidsQuestionVisual?.imageSrc && (
                <figure className="mb-3 shrink-0 overflow-hidden rounded-2xl border-2 border-pink-200 bg-white shadow-md">
                  <img
                    src={kidsQuestionVisual.imageSrc}
                    alt={kidsQuestionVisual.imageAlt || 'Hình minh họa'}
                    className="h-44 sm:h-52 w-full bg-pink-50 object-contain"
                  />
                </figure>
              )}

              {/* Optional Collapsible Passage */}
              {currentQ.question_payload?.passage && (
                <div className="mb-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setPassageExpanded(!passageExpanded)}
                    className="w-full py-1.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition bg-slate-800/80 border-cyan-500/30 text-cyan-300"
                  >
                    <span className="flex items-center space-x-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{isEnglish ? 'Mission Briefing / Reference Diagram' : 'Tài liệu / Bài đọc hiểu'}</span>
                    </span>
                    <span className="text-cyan-400 font-bold">
                      {passageExpanded ? (isEnglish ? '▲ Collapse' : '▲ Thu gọn') : (isEnglish ? '▼ Expand Briefing' : '▼ Bấm để đọc')}
                    </span>
                  </button>

                  {passageExpanded && (
                    <div className="mt-2 p-3 rounded-xl border border-slate-800 bg-slate-900 text-slate-200 text-xs leading-relaxed max-h-36 overflow-y-auto mission-scroll">
                      <FormattedContent text={currentQ.question_payload.passage} />
                    </div>
                  )}
                </div>
              )}

              {/* Question Stem / Content */}
              <div className="flex-1 min-h-0 overflow-y-auto mission-scroll pr-1.5 text-base sm:text-lg xl:text-xl font-medium leading-relaxed text-white">
                <FormattedContent
                  className="text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                  text={isKids ? kidsQuestionVisual?.text || questionMarkdown : questionMarkdown}
                />
              </div>
            </div>

            {/* RIGHT COLUMN: Telemetry Input & Controls Deck */}
            <div
              className={`lg:col-span-5 xl:col-span-5 rounded-2xl sm:rounded-3xl p-4 sm:p-5 xl:p-6 border shadow-sm transition flex flex-col justify-between min-h-0 lg:h-full shrink-0 lg:shrink ${
                isCosmic
                  ? 'bg-[#0A0E1A]/95 border-cyan-500/40 text-slate-100 shadow-[0_0_25px_rgba(6,182,212,0.12)] backdrop-blur-xl'
                  : isKids
                  ? 'bg-white border-2 border-pink-200 text-slate-800 shadow-lg'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              {/* Question Chronometer HUD */}
              {!isKids && (
                <div
                  className={`shrink-0 p-2 sm:p-2.5 rounded-xl border mb-3 flex items-center justify-between gap-2 transition-all ${
                    isCosmic
                      ? questionTimeLeft <= 15
                        ? 'bg-red-950/40 border-red-500/60 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                        : 'bg-slate-900/90 border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                        questionTimeLeft <= 15
                          ? 'bg-red-500/20 text-red-400 border border-red-500/50 animate-pulse'
                          : 'bg-cyan-950 text-cyan-400 border border-cyan-500/40'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-tight">
                        {isEnglish ? 'Question Timer' : 'Đồng hồ câu hỏi'}
                      </div>
                      <div
                        className={`text-base font-mono font-extrabold leading-tight ${
                          questionTimeLeft <= 15 ? 'text-red-400 animate-pulse' : 'text-cyan-300'
                        }`}
                      >
                        {formatTimer(questionTimeLeft)}
                      </div>
                    </div>
                  </div>

                  {/* Adjust Controls */}
                  <div className="flex items-center space-x-1">
                    <button
                      type="button"
                      onClick={() => adjustQuestionTimer(-30)}
                      className="px-1.5 py-0.5 rounded text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                      title={isEnglish ? "Subtract 30s" : "Bớt 30 giây"}
                    >
                      -30s
                    </button>
                    <button
                      type="button"
                      onClick={() => adjustQuestionTimer(30)}
                      className="px-1.5 py-0.5 rounded text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 transition"
                      title={isEnglish ? "Add 30s" : "Thêm 30 giây"}
                    >
                      +30s
                    </button>
                    <button
                      type="button"
                      onClick={() => adjustQuestionTimer(60)}
                      className="px-1.5 py-0.5 rounded text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 transition"
                      title={isEnglish ? "Add 1m" : "Thêm 1 phút"}
                    >
                      +1m
                    </button>
                    <button
                      type="button"
                      onClick={toggleQuestionTimer}
                      className={`p-1 rounded border text-xs transition ${
                        isQuestionTimerRunning
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                      }`}
                      title={isQuestionTimerRunning ? (isEnglish ? "Pause" : "Tạm dừng") : (isEnglish ? "Play" : "Tiếp tục")}
                    >
                      {isQuestionTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    </button>
                    <button
                      type="button"
                      onClick={resetQuestionTimer}
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 transition"
                      title={isEnglish ? "Reset" : "Đặt lại"}
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}

              {/* Options & Input Area */}
              <div className="flex-1 min-h-0 overflow-y-auto mission-scroll py-1 space-y-2 pr-1 flex flex-col justify-center">
                {/* MULTIPLE_CHOICE OPTIONS */}
                {currentQ.type === 'MULTIPLE_CHOICE' && currentQ.question_payload?.options && (
                  <div className="space-y-2">
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
                          className={`w-full py-2.5 px-3 sm:py-3 sm:px-3.5 rounded-xl text-left border text-sm sm:text-base font-medium transition-all flex items-center justify-between active:scale-[0.99] ${
                            isShaking ? 'animate-shake' : ''
                          } ${
                            isSelected
                              ? isWrong
                                ? isCosmic
                                  ? 'bg-rose-950/90 border-rose-500 text-rose-100 shadow-[0_0_20px_rgba(244,63,94,0.45)] ring-2 ring-rose-500/80 scale-[1.01]'
                                  : 'bg-rose-100/90 border-2 border-rose-500 text-rose-950'
                                : isCorrect
                                ? isCosmic
                                  ? 'bg-emerald-950/90 border-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.45)] ring-2 ring-emerald-400/80 scale-[1.01]'
                                  : 'bg-emerald-100/90 border-2 border-emerald-500 text-emerald-950'
                                : isCosmic
                                ? 'bg-cyan-950/90 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.35)] ring-1 ring-cyan-400'
                                : 'bg-blue-50 border-blue-600 text-blue-950'
                              : isCosmic
                              ? 'bg-slate-900/80 border-slate-700/80 text-white hover:bg-slate-800 hover:border-cyan-500/50'
                              : isKids
                              ? 'bg-white border-2 border-pink-100 text-slate-800 hover:border-pink-300 hover:bg-pink-50/60 shadow-xs'
                              : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center space-x-3 pr-2 min-w-0">
                            <span
                              className={`w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm transition-colors ${
                                isSelected
                                  ? isWrong
                                    ? 'bg-rose-500 text-white font-black shadow-sm'
                                    : isCorrect
                                    ? 'bg-emerald-500 text-slate-950 font-black shadow-sm'
                                    : 'bg-cyan-500 text-slate-950 font-black shadow-sm'
                                  : isCosmic
                                  ? 'bg-slate-800 text-cyan-300 border border-cyan-500/30'
                                  : 'bg-slate-100 text-slate-700 border border-slate-200'
                              }`}
                            >
                              {opt.id}
                            </span>
                            <span className={`leading-snug break-words ${isWrong ? 'text-rose-100 font-semibold' : isCorrect ? 'text-emerald-100 font-semibold' : 'text-white font-medium'}`}>
                              <FormattedContent
                                text={opt.text}
                                className={isWrong ? 'text-rose-100' : isCorrect ? 'text-emerald-100' : 'text-white'}
                              />
                            </span>
                          </div>
                          {isSelected && (
                            isWrong ? (
                              <X className="w-5 h-5 flex-shrink-0 text-rose-400 stroke-[2.5] animate-in zoom-in-75" />
                            ) : isCorrect ? (
                              <Check className="w-5 h-5 flex-shrink-0 text-emerald-400 stroke-[2.5] animate-in zoom-in-75" />
                            ) : (
                              <Check className="w-5 h-5 flex-shrink-0 text-cyan-400" />
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
                    <div className="mt-2 p-2.5 rounded-xl border text-xs font-bold flex items-center space-x-2 bg-rose-950/60 border-rose-500/50 text-rose-200 shadow-[0_0_12px_rgba(244,63,94,0.25)] animate-in fade-in slide-in-from-top-1">
                      <X className="w-4 h-4 text-rose-400 flex-shrink-0 stroke-[2.5]" />
                      <span>
                        {isKids
                          ? 'Chưa đúng rồi! Bé chọn lại đáp án khác nhé 🌸'
                          : isEnglish
                          ? 'Incorrect telemetry! Re-evaluate and select another option.'
                          : 'Chưa chính xác! Con hãy suy nghĩ kỹ và chọn lại đáp án khác nhé.'}
                      </span>
                    </div>
                  ) : (
                    <div className="mt-2 p-2.5 rounded-xl border text-xs font-bold flex items-center space-x-2 bg-emerald-950/60 border-emerald-500/50 text-emerald-200 shadow-[0_0_12px_rgba(16,185,129,0.25)] animate-in fade-in slide-in-from-top-1">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 stroke-[2.5]" />
                      <span>
                        {isKids
                          ? 'Chính xác rồi! Bé thông minh quá! ⭐'
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
                      placeholder={isEnglish ? "Enter numerical value (e.g. 2.0 or 43.125)..." : "Gõ đáp số của con vào đây..."}
                      value={currentAnswer.text || ''}
                      onChange={(e) => handleFillText(currentQ.id, e.target.value)}
                      className="w-full p-3 bg-slate-900 border border-cyan-500/40 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>
                )}

                {/* ESSAY_UPLOAD INPUT */}
                {currentQ.type === 'ESSAY_UPLOAD' && (
                  <div className="space-y-2">
                    <textarea
                      rows={3}
                      aria-label={isEnglish ? 'Written solution' : 'Lời giải'}
                      placeholder={isEnglish ? "Write your solution and steps here..." : "Gõ lời giải từng bước tại đây..."}
                      value={currentAnswer.text_response || ''}
                      onChange={(e) => handleEssayText(currentQ.id, e.target.value)}
                      className="w-full p-2.5 bg-slate-900 border border-cyan-500/40 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 leading-relaxed font-mono resize-none"
                    />
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{isEnglish ? "Tip: Include units and steps" : "Gợi ý: Gõ đơn vị và các bước"}</span>
                      <button
                        type="button"
                        onClick={() => handleAddSampleImage(currentQ.id, '/images/kids/princess_math.png')}
                        className="px-2.5 py-1 rounded-lg bg-cyan-950 text-cyan-300 text-xs font-semibold flex items-center space-x-1 border border-cyan-500/40 hover:bg-cyan-900 transition"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{isEnglish ? "Attach Work" : "Đính kèm ảnh"}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Controls Deck */}
              <div className="shrink-0 pt-3 mt-2 border-t border-cyan-500/20 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="px-3 py-2 rounded-xl border text-xs font-semibold flex items-center space-x-1 transition disabled:opacity-30 disabled:cursor-not-allowed bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">{isEnglish ? 'Previous' : 'Câu trước'}</span>
                </button>

                <div className="text-center text-[11px] text-slate-400">
                  <span>{isEnglish ? 'Solved: ' : 'Đã làm: '}</span>
                  <strong className="text-cyan-300 font-bold">{answeredCount}</strong>/{totalQuestions}
                </div>

                {currentIndex < totalQuestions - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
                    className="px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center space-x-1.5 transition shadow-sm active:scale-95 bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                  >
                    <span>{isEnglish ? 'Next Sector' : 'Tiếp theo'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center space-x-1.5 transition shadow-sm active:scale-95 disabled:opacity-50 bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                  >
                    <span>{submitting ? (isEnglish ? 'Transmitting...' : 'Đang nộp...') : (isEnglish ? 'Submit Telemetry' : 'Nộp bài')}</span>
                    <Send className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400">
            {isEnglish ? 'Loading orbital mission...' : 'Đang nạp câu hỏi...'}
          </div>
        )}
      </main>

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

            {/* Grid of numbers grouped by sector */}
            <div className="overflow-y-auto p-1 flex-1 space-y-3.5 pr-1.5 scrollbar-thin scrollbar-thumb-cyan-500/20">
              {(() => {
                const sections: { title: string; items: { q: any; index: number }[] }[] = [];
                questions.forEach((q: any, i: number) => {
                  const sName = q.question_payload?.sectionName || `Sector ${Math.floor(i / 5) + 1}`;
                  let sec = sections.find((s) => s.title === sName);
                  if (!sec) {
                    sec = { title: sName, items: [] };
                    sections.push(sec);
                  }
                  sec.items.push({ q, index: i });
                });

                return sections.map((sec, secIdx) => (
                  <div key={secIdx} className="space-y-1.5 p-2 rounded-2xl bg-slate-900/40 border border-slate-800/80">
                    <div className="text-[11px] font-bold text-cyan-300 tracking-wide flex items-center justify-between">
                      <span className="flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                        <span>{sec.title}</span>
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {sec.items.filter(({ q }) => getQuestionStatus(q) !== 'UNANSWERED').length}/{sec.items.length}
                      </span>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {sec.items.map(({ q, index }) => (
                        <button
                          key={q.id || index}
                          type="button"
                          onClick={() => {
                            setCurrentIndex(index);
                            setShowGridDrawer(false);
                          }}
                          className={`h-10 rounded-xl text-xs font-bold transition flex items-center justify-center relative ${getQuestionButtonClass(
                            q,
                            index
                          )}`}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                ));
              })()}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-3 text-slate-400">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3.5 h-3.5 rounded-md border-2 border-emerald-500 bg-emerald-950/70" />
                  <span className="text-emerald-400 font-bold">{isEnglish ? 'Correct' : 'Đúng'}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3.5 h-3.5 rounded-md border-2 border-rose-500 bg-rose-950/70" />
                  <span className="text-rose-400 font-bold">{isEnglish ? 'Incorrect' : 'Sai'}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3.5 h-3.5 rounded-md border border-slate-700 bg-slate-800" />
                  <span>{isEnglish ? 'Unanswered' : 'Chưa làm'}</span>
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

  return isCosmic ? <SpaceBackground fitViewport={true}>{content}</SpaceBackground> : content;
}
