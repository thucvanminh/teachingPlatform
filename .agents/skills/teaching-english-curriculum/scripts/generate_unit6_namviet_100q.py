#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script generating the complete 100-question practice assessment payload
for Nam Việt (Unit 6: Artificial Intelligence - 16/11/2026).
"""

import json
import os

def create_payload():
    questions = []

    # Helper function to add question
    def add_q(order, section, stem, options, correct_id, explanation):
        assert len(options) == 4, f"Question {order} must have 4 options"
        opt_ids = [o["id"] for o in options]
        assert opt_ids == ["A", "B", "C", "D"], f"Question {order} options must be A, B, C, D"
        assert correct_id in opt_ids, f"Question {order} correct_id {correct_id} not in options"
        
        content = f"Mark the letter A, B, C, or D to indicate the correct answer:\n\n**Question {order}:** {stem}"
        questions.append({
            "order": order,
            "sectionName": section,
            "content": content,
            "options": options,
            "correctAnswer": correct_id,
            "explanation": explanation
        })

    # =========================================================================
    # PART I: 70 TỪ VỰNG CỐT LÕI (QUESTIONS 1 - 70)
    # =========================================================================

    # --- Section 1: Contextual Sentence Completion (Q1 - Q30) ---
    add_q(
        1, "Từ vựng ngữ cảnh",
        "Modern medical centers are utilizing _______ to help radiologists detect cancer cells with greater speed and accuracy.",
        [
            {"id": "A", "text": "artificial intelligence"},
            {"id": "B", "text": "standby mode"},
            {"id": "C", "text": "digital portfolio"},
            {"id": "D", "text": "repetitive task"}
        ],
        "A",
        "**Đáp án đúng: A (artificial intelligence)**\n\n- **Dịch nghĩa:** Các trung tâm y tế hiện đại đang ứng dụng trí tuệ nhân tạo (artificial intelligence) để giúp các bác sĩ X-quang phát hiện tế bào ung thư nhanh và chuẩn xác hơn.\n- **Phân tích:**\n  + A. artificial intelligence (n. phr.): trí tuệ nhân tạo (AI).\n  + B. standby mode: chế độ chờ.\n  + C. digital portfolio: hồ sơ năng lực số.\n  + D. repetitive task: công việc lặp đi lặp lại."
    )

    add_q(
        2, "Từ vựng ngữ cảnh",
        "If you have a quick question about admission fees, you can interact with the university's online _______ at any hour.",
        [
            {"id": "A", "text": "chatbot"},
            {"id": "B", "text": "milestone"},
            {"id": "C", "text": "maintenance"},
            {"id": "D", "text": "platform"}
        ],
        "A",
        "**Đáp án đúng: A (chatbot)**\n\n- **Dịch nghĩa:** Nếu bạn có câu hỏi nhanh về học phí tuyển sinh, bạn có thể tương tác với chatbot trực tuyến của trường đại học vào bất cứ giờ nào.\n- **Phân tích:** *chatbot* (n) là chương trình phần mềm đối thoại tự động để giải đáp thắc mắc người dùng 24/7."
    )

    add_q(
        3, "Từ vựng ngữ cảnh",
        "Automotive assembly plants rely heavily on _______ robotics capable of welding metal frames with sub-millimeter precision.",
        [
            {"id": "A", "text": "primitive"},
            {"id": "B", "text": "advanced"},
            {"id": "C", "text": "dependent"},
            {"id": "D", "text": "repetitive"}
        ],
        "B",
        "**Đáp án đúng: B (advanced)**\n\n- **Dịch nghĩa:** Các nhà máy lắp ráp ô tô phụ thuộc rất nhiều vào công nghệ robot tiên tiến (advanced robotics) có khả năng hàn khung kim loại với độ chính xác dưới một milimet.\n- **Phân tích:** *advanced* (adj) nghĩa là tiên tiến, cấp cao, hiện đại. Trái nghĩa: *primitive* (nguyên thủy)."
    )

    add_q(
        4, "Từ vựng ngữ cảnh",
        "Computer software engineers spent months writing code to _______ the robotic arm to handle fragile glassware safely.",
        [
            {"id": "A", "text": "programme"},
            {"id": "B", "text": "imitate"},
            {"id": "C", "text": "analyse"},
            {"id": "D", "text": "depend"}
        ],
        "A",
        "**Đáp án đúng: A (programme)**\n\n- **Dịch nghĩa:** Các kỹ sư phần mềm máy tính đã dành nhiều tháng viết mã để lập trình (programme) cánh tay robot xử lý các đồ thủy tinh dễ vỡ một cách an toàn.\n- **Phân tích:** Cấu trúc *programme someone/something to do sth* (lập trình ai/cái gì làm gì)."
    )

    add_q(
        5, "Từ vựng ngữ cảnh",
        "Powerful neural algorithms can _______ millions of consumer transactions in real time to spot fraudulent card activity.",
        [
            {"id": "A", "text": "imitate"},
            {"id": "B", "text": "standby"},
            {"id": "C", "text": "analyse"},
            {"id": "D", "text": "maintain"}
        ],
        "C",
        "**Đáp án đúng: C (analyse)**\n\n- **Dịch nghĩa:** Các thuật toán nơ-ron mạnh mẽ có thể phân tích (analyse) hàng triệu giao dịch của người tiêu dùng theo thời gian thực để phát hiện hành vi gian lận thẻ.\n- **Phân tích:** *analyse* (v): phân tích dữ liệu, thông tin."
    )

    add_q(
        6, "Từ vựng ngữ cảnh",
        "International airports have installed _______ gates where passengers simply look into a camera to verify their identity.",
        [
            {"id": "A", "text": "speech recognition"},
            {"id": "B", "text": "facial recognition"},
            {"id": "C", "text": "digital portfolio"},
            {"id": "D", "text": "standby mode"}
        ],
        "B",
        "**Đáp án đúng: B (facial recognition)**\n\n- **Dịch nghĩa:** Các sân bay quốc tế đã lắp đặt các cổng nhận diện khuôn mặt (facial recognition) nơi hành khách chỉ việc nhìn vào máy ảnh để xác minh danh tính.\n- **Phân tích:** Cụm từ *facial recognition* (nhận diện khuôn mặt) dùng camera nhận diện nét mặt; khác với *speech recognition* (nhận dạng giọng nói)."
    )

    add_q(
        7, "Từ vựng ngữ cảnh",
        "Virtual assistants on smartphones use sophisticated _______ software to understand various regional accents and dialects.",
        [
            {"id": "A", "text": "speech recognition"},
            {"id": "B", "text": "hands-on"},
            {"id": "C", "text": "conversational platform"},
            {"id": "D", "text": "hardware maintenance"}
        ],
        "A",
        "**Đáp án đúng: A (speech recognition)**\n\n- **Dịch nghĩa:** Trợ lý ảo trên điện thoại thông minh sử dụng phần mềm nhận dạng giọng nói (speech recognition) tinh vi để hiểu được nhiều chất giọng vùng miền khác nhau.\n- **Phân tích:** *speech recognition* (n. phr.): công nghệ nhận dạng và chuyển đổi giọng nói thành văn bản/lệnh."
    )

    add_q(
        8, "Từ vựng ngữ cảnh",
        "Graduating seniors are encouraged to create a _______ showcasing their coding projects, design mockups, and internships.",
        [
            {"id": "A", "text": "virtual tutor"},
            {"id": "B", "text": "standby mode"},
            {"id": "C", "text": "digital portfolio"},
            {"id": "D", "text": "repetitive cycle"}
        ],
        "C",
        "**Đáp án đúng: C (digital portfolio)**\n\n- **Dịch nghĩa:** Sinh viên sắp tốt nghiệp được khuyến khích tạo hồ sơ năng lực số (digital portfolio) trưng bày các dự án lập trình, bản vẽ thiết kế và kinh nghiệm thực tập.\n- **Phân tích:** *digital portfolio* (n. phr.): tập hồ sơ năng lực lưu trữ trực tuyến để ứng tuyển việc làm hoặc đại học."
    )

    add_q(
        9, "Từ vựng ngữ cảnh",
        "Whenever Linda struggles with calculus late at night, she turns to an AI-powered _______ for step-by-step guidance.",
        [
            {"id": "A", "text": "virtual tutor"},
            {"id": "B", "text": "autonomous vehicle"},
            {"id": "C", "text": "facial recognition"},
            {"id": "D", "text": "hardware maintenance"}
        ],
        "A",
        "**Đáp án đúng: A (virtual tutor)**\n\n- **Dịch nghĩa:** Bất cứ khi nào Linda gặp khó khăn với môn giải tích lúc đêm muộn, bạn ấy đều tìm đến gia sư ảo (virtual tutor) tích hợp AI để được hướng dẫn từng bước.\n- **Phân tích:** *virtual tutor* (n. phr.): gia sư ảo / trợ giảng trực tuyến hướng dẫn học sinh 24/7."
    )

    add_q(
        10, "Từ vựng ngữ cảnh",
        "Vocational engineering schools place a strong emphasis on _______ training so students can operate industrial machinery with confidence.",
        [
            {"id": "A", "text": "hands-on"},
            {"id": "B", "text": "repetitive"},
            {"id": "C", "text": "dependent"},
            {"id": "D", "text": "standby"}
        ],
        "A",
        "**Đáp án đúng: A (hands-on)**\n\n- **Dịch nghĩa:** Các trường kỹ thuật nghề chú trọng đặc biệt vào việc đào tạo thực hành thực tế (hands-on training) để học sinh có thể vận hành máy móc công nghiệp một cách tự tin.\n- **Phân tích:** *hands-on* (adj): thực hành trực tiếp, giàu tính thực tiễn; trái ngược với *theoretical* (lý thuyết)."
    )

    add_q(
        11, "Từ vựng ngữ cảnh",
        "Our high school transitioned to a cloud-based learning _______ that allows students to access lecture videos and submit homework seamlessly.",
        [
            {"id": "A", "text": "milestone"},
            {"id": "B", "text": "platform"},
            {"id": "C", "text": "chatbot"},
            {"id": "D", "text": "maintenance"}
        ],
        "B",
        "**Đáp án đúng: B (platform)**\n\n- **Dịch nghĩa:** Trường trung học của chúng tôi đã chuyển sang một nền tảng học tập đám mây (learning platform) cho phép học sinh xem video bài giảng và nộp bài tập một cách liền mạch.\n- **Phân tích:** *platform* (n): nền tảng phần mềm/công nghệ."
    )

    add_q(
        12, "Từ vựng ngữ cảnh",
        "One major advantage of educational technology is _______, which tailors lesson pace and difficulty to each learner's unique strengths.",
        [
            {"id": "A", "text": "speech recognition"},
            {"id": "B", "text": "personalised learning"},
            {"id": "C", "text": "standby mode"},
            {"id": "D", "text": "repetitive routine"}
        ],
        "B",
        "**Đáp án đúng: B (personalised learning)**\n\n- **Dịch nghĩa:** Một ưu điểm lớn của công nghệ giáo dục là việc học tập cá nhân hoá (personalised learning), giúp điều chỉnh tốc độ và độ khó của bài học theo thế mạnh riêng của từng người học.\n- **Phân tích:** *personalised learning* (n. phr.): học tập được cá nhân hóa theo năng lực cá nhân."
    )

    add_q(
        13, "Từ vựng ngữ cảnh",
        "Businesses are adopting _______ to create virtual sales agents that answer complex buyer questions with human-like empathy.",
        [
            {"id": "A", "text": "conversational AI"},
            {"id": "B", "text": "digital portfolio"},
            {"id": "C", "text": "standby battery"},
            {"id": "D", "text": "facial recognition"}
        ],
        "A",
        "**Đáp án đúng: A (conversational AI)**\n\n- **Dịch nghĩa:** Các doanh nghiệp đang áp dụng trí tuệ nhân tạo đàm thoại (conversational AI) để tạo ra các nhân viên bán hàng ảo giải đáp thắc mắc phức tạp của người mua với sự thấu cảm như con người.\n- **Phân tích:** *conversational AI* (n. phr.): AI hội thoại có khả năng đối thoại tự nhiên."
    )

    add_q(
        14, "Từ vựng ngữ cảnh",
        "Electric _______ cars equipped with LIDAR and radar sensors are expected to reduce traffic collisions caused by human error.",
        [
            {"id": "A", "text": "autonomous"},
            {"id": "B", "text": "dependent"},
            {"id": "C", "text": "repetitive"},
            {"id": "D", "text": "hands-on"}
        ],
        "A",
        "**Đáp án đúng: A (autonomous)**\n\n- **Dịch nghĩa:** Xe ô tô tự hành (autonomous cars) chạy điện trang bị cảm biến LIDAR và radar được kỳ vọng sẽ làm giảm các vụ va chạm giao thông do lỗi con người gây ra.\n- **Phân tích:** *autonomous* (adj): tự hành, tự trị, không cần người lái. Đồng nghĩa: *self-driving*."
    )

    add_q(
        15, "Từ vựng ngữ cảnh",
        "AI-powered automation relieves workers from _______ factory chores, giving them time to focus on creative problem-solving.",
        [
            {"id": "A", "text": "autonomous"},
            {"id": "B", "text": "repetitive"},
            {"id": "C", "text": "hands-on"},
            {"id": "D", "text": "advanced"}
        ],
        "B",
        "**Đáp án đúng: B (repetitive)**\n\n- **Dịch nghĩa:** Tự động hóa tích hợp AI giải phóng người lao động khỏi các công việc nhàm chán lặp đi lặp lại (repetitive chores) ở nhà máy, cho họ thời gian tập trung vào giải quyết vấn đề sáng tạo.\n- **Phân tích:** *repetitive* (adj): lặp đi lặp lại đơn điệu."
    )

    add_q(
        16, "Từ vựng ngữ cảnh",
        "Educators warn that high school students should not become completely _______ spell checkers and AI writing generators.",
        [
            {"id": "A", "text": "dependent on"},
            {"id": "B", "text": "advanced in"},
            {"id": "C", "text": "capable of"},
            {"id": "D", "text": "proud of"}
        ],
        "A",
        "**Đáp án đúng: A (dependent on)**\n\n- **Dịch nghĩa:** Các nhà giáo dục cảnh báo rằng học sinh THPT không nên trở nên hoàn toàn lệ thuộc vào (dependent on) phần mềm sửa lỗi chính tả và các công cụ tạo văn bản bằng AI.\n- **Phân tích:** Cụm tính từ đi với giới từ: *dependent on/upon sth* (lệ thuộc vào cái gì). Trái nghĩa: *independent of*."
    )

    add_q(
        17, "Từ vựng ngữ cảnh",
        "Skipping regular preventive _______ on server cooling units can lead to catastrophic hardware overheating and data loss.",
        [
            {"id": "A", "text": "milestone"},
            {"id": "B", "text": "maintenance"},
            {"id": "C", "text": "chatbot"},
            {"id": "D", "text": "platform"}
        ],
        "B",
        "**Đáp án đúng: B (maintenance)**\n\n- **Dịch nghĩa:** Bỏ qua việc bảo trì phòng ngừa định kỳ (preventive maintenance) cho các hệ thống làm mát máy chủ có thể dẫn đến việc phần cứng quá nhiệt nghiêm trọng và mất dữ liệu.\n- **Phân tích:** *maintenance* (n): sự bảo trì, bảo dưỡng máy móc."
    )

    add_q(
        18, "Từ vựng ngữ cảnh",
        "When the smart conference monitor is not receiving video signals for five minutes, it automatically shifts into _______ to conserve electricity.",
        [
            {"id": "A", "text": "standby mode"},
            {"id": "B", "text": "digital portfolio"},
            {"id": "C", "text": "conversational AI"},
            {"id": "D", "text": "facial recognition"}
        ],
        "A",
        "**Đáp án đúng: A (standby mode)**\n\n- **Dịch nghĩa:** Khi màn hình hội nghị thông minh không nhận tín hiệu video trong năm phút, nó sẽ tự động chuyển sang chế độ chờ (standby mode) để tiết kiệm điện năng.\n- **Phân tích:** *standby mode* (n. phr.): chế độ chờ sẵn sàng hoạt động của thiết bị điện tử."
    )

    add_q(
        19, "Từ vựng ngữ cảnh",
        "Humanoid robots developed by robotics institutes are engineered to _______ human facial gestures such as smiling and nodding.",
        [
            {"id": "A", "text": "imitate"},
            {"id": "B", "text": "programme"},
            {"id": "C", "text": "analyse"},
            {"id": "D", "text": "depend"}
        ],
        "A",
        "**Đáp án đúng: A (imitate)**\n\n- **Dịch nghĩa:** Các robot hình người được phát triển bởi các viện nghiên cứu robot được chế tạo để bắt chước (imitate) các biểu cảm khuôn mặt của con người như mỉm cười và gật đầu.\n- **Phân tích:** *imitate* (v): bắt chước, mô phỏng. Đồng nghĩa: *mimic*."
    )

    add_q(
        20, "Từ vựng ngữ cảnh",
        "The historic victory of Deep Blue over world chess champion Garry Kasparov in 1997 marked a monumental _______ in computer science.",
        [
            {"id": "A", "text": "chatbot"},
            {"id": "B", "text": "milestone"},
            {"id": "C", "text": "maintenance"},
            {"id": "D", "text": "standby"}
        ],
        "B",
        "**Đáp án đúng: B (milestone)**\n\n- **Dịch nghĩa:** Chiến thắng lịch sử của siêu máy tính Deep Blue trước nhà vô địch cờ vua thế giới Garry Kasparov vào năm 1997 đã đánh dấu một cột mốc quan trọng (monumental milestone) trong ngành khoa học máy tính.\n- **Phân tích:** Cụm collocations kinh điển: *mark a milestone* (đánh dấu một cột mốc lịch sử/bước ngoặt)."
    )

    add_q(
        21, "Từ vựng ngữ cảnh",
        "E-commerce websites use smart _______ to guide shoppers through checkout, recommend matching accessories, and process refunds.",
        [
            {"id": "A", "text": "chatbots"},
            {"id": "B", "text": "milestones"},
            {"id": "C", "text": "standbys"},
            {"id": "D", "text": "portfolios"}
        ],
        "A",
        "**Đáp án đúng: A (chatbots)**\n\n- **Dịch nghĩa:** Các trang thương mại điện tử sử dụng chatbot thông minh để hướng dẫn người mua thanh toán, gợi ý phụ kiện phù hợp và xử lý hoàn tiền.\n- **Phân tích:** *chatbots* (danh từ số nhiều) phù hợp ngữ cảnh hướng dẫn mua sắm tự động."
    )

    add_q(
        22, "Từ vựng ngữ cảnh",
        "Many digital banking apps now employ _______ scans, meaning customers can log in securely using just their face.",
        [
            {"id": "A", "text": "facial recognition"},
            {"id": "B", "text": "virtual tutor"},
            {"id": "C", "text": "conversational AI"},
            {"id": "D", "text": "digital portfolio"}
        ],
        "A",
        "**Đáp án đúng: A (facial recognition)**\n\n- **Dịch nghĩa:** Nhiều ứng dụng ngân hàng số hiện nay áp dụng quét nhận diện khuôn mặt (facial recognition scans), nghĩa là khách hàng có thể đăng nhập an toàn chỉ bằng khuôn mặt của mình.\n- **Phân tích:** *facial recognition* (nhận diện khuôn mặt) dùng cho sinh trắc học bảo mật."
    )

    add_q(
        23, "Từ vựng ngữ cảnh",
        "The foreign language learning application incorporates _______ so that learners receive immediate feedback on their vowel sounds.",
        [
            {"id": "A", "text": "speech recognition"},
            {"id": "B", "text": "repetitive chore"},
            {"id": "C", "text": "standby mode"},
            {"id": "D", "text": "hardware maintenance"}
        ],
        "A",
        "**Đáp án đúng: A (speech recognition)**\n\n- **Dịch nghĩa:** Ứng dụng học ngoại ngữ tích hợp nhận dạng giọng nói (speech recognition) để người học nhận được phản hồi tức thì về các nguyên âm của họ.\n- **Phân tích:** *speech recognition* (nhận dạng giọng nói) kiểm tra độ chính xác phát âm."
    )

    add_q(
        24, "Từ vựng ngữ cảnh",
        "Architects and graphic designers maintain a dynamic _______ online so prospective clients can review past project blueprints anytime.",
        [
            {"id": "A", "text": "standby mode"},
            {"id": "B", "text": "digital portfolio"},
            {"id": "C", "text": "virtual tutor"},
            {"id": "D", "text": "milestone"}
        ],
        "B",
        "**Đáp án đúng: B (digital portfolio)**\n\n- **Dịch nghĩa:** Các kiến trúc sư và nhà thiết kế đồ họa duy trì một hồ sơ năng lực số (digital portfolio) trực tuyến để khách hàng tiềm năng có thể xem các bản vẽ dự án trước đây bất cứ lúc nào.\n- **Phân tích:** *digital portfolio* (hồ sơ năng lực kỹ thuật số) để trưng bày các tác phẩm/sản phẩm."
    )

    add_q(
        25, "Từ vựng ngữ cảnh",
        "Modern curriculum developers believe that _______ allows gifted pupils to accelerate while giving remedial students the extra time they need.",
        [
            {"id": "A", "text": "autonomous vehicle"},
            {"id": "B", "text": "personalised learning"},
            {"id": "C", "text": "standby mode"},
            {"id": "D", "text": "hardware maintenance"}
        ],
        "B",
        "**Đáp án đúng: B (personalised learning)**\n\n- **Dịch nghĩa:** Các nhà phát triển chương trình học hiện đại tin rằng việc học cá nhân hoá (personalised learning) cho phép học sinh năng khiếu bứt phá tiến độ trong khi vẫn cho học sinh cần phụ đạo thời gian cần thiết.\n- **Phân tích:** *personalised learning* (học tập cá nhân hóa)."
    )

    add_q(
        26, "Từ vựng ngữ cảnh",
        "In smart agriculture, _______ tractors navigate expansive crop fields via GPS coordinates, planting seeds with zero human driver involvement.",
        [
            {"id": "A", "text": "autonomous"},
            {"id": "B", "text": "dependent"},
            {"id": "C", "text": "repetitive"},
            {"id": "D", "text": "theoretical"}
        ],
        "A",
        "**Đáp án đúng: A (autonomous)**\n\n- **Dịch nghĩa:** Trong nông nghiệp thông minh, máy kéo tự hành (autonomous tractors) di chuyển trên những cánh đồng rộng lớn qua tọa độ GPS, gieo hạt mà không cần người lái.\n- **Phân tích:** *autonomous* (tự hành, không người lái)."
    )

    add_q(
        27, "Từ vựng ngữ cảnh",
        "Sorting packages by postal code is a tedious and _______ task that is now handled effortlessly by robotic barcode scanners.",
        [
            {"id": "A", "text": "repetitive"},
            {"id": "B", "text": "autonomous"},
            {"id": "C", "text": "hands-on"},
            {"id": "D", "text": "independent"}
        ],
        "A",
        "**Đáp án đúng: A (repetitive)**\n\n- **Dịch nghĩa:** Phân loại bưu kiện theo mã bưu chính là một công việc tẻ nhạt và lặp đi lặp lại (tedious and repetitive task) mà hiện nay đã được các máy quét mã vạch bằng robot xử lý một cách dễ dàng.\n- **Phân tích:** *tedious and repetitive* là cặp từ thường đi liền nhau miêu tả công việc đơn điệu, nhàm chán."
    )

    add_q(
        28, "Từ vựng ngữ cảnh",
        "Instead of powering down the desktop computer entirely, John left it in _______ so his large video file could finish downloading overnight.",
        [
            {"id": "A", "text": "standby mode"},
            {"id": "B", "text": "digital portfolio"},
            {"id": "C", "text": "virtual tutor"},
            {"id": "D", "text": "speech recognition"}
        ],
        "A",
        "**Đáp án đúng: A (standby mode)**\n\n- **Dịch nghĩa:** Thay vì tắt máy tính để bàn hoàn toàn, John đã để nó ở chế độ chờ (standby mode) để tệp video dung lượng lớn có thể tải xong qua đêm.\n- **Phân tích:** *in standby mode* (ở chế độ chờ)."
    )

    add_q(
        29, "Từ vựng ngữ cảnh",
        "A fleet of electric delivery vans requires routine mechanical _______ to ensure battery health and tyre safety throughout the year.",
        [
            {"id": "A", "text": "maintenance"},
            {"id": "B", "text": "milestone"},
            {"id": "C", "text": "chatbot"},
            {"id": "D", "text": "portfolio"}
        ],
        "A",
        "**Đáp án đúng: A (maintenance)**\n\n- **Dịch nghĩa:** Một đội xe van giao hàng chạy điện đòi hỏi việc bảo trì cơ khí định kỳ (routine mechanical maintenance) để đảm bảo tuổi thọ pin và an toàn lốp xe trong suốt cả năm.\n- **Phân tích:** *routine maintenance* (bảo trì định kỳ)."
    )

    add_q(
        30, "Từ vựng ngữ cảnh",
        "Parrots are famous for their remarkable ability to _______ household sounds like ringing telephones and microwave beeps.",
        [
            {"id": "A", "text": "imitate"},
            {"id": "B", "text": "programme"},
            {"id": "C", "text": "analyse"},
            {"id": "D", "text": "maintain"}
        ],
        "A",
        "**Đáp án đúng: A (imitate)**\n\n- **Dịch nghĩa:** Loài vẹt nổi tiếng với khả năng phi thường trong việc bắt chước (imitate) các âm thanh trong nhà như tiếng chuông điện thoại và tiếng bíp lò vi sóng.\n- **Phân tích:** *imitate* (v): bắt chước tiếng kêu/âm thanh."
    )

    # --- Section 2: Word Formation & Derivatives (Q31 - Q45) ---
    add_q(
        31, "Cấu tạo từ (Word Formation)",
        "The laboratory technicians carried out a thorough statistical _______ of the chemical compound samples.",
        [
            {"id": "A", "text": "analyse"},
            {"id": "B", "text": "analysis"},
            {"id": "C", "text": "analyst"},
            {"id": "D", "text": "analytical"}
        ],
        "B",
        "**Đáp án đúng: B (analysis)**\n\n- **Dịch nghĩa:** Các kỹ thuật viên phòng thí nghiệm đã tiến hành một cuộc phân tích thống kê kỹ lưỡng (statistical analysis) các mẫu hợp chất hóa học.\n- **Phân tích:** Sau tính từ *statistical* cần một danh từ chỉ sự việc (*analysis*). *Analyst* là nhà phân tích (người), *analyse* là động từ."
    )

    add_q(
        32, "Cấu tạo từ (Word Formation)",
        "Data scientists must possess strong _______ skills in order to interpret complex algorithmic trends accurately.",
        [
            {"id": "A", "text": "analytically"},
            {"id": "B", "text": "analytical"},
            {"id": "C", "text": "analyse"},
            {"id": "D", "text": "analysis"}
        ],
        "B",
        "**Đáp án đúng: B (analytical)**\n\n- **Dịch nghĩa:** Các nhà khoa học dữ liệu phải sở hữu kỹ năng phân tích (analytical skills) vững vàng để diễn giải chính xác các xu hướng thuật toán phức tạp.\n- **Phân tích:** Đứng trước danh từ *skills* cần một tính từ (*analytical*)."
    )

    add_q(
        33, "Cấu tạo từ (Word Formation)",
        "The young comedian delighted the audience with his hilarious _______ of famous political figures.",
        [
            {"id": "A", "text": "imitation"},
            {"id": "B", "text": "imitate"},
            {"id": "C", "text": "imitative"},
            {"id": "D", "text": "imitator"}
        ],
        "A",
        "**Đáp án đúng: A (imitation)**\n\n- **Dịch nghĩa:** Diễn viên hài trẻ đã làm khán giả thích thú với màn bắt chước (imitation) hài hước các nhân vật chính trị gia nổi tiếng.\n- **Phân tích:** Sau tính từ sở hữu *his* và tính từ *hilarious* cần một danh từ chỉ sự bắt chước (*imitation*)."
    )

    add_q(
        34, "Cấu tạo từ (Word Formation)",
        "Babies develop their earliest communication cues through _______ gestures observed from their caretakers.",
        [
            {"id": "A", "text": "imitate"},
            {"id": "B", "text": "imitation"},
            {"id": "C", "text": "imitative"},
            {"id": "D", "text": "imitatingly"}
        ],
        "C",
        "**Đáp án đúng: C (imitative)**\n\n- **Dịch nghĩa:** Trẻ sơ sinh phát triển những tín hiệu giao tiếp sớm nhất thông qua các cử chỉ mang tính bắt chước (imitative gestures) quan sát được từ người chăm sóc.\n- **Phân tích:** Đứng trước danh từ *gestures* cần một tính từ (*imitative* - có tính bắt chước, mô phỏng)."
    )

    add_q(
        35, "Cấu tạo từ (Word Formation)",
        "Upon graduating from university, many young adults seek financial _______ so they no longer rely on their parents.",
        [
            {"id": "A", "text": "depend"},
            {"id": "B", "text": "dependent"},
            {"id": "C", "text": "independence"},
            {"id": "D", "text": "dependably"}
        ],
        "C",
        "**Đáp án đúng: C (independence)**\n\n- **Dịch nghĩa:** Sau khi tốt nghiệp đại học, nhiều thanh niên tìm kiếm sự độc lập về tài chính (financial independence) để không còn phải phụ thuộc vào cha mẹ.\n- **Phân tích:** Cụm từ *financial independence* (sự tự chủ/độc lập về tài chính). Cần danh từ sau tính từ *financial*."
    )

    add_q(
        36, "Cấu tạo từ (Word Formation)",
        "Autonomous driving sensors must be highly _______ in heavy rain, dense fog, and snowstorms.",
        [
            {"id": "A", "text": "depend"},
            {"id": "B", "text": "dependable"},
            {"id": "C", "text": "dependence"},
            {"id": "D", "text": "dependably"}
        ],
        "B",
        "**Đáp án đúng: B (dependable)**\n\n- **Dịch nghĩa:** Các cảm biến lái xe tự hành phải có độ tin cậy rất cao (highly dependable) trong điều kiện mưa to, sương mù dày đặc và bão tuyết.\n- **Phân tích:** Sau trạng từ *highly* và động từ liên kết *must be* cần một tính từ mang nghĩa 'đáng tin cậy' (*dependable* = *reliable*)."
    )

    add_q(
        37, "Cấu tạo từ (Word Formation)",
        "The building manager explained that the high elevator repair fees were caused by years of poor _______.",
        [
            {"id": "A", "text": "maintain"},
            {"id": "B", "text": "maintained"},
            {"id": "C", "text": "maintenance"},
            {"id": "D", "text": "maintainable"}
        ],
        "C",
        "**Đáp án đúng: C (maintenance)**\n\n- **Dịch nghĩa:** Quản lý tòa nhà giải thích rằng chi phí sửa chữa thang máy cao là do nhiều năm bảo trì kém (poor maintenance).\n- **Phân tích:** Sau tính từ *poor* cần danh từ (*maintenance*). Chú ý chính tả *maintenance* (không viết *maintainance*)."
    )

    add_q(
        38, "Cấu tạo từ (Word Formation)",
        "The pioneering computer scientist gained worldwide _______ for proposing the theoretical foundation of machine learning.",
        [
            {"id": "A", "text": "recognise"},
            {"id": "B", "text": "recognition"},
            {"id": "C", "text": "recognisable"},
            {"id": "D", "text": "recognisably"}
        ],
        "B",
        "**Đáp án đúng: B (recognition)**\n\n- **Dịch nghĩa:** Nhà khoa học máy tính tiên phong đã nhận được sự công nhận trên toàn thế giới (worldwide recognition) vì đã đề xuất nền tảng lý thuyết của học máy.\n- **Phân tích:** Sau tính từ *worldwide* cần danh từ (*recognition*). Cụm *gain worldwide recognition* (được thế giới công nhận)."
    )

    add_q(
        39, "Cấu tạo từ (Word Formation)",
        "Even with sunglasses and a mask on, the famous pop singer was instantly _______ to her loyal fans.",
        [
            {"id": "A", "text": "recognise"},
            {"id": "B", "text": "recognisable"},
            {"id": "C", "text": "recognition"},
            {"id": "D", "text": "recognisably"}
        ],
        "B",
        "**Đáp án đúng: B (recognisable)**\n\n- **Dịch nghĩa:** Dù đeo kính râm và khẩu trang, nữ ca sĩ nhạc pop nổi tiếng vẫn dễ dàng được nhận ra (instantly recognisable) bởi những người hâm mộ trung thành của mình.\n- **Phân tích:** Sau *was instantly* (to be + adv) cần tính từ (*recognisable* = có thể nhận ra được)."
    )

    add_q(
        40, "Cấu tạo từ (Word Formation)",
        "Online learning platforms offer _______ lesson modules that adapt automatically based on students' quiz scores.",
        [
            {"id": "A", "text": "person"},
            {"id": "B", "text": "personality"},
            {"id": "C", "text": "personalised"},
            {"id": "D", "text": "personally"}
        ],
        "C",
        "**Đáp án đúng: C (personalised)**\n\n- **Dịch nghĩa:** Các nền tảng học tập trực tuyến cung cấp các học phần bài học được cá nhân hóa (personalised lesson modules) có thể tự động thích ứng dựa trên điểm bài kiểm tra của học sinh.\n- **Phân tích:** Cần tính từ dạng phân từ (*personalised*) bổ nghĩa cho cụm danh từ *lesson modules*."
    )

    add_q(
        41, "Cấu tạo từ (Word Formation)",
        "The extreme _______ of online news feeds can trap readers inside biased echo chambers.",
        [
            {"id": "A", "text": "personalise"},
            {"id": "B", "text": "personalisation"},
            {"id": "C", "text": "personalised"},
            {"id": "D", "text": "personally"}
        ],
        "B",
        "**Đáp án đúng: B (personalisation)**\n\n- **Dịch nghĩa:** Việc cá nhân hóa quá mức (extreme personalisation) các nguồn cấp tin tức trực tuyến có thể nhốt người đọc vào các buồng tiếng vang định kiến.\n- **Phân tích:** Sau mạo từ *The* và tính từ *extreme* cần một danh từ (*personalisation* - sự cá nhân hóa)."
    )

    add_q(
        42, "Cấu tạo từ (Word Formation)",
        "The educational robotics kit includes _______ microcontrollers that students can code using Python or block diagrams.",
        [
            {"id": "A", "text": "programme"},
            {"id": "B", "text": "programmer"},
            {"id": "C", "text": "programmable"},
            {"id": "D", "text": "programmatically"}
        ],
        "C",
        "**Đáp án đúng: C (programmable)**\n\n- **Dịch nghĩa:** Bộ kit robot giáo dục bao gồm các bộ vi điều khiển có thể lập trình được (programmable microcontrollers) mà học sinh có thể viết mã bằng Python hoặc sơ đồ khối.\n- **Phân tích:** Trước danh từ *microcontrollers* cần tính từ chỉ khả năng (*programmable* = có thể lập trình được)."
    )

    add_q(
        43, "Cấu tạo từ (Word Formation)",
        "Mastering pronunciation requires constant practice and the careful _______ of phoneme drills.",
        [
            {"id": "A", "text": "repetition"},
            {"id": "B", "text": "repeat"},
            {"id": "C", "text": "repetitive"},
            {"id": "D", "text": "repetitively"}
        ],
        "A",
        "**Đáp án đúng: A (repetition)**\n\n- **Dịch nghĩa:** Việc làm chủ phát âm đòi hỏi sự luyện tập liên tục và sự lặp lại cẩn thận (careful repetition) các bài tập luyện âm vị.\n- **Phân tích:** Sau mạo từ *the* và tính từ *careful* cần danh từ (*repetition* - sự lặp lại)."
    )

    add_q(
        44, "Cấu tạo từ (Word Formation)",
        "The robotic cleaner navigates _______ through living rooms by mapping obstacles with infrared sensors.",
        [
            {"id": "A", "text": "autonomous"},
            {"id": "B", "text": "autonomy"},
            {"id": "C", "text": "autonomously"},
            {"id": "D", "text": "autonomic"}
        ],
        "C",
        "**Đáp án đúng: C (autonomously)**\n\n- **Dịch nghĩa:** Máy hút bụi robot di chuyển một cách tự động/tự hành (autonomously) qua các phòng khách bằng cách lập bản đồ chướng ngại vật bằng cảm biến hồng ngoại.\n- **Phân tích:** Bổ nghĩa cho động từ *navigates* cần một trạng từ (*autonomously*)."
    )

    add_q(
        45, "Cấu tạo từ (Word Formation)",
        "University professors encourage students to exercise intellectual _______ rather than blindly memorising lecture slides.",
        [
            {"id": "A", "text": "autonomy"},
            {"id": "B", "text": "autonomous"},
            {"id": "C", "text": "autonomously"},
            {"id": "D", "text": "autonomic"}
        ],
        "A",
        "**Đáp án đúng: A (autonomy)**\n\n- **Dịch nghĩa:** Các giáo sư đại học khuyến khích sinh viên rèn luyện sự tự chủ về trí tuệ (intellectual autonomy) thay vì học vẹt một cách mù quáng các trang trình chiếu bài giảng.\n- **Phân tích:** Sau tính từ *intellectual* cần danh từ (*autonomy* - sự tự chủ, độc lập)."
    )

    # --- Section 3: Closest in Meaning / Synonyms (Q46 - Q55) ---
    add_q(
        46, "Từ đồng nghĩa (Closest in Meaning)",
        "The hospital recently invested in **advanced** diagnostic imaging devices to detect heart conditions earlier.",
        [
            {"id": "A", "text": "cutting-edge"},
            {"id": "B", "text": "outdated"},
            {"id": "C", "text": "primitive"},
            {"id": "D", "text": "imitative"}
        ],
        "A",
        "**Đáp án đúng: A (cutting-edge)**\n\n- **Dịch nghĩa:** Bệnh viện gần đây đã đầu tư vào các thiết bị chẩn đoán hình ảnh tiên tiến (advanced) để phát hiện bệnh tim sớm hơn.\n- **Phân tích:** *advanced* (tiên tiến, hiện đại) đồng nghĩa với *cutting-edge* (tối tân, hàng đầu). Các từ còn lại: *outdated* (lỗi thời), *primitive* (nguyên thủy)."
    )

    add_q(
        47, "Từ đồng nghĩa (Closest in Meaning)",
        "Humanoid robots are engineered to **imitate** human body language and facial expressions.",
        [
            {"id": "A", "text": "mimic"},
            {"id": "B", "text": "reject"},
            {"id": "C", "text": "neglect"},
            {"id": "D", "text": "destroy"}
        ],
        "A",
        "**Đáp án đúng: A (mimic)**\n\n- **Dịch nghĩa:** Robot hình người được thiết kế để bắt chước (imitate) ngôn ngữ cơ thể và biểu cảm khuôn mặt của con người.\n- **Phân tích:** *imitate* (bắt chước, mô phỏng) đồng nghĩa với *mimic*. *Reject* (từ chối), *neglect* (sao nhãng)."
    )

    add_q(
        48, "Từ đồng nghĩa (Closest in Meaning)",
        "Delivery drones fly along **autonomous** flight paths without direct human radio control.",
        [
            {"id": "A", "text": "manually steered"},
            {"id": "B", "text": "self-directed"},
            {"id": "C", "text": "heavily dependent"},
            {"id": "D", "text": "human-operated"}
        ],
        "B",
        "**Đáp án đúng: B (self-directed)**\n\n- **Dịch nghĩa:** Máy bay không người lái giao hàng bay theo các lộ trình bay tự hành (autonomous) mà không cần sự điều khiển vô tuyến trực tiếp của con người.\n- **Phân tích:** *autonomous* (tự chủ, tự hành) đồng nghĩa với *self-directed / self-governing*."
    )

    add_q(
        49, "Từ đồng nghĩa (Closest in Meaning)",
        "The chemistry teacher designed **hands-on** lab experiments so students could witness reactions firsthand.",
        [
            {"id": "A", "text": "practical"},
            {"id": "B", "text": "theoretical"},
            {"id": "C", "text": "passive"},
            {"id": "D", "text": "abstract"}
        ],
        "A",
        "**Đáp án đúng: A (practical)**\n\n- **Dịch nghĩa:** Giáo viên hóa học đã thiết kế các thí nghiệm thực hành thực tế (hands-on) để học sinh có thể tận mắt chứng kiến các phản ứng.\n- **Phân tích:** *hands-on* (thực tế, có trải nghiệm trực tiếp) đồng nghĩa với *practical* (thực tiễn). Trái nghĩa với *theoretical* (lý thuyết suông)."
    )

    add_q(
        50, "Từ đồng nghĩa (Closest in Meaning)",
        "Developing the first commercially viable quantum processor was considered a major **milestone** in computing history.",
        [
            {"id": "A", "text": "setback"},
            {"id": "B", "text": "landmark"},
            {"id": "C", "text": "obstacle"},
            {"id": "D", "text": "routine"}
        ],
        "B",
        "**Đáp án đúng: B (landmark)**\n\n- **Dịch nghĩa:** Phát triển bộ xử lý lượng tử thương mại khả thi đầu tiên được coi là một cột mốc quan trọng (major milestone) trong lịch sử điện toán.\n- **Phân tích:** *milestone* (cột mốc quan trọng, bước ngoặt) đồng nghĩa với *landmark / turning point*. *Setback* (sự thoái trào, trở ngại)."
    )

    add_q(
        51, "Từ đồng nghĩa (Closest in Meaning)",
        "The school selected a cloud-based **platform** to host digital textbooks and interactive assignments.",
        [
            {"id": "A", "text": "framework"},
            {"id": "B", "text": "roadblock"},
            {"id": "C", "text": "barrier"},
            {"id": "D", "text": "handicap"}
        ],
        "A",
        "**Đáp án đúng: A (framework)**\n\n- **Dịch nghĩa:** Nhà trường đã chọn một nền tảng (platform) dựa trên đám mây để lưu trữ sách giáo khoa số và bài tập tương tác.\n- **Phân tích:** *platform* (nền tảng công nghệ, hệ thống) gần nghĩa nhất với *framework / system*."
    )

    add_q(
        52, "Từ đồng nghĩa (Closest in Meaning)",
        "Factory workers complained about the **repetitive** motion required to pack hundreds of cartons every shift.",
        [
            {"id": "A", "text": "monotonous"},
            {"id": "B", "text": "stimulating"},
            {"id": "C", "text": "thrilling"},
            {"id": "D", "text": "variable"}
        ],
        "A",
        "**Đáp án đúng: A (monotonous)**\n\n- **Dịch nghĩa:** Các công nhân nhà máy phàn nàn về chuyển động lặp đi lặp lại đơn điệu (repetitive) khi phải đóng gói hàng trăm thùng hàng mỗi ca.\n- **Phân tích:** *repetitive* (lặp đi lặp lại gây chán) đồng nghĩa với *monotonous* (đơn điệu). *Stimulating* (kích thích hứng thú), *thrilling* (hồi hộp, kịch tính)."
    )

    add_q(
        53, "Từ đồng nghĩa (Closest in Meaning)",
        "Our economy has become increasingly **dependent on** imported semiconductors for tech manufacturing.",
        [
            {"id": "A", "text": "reliant on"},
            {"id": "B", "text": "indifferent to"},
            {"id": "C", "text": "unrelated to"},
            {"id": "D", "text": "immune to"}
        ],
        "A",
        "**Đáp án đúng: A (reliant on)**\n\n- **Dịch nghĩa:** Nền kinh tế của chúng ta ngày càng trở nên lệ thuộc vào (dependent on) chất bán dẫn nhập khẩu để sản xuất công nghệ.\n- **Phân tích:** *dependent on* (phụ thuộc vào) đồng nghĩa với *reliant on*."
    )

    add_q(
        54, "Từ đồng nghĩa (Closest in Meaning)",
        "Students engaged in a **virtual** tour of the solar system using virtual reality headsets.",
        [
            {"id": "A", "text": "simulated"},
            {"id": "B", "text": "tangible"},
            {"id": "C", "text": "physical"},
            {"id": "D", "text": "concrete"}
        ],
        "A",
        "**Đáp án đúng: A (simulated)**\n\n- **Dịch nghĩa:** Học sinh đã tham gia vào một chuyến tham quan ảo (virtual tour) hệ mặt trời bằng kính thực tế ảo.\n- **Phân tích:** *virtual* (ảo, mô phỏng qua máy tính) đồng nghĩa với *simulated*. Trái nghĩa với *tangible / physical / concrete* (hữu hình, thực tế)."
    )

    add_q(
        55, "Từ đồng nghĩa (Closest in Meaning)",
        "Statisticians were hired to **analyse** the customer survey feedback and highlight key pain points.",
        [
            {"id": "A", "text": "examine in detail"},
            {"id": "B", "text": "glance at"},
            {"id": "C", "text": "discard hastily"},
            {"id": "D", "text": "misinterpret"}
        ],
        "A",
        "**Đáp án đúng: A (examine in detail)**\n\n- **Dịch nghĩa:** Các nhà thống kê được thuê để phân tích (analyse) phản hồi khảo sát khách hàng và nêu bật các điểm vướng mắc chính.\n- **Phân tích:** *analyse* (phân tích) đồng nghĩa với *examine in detail* (xem xét, kiểm tra chi tiết)."
    )

    # --- Section 4: Opposite in Meaning / Antonyms (Q56 - Q63) ---
    add_q(
        56, "Từ trái nghĩa (Opposite in Meaning)",
        "The aviation academy emphasizes **hands-on** flight simulator training over purely textbook instruction.",
        [
            {"id": "A", "text": "theoretical"},
            {"id": "B", "text": "practical"},
            {"id": "C", "text": "realistic"},
            {"id": "D", "text": "experiential"}
        ],
        "A",
        "**Đáp án đúng: A (theoretical)**\n\n- **Dịch nghĩa:** Học viện hàng không nhấn mạnh việc đào tạo mô phỏng bay thực hành (hands-on) hơn là chỉ học lý thuyết trên sách giáo khoa thuần túy.\n- **Phân tích:** *hands-on* (thực tế, có trải nghiệm trực tiếp) trái nghĩa với *theoretical* (thuộc về lý thuyết sách vở)."
    )

    add_q(
        57, "Từ trái nghĩa (Opposite in Meaning)",
        "The military developed **advanced** radar countermeasures to jam incoming missile signals.",
        [
            {"id": "A", "text": "primitive"},
            {"id": "B", "text": "innovative"},
            {"id": "C", "text": "cutting-edge"},
            {"id": "D", "text": "sophisticated"}
        ],
        "A",
        "**Đáp án đúng: A (primitive)**\n\n- **Dịch nghĩa:** Quân đội đã phát triển các biện pháp đối phó radar tiên tiến (advanced) để gây nhiễu tín hiệu tên lửa đang bay tới.\n- **Phân tích:** *advanced* (tiên tiến, tinh vi) trái nghĩa với *primitive* (thô sơ, nguyên thủy, lạc hậu)."
    )

    add_q(
        58, "Từ trái nghĩa (Opposite in Meaning)",
        "The mining company deployed **autonomous** haul trucks that operate without any human in the driver's cabin.",
        [
            {"id": "A", "text": "manually operated"},
            {"id": "B", "text": "self-governing"},
            {"id": "C", "text": "automated"},
            {"id": "D", "text": "independent"}
        ],
        "A",
        "**Đáp án đúng: A (manually operated)**\n\n- **Dịch nghĩa:** Công ty khai thác mỏ đã triển khai xe tải tự hành (autonomous) vận hành mà không cần bất kỳ con người nào trong buồng lái.\n- **Phân tích:** *autonomous* (tự động, tự hành) trái nghĩa với *manually operated* (được vận hành thủ công bằng tay)."
    )

    add_q(
        59, "Từ trái nghĩa (Opposite in Meaning)",
        "Elderly patients often feel anxious when they become totally **dependent on** automated healthcare gadgets.",
        [
            {"id": "A", "text": "independent of"},
            {"id": "B", "text": "reliant on"},
            {"id": "C", "text": "subservient to"},
            {"id": "D", "text": "attached to"}
        ],
        "A",
        "**Đáp án đúng: A (independent of)**\n\n- **Dịch nghĩa:** Các bệnh nhân cao tuổi thường cảm thấy lo lắng khi họ trở nên hoàn toàn phụ thuộc vào (dependent on) các thiết bị y tế tự động.\n- **Phân tích:** *dependent on* (phụ thuộc vào) trái nghĩa với *independent of* (độc lập, không phụ thuộc vào)."
    )

    add_q(
        60, "Từ trái nghĩa (Opposite in Meaning)",
        "Doing **repetitive** data entry for eight hours a day can quickly dull a young employee's creativity.",
        [
            {"id": "A", "text": "varied"},
            {"id": "B", "text": "monotonous"},
            {"id": "C", "text": "recurring"},
            {"id": "D", "text": "tedious"}
        ],
        "A",
        "**Đáp án đúng: A (varied)**\n\n- **Dịch nghĩa:** Làm công việc nhập dữ liệu lặp đi lặp lại (repetitive) tám tiếng một ngày có thể nhanh chóng làm cùn mòn sự sáng tạo của một nhân viên trẻ.\n- **Phân tích:** *repetitive* (lặp đi lặp lại đơn điệu) trái nghĩa với *varied* (đa dạng, phong phú nhiều màu sắc)."
    )

    add_q(
        61, "Từ trái nghĩa (Opposite in Meaning)",
        "Original thinkers strive to innovate rather than merely **imitate** existing marketplace products.",
        [
            {"id": "A", "text": "originate"},
            {"id": "B", "text": "mimic"},
            {"id": "C", "text": "copy"},
            {"id": "D", "text": "duplicate"}
        ],
        "A",
        "**Đáp án đúng: A (originate)**\n\n- **Dịch nghĩa:** Những người có tư duy độc lập phấn đấu đổi mới sáng tạo thay vì chỉ đơn thuần bắt chước (imitate) các sản phẩm hiện có trên thị trường.\n- **Phân tích:** *imitate* (bắt chước, sao chép) trái nghĩa với *originate* (khởi xướng, sáng tạo ra nguồn cội mới)."
    )

    add_q(
        62, "Từ trái nghĩa (Opposite in Meaning)",
        "During lockdown, students attended **virtual** classrooms instead of gathering on campus.",
        [
            {"id": "A", "text": "physical"},
            {"id": "B", "text": "simulated"},
            {"id": "C", "text": "digital"},
            {"id": "D", "text": "online"}
        ],
        "A",
        "**Đáp án đúng: A (physical)**\n\n- **Dịch nghĩa:** Trong thời gian phong tỏa, học sinh tham gia các lớp học ảo (virtual classrooms) thay vì tập trung trên khuôn viên trường.\n- **Phân tích:** *virtual* (ảo, trên mạng) trái nghĩa với *physical* (vật lý, trực tiếp ngoài đời thực)."
    )

    add_q(
        63, "Từ trái nghĩa (Opposite in Meaning)",
        "The beverage brand advertises that its juice contains no **artificial** coloring or synthetic flavors.",
        [
            {"id": "A", "text": "natural"},
            {"id": "B", "text": "man-made"},
            {"id": "C", "text": "chemical"},
            {"id": "D", "text": "fake"}
        ],
        "A",
        "**Đáp án đúng: A (natural)**\n\n- **Dịch nghĩa:** Thương hiệu đồ uống quảng cáo rằng nước ép của họ không chứa phẩm màu nhân tạo (artificial coloring) hay hương liệu tổng hợp.\n- **Phân tích:** *artificial* (nhân tạo, do con người chế tạo) trái nghĩa với *natural* (tự nhiên)."
    )

    # --- Section 5: Guided Cloze Passage on AI in Education (Q64 - Q70) ---
    passage_intro = (
        "**Read the following passage and mark the letter A, B, C, or D to choose the word or phrase that best fits each of the numbered blanks from 64 to 70:**\n\n"
        "Artificial intelligence is transforming high school education at an unprecedented pace. Modern schools are adopting cloud-based (64)_______ that bring learning resources straight to students' tablets. "
        "Through the power of AI, educators can now offer (65)_______, tailoring exercise difficulty and lesson speed to each teenager's progress. "
        "When studying at home, learners who encounter challenging calculus formulas or chemistry equations can consult an intelligent (66)_______ for step-by-step guidance. "
        "Furthermore, students can assemble their essays, lab reports, and coding projects inside a comprehensive (67)_______ to present to future college admissions officers.\n\n"
        "Machine learning models can also (68)_______ assessment results within seconds, highlighting concepts where the class needs extra review. "
        "By relieving teachers of (69)_______ administrative chores like grading multiple-choice sheets, technology gives educators more time for meaningful mentorship. "
        "Without question, the integration of smart pedagogical tools marks a historic (70)_______ in modern teaching."
    )

    add_q(
        64, "Đọc hiểu điền từ (Guided Cloze)",
        f"{passage_intro}\n\n**Question 64:**",
        [
            {"id": "A", "text": "platforms"},
            {"id": "B", "text": "milestones"},
            {"id": "C", "text": "chatbots"},
            {"id": "D", "text": "standbys"}
        ],
        "A",
        "**Đáp án đúng: A (platforms)**\n\n- **Dịch nghĩa:** Modern schools are adopting cloud-based platforms (nền tảng đám mây)... mang tài nguyên học tập tới tận máy tính bảng của học sinh.\n- **Phân tích:** *cloud-based platforms* là cụm danh từ chỉ các nền tảng phần mềm đám mây."
    )

    add_q(
        65, "Đọc hiểu điền từ (Guided Cloze)",
        f"{passage_intro}\n\n**Question 65:**",
        [
            {"id": "A", "text": "speech recognition"},
            {"id": "B", "text": "personalised learning"},
            {"id": "C", "text": "standby mode"},
            {"id": "D", "text": "facial recognition"}
        ],
        "B",
        "**Đáp án đúng: B (personalised learning)**\n\n- **Dịch nghĩa:** ...offer personalised learning, tailoring exercise difficulty and lesson speed to each teenager's progress.\n- **Phân tích:** *personalised learning* (học tập cá nhân hóa) điều chỉnh độ khó bài tập theo tốc độ học của từng học sinh."
    )

    add_q(
        66, "Đọc hiểu điền từ (Guided Cloze)",
        f"{passage_intro}\n\n**Question 66:**",
        [
            {"id": "A", "text": "virtual tutor"},
            {"id": "B", "text": "autonomous vehicle"},
            {"id": "C", "text": "hardware maintenance"},
            {"id": "D", "text": "repetitive cycle"}
        ],
        "A",
        "**Đáp án đúng: A (virtual tutor)**\n\n- **Dịch nghĩa:** ...learners who encounter challenging calculus formulas can consult an intelligent virtual tutor for step-by-step guidance.\n- **Phân tích:** *virtual tutor* (gia sư ảo) giải đáp bài toán khó từng bước."
    )

    add_q(
        67, "Đọc hiểu điền từ (Guided Cloze)",
        f"{passage_intro}\n\n**Question 67:**",
        [
            {"id": "A", "text": "standby mode"},
            {"id": "B", "text": "digital portfolio"},
            {"id": "C", "text": "conversational platform"},
            {"id": "D", "text": "speech recognition"}
        ],
        "B",
        "**Đáp án đúng: B (digital portfolio)**\n\n- **Dịch nghĩa:** ...assemble their essays, lab reports, and coding projects inside a comprehensive digital portfolio to present to college admissions officers.\n- **Phân tích:** *digital portfolio* (hồ sơ năng lực số) tổng hợp bài tập, dự án gửi tới hội đồng tuyển sinh."
    )

    add_q(
        68, "Đọc hiểu điền từ (Guided Cloze)",
        f"{passage_intro}\n\n**Question 68:**",
        [
            {"id": "A", "text": "analyse"},
            {"id": "B", "text": "imitate"},
            {"id": "C", "text": "depend"},
            {"id": "D", "text": "programme"}
        ],
        "A",
        "**Đáp án đúng: A (analyse)**\n\n- **Dịch nghĩa:** Machine learning models can also analyse assessment results within seconds...\n- **Phân tích:** Động từ *analyse* (phân tích kết quả đánh giá). Sau động từ khuyết thiếu *can* dùng động từ nguyên mẫu không 'to'."
    )

    add_q(
        69, "Đọc hiểu điền từ (Guided Cloze)",
        f"{passage_intro}\n\n**Question 69:**",
        [
            {"id": "A", "text": "hands-on"},
            {"id": "B", "text": "repetitive"},
            {"id": "C", "text": "autonomous"},
            {"id": "D", "text": "dependent"}
        ],
        "B",
        "**Đáp án đúng: B (repetitive)**\n\n- **Dịch nghĩa:** By relieving teachers of repetitive administrative chores like grading sheets...\n- **Phân tích:** *repetitive administrative chores* (những công việc giấy tờ hành chính mang tính lặp đi lặp lại đơn điệu như chấm phiếu trắc nghiệm)."
    )

    add_q(
        70, "Đọc hiểu điền từ (Guided Cloze)",
        f"{passage_intro}\n\n**Question 70:**",
        [
            {"id": "A", "text": "milestone"},
            {"id": "B", "text": "chatbot"},
            {"id": "C", "text": "standby"},
            {"id": "D", "text": "maintenance"}
        ],
        "A",
        "**Đáp án đúng: A (milestone)**\n\n- **Dịch nghĩa:** ...the integration of smart pedagogical tools marks a historic milestone in modern teaching.\n- **Phân tích:** Cụm collocations: *mark a historic milestone* (đánh dấu một cột mốc lịch sử)."
    )

    # =========================================================================
    # PART II: 30 NGỮ PHÁP THỂ SAI KHIẾN & GIAO TIẾP (QUESTIONS 71 - 100)
    # =========================================================================

    # --- Section 6: Active Causative with HAVE & GET (Q71 - Q78) ---
    add_q(
        71, "Thể sai khiến chủ động (Active Causatives)",
        "The computer science teacher had her students _______ the dialogue algorithm in pairs before presenting to the class.",
        [
            {"id": "A", "text": "practise"},
            {"id": "B", "text": "to practise"},
            {"id": "C", "text": "practising"},
            {"id": "D", "text": "practised"}
        ],
        "A",
        "**Đáp án đúng: A (practise)**\n\n- **Dịch nghĩa:** Giáo viên tin học đã yêu cầu học sinh của mình thực hành thuật toán đối thoại theo cặp trước khi trình bày trước lớp.\n- **Thần chú Thầy Thức:** *HAVE + Người + V-bare (nguyên thể không 'to')*.\n- **Công thức:** $S + have + someone + V_{bare}$. Do tân ngữ là *her students* (chỉ người) nên dùng *practise*."
    )

    add_q(
        72, "Thể sai khiến chủ động (Active Causatives)",
        "The school principal got the IT technicians _______ the latest anti-virus software on all lab workstations.",
        [
            {"id": "A", "text": "install"},
            {"id": "B", "text": "to install"},
            {"id": "C", "text": "installed"},
            {"id": "D", "text": "installing"}
        ],
        "B",
        "**Đáp án đúng: B (to install)**\n\n- **Dịch nghĩa:** Hiệu trưởng nhà trường đã nhờ các kỹ thuật viên CNTT cài đặt phần mềm diệt virus mới nhất trên tất cả các máy trạm trong phòng thực hành.\n- **Thần chú Thầy Thức:** *GET + Người + TO V*.\n- **Công thức:** $S + get + someone + to\text{-}V$. Tân ngữ *the IT technicians* (chỉ người) đi cùng động từ *get*, bắt buộc dùng *to install*."
    )

    add_q(
        73, "Thể sai khiến chủ động (Active Causatives)",
        "Before setting off on our cross-country road trip, my father had a seasoned mechanic _______ the brake pads and engine oil.",
        [
            {"id": "A", "text": "check"},
            {"id": "B", "text": "to check"},
            {"id": "C", "text": "checked"},
            {"id": "D", "text": "checking"}
        ],
        "A",
        "**Đáp án đúng: A (check)**\n\n- **Dịch nghĩa:** Trước khi khởi hành chuyến du lịch xuyên quốc gia, bố tôi đã nhờ một thợ cơ khí lành nghề kiểm tra má phanh và dầu động cơ.\n- **Thần chú Thầy Thức:** *HAVE + Người + V-bare*.\n- **Công thức:** $S + had + someone + V_{bare}$. Tân ngữ *a seasoned mechanic* (thợ máy - người) sau *had* $\\rightarrow$ dùng *check*."
    )

    add_q(
        74, "Thể sai khiến chủ động (Active Causatives)",
        "Linda managed to get her older brother _______ her with the difficult Python programming assignment.",
        [
            {"id": "A", "text": "help"},
            {"id": "B", "text": "to help"},
            {"id": "C", "text": "helped"},
            {"id": "D", "text": "helping"}
        ],
        "B",
        "**Đáp án đúng: B (to help)**\n\n- **Dịch nghĩa:** Linda đã thuyết phục được anh trai mình giúp đỡ bạn ấy bài tập lập trình Python khó.\n- **Thần chú Thầy Thức:** *GET + Người + TO V*.\n- **Công thức:** $S + get + someone + to\text{-}V$. Tân ngữ *her older brother* (người) sau *get* $\\rightarrow$ dùng *to help*."
    )

    add_q(
        75, "Thể sai khiến chủ động (Active Causatives)",
        "Did you have the postal courier _______ the sensitive confidential documents directly at the reception desk?",
        [
            {"id": "A", "text": "leave"},
            {"id": "B", "text": "to leave"},
            {"id": "C", "text": "left"},
            {"id": "D", "text": "leaving"}
        ],
        "A",
        "**Đáp án đúng: A (leave)**\n\n- **Dịch nghĩa:** Bạn có nhờ người đưa thư chuyển phát để lại các tài liệu mật nhạy cảm trực tiếp ở quầy lễ tân không?\n- **Thần chú Thầy Thức:** *HAVE + Người + V-bare*.\n- **Công thức:** Câu hỏi trợ động từ: $Did + S + have + someone + V_{bare}$? Tân ngữ *the postal courier* (người giao thư) $\\rightarrow$ dùng *leave*."
    )

    add_q(
        76, "Thể sai khiến chủ động (Active Causatives)",
        "The robotics club is trying to get local tech enterprises _______ funds for their upcoming international competition.",
        [
            {"id": "A", "text": "provide"},
            {"id": "B", "text": "to provide"},
            {"id": "C", "text": "provided"},
            {"id": "D", "text": "providing"}
        ],
        "B",
        "**Đáp án đúng: B (to provide)**\n\n- **Dịch nghĩa:** Câu lạc bộ robot đang cố gắng vận động các doanh nghiệp công nghệ địa phương tài trợ kinh phí cho cuộc thi quốc tế sắp tới của họ.\n- **Thần chú Thầy Thức:** *GET + Người/Doanh nghiệp + TO V*.\n- **Công thức:** $S + get + someone/party + to\text{-}V$. Tân ngữ chỉ chủ thể tác động sau *get* $\\rightarrow$ dùng *to provide*."
    )

    add_q(
        77, "Thể sai khiến chủ động (Active Causatives)",
        "The managing director had an independent auditor _______ every invoice issued during the last fiscal quarter.",
        [
            {"id": "A", "text": "inspect"},
            {"id": "B", "text": "to inspect"},
            {"id": "C", "text": "inspected"},
            {"id": "D", "text": "inspecting"}
        ],
        "A",
        "**Đáp án đúng: A (inspect)**\n\n- **Dịch nghĩa:** Giám đốc điều hành đã nhờ một kiểm toán viên độc lập kiểm tra từng hóa đơn phát hành trong quý tài chính vừa qua.\n- **Thần chú Thầy Thức:** *HAVE + Người + V-bare*.\n- **Công thức:** $S + had + someone + V_{bare}$. Tân ngữ *an independent auditor* (kiểm toán viên - người) $\\rightarrow$ dùng *inspect*."
    )

    add_q(
        78, "Thể sai khiến chủ động (Active Causatives)",
        "Could you please get the cleaning staff _______ the multimedia conference hall before the delegates arrive?",
        [
            {"id": "A", "text": "sweep"},
            {"id": "B", "text": "to sweep"},
            {"id": "C", "text": "swept"},
            {"id": "D", "text": "sweeping"}
        ],
        "B",
        "**Đáp án đúng: B (to sweep)**\n\n- **Dịch nghĩa:** Bạn có thể vui lòng nhờ nhân viên vệ sinh quét dọn hội trường hội nghị đa phương tiện trước khi các đại biểu tới không?\n- **Thần chú Thầy Thức:** *GET + Người + TO V*.\n- **Công thức:** $Could\ you\ get + someone + to\text{-}V$. Tân ngữ *the cleaning staff* (nhân viên - người) sau *get* $\\rightarrow$ dùng *to sweep*."
    )

    # --- Section 7: Passive Causative with HAVE & GET (Q79 - Q88) ---
    add_q(
        79, "Thể sai khiến bị động (Passive Causatives)",
        "The technology academy had all its campus desktop computers _______ with high-speed solid-state drives last weekend.",
        [
            {"id": "A", "text": "upgrade"},
            {"id": "B", "text": "to upgrade"},
            {"id": "C", "text": "upgraded"},
            {"id": "D", "text": "upgrading"}
        ],
        "C",
        "**Đáp án đúng: C (upgraded)**\n\n- **Dịch nghĩa:** Học viện công nghệ đã cho nâng cấp tất cả máy tính để bàn trong khuôn viên trường bằng ổ cứng SSD tốc độ cao vào cuối tuần trước.\n- **Thần chú Thầy Thức:** *HAVE / GET + VẬT + V3/ED*.\n- **Công thức:** $S + had + sth\ (all\ its\ campus\ desktop\ computers\ -\ vật) + V_{3/ed}$. Đáp án là *upgraded*."
    )

    add_q(
        80, "Thể sai khiến bị động (Passive Causatives)",
        "Jessica will get her graduation photograph _______ by a studio portrait artist tomorrow morning.",
        [
            {"id": "A", "text": "take"},
            {"id": "B", "text": "to take"},
            {"id": "C", "text": "taken"},
            {"id": "D", "text": "taking"}
        ],
        "C",
        "**Đáp án đúng: C (taken)**\n\n- **Dịch nghĩa:** Jessica sẽ đi chụp ảnh tốt nghiệp bởi một nhiếp ảnh gia studio vào sáng mai.\n- **Thần chú Thầy Thức:** *GET + VẬT + V3/ED*.\n- **Công thức:** $S + get + sth\ (her\ graduation\ photograph\ -\ vật) + V_{3/ed}$. Phân từ 2 của *take* là *taken*."
    )

    add_q(
        81, "Thể sai khiến bị động (Passive Causatives)",
        "The regional clinic had thousands of historical patient paper records _______ to streamline electronic data retrieval.",
        [
            {"id": "A", "text": "digitise"},
            {"id": "B", "text": "to digitise"},
            {"id": "C", "text": "digitised"},
            {"id": "D", "text": "digitising"}
        ],
        "C",
        "**Đáp án đúng: C (digitised)**\n\n- **Dịch nghĩa:** Phòng khám khu vực đã cho số hóa hàng ngàn hồ sơ bệnh án giấy lịch sử để tinh giản việc truy xuất dữ liệu điện tử.\n- **Thần chú Thầy Thức:** *HAVE + VẬT + V3/ED*.\n- **Công thức:** $S + had + sth\ (patient\ paper\ records) + V_{3/ed}$. Đáp án: *digitised*."
    )

    add_q(
        82, "Thể sai khiến bị động (Passive Causatives)",
        "If you consistently experience blurred vision while reading computer screens, you should get your eyesight _______ immediately.",
        [
            {"id": "A", "text": "test"},
            {"id": "B", "text": "to test"},
            {"id": "C", "text": "tested"},
            {"id": "D", "text": "testing"}
        ],
        "C",
        "**Đáp án đúng: C (tested)**\n\n- **Dịch nghĩa:** Nếu bạn thường xuyên bị mờ mắt khi đọc màn hình máy tính, bạn nên đi kiểm tra thị lực ngay lập tức.\n- **Thần chú Thầy Thức:** *GET + VẬT + V3/ED*.\n- **Công thức:** $S + get + sth\ (your\ eyesight\ -\ thị lực) + V_{3/ed}$. Đi khám mắt (bác sĩ đo chứ mình không tự đo) $\\rightarrow$ *tested*."
    )

    add_q(
        83, "Thể sai khiến bị động (Passive Causatives)",
        "Following the destructive hailstorm, our neighbors had their solar roof panels _______ by certified contractors.",
        [
            {"id": "A", "text": "repair"},
            {"id": "B", "text": "to repair"},
            {"id": "C", "text": "repaired"},
            {"id": "D", "text": "repairing"}
        ],
        "C",
        "**Đáp án đúng: C (repaired)**\n\n- **Dịch nghĩa:** Sau trận mưa đá tàn khốc, những người hàng xóm của chúng tôi đã cho thợ sửa chữa các tấm pin năng lượng mặt trời trên mái nhà.\n- **Thần chú Thầy Thức:** *HAVE + VẬT + V3/ED*.\n- **Công thức:** $S + had + sth\ (solar\ roof\ panels) + V_{3/ed}$. Đáp án: *repaired*."
    )

    add_q(
        84, "Thể sai khiến bị động (Passive Causatives)",
        "The financial institution gets its automated teller machines _______ every two weeks to avoid hardware jams.",
        [
            {"id": "A", "text": "service"},
            {"id": "B", "text": "to service"},
            {"id": "C", "text": "serviced"},
            {"id": "D", "text": "servicing"}
        ],
        "C",
        "**Đáp án đúng: C (serviced)**\n\n- **Dịch nghĩa:** Tổ chức tài chính cho bảo dưỡng các máy rút tiền tự động (ATM) hai tuần một lần để tránh kẹt phần cứng.\n- **Thần chú Thầy Thức:** *GET + VẬT + V3/ED*.\n- **Công thức:** $S + gets + sth\ (ATMs) + V_{3/ed}$. Đáp án: *serviced*."
    )

    add_q(
        85, "Thể sai khiến bị động (Passive Causatives)",
        "Before sending out college scholarship submissions, applicants should have their personal essays _______ by an English native speaker.",
        [
            {"id": "A", "text": "proofread"},
            {"id": "B", "text": "to proofread"},
            {"id": "C", "text": "proofreading"},
            {"id": "D", "text": "proofreader"}
        ],
        "A",
        "**Đáp án đúng: A (proofread)**\n\n- **Dịch nghĩa:** Trước khi gửi hồ sơ xin học bổng đại học, ứng viên nên nhờ người bản ngữ đọc duyệt và sửa lỗi bài luận cá nhân của mình.\n- **Thần chú Thầy Thức:** *HAVE + VẬT + V3/ED*.\n- **Công thức:** $have + sth\ (their\ personal\ essays) + V_{3/ed}$. Lưu ý bất quy tắc: *proofread* có quá khứ phân từ giữ nguyên mặt chữ là *proofread* (phát âm là `/ˈpruːfred/`)."
    )

    add_q(
        86, "Thể sai khiến bị động (Passive Causatives)",
        "Where did you get that elegant formal suit _______? The tailoring looks flawless.",
        [
            {"id": "A", "text": "make"},
            {"id": "B", "text": "to make"},
            {"id": "C", "text": "made"},
            {"id": "D", "text": "making"}
        ],
        "C",
        "**Đáp án đúng: C (made)**\n\n- **Dịch nghĩa:** Bạn đã may bộ vest trang trọng thanh lịch đó ở đâu vậy? Đường may trông thật hoàn hảo.\n- **Thần chú Thầy Thức:** *GET + VẬT + V3/ED*.\n- **Công thức:** $Where\ did\ you\ get + sth\ (that\ suit) + V_{3/ed}$? Đi may quần áo (thợ may) $\\rightarrow$ dùng *made*."
    )

    add_q(
        87, "Thể sai khiến bị động (Passive Causatives)",
        "The museum curator had bulletproof glass barriers _______ around the historic oil painting for added protection.",
        [
            {"id": "A", "text": "install"},
            {"id": "B", "text": "to install"},
            {"id": "C", "text": "installed"},
            {"id": "D", "text": "installing"}
        ],
        "C",
        "**Đáp án đúng: C (installed)**\n\n- **Dịch nghĩa:** Người quản lý bảo tàng đã cho lắp đặt các rào chắn bằng kính chống đạn xung quanh bức tranh sơn dầu lịch sử để tăng cường bảo vệ.\n- **Thần chú Thầy Thức:** *HAVE + VẬT + V3/ED*.\n- **Công thức:** $had + sth\ (barriers) + V_{3/ed}$. Đáp án: *installed*."
    )

    add_q(
        88, "Thể sai khiến bị động (Passive Causatives)",
        "Nam Việt had his cracked tablet screen _______ at the certified electronic service shop yesterday afternoon.",
        [
            {"id": "A", "text": "replace"},
            {"id": "B", "text": "to replace"},
            {"id": "C", "text": "replaced"},
            {"id": "D", "text": "replacing"}
        ],
        "C",
        "**Đáp án đúng: C (replaced)**\n\n- **Dịch nghĩa:** Nam Việt đã mang chiếc máy tính bảng bị nứt màn hình đi thay tại cửa hàng dịch vụ điện tử chính hãng vào chiều hôm qua.\n- **Thần chú Thầy Thức:** *HAVE + VẬT + V3/ED*.\n- **Công thức:** $had + sth\ (his\ cracked\ tablet\ screen) + V_{3/ed}$. Đáp án: *replaced*."
    )

    # --- Section 8: Causatives with MAKE & LET (Q89 - Q92) ---
    add_q(
        89, "Mở rộng: MAKE & LET (Causatives)",
        "The rigorous physical education instructor made all the students _______ two miles around the track before soccer practice.",
        [
            {"id": "A", "text": "jog"},
            {"id": "B", "text": "to jog"},
            {"id": "C", "text": "jogged"},
            {"id": "D", "text": "jogging"}
        ],
        "A",
        "**Đáp án đúng: A (jog)**\n\n- **Dịch nghĩa:** Người hướng dẫn thể dục nghiêm khắc đã bắt tất cả học sinh chạy bộ hai dặm quanh đường chạy trước buổi tập bóng đá.\n- **Công thức Thầy Thức:** $S + make + someone + V_{bare}$ (bắt buộc ai làm gì). Sau tân ngữ chỉ người *all the students* dùng động từ nguyên thể không 'to' (*jog*)."
    )

    add_q(
        90, "Mở rộng: MAKE & LET (Causatives)",
        "During the strict safety drill, building occupants were made _______ the stairs instead of using the elevators.",
        [
            {"id": "A", "text": "use"},
            {"id": "B", "text": "to use"},
            {"id": "C", "text": "used"},
            {"id": "D", "text": "using"}
        ],
        "B",
        "**Đáp án đúng: B (to use)**\n\n- **Dịch nghĩa:** Trong buổi diễn tập an toàn nghiêm ngặt, những người trong tòa nhà đã bị bắt buộc phải sử dụng cầu thang bộ thay vì dùng thang máy.\n- **Bẫy thi cực mạnh:** Thể bị động của MAKE: $be\ made + to\text{-}V$ (bị bắt làm gì phải có 'to')! Ngược lại thể chủ động $make + sb + V_{bare}$."
    )

    add_q(
        91, "Mở rộng: MAKE & LET (Causatives)",
        "My parents never let me _______ violent online video games on school nights.",
        [
            {"id": "A", "text": "play"},
            {"id": "B", "text": "to play"},
            {"id": "C", "text": "played"},
            {"id": "D", "text": "playing"}
        ],
        "A",
        "**Đáp án đúng: A (play)**\n\n- **Dịch nghĩa:** Cha mẹ tôi không bao giờ cho phép tôi chơi trò chơi điện tử bạo lực trực tuyến vào các buổi tối trong tuần đi học.\n- **Công thức Thầy Thức:** $S + let + someone + V_{bare}$ (cho phép ai làm gì). Sau *me* dùng động từ nguyên thể không 'to' (*play*)."
    )

    add_q(
        92, "Mở rộng: MAKE & LET (Causatives)",
        "Tourists visiting the ancient temple are not allowed _______ photographic flashes near the delicate murals.",
        [
            {"id": "A", "text": "discharge"},
            {"id": "B", "text": "to discharge"},
            {"id": "C", "text": "discharging"},
            {"id": "D", "text": "discharged"}
        ],
        "B",
        "**Đáp án đúng: B (to discharge)**\n\n- **Dịch nghĩa:** Khách du lịch viếng thăm ngôi đền cổ không được phép bật đèn flash chụp ảnh gần các bức tranh tường tinh xảo.\n- **Công thức Thầy Thức:** Thể bị động tương đương của LET: $be\ allowed + to\text{-}V$ (được phép làm gì). Do đó phải dùng *to discharge*."
    )

    # --- Section 9: Error Identification / Underlined Errors (Q93 - Q96) ---
    add_q(
        93, "Tìm lỗi sai (Error Identification)",
        "The chemistry teacher **had** (A) the lab assistant **to set up** (B) the titration tubes **before** (C) the students **arrived** (D).",
        [
            {"id": "A", "text": "had"},
            {"id": "B", "text": "to set up"},
            {"id": "C", "text": "before"},
            {"id": "D", "text": "arrived"}
        ],
        "B",
        "**Đáp án đúng: B (to set up $\\rightarrow$ set up)**\n\n- **Dịch nghĩa:** Giáo viên hóa học đã nhờ trợ lý phòng thí nghiệm chuẩn bị các ống chuẩn độ trước khi học sinh đến.\n- **Giải thích lỗi sai:** Theo cấu trúc Thể sai khiến chủ động với HAVE: $S + have + someone + V_{bare}$. Tân ngữ là *the lab assistant* (người), do đó phải dùng động từ nguyên thể không 'to' *set up*, chứ không dùng *to set up*."
    )

    add_q(
        94, "Tìm lỗi sai (Error Identification)",
        "Mrs. Green **got** (A) the certified electrician **wire** (B) the whole workshop **so that** (C) all power outlets **worked safely** (D).",
        [
            {"id": "A", "text": "got"},
            {"id": "B", "text": "wire"},
            {"id": "C", "text": "so that"},
            {"id": "D", "text": "worked safely"}
        ],
        "B",
        "**Đáp án đúng: B (wire $\\rightarrow$ to wire)**\n\n- **Dịch nghĩa:** Bà Green đã nhờ thợ điện có chứng chỉ đi dây toàn bộ xưởng để mọi ổ cắm điện hoạt động an toàn.\n- **Giải thích lỗi sai:** Cấu trúc sai khiến chủ động với GET: $S + get + someone + to\text{-}V$. Tân ngữ là *the certified electrician* (người), sau *got* bắt buộc phải dùng *to wire*, sửa *wire* thành *to wire*."
    )

    add_q(
        95, "Tìm lỗi sai (Error Identification)",
        "We urgently **need to** (A) have our broken restaurant **refrigerator** (B) **repairing** (C) before all the fresh seafood **spoils** (D).",
        [
            {"id": "A", "text": "need to"},
            {"id": "B", "text": "refrigerator"},
            {"id": "C", "text": "repairing"},
            {"id": "D", "text": "spoils"}
        ],
        "C",
        "**Đáp án đúng: C (repairing $\\rightarrow$ repaired)**\n\n- **Dịch nghĩa:** Chúng tôi khẩn cấp cần mang chiếc tủ lạnh nhà hàng bị hỏng đi sửa trước khi tất cả hải sản tươi sống bị ôi thiu.\n- **Giải thích lỗi sai:** Cấu trúc sai khiến bị động: $have + sth\ (our\ broken\ refrigerator\ -\ vật) + V_{3/ed}$. Không dùng dạng V-ing *repairing*, phải sửa thành quá khứ phân từ *repaired*."
    )

    add_q(
        96, "Tìm lỗi sai (Error Identification)",
        "Peter **got** (A) his tourist visa **renew** (B) at the consulate **in order to** (C) attend the AI robotics conference **in Tokyo** (D).",
        [
            {"id": "A", "text": "got"},
            {"id": "B", "text": "renew"},
            {"id": "C", "text": "in order to"},
            {"id": "D", "text": "in Tokyo"}
        ],
        "B",
        "**Đáp án đúng: B (renew $\\rightarrow$ renewed)**\n\n- **Dịch nghĩa:** Peter đã cho gia hạn visa du lịch của mình tại lãnh sự quán để tham dự hội nghị robot AI ở Tokyo.\n- **Giải thích lỗi sai:** Cấu trúc sai khiến bị động với GET: $get + sth\ (his\ tourist\ visa\ -\ vật) + V_{3/ed}$. Sửa *renew* thành dạng phân từ 2 *renewed*."
    )

    # --- Section 10: Everyday Communication: Getting Attention & Interrupting Politely (Q97 - Q100) ---
    add_q(
        97, "Giao tiếp hằng ngày (Everyday Communication)",
        "**Conference Chairman:** \"_______, ladies and gentlemen? The keynote address on generative AI is about to begin.\"\n\n**Audience:** *(The room becomes quiet and turns towards the stage)*",
        [
            {"id": "A", "text": "May I have your attention, please?"},
            {"id": "B", "text": "Why are you talking so loudly?"},
            {"id": "C", "text": "Stop talking immediately!"},
            {"id": "D", "text": "Do you hear what I said?"}
        ],
        "A",
        "**Đáp án đúng: A (May I have your attention, please?)**\n\n- **Dịch nghĩa:** Chủ tọa hội nghị: \"Xin quý vị vui lòng chú ý lắng nghe? Bài phát biểu chính về AI tạo sinh sắp bắt đầu.\"\n- **Phân tích:** Mẫu câu thu hút sự chú ý trang trọng, lịch sự nhất trong hội nghị (SGK tr. 84) là *\"May I have your attention, please?\"*. Các phương án còn lại đều thô lỗ, cộc lốc hoặc thiếu tính chuyên nghiệp."
    )

    add_q(
        98, "Giao tiếp hằng ngày (Everyday Communication)",
        "**Student:** \"_______, but could you please clarify how the deep neural network adjusts its weights during backpropagation?\"\n\n**Professor:** \"Of course. That is a fundamental concept. Let me show you this diagram.\"",
        [
            {"id": "A", "text": "I'm sorry for interrupting"},
            {"id": "B", "text": "You are completely mistaken"},
            {"id": "C", "text": "I don't care about your slide"},
            {"id": "D", "text": "Listen to me right now"}
        ],
        "A",
        "**Đáp án đúng: A (I'm sorry for interrupting)**\n\n- **Dịch nghĩa:** Học sinh: \"Em xin lỗi vì ngắt lời thầy, nhưng thầy có thể làm rõ cách mạng nơ-ron điều chỉnh trọng số trong quá trình lan truyền ngược không ạ?\" - Giáo sư: \"Dĩ nhiên rồi...\"\n- **Phân tích:** Mẫu câu ngắt lời lịch sự trong giờ học (SGK tr. 84) là *\"I'm sorry for interrupting, but...\"*."
    )

    add_q(
        99, "Giao tiếp hằng ngày (Everyday Communication)",
        "**Colleague A:** \"_______, Mr. David? Do you have two minutes to look over the revised budget estimates?\"\n\n**Colleague B:** \"Sure, come on in. Have a seat.\"",
        [
            {"id": "A", "text": "Could I ask you a quick question"},
            {"id": "B", "text": "You must listen to me now"},
            {"id": "C", "text": "Why are you sitting there"},
            {"id": "D", "text": "Don't ignore me"}
        ],
        "A",
        "**Đáp án đúng: A (Could I ask you a quick question)**\n\n- **Dịch nghĩa:** Đồng nghiệp A: \"Tôi có thể hỏi anh một câu nhanh được không, anh David? Anh có hai phút xem qua dự toán ngân sách sửa đổi không?\" - Đồng nghiệp B: \"Chắc chắn rồi, mời vào ngồi.\"\n- **Phân tích:** Mẫu câu xin phép hỏi nhanh lịch sự trong văn phòng công sở: *\"Could I ask you a quick question / Could I have a moment of your time?\"*."
    )

    add_q(
        100, "Giao tiếp hằng ngày (Everyday Communication)",
        "**Participant:** \"Sorry for the interruption, but _______? The microphone cut out for a moment.\"\n\n**Presenter:** \"Certainly. I was pointing out that autonomous vehicles have significantly lower reaction times than human drivers.\"",
        [
            {"id": "A", "text": "could you repeat that last point"},
            {"id": "B", "text": "why did you stop talking"},
            {"id": "C", "text": "do you know who I am"},
            {"id": "D", "text": "can we leave the room now"}
        ],
        "A",
        "**Đáp án đúng: A (could you repeat that last point)**\n\n- **Dịch nghĩa:** Người tham dự: \"Xin lỗi vì ngắt lời, nhưng diễn giả có thể nhắc lại ý vừa rồi được không ạ? Micro vừa bị mất tiếng một lúc.\" - Diễn giả: \"Chắc chắn rồi...\"\n- **Phân tích:** Mẫu câu nhờ nhắc lại ý vừa nói một cách lịch sự khi bị gián đoạn âm thanh (SGK tr. 84): *\"Sorry for the interruption, but could you repeat that (last point)?\"*."
    )

    # Let's shuffle / rotate options so that correct answers are evenly balanced across A, B, C, D
    # Target distribution: ~25 A, ~25 B, ~25 C, ~25 D
    import random
    rng = random.Random(42) # deterministic seed
    
    target_keys = ["A", "B", "C", "D"]
    for i, q in enumerate(questions):
        target_ans = target_keys[i % 4]
        cur_ans = q["correctAnswer"]
        if cur_ans != target_ans:
            # Swap current correct option with target option
            cur_idx = ord(cur_ans) - ord("A")
            target_idx = ord(target_ans) - ord("A")
            
            # Swap texts
            q["options"][cur_idx]["text"], q["options"][target_idx]["text"] = (
                q["options"][target_idx]["text"],
                q["options"][cur_idx]["text"]
            )
            q["correctAnswer"] = target_ans
            
            # Update explanation
            old_correct_str = f"**Đáp án đúng: {cur_ans}"
            new_correct_str = f"**Đáp án đúng: {target_ans}"
            q["explanation"] = q["explanation"].replace(old_correct_str, new_correct_str)

    return questions

def main():
    questions = create_payload()
    print(f"Total questions generated: {len(questions)}")
    
    # Check distribution of answers
    counts = {"A": 0, "B": 0, "C": 0, "D": 0}
    for q in questions:
        counts[q["correctAnswer"]] += 1
    print("Answer distribution:", counts)

    payload = {
        "studentUsername": "nam_viet",
        "grade": 12,
        "assignedDate": "2026-11-16T00:00:00.000Z",
        "assessmentTitle": "Đấu trường 100 câu: 20 Từ Vựng Cốt Lõi & Thể Sai Khiến Unit 6 (100 câu)",
        "timeLimitMinutes": 90,
        "questions": questions
    }

    out_path = ".agents/skills/teaching-english-curriculum/scripts/payload_eng12_unit6_namviet_100q.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
    print(f"Successfully written payload to {out_path}")

if __name__ == "__main__":
    main()
