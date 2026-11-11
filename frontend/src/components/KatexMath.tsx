'use client';

import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface KatexMathProps {
  math: string;
  block?: boolean;
  className?: string;
}

export function KatexMath({ math, block = false, className = '' }: KatexMathProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
        output: 'html', // Strictly generate HTML only to avoid MathML raw text duplication (A O B ^ AOB)
      });
    } catch (e) {
      return math;
    }
  }, [math, block]);

  return (
    <span
      className={`katex-wrapper inline-block ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

// Helper to render markdown bold (**text**), inline code (`code`), and clean up stray tokens
function renderMarkdownTokens(rawText: string, customStrongClass?: string): React.ReactNode {
  if (!rawText) return null;
  const parts = rawText.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      const inner = part.slice(2, -2);
      const isQuestionHeading = /^question\s*\d+/i.test(inner.trim()) || /^câu\s*\d+/i.test(inner.trim());

      if (customStrongClass) {
        return (
          <strong key={i} className={customStrongClass}>
            {inner}
          </strong>
        );
      }

      // Màu đỏ đô (Crimson / Deep Burgundy #881337) tạo độ tương phản cao, chuyên nghiệp, không lóe mắt
      if (isQuestionHeading) {
        return (
          <strong
            key={i}
            className="font-black text-[#881337] dark:text-[#fb7185] bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-md border border-rose-200 dark:border-rose-800/60 mr-1.5 inline-block tracking-tight shadow-2xs"
          >
            {inner}
          </strong>
        );
      }

      return (
        <strong
          key={i}
          className="font-bold text-[#881337] dark:text-rose-300 tracking-tight"
        >
          {inner}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      const inner = part.slice(1, -1);
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 rounded bg-rose-50/80 text-[#881337] border border-rose-200/70 dark:bg-slate-800 dark:text-rose-300 dark:border-rose-500/30 font-mono text-xs font-semibold"
        >
          {inner}
        </code>
      );
    }
    return part;
  });
}

// Hàm phân giải chuỗi text chứa hỗn hợp Markdown (ảnh ![alt](url), in đậm **text**) và LaTeX $...$ hoặc $$...$$
export function FormattedContent({
  text,
  className = '',
  strongClassName,
}: {
  text: string;
  className?: string;
  strongClassName?: string;
}) {
  if (!text) return null;

  // Tách các đoạn ảnh ![](), $$...$$ và $...$
  const parts = useMemo(() => {
    const segments: {
      type: 'text' | 'inline-math' | 'block-math' | 'image';
      content: string;
      alt?: string;
      src?: string;
    }[] = [];
    let remaining = text;

    // Regex
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/;
    const blockRegex = /\$\$([\s\S]*?)\$\$/;
    const inlineRegex = /\$([^\$]+?)\$/;

    while (remaining.length > 0) {
      const imgMatch = imageRegex.exec(remaining);
      const blockMatch = blockRegex.exec(remaining);
      const inlineMatch = inlineRegex.exec(remaining);

      // Tìm match xuất hiện sớm nhất
      const matches = [
        imgMatch ? { match: imgMatch, type: 'image' as const } : null,
        blockMatch ? { match: blockMatch, type: 'block-math' as const } : null,
        inlineMatch ? { match: inlineMatch, type: 'inline-math' as const } : null,
      ].filter(Boolean) as { match: RegExpExecArray; type: 'image' | 'block-math' | 'inline-math' }[];

      if (matches.length === 0) {
        segments.push({ type: 'text', content: remaining });
        break;
      }

      // Sắp xếp theo index nhỏ nhất
      matches.sort((a, b) => a.match.index - b.match.index);
      const earliest = matches[0];

      if (earliest.match.index > 0) {
        segments.push({ type: 'text', content: remaining.slice(0, earliest.match.index) });
      }

      if (earliest.type === 'image') {
        segments.push({
          type: 'image',
          content: earliest.match[0],
          alt: earliest.match[1] || 'Geometry Diagram',
          src: earliest.match[2],
        });
      } else if (earliest.type === 'block-math') {
        segments.push({
          type: 'block-math',
          content: earliest.match[1],
        });
      } else if (earliest.type === 'inline-math') {
        segments.push({
          type: 'inline-math',
          content: earliest.match[1],
        });
      }

      remaining = remaining.slice(earliest.match.index + earliest.match[0].length);
    }

    return segments;
  }, [text]);

  return (
    <div className={`whitespace-pre-line leading-relaxed text-inherit ${className}`}>
      {parts.map((p, idx) => {
        if (p.type === 'image' && p.src) {
          const isKidImg = p.src.includes('lop1') || p.src.includes('kids');
          return (
            <div key={idx} className="my-4 flex flex-col items-center w-full">
              <img
                src={p.src}
                alt={p.alt || 'Hình minh họa'}
                className={`max-w-full sm:max-w-md max-h-72 w-auto rounded-2xl shadow-md p-1 object-contain mx-auto transition-transform hover:scale-[1.01] ${
                  isKidImg
                    ? 'border-2 border-pink-200 bg-white shadow-pink-100'
                    : 'border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.25)] bg-[#0A0E1A]/90'
                }`}
              />
              {p.alt && (
                <span
                  className={`text-xs mt-1.5 font-bold tracking-wide text-center ${
                    isKidImg ? 'text-pink-700' : 'text-cyan-300/80'
                  }`}
                >
                  {p.alt}
                </span>
              )}
            </div>
          );
        }
        if (p.type === 'block-math') {
          return (
            <div key={idx} className="my-3 text-center overflow-x-auto py-2 text-inherit">
              <KatexMath math={p.content} block />
            </div>
          );
        }
        if (p.type === 'inline-math') {
          return <KatexMath key={idx} math={p.content} block={false} />;
        }
        return <span key={idx} className="text-inherit">{renderMarkdownTokens(p.content, strongClassName)}</span>;
      })}
    </div>
  );
}
