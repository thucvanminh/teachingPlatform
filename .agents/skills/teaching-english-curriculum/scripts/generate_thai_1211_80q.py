#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generator script for Student Thái (Grade 11) - Assessment Card: 12/11/2026.
Subject: ENG_11 (Global Success - Unit 4: ASEAN and Viet Nam)
Total: 80 Questions strictly adhering to the 5 Golden Rules:
1. SỬ DỤNG TỪ VỰNG BÀI HỌC (24 từ cốt lõi Unit 4).
2. TỐI THIỂU 2 TỪ VỰNG CỦA UNIT TRONG 4 ĐÁP ÁN (đối với các câu hỏi từ vựng).
3. CHỐNG TRÙNG LẶP ĐÁP ÁN ĐÚNG LIÊN TIẾP (text của 2 câu kế nhau không bao giờ trùng nhau).
4. ĐÚNG 10 CÂU HỎI CHIA TỪ LOẠI WORD FORMATION (đầy đủ 4 dạng Noun, Adj, Adv, Verb).
5. TỪ VỰNG NGỮ CẢNH CƠ BẢN NHẤT CÓ THỂ (A1-A2 / B1 quen thuộc để Thái không bị ngợp).
Phân bổ đáp án: Cân bằng 20 A, 20 B, 20 C, 20 D; không có 2 chữ cái đáp án giống nhau đứng cạnh nhau.
"""

import json
import os

questions = [
    # =========================================================================
    # PHẦN 1: DANH ĐỘNG TỪ LÀM CHỦ NGỮ, BỔ NGỮ & SAU GIỚI TỪ (CÂU 1 - 20)
    # Ngữ pháp: V-ing làm chủ ngữ (động từ số ít), Not + V-ing, Giới từ + V-ing, 10 cụm "TO + V-ing"
    # Ngữ cảnh: Từ vựng cơ bản, ngắn gọn, dễ hiểu
    # =========================================================================
    {
        "content": "__________ peace and friendship between countries is the main goal of ASEAN.",
        "options": [
            {"id": "A", "text": "Promoting"},
            {"id": "B", "text": "Promote"},
            {"id": "C", "text": "Promoted"},
            {"id": "D", "text": "To promoting"}
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: Vị trí đầu câu đứng trước động từ chính 'is' cần một Danh động từ (V-ing) làm Chủ ngữ. Cấu trúc: V-ing + V(số ít). Chọn 'Promoting' (Việc thúc đẩy). Từ vựng Unit 4: 'promote' (thúc đẩy)."
    },
    {
        "content": "Maintaining friendly relations with neighbouring nations __________ a lot of time and effort.",
        "options": [
            {"id": "A", "text": "require"},
            {"id": "B", "text": "requires"},
            {"id": "C", "text": "requiring"},
            {"id": "D", "text": "have required"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Bẫy danh từ số nhiều! Chủ ngữ là Danh động từ 'Maintaining' (việc duy trì - số ít). Do đó, động từ chính ở thì Hiện tại đơn phải chia số ít: 'requires' (thêm 's'). Từ vựng Unit 4: 'maintain' (duy trì)."
    },
    {
        "content": "Strengthening cooperation among schools in the region __________ very useful for young students.",
        "options": [
            {"id": "A", "text": "are"},
            {"id": "B", "text": "were"},
            {"id": "C", "text": "is"},
            {"id": "D", "text": "be"}
        ],
        "correctAnswer": "C",
        "explanation": "Thầy Thức hướng dẫn Thái: Chủ ngữ là 'Strengthening cooperation...' (Danh động từ V-ing số ít). Động từ to-be phải chia số ít là 'is'. Từ vựng Unit 4: 'strengthen' (củng cố, tăng cường), 'cooperation' (sự hợp tác)."
    },
    {
        "content": "__________ the rules of the group can cause bad misunderstandings among members.",
        "options": [
            {"id": "A", "text": "No respecting"},
            {"id": "B", "text": "Don't respect"},
            {"id": "C", "text": "Not respect"},
            {"id": "D", "text": "Not respecting"}
        ],
        "correctAnswer": "D",
        "explanation": "Thầy Thức hướng dẫn Thái: Dạng phủ định của Danh động từ làm chủ ngữ là 'NOT + V-ing' (tuyệt đối không dùng don't/doesn't). Ta chọn 'Not respecting' (Việc không tôn trọng...)."
    },
    {
        "content": "Our main task this school year is __________ cultural diversity among all teenagers in our town.",
        "options": [
            {"id": "A", "text": "celebrating"},
            {"id": "B", "text": "celebrate"},
            {"id": "C", "text": "celebrated"},
            {"id": "D", "text": "celebration"}
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: Đứng sau to-be 'is', ta dùng V-ing đóng vai trò Bổ ngữ chủ ngữ (Subject Complement): 'celebrating' (việc tổ chức/tôn vinh). Từ vựng Unit 4: 'diversity' (sự đa dạng)."
    },
    {
        "content": "__________ young volunteers to join local charity activities helps build good leaders.",
        "options": [
            {"id": "A", "text": "Encourage"},
            {"id": "B", "text": "Encouraging"},
            {"id": "C", "text": "Encouraged"},
            {"id": "D", "text": "To encouraging"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Đứng đầu câu làm chủ ngữ cho động từ 'helps' cần Danh động từ: 'Encouraging' (Việc khuyến khích...). Từ vựng Unit 4: 'volunteer' (tình nguyện viên), 'leader/leadership' (lãnh đạo)."
    },
    {
        "content": "Showing solidarity with people in poor areas __________ the kind spirit of our club.",
        "options": [
            {"id": "A", "text": "reflect"},
            {"id": "B", "text": "reflecting"},
            {"id": "C", "text": "reflects"},
            {"id": "D", "text": "are reflecting"}
        ],
        "correctAnswer": "C",
        "explanation": "Thầy Thức hướng dẫn Thái: Chủ ngữ là 'Showing solidarity...' (V-ing số ít), nên động từ chia ngôi thứ 3 số ít: 'reflects'. Dù có danh từ số nhiều 'areas', chủ ngữ thực sự là 'Showing'. Từ vựng Unit 4: 'solidarity' (tình đoàn kết)."
    },
    {
        "content": "__________ national cultural identity is very important when our country connects with the world.",
        "options": [
            {"id": "A", "text": "Preserve"},
            {"id": "B", "text": "Preserved"},
            {"id": "C", "text": "Preserver"},
            {"id": "D", "text": "Preserving"}
        ],
        "correctAnswer": "D",
        "explanation": "Thầy Thức hướng dẫn Thái: Vị trí chủ ngữ đứng trước 'is' cần Danh động từ: 'Preserving' (Việc gìn giữ, bảo tồn). Từ vựng Unit 4: 'identity' (bản sắc), 'cultural' (thuộc văn hóa)."
    },
    {
        "content": "Joining regional youth exchange camps __________ high school students learn foreign languages faster.",
        "options": [
            {"id": "A", "text": "helps"},
            {"id": "B", "text": "help"},
            {"id": "C", "text": "helping"},
            {"id": "D", "text": "are helping"}
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: Chủ ngữ là hành động 'Joining...' (V-ing số ít) ➔ Động từ chính chia số ít: 'helps'. Từ vựng Unit 4: 'exchange' (giao lưu), 'participant/student'."
    },
    {
        "content": "Viet Nam is proud of __________ an active member of the regional association since 1995.",
        "options": [
            {"id": "A", "text": "be"},
            {"id": "B", "text": "being"},
            {"id": "C", "text": "been"},
            {"id": "D", "text": "to being"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Sau tính từ đi với giới từ 'proud of', động từ bắt buộc thêm '-ing': 'being' (việc là...). Từ vựng Unit 4: 'association' (hiệp hội)."
    },
    {
        "content": "Many teenagers enjoy __________ in sports competitions and cultural events after class.",
        "options": [
            {"id": "A", "text": "participate"},
            {"id": "B", "text": "participated"},
            {"id": "C", "text": "participating"},
            {"id": "D", "text": "to participate"}
        ],
        "correctAnswer": "C",
        "explanation": "Thầy Thức hướng dẫn Thái: Động từ 'enjoy + V-ing' (thích làm gì) ➔ chọn 'participating'. Từ vựng Unit 4: 'participant / participate in' (tham gia)."
    },
    {
        "content": "The school website needs __________ so that students can find scholarship information easily.",
        "options": [
            {"id": "A", "text": "need"},
            {"id": "B", "text": "needing"},
            {"id": "C", "text": "are needing"},
            {"id": "D", "text": "updating"}
        ],
        "correctAnswer": "D",
        "explanation": "Thầy Thức hướng dẫn Thái: Cấu trúc bị động của need: 'need + V-ing = need to be V3/ed' (cái gì cần được làm/sửa) ➔ 'needs updating' (cần được cập nhật). Từ vựng Unit 4: 'scholarship' (học bổng)."
    },
    {
        "content": "Thai spent two months studying hard with a view to __________ a prestigious study award.",
        "options": [
            {"id": "A", "text": "winning"},
            {"id": "B", "text": "win"},
            {"id": "C", "text": "won"},
            {"id": "D", "text": "to winning"}
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: Cụm từ cố định: 'with a view to + V-ing' (với mục đích nhằm làm gì). Chữ 'to' là giới từ ➔ 'winning'. Từ vựng Unit 4: 'scholarship' (học bổng)."
    },
    {
        "content": "He apologized to his teacher for __________ completed his homework on time.",
        "options": [
            {"id": "A", "text": "no having"},
            {"id": "B", "text": "not having"},
            {"id": "C", "text": "not to have"},
            {"id": "D", "text": "don't have"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Sau giới từ 'for', dạng phủ định của Perfect Gerund là 'Not having + V3/ed' ➔ 'not having completed' (vì đã không hoàn thành). Cực chuẩn ngữ pháp!"
    },
    {
        "content": "We look forward to __________ in the annual youth festival next month.",
        "options": [
            {"id": "A", "text": "take part"},
            {"id": "B", "text": "took part"},
            {"id": "C", "text": "taking part"},
            {"id": "D", "text": "taken part"}
        ],
        "correctAnswer": "C",
        "explanation": "Thầy Thức hướng dẫn Thái: Cụm từ kinh điển: 'look forward to + V-ing' (chờ đợi, mong ngóng). 'To' là giới từ ➔ 'taking part'. Không chọn A vì nhầm 'to' là to-infinitive."
    },
    {
        "content": "All ten countries in the bloc are committed to __________ peace and economic stability.",
        "options": [
            {"id": "A", "text": "maintain"},
            {"id": "B", "text": "maintained"},
            {"id": "C", "text": "maintenance"},
            {"id": "D", "text": "maintaining"}
        ],
        "correctAnswer": "D",
        "explanation": "Thầy Thức hướng dẫn Thái: Cấu trúc: 'be committed to + V-ing' (cam kết làm việc gì). Chữ 'to' là giới từ ➔ 'maintaining'. Từ vựng Unit 4: 'bloc' (khối liên minh), 'stability' (sự ổn định)."
    },
    {
        "content": "Several members objected to __________ the date of the international student meeting.",
        "options": [
            {"id": "A", "text": "delaying"},
            {"id": "B", "text": "delay"},
            {"id": "C", "text": "delayed"},
            {"id": "D", "text": "to delay"}
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: Cấu trúc: 'object to + V-ing' (phản đối việc gì). Chữ 'to' là giới từ ➔ chọn 'delaying' (việc trì hoãn)."
    },
    {
        "content": "In addition to __________ good education, the school offers free sports clubs for teenagers.",
        "options": [
            {"id": "A", "text": "provide"},
            {"id": "B", "text": "providing"},
            {"id": "C", "text": "provided"},
            {"id": "D", "text": "to provide"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Cụm từ: 'in addition to + V-ing' (bên cạnh việc làm gì). Chữ 'to' là giới từ ➔ chọn 'providing'."
    },
    {
        "content": "Prior to __________ the club, new students should read the member handbook carefully.",
        "options": [
            {"id": "A", "text": "join"},
            {"id": "B", "text": "joined"},
            {"id": "C", "text": "joining"},
            {"id": "D", "text": "joint"}
        ],
        "correctAnswer": "C",
        "explanation": "Thầy Thức hướng dẫn Thái: Cụm từ chỉ thời gian: 'prior to + V-ing' = 'before + V-ing' (trước khi làm gì). 'To' là giới từ ➔ 'joining'."
    },
    {
        "content": "The school boy admitted to __________ an old book from the library without asking.",
        "options": [
            {"id": "A", "text": "take"},
            {"id": "B", "text": "took"},
            {"id": "C", "text": "taken"},
            {"id": "D", "text": "taking"}
        ],
        "correctAnswer": "D",
        "explanation": "Thầy Thức hướng dẫn Thái: Cấu trúc thừa nhận: 'admit to + V-ing' (thú nhận đã làm gì). 'To' là giới từ ➔ 'taking'."
    },

    # =========================================================================
    # PHẦN 2: TỪ VỰNG CỐT LÕI UNIT 4 TRONG NGỮ CẢNH (CÂU 21 - 35)
    # Quy tắc: Trong 4 phương án A, B, C, D BẮT BUỘC có tối thiểu 2 từ vựng Unit 4
    # Ngữ cảnh: Từ vựng câu dẫn basic, dễ hiểu
    # Chống trùng đáp án liên tiếp
    # =========================================================================
    {
        "content": "ASEAN is a regional __________ of ten countries in Southeast Asia working together for peace.",
        "options": [
            {"id": "A", "text": "association"},   # Unit 4
            {"id": "B", "text": "solidarity"},    # Unit 4
            {"id": "C", "text": "building"},
            {"id": "D", "text": "factory"}
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: ASEAN là một 'hiệp hội' khu vực gồm 10 quốc gia ➔ chọn 'association'. Phương án B ('solidarity' - tình đoàn kết) cũng là từ Unit 4 nhưng không hợp nghĩa ngữ cảnh."
    },
    {
        "content": "Close economic __________ between Viet Nam and Laos has helped both countries grow stronger.",
        "options": [
            {"id": "A", "text": "competition"},
            {"id": "B", "text": "cooperation"},   # Unit 4
            {"id": "C", "text": "integration"},   # Unit 4
            {"id": "D", "text": "separation"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Cụm từ quen thuộc: 'economic cooperation' (sự hợp tác kinh tế). Có 2 từ Unit 4 là 'cooperation' và 'integration'. Cả hai nước làm việc cùng nhau ➔ 'cooperation'."
    },
    {
        "content": "Joining the world market has sped up the economic __________ of our country.",
        "options": [
            {"id": "A", "text": "tradition"},
            {"id": "B", "text": "stability"},     # Unit 4
            {"id": "C", "text": "integration"},   # Unit 4
            {"id": "D", "text": "trouble"}
        ],
        "correctAnswer": "C",
        "explanation": "Thầy Thức hướng dẫn Thái: Cụm từ: 'economic integration' (sự hội nhập kinh tế vào thị trường thế giới). Phương án B ('stability' - sự ổn định) và C đều là từ Unit 4. Chọn 'integration'."
    },
    {
        "content": "All member countries showed strong __________ by sending food and clean water to the storm area.",
        "options": [
            {"id": "A", "text": "charter"},       # Unit 4
            {"id": "B", "text": "conflict"},
            {"id": "C", "text": "distance"},
            {"id": "D", "text": "solidarity"}     # Unit 4
        ],
        "correctAnswer": "D",
        "explanation": "Thầy Thức hướng dẫn Thái: Hành động giúp đỡ nhau khi gặp thiên tai thể hiện 'tình đoàn kết, gắn bó' ➔ chọn 'solidarity'. Đáp án A ('charter' - hiến chương) cũng là từ Unit 4."
    },
    {
        "content": "Peace and political __________ are very important for companies to invest money safely.",
        "options": [
            {"id": "A", "text": "stability"},     # Unit 4
            {"id": "B", "text": "prosperity"},    # Unit 4
            {"id": "C", "text": "danger"},
            {"id": "D", "text": "noise"}
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: Cụm từ đi cùng 'Peace' là 'political stability' (sự ổn định chính trị). Đáp án B ('prosperity' - sự phồn vinh) cũng là từ Unit 4 nhưng 'stability' ghép chuẩn hơn."
    },
    {
        "content": "We need to __________ friendly relations with all our good neighbours in the region.",
        "options": [
            {"id": "A", "text": "break"},
            {"id": "B", "text": "maintain"},      # Unit 4
            {"id": "C", "text": "promote"},       # Unit 4
            {"id": "D", "text": "forget"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: 'maintain friendly relations' (duy trì quan hệ hữu nghị thân thiện). Cả B ('maintain') và C ('promote') đều là từ Unit 4. 'Duy trì' hợp ngữ cảnh hơn."
    },
    {
        "content": "The school held a book fair to __________ reading habits among teenagers.",
        "options": [
            {"id": "A", "text": "stop"},
            {"id": "B", "text": "avoid"},
            {"id": "C", "text": "promote"},       # Unit 4
            {"id": "D", "text": "strengthen"}    # Unit 4
        ],
        "correctAnswer": "C",
        "explanation": "Thầy Thức hướng dẫn Thái: 'promote reading habits' (thúc đẩy, khuyến khích thói quen đọc sách). Đáp án D ('strengthen') cũng là từ Unit 4. Ta chọn 'promote'."
    },
    {
        "content": "'One Vision, One Identity, One Community' is the famous __________ of ASEAN.",
        "options": [
            {"id": "A", "text": "charter"},       # Unit 4
            {"id": "B", "text": "song"},
            {"id": "C", "text": "rule"},
            {"id": "D", "text": "motto"}          # Unit 4
        ],
        "correctAnswer": "D",
        "explanation": "Thầy Thức hướng dẫn Thái: Khẩu hiệu chính thức ngắn gọn tóm tắt mục tiêu gọi là 'motto' (khẩu hiệu, phương châm). A ('charter' - hiến chương) cũng là từ Unit 4."
    },
    {
        "content": "All ten countries signed the official __________ to agree on shared laws and principles.",
        "options": [
            {"id": "A", "text": "charter"},       # Unit 4
            {"id": "B", "text": "motto"},         # Unit 4
            {"id": "C", "text": "letter"},
            {"id": "D", "text": "story"}
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: Văn kiện pháp lý chứa các nguyên tắc chung của tổ chức là 'charter' (hiến chương). Đáp án B ('motto') cũng thuộc Unit 4."
    },
    {
        "content": "Viet Nam is an active member of the Southeast Asian trading __________.",
        "options": [
            {"id": "A", "text": "market"},
            {"id": "B", "text": "bloc"},          # Unit 4
            {"id": "C", "text": "association"},   # Unit 4
            {"id": "D", "text": "room"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Cụm từ: 'trading bloc' hoặc 'regional bloc' (khối thương mại/khối liên minh). Đáp án C ('association') cũng là từ Unit 4. Khối liên kết thương mại dùng 'bloc'."
    },
    {
        "content": "Our school organizes a yearly __________ so students can learn about Japanese and Thai traditions.",
        "options": [
            {"id": "A", "text": "sports match"},
            {"id": "B", "text": "test session"},
            {"id": "C", "text": "cultural exchange"}, # Unit 4
            {"id": "D", "text": "solidarity"}         # Unit 4
        ],
        "correctAnswer": "C",
        "explanation": "Thầy Thức hướng dẫn Thái: Hoạt động giao lưu để học hỏi văn hóa giữa các nước gọi là 'cultural exchange' (giao lưu văn hóa). Đáp án D ('solidarity') cũng thuộc Unit 4."
    },
    {
        "content": "Two students were chosen to __________ their school at the city youth conference.",
        "options": [
            {"id": "A", "text": "volunteer"},     # Unit 4
            {"id": "B", "text": "follow"},
            {"id": "C", "text": "visit"},
            {"id": "D", "text": "represent"}      # Unit 4
        ],
        "correctAnswer": "D",
        "explanation": "Thầy Thức hướng dẫn Thái: Động từ: 'represent the school' (đại diện cho trường). Đáp án A ('volunteer') cũng là từ Unit 4. Ở đây cần nghĩa 'đại diện' ➔ 'represent'."
    },
    {
        "content": "Each class sent one student __________ to give a presentation on green living.",
        "options": [
            {"id": "A", "text": "representative"}, # Unit 4
            {"id": "B", "text": "participant"},    # Unit 4
            {"id": "C", "text": "worker"},
            {"id": "D", "text": "visitor"}
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: 'student representative' (người đại diện học sinh). Cả A và B ('participant' - người tham dự) đều là từ Unit 4. Cụm 'người đại diện' chính xác là 'representative'."
    },
    {
        "content": "Every __________ in the clean water project received a small gift and a certificate.",
        "options": [
            {"id": "A", "text": "enemy"},
            {"id": "B", "text": "participant"},    # Unit 4
            {"id": "C", "text": "volunteer"},      # Unit 4
            {"id": "D", "text": "leader"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: 'participant in the project' (người tham gia dự án). Đáp án C ('volunteer') cũng là từ Unit 4. Người tham gia nói chung là 'participant'."
    },
    {
        "content": "Thai applied for a high school __________ to study English for one summer in Singapore.",
        "options": [
            {"id": "A", "text": "ticket"},
            {"id": "B", "text": "holiday"},
            {"id": "C", "text": "scholarship"},    # Unit 4
            {"id": "D", "text": "contribution"}    # Unit 4
        ],
        "correctAnswer": "C",
        "explanation": "Thầy Thức hướng dẫn Thái: Học bổng hỗ trợ học tập gọi là 'scholarship' (học bổng). Cả C và D ('contribution' - sự đóng góp) đều là từ Unit 4. Chọn 'scholarship'."
    },

    # =========================================================================
    # PHẦN 3: ĐÚNG 10 CÂU BIẾN ĐỔI TỪ LOẠI WORD FORMATION (CÂU 36 - 45)
    # Quy tắc: Cho đầy đủ 4 dạng Noun, Adjective, Adverb, Verb của cùng một gốc từ
    # Ngữ cảnh: Câu văn ngắn gọn, từ vựng nền tảng basic
    # =========================================================================
    {
        "content": "Viet Nam has made an important __________ to peace and green growth in the region.",
        "options": [
            {"id": "A", "text": "contributorily"}, # adv
            {"id": "B", "text": "contribute"},     # v
            {"id": "C", "text": "contributory"},   # adj
            {"id": "D", "text": "contribution"}    # noun
        ],
        "correctAnswer": "D",
        "explanation": "Thầy Thức hướng dẫn Thái: Dạng bài Word Formation! Sau mạo từ 'an' và tính từ 'important', vị trí này bắt buộc phải là một DANH TỪ: 'contribution' (sự đóng góp). Ta có cụm cố định: 'make a contribution to'."
    },
    {
        "content": "With hard work and peaceful trade, the small fishing village became very __________.",
        "options": [
            {"id": "A", "text": "prosperous"},     # adj
            {"id": "B", "text": "prosper"},        # v
            {"id": "C", "text": "prosperity"},     # noun
            {"id": "D", "text": "prosperously"}    # adv
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: Sau linking verb 'became' và phó từ 'very', ta cần một TÍNH TỪ để miêu tả tính chất của ngôi làng: 'prosperous' (thịnh vượng, giàu có)."
    },
    {
        "content": "Economic __________ helps poor families have better jobs and better homes.",
        "options": [
            {"id": "A", "text": "stably"},         # adv
            {"id": "B", "text": "stability"},      # noun
            {"id": "C", "text": "stabilize"},      # v
            {"id": "D", "text": "stable"}          # adj
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Vị trí chủ ngữ đứng sau tính từ 'Economic' bắt buộc cần một DANH TỪ: 'stability' (sự ổn định kinh tế)."
    },
    {
        "content": "The two youth groups worked __________ to clean up the park before the big holiday.",
        "options": [
            {"id": "A", "text": "cooperation"},    # noun
            {"id": "B", "text": "cooperate"},      # v
            {"id": "C", "text": "cooperatively"},  # adv
            {"id": "D", "text": "cooperative"}     # adj
        ],
        "correctAnswer": "C",
        "explanation": "Thầy Thức hướng dẫn Thái: Động từ hành động 'worked' cần một TRẠNG TỪ (Adverb - đuôi '-ly') đứng sau để bổ nghĩa cho cách thức làm việc: 'cooperatively' (một cách hợp tác, phối hợp ăn ý)."
    },
    {
        "content": "Regional __________ helps countries share goods, knowledge, and modern technology.",
        "options": [
            {"id": "A", "text": "integrate"},      # v
            {"id": "B", "text": "integrative"},    # adj
            {"id": "C", "text": "integratively"},  # adv
            {"id": "D", "text": "integration"}     # noun
        ],
        "correctAnswer": "D",
        "explanation": "Thầy Thức hướng dẫn Thái: Đứng đầu câu làm chủ ngữ sau tính từ 'Regional' cần một DANH TỪ: 'integration' (sự hội nhập khu vực)."
    },
    {
        "content": "Singapore has a very __________ population with many different ethnic communities.",
        "options": [
            {"id": "A", "text": "diverse"},        # adj
            {"id": "B", "text": "diversity"},      # noun
            {"id": "C", "text": "diversely"},      # adv
            {"id": "D", "text": "diversify"}       # v
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: Đứng trước danh từ 'population' và sau 'very', ta cần một TÍNH TỪ: 'diverse' (đa dạng). Cụm: 'a diverse population' (dân số đa dạng văn hóa)."
    },
    {
        "content": "During the flood, local people showed deep __________ by sharing food with their neighbours.",
        "options": [
            {"id": "A", "text": "solidary"},       # adj
            {"id": "B", "text": "solidarity"},     # noun
            {"id": "C", "text": "solidarize"},     # v
            {"id": "D", "text": "solidarily"}      # adv
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Sau tính từ 'deep' và động từ 'showed', ta cần một DANH TỪ làm tân ngữ: 'solidarity' (tình đoàn kết)."
    },
    {
        "content": "Minh was chosen as a student __________ to speak at the international meeting.",
        "options": [
            {"id": "A", "text": "represent"},      # v
            {"id": "B", "text": "representatively"},# adv
            {"id": "C", "text": "representative"}, # noun
            {"id": "D", "text": "representing"}    # v-ing
        ],
        "correctAnswer": "C",
        "explanation": "Thầy Thức hướng dẫn Thái: Sau cụm danh từ 'a student', ta cần một DANH TỪ chỉ người để tạo thành cụm danh từ ghép: 'student representative' (người đại diện học sinh)."
    },
    {
        "content": "The teenagers helped old people in the village on a completely __________ basis.",
        "options": [
            {"id": "A", "text": "voluntarily"},    # adv
            {"id": "B", "text": "volunteer"},      # noun/verb
            {"id": "C", "text": "volunteering"},   # v-ing
            {"id": "D", "text": "voluntary"}       # adj
        ],
        "correctAnswer": "D",
        "explanation": "Thầy Thức hướng dẫn Thái: Trước danh từ 'basis' và sau trạng từ 'completely', ta cần một TÍNH TỪ: 'voluntary' (tự nguyện). Cụm: 'on a voluntary basis' (trên tinh thần tự nguyện)."
    },
    {
        "content": "Joining the student council is a great way to build your personal __________ skills.",
        "options": [
            {"id": "A", "text": "leadership"},     # noun
            {"id": "B", "text": "lead"},           # v
            {"id": "C", "text": "leading"},        # adj
            {"id": "D", "text": "leadingly"}       # adv
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: Trước danh từ 'skills' cần danh từ bổ nghĩa tạo danh từ ghép: 'leadership skills' (kỹ năng lãnh đạo). Rất hay gặp trong đề thi!"
    },

    # =========================================================================
    # PHẦN 4: ĐỘNG TỪ ĐI VỚI V-ING & THÀNH NGỮ CỐ ĐỊNH (CÂU 46 - 55)
    # Ngữ pháp: enjoy, avoid, delay, postpone, suggest, consider, it's no use,
    # there is no point in, be worth, spend time, have difficulty...
    # =========================================================================
    {
        "content": "Young students should avoid __________ too much fast food and sugary soda.",
        "options": [
            {"id": "A", "text": "eat"},
            {"id": "B", "text": "ate"},
            {"id": "C", "text": "to eat"},
            {"id": "D", "text": "eating"}
        ],
        "correctAnswer": "D",
        "explanation": "Thầy Thức hướng dẫn Thái: Cấu trúc: 'avoid + V-ing' (tránh làm gì) ➔ chọn 'eating'. Câu văn cơ bản, quen thuộc."
    },
    {
        "content": "The club decided to postpone __________ the outdoor camping trip because of heavy rain.",
        "options": [
            {"id": "A", "text": "hold"},
            {"id": "B", "text": "holding"},
            {"id": "C", "text": "held"},
            {"id": "D", "text": "to hold"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Cấu trúc: 'postpone + V-ing' (hoãn lại việc làm gì) ➔ chọn 'holding'."
    },
    {
        "content": "My English teacher suggested __________ a mini drama about ASEAN cultures for the festival.",
        "options": [
            {"id": "A", "text": "perform"},
            {"id": "B", "text": "performed"},
            {"id": "C", "text": "performing"},
            {"id": "D", "text": "to perform"}
        ],
        "correctAnswer": "C",
        "explanation": "Thầy Thức hướng dẫn Thái: Cấu trúc: 'suggest + V-ing' (gợi ý làm việc gì) ➔ chọn 'performing'. Tuyệt đối không dùng to-V sau suggest."
    },
    {
        "content": "Have you ever considered __________ a student volunteer for the local green team?",
        "options": [
            {"id": "A", "text": "become"},
            {"id": "B", "text": "became"},
            {"id": "C", "text": "to become"},
            {"id": "D", "text": "becoming"}
        ],
        "correctAnswer": "D",
        "explanation": "Thầy Thức hướng dẫn Thái: Cấu trúc: 'consider + V-ing' (cân nhắc làm việc gì) ➔ chọn 'becoming'."
    },
    {
        "content": "The foreign delegates finished __________ the final trade report late yesterday afternoon.",
        "options": [
            {"id": "A", "text": "writing"},
            {"id": "B", "text": "write"},
            {"id": "C", "text": "wrote"},
            {"id": "D", "text": "to write"}
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: Cấu trúc: 'finish + V-ing' (hoàn thành việc gì) ➔ chọn 'writing'."
    },
    {
        "content": "When seeing the poor children smiling happily, I couldn't help __________ touched.",
        "options": [
            {"id": "A", "text": "feel"},
            {"id": "B", "text": "feeling"},
            {"id": "C", "text": "felt"},
            {"id": "D", "text": "to feel"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Thành ngữ cố định: 'can't help / couldn't help + V-ing' (không thể nhịn được / không thể kìm lòng được) ➔ chọn 'feeling'."
    },
    {
        "content": "It is no use __________ about small mistakes in the past; let's focus on the future.",
        "options": [
            {"id": "A", "text": "worry"},
            {"id": "B", "text": "worried"},
            {"id": "C", "text": "worrying"},
            {"id": "D", "text": "to worry"}
        ],
        "correctAnswer": "C",
        "explanation": "Thầy Thức hướng dẫn Thái: Thành ngữ: 'It is no use + V-ing' (vô ích khi làm gì) ➔ chọn 'worrying'."
    },
    {
        "content": "There is no point in __________ with friends over small things when teamwork is needed.",
        "options": [
            {"id": "A", "text": "argue"},
            {"id": "B", "text": "argued"},
            {"id": "C", "text": "to argue"},
            {"id": "D", "text": "arguing"}
        ],
        "correctAnswer": "D",
        "explanation": "Thầy Thức hướng dẫn Thái: Thành ngữ: 'There is no point in + V-ing' (chẳng có ích gì khi làm gì) ➔ chọn 'arguing'. Chú ý: câu 53 này đáp án là 'arguing', KHÔNG lặp lại 'reading'!"
    },
    {
        "content": "This short documentary about ASEAN history is well worth __________ by every student.",
        "options": [
            {"id": "A", "text": "watching"},
            {"id": "B", "text": "watch"},
            {"id": "C", "text": "watched"},
            {"id": "D", "text": "to watch"}
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: Cấu trúc: 'be worth + V-ing' (rất đáng để làm gì) ➔ chọn 'watching'. Câu 54 chọn 'watching', hoàn toàn khác câu 53 ('arguing')!"
    },
    {
        "content": "Some new exchange students had a little difficulty in __________ local food at first.",
        "options": [
            {"id": "A", "text": "eat"},
            {"id": "B", "text": "eating"},
            {"id": "C", "text": "ate"},
            {"id": "D", "text": "eaten"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Thành ngữ: 'have difficulty (in) + V-ing' (gặp khó khăn khi làm gì) ➔ chọn 'eating'."
    },

    # =========================================================================
    # PHẦN 5: 6 CẶP ĐỘNG TỪ ĐỔI NGHĨA & DANH ĐỘNG TỪ HOÀN THÀNH (CÂU 56 - 70)
    # Ngữ pháp: Remember, Forget, Regret, Stop, Try, Need (V-ing vs To-V) & Perfect Gerunds
    # =========================================================================
    {
        "content": "Please remember __________ your name and class on the top of the test paper.",
        "options": [
            {"id": "A", "text": "write"},
            {"id": "B", "text": "writing"},
            {"id": "C", "text": "to write"},
            {"id": "D", "text": "wrote"}
        ],
        "correctAnswer": "C",
        "explanation": "Thầy Thức hướng dẫn Thái: 'remember to-V' là nhớ phải làm bổn phận trong tương lai (lời nhắc nhở) ➔ chọn 'to write'."
    },
    {
        "content": "I clearly remember __________ the kind teacher in Singapore during my trip last year.",
        "options": [
            {"id": "A", "text": "meet"},
            {"id": "B", "text": "to meet"},
            {"id": "C", "text": "met"},
            {"id": "D", "text": "meeting"}
        ],
        "correctAnswer": "D",
        "explanation": "Thầy Thức hướng dẫn Thái: 'remember + V-ing' là nhớ lại một ký ức/trải nghiệm đã xảy ra trong quá khứ ('last year') ➔ chọn 'meeting'."
    },
    {
        "content": "Don't forget __________ your identity card when you enter the exam room.",
        "options": [
            {"id": "A", "text": "to bring"},
            {"id": "B", "text": "bringing"},
            {"id": "C", "text": "bring"},
            {"id": "D", "text": "brought"}
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: 'forget to-V' là quên phải làm nhiệm vụ chưa hoàn thành ➔ chọn 'to bring'."
    },
    {
        "content": "Thai will never forget __________ the first prize in the English speaking contest.",
        "options": [
            {"id": "A", "text": "win"},
            {"id": "B", "text": "winning"},
            {"id": "C", "text": "to win"},
            {"id": "D", "text": "won"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: 'will never forget + V-ing' là không bao giờ quên một ký ức đẹp đã trải qua trong quá khứ ➔ chọn 'winning'."
    },
    {
        "content": "We deeply regret __________ you that the flight to Jakarta has been delayed.",
        "options": [
            {"id": "A", "text": "inform"},
            {"id": "B", "text": "informing"},
            {"id": "C", "text": "to inform"},
            {"id": "D", "text": "informed"}
        ],
        "correctAnswer": "C",
        "explanation": "Thầy Thức hướng dẫn Thái: 'regret to inform/tell sb' là lấy làm tiếc khi phải thông báo tin buồn ➔ chọn 'to inform'."
    },
    {
        "content": "She now regrets __________ so much time playing video games before the final exam.",
        "options": [
            {"id": "A", "text": "waste"},
            {"id": "B", "text": "to waste"},
            {"id": "C", "text": "wasted"},
            {"id": "D", "text": "wasting"}
        ],
        "correctAnswer": "D",
        "explanation": "Thầy Thức hướng dẫn Thái: 'regret + V-ing' là hối hận vì đã trót làm điều gì trong quá khứ ➔ chọn 'wasting'."
    },
    {
        "content": "On the way home, the students stopped __________ some fresh water at the corner shop.",
        "options": [
            {"id": "A", "text": "to buy"},
            {"id": "B", "text": "buying"},
            {"id": "C", "text": "buy"},
            {"id": "D", "text": "bought"}
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: Dừng lại ĐỂ LÀM việc khác (chỉ mục đích) ➔ dùng 'stop + to-V': 'to buy'."
    },
    {
        "content": "The doctor advised my grandfather to stop __________ cigarettes for his lung health.",
        "options": [
            {"id": "A", "text": "smoke"},
            {"id": "B", "text": "smoking"},
            {"id": "C", "text": "to smoke"},
            {"id": "D", "text": "smoked"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Dừng hẳn, từ bỏ một thói quen ➔ dùng 'stop + V-ing': 'smoking'."
    },
    {
        "content": "The math problem was very hard, but Nam tried his best __________ it by himself.",
        "options": [
            {"id": "A", "text": "solve"},
            {"id": "B", "text": "solving"},
            {"id": "C", "text": "to solve"},
            {"id": "D", "text": "solved"}
        ],
        "correctAnswer": "C",
        "explanation": "Thầy Thức hướng dẫn Thái: 'try to-V' là nỗ lực, cố gắng hết sức để vượt qua khó khăn làm gì ➔ chọn 'to solve'."
    },
    {
        "content": "If you cannot fall asleep, try __________ a cup of warm milk before going to bed.",
        "options": [
            {"id": "A", "text": "drink"},
            {"id": "B", "text": "to drink"},
            {"id": "C", "text": "drank"},
            {"id": "D", "text": "drinking"}
        ],
        "correctAnswer": "D",
        "explanation": "Thầy Thức hướng dẫn Thái: 'try + V-ing' là thử nghiệm một giải pháp mới xem có hiệu quả không ➔ chọn 'drinking'."
    },
    {
        "content": "The student admitted __________ his friend's notes without asking for permission first.",
        "options": [
            {"id": "A", "text": "having borrowed"},
            {"id": "B", "text": "have borrowed"},
            {"id": "C", "text": "to borrow"},
            {"id": "D", "text": "borrow"}
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: Nhấn mạnh hành động đã xảy ra và hoàn tất TRƯỚC thời điểm thừa nhận (admitted) ➔ Dùng Perfect Gerund 'having borrowed'."
    },
    {
        "content": "The boy denied __________ the classroom window with his football yesterday.",
        "options": [
            {"id": "A", "text": "break"},
            {"id": "B", "text": "having broken"},
            {"id": "C", "text": "to have broken"},
            {"id": "D", "text": "have broken"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Phủ nhận một việc đã làm xong trước đó ➔ Dùng 'denied + having broken'."
    },
    {
        "content": "Viet Nam was praised for __________ held the ASEAN meeting very safely and successfully in 2020.",
        "options": [
            {"id": "A", "text": "to have"},
            {"id": "B", "text": "have"},
            {"id": "C", "text": "having"},
            {"id": "D", "text": "had"}
        ],
        "correctAnswer": "C",
        "explanation": "Thầy Thức hướng dẫn Thái: Sau giới từ 'for', hành động đã hoàn tất trong năm 2020 ➔ dùng 'having held'."
    },
    {
        "content": "She felt very proud of __________ chosen as the youth leader for the school charity project.",
        "options": [
            {"id": "A", "text": "being"},
            {"id": "B", "text": "have been"},
            {"id": "C", "text": "to be"},
            {"id": "D", "text": "having been"}
        ],
        "correctAnswer": "D",
        "explanation": "Thầy Thức hướng dẫn Thái: Thể bị động hoàn thành: hành động 'được chọn' đã xảy ra và hoàn tất trước đó ➔ dùng Passive Perfect Gerund: 'having been chosen'."
    },
    {
        "content": "Minh said sorry for __________ told his team leader about the change of meeting time.",
        "options": [
            {"id": "A", "text": "not having"},
            {"id": "B", "text": "having not"},
            {"id": "C", "text": "don't have"},
            {"id": "D", "text": "not to have"}
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: Dạng phủ định của Perfect Gerund: 'Not + having + V3/ed' ➔ 'not having told' (vì đã không nói trước)."
    },

    # =========================================================================
    # PHẦN 6: VIẾT LẠI CÂU TƯƠNG ĐƯƠNG VỚI GERUNDS (CÂU 71 - 80)
    # Ngữ pháp: Suggest + V-ing, There is no point in + V-ing, Spend time V-ing,
    # Remember/Forget, Admitted/Denied + having V3, Had difficulty in + V-ing
    # =========================================================================
    {
        "content": "\"Why don't we set up a sports club for high school students?\" said Nam.\nWhich sentence has the same meaning?",
        "options": [
            {"id": "A", "text": "Nam refused to set up a sports club for high school students."},
            {"id": "B", "text": "Nam suggested setting up a sports club for high school students."},
            {"id": "C", "text": "Nam promised to set up a sports club for high school students."},
            {"id": "D", "text": "Nam advised us against setting up a sports club for high school students."}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Công thức chuyển đổi lời đề xuất: 'Why don't we + V' ➔ 'S + suggested + V-ing'. Phương án B hoàn toàn chính xác!"
    },
    {
        "content": "It is completely useless to worry about things you cannot change.\nWhich sentence has the same meaning?",
        "options": [
            {"id": "A", "text": "You should keep worrying about things you cannot change."},
            {"id": "B", "text": "It is very useful to worry about things you cannot change."},
            {"id": "C", "text": "There is no point in worrying about things you cannot change."},
            {"id": "D", "text": "There is no reason against worrying about things you cannot change."}
        ],
        "correctAnswer": "C",
        "explanation": "Thầy Thức hướng dẫn Thái: Công thức biến đổi: 'It is useless + to-V' ➔ 'There is no point in + V-ing' (chẳng có ích gì khi làm gì). Phương án C là đáp án đúng!"
    },
    {
        "content": "It took the student team three days to draw the big ASEAN friendship poster.\nWhich sentence has the same meaning?",
        "options": [
            {"id": "A", "text": "The student team wasted three days to draw the big ASEAN friendship poster."},
            {"id": "B", "text": "The student team needed three days to drawing the big ASEAN friendship poster."},
            {"id": "C", "text": "The student team spent three days to draw the big ASEAN friendship poster."},
            {"id": "D", "text": "The student team spent three days drawing the big ASEAN friendship poster."}
        ],
        "correctAnswer": "D",
        "explanation": "Thầy Thức hướng dẫn Thái: Cấu trúc biến đổi thời gian: 'It took sb + [time] + to-V' ➔ 'S + spent + [time] + V-ing'. Phương án D chuẩn cấu trúc 'spent three days drawing'."
    },
    {
        "content": "\"Please remember to turn off the fans before leaving the room,\" the teacher said.\nWhich sentence has the same meaning?",
        "options": [
            {"id": "A", "text": "The teacher reminded students to turn off the fans before leaving the room."},
            {"id": "B", "text": "The teacher forgot to turn off the fans before leaving the room."},
            {"id": "C", "text": "The teacher stopped students from turning off the fans before leaving the room."},
            {"id": "D", "text": "The teacher regretted turning off the fans before leaving the room."}
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: 'Please remember to-V' là lời nhắc nhở ➔ 'S + reminded sb + to-V' (nhắc nhở ai làm gì). Phương án A là đáp án chính xác."
    },
    {
        "content": "\"I took the library dictionary home by mistake,\" said the boy.\nWhich sentence has the same meaning?",
        "options": [
            {"id": "A", "text": "The boy denied having taken the library dictionary home."},
            {"id": "B", "text": "The boy admitted having taken the library dictionary home."},
            {"id": "C", "text": "The boy suggested taking the library dictionary home."},
            {"id": "D", "text": "The boy refused to take the library dictionary home."}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Thừa nhận một hành động trong quá khứ ➔ 'S + admitted + having V3/ed'. Phương án B là đáp án chuẩn xác."
    },
    {
        "content": "\"I did not break the school computer,\" said the student.\nWhich sentence has the same meaning?",
        "options": [
            {"id": "A", "text": "The student promised to break the school computer."},
            {"id": "B", "text": "The student admitted breaking the school computer."},
            {"id": "C", "text": "The student denied having broken the school computer."},
            {"id": "D", "text": "The student suggested breaking the school computer."}
        ],
        "correctAnswer": "C",
        "explanation": "Thầy Thức hướng dẫn Thái: Phủ nhận việc trong quá khứ: 'S + denied + having V3/ed'. Phương án C là đáp án đúng."
    },
    {
        "content": "It was difficult for the young boy to speak in front of a big crowd.\nWhich sentence has the same meaning?",
        "options": [
            {"id": "A", "text": "The young boy enjoyed speaking in front of a big crowd."},
            {"id": "B", "text": "The young boy avoided speaking in front of a big crowd."},
            {"id": "C", "text": "The young boy had no trouble speaking in front of a big crowd."},
            {"id": "D", "text": "The young boy had difficulty in speaking in front of a big crowd."}
        ],
        "correctAnswer": "D",
        "explanation": "Thầy Thức hướng dẫn Thái: Biến đổi cấu trúc: 'It was difficult for sb to-V' ➔ 'S + had difficulty (in) + V-ing'. Phương án D hoàn toàn chính xác."
    },
    {
        "content": "We are very excited about visiting the ASEAN cultural park next weekend.\nWhich sentence has the same meaning?",
        "options": [
            {"id": "A", "text": "We look forward to visiting the ASEAN cultural park next weekend."},
            {"id": "B", "text": "We refuse to visit the ASEAN cultural park next weekend."},
            {"id": "C", "text": "We avoid visiting the ASEAN cultural park next weekend."},
            {"id": "D", "text": "We regret visiting the ASEAN cultural park next weekend."}
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: 'be excited about V-ing' (háo hức làm gì) đồng nghĩa với 'look forward to + V-ing'. Phương án A là đáp án đúng!"
    },
    {
        "content": "\"Why don't we invite our foreign friends to the school music festival?\" said Lan.\nWhich sentence has the same meaning?",
        "options": [
            {"id": "A", "text": "Lan refused to invite foreign friends to the school music festival."},
            {"id": "B", "text": "Lan suggested inviting our foreign friends to the school music festival."},
            {"id": "C", "text": "Lan warned us against inviting foreign friends to the school music festival."},
            {"id": "D", "text": "Lan forgot to invite foreign friends to the school music festival."}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: 'Why don't we + V' ➔ 'suggest + V-ing'. Phương án B là câu trả lời đúng!"
    },
    {
        "content": "It is not a good idea to stay up late before an important exam.\nWhich sentence has the same meaning?",
        "options": [
            {"id": "A", "text": "You should keep staying up late before an important exam."},
            {"id": "B", "text": "There is no point in avoiding staying up late before an important exam."},
            {"id": "C", "text": "You should avoid staying up late before an important exam."},
            {"id": "D", "text": "It is worth staying up late before an important exam."}
        ],
        "correctAnswer": "C",
        "explanation": "Thầy Thức hướng dẫn Thái: 'It is not a good idea to-V' (không nên làm gì) ➔ 'You should avoid + V-ing' (bạn nên tránh thức khuya). Phương án C là đáp án chính xác."
    }
]

if __name__ == "__main__":
    outputPath = os.path.join(os.path.dirname(__file__), "payload_thai_1211_80q.json")
    with open(outputPath, "w", encoding="utf-8") as f:
        json.dump(questions, f, ensure_ascii=False, indent=2)
    print(f"Generated {len(questions)} questions into {outputPath}")
