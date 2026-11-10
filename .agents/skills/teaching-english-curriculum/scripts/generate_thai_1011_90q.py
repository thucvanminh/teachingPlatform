#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generator script for Student Thái (Grade 11) - Date: 10/11/2026.
Total: 90 Questions
- Questions 1 to 30: Vocabulary Multiple Choice (Unit 4 24 words, >= 2 target words in options)
- Questions 31 to 60: Vocabulary Multiple Choice (Unit 4 24 words, >= 2 target words in options)
- Questions 61 to 90: Word Form Multiple Choice (Derived forms of Unit 4 24 words)
"""

import json
import os
import re

TARGET_24_WORDS = [
    "association",
    "cooperation",
    "integration",
    "solidarity",
    "stability",
    "maintain",
    "promote",
    "motto",
    "charter",
    "bloc",
    "cultural exchange",
    "involved in",
    "involve in",
    "represent",
    "representative",
    "participant",
    "volunteer",
    "scholarship",
    "leadership",
    "diversity",
    "identity",
    "prosperous",
    "prosperity",
    "contribution",
    "strengthen"
]

def check_word_in_target(text):
    text_lower = text.lower().strip()
    for tw in TARGET_24_WORDS:
        pattern = r"\b" + re.escape(tw) + r"\b"
        if re.search(pattern, text_lower):
            return True
        if tw.endswith("y"):
            plural = tw[:-1] + "ies"
            if re.search(r"\b" + re.escape(plural) + r"\b", text_lower):
                return True
        elif tw.endswith("on") or tw.endswith("er") or tw.endswith("nt") or tw.endswith("oc"):
            plural = tw + "s"
            if re.search(r"\b" + re.escape(plural) + r"\b", text_lower):
                return True
    return False

# Load Q1 to Q30
prev_payload_path = "/home/dantey/Dantey/teaching/teachingPlatform/.agents/skills/teaching-english-curriculum/scripts/payload_thai_1011_vocab30.json"
with open(prev_payload_path, "r", encoding="utf-8") as f:
    prev_data = json.load(f)

q1_to_q30 = prev_data["questions"]
assert len(q1_to_q30) == 30, f"Expected 30 questions, got {len(q1_to_q30)}"

# Define Q31 to Q60 (30 Vocabulary questions)
q31_to_q60 = [
    {
        "order": 31,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to the following question:\n\nThe bilateral summit ended with the signing of a comprehensive memorandum of ________ on cross-border green energy development.",
        "options": [
            {"id": "A", "text": "cooperation"},
            {"id": "B", "text": "competition"},
            {"id": "C", "text": "solidarity"},
            {"id": "D", "text": "association"}
        ],
        "correctAnswer": "A",
        "explanation": "**Đáp án đúng: A (cooperation)**\n\n* **Memorandum of cooperation / understanding (MoC/MoU)**: Bản ghi nhớ hợp tác.\n* *Solidarity* (n): Tình đoàn kết (thường dùng cho tinh thần tương trợ).\n* *Association* (n): Hiệp hội.\n* *Competition* (n): Sự cạnh tranh.\n\n*Dịch câu:* Hội nghị thượng đỉnh song phương đã khép lại với việc ký kết bản ghi nhớ hợp tác toàn diện về phát triển năng lượng xanh xuyên biên giới."
    },
    {
        "order": 32,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to the following question:\n\nIn an era of escalating geopolitical tensions, the primary mission of regional diplomacy is to safeguard peace and ________.",
        "options": [
            {"id": "A", "text": "hostility"},
            {"id": "B", "text": "stability"},
            {"id": "C", "text": "prosperity"},
            {"id": "D", "text": "diversity"}
        ],
        "correctAnswer": "B",
        "explanation": "**Đáp án đúng: B (stability)**\n\n* **Peace and stability**: Hòa bình và sự ổn định (cụm danh từ kinh điển trong các tuyên bố ngoại giao ASEAN).\n* *Hostility* (n): Sự thù địch.\n* *Prosperity* (n): Sự thịnh vượng.\n* *Diversity* (n): Sự đa dạng.\n\n*Dịch câu:* Trong kỷ nguyên căng thẳng địa chính trị leo thang, sứ mệnh hàng đầu của ngoại giao khu vực là bảo vệ hòa bình và sự ổn định."
    },
    {
        "order": 33,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to the following question:\n\nIn order to prevent territorial disputes from escalating, all parties agreed to ________ regular diplomatic dialogues and communication channels.",
        "options": [
            {"id": "A", "text": "abolish"},
            {"id": "B", "text": "volunteer"},
            {"id": "C", "text": "maintain"},
            {"id": "D", "text": "promote"}
        ],
        "correctAnswer": "C",
        "explanation": "**Đáp án đúng: C (maintain)**\n\n* **Maintain dialogues / communication channels**: Duy trì các cuộc đối thoại ngoại giao và kênh liên lạc thường xuyên.\n* *Abolish* (v): Bãi bỏ, hủy bỏ.\n* *Volunteer* (v): Tình nguyện.\n* *Promote* (v): Thúc đẩy.\n\n*Dịch câu:* Nhằm ngăn chặn tranh chấp lãnh thổ leo thang, tất cả các bên đã đồng thuận duy trì các kênh đối thoại và liên lạc ngoại giao thường xuyên."
    },
    {
        "order": 34,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to the following question:\n\nInvesting in multilingual education and cross-border research networks will considerably ________ regional economic competitiveness.",
        "options": [
            {"id": "A", "text": "undermine"},
            {"id": "B", "text": "represent"},
            {"id": "C", "text": "maintain"},
            {"id": "D", "text": "strengthen"}
        ],
        "correctAnswer": "D",
        "explanation": "**Đáp án đúng: D (strengthen)**\n\n* **Strengthen competitiveness**: Củng cố, nâng cao năng lực cạnh tranh.\n* *Undermine* (v): Làm suy yếu, xói mòn.\n* *Represent* (v): Đại diện cho.\n* *Maintain* (v): Duy trì.\n\n*Dịch câu:* Đầu tư vào giáo dục đa ngôn ngữ và các mạng lưới nghiên cứu xuyên biên giới sẽ củng cố đáng kể năng lực cạnh tranh kinh tế khu vực."
    },
    {
        "order": 35,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to the following question:\n\nThe realization of the ASEAN Economic Community marked a major leap forward in deep financial and regulatory ________ among Southeast Asian markets.",
        "options": [
            {"id": "A", "text": "integration"},
            {"id": "B", "text": "isolation"},
            {"id": "C", "text": "stability"},
            {"id": "D", "text": "diversity"}
        ],
        "correctAnswer": "A",
        "explanation": "**Đáp án đúng: A (integration)**\n\n* **Financial / regulatory integration**: Sự hội nhập về tài chính và quy chuẩn pháp lý.\n* *Isolation* (n): Sự cô lập.\n* *Stability* (n): Sự ổn định.\n* *Diversity* (n): Sự đa dạng.\n\n*Dịch câu:* Việc hiện thực hóa Cộng đồng Kinh tế ASEAN đã đánh dấu một bước tiến lớn trong tiến trình hội nhập sâu rộng về tài chính và quy chuẩn giữa các thị trường Đông Nam Á."
    },
    {
        "order": 36,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to the following question:\n\nThe prompt deployment of disaster relief personnel by neighboring countries exemplified true ASEAN ________ and compassion.",
        "options": [
            {"id": "A", "text": "indifference"},
            {"id": "B", "text": "solidarity"},
            {"id": "C", "text": "diversity"},
            {"id": "D", "text": "prosperity"}
        ],
        "correctAnswer": "B",
        "explanation": "**Đáp án đúng: B (solidarity)**\n\n* **ASEAN solidarity**: Tinh thần đoàn kết, tương thân tương ái của ASEAN.\n* *Indifference* (n): Sự thờ ơ, lạnh nhạt.\n* *Diversity* (n): Sự đa dạng.\n* *Prosperity* (n): Sự thịnh vượng.\n\n*Dịch câu:* Việc các quốc gia láng giềng nhanh chóng cử lực lượng cứu trợ thiên tai đã minh chứng cho tinh thần đoàn kết và lòng nhân ái đích thực của ASEAN."
    },
    {
        "order": 37,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to the following question:\n\nNew regulatory frameworks are being drafted to ________ digital entrepreneurship and streamline cross-border e-commerce transactions.",
        "options": [
            {"id": "A", "text": "restrict"},
            {"id": "B", "text": "represent"},
            {"id": "C", "text": "promote"},
            {"id": "D", "text": "strengthen"}
        ],
        "correctAnswer": "C",
        "explanation": "**Đáp án đúng: C (promote)**\n\n* **Promote entrepreneurship**: Thúc đẩy tinh thần khởi nghiệp kinh doanh.\n* *Restrict* (v): Hạn chế, kiềm tỏa.\n* *Represent* (v): Đại diện.\n* *Strengthen* (v): Củng cố.\n\n*Dịch câu:* Các khuôn khổ pháp lý mới đang được soạn thảo nhằm thúc đẩy tinh thần khởi nghiệp kỹ thuật số và tinh gọn các giao dịch thương mại điện tử xuyên biên giới."
    },
    {
        "order": 38,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to the following question:\n\nAccording to Article 20 of the ASEAN ________, decision-making at summits shall be based on consultation and consensus.",
        "options": [
            {"id": "A", "text": "Manifesto"},
            {"id": "B", "text": "Motto"},
            {"id": "C", "text": "Scholarship"},
            {"id": "D", "text": "Charter"}
        ],
        "correctAnswer": "D",
        "explanation": "**Đáp án đúng: D (Charter)**\n\n* **ASEAN Charter**: Hiến chương ASEAN (văn kiện pháp lý cơ bản có các điều khoản - *Article*).\n* *Motto* (n): Khẩu hiệu.\n* *Scholarship* (n): Học bổng.\n* *Manifesto* (n): Bản tuyên ngôn.\n\n*Dịch câu:* Theo Điều 20 của Hiến chương ASEAN, việc ra quyết định tại các hội nghị cấp cao phải dựa trên nguyên tắc tham vấn và đồng thuận."
    },
    {
        "order": 39,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to the following question:\n\nThe school choir proudly sang an anthem reflecting the official ________ of ASEAN, reminding everyone of the power of unity in diversity.",
        "options": [
            {"id": "A", "text": "motto"},
            {"id": "B", "text": "charter"},
            {"id": "C", "text": "stability"},
            {"id": "D", "text": "association"}
        ],
        "correctAnswer": "A",
        "explanation": "**Đáp án đúng: A (motto)**\n\n* **Official motto**: Phương châm / khẩu hiệu chính thức.\n* *Charter* (n): Hiến chương.\n* *Stability* (n): Sự ổn định.\n* *Association* (n): Hiệp hội.\n\n*Dịch câu:* Dàn hợp xướng của trường đã tự hào cất vang bài ca phản ánh khẩu hiệu chính thức của ASEAN, nhắc nhở mọi người về sức mạnh của sự thống nhất trong đa dạng."
    },
    {
        "order": 40,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to the following question:\n\nNegotiations between the European Union and the ASEAN ________ aim to forge a historic inter-regional free trade pact.",
        "options": [
            {"id": "A", "text": "border"},
            {"id": "B", "text": "bloc"},
            {"id": "C", "text": "charter"},
            {"id": "D", "text": "association"}
        ],
        "correctAnswer": "B",
        "explanation": "**Đáp án đúng: B (bloc)**\n\n* **Regional / trading bloc**: Khối thương mại, liên minh khu vực.\n* *Border* (n): Biên giới.\n* *Charter* (n): Hiến chương.\n* *Association* (n): Hiệp hội.\n\n*Dịch câu:* Các cuộc đàm phán giữa Liên minh Châu Âu và khối ASEAN hướng tới việc xây dựng một hiệp định thương mại tự do liên khu vực mang tính lịch sử."
    },
    {
        "order": 41,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to the following question:\n\nAs a founding member of the regional ________, Indonesia has consistently championed maritime peace and diplomatic mediation.",
        "options": [
            {"id": "A", "text": "corporation"},
            {"id": "B", "text": "federation"},
            {"id": "C", "text": "association"},
            {"id": "D", "text": "integration"}
        ],
        "correctAnswer": "C",
        "explanation": "**Đáp án đúng: C (association)**\n\n* **Regional association**: Hiệp hội khu vực (chỉ ASEAN).\n* *Corporation* (n): Tập đoàn kinh doanh.\n* *Federation* (n): Liên đoàn.\n* *Integration* (n): Sự hội nhập.\n\n*Dịch câu:* Với tư cách là thành viên sáng lập của hiệp hội khu vực, Indonesia luôn đi đầu bảo vệ hòa bình hàng hải và hòa giải ngoại giao."
    },
    {
        "order": 42,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to the following question:\n\nPromoting student mobility and ________ helps eradicate cultural stereotypes and fosters genuine empathy among regional youth.",
        "options": [
            {"id": "A", "text": "cultural exchange"},
            {"id": "B", "text": "economic integration"},
            {"id": "C", "text": "political stability"},
            {"id": "D", "text": "military alliance"}
        ],
        "correctAnswer": "A",
        "explanation": "**Đáp án đúng: A (cultural exchange)**\n\n* **Cultural exchange**: Giao lưu văn hóa (giúp xóa bỏ định kiến và xây dựng sự đồng cảm).\n* *Economic integration*: Hội nhập kinh tế.\n* *Political stability*: Ổn định chính trị.\n* *Military alliance*: Liên minh quân sự.\n\n*Dịch câu:* Thúc đẩy sự luân chuyển sinh viên và giao lưu văn hóa giúp xóa bỏ định kiến văn hóa và vun đắp sự đồng cảm chân thành giữa thanh niên khu vực."
    },
    {
        "order": 43,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to the following question:\n\nYoung environmentalists are enthusiastic about becoming ________ coastal conservation drives and mangrove reforestation projects.",
        "options": [
            {"id": "A", "text": "detached from"},
            {"id": "B", "text": "involved in"},
            {"id": "C", "text": "representative of"},
            {"id": "D", "text": "opposed to"}
        ],
        "correctAnswer": "B",
        "explanation": "**Đáp án đúng: B (involved in)**\n\n* **Become / be involved in sth**: Tham gia vào, dấn thân vào hoạt động bảo vệ môi trường.\n* *Detached from*: Tách biệt khỏi.\n* *Representative of*: Tiêu biểu cho.\n* *Opposed to*: Phản đối.\n\n*Dịch câu:* Các nhà hoạt động môi trường trẻ tuổi rất hào hứng tham gia vào các chiến dịch bảo tồn ven biển và dự án trồng lại rừng ngập mặn."
    },
    {
        "order": 44,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to the following question:\n\nIt is a profound honor for any diplomat to ________ their motherland at high-level plenary sessions of the United Nations.",
        "options": [
            {"id": "A", "text": "neglect"},
            {"id": "B", "text": "maintain"},
            {"id": "C", "text": "represent"},
            {"id": "D", "text": "volunteer"}
        ],
        "correctAnswer": "C",
        "explanation": "**Đáp án đúng: C (represent)**\n\n* **Represent one's country / motherland**: Đại diện cho đất nước tại các diễn đàn quốc tế.\n* *Neglect* (v): Bỏ bê.\n* *Maintain* (v): Duy trì.\n* *Volunteer* (v): Tình nguyện.\n\n*Dịch câu:* Đó là một niềm vinh dự sâu sắc cho bất kỳ nhà ngoại giao nào khi được đại diện cho tổ quốc tại các phiên họp toàn thể cấp cao của Liên Hợp Quốc."
    },
    {
        "order": 45,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to the following question:\n\nThe trade minister appointed a senior ________ to lead the delegation in multilateral tariff negotiations in Geneva.",
        "options": [
            {"id": "A", "text": "spectator"},
            {"id": "B", "text": "participant"},
            {"id": "C", "text": "volunteer"},
            {"id": "D", "text": "representative"}
        ],
        "correctAnswer": "D",
        "explanation": "**Đáp án đúng: D (representative)**\n\n* **Senior representative**: Đại diện cấp cao (người dẫn đầu đoàn đàm phán).\n* *Spectator* (n): Khán giả xem thi đấu.\n* *Participant* (n): Người tham gia.\n* *Volunteer* (n): Tình nguyện viên.\n\n*Dịch câu:* Bộ trưởng thương mại đã bổ nhiệm một đại diện cấp cao để dẫn đầu phái đoàn tham gia các cuộc đàm phán thuế quan đa phương tại Geneva."
    },
    {
        "order": 46,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to the following question:\n\nMore than five hundred youth delegates registered as official ________ in the ASEAN Model United Nations simulation conference.",
        "options": [
            {"id": "A", "text": "participants"},
            {"id": "B", "text": "representatives"},
            {"id": "C", "text": "volunteers"},
            {"id": "D", "text": "onlookers"}
        ],
        "correctAnswer": "A",
        "explanation": "**Đáp án đúng: A (participants)**\n\n* **Official participants**: Những người tham gia chính thức vào hội nghị mô phỏng.\n* *Representatives* (n): Các đại diện.\n* *Volunteers* (n): Tình nguyện viên.\n* *Onlookers* (n): Người đứng xem ngoài cuộc.\n\n*Dịch câu:* Hơn năm trăm đại biểu thanh niên đã đăng ký làm người tham gia chính thức trong hội nghị mô phỏng Liên Hợp Quốc kiểu mẫu của ASEAN."
    },
    {
        "order": 47,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to the following question:\n\nMedical students from across the country stepped forward to ________ at mobile health clinics in mountainous and remote areas.",
        "options": [
            {"id": "A", "text": "refrain"},
            {"id": "B", "text": "volunteer"},
            {"id": "C", "text": "represent"},
            {"id": "D", "text": "maintain"}
        ],
        "correctAnswer": "B",
        "explanation": "**Đáp án đúng: B (volunteer)**\n\n* **Volunteer at a clinic / project**: Tình nguyện phục vụ tại các trạm y tế lưu động.\n* *Refrain* (v): Kiềm chế, né tránh.\n* *Represent* (v): Đại diện.\n* *Maintain* (v): Duy trì.\n\n*Dịch câu:* Các sinh viên y khoa từ khắp nơi trên cả nước đã xung phong làm tình nguyện viên tại các phòng khám y tế lưu động ở vùng sâu vùng xa."
    },
    {
        "order": 48,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to the following question:\n\nApplicants must submit an academic essay, letters of recommendation, and IELTS certificates to qualify for the prestigious government ________.",
        "options": [
            {"id": "A", "text": "hardship"},
            {"id": "B", "text": "leadership"},
            {"id": "C", "text": "scholarship"},
            {"id": "D", "text": "contribution"}
        ],
        "correctAnswer": "C",
        "explanation": "**Đáp án đúng: C (scholarship)**\n\n* **Government scholarship**: Học bổng chính phủ danh giá.\n* *Hardship* (n): Gian khổ.\n* *Leadership* (n): Năng lực lãnh đạo.\n* *Contribution* (n): Sự đóng góp.\n\n*Dịch câu:* Ứng viên phải nộp bài luận học thuật, thư giới thiệu và chứng chỉ IELTS để đủ điều kiện nhận học bổng chính phủ danh giá."
    },
    {
        "order": 49,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to the following question:\n\nUnder her exemplary ________, the youth association launched five national sustainability projects within just two years.",
        "options": [
            {"id": "A", "text": "citizenship"},
            {"id": "B", "text": "partnership"},
            {"id": "C", "text": "scholarship"},
            {"id": "D", "text": "leadership"}
        ],
        "correctAnswer": "D",
        "explanation": "**Đáp án đúng: D (leadership)**\n\n* **Under one's leadership**: Dưới sự dẫn dắt, lãnh đạo mẫu mực của ai.\n* *Citizenship* (n): Quyền công dân.\n* *Partnership* (n): Quan hệ đối tác.\n* *Scholarship* (n): Học bổng.\n\n*Dịch câu:* Dưới sự lãnh đạo mẫu mực của cô ấy, hiệp hội thanh niên đã triển khai năm dự án phát triển bền vững quốc gia chỉ trong vòng hai năm."
    },
    {
        "order": 50,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to the following question:\n\nThe celebration highlighted the rich ethnic and culinary ________ of ASEAN, serving delicacies from ten member nations.",
        "options": [
            {"id": "A", "text": "diversity"},
            {"id": "B", "text": "uniformity"},
            {"id": "C", "text": "solidarity"},
            {"id": "D", "text": "stability"}
        ],
        "correctAnswer": "A",
        "explanation": "**Đáp án đúng: A (diversity)**\n\n* **Culinary / ethnic diversity**: Sự đa dạng về sắc tộc và ẩm thực.\n* *Uniformity* (n): Sự đồng điệu đơn điệu.\n* *Solidarity* (n): Tình đoàn kết.\n* *Stability* (n): Sự ổn định.\n\n*Dịch câu:* Lễ kỷ niệm đã làm nổi bật sự đa dạng phong phú về sắc tộc và ẩm thực của ASEAN với các món ăn đặc sắc từ mười quốc gia thành viên."
    },
    {
        "order": 51,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to the following question:\n\nDespite adopting modern lifestyles, youths across Southeast Asia remain proud of their ancestral heritage and distinct cultural ________.",
        "options": [
            {"id": "A", "text": "identity"},
            {"id": "B", "text": "motto"},
            {"id": "C", "text": "charter"},
            {"id": "D", "text": "scholarship"}
        ],
        "correctAnswer": "A",
        "explanation": "**Đáp án đúng: A (identity)**\n\n* **Cultural identity**: Bản sắc văn hóa dân tộc riêng biệt.\n* *Motto* (n): Khẩu hiệu.\n* *Charter* (n): Hiến chương.\n* *Scholarship* (n): Học bổng.\n\n*Dịch câu:* Mặc dù theo đuổi lối sống hiện đại, giới trẻ khắp Đông Nam Á vẫn tự hào về di sản tổ tiên và bản sắc văn hóa riêng biệt của mình."
    },
    {
        "order": 52,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to the following question:\n\nThe collective vision of the leaders is to turn the region into a peaceful, stable, and economically ________ community by 2030.",
        "options": [
            {"id": "A", "text": "vulnerable"},
            {"id": "B", "text": "prosperous"},
            {"id": "C", "text": "representative"},
            {"id": "D", "text": "impoverished"}
        ],
        "correctAnswer": "B",
        "explanation": "**Đáp án đúng: B (prosperous)**\n\n* **Economically prosperous**: Phồn vinh, thịnh vượng về kinh tế.\n* *Vulnerable* (adj): Dễ bị tổn thương.\n* *Representative* (adj): Tiêu biểu.\n* *Impoverished* (adj): Bần cùng, nghèo đói.\n\n*Dịch câu:* Tầm nhìn chung của các nhà lãnh đạo là biến khu vực thành một cộng đồng hòa bình, ổn định và phồn vinh về kinh tế vào năm 2030."
    },
    {
        "order": 53,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to the following question:\n\nTechnological advancement and fair trade policies are essential drivers of long-term economic ________ and social well-being.",
        "options": [
            {"id": "A", "text": "adversity"},
            {"id": "B", "text": "solidarity"},
            {"id": "C", "text": "prosperity"},
            {"id": "D", "text": "cooperation"}
        ],
        "correctAnswer": "C",
        "explanation": "**Đáp án đúng: C (prosperity)**\n\n* **Economic prosperity**: Sự thịnh vượng kinh tế lâu dài.\n* *Adversity* (n): Nghịch cảnh.\n* *Solidarity* (n): Tình đoàn kết.\n* *Cooperation* (n): Sự hợp tác.\n\n*Dịch câu:* Tiến bộ công nghệ và chính sách thương mại công bằng là những động lực thiết yếu cho sự phồn vinh kinh tế lâu dài và phúc lợi xã hội."
    },
    {
        "order": 54,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to the following question:\n\nThe scientist was awarded the ASEAN Prize in recognition of her outstanding ________ to marine biodiversity conservation.",
        "options": [
            {"id": "A", "text": "association"},
            {"id": "B", "text": "contribution"},
            {"id": "C", "text": "integration"},
            {"id": "D", "text": "disruption"}
        ],
        "correctAnswer": "B",
        "explanation": "**Đáp án đúng: B (contribution)**\n\n* **Outstanding contribution to sth**: Đóng góp xuất sắc cho việc bảo tồn đa dạng sinh học biển.\n* *Association* (n): Hiệp hội.\n* *Integration* (n): Sự hội nhập.\n* *Disruption* (n): Sự gián đoạn.\n\n*Dịch câu:* Nhà khoa học đã được trao Giải thưởng ASEAN để ghi nhận những đóng góp xuất sắc của bà cho công tác bảo tồn đa dạng sinh học biển."
    },
    {
        "order": 55,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to the following question:\n\nCollaborative initiatives in tourism and aviation have helped to ________ strategic connectivity between major ASEAN capital cities.",
        "options": [
            {"id": "A", "text": "weaken"},
            {"id": "B", "text": "represent"},
            {"id": "C", "text": "promote"},
            {"id": "D", "text": "strengthen"}
        ],
        "correctAnswer": "D",
        "explanation": "**Đáp án đúng: D (strengthen)**\n\n* **Strengthen connectivity**: Củng cố, gia tăng tính kết nối chiến lược giữa các thủ đô.\n* *Weaken* (v): Làm suy yếu.\n* *Represent* (v): Đại diện.\n* *Promote* (v): Thúc đẩy.\n\n*Dịch câu:* Các sáng kiến hợp tác trong lĩnh vực du lịch và hàng không đã giúp củng cố tính kết nối chiến lược giữa các thủ đô lớn của ASEAN."
    },
    {
        "order": 56,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to the following question:\n\nIn response to transnational cybercrime, law enforcement agencies maintain extremely close ________ and real-time intelligence sharing.",
        "options": [
            {"id": "A", "text": "cooperation"},
            {"id": "B", "text": "isolation"},
            {"id": "C", "text": "diversity"},
            {"id": "D", "text": "stability"}
        ],
        "correctAnswer": "A",
        "explanation": "**Đáp án đúng: A (cooperation)**\n\n* **Close cooperation**: Sự hợp tác chặt chẽ và chia sẻ thông tin tình báo thời gian thực.\n* *Isolation* (n): Sự cô lập.\n* *Diversity* (n): Sự đa dạng.\n* *Stability* (n): Sự ổn định.\n\n*Dịch câu:* Để đối phó với tội phạm mạng xuyên quốc gia, các cơ quan thực thi pháp luật duy trì sự hợp tác vô cùng chặt chẽ và chia sẻ thông tin tình báo thời gian thực."
    },
    {
        "order": 57,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to the following question:\n\nBecoming actively ________ international youth clubs equips students with cross-cultural communication skills and global perspectives.",
        "options": [
            {"id": "A", "text": "suspicious of"},
            {"id": "B", "text": "involved in"},
            {"id": "C", "text": "representative of"},
            {"id": "D", "text": "indifferent to"}
        ],
        "correctAnswer": "B",
        "explanation": "**Đáp án đúng: B (involved in)**\n\n* **Involved in clubs / activities**: Tích cực tham gia, hòa nhập vào các câu lạc bộ thanh niên quốc tế.\n* *Suspicious of*: Nghi ngờ.\n* *Representative of*: Tiêu biểu cho.\n* *Indifferent to*: Thờ ơ với.\n\n*Dịch câu:* Việc tích cực tham gia vào các câu lạc bộ thanh niên quốc tế trang bị cho học sinh kỹ năng giao tiếp liên văn hóa và tầm nhìn toàn cầu."
    },
    {
        "order": 58,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to the following question:\n\nCentral banks in the region coordinate foreign exchange policies to preserve financial ________ against global market shocks.",
        "options": [
            {"id": "A", "text": "volatility"},
            {"id": "B", "text": "prosperity"},
            {"id": "C", "text": "stability"},
            {"id": "D", "text": "diversity"}
        ],
        "correctAnswer": "C",
        "explanation": "**Đáp án đúng: C (stability)**\n\n* **Financial / economic stability**: Duy trì sự ổn định tài chính trước các cú sốc thị trường.\n* *Volatility* (n): Sự biến động thất thường.\n* *Prosperity* (n): Sự thịnh vượng.\n* *Diversity* (n): Sự đa dạng.\n\n*Dịch câu:* Các ngân hàng trung ương trong khu vực phối hợp chính sách ngoại hối nhằm duy trì sự ổn định tài chính trước các cú sốc của thị trường toàn cầu."
    },
    {
        "order": 59,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to the following question:\n\nThe foreign ministry reaffirmed its commitment to ________ friendly relations and mutual respect with all neighboring countries.",
        "options": [
            {"id": "A", "text": "maintain"},
            {"id": "B", "text": "sever"},
            {"id": "C", "text": "volunteer"},
            {"id": "D", "text": "represent"}
        ],
        "correctAnswer": "A",
        "explanation": "**Đáp án đúng: A (maintain)**\n\n* **Maintain friendly relations**: Duy trì mối quan hệ hữu nghị và tôn trọng lẫn nhau.\n* *Sever* (v): Cắt đứt quan hệ.\n* *Volunteer* (v): Tình nguyện.\n* *Represent* (v): Đại diện.\n\n*Dịch câu:* Bộ ngoại giao tái khẳng định cam kết duy trì mối quan hệ hữu nghị và tôn trọng lẫn nhau với tất cả các quốc gia láng giềng."
    },
    {
        "order": 60,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to the following question:\n\nThe main mission of the regional economic agreement is to ________ inclusive trade and generate lasting ________ for all member states.",
        "options": [
            {"id": "A", "text": "promote - prosperity"},
            {"id": "B", "text": "maintain - diversity"},
            {"id": "C", "text": "represent - solidarity"},
            {"id": "D", "text": "volunteer - stability"}
        ],
        "correctAnswer": "A",
        "explanation": "**Đáp án đúng: A (promote - prosperity)**\n\n* **Promote trade** (thúc đẩy thương mại) + **generate prosperity** (tạo dựng sự thịnh vượng).\n* Cả 2 từ đều thuộc danh mục 24 từ vựng cốt lõi.\n\n*Dịch câu:* Sứ mệnh chính của hiệp định kinh tế khu vực là thúc đẩy thương mại toàn diện và tạo dựng sự thịnh vượng lâu dài cho tất cả các quốc gia thành viên."
    }
]

# Define Q61 to Q90 (30 Word Form questions)
q61_to_q90 = [
    {
        "order": 61,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct word form to complete the following sentence:\n\nThe two nations agreed to establish a ________ framework to combat human trafficking and cross-border cybercrimes.",
        "options": [
            {"id": "A", "text": "cooperate"},
            {"id": "B", "text": "cooperation"},
            {"id": "C", "text": "cooperative"},
            {"id": "D", "text": "cooperatively"}
        ],
        "correctAnswer": "C",
        "explanation": "**Đáp án đúng: C (cooperative)**\n\n* Cần một tính từ đứng trước danh từ \"framework\" để bổ nghĩa -> **cooperative** (mang tính hợp tác).\n* *cooperate* (v): Hợp tác.\n* *cooperation* (n): Sự hợp tác.\n* *cooperatively* (adv): Một cách hợp tác.\n\n*Dịch câu:* Hai quốc gia đã nhất trí thiết lập một khuôn khổ mang tính hợp tác để phòng chống nạn buôn người và tội phạm mạng xuyên biên giới."
    },
    {
        "order": 62,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct word form to complete the following sentence:\n\nJoining the regional trade pact was a milestone in the country's comprehensive economic ________ process.",
        "options": [
            {"id": "A", "text": "integrate"},
            {"id": "B", "text": "integration"},
            {"id": "C", "text": "integrative"},
            {"id": "D", "text": "integrated"}
        ],
        "correctAnswer": "B",
        "explanation": "**Đáp án đúng: B (integration)**\n\n* Cụm danh từ: **economic integration process** (tiến trình hội nhập kinh tế).\n* *integrate* (v): Hội nhập.\n* *integrative* (adj): Có xu hướng hợp nhất.\n* *integrated* (adj): Đã hòa nhập/tích hợp.\n\n*Dịch câu:* Việc gia nhập hiệp định thương mại khu vực là một cột mốc trong tiến trình hội nhập kinh tế toàn diện của đất nước."
    },
    {
        "order": 63,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct word form to complete the following sentence:\n\nThe central bank intervened in the currency market to ________ exchange rates and curb inflation.",
        "options": [
            {"id": "A", "text": "stabilize"},
            {"id": "B", "text": "stability"},
            {"id": "C", "text": "stable"},
            {"id": "D", "text": "stably"}
        ],
        "correctAnswer": "A",
        "explanation": "**Đáp án đúng: A (stabilize)**\n\n* Sau \"to\" chỉ mục đích cần một động từ nguyên mẫu (to-infinitive) -> **stabilize** (ổn định hóa, làm cho vững vàng).\n* *stability* (n): Sự ổn định.\n* *stable* (adj): Vững chắc, ổn định.\n* *stably* (adv): Một cách vững chãi.\n\n*Dịch câu:* Ngân hàng trung ương đã can thiệp vào thị trường tiền tệ để ổn định tỷ giá hối đoái và kiềm chế lạm phát."
    },
    {
        "order": 64,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct word form to complete the following sentence:\n\nThanks to proactive fiscal policies, the government has maintained a highly ________ macroeconomic environment.",
        "options": [
            {"id": "A", "text": "stability"},
            {"id": "B", "text": "stabilize"},
            {"id": "C", "text": "stable"},
            {"id": "D", "text": "stably"}
        ],
        "correctAnswer": "C",
        "explanation": "**Đáp án đúng: C (stable)**\n\n* Sau trạng từ chỉ mức độ \"highly\" và trước danh từ \"macroeconomic environment\" cần một tính từ -> **stable** (ổn định).\n* *stability* (n): Sự ổn định.\n* *stabilize* (v): Làm ổn định.\n* *stably* (adv): Một cách ổn định.\n\n*Dịch câu:* Nhờ các chính sách tài khóa chủ động, chính phủ đã duy trì một môi trường kinh tế vĩ mô hết sức ổn định."
    },
    {
        "order": 65,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct word form to complete the following sentence:\n\nRegular software ________ and system updates are essential to protect the diplomatic server from malicious attacks.",
        "options": [
            {"id": "A", "text": "maintain"},
            {"id": "B", "text": "maintenance"},
            {"id": "C", "text": "maintainable"},
            {"id": "D", "text": "maintained"}
        ],
        "correctAnswer": "B",
        "explanation": "**Đáp án đúng: B (maintenance)**\n\n* Sau tính từ \"Regular\" và danh từ \"software\" làm ngữ danh từ cần một danh từ -> **maintenance** (sự bảo trì). Cụm từ: *software maintenance*.\n* *maintain* (v): Duy trì.\n* *maintainable* (adj): Có thể duy trì.\n* *maintained* (adj/v-ed): Được duy trì.\n\n*Dịch câu:* Việc bảo trì phần mềm và cập nhật hệ thống thường xuyên là cần thiết để bảo vệ máy chủ ngoại giao khỏi các cuộc tấn công độc hại."
    },
    {
        "order": 66,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct word form to complete the following sentence:\n\nThe regional tourism board launched an attractive ________ video to introduce historic heritage sites to global audiences.",
        "options": [
            {"id": "A", "text": "promote"},
            {"id": "B", "text": "promotion"},
            {"id": "C", "text": "promotional"},
            {"id": "D", "text": "promoter"}
        ],
        "correctAnswer": "C",
        "explanation": "**Đáp án đúng: C (promotional)**\n\n* Trước danh từ \"video\" cần một tính từ bổ nghĩa -> **promotional video** (video quảng bá/tiếp thị).\n* *promote* (v): Quảng bá, thúc đẩy.\n* *promotion* (n): Sự xúc tiến, thăng tiến.\n* *promoter* (n): Người xúc tiến/quảng bá.\n\n*Dịch câu:* Tổng cục du lịch khu vực đã ra mắt một video quảng bá hấp dẫn để giới thiệu các di sản lịch sử tới công chúng toàn cầu."
    },
    {
        "order": 67,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct word form to complete the following sentence:\n\nThe regional summit reaffirmed its commitment to the ________ of gender equality and youth empowerment.",
        "options": [
            {"id": "A", "text": "promote"},
            {"id": "B", "text": "promotion"},
            {"id": "C", "text": "promotional"},
            {"id": "D", "text": "promotable"}
        ],
        "correctAnswer": "B",
        "explanation": "**Đáp án đúng: B (promotion)**\n\n* Sau mạo từ \"the\" và trước giới từ \"of\" cần một danh từ -> **promotion** (sự thúc đẩy, sự xúc tiến).\n* *promote* (v): Thúc đẩy.\n* *promotional* (adj): Mang tính quảng bá.\n* *promotable* (adj): Có thể thăng tiến.\n\n*Dịch câu:* Hội nghị thượng đỉnh khu vực tái khẳng định cam kết đối với sự thúc đẩy bình đẳng giới và trao quyền cho thanh niên."
    },
    {
        "order": 68,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct word form to complete the following sentence:\n\nTo reduce dependency on volatile fossil fuels, developing economies need to ________ their domestic energy sources.",
        "options": [
            {"id": "A", "text": "diversify"},
            {"id": "B", "text": "diversity"},
            {"id": "C", "text": "diverse"},
            {"id": "D", "text": "diversely"}
        ],
        "correctAnswer": "A",
        "explanation": "**Đáp án đúng: A (diversify)**\n\n* Sau cấu trúc \"need to\" cần một động từ nguyên mẫu -> **diversify** (đa dạng hóa).\n* *diversity* (n): Sự đa dạng.\n* *diverse* (adj): Phong phú, đa dạng.\n* *diversely* (adv): Một cách phong phú.\n\n*Dịch câu:* Để giảm sự phụ thuộc vào nhiên liệu hóa thạch biến động, các nền kinh tế đang phát triển cần đa dạng hóa các nguồn năng lượng trong nước."
    },
    {
        "order": 69,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct word form to complete the following sentence:\n\nSoutheast Asia is home to a culturally ________ population with hundreds of distinct ethnic groups and traditions.",
        "options": [
            {"id": "A", "text": "diversity"},
            {"id": "B", "text": "diversify"},
            {"id": "C", "text": "diverse"},
            {"id": "D", "text": "diverseness"}
        ],
        "correctAnswer": "C",
        "explanation": "**Đáp án đúng: C (diverse)**\n\n* Sau trạng từ \"culturally\" và trước danh từ \"population\" cần một tính từ -> **diverse** (đa dạng phong phú).\n* *diversity* (n): Sự đa dạng.\n* *diversify* (v): Đa dạng hóa.\n* *diverseness* (n): Tính chất đa dạng.\n\n*Dịch câu:* Đông Nam Á là quê hương của một cộng đồng dân cư đa dạng về mặt văn hóa với hàng trăm nhóm sắc tộc và truyền thống riêng biệt."
    },
    {
        "order": 70,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct word form to complete the following sentence:\n\nAutomated border gates are designed to quickly ________ arriving international travelers via facial recognition technology.",
        "options": [
            {"id": "A", "text": "identify"},
            {"id": "B", "text": "identity"},
            {"id": "C", "text": "identification"},
            {"id": "D", "text": "identifiable"}
        ],
        "correctAnswer": "A",
        "explanation": "**Đáp án đúng: A (identify)**\n\n* Sau cấu trúc \"are designed to\" và trạng từ \"quickly\" cần một động từ nguyên mẫu -> **identify** (nhận diện, xác định danh tính).\n* *identity* (n): Bản sắc, nhân dạng.\n* *identification* (n): Giấy tờ tùy thân / sự nhận diện.\n* *identifiable* (adj): Có thể nhận diện được.\n\n*Dịch câu:* Cổng kiểm soát xuất nhập cảnh tự động được thiết kế để nhanh chóng nhận diện hành khách quốc tế đến qua công nghệ nhận diện khuôn mặt."
    },
    {
        "order": 71,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct word form to complete the following sentence:\n\nEven after hours of swimming in heavy rain, the team members were easily ________ by their neon yellow life jackets.",
        "options": [
            {"id": "A", "text": "identify"},
            {"id": "B", "text": "identity"},
            {"id": "C", "text": "identifiable"},
            {"id": "D", "text": "identification"}
        ],
        "correctAnswer": "C",
        "explanation": "**Đáp án đúng: C (identifiable)**\n\n* Sau động từ to-be \"were\" và trạng từ \"easily\" cần một tính từ -> **identifiable** (dễ dàng nhận ra).\n* *identify* (v): Nhận dạng.\n* *identity* (n): Bản sắc.\n* *identification* (n): Sự nhận diện.\n\n*Dịch câu:* Ngay cả sau nhiều giờ bơi trong mưa lớn, các thành viên đội vẫn dễ dàng được nhận biết nhờ những chiếc áo phao màu vàng dạ quang."
    },
    {
        "order": 72,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct word form to complete the following sentence:\n\nIf fair competition is guaranteed, regional small and medium-sized enterprises will undoubtedly ________.",
        "options": [
            {"id": "A", "text": "prosper"},
            {"id": "B", "text": "prosperity"},
            {"id": "C", "text": "prosperous"},
            {"id": "D", "text": "prosperously"}
        ],
        "correctAnswer": "A",
        "explanation": "**Đáp án đúng: A (prosper)**\n\n* Sau trợ động từ \"will\" và trạng từ \"undoubtedly\" cần một động từ nguyên mẫu -> **prosper** (phát đạt, phồn vinh).\n* *prosperity* (n): Sự thịnh vượng.\n* *prosperous* (adj): Phồn vinh.\n* *prosperously* (adv): Một cách thịnh vượng.\n\n*Dịch câu:* Nếu sự cạnh tranh công bằng được đảm bảo, các doanh nghiệp vừa và nhỏ trong khu vực chắc chắn sẽ phát đạt và hưng thịnh."
    },
    {
        "order": 73,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct word form to complete the following sentence:\n\nBy leveraging e-commerce and digital logistics, local handicraft villages have expanded ________ across global markets.",
        "options": [
            {"id": "A", "text": "prosper"},
            {"id": "B", "text": "prosperity"},
            {"id": "C", "text": "prosperous"},
            {"id": "D", "text": "prosperously"}
        ],
        "correctAnswer": "D",
        "explanation": "**Đáp án đúng: D (prosperously)**\n\n* Đứng sau động từ chính \"have expanded\" cần một trạng từ bổ nghĩa cách thức -> **prosperously** (một cách phát đạt, phồn vinh).\n* *prosper* (v): Thịnh vượng.\n* *prosperity* (n): Sự thịnh vượng.\n* *prosperous* (adj): Thịnh vượng.\n\n*Dịch câu:* Bằng cách tận dụng thương mại điện tử và logistics kỹ thuật số, các làng nghề thủ công địa phương đã mở rộng một cách phát đạt trên thị trường toàn cầu."
    },
    {
        "order": 74,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct word form to complete the following sentence:\n\nInadequate urban drainage infrastructure was cited as a major ________ factor in recurrent seasonal flooding.",
        "options": [
            {"id": "A", "text": "contribute"},
            {"id": "B", "text": "contribution"},
            {"id": "C", "text": "contributory"},
            {"id": "D", "text": "contributor"}
        ],
        "correctAnswer": "C",
        "explanation": "**Đáp án đúng: C (contributory)**\n\n* Đứng trước danh từ \"factor\" cần một tính từ bổ nghĩa -> **contributory factor** (yếu tố góp phần gây ra).\n* *contribute* (v): Đóng góp.\n* *contribution* (n): Sự đóng góp.\n* *contributor* (n): Người đóng góp.\n\n*Dịch câu:* Hệ thống thoát nước đô thị không đầy đủ đã được trích dẫn như một yếu tố góp phần chính gây ra ngập lụt theo mùa tái diễn."
    },
    {
        "order": 75,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct word form to complete the following sentence:\n\nProfessor Thorne has been recognized as a leading ________ to renewable energy policy research in the region.",
        "options": [
            {"id": "A", "text": "contribute"},
            {"id": "B", "text": "contribution"},
            {"id": "C", "text": "contributor"},
            {"id": "D", "text": "contributory"}
        ],
        "correctAnswer": "C",
        "explanation": "**Đáp án đúng: C (contributor)**\n\n* Sau cụm tính từ \"a leading\" và chỉ người (Giáo sư Thorne) cần một danh từ chỉ người -> **contributor** (người đóng góp/cống hiến).\n* *contribute* (v): Đóng góp.\n* *contribution* (n): Sự đóng góp (trừu tượng).\n* *contributory* (adj): Đóng góp vào.\n\n*Dịch câu:* Giáo sư Thorne đã được công nhận là một người đóng góp hàng đầu cho nghiên cứu chính sách năng lượng tái tạo trong khu vực."
    },
    {
        "order": 76,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct word form to complete the following sentence:\n\nThe real ________ of the regional bloc lies in its capacity to reach consensus despite political diversities.",
        "options": [
            {"id": "A", "text": "strengthen"},
            {"id": "B", "text": "strength"},
            {"id": "C", "text": "strong"},
            {"id": "D", "text": "strongly"}
        ],
        "correctAnswer": "B",
        "explanation": "**Đáp án đúng: B (strength)**\n\n* Sau tính từ \"real\" và mạo từ \"The\" cần một danh từ -> **strength** (sức mạnh, thế mạnh).\n* *strengthen* (v): Làm mạnh lên.\n* *strong* (adj): Mạnh mẽ.\n* *strongly* (adv): Một cách mạnh mẽ.\n\n*Dịch câu:* Sức mạnh thực sự của khối khu vực nằm ở năng lực đạt được sự đồng thuận bất chấp những khác biệt về chính trị."
    },
    {
        "order": 77,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct word form to complete the following sentence:\n\nYouth environmental groups ________ urged delegates at the summit to adopt legally binding carbon limits.",
        "options": [
            {"id": "A", "text": "strength"},
            {"id": "B", "text": "strengthen"},
            {"id": "C", "text": "strong"},
            {"id": "D", "text": "strongly"}
        ],
        "correctAnswer": "D",
        "explanation": "**Đáp án đúng: D (strongly)**\n\n* Đứng trước động từ quá khứ \"urged\" cần một trạng từ chỉ mức độ bổ nghĩa -> **strongly urged** (kiên quyết thúc giục, mạnh mẽ kêu gọi).\n* *strength* (n): Sức mạnh.\n* *strengthen* (v): Củng cố.\n* *strong* (adj): Mạnh mẽ.\n\n*Dịch câu:* Các nhóm thanh niên bảo vệ môi trường đã mạnh mẽ thúc giục các đại biểu tại hội nghị thông qua các giới hạn khí thải carbon có tính ràng buộc pháp lý."
    },
    {
        "order": 78,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct word form to complete the following sentence:\n\nAll high school seniors are invited to ________ in the ASEAN diplomatic essay contest held in October.",
        "options": [
            {"id": "A", "text": "participate"},
            {"id": "B", "text": "participant"},
            {"id": "C", "text": "participation"},
            {"id": "D", "text": "participatory"}
        ],
        "correctAnswer": "A",
        "explanation": "**Đáp án đúng: A (participate)**\n\n* Sau cấu trúc \"are invited to\" cần một động từ nguyên mẫu -> **participate in** (tham gia vào).\n* *participant* (n): Người tham gia.\n* *participation* (n): Sự tham gia.\n* *participatory* (adj): Có tính tham gia.\n\n*Dịch câu:* Tất cả học sinh lớp 12 đều được mời tham gia vào cuộc thi viết luận ngoại giao ASEAN được tổ chức vào tháng Mười."
    },
    {
        "order": 79,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct word form to complete the following sentence:\n\nActive civic ________ in waste recycling programmes is crucial for building eco-friendly smart cities.",
        "options": [
            {"id": "A", "text": "participate"},
            {"id": "B", "text": "participant"},
            {"id": "C", "text": "participation"},
            {"id": "D", "text": "participatory"}
        ],
        "correctAnswer": "C",
        "explanation": "**Đáp án đúng: C (participation)**\n\n* Sau tính từ \"Active civic\" cần một danh từ chỉ hành động -> **civic participation** (sự tham gia của công dân).\n* *participate* (v): Tham gia.\n* *participant* (n): Người tham gia.\n* *participatory* (adj): Mang tính tham gia.\n\n*Dịch câu:* Sự tham gia tích cực của công dân vào các chương trình tái chế rác thải là điều tối quan trọng để xây dựng các thành phố thông minh thân thiện với môi trường."
    },
    {
        "order": 80,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct word form to complete the following sentence:\n\nThe non-governmental foundation operates entirely on ________ contributions from generous regional donors.",
        "options": [
            {"id": "A", "text": "volunteer"},
            {"id": "B", "text": "voluntary"},
            {"id": "C", "text": "voluntarily"},
            {"id": "D", "text": "volunteering"}
        ],
        "correctAnswer": "B",
        "explanation": "**Đáp án đúng: B (voluntary)**\n\n* Đứng trước danh từ \"contributions\" cần một tính từ bổ nghĩa -> **voluntary contributions** (những khoản đóng góp tự nguyện).\n* *volunteer* (n/v): Tình nguyện viên / tình nguyện.\n* *voluntarily* (adv): Một cách tự nguyện.\n* *volunteering* (n): Hoạt động tình nguyện.\n\n*Dịch câu:* Quỹ phi chính phủ hoạt động hoàn toàn dựa trên các khoản đóng góp tự nguyện từ các nhà tài trợ hảo tâm trong khu vực."
    },
    {
        "order": 81,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct word form to complete the following sentence:\n\nSeveral retired teachers worked ________ to tutor orphaned children at the community library every weekend.",
        "options": [
            {"id": "A", "text": "volunteer"},
            {"id": "B", "text": "voluntary"},
            {"id": "C", "text": "voluntarily"},
            {"id": "D", "text": "volunteering"}
        ],
        "correctAnswer": "C",
        "explanation": "**Đáp án đúng: C (voluntarily)**\n\n* Đứng sau động từ quá khứ \"worked\" cần một trạng từ chỉ cách thức -> **worked voluntarily** (làm việc một cách tự nguyện, không đòi thù lao).\n* *volunteer* (n/v): Tình nguyện viên.\n* *voluntary* (adj): Tự nguyện.\n* *volunteering* (n): Công việc tình nguyện.\n\n*Dịch câu:* Một số giáo viên đã nghỉ hưu đã làm việc một cách tự nguyện để dạy kèm cho trẻ em mồ côi tại thư viện cộng đồng vào mỗi dịp cuối tuần."
    },
    {
        "order": 82,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct word form to complete the following sentence:\n\nDr. Nguyen has authored several ________ papers examining economic corridor connectivity in Southeast Asia.",
        "options": [
            {"id": "A", "text": "scholar"},
            {"id": "B", "text": "scholarship"},
            {"id": "C", "text": "scholarly"},
            {"id": "D", "text": "scholasticism"}
        ],
        "correctAnswer": "C",
        "explanation": "**Đáp án đúng: C (scholarly)**\n\n* Đứng trước danh từ \"papers\" (bài báo, công trình nghiên cứu) cần một tính từ -> **scholarly papers** (các bài báo mang tính học thuật).\n* *scholar* (n): Học giả.\n* *scholarship* (n): Học bổng.\n* *scholasticism* (n): Chủ nghĩa kinh viện.\n\n*Dịch câu:* Tiến sĩ Nguyễn đã là tác giả của một số bài báo học thuật nghiên cứu về tính kết nối hành lang kinh tế ở Đông Nam Á."
    },
    {
        "order": 83,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct word form to complete the following sentence:\n\nDistinguished world ________ gathered in Jakarta to formulate a collective pledge on climate crisis mitigation.",
        "options": [
            {"id": "A", "text": "lead"},
            {"id": "B", "text": "leaders"},
            {"id": "C", "text": "leadership"},
            {"id": "D", "text": "leading"}
        ],
        "correctAnswer": "B",
        "explanation": "**Đáp án đúng: B (leaders)**\n\n* Sau tính từ \"Distinguished world\" và làm chủ ngữ số nhiều của động từ \"gathered\" cần danh từ chỉ người số nhiều -> **world leaders** (các nhà lãnh đạo thế giới).\n* *lead* (v): Dẫn dắt.\n* *leadership* (n): Năng lực lãnh đạo.\n* *leading* (adj): Dẫn đầu.\n\n*Dịch câu:* Các nhà lãnh đạo kiệt xuất trên thế giới đã quy tụ tại Jakarta để xây dựng một cam kết chung về giảm thiểu khủng hoảng khí hậu."
    },
    {
        "order": 84,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct word form to complete the following sentence:\n\nViet Nam has established itself as one of the ________ producers of high-tech consumer electronics in the region.",
        "options": [
            {"id": "A", "text": "lead"},
            {"id": "B", "text": "leadership"},
            {"id": "C", "text": "leading"},
            {"id": "D", "text": "leaders"}
        ],
        "correctAnswer": "C",
        "explanation": "**Đáp án đúng: C (leading)**\n\n* Đứng trước danh từ \"producers\" cần một tính từ bổ nghĩa -> **leading producers** (nhà sản xuất hàng đầu).\n* *lead* (v): Dẫn dắt.\n* *leadership* (n): Năng lực lãnh đạo.\n* *leaders* (n): Những người lãnh đạo.\n\n*Dịch câu:* Việt Nam đã khẳng định vị thế là một trong những nhà sản xuất thiết bị điện tử tiêu dùng công nghệ cao hàng đầu trong khu vực."
    },
    {
        "order": 85,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct word form to complete the following sentence:\n\nAdequate diplomatic ________ ensures that the interests of smaller member nations are equitably addressed.",
        "options": [
            {"id": "A", "text": "represent"},
            {"id": "B", "text": "representation"},
            {"id": "C", "text": "representative"},
            {"id": "D", "text": "representational"}
        ],
        "correctAnswer": "B",
        "explanation": "**Đáp án đúng: B (representation)**\n\n* Sau tính từ \"Adequate diplomatic\" làm chủ ngữ số ít của động từ \"ensures\" cần danh từ trừu tượng -> **diplomatic representation** (sự đại diện ngoại giao).\n* *represent* (v): Đại diện.\n* *representative* (n): Người đại diện.\n* *representational* (adj): Tượng trưng.\n\n*Dịch câu:* Sự đại diện ngoại giao thỏa đáng đảm bảo rằng lợi ích của các quốc gia thành viên nhỏ hơn được giải quyết một cách công bằng."
    },
    {
        "order": 86,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct word form to complete the following sentence:\n\nActive student ________ in environmental campaigns helps develop practical leadership skills outside the classroom.",
        "options": [
            {"id": "A", "text": "involve"},
            {"id": "B", "text": "involved"},
            {"id": "C", "text": "involvement"},
            {"id": "D", "text": "involving"}
        ],
        "correctAnswer": "C",
        "explanation": "**Đáp án đúng: C (involvement)**\n\n* Sau tính từ \"Active student\" làm chủ ngữ cho câu cần danh từ -> **student involvement in sth** (sự tham gia, gắn bó của học sinh vào việc gì).\n* *involve* (v): Làm liên lụy, bao gồm.\n* *involved* (adj): Có liên quan, tham gia.\n* *involving* (prep): Bao gồm.\n\n*Dịch câu:* Sự tham gia tích cực của học sinh vào các chiến dịch môi trường giúp phát triển các kỹ năng lãnh đạo thực tế bên ngoài lớp học."
    },
    {
        "order": 87,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct word form to complete the following sentence:\n\nThough geographically close, the ASEAN member states are ________ diverse in language, religion, and folklore.",
        "options": [
            {"id": "A", "text": "culture"},
            {"id": "B", "text": "cultural"},
            {"id": "C", "text": "culturally"},
            {"id": "D", "text": "cultured"}
        ],
        "correctAnswer": "C",
        "explanation": "**Đáp án đúng: C (culturally)**\n\n* Đứng trước tính từ \"diverse\" cần một trạng từ chỉ phương diện bổ nghĩa -> **culturally diverse** (đa dạng về mặt văn hóa).\n* *culture* (n): Văn hóa.\n* *cultural* (adj): Thuộc văn hóa.\n* *cultured* (adj): Có văn hóa, tao nhã.\n\n*Dịch câu:* Dù gần gũi về mặt địa lý, các quốc gia thành viên ASEAN lại đa dạng về mặt văn hóa trong ngôn ngữ, tôn giáo và văn hóa dân gian."
    },
    {
        "order": 88,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct word form to complete the following sentence:\n\nPeople throughout Asia naturally ________ the blooming of yellow apricot blossoms with the joyous arrival of Spring.",
        "options": [
            {"id": "A", "text": "associate"},
            {"id": "B", "text": "association"},
            {"id": "C", "text": "associative"},
            {"id": "D", "text": "associated"}
        ],
        "correctAnswer": "A",
        "explanation": "**Đáp án đúng: A (associate)**\n\n* Sau chủ ngữ \"People throughout Asia\" và trạng từ \"naturally\" cần động từ chính ở thì Hiện tại đơn -> **associate sth with sth** (liên tưởng, gắn liền cái gì với cái gì).\n* *association* (n): Hiệp hội, sự liên tưởng.\n* *associative* (adj): Có tính kết hợp.\n* *associated* (adj): Được liên kết.\n\n*Dịch câu:* Người dân khắp châu Á tự nhiên liên tưởng sự nở rộ của hoa mai vàng với sự trở lại vui tươi của mùa Xuân."
    },
    {
        "order": 89,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct word form to complete the following sentence:\n\nNaval search and rescue squads from three countries worked ________ to find missing fishermen in the high seas.",
        "options": [
            {"id": "A", "text": "cooperate"},
            {"id": "B", "text": "cooperation"},
            {"id": "C", "text": "cooperative"},
            {"id": "D", "text": "cooperatively"}
        ],
        "correctAnswer": "D",
        "explanation": "**Đáp án đúng: D (cooperatively)**\n\n* Đứng sau động từ nội \"worked\" cần một trạng từ chỉ cách thức -> **worked cooperatively** (làm việc một cách phối hợp, hợp tác chặt chẽ).\n* *cooperate* (v): Hợp tác.\n* *cooperation* (n): Sự hợp tác.\n* *cooperative* (adj): Mang tính hợp tác.\n\n*Dịch câu:* Các đội tìm kiếm cứu nạn hải quân từ ba quốc gia đã làm việc một cách phối hợp nhịp nhàng để tìm kiếm những ngư dân mất tích trên vùng biển khơi."
    },
    {
        "order": 90,
        "content": "Mark the letter A, B, C, or D on your answer sheet to indicate the correct word form to complete the following sentence:\n\nDuring regional crises, member states act with remarkable ________ to provide swift emergency assistance to affected communities.",
        "options": [
            {"id": "A", "text": "solid"},
            {"id": "B", "text": "solidarity"},
            {"id": "C", "text": "solidify"},
            {"id": "D", "text": "solidly"}
        ],
        "correctAnswer": "B",
        "explanation": "**Đáp án đúng: B (solidarity)**\n\n* Sau giới từ \"with\" và tính từ \"remarkable\" cần một danh từ trừu tượng -> **solidarity** (tinh thần đoàn kết, sự gắn kết keo sơn).\n* *solid* (adj): Vững chắc, rắn.\n* *solidify* (v): Làm cho đặc lại, củng cố.\n* *solidly* (adv): Một cách vững chắc.\n\n*Dịch câu:* Trong các cuộc khủng hoảng khu vực, các quốc gia thành viên hành động với tinh thần đoàn kết đáng nể để kịp thời cung cấp cứu trợ khẩn cấp cho các cộng đồng bị ảnh hưởng."
    }
]

def main():
    print("=== VERIFYING Q31 to Q60 (Vocabulary, >= 2 target words in options) ===")
    violations = []
    for q in q31_to_q60:
        matched_opts = []
        for opt in q["options"]:
            if check_word_in_target(opt["text"]):
                matched_opts.append(opt["text"])
        if len(matched_opts) < 2:
            violations.append((q["order"], len(matched_opts), matched_opts))
        else:
            print(f"Question {q['order']:02d}: OK ({len(matched_opts)} target words: {matched_opts})")

    if violations:
        print(f"❌ Found {len(violations)} violations in Q31-Q60!")
        raise ValueError("Constraint violation in Q31-Q60!")
    else:
        print("✅ Q31-Q60 strictly pass the constraint!")

    print("\n=== VERIFYING Q61 to Q90 (Word Form) ===")
    for q in q61_to_q90:
        opts_texts = [opt["text"] for opt in q["options"]]
        assert len(q["options"]) == 4, f"Q{q['order']} does not have 4 options"
        assert q["correctAnswer"] in ["A", "B", "C", "D"], f"Q{q['order']} invalid answer"
        print(f"Question {q['order']:02d}: OK -> Options: {opts_texts} | Correct: {q['correctAnswer']}")

    all_90_questions = q1_to_q30 + q31_to_q60 + q61_to_q90
    assert len(all_90_questions) == 90, f"Expected 90 questions, got {len(all_90_questions)}"

    # Check overall answer distribution
    ans_counts = {"A": 0, "B": 0, "C": 0, "D": 0}
    for q in all_90_questions:
        ans_counts[q["correctAnswer"]] += 1
    print(f"\n📊 Overall Answer Distribution across all 90 questions: {ans_counts}")

    lecture_markdown = """# 🌟 Bộ Đề Ôn Luyện 90 Câu Chuyên Sâu: Từ Vựng & Word Form Unit 4
**Biên soạn riêng cho Bạn Thái • Hướng dẫn: Thầy Thức**

Chuyên đề: **ASEAN and Viet Nam (90 Câu Hỏi Trắc Nghiệm Thực Chiến)**
Mục tiêu: **Chinh phục điểm 8.5+ Giữa kì & THPT Quốc Gia**

[📖 Xem Lại Bài Giảng & Từ Vựng Tương Tác Unit 4](/lectures/eng11-unit4/index.html)

---

### 📌 Cấu trúc đề 90 câu hôm nay (10/11/2026):
1. **Phần 1: Luyện Tập Từ Vựng Cơ Bản & Nâng Cao (Câu 1 - 60):**
   - Rèn luyện phản xạ ngữ cảnh 24 từ vựng cốt lõi Unit 4 (*Association, Cooperation, Integration, Solidarity, Stability, Maintain, Promote, Motto, Charter, Bloc, Cultural exchange, Involved in, Represent, Representative, Participant, Volunteer, Scholarship, Leadership, Diversity, Identity, Prosperous, Prosperity, Contribution, Strengthen*).
   - Mỗi câu đều có tối thiểu 2 từ vựng quen thuộc trong các phương án để rèn tư duy phân biệt ngữ cảnh và *collocation*.
2. **Phần 2: Chuyên Đề Cấu Tạo Từ - Word Form (Câu 61 - 90):**
   - Khai thác trọn vẹn họ từ (Danh - Động - Tính - Trạng) của 24 từ vựng Unit 4.
   - Nhận diện đúng vị trí từ loại trong câu: sau *to-infinitive*, trước danh từ, sau mạo từ, sau trạng từ,...

> [!TIP]
> **Chiến thuật làm bài của Thầy Thức:**
> - Với câu hỏi Từ vựng (1-60): Dịch bao quát câu và tìm cụm từ cố định (*collocation*).
> - Với câu hỏi Word Form (61-90): Xác định ngay từ loại cần điền (Noun/Verb/Adj/Adv) dựa vào cấu trúc ngữ pháp trước và sau chỗ trống trước khi nhìn vào các phương án.
"""

    payload = {
        "studentUsername": "thai",
        "grade": 11,
        "assignedDate": "2026-11-10T00:00:00.000Z",
        "unitTitle": "Unit 4: Đại Đề 90 Câu Từ Vựng & Word Form ASEAN and Viet Nam",
        "unitDescription": "Đại đề 90 câu trắc nghiệm chuyên sâu: 60 câu luyện từ vựng cốt lõi Unit 4 & 30 câu cấu tạo từ (Word Form), mục tiêu 8.5+.",
        "lectureMarkdown": lecture_markdown,
        "teacherNote": "Thầy Thức dặn Thái: Hôm nay con hoàn thành trọn vẹn Đại đề 90 câu ôn luyện chuyên sâu Unit 4 (ASEAN and Viet Nam). Đề gồm 60 câu trắc nghiệm từ vựng (phân biệt bẫy ngữ cảnh kép) và 30 câu cấu tạo từ Word Form chuẩn form đề thi phân hóa cao. Con chú ý phân tích kỹ loại từ để đạt điểm 8.5+ nhé!",
        "assessmentTitle": "Luyện tập chuyên sâu: Đại Đề 90 Câu Từ Vựng & Word Form - Unit 4 (ASEAN and Viet Nam)",
        "timeLimitMinutes": 90,
        "questions": all_90_questions
    }

    out_file = "/home/dantey/Dantey/teaching/teachingPlatform/.agents/skills/teaching-english-curriculum/scripts/payload_thai_1011_90q.json"
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)

    print(f"\n🎉 90-Question Payload successfully written to: {out_file}")

if __name__ == "__main__":
    main()
