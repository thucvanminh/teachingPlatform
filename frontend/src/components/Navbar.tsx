'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { getUser, clearToken } from '@/lib/api';
import { LogOut, Rocket, GraduationCap, Eye, User } from 'lucide-react';

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUserState] = useState<any>(null);

  useEffect(() => {
    const updateUser = () => {
      setUserState(getUser());
    };

    updateUser();

    window.addEventListener('lms-auth-change', updateUser);
    window.addEventListener('storage', updateUser);

    return () => {
      window.removeEventListener('lms-auth-change', updateUser);
      window.removeEventListener('storage', updateUser);
    };
  }, [pathname]);

  const handleLogout = () => {
    clearToken();
    setUserState(null);
    router.push('/login');
  };

  const isCosmic = user?.username === 'keithley' || user?.studentProfile?.grade_level === 7 || user?.studentProfile?.grade_level === 9;
  const isKids = user?.studentProfile?.grade_level === 2;

  return (
    <nav
      className={`border-b transition-all duration-300 sticky top-0 z-50 backdrop-blur-md ${
        isCosmic
          ? 'bg-[#05070E]/80 border-cyan-500/20 text-slate-100'
          : isKids
          ? 'bg-amber-50/90 border-amber-200 text-slate-800'
          : 'bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                isCosmic
                  ? 'bg-gradient-to-tr from-cyan-600 to-purple-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                  : isKids
                  ? 'bg-pink-500 text-white shadow-md'
                  : 'bg-blue-600 text-white'
              }`}
            >
              {isCosmic ? <Rocket className="w-5 h-5 animate-pulse" /> : <GraduationCap className="w-5 h-5" />}
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight">
                {isCosmic ? (
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Keithley Cosmic Academy
                  </span>
                ) : isKids ? (
                  <span className="text-pink-600 font-extrabold font-serif">Vương Quốc Toán Học</span>
                ) : (
                  'LMS 1-on-1 Tutoring'
                )}
              </span>
              <p className="text-xs opacity-60">Gia Sư Cá Nhân Hóa</p>
            </div>
          </Link>

          {/* Links for Teacher */}
          {user?.role === 'TEACHER' && (
            <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <Link href="/teacher" className="hover:text-blue-500 transition">
                Tổng quan
              </Link>
              <Link href="/teacher/curriculum" className="hover:text-blue-500 transition">
                Kho bài học
              </Link>
              <Link href="/teacher/assign" className="hover:text-blue-500 transition">
                Lịch giao bài
              </Link>
              <Link href="/teacher/grading" className="hover:text-blue-500 transition text-amber-500 font-semibold">
                Bàn chấm bài
              </Link>
            </div>
          )}

          {/* Links for Student */}
          {user?.role === 'STUDENT' && (
            <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <Link
                href="/student"
                className={`transition ${isCosmic ? 'text-cyan-400 hover:text-cyan-300 font-semibold' : 'text-blue-600'}`}
              >
                {isCosmic ? '🛸 Trung Tâm Chỉ Huy' : 'Trang học tập'}
              </Link>
            </div>
          )}

          {/* Links for Parent */}
          {user?.role === 'PARENT' && (
            <div className="hidden md:flex items-center space-x-3 text-sm font-medium text-emerald-500">
              <Eye className="w-4 h-4" />
              <span>Chế độ Phụ huynh (Chỉ đọc)</span>
            </div>
          )}

          {/* User profile & Logout */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium leading-none">{user.fullName || user.username}</p>
                  <span
                    className={`inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      user.role === 'TEACHER'
                        ? 'bg-blue-100 text-blue-800'
                        : user.role === 'STUDENT'
                        ? isCosmic
                          ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                          : 'bg-pink-100 text-pink-700'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {user.role === 'TEACHER' ? 'Giáo viên' : user.role === 'STUDENT' ? 'Học sinh' : 'Phụ huynh'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800 text-slate-500 hover:text-red-500 transition"
                  title="Đăng xuất"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
