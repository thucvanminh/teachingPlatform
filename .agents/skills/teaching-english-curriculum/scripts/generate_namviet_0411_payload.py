#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Generate payload for student Nam Việt on 04/11/2026:
Unit 6 - 25 Từ Vựng Thông Dụng Bổ Trợ (Artificial Intelligence) & Thể Sai Khiến (Causatives).
"""

import json
import os

questions = [
    # PHẦN 1: PHONETICS & WORD STRESS (8 CÂU)
    {
        "content": "Mark the letter A, B, C, or D to indicate the word whose underlined part differs from the other three in pronunciation:\n\nQuestion 1:\nA. advanc**ed**\nB. observ**ed**\nC. upgrad**ed**\nD. launch**ed**",
        "sectionName": "Phonetics & Word Stress",
        "options": [
            {"id": "A", "text": "advanced"},
            {"id": "B", "text": "observed"},
            {"id": "C", "text": "upgraded"},
            {"id": "D", "text": "launched"}
        ],
        "correctAnswer": "C",
        "explanation": "upgraded tận cùng bằng âm /d/ -> đuôi -ed phát âm là /ɪd/. Advanced và launched phát âm là /t/; observed phát âm là /d/. Trong đó upgraded có đuôi /ɪd/ khác biệt rõ nhất với nhóm /t/ và /d/."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the word whose underlined part differs from the other three in pronunciation:\n\nQuestion 2:\nA. **g**esture\nB. **d**igital\nC. pro**g**ramme\nD. **g**enerative",
        "sectionName": "Phonetics & Word Stress",
        "options": [
            {"id": "A", "text": "gesture"},
            {"id": "B", "text": "digital"},
            {"id": "C", "text": "programme"},
            {"id": "D", "text": "generative"}
        ],
        "correctAnswer": "C",
        "explanation": "programme có âm 'g' phát âm là /ɡ/, trong khi gesture /ˈdʒestʃə/, digital /ˈdɪdʒɪtl/, và generative /ˈdʒenərətɪv/ đều phát âm là /dʒ/."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the word whose underlined part differs from the other three in pronunciation:\n\nQuestion 3:\nA. ch**a**tbot\nB. d**a**ta\nC. pl**a**tform\nD. pr**a**ctical",
        "sectionName": "Phonetics & Word Stress",
        "options": [
            {"id": "A", "text": "chatbot"},
            {"id": "B", "text": "data"},
            {"id": "C", "text": "platform"},
            {"id": "D", "text": "practical"}
        ],
        "correctAnswer": "B",
        "explanation": "data /ˈdeɪtə/ có âm 'a' thứ nhất phát âm là /eɪ/. Các từ còn lại phát âm là /æ/: chatbot /ˈtʃætbɒt/, platform /ˈplætfɔːm/, practical /ˈpræktɪkl/."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the word whose underlined part differs from the other three in pronunciation:\n\nQuestion 4:\nA. v**i**rtual\nB. **i**mitate\nC. m**i**lestone\nD. d**i**gital",
        "sectionName": "Phonetics & Word Stress",
        "options": [
            {"id": "A", "text": "virtual"},
            {"id": "B", "text": "imitate"},
            {"id": "C", "text": "milestone"},
            {"id": "D", "text": "digital"}
        ],
        "correctAnswer": "C",
        "explanation": "milestone /ˈmaɪlstəʊn/ có âm 'i' phát âm là /aɪ/. Các từ còn lại phát âm là /ɜː/ hoặc /ɪ/: virtual /ˈvɜːtʃuəl/, imitate /ˈɪmɪteɪt/, digital /ˈdɪdʒɪtl/."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the word that differs from the other three in the position of primary stress:\n\nQuestion 5:\nA. advanced\nB. concept\nC. chatbot\nD. milestone",
        "sectionName": "Phonetics & Word Stress",
        "options": [
            {"id": "A", "text": "advanced"},
            {"id": "B", "text": "concept"},
            {"id": "C", "text": "chatbot"},
            {"id": "D", "text": "milestone"}
        ],
        "correctAnswer": "A",
        "explanation": "advanced /ədˈvɑːnst/ trọng âm rơi vào âm tiết thứ 2. Các từ còn lại nhấn âm 1: concept /ˈkɒnsept/, chatbot /ˈtʃætbɒt/, milestone /ˈmaɪlstəʊn/."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the word that differs from the other three in the position of primary stress:\n\nQuestion 6:\nA. observe\nB. provoke\nC. install\nD. gesture",
        "sectionName": "Phonetics & Word Stress",
        "options": [
            {"id": "A", "text": "observe"},
            {"id": "B", "text": "provoke"},
            {"id": "C", "text": "install"},
            {"id": "D", "text": "gesture"}
        ],
        "correctAnswer": "D",
        "explanation": "gesture /ˈdʒestʃə/ trọng âm rơi vào âm tiết thứ 1. Các từ còn lại là động từ 2 âm tiết nhấn âm 2: observe /əbˈzɜːv/, provoke /prəˈvəʊk/, install /ɪnˈstɔːl/."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the word that differs from the other three in the position of primary stress:\n\nQuestion 7:\nA. evolution\nB. identity\nC. repetitive\nD. maintenance",
        "sectionName": "Phonetics & Word Stress",
        "options": [
            {"id": "A", "text": "evolution"},
            {"id": "B", "text": "identity"},
            {"id": "C", "text": "repetitive"},
            {"id": "D", "text": "maintenance"}
        ],
        "correctAnswer": "A",
        "explanation": "evolution /ˌiːvəˈluːʃn/ trọng âm rơi vào âm tiết thứ 3. Identity /aɪˈdentəti/ và repetitive /rɪˈpetətɪv/ nhấn âm 2; maintenance /ˈmeɪntənəns/ nhấn âm 1. Trong đó evolution có hậu tố -tion luôn nhận trọng âm liền trước (âm 3)."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the word that differs from the other three in the position of primary stress:\n\nQuestion 8:\nA. effortlessly\nB. personalised\nC. portfolio\nD. practical",
        "sectionName": "Phonetics & Word Stress",
        "options": [
            {"id": "A", "text": "effortlessly"},
            {"id": "B", "text": "personalised"},
            {"id": "C", "text": "portfolio"},
            {"id": "D", "text": "practical"}
        ],
        "correctAnswer": "C",
        "explanation": "portfolio /pɔːtˈfəʊliəʊ/ trọng âm rơi vào âm tiết thứ 2. Các từ còn lại nhấn âm 1: effortlessly /ˈefətləsli/, personalised /ˈpɜːsənəlaɪzd/, practical /ˈpræktɪkl/."
    },

    # PHẦN 2: VOCABULARY IN CONTEXT (20 CÂU)
    {
        "content": "Mark the letter A, B, C, or D to indicate the correct answer:\n\nQuestion 9: Many commercial websites deploy intelligent ______ to answer customer questions around the clock.",
        "sectionName": "Từ Vựng Trọng Tâm Unit 6",
        "options": [
            {"id": "A", "text": "chatbots"},
            {"id": "B", "text": "gestures"},
            {"id": "C", "text": "portfolios"},
            {"id": "D", "text": "milestones"}
        ],
        "correctAnswer": "A",
        "explanation": "intelligent chatbots (các chatbot thông minh trả lời thắc mắc của khách hàng 24/7)."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the correct answer:\n\nQuestion 10: Training powerful generative models requires immense volumes of textual and numerical ______.",
        "sectionName": "Từ Vựng Trọng Tâm Unit 6",
        "options": [
            {"id": "A", "text": "gesture"},
            {"id": "B", "text": "data"},
            {"id": "C", "text": "concept"},
            {"id": "D", "text": "portfolio"}
        ],
        "correctAnswer": "B",
        "explanation": "textual and numerical data (dữ liệu dạng văn bản và số liệu)."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the correct answer:\n\nQuestion 11: Modern neural translation applications can convert complex literary idioms ______ without human intervention.",
        "sectionName": "Từ Vựng Trọng Tâm Unit 6",
        "options": [
            {"id": "A", "text": "effortlessly"},
            {"id": "B", "text": "repetitively"},
            {"id": "C", "text": "virtually"},
            {"id": "D", "text": "dangerously"}
        ],
        "correctAnswer": "A",
        "explanation": "effortlessly (một cách dễ dàng, trôi chảy, không tốn sức)."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the correct answer:\n\nQuestion 12: The rapid ______ of autonomous machines is drastically changing factory production lines.",
        "sectionName": "Từ Vựng Trọng Tâm Unit 6",
        "options": [
            {"id": "A", "text": "evolution"},
            {"id": "B", "text": "gesture"},
            {"id": "C", "text": "concept"},
            {"id": "D", "text": "portfolio"}
        ],
        "correctAnswer": "A",
        "explanation": "rapid evolution of autonomous machines (sự tiến hóa, phát triển nhanh chóng của các cỗ máy tự hành)."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the correct answer:\n\nQuestion 13: One fundamental ______ of facial recognition algorithms is authenticating registered user accounts.",
        "sectionName": "Từ Vựng Trọng Tâm Unit 6",
        "options": [
            {"id": "A", "text": "function"},
            {"id": "B", "text": "milestone"},
            {"id": "C", "text": "portfolio"},
            {"id": "D", "text": "gesture"}
        ],
        "correctAnswer": "A",
        "explanation": "fundamental function (chức năng cơ bản, nhiệm vụ cốt lõi)."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the correct answer:\n\nQuestion 14: You can control the smart projector from across the room using simple hand ______.",
        "sectionName": "Từ Vựng Trọng Tâm Unit 6",
        "options": [
            {"id": "A", "text": "gestures"},
            {"id": "B", "text": "chatbots"},
            {"id": "C", "text": "platforms"},
            {"id": "D", "text": "upgrades"}
        ],
        "correctAnswer": "A",
        "explanation": "hand gestures (các cử chỉ tay điều khiển thiết bị)."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the correct answer:\n\nQuestion 15: Sophia and other advanced humanoid robots have remarkably ______ facial expressions.",
        "sectionName": "Từ Vựng Trọng Tâm Unit 6",
        "options": [
            {"id": "A", "text": "human-like"},
            {"id": "B", "text": "repetitive"},
            {"id": "C", "text": "virtual"},
            {"id": "D", "text": "effortless"}
        ],
        "correctAnswer": "A",
        "explanation": "human-like facial expressions (biểu cảm khuôn mặt tự nhiên giống con người)."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the correct answer:\n\nQuestion 16: Deep learning neural networks are engineered to ______ how biological neurons transmit electronic signals.",
        "sectionName": "Từ Vựng Trọng Tâm Unit 6",
        "options": [
            {"id": "A", "text": "imitate"},
            {"id": "B", "text": "launch"},
            {"id": "C", "text": "install"},
            {"id": "D", "text": "provoke"}
        ],
        "correctAnswer": "A",
        "explanation": "imitate (bắt chước, mô phỏng cách thức hoạt động của các tế bào nơ-ron)."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the correct answer:\n\nQuestion 17: Before using the new graphic design software, you must ______ the latest driver package on your computer.",
        "sectionName": "Từ Vựng Trọng Tâm Unit 6",
        "options": [
            {"id": "A", "text": "install"},
            {"id": "B", "text": "provoke"},
            {"id": "C", "text": "observe"},
            {"id": "D", "text": "imitate"}
        ],
        "correctAnswer": "A",
        "explanation": "install the latest driver package (cài đặt gói trình điều khiển mới nhất)."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the correct answer:\n\nQuestion 18: The technology corporation plans to ______ its new conversational search engine next quarter.",
        "sectionName": "Từ Vựng Trọng Tâm Unit 6",
        "options": [
            {"id": "A", "text": "launch"},
            {"id": "B", "text": "imitate"},
            {"id": "C", "text": "observe"},
            {"id": "D", "text": "provoke"}
        ],
        "correctAnswer": "A",
        "explanation": "launch a new search engine (ra mắt, khởi chạy công cụ tìm kiếm mới)."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the correct answer:\n\nQuestion 19: Heavy manufacturing assembly robots require continuous ______ to avoid sudden mechanical breakdowns.",
        "sectionName": "Từ Vựng Trọng Tâm Unit 6",
        "options": [
            {"id": "A", "text": "maintenance"},
            {"id": "B", "text": "concept"},
            {"id": "C", "text": "portfolio"},
            {"id": "D", "text": "milestone"}
        ],
        "correctAnswer": "A",
        "explanation": "continuous maintenance (sự bảo trì, bảo dưỡng liên tục)."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the correct answer:\n\nQuestion 20: AlphaGo defeating the world Go champion was considered a major ______ in artificial intelligence history.",
        "sectionName": "Từ Vựng Trọng Tâm Unit 6",
        "options": [
            {"id": "A", "text": "milestone"},
            {"id": "B", "text": "chatbot"},
            {"id": "C", "text": "gesture"},
            {"id": "D", "text": "platform"}
        ],
        "correctAnswer": "A",
        "explanation": "major milestone (cột mốc lịch sử quan trọng trong quá trình phát triển)."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the correct answer:\n\nQuestion 21: High-definition traffic cameras ______ road congestion and relay real-time telemetry to central controllers.",
        "sectionName": "Từ Vựng Trọng Tâm Unit 6",
        "options": [
            {"id": "A", "text": "observe"},
            {"id": "B", "text": "launch"},
            {"id": "C", "text": "upgrade"},
            {"id": "D", "text": "install"}
        ],
        "correctAnswer": "A",
        "explanation": "observe road congestion (quan sát, theo dõi tình trạng ùn tắc giao thông)."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the correct answer:\n\nQuestion 22: Smart learning applications provide ______ study plans that match each student's learning speed.",
        "sectionName": "Từ Vựng Trọng Tâm Unit 6",
        "options": [
            {"id": "A", "text": "personalised"},
            {"id": "B", "text": "repetitive"},
            {"id": "C", "text": "virtual"},
            {"id": "D", "text": "human-like"}
        ],
        "correctAnswer": "A",
        "explanation": "personalised study plans (kế hoạch học tập được cá nhân hóa riêng biệt)."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the correct answer:\n\nQuestion 23: Cloud computing ______ give developers vast remote storage and computational resources.",
        "sectionName": "Từ Vựng Trọng Tâm Unit 6",
        "options": [
            {"id": "A", "text": "platforms"},
            {"id": "B", "text": "gestures"},
            {"id": "C", "text": "chatbots"},
            {"id": "D", "text": "concepts"}
        ],
        "correctAnswer": "A",
        "explanation": "cloud computing platforms (các nền tảng điện toán đám mây)."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the correct answer:\n\nQuestion 24: A freelance software programmer should build an impressive online ______ to attract international clients.",
        "sectionName": "Từ Vựng Trọng Tâm Unit 6",
        "options": [
            {"id": "A", "text": "portfolio"},
            {"id": "B", "text": "milestone"},
            {"id": "C", "text": "gesture"},
            {"id": "D", "text": "chatbot"}
        ],
        "correctAnswer": "A",
        "explanation": "online portfolio (hồ sơ năng lực trực tuyến giới thiệu các dự án đã làm)."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the correct answer:\n\nQuestion 25: AI has moved beyond mere theoretical debate and now offers ______ solutions for healthcare and finance.",
        "sectionName": "Từ Vựng Trọng Tâm Unit 6",
        "options": [
            {"id": "A", "text": "practical"},
            {"id": "B", "text": "repetitive"},
            {"id": "C", "text": "human-like"},
            {"id": "D", "text": "virtual"}
        ],
        "correctAnswer": "A",
        "explanation": "practical solutions (những giải pháp thiết thực, mang tính ứng dụng thực tiễn cao)."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the correct answer:\n\nQuestion 26: The introduction of generative writing tools continues to ______ heated discussions regarding academic honesty.",
        "sectionName": "Từ Vựng Trọng Tâm Unit 6",
        "options": [
            {"id": "A", "text": "provoke"},
            {"id": "B", "text": "install"},
            {"id": "C", "text": "upgrade"},
            {"id": "D", "text": "observe"}
        ],
        "correctAnswer": "A",
        "explanation": "provoke heated discussions (khơi gợi, châm ngòi cho các cuộc tranh luận sôi nổi)."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the correct answer:\n\nQuestion 27: Automated conveyor belts relieve factory workers from dull and ______ packing jobs.",
        "sectionName": "Từ Vựng Trọng Tâm Unit 6",
        "options": [
            {"id": "A", "text": "repetitive"},
            {"id": "B", "text": "advanced"},
            {"id": "C", "text": "practical"},
            {"id": "D", "text": "personalised"}
        ],
        "correctAnswer": "A",
        "explanation": "dull and repetitive packing jobs (công việc đóng gói tẻ nhạt và lặp đi lặp lại)."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the correct answer:\n\nQuestion 28: Security experts advise smartphone owners to ______ their operating system as soon as updates arrive.",
        "sectionName": "Từ Vựng Trọng Tâm Unit 6",
        "options": [
            {"id": "A", "text": "upgrade"},
            {"id": "B", "text": "provoke"},
            {"id": "C", "text": "imitate"},
            {"id": "D", "text": "observe"}
        ],
        "correctAnswer": "A",
        "explanation": "upgrade operating system (nâng cấp hệ điều hành)."
    },

    # PHẦN 3: CAUSATIVE VERBS GRAMMAR (10 CÂU)
    {
        "content": "Mark the letter A, B, C, or D to indicate the correct answer:\n\nQuestion 29: The startup director had the IT team ______ the customer database before the holiday sale.",
        "sectionName": "Ngữ Pháp Thể Sai Khiến",
        "options": [
            {"id": "A", "text": "upgrade"},
            {"id": "B", "text": "to upgrade"},
            {"id": "C", "text": "upgraded"},
            {"id": "D", "text": "upgrading"}
        ],
        "correctAnswer": "A",
        "explanation": "Cấu trúc sai khiến chủ động: have + sb (IT team) + V-bare (upgrade)."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the correct answer:\n\nQuestion 30: We finally got the software specialist ______ our company's chatbot system.",
        "sectionName": "Ngữ Pháp Thể Sai Khiến",
        "options": [
            {"id": "A", "text": "install"},
            {"id": "B", "text": "to install"},
            {"id": "C", "text": "installed"},
            {"id": "D", "text": "installing"}
        ],
        "correctAnswer": "B",
        "explanation": "Cấu trúc sai khiến chủ động với GET: get + sb (specialist) + to-V (to install)."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the correct answer:\n\nQuestion 31: The school had all lab computers ______ with the latest anti-virus software.",
        "sectionName": "Ngữ Pháp Thể Sai Khiến",
        "options": [
            {"id": "A", "text": "install"},
            {"id": "B", "text": "to install"},
            {"id": "C", "text": "installed"},
            {"id": "D", "text": "installing"}
        ],
        "correctAnswer": "C",
        "explanation": "Cấu trúc sai khiến bị động: have + sth (lab computers) + V3/ed (installed)."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the correct answer:\n\nQuestion 32: The factory manager gets the robotic arms ______ once a month to prevent jams.",
        "sectionName": "Ngữ Pháp Thể Sai Khiến",
        "options": [
            {"id": "A", "text": "maintain"},
            {"id": "B", "text": "to maintain"},
            {"id": "C", "text": "maintained"},
            {"id": "D", "text": "maintaining"}
        ],
        "correctAnswer": "C",
        "explanation": "Cấu trúc sai khiến bị động với GET: get + sth (robotic arms) + V3/ed (maintained)."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the correct answer:\n\nQuestion 33: The remarkable accuracy of the translation engine made the manager ______ his original doubts.",
        "sectionName": "Ngữ Pháp Thể Sai Khiến",
        "options": [
            {"id": "A", "text": "dismiss"},
            {"id": "B", "text": "to dismiss"},
            {"id": "C", "text": "dismissed"},
            {"id": "D", "text": "dismissing"}
        ],
        "correctAnswer": "A",
        "explanation": "Cấu trúc tác nhân gây ra: make + sb + V-bare (dismiss)."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the correct answer:\n\nQuestion 34: The network administrator refused to let unauthorized users ______ the digital data platform.",
        "sectionName": "Ngữ Pháp Thể Sai Khiến",
        "options": [
            {"id": "A", "text": "access"},
            {"id": "B", "text": "to access"},
            {"id": "C", "text": "accessed"},
            {"id": "D", "text": "accessing"}
        ],
        "correctAnswer": "A",
        "explanation": "Cấu trúc cho phép: let + sb + V-bare (access)."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the correct answer:\n\nQuestion 35: If the scanner is not working properly, you should have a technician ______ its optical sensor.",
        "sectionName": "Ngữ Pháp Thể Sai Khiến",
        "options": [
            {"id": "A", "text": "calibrate"},
            {"id": "B", "text": "to calibrate"},
            {"id": "C", "text": "calibrated"},
            {"id": "D", "text": "calibrating"}
        ],
        "correctAnswer": "A",
        "explanation": "Cấu trúc sai khiến chủ động: have + sb (technician) + V-bare (calibrate)."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the correct answer:\n\nQuestion 36: She hopes to get her professional portfolio ______ by a senior creative designer.",
        "sectionName": "Ngữ Pháp Thể Sai Khiến",
        "options": [
            {"id": "A", "text": "review"},
            {"id": "B", "text": "to review"},
            {"id": "C", "text": "reviewed"},
            {"id": "D", "text": "reviewing"}
        ],
        "correctAnswer": "C",
        "explanation": "Cấu trúc sai khiến bị động: get + sth (portfolio) + V3/ed (reviewed)."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the correct answer:\n\nQuestion 37: Can you ______ the robot vacuum the living room floor before dinner?",
        "sectionName": "Ngữ Pháp Thể Sai Khiến",
        "options": [
            {"id": "A", "text": "have"},
            {"id": "B", "text": "get"},
            {"id": "C", "text": "persuade"},
            {"id": "D", "text": "ask"}
        ],
        "correctAnswer": "A",
        "explanation": "Động từ phía sau tân ngữ là vacuum (V-bare) -> chọn have (have sb/sth do sth). get/persuade/ask đều đi với to-V."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the correct answer:\n\nQuestion 38: The strict security policy makes all workers ______ their identity cards before entering.",
        "sectionName": "Ngữ Pháp Thể Sai Khiến",
        "options": [
            {"id": "A", "text": "show"},
            {"id": "B", "text": "to show"},
            {"id": "C", "text": "showed"},
            {"id": "D", "text": "showing"}
        ],
        "correctAnswer": "A",
        "explanation": "Cấu trúc bắt buộc: make + sb + V-bare (show)."
    },

    # PHẦN 4: SYNONYMS & ANTONYMS (4 CÂU)
    {
        "content": "Mark the letter A, B, C, or D to indicate the word(s) CLOSEST in meaning to the underlined word:\n\nQuestion 39: The neural network was developed to **imitate** human cognitive processes.",
        "sectionName": "Đồng Nghĩa & Trái Nghĩa",
        "options": [
            {"id": "A", "text": "copy"},
            {"id": "B", "text": "destroy"},
            {"id": "C", "text": "ignore"},
            {"id": "D", "text": "prevent"}
        ],
        "correctAnswer": "A",
        "explanation": "imitate (mô phỏng, bắt chước) = copy / reproduce."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the word(s) CLOSEST in meaning to the underlined word:\n\nQuestion 40: Engineers are looking for **practical** applications of robotic prosthetics in daily healthcare.",
        "sectionName": "Đồng Nghĩa & Trái Nghĩa",
        "options": [
            {"id": "A", "text": "theoretical"},
            {"id": "B", "text": "applicable"},
            {"id": "C", "text": "useless"},
            {"id": "D", "text": "complicated"}
        ],
        "correctAnswer": "B",
        "explanation": "practical (mang tính thực tế, ứng dụng cao) = applicable / useful."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the word(s) OPPOSITE in meaning to the underlined word:\n\nQuestion 41: Developing countries are eager to adopt **advanced** digital technology for rapid growth.",
        "sectionName": "Đồng Nghĩa & Trái Nghĩa",
        "options": [
            {"id": "A", "text": "modern"},
            {"id": "B", "text": "outdated"},
            {"id": "C", "text": "sophisticated"},
            {"id": "D", "text": "efficient"}
        ],
        "correctAnswer": "B",
        "explanation": "advanced (tiên tiến, hiện đại) trái nghĩa với outdated (lỗi thời, lạc hậu)."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the word(s) OPPOSITE in meaning to the underlined word:\n\nQuestion 42: Factory workers often feel bored when doing **repetitive** assembly tasks day after day.",
        "sectionName": "Đồng Nghĩa & Trái Nghĩa",
        "options": [
            {"id": "A", "text": "varied"},
            {"id": "B", "text": "monotonous"},
            {"id": "C", "text": "tedious"},
            {"id": "D", "text": "boring"}
        ],
        "correctAnswer": "A",
        "explanation": "repetitive (lặp đi lặp lại nhàm chán) trái nghĩa với varied (đa dạng, phong phú)."
    },

    # PHẦN 5: WORD FORMATION (4 CÂU)
    {
        "content": "Choose the correct form of the word in brackets to complete the sentence:\n\nQuestion 43: Over the past century, mobile phones have undergone an extraordinary __________. (EVOLVE)",
        "sectionName": "Word Formation",
        "options": [
            {"id": "A", "text": "evolution"},
            {"id": "B", "text": "evolutionary"},
            {"id": "C", "text": "evolved"},
            {"id": "D", "text": "evolutionist"}
        ],
        "correctAnswer": "A",
        "explanation": "Sau mạo từ 'an extraordinary' cần một danh từ: evolution (sự tiến hóa, quá trình phát triển)."
    },
    {
        "content": "Choose the correct form of the word in brackets to complete the sentence:\n\nQuestion 44: The artificial synthetic leather was such a realistic __________ that nobody could tell the difference. (IMITATE)",
        "sectionName": "Word Formation",
        "options": [
            {"id": "A", "text": "imitation"},
            {"id": "B", "text": "imitative"},
            {"id": "C", "text": "imitator"},
            {"id": "D", "text": "imitated"}
        ],
        "correctAnswer": "A",
        "explanation": "Sau mạo từ 'a realistic' cần danh từ: imitation (đồ mô phỏng, sự bắt chước)."
    },
    {
        "content": "Choose the correct form of the word in brackets to complete the sentence:\n\nQuestion 45: Automated factory machinery requires regular software __________ to run smoothly. (MAINTAIN)",
        "sectionName": "Word Formation",
        "options": [
            {"id": "A", "text": "maintenance"},
            {"id": "B", "text": "maintainer"},
            {"id": "C", "text": "maintainable"},
            {"id": "D", "text": "maintaining"}
        ],
        "correctAnswer": "A",
        "explanation": "Cụm danh từ: software maintenance (sự bảo trì phần mềm)."
    },
    {
        "content": "Choose the correct form of the word in brackets to complete the sentence:\n\nQuestion 46: Voice-controlled gadgets have made hands-free driving __________ possible for everyone. (PRACTICAL)",
        "sectionName": "Word Formation",
        "options": [
            {"id": "A", "text": "practically"},
            {"id": "B", "text": "practicality"},
            {"id": "C", "text": "practice"},
            {"id": "D", "text": "impractical"}
        ],
        "correctAnswer": "A",
        "explanation": "Bổ nghĩa cho tính từ possible cần một trạng từ: practically possible (gần như khả thi, khả thi trên thực tế)."
    },

    # PHẦN 6: READING CLOZE PASSAGE (4 CÂU)
    {
        "content": "**READING CLOZE:**\n\n\"The modern workplace is experiencing a profound transformation due to artificial intelligence. Across diverse sectors, corporations are setting up digital (47) ______ to streamline communication. Instead of hiring hundreds of call center staff, businesses have intelligent (48) ______ answer routine questions around the clock. Furthermore, by letting automated algorithms process big data, managers make operations run (49) ______. To guarantee security, corporate leaders regularly have their digital systems (50) ______ by cyber specialists.\"\n\nQuestion 47: Choose the best answer for blank (47):",
        "sectionName": "Reading Cloze",
        "options": [
            {"id": "A", "text": "platforms"},
            {"id": "B", "text": "gestures"},
            {"id": "C", "text": "milestones"},
            {"id": "D", "text": "portfolios"}
        ],
        "correctAnswer": "A",
        "explanation": "digital platforms (các nền tảng kỹ thuật số phục vụ liên lạc)."
    },
    {
        "content": "**READING CLOZE:**\n\n\"The modern workplace is experiencing a profound transformation due to artificial intelligence. Across diverse sectors, corporations are setting up digital (47) ______ to streamline communication. Instead of hiring hundreds of call center staff, businesses have intelligent (48) ______ answer routine questions around the clock. Furthermore, by letting automated algorithms process big data, managers make operations run (49) ______. To guarantee security, corporate leaders regularly have their digital systems (50) ______ by cyber specialists.\"\n\nQuestion 48: Choose the best answer for blank (48):",
        "sectionName": "Reading Cloze",
        "options": [
            {"id": "A", "text": "chatbots"},
            {"id": "B", "text": "gestures"},
            {"id": "C", "text": "upgrades"},
            {"id": "D", "text": "concepts"}
        ],
        "correctAnswer": "A",
        "explanation": "have intelligent chatbots answer questions (nhờ các chatbot thông minh trả lời câu hỏi)."
    },
    {
        "content": "**READING CLOZE:**\n\n\"The modern workplace is experiencing a profound transformation due to artificial intelligence. Across diverse sectors, corporations are setting up digital (47) ______ to streamline communication. Instead of hiring hundreds of call center staff, businesses have intelligent (48) ______ answer routine questions around the clock. Furthermore, by letting automated algorithms process big data, managers make operations run (49) ______. To guarantee security, corporate leaders regularly have their digital systems (50) ______ by cyber specialists.\"\n\nQuestion 49: Choose the best answer for blank (49):",
        "sectionName": "Reading Cloze",
        "options": [
            {"id": "A", "text": "effortlessly"},
            {"id": "B", "text": "repetitively"},
            {"id": "C", "text": "dangerously"},
            {"id": "D", "text": "virtually"}
        ],
        "correctAnswer": "A",
        "explanation": "run effortlessly (vận hành trơn tru, dễ dàng, không tốn nhiều công sức)."
    },
    {
        "content": "**READING CLOZE:**\n\n\"The modern workplace is experiencing a profound transformation due to artificial intelligence. Across diverse sectors, corporations are setting up digital (47) ______ to streamline communication. Instead of hiring hundreds of call center staff, businesses have intelligent (48) ______ answer routine questions around the clock. Furthermore, by letting automated algorithms process big data, managers make operations run (49) ______. To guarantee security, corporate leaders regularly have their digital systems (50) ______ by cyber specialists.\"\n\nQuestion 50: Choose the best answer for blank (50):",
        "sectionName": "Reading Cloze",
        "options": [
            {"id": "A", "text": "upgrade"},
            {"id": "B", "text": "to upgrade"},
            {"id": "C", "text": "upgraded"},
            {"id": "D", "text": "upgrading"}
        ],
        "correctAnswer": "C",
        "explanation": "Cấu trúc sai khiến bị động: have + their digital systems (vật) + upgraded (V3/ed)."
    }
]

def main():
    payload = {
        "studentUsername": "nam_viet",
        "grade": 12,
        "assignedDate": "2026-11-04T00:00:00.000Z",
        "unitTitle": "Unit 6: 25 Từ Vựng Bổ Trợ Trọng Tâm & Thể Sai Khiến (Flashcard 3D)",
        "unitDescription": "Phòng học tương tác: 25 từ vựng bổ trợ Unit 6 với Flashcard 3D 2 chiều (Anh ➔ Việt và Việt ➔ Anh), Chuyên đề Thể Sai Khiến (Causative Verbs), Đấu trường Collocation & 50 câu trắc nghiệm chuyên sâu mục tiêu 7+.",
        "lectureMarkdown": """# 🌟 Cẩm Nang Tri Thức & Flashcard 25 Từ Vựng Bổ Trợ Unit 6
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
4. **Bộ đề trắc nghiệm luyện tập (50 câu):** Rèn luyện ngữ âm, từ vựng theo ngữ cảnh, bẫy cấu trúc sai khiến và đọc hiểu điền từ.
""",
        "teacherNote": "Thầy Thức dặn Nam Việt: Hôm nay con ôn tập kỹ 25 từ vựng bổ trợ Unit 6 qua hệ thống Flashcard 3D hai chiều nhé. Hãy luyện cả chiều Anh ➔ Việt và Việt ➔ Anh để phản xạ từ vựng thật chắc chắn, sau đó hoàn thành bộ 50 câu trắc nghiệm để củng cố ngữ pháp Thể sai khiến mục tiêu 7+ THPTQG!",
        "assessmentTitle": "Luyện tập tại lớp: 25 Từ Vựng Bổ Trợ Unit 6 & Thể Sai Khiến (50 câu)",
        "timeLimitMinutes": 60,
        "questions": questions
    }

    output_path = os.path.join(os.path.dirname(__file__), "payload_namviet_0411.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)

    print(f"✅ Successfully compiled {len(questions)} questions to {output_path}")

if __name__ == "__main__":
    main()
