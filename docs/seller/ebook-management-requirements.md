# Yêu cầu chức năng: Quản lý Ebook — Phân hệ Người bán/Nhà cung cấp

## 1. Tổng quan

Module quản lý ebook cho phép seller đăng bán sách điện tử trên nền tảng EduMart. Seller có thể quản lý toàn bộ vòng đời ebook: tạo mới, cập nhật thông tin, xem thống kê lượt tải và doanh thu, bật/tắt trạng thái bán.

---

## 2. Danh sách Ebook (`seller-ebooks`)

### 2.1 Hiển thị
- Bảng danh sách với các cột: **Tên Ebook**, **Định dạng**, **Giá**, **Lượt tải**, **Doanh thu**, **Trạng thái**, **Hành động**
- Badge định dạng trực quan (PDF / EPUB / MOBI) màu xanh dương nhạt
- Badge trạng thái: Hoạt động (xanh) / Nháp (xám) / Tạm dừng (vàng)

### 2.2 Bộ lọc tab
| Tab | Điều kiện |
|-----|-----------|
| Tất cả | Hiển thị tất cả ebook |
| Hoạt động | `status === 'active'` |
| Nháp | `status === 'draft'` |
| Tạm dừng | `status === 'paused'` |

Mỗi tab hiển thị số lượng ebook tương ứng.

### 2.3 Trạng thái rỗng
Khi chưa có ebook hoặc không có kết quả lọc: hiển thị thông báo và nút "Thêm ebook đầu tiên".

### 2.4 Hành động nhanh (mỗi dòng)
- **✏️ Chỉnh sửa**: Chuyển sang form chỉnh sửa ebook
- **📊 Thống kê**: Chuyển sang trang thống kê ebook
- **⏸/▶ Bật/Tắt**: Toggle trạng thái active ↔ paused
- **🗑 Xóa**: Confirm dialog trước khi xóa

---

## 3. Thêm / Chỉnh sửa Ebook (`seller-ebook-form`)

Form 6 phần:

### 3.1 Thông tin cơ bản
| Trường | Bắt buộc | Ghi chú |
|--------|----------|---------|
| Tên Ebook | ✓ | |
| Tác giả | ✓ | |
| Nhà xuất bản | | |
| Số trang | | Số nguyên dương |
| Số trang đọc thử | | Số trang xem miễn phí trước khi mua |
| Dung lượng (MB) | | Tổng dung lượng file ebook |

### 3.2 Phân loại
- **Thể loại**: Tham khảo / Sách giáo khoa / Văn học / Thiếu nhi / Kỹ năng / Ngoại ngữ / Khoa học
- **Đối tượng** (đa chọn): Tiểu học / THCS / THPT / Sinh viên / Giáo viên / Người lớn

### 3.3 Mô tả
- **Mô tả ngắn** (bắt buộc): Giới thiệu nội dung ebook
- **Mục lục**: Textarea nhập mục lục theo từng dòng

### 3.4 Định dạng & File
- Checkbox đa chọn: **PDF**, **EPUB**, **MOBI** (bắt buộc chọn ít nhất 1)
- Mỗi định dạng có vùng upload file riêng (demo: thông báo tích hợp server thực tế)
- Khi chỉnh sửa: hiển thị trạng thái "Đã có file [định dạng]" nếu ebook đã có format đó

### 3.5 Ảnh bìa
- Vùng upload ảnh bìa hình chữ nhật đứng (tỷ lệ 3:4)
- Demo: click thông báo tích hợp server thực tế

### 3.6 Giá & Trạng thái
- **Giá bán** (bắt buộc, > 0, đơn vị VNĐ)
- **Trạng thái**: Hoạt động / Nháp / Tạm dừng (radio button)
- Mặc định khi tạo mới: Hoạt động

### 3.7 Validation
- Tên, tác giả, mô tả, giá, ít nhất 1 định dạng: bắt buộc
- Hiển thị toast lỗi nếu thiếu

### 3.8 Lưu
- **Tạo mới**: Thêm vào mảng ebooks, push thông báo "Ebook mới [tên] đã được tạo"
- **Cập nhật**: Patch các trường đã thay đổi, cập nhật `updatedAt`
- Sau lưu: chuyển về danh sách

---

## 4. Thống kê Ebook (`seller-ebook-stats`)

### 4.1 KPI Cards (4 thẻ)
| Chỉ số | Nguồn dữ liệu |
|--------|---------------|
| Tổng lượt tải | `ebook.totalDownloads` |
| Tổng doanh thu | `ebook.revenue` (VNĐ) |
| Lượt đọc thử | `ebook.previewCount` |
| Tỷ lệ đọc thử → mua | `purchaseCount / previewCount × 100%` |

### 4.2 Lượt tải theo định dạng
- Thanh progress bar ngang cho từng định dạng PDF / EPUB / MOBI
- Hiển thị số tuyệt đối và phần trăm

### 4.3 Phễu chuyển đổi (Conversion Funnel)
```
[Lượt xem / đọc thử]
        ↓ X%
[Lượt mua / tải]
```
- Tính tỷ lệ chuyển đổi `previewCount → purchaseCount`

### 4.4 Biểu đồ doanh thu 7 ngày
- Bar chart dọc, 7 cột tương ứng T2–CN
- Dữ liệu từ `ebook.revenueChart[7]`
- Hiển thị giá trị trên mỗi cột (rút gọn, đơn vị triệu)
- Tổng 7 ngày hiển thị phía dưới

---

## 5. Data Model

```javascript
{
  id: 'sle-' + timestamp36,       // Unique ID
  name: string,                   // Tên ebook
  by: string,                     // Tác giả
  nxb: string,                    // Nhà xuất bản
  genre: 'thamkhao'|'sgk'|'vanhoc'|'thieunhi'|'kynang'|'ngoaingu'|'khoa-hoc',
  aud: string[],                  // Đối tượng
  desc: string,                   // Mô tả
  tableOfContents: string,        // Mục lục
  price: number,                  // VNĐ
  formats: ('PDF'|'EPUB'|'MOBI')[],
  pages: number,
  previewPages: number,           // Số trang đọc thử
  size: number,                   // MB
  status: 'active'|'draft'|'paused',
  imageCount: number,
  totalDownloads: number,
  downloadsByFormat: { PDF: number, EPUB: number, MOBI: number },
  previewCount: number,           // Lượt đọc thử
  purchaseCount: number,          // Lượt mua
  revenue: number,                // VNĐ
  revenueChart: number[7],        // Doanh thu 7 ngày T2–CN
  createdAt: string,              // dd/mm/yyyy
  updatedAt: string
}
```

Lưu trữ tại: `activeSellers[sIdx].ebooks[]` trong localStorage key `activeSellers`.

---

## 6. Trạng thái ebook

| Trạng thái | Ý nghĩa |
|------------|---------|
| `active` | Đang bán, hiển thị trên marketplace |
| `draft` | Chưa đăng, chỉ seller thấy |
| `paused` | Tạm dừng bán, ẩn khỏi marketplace |

Chuyển đổi hợp lệ:
- `active` ↔ `paused`: Toggle qua nút ⏸/▶
- Mọi trạng thái → `draft`: Qua form chỉnh sửa

---

## 7. Navigation

Seller nav (đã được duyệt):
```
Tổng quan | Thông báo | Sách giấy | Ebook | Thông tin shop | Thanh toán | Hồ sơ
```

Tab `Ebook` → route `seller-ebooks`

---

## 8. State Variables

| Biến | Mô tả |
|------|-------|
| `sellerEditEbookId` | ID ebook đang chỉnh sửa, `null` khi tạo mới |
| `sellerEbookStatusFilter` | Bộ lọc tab: `'all'|'active'|'draft'|'paused'` |
| `sellerEbookStatsId` | ID ebook đang xem thống kê |
