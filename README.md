# Teaching Platform (LMS 1-on-1 Personalized Tutoring)

Hệ thống quản lý học tập (LMS) cá nhân hóa chuyên biệt cho mô hình gia sư dạy kèm 1-kèm-1, hỗ trợ học sinh đa khối lớp (Lớp 2, Lớp 7, Lớp 9, Lớp 11, Lớp 12) với nội dung đa môn học (Toán KaTeX, Hóa học, Tiếng Anh Reading/Listening, bài tập tự luận chụp ảnh vở).

---

## 🏛️ Kiến trúc Toàn Diện (Fullstack Architecture)

- **Frontend:** Next.js 15 (App Router, React 19, TypeScript, Tailwind CSS, KaTeX Math rendering, Lucide Icons).
  - 🛸 **Keithley Space Mission Control (Toán 7 & Hóa 9):** Giao diện vũ trụ Neon Sci-Fi với nền cockpit/nebula, đồng hồ đếm ngược phóng tàu 90p, nộp ảnh chụp vở.
  - 👑 **Bé An Wonderland (Toán 2):** Giao diện hoạt hình thần tiên vui nhộn, công chúa & rồng xanh, nút bấm 3D thân thiện.
  - 🎓 **Teacher Studio (Thầy Minh):** Bàn làm việc Bento Grid, kho bài học KaTeX, giao bài theo ngày và bàn chấm bài tự luận kèm khoanh vẽ ảnh.
  - 👁️ **Parent Read-Only Portal:** Phụ huynh theo dõi tiến độ, bài làm và nhận xét của con với quyền Chỉ Đọc (bị khóa tuyệt đối các nút nộp/sửa).
- **Backend:** NestJS 10 (TypeScript, Prisma ORM, Passport JWT, Swagger OpenAPI, RBAC Guards, E2E Test Suite).
- **Database & Storage:** PostgreSQL 15+ trên Supabase với 10 bảng dữ liệu, RLS và 2 Storage Buckets (`submissions`, `lectures`).

---

## 🚀 Hướng Dẫn Chạy Toàn Bộ Hệ Thống (Local Development)

### 1. Khởi chạy Backend (Port 3001)
```bash
cd backend
npm install
npx prisma generate
npm run start:dev
```
- **API Base:** `http://localhost:3001/api`
- **Swagger Docs:** `http://localhost:3001/api/docs`
- **Health Check:** `http://localhost:3001/health`

### 2. Khởi chạy Frontend (Port 3000)
Mở một cửa sổ terminal mới:
```bash
cd frontend
npm install
npm run dev
```
- **Trang web học tập:** `http://localhost:3000`

---

## 🔑 Tài khoản Mẫu Trải Nghiệm Nhanh

Mật khẩu chung cho tất cả tài khoản: **`Password123!`**

| Vai trò (Role) | Username | Họ và tên | Điểm đặc biệt của giao diện |
| :--- | :--- | :--- | :--- |
| **Học sinh (Keithley)** | `keithley` | Keithley (Cosmic Explorer) | **Phong cách Vũ Trụ:** Trạm chỉ huy, bài tập 90p quỹ đạo, công thức KaTeX |
| **Học sinh (Bé An)** | `student_g2` | Bé An Nhiên (Lớp 2) | **Phong cách Thần Tiên:** Công chúa & rồng xanh, hoạt hình rực rỡ |
| **Giáo viên** | `teacher` | Thầy Minh (Gia Sư) | **Bàn làm việc Bento:** Soạn bài, giao bài hàng ngày, bàn chấm bài tự luận |
| **Phụ huynh** | `parent_nam` | Chị Mai (Mẹ em Nam/Keithley) | **Cổng Giám Sát:** Quyền Chỉ Đọc (Read-only), xem điểm và nhận xét |

---

## 🌐 Triển khai Lên Cloud (Deploy Free 100%)

1. **Frontend $\rightarrow$ Vercel:**
   - Kết nối repository `thucvanminh/teachingPlatform`.
   - Đặt `Root Directory` là `frontend`.
   - Cung cấp biến môi trường `NEXT_PUBLIC_API_URL` trỏ về backend Render.
2. **Backend $\rightarrow$ Render:**
   - Đã cấu hình sẵn file [render.yaml](./render.yaml) và [Dockerfile](./backend/Dockerfile).
   - Chọn **Blueprint** trên Render Dashboard để triển khai 1-click.
3. **Database & Storage $\rightarrow$ Supabase:**
   - Đã khởi tạo hoàn tất 100% trên Supabase PostgreSQL.
