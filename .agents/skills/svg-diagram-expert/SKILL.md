---
name: svg-diagram-expert
description: >-
  Expert 2D vector SVG diagram generator and validator for educational questions, STEM geometry, math graphs, and science illustrations.
  Provides coordinate calculation, visual verification via Vision self-check (scripts/verify-svg.js),
  clean typography, collision-free labeling, and dual theme support (Academic Light & Cosmic Dark).
  Use whenever generating 2D SVG diagrams, geometric figures, coordinate graphs, or visual assets for exams, questions, or LMS cards.
---

# SVG Diagram Expert: 2D Educational Vector Graphics Standard

Kỹ năng chuyên gia thiết kế, tạo lập và thẩm định hình ảnh vector SVG 2D phục vụ bài giảng, đề kiểm tra, ngân hàng câu hỏi toán học (Hình học phẳng, Đồ thị tọa độ, Vector) và khoa học tự nhiên.

---

## 1. Nguyên Tắc Cốt Lõi: The 4-Stage Pipeline

Mọi sơ đồ SVG tạo ra phải trải qua quy trình 4 giai đoạn bắt buộc:

```
[1. Coordinate Table] ➔ [2. Generate SVG/Python] ➔ [3. Render to PNG] ➔ [4. Vision Self-Check]
   (Lập bảng tọa độ)       (Sinh mã chuẩn xác)      (scripts/verify-svg)    (read & Tự sửa lỗi)
```

### Bước 1: Lập bảng toạ độ trước khi vẽ (Coordinate Registry)
Tuyệt đối không nhẩm tọa độ tùy tiện. Xác định kích thước canvas (chuẩn `viewBox="0 0 600 400"` hoặc `viewBox="0 0 540 320"`), sau đó liệt kê tọa độ $(x, y)$ của các điểm mấu chốt:
```text
- ViewBox: 0 0 600 400
- Đỉnh A: (300, 70)
- Đỉnh B: (120, 330)
- Đỉnh C: (480, 330)
- Chân đường cao H: (300, 330)
- Trung điểm M của AC: (390, 200)
```

### Bước 2: Sinh mã SVG hoặc dùng Python Helper
- Với hình cơ bản (đường thẳng, góc, tam giác đơn): Viết trực tiếp mã XML SVG sạch, tự chứa (self-contained).
- Với hình phức tạp (đồ thị hàm số $y=f(x)$, đường tròn nội/ngoại tiếp, giao điểm lượng giác): Viết script Python ngắn dùng `drawsvg` hoặc `matplotlib` để tính toán chính xác tuyệt đối.

### Bước 3: Render sang PNG
Chạy công cụ có sẵn trong repo:
```bash
node scripts/verify-svg.js path/to/file.svg /tmp/opencode/preview.png
# hoặc dùng cairosvg:
cairosvg path/to/file.svg -o /tmp/opencode/preview.png
```

### Bước 4: Vision Self-Check (Bắt buộc)
Gọi tool `read("/tmp/opencode/preview.png")` để nhìn hình thực tế:
- [ ] Chữ và số có bị đè lên đường kẻ hay đè vào nhau không?
- [ ] Cung góc (arc) có uốn đúng chiều không?
- [ ] Các điểm nút có nối khít vào nhau không?
- [ ] Hình có bị sát viền hay tràn khỏi `viewBox` không?
*(Nếu chưa đạt $\to$ chỉnh sửa tọa độ trong file `.svg` và render lại cho đến khi hoàn hảo).*

---

## 2. Tiêu Chuẩn Kỹ Thuật SVG Cho Đề Bài

### Canvas & Thẻ Root
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="auto">
```
- Luôn có thuộc tính `xmlns="http://www.w3.org/2000/svg"`.
- Bắt buộc có `viewBox`. Tránh gán cứng `width="600px"` mà không có `viewBox` vì sẽ làm vỡ giao diện trên điện thoại/màn hình nhỏ.

### Chống Đè Chữ (Anti-Collision Labeling Rules)
Không bao giờ đặt chữ ngay tại tâm điểm $(x, y)$. Luôn dịch chuyển (offset) theo quy tắc góc phần tư và dùng `text-anchor` cùng `dominant-baseline`:
| Vị trí đỉnh | Offset $(x, y)$ | Thuộc tính căn lề |
| :--- | :--- | :--- |
| **Đỉnh trên cùng** (Đỉnh $A$) | $x$, $y - 14$ | `text-anchor="middle"` |
| **Đáy dưới** (Điểm $H, M$) | $x$, $y + 20$ | `text-anchor="middle"` |
| **Bên trái** (Đỉnh $B$) | $x - 14$, $y + 4$ | `text-anchor="end" dominant-baseline="central"` |
| **Bên phải** (Đỉnh $C$) | $x + 14$, $y + 4$ | `text-anchor="start" dominant-baseline="central"` |
| **Góc phần tư I (Trên Phải)** | $x + 12$, $y - 12$ | `text-anchor="start"` |
| **Góc phần tư II (Trên Trái)**| $x - 12$, $y - 12$ | `text-anchor="end"` |

---

## 3. Hệ Màu & Phong Cách (Dual Theme System)

### Theme 1: Academic Light (Chuẩn Đề Thi THPT & Phiếu Học Tập)
Dành cho học sinh THPT (Thái, Nam Việt) hoặc đề in giấy:
- **Nền:** `#F8FAFC` (Slate 50) hoặc trong suốt với khung bo viền `#CBD5E1`.
- **Đường nét chính:** `#0F172A` (Slate 900), `stroke-width="2.5"`.
- **Đường phụ / Phân giác / Đường cao:** `#2563EB` (Blue 600) hoặc nét đứt `stroke-dasharray="5,5"`.
- **Góc / Vùng cần tính:** Nổi bật bằng màu cam `#EA580C` hoặc đỏ `#DC2626`.
- **Font chữ:** `font-family="system-ui, -apple-system, sans-serif"`, số đo góc in đậm hoặc font monospace.

### Theme 2: Cosmic Cockpit (Keithley Lake - Space Mission)
Dành cho giao diện vũ trụ Sci-Fi của Keithley:
- **Nền:** Gradient `#080D1A` đến `#0E1626`, viền cyan neon `#06B6D4` bo góc `rx="16"`.
- **Đường nét chính:** `#38BDF8` (Sky blue) hoặc `#F1F5F9`, `stroke-width="3"`.
- **Điểm nút (Waypoints):** Vòng tròn glowing `<circle cx="..." cy="..." r="5" fill="#22D3EE" />`.
- **Cung góc & tia đối:** Neon cyan `#06B6D4` hoặc amber `#F59E0B`.

---

## 4. Ký Hiệu Hình Học Mẫu (Reusable Snippets)

### Ký hiệu góc vuông tại điểm $(x, y)$
Nếu góc vuông quay về hướng Tây-Bắc với kích thước $s = 14$:
```xml
<path d="M 300 316 L 286 316 L 286 330" fill="none" stroke="#2563EB" stroke-width="2" />
```

### Mũi tên vector / tia trên đường thẳng
Định nghĩa trong `<defs>`:
```xml
<defs>
  <marker id="arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
    <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563EB" />
  </marker>
</defs>
<line x1="100" y1="200" x2="400" y2="200" stroke="#2563EB" stroke-width="2.5" marker-end="url(#arrow)" />
```

### Cung góc tròn (Angle Arc)
Để vẽ cung góc bán kính $r=30$ từ góc $\alpha$ đến $\beta$:
```xml
<!-- Cung góc nhọn đỉnh B(120, 330) bán kính r=35 -->
<path d="M 155 330 A 35 35 0 0 0 144 305" fill="rgba(234, 88, 12, 0.15)" stroke="#EA580C" stroke-width="2" />
<text x="162" y="318" fill="#EA580C" font-size="13" font-weight="bold">60°</text>
```

---

## 5. Tạo Hình Bằng Python Khi Gặp Toán Phức Tạp

Khi cần vẽ đồ thị tọa độ $Oxy$, hàm số $y = ax^2 + bx + c$, hình tròn nội tiếp/ngoại tiếp hoặc hệ vector:
Tạo script tạm thời tại `/tmp/generate_fig.py` dùng `drawsvg` hoặc `matplotlib`:

```python
import drawsvg as draw

d = draw.Drawing(600, 400, origin=(0, 0))
# Thêm các thành phần hình học
d.save_svg("frontend/public/images/geometry/ten_hinh.svg")
```
Sau đó render và kiểm tra:
```bash
node scripts/verify-svg.js frontend/public/images/geometry/ten_hinh.svg
```

---

## 6. Pre-Ship Checklist
1. [ ] File SVG được lưu vào đúng thư mục: `frontend/public/images/geometry/<topic>_<name>.svg`.
2. [ ] Đã chạy `scripts/verify-svg.js` và model đã dùng `read` trên ảnh PNG để xác nhận tính thẩm mỹ.
3. [ ] Cú pháp nhúng chuẩn vào Markdown:
   `![Figure: Title](/images/geometry/<topic>_<name>.svg)`
4. [ ] Chạy `git add frontend/public/images/geometry/` để đảm bảo Vercel deploy đầy đủ hình ảnh.
