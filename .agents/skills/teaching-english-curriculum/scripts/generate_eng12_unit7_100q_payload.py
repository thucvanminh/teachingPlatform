# -*- coding: utf-8 -*-
import json
import os

# 12 core items
CORE_STEMS = [
    "mass media", "the press", "press", "broadcast", "broadcasts", "broadcasted", "broadcasting",
    "digital media", "social platform", "social platforms", "circulation", "commercial", "commercials",
    "publicity", "promote", "promotes", "promoted", "promoting", "reliable", "bias", "biases", "viral"
]

def count_core_options(options):
    count = 0
    for opt in options:
        opt_lower = opt.lower()
        if any(stem in opt_lower for stem in CORE_STEMS):
            count += 1
    return count

questions_data = []

# ==============================================================================
# PHẦN 1: 50 CÂU TỪ VỰNG CỐT LÕI (CÂU 1 - 50)
# ==============================================================================

q1_50_raw = [
    # 1. mass media (1 - 4)
    {
        "q": "Television, newspapers, radio, and the Internet are common forms of _______.",
        "opts": ["mass media", "social platform", "grammar rules", "school lessons"],
        "ans": "A",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "Mass media (phương tiện truyền thông đại chúng) bao gồm truyền hình, báo chí, radio và internet. 'Social platform' là nền tảng mạng xã hội (chỉ là một nhánh nhỏ)."
    },
    {
        "q": "The primary role of the _______ is to provide citizens with factual news and educational information.",
        "opts": ["commercial", "mass media", "circulation", "personal diary"],
        "ans": "B",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "Cụm danh từ: 'role of the mass media' (vai trò của các phương tiện truyền thông đại chúng). 'Commercial' là mẩu quảng cáo, 'circulation' là lượng phát hành."
    },
    {
        "q": "Traditional _______ such as printed newspapers and AM radio still retain loyal older audiences.",
        "opts": ["digital media", "traffic lights", "mass media", "commercials"],
        "ans": "C",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Traditional mass media' (truyền thông đại chúng truyền thống) như báo in và radio đối lập với 'digital media' (truyền thông số)."
    },
    {
        "q": "Unlike modern online channels, traditional _______ cannot provide instant interactive feedback from viewers.",
        "opts": ["social platforms", "mass media", "publicity", "biases"],
        "ans": "B",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "Traditional mass media (truyền thông đại chúng truyền thống một chiều) không có tính năng tương tác hai chiều như social platforms."
    },

    # 2. the press (5 - 8)
    {
        "q": "The police department held an urgent _______ conference to clarify the recent incident.",
        "opts": ["press", "broadcast", "circulation", "game"],
        "ans": "A",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "Collocation quen thuộc: 'press conference' có nghĩa là cuộc họp báo."
    },
    {
        "q": "Freedom of the _______ is considered an essential pillar of a democratic society.",
        "opts": ["commercial", "press", "bias", "street"],
        "ans": "B",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "Collocation cố định: 'freedom of the press' mang nghĩa tự do báo chí."
    },
    {
        "q": "Local journalists representing the _______ attended the opening ceremony of the new high school.",
        "opts": ["circulation", "publicity", "press", "viral"],
        "ans": "C",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'The press' (danh từ tập hợp) = giới báo chí, các nhà báo."
    },
    {
        "q": "The famous actor refused to answer any personal questions from the _______.",
        "opts": ["press", "mass media", "broadcast", "commercial"],
        "ans": "A",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Questions from the press' = các câu hỏi phỏng vấn từ giới báo chí."
    },

    # 3. broadcast (9 - 12)
    {
        "q": "The final football match of the championship will be _______ live on national television tonight.",
        "opts": ["promoted", "broadcast", "biased", "circulated"],
        "ans": "B",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Broadcast live' = phát sóng trực tiếp trên truyền hình hoặc đài phát thanh."
    },
    {
        "q": "My grandparents always listen to the evening news _______ at seven o'clock.",
        "opts": ["broadcast", "commercial", "publicity", "bias"],
        "ans": "A",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'News broadcast' (danh từ) = buổi phát sóng bản tin thời sự."
    },
    {
        "q": "The major television network plans to _______ an exclusive documentary about wild animals next Sunday.",
        "opts": ["circulate", "promote", "broadcast", "bias"],
        "ans": "C",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Broadcast a documentary' = phát sóng một bộ phim tài liệu."
    },
    {
        "q": "Because of severe stormy weather, the radio station temporarily stopped its daily _______.",
        "opts": ["broadcast", "circulation", "viral", "reliable"],
        "ans": "A",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Radio broadcast' = tín hiệu / chương trình phát sóng của đài phát thanh."
    },

    # 4. digital media (13 - 16)
    {
        "q": "Young generations prefer reading breaking news via _______ rather than buying printed newspapers.",
        "opts": ["circulation", "digital media", "commercials", "mass media"],
        "ans": "B",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Digital media' (truyền thông số / truyền thông kỹ thuật số) đọc qua smartphone và máy tính."
    },
    {
        "q": "The rapid development of _______ has transformed how companies advertise their new products.",
        "opts": ["digital media", "press conferences", "broadcasts", "publicity"],
        "ans": "A",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'The development of digital media' = sự phát triển của truyền thông số."
    },
    {
        "q": "Students can now study online and access educational videos through various _______ formats.",
        "opts": ["commercial", "bias", "digital media", "circulation"],
        "ans": "C",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Digital media formats' = các định dạng truyền thông số trực tuyến."
    },
    {
        "q": "Traditional print magazines are losing advertising revenue to interactive _______ channels.",
        "opts": ["the press", "broadcasts", "digital media", "circulations"],
        "ans": "C",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Digital media channels' = các kênh truyền thông kỹ thuật số."
    },

    # 5. social platform (17 - 20)
    {
        "q": "TikTok, Instagram, and Facebook are currently the most popular _______ among youth.",
        "opts": ["social platforms", "commercials", "press conferences", "mass media"],
        "ans": "A",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Social platforms' = các nền tảng mạng xã hội."
    },
    {
        "q": "You should set strong privacy passwords when creating an account on any _______.",
        "opts": ["broadcast", "social platform", "circulation", "publicity"],
        "ans": "B",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'On any social platform' = trên bất kỳ nền tảng mạng xã hội nào."
    },
    {
        "q": "Many online businesses use a popular _______ to interact directly with their customers.",
        "opts": ["bias", "reliable", "social platform", "commercial"],
        "ans": "C",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Use a social platform' = sử dụng một nền tảng mạng xã hội để tương tác với khách hàng."
    },
    {
        "q": "Sharing unverified personal information on a public _______ can be extremely risky.",
        "opts": ["social platform", "press", "circulation", "broadcast"],
        "ans": "A",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'On a public social platform' = trên một nền tảng mạng xã hội công khai."
    },

    # 6. circulation (21 - 24)
    {
        "q": "The daily _______ of printed daily newspapers has dropped dramatically in recent years.",
        "opts": ["circulation", "publicity", "commercial", "bias"],
        "ans": "A",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Circulation' (trong ngành xuất bản báo chí) = lượng phát hành của tờ báo."
    },
    {
        "q": "With an impressive _______ of over 700,000 copies per issue, this fashion magazine tops the market.",
        "opts": ["commercial", "circulation", "broadcast", "viral"],
        "ans": "B",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Circulation of 700,000 copies' = lượng phát hành 700.000 bản."
    },
    {
        "q": "Due to falling _______, the local newspaper was forced to reduce its staff members.",
        "opts": ["social platform", "bias", "circulation", "publicity"],
        "ans": "C",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Falling circulation' = lượng phát hành giảm sút."
    },
    {
        "q": "Publishers audit their print _______ figures strictly to attract commercial advertisers.",
        "opts": ["circulation", "broadcast", "digital media", "press"],
        "ans": "A",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Print circulation figures' = số liệu lượng phát hành báo in."
    },

    # 7. commercial (25 - 28)
    {
        "q": "My father usually changes the TV channel when a five-minute _______ break begins.",
        "opts": ["commercial", "broadcast", "publicity", "press"],
        "ans": "A",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Commercial break' = đoạn ngắt quãng để phát quảng cáo trên TV/đài."
    },
    {
        "q": "A 30-second TV _______ shown during the World Cup final costs millions of dollars.",
        "opts": ["circulation", "commercial", "bias", "platform"],
        "ans": "B",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'TV commercial' (danh từ) = mẩu phim quảng cáo truyền hình."
    },
    {
        "q": "Companies produce funny and memorable _______ to make viewers remember their brand name.",
        "opts": ["circulations", "biases", "commercials", "broadcasts"],
        "ans": "C",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Produce commercials' = sản xuất các đoạn phim quảng cáo."
    },
    {
        "q": "The main source of income for private television channels comes from _______ advertising.",
        "opts": ["commercial", "viral", "reliable", "press"],
        "ans": "A",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Commercial advertising' (tính từ) = quảng cáo thương mại."
    },

    # 8. publicity (29 - 32)
    {
        "q": "The new film received enormous _______ after winning top prizes at international film festivals.",
        "opts": ["publicity", "circulation", "bias", "commercial"],
        "ans": "A",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Receive enormous publicity' = nhận được sự quan tâm/chú ý rầm rộ của công chúng và truyền thông."
    },
    {
        "q": "Negative _______ regarding dangerous food safety can immediately ruin a restaurant's business.",
        "opts": ["broadcast", "publicity", "platform", "media"],
        "ans": "B",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Negative publicity' = sự chú ý/tai tiếng tiêu cực từ dư luận."
    },
    {
        "q": "The pop star hired a professional PR agency to generate positive _______ for her new music album.",
        "opts": ["circulation", "bias", "publicity", "commercial"],
        "ans": "C",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Generate positive publicity' = tạo dựng sự chú ý tích cực từ công chúng."
    },
    {
        "q": "The charity organization organized a marathon race to gain widespread _______ for disabled children.",
        "opts": ["publicity", "broadcast", "commercial", "viral"],
        "ans": "A",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Gain widespread publicity' = thu hút sự chú ý rộng rãi của công chúng."
    },

    # 9. promote (33 - 36)
    {
        "q": "Celebrities are often invited to _______ eco-friendly lifestyle products to young consumers.",
        "opts": ["promote", "broadcast", "bias", "circulate"],
        "ans": "A",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Promote' (động từ) = quảng bá, thúc đẩy tiêu thụ sản phẩm."
    },
    {
        "q": "The ministry of education launched a nationwide project to _______ reading habits among students.",
        "opts": ["broadcast", "promote", "commercialize", "circulate"],
        "ans": "B",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Promote reading habits' = thúc đẩy, khuyến khích thói quen đọc sách."
    },
    {
        "q": "The tech firm used short humorous videos on social platforms to _______ its latest smartphone.",
        "opts": ["circulate", "bias", "promote", "publicize"],
        "ans": "C",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Promote its latest smartphone' = quảng bá chiếc điện thoại thông minh mới nhất."
    },
    {
        "q": "Schools should organize sports tournaments to _______ teamwork and physical fitness.",
        "opts": ["promote", "broadcast", "commercial", "bias"],
        "ans": "A",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Promote teamwork' = thúc đẩy tinh thần làm việc nhóm."
    },

    # 10. reliable (37 - 40)
    {
        "q": "Students must evaluate news carefully and only use _______ sources when writing academic essays.",
        "opts": ["viral", "reliable", "biased", "commercial"],
        "ans": "B",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Reliable sources' = các nguồn tin đáng tin cậy, chính xác."
    },
    {
        "q": "Because of unverified online rumors, people desperately need _______ information from medical experts.",
        "opts": ["commercial", "biased", "reliable", "viral"],
        "ans": "C",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Reliable information' = thông tin đáng tin cậy, có cơ sở xác thực."
    },
    {
        "q": "The scientific journal is widely known for publishing highly _______ research data.",
        "opts": ["reliable", "viral", "biased", "publicized"],
        "ans": "A",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Highly reliable research data' = dữ liệu nghiên cứu khoa học có độ tin cậy rất cao."
    },
    {
        "q": "In an era of fake news, building a reputation as a _______ journalist takes years of hard work.",
        "opts": ["commercial", "reliable", "viral", "biased"],
        "ans": "B",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'A reliable journalist' = một nhà báo đáng tin cậy, trung thực."
    },

    # 11. bias (41 - 44)
    {
        "q": "A professional and ethical journalist must report news objectively without any personal _______.",
        "opts": ["bias", "publicity", "circulation", "commercial"],
        "ans": "A",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Personal bias' (danh từ) = định kiến / sự thiên vị cá nhân."
    },
    {
        "q": "The television report was criticized by viewers for showing noticeable political _______.",
        "opts": ["publicity", "bias", "circulation", "broadcast"],
        "ans": "B",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Political bias' = sự thiên kiến chính trị (thiên vị một bên)."
    },
    {
        "q": "Readers should consult multiple news outlets to avoid being influenced by media _______.",
        "opts": ["broadcast", "circulation", "bias", "publicity"],
        "ans": "C",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Media bias' = sự thiên vị / thiên kiến của các kênh truyền thông."
    },
    {
        "q": "The article appeared unfair because it was clearly _______ towards the wealthy corporation.",
        "opts": ["biased", "reliable", "viral", "commercial"],
        "ans": "A",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Biased towards' (tính từ) = thiên vị, nghiêng về phía ai đó một cách không công bằng."
    },

    # 12. viral (45 - 48)
    {
        "q": "The humorous video clip of the baby panda went _______ and gained millions of views in one day.",
        "opts": ["reliable", "viral", "commercial", "biased"],
        "ans": "B",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "Thành ngữ thông dụng trong thời đại số: 'go viral' = lan truyền nhanh chóng mặt trên mạng Internet."
    },
    {
        "q": "The marketing team created an interactive challenge that quickly went _______ on social platforms.",
        "opts": ["biased", "commercial", "viral", "reliable"],
        "ans": "C",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Go viral on social platforms' = trở nên cực kỳ phổ biến và lan truyền trên mạng xã hội."
    },
    {
        "q": "A successful _______ campaign can spread brand awareness worldwide without spending much on TV ads.",
        "opts": ["viral", "biased", "circulated", "broadcast"],
        "ans": "A",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Viral campaign' = chiến dịch lan truyền tạo hiệu ứng trên mạng."
    },
    {
        "q": "The warning message about the computer virus went _______ across chat groups within minutes.",
        "opts": ["reliable", "viral", "commercial", "biased"],
        "ans": "B",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Went viral' = lan truyền nhanh chóng."
    },

    # 13. Phân biệt & Tổng hợp (49 - 50)
    {
        "q": "Which of the following refers to the total number of newspaper copies distributed each day?",
        "opts": ["broadcast", "circulation", "publicity", "bias"],
        "ans": "B",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Circulation' là lượng phát hành ấn bản báo in. 'Broadcast' là phát sóng, 'publicity' là sự chú ý của công chúng, 'bias' là sự thiên vị."
    },
    {
        "q": "To build customer trust, businesses must provide _______ information and avoid misleading _______.",
        "opts": ["reliable - commercials", "biased - broadcasts", "viral - circulations", "public - platforms"],
        "ans": "A",
        "section": "Từ vựng cốt lõi Unit 7",
        "exp": "'Reliable information' (thông tin đáng tin cậy) và 'misleading commercials' (các mẩu quảng cáo gây hiểu lầm)."
    }
]

for idx, item in enumerate(q1_50_raw, 1):
    c = count_core_options(item["opts"])
    assert c >= 2, f"Câu {idx} không đủ 2 từ cốt lõi trong đáp án! Hiện có: {c}"
    questions_data.append({
        "order": idx,
        "sectionName": item["section"],
        "content": f"Mark the letter A, B, C, or D to indicate the correct answer:\n\n**Question {idx}:** {item['q']}",
        "options": [
            {"id": "A", "text": item["opts"][0]},
            {"id": "B", "text": item["opts"][1]},
            {"id": "C", "text": item["opts"][2]},
            {"id": "D", "text": item["opts"][3]}
        ],
        "correctAnswer": item["ans"],
        "explanation": f"**Đáp án đúng: {item['ans']}**\n\n{item['exp']}"
    })

# ==============================================================================
# PHẦN 2: 40 CÂU NGỮ PHÁP TRỘN ĐỀU (CÂU 51 - 90)
# ==============================================================================

grammar_mixed_raw = [
    {
        "q": "The breaking news was _______ shocking that everyone in the office stopped working.",
        "opts": ["such", "so", "too", "very"],
        "ans": "B",
        "exp": "Cấu trúc Mệnh đề kết quả: 'S + be + so + adj (shocking) + that + Clause' (quá gây sốc đến nỗi mà)."
    },
    {
        "q": "He is only a beginner, but he speaks as if he _______ an experienced journalist.",
        "opts": ["were", "is", "has been", "will be"],
        "ans": "A",
        "exp": "Mệnh đề cách thức giả định trái ngược hiện tại: sau 'as if', to-be chia 'WERE' cho mọi ngôi!"
    },
    {
        "q": "It was _______ an exciting documentary that our whole family watched it until midnight.",
        "opts": ["so", "such", "too", "very"],
        "ans": "B",
        "exp": "Cấu trúc Mệnh đề kết quả: 'such + a/an + adj + N số ít (an exciting documentary) + that'."
    },
    {
        "q": "The students conducted the chemistry experiment _______ their teacher had guided them.",
        "opts": ["just as", "so that", "such that", "due to"],
        "ans": "A",
        "exp": "Mệnh đề cách thức: 'just as' = đúng như là (làm thí nghiệm đúng như thầy giáo đã hướng dẫn)."
    },
    {
        "q": "There were _______ many commercial banners on the website that I couldn't find the article.",
        "opts": ["such", "so", "too", "much"],
        "ans": "B",
        "exp": "Quy tắc định lượng: đi với 'many / few' luôn dùng 'SO' -> 'so many commercial banners that...'."
    },
    {
        "q": "She described the traffic accident vividly as though she _______ it with her own eyes yesterday.",
        "opts": ["had seen", "sees", "has seen", "is seeing"],
        "ans": "A",
        "exp": "Giả định trái ngược quá khứ (hôm qua thực tế không chứng kiến) -> sau 'as though' lùi về Quá khứ hoàn thành 'had seen'."
    },
    {
        "q": "They are _______ reliable news outlets that millions of readers trust them daily.",
        "opts": ["so", "such a", "such", "too"],
        "ans": "C",
        "exp": "Danh từ số nhiều 'news outlets' (không có a/an) -> dùng 'such + adj + N số nhiều + that'."
    },
    {
        "q": "Please fill in your application form _______ instructed in the official guideline.",
        "opts": ["so", "as", "such", "like as"],
        "ans": "B",
        "exp": "Mệnh đề cách thức: 'as instructed' = theo như / đúng như đã được hướng dẫn."
    },
    {
        "q": "The speaker spoke _______ quickly that the foreign reporters could not take down notes.",
        "opts": ["such", "so", "very", "too"],
        "ans": "B",
        "exp": "Cấu trúc: 'S + V + so + adv (quickly) + that + Clause' (nói nhanh đến nỗi mà không ghi kịp)."
    },
    {
        "q": "Look at those dark storm clouds! It looks as if it _______ to rain heavily.",
        "opts": ["is going", "were", "had been", "would have been"],
        "ans": "A",
        "exp": "Có dấu hiệu thực tế trời sắp mưa (nhìn mây đen kìa) -> không dùng giả định lùi thì, chia hiện tại 'is going to rain'."
    },
    {
        "q": "The company spent _______ much money on TV commercials that they had no budget left for research.",
        "opts": ["such", "too", "so", "such a"],
        "ans": "C",
        "exp": "Quy tắc lượng từ: đi với danh từ không đếm được 'money' dùng 'so much money that...'."
    },
    {
        "q": "He orders everyone around in the newsroom as if he _______ the chief editor.",
        "opts": ["is", "were", "will be", "are"],
        "ans": "B",
        "exp": "Thực tế cậu ấy không phải tổng biên tập -> giả định hiện tại dùng 'were' cho mọi ngôi sau 'as if'."
    },
    {
        "q": "It was _______ bad weather that the outdoor broadcasting event had to be postponed.",
        "opts": ["such a", "so", "such", "too"],
        "ans": "C",
        "exp": "'Weather' là danh từ không đếm được, tuyệt đối không dùng a/an -> 'such + adj + N không đếm được + that'."
    },
    {
        "q": "In informal daily conversation, people often say: 'He talks _______ a radio presenter.'",
        "opts": ["like", "as if like", "such", "so that"],
        "ans": "A",
        "exp": "Trong văn phong nói thân mật, giới từ 'like' thường đi với danh từ để so sánh cách thức ('talks like a presenter')."
    },
    {
        "q": "There were _______ few copies of the morning paper left that many customers went home empty-handed.",
        "opts": ["such", "so", "too", "very"],
        "ans": "B",
        "exp": "Đi với lượng từ 'few' luôn dùng 'SO' -> 'so few copies that...'."
    },
    {
        "q": "The injured reporter stood up and smiled as though nothing bad _______ to him.",
        "opts": ["had happened", "happens", "is happening", "will happen"],
        "ans": "A",
        "exp": "Sự việc chấn thương đã xảy ra rồi, nhưng cười như thể chưa có chuyện gì xảy ra -> dùng 'had happened'."
    },
    {
        "q": "It was _______ popular a video that it attracted ten million views within forty-eight hours.",
        "opts": ["such", "too", "so", "very"],
        "ans": "C",
        "exp": "Cấu trúc đảo ngữ tính từ với SO: 'so + adj (popular) + a/an + Noun (video) + that' tương đương 'such a popular video that'."
    },
    {
        "q": "That young blogger spends money lavishly as if he _______ a multimillionaire.",
        "opts": ["were", "is", "has been", "can be"],
        "ans": "A",
        "exp": "Thực tế anh ta không phải triệu phú -> giả định hiện tại dùng 'as if he were'."
    },
    {
        "q": "The drama had _______ a dramatic ending that many viewers burst into tears.",
        "opts": ["so", "such", "too", "very"],
        "ans": "B",
        "exp": "'Ending' là danh từ đếm được số ít -> 'such + a + adj + Noun + that'."
    },
    {
        "q": "Everything happened during the live broadcast _______ we had carefully planned.",
        "opts": ["just as", "such as", "so that", "because"],
        "ans": "A",
        "exp": "'Just as we had carefully planned' = đúng như những gì chúng tôi đã lên kế hoạch tỉ mỉ."
    },
    {
        "q": "The news anchor had _______ little time to prepare that she felt quite nervous before going on air.",
        "opts": ["such", "too", "so", "such a"],
        "ans": "C",
        "exp": "Đi với lượng từ 'little' dùng 'so little time that...'."
    },
    {
        "q": "She talks as though she _______ everything about digital marketing, but actually she knows very little.",
        "opts": ["knew", "knows", "has known", "will know"],
        "ans": "A",
        "exp": "Thực tế cô ấy biết rất ít (she knows very little) -> giả định hiện tại lùi thì về quá khứ đơn 'knew'."
    },
    {
        "q": "The smartphone screen was _______ small that my grandfather had trouble reading the text.",
        "opts": ["such", "so", "such a", "as"],
        "ans": "B",
        "exp": "Cấu trúc: 'so + adj (small) + that + Clause'."
    },
    {
        "q": "Listen to his rough voice! It sounds as if he _______ a bad cold.",
        "opts": ["has", "had had", "were having", "would have"],
        "ans": "A",
        "exp": "Có bằng chứng thực tế từ giọng nói khàn đặc -> dùng thì hiện tại đơn 'has a cold', không lùi thì giả định."
    },
    {
        "q": "The journalist presented _______ compelling evidence that the judge immediately agreed.",
        "opts": ["so", "such", "such an", "too"],
        "ans": "B",
        "exp": "'Evidence' là danh từ không đếm được -> 'such + adj + N không đếm được + that'."
    },
    {
        "q": "Don't treat me as if I _______ a child; I am an eighteen-year-old student now!",
        "opts": ["am", "were", "will be", "have been"],
        "ans": "B",
        "exp": "Thực tế tôi 18 tuổi, không phải trẻ em -> sau 'as if' chia 'were' cho ngôi 'I'."
    },
    {
        "q": "It rained _______ heavily that all camera crew had to pack up their equipment.",
        "opts": ["such", "so", "too", "very"],
        "ans": "B",
        "exp": "'Rain so heavily that' (mưa to đến nỗi mà camera phải thu dọn máy móc)."
    },
    {
        "q": "They greeted the foreign reporter warmly as if they _______ him for a very long time.",
        "opts": ["had known", "know", "are knowing", "will know"],
        "ans": "A",
        "exp": "Trước đó chưa từng quen biết -> giả định trải nghiệm quá khứ dùng 'had known'."
    },
    {
        "q": "The Internet is _______ a powerful medium that it connects people across all continents.",
        "opts": ["so", "such", "too", "as"],
        "ans": "B",
        "exp": "'Medium' là danh từ số ít -> 'such + a + adj + N + that'."
    },
    {
        "q": "Please sit quietly and do _______ you are told while the red recording light is on.",
        "opts": ["so", "such", "as", "like as"],
        "ans": "C",
        "exp": "Mệnh đề chỉ cách thức: 'Do as you are told' = Làm theo như những gì con được dặn."
    },
    {
        "q": "The article about digital media was _______ interesting that I shared it with all my friends.",
        "opts": ["so", "such", "such an", "very"],
        "ans": "A",
        "exp": "'So + adj (interesting) + that + Clause'."
    },
    {
        "q": "He walked into the TV studio as though he _______ the owner of the network.",
        "opts": ["were", "is", "are", "has been"],
        "ans": "A",
        "exp": "Giả định trái thực tế ở hiện tại: 'as though he were the owner'."
    },
    {
        "q": "Social media has _______ great influence that it can change public opinion quickly.",
        "opts": ["so", "such", "such a", "too"],
        "ans": "B",
        "exp": "'Influence' trong trường hợp này là danh từ không đếm được -> dùng 'such + adj + N + that'."
    },
    {
        "q": "The politician answered questions smoothly as if he _______ the interview sheet in advance.",
        "opts": ["had received", "receives", "is receiving", "has received"],
        "ans": "A",
        "exp": "Giả định việc đã xảy ra trước cuộc phỏng vấn trong quá khứ -> dùng 'had received'."
    },
    {
        "q": "Our Internet connection was _______ slow that the live broadcast kept buffering.",
        "opts": ["such", "so", "such a", "very"],
        "ans": "B",
        "exp": "'So + adj (slow) + that'."
    },
    {
        "q": "She pronounced each English word clearly _______ her teacher had demonstrated.",
        "opts": ["as", "so", "such", "despite"],
        "ans": "A",
        "exp": "Mệnh đề cách thức: 'as her teacher had demonstrated' (như cô giáo đã làm mẫu)."
    },
    {
        "q": "They created _______ memorable commercials that everybody was humming the theme song.",
        "opts": ["so", "such a", "such", "too"],
        "ans": "C",
        "exp": "'Commercials' là danh từ số nhiều -> dùng 'such + adj + N số nhiều + that'."
    },
    {
        "q": "The teacher explained the complex theory as if it _______ the simplest thing in the world.",
        "opts": ["were", "is", "are", "will be"],
        "ans": "A",
        "exp": "Giả định hiện tại với as if: to-be dùng 'were' cho mọi ngôi."
    },
    {
        "q": "The stadium crowd cheered _______ loudly that the sports commentator could hardly be heard.",
        "opts": ["such", "so", "very", "too"],
        "ans": "B",
        "exp": "'So + adv (loudly) + that'."
    },
    {
        "q": "Water drops are falling on the window. It looks as if it _______ to rain harder.",
        "opts": ["is starting", "were starting", "had started", "would start"],
        "ans": "A",
        "exp": "Có giọt nước rơi trên cửa sổ (thực tế đang diễn ra) -> chia thì hiện tại tiếp diễn 'is starting'."
    }
]

for idx, item in enumerate(grammar_mixed_raw, 51):
    questions_data.append({
        "order": idx,
        "sectionName": "Ngữ pháp: Mệnh đề Cách thức & Kết quả (Trộn đều)",
        "content": f"Mark the letter A, B, C, or D to indicate the correct answer:\n\n**Question {idx}:** {item['q']}",
        "options": [
            {"id": "A", "text": item["opts"][0]},
            {"id": "B", "text": item["opts"][1]},
            {"id": "C", "text": item["opts"][2]},
            {"id": "D", "text": item["opts"][3]}
        ],
        "correctAnswer": item["ans"],
        "explanation": f"**Đáp án đúng: {item['ans']}**\n\n{item['exp']}"
    })

# ==============================================================================
# PHẦN 3: 10 CÂU ĐẢO NGỮ & BIẾN ĐỔI CÂU (CÂU 91 - 100)
# ==============================================================================

transform_raw = [
    {
        "q": "The headline was so sensational that everyone clicked on it.\nWhich sentence has the closest meaning?",
        "opts": [
            "So sensational was the headline that everyone clicked on it.",
            "So sensational the headline was that everyone clicked on it.",
            "Such sensational was the headline that everyone clicked on it.",
            "The headline was such sensational that everyone clicked on it."
        ],
        "ans": "A",
        "exp": "Đảo ngữ với SO đứng đầu câu: 'So + adj + be + S + that...' -> 'So sensational was the headline that everyone clicked on it.'"
    },
    {
        "q": "The media coverage was so extensive that everyone in the country knew about the scandal.\nWhich sentence has the closest meaning?",
        "opts": [
            "Such extensive was the media coverage that everyone knew it.",
            "Such was the extensive media coverage that everyone in the country knew about the scandal.",
            "So was the media coverage extensive that everyone knew it.",
            "Extensive was such media coverage that everyone knew it."
        ],
        "ans": "B",
        "exp": "Đảo ngữ với SUCH đứng đầu câu: 'Such + be + (adj) + Noun + that...' -> 'Such was the extensive media coverage that...'"
    },
    {
        "q": "The documentary was so boring that I fell asleep halfway through.\nWhich sentence has the closest meaning?",
        "opts": [
            "It was so boring documentary that I fell asleep halfway through.",
            "The documentary was such boring that I fell asleep halfway through.",
            "It was such a boring documentary that I fell asleep halfway through.",
            "It was too a boring documentary for me to fall asleep."
        ],
        "ans": "C",
        "exp": "Chuyển đổi kinh điển từ 'so...that' sang 'such...that': 'The documentary was so boring that...' = 'It was such a boring documentary that...'"
    },
    {
        "q": "Prime-time TV advertising is too expensive for small businesses to afford.\nWhich sentence has the closest meaning?",
        "opts": [
            "Prime-time TV advertising is such expensive that small businesses cannot afford it.",
            "Prime-time TV advertising is so expensive that small businesses cannot afford it.",
            "Prime-time TV advertising is not expensive enough for small businesses to afford it.",
            "Prime-time TV advertising is cheap enough for small businesses to afford."
        ],
        "ans": "B",
        "exp": "Công thức chuyển đổi: 'S + be + too + adj + to V' = 'S + be + so + adj + that + S + cannot + V'."
    },
    {
        "q": "The audio quality was not clear enough for us to understand the reporter's words.\nWhich sentence has the closest meaning?",
        "opts": [
            "The audio quality was so poor that we could not understand the reporter's words.",
            "The audio quality was such poor that we could understand the words.",
            "The audio quality was too clear for us to understand the words.",
            "The audio quality was so clear that we could not understand the words."
        ],
        "ans": "A",
        "exp": "Công thức chuyển từ 'not adj enough to V' sang 'so...that': âm thanh không đủ rõ = âm thanh quá tệ/rè đến nỗi không hiểu được."
    },
    {
        "q": "In fact, Nam is not an experienced journalist, but he acts like one.\nWhich sentence has the closest meaning?",
        "opts": [
            "Nam acts as if he is an experienced journalist.",
            "Nam acts as though he has been an experienced journalist.",
            "Nam acts as if he were an experienced journalist.",
            "Nam acted as if he would be an experienced journalist."
        ],
        "ans": "C",
        "exp": "Chuyển thực tế trái ngược hiện tại sang 'as if': Nam không phải nhà báo kỳ cựu nhưng cư xử như thể là -> dùng thức giả định 'as if he were'."
    },
    {
        "q": "He doesn't have a lot of money, but he spends money like a millionaire.\nWhich sentence has the closest meaning?",
        "opts": [
            "He spends money as if he were a millionaire.",
            "He spends money as if he is a millionaire.",
            "He spent money as if he had been a millionaire.",
            "He spends money as though he has a millionaire."
        ],
        "ans": "A",
        "exp": "Giả định trái ngược thực tế ở hiện tại: 'He spends money as if he were a millionaire'."
    },
    {
        "q": "The fake news spread so rapidly that the police could hardly control the public panic.\nWhich sentence has the closest meaning?",
        "opts": [
            "So rapidly the fake news spread that the police could hardly control it.",
            "Such rapidly did the fake news spread that the police could hardly control it.",
            "So rapidly did the fake news spread that the police could hardly control it.",
            "Rapidly so did the fake news spread that the police could hardly control it."
        ],
        "ans": "C",
        "exp": "Đảo ngữ với trạng từ đứng đầu câu: 'So + adv + trợ động từ (did) + S + V + that...' -> 'So rapidly did the fake news spread that...'"
    },
    {
        "q": "The music was so loud that we couldn't hear each other speak.\nWhich sentence has the closest meaning?",
        "opts": [
            "It was such loud music that we couldn't hear each other speak.",
            "It was such a loud music that we couldn't hear each other speak.",
            "The music was too loud for us to hear each other speak.",
            "Both A and C are correct."
        ],
        "ans": "D",
        "exp": "'Music' là danh từ không đếm được nên dùng 'such loud music that' (A đúng). Ngoài ra 'The music was too loud for us to hear' cũng đúng (C đúng). Do đó đáp án là D!"
    },
    {
        "q": "The news anchor reported the natural disaster accurately, exactly according to eyewitness accounts.\nWhich sentence has the closest meaning?",
        "opts": [
            "The news anchor reported the natural disaster just as eyewitnesses had described it.",
            "The news anchor reported the natural disaster so that eyewitnesses described it.",
            "The news anchor reported the natural disaster such as eyewitnesses described it.",
            "The news anchor reported the natural disaster as if eyewitnesses had not seen it."
        ],
        "ans": "A",
        "exp": "Dùng 'just as' (đúng như) để nối mệnh đề trạng ngữ chỉ cách thức diễn đạt sự việc đúng theo lời nhân chứng kể lại."
    }
]

for idx, item in enumerate(transform_raw, 91):
    questions_data.append({
        "order": idx,
        "sectionName": "Đảo ngữ & Viết lại câu chuẩn thi THPTQG",
        "content": f"Mark the letter A, B, C, or D to indicate the sentence that has the closest meaning to the original sentence:\n\n**Question {idx}:** {item['q']}",
        "options": [
            {"id": "A", "text": item["opts"][0]},
            {"id": "B", "text": item["opts"][1]},
            {"id": "C", "text": item["opts"][2]},
            {"id": "D", "text": item["opts"][3]}
        ],
        "correctAnswer": item["ans"],
        "explanation": f"**Đáp án đúng: {item['ans']}**\n\n{item['exp']}"
    })

payload = {
    "studentUsername": "nam_viet",
    "grade": 12,
    "assignedDate": "2026-11-11T00:00:00.000Z",
    "assessmentTitle": "Đấu trường 100 câu: 12 Từ Vựng Cốt Lõi & Mệnh Đề Trạng Ngữ Unit 7 (100 câu)",
    "timeLimitMinutes": 90,
    "questions": questions_data
}

target_file = ".agents/skills/teaching-english-curriculum/scripts/payload_eng12_unit7_namviet_100q.json"
with open(target_file, "w", encoding="utf-8") as f:
    json.dump(payload, f, ensure_ascii=False, indent=2)

print(f"Đã tạo payload JSON thành công với {len(questions_data)} câu hỏi tại {target_file}!")
