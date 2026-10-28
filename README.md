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

| Vai trò (Role) | Username | Họ và tên | Khối lớp & Điểm đặc biệt của giao diện |
| :--- | :--- | :--- | :--- |
| **Học sinh** | `an_lake` | **An Lake** | **Lớp 1 - Vương Quốc Thần Tiên:** Công chúa & rồng xanh, hoạt hình rực rỡ, nút 3D |
| **Học sinh** | `keithley` | **Keithley Lake** | **Lớp 7 & 9 - Trạm Không Gian:** Cockpit HUD vũ trụ, bài tập 90p, KaTeX & nộp ảnh |
| **Học sinh** | `thai` | **Thái** | **Lớp 11 - Trung Học Nâng Cao:** Đọc hiểu Tiếng Anh chuyên sâu, trắc nghiệm bấm giờ |
| **Học sinh** | `nam_viet` | **Nam Việt** | **Lớp 12 - Luyện Thi THPTQG:** Mục tiêu 9.0+, luyện đề chuẩn cấu trúc Bộ GD&ĐT |
| **Giáo viên** | `teacher` | **Thầy Minh (Gia Sư)** | **Bàn làm việc Bento:** Soạn bài KaTeX, giao bài hàng ngày, bàn chấm bài tự luận |
| **Phụ huynh** | `parent_nam` | **Chị Mai (Phụ huynh)** | **Cổng Giám Sát:** Quyền Chỉ Đọc (Read-only), xem điểm số và lời dặn của Thầy |

---

## 🌐 Hướng Dẫn Triển Khai Toàn Diện Lên Cloud (Free 100%)

### Bước 1: Deploy Backend lên Render (Miễn phí 100%)
Vì Frontend trên Vercel cần kết nối đến một Backend API có địa chỉ online (`https`), ta triển khai Backend lên Render trước:

1. Đăng nhập [https://dashboard.render.com](https://dashboard.render.com) (chọn Login with GitHub).
2. Bấm **New +** $\rightarrow$ chọn **Blueprint**.
3. Chọn repository: **`thucvanminh/teachingPlatform`**.
4. Render sẽ tự động đọc file [`render.yaml`](./render.yaml) có sẵn:
   - Điền các biến môi trường khi Render yêu cầu:
     - `DATABASE_URL`: `postgresql://postgres.jxikmcvhamcdrsmyoyid:Thuc1023%21%21%21@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres`
     - `SUPABASE_URL`: `https://jxikmcvhamcdrsmyoyid.supabase.co`
     - `SUPABASE_ANON_KEY`: *(Key Supabase anon publish)*
     - `SUPABASE_SERVICE_ROLE_KEY`: *(Key Supabase service_role)*
5. Bấm **Apply**. Sau khoảng 2 - 3 phút, Render sẽ cấp cho bạn một URL Backend (Ví dụ: `https://teaching-platform-backend.onrender.com`).
   * *URL API của bạn sẽ là:* `https://teaching-platform-backend.onrender.com/api`

---

### Bước 2: Deploy Frontend Next.js lên Vercel (Miễn phí 100%)

1. Truy cập [https://vercel.com/new](https://vercel.com/new) và đăng nhập bằng tài khoản GitHub của bạn.
2. Tại mục **Import Git Repository**, chọn repository: **`thucvanminh/teachingPlatform`** $\rightarrow$ bấm **Import**.
3. **CẤU HÌNH QUAN TRỌNG (Do dự án dạng Monorepo):**
   * Tại dòng **Root Directory**: bấm nút **Edit**, chọn thư mục **`frontend`** $\rightarrow$ bấm **Continue**.
   * Framework Preset: Vercel sẽ tự động chọn **Next.js**.
4. **CẤU HÌNH BIẾN MÔI TRƯỜNG (Environment Variables):**
   Bấm mở rộng mục **Environment Variables** và nhập 3 biến sau:
   * `NEXT_PUBLIC_API_URL` = `https://teaching-platform-backend.onrender.com/api` *(hoặc URL backend Render của bạn)*
   * `NEXT_PUBLIC_SUPABASE_URL` = `https://jxikmcvhamcdrsmyoyid.supabase.co`
   * `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4aWttY3ZoYW1jZHJzbXlveWlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMxNjQ0MTUsImV4cCI6MjEwODc0MDQxNX0.eZq3-ONcdhjw4YPYCp3FkLoVF-m7DWmxzjeGusRgQaI`
5. Bấm **Deploy**!
   * Vercel sẽ tự động build Next.js 15 trong khoảng 1 phút và cấp cho bạn đường link chính thức (Ví dụ: `https://teaching-platform.vercel.app`).
   * Kể từ bây giờ, mỗi lần bạn `git push` lên nhánh `main`, Vercel sẽ tự động build và cập nhật phiên bản mới nhất!
