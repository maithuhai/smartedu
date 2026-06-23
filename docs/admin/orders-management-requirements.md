# Tài liệu Phân tích Yêu cầu
## Phân hệ Quản lý Đơn hàng — EduMart Admin

**Phiên bản:** 1.0  
**Ngày:** 22/06/2026  
**Tác giả:** EduMart Product Team  
**Trạng thái:** Đã triển khai

---

## 1. Tổng quan

### 1.1 Mục đích

Phân hệ Quản lý Đơn hàng cung cấp cho quản trị viên EduMart bộ công cụ giám sát toàn bộ vòng đời đơn hàng trên nền tảng — từ khi người mua đặt hàng đến khi giao thành công hoặc hoàn tất xử lý sự cố. Admin có thể quan sát trạng thái mọi đơn, xử lý khiếu nại từ người mua, phê duyệt hoàn tiền, và can thiệp thủ công vào bất kỳ bước nào trong quy trình.

Mục tiêu nghiệp vụ chính:
- Đảm bảo mọi đơn hàng được xử lý trong thời hạn cam kết với người mua
- Giải quyết khiếu nại và hoàn tiền minh bạch, có truy vết đầy đủ
- Ghi nhật ký mọi can thiệp của Admin để kiểm toán nội bộ

### 1.2 Phạm vi

| Nhóm | Tính năng |
|------|-----------|
| **Danh sách đơn hàng** | Xem toàn bộ đơn, lọc theo trạng thái / seller / text, phân trang 8 đơn/trang |
| **Chi tiết đơn hàng** | Thông tin người mua, seller, sản phẩm, tổng tiền, timeline trạng thái |
| **Quản lý Khiếu nại** | Danh sách khiếu nại, phân loại 4 trạng thái, xử lý từng trường hợp |
| **Quản lý Hoàn tiền** | Khởi tạo, duyệt, từ chối, hoàn tất yêu cầu hoàn tiền |
| **Can thiệp thủ công** | Cập nhật trạng thái đơn, ghi chú vào nhật ký Admin |
| **Nhật ký can thiệp** | Tổng hợp mọi hành động Admin trên tất cả đơn hàng |

### 1.3 Người dùng hệ thống (Actors)

| Actor | Quyền truy cập |
|-------|----------------|
| **Super Admin** | Toàn bộ: xem, lọc, can thiệp, xử lý khiếu nại, phê duyệt hoàn tiền |
| **Content Admin** | Không truy cập phân hệ này |
| **Read-only Admin** | Chỉ xem danh sách đơn và chi tiết — không thực hiện hành động |

### 1.4 Điều kiện tiên quyết

- Người dùng đã đăng nhập với `role='admin'`
- Dữ liệu đơn hàng khởi tạo trong `sysOrders[]` (localStorage key: `sysOrders`)
- Hàm `escHtml()`, `toast()`, `todayStr()`, `fmt()`, `fmtBig()` đã có sẵn
- `acctTab='adm-orders'` kích hoạt module

---

## 2. Yêu cầu chức năng

### 2.1 FR-01: Danh sách & Tìm kiếm Đơn hàng

#### FR-01.1 KPI tổng quan

**Mô tả:** 5 thẻ KPI hiển thị đầu trang, tính từ toàn bộ `sysOrders[]`.

| Thẻ | Điều kiện tính | Badge màu |
|-----|---------------|-----------|
| Tổng đơn | `sysOrders.length` | Tím |
| Chờ xác nhận | `status = 'pending'` | Cam |
| Đang giao | `status = 'shipping'` | Xanh dương |
| Hoàn thành | `status = 'completed' \| 'delivered'` | Xanh lá |
| Hủy / Hoàn | `status = 'cancelled' \| 'refunded'` | Đỏ |

#### FR-01.2 Bộ lọc và tìm kiếm

| Bộ lọc | Phạm vi tìm kiếm |
|--------|-----------------|
| Tìm kiếm text | Mã đơn, tên người mua, email người mua, tên seller (OR logic, case-insensitive) |
| Trạng thái | Dropdown 8 trạng thái + "Tất cả" |
| Seller | Dropdown danh sách seller đang hoạt động + "Tất cả seller" |

Tất cả bộ lọc kết hợp theo AND. Nút "Xóa lọc" hiển thị khi đang áp dụng bất kỳ bộ lọc nào.

#### FR-01.3 Bảng danh sách

| Cột | Nội dung |
|-----|---------|
| Mã đơn | Font monospace, prefix `#`, sắp xếp giảm dần theo ID |
| Người mua | Tên (đậm) + email (nhỏ, mờ) |
| Seller | Tên shop |
| SP | Số lượng `items.length` |
| Tổng tiền | Định dạng VNĐ |
| Ngày đặt | DD/MM/YYYY |
| Trạng thái | Badge màu + cờ khiếu nại (⚑ đỏ) / cờ hoàn tiền (↩) nếu có |
| Hành động | Nút "Chi tiết" |

**Tương tác:** Click vào dòng bất kỳ hoặc nút "Chi tiết" → mở `admOrdersView='detail'`.

**Phân trang:** 8 đơn/trang. Badge số đơn `pending` hiển thị trên tab "Tất cả đơn hàng".

#### FR-01.4 Tab Khiếu nại (danh sách)

Lọc `sysOrders` lấy những đơn có `complaint != null`, sắp xếp ưu tiên `open → investigating → resolved → rejected`.

**KPI khiếu nại:**

| Thẻ | Điều kiện | Badge màu |
|-----|-----------|-----------|
| Mới mở | `complaint.status = 'open'` | Đỏ |
| Đang xem xét | `complaint.status = 'investigating'` | Cam |
| Đã giải quyết | `complaint.status = 'resolved'` | Xanh |
| Đã từ chối | `complaint.status = 'rejected'` | Xám |

Badge số khiếu nại `open` hiển thị trên tab.

#### FR-01.5 Tab Nhật ký Can thiệp (tổng hợp)

Gom tất cả `adminLog[]` từ mọi đơn hàng, hiển thị bảng tổng hợp sắp xếp giảm dần theo ID log.

| Cột | Nội dung |
|-----|---------|
| Mã đơn | Link button → mở chi tiết đơn |
| Người mua | Tên người mua |
| Hành động | Nội dung can thiệp |
| Ghi chú | Chi tiết bổ sung |
| Ngày | DD/MM/YYYY |
| Admin | Tên người thực hiện |

---

### 2.2 FR-02: Chi tiết Đơn hàng

**Mô tả:** Màn hình chi tiết đầy đủ của một đơn hàng.

#### FR-02.1 Header thông tin đơn

- Mã đơn (font lớn, đậm), ngày đặt, phương thức thanh toán, badge trạng thái hiện tại

#### FR-02.2 Grid thông tin 3 cột

| Cột | Nội dung |
|-----|---------|
| Người mua | Tên, email, số điện thoại |
| Seller | Tên shop |
| Địa chỉ giao | Địa chỉ đầy đủ |

#### FR-02.3 Bảng sản phẩm

Danh sách `items[]` gồm: tên sản phẩm, số lượng, đơn giá, thành tiền.

**Phần tổng tiền:**
- Tạm tính (`subtotal`)
- Phí vận chuyển (`shippingFee`)
- Giảm giá (`discount`) — chỉ hiển thị nếu > 0
- **Tổng cộng** (`total`) — font lớn, đậm, màu đỏ thương hiệu

#### FR-02.4 Lịch sử trạng thái (Timeline)

Hiển thị dạng timeline dọc từ trạng thái đầu đến trạng thái hiện tại. Mỗi mốc gồm:
- Dot indicator (màu theo trạng thái)
- Tên trạng thái
- Ngày + ghi chú + người cập nhật (ẩn nếu là `system`)

---

### 2.3 FR-03: Xử lý Khiếu nại

#### FR-03.1 Trạng thái khiếu nại

| Trạng thái | Nghĩa |
|-----------|-------|
| `open` | Mới gửi, chưa xử lý |
| `investigating` | Admin đang xem xét |
| `resolved` | Đã giải quyết xong |
| `rejected` | Từ chối khiếu nại |

#### FR-03.2 Block khiếu nại trong chi tiết đơn

Hiển thị: lý do, trạng thái, ngày gửi, ngày xử lý (nếu có), người xử lý, mô tả chi tiết, kết quả giải quyết.

**Nút hành động theo trạng thái:**

| Trạng thái | Nút hiển thị |
|-----------|-------------|
| `open` | [✓ Giải quyết] [🔍 Đang xem xét] [✕ Từ chối] |
| `investigating` | [✓ Giải quyết] [✕ Từ chối] |
| `resolved` / `rejected` | Không hiển thị nút |

#### FR-03.3 Luồng xử lý khiếu nại

**`doOpenComplaint(ordId)`** — Mở khiếu nại thay người mua:
```
Điều kiện: đơn chưa có complaint
→ prompt('Lý do khiếu nại:')   — bắt buộc
→ prompt('Mô tả chi tiết:')    — tùy chọn
→ Tạo complaint: {reason, desc, filedAt, status:'open', resolution:'', resolvedAt:null, resolvedBy:null}
→ Ghi log: 'Mở khiếu nại thay mặt người mua'
→ saveAdminOrders() + toast + renderAccount()
```

**`doInvestigateComplaint(ordId)`**:
```
→ complaint.status = 'investigating'
→ Ghi log + lưu + toast + re-render
```

**`doResolveComplaint(ordId)`**:
```
→ prompt('Kết quả giải quyết:')  — bắt buộc, hủy nếu rỗng
→ complaint.status = 'resolved'
→ complaint.resolution = input
→ complaint.resolvedAt = todayStr()
→ complaint.resolvedBy = 'Admin EduMart'
→ Ghi log: 'Giải quyết khiếu nại'
→ Lưu + toast + re-render
```

**`doRejectComplaint(ordId)`**:
```
→ prompt('Lý do từ chối:')  — bắt buộc, hủy nếu rỗng
→ complaint.status = 'rejected'
→ complaint.resolution = reason (lý do từ chối)
→ Ghi log: 'Từ chối khiếu nại'
→ Lưu + toast + re-render
```

---

### 2.4 FR-04: Xử lý Hoàn tiền

#### FR-04.1 Trạng thái hoàn tiền

| Trạng thái | Nghĩa |
|-----------|-------|
| `requested` | Yêu cầu đã được khởi tạo, chờ duyệt |
| `processing` | Admin đang tiến hành chuyển tiền |
| `completed` | Đã hoàn tiền thành công |
| `rejected` | Từ chối hoàn tiền |

#### FR-04.2 Điều kiện khởi tạo

Nút "↩ Khởi tạo hoàn tiền" chỉ hiển thị khi:
- Đơn **chưa có** `refund` object
- Trạng thái đơn là `delivered`, `completed`, hoặc `shipping`

#### FR-04.3 Luồng xử lý hoàn tiền

**`doInitRefund(ordId)`** — Khởi tạo:
```
→ prompt('Số tiền hoàn (VNĐ):')
→ Validate: amount > 0 AND amount ≤ o.total
    ✗ → toast lỗi 'Số tiền hoàn không thể lớn hơn tổng đơn'
→ prompt('Lý do hoàn tiền:')  — bắt buộc
→ Tạo refund: {amount, reason, status:'requested', requestedAt, processedAt:null, processedBy:null, note:''}
→ Ghi log + lưu + toast + re-render
```

**`doProcessRefund(ordId)`** — Bắt đầu xử lý:
```
Điều kiện: refund.status = 'requested'
→ prompt('Ghi chú xử lý:')  — tùy chọn
→ refund.status = 'processing'
→ refund.processedAt = todayStr(), refund.processedBy = 'Admin EduMart'
→ Ghi log: 'Bắt đầu xử lý hoàn tiền'
→ Lưu + toast + re-render
```

**`doCompleteRefund(ordId)`** — Hoàn tất:
```
Điều kiện: refund.status = 'processing'
→ refund.status = 'completed'
→ order.status  = 'refunded'
→ Thêm statusHistory: {status:'refunded', note:'Hoàn tiền thành công: {amount}đ'}
→ Ghi log + lưu + toast + re-render
```

**`doRejectRefund(ordId)`**:
```
→ prompt('Lý do từ chối hoàn tiền:')  — bắt buộc
→ refund.status = 'rejected', refund.note = reason
→ Ghi log + lưu + toast + re-render
```

**Nút hành động theo trạng thái:**

| Trạng thái refund | Nút hiển thị |
|------------------|-------------|
| `requested` | [✓ Xử lý hoàn tiền] [✕ Từ chối hoàn] |
| `processing` | [✓ Xác nhận đã hoàn tiền] |
| `completed` / `rejected` | Không hiển thị nút |

---

### 2.5 FR-05: Can thiệp Thủ công

**Mô tả:** Panel cho phép Admin cập nhật trạng thái đơn hoặc thêm ghi chú bất kỳ lúc nào trong chi tiết đơn. Mọi thao tác ghi vào `adminLog`.

#### FR-05.1 Cập nhật trạng thái (`doUpdateOrderStatus`)

```
→ Chọn trạng thái từ dropdown (toàn bộ 8 trạng thái)
→ Nhập lý do can thiệp (bắt buộc, hủy nếu rỗng)
→ Cập nhật o.status
→ Đẩy vào o.statusHistory: {status, date:todayStr(), note, by:'Admin EduMart'}
→ Đẩy vào o.adminLog: {action:'Cập nhật trạng thái → {tên}', note, date, by}
→ saveAdminOrders() + toast + re-render
```

#### FR-05.2 Ghi chú nhật ký (`doAddOrderNote`)

```
→ Nhập nội dung ghi chú (bắt buộc, hủy nếu rỗng)
→ Đẩy vào o.adminLog: {action:'Ghi chú admin', note, date, by}
→ saveAdminOrders() + toast + re-render
```

---

### 2.6 FR-06: Nhật ký Can thiệp (`adminLog`)

**Cấu trúc mỗi log entry:**
```javascript
{
  id: string,      // 'log-' + Date.now().toString(36)
  action: string,  // Tên hành động
  note: string,    // Ghi chú chi tiết
  date: string,    // 'DD/MM/YYYY'
  by: string       // 'Admin EduMart'
}
```

Log trong chi tiết đơn: hiển thị **đảo ngược** (mới nhất trên đầu).  
Tab "Nhật ký can thiệp": gom log từ mọi đơn hàng, sắp xếp giảm dần.

---

## 3. Mô hình dữ liệu

### 3.1 Order Object (`sysOrders[]`)

```javascript
{
  id: string,             // 'EDU-XXXXX'
  buyerId: string,
  buyerName: string,
  buyerEmail: string,
  buyerPhone: string,
  sellerId: string,
  sellerName: string,
  items: [
    {
      prodId: number,
      prodName: string,
      qty: number,
      unitPrice: number   // VNĐ
    }
  ],
  subtotal: number,       // Tạm tính
  shippingFee: number,    // Phí vận chuyển
  discount: number,       // Giảm giá voucher
  total: number,          // Tổng cộng = subtotal - discount + shippingFee
  paymentMethod: string,  // 'momo' | 'cod' | 'bank' | 'zalopay' | 'vnpay'
  shippingAddr: string,
  orderDate: string,      // 'DD/MM/YYYY'
  status: string,         // Xem bảng trạng thái §4.1
  statusHistory: [
    {
      status: string,
      date: string,       // 'DD/MM/YYYY'
      note: string,
      by: string          // 'system' | 'seller' | 'buyer' | 'Admin EduMart'
    }
  ],
  complaint: ComplaintObject | null,
  refund: RefundObject | null,
  adminLog: LogEntry[]
}
```

### 3.2 ComplaintObject

```javascript
{
  reason: string,       // Lý do tóm tắt
  desc: string,         // Mô tả chi tiết
  filedAt: string,      // 'DD/MM/YYYY'
  status: string,       // 'open' | 'investigating' | 'resolved' | 'rejected'
  resolution: string,   // Kết quả xử lý hoặc lý do từ chối
  resolvedAt: string | null,
  resolvedBy: string | null
}
```

### 3.3 RefundObject

```javascript
{
  amount: number,
  reason: string,
  status: string,       // 'requested' | 'processing' | 'completed' | 'rejected'
  requestedAt: string,  // 'DD/MM/YYYY'
  processedAt: string | null,
  processedBy: string | null,
  note: string          // Ghi chú xử lý hoặc lý do từ chối
}
```

### 3.4 LogEntry

```javascript
{
  id: string,           // 'log-' + timestamp base36
  action: string,
  note: string,
  date: string,         // 'DD/MM/YYYY'
  by: string            // 'Admin EduMart'
}
```

### 3.5 Lưu trữ

| localStorage Key | Kiểu | Ghi chú |
|-----------------|------|---------|
| `sysOrders` | `Order[]` | Toàn bộ đơn, bao gồm statusHistory, complaint, refund, adminLog |

---

## 4. Bảng trạng thái và Chuyển trạng thái

### 4.1 Trạng thái Đơn hàng

| Giá trị | Tên hiển thị | Badge màu |
|---------|-------------|-----------|
| `pending` | Chờ xác nhận | Cam |
| `confirmed` | Đã xác nhận | Xanh dương |
| `processing` | Đang xử lý | Xanh dương nhạt |
| `shipping` | Đang giao | Tím nhạt |
| `delivered` | Đã giao | Xanh teal |
| `completed` | Hoàn thành | Xanh lá |
| `cancelled` | Đã hủy | Đỏ nhạt |
| `refunded` | Đã hoàn tiền | Xám |

**Luồng bình thường (system / seller):**
```
pending → confirmed → processing → shipping → delivered → completed
```

**Can thiệp Admin:**
```
Bất kỳ trạng thái nào → Bất kỳ trạng thái nào (Admin toàn quyền)
delivered / completed / shipping → refunded (qua luồng hoàn tiền)
```

### 4.2 Ma trận trạng thái Khiếu nại

```
open ──→ investigating ──→ resolved
  │                   └──→ rejected
  └──────────────────────→ resolved
  └──────────────────────→ rejected
```

### 4.3 Ma trận trạng thái Hoàn tiền

```
requested ──→ processing ──→ completed
     └──────────────────────→ rejected
```

---

## 5. Luồng hoạt động

### 5.1 Luồng xử lý Khiếu nại

```
Người mua liên hệ Admin (ngoài hệ thống: hotline / email)
    ↓
Admin thấy đơn có badge ⚑ trong danh sách hoặc vào tab "Khiếu nại"
    → Mở chi tiết đơn → Xem block Khiếu nại
    ↓
Admin chọn hành động:

  [🔍 Đang xem xét]
    → complaint.status = 'investigating'
    → Liên hệ seller để xác minh
    ↓
  [✓ Giải quyết]
    → Nhập kết quả → complaint.status = 'resolved'
    → Thông báo người mua (ngoài hệ thống)
    ↓
  [✕ Từ chối]
    → Nhập lý do → complaint.status = 'rejected'
    → Thông báo người mua (ngoài hệ thống)

Mọi bước đều ghi vào adminLog
```

### 5.2 Luồng xử lý Hoàn tiền

```
Phát hiện cần hoàn tiền (qua khiếu nại hoặc Admin chủ động)
    → Vào Chi tiết đơn → Nhấn "↩ Khởi tạo hoàn tiền"
    → Nhập số tiền + lý do
    ↓
refund.status = 'requested'
    → Admin nhấn "✓ Xử lý hoàn tiền"
    → (Thực hiện chuyển khoản thủ công qua ngân hàng)
    ↓
refund.status = 'processing'
    → Admin nhấn "✓ Xác nhận đã hoàn tiền"
    ↓
refund.status = 'completed'
order.status  = 'refunded'
```

---

## 6. Giao diện người dùng (UI Mockups)

### 6.1 Danh sách Đơn hàng

```
┌─────────────────────────────────────────────────────────────────────┐
│  Quản lý Đơn hàng                                                   │
│  [Tất cả đơn hàng (3)] [Khiếu nại (2)] [Nhật ký can thiệp]         │
│                                                                     │
│  ┌──────┐  ┌───────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  25  │  │     3     │  │    5     │  │    14    │  │    3     │  │
│  │ Tổng │  │ Chờ xác   │  │  Đang   │  │ Hoàn     │  │ Hủy/Hoàn│  │
│  │      │  │ nhận      │  │  giao   │  │ thành    │  │          │  │
│  └──────┘  └───────────┘  └──────────┘  └──────────┘  └──────────┘  │
│                                                                     │
│  [🔍 Tìm mã đơn, người mua, seller...]  [Trạng thái▾] [Seller▾]  │
│                                                         [Xóa lọc] │
│                                                                     │
│  Mã đơn     │ Người mua         │ Seller      │SP│ Tổng   │Trạng thái │
│  ──────────────────────────────────────────────────────────────────  │
│  #EDU-28471 │ Nguyễn Văn An    │ NXB GD VN  │ 2│307.000 │Đã giao ⚑ │
│  #EDU-28468 │ Trần Thị Bình    │ Fahasa      │ 2│287.000 │Hoàn thành │
│  #EDU-28461 │ Lê Hồng Phúc     │ Alphabooks  │ 3│400.000 │Đang giao  │
│                                         [← Trước] [Trang 1/4] [Tiếp→]│
└─────────────────────────────────────────────────────────────────────┘
```

### 6.2 Chi tiết Đơn hàng

```
┌─────────────────────────────────────────────────────────────────────┐
│  ← Danh sách đơn hàng                                               │
├─────────────────────────────────────────────────────────────────────┤
│  #EDU-28471          10/06/2025 · Ví MoMo          [Đã giao]       │
│                                                                     │
│  NGƯỜI MUA              SELLER               ĐỊA CHỈ GIAO          │
│  Nguyễn Văn An         NXB Giáo dục VN      45 Nguyễn Trãi,       │
│  nva001@gmail.com                            Thanh Xuân, HN         │
│  0912 345 111                                                       │
│  ─────────────────────────────────────────────────────────────────  │
│  📦 Sản phẩm                                                        │
│  Bộ SGK lớp 6 - Kết nối tri thức   ×1   187.000đ     187.000đ     │
│  Luyện thi THPT QG môn Toán         ×1    95.000đ      95.000đ     │
│                                            Tạm tính:   282.000đ    │
│                                            Ship:         25.000đ    │
│                                            Tổng:        307.000đ    │
│  ─────────────────────────────────────────────────────────────────  │
│  📋 Lịch sử trạng thái                                              │
│    ● Chờ xác nhận    10/6 · Đặt hàng thành công                   │
│    ● Đã xác nhận     10/6 · Seller xác nhận đơn                   │
│    ● Đang xử lý      11/6 · Đang chuẩn bị hàng                    │
│    ● Đang giao       11/6 · Đã bàn giao GHTK                      │
│    ● Đã giao         13/6 · Giao hàng thành công                  │
│  ─────────────────────────────────────────────────────────────────  │
│  📩 KHIẾU NẠI                    │  💰 HOÀN TIỀN                  │
│  Lý do: Sách cũ, không phải 2025 │  Không có yêu cầu hoàn tiền.   │
│  Trạng thái: 🔴 Mới mở           │  [↩ Khởi tạo hoàn tiền]       │
│  Ngày: 14/06/2025                 │                                │
│  Mô tả: Đặt bộ SGK lớp 6 nhưng  │                                │
│  nhận được sách năm 2024...       │                                │
│  [✓ Giải quyết][🔍 Xem xét][✕]  │                                │
│  ─────────────────────────────────────────────────────────────────  │
│  ⚙ CAN THIỆP THỦ CÔNG                                              │
│  [Chọn trạng thái ▾] [Lý do can thiệp (bắt buộc)...] [Cập nhật]  │
│  [Ghi chú vào nhật ký...]                             [Ghi chú]   │
│  ─────────────────────────────────────────────────────────────────  │
│  📋 NHẬT KÝ CAN THIỆP                                               │
│  Ngày      │ Hành động                  │ Ghi chú      │ Admin     │
│  13/6/2025 │ Cập nhật TT → Đã giao    │ GHTK xác nhận│ Admin EduMart│
└─────────────────────────────────────────────────────────────────────┘
```

### 6.3 Tab Khiếu nại

```
┌─────────────────────────────────────────────────────────────────────┐
│  [Tất cả đơn hàng] [Khiếu nại (2) ●] [Nhật ký can thiệp]          │
│                                                                     │
│  ┌───────┐  ┌───────────┐  ┌────────────┐  ┌────────────┐          │
│  │   2   │  │     1     │  │     0      │  │     1      │          │
│  │Mới mở │  │ Đang xem  │  │ Đã giải   │  │ Đã từ chối │          │
│  │       │  │ xét       │  │ quyết     │  │            │          │
│  └───────┘  └───────────┘  └────────────┘  └────────────┘          │
│                                                                     │
│  Mã đơn     │ Người mua         │ Lý do khiếu nại  │ Trạng thái   │
│  ──────────────────────────────────────────────────────────────── │
│  #EDU-28471 │ Nguyễn Văn An    │ Sách cũ, sai năm  │ 🔴 Mới mở   │
│  #EDU-28444 │ Hoàng Thị Mai    │ Thiếu sách trong  │ 🟡 Đang xem  │
│             │                   │ combo             │              │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 7. Yêu cầu phi chức năng

### 7.1 Hiệu suất

| Yêu cầu | Mức độ |
|---------|--------|
| Lọc đơn hàng | Tức thì (filter trên mảng JS — không gọi API) |
| Re-render sau can thiệp | < 300ms |
| Mở chi tiết đơn | < 200ms |

### 7.2 Bảo mật và Toàn vẹn dữ liệu

| Quy tắc | Áp dụng |
|---------|---------|
| Escape HTML | `escHtml()` cho mọi tên, email, địa chỉ, ghi chú trước khi render |
| Bắt buộc lý do | Mọi hành động can thiệp đều cần nhập lý do — không để trống |
| Validate số tiền hoàn | `amount > 0` AND `amount ≤ order.total` — toast lỗi nếu sai |
| Ghi log toàn bộ | Mọi can thiệp của Admin đều append vào `adminLog` với timestamp và tên Admin |

### 7.3 Khả năng sử dụng (UX)

| Yêu cầu | Chi tiết |
|---------|---------|
| Badge số chờ xử lý | Tab "Tất cả đơn" và "Khiếu nại" hiển thị số cần xử lý ngay trên tab |
| Flag trực quan | Đơn có khiếu nại (⚑ đỏ) và hoàn tiền (↩) trong bảng danh sách |
| Click vào dòng | Toàn bộ dòng đơn hàng là vùng click — không cần nhấn đúng nút |
| Log đảo ngược | `adminLog` hiển thị mới nhất đầu tiên trong chi tiết đơn |
| Trạng thái rỗng | "Không có đơn nào" khi danh sách rỗng sau lọc, không để bảng trắng |
| Cuộn ngang | Bảng đơn hàng cuộn ngang (`overflow-x:auto`) trên màn hình < 768px |

---

## 8. Tiêu chí chấp nhận

### 8.1 Danh sách & Tìm kiếm

| # | Tiêu chí |
|---|---------|
| AC-01 | 5 KPI card đếm đúng số đơn theo từng nhóm trạng thái |
| AC-02 | Badge số `pending` hiển thị trên tab "Tất cả đơn hàng" |
| AC-03 | Tìm kiếm theo mã đơn, tên, email, tên seller hoạt động đúng (OR logic) |
| AC-04 | Lọc trạng thái và lọc seller kết hợp theo AND logic |
| AC-05 | Nút "Xóa lọc" chỉ hiển thị khi đang áp dụng ít nhất một bộ lọc |
| AC-06 | Click vào dòng bất kỳ trong bảng mở chi tiết đơn đó |
| AC-07 | Flag ⚑ hiển thị với đơn có khiếu nại, flag ↩ với đơn có hoàn tiền |
| AC-08 | Tab "Khiếu nại" chỉ liệt kê đơn có `complaint != null` |
| AC-09 | Khiếu nại sắp xếp: open → investigating → resolved → rejected |
| AC-10 | Tab "Nhật ký can thiệp" gom log từ mọi đơn, mới nhất trên đầu |

### 8.2 Chi tiết Đơn hàng & Can thiệp

| # | Tiêu chí |
|---|---------|
| AC-11 | Chi tiết đơn hiển thị đúng thông tin người mua, seller, địa chỉ giao |
| AC-12 | Bảng sản phẩm tính đúng thành tiền từng dòng và tổng cộng |
| AC-13 | Timeline trạng thái hiển thị đúng thứ tự và nội dung từng mốc |
| AC-14 | Nút can thiệp khiếu nại hiển thị đúng theo trạng thái hiện tại |
| AC-15 | Giải quyết khiếu nại yêu cầu nhập kết quả — không lưu nếu rỗng |
| AC-16 | Nút "↩ Khởi tạo hoàn tiền" chỉ hiển thị khi đơn đủ điều kiện |
| AC-17 | Validate: số tiền hoàn > 0 và không vượt quá tổng đơn |
| AC-18 | Xác nhận hoàn tiền thay đổi `order.status = 'refunded'` |
| AC-19 | Cập nhật trạng thái thủ công bắt buộc nhập lý do |
| AC-20 | Mọi can thiệp đều ghi vào `adminLog` với ngày và tên Admin |

---

## 9. Rủi ro và Giải pháp

| # | Rủi ro | Mức độ | Giải pháp |
|---|--------|--------|-----------|
| R-01 | Admin cập nhật sai trạng thái đơn → không hoàn tác được | Cao | Bắt buộc nhập lý do; log mọi thay đổi; P2: nút Hoàn tác hành động cuối |
| R-02 | Số tiền hoàn lớn hơn tổng đơn → âm số dư | Trung bình | Validate `amount ≤ order.total` trước khi khởi tạo; toast lỗi rõ ràng |
| R-03 | Mất dữ liệu adminLog khi localStorage bị xóa | Thấp | Giới hạn của demo; production cần server-side persistence với backup |
| R-04 | Admin giải quyết khiếu nại mà không liên hệ seller trước | Trung bình | UI gợi ý quy trình 2 bước (đang xem xét → giải quyết); P2: ghi chú bắt buộc |

---

## 10. Lộ trình phát triển

### P1 — Đã triển khai (phiên bản hiện tại)

- [x] Danh sách đơn hàng với 5 KPI, lọc 3 chiều (text + trạng thái + seller), phân trang 8/trang
- [x] Chi tiết đơn: thông tin đầy đủ, timeline trạng thái, bảng sản phẩm + tổng tiền
- [x] Xử lý khiếu nại: open / investigate / resolve / reject
- [x] Hoàn tiền: khởi tạo / xử lý / hoàn tất / từ chối
- [x] Can thiệp thủ công: cập nhật trạng thái + ghi chú có log
- [x] Nhật ký can thiệp: hiển thị trong chi tiết đơn + tab tổng hợp toàn hệ thống

### P2 — Phát triển tiếp theo

- [ ] Hoàn tác hành động can thiệp cuối cùng (undo last intervention)
- [ ] Bộ lọc theo khoảng ngày đặt đơn (date range picker)
- [ ] Phân quyền can thiệp: read-only Admin không thấy nút hành động
- [ ] Thông báo tự động cho người mua khi Admin giải quyết khiếu nại / hoàn tiền

### P3 — Tính năng nâng cao

- [ ] SLA tracking: cảnh báo đơn `pending` quá X giờ chưa xác nhận
- [ ] Phân tích hoàn tiền: tỷ lệ theo seller, danh mục, lý do phổ biến
- [ ] Tích hợp chat nội bộ Admin ↔ Seller để xử lý khiếu nại trực tiếp trong hệ thống

---

*Tài liệu này mô tả phân hệ Quản lý Đơn hàng đã được triển khai trong phiên bản demo của EduMart Admin. Phần Quản lý Tài chính (thanh toán Seller, GMV, hoa hồng) được mô tả riêng trong file `admin-finance-management-requirements.md`.*
