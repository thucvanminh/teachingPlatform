'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api, getUser, getToken } from '@/lib/api';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lang, setLang] = useState<'vi' | 'en'>('vi');

  useEffect(() => {
    if (identifier.toLowerCase().includes('keithley')) {
      setLang('en');
    }
  }, [identifier]);

  useEffect(() => {
    const user = getUser();
    const token = getToken();
    if (user && token) {
      if (user.role === 'TEACHER') router.replace('/teacher');
      else if (user.role === 'STUDENT') router.replace('/student');
      else if (user.role === 'PARENT') router.replace('/parent');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password) return;

    setError('');
    setLoading(true);

    try {
      const res = await api.login(identifier.trim(), password);
      const role = res.user?.role;

      if (role === 'TEACHER') {
        router.push('/teacher');
      } else if (role === 'STUDENT') {
        router.push('/student');
      } else if (role === 'PARENT') {
        router.push('/parent');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      setError(
        lang === 'en'
          ? err.message || 'Incorrect username or password.'
          : err.message || 'Tài khoản hoặc mật khẩu không chính xác.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100/70 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-slate-200 selection:text-slate-900 relative">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center space-x-1 p-1 bg-white border border-slate-200 rounded-xl shadow-xs text-xs font-semibold">
        <button
          type="button"
          onClick={() => setLang('vi')}
          className={`px-2.5 py-1 rounded-lg transition ${
            lang === 'vi' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Tiếng Việt
        </button>
        <button
          type="button"
          onClick={() => setLang('en')}
          className={`px-2.5 py-1 rounded-lg transition ${
            lang === 'en' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          English
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-[390px]">
        {/* Minimalist Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white border border-slate-200/80 text-slate-800 shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-4">
            <svg
              className="w-6 h-6 text-slate-700"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
              <path d="M6 6h10" />
              <path d="M6 10h10" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {lang === 'en' ? 'Sign In' : 'Đăng nhập'}
          </h1>
          <p className="text-xs text-slate-500 mt-1.5 font-normal">
            {lang === 'en' ? '1-on-1 Personalized Tutoring LMS' : 'Hệ thống học tập cá nhân hóa 1-on-1'}
          </p>
        </div>

        {/* Minimalist Card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-7 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          {error && (
            <div className="mb-5 px-3.5 py-2.5 rounded-xl bg-red-50 border border-red-200/80 text-red-600 text-xs flex items-center justify-between">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="identifier"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                {lang === 'en' ? 'Username or Email' : 'Tên đăng nhập hoặc Email'}
              </label>
              <input
                id="identifier"
                type="text"
                autoComplete="username"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={lang === 'en' ? 'Enter username or email...' : 'Nhập tên tài khoản...'}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:bg-white focus:ring-1 focus:ring-slate-800 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                {lang === 'en' ? 'Password' : 'Mật khẩu'}
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={lang === 'en' ? 'Enter password...' : 'Nhập mật khẩu...'}
                  className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:bg-white focus:ring-1 focus:ring-slate-800 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                  tabIndex={-1}
                  aria-label={
                    showPassword
                      ? lang === 'en' ? 'Hide password' : 'Ẩn mật khẩu'
                      : lang === 'en' ? 'Show password' : 'Hiện mật khẩu'
                  }
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || !identifier.trim() || !password}
                className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : (
                  lang === 'en' ? 'Sign In' : 'Đăng nhập'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Minimal Footer */}
        <p className="text-center text-[11px] text-slate-400 mt-6 font-mono">
          © 2026 Tutoring LMS Platform
        </p>
      </div>
    </div>
  );
}
