# Tài liệu Phân tích Yêu cầu
## Phân hệ Quản lý Nhà cung cấp (Seller) — EduMart Admin

**Phiên bản:** 1.0  
**Ngày:** 20/06/2026  
**Tác giả:** EduMart Product Team  
**Trạng thái:** Đã triển khai

---

## 1. Tổng quan

### 1.1 Mục đích

Phân hệ Quản lý Nhà cung cấp cung cấp cho quản trị viên EduMart công cụ toàn diện để kiểm soát toàn bộ vòng đời của người bán trên nền tảng — từ khâu thẩm định hồ sơ đăng ký ban đầu, giám sát hoạt động kinh doanh, xử lý vi phạm, đến điều chỉnh chính sách hoa hồng. Mục tiêu là đảm bảo chất lượng sàn, bảo vệ người mua và duy trì môi trường kinh doanh minh bạch.

### 1.2 Phạm vi

| Nhóm | Mô tả |
|------|-------|
| **Duyệt đăng ký Seller** | Thẩm định hồ sơ, phê duyệt hoặc từ chối đăng ký mở shop |
| **Quản lý Seller đang hoạt động** | Giám sát hiệu suất, xử lý vi phạm, kiểm soát tài khoản |
| **Cài đặt hoa hồng** | Thiết lập tỷ lệ hoa hồng theo danh mục và ưu đãi theo seller |

### 1.3 Người dùng hệ thống (Actors)

| Actor | Quyền truy cập |
|-------|----------------|
| **Super Admin** | Toàn bộ tính năng, bao gồm duyệt seller, khóa tài khoản, đặt hoa hồng |
| **Content Admin** | Xem danh sách, xem chi tiết hồ sơ — không thực hiện hành động |
| **Read-only Admin** | Chỉ xem danh sách và thống kê |

### 1.4 Điều kiện tiên quyết

- Người dùng đã có tài khoản với `role='admin'` và đã đăng nhập
- Hệ thống có dữ liệu người bán trong `sellerApps[]` (hồ sơ chờ duyệt) và `activeSellers[]` (seller đang hoạt động)
- Cấu hình hoa hồng được lưu trong `commissionCfg`

---

## 2. Yêu cầu chức năng

### 2.1 FR-01: Duyệt đăng ký Seller

#### FR-01.1 Bảng thống kê tổng quan

**Mô tả:** Hiển thị 4 chỉ số tổng hợp dạng card ngay đầu tab.

| Chỉ số | Mô tả | Màu |
|--------|-------|-----|
| Chờ duyệt | Số hồ sơ có `status='pending'` | Cam `#e67e22` |
| Cần bổ sung | Số hồ sơ có `status='more-info'` | Xanh dương `#2980b9` |
| Đã duyệt | Số hồ sơ có `status='approved'` | Xanh lá `#27ae60` |
| Từ chối | Số hồ sơ có `status='rejected'` | Đỏ `#c0392b` |

**Badge trên tab:** Hiển thị số hồ sơ `pending` dưới dạng badge đỏ trên tiêu đề tab "Chờ duyệt".

#### FR-01.2 Danh sách hồ sơ chờ duyệt

**Mô tả:** Bảng liệt kê toàn bộ hồ sơ đăng ký Seller với tìm kiếm và phân trang.

**Dữ liệu hiển thị trên mỗi dòng:**

| Cột | Nội dung |
|-----|---------|
| Avatar | Chữ cái đầu tên shop, màu theo danh mục |
| Thông tin shop | Tên shop (đậm) + Họ chủ sở hữu · Email |
| Danh mục | Badge màu theo danh mục chính |
| Ngày nộp | DD/MM/YYYY |
| Trạng thái | Badge màu (xem bảng FR-01.3) |
| Hành động | Nút "Xem hồ sơ" + Nút "Duyệt" nhanh (chỉ khi `pending`) |

**Sắp xếp mặc định:** Pending → Cần bổ sung → Đã duyệt → Từ chối.

**Phân trang:** 8 bản ghi/trang.

**Tìm kiếm:** Realtime, khớp chuỗi con không phân biệt hoa/thường trên tên shop, tên chủ sở hữu và email.

#### FR-01.3 Trạng thái hồ sơ

| Trạng thái | Giá trị | Badge |
|------------|---------|-------|
| Chờ duyệt | `pending` | Cam — "Chờ duyệt" |
| Cần bổ sung | `more-info` | Xanh dương — "Cần bổ sung" |
| Đã duyệt | `approved` | Xanh lá — "Đã duyệt" |
| Từ chối | `rejected` | Xám — "Đã từ chối" |

#### FR-01.4 Chi tiết hồ sơ đăng ký

**Mô tả:** Trang chi tiết hiển thị đầy đủ 3 nhóm thông tin cần thẩm định.

**Thông tin cơ bản (header):**
- Tên shop, họ chủ sở hữu, email, số điện thoại
- Danh mục, ngày nộp hồ sơ, trạng thái

**Nhóm 1 — Giấy phép kinh doanh (GPKD):**

| Trường | Mô tả |
|--------|-------|
| Số đăng ký | Mã số GPKD/ĐKKD |
| Loại hình | Hộ kinh doanh cá thể / Công ty TNHH / v.v. |
| Ngày cấp | DD/MM/YYYY |
| Nơi cấp | Cơ quan cấp phép |

**Nhóm 2 — Căn cước công dân (CCCD):**

| Trường | Mô tả |
|--------|-------|
| Số CCCD | 12 chữ số |
| Họ và tên | Tên trên CCCD |
| Ngày cấp | DD/MM/YYYY |
| Nơi cấp | Cơ quan cấp |

**Nhóm 3 — Thông tin Shop:**

| Trường | Mô tả |
|--------|-------|
| Mô tả shop | Giới thiệu sản phẩm và định hướng kinh doanh |
| Địa chỉ kho hàng | Địa chỉ đầy đủ |
| Tài khoản ngân hàng | Ngân hàng – Số TK – Tên chủ TK |
| Sản phẩm chính | Danh sách tag danh mục sản phẩm dự kiến |

**Banner thông báo:** Nếu hồ sơ đã có lý do từ chối hoặc yêu cầu bổ sung từ lần xử lý trước, hiển thị banner màu đỏ (từ chối) hoặc xanh dương (cần bổ sung) kèm nội dung và thông tin người xử lý.

#### FR-01.5 Duyệt hồ sơ

**Điều kiện áp dụng:** Hồ sơ có `status='pending'` hoặc `status='more-info'`.

**Luồng:**
1. Admin click "✓ Duyệt hồ sơ"
2. Hộp thoại xác nhận hiển thị
3. Admin xác nhận
4. Hệ thống:
   - Cập nhật `status='approved'`, ghi `reviewedBy`, `reviewedAt`
   - Tự động tạo bản ghi mới trong `activeSellers[]` với `status='active'`
5. Toast xác nhận, quay về danh sách

**Dữ liệu Seller khởi tạo tự động:**
```
id: 'as-' + app.id
shopName, ownerName, email, phone, category: từ hồ sơ
joinedAt: ngày duyệt
status: 'active'
rating: 0, totalProducts: 0
stats: { totalOrders:0, totalRevenue:0, returnRate:0, ... }
violations: []
commissionOverride: null
warnings: 0
```

#### FR-01.6 Từ chối hồ sơ

**Điều kiện áp dụng:** Hồ sơ có `status='pending'` hoặc `status='more-info'`.

**Luồng:**
1. Admin click "✕ Từ chối"
2. Prompt nhập lý do từ chối *(bắt buộc, không được để trống)*
3. Cập nhật `status='rejected'`, lưu `reviewNote`, `reviewedBy`, `reviewedAt`
4. Toast xác nhận

**Quy tắc validation:** Nếu lý do rỗng → hiện toast cảnh báo, không lưu.

#### FR-01.7 Yêu cầu bổ sung thông tin

**Điều kiện áp dụng:** Hồ sơ có `status='pending'` hoặc `status='more-info'`.

**Luồng:**
1. Admin click "⚠ Yêu cầu bổ sung"
2. Prompt nhập nội dung yêu cầu *(bắt buộc)*
3. Cập nhật `status='more-info'`, lưu `reviewNote`, `reviewedBy`, `reviewedAt`
4. Toast xác nhận

**Khác biệt với Từ chối:** Hồ sơ `more-info` vẫn xuất hiện trong danh sách chờ xử lý và seller vẫn có thể bổ sung để được duyệt lại.

---

### 2.2 FR-02: Quản lý Seller đang hoạt động

#### FR-02.1 Bộ lọc theo trạng thái

**Mô tả:** Hàng nút lọc nhanh hiển thị số lượng từng trạng thái.

| Bộ lọc | Điều kiện | Ví dụ hiển thị |
|--------|-----------|----------------|
| Tất cả | Không lọc | Tất cả (7) |
| Hoạt động | `status='active'` | Hoạt động (5) |
| Cảnh báo | `status='warning'` | Cảnh báo (1) |
| Đình chỉ | `status='suspended'` | Đình chỉ (1) |
| Đã khóa | `status='locked'` | Đã khóa (0) |

**Nút đang chọn** được highlight viền đỏ và nền hồng nhạt.

#### FR-02.2 Danh sách Seller

**Dữ liệu hiển thị trên mỗi dòng:**

| Cột | Nội dung |
|-----|---------|
| Avatar | Chữ cái đầu tên shop, màu theo danh mục |
| Shop | Tên shop + Họ chủ sở hữu |
| Danh mục | Badge màu |
| Đánh giá | Sao (★☆) + điểm số |
| Doanh thu | Tổng doanh thu (rút gọn: M/B) + số đơn hàng |
| Trạng thái | Badge màu |
| Hành động | Nút "Xem" + "Cảnh báo" (nếu active/warning) + "Mở lại" (nếu suspended) |

**Tìm kiếm:** Theo tên shop hoặc tên chủ sở hữu. **Phân trang:** 8 bản ghi/trang.

#### FR-02.3 Chi tiết Seller đang hoạt động

**Mô tả:** Trang chi tiết tổng hợp đầy đủ thông tin hoạt động của một seller.

**Thông tin header:** Tên shop, chủ sở hữu, email, danh mục, trạng thái, số cảnh báo tích lũy.

**Khối thống kê (6 chỉ số, dạng grid 3 cột):**

| Chỉ số | Nội dung |
|--------|---------|
| Tổng đơn hàng | Số đơn hàng toàn thời gian |
| Tổng doanh thu | Tổng doanh thu (đồng) |
| Số sản phẩm | Tổng sản phẩm đang bán |
| Tỷ lệ hoàn hàng | % đơn bị hoàn/trả |
| Đơn tháng này | Số đơn tháng hiện tại + % tăng trưởng |
| Doanh thu tháng | Doanh thu tháng hiện tại |

**Thông tin phụ (grid 3 ô):** Ngày tham gia, số điện thoại, hoa hồng đang áp dụng (kèm nút đổi nhanh).

**Banner đình chỉ:** Nếu đang bị đình chỉ, hiển thị banner đỏ thông báo ngày hết hạn và lý do.

**Lịch sử vi phạm (bảng):**

| Cột | Nội dung |
|-----|---------|
| Ngày | DD/MM/YYYY |
| Loại vi phạm | Hàng giả/nhái / Mô tả sai lệch / Tỷ lệ hoàn cao / Gian lận / Khác |
| Mô tả | Chi tiết vi phạm |
| Mức độ | Badge: Nhẹ (xanh) / Trung bình (cam) / Nghiêm trọng (đỏ) |
| Ghi chú xử lý | Hành động đã thực hiện |

Nếu chưa có vi phạm → hiển thị dòng thông báo "Chưa có vi phạm nào được ghi nhận".  
Vi phạm được sắp xếp **mới nhất lên đầu**.

#### FR-02.4 Cảnh báo Seller

**Điều kiện áp dụng:** Seller có `status='active'` hoặc `status='warning'`.

**Luồng:**
1. Admin click "⚠ Cảnh báo"
2. Prompt nhập nội dung cảnh báo *(bắt buộc)*
3. Hệ thống:
   - Tăng `warnings += 1`
   - Chuyển `status='warning'`
   - Thêm bản ghi vào `violations[]` với `severity='low'`, `action='warning'`
4. Toast xác nhận

**Ghi chú vi phạm tự động:** `"Cảnh báo lần [n]. Ghi nhận bởi Admin EduMart."`

#### FR-02.5 Đình chỉ Seller

**Điều kiện áp dụng:** Seller có `status='active'` hoặc `status='warning'`.

**Luồng:**
1. Admin click "⏸ Đình chỉ"
2. Prompt (1): Nhập lý do đình chỉ *(bắt buộc)*
3. Prompt (2): Nhập số ngày đình chỉ *(mặc định: 30)*
4. Hệ thống:
   - Chuyển `status='suspended'`
   - Lưu `suspendedReason`, tính và lưu `suspendedUntil`
   - Thêm bản ghi vi phạm `severity='high'`, `action='suspended'`
5. Toast xác nhận kèm số ngày

**Tính ngày kết thúc:** `suspendedUntil = ngày hiện tại + số ngày`

#### FR-02.6 Khóa tài khoản Seller

**Điều kiện áp dụng:** Seller chưa ở trạng thái `locked`.

**Luồng:**
1. Admin click "🔒 Khóa tài khoản"
2. Prompt nhập lý do *(bắt buộc)*
3. Hộp thoại xác nhận với cảnh báo tác động (vô hiệu hóa shop, sản phẩm, ngừng thanh toán)
4. Hệ thống:
   - Chuyển `status='locked'`
   - Thêm bản ghi vi phạm `severity='high'`, `action='locked'`
5. Toast xác nhận

#### FR-02.7 Mở lại tài khoản Seller

**Điều kiện áp dụng:** Seller có `status='suspended'` hoặc `status='locked'`.

**Luồng:**
1. Admin click "✓ Mở lại"
2. Hộp thoại xác nhận
3. Hệ thống: chuyển `status='active'`, xóa `suspendedReason` và `suspendedUntil`
4. Toast xác nhận

---

### 2.3 FR-03: Cài đặt hoa hồng

#### FR-03.1 Hoa hồng theo danh mục

**Mô tả:** Grid 5 card, mỗi card đại diện cho một danh mục sản phẩm.

**Thông tin trên mỗi card:**
- Badge danh mục (màu riêng từng danh mục)
- Tỷ lệ hoa hồng hiện tại (số lớn, đơn vị %)
- Số seller đang dùng mức này (không có override riêng)
- Nút "Chỉnh sửa"

**Mức hoa hồng mặc định ban đầu:**

| Danh mục | Mức hoa hồng |
|----------|-------------|
| Sách | 8% |
| Văn phòng phẩm | 10% |
| Thiết bị giáo dục | 12% |
| Ebook | 15% |
| Sách nói | 15% |

#### FR-03.2 Luồng chỉnh sửa hoa hồng danh mục

1. Admin click "Chỉnh sửa" trên card danh mục
2. Prompt (1): Nhập tỷ lệ % mới *(khoảng hợp lệ: 0–100)*
3. Prompt (2): Nhập lý do thay đổi *(không bắt buộc)*
4. Hệ thống:
   - Cập nhật `commissionCfg.byCategory[key]`
   - Thêm bản ghi vào `commissionCfg.history[]`
5. Toast xác nhận

#### FR-03.3 Hoa hồng đặc biệt theo Seller

**Mô tả:** Bảng liệt kê các seller đang được áp dụng mức hoa hồng riêng (override).

**Dữ liệu hiển thị:**

| Cột | Nội dung |
|-----|---------|
| Seller | Tên shop + Họ chủ sở hữu |
| Danh mục | Badge màu |
| Mức hoa hồng | Mức mặc định (gạch ngang) → Mức đặc biệt (đậm) |
| Hành động | Nút "Đổi" + Nút "Xóa ưu đãi" |

**Nút "+ Thêm ưu đãi":** Mở dialog chọn seller (danh sách đánh số), sau đó nhập mức hoa hồng mới.

#### FR-03.4 Luồng đặt/đổi hoa hồng đặc biệt

1. Admin click "Đổi" bên cạnh seller hoặc click "Đặt hoa hồng" từ trang chi tiết seller
2. Prompt (1): Nhập tỷ lệ % mới (hiển thị mức hiện tại và mức danh mục để tham chiếu)
3. Prompt (2): Nhập lý do *(không bắt buộc)*
4. Hệ thống: cập nhật `activeSellers[idx].commissionOverride`, thêm vào `history[]`
5. Toast xác nhận

#### FR-03.5 Xóa hoa hồng đặc biệt

1. Admin click "Xóa ưu đãi"
2. Hộp thoại xác nhận, hiển thị mức mặc định seller sẽ về
3. Hệ thống: set `commissionOverride = null`, thêm vào `history[]` với lý do cố định
4. Toast xác nhận

#### FR-03.6 Lịch sử thay đổi hoa hồng

**Mô tả:** Bảng ghi lại toàn bộ thay đổi hoa hồng, sắp xếp **mới nhất lên đầu**.

| Cột | Nội dung |
|-----|---------|
| Ngày | DD/MM/YYYY |
| Đối tượng | "Danh mục: [Tên]" hoặc "Seller: [Tên shop]" |
| Thay đổi | Mức cũ% (gạch ngang) → Mức mới% (đậm) |
| Lý do | Lý do admin nhập |
| Người thực hiện | Tên admin |

---

## 3. Yêu cầu phi chức năng

### 3.1 NFR-01: Hiệu năng

- Tìm kiếm và lọc phản hồi trong < 100ms (xử lý client-side)
- Bảng seller đến 100 bản ghi không gây chậm trễ nhận thấy

### 3.2 NFR-02: Tính toàn vẹn dữ liệu

- Duyệt hồ sơ chỉ được thực hiện **một lần**; hồ sơ `approved`/`rejected` không hiển thị nút hành động
- Mỗi thay đổi hoa hồng đều được ghi lại đầy đủ vào `history[]` với timestamp, người thực hiện và giá trị cũ/mới
- Khóa seller vĩnh viễn yêu cầu **xác nhận 2 bước** (lý do + confirm dialog)

### 3.3 NFR-03: Bảo mật

- **XSS Prevention:** Mọi dữ liệu seller hiển thị phải qua `escHtml()`
- **Prompt injection:** Lý do từ chối/cảnh báo được lưu dưới dạng plaintext, không thực thi
- Cổng hoa hồng hợp lệ: 0% ≤ rate ≤ 100%; nhập ngoài khoảng → toast lỗi, không lưu

### 3.4 NFR-04: Persistence

- Toàn bộ dữ liệu được lưu vào `localStorage` qua các hàm `saveSellerApps()`, `saveActiveSellers()`, `saveCommissionCfg()`
- Dữ liệu mặc định được seed tự động nếu chưa có trong `localStorage`

### 3.5 NFR-05: Giao diện responsive

| Breakpoint | Điều chỉnh |
|------------|-----------|
| ≤ 900px | Grid hoa hồng chuyển sang 3 cột; grid thống kê seller chuyển sang 2 cột |
| ≤ 600px | Tab text thu gọn; grid hoa hồng chuyển 2 cột; stat grid 2 cột |

---

## 4. Mô hình dữ liệu

### 4.1 SellerApp Object (Hồ sơ đăng ký)

```javascript
{
  id: string,              // 'sapp-001'
  shopName: string,        // Tên shop
  ownerName: string,       // Họ chủ sở hữu
  email: string,
  phone: string,
  submittedAt: string,     // 'DD/MM/YYYY'
  status: AppStatusEnum,   // Trạng thái hồ sơ
  category: CategoryEnum,  // Danh mục chính

  gpkd: {
    number: string,        // Số đăng ký GPKD
    issued: string,        // Ngày cấp
    place: string,         // Nơi cấp
    type: string           // Loại hình kinh doanh
  },

  cccd: {
    number: string,        // Số CCCD (12 chữ số)
    name: string,          // Tên trên CCCD
    issued: string,
    place: string
  },

  shopInfo: {
    name: string,
    desc: string,          // Mô tả shop
    address: string,       // Địa chỉ kho hàng
    bank: string,          // 'Ngân hàng – Số TK – Chủ TK'
    mainCats: string[]     // Danh mục sản phẩm dự kiến
  },

  reviewNote: string,      // Lý do từ chối / nội dung yêu cầu bổ sung
  reviewedBy: string|null, // Tên admin xử lý
  reviewedAt: string|null  // 'DD/MM/YYYY'
}
```

```javascript
type AppStatusEnum = 'pending' | 'more-info' | 'approved' | 'rejected'
type CategoryEnum  = 'sach' | 'vpp' | 'tbgd' | 'ebook' | 'audiobook'
```

### 4.2 ActiveSeller Object

```javascript
{
  id: string,              // 'seller-001' | 'as-' + appId
  shopName: string,
  ownerName: string,
  email: string,
  phone: string,
  joinedAt: string,        // 'DD/MM/YYYY'
  status: SellerStatusEnum,
  category: CategoryEnum,
  rating: number,          // 0–5
  totalProducts: number,

  stats: {
    totalOrders: number,
    totalRevenue: number,   // VND
    returnRate: number,     // %
    thisMonthOrders: number,
    thisMonthRev: number,
    growth: number          // % so với tháng trước (âm = giảm)
  },

  violations: Violation[],
  commissionOverride: number|null,  // % hoặc null (dùng mức danh mục)
  warnings: number,         // Số lần cảnh báo tích lũy

  // Chỉ có khi status='suspended'
  suspendedReason?: string,
  suspendedUntil?: string   // 'DD/MM/YYYY'
}
```

```javascript
type SellerStatusEnum = 'active' | 'warning' | 'suspended' | 'locked'

type Violation = {
  id: string,
  type: 'fake'|'description'|'return'|'fraud'|'other',
  desc: string,
  date: string,             // 'DD/MM/YYYY'
  severity: 'low'|'medium'|'high',
  action: 'noted'|'warning'|'suspended'|'locked',
  note: string              // Ghi chú xử lý
}
```

### 4.3 CommissionCfg Object

```javascript
{
  byCategory: {
    sach: number,           // % hoa hồng
    vpp: number,
    tbgd: number,
    ebook: number,
    audiobook: number
  },
  history: CommissionHistoryEntry[]
}

type CommissionHistoryEntry = {
  id: string,
  date: string,             // 'DD/MM/YYYY'
  field: string,            // 'cat:sach' | 'seller:seller-001'
  oldVal: number,           // % trước khi thay đổi
  newVal: number,           // % sau khi thay đổi
  by: string,               // Tên admin
  reason: string
}
```

---

## 5. Luồng người dùng (User Flow)

### 5.1 Luồng duyệt hồ sơ Seller mới

```
Admin → Tab "Shop / NCC" → Tab con "Chờ duyệt"
  → Xem bảng thống kê (Chờ duyệt: 3)
  → Click "Xem hồ sơ" của "Sách & VPP Minh Long"
  → Xem đầy đủ: GPKD (số đăng ký, loại hình, nơi cấp)
               CCCD (số, tên, ngày cấp)
               Shop (mô tả, địa chỉ, ngân hàng)
  → Đánh giá: hợp lệ → Click "✓ Duyệt hồ sơ"
  → Confirm → Toast "✓ Đã duyệt: Sách & VPP Minh Long"
  → Seller xuất hiện trong tab "Đang hoạt động"
```

### 5.2 Luồng xử lý Seller vi phạm

```
Admin → Tab "Shop / NCC" → Tab con "Đang hoạt động"
  → Lọc: "Cảnh báo" → thấy Đinh Tị Books (1 cảnh báo)
  → Click "Xem" → Chi tiết seller
  → Xem lịch sử vi phạm: 2 vi phạm
  → Vi phạm tiếp tục nghiêm trọng → Click "⏸ Đình chỉ"
  → Nhập lý do: "Tỷ lệ hoàn hàng vượt 5% trong 2 tháng liên tiếp"
  → Nhập số ngày: 14
  → Toast "Đã đình chỉ seller: Đinh Tị Books (14 ngày)"
  → Banner đỏ xuất hiện trên trang chi tiết: "Đình chỉ đến DD/MM/YYYY"
```

### 5.3 Luồng điều chỉnh hoa hồng danh mục

```
Admin → Tab "Shop / NCC" → Tab con "Cài đặt hoa hồng"
  → Xem 5 card danh mục: Sách 8%, VPP 10%, ...
  → Click "Chỉnh sửa" trên card Sách
  → Prompt: "Mức hoa hồng mới cho Sách (%) — Hiện tại: 8%" → nhập: 7
  → Prompt: "Lý do" → nhập: "Hỗ trợ seller nhân dịp đầu năm học 2026"
  → Toast "Đã cập nhật hoa hồng danh mục Sách: 7%"
  → Card Sách cập nhật: 7%
  → Lịch sử: thêm dòng mới "Danh mục: Sách | 8% → 7%"
```

### 5.4 Luồng đặt hoa hồng đặc biệt cho Seller

```
Admin → Chi tiết Seller "Fahasa Official"
  → Xem: Hoa hồng hiện tại: 6% (đặc biệt)
  → Click "💰 Đặt hoa hồng"
  → Prompt: "Mức hoa hồng đặc biệt cho Fahasa (%) — Mức danh mục: 7%" → nhập: 5
  → Prompt: "Lý do" → nhập: "Gia hạn hợp đồng đối tác chiến lược"
  → Toast "Đã đặt hoa hồng đặc biệt cho Fahasa Official: 5%"
  → Lịch sử: thêm "Seller: Fahasa Official | 6% → 5%"
```

---

## 6. Mockup giao diện (ASCII)

### 6.1 Tab Chờ duyệt — Danh sách hồ sơ

```
┌────────────────────────────────────────────────────────────────────────┐
│ [Chờ duyệt 3]  [Đang hoạt động]  [Cài đặt hoa hồng]                  │
├────────────────────────────────────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐                 │
│  │    3     │ │    1     │ │    1     │ │    1     │                 │
│  │ Chờ duyệt│ │Cần bổ   │ │ Đã duyệt │ │ Từ chối  │                 │
│  │          │ │sung      │ │          │ │          │                 │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘                 │
├────────────────────────────────────────────────────────────────────────┤
│  [Tìm theo tên shop, chủ sở hữu, email...]              [Xóa lọc]    │
├────┬─────────────────────────────┬──────────┬──────────┬──────────────┤
│    │ THÔNG TIN SHOP              │ DANH MỤC │ NGÀY NỘP │ TRẠNG THÁI   │
├────┼─────────────────────────────┼──────────┼──────────┼──────────────┤
│ S  │ Sách & VPP Minh Long        │ [Sách]   │10/06/2025│ [Chờ duyệt]  │ [Xem hồ sơ] [Duyệt]
│    │ Nguyễn Văn Long · minh@...  │          │          │              │
├────┼─────────────────────────────┼──────────┼──────────┼──────────────┤
│ T  │ Thiết bị GD EduTech         │ [TB GD]  │09/06/2025│ [Cần bổ sung]│ [Xem hồ sơ]
│    │ Trần Thị Huyền · edu@...    │          │          │              │
└────┴─────────────────────────────┴──────────┴──────────┴──────────────┘
          ← Trước    Trang 1/1 · 5 hồ sơ    Tiếp →
```

### 6.2 Chi tiết hồ sơ đăng ký

```
← Danh sách hồ sơ

┌─────────────────────────────────────────────────────────────────────┐
│ [S]  Sách & VPP Minh Long                                           │
│      Nguyễn Văn Long · minhlong.vpp@gmail.com                      │
│      [Sách]  [Chờ duyệt]                                            │
│                                                                     │
│  ┌───────────────┐ ┌───────────────────────────┐ ┌───────────────┐ │
│  │ SỐ ĐT        │ │ EMAIL                      │ │ NGÀY NỘP     │ │
│  │ 0912 345 678 │ │ minhlong.vpp@gmail.com     │ │ 10/06/2025   │ │
│  └───────────────┘ └───────────────────────────┘ └───────────────┘ │
│                                                                     │
│  ── Giấy phép kinh doanh (GPKD) ───────────────────────────────── │
│  ┌─────────────────────┐ ┌──────────────────────┐                  │
│  │ SỐ ĐĂNG KÝ          │ │ LOẠI HÌNH            │                  │
│  │ ĐKKD-HN-2024-112345 │ │ Hộ kinh doanh cá thể │                  │
│  └─────────────────────┘ └──────────────────────┘                  │
│                                                                     │
│  ── Thông tin Shop ─────────────────────────────────────────────── │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ MÔ TẢ SHOP                                                  │   │
│  │ Chuyên cung cấp sách giáo khoa, sách tham khảo và văn      │   │
│  │ phòng phẩm cho học sinh toàn cấp...                         │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  [✓ Duyệt hồ sơ]  [⚠ Yêu cầu bổ sung]  [✕ Từ chối]              │
└─────────────────────────────────────────────────────────────────────┘
```

### 6.3 Chi tiết Seller đang hoạt động

```
← Danh sách seller

┌─────────────────────────────────────────────────────────────────────┐
│ [N]  NXB Giáo dục VN                                                │
│      Trần Thị Hoa · nxbgd@official.vn                              │
│      [Sách]  [● Hoạt động]                                          │
│                                                                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │   4.820  │ │  284M đ  │ │   248    │ │  0.25%   │ │ 420 ▲12% │ │
│  │Tổng đơn  │ │Tổng DT   │ │Sản phẩm  │ │Tỷ lệ     │ │Đơn tháng │ │
│  │          │ │          │ │          │ │hoàn hàng │ │          │ │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘ │
│                                                                     │
│  ── Lịch sử vi phạm (0) ─────────────────────────────────────────  │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  Chưa có vi phạm nào được ghi nhận                          │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  [⚠ Cảnh báo]  [⏸ Đình chỉ]  [🔒 Khóa tài khoản]  [💰 Hoa hồng] │
└─────────────────────────────────────────────────────────────────────┘
```

### 6.4 Tab Cài đặt hoa hồng

```
┌────────────────────────────────────────────────────────────────────┐
│  Hoa hồng theo danh mục                                            │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐            │
│  │ [Sách]        │ │ [VPP]         │ │ [Thiết bị GD] │            │
│  │      8%       │ │     10%       │ │      12%      │            │
│  │ 4 seller      │ │ 0 seller      │ │ 1 seller      │            │
│  │ [Chỉnh sửa]   │ │ [Chỉnh sửa]   │ │ [Chỉnh sửa]   │            │
│  └───────────────┘ └───────────────┘ └───────────────┘            │
├────────────────────────────────────────────────────────────────────┤
│  Hoa hồng đặc biệt theo Seller              [+ Thêm ưu đãi]       │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │ Fahasa Official │ [Sách] │ ~~8%~~ → 6%  │ [Đổi] [Xóa ưu đãi] │
│  └────────────────────────────────────────────────────────────┘   │
├────────────────────────────────────────────────────────────────────┤
│  Lịch sử thay đổi hoa hồng                                        │
│  NGÀY       │ ĐỐI TƯỢNG          │ THAY ĐỔI  │ LÝ DO   │ NGƯỜI TH│
│  01/04/2025 │ Danh mục: Sách     │ ~~10%~~→8%│ Kích cầu│ Admin   │
│  15/03/2025 │ Seller: Fahasa Off.│ ~~8%~~→6% │ Đối tác │ Admin   │
└────────────────────────────────────────────────────────────────────┘
```

---

## 7. Tiêu chí chấp nhận (Acceptance Criteria)

### AC-01: Hiển thị danh sách hồ sơ

- [ ] Tab "Chờ duyệt" hiển thị số hồ sơ `pending` dưới dạng badge đỏ trên tiêu đề tab
- [ ] Bảng danh sách hiển thị đúng các cột: Avatar, Thông tin shop, Danh mục, Ngày nộp, Trạng thái, Hành động
- [ ] Hồ sơ sắp xếp đúng thứ tự: pending → more-info → approved → rejected
- [ ] Hồ sơ `approved` và `rejected` không hiển thị nút "Duyệt" nhanh

### AC-02: Xem chi tiết hồ sơ

- [ ] Mở chi tiết hồ sơ → hiển thị đầy đủ 3 nhóm thông tin: GPKD, CCCD, Thông tin shop
- [ ] Hồ sơ đã từ chối → banner đỏ hiển thị lý do + người xử lý + ngày
- [ ] Hồ sơ cần bổ sung → banner xanh hiển thị nội dung yêu cầu

### AC-03: Duyệt hồ sơ

- [ ] Duyệt → confirm dialog → Toast xác nhận
- [ ] Seller mới xuất hiện trong tab "Đang hoạt động" với `status='active'`
- [ ] Hồ sơ đã duyệt → không còn nút hành động

### AC-04: Từ chối hồ sơ

- [ ] Click từ chối → prompt nhập lý do
- [ ] Để trống lý do → toast cảnh báo, không lưu
- [ ] Từ chối thành công → hồ sơ chuyển sang badge "Đã từ chối"

### AC-05: Yêu cầu bổ sung

- [ ] Gửi yêu cầu bổ sung → hồ sơ chuyển sang `more-info`
- [ ] Mở lại chi tiết → banner xanh dương hiển thị đúng nội dung yêu cầu

### AC-06: Cảnh báo và đình chỉ Seller

- [ ] Cảnh báo → `warnings` tăng 1, `status` chuyển sang `warning`, bản ghi vi phạm được thêm
- [ ] Đình chỉ → nhập lý do + số ngày → `suspendedUntil` đúng, banner đỏ hiển thị
- [ ] Seller bị đình chỉ → nút "Mở lại" xuất hiện thay thế nút "Đình chỉ"

### AC-07: Khóa và mở lại Seller

- [ ] Khóa → yêu cầu lý do + confirm 2 bước → `status='locked'`
- [ ] Mở lại từ suspended/locked → `status='active'`, `suspendedUntil` xóa

### AC-08: Hoa hồng danh mục

- [ ] 5 card danh mục hiển thị đúng mức % và số seller
- [ ] Nhập % ngoài 0–100 → toast lỗi, không lưu
- [ ] Thay đổi hợp lệ → card cập nhật ngay + dòng mới xuất hiện đầu bảng lịch sử

### AC-09: Hoa hồng đặc biệt Seller

- [ ] Thêm ưu đãi → seller xuất hiện trong bảng với mức gạch ngang → mức mới
- [ ] Xóa ưu đãi → confirm → seller biến khỏi bảng; lịch sử ghi lý do "về lại mức danh mục"
- [ ] Trang chi tiết seller hiển thị đúng: "X% (đặc biệt)" hoặc "Y% (danh mục)"

---

## 8. Rủi ro và giải pháp

| Rủi ro | Mức độ | Giải pháp |
|--------|--------|-----------|
| Duyệt hồ sơ giả mạo | Cao | Hướng dẫn admin kiểm tra số GPKD qua cổng thông tin nhà nước trước khi duyệt |
| Seller tạo nhiều hồ sơ trùng | Trung bình | Kiểm tra email trùng lặp trước khi tạo `activeSellers` entry |
| Thay đổi hoa hồng ảnh hưởng doanh thu đang chờ thanh toán | Cao | Trong production: hoa hồng mới chỉ áp dụng từ đơn hàng sau thay đổi |
| Admin xóa nhầm hoa hồng đặc biệt | Thấp | Confirm dialog hiển thị mức mặc định seller sẽ về |
| Lịch sử vi phạm không đủ chi tiết | Thấp | Mỗi hành động (warn/suspend/lock) tự động tạo bản ghi vi phạm kèm note |
| XSS qua dữ liệu seller | Trung bình | Mọi output qua `escHtml()` bắt buộc |

---

## 9. Roadmap — Tính năng tiếp theo

| Ưu tiên | Tính năng | Mô tả |
|---------|-----------|-------|
| P1 | **Upload tài liệu hồ sơ** | Cho phép seller tải ảnh GPKD, CCCD thực tế thay vì nhập text |
| P1 | **Tự động hết hạn đình chỉ** | Cron job tự động mở lại tài khoản khi qua `suspendedUntil` |
| P1 | **Thông báo email cho Seller** | Gửi email khi hồ sơ được duyệt/từ chối/cần bổ sung |
| P2 | **Dashboard hiệu suất Seller** | Chart doanh thu theo thời gian, so sánh với cùng kỳ |
| P2 | **Hoa hồng theo bậc doanh thu** | Tự động giảm hoa hồng khi seller đạt ngưỡng doanh thu |
| P2 | **Scorecard Seller** | Điểm tổng hợp: tỷ lệ hoàn, đánh giá, tốc độ xử lý đơn |
| P3 | **Quy trình kháng nghị** | Seller có thể gửi kháng nghị về quyết định đình chỉ/khóa |
| P3 | **Audit log hành động Admin** | Ghi lại ai đã duyệt/từ chối/khóa seller nào, lúc nào |

---

*Tài liệu này phản ánh trạng thái triển khai tại phiên bản 1.0. Cập nhật cùng với mỗi sprint phát triển tiếp theo.*
