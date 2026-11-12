#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generator script for Student Thái (Grade 11) - Date: 12/11/2026.
Total: 80 Questions on Unit 4 Grammar: Gerunds as Subjects & Objects
Combined with the 24 Core Vocabulary from 10/11/2026 and simple, accessible context.

Sections:
1. Questions 1 - 15: Gerunds as Subjects & Complements (Singular verb agreement, Not + V-ing)
2. Questions 16 - 30: Gerunds after Prepositions (in, on, at, for, of, by, without, before, after)
3. Questions 31 - 45: Crucial "TO + V-ing" Prepositional Phrases (contribute to, look forward to, be used to, object to...)
4. Questions 46 - 60: Verbs followed by Gerunds & Fixed Idiomatic Expressions (enjoy, avoid, suggest, it's no use, there's no point in...)
5. Questions 61 - 70: 6 Meaning-Shift Verbs (Remember, Forget, Regret, Stop, Try, Need) & Passive Gerunds
6. Questions 71 - 80: Sentence Transformations & Perfect Gerunds (Having + V3/ed)
"""

import json
import os

questions = [
    # =========================================================================
    # PHẦN 1: DANH ĐỘNG TỪ LÀM CHỦ NGỮ & BỔ NGỮ (CÂU 1 - 15)
    # Quy tắc: V-ing (+ O / Adv) + V(số ít). Phủ định: Not + V-ing.
    # =========================================================================
    {
        "content": "__________ economic cooperation among member countries is the main goal of ASEAN.",
        "options": [
            {"id": "A", "text": "Promote"},
            {"id": "B", "text": "Promoting"},
            {"id": "C", "text": "Promoted"},
            {"id": "D", "text": "To promoting"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Vị trí đầu câu đứng trước động từ chính 'is' cần một Danh động từ (V-ing) đóng vai trò làm Chủ ngữ trong câu. Cấu trúc: V-ing + V(số ít). Ta chọn 'Promoting' (Việc thúc đẩy). Từ vựng 10/11: 'cooperation' (sự hợp tác), 'promote' (thúc đẩy)."
    },
    {
        "content": "Maintaining peace and stability in Southeast Asia __________ a top priority for all member states.",
        "options": [
            {"id": "A", "text": "is"},
            {"id": "B", "text": "are"},
            {"id": "C", "text": "were"},
            {"id": "D", "text": "be"}
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: Bẫy thi kinh điển! Chủ ngữ của câu là Danh động từ 'Maintaining' (Việc duy trì). Quy tắc vàng: Danh động từ làm chủ ngữ thì động từ chính LUÔN chia ở số ít (is/was/has/Vs-es), bất kể các danh từ theo sau có là gì. Ta chọn 'is'. Từ vựng 10/11: 'maintain' (duy trì), 'stability' (sự ổn định)."
    },
    {
        "content": "Strengthening bilateral relations between nations __________ time and continuous efforts.",
        "options": [
            {"id": "A", "text": "require"},
            {"id": "B", "text": "requires"},
            {"id": "C", "text": "requiring"},
            {"id": "D", "text": "have required"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Chủ ngữ là 'Strengthening' (Danh động từ V-ing), nên động từ ở thì Hiện tại đơn phải thêm 's' (chia số ít) ➔ 'requires'. Dù 'bilateral relations' ở số nhiều nhưng không làm thay đổi động từ chính. Từ vựng 10/11: 'strengthen' (củng cố, tăng cường)."
    },
    {
        "content": "__________ the principles of the ASEAN Charter can lead to serious diplomatic problems.",
        "options": [
            {"id": "A", "text": "Not respecting"},
            {"id": "B", "text": "No respecting"},
            {"id": "C", "text": "Don't respect"},
            {"id": "D", "text": "Not respect"}
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: Dạng phủ định của Danh động từ là 'NOT + V-ing' (tuyệt đối không mượn trợ động từ don't/doesn't khi làm chủ ngữ). Do đó, 'Not respecting' (Việc không tôn trọng...) là đáp án chính xác. Từ vựng 10/11: 'charter' (hiến chương)."
    },
    {
        "content": "Our main task this year is __________ cultural diversity among high school students in the region.",
        "options": [
            {"id": "A", "text": "celebrate"},
            {"id": "B", "text": "celebrating"},
            {"id": "C", "text": "celebrated"},
            {"id": "D", "text": "celebration"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Sau động từ to-be 'is', ta dùng Danh động từ (V-ing) đóng vai trò làm Bổ ngữ cho chủ ngữ (Subject Complement) để diễn giải cụ thể nhiệm vụ chính là việc gì: 'celebrating' (việc tôn vinh/tổ chức). Từ vựng 10/11: 'diversity' (sự đa dạng)."
    },
    {
        "content": "__________ young volunteers to join community projects helps build future leaders.",
        "options": [
            {"id": "A", "text": "Encouraging"},
            {"id": "B", "text": "Encourage"},
            {"id": "C", "text": "Encouraged"},
            {"id": "D", "text": "To encouraging"}
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: Đầu câu cần một Danh động từ (V-ing) làm chủ ngữ cho động từ 'helps': 'Encouraging' (Việc khuyến khích...). Từ vựng 10/11: 'volunteer' (tình nguyện viên), 'leadership/leader' (lãnh đạo)."
    },
    {
        "content": "Showing solidarity with flood victims __________ the true spirit of the ASEAN community.",
        "options": [
            {"id": "A", "text": "reflect"},
            {"id": "B", "text": "reflects"},
            {"id": "C", "text": "reflecting"},
            {"id": "D", "text": "are reflecting"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Chủ ngữ là 'Showing solidarity...' (V-ing làm chủ ngữ) ➔ Động từ chính chia số ít ở thì hiện tại đơn: 'reflects' (phản ánh). Dù danh từ đứng trước là 'victims' số nhiều nhưng chủ ngữ thực sự là hành động 'Showing'. Từ vựng 10/11: 'solidarity' (tình đoàn kết)."
    },
    {
        "content": "__________ national cultural identity is vital when countries integrate into the world economy.",
        "options": [
            {"id": "A", "text": "Preserve"},
            {"id": "B", "text": "Preserving"},
            {"id": "C", "text": "Preserved"},
            {"id": "D", "text": "Preserver"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Vị trí chủ ngữ đứng trước động từ 'is' cần một Danh động từ (V-ing): 'Preserving' (Việc gìn giữ, bảo tồn). Từ vựng 10/11: 'identity' (bản sắc), 'integration/integrate' (hội nhập)."
    },
    {
        "content": "Participating in regional youth camps __________ students improve their foreign language skills.",
        "options": [
            {"id": "A", "text": "help"},
            {"id": "B", "text": "helps"},
            {"id": "C", "text": "helping"},
            {"id": "D", "text": "are helping"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: 'Participating in...' (Việc tham gia vào...) là Danh động từ làm chủ ngữ, do đó động từ chính phải chia ngôi thứ 3 số ít: 'helps'. Từ vựng 10/11: 'participant/participate' (người tham gia / tham gia)."
    },
    {
        "content": "__________ an official representative of the school at the summit was a great honour for Nam.",
        "options": [
            {"id": "A", "text": "Be"},
            {"id": "B", "text": "Being"},
            {"id": "C", "text": "Been"},
            {"id": "D", "text": "To being"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Danh động từ của động từ 'to be' là 'Being', đóng vai trò chủ ngữ: 'Being an official representative...' (Việc là người đại diện chính thức...). Từ vựng 10/11: 'representative' (người đại diện)."
    },
    {
        "content": "__________ in community activities brings happiness to many young volunteers.",
        "options": [
            {"id": "A", "text": "Being involved"},
            {"id": "B", "text": "Be involved"},
            {"id": "C", "text": "To being involved"},
            {"id": "D", "text": "Involved"}
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: Cụm 'be involved in' (tham gia vào) khi chuyển thành chủ ngữ ở dạng Danh động từ sẽ là 'Being involved in...'. Động từ chính là 'brings' (số ít). Từ vựng 10/11: 'involved in' (tham gia vào), 'volunteer' (tình nguyện viên)."
    },
    {
        "content": "Building a peaceful and prosperous community __________ strong teamwork among all members.",
        "options": [
            {"id": "A", "text": "need"},
            {"id": "B", "text": "needs"},
            {"id": "C", "text": "needing"},
            {"id": "D", "text": "are needing"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: 'Building a peaceful and prosperous community' là cụm V-ing làm chủ ngữ ➔ Động từ chia số ít 'needs'. Từ vựng 10/11: 'prosperous' (thịnh vượng, phồn vinh)."
    },
    {
        "content": "__________ an ASEAN scholarship gave Minh the chance to study at a top university.",
        "options": [
            {"id": "A", "text": "Winning"},
            {"id": "B", "text": "Win"},
            {"id": "C", "text": "Won"},
            {"id": "D", "text": "To winning"}
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: Vị trí chủ ngữ đứng đầu câu trước động từ 'gave' cần Danh động từ: 'Winning' (Việc giành được/đạt được...). Từ vựng 10/11: 'scholarship' (học bổng)."
    },
    {
        "content": "__________ enough information before visiting a new country causes many cultural misunderstandings.",
        "options": [
            {"id": "A", "text": "Not having"},
            {"id": "B", "text": "No having"},
            {"id": "C", "text": "Not to have"},
            {"id": "D", "text": "Don't have"}
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: Phủ định của Danh động từ là 'Not + V-ing'. 'Not having enough information...' (Việc không có đủ thông tin...). Động từ chính là 'causes' (số ít). Từ vựng 10/11: 'cultural exchange/diversity'."
    },
    {
        "content": "One of the most effective ways to understand your neighbours is __________ in cultural exchanges.",
        "options": [
            {"id": "A", "text": "take part"},
            {"id": "B", "text": "taking part"},
            {"id": "C", "text": "took part"},
            {"id": "D", "text": "taken part"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Sau 'is' dùng Danh động từ (V-ing) làm bổ ngữ cho chủ ngữ: 'taking part' (việc tham gia). Cụm 'take part in = participate in'. Từ vựng 10/11: 'cultural exchange' (giao lưu văn hóa)."
    },

    # =========================================================================
    # PHẦN 2: DANH ĐỘNG TỪ SAU GIỚI TỪ ĐƠN & CỤM GIỚI TỪ (CÂU 16 - 30)
    # Quy tắc: Preposition (in, on, at, for, of, by, without, before, after) + V-ing
    # =========================================================================
    {
        "content": "Viet Nam succeeded in __________ regional integration into the ASEAN economic bloc.",
        "options": [
            {"id": "A", "text": "achieve"},
            {"id": "B", "text": "achieving"},
            {"id": "C", "text": "achieved"},
            {"id": "D", "text": "achievement"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Cấu trúc cố định: 'succeed in + V-ing' (thành công trong việc gì). Đứng sau giới từ 'in' bắt buộc là V-ing ➔ 'achieving'. Từ vựng 10/11: 'integration' (sự hội nhập), 'bloc' (khối liên minh)."
    },
    {
        "content": "Countries can solve territorial disagreements by __________ peaceful dialogues.",
        "options": [
            {"id": "A", "text": "hold"},
            {"id": "B", "text": "holding"},
            {"id": "C", "text": "held"},
            {"id": "D", "text": "holder"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Sau giới từ 'by' (bằng cách làm gì), động từ chia ở dạng V-ing ➔ 'by holding' (bằng cách tổ chức/tiến hành). Từ vựng 10/11: 'cooperation', 'stability'."
    },
    {
        "content": "You should read the ASEAN Charter carefully before __________ the official agreement.",
        "options": [
            {"id": "A", "text": "sign"},
            {"id": "B", "text": "signing"},
            {"id": "C", "text": "signed"},
            {"id": "D", "text": "signature"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Sau giới từ thời gian 'before' (trước khi) và 'after' (sau khi), động từ phải ở dạng V-ing ➔ 'before signing' (trước khi ký). Từ vựng 10/11: 'charter' (hiến chương)."
    },
    {
        "content": "The school congratulated Thai on __________ the prestigious ASEAN youth scholarship.",
        "options": [
            {"id": "A", "text": "win"},
            {"id": "B", "text": "winning"},
            {"id": "C", "text": "won"},
            {"id": "D", "text": "winner"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Cấu trúc khen ngợi: 'congratulate sb on + V-ing' (chúc mừng ai vì đã đạt được việc gì). Sau giới từ 'on' là V-ing ➔ 'winning'. Từ vựng 10/11: 'scholarship' (học bổng)."
    },
    {
        "content": "She thanked her teachers for __________ her to develop confident leadership skills.",
        "options": [
            {"id": "A", "text": "help"},
            {"id": "B", "text": "helping"},
            {"id": "C", "text": "helped"},
            {"id": "D", "text": "helpful"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Cấu trúc cảm ơn: 'thank sb for + V-ing' (cảm ơn ai vì đã giúp đỡ). Sau giới từ 'for' là V-ing ➔ 'helping'. Từ vựng 10/11: 'leadership' (năng lực lãnh đạo)."
    },
    {
        "content": "No decision can be made in ASEAN without __________ a complete consensus.",
        "options": [
            {"id": "A", "text": "reach"},
            {"id": "B", "text": "reaching"},
            {"id": "C", "text": "reached"},
            {"id": "D", "text": "to reach"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Sau giới từ 'without' (mà không có/không làm gì), động từ phải chia V-ing ➔ 'without reaching' (mà không đạt được). Từ vựng 10/11: 'charter', 'cooperation'."
    },
    {
        "content": "The ambassador apologized for __________ late to the regional youth association meeting.",
        "options": [
            {"id": "A", "text": "arrive"},
            {"id": "B", "text": "arriving"},
            {"id": "C", "text": "arrived"},
            {"id": "D", "text": "arrival"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Cấu trúc xin lỗi: 'apologize for + V-ing' (xin lỗi vì đã làm gì). Sau giới từ 'for' là V-ing ➔ 'arriving'. Từ vựng 10/11: 'association' (hiệp hội)."
    },
    {
        "content": "Volunteers are proud of __________ part in community projects to support poor children.",
        "options": [
            {"id": "A", "text": "take"},
            {"id": "B", "text": "taking"},
            {"id": "C", "text": "took"},
            {"id": "D", "text": "taken"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Cấu trúc tự hào: 'be proud of + V-ing' (tự hào vì làm gì). Sau giới từ 'of' là V-ing ➔ 'taking'. Từ vựng 10/11: 'volunteer' (tình nguyện viên)."
    },
    {
        "content": "Member countries are responsible for __________ peace and political stability within their borders.",
        "options": [
            {"id": "A", "text": "maintain"},
            {"id": "B", "text": "maintaining"},
            {"id": "C", "text": "maintained"},
            {"id": "D", "text": "maintenance"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Cấu trúc chịu trách nhiệm: 'be responsible for + V-ing' (chịu trách nhiệm về việc gì). Sau 'for' ta chọn V-ing ➔ 'maintaining'. Từ vựng 10/11: 'maintain' (duy trì), 'stability' (sự ổn định)."
    },
    {
        "content": "Thai is very keen on __________ more about the cultural diversity of ASEAN countries.",
        "options": [
            {"id": "A", "text": "learn"},
            {"id": "B", "text": "learning"},
            {"id": "C", "text": "learnt"},
            {"id": "D", "text": "to learn"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Cụm từ chỉ sở thích: 'be keen on + V-ing' = 'be fond of / interested in + V-ing' (say mê, thích làm gì). Sau giới từ 'on' là V-ing ➔ 'learning'. Từ vựng 10/11: 'diversity' (sự đa dạng)."
    },
    {
        "content": "Good leaders always prevent conflicts from __________ into dangerous political disputes.",
        "options": [
            {"id": "A", "text": "turn"},
            {"id": "B", "text": "turning"},
            {"id": "C", "text": "turned"},
            {"id": "D", "text": "to turn"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Cấu trúc ngăn cản: 'prevent sb/sth from + V-ing' (ngăn chặn ai/cái gì biến thành...). Sau giới từ 'from' chia V-ing ➔ 'turning'. Từ vựng 10/11: 'leadership', 'stability'."
    },
    {
        "content": "Instead of __________ about cultural differences, we should celebrate our unique identity.",
        "options": [
            {"id": "A", "text": "worry"},
            {"id": "B", "text": "worrying"},
            {"id": "C", "text": "worried"},
            {"id": "D", "text": "to worry"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Cụm giới từ 'instead of + V-ing' (thay vì làm gì). Sau 'instead of' chọn V-ing ➔ 'worrying'. Từ vựng 10/11: 'identity' (bản sắc)."
    },
    {
        "content": "After __________ the speech, the youth representative answered questions from the audience.",
        "options": [
            {"id": "A", "text": "finish"},
            {"id": "B", "text": "finishing"},
            {"id": "C", "text": "finished"},
            {"id": "D", "text": "to finish"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Sau giới từ thời gian 'After' (sau khi), động từ chia ở dạng V-ing ➔ 'After finishing' (Sau khi hoàn thành). Từ vựng 10/11: 'representative' (người đại diện)."
    },
    {
        "content": "All participants were capable of __________ clear solutions during the group discussion.",
        "options": [
            {"id": "A", "text": "propose"},
            {"id": "B", "text": "proposing"},
            {"id": "C", "text": "proposed"},
            {"id": "D", "text": "proposal"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Cấu trúc có khả năng làm gì: 'be capable of + V-ing'. Sau giới từ 'of' ta dùng V-ing ➔ 'proposing' (đề xuất). Từ vựng 10/11: 'participant' (người tham gia)."
    },
    {
        "content": "Young people can make a huge contribution by __________ in local charity events.",
        "options": [
            {"id": "A", "text": "help"},
            {"id": "B", "text": "helping"},
            {"id": "C", "text": "helped"},
            {"id": "D", "text": "helper"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Sau giới từ phương tiện 'by' (bằng cách làm gì) là V-ing ➔ 'helping'. Từ vựng 10/11: 'contribution' (sự đóng góp, cống hiến)."
    },

    # =========================================================================
    # PHẦN 3: BẪY ĐIỂM 8.5+: CÁC CỤM TỪ CÓ GIỚI TỪ "TO" ĐI VỚI V-ING (CÂU 31 - 45)
    # Trọng tâm: contribute to, look forward to, be used to, object to, with a view to...
    # =========================================================================
    {
        "content": "Every member nation should contribute to __________ regional solidarity and peace.",
        "options": [
            {"id": "A", "text": "strengthen"},
            {"id": "B", "text": "strengthening"},
            {"id": "C", "text": "strengthened"},
            {"id": "D", "text": "strength"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: BẪY THI CỰC KỲ QUAN TRỌNG! Trong cấu trúc 'contribute to', chữ 'to' là GIỚI TỪ (preposition), không phải to-V nguyên mẫu. Do đó, sau 'contribute to' bắt buộc phải dùng V-ing ➔ 'strengthening' (đóng góp vào việc củng cố). Từ vựng 10/11: 'contribution/contribute', 'solidarity', 'strengthen'."
    },
    {
        "content": "All student participants look forward to __________ the ASEAN cultural exchange next month.",
        "options": [
            {"id": "A", "text": "attend"},
            {"id": "B", "text": "attending"},
            {"id": "C", "text": "attended"},
            {"id": "D", "text": "attendance"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Cụm từ kinh điển trong mọi đề thi: 'look forward to + V-ing' (rất trông mong, háo hức làm việc gì). Chữ 'to' ở đây là giới từ ➔ 'attending'. Từ vựng 10/11: 'participant' (người tham gia), 'cultural exchange' (giao lưu văn hóa)."
    },
    {
        "content": "The delegates are used to __________ in multicultural teams with people from different backgrounds.",
        "options": [
            {"id": "A", "text": "work"},
            {"id": "B", "text": "working"},
            {"id": "C", "text": "worked"},
            {"id": "D", "text": "worker"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Phân biệt cẩn thận: 'used to + V-bare' (đã từng làm gì trong quá khứ) KHÁC với 'be / get used to + V-ing' (quen với việc làm gì ở hiện tại). Ở đây có to-be 'are used to' ➔ đi với V-ing 'working'. Từ vựng 10/11: 'diversity', 'cooperation'."
    },
    {
        "content": "Several countries objected to __________ the deadline for signing the free trade agreement.",
        "options": [
            {"id": "A", "text": "delay"},
            {"id": "B", "text": "delaying"},
            {"id": "C", "text": "delayed"},
            {"id": "D", "text": "to delay"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Cấu trúc phản đối: 'object to + V-ing' (phản đối việc làm gì). Chữ 'to' là giới từ ➔ 'delaying'. Không chọn A vì nhầm 'to' là to-infinitive. Từ vựng 10/11: 'bloc', 'agreement'."
    },
    {
        "content": "Member countries are fully committed to __________ the shared values in the ASEAN Charter.",
        "options": [
            {"id": "A", "text": "uphold"},
            {"id": "B", "text": "upholding"},
            {"id": "C", "text": "upheld"},
            {"id": "D", "text": "to uphold"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Cấu trúc cam kết: 'be committed to + V-ing' (cam kết làm việc gì). Chữ 'to' là giới từ ➔ 'upholding' (giữ gìn, ủng hộ). Từ vựng 10/11: 'charter' (hiến chương)."
    },
    {
        "content": "The summit was organized with a view to __________ economic partnerships across the region.",
        "options": [
            {"id": "A", "text": "promote"},
            {"id": "B", "text": "promoting"},
            {"id": "C", "text": "promoted"},
            {"id": "D", "text": "promoter"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Cụm từ chỉ mục đích nâng cao: 'with a view to + V-ing' = 'with the aim of + V-ing' (với mục đích nhằm làm gì). Chữ 'to' là giới từ ➔ 'promoting'. Từ vựng 10/11: 'promote' (thúc đẩy, xúc tiến)."
    },
    {
        "content": "In addition to __________ financial support, the scholarship provides free accommodation.",
        "options": [
            {"id": "A", "text": "offer"},
            {"id": "B", "text": "offering"},
            {"id": "C", "text": "offered"},
            {"id": "D", "text": "to offer"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Cụm liên từ: 'in addition to + V-ing / Noun' (bên cạnh việc làm gì). Chữ 'to' là giới từ ➔ 'offering'. Từ vựng 10/11: 'scholarship' (học bổng)."
    },
    {
        "content": "Young volunteers devote their free time to __________ underprivileged families in rural areas.",
        "options": [
            {"id": "A", "text": "support"},
            {"id": "B", "text": "supporting"},
            {"id": "C", "text": "supported"},
            {"id": "D", "text": "supporter"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Cấu trúc cống hiến: 'devote / dedicate [time/money] to + V-ing' (dành/cống hiến thời gian vào việc gì). 'To' là giới từ ➔ 'supporting'. Từ vựng 10/11: 'volunteer' (tình nguyện viên)."
    },
    {
        "content": "Prior to __________ the regional association in 1995, Viet Nam had expanded trade with neighbouring nations.",
        "options": [
            {"id": "A", "text": "join"},
            {"id": "B", "text": "joining"},
            {"id": "C", "text": "joined"},
            {"id": "D", "text": "joint"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Cụm từ chỉ thời gian: 'prior to + V-ing' = 'before + V-ing' (trước khi làm gì). Chữ 'to' ở đây là giới từ ➔ 'joining'. Từ vựng 10/11: 'association' (hiệp hội)."
    },
    {
        "content": "The school principal confessed to __________ mistake in calculating the scholarship scores.",
        "options": [
            {"id": "A", "text": "make"},
            {"id": "B", "text": "making"},
            {"id": "C", "text": "made"},
            {"id": "D", "text": "maker"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Cấu trúc thú nhận: 'confess to / admit to + V-ing' (thú nhận đã làm gì). Chữ 'to' là giới từ ➔ 'making'. Từ vựng 10/11: 'scholarship' (học bổng)."
    },
    {
        "content": "What leads to __________ good relationships among countries is mutual respect and cooperation.",
        "options": [
            {"id": "A", "text": "build"},
            {"id": "B", "text": "building"},
            {"id": "C", "text": "built"},
            {"id": "D", "text": "builder"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Cụm từ: 'lead to + V-ing / Noun' (dẫn đến kết quả là). Chữ 'to' là giới từ ➔ 'building'. Từ vựng 10/11: 'cooperation' (sự hợp tác)."
    },
    {
        "content": "Delegates have a strong objection to __________ commercial taxes on agricultural products.",
        "options": [
            {"id": "A", "text": "raise"},
            {"id": "B", "text": "raising"},
            {"id": "C", "text": "raised"},
            {"id": "D", "text": "to raise"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Cụm danh từ: 'have an objection to + V-ing' (có sự phản đối đối với việc gì). Chữ 'to' là giới từ ➔ 'raising'. Từ vựng 10/11: 'representative/delegate', 'bloc'."
    },
    {
        "content": "She soon got used to __________ speeches in front of large international audiences.",
        "options": [
            {"id": "A", "text": "give"},
            {"id": "B", "text": "giving"},
            {"id": "C", "text": "gave"},
            {"id": "D", "text": "given"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: 'get used to + V-ing' (dần trở nên quen với việc gì). Sau 'get used to' bắt buộc là V-ing ➔ 'giving'. Từ vựng 10/11: 'leadership', 'representative'."
    },
    {
        "content": "All members agreed that nothing should be an obstacle to __________ economic prosperity.",
        "options": [
            {"id": "A", "text": "achieve"},
            {"id": "B", "text": "achieving"},
            {"id": "C", "text": "achieved"},
            {"id": "D", "text": "achievement"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Cụm: 'an obstacle to + V-ing / Noun' (trở ngại đối với việc gì). 'To' là giới từ ➔ 'achieving'. Từ vựng 10/11: 'prosperity' (sự thịnh vượng, phồn vinh)."
    },
    {
        "content": "Viet Nam always pays special attention to __________ traditional friendship with its neighbours.",
        "options": [
            {"id": "A", "text": "maintain"},
            {"id": "B", "text": "maintaining"},
            {"id": "C", "text": "maintained"},
            {"id": "D", "text": "maintenance"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Cụm: 'pay attention to + V-ing / Noun' (chú ý / dành sự quan tâm tới việc gì). Chữ 'to' là giới từ ➔ 'maintaining'. Từ vựng 10/11: 'maintain' (duy trì, gìn giữ)."
    },

    # =========================================================================
    # PHẦN 4: ĐỘNG TỪ BẮT BUỘC ĐI VỚI V-ING & THÀNH NGỮ CỐ ĐỊNH (CÂU 46 - 60)
    # Trọng tâm: enjoy, avoid, delay, suggest, it's no use, there's no point in...
    # =========================================================================
    {
        "content": "Young ambassadors enjoy __________ in cultural exchanges with foreign students.",
        "options": [
            {"id": "A", "text": "participate"},
            {"id": "B", "text": "participating"},
            {"id": "C", "text": "participated"},
            {"id": "D", "text": "to participate"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Động từ chỉ sở thích 'enjoy' luôn đi trực tiếp với Danh động từ (V-ing) ➔ 'enjoy participating'. Không bao giờ dùng 'enjoy to-V'. Từ vựng 10/11: 'participant/participate' (người tham gia / tham gia), 'cultural exchange' (giao lưu văn hóa)."
    },
    {
        "content": "Leaders must avoid __________ misunderstandings that can damage regional solidarity.",
        "options": [
            {"id": "A", "text": "create"},
            {"id": "B", "text": "creating"},
            {"id": "C", "text": "created"},
            {"id": "D", "text": "to create"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Động từ 'avoid' (tránh) bắt buộc đi kèm Danh động từ: 'avoid + V-ing' ➔ 'avoid creating'. Từ vựng 10/11: 'solidarity' (tình đoàn kết)."
    },
    {
        "content": "The teacher suggested __________ a class presentation about the official ASEAN motto.",
        "options": [
            {"id": "A", "text": "make"},
            {"id": "B", "text": "making"},
            {"id": "C", "text": "made"},
            {"id": "D", "text": "to make"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Động từ đề xuất 'suggest' khi không có tân ngữ chỉ người thì đi trực tiếp với V-ing: 'suggest + V-ing' ➔ 'making'. Từ vựng 10/11: 'motto' (khẩu hiệu, phương châm)."
    },
    {
        "content": "They decided to postpone __________ the new educational charter until next month.",
        "options": [
            {"id": "A", "text": "sign"},
            {"id": "B", "text": "signing"},
            {"id": "C", "text": "signed"},
            {"id": "D", "text": "to sign"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Động từ 'postpone' (trì hoãn, hoãn lại) luôn đi với V-ing: 'postpone + V-ing' ➔ 'signing'. Từ vựng 10/11: 'charter' (hiến chương)."
    },
    {
        "content": "It is no use __________ about minor issues when we have bigger goals to achieve.",
        "options": [
            {"id": "A", "text": "argue"},
            {"id": "B", "text": "arguing"},
            {"id": "C", "text": "argued"},
            {"id": "D", "text": "to argue"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Cấu trúc thành ngữ bất hủ: 'It is no use / It is no good + V-ing' (Vô ích khi làm gì). Ta chọn V-ing ➔ 'arguing'. Từ vựng 10/11: 'cooperation', 'stability'."
    },
    {
        "content": "There is no point in __________ a new treaty if countries do not respect the agreement.",
        "options": [
            {"id": "A", "text": "sign"},
            {"id": "B", "text": "signing"},
            {"id": "C", "text": "signed"},
            {"id": "D", "text": "to sign"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Cấu trúc thành ngữ: 'There is no point in + V-ing' (Chẳng có lý do/ích lợi gì khi làm việc gì). Sau 'point in' là V-ing ➔ 'signing'. Từ vựng 10/11: 'charter', 'cooperation'."
    },
    {
        "content": "I couldn't help __________ proud when our school team won the ASEAN youth contest.",
        "options": [
            {"id": "A", "text": "feel"},
            {"id": "B", "text": "feeling"},
            {"id": "C", "text": "felt"},
            {"id": "D", "text": "to feel"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Thành ngữ: 'can't help / couldn't help + V-ing' (không thể nhịn được / không thể kìm nén được cảm xúc làm gì). Ta chọn 'feeling'. Từ vựng 10/11: 'scholarship', 'solidarity'."
    },
    {
        "content": "The official ASEAN Charter is well worth __________ for any student of history.",
        "options": [
            {"id": "A", "text": "read"},
            {"id": "B", "text": "reading"},
            {"id": "C", "text": "readed"},
            {"id": "D", "text": "to read"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Cấu trúc đáng giá: 'be worth + V-ing' (đáng để làm việc gì). Ta dùng V-ing ➔ 'reading'. Từ vựng 10/11: 'charter' (hiến chương)."
    },
    {
        "content": "Thai spent two hours __________ about the economic stability of Southeast Asian countries.",
        "options": [
            {"id": "A", "text": "read"},
            {"id": "B", "text": "reading"},
            {"id": "C", "text": "readed"},
            {"id": "D", "text": "to read"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Cấu trúc thời gian: 'spend + [thời gian] + (on) + V-ing' (dành thời gian làm gì). Do đó ta chọn 'reading'. Từ vựng 10/11: 'stability' (sự ổn định)."
    },
    {
        "content": "Foreign participants had a lot of difficulty in __________ local transportation.",
        "options": [
            {"id": "A", "text": "use"},
            {"id": "B", "text": "using"},
            {"id": "C", "text": "used"},
            {"id": "D", "text": "to use"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Cấu trúc gặp khó khăn: 'have difficulty / trouble (in) + V-ing'. Sau 'difficulty in' luôn là V-ing ➔ 'using'. Từ vựng 10/11: 'participant' (người tham gia)."
    },
    {
        "content": "Would you mind __________ us understand the meaning of the ASEAN logo?",
        "options": [
            {"id": "A", "text": "help"},
            {"id": "B", "text": "helping"},
            {"id": "C", "text": "helped"},
            {"id": "D", "text": "to help"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Lời yêu cầu lịch sự: 'Would you mind + V-ing?' (Bạn có phiền/làm ơn làm gì...). Sau 'mind' bắt buộc là V-ing ➔ 'helping'. Từ vựng 10/11: 'identity', 'motto'."
    },
    {
        "content": "Students should practise __________ English daily to prepare for international exchanges.",
        "options": [
            {"id": "A", "text": "speak"},
            {"id": "B", "text": "speaking"},
            {"id": "C", "text": "spoke"},
            {"id": "D", "text": "to speak"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Động từ luyện tập: 'practise + V-ing' ➔ 'speaking'. Không dùng 'practise to-V'. Từ vựng 10/11: 'cultural exchange' (giao lưu văn hóa)."
    },
    {
        "content": "He admitted __________ the ASEAN scholarship application form after the deadline.",
        "options": [
            {"id": "A", "text": "send"},
            {"id": "B", "text": "sending"},
            {"id": "C", "text": "sent"},
            {"id": "D", "text": "to send"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Động từ thừa nhận: 'admit + V-ing' (thừa nhận đã làm gì). Ta chọn 'sending'. Từ vựng 10/11: 'scholarship' (học bổng)."
    },
    {
        "content": "Volunteers were busy __________ food packs for disaster relief missions.",
        "options": [
            {"id": "A", "text": "prepare"},
            {"id": "B", "text": "preparing"},
            {"id": "C", "text": "prepared"},
            {"id": "D", "text": "to prepare"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Cấu trúc bận rộn: 'be busy + V-ing' (bận rộn làm việc gì). Ta dùng V-ing ➔ 'preparing'. Từ vựng 10/11: 'volunteer' (tình nguyện viên), 'solidarity'."
    },
    {
        "content": "Don't waste valuable time __________ online when you need to finish your project.",
        "options": [
            {"id": "A", "text": "chat"},
            {"id": "B", "text": "chatting"},
            {"id": "C", "text": "chatted"},
            {"id": "D", "text": "to chat"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Cấu trúc lãng phí thời gian: 'waste time + (on) + V-ing' ➔ 'chatting'. Từ vựng 10/11: 'cooperation'."
    },

    # =========================================================================
    # PHẦN 5: 6 ĐỘNG TỪ CHUYỂN NGHĨA (Remember, Forget, Regret, Stop, Try, Need) (CÂU 61 - 70)
    # =========================================================================
    {
        "content": "Please remember __________ your name badge before entering the conference hall.",
        "options": [
            {"id": "A", "text": "wear"},
            {"id": "B", "text": "to wear"},
            {"id": "C", "text": "wearing"},
            {"id": "D", "text": "wore"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: 'Remember + to-V' là nhớ PHẢI LÀM việc gì (nhiệm vụ trong tương lai). 'Please remember...' là lời dặn dò bổn phận phải đeo thẻ tên ➔ chọn 'to wear'. (Khác với 'remember + V-ing' là nhớ việc đã làm trong quá khứ). Từ vựng 10/11: 'participant', 'representative'."
    },
    {
        "content": "I clearly remember __________ the Indonesian delegate at the youth forum in Ha Noi last year.",
        "options": [
            {"id": "A", "text": "meet"},
            {"id": "B", "text": "meeting"},
            {"id": "C", "text": "to meet"},
            {"id": "D", "text": "met"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Có trạng từ quá khứ 'last year' (năm ngoái), người nói nhớ lại một ký ức/hành động ĐÃ LÀM trong quá khứ ➔ 'remember + V-ing' ➔ 'meeting'. Từ vựng 10/11: 'representative/delegate'."
    },
    {
        "content": "Don't forget __________ your homework about the ASEAN Charter before tomorrow morning.",
        "options": [
            {"id": "A", "text": "finish"},
            {"id": "B", "text": "to finish"},
            {"id": "C", "text": "finishing"},
            {"id": "D", "text": "finished"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: 'Don't forget + to-V' là nhắc nhở ai ĐỪNG QUÊN PHẢI LÀM việc gì (bổn phận tương lai). Ta chọn 'to finish'. Từ vựng 10/11: 'charter' (hiến chương)."
    },
    {
        "content": "He will never forget __________ the first prize in the national ASEAN English competition.",
        "options": [
            {"id": "A", "text": "receive"},
            {"id": "B", "text": "receiving"},
            {"id": "C", "text": "to receive"},
            {"id": "D", "text": "received"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: 'will never forget + V-ing' là cụm từ kinh điển diễn tả sẽ không bao giờ quên một kỷ niệm/sự việc ĐÃ TRẢI QUA ➔ chọn 'receiving'. Từ vựng 10/11: 'scholarship', 'solidarity'."
    },
    {
        "content": "We regret __________ you that your application for the volunteer camp was not accepted.",
        "options": [
            {"id": "A", "text": "inform"},
            {"id": "B", "text": "to inform"},
            {"id": "C", "text": "informing"},
            {"id": "D", "text": "informed"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: 'Regret + to-V' dùng khi lấy làm tiếc phải thông báo tin xấu (thường đi với các động từ inform, say, tell, announce) ➔ 'regret to inform'. (Khác với 'regret + V-ing' là hối tiếc vì đã làm điều gì trong quá khứ). Từ vựng 10/11: 'volunteer' (tình nguyện viên)."
    },
    {
        "content": "She regretted __________ enough time preparing for the leadership interview.",
        "options": [
            {"id": "A", "text": "not spend"},
            {"id": "B", "text": "not spending"},
            {"id": "C", "text": "not to spend"},
            {"id": "D", "text": "didn't spend"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: 'Regret + V-ing' diễn đạt sự hối tiếc vì ĐÃ LÀM (hoặc ĐÃ KHÔNG LÀM) điều gì trong quá khứ. Dạng phủ định là 'not + V-ing' ➔ 'not spending'. Từ vựng 10/11: 'leadership' (năng lực lãnh đạo)."
    },
    {
        "content": "The delegates stopped __________ a quick lunch before continuing the afternoon discussion.",
        "options": [
            {"id": "A", "text": "have"},
            {"id": "B", "text": "to have"},
            {"id": "C", "text": "having"},
            {"id": "D", "text": "had"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: 'Stop + to-V' là dừng việc đang làm lại ĐỂ LÀM một việc khác (chỉ mục đích). Các đại biểu dừng thảo luận lại để ăn trưa ➔ chọn 'to have'. ('Stop + V-ing' là dừng hẳn, từ bỏ hành động). Từ vựng 10/11: 'representative/delegate'."
    },
    {
        "content": "Member countries stopped __________ unilateral trade barriers to promote regional prosperity.",
        "options": [
            {"id": "A", "text": "create"},
            {"id": "B", "text": "creating"},
            {"id": "C", "text": "to create"},
            {"id": "D", "text": "created"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: 'Stop + V-ing' là DỪNG HẲN, CHẤM DỨT một hành động/chính sách. Các nước chấm dứt việc tạo ra rào cản thương mại ➔ 'stopped creating'. Từ vựng 10/11: 'promote' (thúc đẩy), 'prosperity' (sự thịnh vượng)."
    },
    {
        "content": "Thai tried __________ the difficult grammar question, but he still needed his teacher's help.",
        "options": [
            {"id": "A", "text": "solve"},
            {"id": "B", "text": "to solve"},
            {"id": "C", "text": "solving"},
            {"id": "D", "text": "solved"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: 'Try + to-V' là CỐ GẮNG, nỗ lực hết mình để vượt qua khó khăn làm gì ➔ 'tried to solve'. ('Try + V-ing' là thử nghiệm một giải pháp mới). Từ vựng 10/11: 'cooperation'."
    },
    {
        "content": "The official website of the ASEAN youth association needs __________ to work faster.",
        "options": [
            {"id": "A", "text": "upgrade"},
            {"id": "B", "text": "upgrading"},
            {"id": "C", "text": "upgraded"},
            {"id": "D", "text": "to upgrading"}
        ],
        "correctAnswer": "B",
        "explanation": "Thầy Thức hướng dẫn Thái: Quy tắc bị động đặc biệt với động từ 'NEED': Khi chủ ngữ là VẬT (The official website), cấu trúc bị động là: 'S(vật) + need + V-ing' (= need to be V3/ed: cái gì cần được làm gì). Do đó ta chọn 'upgrading'. Từ vựng 10/11: 'association' (hiệp hội)."
    },

    # =========================================================================
    # PHẦN 6: VIẾT LẠI CÂU TƯƠNG ĐƯƠNG & PERFECT GERUNDS (HAVING + V3/ed) (CÂU 71 - 80)
    # =========================================================================
    {
        "content": "\"Why don't we organize a cultural exchange program for high school students?\" Nam said.\nChoose the sentence that is closest in meaning:",
        "options": [
            {"id": "A", "text": "Nam suggested organizing a cultural exchange program for high school students."},
            {"id": "B", "text": "Nam refused to organize a cultural exchange program for high school students."},
            {"id": "C", "text": "Nam promised to organize a cultural exchange program for high school students."},
            {"id": "D", "text": "Nam advised us against organizing a cultural exchange program for high school students."}
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: Cấu trúc gợi ý: 'Why don't we + V...?' được viết lại bằng: 'S + suggested + V-ing'. Phương án A là đáp án chính xác tuyệt đối. Từ vựng 10/11: 'cultural exchange' (giao lưu văn hóa)."
    },
    {
        "content": "It is completely pointless to argue about small mistakes in the past.\nChoose the sentence that is closest in meaning:",
        "options": [
            {"id": "A", "text": "There is no point in arguing about small mistakes in the past."},
            {"id": "B", "text": "We should keep arguing about small mistakes in the past."},
            {"id": "C", "text": "It is very useful to argue about small mistakes in the past."},
            {"id": "D", "text": "There is no reason against arguing about small mistakes in the past."}
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: Cấu trúc biến đổi tương đương: 'It is pointless + to-V' ➔ 'There is no point in + V-ing' (Chẳng có lý do/ích lợi gì khi làm gì). Phương án A là chính xác. Từ vựng 10/11: 'cooperation'."
    },
    {
        "content": "It took the student committee three days to complete the solidarity poster.\nChoose the sentence that is closest in meaning:",
        "options": [
            {"id": "A", "text": "The student committee spent three days completing the solidarity poster."},
            {"id": "B", "text": "The student committee wasted three days to complete the solidarity poster."},
            {"id": "C", "text": "The student committee needed three days to completing the solidarity poster."},
            {"id": "D", "text": "The student committee finished the solidarity poster after three days of wasted time."}
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: Cấu trúc biến đổi thời gian: 'It took + sb + [thời gian] + to-V' ➔ 'S + spent + [thời gian] + V-ing'. Phương án A là đáp án chuẩn xác. Từ vựng 10/11: 'solidarity' (tình đoàn kết)."
    },
    {
        "content": "\"I'm sorry I did not attend the ASEAN youth volunteer meeting,\" Nam said.\nChoose the sentence that is closest in meaning:",
        "options": [
            {"id": "A", "text": "Nam apologized for not attending the ASEAN youth volunteer meeting."},
            {"id": "B", "text": "Nam refused to attend the ASEAN youth volunteer meeting."},
            {"id": "C", "text": "Nam denied attending the ASEAN youth volunteer meeting."},
            {"id": "D", "text": "Nam admitted to attend the ASEAN youth volunteer meeting."}
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: Lời xin lỗi: 'I'm sorry I did not...' ➔ 'S + apologized for not + V-ing'. Phương án A đúng cấu trúc và nghĩa. Từ vựng 10/11: 'volunteer' (tình nguyện viên)."
    },
    {
        "content": "\"No, I didn't take confidential files from the office,\" the staff member said.\nChoose the sentence that is closest in meaning:",
        "options": [
            {"id": "A", "text": "The staff member denied taking confidential files from the office."},
            {"id": "B", "text": "The staff member admitted taking confidential files from the office."},
            {"id": "C", "text": "The staff member suggested taking confidential files from the office."},
            {"id": "D", "text": "The staff member promised to take confidential files from the office."}
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: Lời phủ nhận: 'No, I didn't...' được viết lại bằng: 'S + denied + V-ing' (phủ nhận đã làm gì). Phương án A là đáp án chính xác. Từ vựng 10/11: 'representative'."
    },
    {
        "content": "The diplomat was praised for __________ great contributions to regional peace before he retired.",
        "options": [
            {"id": "A", "text": "having made"},
            {"id": "B", "text": "have made"},
            {"id": "C", "text": "made"},
            {"id": "D", "text": "make"}
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: Perfect Gerund (Danh động từ hoàn thành) 'having + V3/ed' được dùng để nhấn mạnh hành động đóng góp to lớn ĐÃ HOÀN TẤT TRƯỚC thời điểm nghỉ hưu ➔ 'for having made'. Từ vựng 10/11: 'contribution' (sự đóng góp, cống hiến)."
    },
    {
        "content": "He denied __________ unauthorized information to journalists prior to the official summit announcement.",
        "options": [
            {"id": "A", "text": "having given"},
            {"id": "B", "text": "have given"},
            {"id": "C", "text": "to give"},
            {"id": "D", "text": "give"}
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: Động từ 'deny' đi với Perfect Gerund 'having + V3/ed' để nhấn mạnh việc đã làm trước đó trong quá khứ ➔ 'having given'. Từ vựng 10/11: 'representative'."
    },
    {
        "content": "The student felt proud of __________ an ASEAN leadership scholarship after months of hard work.",
        "options": [
            {"id": "A", "text": "having won"},
            {"id": "B", "text": "have won"},
            {"id": "C", "text": "to win"},
            {"id": "D", "text": "won"}
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: Sau giới từ 'of', ta dùng Perfect Gerund 'having + V3/ed' để nhấn mạnh việc giành được học bổng đã diễn ra thành công trước đó ➔ 'having won'. Từ vựng 10/11: 'scholarship' (học bổng), 'leadership' (lãnh đạo)."
    },
    {
        "content": "He regretted __________ the chance to represent his school at the regional youth forum.",
        "options": [
            {"id": "A", "text": "having missed"},
            {"id": "B", "text": "have missed"},
            {"id": "C", "text": "to missing"},
            {"id": "D", "text": "miss"}
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: 'Regret + having V3/ed' nhấn mạnh sự hối tiếc vì trước đó đã bỏ lỡ một cơ hội quý giá trong quá khứ ➔ 'having missed'. Từ vựng 10/11: 'represent' (đại diện)."
    },
    {
        "content": "Viet Nam was honored for __________ a prominent role in maintaining stability across the bloc.",
        "options": [
            {"id": "A", "text": "having played"},
            {"id": "B", "text": "have played"},
            {"id": "C", "text": "play"},
            {"id": "D", "text": "to playing"}
        ],
        "correctAnswer": "A",
        "explanation": "Thầy Thức hướng dẫn Thái: 'Honor sb for + having V3/ed' vinh danh ai vì trước đó đã đóng vai trò quan trọng ➔ 'having played'. Cụm 'play a role in + V-ing'. Từ vựng 10/11: 'maintain' (duy trì), 'stability' (sự ổn định), 'bloc' (khối liên minh)."
    }
]

def main():
    print(f"Generated {len(questions)} high-quality multiple choice questions.")

    # Check distribution of correct answers
    counts = {"A": 0, "B": 0, "C": 0, "D": 0}
    for q in questions:
        counts[q["correctAnswer"]] += 1
    print(f"Answer distribution: {counts}")

    output_path = os.path.join(os.path.dirname(__file__), "payload_thai_1211_80q.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(questions, f, ensure_ascii=False, indent=2)
    print(f"Saved payload to: {output_path}")

if __name__ == "__main__":
    main()
