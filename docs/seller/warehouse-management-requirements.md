# Yêu cầu chức năng: Quản lý Kho hàng — Phân hệ Người bán

**Phiên bản:** 1.0  
**Ngày cập nhật:** 24/06/2026  
**Trạng thái:** Đã triển khai  
**Module liên quan:** `seller-warehouse`, `seller-warehouse-stock`, `seller-warehouse-receipts`, `seller-warehouse-thresholds`

---

## 1. Tổng quan

### 1.1 Mục đích

Module Quản lý Kho hàng cung cấp cho seller đã được duyệt khả năng theo dõi tồn kho toàn diện trên tất cả danh mục sản phẩm (Sách, Văn phòng phẩm, Thiết bị giáo dục), lập phiếu nhập hàng có trạng thái nháp/xác nhận, và thiết lập ngưỡng cảnh báo tồn kho thấp theo từng sản phẩm.

Mục tiêu nghiệp vụ:

- Ngăn chặn tình trạng hết hàng bất ngờ thông qua cảnh báo ngưỡng tồn kho.
- Ghi lại đầy đủ lịch sử nhập hàng từ nhà cung cấp (phiếu nhập kho).
- Cung cấp báo cáo tổng hợp giá trị tồn kho tức thì để hỗ trợ ra quyết định mua hàng.

### 1.2 Phạm vi

| Thành phần | Mô tả | Trạng thái |
|------------|-------|------------|
| Tab Tồn kho (`_warehouseStockTab`) | KPI tổng quan, tìm kiếm, lọc, bảng tồn kho với thanh tiến trình | Đã triển khai |
| Tab Phiếu nhập (`_warehouseReceiptsTab`) | Danh sách phiếu nhập, form tạo/sửa phiếu nhập kho | Đã triển khai |
| Tab Ngưỡng cảnh báo (`_warehouseThresholdsTab`) | Bảng chỉnh sửa ngưỡng tồn kho theo từng sản phẩm | Đã triển khai |
| Áp dụng phiếu vào tồn kho (`_applyReceiptToStock`) | Tự động cộng số lượng, kích hoạt lại sản phẩm hết hàng | Đã triển khai |
| Thông báo ngưỡng (`addNotif`) | Gửi cảnh báo khi tồn kho ≤ ngưỡng sau khi lưu | Đã triển khai |

### 1.3 Tác nhân

| Tác nhân | Vai trò |
|----------|---------|
| Seller (đã duyệt) | Xem tồn kho, tạo và xác nhận phiếu nhập, thiết lập ngưỡng cảnh báo |
| Hệ thống | Tự động cập nhật tồn kho khi xác nhận phiếu nhập, tự động kích hoạt lại sản phẩm, tự động gửi thông báo cảnh báo |

### 1.4 Điều kiện tiên quyết

- Người dùng phải đăng nhập (`user` tồn tại trong `localStorage`).
- Tài khoản seller phải được duyệt (`sellerApps[].status === 'approved'`).
- Seller phải tồn tại trong mảng `activeSellers` (lưu tại `localStorage` key `edumart_activeSellers`).
- Nếu chưa được duyệt, hệ thống chuyển hướng sang trang `sellerAppStatus()`.
- Route: `acctTab === 'seller-warehouse'` → gọi `sellerWarehouse()`.

### 1.5 Thuật ngữ

| Thuật ngữ | Định nghĩa |
|-----------|-----------|
| Tồn kho (stock) | Số lượng sản phẩm hiện có trong kho của seller |
| Ngưỡng cảnh báo (threshold) | Mức tồn kho tối thiểu; khi tồn kho ≤ ngưỡng, hệ thống gửi cảnh báo |
| Phiếu nhập kho (receipt) | Chứng từ ghi lại việc nhập hàng từ nhà cung cấp |
| Nháp (draft) | Phiếu đã lưu nhưng chưa xác nhận, chưa ảnh hưởng tồn kho |
| Xác nhận (confirmed) | Phiếu đã được xác nhận; tồn kho được cập nhật tức thì |
| Sắp hết hàng (low stock) | Tồn kho > 0 nhưng ≤ ngưỡng cảnh báo |
| Hết hàng (out of stock) | Tồn kho = 0 |

---

## 2. Yêu cầu chức năng

### FR-01: Tab Tồn kho (`_warehouseStockTab`)

#### FR-01.1 Thanh điều hướng 3 tab

Màn hình chính `sellerWarehouse()` hiển thị 3 tab điều hướng ngang:

| Tab | Biểu tượng | Biến trạng thái (`sellerWarehouseTab`) |
|-----|-----------|--------------------------------------|
| Tồn kho | 📦 | `'stock'` |
| Phiếu nhập | 📋 | `'receipts'` |
| Ngưỡng cảnh báo | 🔔 | `'thresholds'` |

Tab hiện tại được tô nền đậm. Khi chuyển tab, nội dung khu vực chính thay đổi tương ứng.

#### FR-01.2 Bốn thẻ KPI tổng quan

Hệ thống tổng hợp dữ liệu từ `_getAllSellerProducts(s)` — hàm này gộp toàn bộ sản phẩm từ ba mảng (`products` — sách, `vppProducts` — văn phòng phẩm, `tbgdProducts` — thiết bị giáo dục) thành một danh sách phẳng, bổ sung trường `typeLabel`.

| # | Thẻ KPI | Màu | Công thức |
|---|---------|-----|-----------|
| 1 | Tổng mặt hàng | Xanh dương | `allProducts.length` |
| 2 | Tổng tồn kho | Xanh lá | `sum(p.stock)` |
| 3 | Sắp hết hàng | Vàng | `allProducts.filter(p => p.stock > 0 && p.stock <= p.threshold).length` |
| 4 | Hết hàng | Đỏ | `allProducts.filter(p => p.stock === 0).length` |

Phía dưới 4 thẻ KPI, hệ thống hiển thị thêm **Tổng giá trị tồn kho** được tính theo công thức:

```
totalInventoryValue = sum(p.stock * p.price)  cho tất cả sản phẩm
```

Giá trị hiển thị được định dạng theo đơn vị nghìn đồng (VND).

#### FR-01.3 Tìm kiếm sản phẩm

- Ô nhập liệu với placeholder "Tìm sản phẩm...".
- Lọc real-time (`oninput`) theo tên sản phẩm, không phân biệt chữ hoa/thường.
- Biến trạng thái: `sellerStockSearch` (string).

#### FR-01.4 Bộ lọc tồn kho

Ba nút lọc nhanh hiển thị số đếm tương ứng:

| Nhãn | Ký hiệu | Điều kiện | Biến trạng thái |
|------|---------|-----------|----------------|
| Tất cả | — | Không lọc | `sellerStockFilter === 'all'` |
| Sắp hết | 🟡 | `p.stock > 0 && p.stock <= p.threshold` | `sellerStockFilter === 'low'` |
| Hết hàng | 🔴 | `p.stock === 0` | `sellerStockFilter === 'out'` |

#### FR-01.5 Bảng danh sách tồn kho

Bảng hiển thị danh sách sản phẩm sau khi áp dụng bộ tìm kiếm và lọc. Cột bảng:

| # | Cột | Nội dung |
|---|-----|----------|
| 1 | Loại | Badge màu: Sách (xanh dương), VPP (xanh lá), Thiết bị (tím) |
| 2 | Tên sản phẩm | Tên đầy đủ của sản phẩm |
| 3 | Tồn kho | Số lượng tô màu (đỏ nếu hết, cam nếu sắp hết, xanh nếu đủ) + thanh tiến trình mini |
| 4 | Ngưỡng | Giá trị `p.threshold` hiện tại |
| 5 | Giá bán | `p.price` định dạng VND |
| 6 | Giá trị tồn | `p.stock * p.price` định dạng VND |
| 7 | Đã bán | `p.sold` (nếu có) |
| 8 | Hành động | Nút "Nhập hàng" chỉ hiện khi sản phẩm sắp hết hoặc hết hàng |

**Thanh tiến trình mini (stock progress bar):**

```
width = min(100, (stock / (threshold * 3)) * 100)%
color:
  - Đỏ   nếu stock === 0
  - Cam   nếu 0 < stock <= threshold
  - Xanh  nếu stock > threshold
```

#### FR-01.6 Phím tắt "Nhập hàng"

- Nút "Nhập hàng" xuất hiện ở cuối hàng khi `p.stock === 0` hoặc `p.stock <= p.threshold`.
- Khi nhấn: chuyển sang tab Phiếu nhập, mở form tạo phiếu mới, và tự động điền sản phẩm đó vào danh sách dòng nhập hàng.
- Cho phép seller hành động nhanh mà không cần tìm kiếm sản phẩm thủ công trong form.

---

### FR-02: Tab Phiếu nhập (`_warehouseReceiptsTab`)

#### FR-02.1 Danh sách phiếu nhập

Khi `sellerEditReceiptId === null`, hệ thống hiển thị danh sách toàn bộ phiếu nhập kho (`s.receipts[]`) theo thứ tự mới nhất trước.

Thông tin mỗi phiếu hiển thị trong thẻ:

| Trường | Nội dung |
|--------|----------|
| Mã phiếu | `receipt.id` (dạng `PNK-XXXXXX`) |
| Nhà cung cấp | `receipt.supplier` |
| Ngày tạo | `receipt.createdAt` |
| Ngày xác nhận | `receipt.confirmedAt` (chỉ hiện khi đã xác nhận) |
| Trạng thái | Badge: "Nháp" (xám) hoặc "Đã xác nhận" (xanh lá) |
| Tổng SL | `receipt.totalQty` |
| Tổng giá trị | `receipt.totalValue` định dạng VND |
| Ghi chú | `receipt.note` (nếu có) |

Hành động theo trạng thái phiếu:

| Trạng thái | Hành động cho phép |
|------------|-------------------|
| Nháp | Sửa (doSellerEditReceipt), Xác nhận (doSellerConfirmReceipt), Xóa (doSellerDeleteReceipt) |
| Đã xác nhận | Không cho phép sửa hoặc xóa |

Nút "Tạo phiếu nhập mới" luôn hiển thị ở đầu trang danh sách. Khi nhấn: `sellerEditReceiptId = 'new'`, `sellerReceiptLines = []`.

#### FR-02.2 Form tạo / sửa phiếu nhập

Form hiển thị khi `sellerEditReceiptId !== null`. Các trường nhập liệu:

| Trường | Loại | Bắt buộc | Biến trạng thái |
|--------|------|----------|----------------|
| Nhà cung cấp | Text input | Có | `sellerReceiptSupplier` |
| Ghi chú | Textarea | Không | `sellerReceiptNote` |

**Bộ chọn sản phẩm:**

- Dropdown liệt kê tất cả sản phẩm của seller chưa có trong phiếu hiện tại.
- Sau khi chọn, sản phẩm được thêm vào `sellerReceiptLines` với `qty = 1`, `importPrice = 0`.

**Bảng dòng hàng nhập:**

| Cột | Nội dung |
|-----|----------|
| Sản phẩm | Tên sản phẩm + badge loại |
| ĐVT | Đơn vị tính (`unit`) |
| Số lượng | Input number, chỉnh sửa trực tiếp |
| Đơn giá nhập | Input number, chỉnh sửa trực tiếp |
| Thành tiền | `qty * importPrice` tự động tính |
| Xóa | Nút xóa dòng khỏi phiếu |

**Footer bảng dòng hàng:**

| Thông tin | Công thức |
|-----------|-----------|
| Tổng số lượng | `sum(line.qty)` |
| Tổng giá trị | `sum(line.qty * line.importPrice)` |

**Nút hành động form:**

| Nút | Chức năng |
|-----|-----------|
| Lưu nháp | Lưu phiếu với `status = 'draft'`; không cập nhật tồn kho |
| ✓ Xác nhận nhập kho | Lưu và xác nhận phiếu với `status = 'confirmed'`; cập nhật tồn kho ngay |
| Hủy | Đóng form, quay lại danh sách |

#### FR-02.3 Lưu phiếu nháp (`doSellerSaveReceipt('draft')`)

- Yêu cầu: `sellerReceiptSupplier` không rỗng.
- Không yêu cầu `importPrice > 0`.
- Tạo đối tượng phiếu mới hoặc cập nhật phiếu hiện tại (nếu `sellerEditReceiptId !== 'new'`).
- Mã phiếu mới: `'PNK-' + Date.now().toString(36).toUpperCase()`.
- Không gọi `_applyReceiptToStock`.
- Đặt `sellerEditReceiptId = null` sau khi lưu.

#### FR-02.4 Xác nhận phiếu nhập (`doSellerSaveReceipt('confirmed')` / `doSellerConfirmReceipt`)

**Kiểm tra hợp lệ:**

- Tất cả dòng hàng phải có `importPrice > 0`; nếu vi phạm, hiển thị thông báo lỗi và dừng.
- `sellerReceiptSupplier` không được rỗng.

**Khi hợp lệ:**

1. Lưu phiếu với `status = 'confirmed'`, ghi `confirmedAt = new Date().toISOString()`.
2. Gọi `_applyReceiptToStock(sIdx, lines)`:
   - Với mỗi dòng hàng: `product.stock += line.qty`.
   - Nếu sản phẩm đang ở trạng thái `'outofstock'` → đặt lại `status = 'active'`.
3. Lưu dữ liệu seller vào `localStorage`.
4. Đặt `sellerEditReceiptId = null`, quay lại danh sách.

#### FR-02.5 Xóa phiếu nháp (`doSellerDeleteReceipt`)

- Chỉ cho phép xóa phiếu có `status === 'draft'`.
- Phiếu đã xác nhận (`confirmed`) không thể xóa (nút xóa ẩn / bị vô hiệu hóa).
- Hiển thị hộp thoại xác nhận trước khi xóa.

---

### FR-03: Tab Ngưỡng cảnh báo (`_warehouseThresholdsTab`)

#### FR-03.1 Banner thông tin

Hiển thị banner giải thích: "Khi tồn kho của sản phẩm bằng hoặc thấp hơn ngưỡng cảnh báo, hệ thống sẽ tự động gửi thông báo cho bạn để nhắc nhập hàng kịp thời."

#### FR-03.2 Bảng ngưỡng cảnh báo

Bảng liệt kê toàn bộ sản phẩm (từ `_getAllSellerProducts`). Cột bảng:

| # | Cột | Nội dung |
|---|-----|----------|
| 1 | Loại | Badge màu theo loại sản phẩm |
| 2 | Tên sản phẩm | Tên đầy đủ |
| 3 | Tồn hiện tại | `p.stock` (tô màu theo mức tồn) |
| 4 | Ngưỡng cảnh báo | Input number, có thể chỉnh sửa trực tiếp |
| 5 | Lưu | Nút "Lưu" cho từng dòng riêng lẻ |

#### FR-03.3 Lưu ngưỡng từng sản phẩm (`doSellerSaveThreshold`)

- Đọc giá trị từ input `threshold-{productId}`.
- Cập nhật `product.threshold` tương ứng (theo `productId` và `productType`).
- Nếu `product.stock <= newThreshold` → gọi `addNotif` với cảnh báo tồn kho thấp.
- Lưu vào `localStorage`.

#### FR-03.4 Lưu tất cả ngưỡng (`doSellerSaveAllThresholds`)

- Nút "Lưu tất cả" xuất hiện ở đầu/cuối bảng.
- Duyệt qua toàn bộ input `threshold-{productId}` trên trang.
- Cập nhật `product.threshold` cho từng sản phẩm.
- Với mỗi sản phẩm nếu `product.stock <= newThreshold` → gọi `addNotif`.
- Lưu toàn bộ vào `localStorage` một lần duy nhất.

#### FR-03.5 Thông báo cảnh báo tồn kho

Thông báo được thêm vào danh sách thông báo của seller (`addNotif`) với nội dung:

- Loại: cảnh báo (`warning`).
- Nội dung: "Sản phẩm [tên sản phẩm] đang có tồn kho thấp ([số lượng] sản phẩm còn lại)".
- Icon: 🔔.

---

## 3. Mô hình dữ liệu

### 3.1 Cấu trúc Phiếu nhập kho (`Receipt`)

```js
{
  id: string,           // 'PNK-' + Date.now().toString(36).toUpperCase()
  supplier: string,     // Tên nhà cung cấp (bắt buộc)
  note: string,         // Ghi chú (tùy chọn)
  status: 'draft' | 'confirmed',
  createdAt: string,    // ISO 8601, gán khi tạo
  confirmedAt: string,  // ISO 8601, gán khi xác nhận (null nếu còn nháp)
  lines: [
    {
      productId: string,
      productType: 'book' | 'vpp' | 'tbgd',
      productName: string,
      unit: string,
      qty: number,        // Số lượng nhập (> 0)
      importPrice: number, // Đơn giá nhập (> 0 khi xác nhận)
      total: number       // qty * importPrice (tính tự động)
    }
  ],
  totalQty: number,      // sum(lines[].qty)
  totalValue: number     // sum(lines[].total)
}
```

### 3.2 Trường tồn kho và ngưỡng trên sản phẩm

Mỗi sản phẩm (dù là sách, VPP hay thiết bị) có các trường liên quan đến kho:

```js
{
  id: string,
  name: string,
  price: number,
  stock: number,        // Tồn kho hiện tại
  threshold: number,    // Ngưỡng cảnh báo
  sold: number,         // Tổng đã bán
  status: 'active' | 'draft' | 'outofstock',
  // ... các trường riêng theo loại
}
```

### 3.3 Nhãn loại sản phẩm (`typeLabel`)

Hàm `_getAllSellerProducts` bổ sung trường `typeLabel` vào mỗi sản phẩm:

| `productType` | `typeLabel` | Màu badge |
|--------------|-------------|-----------|
| `'book'` | `'Sách'` | Xanh dương |
| `'vpp'` | `'VPP'` | Xanh lá |
| `'tbgd'` | `'Thiết bị'` | Tím |

### 3.4 Biến trạng thái UI

| Biến | Kiểu | Mặc định | Mô tả |
|------|------|----------|-------|
| `sellerWarehouseTab` | `'stock' \| 'receipts' \| 'thresholds'` | `'stock'` | Tab đang hiển thị |
| `sellerStockSearch` | `string` | `''` | Chuỗi tìm kiếm tên sản phẩm |
| `sellerStockFilter` | `'all' \| 'low' \| 'out'` | `'all'` | Bộ lọc tồn kho |
| `sellerEditReceiptId` | `string \| null` | `null` | `null` = danh sách; `'new'` = tạo mới; ID = sửa |
| `sellerReceiptLines` | `array` | `[]` | Dòng hàng của phiếu đang soạn |
| `sellerReceiptSupplier` | `string` | `''` | Tên nhà cung cấp của phiếu đang soạn |
| `sellerReceiptNote` | `string` | `''` | Ghi chú của phiếu đang soạn |

### 3.5 Nơi lưu trữ dữ liệu

Toàn bộ dữ liệu seller (bao gồm `receipts[]`, `products[]`, `vppProducts[]`, `tbgdProducts[]`) được lưu trong `localStorage` dưới key `edumart_activeSellers` dưới dạng mảng JSON. Dữ liệu được đọc và ghi theo chỉ số seller (`sIdx`).

---

## 4. Luồng hoạt động

### 4.1 Luồng xem tồn kho

```
Seller truy cập seller-warehouse
        ↓
sellerWarehouse() khởi tạo tab mặc định = 'stock'
        ↓
_getAllSellerProducts(s) gộp sách + VPP + thiết bị
        ↓
_warehouseStockTab(s) render:
  - 4 thẻ KPI + tổng giá trị tồn
  - Ô tìm kiếm + 3 nút lọc
  - Bảng tồn kho (filtered)
        ↓
Seller nhấn "Nhập hàng" trên sản phẩm sắp hết/hết
        ↓
Chuyển tab → 'receipts', mở form, prefill sản phẩm
```

### 4.2 Luồng tạo và xác nhận phiếu nhập kho

```
Seller nhấn "Tạo phiếu nhập mới"
        ↓
sellerEditReceiptId = 'new', sellerReceiptLines = []
        ↓
Seller nhập: Nhà cung cấp, Ghi chú
Seller chọn sản phẩm từ dropdown
        ↓
Sản phẩm thêm vào sellerReceiptLines
Seller chỉnh sửa qty và importPrice trực tiếp trong bảng
        ↓
[Lưu nháp]                    [Xác nhận nhập kho]
     ↓                                ↓
doSellerSaveReceipt('draft')  Kiểm tra importPrice > 0
status = 'draft'                   ↓ (lỗi → dừng)
Không cập nhật tồn kho        doSellerSaveReceipt('confirmed')
     ↓                        status = 'confirmed'
Quay lại danh sách            confirmedAt = now
                                   ↓
                              _applyReceiptToStock:
                                stock += qty mỗi dòng
                                nếu outofstock → active
                                   ↓
                              Lưu localStorage
                                   ↓
                              Quay lại danh sách
```

### 4.3 Luồng thiết lập ngưỡng cảnh báo

```
Seller vào tab "Ngưỡng cảnh báo"
        ↓
Bảng hiển thị tất cả sản phẩm + input ngưỡng hiện tại
        ↓
Seller chỉnh sửa ngưỡng (một hoặc nhiều sản phẩm)
        ↓
[Lưu từng dòng]              [Lưu tất cả]
       ↓                           ↓
doSellerSaveThreshold      doSellerSaveAllThresholds
       ↓                           ↓
Cập nhật threshold         Cập nhật tất cả threshold
       ↓                           ↓
stock <= threshold?        Mỗi sp: stock <= threshold?
  Có → addNotif ⚠️            Có → addNotif ⚠️
       ↓                           ↓
Lưu localStorage           Lưu localStorage một lần
```

### 4.4 Luồng khôi phục sản phẩm hết hàng

```
Sản phẩm: status = 'outofstock', stock = 0
        ↓
Seller tạo phiếu nhập với sản phẩm này (qty > 0)
        ↓
Xác nhận phiếu → _applyReceiptToStock
        ↓
product.stock += line.qty  (stock > 0 sau khi cộng)
product.status = 'active'  (tự động kích hoạt lại)
        ↓
Sản phẩm hiển thị "Đang bán" trong quản lý sản phẩm
Sản phẩm hiển thị trên storefront
```

---

## 5. Giao diện người dùng

### 5.1 Bố cục chung

```
┌─────────────────────────────────────────────────────────────┐
│  [📦 Tồn kho]  [📋 Phiếu nhập]  [🔔 Ngưỡng cảnh báo]      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Nội dung tab hiện tại]                                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 Màn hình Tab Tồn kho

```
┌──────────────────────────────────────────────────────────────────┐
│  📦 Tồn kho | 📋 Phiếu nhập | 🔔 Ngưỡng cảnh báo              │
├──────────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │ 🔵 125  │  │ 🟢 3.400 │  │ 🟡 18   │  │ 🔴 5    │        │
│  │ Mặt hàng│  │ Tổng tồn │  │ Sắp hết  │  │ Hết hàng │        │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │
│  Tổng giá trị tồn kho: 485.200.000 ₫                           │
├──────────────────────────────────────────────────────────────────┤
│  [🔍 Tìm sản phẩm...]  [Tất cả(125)] [Sắp hết🟡(18)] [Hết🔴(5)]│
├──────────────────────────────────────────────────────────────────┤
│  Loại  │ Tên sản phẩm     │ Tồn kho   │ Ngưỡng │ Giá bán │ ... │
│ ─────────────────────────────────────────────────────────────── │
│ [Sách] │ Toán lớp 9 tập 1 │ 🟡 5 ████░│  10    │ 45.000  │ ... │
│        │                  │ ▓▓░░░░░░  │        │         │[Nhập]│
│ [VPP]  │ Bút bi Thiên Long│ 🔴 0 ░░░░░│  20    │ 5.000   │[Nhập]│
│ [TB]   │ Compa toán học   │ 🟢 45 ████│  5     │ 35.000  │      │
└──────────────────────────────────────────────────────────────────┘
```

### 5.3 Màn hình Danh sách Phiếu nhập

```
┌─────────────────────────────────────────────────────────────────┐
│  📦 Tồn kho | [📋 Phiếu nhập] | 🔔 Ngưỡng cảnh báo           │
├─────────────────────────────────────────────────────────────────┤
│  [+ Tạo phiếu nhập mới]                                        │
├─────────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ PNK-1A2B3C     [Nháp 🔘]                                 │  │
│  │ NCC: Nhà sách Nhân Văn   Ngày tạo: 20/06/2026            │  │
│  │ 3 dòng hàng • Tổng SL: 150 • Tổng giá trị: 3.750.000 ₫  │  │
│  │ [✏️ Sửa]  [✓ Xác nhận]  [🗑️ Xóa]                        │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ PNK-4D5E6F     [Đã xác nhận ✅]                           │  │
│  │ NCC: Công ty TNHH SGK    Ngày xác nhận: 15/06/2026        │  │
│  │ 5 dòng hàng • Tổng SL: 500 • Tổng giá trị: 12.500.000 ₫  │  │
│  │ (không có hành động)                                      │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 5.4 Màn hình Form Phiếu nhập

```
┌─────────────────────────────────────────────────────────────────┐
│  📦 Tồn kho | [📋 Phiếu nhập] | 🔔 Ngưỡng cảnh báo           │
├─────────────────────────────────────────────────────────────────┤
│  ← Quay lại danh sách                                          │
│  Tạo phiếu nhập kho mới                                        │
├─────────────────────────────────────────────────────────────────┤
│  Nhà cung cấp *: [________________________]                     │
│  Ghi chú:        [________________________]                     │
├─────────────────────────────────────────────────────────────────┤
│  Thêm sản phẩm: [Chọn sản phẩm... ▼]                          │
├─────────────────────────────────────────────────────────────────┤
│  Sản phẩm           │ ĐVT  │  SL  │  Đơn giá nhập  │  Thành tiền │ X │
│ ──────────────────────────────────────────────────────────────  │
│  [Sách] Toán lớp 9  │ Cuốn │ [50] │   [25.000]     │  1.250.000  │ ✕ │
│  [VPP] Bút bi xanh  │ Cái  │ [100]│   [3.500]      │    350.000  │ ✕ │
├─────────────────────────────────────────────────────────────────┤
│  Tổng SL: 150 sản phẩm     Tổng giá trị: 1.600.000 ₫          │
│                    [Lưu nháp]  [✓ Xác nhận nhập kho]           │
└─────────────────────────────────────────────────────────────────┘
```

### 5.5 Màn hình Tab Ngưỡng cảnh báo

```
┌─────────────────────────────────────────────────────────────────┐
│  📦 Tồn kho | 📋 Phiếu nhập | [🔔 Ngưỡng cảnh báo]           │
├─────────────────────────────────────────────────────────────────┤
│  ℹ️ Khi tồn kho ≤ ngưỡng, hệ thống tự động gửi cảnh báo.      │
│                                               [Lưu tất cả]     │
├─────────────────────────────────────────────────────────────────┤
│  Loại  │ Tên sản phẩm       │ Tồn hiện tại │ Ngưỡng cảnh báo │ │
│ ─────────────────────────────────────────────────────────────── │
│ [Sách] │ Toán lớp 9 tập 1   │ 🟡 5         │ [  10  ]        │[Lưu]│
│ [VPP]  │ Bút bi Thiên Long  │ 🔴 0         │ [  20  ]        │[Lưu]│
│ [TB]   │ Compa toán học     │ 🟢 45        │ [   5  ]        │[Lưu]│
└─────────────────────────────────────────────────────────────────┘
```

### 5.6 Quy ước màu sắc

| Trạng thái | Màu hiển thị | Ý nghĩa |
|-----------|-------------|---------|
| Tồn kho đủ (`stock > threshold`) | Xanh lá (`#22c55e`) | Bình thường |
| Sắp hết (`0 < stock ≤ threshold`) | Cam (`#f59e0b`) | Cần chú ý |
| Hết hàng (`stock = 0`) | Đỏ (`#ef4444`) | Cần nhập ngay |
| Badge Sách | Xanh dương | Phân loại |
| Badge VPP | Xanh lá | Phân loại |
| Badge Thiết bị | Tím | Phân loại |

---

## 6. Yêu cầu phi chức năng

### 6.1 Hiệu năng

| Yêu cầu | Chi tiết |
|---------|----------|
| NFR-01 | Tất cả tính toán KPI (tổng tồn, giá trị, sắp hết, hết hàng) được thực hiện phía client, không gọi API bên ngoài |
| NFR-02 | Tìm kiếm và lọc tồn kho phản hồi ngay lập tức (`oninput`), không trễ quan sát được |
| NFR-03 | Cập nhật tồn kho sau khi xác nhận phiếu phải hoàn thành và phản ánh lên giao diện trong vòng 1 giây |
| NFR-04 | Hỗ trợ danh sách tối thiểu 500 sản phẩm mà không làm giảm tốc độ phản hồi |

### 6.2 Tính nhất quán dữ liệu

| Yêu cầu | Chi tiết |
|---------|----------|
| NFR-05 | Phiếu đã xác nhận không được phép sửa hoặc xóa dưới mọi hình thức |
| NFR-06 | Tồn kho không được âm; mọi phép trừ tồn kho phải kiểm tra điều kiện `stock >= qty` |
| NFR-07 | Toàn bộ thay đổi (tồn kho, ngưỡng, phiếu nhập) phải được ghi vào `localStorage` ngay sau khi thực hiện |
| NFR-08 | `_getAllSellerProducts` phải tổng hợp nhất quán từ cả ba nguồn: `products`, `vppProducts`, `tbgdProducts` |

### 6.3 Khả năng sử dụng

| Yêu cầu | Chi tiết |
|---------|----------|
| NFR-09 | Phím tắt "Nhập hàng" từ tab Tồn kho giúp seller không cần điều hướng thủ công nhiều bước |
| NFR-10 | Chỉnh sửa ngưỡng và số lượng/đơn giá trong bảng phải là inline (không mở popup) |
| NFR-11 | Mọi thông báo lỗi (thiếu nhà cung cấp, thiếu đơn giá nhập) phải xuất hiện ngay trên form |

### 6.4 Bảo mật và phân quyền

| Yêu cầu | Chi tiết |
|---------|----------|
| NFR-12 | Chỉ seller sở hữu dữ liệu mới có quyền xem và thao tác; mọi truy cập đều kiểm tra `sIdx` tương ứng với `user.email` |
| NFR-13 | Không có API server; dữ liệu được tách biệt theo `localStorage` key của từng seller |

---

## 7. Tiêu chí chấp nhận

### AC-01: Hiển thị tồn kho

| ID | Điều kiện | Kết quả mong đợi |
|----|-----------|-----------------|
| AC-01.1 | Seller có 3 loại sản phẩm (sách, VPP, thiết bị) | Tab Tồn kho hiển thị tất cả trong một bảng thống nhất với badge loại |
| AC-01.2 | Sản phẩm có `stock = 0` | Hiển thị số lượng màu đỏ, thanh tiến trình đỏ rỗng |
| AC-01.3 | Sản phẩm có `0 < stock <= threshold` | Hiển thị số lượng màu cam, nút "Nhập hàng" xuất hiện |
| AC-01.4 | Seller lọc "Sắp hết" | Chỉ hiển thị sản phẩm thỏa `0 < stock <= threshold` |
| AC-01.5 | Seller tìm kiếm tên sản phẩm | Danh sách lọc real-time không phân biệt hoa thường |
| AC-01.6 | Tính tổng giá trị tồn kho | Giá trị = `sum(stock * price)` cho tất cả sản phẩm |

### AC-02: Phiếu nhập kho

| ID | Điều kiện | Kết quả mong đợi |
|----|-----------|-----------------|
| AC-02.1 | Seller tạo phiếu mới, không nhập nhà cung cấp | Hệ thống báo lỗi, không lưu |
| AC-02.2 | Seller lưu nháp | Phiếu xuất hiện trong danh sách với trạng thái "Nháp"; tồn kho không thay đổi |
| AC-02.3 | Seller xác nhận phiếu có dòng `importPrice = 0` | Hệ thống báo lỗi, không xác nhận |
| AC-02.4 | Seller xác nhận phiếu hợp lệ | Tồn kho mỗi sản phẩm tăng đúng theo `qty`; `confirmedAt` được ghi |
| AC-02.5 | Sản phẩm `outofstock` được nhập qua phiếu xác nhận | `product.status` chuyển về `'active'` |
| AC-02.6 | Seller cố xóa phiếu đã xác nhận | Nút xóa không hiển thị / bị vô hiệu hóa |
| AC-02.7 | Seller sửa phiếu nháp | Dữ liệu cũ được nạp vào form, seller có thể chỉnh sửa và lưu lại |
| AC-02.8 | Mã phiếu nhập kho | Có định dạng `PNK-XXXXXX` (chữ hoa, alphanumeric) |

### AC-03: Ngưỡng cảnh báo

| ID | Điều kiện | Kết quả mong đợi |
|----|-----------|-----------------|
| AC-03.1 | Seller đặt ngưỡng 20 cho sản phẩm đang có `stock = 15` | Hệ thống gửi thông báo cảnh báo tồn kho thấp |
| AC-03.2 | Seller đặt ngưỡng 5 cho sản phẩm đang có `stock = 15` | Không gửi thông báo |
| AC-03.3 | Seller nhấn "Lưu tất cả" | Tất cả ngưỡng được cập nhật; thông báo gửi cho sản phẩm vi phạm điều kiện |
| AC-03.4 | Seller thay đổi ngưỡng | Giá trị được lưu bền vững trong `localStorage` |

---

## 8. Rủi ro và Giải pháp

| # | Rủi ro | Mức độ | Giải pháp |
|---|--------|--------|-----------|
| R-01 | Seller xác nhận phiếu nhập trùng lặp (double-click) | Cao | Vô hiệu hóa nút "Xác nhận" sau khi nhấn lần đầu cho đến khi xử lý xong |
| R-02 | Dữ liệu `localStorage` bị mất hoặc xóa | Trung bình | Cảnh báo seller xuất dữ liệu định kỳ; xem xét thêm tính năng sao lưu/khôi phục |
| R-03 | Đồng bộ tồn kho không khớp giữa phiếu nhập và sản phẩm | Cao | `_applyReceiptToStock` cập nhật nguyên tử trong cùng một lần ghi `localStorage` |
| R-04 | Hiệu năng giảm khi seller có hàng nghìn sản phẩm | Trung bình | Áp dụng phân trang hoặc virtual scrolling trong bảng tồn kho |
| R-05 | Seller nhập `importPrice` âm hoặc `qty` âm | Thấp | Validate `qty > 0` và `importPrice >= 0` ở client trước khi lưu |
| R-06 | Tab Tồn kho không tự làm mới sau khi xác nhận phiếu | Trung bình | Sau khi `_applyReceiptToStock`, gọi lại `render()` để cập nhật giao diện |
| R-07 | Ngưỡng cảnh báo = 0 gây cảnh báo sai khi stock = 0 | Thấp | Bỏ qua kiểm tra ngưỡng nếu `threshold === 0` hoặc `threshold === null` |

---

## 9. Lộ trình phát triển

### 9.1 Trạng thái hiện tại (v1.0 — Đã triển khai)

| Tính năng | Trạng thái |
|-----------|-----------|
| Bảng tồn kho tích hợp 3 loại sản phẩm | ✅ Hoàn thành |
| 4 thẻ KPI + tổng giá trị tồn kho | ✅ Hoàn thành |
| Tìm kiếm và lọc tồn kho | ✅ Hoàn thành |
| Thanh tiến trình tồn kho theo màu | ✅ Hoàn thành |
| Phím tắt "Nhập hàng" từ bảng tồn | ✅ Hoàn thành |
| Phiếu nhập kho (nháp / xác nhận) | ✅ Hoàn thành |
| Áp dụng phiếu vào tồn kho | ✅ Hoàn thành |
| Khôi phục sản phẩm `outofstock` | ✅ Hoàn thành |
| Ngưỡng cảnh báo per-sản phẩm | ✅ Hoàn thành |
| Thông báo cảnh báo tồn kho thấp | ✅ Hoàn thành |

### 9.2 Kế hoạch v1.1 (Ngắn hạn)

| Tính năng | Ưu tiên | Mô tả |
|-----------|---------|-------|
| Lịch sử thay đổi tồn kho | P1 | Log mỗi lần nhập hàng/bán hàng ảnh hưởng tồn kho |
| Xuất phiếu nhập ra PDF/Excel | P1 | Cho phép seller in phiếu nhập kho |
| Phân trang bảng tồn kho | P2 | Giải quyết vấn đề hiệu năng khi có nhiều sản phẩm |
| Bộ lọc theo loại sản phẩm | P2 | Thêm filter Sách/VPP/Thiết bị trong tab Tồn kho |
| Tìm kiếm phiếu nhập kho | P2 | Tìm theo mã phiếu, nhà cung cấp, ngày tạo |

### 9.3 Kế hoạch v2.0 (Dài hạn)

| Tính năng | Mô tả |
|-----------|-------|
| Quản lý nhà cung cấp | Module riêng lưu danh sách nhà cung cấp, tái sử dụng trong phiếu nhập |
| Dự báo tồn kho | Dựa trên tốc độ bán hàng trung bình, dự báo ngày hết hàng |
| Nhập hàng định kỳ tự động | Tạo đề xuất phiếu nhập tự động khi tồn kho xuống dưới ngưỡng |
| Đồng bộ kho thời gian thực | Tích hợp với hệ thống đặt hàng để trừ tồn kho ngay khi có đơn hàng mới |
| Phân tích ABC | Phân loại sản phẩm theo giá trị tồn kho để ưu tiên quản lý |
| Kiểm kê kho định kỳ | Module điều chỉnh tồn kho thực tế so với số liệu hệ thống |

---

*Tài liệu này mô tả đặc tả yêu cầu phiên bản 1.0 của module Quản lý Kho hàng trong phân hệ Người bán EduMart. Mọi thay đổi yêu cầu phải được cập nhật vào tài liệu này và tăng số phiên bản tương ứng.*
