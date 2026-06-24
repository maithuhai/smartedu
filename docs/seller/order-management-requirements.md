# Yêu cầu chức năng: Quản lý Đơn hàng — Phân hệ Người bán

**Phiên bản:** 1.0  
**Ngày cập nhật:** 24/06/2026  
**Trạng thái:** Đã triển khai  
**Module liên quan:** `seller-orders`, `seller-order-detail`

---

## 1. Tổng quan

### 1.1 Mục đích

Module quản lý đơn hàng cho phép seller đã được duyệt theo dõi và xử lý toàn bộ vòng đời đơn hàng trên nền tảng EduMart: xem danh sách đơn theo trạng thái, xác nhận đơn mới, cập nhật mã vận đơn, ghi nhận giao hàng thành công, hủy đơn kèm lý do, in phiếu giao hàng đơn lẻ hoặc hàng loạt, và xem chi tiết từng đơn với đầy đủ thông tin khách hàng, sản phẩm và lịch sử trạng thái.

### 1.2 Phạm vi

| Thành phần | Mô tả | Trạng thái |
|------------|-------|------------|
| Danh sách đơn hàng (`seller-orders`) | Tìm kiếm, lọc theo 6 tab trạng thái, chọn hàng loạt, thao tác nhanh | Đã triển khai |
| Chi tiết đơn hàng (`seller-order-detail`) | Timeline trạng thái, mã vận đơn, thông tin khách, bảng sản phẩm | Đã triển khai |
| Xác nhận đơn | Chuyển trạng thái `pending → processing` | Đã triển khai |
| Bắt đầu giao hàng | Chuyển trạng thái `processing → shipping` | Đã triển khai |
| Ghi nhận đã giao | Chuyển trạng thái `shipping → delivered` | Đã triển khai |
| Hủy đơn | Chuyển trạng thái bất kỳ → `cancelled`, kèm lý do bắt buộc | Đã triển khai |
| Mã vận đơn (tracking) | Nhập và lưu mã theo dõi vận chuyển | Đã triển khai |
| Thao tác hàng loạt | Xác nhận hàng loạt (pending → processing), in hàng loạt | Đã triển khai |
| In phiếu giao hàng | In đơn lẻ hoặc hàng loạt qua popup window | Đã triển khai |

### 1.3 Tác nhân

| Tác nhân | Vai trò |
|----------|---------|
| Seller (đã duyệt) | Xem, xử lý, cập nhật trạng thái và in đơn hàng |
| Hệ thống | Cập nhật `updatedAt`, gửi thông báo (`addNotif`), hiển thị toast kết quả |
| Người mua | Nguồn gốc đơn hàng; dữ liệu xuất hiện trong các trường `buyer`, `buyerPhone`, `buyerAddress`, `note` |

### 1.4 Điều kiện tiên quyết

- Người dùng phải đăng nhập (`user` tồn tại trong phiên).
- Tài khoản seller phải được duyệt (`sellerApps[].status === 'approved'`).
- Seller phải tồn tại trong mảng `activeSellers` (lưu tại `localStorage` key `edumart_activeSellers`).
- Nếu chưa được duyệt, hệ thống hiển thị trang `sellerAppStatus()` thay vì danh sách đơn hàng.

---

## 2. Yêu cầu chức năng

### FR-01: Danh sách đơn hàng (`sellerOrderList`)

#### FR-01.1 Thanh tìm kiếm

- Ô nhập liệu real-time (`oninput`): lọc danh sách theo **mã đơn hàng** (`o.id`) hoặc **tên người mua** (`o.buyer`), không phân biệt chữ hoa/thường.
- Biến trạng thái: `sellerOrderSearch` (string, mặc định rỗng).
- Tìm kiếm áp dụng đồng thời với bộ lọc trạng thái tab hiện tại.

#### FR-01.2 Bộ lọc trạng thái theo tab

Có 6 tab lọc với số đếm tương ứng:

| Tab | Điều kiện lọc | Biến |
|-----|---------------|------|
| Tất cả | Không lọc theo trạng thái | `sellerOrderStatusFilter === 'all'` |
| Chờ xác nhận | `o.status === 'pending'` | `sellerOrderStatusFilter === 'pending'` |
| Đang xử lý | `o.status === 'processing'` | `sellerOrderStatusFilter === 'processing'` |
| Đang giao | `o.status === 'shipping'` | `sellerOrderStatusFilter === 'shipping'` |
| Đã giao | `o.status === 'delivered'` | `sellerOrderStatusFilter === 'delivered'` |
| Đã hủy | `o.status === 'cancelled'` | `sellerOrderStatusFilter === 'cancelled'` |

Mỗi tab hiển thị số đếm đơn hàng tương ứng trong dấu ngoặc. Tab đang chọn có nền đậm. Khi đổi tab, mảng `sellerOrderSelected` tự động reset về `[]`.

#### FR-01.3 Chọn hàng loạt (Bulk Select)

- Checkbox header: `doSellerToggleSelectAllOrders()` — chọn/bỏ chọn tất cả đơn hàng **có thể chọn được** trong kết quả lọc hiện tại. Đơn hàng **không thể chọn**: trạng thái `delivered` hoặc `cancelled`.
- Checkbox từng dòng: `doSellerToggleOrderSelect(id)` — toggle ID đơn hàng trong mảng `sellerOrderSelected`.
- Trạng thái "chọn tất cả": `selAll = selectableIds.every(id => sellerOrderSelected.includes(id))`.
- Biến trạng thái: `sellerOrderSelected` (string[], mặc định `[]`).

#### FR-01.4 Thanh thao tác hàng loạt (Bulk Action Bar)

Thanh này chỉ hiển thị khi `sellerOrderSelected.length >= 1`. Hiển thị số đơn đã chọn và ba nút:

| Nút | Hàm gọi | Ghi chú |
|-----|---------|---------|
| Xác nhận đơn | `doSellerBulkConfirmOrders()` | Chỉ xử lý đơn `pending` trong danh sách đã chọn |
| In hàng loạt | `doSellerBulkPrintOrders()` | Yêu cầu ít nhất 1 đơn được chọn |
| Bỏ chọn | — | Reset `sellerOrderSelected = []`, re-render |

#### FR-01.5 Bảng danh sách đơn hàng

Bảng hiển thị các cột:

| # | Cột | Nội dung |
|---|-----|----------|
| 1 | Checkbox | Chọn đơn; ẩn (mờ, không tương tác) với đơn `delivered`/`cancelled` |
| 2 | Mã đơn | `o.id` (VD: `#SL-001`) |
| 3 | Ngày đặt | `o.date` |
| 4 | Người mua | `o.buyer` |
| 5 | Tổng tiền | `o.total` định dạng VNĐ |
| 6 | Trạng thái | Badge màu theo `SELLER_ORDER_STATUS[o.status]` |
| 7 | Thao tác | Nhóm nút hành động theo trạng thái |

Khi không có đơn hàng nào sau khi lọc: hiển thị dòng spanning toàn bộ cột với thông báo "Không có đơn hàng nào."

#### FR-01.6 Thao tác nhanh trên mỗi dòng

Các nút hành động hiển thị tùy theo trạng thái đơn hàng hiện tại:

| Nút | Điều kiện hiển thị | Hàm gọi | Kết quả |
|-----|--------------------|---------|---------|
| 👁 Xem | Luôn hiển thị | Đặt `sellerViewOrderId = o.id`, chuyển sang `seller-order-detail` | Mở trang chi tiết |
| ✓ Xác nhận | `status === 'pending'` | `doSellerConfirmOrder(id)` | `pending → processing` |
| 🚚 Giao hàng | `status === 'processing'` | `doSellerStartShipping(id)` | `processing → shipping` |
| ✅ Đã giao | `status === 'shipping'` | `doSellerMarkDelivered(id)` | `shipping → delivered` |
| ✕ Hủy | `status !== 'delivered'` và `status !== 'cancelled'` | `doSellerOpenCancel(id)` | Mở panel hủy inline |

#### FR-01.7 Panel hủy đơn inline

Khi nhấn ✕ Hủy, một panel inline xuất hiện ngay dưới dòng đơn hàng tương ứng. Biến `sellerCancelOrderId` lưu ID đơn đang mở panel hủy; chỉ một panel được mở cùng lúc.

Panel gồm:
- Ô nhập lý do hủy (`#cancelReasonInput`) — bắt buộc điền.
- Nút "Xác nhận hủy" → `doSellerConfirmCancel()`.
- Nút "Bỏ qua" → đặt `sellerCancelOrderId = null`, đóng panel.

---

### FR-02: Chi tiết đơn hàng (`sellerOrderDetail(orderId)`)

#### FR-02.1 Điều hướng và tiêu đề

- Nút "← Quay lại" → đặt `acctTab = 'seller-orders'`, gọi `renderAccount()`.
- Tiêu đề hiển thị mã đơn (`o.id`) và ngày đặt (`o.date`).
- Nhóm nút hành động trong header: cùng logic và hàm như thao tác nhanh trong danh sách (FR-01.6).

#### FR-02.2 Thanh timeline trạng thái

Hiển thị 4 bước tuần tự: **Chờ xác nhận → Đang xử lý → Đang giao → Đã giao**.

- Mỗi bước là một vòng tròn màu; bước đã qua hoặc hiện tại tô màu đặc, bước chưa tới để trống/mờ.
- Màu sắc tương ứng với `SELLER_ORDER_STATUS[status].clr`.
- Nếu đơn bị hủy (`status === 'cancelled'`): thanh timeline bị thay thế bởi thông báo hủy màu đỏ "🚫 Đã hủy", hiển thị thời điểm hủy (`o.cancelledAt`) và lý do hủy (`o.cancelReason`).

#### FR-02.3 Panel mã vận đơn (Tracking)

Hiển thị khi `status === 'processing'` hoặc `status === 'shipping'`:

- Nếu `o.trackingNumber` đã có: hiển thị mã dạng văn bản kèm nút "Sửa" để chuyển sang chế độ nhập.
- Nếu chưa có hoặc đang chỉnh sửa: hiển thị ô nhập (`#trackingInput`) với nút "Lưu" → `doSellerSaveTracking(id)`.
- Biến trạng thái: `sellerTrackingOrderId` (string|null) — ID đơn đang mở panel nhập tracking.

#### FR-02.4 Thẻ thông tin khách hàng

Hiển thị trong một card:

| Trường | Nguồn dữ liệu |
|--------|--------------|
| Tên người mua | `o.buyer` |
| Số điện thoại | `o.buyerPhone` |
| Địa chỉ giao hàng | `o.buyerAddress` |
| Ghi chú của người mua | `o.note` (hiển thị "—" nếu rỗng) |

#### FR-02.5 Thẻ thông tin thanh toán

Hiển thị trong một card riêng biệt:

| Mục | Giá trị |
|-----|---------|
| Tạm tính | `o.subtotal` định dạng VNĐ |
| Phí vận chuyển | `o.shippingFee` định dạng VNĐ |
| **Tổng cộng** | **`o.total` định dạng VNĐ (= subtotal + shippingFee)** |

#### FR-02.6 Bảng sản phẩm trong đơn

Bảng hiển thị tất cả các mặt hàng trong `o.items[]`:

| Cột | Nguồn |
|-----|-------|
| Tên sản phẩm | `item.name` |
| Đơn vị | `item.unit` |
| Số lượng | `item.qty` |
| Đơn giá | `item.price` định dạng VNĐ |
| Thành tiền | `item.qty × item.price` định dạng VNĐ |

---

### FR-03: Xác nhận đơn hàng (`doSellerConfirmOrder`)

**Điều kiện:** `o.status === 'pending'`.

**Luồng xử lý:**
1. Tìm đơn hàng theo `id` trong `s.orders[]`.
2. Cập nhật `o.status = 'processing'`.
3. Cập nhật `o.updatedAt = todayStr()`.
4. Gọi `saveActiveSellers()`.
5. Hiển thị toast thành công: "Đã xác nhận đơn hàng `[id]`."
6. Gọi `addNotif(...)` để thêm thông báo vào hệ thống.
7. Re-render giao diện (`renderAccount()`).

---

### FR-04: Bắt đầu giao hàng (`doSellerStartShipping`)

**Điều kiện:** `o.status === 'processing'`.

**Luồng xử lý:**
1. Tìm đơn hàng theo `id`.
2. Cập nhật `o.status = 'shipping'`.
3. Cập nhật `o.updatedAt = todayStr()`.
4. Gọi `saveActiveSellers()`.
5. Hiển thị toast thành công.
6. Re-render giao diện.

---

### FR-05: Ghi nhận đã giao (`doSellerMarkDelivered`)

**Điều kiện:** `o.status === 'shipping'`.

**Luồng xử lý:**
1. Tìm đơn hàng theo `id`.
2. Cập nhật `o.status = 'delivered'`.
3. Cập nhật `o.updatedAt = todayStr()`.
4. Gọi `saveActiveSellers()`.
5. Hiển thị toast thành công: "Đơn hàng `[id]` đã giao thành công."
6. Gọi `addNotif(...)`.
7. Re-render giao diện.

---

### FR-06: Lưu mã vận đơn (`doSellerSaveTracking`)

**Điều kiện:** `sellerTrackingOrderId !== null`.

**Luồng xử lý:**
1. Đọc giá trị từ `document.getElementById('trackingInput').value.trim()`.
2. Nếu giá trị rỗng: hiển thị toast lỗi "Vui lòng nhập mã vận đơn."
3. Cập nhật `o.trackingNumber = value`.
4. Cập nhật `o.updatedAt = todayStr()`.
5. Gọi `saveActiveSellers()`.
6. Đặt `sellerTrackingOrderId = null` (đóng panel nhập).
7. Hiển thị toast thành công.
8. Re-render giao diện.

---

### FR-07: Hủy đơn hàng (`doSellerOpenCancel` + `doSellerConfirmCancel`)

#### FR-07.1 Mở panel hủy (`doSellerOpenCancel`)

**Điều kiện:** `o.status !== 'delivered'` và `o.status !== 'cancelled'`.

1. Đặt `sellerCancelOrderId = id`.
2. Re-render để hiển thị panel hủy inline.

#### FR-07.2 Xác nhận hủy (`doSellerConfirmCancel`)

1. Đọc lý do từ `document.getElementById('cancelReasonInput').value.trim()`.
2. **Validation:** Nếu lý do rỗng → toast lỗi "Vui lòng nhập lý do hủy." Dừng xử lý.
3. Tìm đơn hàng theo `sellerCancelOrderId`.
4. Cập nhật `o.status = 'cancelled'`.
5. Lưu `o.cancelReason = reason`.
6. Lưu `o.cancelledAt = todayStr()`.
7. Cập nhật `o.updatedAt = todayStr()`.
8. Gọi `saveActiveSellers()`.
9. Đặt `sellerCancelOrderId = null`.
10. Hiển thị toast thành công.
11. Re-render giao diện.

---

### FR-08: Thao tác hàng loạt

#### FR-08.1 Xác nhận hàng loạt (`doSellerBulkConfirmOrders`)

1. Lấy danh sách ID từ `sellerOrderSelected`.
2. Duyệt từng ID: nếu `o.status === 'pending'` thì chuyển sang `'processing'`, cập nhật `o.updatedAt`.
3. Gọi `saveActiveSellers()`.
4. Reset `sellerOrderSelected = []`.
5. Hiển thị toast tổng kết: "Đã xác nhận X đơn hàng."
6. Re-render giao diện.

Lưu ý: Nếu trong danh sách đã chọn có đơn không ở trạng thái `pending`, chúng được bỏ qua (không báo lỗi, chỉ tính số đơn thực sự được xác nhận).

#### FR-08.2 In hàng loạt (`doSellerBulkPrintOrders`)

1. Kiểm tra `sellerOrderSelected.length > 0`; nếu không → toast lỗi "Vui lòng chọn ít nhất một đơn hàng để in."
2. Lấy danh sách đối tượng đơn hàng tương ứng với các ID đã chọn.
3. Gọi `_sellerOpenPrintWindow(orders, s)`.
4. Không reset `sellerOrderSelected` sau khi in.

---

### FR-09: In phiếu giao hàng

#### FR-09.1 In đơn lẻ (`doSellerPrintOrder`)

1. Tìm đơn hàng theo `orderId`.
2. Gọi `_sellerOpenPrintWindow([order], s)`.

#### FR-09.2 Mở cửa sổ in (`_sellerOpenPrintWindow`)

1. Gọi `window.open('', '_blank', 'width=800,height=600')`.
2. Tạo nội dung HTML từ `_sellerOrderSlipHtml(o, shopName)` cho từng đơn trong mảng.
3. Ghi HTML vào cửa sổ mới, gọi `printWin.document.close()`.
4. Trì hoãn nhỏ rồi gọi `printWin.print()`.

#### FR-09.3 Nội dung phiếu in (`_sellerOrderSlipHtml`)

Phiếu giao hàng (PHIẾU GIAO HÀNG) gồm:

| Phần | Nội dung |
|------|---------|
| Tiêu đề | "PHIẾU GIAO HÀNG", tên shop (`shopName`), mã đơn (`o.id`) |
| Thông tin giao | Ngày đặt (`o.date`), tên người mua, số điện thoại, địa chỉ |
| Ghi chú | `o.note` nếu có |
| Mã vận đơn | `o.trackingNumber` nếu có |
| Bảng sản phẩm | Tên, số lượng, đơn giá, thành tiền cho từng `item` |
| Tổng kết | Tạm tính, phí ship, tổng cộng |
| Chân phiếu | Cảm ơn khách hàng, tên nền tảng EduMart |

---

## 3. Mô hình dữ liệu

### 3.1 Hằng số trạng thái đơn hàng (`SELLER_ORDER_STATUS`)

```javascript
SELLER_ORDER_STATUS = {
  pending:    { lbl: 'Chờ xác nhận', clr: '#f57f17', bg: '#fff8e1' },
  processing: { lbl: 'Đang xử lý',   clr: '#1565c0', bg: '#e8f4fd' },
  shipping:   { lbl: 'Đang giao',    clr: '#6a1b9a', bg: '#f3e5f5' },
  delivered:  { lbl: 'Đã giao',      clr: '#2e7d32', bg: '#e8f5e9' },
  cancelled:  { lbl: 'Đã hủy',       clr: '#b71c1c', bg: '#ffebee' }
}
```

### 3.2 Đối tượng đơn hàng (`Order`)

```javascript
{
  // Định danh
  id: string,            // VD: '#SL-001'

  // Thời gian
  date: string,          // Ngày đặt hàng — todayStr()
  updatedAt: string,     // Lần cập nhật trạng thái cuối — todayStr()

  // Thông tin người mua
  buyer: string,         // Tên người mua
  buyerPhone: string,    // Số điện thoại
  buyerAddress: string,  // Địa chỉ giao hàng
  note: string,          // Ghi chú của người mua (có thể rỗng)

  // Sản phẩm
  items: [
    {
      name: string,      // Tên sản phẩm
      qty: number,       // Số lượng
      price: number,     // Đơn giá (VNĐ)
      unit: string       // Đơn vị (VD: 'cuốn')
    }
  ],

  // Tài chính
  subtotal: number,      // Tổng tiền hàng (VNĐ)
  shippingFee: number,   // Phí vận chuyển (VNĐ)
  total: number,         // Tổng cộng = subtotal + shippingFee (VNĐ)

  // Trạng thái
  status: 'pending' | 'processing' | 'shipping' | 'delivered' | 'cancelled',

  // Vận chuyển
  trackingNumber: string,  // Mã vận đơn (rỗng nếu chưa nhập)

  // Hủy đơn
  cancelReason: string,    // Lý do hủy (rỗng nếu không bị hủy)
  cancelledAt: string      // Thời điểm hủy — todayStr() (rỗng nếu không bị hủy)
}
```

### 3.3 Biến trạng thái toàn cục

```javascript
let sellerOrderSearch = '';              // Chuỗi tìm kiếm (ID đơn hoặc tên người mua)
let sellerOrderStatusFilter = 'all';     // Tab lọc hiện tại
let sellerOrderSelected = [];            // Mảng ID đơn đã chọn (thao tác hàng loạt)
let sellerViewOrderId = null;            // ID đơn đang xem chi tiết
let sellerCancelOrderId = null;          // ID đơn đang mở panel hủy
let sellerTrackingOrderId = null;        // ID đơn đang mở panel nhập mã vận đơn
```

### 3.4 Định tuyến (acctTab routing)

| Giá trị `acctTab` | Hàm render |
|-------------------|-----------|
| `'seller-orders'` | `sellerOrderList()` |
| `'seller-order-detail'` | `sellerOrderDetail(sellerViewOrderId)` |

### 3.5 Lưu trữ

- Toàn bộ dữ liệu seller (bao gồm mảng `orders`) lưu tại `localStorage` key: `edumart_activeSellers`.
- Hàm đọc: `LS.get('activeSellers', null)`.
- Hàm ghi: `saveActiveSellers()` → `LS.set('activeSellers', activeSellers)`.
- Đơn hàng nằm tại `activeSellers[sIdx].orders[]`.

---

## 4. Luồng hoạt động

### 4.1 Sơ đồ chuyển trạng thái đơn hàng

```
                    ┌─────────────────────────────────────────────────────┐
                    │                                                     │
                    ▼                                                     │
              [pending]                                                   │
           Chờ xác nhận                                             (từ bất kỳ
                    │                                              trạng thái)
                    │  doSellerConfirmOrder(id)                          │
                    │  doSellerBulkConfirmOrders()                       │
                    ▼                                                     │
            [processing]                                                  │
            Đang xử lý                                                   │
                    │                                                     │
                    │  doSellerStartShipping(id)                         │
                    ▼                                                     │
             [shipping]                                                   │
             Đang giao  ──────────────────────────────────────────► [cancelled]
                    │              doSellerConfirmCancel()             Đã hủy
                    │  doSellerMarkDelivered(id)
                    ▼
            [delivered]
             Đã giao
           (trạng thái cuối — không thể hủy)
```

**Ràng buộc chuyển trạng thái:**
- `pending` → `processing`: qua `doSellerConfirmOrder` hoặc `doSellerBulkConfirmOrders`.
- `processing` → `shipping`: qua `doSellerStartShipping`.
- `shipping` → `delivered`: qua `doSellerMarkDelivered`.
- Bất kỳ trạng thái nào (trừ `delivered` và `cancelled`) → `cancelled`: qua `doSellerConfirmCancel` với lý do bắt buộc.
- `delivered` và `cancelled` là trạng thái cuối, không thể chuyển tiếp.

### 4.2 Luồng tổng thể module đơn hàng

```
Người dùng đăng nhập
        │
        ▼
   acctTab = 'seller-orders'
        │
        ▼
   sellerContent()
        │
        ├─ seller chưa duyệt ──► sellerAppStatus()
        │
        └─ seller đã duyệt  ──► sellerOrderList()
                                        │
                    ┌───────────────────┼──────────────────┐
                    ▼                   ▼                  ▼
            [👁 Xem chi tiết]   [✓ Xác nhận]        [✕ Hủy đơn]
                    │                   │                  │
                    ▼                   ▼                  ▼
          sellerOrderDetail(id)  doSellerConfirmOrder  doSellerOpenCancel
                    │                   │                  │
                    │                   ▼                  ▼
                    │            [processing]      Panel lý do hủy
                    │                   │                  │
                    │            doSellerStartShipping  doSellerConfirmCancel
                    │                   │                  │
                    │            [shipping]          [cancelled]
                    │                   │
                    │            doSellerMarkDelivered
                    │                   │
                    │            [delivered]
                    │
                    └──────────────── sellerOrderList()
```

### 4.3 Luồng xem và xử lý chi tiết đơn hàng

```
sellerOrderList()
        │
        │  [👁 Xem chi tiết]
        ▼
sellerViewOrderId = id
acctTab = 'seller-order-detail'
        │
        ▼
sellerOrderDetail(id)
        │
   ┌────┴─────────────────────────┐
   ▼                              ▼
[Hành động trên header]    [Nhập mã vận đơn]
   │                              │
   ├─ ✓ Xác nhận                 │  doSellerSaveTracking(id)
   │    doSellerConfirmOrder(id)  │        │
   │                              │  o.trackingNumber = value
   ├─ 🚚 Giao hàng               │  saveActiveSellers()
   │    doSellerStartShipping(id) │        │
   │                              ▼
   ├─ ✅ Đã giao            [Hiển thị mã vận đơn]
   │    doSellerMarkDelivered(id)
   │
   ├─ ✕ Hủy
   │    doSellerOpenCancel(id)
   │        │
   │    [Nhập lý do]
   │        │
   │    doSellerConfirmCancel()
   │
   └─ 🖨 In đơn
        doSellerPrintOrder(id)
             │
        _sellerOpenPrintWindow([order], s)
             │
        _sellerOrderSlipHtml(o, shopName)
             │
        [Popup in PHIẾU GIAO HÀNG]
```

### 4.4 Luồng thao tác hàng loạt

```
[Chọn ≥ 1 đơn hàng]
        │
        ▼
Bulk Action Bar hiển thị
        │
   ┌────┴────────────────────────┐
   ▼                             ▼
[Xác nhận đơn]            [In hàng loạt]
   │                             │
   ▼                             ▼
doSellerBulkConfirmOrders()  doSellerBulkPrintOrders()
   │                             │
   │  Duyệt từng ID:             │  _sellerOpenPrintWindow(
   │  if pending → processing    │    selectedOrders, s)
   │  cập nhật updatedAt         │
   │                             │
   └────────────┬────────────────┘
                │
         saveActiveSellers()
         sellerOrderSelected = []
                │
                ▼
        sellerOrderList()
```

---

## 5. Giao diện người dùng

### 5.1 Trang danh sách đơn hàng

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Quản lý Đơn hàng                                                       │
├─────────────────────────────────────────────────────────────────────────┤
│  [🔍 Tìm theo mã đơn, tên người mua...]                                 │
│                                                                         │
│  [ Tất cả (12) ] [ Chờ xác nhận (3) ] [ Đang xử lý (2) ]             │
│  [ Đang giao (4) ] [ Đã giao (2) ] [ Đã hủy (1) ]                    │
├─────────────────────────────────────────────────────────────────────────┤
│  ✓ Đã chọn 2 đơn  |  [Xác nhận đơn]  [In hàng loạt]  [Bỏ chọn]     │
├────┬──────────┬────────────┬──────────────────┬────────────┬───────────┤
│ ☐  │ Mã đơn  │ Ngày đặt  │ Người mua        │ Tổng tiền  │ Trạng     │
│    │          │            │                  │            │ thái      │
├────┼──────────┼────────────┼──────────────────┼────────────┼───────────┤
│ ☑  │ #SL-001 │ 24/06/2026 │ Nguyễn Văn A     │ 185.000đ  │ Chờ xác   │
│    │          │            │                  │            │ nhận      │
│    │          │            │                  │  [👁][✓][✕]│           │
├────┼──────────┼────────────┼──────────────────┼────────────┼───────────┤
│ ☑  │ #SL-002 │ 23/06/2026 │ Trần Thị B       │ 310.000đ  │ Đang xử   │
│    │          │            │                  │            │ lý        │
│    │          │            │                  │[👁][🚚][✕]│           │
├────┼──────────┼────────────┼──────────────────┼────────────┼───────────┤
│ ─  │ #SL-003 │ 20/06/2026 │ Lê Văn C         │ 92.000đ   │ Đã giao   │
│    │          │            │                  │            │           │
│    │          │            │                  │     [👁]   │           │
└────┴──────────┴────────────┴──────────────────┴────────────┴───────────┘
```

### 5.2 Panel hủy đơn inline

```
┌─────────────────────────────────────────────────────────────────────────┐
│ ☑  │ #SL-001 │ 24/06/2026 │ Nguyễn Văn A │ 185.000đ │ Chờ xác nhận  │
├────┴──────────┴────────────┴──────────────┴──────────┴─────────────────┤
│  Lý do hủy đơn #SL-001 *                                               │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │ Vui lòng nhập lý do hủy đơn hàng...                             │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│  [✕ Xác nhận hủy]   [Bỏ qua]                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.3 Trang chi tiết đơn hàng

```
┌─────────────────────────────────────────────────────────────────────────┐
│  [← Quay lại]   Đơn hàng #SL-001 · 24/06/2026                         │
│                          [✓ Xác nhận]   [✕ Hủy]   [🖨 In đơn]        │
├─────────────────────────────────────────────────────────────────────────┤
│  Trạng thái đơn hàng                                                    │
│                                                                         │
│  ●────────────○────────────○────────────○                               │
│  Chờ xác     Đang xử lý  Đang giao    Đã giao                         │
│  nhận                                                                   │
│  (vòng tròn đầu tô màu cam, các vòng còn lại mờ)                      │
├─────────────────────────────────────────────────────────────────────────┤
│  Mã vận đơn: [Chưa có — nhập để theo dõi vận chuyển]                  │
│  [  Nhập mã vận đơn...  ]  [Lưu]                                       │
├─────────────────┬───────────────────────────────────────────────────────┤
│ Thông tin KH    │ Thanh toán                                            │
│ Nguyễn Văn A   │ Tạm tính:      150.000đ                              │
│ 0901234567      │ Phí ship:       35.000đ                              │
│ 12 Lý Thường   │ ─────────────────────────                            │
│ Kiệt, Q1, TP   │ Tổng:          185.000đ                              │
│ HCM             │                                                       │
│ Ghi chú: Giao  │                                                       │
│ buổi sáng       │                                                       │
├─────────────────┴───────────────────────────────────────────────────────┤
│  Sản phẩm đặt mua                                                       │
│  ┌─────────────────────────────┬─────┬────────────┬────────────────────┐ │
│  │ Tên sản phẩm               │ SL  │ Đơn giá    │ Thành tiền         │ │
│  ├─────────────────────────────┼─────┼────────────┼────────────────────┤ │
│  │ Toán 6 Cánh Diều           │  2  │  32.000đ   │  64.000đ           │ │
│  │ Atomic Habits              │  1  │  86.000đ   │  86.000đ           │ │
│  └─────────────────────────────┴─────┴────────────┴────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.4 Chi tiết đơn hàng đã hủy

```
├─────────────────────────────────────────────────────────────────────────┤
│  🚫 Đã hủy                                                              │
│  Thời điểm hủy: 22/06/2026                                              │
│  Lý do: Người mua yêu cầu hủy vì đặt nhầm sản phẩm                    │
├─────────────────────────────────────────────────────────────────────────┤
```
*(Thanh timeline 4 bước được thay thế hoàn toàn bởi thông báo hủy màu đỏ)*

### 5.5 Phiếu giao hàng (popup in)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      PHIẾU GIAO HÀNG                                    │
│                    Sách Giáo Khoa Minh Đức                              │
│                    Mã đơn: #SL-001                                      │
├─────────────────────────────────────────────────────────────────────────┤
│  Ngày đặt: 24/06/2026      Mã vận đơn: VN123456789                     │
│  Người nhận: Nguyễn Văn A                                               │
│  SĐT: 0901234567                                                        │
│  Địa chỉ: 12 Lý Thường Kiệt, Q1, TP HCM                               │
│  Ghi chú: Giao buổi sáng                                                │
├─────────────────────────────────────────────────────────────────────────┤
│  Sản phẩm              │  SL  │  Đơn giá   │  Thành tiền               │
│  ─────────────────────────────────────────────────────────             │
│  Toán 6 Cánh Diều      │   2  │  32.000đ   │   64.000đ                 │
│  Atomic Habits         │   1  │  86.000đ   │   86.000đ                 │
├─────────────────────────────────────────────────────────────────────────┤
│  Tạm tính: 150.000đ   |  Phí ship: 35.000đ   |  Tổng: 185.000đ        │
├─────────────────────────────────────────────────────────────────────────┤
│           Cảm ơn quý khách đã mua sắm tại EduMart!                     │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Yêu cầu phi chức năng

### 6.1 Hiệu năng

| Yêu cầu | Mô tả |
|---------|-------|
| Tìm kiếm tức thì | Lọc xử lý hoàn toàn client-side (không gọi API), phản hồi < 50ms với danh sách < 500 đơn |
| Render danh sách | Hỗ trợ mượt mà tới ~500 đơn hàng trên client mà không cần phân trang |
| Lưu trữ đồng bộ | `saveActiveSellers()` ghi đồng bộ vào `localStorage`; với danh sách lớn cần xem xét debounce để tránh block UI |
| In phiếu | Popup in mở trong < 1 giây; không block UI của tab chính |

### 6.2 Bảo mật

| Yêu cầu | Mô tả |
|---------|-------|
| Phân quyền | Chỉ seller được duyệt (`isApproved === true`) mới truy cập module đơn hàng |
| Cô lập dữ liệu | Seller chỉ thấy và xử lý đơn hàng của chính mình (`s.email === user.email`) |
| Escape đầu ra | Toàn bộ chuỗi từ dữ liệu người dùng (tên, địa chỉ, ghi chú, lý do hủy) được escape qua `escHtml()` trước khi render vào HTML |
| Validation nhập liệu | Lý do hủy đơn bắt buộc không được rỗng (kiểm tra `.trim().length > 0`); mã vận đơn không được rỗng |

### 6.3 Trải nghiệm người dùng

| Yêu cầu | Mô tả |
|---------|-------|
| Phản hồi tức thì | Toast thông báo kết quả mọi thao tác thay đổi trạng thái (thành công hoặc lỗi) |
| Nút hành động ngữ cảnh | Chỉ hiển thị đúng các nút phù hợp với trạng thái đơn hàng hiện tại |
| Badge màu sắc | Mỗi trạng thái có màu riêng biệt từ `SELLER_ORDER_STATUS` để nhận diện nhanh |
| Thanh timeline trực quan | 4 bước được trình bày theo thứ tự tuyến tính, làm nổi bật bước hiện tại |
| Bảo vệ trạng thái cuối | Đơn `delivered` và `cancelled` không có nút hủy; checkbox chọn bị vô hiệu hóa |
| Xác nhận phá hủy | Hủy đơn yêu cầu nhập lý do bắt buộc thay vì chỉ confirm dialog (phòng tránh hủy nhầm) |
| Responsive | Bảng danh sách có `overflow-x: auto`, hỗ trợ cuộn ngang trên màn hình nhỏ |
| Thông báo hệ thống | `addNotif()` được gọi sau xác nhận đơn và giao hàng thành công |

### 6.4 Tương thích

| Yêu cầu | Mô tả |
|---------|-------|
| Lưu trữ | `localStorage` — dữ liệu tồn tại giữa các phiên trên cùng thiết bị/trình duyệt |
| In ấn | Popup in dùng `window.open` và `window.print()` — tương thích với mọi trình duyệt hiện đại |
| Định dạng tiền tệ | Số tiền hiển thị nhất quán dạng VNĐ với dấu chấm ngàn (VD: 185.000đ) |

---

## 7. Tiêu chí chấp nhận

**AC-01:** Danh sách đơn hàng hiển thị đúng số đếm trên 6 tab (Tất cả, Chờ xác nhận, Đang xử lý, Đang giao, Đã giao, Đã hủy) khớp với dữ liệu thực trong `s.orders[]`.

**AC-02:** Tìm kiếm theo mã đơn hoặc tên người mua hoạt động real-time, không phân biệt chữ hoa/thường, áp dụng đồng thời với tab lọc đang chọn.

**AC-03:** Khi chuyển tab, mảng `sellerOrderSelected` tự động reset về `[]` và Bulk Action Bar biến mất.

**AC-04:** Checkbox chọn đơn bị vô hiệu hóa (mờ, không tương tác) với đơn hàng có trạng thái `delivered` hoặc `cancelled`.

**AC-05:** `doSellerToggleSelectAllOrders()` chỉ chọn/bỏ chọn những đơn có thể chọn được (không phải `delivered`/`cancelled`) trong kết quả lọc hiện tại.

**AC-06:** Bulk Action Bar chỉ xuất hiện khi `sellerOrderSelected.length >= 1`.

**AC-07:** `doSellerConfirmOrder(id)` chuyển đúng `pending → processing`, cập nhật `updatedAt`, gọi `saveActiveSellers()` và `addNotif()`, hiển thị toast thành công.

**AC-08:** `doSellerStartShipping(id)` chỉ hoạt động khi `status === 'processing'`, chuyển sang `shipping`.

**AC-09:** `doSellerMarkDelivered(id)` chỉ hoạt động khi `status === 'shipping'`, chuyển sang `delivered`, gọi `addNotif()`.

**AC-10:** Nút ✕ Hủy không xuất hiện (hoặc bị ẩn) với đơn có trạng thái `delivered` và `cancelled`.

**AC-11:** `doSellerConfirmCancel()` từ chối (toast lỗi) nếu lý do hủy rỗng; lưu đúng `cancelReason`, `cancelledAt`, chuyển `status = 'cancelled'`.

**AC-12:** `doSellerSaveTracking(id)` từ chối (toast lỗi) nếu giá trị `#trackingInput` rỗng; lưu đúng `trackingNumber` và đóng panel.

**AC-13:** `doSellerBulkConfirmOrders()` chỉ xử lý đơn `pending` trong danh sách đã chọn; bỏ qua đơn ở trạng thái khác mà không báo lỗi.

**AC-14:** `doSellerBulkPrintOrders()` hiển thị toast lỗi khi `sellerOrderSelected.length === 0`.

**AC-15:** `_sellerOpenPrintWindow` mở popup và tự động kích hoạt `window.print()` sau khi tài liệu được tải.

**AC-16:** Phiếu in (`_sellerOrderSlipHtml`) hiển thị đầy đủ: tên shop, mã đơn, thông tin người mua, bảng sản phẩm, tổng tài chính.

**AC-17:** Trang chi tiết (`sellerOrderDetail`) hiển thị đúng timeline 4 bước với bước hiện tại được tô màu; các bước chưa đạt tới để mờ.

**AC-18:** Khi `status === 'cancelled'`, thanh timeline được thay thế hoàn toàn bằng thông báo hủy hiển thị `cancelledAt` và `cancelReason`.

**AC-19:** Panel mã vận đơn chỉ xuất hiện khi `status === 'processing'` hoặc `status === 'shipping'`.

**AC-20:** Sau mọi thao tác thay đổi trạng thái, `saveActiveSellers()` được gọi và dữ liệu được persisted vào `localStorage`.

**AC-21:** Nút "← Quay lại" trên trang chi tiết chuyển `acctTab = 'seller-orders'` và render lại danh sách.

**AC-22:** Các thao tác thay đổi trạng thái thực hiện từ trang chi tiết (`sellerOrderDetail`) hoạt động đúng như khi thực hiện từ danh sách (`sellerOrderList`).

---

## 8. Rủi ro và Giải pháp

| # | Rủi ro | Mức độ | Giải pháp |
|---|--------|--------|-----------|
| R-01 | Seller hủy nhầm đơn đã được khách xác nhận thanh toán — gây mất uy tín | Cao | P2: Thêm xác nhận hai bước (confirm dialog) trước khi mở panel lý do hủy; ghi log thao tác hủy |
| R-02 | Hai tab trình duyệt cùng xử lý một đơn hàng → ghi đè trạng thái nhau | Trung bình | P3: Đồng bộ qua `storage` event; dài hạn chuyển xử lý sang server-side với optimistic locking |
| R-03 | Mã vận đơn nhập sai định dạng không được phát hiện | Thấp | P2: Validate regex cơ bản theo định dạng của đơn vị vận chuyển (VD: GHN, GHTK, VNPost) |
| R-04 | `localStorage` đầy khi có nhiều đơn hàng tích lũy dài hạn (> 5 MB) | Trung bình | P3: Lưu trữ server-side; P2 ngắn hạn: tự động lưu trữ (archive) đơn `delivered`/`cancelled` cũ hơn 90 ngày |
| R-05 | Popup in bị chặn bởi trình duyệt (popup blocker) | Trung bình | P2: Phát hiện popup bị chặn (`printWin === null`) và hiển thị hướng dẫn cho phép popup; hoặc dùng iframe print thay thế |
| R-06 | Bulk confirm lớn (> 50 đơn) có thể gây UI lag do nhiều lần ghi `localStorage` | Thấp | P2: Gom tất cả thay đổi rồi gọi `saveActiveSellers()` một lần duy nhất sau vòng lặp (đã được thiết kế đúng) |
| R-07 | Đơn hàng không có `cancelReason` hoặc `cancelledAt` khi bị hủy bởi hệ thống bên ngoài (VD: admin) — render lỗi ở chi tiết | Thấp | P2: Kiểm tra `o.cancelReason || '—'` và `o.cancelledAt || '—'` trước khi render; thêm giá trị mặc định |
| R-08 | Seller in phiếu cho đơn chưa có mã vận đơn — phiếu thiếu thông tin vận chuyển | Thấp | P1 workaround: Phiếu in hiển thị "Chưa có mã vận đơn" thay vì để trống; P2: Cảnh báo khi in đơn chưa có tracking |

---

## 9. Lộ trình phát triển

### P1 — Đã triển khai (hiện tại)

- [x] Danh sách đơn hàng với tìm kiếm real-time (theo mã đơn và tên người mua)
- [x] 6 tab lọc trạng thái với số đếm động (Tất cả, Chờ xác nhận, Đang xử lý, Đang giao, Đã giao, Đã hủy)
- [x] Badge màu sắc theo trạng thái từ `SELLER_ORDER_STATUS`
- [x] Thao tác nhanh theo ngữ cảnh trên từng dòng: xem, xác nhận, giao hàng, đã giao, hủy
- [x] Panel hủy đơn inline với lý do bắt buộc (`doSellerOpenCancel` + `doSellerConfirmCancel`)
- [x] Chọn hàng loạt: checkbox đơn (`doSellerToggleOrderSelect`) và checkbox all (`doSellerToggleSelectAllOrders`)
- [x] Vô hiệu hóa chọn đơn ở trạng thái `delivered`/`cancelled`
- [x] Bulk Action Bar: xác nhận hàng loạt (`doSellerBulkConfirmOrders`) và in hàng loạt (`doSellerBulkPrintOrders`)
- [x] Trang chi tiết đơn hàng (`sellerOrderDetail`) với đầy đủ thông tin
- [x] Timeline trạng thái 4 bước trực quan với màu sắc động
- [x] Hiển thị thông báo hủy đặc biệt (`cancelReason`, `cancelledAt`) thay thanh timeline
- [x] Panel nhập và hiển thị mã vận đơn (`doSellerSaveTracking`, `sellerTrackingOrderId`)
- [x] Thẻ thông tin khách hàng (tên, SĐT, địa chỉ, ghi chú)
- [x] Thẻ thanh toán (tạm tính, phí ship, tổng cộng)
- [x] Bảng sản phẩm trong đơn (tên, số lượng, đơn giá, thành tiền)
- [x] In đơn lẻ (`doSellerPrintOrder`) và in hàng loạt (`doSellerBulkPrintOrders`)
- [x] Phiếu giao hàng HTML (`_sellerOrderSlipHtml`) với đầy đủ thông tin và popup print (`_sellerOpenPrintWindow`)
- [x] Toast thông báo và `addNotif()` cho các thao tác quan trọng
- [x] Định tuyến `acctTab`: `seller-orders` ↔ `seller-order-detail`

### P2 — Cải tiến tiếp theo

- [ ] Validate định dạng mã vận đơn theo từng đơn vị vận chuyển (GHN, GHTK, VNPost, J&T)
- [ ] Xác nhận hai bước trước khi hủy đơn (confirm dialog + nhập lý do)
- [ ] Cảnh báo khi in phiếu cho đơn chưa có mã vận đơn
- [ ] Phát hiện và xử lý popup bị chặn trình duyệt khi in
- [ ] Lọc đơn hàng theo khoảng thời gian (ngày từ – đến)
- [ ] Sắp xếp bảng danh sách theo cột (ngày, tổng tiền, trạng thái)
- [ ] Xuất danh sách đơn hàng ra CSV/Excel
- [ ] Tích hợp tra cứu vận đơn (click vào mã → mở trang theo dõi đơn vị vận chuyển)
- [ ] Ghi log lịch sử thay đổi trạng thái trong từng đơn hàng (audit trail)
- [ ] Phân trang danh sách khi số lượng đơn vượt ngưỡng (VD: > 100)

### P3 — Tầm nhìn dài hạn

- [ ] Chuyển lưu trữ sang server-side; bỏ `localStorage` để đồng bộ đa thiết bị
- [ ] Webhook/push notification thời gian thực khi có đơn mới
- [ ] Tích hợp API đơn vị vận chuyển (tạo vận đơn tự động, lấy mã tracking từ GHN/GHTK)
- [ ] Quản lý trả hàng/hoàn tiền (return & refund workflow)
- [ ] Thống kê đơn hàng theo ngày/tuần/tháng tích hợp vào dashboard
- [ ] In phiếu hàng loạt theo lô lớn với preview trước khi in
- [ ] Hệ thống đánh giá hiệu suất xử lý đơn (thời gian trung bình xác nhận, giao hàng)
- [ ] Tích hợp chat trực tiếp với người mua ngay từ trang chi tiết đơn hàng
