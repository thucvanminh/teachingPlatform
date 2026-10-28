# Teaching Platform (LMS 1-on-1 Personalized Tutoring)

Hệ thống quản lý học tập (LMS) cá nhân hóa chuyên biệt cho mô hình gia sư dạy kèm 1-kèm-1, hỗ trợ học sinh đa khối lớp (Lớp 2, Lớp 7, Lớp 9, Lớp 11, Lớp 12) với nội dung đa môn học (Toán KaTeX, Hóa học, Tiếng Anh Reading/Listening, bài tập tự luận chụp ảnh vở).

---

## 🏛️ Kiến trúc Hệ thống

- **Backend:** NestJS 10 (TypeScript, Modular Architecture, Prisma ORM, Passport JWT, Swagger OpenAPI).
- **Database:** PostgreSQL 15+ (Hosted trên Supabase với Row Level Security & Storage).
- **Frontend (Dự kiến):** Next.js 15 (Tailwind CSS, shadcn/ui, KaTeX) triển khai trên Vercel.
- **Deploy:** 
  - Backend: Render Free Web Service (Hỗ trợ Docker & render.yaml blueprint).
  - Database & Storage: Supabase Free Tier.
  - Frontend: Vercel Free Tier.

---

## 📚 Tài liệu Thiết kế & CSDL
- [PROJECT_BRIEF.md](./PROJECT_BRIEF.md): Mục tiêu dự án, cấu trúc buổi học hàng ngày, phân quyền RBAC.
- [database_schema.md](./database_schema.md): Đặc tả kiến trúc CSDL, từ điển dữ liệu 10 bảng, sơ đồ ERD, hợp đồng JSONB và bảo mật RLS.
- [databases.md](./databases.md): Mã nguồn SQL DDL đã được thực thi 100% trên Supabase PostgreSQL.

---

## 🚀 Các Phân hệ Backend (NestJS Modules)

| Phân hệ | Mô tả |
| :--- | :--- |
| **AuthModule** | Đăng ký, đăng nhập JWT, giải mã quyền vai trò (`TEACHER`, `STUDENT`, `PARENT`). |
| **UsersModule** | Quản lý hồ sơ học sinh (`student_profiles`), ghi chú sư phạm, liên kết Phụ huynh - Học sinh (`parent_student_links`). |
| **SubjectsModule** | Quản lý danh mục môn học (`MATH_2`, `MATH_7`, `CHEM_9`, `ENG_11`, `ENG_12`). |
| **LearningUnitsModule** | Quản lý kho bài học, nội dung lý thuyết Markdown/LaTeX, file đính kèm. |
| **AssessmentsModule** | Quản lý bộ đề (Luyện tập 90p tại lớp & BTVN) và ngân hàng câu hỏi đa hình (Trắc nghiệm, Điền từ, Nhóm bài đọc/nghe, Tự luận). |
| **DailyAssignmentsModule** | Trái tim lộ trình cá nhân hóa 1-1: Giao bài theo từng ngày cho học sinh, theo dõi trạng thái hoàn thành. |
| **AttemptsModule** | Phòng làm bài học sinh: Tính giờ thực tế, nộp bài, **công cụ tự động chấm trắc nghiệm & điền từ**. |
| **GradingModule** | Bàn chấm bài giáo viên: Chấm điểm tự luận, nhập nhận xét từng câu, lời phê tổng quan và đính kèm ảnh bài làm đã khoanh đỏ chấm chữa. |
| **StorageModule** | Tích hợp Supabase Storage (`submissions` & `lectures`), tạo Signed URL để client upload trực tiếp. |

---

## 🔑 Tài khoản Mẫu Đã Tạo Sẵn (Seeded Accounts)

Mật khẩu chung cho tất cả tài khoản mẫu: **`Password123!`**

| Vai trò (Role) | Username | Email / Tên hiển thị | Khối lớp / Ghi chú |
| :--- | :--- | :--- | :--- |
| **TEACHER** | `teacher` | `teacher@tutoring.com` (Thầy Minh) | Quản trị viên / Gia sư toàn quyền |
| **STUDENT** | `student_g2` | Bé An Nhiên | Lớp 2 (Giao diện Kids Elementary) |
| **STUDENT** | `student_g7` | `nam.g7@gmail.com` (Hoàng Nam) | Lớp 7 (Toán 7 - Đại số & Hình học) |
| **STUDENT** | `student_g12` | `trang.g12@gmail.com` (Thu Trang) | Lớp 12 (Luyện thi THPTQG Tiếng Anh) |
| **PARENT** | `parent_nam` | `me.nam@gmail.com` (Chị Mai) | Phụ huynh em Nam (Chỉ đọc - Read only) |

---

## 🛠️ Hướng dẫn Khởi chạy Backend (Local)

```bash
# 1. Đi vào thư mục backend
cd backend

# 2. Cài đặt thư viện (nếu chưa có)
npm install

# 3. Tạo client Prisma
npx prisma generate

# 4. Gieo dữ liệu mẫu (Seeding)
npm run seed

# 5. Khởi chạy server ở chế độ phát triển
npm run start:dev
```

- **API Base URL:** `http://localhost:3001/api`
- **Tài liệu Swagger OpenAPI tương tác trực tiếp:** `http://localhost:3001/api/docs`
- **Endpoint kiểm tra Health:** `http://localhost:3001/health`

---

## 🧪 Chạy Kiểm thử Tự động (E2E Tests)

Toàn bộ 8 kịch bản e2e đã được viết và kiểm thử tự động đạt 100%:
```bash
cd backend
npm run test:e2e
```

---

## 🌐 Triển khai lên Render (Deploy Free)

Dự án đã tích hợp sẵn file cấu hình [render.yaml](./render.yaml) và [Dockerfile](./backend/Dockerfile):
1. Đẩy code lên GitHub.
2. Trên [Render Dashboard](https://dashboard.render.com), bấm **New +** $\rightarrow$ **Blueprint**.
3. Chọn repo `thucvanminh/teachingPlatform`. Render sẽ tự động đọc `render.yaml`, build Docker và cấp phát đường dẫn API miễn phí.
