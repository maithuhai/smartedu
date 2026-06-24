# Yêu cầu chức năng: Quản lý Thiết bị giáo dục — Phân hệ Người bán/Nhà cung cấp

**Phiên bản:** 1.0.0
**Ngày cập nhật:** 24/06/2026
**Trạng thái:** Đã triển khai (Production)
**Module:** `seller-tbgd` / `seller-tbgd-form`

---

## 1. Tổng quan

Module **Quản lý Thiết bị giáo dục (TBGD)** cho phép seller đã được duyệt đăng bán và quản lý các thiết bị phục vụ giáo dục trên nền tảng EduMart. Seller có thể quản lý toàn bộ vòng đời sản phẩm thiết bị: tạo mới, cập nhật thông tin kỹ thuật, theo dõi tồn kho, nhập hàng nhanh và xóa sản phẩm.

Module này là một trong bốn nhóm sản phẩm của gian hàng seller: Sách giấy (`products`), Văn phòng phẩm (`vppProducts`), **Thiết bị giáo dục (`tbgdProducts`)**, và Ebook (`ebooks`).

### 1.1 Phạm vi chức năng

| Chức năng | Tab/Route | Hàm chính |
|-----------|-----------|-----------|
| Danh sách thiết bị | `seller-tbgd` | `sellerTbgdList()` |
| Thêm/sửa thiết bị | `seller-tbgd-form` | `sellerTbgdForm(tbgdId)` |
| Lưu thiết bị | — | `doSellerSaveTbgd(tbgdId)` |
| Xóa thiết bị | — | `doSellerDeleteTbgd(id)` |
| Toggle panel nhập hàng | — | `doSellerToggleTbgdRestock(id)` |
| Xác nhận nhập hàng | — | `doSellerRestockTbgd(id)` |

### 1.2 Tác nhân hệ thống

| Tác nhân | Mô tả |
|----------|-------|
| **Seller đã duyệt** | Người bán có `status === 'approved'` trong hệ thống đăng ký; được quyền truy cập đầy đủ module TBGD |
| **Seller chưa duyệt** | Bị chuyển hướng sang trang `sellerAppStatus()` — không truy cập được module |
| **Hệ thống EduMart** | Đọc/ghi dữ liệu `activeSellers` qua `localStorage` key `'activeSellers'` |

### 1.3 Điều kiện tiên quyết

- Người dùng đã đăng nhập (`user` khác `null`)
- Tài khoản seller tồn tại trong mảng `activeSellers` với `email === user.email`
- Đã vượt qua kiểm tra `isApproved` tại hàm điều phối tab trong `renderAccount()`
- Mảng `s.tbgdProducts` được khởi tạo (mặc định `[]` nếu chưa có)

---

## 2. Yêu cầu chức năng

### FR-01: Hiển thị danh sách thiết bị (`sellerTbgdList`)

#### FR-01.1 Thống kê tổng quan

Tiêu đề trang hiển thị dòng tóm tắt ngay dưới heading:

```
{total} thiết bị · {activeCnt} đang bán · {draftCnt} nháp · {outCnt} hết hàng
```

Các giá trị được tính từ toàn bộ mảng `s.tbgdProducts` (không bị ảnh hưởng bởi bộ lọc đang áp dụng):
- `total` = tổng số phần tử trong mảng
- `activeCnt` = số phần tử có `status === 'active'`
- `draftCnt` = số phần tử có `status === 'draft'`
- `outCnt` = số phần tử có `stock === 0`

#### FR-01.2 Cảnh báo tồn kho thấp (Low-stock banner)

Hiển thị banner cảnh báo màu vàng phía trên bảng khi tồn tại ít nhất một sản phẩm thỏa mãn đồng thời:
- `v.stock > 0` (chưa hết hàng hoàn toàn)
- `v.stock <= (v.lowStockThreshold || TBGD_LOW_DEFAULT)` (dưới ngưỡng cảnh báo)
- `v.status === 'active'`

Hằng số `TBGD_LOW_DEFAULT = 3`.

Banner liệt kê tên và số lượng tồn hiện tại của từng sản phẩm sắp hết, ví dụ:
> **Máy chiếu Optoma X400LVe** (còn 2 Cái) · **Loa hội trường TOA ZA-2120** (còn 1 Bộ)

#### FR-01.3 Tìm kiếm realtime

- Input tìm kiếm cập nhật biến module `sellerTbgdSearch` mỗi keystroke (`oninput`)
- Lọc theo: `v.name` hoặc `v.brand` (so sánh không phân biệt hoa thường `toLowerCase()`)
- Kết quả cập nhật ngay lập tức bằng `renderAccount()`

#### FR-01.4 Bộ lọc tab trạng thái

| Tab key | Nhãn | Điều kiện lọc |
|---------|------|---------------|
| `'all'` | Tất cả | Không lọc |
| `'active'` | Đang bán | `v.status === 'active'` |
| `'draft'` | Nháp | `v.status === 'draft'` |
| `'outofstock'` | Hết hàng | `v.stock === 0` |

Trạng thái tab được lưu trong biến module `sellerTbgdStatusFilter` (mặc định `'all'`).

Tab đang chọn có viền và nền màu `var(--ink)`, chữ trắng. Tab khác có viền nhạt, chữ `var(--text-soft)`.

**Lưu ý logic lọc kép:** Bộ lọc `'outofstock'` kiểm tra `v.stock === 0` (không phụ thuộc `v.status`), trong khi các bộ lọc khác kiểm tra `v.status`. Điều này có nghĩa một sản phẩm `status='active'` nhưng `stock=0` xuất hiện ở cả tab `'active'` lẫn tab `'outofstock'`.

#### FR-01.5 Bảng danh sách sản phẩm

Bảng 8 cột với scroll ngang (`overflow-x: auto`) để tương thích màn hình nhỏ:

| # | Cột | Nội dung |
|---|-----|---------|
| 1 | (icon) | Icon danh mục, nền `#e8f4fd`, kích thước 38×38px, bo tròn 8px |
| 2 | Thiết bị | Tên sản phẩm (đậm), thương hiệu (đậm nhỏ) + tag danh mục + đơn vị tính |
| 3 | Giá | Giá bán màu coral; nếu có `oldPrice > 0`: hiển thị giá gốc gạch ngang + badge phần trăm giảm |
| 4 | Tồn kho | Số lượng tồn với màu: xanh (đủ hàng), cam (sắp hết, biểu tượng ⚠), đỏ (hết); dòng phụ hiển thị ngưỡng |
| 5 | Bảo hành | Badge xanh dương "🛡 X năm" hoặc "🛡 X tháng"; "Không bảo hành" nếu `warrantyMonths === 0`; dòng phụ hiển thị `warrantyNote` (tối đa 60 ký tự + "…") |
| 6 | Đã bán | Số đơn `v.sold`, căn giữa |
| 7 | Trạng thái | Badge màu: xanh (Đang bán), xám (Nháp), cam (Hết hàng) |
| 8 | Hành động | Các nút thao tác nhanh |

**Logic hiển thị badge trạng thái hàng:**

```js
const badge = v.stock === 0 && v.status !== 'draft'
  ? stBadge.outofstock
  : (stBadge[v.status] || stBadge.draft);
```

Sản phẩm `draft` không bao giờ hiển thị badge `outofstock` kể cả khi hết hàng.

**Logic tính phần trăm giảm giá:**

```js
const disc = v.oldPrice > 0 ? Math.round((1 - v.price / v.oldPrice) * 100) : 0;
```

#### FR-01.6 Hành động nhanh mỗi dòng

| Nút | Icon | Chức năng |
|-----|------|-----------|
| Sửa | ✏ | Gán `sellerEditTbgdId = v.id`, chuyển `acctTab = 'seller-tbgd-form'`, gọi `renderAccount()` |
| Nhập hàng | 📦 | Gọi `doSellerToggleTbgdRestock(v.id)` — toggle panel nhập hàng inline |
| Xóa | 🗑 | Gọi `doSellerDeleteTbgd(v.id)` — màu đỏ, viền `#f5c0c0` |

#### FR-01.7 Panel nhập hàng inline

Khi `sellerRestockTbgdId === v.id`, một hàng thứ hai mở rộng xuất hiện ngay dưới dòng sản phẩm (colspan 8), chứa panel `_sellerTbgdRestockInline(v)`:

- Tiêu đề: "📦 Nhập hàng: {tên sản phẩm}"
- Input số lượng nhập (`id="trsQty_{v.id}"`, `type="number"`, `min="1"`)
- Input lý do nhập hàng (`id="trsReason_{v.id}"`, không bắt buộc)
- Thông tin tồn hiện tại: "Tồn hiện tại: **{v.stock}** {v.unit}"
- Nút "✓ Xác nhận" — gọi `doSellerRestockTbgd(v.id)`
- Nút "Hủy" — gán `sellerRestockTbgdId = null`, gọi `renderAccount()`

Chỉ một panel nhập hàng được mở cùng lúc. Click lại nút 📦 trên cùng sản phẩm sẽ đóng panel (toggle).

---

### FR-02: Form thêm/sửa thiết bị (`sellerTbgdForm`)

Form gồm **6 phần** đánh số, mỗi phần trong một card nền `var(--paper-alt)`.

Breadcrumb: nút "← Danh sách" + tiêu đề "Thêm thiết bị mới" (khi tạo) hoặc "Chỉnh sửa thiết bị" (khi sửa).

#### FR-02.1 Phần 1 — Thông tin cơ bản

| Trường | Element ID | Bắt buộc | Ghi chú |
|--------|-----------|----------|---------|
| Tên thiết bị | `tf-name` | Có (*) | Ví dụ: "Máy chiếu Optoma X400LVe" |
| Thương hiệu | `tf-brand` | Không | Ví dụ: Samsung, Optoma, TOA |
| Đơn vị tính | `tf-unit` | Có (*) | Select từ `TBGD_UNITS` |
| Danh mục | `tf-cat` | Có (*) | Select từ `TBGD_CAT` |
| Mô tả sản phẩm | `tf-desc` | Không | Textarea 3 hàng, resize dọc; thông số kỹ thuật, tính năng |

**Danh mục thiết bị (`TBGD_CAT`):**

| Key | Nhãn | Icon |
|-----|------|------|
| `maytinh` | Máy tính / Tablet | 💻 |
| `maychieuvan` | Máy chiếu / Màn chiếu | 📽️ |
| `amthanh` | Âm thanh / Micro | 🔊 |
| `bangbiet` | Bảng & Phụ kiện bảng | 🖊️ |
| `camera` | Camera / Giám sát | 📷 |
| `phukien` | Phụ kiện thiết bị | 🔌 |
| `khac` | Thiết bị khác | 📦 |

**Đơn vị tính (`TBGD_UNITS`):** `['Cái', 'Bộ', 'Chiếc', 'Hộp', 'Cuộn']`

#### FR-02.2 Phần 2 — Giá bán

| Trường | Element ID | Bắt buộc | Ghi chú |
|--------|-----------|----------|---------|
| Giá bán (đ) | `tf-price` | Có (*) | `type="number"`, `min="0"`, `step="1000"`; phải > 0 |
| Giá gốc (đ) | `tf-oldprice` | Không | Để trống nếu không giảm giá; dùng để tính % khuyến mãi |

Khi `oldPrice > 0` và `oldPrice > price`, hệ thống tự tính và hiển thị badge phần trăm giảm trên trang danh sách và trang sản phẩm.

#### FR-02.3 Phần 3 — Kho hàng

| Trường | Element ID | Bắt buộc | Mặc định |
|--------|-----------|----------|---------|
| Số lượng tồn kho | `tf-stock` | Có (*) | — |
| Ngưỡng cảnh báo tồn kho thấp | `tf-low` | Không | `TBGD_LOW_DEFAULT = 3` |

Ngưỡng cảnh báo được dùng để: (1) kích hoạt biểu tượng ⚠ trên hàng danh sách, (2) đưa sản phẩm vào banner cảnh báo. Giá trị tối thiểu 0 (`Math.max(0, ...)`).

#### FR-02.4 Phần 4 — Bảo hành

| Trường | Element ID | Ghi chú |
|--------|-----------|---------|
| Thời hạn bảo hành | `tf-warranty` | Select; tùy chọn: "Không bảo hành" + các mốc theo `TBGD_WARRANTY_OPTS` |
| Ghi chú bảo hành | `tf-warrantynote` | Text input; ví dụ: "Bảo hành tại trung tâm ủy quyền" |

**Tùy chọn thời hạn bảo hành (`TBGD_WARRANTY_OPTS`):** `[3, 6, 12, 18, 24, 36, 48, 60]` tháng

Nhãn hiển thị được format:
- Dưới 12 tháng: "{n} tháng"
- Từ 12 tháng trở lên: "{n} năm" hoặc "{n} năm {m} tháng" (nếu có phần dư)

Ví dụ: 3 → "3 tháng", 12 → "1 năm", 18 → "1 năm 6 tháng", 24 → "2 năm"

Thông tin bảo hành hiển thị trực tiếp trên trang sản phẩm và trong xác nhận đơn hàng của khách.

#### FR-02.5 Phần 5 — Ảnh sản phẩm (Demo)

- 4 ô placeholder 90×90px, viền nét đứt
- Trong chế độ demo: click hiển thị toast "Demo: upload ảnh sẽ tích hợp với server thực tế."
- Ô đã có ảnh (khi `imageCount >= i`) hiển thị icon 🖼️ và nhãn "Ảnh {i}", nền `#e8f4fd`, viền xanh
- Input số ảnh (`id="tf-imgcnt"`, `type="number"`, `min="0"`, `max="10"`) để kiểm soát số ảnh được đếm; mặc định 1

#### FR-02.6 Phần 6 — Trạng thái

Ba lựa chọn radio (`name="tfStatus"`):

| Value | Nhãn | Màu |
|-------|------|-----|
| `active` | Đang bán | `#27ae60` |
| `draft` | Nháp | `#7f8c8d` |
| `outofstock` | Hết hàng | `#e67e22` |

**Mặc định khi tạo mới:** `active`

**Override tự động khi lưu:** Nếu người dùng chọn `active` nhưng `stock === 0`, hệ thống tự gán `status = 'outofstock'`:

```js
const status = stock === 0 && rawStatus === 'active' ? 'outofstock' : rawStatus;
```

#### FR-02.7 Nút thao tác form

- **Hủy**: Chuyển về `acctTab = 'seller-tbgd'`, reset `sellerEditTbgdId = null`
- **+ Thêm thiết bị** (tạo mới) / **💾 Lưu thay đổi** (chỉnh sửa): Gọi `doSellerSaveTbgd(tbgdId)`

---

### FR-03: Lưu thiết bị (`doSellerSaveTbgd`)

#### FR-03.1 Validation phía client

| Điều kiện | Thông báo lỗi |
|-----------|--------------|
| `name` rỗng sau `trim()` | "Vui lòng nhập tên thiết bị." |
| `price <= 0` | "Vui lòng nhập giá bán hợp lệ (lớn hơn 0)." |

Lỗi hiển thị qua `toast()`, hàm trả về ngay (không lưu).

#### FR-03.2 Xử lý tạo mới

Nếu `tbgdId === null`:

```js
activeSellers[sIdx].tbgdProducts.unshift({
  id: 'std-' + Date.now().toString(36),
  name, brand, unit, category, desc,
  price, oldPrice,
  stock, lowStockThreshold,
  warrantyMonths, warrantyNote,
  sold: 0, rating: 0, ratingCount: 0,
  imageCount,
  status,               // đã qua override tự động
  createdAt: today,
  updatedAt: today,
  restockHistory: []
});
```

- Sản phẩm mới được thêm vào **đầu mảng** (`unshift`)
- ID tạo tự động: `'std-' + Date.now().toString(36)` (ví dụ: `'std-m1x3k4a'`)
- Gọi `addNotif('Thiết bị mới "' + name + '" đã được thêm vào gian hàng.')`
- Toast: "✓ Đã thêm thiết bị mới!"

#### FR-03.3 Xử lý chỉnh sửa

Nếu `tbgdId` là chuỗi ID hợp lệ, tìm theo index và patch bằng spread:

```js
activeSellers[sIdx].tbgdProducts[pIdx] = {
  ...old,
  name, brand, unit, category, desc,
  price, oldPrice,
  stock, lowStockThreshold,
  warrantyMonths, warrantyNote,
  imageCount, status,
  updatedAt: today
};
```

Các trường `sold`, `rating`, `ratingCount`, `createdAt`, `restockHistory` được giữ nguyên từ object cũ (`...old`).

Toast: "✓ Đã cập nhật thiết bị!"

#### FR-03.4 Sau khi lưu

1. Gọi `saveActiveSellers()` — ghi vào `localStorage['activeSellers']`
2. Reset `acctTab = 'seller-tbgd'`, `sellerEditTbgdId = null`
3. Gọi `renderAccount()` — quay về danh sách

---

### FR-04: Xóa thiết bị (`doSellerDeleteTbgd`)

1. Hiển thị `confirm('Xóa thiết bị này? Hành động không thể hoàn tác.')` — không thực hiện nếu người dùng hủy
2. Tìm sản phẩm theo `id` trong `activeSellers[sIdx].tbgdProducts`
3. Xóa bằng `splice(pIdx, 1)`
4. Nếu panel nhập hàng đang mở cho sản phẩm này (`sellerRestockTbgdId === id`), reset về `null`
5. Gọi `saveActiveSellers()`
6. Toast: "Đã xóa: {name}"
7. Gọi `renderAccount()`

---

### FR-05: Nhập hàng inline (`doSellerToggleTbgdRestock` + `doSellerRestockTbgd`)

#### FR-05.1 Toggle panel

```js
function doSellerToggleTbgdRestock(id) {
  sellerRestockTbgdId = (sellerRestockTbgdId === id ? null : id);
  renderAccount();
}
```

Chỉ một panel mở cùng lúc. Mở panel mới sẽ tự đóng panel đang mở (vì `sellerRestockTbgdId` là biến đơn).

#### FR-05.2 Xác nhận nhập hàng

Validation:
- `qty` phải là số nguyên dương; nếu không hợp lệ: toast "Vui lòng nhập số lượng nhập hàng hợp lệ."

Khi hợp lệ:
1. `v.stock += qty` — cộng thêm số lượng
2. `v.restockHistory.push({ qty, reason, date: todayStr() })` — ghi lịch sử
3. Nếu `v.status === 'outofstock'` và stock mới > 0: tự chuyển sang `status = 'active'`
4. Cập nhật `v.updatedAt = todayStr()`
5. Gọi `saveActiveSellers()`
6. Reset `sellerRestockTbgdId = null`
7. Toast: "✓ Đã nhập thêm {qty} {v.unit} — tồn kho mới: {v.stock}"
8. `addNotif('Nhập hàng thành công: +{qty} "{v.name}" — tồn kho: {v.stock}')`
9. Gọi `renderAccount()`

---

## 3. Mô hình dữ liệu

### 3.1 Đối tượng thiết bị giáo dục

Mỗi phần tử trong mảng `seller.tbgdProducts`:

```js
{
  // Định danh
  id: String,              // 'std-' + Date.now().toString(36), ví dụ: 'std-m1x3k4a'

  // Thông tin cơ bản
  name: String,            // Bắt buộc. VD: 'Máy tính bảng Samsung Galaxy Tab A8'
  brand: String,           // Không bắt buộc. VD: 'Samsung', 'Optoma'
  category: String,        // Key từ TBGD_CAT: 'maytinh'|'maychieuvan'|'amthanh'|'bangbiet'|'camera'|'phukien'|'khac'
  unit: String,            // Từ TBGD_UNITS: 'Cái'|'Bộ'|'Chiếc'|'Hộp'|'Cuộn'
  desc: String,            // Mô tả / thông số kỹ thuật

  // Giá bán
  price: Number,           // Giá bán hiện tại (VNĐ). Bắt buộc > 0
  oldPrice: Number,        // Giá gốc trước khuyến mãi (0 = không có KM)

  // Kho hàng
  stock: Number,           // Số lượng tồn kho hiện tại (>= 0)
  lowStockThreshold: Number, // Ngưỡng cảnh báo tồn kho thấp (mặc định 3)

  // Bảo hành
  warrantyMonths: Number,  // Thời hạn bảo hành (tháng); 0 = không bảo hành
  warrantyNote: String,    // Ghi chú bảo hành tự do

  // Hiệu suất bán hàng
  sold: Number,            // Số đơn đã bán (chỉ đọc từ hệ thống đơn hàng)
  rating: Number,          // Điểm đánh giá trung bình (0–5)
  ratingCount: Number,     // Số lượng đánh giá

  // Ảnh (demo)
  imageCount: Number,      // Số ảnh đã tải lên (0–10, hiện là demo)

  // Trạng thái
  status: String,          // 'active' | 'draft' | 'outofstock'

  // Thời gian
  createdAt: String,       // 'DD/MM/YYYY'
  updatedAt: String,       // 'DD/MM/YYYY'

  // Lịch sử nhập hàng
  restockHistory: [
    {
      qty: Number,         // Số lượng nhập
      reason: String,      // Lý do nhập (mặc định 'Nhập hàng' nếu để trống)
      date: String         // 'DD/MM/YYYY'
    }
  ]
}
```

### 3.2 Biến trạng thái module (cấp module)

```js
let sellerEditTbgdId = null;       // ID thiết bị đang sửa; null = tạo mới
let sellerTbgdSearch = '';          // Chuỗi tìm kiếm hiện tại
let sellerTbgdStatusFilter = 'all'; // Tab bộ lọc trạng thái đang chọn
let sellerRestockTbgdId = null;     // ID thiết bị đang mở panel nhập hàng
```

### 3.3 Hằng số danh mục và cấu hình

```js
const TBGD_CAT = [
  { k: 'maytinh',     lbl: 'Máy tính / Tablet',    icon: '💻'  },
  { k: 'maychieuvan', lbl: 'Máy chiếu / Màn chiếu', icon: '📽️' },
  { k: 'amthanh',    lbl: 'Âm thanh / Micro',       icon: '🔊' },
  { k: 'bangbiet',   lbl: 'Bảng & Phụ kiện bảng',  icon: '🖊️' },
  { k: 'camera',     lbl: 'Camera / Giám sát',       icon: '📷' },
  { k: 'phukien',    lbl: 'Phụ kiện thiết bị',       icon: '🔌' },
  { k: 'khac',       lbl: 'Thiết bị khác',           icon: '📦' }
];

const TBGD_CAT_MAP = Object.fromEntries(TBGD_CAT.map(c => [c.k, c]));
const TBGD_UNITS = ['Cái', 'Bộ', 'Chiếc', 'Hộp', 'Cuộn'];
const TBGD_LOW_DEFAULT = 3;
const TBGD_WARRANTY_OPTS = [3, 6, 12, 18, 24, 36, 48, 60]; // tháng
```

### 3.4 Lưu trữ dữ liệu

Toàn bộ dữ liệu seller (bao gồm `tbgdProducts`) được lưu vào `localStorage` thông qua:

```js
// Đọc khi khởi tạo
let activeSellers = LS.get('activeSellers', null);

// Ghi sau mỗi thay đổi
function saveActiveSellers() {
  LS.set('activeSellers', activeSellers);
}
```

Key localStorage: `'activeSellers'`

---

## 4. Luồng hoạt động

### 4.1 Luồng điều hướng tổng thể

```
renderAccount()
      |
      v
  isApproved?
   /       \
 Không     Có
  |          |
  v          v
sellerAppStatus()   acctTab === 'seller-tbgd'?
                         /            \
                        Có           Không
                        |              |
                        v              v
               sellerTbgdList()   acctTab === 'seller-tbgd-form'?
                                       /            \
                                      Có           Không
                                      |              |
                                      v              v
                           sellerTbgdForm(           (các tab khác)
                             sellerEditTbgdId)
```

### 4.2 Luồng tạo thiết bị mới

```
[Danh sách] → Nhấn "+ Thêm thiết bị"
      |
      v
sellerEditTbgdId = null
acctTab = 'seller-tbgd-form'
renderAccount()
      |
      v
[Form tạo mới hiển thị — tiêu đề "Thêm thiết bị mới"]
      |
      v
Người dùng điền form → Nhấn "+ Thêm thiết bị"
      |
      v
doSellerSaveTbgd(null)
      |
      +-- Validation lỗi? --> toast() --> DỪNG
      |
      v
Tạo object, unshift vào tbgdProducts
      |
      v
saveActiveSellers()
addNotif("Thiết bị mới...")
toast("✓ Đã thêm thiết bị mới!")
      |
      v
acctTab = 'seller-tbgd', sellerEditTbgdId = null
renderAccount()
      |
      v
[Quay về danh sách — sản phẩm mới ở đầu]
```

### 4.3 Luồng chỉnh sửa thiết bị

```
[Danh sách] → Nhấn ✏ trên dòng sản phẩm
      |
      v
sellerEditTbgdId = v.id
acctTab = 'seller-tbgd-form'
renderAccount()
      |
      v
[Form hiển thị — tiêu đề "Chỉnh sửa thiết bị"]
[Các trường được điền sẵn giá trị hiện tại]
      |
      v
Người dùng thay đổi → Nhấn "💾 Lưu thay đổi"
      |
      v
doSellerSaveTbgd(tbgdId)
      |
      +-- Validation lỗi? --> toast() --> DỪNG
      |
      v
Spread merge {...old, ...newFields}, updatedAt = today
      |
      v
saveActiveSellers()
toast("✓ Đã cập nhật thiết bị!")
      |
      v
Quay về danh sách
```

### 4.4 Luồng nhập hàng inline

```
[Danh sách] → Nhấn 📦 trên dòng sản phẩm
      |
      v
doSellerToggleTbgdRestock(id)
      |
      v
sellerRestockTbgdId === id?
   /        \
  Có        Không
  |           |
  v           v
null        id
renderAccount()
      |
      v (khi panel mở)
[Panel nhập hàng inline xuất hiện dưới dòng sản phẩm]
[Input: số lượng + lý do]
      |
      v
Nhấn "✓ Xác nhận"
      |
      v
doSellerRestockTbgd(id)
      |
      +-- qty <= 0? --> toast lỗi --> DỪNG
      |
      v
v.stock += qty
v.restockHistory.push({qty, reason, date})
      |
      v
status === 'outofstock'? --> chuyển sang 'active'
      |
      v
saveActiveSellers()
sellerRestockTbgdId = null
toast("✓ Đã nhập thêm ...")
addNotif("Nhập hàng thành công ...")
renderAccount()
```

---

## 5. Giao diện người dùng

### 5.1 Trang danh sách thiết bị (`seller-tbgd`)

```
┌─────────────────────────────────────────────────────────────────┐
│  Quản lý Thiết bị giáo dục          [+ Thêm thiết bị]          │
│  5 thiết bị · 3 đang bán · 0 nháp · 1 hết hàng                │
├─────────────────────────────────────────────────────────────────┤
│ ⚠️  2 thiết bị sắp hết hàng:                                   │
│     Loa hội trường TOA ZA-2120 (còn 2 Bộ) · Máy chiếu ...    │
├─────────────────────────────────────────────────────────────────┤
│ [🔍 Tìm theo tên, thương hiệu...]  [Tất cả(5)][Đang bán(3)]  │
│                                     [Nháp(0)]  [Hết hàng(1)]  │
├──┬─────────────────────────┬──────────────┬──────┬─────────────┤
│  │ Thiết bị                │ Giá          │ Tồn  │ Bảo hành   │
├──┼─────────────────────────┼──────────────┼──────┼─────────────┤
│💻│ Máy tính bảng Samsung   │ 6.290.000đ   │ 18   │ 🛡 2 năm   │
│  │ Samsung · Máy tính/Tab  │ ~~7.490.000đ││ngưỡng: 5│          │
│  │ ĐVT: Cái                │ -16%         │      │ Bảo hành   │
│  │                         │              │      │ chính hãng │
├──┼─────────────────────────┼──────────────┼──────┼─────────────┤
│📽│ Máy chiếu Optoma X400LVe│ 14.500.000đ  │  5⚠  │ 🛡 3 năm   │
│  │ Optoma · Máy chiếu/MH  │ ~~16.800.000đ│ngưỡng: 3│          │
├──┼─────────────────────────┼──────────────┼──────┼─────────────┤
│🔊│ Loa hội trường TOA      │ 3.850.000đ   │  2⚠  │ 🛡 12 tháng│
├──┴─────────────────────────┴──────────────┴──────┴─────────────┤
│     Đã bán │ Trạng thái  │ Hành động                           │
│       42   │ [Đang bán]  │ [✏] [📦] [🗑]                       │
│       15   │ [Đang bán]  │ [✏] [📦] [🗑]                       │
│        8   │ [Đang bán]  │ [✏] [📦] [🗑]                       │
│     ─────────────────────────────────────────────────────────── │
│     [Panel nhập hàng inline khi mở 📦]                          │
│     📦 Nhập hàng: Loa hội trường TOA ZA-2120                   │
│     [Số lượng nhập] [Lý do (tùy chọn)] [✓ Xác nhận] [Hủy]    │
│     Tồn hiện tại: 2 Bộ                                         │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Form thêm/sửa thiết bị (`seller-tbgd-form`)

```
┌─────────────────────────────────────────────────────────────────┐
│ [← Danh sách]  Thêm thiết bị mới                               │
├─────────────────────────────────────────────────────────────────┤
│ ┌─ 1. Thông tin cơ bản ────────────────────────────────────┐   │
│ │  Tên thiết bị *                                          │   │
│ │  [                                                      ] │   │
│ │  Thương hiệu            │  Đơn vị tính *                 │   │
│ │  [                    ] │  [Cái ▼                      ]  │   │
│ │  Danh mục *                                              │   │
│ │  [💻 Máy tính / Tablet ▼                              ]   │   │
│ │  Mô tả sản phẩm                                         │   │
│ │  [                                                      ] │   │
│ │  [                                                      ] │   │
│ │  [                                                      ] │   │
│ └──────────────────────────────────────────────────────────┘   │
│ ┌─ 2. Giá bán ─────────────────────────────────────────────┐   │
│ │  Giá bán (đ) *                │  Giá gốc (đ)            │   │
│ │  [                          ] │  [                     ]  │   │
│ └──────────────────────────────────────────────────────────┘   │
│ ┌─ 3. Kho hàng ────────────────────────────────────────────┐   │
│ │  Số lượng tồn kho *           │  Ngưỡng cảnh báo        │   │
│ │  [                          ] │  [3                   ]   │   │
│ └──────────────────────────────────────────────────────────┘   │
│ ┌─ 4. Bảo hành ────────────────────────────────────────────┐   │
│ │  Thời hạn bảo hành            │  Ghi chú bảo hành        │   │
│ │  [Không bảo hành ▼          ] │  [                     ]  │   │
│ │  🛡 Thông tin bảo hành hiển thị trên trang sản phẩm     │   │
│ └──────────────────────────────────────────────────────────┘   │
│ ┌─ 5. Ảnh sản phẩm ────────────────────────────────────────┐   │
│ │  [  +   ] [  +   ] [  +   ] [  +   ]   Số ảnh: [1]      │   │
│ │  Thêm ảnh Thêm ảnh Thêm ảnh Thêm ảnh                    │   │
│ └──────────────────────────────────────────────────────────┘   │
│ ┌─ 6. Trạng thái ──────────────────────────────────────────┐   │
│ │  ( •) Đang bán    ( ) Nháp    ( ) Hết hàng              │   │
│ └──────────────────────────────────────────────────────────┘   │
│                              [Hủy]  [+ Thêm thiết bị]          │
└─────────────────────────────────────────────────────────────────┘
```

### 5.3 Panel nhập hàng inline (mở rộng trong bảng)

```
┌─────────────────────────────────────────────────────────────────┐
│ 📦 Nhập hàng: Máy chiếu Optoma X400LVe                         │
│                                                                  │
│  [Số lượng nhập    ]  [Lý do (tùy chọn)            ]           │
│  [✓ Xác nhận]  [Hủy]                                           │
│                                                                  │
│  Tồn hiện tại: 5 Cái                                           │
└─────────────────────────────────────────────────────────────────┘
```

### 5.4 Banner cảnh báo tồn kho thấp

```
┌──────────────────────────────────────────────────────────────────┐
│ ⚠️  2 thiết bị sắp hết hàng:                                    │
│     Máy chiếu Optoma X400LVe (còn 5 Cái) ·                      │
│     Loa hội trường TOA ZA-2120 (còn 2 Bộ)                       │
└──────────────────────────────────────────────────────────────────┘
```

---

## 6. Yêu cầu phi chức năng

### 6.1 Hiệu năng

| Yêu cầu | Chỉ tiêu |
|---------|---------|
| Thời gian phản hồi tìm kiếm realtime | < 50ms (lọc trong bộ nhớ) |
| Thời gian render lại sau thao tác | < 100ms |
| Kích thước `tbgdProducts` tối đa khuyến nghị | < 500 sản phẩm |
| Thời gian lưu `localStorage` | < 20ms |

### 6.2 Bảo mật

| Yêu cầu | Mô tả |
|---------|-------|
| Kiểm tra đăng nhập | Mọi hàm kiểm tra `user` và `activeSellers` trước khi xử lý |
| Kiểm tra phê duyệt | `isApproved` bắt buộc trước khi render module |
| Escape HTML | Tất cả dữ liệu người dùng qua `escHtml()` trước khi render |
| Xác nhận xóa | `confirm()` bắt buộc trước khi xóa |
| Validate giá trị số | `parseInt` / `parseFloat` + `Math.max(0, ...)` cho các trường số |

### 6.3 Trải nghiệm người dùng

| Yêu cầu | Mô tả |
|---------|-------|
| Responsive | Bảng có `overflow-x: auto`; filter bar có `flex-wrap: wrap` |
| Tìm kiếm live | Không cần nhấn Enter — cập nhật ngay `oninput` |
| Phản hồi tức thì | Mọi thao tác thành công/thất bại đều hiển thị `toast()` |
| Thông báo hệ thống | Thao tác quan trọng (thêm mới, nhập hàng) ghi vào `addNotif()` |
| Hiển thị bảo hành thông minh | Format tháng ↔ năm tự động, hiện trên danh sách và form |
| Màu sắc trực quan | Tồn kho: xanh (đủ) / cam (thấp) / đỏ (hết); Trạng thái: màu riêng |
| Trạng thái rỗng | Thông báo rõ ràng khi danh sách trống / không có kết quả lọc |

---

## 7. Tiêu chí chấp nhận

**AC-01:** Seller đã duyệt truy cập tab `seller-tbgd` thấy đúng danh sách `tbgdProducts` của gian hàng mình.

**AC-02:** Seller chưa duyệt bị chuyển hướng sang trang `sellerAppStatus()`, không thấy module TBGD.

**AC-03:** Tìm kiếm theo tên hoặc thương hiệu hoạt động realtime, không phân biệt hoa thường.

**AC-04:** Bộ lọc tab "Tất cả / Đang bán / Nháp / Hết hàng" hiển thị đúng số lượng và lọc đúng sản phẩm.

**AC-05:** Banner cảnh báo tồn kho thấp chỉ xuất hiện khi có ít nhất một sản phẩm active có `stock > 0` và `stock <= lowStockThreshold`.

**AC-06:** Nhấn "+ Thêm thiết bị" mở form trống với trạng thái mặc định "Đang bán".

**AC-07:** Form validation từ chối lưu khi thiếu tên thiết bị (toast lỗi).

**AC-08:** Form validation từ chối lưu khi giá bán bằng 0 hoặc âm (toast lỗi).

**AC-09:** Sản phẩm mới sau khi tạo xuất hiện ở đầu danh sách.

**AC-10:** Khi chọn trạng thái "Đang bán" nhưng nhập số lượng tồn = 0, hệ thống tự gán `status = 'outofstock'`.

**AC-11:** Form chỉnh sửa điền sẵn đúng tất cả giá trị hiện tại của sản phẩm.

**AC-12:** Chỉnh sửa giữ nguyên `sold`, `rating`, `ratingCount`, `createdAt`, `restockHistory`.

**AC-13:** Xóa sản phẩm yêu cầu xác nhận qua `confirm()`, xóa thành công ghi toast "Đã xóa: {tên}".

**AC-14:** Nút 📦 toggle panel nhập hàng: mở khi đóng, đóng khi đang mở trên cùng sản phẩm.

**AC-15:** Chỉ một panel nhập hàng inline được mở cùng lúc trên toàn bộ danh sách.

**AC-16:** Nhập hàng với số lượng <= 0 hiển thị toast lỗi, không cập nhật tồn kho.

**AC-17:** Nhập hàng thành công: tồn kho tăng đúng số lượng, ghi `restockHistory`, cập nhật `updatedAt`.

**AC-18:** Nhập hàng cho sản phẩm `outofstock` tự chuyển trạng thái sang `active`.

**AC-19:** Mọi thay đổi dữ liệu (thêm/sửa/xóa/nhập hàng) được lưu vào `localStorage['activeSellers']` ngay lập tức.

**AC-20:** Thêm mới sản phẩm tạo thông báo trong `addNotif()`; nhập hàng cũng tạo thông báo tương tự.

**AC-21:** Bảng danh sách hiển thị đủ 8 cột và có scroll ngang trên màn hình nhỏ.

**AC-22:** Phần trăm giảm giá chỉ hiển thị khi `oldPrice > 0`.

**AC-23:** Thời hạn bảo hành 0 tháng hiển thị "Không bảo hành" thay vì badge.

**AC-24:** Thời hạn bảo hành từ 12 tháng trở lên tự động format sang "X năm" hoặc "X năm Y tháng".

---

## 8. Rủi ro và Giải pháp

| Rủi ro | Mức độ | Giải pháp hiện tại | Giải pháp đề xuất |
|--------|--------|-------------------|-------------------|
| Mất dữ liệu khi xóa thiết bị | Cao | Confirm dialog trước khi xóa | Thêm tính năng "thùng rác" / khôi phục |
| Tồn kho âm | Trung bình | `Math.max(0, parseInt(...))` khi đọc form | Validate phía server khi tích hợp thực tế |
| Xung đột dữ liệu đa tab trình duyệt | Trung bình | Chưa xử lý (localStorage không có lock) | StorageEvent listener để sync tab |
| Upload ảnh chỉ là demo | Cao | Toast thông báo demo, lưu `imageCount` thay file thật | Tích hợp file upload API thực tế |
| Không có phân trang cho danh sách lớn | Thấp | Lọc trong bộ nhớ, chưa phân trang | Thêm phân trang hoặc virtual scroll khi > 100 sản phẩm |
| ID sinh phía client có thể trùng | Thấp | `Date.now().toString(36)` — khả năng trùng rất thấp | UUID server-generated khi có backend |
| Seller có thể xem dữ liệu seller khác | Thấp | Lọc theo `user.email` tại client | Authentication + Authorization phía server |

---

## 9. Lộ trình phát triển

### P1 — Đã triển khai (hiện tại)

- [x] Danh sách thiết bị với bộ lọc tab (Tất cả / Đang bán / Nháp / Hết hàng)
- [x] Tìm kiếm realtime theo tên và thương hiệu
- [x] Banner cảnh báo tồn kho thấp với ngưỡng tùy chỉnh
- [x] Form thêm/sửa 6 phần: thông tin, giá, kho, bảo hành, ảnh (demo), trạng thái
- [x] 7 danh mục thiết bị với icon trực quan
- [x] 5 đơn vị tính: Cái, Bộ, Chiếc, Hộp, Cuộn
- [x] 8 mốc bảo hành (3–60 tháng) với format thông minh năm/tháng
- [x] Hệ thống giá khuyến mãi (giá gốc + tự tính % giảm)
- [x] Panel nhập hàng inline không cần rời trang
- [x] Lịch sử nhập hàng (`restockHistory`)
- [x] Tự động chuyển trạng thái `outofstock` → `active` sau nhập hàng
- [x] Xóa sản phẩm với confirm dialog
- [x] Lưu trữ `localStorage` qua `saveActiveSellers()`
- [x] Thông báo hệ thống (`addNotif()`) cho thao tác quan trọng

### P2 — Cải tiến ngắn hạn (kế hoạch)

- [ ] Upload ảnh thực tế lên server (thay thế cơ chế demo `imageCount`)
- [ ] Tìm kiếm theo mã SKU / barcode
- [ ] Lọc theo danh mục thiết bị
- [ ] Lọc theo khoảng giá
- [ ] Phân trang danh sách khi vượt 50 sản phẩm
- [ ] Sắp xếp danh sách theo tên / giá / tồn kho / đã bán
- [ ] Xem lịch sử nhập hàng chi tiết (`restockHistory`) trực tiếp trên trang
- [ ] Xuất danh sách tồn kho ra CSV/Excel
- [ ] Bulk action: thay đổi trạng thái nhiều sản phẩm cùng lúc

### P3 — Tính năng dài hạn

- [ ] Tích hợp mã vạch / QR code quét để nhập hàng nhanh
- [ ] Quản lý nhà cung cấp thiết bị (gắn kết với module nhập hàng kho)
- [ ] Lịch sử giá (price history) — theo dõi thay đổi giá theo thời gian
- [ ] So sánh giá với các seller khác cùng danh mục (thị trường)
- [ ] Hệ thống cảnh báo email/SMS khi tồn kho dưới ngưỡng
- [ ] Nhận xét đánh giá từ người mua thiết bị (gắn `rating`, `ratingCount` vào UI)
- [ ] Hỗ trợ hình ảnh 360° và video demo thiết bị
- [ ] Quản lý serial number và số bảo hành từng đơn vị thiết bị
- [ ] Tích hợp với phần mềm quản lý kho bên thứ ba (API webhook)
