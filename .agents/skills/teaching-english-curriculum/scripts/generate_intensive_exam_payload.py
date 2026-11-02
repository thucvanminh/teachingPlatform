#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import os
import re

SOURCE_PATH = "/home/dantey/Dantey/teaching/lop12NamViet/unit_6_intensive_practice_exam_120_minutes.txt"

with open(SOURCE_PATH, "r", encoding="utf-8") as f:
    raw_content = f.read()

parts = raw_content.split("ĐÁP ÁN VÀ GIẢI THÍCH CHI TIẾT")
exam_text = parts[0]
answer_text = parts[1]

# Extract reading passages
passage1_match = re.search(r"Artificial intelligence \(AI\) has rapidly transformed.*?tools to solve humanity’s grandest challenges\.", exam_text, re.DOTALL)
passage1_text = passage1_match.group(0).strip() if passage1_match else ""

passage2_match = re.search(r"The integration of Artificial Intelligence into medical science.*?guarantee patient safety\.", exam_text, re.DOTALL)
passage2_text = passage2_match.group(0).strip() if passage2_match else ""

# 1. Parse Questions 1 - 10 (Phonetics)
phonetics_questions = [
    {
        "content": "Mark the letter A, B, C, or D to indicate the word whose underlined part differs from the other three in pronunciation:\n\nQuestion 1:\nA. capable\nB. activate\nC. application\nD. analyse",
        "options": [{"id": "A", "text": "capable"}, {"id": "B", "text": "activate"}, {"id": "C", "text": "application"}, {"id": "D", "text": "analyse"}],
        "correctAnswer": "A",
        "explanation": "capable /ˈkeɪpəbl/ (âm /eɪ/), các từ còn lại là âm /æ/: activate /ˈæktɪveɪt/, application /ˌæplɪˈkeɪʃn/, analyse /ˈænəlaɪz/."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the word whose underlined part differs from the other three in pronunciation:\n\nQuestion 2:\nA. danger\nB. dangerous\nC. intelligent\nD. algorithm",
        "options": [{"id": "A", "text": "danger"}, {"id": "B", "text": "dangerous"}, {"id": "C", "text": "intelligent"}, {"id": "D", "text": "algorithm"}],
        "correctAnswer": "D",
        "explanation": "algorithm /ˈælɡərɪðəm/ (âm /ɡ/), các từ còn lại là âm /dʒ/: danger /ˈdeɪndʒər/, dangerous /ˈdeɪndʒərəs/, intelligent /ɪnˈtelɪdʒənt/."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the word whose underlined part differs from the other three in pronunciation:\n\nQuestion 3:\nA. explore\nB. effective\nC. recognize\nD. substitute",
        "options": [{"id": "A", "text": "explore"}, {"id": "B", "text": "effective"}, {"id": "C", "text": "recognize"}, {"id": "D", "text": "substitute"}],
        "correctAnswer": "B",
        "explanation": "effective /ɪˈfektɪv/ (âm /e/), các từ còn lại âm /ɪ/ hoặc /ə/: explore /ɪkˈsplɔːr/, recognize /ˈrekəɡnaɪz/, substitute /ˈsʌbstɪtjuːt/."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the word whose underlined part differs from the other three in pronunciation:\n\nQuestion 4:\nA. automated\nB. upgraded\nC. programmed\nD. repaired",
        "options": [{"id": "A", "text": "automated"}, {"id": "B", "text": "upgraded"}, {"id": "C", "text": "programmed"}, {"id": "D", "text": "repaired"}],
        "correctAnswer": "A",
        "explanation": "automated /ˈɔːtəmeɪtɪd/ (đuôi -ed phát âm /ɪd/), các từ còn lại tận cùng bằng âm hữu thanh nên phát âm là /d/."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the word whose underlined part differs from the other three in pronunciation:\n\nQuestion 5:\nA. proficiency\nB. efficiency\nC. artificial\nD. scientist",
        "options": [{"id": "A", "text": "proficiency"}, {"id": "B", "text": "efficiency"}, {"id": "C", "text": "artificial"}, {"id": "D", "text": "scientist"}],
        "correctAnswer": "D",
        "explanation": "scientist /ˈsaɪəntɪst/ (âm /s/), các từ còn lại chứa 'ci' phát âm là /ʃ/: proficiency /prəˈfɪʃnsi/, efficiency /ɪˈfɪʃnsi/, artificial /ˌɑːtɪˈfɪʃl/."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the word that differs from the other three in the position of primary stress:\n\nQuestion 6:\nA. capable\nB. autonomous\nC. dangerous\nD. scientist",
        "options": [{"id": "A", "text": "capable"}, {"id": "B", "text": "autonomous"}, {"id": "C", "text": "dangerous"}, {"id": "D", "text": "scientist"}],
        "correctAnswer": "B",
        "explanation": "autonomous /ɔːˈtɒnəməs/ (trọng âm 2), các từ còn lại trọng âm 1: capable /ˈkeɪpəbl/, dangerous /ˈdeɪndʒərəs/, scientist /ˈsaɪəntɪst/."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the word that differs from the other three in the position of primary stress:\n\nQuestion 7:\nA. recognition\nB. cybersecurity\nC. application\nD. facilitate",
        "options": [{"id": "A", "text": "recognition"}, {"id": "B", "text": "cybersecurity"}, {"id": "C", "text": "application"}, {"id": "D", "text": "facilitate"}],
        "correctAnswer": "D",
        "explanation": "facilitate /fəˈsɪlɪteɪt/ (trọng âm 2), các từ còn lại trọng âm 3: recognition /ˌrekəɡˈnɪʃn/, cybersecurity /ˌsaɪbəsɪˈkjʊərəti/, application /ˌæplɪˈkeɪʃn/."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the word that differs from the other three in the position of primary stress:\n\nQuestion 8:\nA. improve\nB. explore\nC. repair\nD. programme",
        "options": [{"id": "A", "text": "improve"}, {"id": "B", "text": "explore"}, {"id": "C", "text": "repair"}, {"id": "D", "text": "programme"}],
        "correctAnswer": "D",
        "explanation": "programme /ˈprəʊɡræm/ (trọng âm 1), các từ còn lại trọng âm 2: improve /ɪmˈpruːv/, explore /ɪkˈsplɔːr/, repair /rɪˈpeər/."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the word that differs from the other three in the position of primary stress:\n\nQuestion 9:\nA. intelligent\nB. sophisticated\nC. effective\nD. algorithm",
        "options": [{"id": "A", "text": "intelligent"}, {"id": "B", "text": "sophisticated"}, {"id": "C", "text": "effective"}, {"id": "D", "text": "algorithm"}],
        "correctAnswer": "D",
        "explanation": "algorithm /ˈælɡərɪðəm/ (trọng âm 1), các từ còn lại trọng âm 2: intelligent /ɪnˈtelɪdʒənt/, sophisticated /səˈfɪstɪkeɪtɪd/, effective /ɪˈfektɪv/."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the word that differs from the other three in the position of primary stress:\n\nQuestion 10:\nA. proficiency\nB. capability\nC. interactive\nD. artificial",
        "options": [{"id": "A", "text": "proficiency"}, {"id": "B", "text": "capability"}, {"id": "C", "text": "interactive"}, {"id": "D", "text": "artificial"}],
        "correctAnswer": "A",
        "explanation": "proficiency /prəˈfɪʃnsi/ (trọng âm 2), các từ còn lại trọng âm 3: capability /ˌkeɪpəˈbɪləti/, interactive /ˌɪntərˈæktɪv/, artificial /ˌɑːtɪˈfɪʃl/."
    }
]

# 2. Parse Questions 11 - 40 (Vocabulary & Grammar Causative Verbs)
vocab_grammar_raw = [
    (11, "Modern virtual assistants are programmed to ______ users through natural human speech.",
     [("A", "interact with"), ("B", "substitute for"), ("C", "facilitate at"), ("D", "explore on")],
     "A", "interact with: tương tác với."),
    (12, "The tech firm ______ their chief scientist design an autonomous navigation module.",
     [("A", "got"), ("B", "had"), ("C", "asked"), ("D", "allowed")],
     "B", "had + sb + V-bare (design) -> chọn 'had'."),
    (13, "Many factories install robotic arms that are ______ handling toxic chemicals safely.",
     [("A", "capable to"), ("B", "capable of"), ("C", "capable with"), ("D", "capable for")],
     "B", "capable of doing sth: có khả năng làm gì."),
    (14, "You should get an experienced programmer ______ the system before launching it.",
     [("A", "check"), ("B", "to check"), ("C", "checked"), ("D", "checking")],
     "B", "get + sb + to-V -> 'to check'."),
    (15, "Facial ______ algorithms are becoming increasingly sophisticated in modern smartphones.",
     [("A", "recognize"), ("B", "recognition"), ("C", "recognizable"), ("D", "recognizably")],
     "B", "Facial recognition: sự nhận diện khuôn mặt (cụm danh từ)."),
    (16, "The company had its vulnerable central database ______ by ethical hackers yesterday.",
     [("A", "examine"), ("B", "to examine"), ("C", "examined"), ("D", "examining")],
     "C", "have + sth (central database) + V3/ed (examined) -> thể sai khiến bị động."),
    (17, "Autonomous rover vehicles allow researchers to ______ dangerous environments on distant planets.",
     [("A", "explore"), ("B", "substitute"), ("C", "repair"), ("D", "activate")],
     "A", "explore dangerous environments: khám phá môi trường nguy hiểm."),
    (18, "Can we get our automated customer support system ______ by the end of this week?",
     [("A", "update"), ("B", "to update"), ("C", "updated"), ("D", "updating")],
     "C", "get + sth (system) + V3/ed (updated)."),
    (19, "High ______ in prompt engineering can drastically improve your productivity when using AI.",
     [("A", "proficiency"), ("B", "danger"), ("C", "application"), ("D", "substitute")],
     "A", "proficiency: sự thành thạo, tinh thông."),
    (20, "The manager had the technicians ______ the faulty sensors immediately.",
     [("A", "replace"), ("B", "to replace"), ("C", "replaced"), ("D", "replacing")],
     "A", "have + sb (technicians) + V-bare (replace)."),
    (21, "Autonomous drones are especially useful for carrying out operations in ______ areas.",
     [("A", "danger"), ("B", "dangerous"), ("C", "dangerously"), ("D", "endanger")],
     "B", "Trước danh từ 'areas' cần một tính từ: 'dangerous'."),
    (22, "Instead of coding everything manually, the team ______ a specialized algorithm generate the data tables.",
     [("A", "had"), ("B", "made"), ("C", "let"), ("D", "All are correct")],
     "D", "Cả 'have', 'make', 'let' đều đi với O + V-bare ('generate'), trong văn cảnh này đều hợp ngữ pháp."),
    (23, "Machine learning software demonstrates the ______ to adapt its predictions over time.",
     [("A", "capability"), ("B", "ability"), ("C", "proficiency"), ("D", "Both A and B are correct")],
     "D", "Cả 'capability' và 'ability' đều đi với 'to do sth' chỉ năng lực."),
    (24, "Yesterday, Mrs. Green had her smart home devices ______ after a major power surge.",
     [("A", "reset"), ("B", "to reset"), ("C", "resetting"), ("D", "resetted")],
     "A", "have + sth (smart home devices) + V3 ('reset' có V1=V2=V3)."),
    (25, "We must find an ______ method to protect user privacy against cyber threats.",
     [("A", "effect"), ("B", "effective"), ("C", "effectively"), ("D", "effectiveness")],
     "B", "Trước danh từ 'method' cần một tính từ: 'effective'."),
    (26, "The professor got his research assistants ______ the complex datasets using statistical AI tools.",
     [("A", "analyse"), ("B", "to analyse"), ("C", "analysed"), ("D", "analysing")],
     "B", "get + sb (research assistants) + to-V (to analyse)."),
    (27, "Recommendation engines use a complex ______ to suggest relevant educational videos.",
     [("A", "algorithm"), ("B", "scientist"), ("C", "proficiency"), ("D", "repair")],
     "A", "algorithm: thuật toán (đề xuất video)."),
    (28, "Our office had all confidential transaction logs ______ automatically to prevent data breaches.",
     [("A", "encrypt"), ("B", "to encrypt"), ("C", "encrypted"), ("D", "encrypting")],
     "C", "have + sth (transaction logs) + V3/ed (encrypted)."),
    (29, "AI technology does not aim to completely ______ human workers, but rather to support them.",
     [("A", "interact with"), ("B", "substitute for"), ("C", "explore into"), ("D", "facilitate with")],
     "B", "substitute for sb/sth: thay thế cho ai/cái gì."),
    (30, "How often do you ______ your autonomous vehicle serviced at the dealership?",
     [("A", "make"), ("B", "get"), ("C", "let"), ("D", "force")],
     "B", "Cấu trúc: get + sth + serviced (V3)."),
    (31, "Educational AI platforms help ______ personalized learning for remote students.",
     [("A", "facilitate"), ("B", "danger"), ("C", "repair"), ("D", "recognize")],
     "A", "facilitate: tạo điều kiện, hỗ trợ dễ dàng hơn."),
    (32, "The hospital will have a team of AI experts ______ the diagnostic neural network tomorrow.",
     [("A", "evaluate"), ("B", "to evaluate"), ("C", "evaluated"), ("D", "evaluating")],
     "A", "have + sb (team of AI experts) + V-bare (evaluate)."),
    (33, "Without solid ______ defenses, corporations remain vulnerable to severe ransomware attacks.",
     [("A", "cybersecurity"), ("B", "scientist"), ("C", "capability"), ("D", "proficiency")],
     "A", "cybersecurity defenses: phòng thủ an ninh mạng."),
    (34, "Dr. Wilson managed to get his students ______ hands-on experience in machine learning.",
     [("A", "gain"), ("B", "to gain"), ("C", "gained"), ("D", "gaining")],
     "B", "get + sb + to-V (to gain)."),
    (35, "The self-driving bus is fully ______ and requires no onboard human driver.",
     [("A", "autonomous"), ("B", "artificial"), ("C", "capable"), ("D", "effective")],
     "A", "autonomous: tự hành, tự chủ."),
    (36, "They had their drone camera ______ after it collided with a tree branch.",
     [("A", "repair"), ("B", "to repair"), ("C", "repaired"), ("D", "repairing")],
     "C", "have + sth (drone camera) + V3/ed (repaired)."),
    (37, "Voice assistants can be ______ by saying a specific wake word like 'Hey Siri'.",
     [("A", "activated"), ("B", "automated"), ("C", "substituted"), ("D", "explored")],
     "A", "be activated: được kích hoạt (bằng giọng nói)."),
    (38, "Did the company get their computer systems ______ against malware?",
     [("A", "immunize"), ("B", "to immunize"), ("C", "immunized"), ("D", "immunizing")],
     "C", "get + sth (systems) + V3/ed (immunized: miễn dịch/bảo vệ)."),
    (39, "Practical, ______ workshops enable engineering students to understand hardware architecture.",
     [("A", "hands-on"), ("B", "dangerous"), ("C", "artificial"), ("D", "capable")],
     "A", "hands-on workshops: các buổi hội thảo/thực hành thực tế."),
    (40, "You can ______ the smart vacuum cleaner clean the apartment while you are at work.",
     [("A", "get"), ("B", "have"), ("C", "tell"), ("D", "persuade")],
     "B", "have + O + V-bare (clean). 'get/tell/persuade' đều đòi hỏi 'to clean'.")
]

vocab_grammar_questions = [
    {
        "content": f"Mark the letter A, B, C, or D to indicate the correct answer:\n\nQuestion {num}: {content}",
        "options": [{"id": opt_id, "text": opt_text} for opt_id, opt_text in opts],
        "correctAnswer": corr,
        "explanation": exp
    }
    for num, content, opts, corr, exp in vocab_grammar_raw
]

# 3. Parse Questions 41 - 50 (Closest & Opposite)
closest_opposite_raw = [
    (41, "CLOSEST: Highly SOPHISTICATED algorithms allow search engines to deliver accurate results.",
     [("A", "primitive"), ("B", "advanced"), ("C", "straightforward"), ("D", "traditional")],
     "B", "sophisticated (tinh vi, tân tiến) = advanced."),
    (42, "CLOSEST: New educational software helps FACILITATE collaborative study groups online.",
     [("A", "make easier"), ("B", "complicate"), ("C", "prevent"), ("D", "terminate")],
     "A", "facilitate (làm cho dễ dàng hơn) = make easier."),
    (43, "CLOSEST: Autonomous rovers are designed to EXPLORE extraterrestrial terrain without direct human piloting.",
     [("A", "investigate"), ("B", "ignore"), ("C", "abandon"), ("D", "conceal")],
     "A", "explore (thám hiểm, nghiên cứu) = investigate."),
    (44, "CLOSEST: Engineers regularly inspect the mainframe to REPAIR minor technical glitches.",
     [("A", "fix"), ("B", "damage"), ("C", "construct"), ("D", "install")],
     "A", "repair (sửa chữa) = fix."),
    (45, "CLOSEST: Speech recognition is an EFFECTIVE tool for hands-free device control.",
     [("A", "useless"), ("B", "productive"), ("C", "inefficient"), ("D", "passive")],
     "B", "effective (hiệu quả) = productive."),
    (46, "OPPOSITE: Sending human rescue teams into unstable mines is extremely DANGEROUS.",
     [("A", "perilous"), ("B", "hazardous"), ("C", "safe"), ("D", "risky")],
     "C", "dangerous (nguy hiểm) >< safe (an toàn)."),
    (47, "OPPOSITE: The new language model showed remarkable PROFICIENCY when drafting professional emails.",
     [("A", "incompetence"), ("B", "mastery"), ("C", "expertise"), ("D", "aptitude")],
     "A", "proficiency (sự thành thạo, tài năng) >< incompetence (sự bất tài, kém cỏi)."),
    (48, "OPPOSITE: Some critics worry that AI could completely SUBSTITUTE human artists in creative industries.",
     [("A", "replace"), ("B", "retain"), ("C", "exchange"), ("D", "displace")],
     "B", "substitute (thay thế) >< retain (giữ lại, duy trì)."),
    (49, "OPPOSITE: You must press the power button to ACTIVATE the device's scanning module.",
     [("A", "trigger"), ("B", "disable"), ("C", "operate"), ("D", "initiate")],
     "B", "activate (kích hoạt) >< disable (vô hiệu hóa, tắt)."),
    (50, "OPPOSITE: In contrast to NATURAL intelligence, machine learning relies strictly on statistical computation.",
     [("A", "human"), ("B", "biological"), ("C", "artificial"), ("D", "spontaneous")],
     "C", "natural (tự nhiên) >< artificial (nhân tạo).")
]

closest_opposite_questions = [
    {
        "content": f"Mark the letter A, B, C, or D to indicate the word(s) {content}",
        "options": [{"id": opt_id, "text": opt_text} for opt_id, opt_text in opts],
        "correctAnswer": corr,
        "explanation": exp
    }
    for num, content, opts, corr, exp in closest_opposite_raw
]

# 4. Parse Questions 51 - 60 (Word Formation -> 4-choice Multiple Choice)
word_formation_raw = [
    (51, "Today's industrial robots operate with remarkable _________ and precision. (AUTONOMOUS)",
     [("A", "autonomy"), ("B", "autonomous"), ("C", "autonomously"), ("D", "autonomize")],
     "A", "Sau giới từ 'with' cần danh từ: 'autonomy' (sự tự chủ, độc lập). Cụm: operate with remarkable autonomy and precision."),
    (52, "Voice _________ software has dramatically improved telephone banking services. (RECOGNIZE)",
     [("A", "recognition"), ("B", "recognizable"), ("C", "recognizably"), ("D", "recognized")],
     "A", "Cụm danh từ: 'Voice recognition' (nhận diện giọng nói)."),
    (53, "Medical imaging tools have enhanced doctors' diagnostic _________ significantly. (CAPABLE)",
     [("A", "capabilities"), ("B", "incapable"), ("C", "capably"), ("D", "incapability")],
     "A", "Sau tính từ 'diagnostic' cần danh từ số nhiều: 'capabilities' (năng lực chẩn đoán)."),
    (54, "The _________ team worked around the clock to debug the artificial intelligence software. (PROGRAMME)",
     [("A", "programming"), ("B", "programmer"), ("C", "programme"), ("D", "programmable")],
     "A", "Cụm danh từ ghép: 'The programming team' (đội ngũ lập trình)."),
    (55, "We noticed a dramatic _________ in translation speed after the model was retrained. (IMPROVE)",
     [("A", "improvement"), ("B", "improvable"), ("C", "improved"), ("D", "improvingly")],
     "A", "Sau tính từ 'dramatic' cần danh từ: 'improvement' (sự cải thiện rõ rệt)."),
    (56, "Modern factories are moving toward full _________ to reduce labor overhead. (AUTOMATE)",
     [("A", "automation"), ("B", "automated"), ("C", "automatically"), ("D", "automatism")],
     "A", "Sau tính từ 'full' cần danh từ: 'automation' (sự tự động hóa hoàn toàn)."),
    (57, "A thorough _________ of server logs revealed that a suspicious cyber breach had occurred. (ANALYSE)",
     [("A", "analysis"), ("B", "analyst"), ("C", "analytical"), ("D", "analytically")],
     "A", "Sau tính từ 'thorough' cần danh từ: 'analysis' (sự phân tích kỹ lưỡng)."),
    (58, "Several renowned computer _________ met in Geneva to draft global AI ethical principles. (SCIENCE)",
     [("A", "scientists"), ("B", "scientific"), ("C", "scientifically"), ("D", "sciences")],
     "A", "Chủ ngữ chỉ người số nhiều: 'computer scientists' (các nhà khoa học máy tính)."),
    (59, "The device was _________ damaged during transit and could not be repaired. (IRREPARABLE)",
     [("A", "irreparably"), ("B", "irreparable"), ("C", "repairable"), ("D", "irreparability")],
     "A", "Trạng từ bổ nghĩa cho phân từ 'damaged': 'irreparably' (hư hại không thể sửa chữa)."),
    (60, "Developing good prompt engineering skills will greatly increase your work _________. (EFFECTIVE)",
     [("A", "effectiveness"), ("B", "effective"), ("C", "effectively"), ("D", "ineffectiveness")],
     "A", "Sau danh từ 'work' cần danh từ ghép: 'work effectiveness' (hiệu quả công việc).")
]

word_formation_questions = [
    {
        "content": f"Choose the correct form of the word in brackets to complete the sentence:\n\nQuestion {num}: {content}",
        "options": [{"id": opt_id, "text": opt_text} for opt_id, opt_text in opts],
        "correctAnswer": corr,
        "explanation": exp
    }
    for num, content, opts, corr, exp in word_formation_raw
]

# 5. Parse Questions 79 - 90 (Sentence Transformation -> 4-choice Multiple Choice)
transformation_raw = [
    (79, "A specialized technician installed our facial recognition camera yesterday.",
     [
         ("A", "We had our facial recognition camera installed by a specialized technician yesterday."),
         ("B", "We had our facial recognition camera to install by a specialized technician yesterday."),
         ("C", "We had a specialized technician installed our facial recognition camera yesterday."),
         ("D", "We had our facial recognition camera install by a specialized technician yesterday.")
     ],
     "A", "Thể sai khiến bị động với HAVE: S + had + something + V3/ed + by someone."),
    (80, "The professor persuaded the engineering student to recalibrate the robotic arm.",
     [
         ("A", "The professor got the engineering student to recalibrate the robotic arm."),
         ("B", "The professor got the engineering student recalibrate the robotic arm."),
         ("C", "The professor got the robotic arm recalibrate by the engineering student."),
         ("D", "The professor got to recalibrate the robotic arm by the student.")
     ],
     "A", "Persuade sb to do sth = Get sb to do sth (thuyết phục/nhờ ai làm gì)."),
    (81, "Someone repaired Michael's autonomous lawnmower last week.",
     [
         ("A", "Michael had his autonomous lawnmower repaired last week."),
         ("B", "Michael had his autonomous lawnmower to repair last week."),
         ("C", "Michael got someone repaired his autonomous lawnmower last week."),
         ("D", "Michael had someone to repair his autonomous lawnmower last week.")
     ],
     "A", "Thể sai khiến bị động: S + had + sth + V3/ed."),
    (82, "The IT manager made the programmer verify the cybersecurity logs.",
     [
         ("A", "The IT manager had the programmer verify the cybersecurity logs."),
         ("B", "The IT manager had the programmer to verify the cybersecurity logs."),
         ("C", "The IT manager got the programmer verify the cybersecurity logs."),
         ("D", "The IT manager had the cybersecurity logs verify by the programmer.")
     ],
     "A", "Thể sai khiến chủ động: S + have + someone + V-bare (verify)."),
    (83, "Generative AI tools are capable of composing coherent essays in seconds.",
     [
         ("A", "Generative AI tools have the ability to compose coherent essays in seconds."),
         ("B", "Generative AI tools have the ability of composing coherent essays in seconds."),
         ("C", "Generative AI tools have able to compose coherent essays in seconds."),
         ("D", "Generative AI tools have ability composing coherent essays in seconds.")
     ],
     "A", "Be capable of V-ing = Have the ability to V (có khả năng làm gì)."),
    (84, "A certified technician checks our smart home sensors every six months.",
     [
         ("A", "We get our smart home sensors checked by a certified technician every six months."),
         ("B", "We get our smart home sensors check by a certified technician every six months."),
         ("C", "We get a certified technician checked our smart home sensors every six months."),
         ("D", "We get our smart home sensors checking by a certified technician every six months.")
     ],
     "A", "Thể sai khiến bị động với GET: S + get + something + V3/ed (checked)."),
    (85, "The researcher asked his colleague to test the machine learning algorithm.",
     [
         ("A", "The researcher got his colleague to test the machine learning algorithm."),
         ("B", "The researcher got his colleague test the machine learning algorithm."),
         ("C", "The researcher had his colleague to test the machine learning algorithm."),
         ("D", "The researcher got the machine learning algorithm test by his colleague.")
     ],
     "A", "Ask sb to do sth = Get sb to do sth (nhờ ai làm gì)."),
    (86, "The hospital will instruct an external agency to audit the patient data system.",
     [
         ("A", "The hospital will have an external agency audit the patient data system."),
         ("B", "The hospital will have an external agency to audit the patient data system."),
         ("C", "The hospital will get an external agency audit the patient data system."),
         ("D", "The hospital will have the patient data system audit by an external agency.")
     ],
     "A", "Thể sai khiến chủ động với HAVE: S + will have + someone + V-bare (audit)."),
    (87, "Operating heavy machinery without safety gear is very dangerous.",
     [
         ("A", "It is very dangerous to interact with heavy machinery without safety gear."),
         ("B", "It is very dangerous to interact at heavy machinery without safety gear."),
         ("C", "It is very dangerous interacting with heavy machinery without safety gear."),
         ("D", "To interact to heavy machinery without safety gear is danger.")
     ],
     "A", "Cấu trúc: It is + adj + to V: It is very dangerous to interact with heavy machinery without safety gear."),
    (88, "We arranged for the software firm to update our translation app.",
     [
         ("A", "We got our translation app updated by the software firm."),
         ("B", "We got our translation app to update by the software firm."),
         ("C", "We got the software firm updated our translation app."),
         ("D", "We had our translation app update by the software firm.")
     ],
     "A", "Arrange for sb to do sth = Get sth done by sb (nhờ/thuê cái gì được làm)."),
    (89, "AI will not take the place of compassionate healthcare workers.",
     [
         ("A", "AI will not substitute for compassionate healthcare workers."),
         ("B", "AI will not substitute to compassionate healthcare workers."),
         ("C", "AI will not substitute with compassionate healthcare workers."),
         ("D", "AI will not substitute compassionate healthcare workers.")
     ],
     "A", "Take the place of sb = Substitute for sb (thay thế cho ai)."),
    (90, "Working directly with automated tools provides students with practical knowledge.",
     [
         ("A", "Hands-on experience with automated tools provides students with practical knowledge."),
         ("B", "Hands-off experience with automated tools provides students with practical knowledge."),
         ("C", "Hands-free experience with automated tools provides students with practical knowledge."),
         ("D", "Hand-made experience with automated tools provides students with practical knowledge.")
     ],
     "A", "Working directly with = Hands-on experience with (kinh nghiệm thực hành, trực tiếp).")
]

transformation_questions = [
    {
        "content": f"Mark the letter A, B, C, or D to indicate the sentence that is closest in meaning to the sentence below:\n\nQuestion {num}: '{content}'",
        "options": [{"id": opt_id, "text": opt_text} for opt_id, opt_text in opts],
        "correctAnswer": corr,
        "explanation": exp
    }
    for num, content, opts, corr, exp in transformation_raw
]

# 6. Parse Questions 61 - 70 (Reading Comprehension 1 - Guided Cloze)
cloze_raw = [
    (61, [("A", "algorithms"), ("B", "scientists"), ("C", "substitutions"), ("D", "proficiencies")], "A", "algorithms (thuật toán máy học)."),
    (62, [("A", "make"), ("B", "have"), ("C", "get"), ("D", "ask")], "B", "have + sb + install (V-bare)."),
    (63, [("A", "danger"), ("B", "dangerous"), ("C", "dangerously"), ("D", "endanger")], "B", "dangerous tasks (nhiệm vụ nguy hiểm)."),
    (64, [("A", "explore"), ("B", "improve"), ("C", "substitute"), ("D", "deactivate")], "B", "improve operational efficiency (cải thiện hiệu quả vận hành)."),
    (65, [("A", "application"), ("B", "applicant"), ("C", "apply"), ("D", "applicable")], "A", "widespread application (ứng dụng rộng rãi)."),
    (66, [("A", "recognise"), ("B", "recognisably"), ("C", "recognition"), ("D", "recognizable")], "C", "voice recognition (nhận diện giọng nói)."),
    (67, [("A", "activate"), ("B", "automate"), ("C", "repair"), ("D", "substitute")], "A", "activate their mobile devices (kích hoạt thiết bị)."),
    (68, [("A", "get"), ("B", "have"), ("C", "let"), ("D", "All are correct")], "D", "have / let sb verify (V-bare), trong đó 'have' chỉ thuê/nhờ đơn vị kiểm toán an ninh."),
    (69, [("A", "interact with"), ("B", "substitute for"), ("C", "facilitate with"), ("D", "explore about")], "B", "substitute for (thay thế cho nhân viên con người)."),
    (70, [("A", "effective"), ("B", "hands-on"), ("C", "autonomous"), ("D", "artificial")], "A", "effective tools (các công cụ hiệu quả).")
]

cloze_questions = [
    {
        "content": f"READING CLOZE:\n\n\"{passage1_text}\"\n\nQuestion {num}: Choose the best answer for blank ({num}):",
        "options": [{"id": opt_id, "text": opt_text} for opt_id, opt_text in opts],
        "correctAnswer": corr,
        "explanation": exp
    }
    for num, opts, corr, exp in cloze_raw
]

# 7. Parse Questions 71 - 78 (Reading Comprehension 2 - Deep Reading)
deep_reading_raw = [
    (71, "What is the primary focus of the passage?",
     [
         ("A", "The historical progression of computing hardware in universities."),
         ("B", "The opportunities and challenges of integrating AI into medical diagnosis."),
         ("C", "The replacement of surgeons by autonomous robots in operating theatres."),
         ("D", "The financial expenses associated with purchasing radiological equipment.")
     ],
     "B", "Bài đọc tập trung vào tiềm năng và thách thức đạo đức/pháp lý khi ứng dụng AI trong chẩn đoán y tế."),
    (72, "The word 'malignancies' in paragraph 1 is closest in meaning to ______.",
     [
         ("A", "cancerous conditions"),
         ("B", "algorithmic errors"),
         ("C", "hardware breakdowns"),
         ("D", "medical credentials")
     ],
     "A", "malignancies = cancerous conditions (các khối u/tình trạng ung thư ác tính)."),
    (73, "According to paragraph 2, how does AI software specifically assist in acute stroke triage?",
     [
         ("A", "By replacing the need for on-call surgeons."),
         ("B", "By manufacturing artificial blood vessels immediately."),
         ("C", "By analyzing CT scans instantaneously to notify surgeons without delay."),
         ("D", "By drafting insurance claims on behalf of patients.")
     ],
     "C", "Dẫn chứng đoạn 2: 'analyzes computerized tomography (CT) scans instantly, notifying on-call surgeons within seconds.'"),
    (74, "The causative sentence in paragraph 2 ('hospitals have their administrative backlog reduced') implies that ______.",
     [
         ("A", "hospitals reduce their records by deleting all data."),
         ("B", "the implementation of AI results in the administrative backlog being reduced."),
         ("C", "medical staff refuse to handle paperwork altogether."),
         ("D", "patients must file their own medical histories online.")
     ],
     "B", "Cấu trúc bị động thể sai khiến: việc ứng dụng AI giúp bệnh viện giải quyết/giảm tải hồ sơ tồn đọng."),
    (75, "The term 'black box' in paragraph 3 refers to ______.",
     [
         ("A", "physical flight data recorders fitted inside ambulances."),
         ("B", "internal algorithmic operations whose exact reasoning cannot be easily examined."),
         ("C", "dark rooms where radiological equipment must be operated."),
         ("D", "secure firewalls protecting hospitals against unauthorized access.")
     ],
     "B", "'Black box' chỉ các tầng xử lý nơ-ron phức tạp bên trong mà bác sĩ không thể nhìn thấy hay diễn giải logic trực tiếp từng bước."),
    (76, "The word 'proficiency' in paragraph 3 is opposite in meaning to ______.",
     [
         ("A", "expertise"),
         ("B", "competence"),
         ("C", "incompetence"),
         ("D", "diligence")
     ],
     "C", "proficiency (sự thành thạo, chuẩn xác) >< incompetence (sự kém cỏi, sai sót)."),
    (77, "Which of the following is NOT mentioned as a challenge of medical AI?",
     [
         ("A", "Algorithmic bias resulting from unrepresentative training datasets."),
         ("B", "Liability ambiguities when automated misdiagnoses occur."),
         ("C", "Lack of computational electricity in major modern hospitals."),
         ("D", "The lack of interpretability in deep learning decision paths.")
     ],
     "C", "Thiếu hụt điện năng không hề được đề cập trong bài."),
    (78, "According to the final paragraph, the 'human-in-the-loop' model requires that ______.",
     [
         ("A", "AI systems make final surgical decisions without human interference."),
         ("B", "physicians exercise hands-on supervision over AI-driven recommendations."),
         ("C", "computer scientists replace licensed medical practitioners."),
         ("D", "patients program their own diagnostic tools at home.")
     ],
     "B", "Dẫn chứng đoạn cuối: 'mandate a \"human-in-the-loop\" paradigm. Physicians must maintain hands-on oversight over algorithmic recommendations...'")
]

deep_reading_questions = [
    {
        "content": f"READING COMPREHENSION:\n\n\"{passage2_text}\"\n\nQuestion {num}: {content}",
        "options": [{"id": opt_id, "text": opt_text} for opt_id, opt_text in opts],
        "correctAnswer": corr,
        "explanation": exp
    }
    for num, content, opts, corr, exp in deep_reading_raw
]

# Order questions according to student profile:
# 1. Vocab & Grammar Causatives (11-40) - 30 questions
# 2. Closest & Opposite (41-50) - 10 questions
# 3. Word Formation (51-60) - 10 questions
# 4. Sentence Transformation (79-90) - 12 questions
# 5. Phonetics (1-10) - 10 questions
# 6. Reading Cloze (61-70) - 10 questions
# 7. Deep Reading (71-78) - 8 questions
ordered_questions = (
    vocab_grammar_questions +
    closest_opposite_questions +
    word_formation_questions +
    transformation_questions +
    phonetics_questions +
    cloze_questions +
    deep_reading_questions
)

print(f"Total questions compiled: {len(ordered_questions)}")

payload = {
    "studentUsername": "nam_viet",
    "grade": 12,
    "assignedDate": "2026-11-01T00:00:00.000Z",
    "unitTitle": "Đề Luyện Tập Chuyên Sâu 120 Phút: Unit 6 - Artificial Intelligence & Thể Sai Khiến (90 câu)",
    "unitDescription": "Đề tổng hợp 90 câu (120 phút) mục tiêu 7+ THPTQG: Từ vựng cốt lõi, Thể sai khiến (Active & Passive Causatives), Word Formation, Viết lại câu & Đọc hiểu chuyên sâu.",
    "lectureMarkdown": """# 🌟 Cẩm Nang Tri Thức & Đề Luyện Tập Chuyên Sâu 120 Phút - Unit 6
**Biên soạn riêng cho Bạn Nam Việt • Hướng dẫn: Thầy Thức**

Chuyên đề: **Artificial Intelligence & Thể Sai Khiến (Causative Verbs)**
Mục tiêu: **Chinh phục 7+ Kì thi Tốt nghiệp THPT Quốc Gia**

[🚀 MỞ PHÒNG HỌC TƯƠNG TÁC TOÀN MÀN HÌNH](/lectures/eng12-unit6/index.html)

---

### 📌 Chiến lược làm bài thi 120 phút hôm nay:
1. **Phần 1: Từ vựng & Thể sai khiến (Câu 1 - 50):** Làm chắc chắn, nhận diện nhanh cụm từ cố định (*interact with, capable of, substitute for*) và công thức Have/Get (*Have sb do, Get sb to do, Have/Get sth done*).
2. **Phần 2: Viết lại câu (Câu 51 - 62):** Đọc kỹ câu gốc, xác định tân ngữ chỉ người hay vật để chọn đúng dạng phân từ.
3. **Phần 3: Ngữ âm & Trọng âm (Câu 63 - 72):** Chú ý đuôi -ed (*automated vs upgraded*), quy tắc trọng âm từ 2, 3 âm tiết (*autonomous, algorithm, facilitate*).
4. **Phần 4: Đọc hiểu chuyên sâu (Câu 73 - 90):** Đọc kỹ câu hỏi, tìm từ khóa then chốt trong đoạn văn y tế & xe tự hành để chọn đáp án chính xác.
""",
    "teacherNote": "Thầy Thức dặn Nam Việt: Đây là đề luyện tập chuyên sâu 120 phút tổng hợp toàn bộ kiến thức trọng tâm Unit 6. Thầy đã xếp toàn bộ các câu Từ vựng và Ngữ pháp lên đầu để con làm quen phản xạ và tối ưu điểm số phần ăn chắc điểm 7+ nhé!",
    "assessmentTitle": "Luyện tập tại lớp: Đề Chuyên Sâu Unit 6 - AI & Thể Sai Khiến (90 câu - 120P)",
    "timeLimitMinutes": 120,
    "questions": ordered_questions
}

output_path = "/home/dantey/Dantey/teaching/teachingPlatform/.agents/skills/teaching-english-curriculum/scripts/payload_eng12_unit6_intensive.json"
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(payload, f, ensure_ascii=False, indent=2)

print(f"✅ Successfully exported intensive exam payload to {output_path}")
