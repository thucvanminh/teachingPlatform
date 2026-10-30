'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api, getUser } from '@/lib/api';
import { FormattedContent } from '@/components/KatexMath';
import {
  CheckSquare,
  Award,
  ArrowLeft,
  CheckCircle,
  Image as ImageIcon,
  Save,
  MessageSquare,
} from 'lucide-react';

function GradingStudioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryAttemptId = searchParams.get('attemptId');

  const [pendingList, setPendingList] = useState<any[]>([]);
  const [selectedAttemptId, setSelectedAttemptId] = useState<string | null>(queryAttemptId);
  const [attemptData, setAttemptData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form state
  const [grades, setGrades] = useState<Record<string, { points: number; comment: string; annotatedUrl: string }>>({});
  const [overallFeedback, setOverallFeedback] = useState('');

  useEffect(() => {
    const user = getUser();
    if (!user || user.role !== 'TEACHER') {
      router.push('/login');
      return;
    }

    const loadPending = async () => {
      try {
        const list = await api.getPendingGrading();
        setPendingList(list);
        if (!selectedAttemptId && list.length > 0) {
          setSelectedAttemptId(list[0].id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPending();
  }, [router, selectedAttemptId]);

  useEffect(() => {
    if (!selectedAttemptId) return;

    const loadDetail = async () => {
      try {
        const detail = await api.getAttemptDetails(selectedAttemptId);
        setAttemptData(detail);

        // Khởi tạo điểm cho từng câu
        const initialGrades: Record<string, any> = {};
        (detail.student_answers || []).forEach((sa: any) => {
          initialGrades[sa.question_id] = {
            points: Number(sa.awarded_points || 0),
            comment: sa.teacher_comment || '',
            annotatedUrl: sa.annotated_image_url || '',
          };
        });
        setGrades(initialGrades);
        setOverallFeedback(detail.overall_feedback || '');
      } catch (err: any) {
        alert(err.message || 'Lỗi tải bài làm');
      }
    };

    loadDetail();
  }, [selectedAttemptId]);

  const handleSaveGrade = async () => {
    if (!selectedAttemptId) return;
    setSaving(true);

    try {
      const formattedGrades = Object.entries(grades).map(([qId, data]) => ({
        questionId: qId,
        awardedPoints: Number(data.points || 0),
        teacherComment: data.comment || undefined,
        annotatedImageUrl: data.annotatedUrl || undefined,
      }));

      await api.gradeAttempt(selectedAttemptId, {
        grades: formattedGrades,
        overallFeedback,
      });

      alert('✓ Chấm điểm và gửi nhận xét thành công!');
      // Tải lại danh sách
      const list = await api.getPendingGrading();
      setPendingList(list);
      if (list.length > 0) {
        setSelectedAttemptId(list[0].id);
      } else {
        setSelectedAttemptId(null);
        setAttemptData(null);
      }
    } catch (err: any) {
      alert(`Lỗi lưu điểm: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-50 text-slate-600 flex items-center justify-center p-8">Đang tải bàn chấm bài...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <button
            onClick={() => router.push('/teacher')}
            className="flex items-center space-x-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Về Bàn Làm Việc</span>
          </button>
          <h1 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <CheckSquare className="w-5 h-5 text-amber-600" />
            <span>Bàn Chấm Bài Tự Luận Của Giáo Viên</span>
          </h1>
          <div className="w-20" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar: Danh sách bài nộp chờ chấm */}
          <div className="lg:col-span-1 rounded-3xl p-4 bg-white border border-slate-200 shadow-sm h-fit space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2">
              Bài Chờ Chấm ({pendingList.length})
            </h3>
            {pendingList.length === 0 ? (
              <p className="text-xs text-slate-400 px-2 py-4">Tất cả bài tập đã được chấm xong!</p>
            ) : (
              pendingList.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedAttemptId(item.id)}
                  className={`w-full p-3.5 rounded-2xl text-left border transition ${
                    selectedAttemptId === item.id
                      ? 'bg-amber-50 border-amber-300 text-amber-950 shadow-xs'
                      : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="font-bold text-sm block">
                    {item.users_assessment_attempts_student_idTousers?.full_name}
                  </span>
                  <span className="text-xs text-slate-500 block mt-0.5">{item.assessments?.title}</span>
                  <span className="inline-block mt-1.5 text-[11px] font-bold text-amber-800 bg-amber-100/90 px-2 py-0.5 rounded-md border border-amber-200">
                    Đã làm {item._count?.student_answers ?? 0}/{item.assessments?._count?.questions ?? 0} câu
                  </span>
                </button>
              ))
            )}
          </div>

          {/* Main: Khung chấm điểm chi tiết */}
          <div className="lg:col-span-3">
            {attemptData ? (
              <div className="space-y-6">
                {/* Header bài nộp */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Đang Chấm Bài</span>
                    <h2 className="text-2xl font-bold text-slate-900 mt-1">{attemptData.assessments?.title}</h2>
                    <p className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-2">
                      <span>Học sinh: <strong className="text-slate-800">{attemptData.users_assessment_attempts_student_idTousers?.full_name}</strong></span>
                      <span>•</span>
                      <span>Thời gian làm bài: {Math.floor((attemptData.time_spent_seconds || 0) / 60)} phút</span>
                      <span>•</span>
                      <span className="font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        Đã làm: {attemptData.student_answers?.length || 0} / {attemptData.assessments?.questions?.length || 0} câu
                      </span>
                    </p>
                  </div>

                  <button
                    onClick={handleSaveGrade}
                    disabled={saving}
                    className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm flex items-center space-x-2 shadow-sm transition disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>{saving ? 'Đang lưu...' : 'Hoàn Tất Chấm Điểm'}</span>
                  </button>
                </div>

                {/* Danh sách câu hỏi cần chấm */}
                <div className="space-y-6">
                  {attemptData.assessments?.questions?.map((q: any, idx: number) => {
                    const studentAns = (attemptData.student_answers || []).find((a: any) => a.question_id === q.id);
                    const isEssay = q.type === 'ESSAY_UPLOAD';
                    const gradeInfo = grades[q.id] || { points: 0, comment: '', annotatedUrl: '' };

                    return (
                      <div key={q.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <span className="font-bold text-sm text-slate-900">
                            Câu {idx + 1} • <span className="text-slate-500 font-normal">{q.type}</span>
                          </span>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                            Thang điểm: {q.points}
                          </span>
                        </div>

                        {/* Đề bài */}
                        <div className="text-slate-800 text-sm">
                          <FormattedContent text={q.question_payload?.content_markdown || q.question_payload?.prompt_markdown || ''} />
                        </div>

                        {/* Bài làm của học sinh */}
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                          <span className="font-bold text-slate-600 block mb-1">Học sinh nộp:</span>
                          {studentAns?.answer_payload?.selected_option_id && (
                            <p className="text-blue-700 font-bold text-sm">
                              Đáp án chọn: {studentAns.answer_payload.selected_option_id} (
                              {studentAns.is_correct ? 'Đúng' : 'Sai'})
                            </p>
                          )}
                          {studentAns?.answer_payload?.text && (
                            <p className="text-blue-700 font-mono text-sm">{studentAns.answer_payload.text}</p>
                          )}
                          {studentAns?.answer_payload?.text_response && (
                            <p className="text-slate-800 text-sm whitespace-pre-wrap">{studentAns.answer_payload.text_response}</p>
                          )}

                          {/* Ảnh bài làm trong vở */}
                          {studentAns?.answer_payload?.image_urls && studentAns.answer_payload.image_urls.length > 0 && (
                            <div className="mt-3">
                              <span className="font-bold text-blue-700 block mb-2">Ảnh chụp bài giải trong vở:</span>
                              <div className="grid grid-cols-2 gap-3">
                                {studentAns.answer_payload.image_urls.map((img: string, i: number) => (
                                  <div key={i} className="rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                                    <img src={img} alt={`Bài làm ${i + 1}`} className="w-full h-48 object-cover hover:scale-105 transition" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Thang chấm điểm (Rubric) gợi ý nếu có */}
                        {q.grading_key_payload?.rubric && (
                          <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900">
                            <span className="font-bold block mb-1">Tiêu chí chấm (Rubric):</span>
                            {q.grading_key_payload.rubric.map((r: any, rIdx: number) => (
                              <p key={rIdx}>• {r.criteria}: tối đa {r.max_points} đ</p>
                            ))}
                          </div>
                        )}

                        {/* Form nhập điểm & nhận xét của giáo viên */}
                        {isEssay && (
                          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
                            <div className="flex items-center space-x-4">
                              <label className="text-xs font-bold text-amber-900">Điểm chấm câu này:</label>
                              <input
                                type="number"
                                step="0.25"
                                min="0"
                                max={Number(q.points)}
                                value={gradeInfo.points}
                                onChange={(e) =>
                                  setGrades((prev) => ({
                                    ...prev,
                                    [q.id]: { ...prev[q.id], points: parseFloat(e.target.value) || 0 },
                                  }))
                                }
                                className="w-24 p-2 bg-white border border-amber-300 rounded-lg text-slate-900 font-bold text-sm text-center shadow-xs"
                              />
                              <span className="text-xs text-slate-500">/ {q.points} điểm</span>
                            </div>

                            <div>
                              <label className="text-xs font-bold text-amber-900 block mb-1">Lời phê chi tiết cho câu này:</label>
                              <input
                                type="text"
                                placeholder="VD: Bước 2 giải đúng, nhưng kết luận chưa ghi đơn vị..."
                                value={gradeInfo.comment}
                                onChange={(e) =>
                                  setGrades((prev) => ({
                                    ...prev,
                                    [q.id]: { ...prev[q.id], comment: e.target.value },
                                  }))
                                }
                                className="w-full p-2.5 bg-white border border-amber-300 rounded-lg text-slate-900 text-xs shadow-xs"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Lời phê tổng quan */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
                  <label className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4 text-purple-600" />
                    <span>Lời Phê & Nhận Xét Tổng Quan Buổi Học (Hiển thị cho Phụ huynh & Học sinh):</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="VD: Hôm nay con làm bài tập trung, phần tự luận trình bày tiến bộ rõ rệt..."
                    value={overallFeedback}
                    onChange={(e) => setOverallFeedback(e.target.value)}
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>
              </div>
            ) : (
              <div className="p-12 rounded-3xl bg-white text-center border border-slate-200 text-slate-500 shadow-sm">
                Hãy chọn một bài nộp ở cột bên trái để bắt đầu chấm.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TeacherGradingPage() {
  return (
    <Suspense fallback={<div className="p-8 text-white">Đang tải bàn chấm bài...</div>}>
      <GradingStudioContent />
    </Suspense>
  );
}
