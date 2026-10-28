'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Rocket, Sparkles, GraduationCap, Eye, ArrowRight, ShieldCheck, CheckCircle2, BookOpen } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  const handleQuickLogin = async (username: string, redirectPath: string) => {
    try {
      await api.login(username, 'Password123!');
      router.push(redirectPath);
    } catch (err: any) {
      alert(`Đăng nhập thất bại: ${err.message}. Hãy đảm bảo Backend đang chạy tại port 3001!`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-cyan-900/30 via-purple-900/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-6 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
          <Sparkles className="w-4 h-4" />
          <span>Hệ Thống LMS Gia Sư Cá Nhân Hóa 1-kèm-1</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
          Học Tập Đa Môn Học & Thích Ứng Theo{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Từng Lứa Tuổi
          </span>
        </h1>

        <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
          Mỗi học sinh sở hữu một lộ trình học tập riêng mỗi ngày. Từ thế giới thần tiên của bé Lớp 2 đến trạm vũ trụ Toán
          7 & Hóa 9 của bạn Keithley.
        </p>
      </div>

      {/* Quick Launchpad - Bento Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <h2 className="text-xl font-bold mb-6 text-slate-300 flex items-center space-x-2">
          <span>🚀 Chọn Không Gian Đăng Nhập Trải Nghiệm Nhanh:</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Keithley Lake - Lớp 7 & 9 (Cosmic Space) */}
          <div className="relative group rounded-2xl overflow-hidden border border-cyan-500/40 bg-slate-900/80 p-6 flex flex-col justify-between hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)] transition duration-300">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:scale-105 transition duration-500 pointer-events-none"
              style={{ backgroundImage: `url('/images/cosmic/bg_cockpit.jpg')` }}
            />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mb-4 shadow-lg">
                <Rocket className="w-6 h-6 animate-pulse" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Lớp 7 & 9 (Toán & Hóa)</span>
              <h3 className="text-xl font-bold mt-1 text-white">Keithley Lake</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Theme Vũ Trụ (Cosmic Space HUD): Trạm chỉ huy, bài tập 90p quỹ đạo, bộ gõ KaTeX & nộp ảnh bài giải tự luận.
              </p>
            </div>
            <button
              onClick={() => handleQuickLogin('keithley', '/student')}
              className="mt-6 relative z-10 w-full py-2.5 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-sm font-semibold rounded-xl flex items-center justify-center space-x-2 shadow-lg transition"
            >
              <span>Vào Trạm Vũ Trụ</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: An Lake - Lớp 1 (Kids Wonderland) */}
          <div className="relative group rounded-2xl overflow-hidden border border-pink-500/40 bg-slate-900/80 p-6 flex flex-col justify-between hover:border-pink-400 hover:shadow-[0_0_30px_rgba(236,72,153,0.25)] transition duration-300">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:scale-105 transition duration-500 pointer-events-none"
              style={{ backgroundImage: `url('/images/kids/princess_math.png')` }}
            />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-pink-950 border border-pink-500/40 text-pink-400 flex items-center justify-center mb-4 shadow-lg">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-pink-400">Toán Lớp 1</span>
              <h3 className="text-xl font-bold mt-1 text-white">An Lake</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Theme Hoạt Hình Thần Tiên (Kids Elementary): Công chúa & rồng xanh, phép tính vui nhộn, nút bấm 3D thân thiện.
              </p>
            </div>
            <button
              onClick={() => handleQuickLogin('an_lake', '/student')}
              className="mt-6 relative z-10 w-full py-2.5 px-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-sm font-semibold rounded-xl flex items-center justify-center space-x-2 shadow-lg transition"
            >
              <span>Vào Lớp Học An Lake</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3: Thái - Lớp 11 (Tiếng Anh 11) */}
          <div className="relative group rounded-2xl overflow-hidden border border-blue-500/40 bg-slate-900/80 p-6 flex flex-col justify-between hover:border-blue-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] transition duration-300">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-blue-950 border border-blue-500/40 text-blue-400 flex items-center justify-center mb-4 shadow-lg">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Tiếng Anh Lớp 11</span>
              <h3 className="text-xl font-bold mt-1 text-white">Thái</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Theme Trung Học Nâng Cao: Bài đọc hiểu chuyên sâu, ngữ pháp nâng cao và bài kiểm tra trắc nghiệm định dạng thi.
              </p>
            </div>
            <button
              onClick={() => handleQuickLogin('thai', '/student')}
              className="mt-6 relative z-10 w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl flex items-center justify-center space-x-2 shadow-lg transition"
            >
              <span>Vào Lớp Học Thái</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 4: Nam Việt - Lớp 12 (Luyện Thi THPTQG) */}
          <div className="relative group rounded-2xl overflow-hidden border border-amber-500/40 bg-slate-900/80 p-6 flex flex-col justify-between hover:border-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] transition duration-300">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-amber-950 border border-amber-500/40 text-amber-400 flex items-center justify-center mb-4 shadow-lg">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Luyện Thi Lớp 12</span>
              <h3 className="text-xl font-bold mt-1 text-white">Nam Việt</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Mục tiêu 9.0+ THPT Quốc Gia: Đề thi thử bấm giờ áp lực thi thật, phân tích bẫy đề và chiến thuật giải nhanh.
              </p>
            </div>
            <button
              onClick={() => handleQuickLogin('nam_viet', '/student')}
              className="mt-6 relative z-10 w-full py-2.5 px-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-sm font-semibold rounded-xl flex items-center justify-center space-x-2 shadow-lg transition"
            >
              <span>Vào Lớp Học Nam Việt</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 5: Giáo Viên - Teacher Studio */}
          <div className="relative group rounded-2xl overflow-hidden border border-purple-500/40 bg-slate-900/80 p-6 flex flex-col justify-between hover:border-purple-400 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)] transition duration-300">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-purple-950 border border-purple-500/40 text-purple-400 flex items-center justify-center mb-4 shadow-lg">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Quản Trị / Gia Sư</span>
              <h3 className="text-xl font-bold mt-1 text-white">Thầy Minh (Tutor)</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Toàn quyền: Soạn bài giảng KaTeX, giao bài hàng ngày cho 4 học sinh, bàn chấm bài tự luận kèm khoanh vẽ ảnh.
              </p>
            </div>
            <button
              onClick={() => handleQuickLogin('teacher', '/teacher')}
              className="mt-6 relative z-10 w-full py-2.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl flex items-center justify-center space-x-2 shadow-lg transition"
            >
              <span>Vào Bàn Làm Việc Thầy</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 6: Phụ Huynh - Read-Only Observer */}
          <div className="relative group rounded-2xl overflow-hidden border border-emerald-500/40 bg-slate-900/80 p-6 flex flex-col justify-between hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.25)] transition duration-300">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-4 shadow-lg">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Giám Sát Tiến Độ</span>
              <h3 className="text-xl font-bold mt-1 text-white">Cổng Phụ Huynh</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Chế độ Chỉ Đọc (Read-only): Xem đề bài, bài làm của con, điểm số, thời gian làm và lời nhận xét của giáo viên.
              </p>
            </div>
            <button
              onClick={() => handleQuickLogin('parent_nam', '/parent')}
              className="mt-6 relative z-10 w-full py-2.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-semibold rounded-xl flex items-center justify-center space-x-2 shadow-lg transition"
            >
              <span>Vào Cổng Phụ Huynh</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
