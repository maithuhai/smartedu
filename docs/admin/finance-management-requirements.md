# Tài liệu Phân tích Yêu cầu
## Phân hệ Quản lý Tài chính — EduMart Admin

**Phiên bản:** 1.0  
**Ngày:** 22/06/2026  
**Tác giả:** EduMart Product Team  
**Trạng thái:** Đã triển khai

---

## 1. Tổng quan

### 1.1 Mục đích

Phân hệ Quản lý Tài chính cung cấp cho quản trị viên EduMart bức tranh toàn cảnh về sức khoẻ tài chính của nền tảng: doanh thu GMV, hoa hồng thu được, phân phối theo danh mục và xu hướng theo tháng. Đồng thời, Admin quản lý toàn bộ vòng đời thanh toán cho seller — từ khi seller yêu cầu rút tiền đến khi chuyển khoản hoàn tất — và truy vết lịch sử mọi giao dịch trên hệ thống.

Mục tiêu nghiệp vụ chính:
- Duy trì minh bạch dòng tiền nền tảng — Admin biết chính xác GMV, hoa hồng, và từng đơn thanh toán Seller
- Xử lý yêu cầu rút tiền của Seller trong thời hạn cam kết (T+3 ngày làm việc)
- Cung cấp dữ liệu tài chính theo thời gian thực hỗ trợ ra quyết định kinh doanh

### 1.2 Phạm vi

| Nhóm | Tính năng |
|------|-----------|
| **Tổng quan tài chính** | GMV tháng này, hoa hồng, hoa hồng chờ xử lý, tổng doanh thu; biểu đồ bar 12 tháng; bảng theo danh mục |
| **Quản lý thanh toán Seller** | Xem danh sách seller đang chờ thanh toán + số tiền; duyệt / từ chối / hoàn tất thanh toán |
| **Lịch sử thanh toán** | Tra cứu toàn bộ giao dịch đã xử lý theo tháng / seller |

### 1.3 Người dùng hệ thống (Actors)

| Actor | Quyền truy cập |
|-------|----------------|
| **Super Admin** | Toàn bộ: xem báo cáo, duyệt / từ chối thanh toán Seller, tra cứu lịch sử |
| **Content Admin** | Không truy cập phân hệ này |
| **Read-only Admin** | Chỉ xem tổng quan và lịch sử — không thể duyệt/từ chối |

### 1.4 Điều kiện tiên quyết

- Người dùng đã đăng nhập với `role='admin'`
- Dữ liệu tài chính tĩnh khởi tạo trong `FIN_GMV`, `FIN_COMM`, `FIN_CATS`, `FIN_MONTHS`
- Dữ liệu seller rút tiền trong `FIN_WITHDRAWALS[]`
- Lịch sử thanh toán trong `FIN_PAYMENTS[]`
- Hàm `fmt()`, `fmtBig()`, `escHtml()`, `toast()`, `todayStr()` đã có sẵn
- `acctTab='adm-finance'` + `admFinTab` kích hoạt module

---

## 2. Yêu cầu chức năng

### 2.1 FR-07: Tổng quan Tài chính

#### FR-07.1 KPI Header (4 thẻ)

Hiển thị hàng ngang đầu trang tab "Tổng quan".

| Thẻ | Giá trị | Badge màu |
|-----|---------|-----------|
| GMV Tháng này | `FIN_GMV` (tổng giá trị hàng hoá giao dịch) | Xanh lá |
| Hoa hồng Thu được | `FIN_COMM` (hoa hồng nền tảng đã thu) | Xanh dương |
| Hoa hồng Chờ xử lý | `FIN_COMM_PENDING` (hoa hồng từ đơn chưa hoàn thành) | Cam |
| Tổng Doanh thu | `FIN_GMV + FIN_COMM` (tổng hợp) | Đỏ thương hiệu |

**Định dạng:** `fmtBig(value)` — viết tắt đơn vị triệu/tỷ (vd: `42.5M`, `1.2B`).

#### FR-07.2 Biểu đồ Bar 12 tháng (`FIN_MONTHS`)

**Dữ liệu:**
```javascript
FIN_MONTHS = [
  {month: 'T1', gmv: number, comm: number},
  ...×12
]
```

**Hiển thị:**
- Mỗi tháng: 2 cột màu (GMV = xanh dương nhạt, Hoa hồng = đỏ thương hiệu)
- Trục Y: giá trị `fmtBig()`, chia 5 mức từ 0 đến max
- Trục X: T1–T12
- Đường kẻ ngang nét đứt mờ ở mỗi mức trục Y
- Tooltip khi hover (hiển thị giá trị đúng)

**Thực thi:** Vẽ thuần CSS `display:flex`, `height` tỷ lệ phần trăm với max value — không dùng thư viện chart ngoài.

**Công thức chiều cao cột:**
```
height = (value / maxValue) * 100 + '%'
```

#### FR-07.3 Phân phối theo Danh mục (`FIN_CATS`)

**Dữ liệu:**
```javascript
FIN_CATS = [
  {name: 'Sách giáo khoa', gmv: number, pct: number},
  ...
]
```

**Hiển thị dạng bảng:**

| Cột | Nội dung |
|-----|---------|
| Danh mục | Tên danh mục sách |
| GMV | `fmt(gmv)` + "đ" |
| Tỷ trọng | `pct + '%'` dạng text |
| Progress bar | `width: pct%`, màu gradient theo vị trí |

Sắp xếp giảm dần theo GMV (danh mục doanh thu cao nhất trên cùng).

---

### 2.2 FR-08: Thanh toán Seller (Seller Payouts)

#### FR-08.1 KPI Thanh toán

| Thẻ | Điều kiện tính | Badge màu |
|-----|---------------|-----------|
| Yêu cầu mới | `FIN_WITHDRAWALS.filter(w => w.status='pending').length` | Cam |
| Đang xử lý | `FIN_WITHDRAWALS.filter(w => w.status='processing').length` | Xanh dương |
| Đã thanh toán | `FIN_WITHDRAWALS.filter(w => w.status='paid').length` | Xanh lá |
| Tổng chờ xử lý | `sum(pending + processing amounts)` VNĐ | Đỏ |

#### FR-08.2 Danh sách yêu cầu rút tiền

**Bộ lọc:**
- Dropdown trạng thái: Tất cả / Chờ duyệt / Đang xử lý / Đã thanh toán / Từ chối
- Dropdown seller: Tất cả seller / theo từng seller name

**Bảng:**

| Cột | Nội dung |
|-----|---------|
| Seller | Tên shop (đậm) + email (nhỏ, mờ) |
| Ngân hàng | Tên ngân hàng + số tài khoản (mask: giữ lại 4 số cuối `****XXXX`) |
| Số tiền | `fmt(amount)` + "đ" |
| Ngày yêu cầu | DD/MM/YYYY |
| Trạng thái | Badge màu theo trạng thái |
| Hành động | Nút theo trạng thái (xem §2.2.3) |

#### FR-08.3 Nút hành động theo trạng thái

| Trạng thái | Nút hiển thị |
|-----------|-------------|
| `pending` | [✓ Duyệt] [✕ Từ chối] |
| `processing` | [✓ Xác nhận đã TT] |
| `paid` | [✓ Đã thanh toán] — disabled/grey |
| `rejected` | [✕ Đã từ chối] — disabled/grey |

#### FR-08.4 Luồng xử lý thanh toán

**`doApproveWithdrawal(wId)`** — Duyệt yêu cầu:
```
Điều kiện: w.status = 'pending'
→ confirm('Duyệt thanh toán X đ cho Seller Y?')
→ w.status = 'processing'
→ w.processedAt = todayStr()
→ w.processedBy = 'Admin EduMart'
→ saveAdminFinance() + toast('Đã duyệt, đang xử lý chuyển khoản') + re-render
```

**`doRejectWithdrawal(wId)`**:
```
Điều kiện: w.status = 'pending'
→ prompt('Lý do từ chối:')  — bắt buộc, hủy nếu rỗng
→ w.status = 'rejected'
→ w.rejectedAt = todayStr()
→ w.rejectedBy = 'Admin EduMart'
→ w.rejectionReason = reason
→ saveAdminFinance() + toast('Đã từ chối') + re-render
```

**`doCompleteWithdrawal(wId)`** — Xác nhận đã chuyển khoản:
```
Điều kiện: w.status = 'processing'
→ confirm('Xác nhận đã chuyển khoản thành công?')
→ w.status = 'paid'
→ w.paidAt = todayStr()
→ Thêm entry vào FIN_PAYMENTS: {sellerId, sellerName, amount, paidAt, method:'bank_transfer', ref: 'PAY-' + id}
→ saveAdminFinance() + toast('Xác nhận thanh toán thành công') + re-render
```

---

### 2.3 FR-09: Lịch sử Thanh toán

#### FR-09.1 Bộ lọc lịch sử

| Bộ lọc | Phạm vi |
|--------|---------|
| Theo tháng | Dropdown tháng/năm — lọc `FIN_PAYMENTS` theo `paidAt` |
| Theo seller | Dropdown danh sách seller — lọc theo `sellerId` |

Hai bộ lọc kết hợp AND. Không có bộ lọc → hiển thị 30 giao dịch gần nhất.

#### FR-09.2 Bảng lịch sử

| Cột | Nội dung |
|-----|---------|
| Mã GD | Mã tham chiếu `PAY-XXXXX` (font monospace) |
| Seller | Tên shop |
| Số tiền | `fmt(amount)` + "đ" |
| Phương thức | Badge: bank_transfer / momo / vnpay |
| Ngày TT | DD/MM/YYYY |
| Trạng thái | Badge xanh "Hoàn thành" |

**KPI tổng hợp kết quả:**
- Số giao dịch: `results.length`
- Tổng thanh toán: `sum(results.map(p => p.amount))`

---

## 3. Mô hình dữ liệu

### 3.1 Dữ liệu Tài chính Tĩnh

```javascript
// Tổng quan tháng này
const FIN_GMV = 4250000000;           // GMV tháng này (VNĐ)
const FIN_COMM = 382500000;           // Hoa hồng đã thu (9% GMV)
const FIN_COMM_PENDING = 47800000;    // Hoa hồng chờ xử lý
```

### 3.2 Dữ liệu Doanh thu 12 tháng (`FIN_MONTHS`)

```javascript
const FIN_MONTHS = [
  {month:'T1', gmv:3100000000, comm:279000000},
  {month:'T2', gmv:2800000000, comm:252000000},
  {month:'T3', gmv:3400000000, comm:306000000},
  {month:'T4', gmv:3600000000, comm:324000000},
  {month:'T5', gmv:3900000000, comm:351000000},
  {month:'T6', gmv:4100000000, comm:369000000},
  {month:'T7', gmv:3800000000, comm:342000000},
  {month:'T8', gmv:4200000000, comm:378000000},
  {month:'T9', gmv:3700000000, comm:333000000},
  {month:'T10',gmv:4000000000, comm:360000000},
  {month:'T11',gmv:4500000000, comm:405000000},
  {month:'T12',gmv:4250000000, comm:382500000}
]
```

### 3.3 Phân phối Danh mục (`FIN_CATS`)

```javascript
const FIN_CATS = [
  {name:'Sách giáo khoa', gmv:1487500000, pct:35},
  {name:'Sách tham khảo', gmv:1062500000, pct:25},
  {name:'Sách văn học',   gmv: 637500000, pct:15},
  {name:'Sách tiếng Anh', gmv: 510000000, pct:12},
  {name:'Sách kỹ năng',   gmv: 340000000, pct:8},
  {name:'Khác',           gmv: 212500000, pct:5}
]
```

### 3.4 WithdrawalRequest (`FIN_WITHDRAWALS[]`)

```javascript
{
  id: string,              // 'WD-XXXXX'
  sellerId: string,
  sellerName: string,
  sellerEmail: string,
  bankName: string,        // Tên ngân hàng (vd: 'Vietcombank')
  bankAccount: string,     // Số TK đầy đủ — hiển thị mask ****XXXX
  amount: number,          // Số tiền yêu cầu (VNĐ)
  requestedAt: string,     // 'DD/MM/YYYY'
  status: string,          // 'pending' | 'processing' | 'paid' | 'rejected'
  processedAt: string | null,
  processedBy: string | null,
  paidAt: string | null,
  rejectedAt: string | null,
  rejectedBy: string | null,
  rejectionReason: string | null
}
```

### 3.5 PaymentRecord (`FIN_PAYMENTS[]`)

```javascript
{
  id: string,              // 'PAY-XXXXX'
  sellerId: string,
  sellerName: string,
  amount: number,
  paidAt: string,          // 'DD/MM/YYYY'
  method: string,          // 'bank_transfer' | 'momo' | 'vnpay'
  ref: string              // Mã tham chiếu giao dịch
}
```

### 3.6 Lưu trữ

| localStorage Key | Kiểu | Ghi chú |
|-----------------|------|---------|
| `adminFinance` | `{withdrawals: WD[], payments: PAY[]}` | Được ghi mỗi khi Admin thực hiện hành động |
| Dữ liệu tĩnh | JS constants | `FIN_GMV`, `FIN_COMM`, `FIN_CATS`, `FIN_MONTHS` — khởi tạo cứng trong code |

**Hàm lưu trữ:**
```javascript
function saveAdminFinance() {
  localStorage.setItem('adminFinance', JSON.stringify({
    withdrawals: FIN_WITHDRAWALS,
    payments: FIN_PAYMENTS
  }));
}
```

---

## 4. Bảng trạng thái và Chuyển trạng thái

### 4.1 Trạng thái WithdrawalRequest

| Giá trị | Tên hiển thị | Badge màu |
|---------|-------------|-----------|
| `pending` | Chờ duyệt | Cam |
| `processing` | Đang xử lý | Xanh dương |
| `paid` | Đã thanh toán | Xanh lá |
| `rejected` | Từ chối | Đỏ |

### 4.2 Ma trận chuyển trạng thái

```
                [Admin Duyệt]         [Admin XN đã TT]
pending ──────────────────────→ processing ──────────────→ paid
   │
   └──────────────────────────────────────────────────────→ rejected
                [Admin Từ chối]
```

**Quy tắc:**
- `pending` → `processing`: Admin nhấn "✓ Duyệt" + xác nhận
- `processing` → `paid`: Admin nhấn "✓ Xác nhận đã TT" + xác nhận + ghi vào `FIN_PAYMENTS`
- `pending` → `rejected`: Admin nhấn "✕ Từ chối" + nhập lý do bắt buộc
- `paid`, `rejected`: trạng thái cuối, không chuyển tiếp

---

## 5. Luồng hoạt động

### 5.1 Luồng Thanh toán Seller (Seller Payment Flow)

```
Seller đặt yêu cầu rút tiền (từ giao diện Seller Portal)
    → Tạo WithdrawalRequest với status='pending'
    ↓
Admin vào tab "Thanh toán Seller" → thấy badge "Yêu cầu mới" (N)
    → Xem chi tiết: seller, ngân hàng (mask), số tiền
    ↓
Admin quyết định:

  [✓ Duyệt]
    → status: pending → processing
    → processedAt, processedBy ghi nhận
    → Toast: "Đã duyệt, đang xử lý chuyển khoản"
    ↓
  (Admin thực hiện chuyển khoản thủ công qua Internet Banking)
    ↓
  [✓ Xác nhận đã TT]
    → status: processing → paid
    → paidAt ghi nhận
    → Thêm record vào FIN_PAYMENTS
    → Toast: "Xác nhận thanh toán thành công"

  [✕ Từ chối]
    → Nhập lý do từ chối (bắt buộc)
    → status: pending → rejected
    → Toast: "Đã từ chối yêu cầu"
    → Seller cần tạo yêu cầu mới nếu muốn thử lại

Hệ thống: record FIN_PAYMENTS phục vụ lịch sử tra cứu
```

---

## 6. Giao diện người dùng (UI Mockups)

### 6.1 Tab Tổng quan Tài chính

```
┌─────────────────────────────────────────────────────────────────────┐
│  Quản lý Tài chính                                                  │
│  [Tổng quan] [Thanh toán Seller (3)] [Lịch sử thanh toán]          │
│                                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │  4.25B   │  │ 382.5M   │  │    47.8M     │  │   4.63B      │   │
│  │ GMV      │  │ Hoa hồng │  │  HH Chờ xử  │  │ Tổng doanh  │   │
│  │ Tháng này│  │ Thu được │  │  lý          │  │ thu          │   │
│  └──────────┘  └──────────┘  └──────────────┘  └──────────────┘   │
│                                                                     │
│  Biểu đồ Doanh thu 12 tháng                                         │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │ 5B ┤                                          ┬─┐            │  │
│  │    │                              ┬─┐    ┬─┐  │ │            │  │
│  │ 4B ┤       ┬─┐      ┬─┐   ┬─┐   │ │  ┬─┤ │  │ │ ┬─┐        │  │
│  │    │  ┬─┐  │ │ ┬─┐  │ │   │ │   │ │  │ │ │  │ │ │ │        │  │
│  │ 3B ┤  │ │  │ │ │ │  │ │   │ │   │ │  │ │ │  │ │ │ │        │  │
│  │    │  │ │  │ │ │ │  │ │   │ │   │ │  │ │ │  │ │ │ │        │  │
│  │ 0  └──┴─┴──┴─┴─┴─┴──┴─┴───┴─┴───┴─┴──┴─┴─┴──┴─┴─┴─┴──────  │  │
│  │    T1   T2   T3   T4    T5   T6   T7   T8  T9  T10 T11 T12  │  │
│  └───────────────────────────────────────────────────────────────┘  │
│  [■ GMV] [■ Hoa hồng]                                              │
│                                                                     │
│  Phân phối theo Danh mục                                            │
│  Danh mục          │ GMV (đ)       │ Tỷ trọng │ Progress           │
│  ──────────────────────────────────────────────────────────────── │
│  Sách giáo khoa    │ 1.487.500.000 │   35%    │ ▓▓▓▓▓▓▓░░░░░░░░░  │
│  Sách tham khảo    │ 1.062.500.000 │   25%    │ ▓▓▓▓▓░░░░░░░░░░░  │
│  Sách văn học      │   637.500.000 │   15%    │ ▓▓▓░░░░░░░░░░░░░  │
│  Sách tiếng Anh    │   510.000.000 │   12%    │ ▓▓░░░░░░░░░░░░░░  │
│  Sách kỹ năng      │   340.000.000 │    8%    │ ▓░░░░░░░░░░░░░░░  │
│  Khác              │   212.500.000 │    5%    │ ▓░░░░░░░░░░░░░░░  │
└─────────────────────────────────────────────────────────────────────┘
```

### 6.2 Tab Thanh toán Seller

```
┌─────────────────────────────────────────────────────────────────────┐
│  [Tổng quan] [Thanh toán Seller (3) ●] [Lịch sử thanh toán]        │
│                                                                     │
│  ┌────────┐  ┌──────────┐  ┌────────────┐  ┌──────────────────┐   │
│  │   3    │  │    1     │  │     8      │  │   156.500.000đ   │   │
│  │Yêu cầu │  │ Đang xử  │  │ Đã thanh  │  │ Tổng chờ xử lý  │   │
│  │ mới    │  │ lý       │  │ toán      │  │                  │   │
│  └────────┘  └──────────┘  └────────────┘  └──────────────────┘   │
│                                                                     │
│  [Trạng thái ▾]  [Seller ▾]                                        │
│                                                                     │
│  Seller           │ Ngân hàng            │ Số tiền   │ Ngày    │TT │
│  ─────────────────────────────────────────────────────────────── │
│  NXB GD VN        │ Vietcombank          │ 87.500.000│ 10/6/26 │🟡 │
│  shop@nxbgd.vn    │ ****3842             │           │         │   │
│  [✓ Duyệt] [✕ Từ chối]                                            │
│  ─────────────────────────────────────────────────────────────── │
│  Fahasa Corp       │ Techcombank          │ 45.200.000│ 11/6/26 │🟡 │
│  finance@fahasa.vn │ ****7291             │           │         │   │
│  [✓ Duyệt] [✕ Từ chối]                                            │
│  ─────────────────────────────────────────────────────────────── │
│  Alphabooks        │ BIDV                 │ 23.800.000│ 08/6/26 │🔵 │
│  pay@alpha.vn      │ ****5519             │           │ (đang xử│   │
│  [✓ Xác nhận đã TT]                                               │
└─────────────────────────────────────────────────────────────────────┘
```

### 6.3 Tab Lịch sử Thanh toán

```
┌─────────────────────────────────────────────────────────────────────┐
│  [Tổng quan] [Thanh toán Seller] [Lịch sử thanh toán]              │
│                                                                     │
│  [Tháng 6/2026 ▾]  [Tất cả seller ▾]                              │
│                                                                     │
│  8 giao dịch  ·  Tổng: 348.200.000đ                                │
│                                                                     │
│  Mã GD         │ Seller      │ Số tiền     │ Phương thức │ Ngày TT  │
│  ──────────────────────────────────────────────────────────────── │
│  PAY-28A4F1    │ NXB GD VN   │ 95.000.000  │ Bank TF     │ 05/6/26  │
│  PAY-28A3E0    │ Fahasa      │ 67.500.000  │ Bank TF     │ 04/6/26  │
│  PAY-28A2D1    │ Alphabooks  │  54.200.000  │ Bank TF     │ 03/6/26  │
│  ...                                                               │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 7. Yêu cầu phi chức năng

### 7.1 Hiệu suất

| Yêu cầu | Mức độ |
|---------|--------|
| Render biểu đồ 12 tháng | < 300ms (CSS thuần, không thư viện ngoài) |
| Filter lịch sử thanh toán | Tức thì (filter trên mảng JS) |
| Re-render sau hành động | < 300ms |

### 7.2 Bảo mật và Toàn vẹn dữ liệu

| Quy tắc | Áp dụng |
|---------|---------|
| Mask số tài khoản | Luôn hiển thị `****XXXX` (4 số cuối) — không bao giờ expose full account number trong UI |
| Escape HTML | `escHtml()` cho tên seller, lý do từ chối, ghi chú |
| Bắt buộc lý do từ chối | `prompt()` không để rỗng, hủy nếu cancel |
| Xác nhận trước hành động | `confirm()` trước Duyệt và XN đã TT (không thể hoàn tác) |
| Ghi nhận người thực hiện | `processedBy`, `rejectedBy` = 'Admin EduMart' + timestamp |

### 7.3 Khả năng sử dụng (UX)

| Yêu cầu | Chi tiết |
|---------|---------|
| Badge số yêu cầu chờ | Tab "Thanh toán Seller" hiển thị số `pending + processing` |
| KPI tổng chờ xử lý | Tổng số tiền từ `pending + processing` giúp Admin ước tính dòng tiền |
| Biểu đồ responsive | `overflow-x:auto` trên mobile, min-width đảm bảo dễ đọc |
| Sắp xếp yêu cầu | `pending` trước `processing` trước `paid/rejected` — ưu tiên xử lý ngay |
| Format tiền lớn | `fmtBig()` trong KPI (42.5M), `fmt()` + "đ" trong bảng chi tiết |

---

## 8. Tiêu chí chấp nhận

### 8.1 Tổng quan Tài chính

| # | Tiêu chí |
|---|---------|
| AC-21 | 4 KPI card tổng quan hiển thị giá trị đúng theo `FIN_GMV`, `FIN_COMM`, `FIN_COMM_PENDING` |
| AC-22 | Biểu đồ bar 12 tháng hiển thị đúng tỷ lệ chiều cao tương đối giữa các tháng |
| AC-23 | Biểu đồ có 2 màu cột phân biệt GMV và Hoa hồng |
| AC-24 | Bảng danh mục sắp xếp giảm dần theo GMV |
| AC-25 | Progress bar rộng theo tỷ lệ % danh mục |

### 8.2 Thanh toán Seller

| # | Tiêu chí |
|---|---------|
| AC-26 | Số tài khoản ngân hàng luôn hiển thị dạng mask `****XXXX` |
| AC-27 | Nút Duyệt chỉ hiển thị với yêu cầu `pending` |
| AC-28 | Nút "XN đã TT" chỉ hiển thị với yêu cầu `processing` |
| AC-29 | Từ chối yêu cầu bắt buộc nhập lý do — không lưu nếu rỗng |
| AC-30 | Xác nhận đã TT → ghi record vào `FIN_PAYMENTS` với `paidAt` đúng ngày hôm nay |

---

## 9. Rủi ro và Giải pháp

| # | Rủi ro | Mức độ | Giải pháp |
|---|--------|--------|-----------|
| R-01 | Admin duyệt sai yêu cầu rút tiền (sai seller, sai số TK) | Cao | Hiển thị đầy đủ tên seller + bank + amount trong confirm dialog; P2: 2-step approval |
| R-02 | Dữ liệu tài chính tĩnh (`FIN_GMV`, v.v.) không phản ánh realtime | Trung bình | Giới hạn demo; production cần aggregate từ `sysOrders` theo ngày lọc |
| R-03 | Admin nhấn "XN đã TT" nhưng thực tế chưa chuyển khoản | Cao | Quy trình nội bộ: chỉ nhấn sau khi có mã GD ngân hàng; P2: bắt buộc nhập mã tham chiếu GD |
| R-04 | Mất dữ liệu `FIN_PAYMENTS` khi localStorage bị xóa | Trung bình | Giới hạn demo; production cần server-side persistence |
| R-05 | Tỷ lệ hoa hồng thay đổi nhưng giá trị tĩnh không cập nhật | Thấp | P2: tính hoa hồng động từ `sysOrders` và cấu hình tỷ lệ trong admin settings |

---

## 10. Lộ trình phát triển

### P1 — Đã triển khai (phiên bản hiện tại)

- [x] Tab Tổng quan: 4 KPI + biểu đồ bar 12 tháng (CSS thuần) + bảng phân phối danh mục
- [x] Tab Thanh toán Seller: 4 KPI + danh sách yêu cầu với bộ lọc 2 chiều
- [x] Duyệt / Từ chối / Xác nhận thanh toán với validate và log nhận diện Admin
- [x] Mask số tài khoản ngân hàng `****XXXX`
- [x] Tab Lịch sử: tra cứu theo tháng + seller, KPI kết quả tổng hợp

### P2 — Phát triển tiếp theo

- [ ] Tính GMV và hoa hồng động từ `sysOrders` thay vì giá trị tĩnh
- [ ] Bộ lọc ngày tùy chỉnh cho biểu đồ doanh thu (quý, năm)
- [ ] Bắt buộc nhập mã tham chiếu GD ngân hàng khi xác nhận đã TT
- [ ] Export báo cáo tài chính tháng ra CSV / PDF
- [ ] 2-step approval cho yêu cầu rút tiền > 100M đ (Super Admin + Finance Admin ký duyệt)

### P3 — Tính năng nâng cao

- [ ] Tích hợp API ngân hàng để tự động chuyển khoản và xác nhận trạng thái
- [ ] Dashboard tài chính realtime với WebSocket (GMV theo giờ)
- [ ] Phân tích xu hướng: so sánh YoY/MoM, dự báo doanh thu tháng tiếp theo
- [ ] Cảnh báo bất thường: GMV giảm đột ngột > 30% so với tuần trước → email notify Admin

---

*Tài liệu này mô tả phân hệ Quản lý Tài chính đã được triển khai trong phiên bản demo của EduMart Admin. Phần Quản lý Đơn hàng (khiếu nại, hoàn tiền, can thiệp thủ công) được mô tả riêng trong file `admin-orders-management-requirements.md`.*
