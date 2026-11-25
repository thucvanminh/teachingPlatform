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
  // Trim parenthetical details for compact section pills while keeping the core label clear
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

  // Detect embedded Reading / Cloze / Announcement / Leaflet passages followed by **Question X:** or **Câu X:**
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

  // Reset inline explanation toggle when moving to a different question
  useEffect(() => {
    setShowExplanation(false);
    setMobilePassageOpen(true);
  }, [currentIndex]);

  // Group questions by section_name / sectionName
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

  // Evaluate correctness for instant feedback & inline explanation unlock
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

  const getTileClass = (q: any, i: number) => {
    const status = getQuestionStatus(q);
    const isCurrent = i === currentIndex;
    const currentRing = isCurrent ? 'ring-2 ring-blue-600 ring-offset-2 ring-offset-white z-10' : '';

    if (status === 'CORRECT') {
      return `border border-emerald-500 bg-emerald-50 text-emerald-800 font-bold ${currentRing}`;
    }
    if (status === 'CORRECT_AFTER_WRONG') {
      return `border border-amber-500 bg-amber-50 text-amber-900 font-bold ${currentRing}`;
    }
    if (status === 'WRONG') {
      return `border border-rose-500 bg-rose-50 text-rose-800 font-bold ${currentRing}`;
    }
    if (status === 'ANSWERED') {
      return `border border-blue-500 bg-blue-50 text-blue-800 font-bold ${currentRing}`;
    }
    return `border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-semibold ${currentRing}`;
  };

  const passageTextClass =
    passageSize === 'sm'
      ? 'text-sm leading-[1.7]'
      : passageSize === 'lg'
      ? 'text-[17px] leading-[1.8]'
      : 'text-[15px] sm:text-base leading-[1.75]';

  const questionTypeBadge =
    currentQ?.type === 'FILL_IN_BLANK'
      ? 'Điền từ tiếng Anh'
      : passage
      ? 'Đọc hiểu / Điền khuyết'
      : 'Trắc nghiệm';

  return (
    <div className="h-screen max-h-screen min-h-0 w-full overflow-hidden flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* 1. CLEAN EDITORIAL TOP BAR */}
      <header className="z-30 shrink-0 bg-white border-b border-slate-200/90">
        <div className="max-w-[1480px] w-full mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
          {/* Left: Back & Context */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <button
              type="button"
              onClick={onExit}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-950 text-xs font-semibold transition-[background-color,border-color,color] duration-150"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Rời phòng thi</span>
            </button>

            <div className="hidden md:flex items-center gap-2.5 min-w-0 pl-1">
              <div
                className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-white shadow-2xs ${
                  isNamViet ? 'bg-blue-600' : 'bg-indigo-600'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="min-w-0 leading-tight">
                <div className="text-xs sm:text-[13px] font-bold text-slate-900 truncate max-w-[280px] xl:max-w-[440px]">
                  {attempt?.assessments?.title || (isNamViet ? 'Bài Luyện Tập Tiếng Anh 12' : 'Bài Luyện Tập Tiếng Anh 11')}
                </div>
                <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                  {isNamViet
                    ? 'Nam Việt · Lớp 12 · Mục tiêu 7.0+ THPTQG'
                    : isThai
                    ? 'Thái · Lớp 11 · Mục tiêu 8.5+ THPT'
                    : 'Phòng luyện thi chuẩn hóa'}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Timer, Progress, Audio, Roster, Submit */}
          <div className="flex items-center gap-2 shrink-0">
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[38px] rounded-xl font-mono tabular-nums text-xs sm:text-sm font-bold border ${
                timeLeft < 600
                  ? 'bg-rose-50 border-rose-300 text-rose-700'
                  : 'bg-slate-900 border-slate-900 text-white'
              }`}
              title="Thời gian làm bài còn lại"
            >
              <Clock className={`w-3.5 h-3.5 ${timeLeft < 600 ? 'text-rose-600' : 'text-slate-300'}`} />
              <span>{formatTimer(timeLeft)}</span>
            </div>

            <button
              type="button"
              onClick={() => setShowGridDrawer(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[38px] rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold tabular-nums transition-[background-color,border-color] duration-150"
              title="Mở bảng tổng quan tất cả câu hỏi"
            >
              <Grid className="w-3.5 h-3.5 text-blue-600" />
              <span>
                Câu <strong>{currentIndex + 1}</strong>/{totalQuestions}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSoundMuted((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 min-h-[38px] rounded-xl border text-xs font-semibold transition-[background-color,border-color,color] duration-150 active:scale-[0.97] ${
                soundMuted
                  ? 'bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
              title={soundMuted ? 'Bật âm thanh phản hồi' : 'Tắt âm thanh phản hồi'}
            >
              {soundMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-blue-600" />
              )}
              <span className="hidden lg:inline">{soundMuted ? 'Đã tắt' : 'Âm thanh'}</span>
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 min-h-[38px] rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-2xs disabled:opacity-45 transition-[background-color,transform] duration-150 active:scale-[0.97] tabular-nums"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {submitting ? 'Đang nộp...' : `Nộp bài (${answeredCount}/${totalQuestions})`}
              </span>
              <span className="sm:hidden">{submitting ? '...' : 'Nộp'}</span>
            </button>
          </div>
        </div>

        {/* Completion Progress Bar */}
        <div className="w-full h-1 bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-[width] duration-300 ease-out"
            style={{ width: `${solvedProgressPercent}%` }}
          />
        </div>
      </header>

      {/* 2. SMART SECTION NAVIGATOR + CURRENT SECTION QUESTION STRIP */}
      <div className="z-20 shrink-0 bg-white/95 border-b border-slate-200/90">
        <div className="max-w-[1480px] w-full mx-auto px-3 sm:px-6 py-2 space-y-1.5">
          {/* Row 1: Section Pills (if more than 1 section) */}
          {sections.length > 1 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
              {sections.map((sec) => {
                const isActiveSec = activeSection?.id === sec.id;
                const secSolved = sec.items.filter(({ q }) => getQuestionStatus(q) !== 'UNANSWERED').length;
                const allSecSolved = secSolved === sec.items.length;

                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => {
                      const firstUnanswered = sec.items.find(({ q }) => getQuestionStatus(q) === 'UNANSWERED');
                      setCurrentIndex((firstUnanswered || sec.items[0]).index);
                    }}
                    className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-[background-color,border-color,color] duration-150 ${
                      isActiveSec
                        ? 'bg-blue-600 border-blue-600 text-white shadow-2xs'
                        : allSecSolved
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                    title={sec.title}
                  >
                    <span>{sec.shortTitle}</span>
                    <span
                      className={`font-mono tabular-nums text-[10px] px-1.5 py-0.2 rounded ${
                        isActiveSec
                          ? 'bg-blue-500/70 text-white'
                          : allSecSolved
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-white text-slate-600 border border-slate-200'
                      }`}
                    >
                      {secSolved}/{sec.items.length}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Row 2: Question Numbers in Active Section */}
          {activeSection && (
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none">
                {activeSection.items.map(({ q, index }) => (
                  <button
                    key={q.id || index}
                    type="button"
                    aria-current={index === currentIndex ? 'step' : undefined}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-8 min-w-[2.25rem] px-2 rounded-lg text-xs tabular-nums transition-[background-color,border-color,transform] duration-150 flex items-center justify-center shrink-0 ${getTileClass(
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
                className="shrink-0 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[11px] font-semibold inline-flex items-center gap-1.5 transition-[background-color,border-color] duration-150"
              >
                <Grid className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline tabular-nums">Tất cả {totalQuestions} câu</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3. MAIN EDITORIAL EXAM WORKSPACE */}
      <main className="flex-1 min-h-0 w-full max-w-[1480px] mx-auto p-3 sm:p-5 lg:p-6 overflow-hidden flex flex-col">
        {currentQ ? (
          <div className="w-full h-full min-h-0 lg:grid lg:grid-cols-12 lg:gap-5 xl:gap-6 flex flex-col gap-3 overflow-y-auto lg:overflow-hidden">
            {/* LEFT PANE: READING PASSAGE OR QUESTION STEM */}
            <section className="lg:col-span-7 rounded-2xl bg-white border border-slate-200/90 shadow-xs p-4 sm:p-6 flex flex-col min-h-0 lg:h-full shrink-0 lg:shrink">
              {/* Card Meta Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4 shrink-0">
                <div className="flex flex-wrap items-center gap-2 min-w-0">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200/80 text-xs font-bold truncate max-w-[340px] sm:max-w-[440px]">
                    {currentQ.question_payload?.sectionName ||
                      currentQ.question_payload?.section_name ||
                      questionTypeBadge}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 tabular-nums">
                    Câu {currentIndex + 1} / {totalQuestions}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {passage && (
                    <div className="hidden sm:flex items-center gap-0.5 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[11px] font-bold">
                      <button
                        type="button"
                        onClick={() => setPassageSize('sm')}
                        className={`px-2 py-0.5 rounded-md transition-colors ${
                          passageSize === 'sm' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                        }`}
                        title="Cỡ chữ nhỏ"
                      >
                        A-
                      </button>
                      <button
                        type="button"
                        onClick={() => setPassageSize('base')}
                        className={`px-2 py-0.5 rounded-md transition-colors ${
                          passageSize === 'base' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                        }`}
                        title="Cỡ chữ chuẩn"
                      >
                        A
                      </button>
                      <button
                        type="button"
                        onClick={() => setPassageSize('lg')}
                        className={`px-2 py-0.5 rounded-md transition-colors ${
                          passageSize === 'lg' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                        }`}
                        title="Cỡ chữ lớn"
                      >
                        A+
                      </button>
                    </div>
                  )}

                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200/80 font-mono tabular-nums">
                    {currentQ.points} điểm
                  </span>
                </div>
              </div>

              {/* Optional Diagram */}
              {currentQ.question_payload?.diagram_url && (
                <div className="shrink-0 mb-4 p-3 rounded-xl border border-slate-200 bg-slate-50 flex flex-col items-center">
                  <img
                    src={currentQ.question_payload.diagram_url}
                    alt={currentQ.question_payload.diagram_alt || 'Hình minh họa'}
                    className="max-h-[200px] w-auto object-contain rounded-lg"
                  />
                  {currentQ.question_payload.reference_note && (
                    <p className="text-xs mt-2 text-slate-600 text-center">
                      {currentQ.question_payload.reference_note}
                    </p>
                  )}
                </div>
              )}

              {/* Case A: Reading / Cloze / Announcement Passage */}
              {passage ? (
                <div className="flex-1 min-h-0 flex flex-col">
                  <div className="flex items-center justify-between mb-2 shrink-0">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-wider">
                      <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                      <span>Văn bản đọc hiểu / Ngữ liệu</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMobilePassageOpen((prev) => !prev)}
                      className="lg:hidden inline-flex items-center gap-1 text-xs font-semibold text-blue-600 px-2 py-1 rounded-md hover:bg-blue-50"
                    >
                      <span>{mobilePassageOpen ? 'Thu gọn' : 'Mở bài đọc'}</span>
                      {mobilePassageOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {mobilePassageOpen && (
                    <div className="flex-1 min-h-0 overflow-y-auto rounded-xl bg-slate-50/80 border border-slate-200/90 p-4 sm:p-5">
                      <FormattedContent
                        variant="light"
                        text={passage}
                        className={`text-slate-800 font-normal max-w-[68ch] ${passageTextClass}`}
                      />
                    </div>
                  )}
                </div>
              ) : (
                /* Case B: Standalone Vocab / Word Formation / Grammar Question */
                <div className="flex-1 min-h-0 overflow-y-auto flex flex-col justify-center py-2 pr-1">
                  <div className="max-w-[66ch]">
                    <FormattedContent
                      variant="light"
                      text={prompt}
                      className="text-slate-900 font-normal text-[17px] sm:text-[19px] leading-[1.75]"
                    />
                  </div>
                </div>
              )}
            </section>

            {/* RIGHT PANE: PROMPT (IF PASSAGE) + OPTIONS + FEEDBACK + NAVIGATION */}
            <section className="lg:col-span-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs p-4 sm:p-6 flex flex-col justify-between min-h-0 lg:h-full shrink-0 lg:shrink">
              <div className="flex-1 min-h-0 overflow-y-auto pr-0.5 flex flex-col">
                {/* If passage is displayed on the left, show the active question prompt cleanly above options */}
                {passage ? (
                  <div className="mb-4 p-3.5 rounded-xl bg-blue-50/50 border border-blue-200/70 shrink-0">
                    <FormattedContent
                      variant="light"
                      text={prompt}
                      className="text-slate-900 font-medium text-[15px] sm:text-base leading-relaxed"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-between mb-3 shrink-0">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {currentQ.type === 'FILL_IN_BLANK'
                        ? 'Nhập đáp án của con'
                        : 'Chọn 1 đáp án đúng nhất'}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400">
                      {questionTypeBadge}
                    </span>
                  </div>
                )}

                {/* MULTIPLE_CHOICE OPTIONS */}
                {currentQ.type === 'MULTIPLE_CHOICE' && currentQ.question_payload?.options && (
                  <div className="space-y-2.5 my-auto">
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
                          className={`w-full min-h-[52px] py-3 px-3.5 rounded-xl text-left border text-sm sm:text-[15px] flex items-center justify-between gap-3 transition-[background-color,border-color,box-shadow,transform] duration-150 ease-out active:scale-[0.985] ${
                            isShaking ? 'animate-shake' : ''
                          } ${
                            isSelected
                              ? isWrong
                                ? 'bg-rose-50 border-rose-500 text-rose-950 ring-1 ring-rose-500/40 shadow-2xs'
                                : isCorrect
                                ? 'bg-emerald-50 border-emerald-600 text-emerald-950 ring-1 ring-emerald-500/40 shadow-2xs'
                                : 'bg-blue-50 border-blue-600 text-blue-950 ring-1 ring-blue-500/40 shadow-2xs'
                              : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300 shadow-2xs'
                          }`}
                        >
                          <div className="flex items-start gap-3 min-w-0">
                            <span
                              className={`w-7 h-7 sm:w-8 sm:h-8 mt-0.5 shrink-0 rounded-lg flex items-center justify-center font-mono font-bold text-xs sm:text-sm transition-colors duration-150 ${
                                isSelected
                                  ? isWrong
                                    ? 'bg-rose-600 text-white'
                                    : isCorrect
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-blue-600 text-white'
                                  : 'bg-slate-100 text-slate-700 border border-slate-200'
                              }`}
                            >
                              {opt.id}
                            </span>
                            <div
                              className={`leading-snug break-words pt-0.5 ${
                                isWrong
                                  ? 'text-rose-950 font-semibold'
                                  : isCorrect
                                  ? 'text-emerald-950 font-semibold'
                                  : 'text-slate-900 font-medium'
                              }`}
                            >
                              <FormattedContent variant="light" text={opt.text} />
                            </div>
                          </div>

                          {isSelected && (
                            <span className="shrink-0">
                              {isWrong ? (
                                <X className="w-5 h-5 text-rose-600 stroke-[2.5]" />
                              ) : isCorrect ? (
                                <Check className="w-5 h-5 text-emerald-600 stroke-[2.5]" />
                              ) : (
                                <Check className="w-5 h-5 text-blue-600 stroke-[2.5]" />
                              )}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* FILL_IN_BLANK INPUT (English tailored) */}
                {currentQ.type === 'FILL_IN_BLANK' && (
                  <div className="space-y-3 my-auto">
                    <div className={`flex items-center gap-2 ${shakingFillInput === currentQ.id ? 'animate-shake' : ''}`}>
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
                        className={`flex-1 min-w-0 min-h-[48px] px-3.5 py-2.5 rounded-xl text-sm sm:text-base font-medium focus:outline-none transition-[background-color,border-color,box-shadow] duration-150 ${
                          isFillCorrect
                            ? 'bg-emerald-50 border-2 border-emerald-500 text-emerald-950 font-semibold'
                            : isFillWrong
                            ? 'bg-rose-50 border-2 border-rose-500 text-rose-950 font-semibold'
                            : 'bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => handleCheckFillBlank(currentQ)}
                        className={`shrink-0 min-h-[48px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 transition-[background-color,transform] duration-150 active:scale-[0.97] ${
                          isFillCorrect
                            ? 'bg-emerald-600 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-2xs'
                        }`}
                      >
                        <Check className="w-4 h-4 stroke-[2.5]" />
                        <span>Kiểm tra</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Gợi ý: Nhấn <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono text-[10px]">Enter</kbd> để kiểm tra đáp án ngay.
                    </p>
                  </div>
                )}

                {/* Feedback Banner + Inline Explanation (only unlocks when solved correctly) */}
                {(isMcqWrong || isFillWrong) && (
                  <div className="mt-3 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-semibold flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-600 shrink-0 stroke-[2.5]" />
                    <span>
                      {isFillWrong
                        ? 'Chưa chính xác! Hãy kiểm tra lại chính tả hoặc dạng từ rồi bấm Kiểm tra nhé.'
                        : 'Chưa chính xác! Con hãy đọc kỹ lại ngữ cảnh và chọn đáp án khác nhé.'}
                    </span>
                  </div>
                )}

                {(isMcqCorrect || isFillCorrect) && (
                  <div className="mt-3 space-y-2">
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                        <span>Chính xác! Con làm rất tốt.</span>
                      </div>
                      {canRevealExplanation && (
                        <button
                          type="button"
                          onClick={() => setShowExplanation((prev) => !prev)}
                          className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100/70 text-[11px] font-bold transition-colors"
                        >
                          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                          <span>{showExplanation ? 'Ẩn giải thích' : 'Xem giải thích'}</span>
                        </button>
                      )}
                    </div>

                    {showExplanation && currentQ?.grading_key_payload?.explanation_markdown && (
                      <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/90 text-xs sm:text-[13px] text-slate-800 leading-relaxed max-h-44 overflow-y-auto">
                        <FormattedContent
                          variant="light"
                          text={currentQ.grading_key_payload.explanation_markdown}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Controls Deck */}
              <div className="shrink-0 pt-3.5 mt-3 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                    disabled={currentIndex === 0}
                    className="min-h-[44px] px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 disabled:opacity-35 disabled:cursor-not-allowed transition-[background-color,border-color] duration-150"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Câu trước</span>
                  </button>

                  <div className="text-center text-xs text-slate-500 tabular-nums">
                    Đã làm <strong className="text-blue-600 font-bold">{answeredCount}</strong>/{totalQuestions}
                  </div>

                  {currentIndex < totalQuestions - 1 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
                      className="min-h-[44px] px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 shadow-2xs transition-[background-color,transform] duration-150 active:scale-[0.98]"
                    >
                      <span>Tiếp theo</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="min-h-[44px] px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 shadow-2xs disabled:opacity-45 transition-[background-color,transform] duration-150 active:scale-[0.98]"
                    >
                      <span>{submitting ? 'Đang nộp...' : 'Nộp bài thi'}</span>
                      <Send className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {currentQ.type === 'MULTIPLE_CHOICE' && (
                  <p className="hidden sm:block text-center text-[11px] text-slate-400">
                    Phím tắt: <kbd className="font-mono text-slate-600">A–D</kbd> hoặc <kbd className="font-mono text-slate-600">1–4</kbd> chọn đáp án • <kbd className="font-mono text-slate-600">←</kbd> <kbd className="font-mono text-slate-600">→</kbd> chuyển câu
                  </p>
                )}
              </div>
            </section>
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500 text-sm">Đang nạp câu hỏi...</div>
        )}
      </main>

      {/* 4. FULL QUESTION ROSTER MODAL (GROUPED BY SECTION) */}
      {showGridDrawer && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/60 backdrop-blur-xs p-0 sm:p-4">
          <div className="w-full max-w-2xl rounded-t-3xl sm:rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <div>
                <h3 className="font-bold text-base text-slate-900">Bảng Tổng Quan {totalQuestions} Câu Hỏi</h3>
                <p className="text-xs text-slate-500 mt-0.5 tabular-nums">
                  Đã hoàn thành {answeredCount} trên tổng số {totalQuestions} câu ({solvedProgressPercent}%)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowGridDrawer(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Đóng bảng câu hỏi"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 space-y-4 pr-1">
              {sections.map((sec) => {
                const secSolved = sec.items.filter(({ q }) => getQuestionStatus(q) !== 'UNANSWERED').length;
                return (
                  <div key={sec.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2.5">
                    <div className="flex items-center justify-between gap-2 text-xs font-bold text-slate-800">
                      <span className="flex items-center gap-2 min-w-0">
                        <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                        <span className="truncate">{sec.title}</span>
                      </span>
                      <span className="text-[11px] font-mono tabular-nums text-slate-500 shrink-0">
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

            <div className="mt-4 pt-3.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-3 text-slate-600">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded border border-emerald-500 bg-emerald-50" />
                  <strong className="text-emerald-700">Đúng</strong>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded border border-amber-500 bg-amber-50" />
                  <strong className="text-amber-800">Đúng sau khi sửa</strong>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded border border-rose-500 bg-rose-50" />
                  <strong className="text-rose-700">Sai</strong>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded border border-slate-200 bg-white" />
                  <span>Chưa làm</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowGridDrawer(false);
                    handleSubmit();
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors tabular-nums"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Nộp bài ({answeredCount}/{totalQuestions})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowGridDrawer(false)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
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
