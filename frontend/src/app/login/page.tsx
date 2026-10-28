'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Rocket, GraduationCap, Lock, User, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.login(identifier, password);
      const role = res.user.role;

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
      setError(err.message || 'Đăng nhập không thành công');
    } finally {
      setLoading(false);
    }
  };

  const fillAccount = (u: string, p: string = 'Password123!') => {
    setIdentifier(u);
    setPassword(p);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-12 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] -top-32 -left-32 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -bottom-32 -right-32 pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative z-10">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-cyan-600 to-purple-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] mb-4">
            <Rocket className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Đăng Nhập Hệ Thống</h2>
          <p className="text-xs text-slate-400 mt-1">Học sinh, Giáo viên và Phụ huynh</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-sm flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Tên đăng nhập hoặc Email
            </label>
            <div className="relative">
              <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="VD: keithley hoặc teacher"
                className="w-full pl-11 pr-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Mật khẩu
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-semibold rounded-xl text-sm shadow-[0_0_20px_rgba(6,182,212,0.3)] transition disabled:opacity-50"
          >
            {loading ? 'Đang xác thực...' : 'Đăng Nhập'}
          </button>
        </form>

        {/* Quick fill buttons */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <p className="text-xs text-slate-400 text-center mb-3">Tài khoản mẫu có sẵn (Click để điền nhanh):</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => fillAccount('keithley')}
              className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/20 text-left transition"
            >
              🚀 <strong>Keithley</strong> (Toán 7 & Hóa 9)
            </button>
            <button
              onClick={() => fillAccount('student_g2')}
              className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-pink-400 border border-pink-500/20 text-left transition"
            >
              👑 <strong>Bé An</strong> (Toán lớp 2)
            </button>
            <button
              onClick={() => fillAccount('teacher')}
              className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-400 border border-purple-500/20 text-left transition"
            >
              🎓 <strong>Thầy Minh</strong> (Giáo viên)
            </button>
            <button
              onClick={() => fillAccount('parent_nam')}
              className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/20 text-left transition"
            >
              👁️ <strong>Chị Mai</strong> (Phụ huynh)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
