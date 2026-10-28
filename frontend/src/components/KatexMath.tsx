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
      });
    } catch (e) {
      return math;
    }
  }, [math, block]);

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

// Hàm phân giải chuỗi text chứa hỗn hợp Markdown và LaTeX $...$ hoặc $$...$$
export function FormattedContent({ text, className = '' }: { text: string; className?: string }) {
  if (!text) return null;

  // Tách các đoạn $$...$$ và $...$
  const parts = useMemo(() => {
    const segments: { type: 'text' | 'inline-math' | 'block-math'; content: string }[] = [];
    let remaining = text;

    // Tìm block math $$...$$
    const blockRegex = /\$\$([\s\S]*?)\$\$/;
    const inlineRegex = /\$([^\$]+?)\$/;

    while (remaining.length > 0) {
      const blockMatch = blockRegex.exec(remaining);
      const inlineMatch = inlineRegex.exec(remaining);

      // Tìm vị trí gần nhất
      const nextMatch =
        blockMatch && inlineMatch
          ? blockMatch.index < inlineMatch.index
            ? { match: blockMatch, isBlock: true }
            : { match: inlineMatch, isBlock: false }
          : blockMatch
          ? { match: blockMatch, isBlock: true }
          : inlineMatch
          ? { match: inlineMatch, isBlock: false }
          : null;

      if (!nextMatch) {
        segments.push({ type: 'text', content: remaining });
        break;
      }

      const matchIndex = nextMatch.match.index;
      if (matchIndex > 0) {
        segments.push({ type: 'text', content: remaining.slice(0, matchIndex) });
      }

      segments.push({
        type: nextMatch.isBlock ? 'block-math' : 'inline-math',
        content: nextMatch.match[1],
      });

      remaining = remaining.slice(matchIndex + nextMatch.match[0].length);
    }

    return segments;
  }, [text]);

  return (
    <div className={`whitespace-pre-line leading-relaxed ${className}`}>
      {parts.map((p, idx) => {
        if (p.type === 'block-math') {
          return (
            <div key={idx} className="my-3 text-center overflow-x-auto py-2">
              <KatexMath math={p.content} block />
            </div>
          );
        }
        if (p.type === 'inline-math') {
          return <KatexMath key={idx} math={p.content} block={false} />;
        }
        return <span key={idx}>{p.content}</span>;
      })}
    </div>
  );
}
