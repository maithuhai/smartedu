# Tài liệu Phân tích Yêu cầu
## Phân hệ Quản lý Khuyến mãi — EduMart Admin

**Phiên bản:** 1.0  
**Ngày:** 20/06/2026  
**Tác giả:** EduMart Product Team  
**Trạng thái:** Đã triển khai

---

## 1. Tổng quan

### 1.1 Mục đích

Phân hệ Quản lý Khuyến mãi (Promotion Management) cung cấp cho quản trị viên EduMart bộ công cụ toàn diện để thiết kế, vận hành và đo lường hiệu quả của các chương trình kích cầu. Thay vì quản lý rời rạc, toàn bộ chiến lược khuyến mãi — từ mã giảm giá, Flash Sale theo giờ đến chương trình tích lũy điểm thưởng dài hạn — được tập trung trong một giao diện duy nhất.

Mục tiêu nghiệp vụ chính:
- Tăng tỷ lệ chuyển đổi qua mã giảm giá có kiểm soát điều kiện
- Kích cầu mua sắm tức thời qua các chương trình Flash Sale theo khung giờ
- Xây dựng vòng lặp trung thành qua hệ thống điểm thưởng phân hạng
- Cung cấp đủ dữ liệu để Admin đánh giá ROI từng chương trình

### 1.2 Phạm vi

| Nhóm | Mô tả |
|------|-------|
| **Mã giảm giá (Vouchers)** | Tạo, chỉnh sửa, bật/tắt, xóa voucher giảm theo % hoặc số tiền; đặt điều kiện đơn tối thiểu, danh mục áp dụng, số lần sử dụng; xem thống kê |
| **Flash Sale** | Tạo và quản lý chương trình Flash Sale theo datetime; duyệt sản phẩm Seller đăng ký tham gia; kết thúc sớm; xem báo cáo kết quả |
| **Điểm thưởng** | Cài đặt tỷ lệ tích điểm, quy tắc quy đổi, ngưỡng hạng thành viên; xem thống kê toàn hệ thống |

### 1.3 Người dùng hệ thống (Actors)

| Actor | Quyền truy cập |
|-------|----------------|
| **Super Admin** | Toàn bộ tính năng: tạo/sửa/xóa voucher, quản lý Flash Sale, duyệt sản phẩm, cấu hình điểm thưởng |
| **Read-only Admin** | Không truy cập phân hệ này |
| **Content Admin** | Không truy cập phân hệ này |

> **Lý do giới hạn:** Khuyến mãi ảnh hưởng trực tiếp đến doanh thu và chi phí vận hành. Chỉ Super Admin có đủ bối cảnh nghiệp vụ để thiết kế và phê duyệt chiến lược khuyến mãi.

### 1.4 Điều kiện tiên quyết

- Người dùng đã có tài khoản với `role='admin'` và đã đăng nhập
- Dữ liệu voucher được khởi tạo trong `promoVouchers[]`
- Dữ liệu Flash Sale được khởi tạo trong `promoFlashSales[]`
- Cấu hình điểm thưởng được lưu trong `promoPoints` object
- Hàm `todayStr()`, `fmt()`, `fmtMil()`, `fmtBig()`, `escHtml()`, `toast()` đã có sẵn

---

## 2. Yêu cầu chức năng

### 2.1 FR-01: Mã giảm giá (Vouchers)

#### FR-01.1 Bảng thống kê tổng quan

**Mô tả:** Hiển thị 4 chỉ số KPI card ngay đầu trang quản lý voucher.

| Chỉ số | Điều kiện tính |
|--------|---------------|
| Đang hoạt động | `status='active'` |
| Tổng lượt sử dụng | `SUM(usedCount)` qua toàn bộ voucher |
| Đã hết hạn | `status='expired'` |
| Đã tắt | `status='inactive'` |

#### FR-01.2 Danh sách voucher

**Dữ liệu hiển thị:**

| Cột | Nội dung |
|-----|---------|
| Mã / Tên | Mã voucher (font monospace, màu `--ink`); tên chương trình nhỏ bên dưới |
| Giá trị | `X%` hoặc `Xđ`; nếu là %, hiển thị thêm giới hạn tối đa giảm |
| Đơn tối thiểu | Số tiền định dạng VNĐ; hoặc `—` nếu bằng 0 |
| Danh mục | Tên danh mục áp dụng; "Tất cả" nếu `categories=['all']` |
| Sử dụng | Số lượt đã dùng / tối đa; thanh progress bar tỷ lệ % |
| Thời hạn | `startDate` → `endDate` (định dạng DD/MM/YYYY) |
| Trạng thái | Badge màu theo trạng thái |
| Hành động | Nút điều kiện theo trạng thái (xem FR-01.4) |

**Lọc và tìm kiếm:**
- Tìm kiếm realtime theo mã voucher hoặc tên chương trình (không phân biệt hoa thường)
- Dropdown lọc theo trạng thái: Tất cả / Hoạt động / Đã tắt / Hết hạn

**Phân trang:** 10 bản ghi/trang.

#### FR-01.3 Trạng thái voucher

| Trạng thái | Giá trị | Màu badge |
|------------|---------|-----------|
| Hoạt động | `active` | Xanh lá `#27ae60` |
| Đã tắt | `inactive` | Xám `#888888` |
| Hết hạn | `expired` | Đỏ `#e74c3c` |

#### FR-01.4 Hành động theo trạng thái

| Trạng thái | Sửa | Bật | Tắt | Xóa |
|------------|:---:|:---:|:---:|:---:|
| `active` | ✅ | — | ✅ | ✅ |
| `inactive` | ✅ | ✅ | — | ✅ |
| `expired` | — | — | — | ✅ |

> **Nguyên tắc:** Voucher đã hết hạn không thể chỉnh sửa để đảm bảo tính bất biến của lịch sử khuyến mãi.

#### FR-01.5 Tạo / Chỉnh sửa voucher

**Kích hoạt:**
- Tạo mới: click "+ Tạo voucher mới" → `admVoucherEditId='new'`
- Chỉnh sửa: click "Sửa" trên dòng bảng → `admVoucherEditId = voucher.id`

**Layout:** 2 cột — form nhập liệu (trái) + panel thống kê (phải, chỉ hiện khi chỉnh sửa).

**Các trường nhập liệu:**

| Trường | Loại | Bắt buộc | Ghi chú |
|--------|------|----------|---------|
| Mã voucher | Text | ✓ | Tự động uppercase; kiểm tra unique khi tạo mới |
| Tên chương trình | Text | ✓ | Tên nội bộ để Admin nhận diện |
| Mô tả | Textarea | — | Không hiển thị trực tiếp cho khách hàng |
| Loại giảm giá | Select | ✓ | `percent` (%) hoặc `fixed` (số tiền cố định đ) |
| Giá trị | Number | ✓ | Phải > 0; nếu `percent` thì là số nguyên 1–100 |
| Đơn tối thiểu | Number | — | 0 = không giới hạn |
| Giảm tối đa | Number | — | Chỉ có ý nghĩa với loại `percent`; giới hạn số tiền giảm tối đa |
| Danh mục áp dụng | Multi-select | — | Mặc định "Tất cả"; chọn `all` ghi đè mọi lựa chọn khác |
| Số lần dùng tối đa | Number | — | Mặc định 9999 nếu để trống |
| Ngày bắt đầu | Date | ✓ | `YYYY-MM-DD` → lưu dưới dạng `DD/MM/YYYY` |
| Ngày kết thúc | Date | ✓ | `YYYY-MM-DD` → lưu dưới dạng `DD/MM/YYYY` |

**Panel thống kê (khi chỉnh sửa):**
- Tổng lượt sử dụng (số lớn, nổi bật)
- Progress bar: % đã dùng / tối đa
- Ước tính tổng chiết khấu (tính gần đúng)
- Trạng thái hiện tại với màu sắc

#### FR-01.6 Lưu voucher

**Luồng tạo mới:**
1. Admin điền form, click "💾 Lưu voucher"
2. Validate các trường bắt buộc (mã, tên, giá trị, thời hạn)
3. Kiểm tra mã voucher chưa tồn tại trong `promoVouchers[]`
4. Chuyển đổi định dạng ngày: `YYYY-MM-DD` → `DD/MM/YYYY`
5. Xử lý danh mục: nếu bao gồm `all` → lưu `['all']`; ngược lại lưu mảng key đã chọn
6. Tạo object mới với `usedCount=0`, `status='active'`, `createdAt=todayStr()`
7. Gọi `promoVouchers.unshift(...)`, `savePromoVouchers()`, `admVoucherEditId=null`, `renderAccount()`
8. Toast: "Đã tạo voucher {CODE}"

**Luồng chỉnh sửa:**
- Bước 3 không cần kiểm tra unique (mã đã tồn tại của chính voucher đó)
- Thay `unshift` bằng `Object.assign(v, {...})`
- Toast: "Đã cập nhật voucher {CODE}"

**Validation chi tiết:**

| Điều kiện | Thông báo lỗi |
|-----------|--------------|
| Mã rỗng | "Vui lòng nhập mã voucher" |
| Tên rỗng | "Vui lòng nhập tên chương trình" |
| Giá trị ≤ 0 hoặc rỗng | "Vui lòng nhập giá trị hợp lệ (>0)" |
| Không có ngày bắt đầu hoặc kết thúc | "Vui lòng chọn thời hạn hiệu lực" |
| Mã đã tồn tại (tạo mới) | "Mã voucher đã tồn tại!" |

#### FR-01.7 Bật / Tắt voucher

| Hành động | Kết quả | Toast |
|-----------|---------|-------|
| Tắt voucher | `status='inactive'` | "Đã tắt voucher {CODE}" |
| Bật voucher | `status='active'` | "Đã bật voucher {CODE}" |

**Gọi:** `savePromoVouchers()` → `renderAccount()`

#### FR-01.8 Xóa voucher

**Luồng:**
1. Admin click "Xóa"
2. `confirm()` dialog: "Xóa voucher {CODE}? Hành động không thể hoàn tác."
3. Hủy → không thay đổi
4. Xác nhận → `promoVouchers.filter(x => x.id !== id)` → `savePromoVouchers()` → toast → re-render

**Lưu ý:** Không cần kiểm tra ràng buộc — voucher là độc lập với các thực thể khác.

---

### 2.2 FR-02: Flash Sale

#### FR-02.1 Bảng thống kê tổng quan

| Chỉ số | Điều kiện |
|--------|-----------|
| Đang diễn ra | `status='active'` |
| Sắp diễn ra | `status='upcoming'` |
| Tổng đã bán | `SUM(totalSold)` — các chương trình `ended` |
| Tổng doanh thu | `SUM(totalRevenue)` — các chương trình `ended` |

#### FR-02.2 Danh sách Flash Sale (dạng Card)

**Mô tả:** Hiển thị dạng lưới card, không phải bảng — vì mỗi Flash Sale chứa nhiều thông tin phức hợp hơn.

**Mỗi card hiển thị:**
- Tên chương trình (đậm)
- Thời gian bắt đầu → kết thúc (định dạng `YYYY-MM-DD HH:MM`)
- Badge trạng thái (badge pill màu theo trạng thái)
- 3 chỉ số nhỏ: Tổng sản phẩm (có badge "X chờ" nếu có pending) · Đã bán · Doanh thu
- Nút hành động: Chi tiết/Duyệt SP · Chỉnh sửa (nếu chưa kết thúc) · Kết thúc sớm (nếu đang active)

**Lọc trạng thái:** Tab bar — Tất cả / Sắp diễn ra / Đang diễn ra / Đã kết thúc

#### FR-02.3 Trạng thái Flash Sale

| Trạng thái | Giá trị | Màu badge |
|------------|---------|-----------|
| Sắp diễn ra | `upcoming` | Xanh dương `#3498db` |
| Đang diễn ra | `active` | Xanh lá `#27ae60` |
| Đã kết thúc | `ended` | Xám `#888888` |

#### FR-02.4 Tạo / Chỉnh sửa Flash Sale

**Các trường:**

| Trường | Loại | Bắt buộc | Ghi chú |
|--------|------|----------|---------|
| Tên chương trình | Text | ✓ | — |
| Mô tả | Textarea | — | Hiển thị trong trang chi tiết |
| Thời gian bắt đầu | Datetime-local | ✓ | Định dạng `YYYY-MM-DDTHH:MM` |
| Thời gian kết thúc | Datetime-local | ✓ | Phải sau thời gian bắt đầu |

**Validation:**

| Điều kiện | Thông báo |
|-----------|----------|
| Tên rỗng | "Vui lòng nhập tên chương trình" |
| Thiếu thời gian | "Vui lòng chọn thời gian bắt đầu và kết thúc" |
| `startTime >= endTime` | "Thời gian kết thúc phải sau thời gian bắt đầu" |

**Lưu mới:** `status='upcoming'`, `products=[]`, `totalRevenue=0`, `totalSold=0`, `endedEarlyAt=null`

> **Lưu ý thiết kế:** Flash Sale mới tạo chưa có sản phẩm. Seller đăng ký sau — Admin duyệt trong trang chi tiết.

#### FR-02.5 Trang chi tiết Flash Sale & Duyệt sản phẩm

**Kích hoạt:** Click "Chi tiết / Duyệt SP" trên card → `admFlashSaleDetailId = fs.id`

**Nội dung:**
1. Thanh breadcrumb "← Quay lại"
2. KPI 4 card: Tổng SP · Chờ duyệt (màu cam) · Đã bán/Tổng SL (%) · Doanh thu
3. Thông tin chương trình: thời gian, mô tả, note kết thúc sớm (nếu có)
4. Nút "⏹ Kết thúc sớm" nếu `status='active'`
5. Bảng sản phẩm tham gia

**Bảng sản phẩm:**

| Cột | Nội dung |
|-----|---------|
| Sản phẩm / Seller | Tên sản phẩm (đậm); tên seller (nhạt bên dưới) |
| Giá gốc → Sale | Giá gốc (gạch ngang); giá sale (đỏ/ink) |
| % giảm | Badge đỏ nhạt: `-X%` |
| Đã bán / SL | Số lượng đã bán / tổng; progress bar |
| Trạng thái | Badge màu theo trạng thái sản phẩm |
| Hành động | Chỉ hiện khi `status='pending'`: nút Duyệt + Từ chối |

**Trạng thái sản phẩm trong Flash Sale:**

| Giá trị | Màu | Ý nghĩa |
|---------|-----|---------|
| `pending` | Cam | Seller đăng ký, chờ Admin duyệt |
| `approved` | Xanh lá | Đã duyệt, hiển thị giá sale |
| `rejected` | Đỏ | Bị từ chối, không tham gia |

#### FR-02.6 Duyệt sản phẩm Flash Sale

**Duyệt:**
1. Admin click "Duyệt" → `p.status='approved'`
2. `savePromoFlashSales()` → `renderAccount()` → toast "Đã duyệt sản phẩm tham gia Flash Sale"

**Từ chối:**
1. Admin click "Từ chối"
2. `prompt()` nhập lý do (có thể để trống → mặc định "Không đạt yêu cầu")
3. `p.status='rejected'`, `p.rejectReason=reason`
4. `savePromoFlashSales()` → `renderAccount()` → toast "Đã từ chối: {tên SP}"
5. Nếu Admin hủy `prompt()` (bấm Cancel) → không thay đổi

#### FR-02.7 Kết thúc sớm Flash Sale

**Điều kiện hiển thị:** Chỉ khi `fs.status='active'`

**Luồng:**
1. Admin click "⏹ Kết thúc sớm"
2. `confirm()`: "Kết thúc sớm Flash Sale "{tên}"? Sản phẩm sale sẽ trở về giá gốc ngay lập tức."
3. Hủy → không thay đổi
4. Xác nhận → `fs.status='ended'`, `fs.endedEarlyAt=todayStr()`
5. `savePromoFlashSales()` → `renderAccount()` → toast

**Hệ quả:** `endedEarlyAt` được hiển thị trong trang chi tiết như cảnh báo màu đỏ.

---

### 2.3 FR-03: Chương trình Điểm thưởng

#### FR-03.1 Cài đặt tích điểm & quy đổi

**Cấu trúc 2 cột:**
- Trái: Form nhập liệu với 5 tham số
- Phải: Panel tóm tắt hiển thị cấu hình hiện hành (chỉ đọc, cập nhật sau khi lưu)

**Các tham số:**

| Tham số | Loại | Ràng buộc | Ý nghĩa |
|---------|------|-----------|---------|
| Tỷ lệ tích điểm | Number | ≥ 1.000 | X đồng chi tiêu = 1 điểm |
| Điểm tối thiểu để đổi | Number | ≥ 1 | Ngưỡng cho phép bắt đầu đổi thưởng |
| Số điểm quy đổi | Number | ≥ 1 | X điểm = 1 voucher Y% |
| % voucher quy đổi | Number | 1–100 | Mức chiết khấu voucher khi đổi điểm |
| Đơn tối thiểu dùng voucher điểm | Number | ≥ 0 | Điều kiện sử dụng voucher từ đổi điểm |
| Ngày hết hạn điểm | Number | 30–3650 | Số ngày không hoạt động trước khi điểm expire |

**Panel tóm tắt hiển thị 4 dòng:**
- "Mua X đ → +1 điểm"
- "X điểm → voucher Y% (đơn từ Z đ)"
- "Đổi tối thiểu: X điểm"
- "Hết hạn sau X ngày không dùng"

**Validation:**

| Điều kiện | Thông báo |
|-----------|----------|
| `earnRate < 1000` hoặc rỗng | "Tỷ lệ tích điểm tối thiểu 1.000đ = 1 điểm" |
| `redeemPoints < 1` hoặc rỗng | "Số điểm quy đổi không hợp lệ" |
| `redeemVoucherPct` ngoài [1, 100] | "% voucher quy đổi phải từ 1–100" |
| `pointExpireDays < 30` | "Điểm hết hạn tối thiểu sau 30 ngày" |

**Sau khi lưu:** `promoPoints.updatedAt = todayStr()` → `savePromoPoints()` → `renderAccount()` → toast

#### FR-03.2 Hạng thành viên

**Cấu trúc bảng 4 hạng mặc định:**

| Hạng | Huy hiệu | Điểm tối thiểu | Hệ số nhân | Đặc quyền |
|------|---------|----------------|------------|-----------|
| Đồng | 🥉 | 0 (mặc định) | x1 | Tích điểm x1 |
| Bạc | 🥈 | 500 điểm | x1.2 | Tích điểm x1.2, Miễn phí ship đơn từ 200k |
| Vàng | 🥇 | 2.000 điểm | x1.5 | Tích điểm x1.5, Voucher sinh nhật 10%, Hoàn tiền 2% |
| Kim Cương | 💎 | 5.000 điểm | x2 | Tích điểm x2, Miễn phí ship mọi đơn, Ưu tiên CSKH |

**Chỉnh sửa hạng:**
1. Admin click "Sửa" trên dòng hạng
2. `prompt()` lần 1: nhập Đặc quyền (có sẵn giá trị cũ)
3. `prompt()` lần 2: nhập Hệ số nhân (validate ≥ 1)
4. Nếu hủy bất kỳ prompt → thoát không lưu
5. Cập nhật `tiers[idx]`, `promoPoints.updatedAt = todayStr()`, `savePromoPoints()`, `renderAccount()`

**Ghi chú hiển thị:** Panel thông tin giải thích cơ chế hệ số nhân (x1.5 → đơn 30k tích 4,5 điểm thay vì 3).

#### FR-03.3 Thống kê điểm thưởng

**KPI 4 card:**
- Tổng điểm phát hành (`stats.totalIssued`)
- Đã quy đổi (`stats.totalRedeemed`)
- Đang lưu hành (`totalIssued - totalRedeemed - totalExpired`)
- Người dùng có điểm (`stats.totalActiveUsers`)

**Biểu đồ phân bổ (progress bars dạng cột):**
- Đang lưu hành: màu `--ink`
- Đã quy đổi: màu `#27ae60`
- Đã hết hạn: màu `#bbb`

**Bảng số liệu khác:**
- Voucher đã tạo từ điểm (`totalVouchersGenerated`)
- Điểm trung bình / người dùng (`avgPointsPerUser`)
- Điểm đã hết hạn (`totalExpired`)
- Tỷ lệ quy đổi (`totalRedeemed / totalIssued × 100%`)

---

## 3. Mô hình dữ liệu

### 3.1 Voucher (`promoVouchers[]`)

```javascript
{
  id: string,           // 'VC-001'
  code: string,         // uppercase, unique: 'SUMMER25'
  name: string,         // tên chương trình: 'Flash sale hè 2025'
  type: 'percent' | 'fixed',
  value: number,        // 25 (nếu percent) hoặc 50000 (nếu fixed)
  minOrder: number,     // đơn tối thiểu; 0 = không giới hạn
  maxDiscount: number,  // giảm tối đa; chỉ có ý nghĩa với percent
  categories: string[], // ['all'] hoặc ['sach', 'vpp', ...]
  maxUsage: number,     // số lần dùng tối đa; 9999 = không giới hạn
  usedCount: number,    // số lần đã sử dụng (đọc từ order system)
  startDate: string,    // 'DD/MM/YYYY'
  endDate: string,      // 'DD/MM/YYYY'
  status: 'active' | 'inactive' | 'expired',
  desc: string,         // mô tả nội bộ
  createdAt: string     // 'DD/MM/YYYY'
}
```

**Chuyển đổi ngày:** HTML `<input type="date">` trả về `YYYY-MM-DD`; lưu trữ dùng `DD/MM/YYYY`.
- Input → Lưu: `'2025-06-30'.split('-').reverse().join('/')` → `'30/06/2025'`
- Lưu → Input: `'30/06/2025'.split('/').reverse().join('-')` → `'2025-06-30'`

### 3.2 Flash Sale (`promoFlashSales[]`)

```javascript
{
  id: string,           // 'FS-001'
  name: string,
  desc: string,
  startTime: string,    // 'YYYY-MM-DDTHH:MM' (datetime-local)
  endTime: string,      // 'YYYY-MM-DDTHH:MM'
  status: 'upcoming' | 'active' | 'ended',
  products: FlashSaleProduct[],
  totalRevenue: number, // doanh thu tổng hợp (từ order system)
  totalSold: number,    // số lượng đã bán
  endedEarlyAt: string | null,  // 'DD/MM/YYYY' nếu kết thúc sớm
  createdAt: string     // 'DD/MM/YYYY'
}
```

**Flash Sale Product (object trong `products[]`):**

```javascript
{
  productId: number,
  productName: string,
  sellerName: string,
  originalPrice: number,
  salePrice: number,
  saleQty: number,        // số lượng tham gia Flash Sale
  soldQty: number,        // số lượng đã bán trong Flash Sale
  status: 'pending' | 'approved' | 'rejected',
  rejectReason: string    // chỉ có khi status='rejected'
}
```

### 3.3 Points Config (`promoPoints`)

```javascript
{
  earnRate: number,         // 10000 → 10.000đ = 1 điểm
  redeemThreshold: number,  // tối thiểu 100 điểm mới được đổi
  redeemPoints: number,     // 100 điểm = 1 voucher
  redeemVoucherPct: number, // voucher 5%
  redeemMinOrder: number,   // đơn từ 100.000đ mới dùng voucher điểm
  pointExpireDays: number,  // 365 ngày không dùng → điểm expire

  tiers: [{
    name: string,           // 'Đồng' | 'Bạc' | 'Vàng' | 'Kim Cương'
    minPoints: number,
    badge: string,          // emoji: '🥉' | '🥈' | '🥇' | '💎'
    multiplier: number,     // hệ số nhân tích điểm: 1 | 1.2 | 1.5 | 2
    perks: string           // mô tả đặc quyền
  }],

  stats: {
    totalIssued: number,
    totalRedeemed: number,
    totalExpired: number,
    totalActiveUsers: number,
    totalVouchersGenerated: number,
    avgPointsPerUser: number
  },

  updatedAt: string         // 'DD/MM/YYYY'
}
```

### 3.4 State variables

| Biến | Kiểu | Mục đích |
|------|------|---------|
| `admPromoTab` | `string` | Tab đang chọn: `'vouchers'` \| `'flashsale'` \| `'points'` |
| `admVoucherPage` | `number` | Trang hiện tại danh sách voucher |
| `admVoucherSearch` | `string` | Chuỗi tìm kiếm voucher |
| `admVoucherStatusFilter` | `string` | Lọc trạng thái voucher |
| `admVoucherEditId` | `string \| null` | `null` = danh sách; `'new'` = tạo mới; `'VC-xxx'` = sửa |
| `admFlashSaleEditId` | `string \| null` | `null` = danh sách; `'new'` = tạo; `'FS-xxx'` = sửa |
| `admFlashSaleDetailId` | `string \| null` | `null` = danh sách; `'FS-xxx'` = xem chi tiết |
| `admFsFilter` | `string` | Lọc trạng thái Flash Sale |
| `admPointsTab` | `string` | Sub-tab điểm thưởng: `'settings'` \| `'tiers'` \| `'stats'` |

---

## 4. Luồng hoạt động

### 4.1 Luồng tạo và vận hành một đợt Flash Sale

```
Admin tạo Flash Sale (upcoming)
       │
       ▼
Seller đăng ký sản phẩm (backend, ngoài phạm vi MVP)
       │
       ▼
Admin vào Chi tiết → Duyệt từng sản phẩm
       │
       ├── Duyệt → status='approved' → SP hiện giá sale
       └── Từ chối → status='rejected' → SP không tham gia
       │
       ▼
Chương trình diễn ra theo datetime
       │
       ├── Hết giờ tự nhiên → status='ended'
       └── Admin kết thúc sớm → status='ended' + endedEarlyAt
       │
       ▼
Admin xem báo cáo trong card (totalSold, totalRevenue)
```

### 4.2 Luồng tích lũy và sử dụng điểm thưởng

```
Admin cài đặt earnRate (VD: 10.000đ = 1 điểm)
       │
       ▼
Người dùng mua hàng X đồng → hệ thống cộng floor(X / earnRate) điểm
       │
       ▼
Điểm tích lũy → tự động nâng hạng thành viên theo tier.minPoints
       │
       ▼
Người dùng đạt redeemThreshold → mở tính năng đổi điểm
       │
       ▼
Đổi redeemPoints điểm → nhận voucher redeemVoucherPct%
       │
       ▼
Voucher áp dụng khi thanh toán đơn ≥ redeemMinOrder
       │
       ▼
Nếu không dùng pointExpireDays ngày → điểm hết hạn
```

### 4.3 Luồng quản lý voucher theo vòng đời

```
Tạo voucher (status='active')
       │
       ├── Admin tắt → status='inactive'
       │       └── Admin bật lại → status='active'
       │
       ├── Hết endDate → tự động hiển thị expired (kiểm tra khi render)
       │
       └── Admin xóa → loại khỏi promoVouchers[]
              (bất kể trạng thái — xóa vĩnh viễn)
```

### 4.4 Quy tắc render trang (SPA navigation)

| State | Trang hiển thị |
|-------|----------------|
| `admPromoTab='vouchers'` + `admVoucherEditId=null` | Danh sách voucher |
| `admPromoTab='vouchers'` + `admVoucherEditId='new'` | Form tạo voucher mới |
| `admPromoTab='vouchers'` + `admVoucherEditId='VC-xxx'` | Form chỉnh sửa voucher |
| `admPromoTab='flashsale'` + `admFlashSaleDetailId=null` + `admFlashSaleEditId=null` | Danh sách Flash Sale |
| `admPromoTab='flashsale'` + `admFlashSaleDetailId='FS-xxx'` | Chi tiết Flash Sale |
| `admPromoTab='flashsale'` + `admFlashSaleEditId='new'` | Form tạo Flash Sale mới |
| `admPromoTab='flashsale'` + `admFlashSaleEditId='FS-xxx'` | Form chỉnh sửa Flash Sale |
| `admPromoTab='points'` + `admPointsTab='settings'` | Cài đặt tích điểm |
| `admPromoTab='points'` + `admPointsTab='tiers'` | Hạng thành viên |
| `admPromoTab='points'` + `admPointsTab='stats'` | Thống kê điểm |

**Khi chuyển tab:** Reset `admVoucherEditId=null`, `admFlashSaleEditId=null`, `admFlashSaleDetailId=null` để tránh hiển thị nhầm form cũ.

---

## 5. Mockup giao diện

### 5.1 Danh sách Voucher

```
┌─────────────────────────────────────────────────────────────────┐
│  Quản lý Khuyến mãi                                             │
│  [Mã giảm giá] [Flash Sale] [Điểm thưởng]                      │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌──────────────┐  ┌──────────┐  ┌──────────┐    │
│  │   6     │  │   3.052      │  │    1     │  │    1     │    │
│  │ Hoạt đ. │  │ Tổng lượt SD │  │ Hết hạn  │  │  Đã tắt  │    │
│  └─────────┘  └──────────────┘  └──────────┘  └──────────┘    │
├─────────────────────────────────────────────────────────────────┤
│  [🔍 Tìm mã hoặc tên...    ] [▾ Tất cả trạng thái]            │
│                                              [+ Tạo voucher mới] │
│  ─────────────────────────────────────────────────────────────  │
│  Mã / Tên          │ Giá trị  │ Đơn tối │ Danh  │ Sử dụng      │
│                    │          │ thiểu   │ mục   │              │
│  ────────────────────────────────────────────────────────────── │
│  EDUBACK25         │ 25%      │ 200k    │ Tất   │ 342 / 1.000  │
│  Khai giảng Back.. │ max 80k  │         │ cả    │ ████░░ 34%   │
│                    │          │         │       │ [Sửa][Tắt][Xóa]│
│  ────────────────────────────────────────────────────────────── │
│  SACHHE20          │ 20%      │ 150k    │ Sách  │ 198 / 500    │
│  Sách hè 20%       │ max 60k  │         │       │ ████░ 40%    │
│                    │          │         │       │ [Sửa][Tắt][Xóa]│
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Form tạo / sửa Voucher (layout 2 cột)

```
┌─────────────────────────────────────────────────────────────────┐
│ ← Quay lại   Chỉnh sửa: EDUBACK25                               │
├───────────────────────────────────────┬─────────────────────────┤
│  Mã voucher *                         │  📊 Thống kê sử dụng   │
│  [EDUBACK25              ]            │  ┌─────────────────┐   │
│                                       │  │      342         │   │
│  Tên chương trình *                   │  │  Tổng lượt dùng │   │
│  [Khai giảng Back to School]          │  └─────────────────┘   │
│                                       │  ┌─────────────────┐   │
│  Mô tả                                │  │  34%            │   │
│  [Giảm 25% cho tất cả đơn từ 200k  ] │  │  ████░░░░░░     │   │
│                                       │  │  342 / 1.000    │   │
│  Loại giảm giá *    Giá trị *         │  └─────────────────┘   │
│  [▾ Phần trăm (%)] [25      ]         │  ┌─────────────────┐   │
│                                       │  │  23.940.000đ    │   │
│  Đơn tối thiểu      Giảm tối đa       │  │  Ước tính giảm  │   │
│  [200000          ] [80000  ]         │  └─────────────────┘   │
│                                       │                         │
│  Danh mục áp dụng                     │  Trạng thái: Hoạt động │
│  [▾ Tất cả danh mục   ] (multi)       │                         │
│                                       │                         │
│  Số lần dùng tối đa                   │                         │
│  [1000                ]               │                         │
│                                       │                         │
│  Ngày bắt đầu *    Ngày kết thúc *    │                         │
│  [2025-06-01     ] [2025-06-30     ]  │                         │
│                                       │                         │
│  [💾 Lưu voucher]  [Hủy]             │                         │
└───────────────────────────────────────┴─────────────────────────┘
```

### 5.3 Danh sách Flash Sale (dạng Card)

```
┌─────────────────────────────────────────────────────────────────┐
│  ┌─────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │  0 đang │  │ 1 sắp   │  │  492 bán │  │  70.300.000đ    │ │
│  └─────────┘  └──────────┘  └──────────┘  └──────────────────┘ │
│                                                                   │
│  [Tất cả] [Sắp diễn ra] [Đang diễn ra] [Đã kết thúc]            │
│                                          [+ Tạo Flash Sale]      │
│  ┌──────────────────────────┐ ┌──────────────────────────┐      │
│  │ Flash Sale Khai Giảng    │ │ Flash Sale 20/11 Tri Ân   │      │
│  │ ⏰ 01/06 08:00–22:00     │ │ ⏰ 20/11 07:00–23:59      │      │
│  │            [Đã kết thúc] │ │             [Sắp diễn ra] │      │
│  │  4 SP  │ 312 bán │ 48,6M │ │  4 SP  │  0 bán  │   0đ │      │
│  │        │         │       │ │ (2 chờ)│         │       │      │
│  │ [Chi tiết] [Báo cáo]     │ │ [Chi tiết] [Chỉnh sửa]   │      │
│  └──────────────────────────┘ └──────────────────────────┘      │
└─────────────────────────────────────────────────────────────────┘
```

### 5.4 Chi tiết Flash Sale — Bảng sản phẩm

```
┌─────────────────────────────────────────────────────────────────┐
│ ← Quay lại   Flash Sale 20/11 Tri Ân Giáo Viên  [Sắp diễn ra] │
├─────────────────────────────────────────────────────────────────┤
│  4 sản phẩm │  2 chờ duyệt │  0/350 (0%)  │  0đ doanh thu     │
├─────────────────────────────────────────────────────────────────┤
│  Sản phẩm / Seller   │ Giá gốc→Sale │ %giảm │ Bán/SL │ TT │ Act│
│  ─────────────────────────────────────────────────────────────  │
│  Mắt biếc            │ 88k → 65k    │ -26%  │ 0/200  │ ✅  │ — │
│  NXB Trẻ             │              │       │ ░░░░░  │    │    │
│  ─────────────────────────────────────────────────────────────  │
│  Bộ bút màu Colokit  │ 65k → 45k    │ -31%  │ 0/100  │ 🟡  │ [Duyệt][Từ chối]│
│  Colokit             │              │       │ ░░░░░  │    │    │
│  ─────────────────────────────────────────────────────────────  │
│  Balo chống gù Hami  │ 320k → 249k  │ -22%  │ 0/50   │ 🟡  │ [Duyệt][Từ chối]│
│  Hami                │              │       │ ░░░░░  │    │    │
│  ─────────────────────────────────────────────────────────────  │
│  Bộ SGK lớp 6        │ 187k → 150k  │ -20%  │ 0/100  │ 🔴  │ — │
│  NXB Giáo Dục        │              │       │ ░░░░░  │ Từ chối│ │
└─────────────────────────────────────────────────────────────────┘
```

### 5.5 Cài đặt Điểm thưởng

```
┌─────────────────────────────────────────────────────────────────┐
│  [Cài đặt tích điểm] [Hạng thành viên] [Thống kê]               │
├────────────────────────────────┬────────────────────────────────┤
│ ⭐ Cài đặt tích điểm & quy đổi │ 📋 Tóm tắt cấu hình hiện tại  │
│                                │                                │
│ Tỷ lệ tích điểm               │ ┌────────────────────────────┐ │
│ [10000  ] đ = 1 điểm          │ │ 🛒 Mua 10.000đ → +1 điểm  │ │
│                                │ └────────────────────────────┘ │
│ Điểm tối thiểu để đổi          │ ┌────────────────────────────┐ │
│ [100    ] điểm                 │ │ 🎟 100 điểm → voucher 5%  │ │
│                                │ └────────────────────────────┘ │
│ Quy đổi: X điểm = voucher Y%  │ ┌────────────────────────────┐ │
│ [100  ] điểm = [5  ] %        │ │ ⚡ Đổi tối thiểu: 100 điểm │ │
│                                │ └────────────────────────────┘ │
│ Đơn tối thiểu dùng voucher     │ ┌────────────────────────────┐ │
│ [100000 ] đ                    │ │ 🕐 Hết hạn sau 365 ngày   │ │
│                                │ └────────────────────────────┘ │
│ Điểm hết hạn sau               │                                │
│ [365    ] ngày                 │ Cập nhật: 01/06/2025          │
│                                │                                │
│ [💾 Lưu cài đặt]              │                                │
└────────────────────────────────┴────────────────────────────────┘
```

---

## 6. Yêu cầu phi chức năng

### 6.1 Hiệu năng

| Yêu cầu | Mức độ |
|---------|--------|
| Tìm kiếm voucher realtime (debounce) | < 50ms phản hồi UI |
| Render danh sách voucher 10 bản ghi | < 30ms |
| Render danh sách Flash Sale dạng card | < 50ms |
| Lưu cấu hình điểm thưởng | < 20ms (localStorage) |

### 6.2 Tính nhất quán dữ liệu

- Mã voucher phải unique trong `promoVouchers[]` — kiểm tra trước khi tạo
- Sau khi kết thúc Flash Sale (dù tự nhiên hay sớm), không cho phép quay lại `active` hay `upcoming`
- Trạng thái `expired` của voucher chỉ kiểm tra khi render — không lưu trực tiếp; đây là trạng thái tính toán từ `endDate`

### 6.3 Bảo mật & Validation

- Mọi dữ liệu người dùng nhập qua `prompt()` hoặc form đều được wrap bởi `escHtml()` khi hiển thị
- Không cho phép % voucher vượt 100 hoặc giá trị fixed âm
- Không cho phép kết thúc Flash Sale đã kết thúc
- Chỉ Super Admin mới thấy tab Khuyến mãi trong sidebar

### 6.4 Khả năng mở rộng

- `promoVouchers[]` có thể mở rộng để hỗ trợ voucher gắn với từng user (cột `userId`)
- `products[]` trong Flash Sale có thể mở rộng thêm `registerNote` của Seller
- Cấu hình điểm thưởng có thể thêm `earnRateByCategory[]` để phân biệt tỷ lệ tích điểm theo danh mục

---

## 7. Tiêu chí nghiệm thu (Acceptance Criteria)

### AC-01: Mã giảm giá

| # | Điều kiện kiểm thử | Kết quả mong đợi |
|---|-------------------|-----------------|
| 1 | Tạo voucher với mã đã tồn tại | Toast "Mã voucher đã tồn tại!"; không tạo |
| 2 | Tạo voucher thiếu ngày kết thúc | Toast "Vui lòng chọn thời hạn hiệu lực"; không tạo |
| 3 | Nhập mã thường, lưu | Mã tự động uppercase trong input và lưu trữ |
| 4 | Tắt voucher đang active | Badge chuyển xám "Đã tắt"; nút "Bật" xuất hiện |
| 5 | Bật voucher đang inactive | Badge chuyển xanh "Hoạt động"; nút "Tắt" xuất hiện |
| 6 | Xóa voucher: hủy confirm | Voucher vẫn còn trong danh sách |
| 7 | Xóa voucher: xác nhận | Voucher biến mất khỏi danh sách |
| 8 | Chọn danh mục "Tất cả" + danh mục khác | Lưu `['all']` (all ghi đè) |
| 9 | Voucher expired không có nút Sửa | Chỉ có nút Xóa |

### AC-02: Flash Sale

| # | Điều kiện kiểm thử | Kết quả mong đợi |
|---|-------------------|-----------------|
| 1 | Tạo Flash Sale với endTime trước startTime | Toast "Thời gian kết thúc phải sau thời gian bắt đầu" |
| 2 | Tạo Flash Sale thành công | Card mới với status "Sắp diễn ra" xuất hiện đầu danh sách |
| 3 | Duyệt sản phẩm pending | Badge chuyển xanh "Đã duyệt"; nút Duyệt/Từ chối biến mất |
| 4 | Từ chối SP, nhập lý do | Badge đỏ "Từ chối"; rejectReason được lưu |
| 5 | Từ chối SP, bấm Cancel | Không thay đổi trạng thái sản phẩm |
| 6 | Kết thúc sớm Flash Sale, hủy confirm | Status vẫn giữ nguyên |
| 7 | Kết thúc sớm Flash Sale, xác nhận | Status → "ended"; `endedEarlyAt` xuất hiện trong chi tiết |
| 8 | Flash Sale đã ended không hiện nút "Kết thúc sớm" | Chỉ còn nút "Chi tiết" |

### AC-03: Điểm thưởng

| # | Điều kiện kiểm thử | Kết quả mong đợi |
|---|-------------------|-----------------|
| 1 | Nhập earnRate = 500 (< 1.000) | Toast "Tỷ lệ tích điểm tối thiểu 1.000đ = 1 điểm" |
| 2 | Nhập redeemVoucherPct = 110 | Toast "% voucher quy đổi phải từ 1–100" |
| 3 | Lưu cài đặt hợp lệ | Panel tóm tắt bên phải cập nhật; toast xác nhận |
| 4 | Sửa hạng Vàng, nhập multiplier = 0.5 | Toast "Hệ số phải >= 1"; không lưu |
| 5 | Sửa hạng, bấm Cancel ở prompt thứ nhất | Không thay đổi gì |
| 6 | Lưu cài đặt | `updatedAt` trong panel tóm tắt = ngày hôm nay |

---

## 8. Rủi ro và giải pháp

| Rủi ro | Mức độ | Giải pháp |
|--------|--------|----------|
| Admin tạo quá nhiều voucher chồng chéo điều kiện, người dùng không biết áp dụng cái nào | Cao | UI hiển thị rõ điều kiện trên mỗi card; giới hạn 1 voucher/lần thanh toán ở checkout |
| Seller đăng ký hàng loạt sản phẩm không đúng Flash Sale → gây tắc nghẽn duyệt | Trung bình | Giới hạn số SP/lần đăng ký; phân loại theo trạng thái để Admin lọc nhanh |
| Điểm thưởng không expire đúng hạn do logic chỉ check client-side | Cao | Trong MVP là thống kê tĩnh; khi có backend sẽ chạy cron job hàng đêm kiểm tra expire |
| Voucher FLAT50K hết lượt (usedCount = maxUsage) nhưng vẫn hiện active | Trung bình | Frontend kiểm tra `usedCount >= maxUsage` khi apply voucher ở checkout; thêm cột % trong bảng quản lý |
| Admin xóa nhầm Flash Sale có dữ liệu bán hàng | Cao | MVP không có tính năng xóa Flash Sale — chỉ kết thúc sớm; lịch sử dữ liệu giữ nguyên |
| Hệ số nhân x2 ở hạng Kim Cương làm điểm tăng quá nhanh, mất cân bằng kinh tế | Trung bình | Thêm giới hạn earnRate tối thiểu (≥1.000đ) và cap điểm tối đa/đơn trong roadmap P2 |

---

## 9. Lộ trình phát triển

### P1 — Đã triển khai (Sprint hiện tại)
- [x] CRUD voucher toàn sàn (% và cố định)
- [x] Tìm kiếm, lọc, phân trang voucher
- [x] Thống kê voucher (KPI + progress bar)
- [x] Tạo và quản lý Flash Sale
- [x] Duyệt / từ chối sản phẩm Flash Sale
- [x] Kết thúc sớm Flash Sale
- [x] Cài đặt tỷ lệ tích điểm và quy đổi
- [x] Quản lý hạng thành viên
- [x] Xem thống kê điểm thưởng tổng hợp

### P2 — Sprint tiếp theo
- [ ] Voucher cá nhân hóa: gắn voucher cho từng user cụ thể
- [ ] Bộ lọc nâng cao Flash Sale: lọc theo doanh thu, số SP chờ duyệt
- [ ] Xuất báo cáo Flash Sale dưới dạng CSV/Excel
- [ ] Cài đặt `earnRateByCategory` — tỷ lệ tích điểm khác nhau theo danh mục
- [ ] Lịch sử chỉnh sửa voucher (audit log)

### P3 — Tương lai
- [ ] A/B testing voucher: so sánh hiệu quả 2 phiên bản voucher cùng chiến dịch
- [ ] Voucher kết hợp Flash Sale: sản phẩm Flash Sale áp dụng thêm voucher (cộng dồn)
- [ ] Tự động tắt voucher khi hết hạn (cron job backend)
- [ ] Dashboard phân tích ROI: so sánh chi phí khuyến mãi vs doanh thu tăng thêm
- [ ] Chương trình giới thiệu bạn bè (Referral): tạo voucher qua mã giới thiệu
- [ ] Thông báo đẩy (Push Notification) khi Flash Sale sắp bắt đầu

---

*Tài liệu này được soạn dựa trên phân tích mã nguồn `public/app.js` (hàm `adminPromo*`) và thiết kế sản phẩm EduMart. Cập nhật cùng mỗi sprint phát triển.*
