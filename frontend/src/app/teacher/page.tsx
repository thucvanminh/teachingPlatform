'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api, getUser } from '@/lib/api';
import {
  Users,
  BookOpen,
  Calendar,
  CheckSquare,
  Award,
  ArrowRight,
  PlusCircle,
  Clock,
  Sparkles,
} from 'lucide-react';

export default function TeacherDashboard() {
  const router = useRouter();
  const [students, setStudents] = useState<any[]>([]);
  const [units, setUnits] = useState<any[]>([]);
  const [pendingGrading, setPendingGrading] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getUser();
    if (!user || user.role !== 'TEACHER') {
      router.push('/login');
      return;
    }

    const loadData = async () => {
      try {
        const [stds, uts, pending, asgns] = await Promise.all([
          api.getStudents().catch(() => []),
          api.getUnits().catch(() => []),
          api.getPendingGrading().catch(() => []),
          api.getTeacherAssignments().catch(() => []),
        ]);
        setStudents(stds);
        setUnits(uts);
        setPendingGrading(pending);
        setAssignments(asgns);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500">
        Đang nạp dữ liệu bàn làm việc...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <span className="text-xs font-bold text-purple-700 tracking-wider uppercase">
              STUDIO GIA SƯ • THẦY THỨC
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Bàn Làm Việc Giáo Viên</h1>
            <p className="text-sm text-slate-500 mt-1">
              Quản lý học sinh, thiết kế lộ trình 1-kèm-1 và chấm điểm bài tập hàng ngày.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/teacher/curriculum"
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-sm font-semibold text-slate-700 border border-slate-200 shadow-sm flex items-center space-x-2 transition"
            >
              <PlusCircle className="w-4 h-4 text-purple-600" />
              <span>Soạn Bài Mới</span>
            </Link>
            <Link
              href="/teacher/assign"
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-sm font-semibold text-white shadow-sm flex items-center space-x-2 transition"
            >
              <Calendar className="w-4 h-4" />
              <span>Giao Bài Hôm Nay</span>
            </Link>
          </div>
        </div>

        {/* Bento Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-semibold block">Học Sinh 1-on-1</span>
              <span className="text-2xl font-black text-slate-900">{students.length} học sinh</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center font-bold text-xl">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-semibold block">Kho Bài Học</span>
              <span className="text-2xl font-black text-slate-900">{units.length} chuyên đề</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center font-bold text-xl">
              <CheckSquare className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-semibold block">Chờ Chấm Tự Luận</span>
              <span className="text-2xl font-black text-amber-600">{pendingGrading.length} bài nộp</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xl">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-semibold block">Lịch Đã Giao</span>
              <span className="text-2xl font-black text-emerald-600">{assignments.length} buổi</span>
            </div>
          </div>
        </div>

        {/* Section 1: Bài nộp chờ chấm (Actionable Alert) */}
        {pendingGrading.length > 0 && (
          <div className="p-6 rounded-3xl bg-amber-50 border border-amber-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-amber-900 flex items-center space-x-2">
                <span>📝 Có {pendingGrading.length} bài làm của học sinh đang chờ chấm điểm:</span>
              </h2>
              <Link
                href="/teacher/grading"
                className="text-xs font-semibold text-amber-800 hover:text-amber-900 flex items-center space-x-1"
              >
                <span>Mở Bàn Chấm Bài</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingGrading.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-white border border-amber-200/80 shadow-sm flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {item.users_assessment_attempts_student_idTousers?.full_name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">{item.assessments?.title}</p>
                  </div>
                  <Link
                    href={`/teacher/grading?attemptId=${item.id}`}
                    className="py-1.5 px-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-lg transition shadow-sm"
                  >
                    Chấm Ngay
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 2: Danh sách Học sinh 1-on-1 */}
        <div className="rounded-3xl p-6 bg-white border border-slate-200/90 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center space-x-2">
            <Users className="w-5 h-5 text-purple-600" />
            <span>Danh Sách Học Sinh Kèm 1-1</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {students.map((std) => (
              <div
                key={std.id}
                className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-purple-300 transition shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-purple-700">
                    Khối Lớp {std.student_profiles?.grade_level || 7}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                    {std.student_profiles?.ui_theme}
                  </span>
                </div>
                <h3 className="font-bold text-base text-slate-900">{std.full_name}</h3>
                <p className="text-xs text-slate-500 mt-1">Username: {std.username}</p>

                {std.student_profiles?.tutor_private_notes && (
                  <div className="mt-3 p-2.5 rounded-xl bg-amber-50/70 text-xs text-amber-900 italic border border-amber-200/60">
                    📌 {std.student_profiles.tutor_private_notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
