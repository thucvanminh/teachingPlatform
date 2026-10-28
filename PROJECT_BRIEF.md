# Project Brief: Hệ Thống LMS Gia Sư Cá Nhân Hóa 1-on-1 (1-on-1 Personalized Tutoring LMS)

## 1. Bối cảnh & Mục tiêu (Context & Objective)
Xây dựng một nền tảng web quản lý học tập (LMS) chuyên biệt cho mô hình gia sư dạy kèm 1-kèm-1 (1-on-1 tutoring). 
Giáo viên hiện đang dạy nhiều học sinh ở các khối lớp và môn học rất khác nhau (Tiếng Anh lớp 11, Tiếng Anh lớp 12, Toán lớp 7, Hóa học lớp 9, Toán lớp 2). 

Hệ thống phải giải quyết được 3 bài toán cốt lõi:
1. **Cá nhân hóa lộ trình 1-1 (Personalized Learning Path):** Mỗi học sinh khi đăng nhập chỉ thấy lộ trình học tập, bài giảng và bài tập được thiết kế/giao riêng cho mình theo từng ngày.
2. **Đa dạng hóa định dạng môn học & lứa tuổi (Multi-Subject & Age-Adaptive Content):** Hỗ trợ hiển thị công thức Toán/Hóa (LaTeX/KaTeX), media (Audio/Reading passage) cho Tiếng Anh THPT, và giao diện trực quan/đơn giản cho học sinh tiểu học (Toán lớp 2).
3. **Minh bạch hóa với Phụ huynh (Parent Read-Only Portal):** Phụ huynh có tài khoản riêng liên kết với con mình để theo dõi tiến độ, xem đề bài, bài làm và nhận xét của giáo viên dưới dạng **Chỉ đọc (Read-only)**, tuyệt đối không thể thao tác làm bài hay nộp bài thay học sinh.

## 2. Cấu trúc Bài học Hàng ngày (Daily Session Structure)
Mỗi đơn vị học tập hàng ngày (Daily Learning Unit) được giao cho một học sinh bao gồm 3 thành phần:
1. **Bài giảng (Lecture / Theory):** Nội dung lý thuyết, ghi chú, video, hình ảnh hoặc file đính kèm.
2. **Bài tập trong buổi học (In-Session Practice - 90 mins):** Lượng bài tập được thiết kế vừa đủ để học sinh hoàn thành trong khoảng 90 phút học tập trung (có bộ đếm thời gian hoặc theo dõi thời gian làm bài thực tế).
3. **Bài tập về nhà (Homework):** Bài tập củng cố để học sinh tự hoàn thành sau buổi học trước hạn chót (Deadline).

## 3. Phân quyền Hệ thống (RBAC - Role-Based Access Control)
- **TEACHER (Admin/Tutor):** Toàn quyền quản lý học sinh, phụ huynh, kho học liệu, giao bài hàng ngày, chấm điểm và viết nhận xét.
- **STUDENT (Learner):** Chỉ truy cập lộ trình cá nhân, xem bài giảng, thực hiện bài tập 90p và BTVN, xem điểm và lời phê sau khi chấm.
- **PARENT (Observer - Read-Only):** Liên kết `1-n` với tài khoản `STUDENT`. Có quyền xem toàn bộ lộ trình, bài giảng, chi tiết bài làm của con, điểm số, thời gian làm bài và nhận xét của giáo viên. Mọi API/UI liên quan đến tạo/sửa/nộp bài (`POST/PUT/PATCH` trên bảng Submission) đều bị chặn ở cả tầng Backend lẫn Frontend đối với role này.
