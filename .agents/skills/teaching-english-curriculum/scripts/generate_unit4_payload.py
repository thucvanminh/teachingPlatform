#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import os

questions = [
    # ==========================================
    # PHẦN 1: TỪ VỰNG & COLLOCATIONS (CÂU 1 - 25)
    # TRỌNG TÂM 24 TỪ VỰNG UNIT 4: ASEAN AND VIET NAM
    # ==========================================
    {
        "content": "ASEAN is a regional __________ that promotes economic growth and cultural ties among Southeast Asian nations.",
        "options": [
            {"id": "A", "text": "association"},
            {"id": "B", "text": "dissociation"},
            {"id": "C", "text": "separation"},
            {"id": "D", "text": "destruction"}
        ],
        "correctAnswer": "A",
        "explanation": "Association (n): hiệp hội, đoàn thể. ASEAN là viết tắt của 'Association of Southeast Asian Nations'."
    },
    {
        "content": "The annual youth summit aims to strengthen regional __________ and economic partnerships across member states.",
        "options": [
            {"id": "A", "text": "cooperation"},
            {"id": "B", "text": "isolation"},
            {"id": "C", "text": "conflict"},
            {"id": "D", "text": "hesitation"}
        ],
        "correctAnswer": "A",
        "explanation": "Cooperation (n): sự hợp tác. Cụm: 'strengthen regional cooperation' (tăng cường hợp tác khu vực)."
    },
    {
        "content": "Viet Nam has achieved remarkable socioeconomic __________ into the broader ASEAN community since 1995.",
        "options": [
            {"id": "A", "text": "integration"},
            {"id": "B", "text": "segregation"},
            {"id": "C", "text": "elimination"},
            {"id": "D", "text": "termination"}
        ],
        "correctAnswer": "A",
        "explanation": "Integration (n): sự hội nhập. Cụm: 'economic/regional integration' (hội nhập kinh tế/khu vực)."
    },
    {
        "content": "Member countries demonstrated heartfelt __________ by sending rescue supplies to victims of the recent typhoon.",
        "options": [
            {"id": "A", "text": "solidarity"},
            {"id": "B", "text": "hostility"},
            {"id": "C", "text": "indifference"},
            {"id": "D", "text": "dispute"}
        ],
        "correctAnswer": "A",
        "explanation": "Solidarity (n): tình đoàn kết, sự nhất trí gắn bó. Cụm: 'demonstrate solidarity' (thể hiện sự đoàn kết)."
    },
    {
        "content": "Peace and political __________ are recognized as fundamental preconditions for long-term foreign investment.",
        "options": [
            {"id": "A", "text": "stability"},
            {"id": "B", "text": "instability"},
            {"id": "C", "text": "volatility"},
            {"id": "D", "text": "fragility"}
        ],
        "correctAnswer": "A",
        "explanation": "Stability (n): sự ổn định, vững chắc. Cụm: 'political stability' (sự ổn định chính trị)."
    },
    {
        "content": "ASEAN member states work closely to __________ peace and maritime navigation security in the region.",
        "options": [
            {"id": "A", "text": "maintain"},
            {"id": "B", "text": "demolish"},
            {"id": "C", "text": "surrender"},
            {"id": "D", "text": "interrupt"}
        ],
        "correctAnswer": "A",
        "explanation": "Maintain (v): duy trì, giữ gìn. Cụm: 'maintain peace and security' (duy trì hòa bình và an ninh)."
    },
    {
        "content": "Educational exchange initiatives help __________ mutual understanding and friendship among high school students.",
        "options": [
            {"id": "A", "text": "promote"},
            {"id": "B", "text": "discourage"},
            {"id": "C", "text": "obstruct"},
            {"id": "D", "text": "hamper"}
        ],
        "correctAnswer": "A",
        "explanation": "Promote (v): thúc đẩy, xúc tiến. Cụm: 'promote mutual understanding' (thúc đẩy hiểu biết lẫn nhau)."
    },
    {
        "content": "'One Vision, One Identity, One Community' serves as the official __________ of the ASEAN bloc.",
        "options": [
            {"id": "A", "text": "motto"},
            {"id": "B", "text": "gossip"},
            {"id": "C", "text": "rumor"},
            {"id": "D", "text": "proverb"}
        ],
        "correctAnswer": "A",
        "explanation": "Motto (n): khẩu hiệu, phương châm hành động chính thức."
    },
    {
        "content": "All signatories agree to abide strictly by the legal principles codified in the ASEAN __________.",
        "options": [
            {"id": "A", "text": "Charter"},
            {"id": "B", "text": "Novel"},
            {"id": "C", "text": "Flyer"},
            {"id": "D", "text": "Pamphlet"}
        ],
        "correctAnswer": "A",
        "explanation": "Charter (n): hiến chương (văn kiện pháp lý cao nhất). Cụm: 'the ASEAN Charter'."
    },
    {
        "content": "ASEAN is recognized as one of the most dynamic and rapidly growing economic trade __________ in the world.",
        "options": [
            {"id": "A", "text": "blocs"},
            {"id": "B", "text": "barriers"},
            {"id": "C", "text": "obstacles"},
            {"id": "D", "text": "blocks"}
        ],
        "correctAnswer": "A",
        "explanation": "Bloc (n): khối quốc gia, liên minh các nước. Trade bloc: khối liên minh thương mại."
    },
    {
        "content": "Participating in annual __________ exchanges enables students to appreciate diverse culinary and musical traditions.",
        "options": [
            {"id": "A", "text": "cultural"},
            {"id": "B", "text": "culture"},
            {"id": "C", "text": "culturally"},
            {"id": "D", "text": "cultured"}
        ],
        "correctAnswer": "A",
        "explanation": "Cụm danh từ: 'cultural exchanges' (các cuộc giao lưu văn hóa). Đứng trước danh từ 'exchanges' cần một tính từ 'cultural'."
    },
    {
        "content": "Young citizens are encouraged to get involved __________ voluntary community services across Southeast Asia.",
        "options": [
            {"id": "A", "text": "in"},
            {"id": "B", "text": "on"},
            {"id": "C", "text": "with"},
            {"id": "D", "text": "at"}
        ],
        "correctAnswer": "A",
        "explanation": "Giới từ đi với involve: 'get/be involved in sth' (tham gia vào việc gì)."
    },
    {
        "content": "Talented delegates were chosen to __________ their home countries at the international model ASEAN meeting.",
        "options": [
            {"id": "A", "text": "represent"},
            {"id": "B", "text": "repress"},
            {"id": "C", "text": "repeat"},
            {"id": "D", "text": "reprove"}
        ],
        "correctAnswer": "A",
        "explanation": "Represent (v): đại diện cho. Cụm: 'represent the country' (đại diện cho quốc gia)."
    },
    {
        "content": "Each member country sent an official youth __________ to deliver a speech on environmental preservation.",
        "options": [
            {"id": "A", "text": "representative"},
            {"id": "B", "text": "representation"},
            {"id": "C", "text": "representatively"},
            {"id": "D", "text": "represent"}
        ],
        "correctAnswer": "A",
        "explanation": "Representative (n): người đại diện. Cụm: 'youth representative' (đại biểu/đại diện thanh niên)."
    },
    {
        "content": "All __________ at the conference received certificates of participation signed by the Secretary-General.",
        "options": [
            {"id": "A", "text": "participants"},
            {"id": "B", "text": "participations"},
            {"id": "C", "text": "participates"},
            {"id": "D", "text": "participating"}
        ],
        "correctAnswer": "A",
        "explanation": "Participant (n): người tham gia. Ở vị trí chủ ngữ số nhiều chỉ người ➔ participants."
    },
    {
        "content": "Many college students eagerly __________ to assist with logistics at the SEA Games championship.",
        "options": [
            {"id": "A", "text": "volunteer"},
            {"id": "B", "text": "voluntarily"},
            {"id": "C", "text": "voluntary"},
            {"id": "D", "text": "voluntariness"}
        ],
        "correctAnswer": "A",
        "explanation": "Volunteer to do sth (v): xung phong, tình nguyện làm gì. Sau trạng từ 'eagerly' cần động từ chia thì hiện tại đơn: volunteer."
    },
    {
        "content": "Winning an ASEAN undergraduate __________ allows gifted students to study abroad in prestigious universities.",
        "options": [
            {"id": "A", "text": "scholarship"},
            {"id": "B", "text": "penalty"},
            {"id": "C", "text": "fine"},
            {"id": "D", "text": "tuition"}
        ],
        "correctAnswer": "A",
        "explanation": "Scholarship (n): học bổng. Cụm: 'ASEAN scholarship' (học bổng ASEAN)."
    },
    {
        "content": "The leadership program focuses on enhancing communication skills and strategic __________ capabilities.",
        "options": [
            {"id": "A", "text": "leadership"},
            {"id": "B", "text": "reader"},
            {"id": "C", "text": "hardship"},
            {"id": "D", "text": "fellowship"}
        ],
        "correctAnswer": "A",
        "explanation": "Leadership (n): sự lãnh đạo, kỹ năng lãnh đạo. Cụm: 'leadership capabilities' (năng lực lãnh đạo)."
    },
    {
        "content": "The Southeast Asian region takes tremendous pride in its linguistic, religious, and cultural __________.",
        "options": [
            {"id": "A", "text": "diversity"},
            {"id": "B", "text": "uniformity"},
            {"id": "C", "text": "similarity"},
            {"id": "D", "text": "monotony"}
        ],
        "correctAnswer": "A",
        "explanation": "Diversity (n): sự đa dạng, phong phú. Cụm: 'cultural diversity' (sự đa dạng văn hóa). Uniformity (sự đồng nhất), monotony (sự đơn điệu)."
    },
    {
        "content": "Preserving national cultural __________ while embracing global integration is a vital priority for young generations.",
        "options": [
            {"id": "A", "text": "identity"},
            {"id": "B", "text": "identify"},
            {"id": "C", "text": "identification"},
            {"id": "D", "text": "identical"}
        ],
        "correctAnswer": "A",
        "explanation": "Identity (n): bản sắc, nét nhận diện. Cụm: 'cultural identity' (bản sắc văn hóa)."
    },
    {
        "content": "All regional leaders pledged to collaborate closely toward building a peaceful and __________ ASEAN community.",
        "options": [
            {"id": "A", "text": "prosperous"},
            {"id": "B", "text": "poverty"},
            {"id": "C", "text": "prosperously"},
            {"id": "D", "text": "prosper"}
        ],
        "correctAnswer": "A",
        "explanation": "Prosperous (adj): thịnh vượng, phồn vinh. Đứng trước danh từ 'community' và song song với 'peaceful' cần tính từ 'prosperous'."
    },
    {
        "content": "Long-lasting economic __________ can only be achieved through fair trade agreements and sustainable practices.",
        "options": [
            {"id": "A", "text": "prosperity"},
            {"id": "B", "text": "prosperous"},
            {"id": "C", "text": "prosperously"},
            {"id": "D", "text": "prospering"}
        ],
        "correctAnswer": "A",
        "explanation": "Prosperity (n): sự thịnh vượng. Sau tính từ 'economic' cần một danh từ 'prosperity'."
    },
    {
        "content": "Viet Nam has made significant __________ to promoting regional security dialogue and economic connectivity.",
        "options": [
            {"id": "A", "text": "contributions"},
            {"id": "B", "text": "distractions"},
            {"id": "C", "text": "destructions"},
            {"id": "D", "text": "constructions"}
        ],
        "correctAnswer": "A",
        "explanation": "Cụm cố định: 'make contributions to + V-ing' (đóng góp vào việc gì)."
    },
    {
        "content": "The bilateral agreement was ratified in order to __________ economic and diplomatic ties between the two states.",
        "options": [
            {"id": "A", "text": "strengthen"},
            {"id": "B", "text": "weaken"},
            {"id": "C", "text": "shorten"},
            {"id": "D", "text": "threaten"}
        ],
        "correctAnswer": "A",
        "explanation": "Strengthen (v): củng cố, tăng cường. Weaken (làm suy yếu), threaten (đe dọa)."
    },
    {
        "content": "Which of the following is CLOSEST in meaning to the underlined word in: 'The leaders pledged to <u>maintain</u> peace'?",
        "options": [
            {"id": "A", "text": "preserve"},
            {"id": "B", "text": "destroy"},
            {"id": "C", "text": "neglect"},
            {"id": "D", "text": "abandon"}
        ],
        "correctAnswer": "A",
        "explanation": "Maintain = preserve / safeguard (duy trì, bảo tồn, gìn giữ)."
    },

    # ==========================================
    # PHẦN 2: NGỮ PHÁP DANH ĐỘNG TỪ (GERUNDS) (CÂU 26 - 45)
    # DANH ĐỘNG TỪ LÀM CHỦ NGỮ, TÂN NGỮ & BẪY GIỚI TỪ 'TO'
    # ==========================================
    {
        "content": "__________ about the history and cultural traditions of ASEAN member states is truly inspiring.",
        "options": [
            {"id": "A", "text": "Learning"},
            {"id": "B", "text": "Learn"},
            {"id": "C", "text": "Learned"},
            {"id": "D", "text": "To learning"}
        ],
        "correctAnswer": "A",
        "explanation": "Danh động từ (Gerund - V-ing) đứng đầu câu làm chủ ngữ: 'Learning about...' (Việc tìm hiểu về...)."
    },
    {
        "content": "Promoting friendly cultural exchanges among regional youths __________ essential for lasting peace.",
        "options": [
            {"id": "A", "text": "is"},
            {"id": "B", "text": "are"},
            {"id": "C", "text": "were"},
            {"id": "D", "text": "have been"}
        ],
        "correctAnswer": "A",
        "explanation": "BẪY SỐ ÍT: Khi V-ing làm chủ ngữ ('Promoting...'), động từ chính luôn chia ở dạng số ít ('is'), dù tân ngữ phía sau ('exchanges') là số nhiều."
    },
    {
        "content": "__________ local cultural customs can inadvertently cause serious diplomatic misunderstandings.",
        "options": [
            {"id": "A", "text": "Not understanding"},
            {"id": "B", "text": "Not to understand"},
            {"id": "C", "text": "Don't understand"},
            {"id": "D", "text": "No understanding"}
        ],
        "correctAnswer": "A",
        "explanation": "Phủ định của Danh động từ là: 'Not + V-ing'. Câu mang nghĩa: Việc không hiểu phong tục địa phương có thể gây hiểu lầm."
    },
    {
        "content": "Young ambassadors look forward to __________ the annual ASEAN Youth Leadership Forum.",
        "options": [
            {"id": "A", "text": "attending"},
            {"id": "B", "text": "attend"},
            {"id": "C", "text": "attended"},
            {"id": "D", "text": "to attend"}
        ],
        "correctAnswer": "A",
        "explanation": "BẪY GIỚI TỪ TO: 'look forward to + V-ing' (trông ngóng, mong đợi việc gì). Chữ 'to' ở đây là giới từ, bắt buộc đi với V-ing."
    },
    {
        "content": "Several member nations strongly object to __________ in the internal affairs of neighboring states.",
        "options": [
            {"id": "A", "text": "interfering"},
            {"id": "B", "text": "interfere"},
            {"id": "C", "text": "interfered"},
            {"id": "D", "text": "to interfere"}
        ],
        "correctAnswer": "A",
        "explanation": "Cấu trúc: 'object to + V-ing' (phản đối việc gì). Chữ 'to' là giới từ ➔ interfering."
    },
    {
        "content": "Viet Nam is firmly committed to __________ regional maritime safety and environmental sustainability.",
        "options": [
            {"id": "A", "text": "strengthening"},
            {"id": "B", "text": "strengthen"},
            {"id": "C", "text": "strengthened"},
            {"id": "D", "text": "strength"}
        ],
        "correctAnswer": "A",
        "explanation": "Cấu trúc: 'be committed to + V-ing' (cam kết làm gì) ➔ strengthening."
    },
    {
        "content": "Active citizen participation contributes greatly to __________ a peaceful and united ASEAN bloc.",
        "options": [
            {"id": "A", "text": "building"},
            {"id": "B", "text": "build"},
            {"id": "C", "text": "built"},
            {"id": "D", "text": "to build"}
        ],
        "correctAnswer": "A",
        "explanation": "Cấu trúc: 'contribute to + V-ing' (đóng góp vào việc gì) ➔ building."
    },
    {
        "content": "After living abroad in Singapore for six months, Mai got used to __________ in English all day.",
        "options": [
            {"id": "A", "text": "communicating"},
            {"id": "B", "text": "communicate"},
            {"id": "C", "text": "communicated"},
            {"id": "D", "text": "communication"}
        ],
        "correctAnswer": "A",
        "explanation": "Cấu trúc: 'get used to + V-ing' (dần quen với việc gì) ➔ communicating."
    },
    {
        "content": "The conference chairperson suggested __________ the bilateral discussion until tomorrow morning.",
        "options": [
            {"id": "A", "text": "postponing"},
            {"id": "B", "text": "to postpone"},
            {"id": "C", "text": "postpone"},
            {"id": "D", "text": "postponed"}
        ],
        "correctAnswer": "A",
        "explanation": "Động từ 'suggest' khi đi trực tiếp với động từ sau nó bắt buộc dùng V-ing: 'suggest doing sth'."
    },
    {
        "content": "Diplomats must avoid __________ offensive or biased remarks during official international press briefings.",
        "options": [
            {"id": "A", "text": "making"},
            {"id": "B", "text": "to make"},
            {"id": "C", "text": "make"},
            {"id": "D", "text": "made"}
        ],
        "correctAnswer": "A",
        "explanation": "Động từ 'avoid' bắt buộc đi với V-ing: 'avoid doing sth' (tránh làm gì)."
    },
    {
        "content": "The young volunteer clearly remembers __________ the former Secretary-General at the summit three years ago.",
        "options": [
            {"id": "A", "text": "meeting"},
            {"id": "B", "text": "to meet"},
            {"id": "C", "text": "meet"},
            {"id": "D", "text": "met"}
        ],
        "correctAnswer": "A",
        "explanation": "Remember + V-ing: nhớ đã làm gì trong quá khứ (three years ago). Remember + to-V: nhớ phải làm nhiệm vụ."
    },
    {
        "content": "Please remember __________ all conference accreditation badges before entering the security hall.",
        "options": [
            {"id": "A", "text": "to wear"},
            {"id": "B", "text": "wearing"},
            {"id": "C", "text": "wear"},
            {"id": "D", "text": "worn"}
        ],
        "correctAnswer": "A",
        "explanation": "Remember + to-V: nhớ phải làm một việc gì trong tương lai (lời nhắc nhở)."
    },
    {
        "content": "Both leaders stopped __________ and shook hands warmly in front of international news correspondents.",
        "options": [
            {"id": "A", "text": "arguing"},
            {"id": "B", "text": "to argue"},
            {"id": "C", "text": "argue"},
            {"id": "D", "text": "argued"}
        ],
        "correctAnswer": "A",
        "explanation": "Stop + V-ing: dừng hẳn việc đang làm (ngừng tranh cãi). Stop + to-V: dừng lại để làm việc khác."
    },
    {
        "content": "On the way to the airport, the delegate stopped __________ a souvenir gift for his host family.",
        "options": [
            {"id": "A", "text": "to buy"},
            {"id": "B", "text": "buying"},
            {"id": "C", "text": "buy"},
            {"id": "D", "text": "bought"}
        ],
        "correctAnswer": "A",
        "explanation": "Stop + to-V: dừng lại một hành động để làm một việc khác (dừng xe để mua quà)."
    },
    {
        "content": "The committee regrets __________ all applicants that all ASEAN scholarship quotas for this year have been filled.",
        "options": [
            {"id": "A", "text": "to inform"},
            {"id": "B", "text": "informing"},
            {"id": "C", "text": "inform"},
            {"id": "D", "text": "informed"}
        ],
        "correctAnswer": "A",
        "explanation": "Regret + to-V: lấy làm tiếc khi phải thông báo tin buồn (thường đi với inform, announce, say)."
    },
    {
        "content": "Thai now regrets __________ so much time playing video games instead of studying for the English exam.",
        "options": [
            {"id": "A", "text": "wasting"},
            {"id": "B", "text": "to waste"},
            {"id": "C", "text": "waste"},
            {"id": "D", "text": "wasted"}
        ],
        "correctAnswer": "A",
        "explanation": "Regret + V-ing: hối tiếc vì đã trót làm điều gì trong quá khứ."
    },
    {
        "content": "You should try __________ traditional Indonesian herbal tea to see whether it relieves your throat irritation.",
        "options": [
            {"id": "A", "text": "drinking"},
            {"id": "B", "text": "to drink"},
            {"id": "C", "text": "drink"},
            {"id": "D", "text": "drank"}
        ],
        "correctAnswer": "A",
        "explanation": "Try + V-ing: thử làm việc gì xem kết quả ra sao. Try + to-V: cố gắng nỗ lực làm gì."
    },
    {
        "content": "Thai tried __________ the arduous essay before midnight despite suffering from a terrible headache.",
        "options": [
            {"id": "A", "text": "to finish"},
            {"id": "B", "text": "finishing"},
            {"id": "C", "text": "finish"},
            {"id": "D", "text": "finished"}
        ],
        "correctAnswer": "A",
        "explanation": "Try + to-V: cố gắng vượt qua trở ngại để hoàn thành mục tiêu (cố gắng viết xong bài luận)."
    },
    {
        "content": "It is no use __________ about weather conditions when participating in outdoor regional sports events.",
        "options": [
            {"id": "A", "text": "complaining"},
            {"id": "B", "text": "to complain"},
            {"id": "C", "text": "complain"},
            {"id": "D", "text": "complained"}
        ],
        "correctAnswer": "A",
        "explanation": "Thành ngữ: 'It is no use / It is no good + V-ing' (Thật vô ích khi làm gì)."
    },
    {
        "content": "There is no point in __________ money on unnecessary souvenirs when traveling on a student budget.",
        "options": [
            {"id": "A", "text": "spending"},
            {"id": "B", "text": "to spend"},
            {"id": "C", "text": "spend"},
            {"id": "D", "text": "spent"}
        ],
        "correctAnswer": "A",
        "explanation": "Thành ngữ: 'There is no point in + V-ing' (Chẳng có ích lợi/ý nghĩa gì khi làm việc gì)."
    },

    # ==========================================
    # PHẦN 3: TỪ LOẠI WORD FORMATION (CÂU 46 - 52)
    # ==========================================
    {
        "content": "Choose the correct form of the word in brackets:\n'All member nations stood together to demonstrate regional _________ during the crisis. (SOLID)'",
        "options": [
            {"id": "A", "text": "solidarity"},
            {"id": "B", "text": "solidify"},
            {"id": "C", "text": "solidity"},
            {"id": "D", "text": "solidly"}
        ],
        "correctAnswer": "A",
        "explanation": "Sau tính từ 'regional' cần danh từ chỉ tình đoàn kết: 'solidarity'."
    },
    {
        "content": "Choose the correct form of the word in brackets:\n'The government implemented fiscal reforms in an attempt to _________ the domestic economy. (STABLE)'",
        "options": [
            {"id": "A", "text": "stabilize"},
            {"id": "B", "text": "stability"},
            {"id": "C", "text": "stabilizer"},
            {"id": "D", "text": "stably"}
        ],
        "correctAnswer": "A",
        "explanation": "Sau 'in an attempt to' cần động từ nguyên thể mang nghĩa bình ổn/làm ổn định: 'stabilize'."
    },
    {
        "content": "Choose the correct form of the word in brackets:\n'Free trade agreements have brought remarkable economic _________ to Southeast Asian border provinces. (PROSPER)'",
        "options": [
            {"id": "A", "text": "prosperity"},
            {"id": "B", "text": "prosperous"},
            {"id": "C", "text": "prosperously"},
            {"id": "D", "text": "prospering"}
        ],
        "correctAnswer": "A",
        "explanation": "Sau tính từ 'economic' cần danh từ: 'prosperity' (sự thịnh vượng)."
    },
    {
        "content": "Choose the correct form of the word in brackets:\n'Volunteer work is widely seen as a significant _________ to local community advancement. (CONTRIBUTE)'",
        "options": [
            {"id": "A", "text": "contribution"},
            {"id": "B", "text": "contributor"},
            {"id": "C", "text": "contributory"},
            {"id": "D", "text": "contributing"}
        ],
        "correctAnswer": "A",
        "explanation": "Sau tính từ 'significant' cần danh từ chỉ sự đóng góp: 'contribution'."
    },
    {
        "content": "Choose the correct form of the word in brackets:\n'The exchange summit was praised for its vibrant cultural and linguistic _________. (DIVERSE)'",
        "options": [
            {"id": "A", "text": "diversity"},
            {"id": "B", "text": "diversify"},
            {"id": "C", "text": "diversification"},
            {"id": "D", "text": "diversely"}
        ],
        "correctAnswer": "A",
        "explanation": "Sau tính từ 'linguistic' cần danh từ chỉ sự đa dạng: 'diversity'."
    },
    {
        "content": "Choose the correct form of the word in brackets:\n'The committee chose an articulate youth _________ to represent the delegation. (REPRESENT)'",
        "options": [
            {"id": "A", "text": "representative"},
            {"id": "B", "text": "representation"},
            {"id": "C", "text": "representatively"},
            {"id": "D", "text": "represented"}
        ],
        "correctAnswer": "A",
        "explanation": "Cụm danh từ: 'youth representative' (đại diện thanh niên)."
    },
    {
        "content": "Choose the correct form of the word in brackets:\n'The partnership was formed to _________ economic ties between the two coastal cities. (STRONG)'",
        "options": [
            {"id": "A", "text": "strengthen"},
            {"id": "B", "text": "strength"},
            {"id": "C", "text": "strongly"},
            {"id": "D", "text": "strengthener"}
        ],
        "correctAnswer": "A",
        "explanation": "Sau 'to' chỉ mục đích cần động từ nguyên thể: 'strengthen' (củng cố, tăng cường)."
    },

    # ==========================================
    # PHẦN 4: VIẾT LẠI CÂU BIẾN ĐỔI TƯƠNG ĐƯƠNG (CÂU 53 - 60)
    # CÁC CÔNG THỨC VIẾT LẠI CÂU KINH ĐIỂN MỤC TIÊU 8.5+
    # ==========================================
    {
        "content": "Mark the letter A, B, C, or D to indicate the sentence that is CLOSEST in meaning to:\n'It is pointless to worry about the outcome of the exam without studying.'",
        "options": [
            {"id": "A", "text": "There is no point in worrying about the outcome of the exam without studying."},
            {"id": "B", "text": "There is no point to worry about the outcome of the exam without studying."},
            {"id": "C", "text": "It is no point worrying about the outcome of the exam without studying."},
            {"id": "D", "text": "Worry about the outcome of the exam without studying is pointless."}
        ],
        "correctAnswer": "A",
        "explanation": "Công thức viết lại câu: 'It is pointless to-V' ➔ 'There is no point in + V-ing'."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the sentence that is CLOSEST in meaning to:\n'The teacher suggested that we should organize an ASEAN cultural exhibition.'",
        "options": [
            {"id": "A", "text": "The teacher suggested organizing an ASEAN cultural exhibition."},
            {"id": "B", "text": "The teacher suggested to organize an ASEAN cultural exhibition."},
            {"id": "C", "text": "The teacher suggested us to organize an ASEAN cultural exhibition."},
            {"id": "D", "text": "The teacher suggested that organizing an ASEAN cultural exhibition."}
        ],
        "correctAnswer": "A",
        "explanation": "Công thức viết lại câu: 'suggest that S + should + V' ➔ 'suggest + V-ing'."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the sentence that is CLOSEST in meaning to:\n'Thai spends two hours researching Southeast Asian history every evening.'",
        "options": [
            {"id": "A", "text": "It takes Thai two hours to research Southeast Asian history every evening."},
            {"id": "B", "text": "It takes Thai two hours researching Southeast Asian history every evening."},
            {"id": "C", "text": "Thai takes two hours to research Southeast Asian history every evening."},
            {"id": "D", "text": "It spends Thai two hours to research Southeast Asian history every evening."}
        ],
        "correctAnswer": "A",
        "explanation": "Công thức tương đương: 'S + spends + [time] + V-ing' ➔ 'It takes + O + [time] + to-V'."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the sentence that is CLOSEST in meaning to:\n'The delegate admitted that he had arrived late for the plenary session.'",
        "options": [
            {"id": "A", "text": "The delegate admitted arriving late for the plenary session."},
            {"id": "B", "text": "The delegate admitted to arrive late for the plenary session."},
            {"id": "C", "text": "The delegate admitted him to arrive late for the plenary session."},
            {"id": "D", "text": "The delegate admitted that to arrive late for the plenary session."}
        ],
        "correctAnswer": "A",
        "explanation": "Công thức viết lại câu: 'admit that S + V' ➔ 'admit + (having) + V3/ed / V-ing'."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the sentence that is CLOSEST in meaning to:\n'It is useless trying to convince them to change their minds.'",
        "options": [
            {"id": "A", "text": "It is no use trying to convince them to change their minds."},
            {"id": "B", "text": "It is no point to try to convince them to change their minds."},
            {"id": "C", "text": "There is no use in trying to convince them to change their minds."},
            {"id": "D", "text": "It is not worth to try to convince them to change their minds."}
        ],
        "correctAnswer": "A",
        "explanation": "Công thức: 'It is useless to-V / V-ing' = 'It is no use / It is no good + V-ing'."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the sentence that is CLOSEST in meaning to:\n'The students are eagerly waiting to welcome international exchange delegates.'",
        "options": [
            {"id": "A", "text": "The students look forward to welcoming international exchange delegates."},
            {"id": "B", "text": "The students look forward to welcome international exchange delegates."},
            {"id": "C", "text": "The students look forward welcoming international exchange delegates."},
            {"id": "D", "text": "The students look forward for welcoming international exchange delegates."}
        ],
        "correctAnswer": "A",
        "explanation": "Eagerly wait to do sth = Look forward to + V-ing (chữ to là giới từ)."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the sentence that is CLOSEST in meaning to:\n'You are not permitted to use mobile phones during the ASEAN diplomacy contest.'",
        "options": [
            {"id": "A", "text": "Avoid using mobile phones during the ASEAN diplomacy contest."},
            {"id": "B", "text": "Avoid to use mobile phones during the ASEAN diplomacy contest."},
            {"id": "C", "text": "Remember using mobile phones during the ASEAN diplomacy contest."},
            {"id": "D", "text": "Try using mobile phones during the ASEAN diplomacy contest."}
        ],
        "correctAnswer": "A",
        "explanation": "Not permitted to use = Avoid using (tránh việc sử dụng)."
    },
    {
        "content": "Mark the letter A, B, C, or D to indicate the sentence that is CLOSEST in meaning to:\n'He has no memory of ever meeting the foreign minister in Hanoi.'",
        "options": [
            {"id": "A", "text": "He forgot meeting the foreign minister in Hanoi."},
            {"id": "B", "text": "He forgot to meet the foreign minister in Hanoi."},
            {"id": "C", "text": "He remembered to meet the foreign minister in Hanoi."},
            {"id": "D", "text": "He stopped meeting the foreign minister in Hanoi."}
        ],
        "correctAnswer": "A",
        "explanation": "Have no memory of doing sth = Forget + V-ing (quên rằng mình đã làm một việc trong quá khứ)."
    }
]

payload = {
    "studentUsername": "thai",
    "grade": 11,
    "assignedDate": "2026-11-03T00:00:00.000Z",
    "unitTitle": "Unit 4: ASEAN and Viet Nam - 24 Từ Vựng Trọng Tâm & Danh Động Từ (Gerunds)",
    "unitDescription": "Phòng học tương tác: Đúng 24 từ vựng cốt lõi phát âm bản xứ, Chuyên đề Danh động từ (Gerunds as Subjects and Objects), Đấu trường Collocation & 60 câu trắc nghiệm chuyên sâu mục tiêu 8.5+.",
    "lectureMarkdown": """# 🌟 Cẩm Nang Tri Thức & Đấu Trường Từ Vựng Unit 4 - Tiếng Anh 11
**Biên soạn riêng cho Bạn Thái • Hướng dẫn: Thầy Thức**

Chuyên đề: **ASEAN and Viet Nam & Danh Động Từ (Gerunds as Subjects and Objects)**
Quy chuẩn: **Đúng 24 từ vựng cốt lõi theo phân phối chương trình**
Mục tiêu: **Chinh phục điểm 8.5+ Giữa kì & Kì thi THPT Quốc Gia**

[🚀 MỞ PHÒNG HỌC TƯƠNG TÁC TOÀN MÀN HÌNH](/lectures/eng11-unit4/index.html)

---

### 📌 Trọng tâm buổi học hôm nay (03/11/2026):
1. **Đúng 24 Từ vựng cốt lõi Unit 4:** Khối ASEAN, Hiến chương (*charter*), tình đoàn kết (*solidarity*), sự ổn định (*stability*), bản sắc văn hóa (*cultural identity*), sự thịnh vượng (*prosperity*).
2. **Ngữ pháp Danh động từ (Gerunds):**
   - V-ing làm chủ ngữ: Động từ chính **luôn chia số ít** (*Learning about ASEAN is...*).
   - Dạng phủ định: **Not + V-ing** (*Not knowing...*).
   - 5 Cụm có giới từ "TO" bắt buộc đi với V-ing: *look forward to, be used to, object to, contribute to, commit oneself to*.
   - 5 Cặp động từ đổi nghĩa: *remember, forget, stop, regret, try*.
3. **Bộ câu hỏi trắc nghiệm (60 câu):** Tập trung sâu vào nhận diện từ vựng, bẫy giới từ và công thức viết lại câu kinh điển.
""",
    "teacherNote": "Thầy Thức dặn Thái: Hôm nay con tập trung nắm chắc trọn vẹn đúng 24 từ vựng Unit 4 về chủ đề ASEAN và chuyên đề Danh động từ (Gerunds) nhé. Đặc biệt lưu ý bẫy động từ chính chia số ít khi V-ing làm chủ ngữ và các cụm giới từ 'TO' bắt buộc đi với V-ing để đạt điểm 8.5+!",
    "assessmentTitle": "Luyện tập tại lớp: Unit 4 - Từ vựng ASEAN & Danh động từ (60 câu)",
    "timeLimitMinutes": 90,
    "questions": questions
}

output_path = "/home/dantey/Dantey/teaching/teachingPlatform/.agents/skills/teaching-english-curriculum/scripts/payload_eng11_unit4.json"
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(payload, f, ensure_ascii=False, indent=2)

print(f"✅ Successfully compiled {len(questions)} questions to {output_path}")
