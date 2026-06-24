# Yêu cầu chức năng: Quản lý Văn phòng phẩm — Phân hệ Người bán/Nhà cung cấp

**Phiên bản:** 1.0
**Ngày cập nhật:** 2026-06-24
**Trạng thái:** Đã triển khai (Production)
**Tác giả:** EduMart Engineering

---

## 1. Tổng quan

### 1.1 Mục đích

Module quản lý Văn phòng phẩm (VPP) cho phép seller đăng bán và quản lý các sản phẩm văn phòng phẩm trên nền tảng EduMart. Seller có thể tạo mới, chỉnh sửa thông tin sản phẩm, quản lý tồn kho, nhập hàng bổ sung, và theo dõi cảnh báo hết hàng cho toàn bộ danh mục văn phòng phẩm của gian hàng.

### 1.2 Phạm vi

| Màn hình | Route (`acctTab`) | Chức năng |
|----------|-------------------|-----------|
| Danh sách VPP | `seller-vpp` | Xem, tìm kiếm, lọc, nhập hàng, xóa sản phẩm |
| Form VPP | `seller-vpp-form` | Thêm mới / chỉnh sửa sản phẩm VPP |

### 1.3 Diễn viên (Actors)

| Diễn viên | Mô tả |
|-----------|-------|
| Seller đã được duyệt | Tài khoản seller có `status === 'approved'` — có toàn quyền trên module VPP |
| Seller chưa được duyệt | Bị chuyển hướng sang trang `sellerAppStatus()` — không truy cập được |

### 1.4 Điều kiện tiên quyết

- Người dùng đã đăng nhập (`user` khác `null`).
- Tài khoản seller tồn tại trong mảng `activeSellers` với `email === user.email`.
- Biến `isApproved` phải là `true` (seller đã được admin duyệt).
- Dữ liệu sản phẩm được lưu trữ tại `activeSellers[idx].vppProducts` (mảng) và persist vào `localStorage` thông qua khóa `edumart_activeSellers`.

---

## 2. Yêu cầu chức năng

### FR-01: Hiển thị danh sách sản phẩm VPP

**Màn hình:** `seller-vpp` — hàm `sellerVppList()`

#### FR-01.1 Tải dữ liệu

- Đọc `activeSellers.find(x => x.email === user.email)` để lấy đối tượng seller hiện tại.
- Nếu không tìm thấy seller: hiển thị thông báo "Không tìm thấy tài khoản."
- Danh sách sản phẩm lấy từ `seller.vppProducts || []`.

#### FR-01.2 Thanh thống kê tóm tắt

Phần header hiển thị tổng quan nhanh:

| Chỉ số | Công thức |
|--------|-----------|
| Tổng sản phẩm | `all.length` |
| Đang bán | `all.filter(v => v.status === 'active').length` |
| Nháp | `all.filter(v => v.status === 'draft').length` |
| Hết hàng | `all.filter(v => v.stock === 0).length` |

#### FR-01.3 Bộ lọc trạng thái (Filter Tabs)

| Tab | Điều kiện lọc | Biến trạng thái |
|-----|---------------|-----------------|
| Tất cả | Không lọc | `sellerVppStatusFilter = 'all'` |
| Đang bán | `v.status === 'active'` | `sellerVppStatusFilter = 'active'` |
| Nháp | `v.status === 'draft'` | `sellerVppStatusFilter = 'draft'` |
| Hết hàng | `v.stock === 0` | `sellerVppStatusFilter = 'outofstock'` |

Mỗi tab hiển thị số lượng sản phẩm tương ứng trong ngoặc đơn. Tab đang được chọn được tô nền màu `var(--ink)` (tối).

#### FR-01.4 Tìm kiếm theo tên và thương hiệu

- Ô tìm kiếm: placeholder `"Tìm theo tên, thương hiệu..."`, giá trị liên kết với biến `sellerVppSearch`.
- Tìm kiếm **không phân biệt hoa thường** (`toLowerCase()`), áp dụng đồng thời trên trường `name` và `brand`.
- Kết quả cập nhật **tức thời** khi gõ (`oninput`), không cần nhấn Enter.
- Bộ tìm kiếm được áp dụng trước bộ lọc trạng thái.

#### FR-01.5 Cột bảng danh sách

Bảng có 7 cột:

| Cột | Nội dung |
|-----|----------|
| (Icon) | Icon emoji theo danh mục: ✏️ Bút viết, 📋 Giấy & Vở, 📎 Kẹp & Bìa, 🖊️ Bảng & Phấn, ✂️ Cắt & Dán, 🖨️ Mực & Băng keo, 📦 Khác |
| Sản phẩm | Tên sản phẩm (đậm) + dòng phụ: thương hiệu · danh mục badge · đơn vị tính |
| Giá | Giá bán (màu coral/đỏ); nếu có `oldPrice > 0` hiển thị giá gốc gạch ngang + badge phần trăm giảm |
| Tồn kho | Số lượng tồn (màu đỏ/cam/xanh theo ngưỡng) + icon ⚠ nếu sắp hết + hiển thị ngưỡng cảnh báo |
| Đã bán | `v.sold` — số sản phẩm đã bán |
| Trạng thái | Badge: Đang bán (xanh lá) / Nháp (xám) / Hết hàng (cam) |
| Hành động | Nút ✏ Sửa, nút 📦 Nhập hàng, nút 🗑 Xóa |

#### FR-01.6 Màu sắc tồn kho

```
v.stock === 0                   → màu đỏ   (#e74c3c)
v.stock > 0 && stock <= thr     → màu cam   (#e67e22)  [+ icon ⚠]
v.stock > thr                   → màu xanh  (#27ae60)
```

Trong đó `thr = v.lowStockThreshold || VPP_LOW_DEFAULT` (mặc định `VPP_LOW_DEFAULT = 10`).

#### FR-01.7 Trạng thái rỗng

Khi không có sản phẩm nào thỏa điều kiện lọc/tìm kiếm, hiển thị một dòng span toàn bảng:
`"Không tìm thấy sản phẩm VPP nào."`

---

### FR-02: Banner cảnh báo sắp hết hàng

**Điều kiện hiển thị:** Có ít nhất một sản phẩm thỏa mãn đồng thời cả ba điều kiện:
```
v.stock > 0
v.stock <= (v.lowStockThreshold || VPP_LOW_DEFAULT)
v.status === 'active'
```

**Nội dung banner:**
- Nền vàng nhạt (`#fff8e1`), viền vàng (`#ffe082`).
- Icon ⚠️ + tiêu đề: `"N sản phẩm sắp hết hàng:"`.
- Danh sách các sản phẩm: `"Tên sản phẩm (còn X đơn vị)"`, phân cách bằng dấu ` · `.
- Banner xuất hiện phía trên bộ lọc và bảng danh sách.

---

### FR-03: Nhập hàng nhanh (Inline Restock)

**Hàm:** `doSellerToggleVppRestock(id)`, `doSellerRestockVpp(id)`, `_sellerVppRestockInline(v)`

#### FR-03.1 Mở/đóng form nhập hàng

- Nhấn nút 📦 trên bất kỳ sản phẩm nào: gán `sellerRestockVppId = v.id`, re-render.
- Nhấn lần nữa (cùng sản phẩm): gán `sellerRestockVppId = null`, đóng form.
- Chỉ một form nhập hàng được mở tại một thời điểm.

#### FR-03.2 Giao diện form nhập hàng inline

Form hiện ra ngay bên dưới dòng sản phẩm trong bảng (colspan=7), nền cam nhạt (`#fff9f0`):

| Trường | Loại | Ghi chú |
|--------|------|---------|
| Số lượng nhập | `number`, min=1 | Bắt buộc, id: `vrsQty_{id}` |
| Lý do nhập hàng | `text` | Tùy chọn, mặc định `"Nhập hàng"`, id: `vrsReason_{id}` |

Hiển thị tồn kho hiện tại: `"Tồn hiện tại: X đơn_vị"`.

#### FR-03.3 Xác nhận nhập hàng — `doSellerRestockVpp(id)`

Validation:
- `qty <= 0` hoặc rỗng → toast lỗi `"Vui lòng nhập số lượng nhập hàng hợp lệ."`, dừng lại.

Khi hợp lệ:
1. `v.stock += qty`
2. `v.restockHistory.push({ qty, reason, date: todayStr() })`
3. Nếu `v.status === 'outofstock'` → tự động chuyển `v.status = 'active'`
4. `v.updatedAt = todayStr()`
5. `saveActiveSellers()` — lưu vào `localStorage` (`edumart_activeSellers`)
6. `sellerRestockVppId = null` — đóng form
7. Toast: `"✓ Đã nhập thêm X đơn_vị — tồn kho mới: Y"`
8. Thông báo nội bộ: `addNotif('Nhập hàng thành công: +X "Tên sản phẩm" — tồn kho: Y')`

---

### FR-04: Xóa sản phẩm VPP

**Hàm:** `doSellerDeleteVpp(id)`

1. Hiển thị hộp thoại xác nhận: `"Xóa sản phẩm này? Hành động không thể hoàn tác."`
2. Nếu hủy: không thực hiện gì.
3. Nếu đồng ý:
   - Xóa phần tử khỏi `activeSellers[sIdx].vppProducts` bằng `splice(pIdx, 1)`.
   - `saveActiveSellers()`
   - Nếu `sellerRestockVppId === id`: reset về `null`.
   - Toast: `"Đã xóa: Tên sản phẩm"`
   - Re-render danh sách.

---

### FR-05: Form thêm mới / chỉnh sửa VPP

**Màn hình:** `seller-vpp-form` — hàm `sellerVppForm(vppId)`

#### FR-05.1 Chế độ hoạt động

| Chế độ | Điều kiện | Tiêu đề |
|--------|-----------|---------|
| Thêm mới | `sellerEditVppId === null` | "Thêm VPP mới" |
| Chỉnh sửa | `sellerEditVppId` có giá trị hợp lệ | "Chỉnh sửa VPP" |

Khi chỉnh sửa: form được điền sẵn giá trị từ đối tượng sản phẩm tương ứng.

#### FR-05.2 Phần 1 — Thông tin cơ bản

| Trường | ID phần tử | Bắt buộc | Loại | Ghi chú |
|--------|-----------|----------|------|---------|
| Tên sản phẩm | `vf-name` | Có | `input[text]` | Placeholder: "Bút bi Thiên Long TL-027" |
| Thương hiệu | `vf-brand` | Không | `input[text]` | Placeholder: "Thiên Long, Hồng Hà..." |
| Đơn vị tính | `vf-unit` | Có | `select` | Các lựa chọn từ `VPP_UNITS` |
| Danh mục | `vf-cat` | Có | `select` | Các lựa chọn từ `VPP_CAT` |
| Mô tả sản phẩm | `vf-desc` | Không | `textarea` | 3 dòng, resize dọc |

**`VPP_UNITS`** (mảng hằng số):
```
['Cái', 'Cây', 'Quyển', 'Hộp', 'Bộ', 'Tập', 'Cuộn']
```

**`VPP_CAT`** (mảng hằng số):
```javascript
[
  { k: 'viet', lbl: 'Bút viết' },
  { k: 'giay', lbl: 'Giấy & Vở' },
  { k: 'giam', lbl: 'Kẹp & Bìa hồ sơ' },
  { k: 'bang', lbl: 'Bảng & Phấn' },
  { k: 'cat',  lbl: 'Cắt & Dán' },
  { k: 'muc',  lbl: 'Mực & Băng keo' },
  { k: 'khac', lbl: 'Khác' }
]
```

#### FR-05.3 Phần 2 — Giá bán

| Trường | ID phần tử | Bắt buộc | Loại | Ghi chú |
|--------|-----------|----------|------|---------|
| Giá bán (đ) | `vf-price` | Có | `number`, min=0, step=100 | Phải > 0 |
| Giá gốc (đ) | `vf-oldprice` | Không | `number`, min=0, step=100 | Để trống nếu không có khuyến mãi |

Khi `oldPrice > 0` và `price < oldPrice`: phần trăm giảm giá được tính và hiển thị trong danh sách:
```
disc = Math.round((1 - price / oldPrice) * 100)
```

#### FR-05.4 Phần 3 — Kho hàng

| Trường | ID phần tử | Bắt buộc | Loại | Ghi chú |
|--------|-----------|----------|------|---------|
| Số lượng tồn kho | `vf-stock` | Có | `number`, min=0 | Không được âm |
| Ngưỡng cảnh báo hết hàng | `vf-low` | Không | `number`, min=0 | Mặc định: `VPP_LOW_DEFAULT = 10` |

#### FR-05.5 Phần 4 — Ảnh sản phẩm

- Hiển thị 3 ô upload ảnh (demo).
- Khi chỉnh sửa: ô có chỉ số `i <= v.imageCount` hiển thị icon 🖼️ và nhãn "Ảnh i" (nền xanh nhạt).
- Khi thêm mới hoặc chưa có ảnh: ô hiển thị icon "+" và nhãn "Thêm ảnh" (viền nét đứt).
- Click vào ô: toast thông báo `"Demo: upload ảnh sẽ tích hợp với server thực tế."`
- Ô nhập số lượng ảnh (demo): id `vf-imgcnt`, min=0, max=10, mặc định 1.

#### FR-05.6 Phần 5 — Trạng thái

Radio button 3 lựa chọn, tên group `vfStatus`:

| Giá trị | Nhãn | Màu |
|---------|------|-----|
| `active` | Đang bán | `#27ae60` (xanh lá) |
| `draft` | Nháp | `#7f8c8d` (xám) |
| `outofstock` | Hết hàng | `#e67e22` (cam) |

Mặc định khi tạo mới: `active` được chọn sẵn.

**Lưu ý quan trọng về trạng thái tự động:**
Trong `doSellerSaveVpp()`, nếu seller chọn `active` nhưng `stock === 0`, hệ thống tự động gán `status = 'outofstock'`:
```javascript
const status = stock === 0 && rawStatus === 'active' ? 'outofstock' : rawStatus;
```

---

### FR-06: Lưu sản phẩm VPP

**Hàm:** `doSellerSaveVpp(vppId)`

#### FR-06.1 Validation

| Trường | Điều kiện lỗi | Toast lỗi |
|--------|---------------|-----------|
| Tên sản phẩm | Rỗng hoặc chỉ có khoảng trắng | `"Vui lòng nhập tên sản phẩm."` |
| Giá bán | `price <= 0` | `"Vui lòng nhập giá bán hợp lệ (lớn hơn 0)."` |

#### FR-06.2 Chế độ tạo mới (`vppId === null`)

Thêm đối tượng mới vào **đầu mảng** (`unshift`) với cấu trúc:
```javascript
{
  id: 'svp-' + Date.now().toString(36),
  name, brand, unit, category, desc,
  price, oldPrice, stock, lowStockThreshold,
  sold: 0,
  rating: 0,
  ratingCount: 0,
  imageCount,
  status,
  createdAt: today,
  updatedAt: today,
  restockHistory: []
}
```

Sau khi tạo:
- `addNotif('VPP mới "Tên" đã được thêm vào gian hàng.')`
- Toast: `"✓ Đã thêm sản phẩm VPP mới!"`

#### FR-06.3 Chế độ chỉnh sửa (`vppId` có giá trị)

Cập nhật (spread merge) đối tượng hiện có, chỉ ghi đè các trường:
```javascript
{ ...old, name, brand, unit, category, desc,
  price, oldPrice, stock, lowStockThreshold,
  imageCount, status, updatedAt: today }
```

Các trường bất biến khi chỉnh sửa: `id`, `sold`, `rating`, `ratingCount`, `createdAt`, `restockHistory`.

Sau khi cập nhật:
- Toast: `"✓ Đã cập nhật sản phẩm VPP!"`

#### FR-06.4 Sau khi lưu (cả hai chế độ)

1. `saveActiveSellers()` — ghi vào `localStorage` key `edumart_activeSellers`
2. `acctTab = 'seller-vpp'` — chuyển về màn hình danh sách
3. `sellerEditVppId = null` — reset biến edit
4. `renderAccount()` — re-render giao diện

---

### FR-07: Điều hướng

| Hành động | Kết quả |
|-----------|---------|
| Nhấn "← Danh sách" (trong form) | `acctTab = 'seller-vpp'`, `sellerEditVppId = null`, `renderAccount()` |
| Nhấn "Hủy" (trong form) | Giống như "← Danh sách" |
| Nhấn "✏ Sửa" (trong danh sách) | `sellerEditVppId = v.id`, `acctTab = 'seller-vpp-form'`, `renderAccount()` |
| Nhấn "+ Thêm VPP mới" | `sellerEditVppId = null`, `sellerVppSearch = ''`, `acctTab = 'seller-vpp-form'`, `renderAccount()` |

**Lưu ý:** Nhấn "+ Thêm VPP mới" sẽ reset ô tìm kiếm về rỗng.

---

### FR-08: Tích hợp với Quản lý Kho (`sellerWarehouse`)

Sản phẩm VPP được hiển thị cùng với sách giấy và thiết bị giáo dục trong trang Quản lý Kho tổng hợp:

```javascript
(s.vppProducts || []).forEach(p => rows.push({
  id: p.id, type: 'vpp', typeLabel: 'VPP',
  name: p.name, unit: p.unit || 'Cái',
  stock: p.stock,
  lowStockThreshold: p.lowStockThreshold || 10,
  status: p.status,
  price: p.price,
  sold: p.sold || 0
}));
```

- Ngưỡng mặc định khi hiển thị ở Warehouse: `10`.
- Khi nhập hàng từ trang Warehouse (qua đơn nhập): `v.stock += ln.qty`; nếu `status === 'outofstock'` → tự động chuyển sang `'active'`.

---

### FR-09: Tích hợp với module Khuyến mãi và Đơn hàng

Sản phẩm VPP xuất hiện trong danh sách sản phẩm chọn khi tạo chương trình khuyến mãi:
```javascript
(s.vppProducts || []).forEach(p =>
  allProds.push({ id: p.id, name: p.name, price: p.price, t: 'VPP' })
);
```

Sản phẩm VPP cũng được lập chỉ mục trong `prodMap` để tra cứu tên khi hiển thị chi tiết đơn hàng.

---

## 3. Mô hình dữ liệu

### 3.1 Đối tượng sản phẩm VPP (`VppProduct`)

```javascript
{
  // Định danh
  id:               String,   // "svp-" + Date.now().toString(36) | "svp-001"
  
  // Thông tin cơ bản
  name:             String,   // Tên sản phẩm (bắt buộc)
  brand:            String,   // Thương hiệu (tùy chọn)
  category:         String,   // Khóa danh mục: 'viet'|'giay'|'giam'|'bang'|'cat'|'muc'|'khac'
  unit:             String,   // Đơn vị tính: 'Cái'|'Cây'|'Quyển'|'Hộp'|'Bộ'|'Tập'|'Cuộn'
  desc:             String,   // Mô tả sản phẩm (tùy chọn)
  
  // Giá cả
  price:            Number,   // Giá bán hiện tại (đồng) — bắt buộc, > 0
  oldPrice:         Number,   // Giá gốc trước khuyến mãi (0 nếu không có)
  
  // Kho hàng
  stock:            Number,   // Số lượng tồn kho hiện tại (>= 0)
  lowStockThreshold: Number,  // Ngưỡng cảnh báo, mặc định VPP_LOW_DEFAULT = 10
  
  // Thống kê
  sold:             Number,   // Tổng số đã bán
  rating:           Number,   // Điểm đánh giá trung bình (0–5)
  ratingCount:      Number,   // Số lượt đánh giá
  
  // Media
  imageCount:       Number,   // Số ảnh sản phẩm (demo, 0–10)
  
  // Trạng thái
  status:           String,   // 'active' | 'draft' | 'outofstock'
  
  // Thời gian
  createdAt:        String,   // Ngày tạo "DD/MM/YYYY" từ todayStr()
  updatedAt:        String,   // Ngày cập nhật cuối "DD/MM/YYYY"
  
  // Lịch sử nhập kho
  restockHistory:   Array<{
    qty:    Number,   // Số lượng nhập
    reason: String,   // Lý do nhập hàng
    date:   String    // Ngày nhập "DD/MM/YYYY"
  }>
}
```

### 3.2 Hằng số danh mục và đơn vị

```javascript
const VPP_CAT = [
  { k: 'viet', lbl: 'Bút viết' },
  { k: 'giay', lbl: 'Giấy & Vở' },
  { k: 'giam', lbl: 'Kẹp & Bìa hồ sơ' },
  { k: 'bang', lbl: 'Bảng & Phấn' },
  { k: 'cat',  lbl: 'Cắt & Dán' },
  { k: 'muc',  lbl: 'Mực & Băng keo' },
  { k: 'khac', lbl: 'Khác' }
];

const VPP_UNITS = ['Cái', 'Cây', 'Quyển', 'Hộp', 'Bộ', 'Tập', 'Cuộn'];

const VPP_LOW_DEFAULT = 10; // Ngưỡng cảnh báo hết hàng mặc định
```

### 3.3 Biến trạng thái UI

```javascript
let sellerEditVppId    = null;   // ID sản phẩm đang chỉnh sửa (null = thêm mới)
let sellerVppSearch    = '';     // Từ khóa tìm kiếm hiện tại
let sellerVppStatusFilter = 'all'; // Tab lọc: 'all'|'active'|'draft'|'outofstock'
let sellerRestockVppId = null;   // ID sản phẩm đang mở form nhập hàng inline
```

### 3.4 Persistence

Tất cả dữ liệu sản phẩm VPP được lưu thông qua:
```javascript
function saveActiveSellers() {
  LS.set('activeSellers', activeSellers);
  // tương đương: localStorage.setItem('edumart_activeSellers', JSON.stringify(activeSellers))
}
```

Khóa localStorage: `edumart_activeSellers`

---

## 4. Luồng hoạt động

### 4.1 Luồng xem và lọc danh sách

```
Seller truy cập [Văn phòng phẩm]
           │
           ▼
    acctTab = 'seller-vpp'
           │
           ▼
    sellerVppList() được gọi
           │
           ├─► Tìm seller theo email trong activeSellers
           │         │
           │    Không tìm thấy → Thông báo lỗi
           │         │
           │    Tìm thấy → Lấy vppProducts[]
           │
           ├─► Áp dụng sellerVppSearch (nếu có)
           │       Lọc theo name + brand
           │
           ├─► Áp dụng sellerVppStatusFilter
           │       'all'         → Không lọc
           │       'active'      → status === 'active'
           │       'draft'       → status === 'draft'
           │       'outofstock'  → stock === 0
           │
           ├─► Tính toán thống kê (total, active, draft, out)
           │
           ├─► Phát hiện sản phẩm sắp hết hàng → Banner ⚠️
           │
           └─► Render bảng danh sách + tabs + ô tìm kiếm
```

### 4.2 Luồng thêm sản phẩm mới

```
Nhấn [+ Thêm VPP mới]
           │
           ▼
  sellerEditVppId = null
  sellerVppSearch = ''
  acctTab = 'seller-vpp-form'
           │
           ▼
  sellerVppForm(null) — Hiển thị form trống
           │
  Seller điền form (5 phần)
           │
           ▼
  Nhấn [+ Thêm sản phẩm]
           │
           ▼
  doSellerSaveVpp(null)
           │
           ├─ Validation: name rỗng? → Toast lỗi, dừng
           ├─ Validation: price <= 0? → Toast lỗi, dừng
           │
           ▼
  Logic tự động trạng thái:
  stock === 0 && chọn 'active' → gán 'outofstock'
           │
           ▼
  vppProducts.unshift({ id: 'svp-'+timestamp, ...data,
                        sold: 0, rating: 0, ratingCount: 0,
                        createdAt: today, restockHistory: [] })
           │
           ▼
  saveActiveSellers() → localStorage
           │
           ▼
  addNotif(...) + toast('✓ Đã thêm...')
           │
           ▼
  acctTab = 'seller-vpp' → renderAccount()
```

### 4.3 Luồng nhập hàng nhanh

```
Nhấn [📦] trên dòng sản phẩm X
           │
           ▼
  doSellerToggleVppRestock(X.id)
           │
           ├─ sellerRestockVppId === X.id? → đặt null (đóng)
           └─ Khác → đặt X.id (mở)
                       │
                       ▼
           Form inline hiện dưới dòng X
           ┌──────────────────────────────────┐
           │ Số lượng nhập: [____]            │
           │ Lý do:         [__________]      │
           │ Tồn hiện tại: 7 Hộp             │
           │ [✓ Xác nhận]  [Hủy]             │
           └──────────────────────────────────┘
                       │
           Nhấn [✓ Xác nhận]
                       │
                       ▼
           doSellerRestockVpp(X.id)
                       │
                       ├─ qty <= 0? → Toast lỗi
                       │
                       ▼
           v.stock += qty
           v.restockHistory.push({qty, reason, date})
           v.status === 'outofstock'? → v.status = 'active'
           v.updatedAt = today
                       │
                       ▼
           saveActiveSellers()
           sellerRestockVppId = null
           Toast + addNotif
           renderAccount()
```

---

## 5. Giao diện người dùng

### 5.1 Màn hình Danh sách VPP

```
┌────────────────────────────────────────────────────────────────────────┐
│  Quản lý Văn phòng phẩm                          [+ Thêm VPP mới]    │
│  5 sản phẩm · 4 đang bán · 0 nháp · 1 hết hàng                       │
├────────────────────────────────────────────────────────────────────────┤
│ ⚠️  1 sản phẩm sắp hết hàng:                                          │
│     Kẹp bướm 19mm (còn 7 Hộp)                                         │
├────────────────────────────────────────────────────────────────────────┤
│ [🔍 Tìm theo tên, thương hiệu...]  [Tất cả(5)] [Đang bán(4)]        │
│                                     [Nháp(0)] [Hết hàng(1)]          │
├──────┬──────────────────────────────┬──────────┬────────┬──────┬──────┤
│      │ Sản phẩm                     │ Giá      │ Tồn   │ Bán  │ TT   │
├──────┼──────────────────────────────┼──────────┼────────┼──────┼──────┤
│  ✏️  │ Bút bi Thiên Long TL-027    │ 4,500đ   │ 240   │ 520  │ Đang │
│      │ Thiên Long · [Bút viết]      │ ~~5,000đ~│ ng:20  │      │ bán  │
│      │ ĐVT: Cây                     │ -10%     │        │      │      │
│      │                              │          │        │      │[✏][📦][🗑]│
├──────┼──────────────────────────────┼──────────┼────────┼──────┼──────┤
│  📋  │ Vở ô ly Hồng Hà 96 trang   │ 8,500đ   │ 185   │ 310  │ Đang │
│      │ Hồng Hà · [Giấy & Vở]      │          │ ng:15  │      │ bán  │
│      │ ĐVT: Quyển                  │          │        │      │      │
│      │                              │          │        │      │[✏][📦][🗑]│
├──────┼──────────────────────────────┼──────────┼────────┼──────┼──────┤
│  📎  │ Kẹp bướm 19mm (Hộp 12 cái) │ 12,000đ  │ 7 ⚠   │ 88   │ Đang │
│      │ Stacom · [Kẹp & Bìa hồ sơ] │ ~~15,000~│ ng:10  │      │ bán  │
│      │ ĐVT: Hộp                    │ -20%     │        │      │      │
│      │                              │          │        │      │[✏][📦][🗑]│
├──────┼──────────────────────────────┼──────────┼────────┼──────┼──────┤
│ [📦 Nhập hàng: Kẹp bướm 19mm                                          ]│
│ [Số lượng: ____] [Lý do: _______________] [✓ Xác nhận] [Hủy]         │
│  Tồn hiện tại: 7 Hộp                                                  │
├──────┼──────────────────────────────┼──────────┼────────┼──────┼──────┤
│  🖨️  │ Băng keo trong 5cm×50m      │ 18,000đ  │   0   │ 145  │ Hết  │
│      │ Tesa · [Mực & Băng keo]     │ ~~22,000~│ ng:8   │      │ hàng │
│      │ ĐVT: Cuộn                   │ -18%     │        │      │      │
└──────┴──────────────────────────────┴──────────┴────────┴──────┴──────┘
```

### 5.2 Màn hình Form Thêm/Chỉnh sửa VPP

```
┌────────────────────────────────────────────────────────────────────┐
│  [← Danh sách]   Thêm VPP mới                                     │
├────────────────────────────────────────────────────────────────────┤
│  ┌─ 1. Thông tin cơ bản ──────────────────────────────────────┐   │
│  │  Tên sản phẩm *                                            │   │
│  │  [________________________________________]                │   │
│  │                                                            │   │
│  │  Thương hiệu           │  Đơn vị tính *                   │   │
│  │  [_________________]   │  [Cái          ▼]                │   │
│  │                                                            │   │
│  │  Danh mục *                                                │   │
│  │  [Bút viết             ▼]                                  │   │
│  │                                                            │   │
│  │  Mô tả sản phẩm                                           │   │
│  │  [___________________________________________________]    │   │
│  │  [___________________________________________________]    │   │
│  │  [___________________________________________________]    │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                    │
│  ┌─ 2. Giá bán ───────────────────────────────────────────────┐   │
│  │  Giá bán (đ) *         │  Giá gốc (đ) (để hiện KM)        │   │
│  │  [_________________]   │  [_________________]              │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                    │
│  ┌─ 3. Kho hàng ──────────────────────────────────────────────┐   │
│  │  Số lượng tồn kho *    │  Ngưỡng cảnh báo (mặc định: 10)  │   │
│  │  [_________________]   │  [10              ]               │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                    │
│  ┌─ 4. Ảnh sản phẩm ──────────────────────────────────────────┐   │
│  │  ┌──────┐  ┌──────┐  ┌──────┐                             │   │
│  │  │  +   │  │  +   │  │  +   │   Số ảnh (demo): [1]       │   │
│  │  │Thêm  │  │Thêm  │  │Thêm  │                             │   │
│  │  │ ảnh  │  │ ảnh  │  │ ảnh  │                             │   │
│  │  └──────┘  └──────┘  └──────┘                             │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                    │
│  ┌─ 5. Trạng thái ────────────────────────────────────────────┐   │
│  │  ◉ Đang bán    ○ Nháp    ○ Hết hàng                       │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                    │
│                              [Hủy]  [+ Thêm sản phẩm]            │
└────────────────────────────────────────────────────────────────────┘
```

### 5.3 Form Chỉnh sửa (chế độ Edit — Phần ảnh đã có ảnh)

```
│  ┌─ 4. Ảnh sản phẩm ──────────────────────────────────────────┐   │
│  │  ┌──────┐  ┌──────┐  ┌──────┐                             │   │
│  │  │ 🖼️  │  │  +   │  │  +   │   Số ảnh (demo): [2]       │   │
│  │  │ Ảnh 1│  │Thêm  │  │Thêm  │                             │   │
│  │  │      │  │ ảnh  │  │ ảnh  │                             │   │
│  │  └──────┘  └──────┘  └──────┘                             │   │
│  └────────────────────────────────────────────────────────────┘   │
```

*(Ô có viền xanh `#27ae60` = đã có ảnh; ô có viền đứt = chưa có ảnh)*

---

## 6. Yêu cầu phi chức năng

### 6.1 Hiệu năng

| Yêu cầu | Mục tiêu |
|---------|----------|
| Thời gian render danh sách | < 100ms với 100 sản phẩm |
| Tìm kiếm real-time | Phản hồi ngay khi gõ (`oninput`), không debounce cần thiết ở quy mô nhỏ |
| Lưu localStorage | < 50ms (dữ liệu JSON < 500KB) |
| Re-render sau nhập hàng | Tức thì sau `saveActiveSellers()` |

### 6.2 Bảo mật và phân quyền

| Yêu cầu | Chi tiết |
|---------|---------|
| Kiểm tra trạng thái seller | `isApproved` phải là `true` — nếu không, chuyển hướng sang `sellerAppStatus()` |
| Phạm vi dữ liệu | Seller chỉ thao tác trên `activeSellers[idx]` của chính mình (lọc theo `email`) |
| Xác nhận xóa | Bắt buộc có hộp thoại `confirm()` trước khi xóa |
| XSS | Tên sản phẩm, thương hiệu, mô tả đều qua `escHtml()` trước khi render |

### 6.3 Trải nghiệm người dùng (UX)

| Yêu cầu | Chi tiết |
|---------|---------|
| Phản hồi tức thì | Toast thông báo thành công/thất bại sau mọi hành động |
| Cảnh báo tồn kho | Banner và màu sắc tự động, không cần cấu hình thêm |
| Nhập hàng inline | Không cần chuyển trang — form hiện ngay trong bảng |
| Tự động trạng thái | Hệ thống tự chuyển sang `outofstock` khi `stock = 0` và `active` được chọn |
| Giữ trạng thái lọc | `sellerVppStatusFilter` và `sellerVppSearch` giữ nguyên khi navigate |
| Responsive | Bảng có `overflow-x: auto`; các grid dùng `flex-wrap: wrap` |
| Form chỉnh sửa | Giá trị hiện tại được điền sẵn, tránh nhập lại từ đầu |

### 6.4 Độ tin cậy dữ liệu

| Yêu cầu | Chi tiết |
|---------|---------|
| Persistence | Dữ liệu được lưu vào `localStorage` sau mỗi thao tác CRUD |
| Khởi tạo an toàn | `s.vppProducts || []` tránh lỗi khi mảng chưa tồn tại |
| Stock không âm | `Math.max(0, parseInt(...))` đảm bảo `stock >= 0` |
| ID duy nhất | `'svp-' + Date.now().toString(36)` tạo ID gần như duy nhất |

---

## 7. Tiêu chí chấp nhận

- **AC-01:** Seller đã được duyệt có thể truy cập màn hình danh sách VPP từ menu điều hướng gian hàng.
- **AC-02:** Seller chưa được duyệt bị chuyển hướng sang trang thông báo chờ duyệt khi cố truy cập.
- **AC-03:** Danh sách hiển thị đúng tất cả sản phẩm VPP của seller hiện tại, không lẫn sản phẩm của seller khác.
- **AC-04:** Tìm kiếm theo tên và thương hiệu hoạt động ngay khi gõ, không phân biệt hoa thường.
- **AC-05:** Bốn tab lọc (Tất cả, Đang bán, Nháp, Hết hàng) hiển thị đúng số lượng và lọc đúng sản phẩm.
- **AC-06:** Banner cảnh báo xuất hiện khi có ít nhất một sản phẩm `active` có `stock <= lowStockThreshold` và `stock > 0`.
- **AC-07:** Tồn kho hiển thị màu xanh (đủ hàng), màu cam + icon ⚠ (sắp hết), màu đỏ (hết hàng).
- **AC-08:** Form nhập hàng inline mở/đóng đúng theo từng sản phẩm; chỉ một form mở tại một thời điểm.
- **AC-09:** Nhập hàng thành công: `stock` tăng đúng số lượng, lịch sử nhập được ghi vào `restockHistory`, trạng thái `outofstock` tự chuyển về `active`.
- **AC-10:** Nhập số lượng <= 0 hoặc rỗng khi nhập hàng: hiển thị toast lỗi, không thực hiện thay đổi.
- **AC-11:** Xóa sản phẩm yêu cầu xác nhận; sau xóa, sản phẩm biến mất khỏi danh sách ngay lập tức.
- **AC-12:** Form thêm mới: tên rỗng hoặc giá <= 0 hiển thị toast lỗi, không lưu.
- **AC-13:** Form thêm mới: sản phẩm mới được thêm vào đầu danh sách với `sold=0`, `rating=0`, `restockHistory=[]`.
- **AC-14:** Form chỉnh sửa: tất cả trường được điền sẵn đúng giá trị hiện tại của sản phẩm.
- **AC-15:** Khi chọn trạng thái `active` nhưng `stock = 0`, hệ thống tự lưu `status = 'outofstock'`.
- **AC-16:** Giảm giá hiển thị đúng: badge `-X%` và giá gốc gạch ngang chỉ khi `oldPrice > 0`.
- **AC-17:** Sau lưu form (cả thêm mới và chỉnh sửa), người dùng được chuyển về trang danh sách.
- **AC-18:** Sản phẩm VPP xuất hiện trong trang Quản lý Kho tổng hợp với `typeLabel: 'VPP'`.
- **AC-19:** Sản phẩm VPP xuất hiện trong danh sách chọn sản phẩm khi tạo chương trình khuyến mãi.
- **AC-20:** Dữ liệu được persist vào `localStorage` (`edumart_activeSellers`) sau mỗi CRUD và nhập hàng.

---

## 8. Rủi ro và Giải pháp

| Rủi ro | Mức độ | Giải pháp hiện tại |
|--------|--------|--------------------|
| Giới hạn dung lượng localStorage (5MB) | Trung bình | Dữ liệu demo nhỏ; cần giám sát khi seller có nhiều sản phẩm và lịch sử nhập hàng dài |
| ID trùng lặp khi tạo nhiều sản phẩm cùng lúc | Thấp | `Date.now().toString(36)` đủ cho môi trường single-user; cần UUID server-side cho đa người dùng |
| Mất dữ liệu khi xóa localStorage | Cao | Hiện không có backup; cần đồng bộ server trong bản production |
| Không có phân trang khi số sản phẩm lớn | Trung bình | Chưa xử lý; toàn bộ danh sách render cùng lúc |
| Upload ảnh thực tế chưa được tích hợp | Cao | Hiện là demo (`imageCount` số nguyên); cần tích hợp file server trong bản production |
| Không có lịch sử chỉnh sửa | Thấp | Chỉ lưu `updatedAt`; không có audit trail chi tiết |
| Xung đột trạng thái `outofstock` | Thấp | Logic tự động gán `outofstock` khi `stock=0` có thể ghi đè ý định của seller chọn thủ công |

---

## 9. Lộ trình phát triển

### P1 — Đã triển khai (hiện tại)

- [x] Danh sách sản phẩm VPP với đầy đủ cột thông tin
- [x] Tìm kiếm real-time theo tên và thương hiệu
- [x] Bộ lọc tab theo trạng thái (Tất cả / Đang bán / Nháp / Hết hàng)
- [x] Banner cảnh báo sắp hết hàng với danh sách sản phẩm cụ thể
- [x] Màu sắc tồn kho động (xanh / cam / đỏ) theo ngưỡng `lowStockThreshold`
- [x] Form thêm mới sản phẩm VPP (5 phần: thông tin, giá, kho, ảnh, trạng thái)
- [x] Form chỉnh sửa sản phẩm VPP với điền sẵn giá trị
- [x] Nhập hàng inline ngay trong bảng danh sách
- [x] Lịch sử nhập hàng (`restockHistory`) được ghi lại
- [x] Xóa sản phẩm với xác nhận
- [x] Tự động chuyển trạng thái `outofstock` khi `stock = 0`
- [x] Tự động chuyển lại `active` sau khi nhập hàng vào sản phẩm hết hàng
- [x] Hiển thị giá khuyến mãi và phần trăm giảm giá
- [x] Tích hợp với Quản lý Kho tổng hợp
- [x] Tích hợp với module Khuyến mãi (chọn sản phẩm VPP)
- [x] Persist dữ liệu qua `localStorage`
- [x] 7 danh mục sản phẩm với icon emoji riêng biệt
- [x] 7 đơn vị tính chuẩn cho văn phòng phẩm

### P2 — Phát triển tiếp theo (đề xuất)

- [ ] Phân trang danh sách (mỗi trang 20-50 sản phẩm) để xử lý catalog lớn
- [ ] Lọc kết hợp theo danh mục (`VPP_CAT`) song song với lọc trạng thái
- [ ] Upload ảnh thực tế tích hợp với file storage server
- [ ] Xem lịch sử nhập hàng (`restockHistory`) chi tiết trực tiếp trên giao diện
- [ ] Sắp xếp bảng theo cột (giá, tồn kho, đã bán, tên)
- [ ] Nhập hàng hàng loạt qua file CSV/Excel
- [ ] Cảnh báo hết hàng qua email hoặc thông báo đẩy
- [ ] Copy sản phẩm VPP (duplicate để tạo biến thể nhanh)

### P3 — Tầm nhìn dài hạn

- [ ] Đồng bộ dữ liệu lên server — thay thế `localStorage` bằng API calls
- [ ] Quản lý biến thể sản phẩm (màu sắc, kích cỡ) với stock riêng từng biến thể
- [ ] Thống kê doanh thu VPP: biểu đồ doanh thu theo tháng, sản phẩm bán chạy nhất
- [ ] Tích hợp barcode/QR code scan để nhập kho nhanh
- [ ] Quản lý nhà cung cấp (supplier) liên kết với từng sản phẩm VPP
- [ ] Hệ thống đặt hàng tự động khi tồn kho xuống dưới ngưỡng
- [ ] Xuất báo cáo tồn kho ra PDF/Excel
- [ ] So sánh giá với sản phẩm cùng danh mục trên nền tảng
