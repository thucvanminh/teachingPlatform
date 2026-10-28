'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { api, getUser } from '@/lib/api';
import { SpaceBackground } from '@/components/SpaceBackground';
import { FormattedContent } from '@/components/KatexMath';
import {
  Rocket,
  Clock,
  Send,
  Upload,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  Image as ImageIcon,
  Check,
} from 'lucide-react';

export default function MissionRoomPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const attemptId = resolvedParams.id;
  const router = useRouter();

  const [attempt, setAttempt] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeLeft, setTimeLeft] = useState<number>(5400); // Mặc định 90 phút = 5400 giây

  useEffect(() => {
    const user = getUser();
    if (!user || user.role !== 'STUDENT') {
      router.push('/login');
      return;
    }

    const initAttempt = async () => {
      try {
        // Khởi động attempt nếu chưa bắt đầu
        await api.startAttempt(attemptId).catch(() => {});
        const data = await api.getAttemptDetails(attemptId);
        setAttempt(data);

        // Khởi tạo thời gian làm bài nếu có giới hạn
        if (data.assessments?.time_limit_minutes) {
          const totalSecs = data.assessments.time_limit_minutes * 60;
          setTimeLeft(totalSecs);
        }

        // Tải lại câu trả lời cũ nếu có
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

  // Bộ đếm thời gian
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
    const confirm = window.confirm('Con có chắc chắn muốn nộp bài làm này không?');
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

      alert('🚀 Nộp bài thành công! Thầy Minh sẽ kiểm tra và gửi bản tin nhận xét sớm cho con.');
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

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-cyan-400">
        <Rocket className="w-8 h-8 animate-bounce mr-3" />
        <span>Đang nạp đề bài từ trạm chỉ huy...</span>
      </div>
    );
  }

  const questions = attempt?.assessments?.questions || [];

  return (
    <SpaceBackground>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Floating Mission Control Bar */}
        <div className="sticky top-20 z-40 p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/40 backdrop-blur-xl shadow-[0_0_25px_rgba(6,182,212,0.2)] mb-8 flex items-center justify-between">
          <button
            onClick={() => router.push('/student')}
            className="flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Rời Phòng</span>
          </button>

          <div className="flex items-center space-x-3">
            <span className="text-xs text-slate-400 uppercase tracking-widest hidden sm:inline">
              Thời Gian Quỹ Đạo:
            </span>
            <div
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-mono text-base font-bold border ${
                timeLeft < 600
                  ? 'bg-red-950/80 border-red-500 text-red-400 animate-pulse'
                  : 'bg-cyan-950/80 border-cyan-500/50 text-cyan-400'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{formatTimer(timeLeft)}</span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="py-2 px-5 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-semibold text-sm shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center space-x-2 transition disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{submitting ? 'Đang truyền...' : 'Nộp Bài'}</span>
          </button>
        </div>

        {/* Title Header */}
        <div className="mb-8">
          <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">
            {attempt.assessments?.type === 'IN_SESSION_90M' ? 'Nhiệm Vụ Quỹ Đạo 90 Phút' : 'Thử Thách Bài Tập Về Nhà'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            {attempt.assessments?.title}
          </h1>
          {attempt.assessments?.instructions && (
            <p className="text-sm text-slate-400 mt-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              💡 <strong>Hướng dẫn:</strong> {attempt.assessments.instructions}
            </p>
          )}
        </div>

        {/* Question List */}
        <div className="space-y-8 pb-16">
          {questions.map((q: any, index: number) => {
            const currentAnswer = answers[q.id] || {};

            return (
              <div
                key={q.id}
                className="rounded-3xl p-6 sm:p-8 bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 backdrop-blur-xl shadow-xl transition"
              >
                {/* Question Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                  <span className="text-sm font-bold text-cyan-400">
                    Câu {index + 1} •{' '}
                    <span className="text-slate-400 font-normal">
                      {q.type === 'MULTIPLE_CHOICE'
                        ? 'Trắc nghiệm'
                        : q.type === 'FILL_IN_BLANK'
                        ? 'Điền đáp số'
                        : 'Tự luận / Chụp ảnh vở'}
                    </span>
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-amber-400 border border-amber-500/20">
                    {q.points} điểm
                  </span>
                </div>

                {/* Question Content (Markdown + KaTeX Math) */}
                <div className="text-slate-100 text-base mb-6 leading-relaxed">
                  <FormattedContent
                    text={q.question_payload?.content_markdown || q.question_payload?.prompt_markdown || ''}
                  />
                </div>

                {/* A. MULTIPLE_CHOICE Input */}
                {q.type === 'MULTIPLE_CHOICE' && q.question_payload?.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {q.question_payload.options.map((opt: any) => {
                      const isSelected = currentAnswer.selected_option_id === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectOption(q.id, opt.id)}
                          className={`p-4 rounded-2xl text-left border text-sm font-medium transition flex items-center justify-between ${
                            isSelected
                              ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                              : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:border-slate-500 hover:bg-slate-800'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span
                              className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                                isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                              }`}
                            >
                              {opt.id}
                            </span>
                            <FormattedContent text={opt.text} />
                          </div>
                          {isSelected && <Check className="w-5 h-5 text-cyan-400 flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* B. FILL_IN_BLANK Input */}
                {q.type === 'FILL_IN_BLANK' && (
                  <div>
                    <input
                      type="text"
                      placeholder="Nhập kết quả số hoặc từ của con vào đây..."
                      value={currentAnswer.text || ''}
                      onChange={(e) => handleFillText(q.id, e.target.value)}
                      className="w-full sm:w-80 p-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm font-mono"
                    />
                  </div>
                )}

                {/* C. ESSAY_UPLOAD Input (Text / LaTeX & Chụp ảnh vở nộp bài) */}
                {q.type === 'ESSAY_UPLOAD' && (
                  <div className="space-y-4">
                    {q.question_payload?.guidelines && (
                      <p className="text-xs text-amber-300/90 italic bg-amber-950/30 p-2.5 rounded-lg border border-amber-500/20">
                        📌 {q.question_payload.guidelines}
                      </p>
                    )}

                    {/* Gõ lời giải / LaTeX */}
                    <textarea
                      rows={4}
                      placeholder="Con có thể gõ tóm tắt lời giải hoặc mã LaTeX công thức tại đây..."
                      value={currentAnswer.text_response || ''}
                      onChange={(e) => handleEssayText(q.id, e.target.value)}
                      className="w-full p-3.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
                    />

                    {/* Khu vực nộp ảnh bài làm */}
                    <div className="p-4 rounded-2xl bg-slate-950/60 border border-dashed border-cyan-500/40">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                        <div className="flex items-center space-x-2 text-xs text-cyan-400 font-semibold">
                          <ImageIcon className="w-4 h-4" />
                          <span>Ảnh bài làm trong vở (Đính kèm):</span>
                        </div>

                        {/* Nút đính kèm ảnh mẫu nhanh cho bài Toán */}
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() =>
                              handleAddSampleImage(
                                q.id,
                                '/images/cosmic/cosmic_slide_bg.jpg'
                              )
                            }
                            className="px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-300 text-xs flex items-center space-x-1.5 transition"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Tải Ảnh Chụp Vở Lên</span>
                          </button>
                        </div>
                      </div>

                      {/* Hiển thị danh sách ảnh đã chụp */}
                      {currentAnswer.image_urls && currentAnswer.image_urls.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                          {currentAnswer.image_urls.map((url: string, imgIdx: number) => (
                            <div key={imgIdx} className="relative group rounded-xl overflow-hidden border border-cyan-500/30">
                              <img src={url} alt={`Bài nộp ${imgIdx + 1}`} className="w-full h-24 object-cover" />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                                <span className="text-[10px] text-white bg-slate-900/80 px-2 py-0.5 rounded">
                                  Trang {imgIdx + 1}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-500 text-center py-2">
                          Chưa có ảnh nào được tải lên. Con có thể dùng điện thoại chụp vở bài tập rồi chọn file.
                        </p>
                      )}
                    </div>
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
