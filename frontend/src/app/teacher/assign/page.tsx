'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, getUser } from '@/lib/api';
import { Calendar, ArrowLeft, Send, CheckCircle, Clock } from 'lucide-react';

export default function AssignPage() {
  const router = useRouter();
  const [students, setStudents] = useState<any[]>([]);
  const [units, setUnits] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [studentId, setStudentId] = useState('');
  const [learningUnitId, setLearningUnitId] = useState('');
  const [assignedDate, setAssignedDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');

  useEffect(() => {
    const user = getUser();
    if (!user || user.role !== 'TEACHER') {
      router.push('/login');
      return;
    }

    const loadData = async () => {
      try {
        const [stds, allUnits, asgns] = await Promise.all([
          api.getStudents(),
          api.getUnits(),
          api.getTeacherAssignments(),
        ]);
        setStudents(stds);
        setUnits(allUnits);
        setAssignments(asgns);

        if (stds.length > 0) setStudentId(stds[0].id);
        if (allUnits.length > 0) setLearningUnitId(allUnits[0].id);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [router]);

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await api.createDailyAssignment({
        studentId,
        learningUnitId,
        assignedDate,
        teacherDailyNote: note,
      });

      alert('✓ Giao bài cho học sinh thành công!');
      setNote('');

      const updated = await api.getTeacherAssignments();
      setAssignments(updated);
    } catch (err: any) {
      alert(`Lỗi giao bài: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-50 text-slate-600 flex items-center justify-center p-8">Đang tải lịch giao bài...</div>;
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
            <Calendar className="w-5 h-5 text-purple-600" />
            <span>Lịch Giao Bài Hàng Ngày 1-kèm-1</span>
          </h1>
          <div className="w-20" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Giao Bài */}
          <div className="lg:col-span-1 rounded-3xl p-6 bg-white border border-slate-200 shadow-sm h-fit">
            <h2 className="text-base font-bold text-slate-900 mb-4">Giao Bài Học Mới Theo Ngày</h2>
            <form onSubmit={handleAssign} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Chọn học sinh:</label>
                <select
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-purple-600"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.full_name} (Lớp {s.student_profiles?.grade_level || 7})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Chọn bài học:</label>
                <select
                  value={learningUnitId}
                  onChange={(e) => setLearningUnitId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-purple-600"
                >
                  {units.map((u) => (
                    <option key={u.id} value={u.id}>
                      [{u.subjects?.name}] {u.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Ngày học:</label>
                <input
                  type="date"
                  required
                  value={assignedDate}
                  onChange={(e) => setAssignedDate(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Lời dặn dò của gia sư (Hiển thị cho Phụ huynh & Bé):
                </label>
                <textarea
                  rows={3}
                  placeholder="VD: Hôm nay con nhớ ôn kỹ phần dấu trừ khi chuyển vế nhé..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-purple-600"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm rounded-xl flex items-center justify-center space-x-2 shadow-sm transition disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Đang giao...' : 'Giao Bài Ngay'}</span>
              </button>
            </form>
          </div>

          {/* Lịch sử và danh sách các bài đã giao */}
          <div className="lg:col-span-2 rounded-3xl p-6 bg-white border border-slate-200 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-4">Các Buổi Học Đã Lên Lịch ({assignments.length})</h2>

            <div className="space-y-4">
              {assignments.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-purple-700">
                        {new Date(item.assigned_date).toLocaleDateString('vi-VN')}
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs font-semibold text-slate-900">
                        {item.users_daily_student_assignments_student_idTousers?.full_name}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">{item.learning_units?.title}</h4>
                    {item.teacher_daily_note && (
                      <p className="text-xs text-amber-900 bg-amber-50/80 px-2 py-1 rounded border border-amber-200/60 mt-1.5 italic">
                        💬 "{item.teacher_daily_note}"
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 sm:justify-end">
                    {item.assessment_attempts?.map((att: any) => {
                      const answered = att._count?.student_answers ?? 0;
                      const total = att.assessments?._count?.questions ?? 0;
                      return (
                        <span
                          key={att.id}
                          className={`text-[11px] px-2.5 py-1 rounded-lg font-bold border ${
                            att.status === 'GRADED'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : att.status === 'SUBMITTED'
                              ? 'bg-amber-50 text-amber-800 border-amber-300'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}
                        >
                          {att.status === 'GRADED'
                            ? `✓ Đã chấm (${answered}/${total} câu • ${att.total_score}đ)`
                            : att.status === 'SUBMITTED'
                            ? `★ Đã nộp (${answered}/${total} câu)`
                            : `Chưa làm (${total} câu)`}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
