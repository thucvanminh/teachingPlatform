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

// Render inline markdown tokens: bold (**text**), inline math ($...$), code (`...`), links ([label](url))
function renderInlineContent(rawText: string, customStrongClass?: string): React.ReactNode {
  if (!rawText) return null;

  // Split by inline math ($...$), bold (**...**), code (`...`), and links ([label](url))
  const regex = /(\$[^\$]+?\$|\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  const parts = rawText.split(regex);

  return parts.map((part, i) => {
    if (!part) return null;

    // Inline math $...$
    if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
      const mathContent = part.slice(1, -1);
      return <KatexMath key={i} math={mathContent} block={false} />;
    }

    // Bold **...**
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      const inner = part.slice(2, -2);
      const isQuestionHeading = /^question\s*\d+/i.test(inner.trim()) || /^câu\s*\d+/i.test(inner.trim());

      if (customStrongClass) {
        return (
          <strong key={i} className={customStrongClass}>
            {renderInlineContent(inner, customStrongClass)}
          </strong>
        );
      }

      if (isQuestionHeading) {
        return (
          <strong
            key={i}
            className="font-black text-cyan-300 bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-500/40 mr-1.5 inline-block tracking-tight text-sm sm:text-base shadow-xs"
          >
            {inner}
          </strong>
        );
      }

      return (
        <strong
          key={i}
          className="font-bold text-inherit brightness-125 drop-shadow-2xs tracking-tight"
        >
          {renderInlineContent(inner, customStrongClass)}
        </strong>
      );
    }

    // Inline code `...`
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      const inner = part.slice(1, -1);
      return (
        <code
          key={i}
          className="px-2 py-0.5 rounded-md bg-slate-800/90 text-cyan-300 border border-cyan-500/30 font-mono text-xs sm:text-sm font-semibold"
        >
          {inner}
        </code>
      );
    }

    // Link [label](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const label = linkMatch[1];
      const url = linkMatch[2];
      const isExt = url.startsWith('http') || url.startsWith('/lectures/');
      return (
        <a
          key={i}
          href={url}
          target={isExt ? '_blank' : undefined}
          rel={isExt ? 'noopener noreferrer' : undefined}
          className="text-cyan-400 hover:text-cyan-300 underline font-semibold transition-colors duration-150 inline-flex items-center gap-1"
        >
          {label}
        </a>
      );
    }

    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

interface BlockElement {
  type: 'h1' | 'h2' | 'h3' | 'blockquote' | 'table' | 'ul' | 'ol' | 'hr' | 'block-math' | 'image' | 'paragraph';
  text?: string;
  math?: string;
  alt?: string;
  src?: string;
  headers?: string[];
  rows?: string[][];
  items?: string[];
}

function parseMarkdownBlocks(raw: string): BlockElement[] {
  const lines = raw.split(/\r?\n/);
  const blocks: BlockElement[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // Image: ![alt](src)
    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      blocks.push({
        type: 'image',
        alt: imgMatch[1] || 'Diagram',
        src: imgMatch[2],
      });
      i++;
      continue;
    }

    // Horizontal Rule
    if (/^---+$|^\*\*\*+$|^___+$/.test(trimmed)) {
      blocks.push({ type: 'hr' });
      i++;
      continue;
    }

    // Table: starts and ends with |
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }
      if (tableLines.length >= 2) {
        const headerRow = tableLines[0].slice(1, -1).split('|').map((s) => s.trim());
        const isSep = /^[\s|:\-]+$/.test(tableLines[1]);
        const dataRows = (isSep ? tableLines.slice(2) : tableLines.slice(1)).map((row) =>
          row.slice(1, -1).split('|').map((s) => s.trim()),
        );
        blocks.push({ type: 'table', headers: headerRow, rows: dataRows });
        continue;
      }
    }

    // Headings
    if (trimmed.startsWith('# ')) {
      blocks.push({ type: 'h1', text: trimmed.slice(2).trim() });
      i++;
      continue;
    }
    if (trimmed.startsWith('## ')) {
      blocks.push({ type: 'h2', text: trimmed.slice(3).trim() });
      i++;
      continue;
    }
    if (trimmed.startsWith('### ')) {
      blocks.push({ type: 'h3', text: trimmed.slice(4).trim() });
      i++;
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s*/, ''));
        i++;
      }
      blocks.push({ type: 'blockquote', text: quoteLines.join('\n') });
      continue;
    }

    // Bullet list: * item or - item or + item
    if (/^(\*|\-|\+)\s+/.test(trimmed)) {
      const listItems: string[] = [];
      while (i < lines.length && /^(\*|\-|\+)\s+/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^(\*|\-|\+)\s+/, ''));
        i++;
      }
      blocks.push({ type: 'ul', items: listItems });
      continue;
    }

    // Numbered list: 1. item
    if (/^\d+\.\s+/.test(trimmed)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      blocks.push({ type: 'ol', items: listItems });
      continue;
    }

    // Block math $$ ... $$ on a single line or multiline
    if (trimmed.startsWith('$$')) {
      if (trimmed.endsWith('$$') && trimmed.length > 4) {
        blocks.push({ type: 'block-math', math: trimmed.slice(2, -2).trim() });
        i++;
        continue;
      }
      // Multiline $$
      const mathLines: string[] = [trimmed.slice(2)];
      i++;
      while (i < lines.length && !lines[i].trim().endsWith('$$')) {
        mathLines.push(lines[i]);
        i++;
      }
      if (i < lines.length) {
        mathLines.push(lines[i].trim().replace(/\$\$$/, ''));
        i++;
      }
      blocks.push({ type: 'block-math', math: mathLines.join('\n').trim() });
      continue;
    }

    // Normal paragraph
    const paraLines: string[] = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith('#') &&
      !lines[i].trim().startsWith('|') &&
      !lines[i].trim().startsWith('>') &&
      !lines[i].trim().startsWith('![') &&
      !/^(\*|\-|\+)\s+/.test(lines[i].trim()) &&
      !/^\d+\.\s+/.test(lines[i].trim()) &&
      !/^---+$|^\*\*\*+$|^___+$/.test(lines[i].trim()) &&
      !lines[i].trim().startsWith('$$')
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    blocks.push({ type: 'paragraph', text: paraLines.join('\n') });
  }

  return blocks;
}

// Hàm phân giải chuỗi text chứa hỗn hợp Markdown (tiêu đề, bảng biểu, danh sách, in đậm) và KaTeX
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

  const blocks = useMemo(() => parseMarkdownBlocks(text), [text]);

  return (
    <div className={`space-y-4 text-inherit ${className}`}>
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'h1':
            return (
              <h1
                key={idx}
                className="text-2xl sm:text-3xl font-extrabold text-cyan-300 border-b border-cyan-500/30 pb-3 mb-4 mt-2 tracking-tight"
              >
                {renderInlineContent(block.text || '', strongClassName)}
              </h1>
            );

          case 'h2':
            return (
              <h2
                key={idx}
                className="text-xl sm:text-2xl font-bold text-cyan-400 mt-6 mb-3 flex items-center gap-2 border-b border-slate-800/80 pb-2"
              >
                {renderInlineContent(block.text || '', strongClassName)}
              </h2>
            );

          case 'h3':
            return (
              <h3 key={idx} className="text-lg sm:text-xl font-bold text-cyan-200 mt-5 mb-2">
                {renderInlineContent(block.text || '', strongClassName)}
              </h3>
            );

          case 'blockquote':
            return (
              <blockquote
                key={idx}
                className="p-4 my-3 rounded-2xl bg-cyan-950/50 border-l-4 border-cyan-400 text-cyan-100 shadow-md whitespace-pre-line"
              >
                {renderInlineContent(block.text || '', strongClassName)}
              </blockquote>
            );

          case 'hr':
            return <hr key={idx} className="my-6 border-slate-700/60" />;

          case 'table':
            return (
              <div
                key={idx}
                className="overflow-x-auto my-5 rounded-2xl border border-cyan-500/30 shadow-lg bg-slate-950/70"
              >
                <table className="w-full text-left border-collapse min-w-[540px]">
                  {block.headers && block.headers.length > 0 && (
                    <thead>
                      <tr className="bg-slate-800/90 border-b border-cyan-500/30">
                        {block.headers.map((h, hIdx) => (
                          <th
                            key={hIdx}
                            className="p-3.5 text-cyan-300 font-bold text-sm sm:text-base border-r border-slate-700/60 last:border-r-0"
                          >
                            {renderInlineContent(h, strongClassName)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                  )}
                  {block.rows && block.rows.length > 0 && (
                    <tbody>
                      {block.rows.map((row, rIdx) => (
                        <tr
                          key={rIdx}
                          className="border-b border-slate-800/80 hover:bg-slate-800/30 transition-colors duration-150"
                        >
                          {row.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className="p-3.5 text-slate-200 text-sm sm:text-base border-r border-slate-800/60 last:border-r-0 align-top"
                            >
                              {renderInlineContent(cell, strongClassName)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
            );

          case 'ul':
            return (
              <ul key={idx} className="my-2.5 space-y-1.5 pl-6 list-disc text-slate-200 text-inherit">
                {block.items?.map((item, itemIdx) => (
                  <li key={itemIdx} className="leading-relaxed">
                    {renderInlineContent(item, strongClassName)}
                  </li>
                ))}
              </ul>
            );

          case 'ol':
            return (
              <ol key={idx} className="my-2.5 space-y-1.5 pl-6 list-decimal text-slate-200 text-inherit">
                {block.items?.map((item, itemIdx) => (
                  <li key={itemIdx} className="leading-relaxed">
                    {renderInlineContent(item, strongClassName)}
                  </li>
                ))}
              </ol>
            );

          case 'block-math':
            return (
              <div key={idx} className="my-4 text-center overflow-x-auto py-2 text-inherit">
                <KatexMath math={block.math || ''} block />
              </div>
            );

          case 'image': {
            const isKidImg = block.src?.includes('lop1') || block.src?.includes('kids');
            return (
              <div key={idx} className="my-4 flex flex-col items-center w-full">
                <img
                  src={block.src}
                  alt={block.alt || 'Hình minh họa'}
                  className={`max-w-full sm:max-w-md max-h-72 w-auto rounded-2xl shadow-md p-1 object-contain mx-auto transition-transform hover:scale-[1.01] ${
                    isKidImg
                      ? 'border-2 border-pink-200 bg-white shadow-pink-100'
                      : 'border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.25)] bg-[#0A0E1A]/90'
                  }`}
                />
                {block.alt && (
                  <span
                    className={`text-xs mt-1.5 font-bold tracking-wide text-center ${
                      isKidImg ? 'text-pink-700' : 'text-cyan-300/80'
                    }`}
                  >
                    {block.alt}
                  </span>
                )}
              </div>
            );
          }

          case 'paragraph':
          default:
            return (
              <p key={idx} className="my-2 leading-relaxed whitespace-pre-line text-inherit">
                {renderInlineContent(block.text || '', strongClassName)}
              </p>
            );
        }
      })}
    </div>
  );
}
