'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  GraduationCap,
  Grid,
  Lightbulb,
  Send,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { FormattedContent } from '@/components/KatexMath';

interface SectionGroup {
  id: string;
  title: string;
  shortTitle: string;
  items: { q: any; index: number }[];
}

interface HighSchoolExamStudioProps {
  attempt: any;
  questions: any[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  answers: Record<string, any>;
  timeLeft: number;
  answeredCount: number;
  submitting: boolean;
  soundMuted: boolean;
  setSoundMuted: React.Dispatch<React.SetStateAction<boolean>>;
  showGridDrawer: boolean;
  setShowGridDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  shakingOption: string | null;
  checkedFillState: Record<string, 'CORRECT' | 'WRONG'>;
  shakingFillInput: string | null;
  isNamViet: boolean;
  isThai: boolean;
  getQuestionStatus: (q: any) => string;
  handleSelectOption: (questionId: string, optionId: string) => void;
  handleFillText: (questionId: string, text: string) => void;
  handleCheckFillBlank: (q: any) => void;
  handleSubmit: () => void;
  onExit: () => void;
}

function formatTimer(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function getShortSectionTitle(raw: string): string {
  const cleaned = raw.replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\s+/g, ' ').trim();
  return cleaned.length > 34 ? `${cleaned.slice(0, 32).trim()}…` : cleaned;
}

function stripBlockquotePrefix(text: string): string {
  return text
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*>\s?/, ''))
    .join('\n')
    .trim();
}

function splitPassageAndQuestion(q: any): { passage: string | null; prompt: string } {
  const explicitPassage = q?.question_payload?.passage;
  const rawContent = (
    q?.question_payload?.content_markdown ||
    q?.question_payload?.prompt_markdown ||
    ''
  ).toString();

  if (explicitPassage && explicitPassage.toString().trim()) {
    return {
      passage: stripBlockquotePrefix(explicitPassage.toString()),
      prompt: rawContent.trim(),
    };
  }

  const match = rawContent.match(/\n\s*\n(?=(?:>\s*)?\*\*(?:Question|Câu)\s+\d+[^*]*\*\*)/i);
  if (match && typeof match.index === 'number' && match.index > 60) {
    const before = stripBlockquotePrefix(rawContent.slice(0, match.index));
    const after = stripBlockquotePrefix(rawContent.slice(match.index));
    if (before.length > 40 && after.length > 0) {
      return {
        passage: before,
        prompt: after,
      };
    }
  }

  return {
    passage: null,
    prompt: rawContent.trim(),
  };
}

export function HighSchoolExamStudio({
  attempt,
  questions,
  currentIndex,
  setCurrentIndex,
  answers,
  timeLeft,
  answeredCount,
  submitting,
  soundMuted,
  setSoundMuted,
  showGridDrawer,
  setShowGridDrawer,
  shakingOption,
  checkedFillState,
  shakingFillInput,
  isNamViet,
  isThai,
  getQuestionStatus,
  handleSelectOption,
  handleFillText,
  handleCheckFillBlank,
  handleSubmit,
  onExit,
}: HighSchoolExamStudioProps) {
  const totalQuestions = questions.length;
  const currentQ = questions[currentIndex] || null;

  const [mobilePassageOpen, setMobilePassageOpen] = useState(true);
  const [passageSize, setPassageSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    setShowExplanation(false);
    setMobilePassageOpen(true);
    // Smoothly scroll to top on mobile/tablet when switching questions
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentIndex]);

  const sections: SectionGroup[] = useMemo(() => {
    const list: SectionGroup[] = [];
    questions.forEach((q: any, i: number) => {
      const rawTitle =
        q?.question_payload?.sectionName ||
        q?.question_payload?.section_name ||
        `Phần ${Math.floor(i / 10) + 1}`;
      let found = list.find((s) => s.title === rawTitle);
      if (!found) {
        found = {
          id: `sec_${list.length}`,
          title: rawTitle,
          shortTitle: getShortSectionTitle(rawTitle),
          items: [],
        };
        list.push(found);
      }
      found.items.push({ q, index: i });
    });
    return list;
  }, [questions]);

  const activeSection = useMemo(() => {
    return (
      sections.find((s) => s.items.some((it) => it.index === currentIndex)) ||
      sections[0] ||
      null
    );
  }, [sections, currentIndex]);

  const { passage, prompt } = useMemo(() => splitPassageAndQuestion(currentQ), [currentQ]);

  const currentAnswer = currentQ ? answers[currentQ.id] || {} : {};
  const solvedProgressPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  const correctOptionId = (
    currentQ?.grading_key_payload?.correct_option_id ||
    currentQ?.question_payload?.correct_option_id ||
    ''
  )
    .toString()
    .trim()
    .toUpperCase();

  const selectedOptionId = (currentAnswer.selected_option_id || '').toString().trim().toUpperCase();
  const isMcqAnswered = currentQ?.type === 'MULTIPLE_CHOICE' && Boolean(selectedOptionId) && Boolean(correctOptionId);
  const isMcqCorrect = isMcqAnswered && selectedOptionId === correctOptionId;
  const isMcqWrong = isMcqAnswered && selectedOptionId !== correctOptionId;

  const fillStatus = currentQ ? checkedFillState[currentQ.id] : undefined;
  const isFillCorrect = fillStatus === 'CORRECT';
  const isFillWrong = fillStatus === 'WRONG';

  const canRevealExplanation =
    Boolean(currentQ?.grading_key_payload?.explanation_markdown) &&
    (isMcqCorrect || isFillCorrect);

  const jumpToSection = (secId: string) => {
    const target = sections.find((s) => s.id === secId);
    if (!target || target.items.length === 0) return;
    const firstUnanswered = target.items.find(({ q }) => getQuestionStatus(q) === 'UNANSWERED');
    setCurrentIndex((firstUnanswered || target.items[0]).index);
  };

  // High-contrast solid semantic tiles for instant visual scanning
  const getTileClass = (q: any, i: number) => {
    const status = getQuestionStatus(q);
    const isCurrent = i === currentIndex;
    const currentRing = isCurrent
      ? 'ring-2 ring-slate-950 ring-offset-2 ring-offset-white z-10 scale-[1.04]'
      : '';

    if (status === 'CORRECT') {
      return `border-2 border-emerald-700 bg-emerald-600 text-white font-extrabold shadow-2xs ${currentRing}`;
    }
    if (status === 'CORRECT_AFTER_WRONG') {
      return `border-2 border-amber-600 bg-amber-400 text-slate-950 font-extrabold shadow-2xs ${currentRing}`;
    }
    if (status === 'WRONG') {
      return `border-2 border-rose-700 bg-rose-600 text-white font-extrabold shadow-2xs ${currentRing}`;
    }
    if (status === 'ANSWERED') {
      return `border-2 border-blue-700 bg-blue-600 text-white font-extrabold shadow-2xs ${currentRing}`;
    }
    if (isCurrent) {
      return `border-2 border-blue-700 bg-blue-700 text-white font-extrabold shadow-sm ring-2 ring-blue-300 ring-offset-1 z-10`;
    }
    return `border-2 border-slate-300 bg-white text-slate-900 hover:bg-blue-50 hover:border-blue-600 font-bold`;
  };

  const passageTextClass =
    passageSize === 'sm'
      ? 'text-sm leading-[1.75]'
      : passageSize === 'lg'
      ? 'text-[17px] sm:text-[18px] leading-[1.85]'
      : 'text-[15px] sm:text-base leading-[1.8]';

  const questionTypeBadge =
    currentQ?.type === 'FILL_IN_BLANK'
      ? 'Điền từ tiếng Anh'
      : passage
      ? 'Đọc hiểu / Điền khuyết'
      : 'Trắc nghiệm';

  return (
    <div className="min-h-dvh w-full flex flex-col bg-[#E8EEF5] text-slate-950 font-sans">
      {/* 1. HIGH-CONTRAST DEEP NAVY COMMAND HEADER (STICKY) */}
      <header className="sticky top-0 z-30 bg-[#0F172A] text-white border-b border-slate-800 shadow-md">
        <div className="max-w-[1440px] w-full mx-auto px-3 sm:px-5 lg:px-6 py-2.5 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Back & Student Context */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              type="button"
              onClick={onExit}
              className="shrink-0 inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3 min-h-[40px] rounded-xl border border-slate-600 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-[background-color,border-color] duration-150"
              aria-label="Rời phòng thi"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Rời phòng</span>
            </button>

            <div className="hidden md:flex items-center gap-2.5 min-w-0">
              <div
                className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-white font-bold shadow-xs ${
                  isNamViet ? 'bg-blue-600' : 'bg-indigo-500'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="min-w-0 leading-tight">
                <div className="text-xs sm:text-sm font-bold text-white truncate max-w-[260px] lg:max-w-[380px] xl:max-w-[480px]">
                  {attempt?.assessments?.title || (isNamViet ? 'Bài Luyện Tập Tiếng Anh 12' : 'Bài Luyện Tập Tiếng Anh 11')}
                </div>
                <div className="text-[11px] text-slate-300 font-medium mt-0.5">
                  {isNamViet
                    ? 'Nam Việt · Lớp 12 · Mục tiêu 7.0+ THPTQG'
                    : isThai
                    ? 'Thái · Lớp 11 · Mục tiêu 8.5+ THPT'
                    : 'Phòng luyện thi chuẩn hóa'}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Timer, Roster, Sound, Submit */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <div
              className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 min-h-[40px] rounded-xl font-mono tabular-nums text-xs sm:text-sm font-extrabold border ${
                timeLeft < 600
                  ? 'bg-rose-600 border-rose-400 text-white'
                  : 'bg-slate-800 border-slate-600 text-amber-300'
              }`}
              title="Thời gian làm bài còn lại"
            >
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span>{formatTimer(timeLeft)}</span>
            </div>

            <button
              type="button"
              onClick={() => setShowGridDrawer(true)}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 min-h-[40px] rounded-xl border border-slate-600 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold tabular-nums transition-[background-color,border-color] duration-150"
              title="Mở bảng tổng quan câu hỏi"
            >
              <Grid className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>
                <span className="hidden sm:inline">Câu </span>
                {currentIndex + 1}/{totalQuestions}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSoundMuted((prev) => !prev)}
              className={`inline-flex items-center justify-center gap-1.5 px-2.5 min-h-[40px] rounded-xl border text-xs font-bold transition-[background-color,border-color] duration-150 ${
                soundMuted
                  ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                  : 'bg-slate-800 border-slate-600 text-white hover:bg-slate-700'
              }`}
              title={soundMuted ? 'Bật âm thanh phản hồi' : 'Tắt âm thanh phản hồi'}
              aria-label={soundMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            >
              {soundMuted ? (
                <VolumeX className="w-4 h-4 text-slate-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              )}
              <span className="hidden xl:inline">{soundMuted ? 'Tắt' : 'Âm thanh'}</span>
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 min-h-[40px] rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-extrabold shadow-sm disabled:opacity-45 transition-[background-color,transform] duration-150 active:scale-[0.97] tabular-nums"
            >
              <Send className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">
                {submitting ? 'Đang nộp...' : `Nộp bài (${answeredCount}/${totalQuestions})`}
              </span>
              <span className="sm:hidden">{submitting ? '...' : 'Nộp'}</span>
            </button>
          </div>
        </div>

        {/* High-Visibility Progress Bar */}
        <div className="w-full h-1.5 bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-400 via-blue-500 to-emerald-400 transition-[width] duration-300 ease-out"
            style={{ width: `${solvedProgressPercent}%` }}
          />
        </div>
      </header>

      {/* 2. RESPONSIVE SECTION NAVIGATOR + ACTIVE SECTION TRACK */}
      <div className="bg-white border-b-2 border-slate-300 shadow-xs">
        <div className="max-w-[1440px] w-full mx-auto px-3 sm:px-5 lg:px-6 py-2.5 space-y-2">
          {/* Mobile Section Selector (< md): Clean native dropdown saves vertical space */}
          {sections.length > 1 && (
            <div className="md:hidden flex items-center gap-2">
              <select
                aria-label="Chọn phần bài tập"
                value={activeSection?.id || ''}
                onChange={(e) => jumpToSection(e.target.value)}
                className="flex-1 min-w-0 min-h-[40px] px-3 py-1.5 rounded-xl bg-slate-100 border-2 border-slate-300 text-slate-950 text-xs font-bold focus:outline-none focus:border-blue-700"
              >
                {sections.map((sec) => {
                  const secSolved = sec.items.filter(({ q }) => getQuestionStatus(q) !== 'UNANSWERED').length;
                  return (
                    <option key={sec.id} value={sec.id}>
                      {sec.shortTitle} ({secSolved}/{sec.items.length})
                    </option>
                  );
                })}
              </select>
              <button
                type="button"
                onClick={() => setShowGridDrawer(true)}
                className="shrink-0 min-h-[40px] px-3 rounded-xl bg-slate-900 text-white text-xs font-bold inline-flex items-center gap-1.5"
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Tất cả</span>
              </button>
            </div>
          )}

          {/* Desktop/Tablet Section Pills (md+) */}
          {sections.length > 1 && (
            <div className="hidden md:flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {sections.map((sec) => {
                const isActiveSec = activeSection?.id === sec.id;
                const secSolved = sec.items.filter(({ q }) => getQuestionStatus(q) !== 'UNANSWERED').length;
                const allSecSolved = secSolved === sec.items.length;

                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => jumpToSection(sec.id)}
                    className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-[background-color,border-color,color] duration-150 ${
                      isActiveSec
                        ? 'bg-blue-700 border-blue-800 text-white shadow-xs'
                        : allSecSolved
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-950 hover:bg-emerald-200'
                        : 'bg-slate-100 border-slate-300 text-slate-900 hover:bg-slate-200 hover:border-slate-400'
                    }`}
                    title={sec.title}
                  >
                    <span>{sec.shortTitle}</span>
                    <span
                      className={`font-mono tabular-nums text-[11px] px-1.5 py-0.2 rounded-md font-extrabold ${
                        isActiveSec
                          ? 'bg-blue-900/70 text-white'
                          : allSecSolved
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white text-slate-900 border border-slate-300'
                      }`}
                    >
                      {secSolved}/{sec.items.length}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Question Numbers of Active Section */}
          {activeSection && (
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 overflow-x-auto py-1 px-0.5 scrollbar-none">
                {activeSection.items.map(({ q, index }) => (
                  <button
                    key={q.id || index}
                    type="button"
                    aria-current={index === currentIndex ? 'step' : undefined}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-9 min-w-[2.4rem] px-2 rounded-lg text-xs tabular-nums transition-[background-color,border-color,transform] duration-150 flex items-center justify-center shrink-0 ${getTileClass(
                      q,
                      index,
                    )}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setShowGridDrawer(true)}
                className="hidden md:inline-flex shrink-0 px-3 py-1.5 rounded-xl border-2 border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold items-center gap-1.5 transition-[background-color,border-color] duration-150"
              >
                <Grid className="w-3.5 h-3.5 text-blue-700" />
                <span className="tabular-nums">Tất cả {totalQuestions} câu</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3. RESPONSIVE MAIN EXAM WORKSPACE (NATURAL SCROLL — NEVER CLIPPED) */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-6 py-4 sm:py-6 pb-24 lg:pb-8">
        {currentQ ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6 items-start">
            {/* LEFT COLUMN: READING PASSAGE OR STANDALONE QUESTION STEM */}
            <section className="lg:col-span-7 rounded-2xl bg-white border-2 border-slate-300 shadow-md p-4 sm:p-6 flex flex-col">
              {/* Metadata Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-slate-200 pb-3 mb-4">
                <div className="flex flex-wrap items-center gap-2 min-w-0">
                  <span className="inline-flex items-center px-3 py-1 rounded-lg bg-blue-700 text-white text-xs font-extrabold tracking-wide max-w-full sm:max-w-[440px] truncate shadow-2xs">
                    {currentQ.question_payload?.sectionName ||
                      currentQ.question_payload?.section_name ||
                      questionTypeBadge}
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-800 tabular-nums">
                    Câu {currentIndex + 1} / {totalQuestions}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {passage && (
                    <div className="flex items-center gap-0.5 bg-slate-200/80 p-0.5 rounded-lg border border-slate-300 text-xs font-extrabold">
                      <button
                        type="button"
                        onClick={() => setPassageSize('sm')}
                        className={`px-2 py-0.5 rounded-md transition-colors ${
                          passageSize === 'sm' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:text-slate-950'
                        }`}
                        title="Cỡ chữ nhỏ"
                      >
                        A-
                      </button>
                      <button
                        type="button"
                        onClick={() => setPassageSize('base')}
                        className={`px-2 py-0.5 rounded-md transition-colors ${
                          passageSize === 'base' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:text-slate-950'
                        }`}
                        title="Cỡ chữ chuẩn"
                      >
                        A
                      </button>
                      <button
                        type="button"
                        onClick={() => setPassageSize('lg')}
                        className={`px-2 py-0.5 rounded-md transition-colors ${
                          passageSize === 'lg' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:text-slate-950'
                        }`}
                        title="Cỡ chữ lớn"
                      >
                        A+
                      </button>
                    </div>
                  )}

                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-amber-100 text-amber-950 border border-amber-400 font-mono tabular-nums">
                    {currentQ.points} điểm
                  </span>
                </div>
              </div>

              {/* Optional Diagram */}
              {currentQ.question_payload?.diagram_url && (
                <div className="mb-4 p-3 rounded-xl border-2 border-slate-200 bg-slate-50 flex flex-col items-center">
                  <img
                    src={currentQ.question_payload.diagram_url}
                    alt={currentQ.question_payload.diagram_alt || 'Hình minh họa'}
                    className="max-h-[220px] w-auto object-contain rounded-lg"
                  />
                  {currentQ.question_payload.reference_note && (
                    <p className="text-xs mt-2 text-slate-700 font-medium text-center">
                      {currentQ.question_payload.reference_note}
                    </p>
                  )}
                </div>
              )}

              {/* Case A: Reading / Cloze / Announcement Passage */}
              {passage ? (
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                      <BookOpen className="w-4 h-4 text-blue-700" />
                      <span>Văn bản đọc hiểu / Ngữ liệu</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMobilePassageOpen((prev) => !prev)}
                      className="lg:hidden inline-flex items-center gap-1 text-xs font-extrabold text-blue-800 bg-blue-100 border border-blue-300 px-2.5 py-1 rounded-lg"
                    >
                      <span>{mobilePassageOpen ? 'Thu gọn bài đọc' : 'Mở bài đọc'}</span>
                      {mobilePassageOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {mobilePassageOpen && (
                    <div className="rounded-xl bg-[#FFFDF7] border-2 border-slate-300 border-l-4 border-l-blue-700 p-4 sm:p-5 lg:max-h-[calc(100dvh-280px)] lg:overflow-y-auto light-scroll">
                      <FormattedContent
                        variant="light"
                        text={passage}
                        className={`text-slate-950 font-normal max-w-[68ch] ${passageTextClass}`}
                      />
                    </div>
                  )}
                </div>
              ) : (
                /* Case B: Standalone Question Stem */
                <div className="py-2 sm:py-6">
                  <div className="p-4 sm:p-6 rounded-xl bg-slate-50 border-2 border-slate-200">
                    <FormattedContent
                      variant="light"
                      text={prompt}
                      className="text-slate-950 font-medium text-[17px] sm:text-[19px] lg:text-[20px] leading-[1.8] max-w-[66ch]"
                    />
                  </div>
                </div>
              )}
            </section>

            {/* RIGHT COLUMN: QUESTION PROMPT (IF PASSAGE) + HIGH-CONTRAST OPTIONS + FEEDBACK */}
            <section className="lg:col-span-5 rounded-2xl bg-white border-2 border-slate-300 shadow-md p-4 sm:p-6 flex flex-col lg:sticky lg:top-[84px]">
              {/* Active Question Prompt when Passage is on Left */}
              {passage ? (
                <div className="mb-4 p-4 rounded-xl bg-blue-50 border-2 border-blue-300">
                  <FormattedContent
                    variant="light"
                    text={prompt}
                    className="text-slate-950 font-semibold text-[15px] sm:text-base leading-relaxed"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-slate-200">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
                    {currentQ.type === 'FILL_IN_BLANK'
                      ? 'Nhập đáp án của con'
                      : 'Chọn 1 đáp án đúng nhất'}
                  </span>
                  <span className="text-xs font-bold text-blue-800 bg-blue-100 border border-blue-200 px-2 py-0.5 rounded-md">
                    {questionTypeBadge}
                  </span>
                </div>
              )}

              {/* MULTIPLE_CHOICE OPTIONS (HIGH CONTRAST) */}
              {currentQ.type === 'MULTIPLE_CHOICE' && currentQ.question_payload?.options && (
                <div className="space-y-2.5">
                  {currentQ.question_payload.options.map((opt: any) => {
                    const optIdUpper = opt.id.toString().trim().toUpperCase();
                    const isSelected = selectedOptionId === optIdUpper;
                    const isWrong = isSelected && Boolean(correctOptionId) && optIdUpper !== correctOptionId;
                    const isCorrect = isSelected && Boolean(correctOptionId) && optIdUpper === correctOptionId;
                    const isShaking = shakingOption === opt.id;

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelectOption(currentQ.id, opt.id)}
                        className={`w-full min-h-[54px] py-3 px-3.5 rounded-xl text-left border-2 text-sm sm:text-[15px] flex items-center justify-between gap-3 transition-[background-color,border-color,box-shadow,transform] duration-150 ease-out active:scale-[0.985] ${
                          isShaking ? 'animate-shake' : ''
                        } ${
                          isSelected
                            ? isWrong
                              ? 'bg-rose-50 border-rose-600 text-rose-950 shadow-sm'
                              : isCorrect
                              ? 'bg-emerald-50 border-emerald-600 text-emerald-950 shadow-sm'
                              : 'bg-blue-50 border-blue-700 text-blue-950 shadow-sm'
                            : 'bg-slate-50 border-slate-300 text-slate-950 hover:bg-blue-50/70 hover:border-blue-600 shadow-2xs'
                        }`}
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <span
                            className={`w-8 h-8 mt-0.5 shrink-0 rounded-lg flex items-center justify-center font-mono font-extrabold text-sm transition-colors duration-150 ${
                              isSelected
                                ? isWrong
                                  ? 'bg-rose-600 text-white'
                                  : isCorrect
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-blue-700 text-white'
                                : 'bg-slate-900 text-white'
                            }`}
                          >
                            {opt.id}
                          </span>
                          <div
                            className={`leading-snug break-words pt-1 ${
                              isWrong
                                ? 'text-rose-950 font-bold'
                                : isCorrect
                                ? 'text-emerald-950 font-bold'
                                : 'text-slate-950 font-semibold'
                            }`}
                          >
                            <FormattedContent variant="light" text={opt.text} />
                          </div>
                        </div>

                        {isSelected && (
                          <span className="shrink-0">
                            {isWrong ? (
                              <X className="w-5 h-5 text-rose-600 stroke-[3]" />
                            ) : isCorrect ? (
                              <Check className="w-5 h-5 text-emerald-600 stroke-[3]" />
                            ) : (
                              <Check className="w-5 h-5 text-blue-700 stroke-[3]" />
                            )}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* FILL_IN_BLANK INPUT (HIGH CONTRAST ENGLISH) */}
              {currentQ.type === 'FILL_IN_BLANK' && (
                <div className="space-y-3">
                  <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-2 ${shakingFillInput === currentQ.id ? 'animate-shake' : ''}`}>
                    <input
                      type="text"
                      placeholder="Nhập từ hoặc cụm từ tiếng Anh..."
                      value={currentAnswer.text || ''}
                      onChange={(e) => handleFillText(currentQ.id, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleCheckFillBlank(currentQ);
                        }
                      }}
                      className={`flex-1 min-w-0 min-h-[50px] px-4 py-2.5 rounded-xl text-base font-bold focus:outline-none transition-[background-color,border-color,box-shadow] duration-150 ${
                        isFillCorrect
                          ? 'bg-emerald-50 border-2 border-emerald-600 text-emerald-950'
                          : isFillWrong
                          ? 'bg-rose-50 border-2 border-rose-600 text-rose-950'
                          : 'bg-white border-2 border-slate-400 text-slate-950 placeholder:text-slate-500 focus:border-blue-700 focus:ring-2 focus:ring-blue-700/20'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => handleCheckFillBlank(currentQ)}
                      className={`shrink-0 min-h-[50px] px-5 py-2.5 rounded-xl text-sm font-extrabold inline-flex items-center justify-center gap-1.5 transition-[background-color,transform] duration-150 active:scale-[0.97] ${
                        isFillCorrect
                          ? 'bg-emerald-600 text-white'
                          : 'bg-blue-700 hover:bg-blue-800 text-white shadow-xs'
                      }`}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Kiểm tra</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-700 font-medium">
                    Gợi ý: Nhấn <kbd className="px-1.5 py-0.5 rounded bg-slate-200 border border-slate-400 font-mono text-[11px] font-bold text-slate-950">Enter</kbd> để chấm đáp án ngay.
                  </p>
                </div>
              )}

              {/* Instant High-Contrast Feedback Banner */}
              {(isMcqWrong || isFillWrong) && (
                <div className="mt-3.5 p-3.5 rounded-xl bg-rose-100 border-2 border-rose-500 text-rose-950 text-xs sm:text-sm font-bold flex items-center gap-2.5">
                  <X className="w-5 h-5 text-rose-700 shrink-0 stroke-[3]" />
                  <span>
                    {isFillWrong
                      ? 'Chưa chính xác! Hãy kiểm tra lại chính tả hoặc dạng từ rồi bấm Kiểm tra nhé.'
                      : 'Chưa chính xác! Con hãy đọc kỹ lại ngữ cảnh và chọn đáp án khác nhé.'}
                  </span>
                </div>
              )}

              {(isMcqCorrect || isFillCorrect) && (
                <div className="mt-3.5 space-y-2.5">
                  <div className="p-3.5 rounded-xl bg-emerald-100 border-2 border-emerald-600 text-emerald-950 text-xs sm:text-sm font-bold flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-emerald-700 shrink-0 stroke-[3]" />
                      <span>Chính xác! Con làm rất tốt.</span>
                    </div>
                    {canRevealExplanation && (
                      <button
                        type="button"
                        onClick={() => setShowExplanation((prev) => !prev)}
                        className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border-2 border-emerald-600 text-emerald-950 hover:bg-emerald-50 text-xs font-extrabold transition-colors"
                      >
                        <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                        <span>{showExplanation ? 'Ẩn giải thích' : 'Xem giải thích'}</span>
                      </button>
                    )}
                  </div>

                  {showExplanation && currentQ?.grading_key_payload?.explanation_markdown && (
                    <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-400 text-xs sm:text-sm text-slate-950 leading-relaxed max-h-56 overflow-y-auto light-scroll">
                      <FormattedContent
                        variant="light"
                        text={currentQ.grading_key_payload.explanation_markdown}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Desktop Bottom Controls Deck (lg+) */}
              <div className="hidden lg:block pt-4 mt-5 border-t-2 border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                    disabled={currentIndex === 0}
                    className="min-h-[44px] px-4 py-2 rounded-xl border-2 border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-950 text-sm font-bold inline-flex items-center gap-1.5 disabled:opacity-35 disabled:cursor-not-allowed transition-[background-color,border-color] duration-150"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Câu trước</span>
                  </button>

                  <div className="text-center text-xs font-bold text-slate-700 tabular-nums">
                    Đã làm <strong className="text-blue-700 text-sm">{answeredCount}</strong>/{totalQuestions}
                  </div>

                  {currentIndex < totalQuestions - 1 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
                      className="min-h-[44px] px-5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-extrabold inline-flex items-center gap-1.5 shadow-xs transition-[background-color,transform] duration-150 active:scale-[0.98]"
                    >
                      <span>Tiếp theo</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="min-h-[44px] px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-extrabold inline-flex items-center gap-1.5 shadow-xs disabled:opacity-45 transition-[background-color,transform] duration-150 active:scale-[0.98]"
                    >
                      <span>{submitting ? 'Đang nộp...' : 'Nộp bài thi'}</span>
                      <Send className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {currentQ.type === 'MULTIPLE_CHOICE' && (
                  <p className="text-center text-xs font-medium text-slate-600">
                    Phím tắt:{' '}
                    <kbd className="px-1.5 py-0.5 rounded bg-slate-200 border border-slate-300 font-mono font-bold text-slate-900">A–D</kbd> hoặc{' '}
                    <kbd className="px-1.5 py-0.5 rounded bg-slate-200 border border-slate-300 font-mono font-bold text-slate-900">1–4</kbd> chọn đáp án •{' '}
                    <kbd className="px-1.5 py-0.5 rounded bg-slate-200 border border-slate-300 font-mono font-bold text-slate-900">←</kbd>{' '}
                    <kbd className="px-1.5 py-0.5 rounded bg-slate-200 border border-slate-300 font-mono font-bold text-slate-900">→</kbd> chuyển câu
                  </p>
                )}
              </div>
            </section>
          </div>
        ) : (
          <div className="text-center py-12 text-slate-700 font-bold text-sm">Đang nạp câu hỏi...</div>
        )}
      </main>

      {/* 4. MOBILE & TABLET STICKY BOTTOM NAVIGATION BAR (< lg) */}
      {currentQ && (
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t-2 border-slate-300 shadow-[0_-4px_16px_rgba(15,23,42,0.1)] px-3 py-2.5">
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="min-h-[44px] px-3.5 py-2 rounded-xl border-2 border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-950 text-xs sm:text-sm font-extrabold inline-flex items-center gap-1 disabled:opacity-35 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Trước</span>
            </button>

            <div className="text-center text-xs font-bold text-slate-800 tabular-nums">
              Đã làm <strong className="text-blue-700">{answeredCount}</strong>/{totalQuestions}
            </div>

            {currentIndex < totalQuestions - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs sm:text-sm font-extrabold inline-flex items-center gap-1 shadow-xs active:scale-[0.98]"
              >
                <span>Tiếp theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-extrabold inline-flex items-center gap-1 shadow-xs disabled:opacity-45 active:scale-[0.98]"
              >
                <span>{submitting ? 'Đang nộp...' : 'Nộp bài'}</span>
                <Send className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* 5. FULL QUESTION ROSTER MODAL (GROUPED BY SECTION, HIGH CONTRAST) */}
      {showGridDrawer && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/70 backdrop-blur-xs p-0 sm:p-4">
          <div className="w-full max-w-2xl rounded-t-3xl sm:rounded-2xl bg-white border-2 border-slate-300 p-4 sm:p-6 shadow-2xl max-h-[88dvh] flex flex-col">
            <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3 mb-4">
              <div>
                <h3 className="font-extrabold text-base text-slate-950">Bảng Tổng Quan {totalQuestions} Câu Hỏi</h3>
                <p className="text-xs font-semibold text-slate-700 mt-0.5 tabular-nums">
                  Đã hoàn thành {answeredCount}/{totalQuestions} câu ({solvedProgressPercent}%)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowGridDrawer(false)}
                className="p-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-200 transition-colors"
                aria-label="Đóng bảng câu hỏi"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 space-y-4 pr-1 light-scroll">
              {sections.map((sec) => {
                const secSolved = sec.items.filter(({ q }) => getQuestionStatus(q) !== 'UNANSWERED').length;
                return (
                  <div key={sec.id} className="p-3.5 rounded-xl bg-slate-100 border-2 border-slate-300 space-y-2.5">
                    <div className="flex items-center justify-between gap-2 text-xs font-extrabold text-slate-950">
                      <span className="flex items-center gap-2 min-w-0">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-700 shrink-0" />
                        <span className="truncate">{sec.title}</span>
                      </span>
                      <span className="text-xs font-mono tabular-nums text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-300 shrink-0">
                        {secSolved}/{sec.items.length}
                      </span>
                    </div>
                    <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
                      {sec.items.map(({ q, index }) => (
                        <button
                          key={q.id || index}
                          type="button"
                          onClick={() => {
                            setCurrentIndex(index);
                            setShowGridDrawer(false);
                          }}
                          className={`h-10 rounded-xl text-xs tabular-nums transition-[background-color,border-color] duration-150 flex items-center justify-center ${getTileClass(
                            q,
                            index,
                          )}`}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-3.5 border-t-2 border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-3 text-slate-800 font-bold">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-emerald-600 border border-emerald-700" />
                  <span>Đúng</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-amber-400 border border-amber-600" />
                  <span>Đúng (sau sửa)</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-rose-600 border border-rose-700" />
                  <span>Sai</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-white border-2 border-slate-400" />
                  <span>Chưa làm</span>
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowGridDrawer(false);
                    handleSubmit();
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold inline-flex items-center gap-1.5 transition-colors tabular-nums"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Nộp bài ({answeredCount}/{totalQuestions})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowGridDrawer(false)}
                  className="px-3.5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-900 text-xs font-bold border border-slate-300 transition-colors"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
