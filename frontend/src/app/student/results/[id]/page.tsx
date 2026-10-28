'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { api, getUser } from '@/lib/api';
import { SpaceBackground } from '@/components/SpaceBackground';
import { FormattedContent } from '@/components/KatexMath';
import { Rocket, Award, Star, ArrowLeft, MessageSquare, CheckCircle, XCircle } from 'lucide-react';

export default function StudentResultPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const attemptId = resolvedParams.id;
  const router = useRouter();

  const [attempt, setAttempt] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-cyan-400">
        <Rocket className="w-8 h-8 animate-bounce mr-3" />
        <span>Đang nạp kết quả thám hiểm...</span>
      </div>
    );
  }

  const questions = attempt?.assessments?.questions || [];
  const answersMap = new Map((attempt?.student_answers || []).map((a: any) => [a.question_id, a]));

  return (
    <SpaceBackground>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <button
          onClick={() => router.push('/student')}
          className="flex items-center space-x-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về Trung Tâm Chỉ Huy</span>
        </button>

        {/* Score Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900/90 via-slate-900/95 to-slate-900/90 border border-cyan-500/40 backdrop-blur-xl shadow-[0_0_35px_rgba(6,182,212,0.2)] mb-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">
              BẢNG TỔNG KẾT NHIỆM VỤ
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {attempt.assessments?.title}
            </h1>
            <p className="text-xs text-slate-400 mt-2">
              Thời gian hoàn thành: {Math.floor(attempt.time_spent_seconds / 60)} phút • Học sinh: {attempt.users_assessment_attempts_student_idTousers?.full_name}
            </p>
          </div>

          <div className="flex items-center space-x-3 p-4 rounded-2xl bg-slate-800/80 border border-cyan-500/30">
            <Award className="w-10 h-10 text-amber-400" />
            <div className="text-right">
              <span className="text-xs text-slate-400 block font-semibold">TỔNG ĐIỂM</span>
              <span className="text-3xl font-black text-cyan-400">
                {attempt.total_score}{' '}
                <span className="text-sm text-slate-400 font-normal">/ {attempt.assessments?.max_score}</span>
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
                Thông Điệp Đánh Giá Từ Thầy Minh (Trạm Chỉ Huy)
              </h3>
              <p className="text-slate-200 text-sm mt-1 italic leading-relaxed">
                "{attempt.overall_feedback}"
              </p>
            </div>
          </div>
        )}

        {/* Question by Question Review */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-200">Chi Tiết Từng Câu Hỏi & Lời Giải:</h2>

          {questions.map((q: any, idx: number) => {
            const studentAns = answersMap.get(q.id) as any;
            const isCorrect = studentAns?.is_correct;
            const pointsEarned = studentAns?.awarded_points || 0;

            return (
              <div
                key={q.id}
                className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <span className="text-sm font-bold text-white flex items-center space-x-2">
                    {isCorrect === true ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    ) : isCorrect === false ? (
                      <XCircle className="w-4 h-4 text-red-400" />
                    ) : (
                      <Star className="w-4 h-4 text-amber-400" />
                    )}
                    <span>Câu {idx + 1}</span>
                  </span>
                  <span className="text-xs font-bold text-cyan-400">
                    Đạt: {pointsEarned} / {q.points} điểm
                  </span>
                </div>

                {/* Question */}
                <div className="text-slate-200 text-sm mb-4">
                  <FormattedContent text={q.question_payload?.content_markdown || q.question_payload?.prompt_markdown || ''} />
                </div>

                {/* Student Answer */}
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 mb-3">
                  <span className="font-bold text-slate-400 block mb-1">Bài làm của học sinh:</span>
                  {studentAns?.answer_payload?.selected_option_id ? (
                    <span className="font-bold text-cyan-400 text-sm">
                      Đã chọn phương án: {studentAns.answer_payload.selected_option_id}
                    </span>
                  ) : studentAns?.answer_payload?.text ? (
                    <span className="font-mono text-cyan-400 text-sm">
                      {studentAns.answer_payload.text}
                    </span>
                  ) : (
                    <span>{studentAns?.answer_payload?.text_response || 'Đã nộp ảnh bài giải'}</span>
                  )}

                  {/* Student images if any */}
                  {studentAns?.answer_payload?.image_urls && studentAns.answer_payload.image_urls.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {studentAns.answer_payload.image_urls.map((u: string, i: number) => (
                        <img key={i} src={u} alt="Ảnh vở" className="w-20 h-20 object-cover rounded-lg border border-slate-700" />
                      ))}
                    </div>
                  )}
                </div>

                {/* Teacher Comment */}
                {studentAns?.teacher_comment && (
                  <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-300 mb-3">
                    <span className="font-bold block mb-1">Lời phê của Thầy:</span>
                    <p className="italic">"{studentAns.teacher_comment}"</p>
                  </div>
                )}

                {/* Explanation / Grading Key */}
                {q.grading_key_payload?.explanation_markdown && (
                  <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 text-xs text-slate-300">
                    <span className="font-bold text-amber-400 block mb-1">Lời giải chi tiết:</span>
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
