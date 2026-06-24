# Yêu cầu chức năng: Quản lý Sách Giấy — Phân hệ Người bán

**Phiên bản:** 1.0  
**Ngày cập nhật:** 2026-06-24  
**Trạng thái:** Đã triển khai (P1 hoàn chỉnh)  
**Module liên quan:** `seller-products`, `seller-product-form`, `seller-product-import`

---

## 1. Tổng quan

### 1.1 Mục đích

Module quản lý sách giấy cho phép seller đã được duyệt đăng ký quản lý toàn bộ vòng đời sản phẩm sách vật lý trên nền tảng EduMart: thêm mới, chỉnh sửa thông tin, theo dõi tồn kho, nhập hàng, thực hiện thao tác hàng loạt và nhập sản phẩm hàng loạt từ file CSV.

### 1.2 Phạm vi

| Thành phần | Mô tả | Trạng thái |
|------------|-------|------------|
| Danh sách sản phẩm (`seller-products`) | Tìm kiếm, lọc, thao tác nhanh, chọn nhiều | Đã triển khai |
| Form thêm/sửa (`seller-product-form`) | Nhập đầy đủ thông tin sách + kiểm tra hợp lệ | Đã triển khai |
| Nhập hàng inline | Panel nhập số lượng tồn kho ngay trong bảng | Đã triển khai |
| Thao tác hàng loạt | Cập nhật giá, đổi trạng thái, xóa nhiều cùng lúc | Đã triển khai |
| Nhập CSV (`seller-product-import`) | Upload/dán CSV 13 cột, tải file mẫu | Đã triển khai |

### 1.3 Tác nhân

| Tác nhân | Vai trò |
|----------|---------|
| Seller (đã duyệt) | Thực hiện toàn bộ thao tác quản lý sản phẩm |
| Hệ thống | Tự động tính % giảm giá, chuyển trạng thái hết hàng, lưu lịch sử nhập hàng |

### 1.4 Điều kiện tiên quyết

- Người dùng phải đăng nhập (`user` tồn tại).
- Tài khoản seller phải được duyệt (`sellerApps[].status === 'approved'`).
- Seller phải tồn tại trong mảng `activeSellers` (lưu tại `localStorage` key `edumart_activeSellers`).
- Nếu chưa được duyệt, hệ thống chuyển hướng sang trang `sellerAppStatus()`.

---

## 2. Yêu cầu chức năng

### FR-01: Danh sách sản phẩm (`sellerProductList`)

#### FR-01.1 Hiển thị tổng quan

Phần tiêu đề hiển thị bốn chỉ số tổng hợp tức thì từ mảng `s.products`:

| Chỉ số | Công thức |
|--------|-----------|
| Tổng sản phẩm | `allProds.length` |
| Đang bán | `allProds.filter(p => p.status === 'active').length` |
| Nháp | `allProds.filter(p => p.status === 'draft').length` |
| Hết hàng | `allProds.filter(p => p.stock === 0).length` |

#### FR-01.2 Tìm kiếm

- Ô nhập liệu real-time (`oninput`): lọc theo tên sách **hoặc** tên tác giả, không phân biệt chữ hoa/thường.
- Biến trạng thái: `sellerProductSearch` (string).
- Khi tìm kiếm, danh sách `sellerSelectedProds` tự động reset về `[]`.

#### FR-01.3 Bộ lọc trạng thái

| Tab | Điều kiện lọc | Biến |
|-----|---------------|------|
| Tất cả | Không lọc | `sellerProductStatusFilter === 'all'` |
| Đang bán | `p.status === 'active'` | `sellerProductStatusFilter === 'active'` |
| Nháp | `p.status === 'draft'` | `sellerProductStatusFilter === 'draft'` |
| Hết hàng | `p.stock === 0` | `sellerProductStatusFilter === 'outofstock'` |

Mỗi tab hiển thị số đếm tương ứng trong dấu ngoặc. Tab hiện tại có nền đậm (`background: var(--ink)`, chữ trắng). Khi đổi tab, `sellerSelectedProds` reset.

#### FR-01.4 Bảng sản phẩm

Bảng gồm 9 cột:

| # | Cột | Nội dung |
|---|-----|----------|
| 1 | Checkbox | Chọn đơn / chọn tất cả |
| 2 | Avatar | Ký tự đầu tên sách, màu theo `NCC_CAT_CLR[s.category]` |
| 3 | Sản phẩm | Tên sách (đậm), tác giả, badge thể loại |
| 4 | Giá | Giá bán (đỏ), giá gốc gạch ngang + badge `-X%` nếu có giảm |
| 5 | Tồn kho | Số lượng, màu theo ngưỡng: đỏ (= 0), cam (<= 5), xanh (> 5) |
| 6 | Đã bán | `p.sold` |
| 7 | Đánh giá | Sao (★☆) + số lượt đánh giá `(p.ratingCount)` |
| 8 | Trạng thái | Badge màu: Đang bán (xanh), Nháp (xám), Hết hàng (cam) |
| 9 | Thao tác | Nút Sửa, Nhập hàng, Xóa |

Logic badge trạng thái: nếu `p.stock === 0` và `p.status !== 'draft'` thì hiển thị badge "Hết hàng" thay cho badge trạng thái gốc.

Logic % giảm giá: `disc = Math.round((1 - p.price / p.oldPrice) * 100)`, chỉ hiển thị khi `p.oldPrice > 0`.

#### FR-01.5 Trạng thái rỗng

Khi `prods.length === 0`: hiển thị dòng spanning toàn bộ cột với thông báo "Không tìm thấy sản phẩm nào."

#### FR-01.6 Thao tác nhanh trên mỗi dòng

| Nút | Hành động | Hàm gọi |
|-----|-----------|---------|
| Sửa (✏) | Đặt `sellerEditProductId = p.id`, chuyển sang `seller-product-form` | `renderAccount()` |
| Nhập hàng (📦) | Toggle panel nhập hàng inline ngay dưới dòng | `doSellerToggleRestock(id)` |
| Xóa (🗑) | Xác nhận dialog, xóa sản phẩm | `doSellerDeleteProduct(id)` |

---

### FR-02: Nhập hàng inline (`_sellerRestockInline`)

Khi nhấn nút "Nhập hàng", một panel mở rộng xuất hiện ngay dưới dòng sản phẩm tương ứng (trong `<tr>` colspan 9). Biến `sellerRestockProductId` lưu ID sản phẩm đang nhập hàng; chỉ một sản phẩm được mở panel cùng lúc.

#### FR-02.1 Trường nhập liệu

| Trường | Bắt buộc | Mặc định | Ghi chú |
|--------|----------|----------|---------|
| Số lượng nhập thêm (`rsQty_<id>`) | Có | 50 | Số nguyên dương |
| Lý do nhập hàng (`rsReason_<id>`) | Không | "Nhập hàng định kỳ" | Chuỗi văn bản |

#### FR-02.2 Logic xử lý (`doSellerRestockProduct`)

1. Kiểm tra `qty > 0`; nếu không hợp lệ hiển thị toast lỗi.
2. Cộng `qty` vào `p.stock`.
3. Push bản ghi vào `p.restockHistory`: `{qty, reason, date: todayStr()}`.
4. Nếu `p.status === 'outofstock'` thì tự động chuyển sang `'active'`.
5. Cập nhật `p.updatedAt`.
6. Gọi `saveActiveSellers()`.
7. Đặt `sellerRestockProductId = null`, hiển thị toast thành công + thông báo hệ thống.

#### FR-02.3 Lịch sử nhập hàng

Hiển thị 3 lần nhập gần nhất (đảo ngược thứ tự từ `p.restockHistory.slice(-3).reverse()`):

```
Lần nhập gần nhất: +50 (24/06/2026) · +30 (10/06/2026) · +100 (01/06/2026)
```

---

### FR-03: Thao tác hàng loạt

#### FR-03.1 Chọn sản phẩm

- Checkbox trên mỗi dòng: `doSellerToggleSelect(id)` — toggle ID trong mảng `sellerSelectedProds`.
- Checkbox header: `doSellerToggleSelectAll()` — chọn/bỏ chọn tất cả sản phẩm **trong kết quả lọc hiện tại** (không phải toàn bộ danh sách).
- Trạng thái "chọn tất cả": `selAll = filteredIds.every(id => sellerSelectedProds.includes(id))`.

#### FR-03.2 Thanh thao tác hàng loạt (Bulk Action Bar)

Thanh này chỉ hiển thị khi `sellerSelectedProds.length > 0`. Hiển thị số sản phẩm đã chọn và các nút:

| Thao tác | Hàm | Ghi chú |
|----------|-----|---------|
| Cập nhật giá | `doSellerBulkPriceUpdate()` | Nhập giá mới vào ô `#bulkPriceInput` |
| Chuyển → Đang bán | `doSellerBulkStatusUpdate('active')` | Bỏ qua nếu `stock === 0` (giữ outofstock) |
| Chuyển → Nháp | `doSellerBulkStatusUpdate('draft')` | |
| Xóa đã chọn | `doSellerBulkDelete()` | Confirm dialog trước khi xóa |

**Logic bulk giá:** Duyệt từng sản phẩm trong `sellerSelectedProds`, gán `p.price = newPrice`, cập nhật `p.updatedAt`, gọi `saveActiveSellers()`, reset `sellerSelectedProds = []`.

**Logic bulk trạng thái:** Khi chuyển sang `'active'`, nếu sản phẩm có `stock === 0` thì trạng thái thực tế vẫn là `'outofstock'` (không phải `'active'`).

**Logic bulk xóa:** Lọc `activeSellers[sIdx].products` loại bỏ các ID trong `sellerSelectedProds`, giảm `totalProducts` tương ứng.

---

### FR-04: Form thêm/chỉnh sửa sản phẩm (`sellerProductForm`)

Form hoạt động ở hai chế độ:
- **Tạo mới** (`productId === null`): tiêu đề "Thêm Sách Mới", nút "✓ Lưu sản phẩm".
- **Chỉnh sửa** (`productId !== null`): tiêu đề "Chỉnh sửa Sách", nút "💾 Lưu thay đổi".

Form gồm 6 phần:

#### FR-04.1 Thông tin cơ bản

| Trường | ID DOM | Bắt buộc | Loại | Ghi chú |
|--------|--------|----------|------|---------|
| Tên sách | `pfName` | Có | text | |
| Tác giả | `pfBy` | Có | text | Nhiều tác giả ngăn cách bằng dấu phẩy |
| Nhà xuất bản | `pfNxb` | Không | text | VD: NXB Giáo dục Việt Nam |
| ISBN | `pfIsbn` | Không | text | VD: 978-... |
| Năm xuất bản | `pfYear` | Không | number | min=1900, max=2030 |
| Số trang | `pfPages` | Không | number | min=0 |
| Ngôn ngữ | `pfLang` | Không | select | vi / en / bilingual |

#### FR-04.2 Phân loại

| Trường | ID DOM | Bắt buộc | Loại | Tùy chọn |
|--------|--------|----------|------|-----------|
| Thể loại | `pfGenre` | Có | select | sgk, thamkhao, vanhoc, thieunhi, kynang, ngoaingu |
| Đối tượng độc giả | `pfAud_<k>` | Có (ít nhất 1) | checkbox đa chọn | tieuhoc, thcs, thpt, sinhvien, giaovien |

Hằng số thể loại (`SELLER_GENRE`):

| Key | Nhãn hiển thị |
|-----|--------------|
| `sgk` | Sách giáo khoa |
| `thamkhao` | Sách tham khảo |
| `vanhoc` | Văn học |
| `thieunhi` | Thiếu nhi |
| `kynang` | Kỹ năng sống |
| `ngoaingu` | Ngoại ngữ |

Hằng số đối tượng (`SELLER_AUD`):

| Key | Nhãn hiển thị |
|-----|--------------|
| `tieuhoc` | Tiểu học |
| `thcs` | THCS |
| `thpt` | THPT |
| `sinhvien` | Sinh viên |
| `giaovien` | Giáo viên |

#### FR-04.3 Mô tả sản phẩm

| Trường | ID DOM | Bắt buộc | Ghi chú |
|--------|--------|----------|---------|
| Mô tả | `pfDesc` | Không | Textarea 4 dòng |

#### FR-04.4 Giá & Tồn kho

| Trường | ID DOM | Bắt buộc | Ghi chú |
|--------|--------|----------|---------|
| Giá bán | `pfPrice` | Có (> 0) | Đơn vị VNĐ |
| Giá gốc | `pfOldPrice` | Không | Nếu > giá bán → hiện % giảm |
| % Giảm giá | `pfDiscDisplay` | Tự động | Chỉ đọc, tính bởi `pfCalcDisc()` |
| Tồn kho | `pfStock` | Có (>= 0) | |

Hàm `pfCalcDisc()` được gọi mỗi lần `oninput` trên `pfPrice` hoặc `pfOldPrice`. Công thức: `disc = price > 0 && old > price ? Math.round((1 - price / old) * 100) : 0`. Hiển thị `-X%` màu đỏ nếu có giảm giá, hoặc `—` màu mờ.

#### FR-04.5 Ảnh bìa & Ảnh bổ sung (Demo)

- Trường số ảnh: `pfImageCount` (1–10, mặc định 1).
- Hàm `pfRenderSlots()`: render các ô ảnh placeholder (60×80px), ô đầu tiên nhãn "Bìa", các ô còn lại nhãn số thứ tự.
- Ghi chú: Đây là bản demo, sản phẩm thực tế sẽ tích hợp upload file.

#### FR-04.6 Trạng thái đăng bán

| Radio | Value | Mô tả |
|-------|-------|-------|
| Đăng ngay | `active` | Hiển thị trên cửa hàng |
| Lưu nháp | `draft` | Ẩn tạm, chỉ seller thấy |

#### FR-04.7 Validation (`doSellerSaveProduct`)

Kiểm tra theo thứ tự:
1. `name` không rỗng → toast "Vui lòng nhập tên sách."
2. `by` không rỗng → toast "Vui lòng nhập tên tác giả."
3. `aud.length >= 1` → toast "Vui lòng chọn ít nhất một đối tượng độc giả."
4. `price > 0` → toast "Vui lòng nhập giá bán hợp lệ (lớn hơn 0)."

#### FR-04.8 Logic lưu sản phẩm

**Khi tạo mới:**
```javascript
{
  id: 'slp-' + Date.now().toString(36),
  // ... tất cả trường,
  sold: 0, rating: 0, ratingCount: 0,
  createdAt: todayStr(), updatedAt: todayStr(),
  restockHistory: []
}
```
- Thêm vào đầu mảng (`unshift`).
- Tăng `activeSellers[sIdx].totalProducts` thêm 1.
- Gọi `addNotif('Sản phẩm mới "' + name + '" đã được thêm vào gian hàng.')`.

**Khi cập nhật:** Patch tất cả trường (giữ nguyên `sold`, `rating`, `ratingCount`, `restockHistory`), cập nhật `updatedAt`.

**Logic trạng thái khi lưu:** Nếu `stock === 0` và người dùng chọn `rawStatus === 'active'` thì `status` tự động thành `'outofstock'`.

**Sau lưu:** `saveActiveSellers()`, chuyển về `acctTab = 'seller-products'`, `sellerEditProductId = null`.

---

### FR-05: Nhập sản phẩm từ CSV (`sellerProductImport`)

#### FR-05.1 Cấu trúc CSV

13 cột, phân cách bằng dấu phẩy, không có dòng tiêu đề:

```
tên_sách, tác_giả, nxb, isbn, năm_xb, số_trang, ngôn_ngữ,
thể_loại, đối_tượng, mô_tả, giá_bán, giá_gốc, tồn_kho
```

| Cột | Định dạng | Bắt buộc | Giá trị mẫu |
|-----|-----------|----------|-------------|
| tên_sách | string | Có | Sách GK Toán 6 Cánh Diều |
| tác_giả | string | Không | Đỗ Đức Thái |
| nxb | string | Không | NXB ĐH Sư phạm |
| isbn | string | Không | 978-604-0-98765-4 |
| năm_xb | number | Không | 2024 |
| số_trang | number | Không | 168 |
| ngôn_ngữ | `vi` / `en` / `bilingual` | Không | vi |
| thể_loại | xem `SELLER_GENRE` | Không | sgk |
| đối_tượng | các key cách nhau `\|` | Không | thcs\|thpt |
| mô_tả | string | Không | Sách giáo khoa Toán 6. |
| giá_bán | number | Có (> 0) | 32000 |
| giá_gốc | number | Không (0 = không giảm) | 0 |
| tồn_kho | number | Không | 28 |

#### FR-05.2 Logic xử lý (`doSellerImportCSV`)

1. Đọc nội dung `#csvData`, tách theo `\n`, bỏ qua dòng rỗng và dòng bắt đầu bằng `#`.
2. Với mỗi dòng: kiểm tra `cols.length >= 13` và `name` không rỗng, `price > 0`; nếu không đạt thì `err++`.
3. Trạng thái tự động: `st = parseInt(stockStr) > 0 ? 'active' : 'outofstock'`.
4. ID tự động: `'slp-csv-' + today.replace(/\//g, '') + '-' + lineIndex`.
5. Các sản phẩm hợp lệ được `unshift` vào `activeSellers[sIdx].products`.
6. Cập nhật `activeSellers[sIdx].totalProducts += ok`.
7. Toast kết quả: "✓ Đã nhập X sản phẩm (Y dòng lỗi bỏ qua)!"
8. Chuyển về `acctTab = 'seller-products'`.

#### FR-05.3 Tải file mẫu (`doSellerDownloadCSVTemplate`)

- Tạo Blob CSV với BOM (`﻿`) gồm dòng tiêu đề + 2 dòng dữ liệu mẫu.
- Tên file tải về: `mau-nhap-sach-edumart.csv`.
- Tạo thẻ `<a>` tạm, click, xóa, revoke URL.

---

## 3. Mô hình dữ liệu

### 3.1 Đối tượng sản phẩm (`Product`)

```javascript
{
  // Định danh
  id: string,              // 'slp-' + Date.now().toString(36) | 'slp-csv-YYYYMMDD-N'
  
  // Thông tin cơ bản
  name: string,            // Tên sách (bắt buộc)
  by: string,              // Tác giả
  nxb: string,             // Nhà xuất bản
  isbn: string,            // Mã ISBN
  year: number,            // Năm xuất bản (1900–2030)
  pages: number,           // Số trang
  lang: 'vi' | 'en' | 'bilingual',
  
  // Phân loại
  genre: 'sgk' | 'thamkhao' | 'vanhoc' | 'thieunhi' | 'kynang' | 'ngoaingu',
  aud: Array<'tieuhoc' | 'thcs' | 'thpt' | 'sinhvien' | 'giaovien'>,
  
  // Nội dung
  desc: string,            // Mô tả sản phẩm
  imageCount: number,      // Số ảnh (1–10)
  
  // Giá
  price: number,           // Giá bán (VNĐ, > 0)
  oldPrice: number,        // Giá gốc (0 = không có giảm giá)
  
  // Tồn kho & bán hàng
  stock: number,           // Tồn kho hiện tại (>= 0)
  sold: number,            // Tổng đã bán (chỉ đọc)
  restockHistory: Array<{  // Lịch sử nhập hàng
    qty: number,
    reason: string,
    date: string           // Định dạng từ todayStr()
  }>,
  
  // Đánh giá
  rating: number,          // Điểm trung bình (0–5)
  ratingCount: number,     // Số lượt đánh giá
  
  // Trạng thái
  status: 'active' | 'draft' | 'outofstock',
  
  // Thời gian
  createdAt: string,       // todayStr()
  updatedAt: string        // todayStr()
}
```

### 3.2 Biến trạng thái toàn cục

```javascript
let sellerEditProductId = null;        // ID sản phẩm đang chỉnh sửa (null = tạo mới)
let sellerProductSearch = '';          // Chuỗi tìm kiếm hiện tại
let sellerProductStatusFilter = 'all'; // Tab lọc: 'all' | 'active' | 'draft' | 'outofstock'
let sellerSelectedProds = [];          // Mảng ID sản phẩm đã chọn (thao tác hàng loạt)
let sellerRestockProductId = null;     // ID sản phẩm đang mở panel nhập hàng
```

### 3.3 Hằng số danh mục

```javascript
const SELLER_GENRE = [
  {k: 'sgk',       lbl: 'Sách giáo khoa'},
  {k: 'thamkhao',  lbl: 'Sách tham khảo'},
  {k: 'vanhoc',    lbl: 'Văn học'},
  {k: 'thieunhi',  lbl: 'Thiếu nhi'},
  {k: 'kynang',    lbl: 'Kỹ năng sống'},
  {k: 'ngoaingu',  lbl: 'Ngoại ngữ'}
];
const SELLER_AUD = [
  {k: 'tieuhoc', lbl: 'Tiểu học'},
  {k: 'thcs',    lbl: 'THCS'},
  {k: 'thpt',    lbl: 'THPT'},
  {k: 'sinhvien',lbl: 'Sinh viên'},
  {k: 'giaovien',lbl: 'Giáo viên'}
];
const SELLER_LANG = [
  {k: 'vi',       lbl: 'Tiếng Việt'},
  {k: 'en',       lbl: 'Tiếng Anh'},
  {k: 'bilingual',lbl: 'Song ngữ'}
];
```

### 3.4 Lưu trữ

- Toàn bộ dữ liệu seller (bao gồm mảng `products`) lưu tại `localStorage` key: `edumart_activeSellers`.
- Hàm đọc: `LS.get('activeSellers', null)`.
- Hàm ghi: `saveActiveSellers()` → `LS.set('activeSellers', activeSellers)`.

---

## 4. Luồng hoạt động

### 4.1 Luồng tổng thể module sản phẩm

```
Người dùng đăng nhập
        │
        ▼
   acctTab = 'seller-products'
        │
        ▼
   sellerContent()
        │
        ├─ seller chưa duyệt ──→ sellerAppStatus()
        │
        └─ seller đã duyệt  ──→ sellerProductList()
                                        │
                    ┌───────────────────┼──────────────────┐
                    ▼                   ▼                  ▼
            [+ Thêm sách mới]   [✏ Sửa sản phẩm]   [📥 Nhập CSV]
                    │                   │                  │
                    ▼                   ▼                  ▼
          sellerProductForm(null) sellerProductForm(id) sellerProductImport()
                    │                   │                  │
                    ▼                   ▼                  ▼
          doSellerSaveProduct(null) doSellerSaveProduct(id) doSellerImportCSV()
                    │                   │                  │
                    └───────────────────┴──────────────────┘
                                        │
                                        ▼
                              sellerProductList()
```

### 4.2 Luồng nhập hàng inline

```
[Bấm nút Nhập hàng 📦]
        │
        ▼
doSellerToggleRestock(id)
        │
        ├─ sellerRestockProductId === id  ──→  đặt null (đóng panel)
        │
        └─ sellerRestockProductId !== id  ──→  đặt = id (mở panel)
                                                     │
                                                     ▼
                                          _sellerRestockInline(p)
                                          hiển thị form nhập hàng
                                                     │
                                          [Nhập số lượng + lý do]
                                                     │
                                          [Xác nhận nhập]
                                                     │
                                                     ▼
                                          doSellerRestockProduct(id)
                                                     │
                                          ┌──────────┴──────────┐
                                          ▼                     ▼
                                      qty > 0?              qty <= 0
                                          │                     │
                                          ▼                     ▼
                                  p.stock += qty          toast lỗi
                                  push restockHistory
                                  if outofstock → active
                                  saveActiveSellers()
                                          │
                                          ▼
                                  sellerProductList()
```

### 4.3 Luồng thao tác hàng loạt

```
[Chọn ≥ 1 sản phẩm]
        │
        ▼
Bulk Action Bar hiển thị
        │
   ┌────┼────────────────────┐
   ▼    ▼                    ▼
[Giá] [Trạng thái]         [Xóa]
   │    │                    │
   ▼    ▼                    ▼
doSellerBulkPriceUpdate()  doSellerBulkDelete()
doSellerBulkStatusUpdate() [confirm dialog]
   │    │                    │
   └────┴────────────────────┘
                │
         saveActiveSellers()
         sellerSelectedProds = []
                │
                ▼
        sellerProductList()
```

---

## 5. Giao diện người dùng

### 5.1 Trang danh sách sản phẩm

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Quản lý Sản phẩm                      [+ Thêm sách mới] [📥 Nhập CSV] │
│  24 sản phẩm · 18 đang bán · 4 nháp · 2 hết hàng                       │
├─────────────────────────────────────────────────────────────────────────┤
│  [🔍 Tìm theo tên sách, tác giả...]                                     │
│  [ Tất cả (24) ] [ Đang bán (18) ] [ Nháp (4) ] [ Hết hàng (2) ]      │
├─────────────────────────────────────────────────────────────────────────┤
│  ✓ Đã chọn 3 sản phẩm  |  [Giá mới (đ)] [Cập nhật giá]               │
│  | [→ Đang bán] [→ Nháp]                    [🗑 Xóa đã chọn]          │
├────┬──────┬─────────────────────────┬──────────┬──────┬──────┬──────────┤
│ ☐  │  [M] │ Sản phẩm                │ Giá      │ Tồn  │ Bán  │ Trạng   │
│    │      │                         │          │ kho  │      │ thái     │
├────┼──────┼─────────────────────────┼──────────┼──────┼──────┼──────────┤
│ ☑  │  [T] │ Toán 6 Cánh Diều       │ 32.000đ  │  28  │ 142  │ Đang bán │
│    │      │ Đỗ Đức Thái · [SGK]    │          │      │      │          │
├────┼──────┼─────────────────────────┼──────────┼──────┼──────┼──────────┤
│ ☐  │  [A] │ Atomic Habits          │ 115.000đ │  15  │  67  │ Đang bán │
│    │      │ James Clear · [Kỹ năng] │ ~~145k~~ │      │      │          │
│    │      │                         │ -21%     │      │      │          │
├────┼──────┼─────────────────────────┼──────────┼──────┼──────┼──────────┤
│ ☐  │  [N] │ Ngữ văn 12             │ 28.000đ  │   0  │  89  │ Hết hàng │
│    │      │ Nhiều tác giả · [SGK]  │          │      │      │          │
└────┴──────┴─────────────────────────┴──────────┴──────┴──────┴──────────┘
```

### 5.2 Panel nhập hàng inline

```
┌─────────────────────────────────────────────────────────────────────────┐
│ ☐  │  [N] │ Ngữ văn 12  │ 28.000đ │  0  │  89  │ Hết hàng │ ✏ 📦 🗑 │
├────┴───────┴─────────────┴─────────┴─────┴──────┴──────────┴───────────┤
│  📦 Nhập hàng: Ngữ văn 12                                               │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │ Số lượng nhập *     │ Lý do nhập hàng                           │    │
│  │ [  50  ]            │ [Nhập hàng định kỳ                      ] │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│  [✓ Xác nhận nhập]  [Hủy]                                              │
│  Lần nhập gần nhất: +100 (01/06/2026) · +50 (15/05/2026)              │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.3 Form thêm/chỉnh sửa sản phẩm

```
┌──────────────────────────────────────────────────────────────────┐
│  [← Danh sách]  Thêm Sách Mới                                   │
├──────────────────────────────────────────────────────────────────┤
│  📋 Thông tin cơ bản                                             │
│  ┌─────────────────────────────────┬──────────────────────────┐  │
│  │ Tên sách *                      │ Tác giả *                │  │
│  │ [Nhập tên đầy đủ của sách     ] │ [Tên tác giả          ]  │  │
│  └─────────────────────────────────┴──────────────────────────┘  │
│  ┌─────────────────────┬───────────────────────────────────────┐  │
│  │ Nhà xuất bản        │ ISBN                                  │  │
│  │ [NXB Giáo dục VN  ] │ [978-...                           ]  │  │
│  └─────────────────────┴───────────────────────────────────────┘  │
│  ┌──────────────┬──────────────┬───────────────────────────────┐  │
│  │ Năm xuất bản │ Số trang     │ Ngôn ngữ                      │  │
│  │ [2024      ] │ [256       ] │ [▼ Tiếng Việt              ]  │  │
│  └──────────────┴──────────────┴───────────────────────────────┘  │
├──────────────────────────────────────────────────────────────────┤
│  🏷 Phân loại                                                    │
│  ┌───────────────────────┬──────────────────────────────────────┐ │
│  │ Thể loại *            │ Đối tượng độc giả *                  │ │
│  │ [▼ Sách giáo khoa  ]  │ ☑ Tiểu học  ☑ THCS  ☐ THPT         │ │
│  │                       │ ☐ Sinh viên  ☐ Giáo viên            │ │
│  └───────────────────────┴──────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────────────┤
│  📝 Mô tả sản phẩm                                               │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │ Mô tả nội dung sách, ưu điểm nổi bật, đối tượng phù hợp │    │
│  │                                                           │    │
│  └──────────────────────────────────────────────────────────┘    │
├──────────────────────────────────────────────────────────────────┤
│  💰 Giá & Tồn kho                                                │
│  ┌──────────────┬──────────────────────────┬───────────────────┐  │
│  │ Giá bán *    │ Giá gốc (để hiện giảm giá)│ % Giảm giá       │  │
│  │ [85000     ] │ [110000                 ] │  -22%            │  │
│  └──────────────┴──────────────────────────┴───────────────────┘  │
│  Số lượng tồn kho *: [  50  ]                                    │
├──────────────────────────────────────────────────────────────────┤
│  🖼 Ảnh bìa & ảnh bổ sung                                       │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │ Demo: dùng số lượng ảnh. Bản production sẽ có upload.    │    │
│  │ Số ảnh (1–10): [3]                                       │    │
│  │  [Bìa]  [ 2 ]  [ 3 ]                                    │    │
│  └──────────────────────────────────────────────────────────┘    │
├──────────────────────────────────────────────────────────────────┤
│  📢 Trạng thái đăng bán                                          │
│  ┌──────────────────────────┐  ┌───────────────────────────────┐  │
│  │ ◉ Đăng ngay              │  │ ○ Lưu nháp                    │  │
│  │   Hiển thị trên cửa hàng │  │   Ẩn tạm, chỉ bạn thấy       │  │
│  └──────────────────────────┘  └───────────────────────────────┘  │
├──────────────────────────────────────────────────────────────────┤
│  [✓ Lưu sản phẩm]  [Hủy]                                        │
└──────────────────────────────────────────────────────────────────┘
```

### 5.4 Trang nhập CSV

```
┌──────────────────────────────────────────────────────────────────┐
│  [← Danh sách]  Nhập sản phẩm từ file CSV                       │
├──────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐    │
│  │ 📋 Cấu trúc CSV (13 cột, không có dòng tiêu đề):         │    │
│  │                                                           │    │
│  │ tên_sách, tác_giả, nxb, isbn, năm_xb, số_trang,         │    │
│  │ ngôn_ngữ, thể_loại, đối_tượng, mô_tả, giá_bán,          │    │
│  │ giá_gốc, tồn_kho                                         │    │
│  │                                                           │    │
│  │ • Thể loại: sgk / thamkhao / vanhoc / thieunhi /         │    │
│  │             kynang / ngoaingu                             │    │
│  │ • Đối tượng: tieuhoc / thcs / thpt / sinhvien /          │    │
│  │              giaovien (phân cách bằng dấu |)             │    │
│  │ • Ngôn ngữ: vi / en / bilingual                          │    │
│  │ • Giá gốc = 0 nếu không có giảm giá                      │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ⬇ Tải file mẫu CSV                                              │
│                                                                   │
│  Dán nội dung CSV vào đây                                        │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │ Sách GK Toán 6 Cánh Diều,Đỗ Đức Thái,NXB ĐH Sư phạm,  │    │
│  │ 978-604-0-98765-4,2024,168,vi,sgk,thcs|thpt,Sách giáo   │    │
│  │ khoa Toán 6.,32000,0,28                                  │    │
│  │ ...                                                       │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                   │
│  [📥 Nhập dữ liệu]  [Hủy]                                       │
└──────────────────────────────────────────────────────────────────┘
```

---

## 6. Yêu cầu phi chức năng

### 6.1 Hiệu năng

| Yêu cầu | Mô tả |
|---------|-------|
| Tìm kiếm tức thì | Lọc xử lý client-side (không gọi API), phản hồi < 50ms |
| Render danh sách | Hỗ trợ mượt mà tới ~500 sản phẩm trên client |
| Lưu trữ | `saveActiveSellers()` đồng bộ; với danh sách lớn cần xem xét debounce |

### 6.2 Bảo mật

| Yêu cầu | Mô tả |
|---------|-------|
| Phân quyền | Chỉ seller được duyệt (`isApproved === true`) mới truy cập |
| Cô lập dữ liệu | Seller chỉ thấy và sửa sản phẩm của chính mình (`s.email === user.email`) |
| Escape đầu ra | Toàn bộ chuỗi người dùng được escape qua `escHtml()` trước khi render HTML |
| CSV injection | Parser CSV hiện tại tách đơn giản bằng dấu phẩy; cần cẩn thận với nội dung có dấu phẩy trong chuỗi |

### 6.3 Trải nghiệm người dùng

| Yêu cầu | Mô tả |
|---------|-------|
| Phản hồi tức thì | Toast thông báo kết quả mọi thao tác (thành công / lỗi) |
| Xác nhận phá hủy | Dialog `confirm()` trước khi xóa (cả đơn lẻ lẫn hàng loạt) |
| Tự động tính toán | % giảm giá tính real-time, trạng thái tự chuyển khi hết hàng |
| Trạng thái chọn | Hàng được tô nền khi đã chọn (`background: #f5f0eb`) |
| Màu sắc tồn kho | Đỏ (hết), cam (<= 5), xanh (> 5) để nhận diện nhanh |
| Responsive | Bảng có `overflow-x: auto`, hỗ trợ cuộn ngang trên màn hình nhỏ |

### 6.4 Tương thích

| Yêu cầu | Mô tả |
|---------|-------|
| Lưu trữ | `localStorage` — dữ liệu tồn tại giữa các phiên trên cùng thiết bị/trình duyệt |
| CSV encoding | File mẫu xuất ra với BOM UTF-8 để Excel nhận diện tiếng Việt đúng |

---

## 7. Tiêu chí chấp nhận

**AC-01:** Danh sách sản phẩm hiển thị đúng số liệu tổng hợp (tổng, đang bán, nháp, hết hàng) phù hợp với mảng `s.products`.

**AC-02:** Tìm kiếm theo tên sách hoặc tác giả hoạt động real-time, không phân biệt chữ hoa/thường.

**AC-03:** Bốn tab lọc (Tất cả, Đang bán, Nháp, Hết hàng) lọc đúng sản phẩm, số đếm trên tab khớp với kết quả lọc.

**AC-04:** Sản phẩm có `stock === 0` và `status !== 'draft'` hiển thị badge "Hết hàng" thay cho badge trạng thái gốc.

**AC-05:** Màu số tồn kho đổi đúng: đỏ khi = 0, cam khi <= 5, xanh khi > 5.

**AC-06:** % giảm giá trong bảng danh sách tính đúng: `Math.round((1 - price / oldPrice) * 100)`, chỉ hiển thị khi `oldPrice > 0`.

**AC-07:** Nút Sửa chuyển sang form với dữ liệu sản phẩm được điền sẵn đúng.

**AC-08:** Panel nhập hàng inline toggle mở/đóng đúng khi nhấn nút 📦, chỉ một sản phẩm được mở cùng lúc.

**AC-09:** Nhập hàng thành công cộng đúng số lượng vào `p.stock`, lưu vào `p.restockHistory`, tự chuyển `outofstock → active`.

**AC-10:** Chọn hàng loạt: checkbox header chọn/bỏ chọn tất cả kết quả lọc hiện tại (không phải toàn bộ danh sách).

**AC-11:** Bulk Action Bar chỉ hiển thị khi có ít nhất 1 sản phẩm được chọn.

**AC-12:** Cập nhật giá hàng loạt áp dụng giá mới (> 0) cho đúng các sản phẩm đã chọn.

**AC-13:** Chuyển trạng thái hàng loạt sang "Đang bán" giữ nguyên `outofstock` cho sản phẩm có `stock === 0`.

**AC-14:** Xóa hàng loạt yêu cầu xác nhận và giảm đúng `activeSellers[sIdx].totalProducts`.

**AC-15:** Form tạo mới: validation đúng thứ tự — tên → tác giả → đối tượng → giá; hiển thị toast lỗi tương ứng.

**AC-16:** Form tạo mới: khi `stock === 0` và chọn "Đăng ngay", trạng thái lưu là `'outofstock'` (không phải `'active'`).

**AC-17:** Tạo sản phẩm mới thêm vào đầu danh sách (`unshift`), tăng `totalProducts`, gọi `addNotif()`.

**AC-18:** Cập nhật sản phẩm giữ nguyên `sold`, `rating`, `ratingCount`, `restockHistory`; cập nhật `updatedAt`.

**AC-19:** Tải file mẫu CSV tạo file đúng 3 dòng (tiêu đề + 2 mẫu) với BOM UTF-8, tên file `mau-nhap-sach-edumart.csv`.

**AC-20:** Nhập CSV: dòng thiếu cột hoặc giá <= 0 bị bỏ qua và đếm vào `err`; toast hiển thị số dòng lỗi.

**AC-21:** Nhập CSV: trạng thái sản phẩm tự động là `'active'` nếu `stockStr > 0`, `'outofstock'` nếu `stockStr <= 0`.

**AC-22:** Sau mọi thao tác lưu/xóa/nhập, `saveActiveSellers()` được gọi và dữ liệu persisted vào `localStorage`.

---

## 8. Rủi ro và Giải pháp

| # | Rủi ro | Mức độ | Giải pháp |
|---|--------|--------|-----------|
| R-01 | CSV có dấu phẩy trong trường dữ liệu (VD: tên sách "Toán, Lý, Hóa") — parser tách sai | Trung bình | P2: Hỗ trợ CSV với trường đặt trong dấu nháy kép (RFC 4180) |
| R-02 | `localStorage` đầy khi danh sách sản phẩm lớn (> 5 MB) | Thấp | P3: Phân trang phía server; hiện tại phù hợp với demo |
| R-03 | Seller xóa nhầm sản phẩm đang có đơn hàng | Cao | P2: Kiểm tra đơn hàng pending trước khi cho phép xóa |
| R-04 | Bulk delete lớn (> 100 sản phẩm) gây UI lag | Thấp | P2: Xử lý theo lô (batch) nếu danh sách lớn |
| R-05 | Hai tab trình duyệt cùng sửa dữ liệu → ghi đè nhau | Thấp | P3: Sync qua `storage` event hoặc chuyển server-side |
| R-06 | ISBN không được validate định dạng | Thấp | P2: Regex validate ISBN-10/ISBN-13 |

---

## 9. Lộ trình phát triển

### P1 — Đã triển khai (hiện tại)

- [x] Danh sách sản phẩm với tìm kiếm và 4 tab lọc
- [x] Bảng 9 cột với thông tin đầy đủ (tên, tác giả, thể loại, giá, tồn kho, đã bán, sao, trạng thái)
- [x] Badge trạng thái và màu tồn kho động
- [x] % giảm giá tự động tính và hiển thị
- [x] Thao tác đơn: sửa, nhập hàng inline, xóa
- [x] Panel nhập hàng inline với lịch sử 3 lần gần nhất
- [x] Chọn hàng loạt (checkbox đơn + checkbox all) theo kết quả lọc
- [x] Bulk Action Bar: cập nhật giá, đổi trạng thái, xóa hàng loạt
- [x] Form thêm/sửa sản phẩm 6 phần đầy đủ
- [x] Validation form: tên, tác giả, đối tượng, giá
- [x] Tính % giảm giá real-time trên form (`pfCalcDisc`)
- [x] Render ô ảnh placeholder động (`pfRenderSlots`)
- [x] Trạng thái tự động: outofstock khi stock = 0 + chọn Đăng ngay
- [x] Nhập CSV 13 cột với báo cáo dòng lỗi
- [x] Tải file mẫu CSV với BOM UTF-8

### P2 — Cải tiến tiếp theo

- [ ] Validate định dạng ISBN-10 / ISBN-13 trên form và khi nhập CSV
- [ ] Upload ảnh bìa thực tế thay cho placeholder đếm số ảnh
- [ ] Parser CSV theo RFC 4180 (hỗ trợ trường chứa dấu phẩy trong dấu nháy kép)
- [ ] Ngăn xóa sản phẩm đang có đơn hàng chưa hoàn thành
- [ ] Tìm kiếm nâng cao theo ISBN, năm xuất bản, nhà xuất bản
- [ ] Sắp xếp bảng theo cột (tên, giá, tồn kho, đã bán)
- [ ] Preview sản phẩm như khách hàng thấy trên cửa hàng
- [ ] Xuất danh sách sản phẩm ra CSV

### P3 — Tầm nhìn dài hạn

- [ ] Chuyển lưu trữ sang server-side (không dùng localStorage)
- [ ] Phân trang hoặc virtual scroll cho danh sách lớn (> 200 sản phẩm)
- [ ] Quản lý nhiều kho hàng (đa địa điểm)
- [ ] Tích hợp mã vạch/QR để nhập hàng nhanh
- [ ] Lịch sử thay đổi giá (price history)
- [ ] Cảnh báo tự động khi tồn kho thấp hơn ngưỡng đặt trước
- [ ] Gộp sản phẩm theo biến thể (ví dụ: cùng tên sách, nhiều phiên bản/năm)
- [ ] Tích hợp API nhà phân phối để cập nhật giá tự động
