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
      setError(err.message || 'Tài khoản hoặc mật khẩu không chính xác.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090b10] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-zinc-800 selection:text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-[380px]">
        {/* Minimalist Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-100 shadow-sm mb-4">
            <svg
              className="w-5 h-5 text-zinc-200"
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
          <h1 className="text-xl font-semibold tracking-tight text-zinc-100">
            Đăng nhập
          </h1>
          <p className="text-xs text-zinc-400 mt-1.5 font-normal">
            Hệ thống học tập cá nhân hóa 1-on-1
          </p>
        </div>

        {/* Minimalist Card */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 sm:p-7 shadow-xl backdrop-blur-sm">
          {error && (
            <div className="mb-5 px-3.5 py-2.5 rounded-lg bg-red-950/40 border border-red-800/50 text-red-300 text-xs flex items-center justify-between">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="identifier"
                className="block text-xs font-medium text-zinc-300 mb-1.5"
              >
                Tên đăng nhập hoặc Email
              </label>
              <input
                id="identifier"
                type="text"
                autoComplete="username"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Nhập tài khoản..."
                className="w-full px-3.5 py-2.5 bg-zinc-950/70 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-zinc-300 mb-1.5"
              >
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu..."
                  className="w-full pl-3.5 pr-10 py-2.5 bg-zinc-950/70 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="pt-1">
              <button
                type="submit"
                disabled={loading || !identifier.trim() || !password}
                className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl text-sm font-medium bg-zinc-100 text-zinc-950 hover:bg-white active:bg-zinc-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-zinc-700" />
                ) : (
                  'Tiếp tục'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Minimal Footer */}
        <p className="text-center text-[11px] text-zinc-400 mt-6 font-mono">
          © 2026 Tutoring LMS Platform
        </p>
      </div>
    </div>
  );
}
