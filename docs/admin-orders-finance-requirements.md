# Tài liệu Phân tích Yêu cầu
## Phân hệ Đơn hàng & Tài chính — EduMart Admin

**Phiên bản:** 1.0  
**Ngày:** 20/06/2026  
**Tác giả:** EduMart Product Team  
**Trạng thái:** Đã triển khai

---

## 1. Tổng quan

### 1.1 Mục đích

Phân hệ Đơn hàng & Tài chính cung cấp cho quản trị viên EduMart bộ công cụ giám sát toàn bộ vòng đời giao dịch trên nền tảng — từ khi đặt hàng đến khi hoàn tất thanh toán cho seller. Phân hệ được chia làm hai mảng độc lập nhưng liên kết chặt chẽ:

**Quản lý đơn hàng** đảm nhận vai trò quan sát và can thiệp khi cần — xem trạng thái mọi đơn, xử lý khiếu nại từ người mua, phê duyệt hoàn tiền, và can thiệp thủ công vào bất kỳ bước nào trong quy trình giao hàng.

**Quản lý tài chính** nắm bắt sức khỏe kinh doanh của nền tảng — theo dõi GMV và hoa hồng theo tháng, phân tích tỷ trọng theo danh mục, và điều phối toàn bộ luồng thanh toán cho seller: từ khi nhận yêu cầu rút tiền đến khi xác nhận chuyển khoản thành công.

Mục tiêu nghiệp vụ chính:
- Đảm bảo mọi đơn hàng đều được xử lý trong thời hạn cam kết với người mua
- Giải quyết khiếu nại và hoàn tiền minh bạch, có truy vết đầy đủ
- Thanh toán đúng hạn và đúng số tiền cho seller
- Cung cấp dữ liệu tài chính đủ tin cậy để ra quyết định vận hành

### 1.2 Phạm vi

| Nhóm | Tính năng |
|------|-----------|
| **Danh sách đơn hàng** | Xem toàn bộ đơn, lọc theo trạng thái / seller / tìm kiếm, phân trang |
| **Chi tiết đơn hàng** | Xem thông tin người mua, seller, sản phẩm, lịch sử trạng thái |
| **Khiếu nại** | Xem danh sách khiếu nại, phân loại trạng thái, xử lý từng trường hợp |
| **Hoàn tiền** | Khởi tạo, duyệt, từ chối, hoàn tất yêu cầu hoàn tiền |
| **Can thiệp thủ công** | Cập nhật trạng thái đơn, ghi chú vào nhật ký, toàn bộ có log |
| **Tổng quan tài chính** | KPI GMV / hoa hồng, biểu đồ 6 tháng, phân bổ danh mục, top seller |
| **Thanh toán Seller** | Duyệt / từ chối / xác nhận hoàn tất yêu cầu rút tiền |
| **Lịch sử thanh toán** | Danh sách giao dịch đã thanh toán, tìm kiếm, xuất báo cáo |

### 1.3 Người dùng hệ thống (Actors)

| Actor | Quyền truy cập |
|-------|----------------|
| **Super Admin** | Toàn bộ: xem, can thiệp đơn hàng, duyệt rút tiền, xuất báo cáo |
| **Content Admin** | Không truy cập phân hệ này |
| **Read-only Admin** | Chỉ xem danh sách đơn và tổng quan tài chính — không thực hiện hành động |

### 1.4 Điều kiện tiên quyết

- Người dùng đã đăng nhập với `role='admin'`
- Dữ liệu đơn hàng khởi tạo trong `sysOrders[]`
- Dữ liệu rút tiền trong `finWithdrawals[]`, lịch sử thanh toán trong `finPayments[]`
- Hàm `escHtml()`, `toast()`, `todayStr()`, `fmt()`, `fmtBig()` đã có sẵn

---

## 2. Yêu cầu chức năng — Quản lý Đơn hàng

### 2.1 FR-01: Danh sách & Tìm kiếm Đơn hàng

#### FR-01.1 KPI tổng quan

**Mô tả:** 5 thẻ KPI hiển thị đầu trang, tính từ toàn bộ `sysOrders[]`.

| Thẻ | Điều kiện tính | Màu |
|-----|---------------|-----|
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
| Người mua | Tên (đậm) + email (nhỏ) |
| Seller | Tên shop |
| SP | Số lượng `items.length` |
| Tổng tiền | Định dạng VNĐ |
| Ngày đặt | DD/MM/YYYY |
| Trạng thái | Badge màu + cờ khiếu nại (⚑) / cờ hoàn tiền (↩) nếu có |
| Hành động | Nút "Chi tiết" |

**Click vào dòng** hoặc nút "Chi tiết" → chuyển sang view chi tiết (`admOrdersView='detail'`).

**Phân trang:** 8 đơn/trang. Badge số đơn `pending` hiển thị trên tab "Tất cả đơn hàng".

#### FR-01.4 Tab Khiếu nại (danh sách)

Lọc `sysOrders` lấy những đơn có `complaint != null`, sắp xếp ưu tiên `open → investigating → resolved → rejected`.

**KPI khiếu nại:**

| Thẻ | Điều kiện | Màu |
|-----|-----------|-----|
| Mới mở | `complaint.status = 'open'` | Đỏ |
| Đang xem xét | `complaint.status = 'investigating'` | Cam |
| Đã giải quyết | `complaint.status = 'resolved'` | Xanh |
| Đã từ chối | `complaint.status = 'rejected'` | Xám |

Badge số khiếu nại `open` hiển thị trên tab.

#### FR-01.5 Tab Nhật ký Can thiệp

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

**Mô tả:** Màn hình chi tiết đầy đủ của một đơn hàng, bao gồm:

#### FR-02.1 Header thông tin đơn

- Mã đơn, ngày đặt, phương thức thanh toán, badge trạng thái hiện tại

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
- **Tổng cộng** (`total`) — font lớn, đậm

#### FR-02.4 Lịch sử trạng thái (Timeline)

Hiển thị dạng timeline dọc từ trạng thái đầu đến trạng thái hiện tại. Mỗi mốc gồm:
- Dot indicator
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

#### FR-03.2 Xem khiếu nại trong chi tiết đơn

Block khiếu nại hiển thị: lý do, trạng thái, ngày gửi, ngày xử lý (nếu có), người xử lý, mô tả chi tiết, kết quả giải quyết.

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
→ prompt('Lý do khiếu nại:')  — bắt buộc
→ prompt('Mô tả chi tiết:')   — tùy chọn
→ Tạo complaint object: {reason, desc, filedAt, status:'open', resolution:'', resolvedAt:null, resolvedBy:null}
→ Ghi log: 'Mở khiếu nại thay mặt người mua'
→ saveAdminOrders() + toast + renderAccount()
```

**`doInvestigateComplaint(ordId)`**:
```
→ complaint.status = 'investigating'
→ Ghi log
→ Lưu + toast + re-render
```

**`doResolveComplaint(ordId)`**:
```
→ prompt('Kết quả giải quyết:')  — bắt buộc
→ complaint.status = 'resolved'
→ complaint.resolution = input
→ complaint.resolvedAt = todayStr()
→ complaint.resolvedBy = 'Admin EduMart'
→ Ghi log: 'Giải quyết khiếu nại'
→ Lưu + toast + re-render
```

**`doRejectComplaint(ordId)`**:
```
→ prompt('Lý do từ chối:')  — bắt buộc
→ complaint.status = 'rejected'
→ complaint.resolution = reason (lưu lý do từ chối vào trường resolution)
→ Ghi log: 'Từ chối khiếu nại'
→ Lưu + toast + re-render
```

---

### 2.4 FR-04: Xử lý Hoàn tiền

#### FR-04.1 Trạng thái hoàn tiền

| Trạng thái | Nghĩa |
|-----------|-------|
| `requested` | Yêu cầu hoàn tiền đã được khởi tạo |
| `processing` | Admin đang xử lý chuyển tiền |
| `completed` | Đã hoàn tiền thành công |
| `rejected` | Từ chối hoàn tiền |

#### FR-04.2 Điều kiện khởi tạo hoàn tiền

Nút "↩ Khởi tạo hoàn tiền" chỉ hiển thị khi đơn chưa có `refund` **và** trạng thái đơn là `delivered`, `completed`, hoặc `shipping`.

#### FR-04.3 Luồng xử lý hoàn tiền

**`doInitRefund(ordId)`** — Khởi tạo:
```
→ prompt('Số tiền hoàn (VNĐ):')
→ Validate: amount > 0 và amount ≤ o.total
    ✗ → toast lỗi "Số tiền hoàn không thể lớn hơn tổng đơn"
→ prompt('Lý do hoàn tiền:')  — bắt buộc
→ Tạo refund: {amount, reason, status:'requested', requestedAt, processedAt:null, processedBy:null, note:''}
→ Ghi log
→ Lưu + toast + re-render
```

**`doProcessRefund(ordId)`** — Bắt đầu xử lý:
```
Điều kiện: refund.status = 'requested'
→ prompt('Ghi chú xử lý:')  — tùy chọn
→ refund.status = 'processing'
→ refund.processedAt = todayStr(), refund.processedBy = 'Admin EduMart'
→ Ghi log: 'Bắt đầu xử lý hoàn tiền'
```

**`doCompleteRefund(ordId)`** — Hoàn tất:
```
Điều kiện: refund.status = 'processing'
→ refund.status = 'completed'
→ order.status = 'refunded'
→ Thêm statusHistory: {status:'refunded', note:'Hoàn tiền thành công: {amount}'}
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

**Mô tả:** Panel cho phép Admin cập nhật trạng thái đơn hoặc thêm ghi chú bất kỳ lúc nào, mọi thao tác đều được ghi vào `adminLog`.

#### FR-05.1 Cập nhật trạng thái thủ công (`doUpdateOrderStatus`)

```
→ Chọn trạng thái từ dropdown (toàn bộ 8 trạng thái)
→ Nhập lý do can thiệp (bắt buộc)
    Rỗng → toast 'Nhập lý do can thiệp'
→ Cập nhật o.status
→ Đẩy vào o.statusHistory: {status, date:todayStr(), note, by:'Admin EduMart'}
→ Đẩy vào o.adminLog: {action:'Cập nhật trạng thái → {tên trạng thái}', note, ...}
→ saveAdminOrders() + toast + re-render
```

#### FR-05.2 Ghi chú vào nhật ký (`doAddOrderNote`)

```
→ Nhập nội dung ghi chú (bắt buộc)
    Rỗng → toast 'Nhập nội dung ghi chú'
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

Log hiển thị **đảo ngược** (mới nhất trên đầu) trong chi tiết đơn. Tab "Nhật ký can thiệp" gom log từ mọi đơn hàng.

---

## 3. Yêu cầu chức năng — Quản lý Tài chính

### 3.1 FR-07: Tổng quan Tài chính

#### FR-07.1 KPI tổng quan

| Thẻ KPI | Công thức |
|---------|-----------|
| Tổng GMV (6 tháng) | `SUM(FIN_GMV)` — triệu đồng |
| Tổng hoa hồng | `SUM(FIN_COMM)` |
| Tăng trưởng tháng gần nhất | `(GMV[5] - GMV[4]) / GMV[4] × 100%` — với arrow và màu |
| Đã thanh toán Seller | `SUM(finPayments[].amount)` |
| Đang chờ duyệt rút tiền | `SUM(finWithdrawals[status='pending'].amount)` |

#### FR-07.2 Biểu đồ doanh thu theo tháng

**Loại:** Bar chart thuần CSS, 2 cột song song cho mỗi tháng.

| Series | Dữ liệu | Màu |
|--------|---------|-----|
| GMV | `FIN_GMV[i]` triệu đồng | Đỏ `#c0392b` |
| Hoa hồng | `FIN_COMM[i]` triệu đồng | Xanh lá `#27ae60` |

**Chiều cao bar:** Tỷ lệ với `maxGMV` và `maxComm` tương ứng (max = 110px), có tooltip hover.

**6 tháng hiển thị:** T1/25 → T6/25.

#### FR-07.3 Phân bổ doanh thu theo danh mục

Mỗi danh mục hiển thị thanh ngang với:
- Tên danh mục
- Thanh progress (màu riêng)
- Tỷ lệ % GMV
- Tỷ lệ % hoa hồng áp dụng và giá trị hoa hồng (triệu đồng)

**Danh mục tĩnh:**

| Danh mục | % GMV | Tỷ lệ HH | Màu |
|---------|-------|----------|-----|
| Sách giáo khoa | 38% | 8% | Đỏ |
| Văn phòng phẩm | 22% | 10% | Cam |
| Thiết bị GD | 15% | 12% | Xanh |
| Sách tham khảo | 14% | 8% | Tím |
| Ebook & Audio | 11% | 15% | Hồng |

#### FR-07.4 Top 5 Seller doanh thu

Bảng xếp hạng với 4 cột: Thứ hạng, Seller, GMV 6 tháng, Hoa hồng 6 tháng.

---

### 3.2 FR-08: Quản lý Yêu cầu Rút tiền Seller

#### FR-08.1 Sub-tab theo trạng thái

| Sub-tab | Trạng thái | Badge số |
|---------|-----------|---------|
| Chờ duyệt | `pending` | Có — hiển thị cả trên tab "Thanh toán Seller" chính |
| Đang xử lý | `processing` | Có |
| Đã thanh toán | `paid` | Không |
| Từ chối | `rejected` | Không |

#### FR-08.2 Card yêu cầu rút tiền

Mỗi yêu cầu hiển thị dạng card:

| Thông tin | Nội dung |
|-----------|---------|
| Mã yêu cầu | ID (`WD-xxx`) |
| Badge trạng thái | Màu theo trạng thái |
| Tên seller | Đậm |
| Tài khoản ngân hàng | Ngân hàng – Số TK – Tên chủ TK |
| Số tiền yêu cầu | Định dạng VNĐ lớn |
| Số dư khả dụng | Để Admin đối chiếu |
| Thời điểm yêu cầu | DD/MM/YYYY |
| Thời điểm xử lý | Chỉ hiển thị khi đã xử lý + tên Admin |
| Lý do từ chối | Chỉ hiển thị khi `rejected` — nền đỏ nhạt |
| Ghi chú processing | Chỉ hiển thị khi `processing` — màu xanh |

#### FR-08.3 Hành động theo sub-tab

**Sub-tab "Chờ duyệt":**
- **`doApproveWithdrawal(id)`:**
  ```
  → prompt('Ghi chú xử lý:')  — tùy chọn
  → w.status = 'processing'
  → w.note = ghi chú hoặc 'Đang tiến hành chuyển khoản.'
  → w.processedAt = todayStr(), w.processedBy = 'Admin EduMart'
  → saveFinWithdrawals() + toast + re-render
  ```
- **`doRejectWithdrawal(id)`:**
  ```
  → prompt('Lý do từ chối:')  — bắt buộc, hủy nếu rỗng
  → w.status = 'rejected', w.rejectedReason = reason
  → Lưu + toast + re-render
  ```

**Sub-tab "Đang xử lý":**
- **`doCompleteWithdrawal(id)`:**
  ```
  → prompt('Mã tham chiếu giao dịch ngân hàng:')  — bắt buộc
      Rỗng → toast 'Cần nhập mã tham chiếu giao dịch'
  → confirm('Xác nhận đã chuyển {amount} cho {seller}? Mã: {ref}')
  → w.status = 'paid'
  → Tạo payment record trong finPayments[]:
      {id:'PAY-'+w.id, sellerId, sellerName, amount,
       period: w.requestedAt + ' – ' + todayStr(),
       paidAt:todayStr(), bank:w.bank, ref, by:'Admin EduMart'}
  → saveFinWithdrawals() + saveFinPayments() + toast + re-render
  ```

**Tìm kiếm:** Lọc theo tên seller hoặc mã yêu cầu (case-insensitive substring).

---

### 3.3 FR-09: Lịch sử Thanh toán

#### FR-09.1 Bảng lịch sử

| Cột | Nội dung |
|-----|---------|
| Mã giao dịch | Font monospace |
| Seller | Tên shop |
| Số tiền | VNĐ định dạng lớn, màu đỏ |
| Kỳ thanh toán | `startDate – endDate` |
| Ngày thanh toán | DD/MM/YYYY |
| Mã tham chiếu | Mã giao dịch ngân hàng, font monospace, màu xanh |

**Phân trang:** 10 bản ghi/trang.

**Tìm kiếm:** Theo tên seller, mã giao dịch, mã tham chiếu.

**Tổng đã thanh toán:** Hiển thị `SUM(finPayments[].amount)` ở góc trên phải.

#### FR-09.2 Xuất báo cáo (`doExportFinReport`)

Tạo file text (`Blob`) chứa:
- Tổng quan 6 tháng: GMV và hoa hồng theo từng tháng + tổng cộng
- Phân bổ doanh thu theo danh mục
- Lịch sử thanh toán seller (toàn bộ `finPayments[]`)

Kích hoạt download tự động bằng `<a download>` → `URL.createObjectURL(blob)`.

---

## 4. Mô hình dữ liệu

### 4.1 Order Object (`sysOrders[]`)

```javascript
{
  id: string,           // 'EDU-XXXXX'
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
  discount: number,       // Giảm giá
  total: number,          // Tổng cộng
  paymentMethod: string,  // 'momo' | 'cod' | 'bank' | 'zalopay' | 'vnpay'
  shippingAddr: string,
  orderDate: string,      // 'DD/MM/YYYY'
  status: string,         // Xem bảng trạng thái
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

**ComplaintObject:**
```javascript
{
  reason: string,       // Lý do tóm tắt
  desc: string,         // Mô tả chi tiết
  filedAt: string,      // 'DD/MM/YYYY'
  status: string,       // 'open' | 'investigating' | 'resolved' | 'rejected'
  resolution: string,   // Kết quả xử lý / lý do từ chối
  resolvedAt: string | null,
  resolvedBy: string | null
}
```

**RefundObject:**
```javascript
{
  amount: number,
  reason: string,
  status: string,       // 'requested' | 'processing' | 'completed' | 'rejected'
  requestedAt: string,
  processedAt: string | null,
  processedBy: string | null,
  note: string
}
```

**LogEntry:**
```javascript
{
  id: string,           // 'log-' + timestamp base36
  action: string,
  note: string,
  date: string,         // 'DD/MM/YYYY'
  by: string            // 'Admin EduMart'
}
```

### 4.2 Withdrawal Object (`finWithdrawals[]`)

```javascript
{
  id: string,             // 'WD-XXX'
  sellerId: string,
  sellerName: string,
  category: string,       // 'sach' | 'vpp' | 'tbgd'
  amount: number,         // Số tiền yêu cầu (VNĐ)
  availableBalance: number, // Số dư khả dụng tại thời điểm yêu cầu
  bank: string,           // 'Ngân hàng – Số TK – Tên chủ TK'
  requestedAt: string,    // 'DD/MM/YYYY'
  status: string,         // 'pending' | 'processing' | 'paid' | 'rejected'
  note: string,           // Ghi chú của Admin khi xử lý
  processedAt: string | null,
  processedBy: string | null,
  rejectedReason: string  // Lý do từ chối (khi status='rejected')
}
```

### 4.3 Payment Record (`finPayments[]`)

```javascript
{
  id: string,        // 'PAY-WD-XXX' hoặc 'PAY-XXX'
  sellerId: string,
  sellerName: string,
  amount: number,
  period: string,    // 'DD/MM/YYYY – DD/MM/YYYY'
  paidAt: string,    // 'DD/MM/YYYY'
  bank: string,      // Tài khoản ngân hàng nhận
  ref: string,       // Mã tham chiếu giao dịch ngân hàng
  by: string         // 'Admin EduMart'
}
```

### 4.4 Dữ liệu tĩnh Tài chính

```javascript
// Không persist — tính toán tĩnh cho demo
const FIN_MONTHS = ['T1/25','T2/25','T3/25','T4/25','T5/25','T6/25'];
const FIN_GMV    = [480, 520, 610, 555, 590, 627]; // triệu đồng
const FIN_COMM   = [48.1, 52.0, 61.1, 55.7, 59.1, 62.8];
const FIN_CATS   = [
  {name, pct, rate, gmvM, commM, clr}  // 5 danh mục
];
```

---

## 5. Bảng trạng thái và Chuyển trạng thái

### 5.1 Trạng thái đơn hàng

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

**Luồng trạng thái bình thường:**
```
pending → confirmed → processing → shipping → delivered → completed
```

**Luồng can thiệp Admin (thủ công):**
```
Bất kỳ trạng thái nào → Bất kỳ trạng thái nào (Admin có toàn quyền)
delivered / completed / shipping → refunded (qua luồng hoàn tiền)
```

### 5.2 Trạng thái rút tiền Seller

```
pending ──────→ processing ──→ paid
    │                │
    └──── rejected   └──── (không có từ processing → rejected)
```

---

## 6. Luồng hoạt động

### 6.1 Luồng xử lý khiếu nại đơn hàng

```
Người mua gửi khiếu nại (ngoài hệ thống)
    ↓
Admin thấy đơn có badge ⚑ trong danh sách
    → Mở tab "Khiếu nại" hoặc vào Chi tiết đơn
    → Xem lý do + mô tả khiếu nại
    ↓
Admin chọn hành động:
  [🔍 Đang xem xét]
    → complaint.status = 'investigating'
    → Liên hệ seller / điều tra
    ↓
  [✓ Giải quyết]
    → Nhập kết quả → complaint.status = 'resolved'
    ↓
  [✕ Từ chối]
    → Nhập lý do → complaint.status = 'rejected'

Mọi bước đều ghi vào adminLog
```

### 6.2 Luồng xử lý hoàn tiền

```
Admin phát hiện cần hoàn tiền (qua khiếu nại hoặc chủ động)
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

### 6.3 Luồng thanh toán Seller

```
Seller gửi yêu cầu rút tiền (ngoài hệ thống)
    ↓
Admin thấy yêu cầu trong sub-tab "Chờ duyệt"
    → Kiểm tra số dư khả dụng
    → Đối chiếu tài khoản ngân hàng
    ↓
[✓ Duyệt xử lý]
    → finWithdrawals.status = 'processing'
    → (Admin thực hiện chuyển khoản ngân hàng)
    ↓
[✓ Xác nhận đã thanh toán]
    → Nhập mã tham chiếu giao dịch
    → Confirm
    → finWithdrawals.status = 'paid'
    → Tạo record trong finPayments[]
    ↓
Giao dịch xuất hiện trong tab "Lịch sử thanh toán"
```

---

## 7. Giao diện người dùng (UI Mockups)

### 7.1 Danh sách Đơn hàng

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Tất cả đơn hàng (3)] [Khiếu nại (2)] [Nhật ký can thiệp]         │
│ ┌──────┐ ┌───────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│ │  25  │ │     3     │ │    5     │ │    14    │ │    3     │     │
│ │Tổng  │ │ Chờ xác   │ │ Đang    │ │Hoàn thành│ │ Hủy/Hoàn│     │
│ │      │ │ nhận      │ │ giao    │ │          │ │          │     │
│ └──────┘ └───────────┘ └──────────┘ └──────────┘ └──────────┘     │
│                                                                     │
│ [Tìm mã đơn, người mua...] [Tất cả trạng thái ▾] [Tất cả seller▾]│
│                                                                     │
│ Mã đơn    │ Người mua        │ Seller      │SP│ Tổng   │Trạng thái │
│──────────────────────────────────────────────────────────────────   │
│ #EDU-28471│ Nguyễn Văn An   │ NXB GD VN  │2 │307.000 │Đã giao ⚑ │
│ #EDU-28468│ Trần Thị Bình   │ Fahasa     │2 │287.000 │Hoàn thành │
│ #EDU-28461│ Lê Hồng Phúc    │ Alphabooks │3 │400.000 │Đang giao  │
│                                      [← Trước] [1/4] [Tiếp →]     │
└─────────────────────────────────────────────────────────────────────┘
```

### 7.2 Chi tiết Đơn hàng

```
┌─────────────────────────────────────────────────────────────────────┐
│ ← Danh sách đơn hàng                                               │
├─────────────────────────────────────────────────────────────────────┤
│ #EDU-28471              Ngày: 10/06/2025 · MoMo     [Đã giao]     │
│                                                                     │
│ Người mua               Seller             Địa chỉ giao            │
│ Nguyễn Văn An          NXB Giáo dục VN    45 Nguyễn Trãi,         │
│ nva001@gmail.com                           Thanh Xuân, HN          │
│ 0912 345 111                                                        │
│─────────────────────────────────────────────────────────────────── │
│ 📦 Sản phẩm                                                        │
│ Bộ SGK lớp 6 - Kết nối tri thức   x1   187.000đ   187.000đ       │
│ Luyện thi THPT QG môn Toán         x1    95.000đ    95.000đ       │
│                                         Tạm tính:  282.000đ       │
│                                         Ship:        25.000đ       │
│                                         Tổng:       307.000đ       │
│─────────────────────────────────────────────────────────────────── │
│ 📋 Lịch sử       ● Chờ xác nhận   10/6 · Đặt hàng thành công     │
│                  ● Đã xác nhận    10/6 · Seller xác nhận          │
│                  ● Đang giao      11/6 · Đã bàn giao GHTK         │
│                  ● Đã giao        13/6 · Giao hàng thành công     │
│─────────────────────────────────────────────────────────────────── │
│ 📩 Khiếu nại                    │ 💰 Hoàn tiền                   │
│ Lý do: Sách cũ, không phải 2025 │ Không có yêu cầu hoàn tiền.   │
│ Trạng thái: 🔴 Mới mở           │ [↩ Khởi tạo hoàn tiền]        │
│ Ngày: 14/06/2025                │                                 │
│ Mô tả: Đặt bộ SGK lớp 6...     │                                 │
│ [✓ Giải quyết][🔍 Xem xét][✕] │                                 │
│─────────────────────────────────────────────────────────────────── │
│ ⚙ Can thiệp thủ công                                              │
│ [Chọn trạng thái ▾] [Lý do can thiệp...] [Cập nhật trạng thái]  │
│ [Ghi chú vào nhật ký...]                 [Ghi chú]               │
└─────────────────────────────────────────────────────────────────────┘
```

### 7.3 Tổng quan Tài chính

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Tổng quan tài chính] [Thanh toán Seller (3)] [Lịch sử thanh toán]│
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│ │ 3.382M   │ │ 338.8M   │ │  +6.3%  │ │ 91.9M    │ │ 48.5M   │  │
│ │ GMV 6T   │ │ Hoa hồng │ │ Tăng T6 │ │ Đã TT    │ │ Chờ duyệt│  │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
│ ┌──────────────────────────────────┐ ┌───────────────────────────┐  │
│ │ Doanh thu theo tháng (triệu đồng)│ │ Phân bổ theo danh mục    │  │
│ │    ██                            │ │ Sách GK ████████ 38% 8%  │  │
│ │    ██  ██                        │ │ VPP     █████    22% 10% │  │
│ │ ██ ██  ██  ██  ██  ██           │ │ TB GD   ████     15% 12% │  │
│ │ T1 T2  T3  T4  T5  T6           │ │ Sách TK ████     14% 8%  │  │
│ │ ■GMV  ■Hoa hồng                 │ │ Ebook   ███      11% 15% │  │
│ └──────────────────────────────────┘ └───────────────────────────┘  │
│ Top 5 Seller: [NXB GD VN 238M] [Fahasa 138M] [Alphabooks 113M]... │
└─────────────────────────────────────────────────────────────────────┘
```

### 7.4 Thanh toán Seller

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Chờ duyệt (3)] [Đang xử lý (1)] [Đã thanh toán] [Từ chối]        │
│ [Tìm theo tên seller / mã yêu cầu...]                              │
│                                                                     │
│ ┌──────────────────────┐ ┌──────────────────────┐                  │
│ │ WD-001        🟡Chờ  │ │ WD-002        🟡Chờ  │                  │
│ │ NXB Giáo dục VN      │ │ Fahasa Official      │                  │
│ │ Vietcombank – 123... │ │ BIDV – 998...        │                  │
│ │ Số tiền: 25.000.000đ │ │ Số tiền: 18.000.000đ │                  │
│ │ Số dư: 32.000.000đ   │ │ Số dư: 21.500.000đ   │                  │
│ │ YC lúc: 18/06/2025   │ │ YC lúc: 17/06/2025   │                  │
│ │ [✓ Duyệt] [✗ Từ chối]│ │ [✓ Duyệt] [✗ Từ chối]│                 │
│ └──────────────────────┘ └──────────────────────┘                  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 8. Yêu cầu phi chức năng

### 8.1 Hiệu suất

| Yêu cầu | Mức độ |
|---------|--------|
| Lọc đơn hàng | Tức thì (filter trên mảng JS) |
| Re-render sau can thiệp | < 300ms |
| Mở chi tiết đơn | < 200ms |
| Xuất báo cáo | < 1s (tạo Blob text từ dữ liệu trong memory) |

### 8.2 Bảo mật và Toàn vẹn dữ liệu

| Quy tắc | Áp dụng |
|---------|---------|
| Escape HTML | `escHtml()` cho mọi tên, email, địa chỉ, ghi chú trước khi render |
| Confirm trước destructive | Xác nhận thanh toán seller yêu cầu confirm với mã tham chiếu |
| Validate số tiền hoàn | `amount > 0` và `amount ≤ order.total` |
| Bắt buộc lý do | Mọi hành động can thiệp đều cần nhập lý do — không để trống |
| Ghi log toàn bộ | Mọi can thiệp của Admin đều được append vào `adminLog` với timestamp |
| Prevent duplicate payment | Kiểm tra `finPayments.find(p => p.id === 'PAY-'+w.id)` trước khi tạo mới |

### 8.3 Khả năng sử dụng (UX)

| Yêu cầu | Chi tiết |
|---------|---------|
| Badge số chờ xử lý | Tab "Tất cả đơn" và "Khiếu nại" hiển thị số cần xử lý ngay trên tab |
| Flag trực quan | Đơn có khiếu nại (⚑ đỏ) và hoàn tiền (↩) trong danh sách |
| Click vào dòng | Toàn bộ dòng đơn hàng là vùng click — không cần nhấn đúng nút |
| Log đảo ngược | `adminLog` hiển thị mới nhất đầu tiên trong chi tiết đơn |
| Trạng thái rỗng | "Không có yêu cầu nào" khi danh sách rỗng, không để bảng trắng |
| Responsive | Bảng cuộn ngang (`overflow-x:auto`) trên màn hình nhỏ |

### 8.4 Lưu trữ

| Key | Kiểu | Ghi chú |
|-----|------|---------|
| `sysOrders` | Array | Toàn bộ đơn hàng với lịch sử, complaint, refund, adminLog |
| `finWithdrawals` | Array | Yêu cầu rút tiền của seller |
| `finPayments` | Array | Lịch sử giao dịch đã hoàn thành |
| `FIN_*` | const | Dữ liệu tĩnh cho biểu đồ — không persist |

---

## 9. Tiêu chí chấp nhận

### 9.1 Quản lý Đơn hàng

| # | Tiêu chí |
|---|---------|
| AC-01 | 5 KPI card đếm đúng số đơn theo từng nhóm trạng thái |
| AC-02 | Badge số `pending` hiển thị trên tab "Tất cả đơn hàng" |
| AC-03 | Tìm kiếm theo mã đơn, tên, email, seller hoạt động đúng (OR logic) |
| AC-04 | Lọc trạng thái và lọc seller kết hợp theo AND logic |
| AC-05 | Nút "Xóa lọc" chỉ hiển thị khi đang áp dụng ít nhất một bộ lọc |
| AC-06 | Click vào dòng bất kỳ trong bảng mở chi tiết đơn đó |
| AC-07 | Flag ⚑ hiển thị với đơn có khiếu nại, flag ↩ với đơn có hoàn tiền |
| AC-08 | Tab "Khiếu nại" chỉ liệt kê đơn có `complaint != null` |
| AC-09 | Khiếu nại sắp xếp: open → investigating → resolved → rejected |
| AC-10 | Tab "Nhật ký can thiệp" gom log từ mọi đơn, mới nhất trên đầu |

### 9.2 Chi tiết Đơn hàng & Can thiệp

| # | Tiêu chí |
|---|---------|
| AC-11 | Chi tiết đơn hiển thị đúng: thông tin người mua, seller, địa chỉ giao |
| AC-12 | Bảng sản phẩm tính đúng thành tiền từng dòng và tổng cộng |
| AC-13 | Timeline trạng thái hiển thị đúng thứ tự và nội dung |
| AC-14 | Nút can thiệp khiếu nại hiển thị đúng theo trạng thái hiện tại |
| AC-15 | Giải quyết khiếu nại yêu cầu nhập kết quả — không lưu nếu rỗng |
| AC-16 | Mở hoàn tiền chỉ hiển thị khi đơn ở trạng thái đủ điều kiện |
| AC-17 | Validate: số tiền hoàn không vượt quá tổng đơn |
| AC-18 | Xác nhận hoàn tiền thay đổi `order.status = 'refunded'` |
| AC-19 | Cập nhật trạng thái thủ công bắt buộc nhập lý do |
| AC-20 | Mọi can thiệp đều ghi vào `adminLog` với ngày và tên Admin |

### 9.3 Tài chính

| # | Tiêu chí |
|---|---------|
| AC-21 | KPI tài chính tính đúng tổng GMV, hoa hồng, đã thanh toán, chờ duyệt |
| AC-22 | Biểu đồ 6 tháng render đúng 2 series GMV và hoa hồng |
| AC-23 | Badge số `pending` hiển thị trên tab "Thanh toán Seller" |
| AC-24 | Duyệt yêu cầu rút tiền chuyển đúng sang `processing` |
| AC-25 | Từ chối yêu cầu bắt buộc nhập lý do — không lưu nếu rỗng |
| AC-26 | Xác nhận thanh toán bắt buộc nhập mã tham chiếu giao dịch ngân hàng |
| AC-27 | Sau xác nhận thanh toán, bản ghi mới xuất hiện trong `finPayments[]` |
| AC-28 | Không tạo duplicate record trong `finPayments` cho cùng một WD |
| AC-29 | Tìm kiếm lịch sử thanh toán hoạt động theo seller, mã giao dịch, mã tham chiếu |
| AC-30 | Xuất báo cáo tạo file text download được với đủ 3 phần: tổng quan, danh mục, lịch sử |

---

## 10. Rủi ro và Giải pháp

| # | Rủi ro | Mức độ | Giải pháp |
|---|--------|--------|-----------|
| R-01 | Admin cập nhật sai trạng thái đơn → không hoàn tác được | Cao | Bắt buộc nhập lý do; log mọi thay đổi; P2: thêm nút Hoàn tác cho hành động cuối |
| R-02 | Xác nhận thanh toán seller không đúng số tiền / sai tài khoản | Cao | Confirm dialog hiển thị rõ tên seller + số tiền + mã tham chiếu trước khi lưu |
| R-03 | Số tiền hoàn lớn hơn tổng đơn → âm số dư | Trung bình | Validate `amount ≤ order.total` trước khi khởi tạo; toast lỗi rõ ràng |
| R-04 | Dữ liệu GMV / hoa hồng là tĩnh (không tự tổng hợp từ đơn thực) | Thấp | Ghi rõ trong tài liệu đây là demo data; P2: tính toán trực tiếp từ `sysOrders` |
| R-05 | Seller rút tiền vượt số dư khả dụng | Trung bình | Hiển thị `availableBalance` bên cạnh `amount` để Admin đối chiếu; P2: validate tự động |
| R-06 | Mất dữ liệu adminLog khi localStorage bị xóa | Thấp | Giới hạn của demo; production cần server-side persistence với backup |

---

## 11. Lộ trình phát triển

### P1 — Đã triển khai (phiên bản hiện tại)

- [x] Danh sách đơn hàng với KPI, lọc 3 chiều, phân trang
- [x] Chi tiết đơn: timeline, sản phẩm, tổng tiền
- [x] Xử lý khiếu nại: open / investigate / resolve / reject
- [x] Hoàn tiền: khởi tạo / xử lý / hoàn tất / từ chối
- [x] Can thiệp thủ công: cập nhật trạng thái + ghi chú
- [x] Nhật ký can thiệp chi tiết đơn + tab tổng hợp
- [x] Tổng quan tài chính: KPI, bar chart, phân bổ danh mục, top seller
- [x] Duyệt / từ chối / xác nhận yêu cầu rút tiền seller
- [x] Lịch sử thanh toán với tìm kiếm, phân trang, xuất báo cáo text

### P2 — Phát triển tiếp theo

- [ ] Tính toán GMV / hoa hồng trực tiếp từ `sysOrders` thay vì dữ liệu tĩnh
- [ ] Validate tự động: không cho duyệt rút tiền vượt số dư khả dụng
- [ ] Hoàn tác hành động can thiệp cuối cùng (undo last intervention)
- [ ] Bộ lọc ngày đặt đơn (from/to date range)
- [ ] Xuất báo cáo CSV/Excel thay vì text thuần

### P3 — Tính năng nâng cao

- [ ] Dashboard real-time với WebSocket / SSE
- [ ] Tích hợp API ngân hàng để xác nhận chuyển khoản tự động
- [ ] Quy trình duyệt 2 người cho thanh toán lớn (>50M)
- [ ] SLA tracking: cảnh báo đơn `pending` quá X giờ chưa được xác nhận
- [ ] Phân tích hoàn tiền: tỷ lệ hoàn theo seller, danh mục, lý do phổ biến

---

*Tài liệu này mô tả phân hệ Đơn hàng & Tài chính đã được triển khai trong phiên bản demo của EduMart Admin. Dữ liệu GMV và hoa hồng là tĩnh dùng để minh họa biểu đồ — production cần tổng hợp trực tiếp từ giao dịch thực.*
