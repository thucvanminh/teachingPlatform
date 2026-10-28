'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, getUser } from '@/lib/api';
import { FormattedContent } from '@/components/KatexMath';
import { BookOpen, Plus, ArrowLeft, Check, Sparkles } from 'lucide-react';

export default function CurriculumPage() {
  const router = useRouter();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [units, setUnits] = useState<any[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // New Unit Form
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [lectureMarkdown, setLectureMarkdown] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const user = getUser();
    if (!user || user.role !== 'TEACHER') {
      router.push('/login');
      return;
    }

    const loadData = async () => {
      try {
        const [subjs, allUnits] = await Promise.all([api.getSubjects(), api.getUnits()]);
        setSubjects(subjs);
        setUnits(allUnits);
        if (subjs.length > 0) {
          setSelectedSubjectId(subjs[0].id);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [router]);

  const handleCreateUnit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    try {
      await api.createUnit({
        subjectId: selectedSubjectId,
        title,
        description,
        lectureContentMarkdown: lectureMarkdown,
      });

      alert('✓ Tạo bài học mới thành công!');
      setShowModal(false);
      setTitle('');
      setDescription('');
      setLectureMarkdown('');

      const updated = await api.getUnits();
      setUnits(updated);
    } catch (err: any) {
      alert(`Lỗi tạo bài: ${err.message}`);
    } finally {
      setCreating(false);
    }
  };

  const filteredUnits = selectedSubjectId
    ? units.filter((u) => u.subject_id === selectedSubjectId)
    : units;

  if (loading) {
    return <div className="min-h-screen bg-slate-950 text-white p-8">Đang tải kho bài học...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <button
            onClick={() => router.push('/teacher')}
            className="flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Về Bàn Làm Việc</span>
          </button>
          <h1 className="text-xl font-bold text-white flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <span>Kho Bài Học & Soạn Giáo Án KaTeX</span>
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="py-2 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center space-x-1.5 transition shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Soạn Bài Mới</span>
          </button>
        </div>

        {/* Filter by Subject */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {subjects.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setSelectedSubjectId(sub.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                selectedSubjectId === sub.id
                  ? 'bg-purple-600 text-white border-purple-500 shadow-md'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {sub.name} (Khối {sub.target_grade})
            </button>
          ))}
        </div>

        {/* Units Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUnits.map((u) => (
            <div key={u.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-purple-400 uppercase">
                  {u.subjects?.name}
                </span>
                <h3 className="text-lg font-bold text-white mt-2 leading-snug">{u.title}</h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">{u.description || 'Chưa có mô tả'}</p>

                <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
                  <span>{u.assessments?.length || 0} bài tập đính kèm</span>
                  <span className="text-purple-400 font-semibold">Tái sử dụng</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Soạn Bài Học Mới */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-white mb-4">Soạn Bài Học Mới</h2>
              <form onSubmit={handleCreateUnit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Môn học</label>
                  <select
                    value={selectedSubjectId}
                    onChange={(e) => setSelectedSubjectId(e.target.value)}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                  >
                    {subjects.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} (Khối {s.target_grade})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Tiêu đề bài học</label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Chuyên đề 2: Phương trình bậc nhất"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Mô tả ngắn</label>
                  <input
                    type="text"
                    placeholder="Tóm tắt nội dung trọng tâm..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Nội dung lý thuyết (Hỗ trợ Markdown & KaTeX Toán/Hóa: $a^2 + b^2 = c^2$)
                  </label>
                  <textarea
                    rows={6}
                    placeholder="# 1. Lý thuyết..."
                    value={lectureMarkdown}
                    onChange={(e) => setLectureMarkdown(e.target.value)}
                    className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm font-mono"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm text-slate-400 hover:text-white"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={creating}
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-xl"
                  >
                    {creating ? 'Đang lưu...' : 'Lưu Bài Học'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
