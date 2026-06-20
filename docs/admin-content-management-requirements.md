# Tài liệu Phân tích Yêu cầu
## Phân hệ Quản lý Nội dung — EduMart Admin

**Phiên bản:** 1.0  
**Ngày:** 20/06/2026  
**Tác giả:** EduMart Product Team  
**Trạng thái:** Đã triển khai

---

## 1. Tổng quan

### 1.1 Mục đích

Phân hệ Quản lý Nội dung (CMS — Content Management System) cung cấp cho quản trị viên EduMart công cụ tập trung để tạo, xuất bản và kiểm soát toàn bộ nội dung biên tập trên nền tảng. Mục tiêu là tách biệt vai trò vận hành (đơn hàng, tài chính) và vai trò biên tập (blog, quảng cáo, trang tĩnh), cho phép đội nội dung hoạt động độc lập mà không cần kỹ thuật. Nội dung chất lượng cao và được cập nhật thường xuyên trực tiếp nâng cao SEO, tạo niềm tin với phụ huynh và học sinh, đồng thời hỗ trợ các chiến dịch marketing theo mùa.

### 1.2 Phạm vi

| Nhóm | Mô tả |
|------|-------|
| **Blog** | Tạo, chỉnh sửa, xuất bản, ẩn và xóa bài viết; ghim bài viết nổi bật |
| **Bình luận Blog** | Kiểm duyệt bình luận, duyệt/xóa, cấm người dùng vi phạm |
| **Banner & Quảng cáo** | Quản lý banner trang chủ, sắp xếp thứ tự, cài đặt popup khuyến mãi |
| **Trang tĩnh** | Chỉnh sửa nội dung các trang pháp lý và thông tin cố định |

### 1.3 Người dùng hệ thống (Actors)

| Actor | Quyền truy cập |
|-------|----------------|
| **Super Admin** | Toàn bộ tính năng: blog, bình luận, banner, trang tĩnh |
| **Content Admin** | Blog, bình luận, banner — không chỉnh sửa trang tĩnh pháp lý |
| **Read-only Admin** | Chỉ xem danh sách bài viết và bình luận |

### 1.4 Điều kiện tiên quyết

- Người dùng đã có tài khoản với `role='admin'` và đã đăng nhập
- Dữ liệu blog được khởi tạo trong `cmsBlogs[]`
- Dữ liệu bình luận được khởi tạo trong `cmsComments[]`
- Dữ liệu banner được khởi tạo trong `cmsBanners[]`
- Cấu hình popup được lưu trong `cmsPopup` object
- Nội dung trang tĩnh được lưu trong `cmsStaticPages` object

---

## 2. Yêu cầu chức năng

### 2.1 FR-01: Blog

#### FR-01.1 Bảng thống kê tổng quan

**Mô tả:** Hiển thị 4 chỉ số tổng hợp dạng KPI card ngay đầu trang blog.

| Chỉ số | Điều kiện | Màu |
|--------|-----------|-----|
| Tổng bài viết | `cmsBlogs.length` | Mặc định |
| Đã xuất bản | `status='published'` | Xanh lá `#27ae60` |
| Bản nháp | `status='draft'` | Cam `#e67e22` |
| Đang ẩn | `status='hidden'` | Xám `#95a5a6` |

#### FR-01.2 Danh sách bài viết

**Mô tả:** Bảng liệt kê toàn bộ bài viết với tìm kiếm, lọc và phân trang.

**Dữ liệu hiển thị trên mỗi dòng:**

| Cột | Nội dung |
|-----|---------|
| Tiêu đề | Tiêu đề bài viết (đậm); icon 📌 nếu bài ghim; danh mục và 2 tag đầu (nhạt) |
| Trạng thái | Badge màu (xem FR-01.4) |
| Lượt xem | Số nguyên, định dạng locale vi-VN |
| Bình luận | Tổng số bình luận của bài |
| Ngày đăng | `publishedAt` hoặc `createdAt` nếu chưa đăng |
| Thao tác | Nút **Sửa** · Nút **📌 Ghim / Bỏ ghim** · Nút **Xóa** |

**Sắp xếp mặc định:** Bài ghim trước (`featured=true`), sau đó theo `createdAt` mới nhất.

**Phân trang:** 8 bản ghi/trang.

**Bộ lọc:**
- Tìm kiếm realtime: khớp chuỗi con trên tiêu đề và tags
- Lọc trạng thái: Tất cả / Đã xuất bản / Bản nháp / Đang ẩn
- Lọc danh mục: Tất cả / 5 danh mục blog

#### FR-01.3 Danh mục Blog

| Giá trị | Nhãn hiển thị |
|---------|--------------|
| `hoc-tap` | Học tập & Kỹ năng |
| `tin-tuc` | Tin tức giáo dục |
| `thu-vien` | Thư viện sách |
| `chia-se` | Chia sẻ kinh nghiệm |
| `khuyen-mai` | Khuyến mãi & Ưu đãi |

#### FR-01.4 Trạng thái bài viết

| Trạng thái | Giá trị | Badge |
|------------|---------|-------|
| Đã xuất bản | `published` | Xanh lá — "Đã xuất bản" |
| Bản nháp | `draft` | Cam — "Nháp" |
| Đang ẩn | `hidden` | Xám — "Ẩn" |

#### FR-01.5 Editor bài viết (Tạo mới & Chỉnh sửa)

**Kích hoạt:**
- Tạo mới: click "+ Viết bài mới" → `admBlogEditId='new'`
- Chỉnh sửa: click "Sửa" trên dòng bảng → `admBlogEditId = blog.id`

**Layout:** 2 cột — cột chính (nội dung) + sidebar (tùy chọn xuất bản).

**Cột chính — các trường:**

| Trường | Loại | Bắt buộc | Ghi chú |
|--------|------|----------|---------|
| Tiêu đề | Text input | ✓ | Tự động sinh slug URL |
| Tóm tắt (Excerpt) | Textarea | — | Hiển thị ở danh sách blog ngoài frontend |
| Nội dung | Rich text editor (contenteditable) | — | Hỗ trợ định dạng HTML |

**Toolbar Rich text:**

| Nút | Lệnh | Mô tả |
|-----|------|-------|
| **B** | `bold` | Chữ đậm |
| *I* | `italic` | Chữ nghiêng |
| <u>U</u> | `underline` | Gạch chân |
| H2 | `formatBlock H2` | Tiêu đề cấp 2 |
| H3 | `formatBlock H3` | Tiêu đề cấp 3 |
| ¶ | `formatBlock P` | Đoạn văn bản |
| ≡ | `insertUnorderedList` | Danh sách không thứ tự |
| 1. | `insertOrderedList` | Danh sách có số |
| 🔗 | `createLink` | Chèn liên kết (prompt URL) |
| 🖼 | `insertImage` | Chèn hình ảnh (prompt URL) |

**Sidebar — Xuất bản:**
- Nút **🌐 Xuất bản ngay** → lưu với `status='published'`
- Nút **💾 Lưu nháp** → lưu với `status='draft'`
- Nút **🚫 Ẩn bài viết** → lưu với `status='hidden'`
- Nút **🗑 Xóa bài viết** (chỉ hiện khi chỉnh sửa, không có khi tạo mới)
- Hiển thị trạng thái hiện tại, ngày đăng và ngày cập nhật

**Sidebar — Danh mục & Tag:**
- Dropdown chọn danh mục (bắt buộc, mặc định `hoc-tap`)
- Text input Tags, phân cách bằng dấu phẩy

**Sidebar — Ảnh bìa & Tùy chọn:**
- Text input URL ảnh bìa (thumbnail)
- Checkbox **Ghim bài viết lên đầu (Featured)**

#### FR-01.6 Lưu bài viết

**Luồng chung:**
1. Admin click một trong 3 nút Xuất bản / Lưu nháp / Ẩn
2. Hệ thống đọc tất cả giá trị từ DOM
3. Kiểm tra tiêu đề không rỗng — nếu rỗng: toast cảnh báo, dừng
4. Tự động sinh `slug` từ tiêu đề (lowercase, bỏ dấu, thay khoảng trắng bằng dấu gạch ngang)
5. **Nếu tạo mới:** tạo object mới, thêm vào đầu `cmsBlogs[]`
6. **Nếu chỉnh sửa:** cập nhật object hiện tại, ghi `updatedAt`
7. Ghi `publishedAt = todayStr()` nếu chuyển sang `published` lần đầu
8. Gọi `saveCmsBlogs()`, đặt `admBlogEditId=null`, gọi `renderAccount()`
9. Toast xác nhận: "Đã tạo bài viết mới" hoặc "Đã lưu bài viết"

**Nội dung editor:** Đọc từ `document.getElementById('blogEditor').innerHTML` — không gây re-render trong quá trình soạn thảo, tránh mất dữ liệu.

#### FR-01.7 Xóa bài viết

**Luồng:**
1. Admin click "🗑 Xóa bài viết"
2. Hộp thoại xác nhận kèm tên bài viết và cảnh báo "Hành động này không thể hoàn tác"
3. Hủy → không thay đổi gì
4. Xác nhận → xóa bài viết khỏi `cmsBlogs[]` + xóa toàn bộ bình luận cùng `blogId` khỏi `cmsComments[]`
5. Đặt `admBlogEditId=null`, gọi `saveCmsBlogs()`, `saveCmsComments()`, toast, re-render

**Tính toàn vẹn:** Xóa bài viết đồng thời xóa bình luận liên quan — tránh orphan data.

#### FR-01.8 Ghim bài viết (Featured)

**Mô tả:** Đánh dấu một bài viết xuất hiện nổi bật đầu trang blog.

**Quy tắc:** Chỉ tồn tại **1 bài ghim** tại một thời điểm. Khi ghim bài mới, hệ thống tự động bỏ ghim tất cả bài hiện tại trước.

**Luồng:**
1. Admin click "📌 Ghim" → bỏ ghim tất cả bài, set `b.featured=true` cho bài được chọn
2. Admin click "Bỏ ghim" → set `b.featured=false` cho bài đó
3. Gọi `saveCmsBlogs()`, re-render, toast xác nhận

**Visual:** Bài ghim hiển thị icon 📌 trước tiêu đề; nút có màu `#e67e22`.

---

### 2.2 FR-02: Bình luận Blog

#### FR-02.1 Bảng thống kê tổng quan

| Chỉ số | Điều kiện | Màu |
|--------|-----------|-----|
| Tổng bình luận | `cmsComments.length` | Mặc định |
| Chờ duyệt | `status='pending'` | Cam `#e67e22` |
| Đã duyệt | `status='approved'` | Xanh lá `#27ae60` |
| Đã xóa | `status='deleted'` | Xám `#95a5a6` |

**Badge trên tab:** Số bình luận `pending` hiển thị badge đỏ trên tiêu đề tab "Bình luận".

#### FR-02.2 Danh sách bình luận

**Dữ liệu hiển thị trên mỗi dòng:**

| Cột | Nội dung |
|-----|---------|
| Người dùng | Tên (đậm) + tag đỏ "[Đã cấm]" nếu `bannedUser=true` + ngày bình luận |
| Nội dung | Nội dung bình luận, cắt ngắn nếu quá dài |
| Bài viết | Tiêu đề bài viết liên quan |
| Trạng thái | Badge màu (xem FR-02.3) |
| Thao tác | Nút theo trạng thái (xem FR-02.4) |

**Tìm kiếm:** Realtime, khớp trên tên người dùng, nội dung bình luận và tiêu đề bài viết.

**Lọc trạng thái:** Tất cả / Chờ duyệt / Đã duyệt / Đã xóa.

**Sắp xếp mặc định:** ID giảm dần (mới nhất trước).

**Phân trang:** 12 bản ghi/trang.

#### FR-02.3 Trạng thái bình luận

| Trạng thái | Giá trị | Badge |
|------------|---------|-------|
| Chờ duyệt | `pending` | Cam — "Chờ duyệt" |
| Đã duyệt | `approved` | Xanh lá — "Đã duyệt" |
| Đã xóa | `deleted` | Xám — "Đã xóa" |

#### FR-02.4 Nút thao tác theo trạng thái

| Trạng thái | Nút hiển thị |
|------------|-------------|
| `pending` | ✓ Duyệt · Xóa · Cấm |
| `approved` | Xóa · Cấm |
| `deleted` | *(Không có nút)* |

Nút **Cấm** không hiển thị nếu `bannedUser=true` hoặc `status='deleted'`.

#### FR-02.5 Duyệt bình luận

**Luồng:**
1. Admin click "✓ Duyệt"
2. Hệ thống: `c.status = 'approved'`
3. Gọi `saveCmsComments()`, re-render, toast xác nhận

#### FR-02.6 Xóa bình luận vi phạm

**Luồng:**
1. Admin click "Xóa"
2. Hộp thoại xác nhận
3. Hệ thống: `c.status = 'deleted'` (soft delete)
4. Gọi `saveCmsComments()`, re-render, toast xác nhận

**Thiết kế:** Soft delete — bình luận vẫn còn trong hệ thống với `status='deleted'` để kiểm tra sau này.

#### FR-02.7 Cấm người dùng bình luận

**Mô tả:** Đánh dấu toàn bộ bình luận của một người dùng là "bị cấm", ngăn không cho tạo bình luận mới.

**Phạm vi:** Ảnh hưởng đến **tất cả bình luận** của `userId` đó, không chỉ bình luận đang xét.

**Luồng:**
1. Admin click "Cấm"
2. Hộp thoại xác nhận: "Cấm người dùng [Tên] bình luận trên toàn hệ thống?"
3. Hệ thống: `cmsComments.filter(x => x.userId === c.userId).forEach(x => x.bannedUser = true)`
4. Gọi `saveCmsComments()`, re-render, toast xác nhận

**Visual feedback:** Tên người dùng bị cấm hiển thị tag đỏ "[Đã cấm]" trên tất cả bình luận.

---

### 2.3 FR-03: Banner & Quảng cáo

#### FR-03.1 Cấu trúc tab

Sub-tab trong nhóm Banner & Quảng cáo:
- **Banner trang chủ:** Quản lý danh sách banner
- **Popup khuyến mãi:** Cài đặt popup toàn site

#### FR-03.2 Danh sách Banner

**Dữ liệu hiển thị trên mỗi card:**

| Thành phần | Nội dung |
|------------|---------|
| Số thứ tự | Badge tròn màu `var(--ink)` hiển thị vị trí hiện tại |
| Tiêu đề | Tên banner (đậm), cắt bằng `text-overflow: ellipsis` |
| Metadata | Link xem ảnh · URL liên kết · Ngày bắt đầu → Ngày kết thúc · Trạng thái bật/tắt |
| Nút sắp xếp | ▲ (lên) / ▼ (xuống) — disabled ở đầu/cuối danh sách |
| Nút hành động | Bật/Tắt · Sửa · Xóa |

**Visual trạng thái:** Card tắt (`active=false`) hiển thị với `opacity: 55%`.

#### FR-03.3 Thêm banner mới

**Kích hoạt:** Click "+ Thêm banner" → `admBannerEditId='new'` → form hiển thị phía trên danh sách.

**Form thêm mới:**

| Trường | Loại | Bắt buộc | Ghi chú |
|--------|------|----------|---------|
| Tiêu đề | Text input | ✓ | Hiển thị nội bộ |
| Alt text | Text input | — | Accessibility cho ảnh |
| URL hình ảnh | Text input | — | URL ảnh banner |
| URL liên kết | Text input | — | Đích khi người dùng click |
| Ngày bắt đầu | Date input | — | Định dạng YYYY-MM-DD (HTML) → chuyển sang DD/MM/YYYY khi lưu |
| Ngày kết thúc | Date input | — | Để trống = không hạn |
| Hiển thị ngay | Checkbox | — | Nếu không check, banner ở trạng thái tắt |

**Validation:** Tiêu đề rỗng → toast cảnh báo, không lưu.

**Luồng lưu:**
1. Đọc giá trị từ DOM
2. Kiểm tra tiêu đề
3. Chuyển đổi ngày: `YYYY-MM-DD` → `DD/MM/YYYY`
4. **Tạo mới:** `cmsBanners.push({id: 'ban-'+Date.now().toString(36), ...})`
5. **Chỉnh sửa:** `Object.assign(b, {...})`
6. `saveCmsBanners()`, `admBannerEditId=null`, re-render, toast

#### FR-03.4 Chỉnh sửa banner

**Kích hoạt:** Click "Sửa" → `admBannerEditId = banner.id` → form hiển thị với giá trị hiện tại điền sẵn.

**Luồng:** Tương tự FR-03.3, nhưng cập nhật object hiện tại thay vì tạo mới.

#### FR-03.5 Xóa banner

**Luồng:**
1. Admin click "Xóa"
2. Hộp thoại xác nhận kèm tên banner
3. Xác nhận → `cmsBanners = cmsBanners.filter(x => x.id !== id)`
4. `saveCmsBanners()`, `admBannerEditId=null`, re-render, toast

#### FR-03.6 Bật/Tắt banner

**Mô tả:** Toggle hiển thị banner mà không xóa.

**Luồng:** `b.active = !b.active` → `saveCmsBanners()` → re-render → toast.

**Nút:** Hiển thị "Tắt" khi đang bật (nền xám), "Bật" khi đang tắt (nền xanh lá).

#### FR-03.7 Sắp xếp thứ tự banner

**Mô tả:** Điều chỉnh vị trí hiển thị banner bằng nút ▲/▼.

**Luồng `doBannerMove(id, dir)`:**
1. Tìm index của banner trong `cmsBanners[]`
2. `dir=-1` → lên trên (hoán đổi với `i-1`)
3. `dir=+1` → xuống dưới (hoán đổi với `i+1`)
4. Kiểm tra biên: nếu `i=0` và `dir=-1`, hoặc `i=length-1` và `dir=1` → không làm gì
5. `[cmsBanners[i], cmsBanners[ni]] = [cmsBanners[ni], cmsBanners[i]]`
6. `saveCmsBanners()`, re-render

**Nút disabled:** ▲ disabled khi banner ở vị trí 1; ▼ disabled khi banner ở vị trí cuối.

**Hiệu lực:** Thứ tự lưu trong `cmsBanners[]` là thứ tự hiển thị trên frontend.

#### FR-03.8 Cài đặt Popup khuyến mãi

**Mô tả:** Popup hiển thị toàn màn hình sau khi người dùng vào trang, dùng để quảng bá chương trình nổi bật.

**Các trường cài đặt:**

| Trường | Loại | Mô tả |
|--------|------|-------|
| Bật popup | Checkbox | Kích hoạt/tắt toàn bộ popup |
| Tiêu đề | Text input | Dòng tiêu đề in đậm trong popup |
| Nội dung | Textarea | Mô tả ngắn chương trình |
| URL hình ảnh | Text input | Ảnh minh họa popup |
| URL liên kết | Text input | Đích khi click nút CTA |
| Nhãn nút CTA | Text input | Ví dụ: "Xem ngay", "Mua ngay" |
| Hiện sau (giây) | Number input | Delay trước khi popup xuất hiện (0–60s) |
| Hiện 1 lần / người | Checkbox | Lưu trạng thái đã xem trong localStorage của người dùng |

**Luồng lưu:** Đọc tất cả giá trị DOM → `Object.assign(cmsPopup, {...})` → ghi `updatedAt=todayStr()` → `saveCmsPopup()` → re-render → toast.

**Hiển thị trạng thái:** Badge "Đang bật" (xanh) hoặc "Đang tắt" (xám) ngay cạnh checkbox.

---

### 2.4 FR-04: Trang tĩnh

#### FR-04.1 Danh sách trang tĩnh

| Key | Tên trang | Mô tả nội dung |
|-----|-----------|----------------|
| `about` | Về chúng tôi | Giới thiệu công ty, tầm nhìn, giá trị cốt lõi, liên hệ |
| `terms` | Điều khoản sử dụng | Các điều khoản ràng buộc pháp lý khi sử dụng nền tảng |
| `privacy` | Chính sách bảo mật | Thu thập, sử dụng và bảo vệ dữ liệu người dùng |
| `returns` | Chính sách đổi/trả | Điều kiện, quy trình và thời hạn đổi/trả hàng |

#### FR-04.2 Chỉnh sửa trang tĩnh

**Kích hoạt:** Click tên trang từ bộ chọn phía trên editor.

**State:** `admStaticPage` lưu key của trang đang chỉnh sửa (mặc định `'about'`).

**Editor:** `contenteditable div` với cùng toolbar rich text như Blog Editor (bold, italic, underline, H2, H3, ¶, list không thứ tự, list có số).

**Chiều cao tối thiểu:** `min-height: 380px` để dễ chỉnh sửa nội dung dài.

**Metadata hiển thị:** Ngày cập nhật lần cuối (`updatedAt`) ở góc trên phải form.

#### FR-04.3 Lưu trang tĩnh

**Luồng `doSaveStaticPage(key)`:**
1. Đọc `document.getElementById('staticPageEditor').innerHTML`
2. Gán `cmsStaticPages[key].content = innerHTML`
3. Gán `cmsStaticPages[key].updatedAt = todayStr()`
4. Gọi `saveCmsStaticPages()`, re-render, toast kèm tên trang

**Lưu ý:** Mỗi trang được lưu độc lập — lưu trang "Về chúng tôi" không ảnh hưởng đến các trang khác.

**Nút lưu:** Hiển thị tên trang trong nhãn nút để tránh nhầm lẫn (ví dụ: "💾 Lưu trang Về chúng tôi").

---

## 3. Yêu cầu phi chức năng

### 3.1 NFR-01: Hiệu năng

- Tìm kiếm blog và bình luận phản hồi trong < 100ms (client-side, không gọi server)
- Editor blog không gây re-render trong quá trình soạn thảo — chỉ re-render khi lưu hoặc hủy
- Sắp xếp lại banner (hoán đổi mảng) re-render trong < 50ms

### 3.2 NFR-02: Tính toàn vẹn dữ liệu

- Xóa bài viết đồng thời xóa bình luận liên quan (tránh orphan comments)
- Xóa bình luận là **soft delete** (`status='deleted'`), không mất bản ghi
- Cấm người dùng áp dụng cho **tất cả** bình luận cùng `userId`, không chỉ bình luận đang xét
- Ghim bài viết là **exclusive** — luôn tối đa 1 bài được ghim

### 3.3 NFR-03: Bảo mật

- **XSS Prevention:** Tất cả giá trị từ form (tiêu đề, tên, URL...) phải qua `escHtml()` khi render lại vào HTML
- **Trusted HTML:** Nội dung `innerHTML` từ `contenteditable` (blog content, static pages) được coi là HTML đáng tin vì chỉ admin mới chỉnh sửa — không cần sanitize thêm
- URL hình ảnh và liên kết trong form không được thực thi như script — chỉ là chuỗi văn bản

### 3.4 NFR-04: Persistence

- `cmsBlogs`, `cmsComments`, `cmsBanners` lưu vào `localStorage` qua các hàm `saveCms*()`
- `cmsPopup` và `cmsStaticPages` cũng persist qua `localStorage`
- Dữ liệu mặc định được seed tự động khi chưa có (`LS.get(key, null)` trả về `null`)
- Thay đổi có hiệu lực ngay sau khi lưu — không cần publish step riêng cho CMS

### 3.5 NFR-05: Giao diện responsive

| Breakpoint | Điều chỉnh |
|------------|-----------|
| ≤ 1000px | Editor blog chuyển layout 1 cột (sidebar xuống dưới main) |
| ≤ 700px | Banner card cho phép wrap; actions xuống hàng riêng |
| ≤ 600px | Các bảng (blog list, bình luận) ẩn bớt cột phụ |

---

## 4. Mô hình dữ liệu

### 4.1 BlogPost Object

```javascript
{
  id: string,            // 'blog-001' hoặc 'blog-' + Date.now().toString(36)
  title: string,         // Tiêu đề bài viết
  slug: string,          // URL-friendly: 'ten-bai-viet'
  category: CategoryEnum,
  tags: string[],        // ['học tập', 'kỹ năng', 'THPT']
  status: StatusEnum,

  featured: boolean,     // Bài ghim — tối đa 1 bài true tại mọi thời điểm
  authorName: string,    // 'Admin EduMart'

  thumbnail: string,     // URL ảnh bìa (có thể rỗng '')
  excerpt: string,       // Tóm tắt hiển thị ở danh sách
  content: string,       // HTML đầy đủ từ contenteditable editor

  publishedAt: string,   // 'DD/MM/YYYY' hoặc '' nếu chưa xuất bản
  createdAt: string,     // 'DD/MM/YYYY'
  updatedAt: string,     // 'DD/MM/YYYY'
  views: number,         // Lượt xem (tăng bởi frontend reader)
  commentCount: number   // Số bình luận approved
}
```

```javascript
type CategoryEnum = 'hoc-tap' | 'tin-tuc' | 'thu-vien' | 'chia-se' | 'khuyen-mai'
type StatusEnum = 'published' | 'draft' | 'hidden'
```

**Dữ liệu mặc định (8 bài viết):**

| ID | Tiêu đề | Danh mục | Trạng thái |
|----|---------|----------|------------|
| blog-001 | 10 phương pháp học hiệu quả cho học sinh THPT | hoc-tap | published, featured |
| blog-002 | Top 20 cuốn sách không thể thiếu cho học sinh lớp 10 | thu-vien | published |
| blog-003 | EduMart ra mắt tính năng gợi ý sách thông minh bằng AI | tin-tuc | published |
| blog-004 | Hướng dẫn chọn văn phòng phẩm chất lượng cao cho năm học mới | chia-se | published |
| blog-005 | Ebook vs Sách giấy: Đâu là lựa chọn tốt hơn? | thu-vien | draft |
| blog-006 | Kỹ năng đọc sách hiệu quả trong 30 phút mỗi ngày | hoc-tap | draft |
| blog-007 | Flash Sale Mùa Tựu Trường – Giảm đến 50% | khuyen-mai | hidden |
| blog-008 | Chào mừng năm học mới 2025–2026 | tin-tuc | published |

### 4.2 BlogComment Object

```javascript
{
  id: string,            // 'cmt-001'
  blogId: string,        // ID bài viết liên quan
  blogTitle: string,     // Tên bài viết (denormalized để hiển thị nhanh)
  userId: string,        // ID người dùng
  userName: string,      // Tên hiển thị người dùng
  content: string,       // Nội dung bình luận (plaintext)
  createdAt: string,     // 'DD/MM/YYYY'
  status: CommentStatusEnum,
  bannedUser: boolean    // true = người dùng đã bị cấm bình luận
}
```

```javascript
type CommentStatusEnum = 'pending' | 'approved' | 'deleted'
```

**Dữ liệu mặc định (12 bình luận):** Trải đều trên 5 bài viết, gồm 6 approved, 4 pending, 1 deleted, 1 spam.

### 4.3 Banner Object

```javascript
{
  id: string,            // 'ban-001' hoặc 'ban-' + Date.now().toString(36)
  title: string,         // Tên banner (hiển thị nội bộ)
  imageUrl: string,      // URL ảnh banner
  linkUrl: string,       // URL liên kết khi click
  alt: string,           // Alt text cho accessibility
  startDate: string,     // 'DD/MM/YYYY' (rỗng = ngay lập tức)
  endDate: string,       // 'DD/MM/YYYY' (rỗng = không hạn)
  active: boolean        // true = đang hiển thị
}
```

**Thứ tự:** Xác định bởi vị trí trong mảng `cmsBanners[]`, không phải field riêng.

**Dữ liệu mặc định (3 banners):**

| ID | Tiêu đề | Trạng thái |
|----|---------|------------|
| ban-001 | Mùa Tựu Trường 2025 – Giảm 30% | active |
| ban-002 | Sách Mới Tháng 9 | active |
| ban-003 | Freeship Toàn Quốc | inactive |

### 4.4 Popup Object

```javascript
{
  enabled: boolean,          // Bật/tắt popup
  title: string,             // Tiêu đề popup
  content: string,           // Nội dung mô tả (plaintext)
  imageUrl: string,          // URL hình ảnh minh họa
  linkUrl: string,           // URL liên kết nút CTA
  linkText: string,          // Nhãn nút CTA: 'Xem ngay'
  delaySeconds: number,      // Delay trước khi hiện (giây, mặc định 3)
  showOnce: boolean,         // true = chỉ hiện 1 lần/trình duyệt
  updatedAt: string          // 'DD/MM/YYYY' ngày lưu gần nhất
}
```

**Mặc định:** `enabled: false` với nội dung mẫu mã giảm giá 10%.

### 4.5 StaticPages Object

```javascript
{
  about:   { title: 'Về chúng tôi',         content: string, updatedAt: string },
  terms:   { title: 'Điều khoản sử dụng',   content: string, updatedAt: string },
  privacy: { title: 'Chính sách bảo mật',   content: string, updatedAt: string },
  returns: { title: 'Chính sách đổi/trả',   content: string, updatedAt: string }
}
```

`content` là chuỗi HTML đầy đủ, được lưu trực tiếp từ `contenteditable.innerHTML`.

---

## 5. Luồng người dùng (User Flow)

### 5.1 Tạo và xuất bản bài viết mới

```
Admin → Tab "Nội dung" → Tab "Blog"
  → Bảng thống kê: 8 bài (4 published, 2 draft, 1 hidden)
  → Click "+ Viết bài mới"
  → Editor mở với tiêu đề trống, nội dung mặc định
  → Nhập tiêu đề: "Cách chọn sách tham khảo cho kỳ thi THPT Quốc gia 2026"
  → Soạn nội dung với toolbar (H2, danh sách, in đậm...)
  → Sidebar: chọn Danh mục "Học tập & Kỹ năng", Tags "ôn thi, THPT, sách hay"
  → Nhập URL thumbnail, check "Ghim bài viết"
  → Click "🌐 Xuất bản ngay"
  → Toast "Đã tạo bài viết mới"
  → Bài viết xuất hiện đầu danh sách với icon 📌, badge "Đã xuất bản"
```

### 5.2 Chỉnh sửa và ẩn bài viết khuyến mãi hết hạn

```
Admin → Danh sách Blog → Tìm "Flash Sale"
  → Click "Sửa" → Editor mở với nội dung bài blog-007
  → Cập nhật nội dung ngày kết thúc chương trình
  → Click "🚫 Ẩn bài viết"
  → Toast "Đã lưu bài viết"
  → Bài viết chuyển sang badge "Ẩn", không còn hiển thị trên frontend
```

### 5.3 Kiểm duyệt bình luận vi phạm

```
Admin → Tab "Bình luận"
  → Badge đỏ "4" trên tab — 4 bình luận chờ duyệt
  → Lọc "Chờ duyệt"
  → Thấy bình luận từ "QuảngCáoRẻ": nội dung spam quảng cáo lậu
  → Click "Xóa" → Confirm → Toast "Đã xóa bình luận"
  → Click "Cấm" trên bình luận vi phạm khác → Confirm
  → Toast "Đã cấm QuảngCáoRẻ bình luận"
  → Toàn bộ bình luận của QuảngCáoRẻ hiển thị tag "[Đã cấm]"
  → Duyệt 3 bình luận còn lại: click "✓ Duyệt" từng cái
```

### 5.4 Cập nhật banner mùa tựu trường

```
Admin → Tab "Banner & Quảng cáo" → Sub-tab "Banner trang chủ"
  → Thấy 3 banner; banner "Freeship" đang tắt (opacity thấp)
  → Click "Bật" cho banner Freeship → Toast "Đã bật banner"
  → Click "▲" cho banner Freeship 2 lần → Banner lên vị trí 1
  → Click "+ Thêm banner"
  → Nhập: Tiêu đề "Back to School 2026", URL ảnh, URL link /tuu-truong-2026
  → Ngày bắt đầu: 01/08/2026, Ngày kết thúc: 15/09/2026, Check "Hiển thị ngay"
  → Click "💾 Lưu banner" → Toast "Đã lưu banner"
  → Banner mới xuất hiện cuối danh sách (vị trí 4), đang active
```

### 5.5 Bật popup chương trình khuyến mãi

```
Admin → Tab "Banner & Quảng cáo" → Sub-tab "Popup khuyến mãi"
  → Trạng thái hiện tại: "Đang tắt"
  → Check "Bật popup khuyến mãi"
  → Tiêu đề: "Khai giảng 2026 – Ưu đãi đặc biệt!"
  → Nội dung: "Giảm 15% toàn bộ sách giáo khoa. Nhập mã KG2026. Hết hạn 15/09."
  → URL liên kết: /khuyen-mai/khai-giang-2026
  → Nhãn nút: "Mua ngay"
  → Delay: 2 giây · Check "Hiện 1 lần / người"
  → Click "💾 Lưu cài đặt popup"
  → Toast "Đã lưu cài đặt popup"
  → Badge chuyển sang "Đang bật" màu xanh
```

### 5.6 Cập nhật Chính sách đổi/trả

```
Admin → Tab "Trang tĩnh" → Click "Chính sách đổi/trả"
  → Editor hiển thị nội dung hiện tại với toolbar rich text
  → Thấy mục "4. Hoàn tiền" cần cập nhật từ "3–5 ngày" → "1–3 ngày làm việc"
  → Chọn text "3–5 ngày làm việc" → Gõ "1–3 ngày làm việc"
  → Click "💾 Lưu trang Chính sách đổi/trả"
  → Toast 'Đã lưu trang "Chính sách đổi/trả"'
  → Ngày cập nhật cuối chuyển sang ngày hôm nay
```

---

## 6. Mockup giao diện (ASCII)

### 6.1 Tab Blog — Danh sách bài viết

```
┌────────────────────────────────────────────────────────────────────────────┐
│ [Blog 4]  [Bình luận 4]  [Banner & Quảng cáo]  [Trang tĩnh]               │
├────────────────────────────────────────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐                       │
│  │    8     │ │    4     │ │    2     │ │    1     │                       │
│  │  Tổng   │ │Đã xuất   │ │  Nháp    │ │  Ẩn     │                       │
│  │ bài viết│ │bản       │ │          │ │          │                       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘                       │
├────────────────────────────────────────────────────────────────────────────┤
│  [+ Viết bài mới]  [Tìm bài viết, tag...]  [Tất cả trạng thái ▼]          │
│                                             [Tất cả danh mục ▼]            │
├────────────────────────────────────┬──────────┬──────┬──────┬──────┬──────┤
│ TIÊU ĐỀ                            │ TRẠNG TH │ VIEWS│ CMT  │ NGÀY │ TH   │
├────────────────────────────────────┼──────────┼──────┼──────┼──────┼──────┤
│ 📌 10 phương pháp học hiệu quả... │[Xuất bản]│ 1.247│   8  │15/06 │[Sửa] │
│    Học tập & Kỹ năng · học tập... │          │      │      │      │[Ghim]│
│                                    │          │      │      │      │[Xóa] │
├────────────────────────────────────┼──────────┼──────┼──────┼──────┼──────┤
│    Chào mừng năm học mới 2025–2026 │[Xuất bản]│ 2.104│  12  │01/09 │[Sửa] │
│    Tin tức giáo dục · năm học mới  │          │      │      │      │[Ghim]│
│                                    │          │      │      │      │[Xóa] │
├────────────────────────────────────┼──────────┼──────┼──────┼──────┼──────┤
│    Ebook vs Sách giấy...           │  [Nháp]  │   –  │   0  │25/05 │[Sửa] │
│    Thư viện sách · ebook, sách giấy│          │      │      │      │[Ghim]│
│                                    │          │      │      │      │[Xóa] │
└────────────────────────────────────┴──────────┴──────┴──────┴──────┴──────┘
```

### 6.2 Editor bài viết

```
← Danh sách bài viết   Viết bài mới

┌───────────────────────────────────────────┐  ┌──────────────────────────┐
│ TIÊU ĐỀ BÀI VIẾT *                       │  │ XUẤT BẢN                 │
│ [Nhập tiêu đề hấp dẫn..._______________] │  │ [🌐 Xuất bản ngay       ]│
│                                           │  │ [💾 Lưu nháp            ]│
│ TÓM TẮT (EXCERPT)                        │  │ [🚫 Ẩn bài viết         ]│
│ [Mô tả ngắn hiển thị ở danh sách...____] │  │ ──────────────────────── │
│ [__________________________________________]│  │ DANH MỤC & TAG           │
│                                           │  │ [Học tập & Kỹ năng    ▼] │
│ NỘI DUNG BÀI VIẾT                        │  │ Tags: [học tập, THPT___] │
│ ┌─ B  I  U  │ H2 H3 ¶ │ ≡ 1. │ 🔗 🖼 ──┐│  │ ──────────────────────── │
│ │                                        ││  │ ẢNH BÌA & TÙY CHỌN      │
│ │  Bắt đầu viết nội dung tại đây...     ││  │ URL thumbnail:           │
│ │                                        ││  │ [https://______________ ] │
│ │                                        ││  │ ☑ Ghim bài viết (Featured│
│ └────────────────────────────────────────┘│  └──────────────────────────┘
└───────────────────────────────────────────┘
```

### 6.3 Tab Bình luận

```
┌────────────────────────────────────────────────────────────────────────────┐
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐                       │
│  │   12     │ │    4     │ │    6     │ │    2     │                       │
│  │  Tổng   │ │ Chờ duyệt│ │Đã duyệt  │ │ Đã xóa  │                       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘                       │
│  [Tìm tên, nội dung, bài viết...]  [Tất cả ▼]                              │
├────────────────────┬────────────────────────┬───────────────┬──────────┬───┤
│ NGƯỜI DÙNG         │ NỘI DUNG               │ BÀI VIẾT      │ TR.THÁI  │TH │
├────────────────────┼────────────────────────┼───────────────┼──────────┼───┤
│ Phạm Minh Châu     │ Phương pháp số 7 mình  │ 10 phương     │[Chờ duyệt│[✓]│
│ 18/06/2025         │ chưa hiểu lắm, bạn có  │ pháp học...   │          │[X]│
│                    │ thể giải thích thêm?   │               │          │[C]│
├────────────────────┼────────────────────────┼───────────────┼──────────┼───┤
│ SpamBot2025 [Đã cấm│ Mua sách lậu giá rẻ   │ 10 phương     │ [Đã xóa] │   │
│ 17/06/2025         │ tại link... [SPAM]     │ pháp học...   │          │   │
└────────────────────┴────────────────────────┴───────────────┴──────────┴───┘
  [✓]=Duyệt  [X]=Xóa  [C]=Cấm
```

### 6.4 Tab Banner & Quảng cáo

```
┌────────────────────────────────────────────────────────────────────────────┐
│ [Banner trang chủ]  [Popup khuyến mãi]                                     │
├────────────────────────────────────────────────────────────────────────────┤
│                                                           [+ Thêm banner]  │
│ 3 banner · Dùng ▲▼ để sắp xếp                                              │
│                                                                             │
│  ┌─ ①  Mùa Tựu Trường 2025 – Giảm 30% toàn bộ SGK ────────────────────┐  │
│  │     Link: /khuyen-mai/tuu-truong · 15/08 → 15/09 · Đang hiển thị   │  │
│  │                             [▲][▼]  [Tắt]  [Sửa]  [Xóa]           │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌─ ②  Sách Mới Tháng 9 – Hàng Nghìn Đầu Sách Mới Về ─────────────────┐  │
│  │     Link: /sach-moi · 01/09 → 30/09 · Đang hiển thị                │  │
│  │                             [▲][▼]  [Tắt]  [Sửa]  [Xóa]           │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌─ ③  Freeship Toàn Quốc cho đơn từ 99.000đ ─────────────────────────┐  │
│  │     Link: / · 01/06 → 31/12 · Tắt                     (opacity 55%)│  │
│  │                             [▲][▼]  [Bật]  [Sửa]  [Xóa]           │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────┘
```

### 6.5 Form thêm/sửa banner (inline)

```
┌────────────────────────────────────────────────────────────────────────────┐
│ Thêm banner mới                                                             │
│ ┌─────────────────────────────────────┐ ┌───────────────────────────────┐  │
│ │ Tiêu đề *                           │ │ Alt text                      │  │
│ │ [Back to School 2026________________]│ │ [Ảnh tựu trường 2026_________]│  │
│ └─────────────────────────────────────┘ └───────────────────────────────┘  │
│ URL hình ảnh                                                                │
│ [https://cdn.edumart.vn/banners/back-to-school-2026.jpg________________]  │
│ URL liên kết                                                                │
│ [/tuu-truong-2026__________________________________________________________]│
│ ┌────────────────────────────────────┐ ┌──────────────────────────────┐   │
│ │ Ngày bắt đầu                       │ │ Ngày kết thúc                │   │
│ │ [2026-08-01]                       │ │ [2026-09-15]                 │   │
│ └────────────────────────────────────┘ └──────────────────────────────┘   │
│ ☑ Hiển thị ngay sau khi lưu                                                │
│                              [💾 Lưu banner]   [Hủy]                       │
└────────────────────────────────────────────────────────────────────────────┘
```

### 6.6 Trang tĩnh — Editor

```
┌────────────────────────────────────────────────────────────────────────────┐
│ [Về chúng tôi]  [Điều khoản sử dụng]  [Chính sách bảo mật]  [Đổi/Trả]    │
├────────────────────────────────────────────────────────────────────────────┤
│ Chính sách đổi/trả                         Cập nhật lần cuối: 01/06/2025   │
│ ┌─ B  I  U  │ H2 H3 ¶ │ ≡ 1. ────────────────────────────────────────────┐│
│ │                                                                          ││
│ │  Điều kiện đổi/trả hàng                                                 ││
│ │                                                                          ││
│ │  EduMart chấp nhận đổi/trả trong vòng 7 ngày kể từ ngày nhận hàng      ││
│ │  nếu sản phẩm có lỗi từ nhà sản xuất hoặc không đúng mô tả.            ││
│ │                                                                          ││
│ │  Sản phẩm không được đổi/trả                                            ││
│ │  • Ebook và sản phẩm số (sau khi đã tải xuống)                         ││
│ │  • Sách đã bị hư hỏng do người mua                                      ││
│ │                                                                          ││
│ └──────────────────────────────────────────────────────────────────────────┘│
│  [💾 Lưu trang "Chính sách đổi/trả"]                                       │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Tiêu chí chấp nhận (Acceptance Criteria)

### AC-01: Danh sách blog

- [ ] Tab Blog hiển thị đúng 4 KPI card: Tổng, Đã xuất bản, Nháp, Ẩn
- [ ] Bảng hiển thị icon 📌 trên dòng bài được ghim
- [ ] Bộ lọc trạng thái và danh mục hoạt động độc lập và có thể kết hợp
- [ ] Tìm kiếm realtime khớp trên tiêu đề và tags
- [ ] Bài ghim luôn hiển thị trước bài không ghim

### AC-02: Editor bài viết — Tạo mới

- [ ] Click "+ Viết bài mới" → editor mở với form trống
- [ ] Toolbar rich text hoạt động: bold, italic, H2, list, link, image
- [ ] Lưu mà không nhập tiêu đề → toast cảnh báo, không tạo bài
- [ ] Xuất bản → bài xuất hiện đầu danh sách với badge "Đã xuất bản"
- [ ] Lưu nháp → badge "Nháp", `publishedAt` rỗng

### AC-03: Editor bài viết — Chỉnh sửa

- [ ] Click "Sửa" → editor mở với đúng giá trị bài viết đó điền sẵn
- [ ] Nội dung `contenteditable` hiển thị đúng HTML đã lưu
- [ ] Lưu → `updatedAt` cập nhật, `publishedAt` giữ nguyên nếu đã có
- [ ] Chuyển từ `draft` → `published` → `publishedAt` ghi ngày hôm nay

### AC-04: Xóa và ghim bài viết

- [ ] Xóa → confirm với tên bài → bài mất khỏi danh sách
- [ ] Xóa → bình luận cùng `blogId` cũng bị xóa khỏi `cmsComments[]`
- [ ] Ghim bài A → bài B (đang ghim) tự động bị bỏ ghim
- [ ] Tối đa 1 bài có `featured=true` tại mọi thời điểm

### AC-05: Danh sách bình luận

- [ ] Badge đỏ trên tab "Bình luận" hiển thị đúng số bình luận `pending`
- [ ] Bộ lọc trạng thái hoạt động; tìm kiếm khớp trên tên, nội dung và tên bài
- [ ] Người dùng bị cấm hiển thị tag "[Đã cấm]" đỏ bên cạnh tên

### AC-06: Kiểm duyệt bình luận

- [ ] Duyệt → `status='approved'` → toast
- [ ] Xóa → confirm → `status='deleted'` (soft delete)
- [ ] Cấm người dùng → `bannedUser=true` trên **tất cả** bình luận cùng `userId`
- [ ] Bình luận `deleted` không hiển thị nút thao tác
- [ ] Người dùng đã bị cấm không hiển thị nút "Cấm"

### AC-07: Danh sách banner

- [ ] Card banner tắt (`active=false`) hiển thị với opacity thấp hơn
- [ ] Số thứ tự trên badge khớp với vị trí thực trong mảng `cmsBanners[]`
- [ ] Nút ▲ disabled cho banner đầu tiên; ▼ disabled cho banner cuối

### AC-08: Thêm và chỉnh sửa banner

- [ ] Tiêu đề rỗng → toast cảnh báo "Vui lòng nhập tiêu đề banner"
- [ ] Ngày từ `date input` (YYYY-MM-DD) được chuyển đúng sang DD/MM/YYYY khi lưu
- [ ] Thêm mới → banner xuất hiện cuối danh sách
- [ ] Chỉnh sửa → form điền sẵn giá trị hiện tại

### AC-09: Xóa, bật/tắt, sắp xếp banner

- [ ] Xóa → confirm → banner biến mất khỏi danh sách
- [ ] Toggle bật/tắt → card cập nhật opacity và nhãn nút ngay lập tức
- [ ] ▲ → banner đổi chỗ với banner phía trên; số thứ tự cập nhật
- [ ] ▼ → banner đổi chỗ với banner phía dưới

### AC-10: Popup khuyến mãi

- [ ] Lưu với checkbox "Bật" được check → badge chuyển thành "Đang bật" màu xanh
- [ ] Lưu → `updatedAt` cập nhật và hiển thị dưới form
- [ ] Tất cả trường được giữ lại đúng sau khi lưu và re-render

### AC-11: Trang tĩnh

- [ ] Click tên trang → editor tải đúng nội dung trang đó
- [ ] Toolbar rich text hoạt động trong editor trang tĩnh
- [ ] Lưu → `updatedAt` cập nhật → toast tên trang trong thông báo
- [ ] Lưu trang A không ảnh hưởng đến nội dung trang B

---

## 8. Rủi ro và giải pháp

| Rủi ro | Mức độ | Giải pháp |
|--------|--------|-----------|
| Mất nội dung editor khi re-render | Cao | Không gọi `renderAccount()` trong quá trình soạn thảo — chỉ re-render khi lưu hoặc hủy |
| XSS qua nội dung blog của admin | Thấp | Admin là người dùng tin cậy; `innerHTML` từ editor được coi là trusted HTML |
| XSS qua tên bài, tiêu đề banner | Trung bình | Tất cả giá trị form đi qua `escHtml()` trước khi render lại vào bảng/card |
| Bình luận spam qua biểu mẫu frontend | Trung bình | Hệ thống kiểm duyệt (`status='pending'`) chặn bình luận chưa duyệt không hiển thị |
| Cấm nhầm người dùng | Trung bình | Confirm dialog với tên người dùng rõ ràng; không có tính năng "bỏ cấm" trong MVP |
| Xóa bài viết mất bình luận | Thấp | Hành vi có chủ ý — bình luận orphan vô nghĩa; cảnh báo trong confirm dialog |
| Popup bật nhưng cấu hình thiếu (tiêu đề rỗng) | Thấp | Frontend đọc `enabled` trước, sau đó render nội dung từ trường còn lại |
| Thứ tự banner bị lộn xộn sau nhiều thao tác | Thấp | Thứ tự chỉ xác định bởi index mảng — hoán đổi rõ ràng, không có field `order` gây drift |
| Trang tĩnh pháp lý bị chỉnh sửa nhầm | Cao | Phân quyền: chỉ Super Admin mới được vào tab "Trang tĩnh" (roadmap) |

---

## 9. Roadmap — Tính năng tiếp theo

| Ưu tiên | Tính năng | Mô tả |
|---------|-----------|-------|
| P1 | **Upload ảnh trực tiếp** | Cho phép tải ảnh từ máy tính lên CDN thay vì nhập URL thủ công |
| P1 | **Phân quyền trang tĩnh** | Chỉ Super Admin được chỉnh sửa Điều khoản và Chính sách bảo mật |
| P1 | **Preview bài viết** | Xem trước bài viết như người đọc trước khi xuất bản |
| P2 | **Lịch hẹn xuất bản** | Đặt ngày giờ tự động xuất bản bài viết (scheduled post) |
| P2 | **Bỏ cấm người dùng** | Gỡ lệnh cấm bình luận cho người dùng vi phạm cũ |
| P2 | **Thông báo bình luận mới** | Badge real-time hoặc email khi có bình luận mới chờ duyệt |
| P2 | **Kéo thả sắp xếp banner** | Drag-and-drop thay thế nút ▲/▼ |
| P2 | **Lịch sử chỉnh sửa trang tĩnh** | Versioning — xem và khôi phục phiên bản cũ |
| P3 | **SEO Meta Editor** | Chỉnh sửa meta title, meta description, Open Graph cho từng bài blog |
| P3 | **Dashboard nội dung** | Thống kê bài viết được đọc nhiều nhất, tăng trưởng views, bình luận theo tháng |
| P3 | **Slug tùy chỉnh** | Cho phép admin tùy chỉnh URL slug thay vì tự động sinh từ tiêu đề |
| P3 | **Phiên bản đa ngôn ngữ** | Bài viết blog hỗ trợ tiếng Anh song song tiếng Việt |

---

*Tài liệu này phản ánh trạng thái triển khai tại phiên bản 1.0. Cập nhật cùng với mỗi sprint phát triển tiếp theo.*
