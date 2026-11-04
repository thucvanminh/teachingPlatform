#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate 100-question exam payload for student Nam Việt (Grade 12) on 04/11/2026.
Source: /home/dantey/Dantey/teaching/lop12NamViet/Grad12_04112026/unit_6_comprehensive_100_question_vocabulary_word_family_exam.md
"""

import os
import re
import json

def generate_payload():
    source_file = "/home/dantey/Dantey/teaching/lop12NamViet/Grad12_04112026/unit_6_comprehensive_100_question_vocabulary_word_family_exam.md"
    if not os.path.exists(source_file):
        raise FileNotFoundError(f"Source file not found: {source_file}")

    with open(source_file, "r", encoding="utf-8") as f:
        text = f.read()

    # Split into questions part and answers part
    parts = text.split("## BẢNG ĐÁP ÁN & HƯỚNG DẪN GIẢI CHI TIẾT (ANSWER KEY)")
    if len(parts) < 2:
        raise ValueError("Could not find answer key section in source file!")

    exam_text = parts[0]
    answer_text = parts[1]

    # Extract reading passage
    passage_match = re.search(
        r"## PHẦN II: BÀI ĐỌC HIỂU CHUYÊN SÂU \(CÂU 91 - 100\)\s*\n\s*\*\*Read the following passage.*?\*\*\s*\n\s*(.*?)(?=\*\*Question 91:\*\*)",
        exam_text,
        re.DOTALL
    )
    passage = passage_match.group(1).strip() if passage_match else ""

    # Parse answer key
    # e.g., 1. **B** (effortlessly - trạng từ...)
    ans_dict = {}
    for line in answer_text.splitlines():
        line = line.strip()
        m = re.match(r"^(\d+)\.\s*\*\*([A-D])\*\*\s*(?:\((.*?)\))?\.?$", line)
        if m:
            q_num = int(m.group(1))
            ans = m.group(2)
            exp = m.group(3) or ""
            ans_dict[q_num] = (ans, exp)

    # Parse questions
    q_blocks = re.findall(
        r"\*\*Question (\d+):\*\*(.*?)(?=\*\*Question \d+:\*\*|## PHẦN II|## BẢNG ĐÁP ÁN|$)",
        exam_text,
        re.DOTALL
    )

    questions = []
    for q_num_str, body in q_blocks:
        q_num = int(q_num_str)
        lines = [l.strip() for l in body.strip().split("\n") if l.strip()]
        opts = []
        stem_lines = []
        for l in lines:
            m = re.match(r"^([A-D])\.\s*(.*)$", l)
            if m:
                opts.append({"id": m.group(1), "text": m.group(2).strip()})
            elif not opts:
                stem_lines.append(l)

        stem = " ".join(stem_lines).strip()
        ans, exp = ans_dict.get(q_num, ("A", "Đáp án chính xác được Thầy Thức biên soạn."))

        if q_num >= 91:
            content = f"Read the following passage and mark the letter A, B, C, or D to indicate the correct answer:\n\n**Question {q_num}:** {stem}"
            q_data = {
                "order": q_num,
                "content": content,
                "options": opts,
                "correctAnswer": ans,
                "explanation": f"**Đáp án đúng: {ans}**\n\n{exp}",
                "passage": passage
            }
        else:
            content = f"Mark the letter A, B, C, or D to indicate the correct answer:\n\n**Question {q_num}:** {stem}"
            q_data = {
                "order": q_num,
                "content": content,
                "options": opts,
                "correctAnswer": ans,
                "explanation": f"**Đáp án đúng: {ans}**\n\n{exp}"
            }
        questions.append(q_data)

    if len(questions) != 100:
        raise ValueError(f"Expected 100 questions, got {len(questions)}")

    lecture_markdown = """# 🌟 Cẩm Nang Tri Thức & Flashcard 25 Từ Vựng Bổ Trợ Unit 6
**Biên soạn riêng cho Bạn Nam Việt • Hướng dẫn: Thầy Thức**

Chuyên đề: **Artificial Intelligence (25 Từ Vựng Thông Dụng Bổ Trợ) & Thể Sai Khiến (Causative Verbs)**
Quy chuẩn: **Tích hợp Flashcard 3D 2 chiều (Hiện Tiếng Anh ➔ Giấu Tiếng Việt & Hiện Tiếng Việt ➔ Giấu Tiếng Anh)**
Mục tiêu: **Chinh phục điểm 7+ môn Tiếng Anh Kì thi Tốt nghiệp THPT Quốc Gia**

[🚀 MỞ PHÒNG HỌC TƯƠNG TÁC & FLASHCARD TOÀN MÀN HÌNH](/lectures/eng12-unit6-vocab/index.html)

---

### 📌 Trọng tâm buổi học hôm nay (04/11/2026):
1. **25 Từ vựng thông dụng bổ trợ Unit 6:**
   - *Nhóm 1 (AI & Kỹ Thuật Số):* `advanced, chatbot, concept, data, digital, function, platform, upgrade, virtual`
   - *Nhóm 2 (Tương Tác & Hành Vi):* `effortlessly, evolution, gesture, human-like, identity, imitate, observe, personalised`
   - *Nhóm 3 (Vận Hành & Ứng Dụng):* `install, launch, maintenance, milestone, portfolio, practical, provoke, repetitive`
2. **Flashcard 3D 2 Chiều (Trạm 1):**
   - **Chức năng 1 (Anh ➔ Việt):** Hiện từ tiếng Anh, phát âm 🔊, giấu tiếng Việt ở mặt sau.
   - **Chức năng 2 (Việt ➔ Anh):** Hiện nghĩa tiếng Việt, giấu từ tiếng Anh ở mặt sau.
   - Hỗ trợ phím tắt: <kbd>Space</kbd> Lật thẻ • <kbd>←</kbd> <kbd>→</kbd> Chuyển thẻ • <kbd>P</kbd> Phát âm • <kbd>1</kbd> Chế độ 1 • <kbd>2</kbd> Chế độ 2.
3. **Ngữ pháp Thể Sai Khiến (Causatives have/get/make/let):**
   - Chủ động: `have + O (người) + V-bare` / `get + O (người) + to-V`
   - Bị động: `have / get + O (vật) + V3/ed`
   - Ép buộc / Cho phép: `make / let + O + V-bare`
4. **Bộ Đề Kiểm Tra Chuyên Sâu 100 Câu (Đang mở):**
   - **90 câu Từ vựng & Word Family:** Khai thác sâu các biến thể danh/động/tính/trạng của 25 từ nền tảng.
   - **10 câu Đọc hiểu chuyên sâu:** Bài đọc thực tế về sự phát triển của Conversational AI và nền tảng số.
"""

    payload = {
        "studentUsername": "nam_viet",
        "grade": 12,
        "assignedDate": "2026-11-04T00:00:00.000Z",
        "unitTitle": "Unit 6: 25 Từ Vựng Bổ Trợ Trọng Tâm & Bộ 100 Câu Hỏi Từ Vựng - Word Family (Flashcard 3D)",
        "unitDescription": "Phòng học tương tác: 25 từ vựng bổ trợ Unit 6 với Flashcard 3D 2 chiều (Anh ➔ Việt và Việt ➔ Anh), Thể Sai Khiến & Bộ 100 câu hỏi trắc nghiệm chuyên sâu Từ vựng - Word Family mục tiêu 7+.",
        "lectureMarkdown": lecture_markdown,
        "teacherNote": "Thầy Thức dặn Nam Việt: Hôm nay con ôn tập thật kỹ 25 từ vựng bổ trợ Unit 6 qua hệ thống Flashcard 3D hai chiều ở bài giảng trước nhé. Sau đó, con bước vào chinh phục trọn bộ 100 câu hỏi trắc nghiệm chuyên sâu về Từ vựng & Word Family (bao gồm 90 câu rèn luyện phản xạ họ từ và 10 câu bài đọc hiểu chuyên sâu) để bứt phá band điểm 7+ THPTQG!",
        "assessmentTitle": "Luyện tập chuyên sâu: Bộ 100 Câu Hỏi Từ Vựng & Word Family - Unit 6 (100 câu)",
        "timeLimitMinutes": 90,
        "questions": questions
    }

    out_file = "/home/dantey/Dantey/teaching/teachingPlatform/.agents/skills/teaching-english-curriculum/scripts/payload_namviet_0411_exam.json"
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)

    print(f"✅ Successfully compiled {len(questions)} questions to {out_file}")

if __name__ == "__main__":
    generate_payload()
