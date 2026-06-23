# Tài liệu Phân tích Yêu cầu
## Nhóm chức năng: Đăng ký & Xác minh Seller — Phân hệ Người bán / NCC

**Phiên bản:** 1.0  
**Ngày:** 23/06/2026  
**Tác giả:** EduMart Product Team  
**Trạng thái:** Đã triển khai  
**Phân hệ liên quan:** Admin — Quản lý Nhà cung cấp (`docs/admin-seller-management-requirements.md`)

---

## 1. Tổng quan

### 1.1 Mục đích

Nhóm chức năng Đăng ký & Xác minh Seller là điểm khởi đầu của mọi người bán trên EduMart. Toàn bộ quy trình diễn ra trong Cổng Người bán (Seller Portal) — một phân hệ riêng trong tài khoản người dùng, hiển thị khi tài khoản có `role='seller'`. Seller tự điền hồ sơ, chờ Admin duyệt, nhận thông báo kết quả, và sau khi được duyệt có thể quản lý gian hàng và thông tin thanh toán.

### 1.2 Phạm vi 6 chức năng

| # | Chức năng | Tab/Màn hình |
|---|-----------|-------------|
| 1 | Đăng ký tài khoản người bán (tên shop, GPKD, địa chỉ, SĐT) | `seller-reg` — Bước 1–2 |
| 2 | Upload / nhập giấy tờ xác minh (CCCD, GPKD) | `seller-reg` — Bước 2–3 |
| 3 | Chờ Admin duyệt hồ sơ | `seller-reg` — Trang trạng thái |
| 4 | Nhận thông báo kết quả duyệt | Notification + banner trên dashboard |
| 5 | Chỉnh sửa thông tin doanh nghiệp | `seller-shop` |
| 6 | Cài đặt thông tin thanh toán | `seller-payment` |

### 1.3 Người dùng hệ thống (Actors)

| Actor | Mô tả | Quyền |
|-------|-------|-------|
| **Seller** | Người có `role='seller'` | Toàn bộ chức năng trong tài liệu này |
| **Super Admin** | Phía admin, duyệt hồ sơ | Xem `admin-seller-management-requirements.md` |

### 1.4 Điều kiện tiên quyết

- Người dùng đã đăng ký tài khoản EduMart với `role='seller'`
- Có thể đăng ký bằng form tại trang `/account` → tab "Người bán / NCC"
- Dữ liệu hồ sơ seller lưu trong `sellerApps[]` (localStorage: `sellerApps`)
- Seller chỉ có đúng 1 hồ sơ tại một thời điểm — tra cứu bằng `email === user.email`

---

## 2. Kiến trúc Seller Portal

### 2.1 Routing

```
renderAccount()
    → acctContent()
        → sellerContent()          [khi user.role === 'seller']
            → sellerWelcome()      [acctTab='dashboard', chưa có app]
            → sellerDashboard()    [acctTab='dashboard' | 'seller-dashboard', đã approved]
            → sellerRegForm()      [acctTab='seller-reg', chưa có app]
            → sellerAppStatus()    [acctTab='seller-reg', đã có app]
            → sellerShopEditor()   [acctTab='seller-shop', đã approved]
            → sellerPaymentSettings() [acctTab='seller-payment']
            → acctContent (buyer)  [acctTab='profile', 'address', 'points']
```

### 2.2 Nav tabs theo trạng thái

**Seller chưa được duyệt:**
```
[Hồ sơ đăng ký] [Thông tin thanh toán] [Hồ sơ cá nhân]
```

**Seller đã được duyệt:**
```
[Tổng quan] [Gian hàng] [Thanh toán] [Hồ sơ cá nhân]
```

---

## 3. Yêu cầu chức năng

### 3.1 FR-01: Đăng ký Tài khoản Người bán

#### FR-01.1 Form đăng ký đa bước (5 bước)

Người dùng với `role='seller'` chưa có hồ sơ → thấy nút "Đăng ký ngay" trên Welcome screen → chuyển đến form 5 bước.

#### Bước 1 — Thông tin Gian hàng

| Trường | Validate |
|--------|---------|
| Tên shop | Bắt buộc |
| Số điện thoại liên hệ | Bắt buộc |
| Danh mục chính | Dropdown: Sách / VPP / Thiết bị GD / Ebook / Sách nói |
| Mô tả gian hàng | Bắt buộc, tối thiểu mô tả sản phẩm và kinh nghiệm |
| Địa chỉ kho hàng | Bắt buộc |
| Sản phẩm dự kiến | Không bắt buộc, cách nhau bởi dấu phẩy |

**Lưu tạm:** Dữ liệu bước 1 lưu vào `localStorage['slReg1']` khi nhấn "Tiếp theo" — giữ lại nếu người dùng thoát giữa chừng.

#### Bước 2 — Giấy phép Kinh doanh (GPKD)

| Trường | Validate |
|--------|---------|
| Số đăng ký / Mã số KD | Bắt buộc |
| Loại hình kinh doanh | Dropdown: Hộ KDCT / TNHH MTV / TNHH / CP / NXB |
| Ngày cấp | Date picker |
| Nơi cấp | Bắt buộc |

**Lưu tạm:** `localStorage['slReg2']`

**Thông báo UI:** Banner vàng nhắc nhở thông tin phải khớp chính xác bản gốc. Banner xanh mô tả rằng đây là bản demo — thực tế sẽ upload ảnh.

#### Bước 3 — Căn cước Công dân (CCCD)

| Trường | Validate |
|--------|---------|
| Số CCCD | Bắt buộc, ≥ 9 chữ số |
| Họ và tên trên CCCD | Bắt buộc |
| Ngày cấp | Date picker |
| Nơi cấp | Không bắt buộc |

**Lưu tạm:** `localStorage['slReg3']`

**Lưu ý sản xuất:** Trường upload ảnh CCCD 2 mặt sẽ thay thế input text trong phiên bản production. Demo dùng text input.

#### Bước 4 — Thông tin Ngân hàng

| Trường | Validate |
|--------|---------|
| Ngân hàng | Dropdown 14 ngân hàng phổ biến |
| Số tài khoản | Bắt buộc |
| Tên chủ tài khoản | Bắt buộc, đúng như trên thẻ |

**Lưu tạm:** `localStorage['slReg4']`

**Lưu ý bảo mật:** Không lưu CVV/PIN. Thông tin ngân hàng chỉ dùng để thanh toán.

#### Bước 5 — Xác nhận & Nộp

- Checklist xác nhận: thông tin trung thực, giấy tờ còn hiệu lực, đồng ý điều khoản
- Checkbox bắt buộc phải tick trước khi nộp
- Mô tả quy trình sau khi nộp (3 bước: Admin xét duyệt → Thông báo → Kích hoạt)

#### FR-01.2 Luồng nộp hồ sơ (`doSubmitSellerApp`)

```
1. Validate checkbox xác nhận — toast lỗi nếu chưa tick
2. Đọc dữ liệu từ slReg1..4 trong localStorage
3. Validate slReg1.shopName tồn tại — nếu thiếu, quay về bước 1
4. Tạo object SellerApp mới:
   id = 'sapp-' + Date.now().toString(36)
   email = user.email
   status = 'pending'
   submittedAt = todayStr()
5. sellerApps.push(newApp)
6. saveSellerApps()
7. Xóa localStorage slReg1..4
8. Reset sellerRegStep = 1
9. addNotif('Hồ sơ đã gửi thành công...')
10. toast('✓ Hồ sơ đã nộp thành công!')
11. acctTab = 'seller-reg' → renderAccount() → hiển thị sellerAppStatus()
```

---

### 3.2 FR-02: Upload Giấy tờ Xác minh

**Bản demo (hiện tại):**  
Seller nhập text thông tin GPKD và CCCD vào các field text/select tại bước 2 và 3 của form đăng ký.

**Bản production (P1):**  
Thay các field text bằng component upload ảnh:
- GPKD: 1 ảnh chụp bản gốc (≤ 5MB, JPG/PNG/PDF)  
- CCCD: 2 ảnh (mặt trước + mặt sau), còn hiệu lực

**Validation file upload (P1):**
- Kiểm tra định dạng file: chỉ nhận `.jpg`, `.png`, `.pdf`
- Kiểm tra kích thước: tối đa 5MB mỗi file
- Tên file được rename server-side, không dùng tên gốc

---

### 3.3 FR-03: Chờ Admin Duyệt hồ sơ

Sau khi nộp, seller thấy trang `sellerAppStatus()` với trạng thái hiện tại:

#### Các trạng thái và màn hình tương ứng

| Trạng thái | Banner | Hành động seller |
|-----------|--------|-----------------|
| `pending` | 🟡 Vàng — "Đang chờ xét duyệt" | Không có |
| `more-info` | 🔵 Xanh dương — "Cần bổ sung" + nội dung yêu cầu | [✏ Bổ sung và nộp lại] |
| `rejected` | 🔴 Đỏ — "Hồ sơ bị từ chối" + lý do | [Nộp hồ sơ mới] |
| `approved` | 🟢 Xanh lá — "Đã được duyệt!" | [Vào Tổng quan] |

**Dữ liệu hiển thị trong trang trạng thái:**
- Tên shop, chủ sở hữu, email, SĐT
- Danh mục (badge màu), ngày nộp
- Mô tả gian hàng
- reviewNote (lý do từ chối / yêu cầu bổ sung — hiển thị trong banner)

#### FR-03.1 Nộp lại sau khi nhận `more-info` (`doSellerResubmit`)

```
1. Prompt: 'Bạn đã bổ sung thông tin gì?' — không bắt buộc
2. app.status = 'pending'
3. app.reviewNote = 'Seller đã bổ sung: ...' + ngày nộp lại
4. app.reviewedBy = null, app.reviewedAt = null
5. saveSellerApps()
6. toast + re-render
```

Admin thấy hồ sơ quay về `pending` trong danh sách.

#### FR-03.2 Nộp hồ sơ mới sau `rejected` (`doSellerNewApp`)

```
1. confirm dialog — xác nhận thay thế hồ sơ cũ
2. Xóa hồ sơ cũ khỏi sellerApps
3. saveSellerApps()
4. sellerRegStep = 1
5. acctTab = 'seller-reg' → renderAccount() → hiển thị form mới
```

---

### 3.4 FR-04: Nhận Thông báo Kết quả Duyệt

#### FR-04.1 Thông báo trong hệ thống

Ngay khi seller nộp hồ sơ thành công → `addNotif()` ghi thông báo vào danh sách thông báo của người dùng:

```
"Hồ sơ đăng ký người bán đã được gửi thành công! 
Chúng tôi sẽ xem xét và phản hồi trong 1–2 ngày làm việc."
```

**P1 — Thông báo khi admin duyệt/từ chối:**  
Hiện tại Admin thay đổi `app.status` trong `sellerApps` nhưng chưa tự động `addNotif()` cho seller. Cần bổ sung hook notification trong các hàm `doApproveSellerApp()`, `doRejectSellerApp()`, `doMoreInfoSellerApp()`.

#### FR-04.2 Banner trạng thái trên màn hình chính

Mọi màn hình seller (kể cả Welcome) hiển thị `sellerStatusBanner()` — một banner nhỏ 1 dòng tóm tắt trạng thái hiện tại, có link "Xem chi tiết ›".

| Trạng thái | Banner màu | Link |
|-----------|-----------|------|
| `pending` | Vàng | → `seller-reg` |
| `more-info` | Xanh dương | → `seller-reg` |
| `rejected` | Đỏ | → `seller-reg` |
| `approved` | Xanh lá | → `seller-dashboard` |

#### FR-04.3 Badge trên nav tab (P1)

Tab "Hồ sơ đăng ký" hiển thị badge đỏ khi có `more-info` cần xử lý.

---

### 3.5 FR-05: Chỉnh sửa Thông tin Doanh nghiệp

**Điều kiện:** Hồ sơ `status='approved'` và seller có trong `activeSellers[]`.

**Tab:** `seller-shop` — gọi `sellerShopEditor(app)`

#### Các trường được phép chỉnh sửa

| Trường | Nguồn data | Lưu vào |
|--------|-----------|---------|
| Mô tả gian hàng | `app.shopInfo.desc` | `sellerApps[idx].shopInfo.desc` |
| Địa chỉ kho hàng | `app.shopInfo.address` | `sellerApps[idx].shopInfo.address` |
| Số điện thoại liên hệ | `app.phone` | `sellerApps[idx].phone` + `activeSellers[sIdx].phone` |
| Sản phẩm chính | `app.shopInfo.mainCats[]` | `sellerApps[idx].shopInfo.mainCats` |

**Trường KHÔNG chỉnh sửa được sau duyệt:** Tên shop, danh mục chính, GPKD, CCCD — cần yêu cầu qua Admin để thay đổi thông tin pháp lý.

#### FR-05.1 Luồng lưu (`doUpdateSellerShop`)

```
1. Đọc giá trị các field từ DOM
2. Validate: không bắt buộc (seller có thể xóa trắng nếu muốn)
3. Cập nhật sellerApps[idx].shopInfo.{desc, address, mainCats}
4. Cập nhật sellerApps[idx].phone
5. Nếu tồn tại trong activeSellers: cập nhật activeSellers[sIdx].phone
6. saveSellerApps() + saveActiveSellers()
7. toast('Đã lưu thông tin gian hàng!')
8. renderAccount()
```

#### Thông tin hiển thị (không chỉnh sửa)

- Tên shop (badge màu danh mục)
- Ngày được duyệt
- Danh mục chính

---

### 3.6 FR-06: Cài đặt Thông tin Thanh toán

**Tab:** `seller-payment` — gọi `sellerPaymentSettings(app)`  
**Áp dụng:** Cả seller chưa duyệt và đã duyệt (để điền trước hoặc cập nhật sau)

#### Hiển thị tài khoản hiện tại

Nếu `app.shopInfo.bank` tồn tại: hiển thị thẻ thông tin với:
- Tên ngân hàng (in đậm)
- Số tài khoản mask: `****XXXX` (4 chữ số cuối)
- Tên chủ tài khoản

Nếu chưa có: hiển thị banner vàng nhắc nhở.

#### Form cập nhật

| Trường | Validate |
|--------|---------|
| Ngân hàng | Dropdown 14 NH, bắt buộc |
| Số tài khoản | Bắt buộc, text |
| Tên chủ tài khoản | Bắt buộc |

#### FR-06.1 Luồng lưu (`doUpdateSellerPayment`)

```
1. Validate: bankName, acc, holder đều bắt buộc
2. Tạo chuỗi: bankStr = bankName + ' – ' + acc + ' – ' + holder
3. Nếu có appId: sellerApps[idx].shopInfo.bank = bankStr → saveSellerApps()
4. Nếu có trong activeSellers: activeSellers[sIdx].shopInfo.bank = bankStr → saveActiveSellers()
5. toast('Đã lưu thông tin tài khoản ngân hàng!')
6. renderAccount() — hiển thị lại với mask đã cập nhật
```

**Lưu ý bảo mật:** Chỉ hiển thị 4 chữ số cuối sau khi lưu. Field input hiển thị giá trị đầy đủ khi chỉnh sửa.

---

## 4. Mô hình dữ liệu

### 4.1 SellerApp Object (xem thêm admin-seller-management-requirements.md §4.1)

Các field liên quan đến nhóm chức năng này:

```javascript
{
  id: string,           // 'sapp-' + Date.now().toString(36)
  shopName: string,
  ownerName: string,    // = user.name lúc đăng ký
  email: string,        // = user.email — khóa liên kết với tài khoản
  phone: string,
  submittedAt: string,  // todayStr() lúc nộp
  status: string,       // 'pending' | 'more-info' | 'approved' | 'rejected'
  category: string,     // 'sach' | 'vpp' | 'tbgd' | 'ebook' | 'audiobook'
  
  gpkd: {
    number: string,     // Số GPKD — nhập tay (demo) / upload ảnh (production)
    type: string,       // Loại hình kinh doanh
    issued: string,     // Date input value
    place: string
  },
  
  cccd: {
    number: string,     // Số CCCD ≥ 9 chữ số
    name: string,       // Tên trên CCCD
    issued: string,
    place: string
  },
  
  shopInfo: {
    name: string,       // Bằng shopName
    desc: string,       // Mô tả — có thể sửa sau khi duyệt
    address: string,    // Địa chỉ kho — có thể sửa sau khi duyệt
    bank: string,       // 'Tên NH – Số TK – Tên chủ TK' — có thể sửa
    mainCats: string[]  // Danh mục sản phẩm — có thể sửa sau khi duyệt
  },
  
  reviewNote: string,   // Lý do từ chối / YC bổ sung — chỉ Admin ghi
  reviewedBy: string|null,
  reviewedAt: string|null
}
```

### 4.2 Lưu trữ tạm trong localStorage (form multi-step)

| Key | Nội dung | Xóa khi |
|-----|---------|---------|
| `slReg1` | shopName, phone, category, desc, address, mainCats | Nộp thành công |
| `slReg2` | gpkd.number, .type, .issued, .place | Nộp thành công |
| `slReg3` | cccd.number, .name, .issued, .place | Nộp thành công |
| `slReg4` | bankName, acc, holder | Nộp thành công |

### 4.3 State Variables

| Biến | Kiểu | Mặc định | Mục đích |
|------|------|---------|---------|
| `sellerRegStep` | number | 1 | Bước hiện tại của form đăng ký (1–5) |

---

## 5. Luồng hoạt động

### 5.1 Luồng Đăng ký Lần đầu

```
User chọn role 'Người bán / NCC' → Đăng ký tài khoản
    ↓
Đăng nhập → acctTab='dashboard' → sellerWelcome()
    ↓ Click "Đăng ký ngay"
acctTab = 'seller-reg' → sellerRegForm() [bước 1]
    ↓ Điền thông tin shop → "Tiếp theo"
Bước 2: GPKD → "Tiếp theo"
    ↓
Bước 3: CCCD → "Tiếp theo"
    ↓
Bước 4: Ngân hàng → "Tiếp theo"
    ↓
Bước 5: Xác nhận → tick checkbox → "Nộp hồ sơ"
    ↓
doSubmitSellerApp() → sellerApps.push() + saveSellerApps()
    ↓
addNotif() + toast('✓ Hồ sơ đã nộp!')
    ↓
sellerAppStatus() hiển thị [trạng thái: pending 🟡]
```

### 5.2 Luồng Admin Duyệt → Seller Nhận kết quả

```
[Admin Panel]
Admin → adm-shops → Chi tiết hồ sơ → Click "✓ Duyệt hồ sơ"
    → sellerApps[idx].status = 'approved'
    → activeSellers.push({email, ...}) 
    → saveSellerApps() + saveActiveSellers()

[Seller Portal — lần đăng nhập tiếp theo]
sellerAppStatus() phát hiện status='approved'
    → Banner xanh "Hồ sơ đã được duyệt!"
    → navForRole() tự động thêm tab [Tổng quan][Gian hàng]
    → Nút [Vào Tổng quan] → sellerDashboard()
```

### 5.3 Luồng Admin Yêu cầu Bổ sung → Seller Nộp lại

```
[Admin Panel]
Admin → Click "⚠ Yêu cầu bổ sung" → nhập nội dung
    → app.status = 'more-info', app.reviewNote = nội dung

[Seller Portal]
sellerStatusBanner() → banner xanh "Cần bổ sung"
sellerAppStatus() → hiển thị nội dung yêu cầu
    → Click "✏ Bổ sung và nộp lại"
    → doSellerResubmit() → prompt tóm tắt bổ sung
    → app.status = 'pending' → toast + re-render

[Admin Panel]
Hồ sơ xuất hiện lại trong danh sách pending
```

### 5.4 Luồng Cập nhật Thông tin sau Duyệt

```
Seller (approved) → acctTab='seller-shop' → sellerShopEditor()
    → Chỉnh mô tả, địa chỉ, SĐT, danh mục sản phẩm
    → Click "Lưu thay đổi" → doUpdateSellerShop()
    → saveSellerApps() + saveActiveSellers()
    → toast + re-render

Seller → acctTab='seller-payment' → sellerPaymentSettings()
    → Nhập/cập nhật tài khoản ngân hàng
    → Click "Lưu tài khoản ngân hàng" → doUpdateSellerPayment()
    → saveSellerApps() + saveActiveSellers()
    → toast + re-render (hiển thị mask ****XXXX)
```

---

## 6. Giao diện người dùng (UI Mockups)

### 6.1 Seller Welcome Screen (chưa có hồ sơ)

```
┌─────────────────────────────────────────────────────┐
│  Chào mừng đến Cổng Người bán EduMart!              │
│  Bắt đầu hành trình kinh doanh sách & giáo dục...  │
│                                                     │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │
│  │  📦          │ │  💰          │ │  📊          │ │
│  │  Đơn giản    │ │  Hoa hồng    │ │  Minh bạch   │ │
│  │  Đăng ký     │ │  thấp        │ │  Thống kê    │ │
│  │  miễn phí... │ │  8–15%...    │ │  realtime    │ │
│  └──────────────┘ └──────────────┘ └──────────────┘ │
│                                                     │
│  [Đăng ký ngay ›]                                   │
└─────────────────────────────────────────────────────┘
```

### 6.2 Form Đăng ký — Bước 1

```
┌─────────────────────────────────────────────────────┐
│  Đăng ký Người bán / NCC                            │
│                                                     │
│  [1 ─────── 2 ─────── 3 ─────── 4 ─────── 5]       │
│  Thông tin  GPKD     CCCD     Ngân hàng  Xác nhận  │
│                                                     │
│  📋 Thông tin Gian hàng                             │
│                                                     │
│  Tên shop *        Số điện thoại *                  │
│  [Sách & VPP ...]  [09xx xxx xxx]                   │
│                                                     │
│  Danh mục chính *                                   │
│  [Sách ▾]                                           │
│                                                     │
│  Mô tả gian hàng *                                  │
│  [Chuyên cung cấp sách giáo khoa, sách tham khảo…  │
│   Hàng nhập trực tiếp từ các NXB uy tín...]        │
│                                                     │
│  Địa chỉ kho hàng *                                 │
│  [45 Nguyễn Trãi, Thanh Xuân, Hà Nội]              │
│                                                     │
│  Sản phẩm dự kiến                                   │
│  [Sách GK, Sách tham khảo, Văn phòng phẩm]         │
│                                                     │
│                         [Tiếp theo →]               │
└─────────────────────────────────────────────────────┘
```

### 6.3 Trang Trạng thái Hồ sơ — Đang chờ

```
┌─────────────────────────────────────────────────────┐
│  Hồ sơ Đăng ký Người bán                           │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ ⏳ Hồ sơ đang chờ xét duyệt                │   │
│  │ Admin EduMart đang xem xét hồ sơ của bạn.  │   │
│  │ Thường mất 1–2 ngày làm việc...            │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  TÊN SHOP            CHỦ SỞ HỮU                    │
│  Sách & VPP Minh Long  Nguyễn Văn Long             │
│  EMAIL                DANH MỤC                     │
│  minhlong.vpp@...     [Sách]                       │
│  NGÀY NỘP             SĐT                          │
│  10/06/2025           0912 345 678                 │
│                                                     │
│  MÔ TẢ GIAN HÀNG                                   │
│  Chuyên cung cấp sách giáo khoa...                 │
└─────────────────────────────────────────────────────┘
```

### 6.4 Trang Trạng thái — Cần bổ sung

```
┌─────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────────┐   │
│  │ 📋 Cần bổ sung thông tin                   │   │
│  │ Admin yêu cầu bổ sung: Vui lòng bổ sung    │   │
│  │ ảnh chụp GPKD bản gốc và ảnh CCCD 2 mặt   │   │
│  │ còn hiệu lực.                               │   │
│  │ Xem xét bởi: Admin EduMart · 10/06/2025    │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ... [thông tin hồ sơ] ...                         │
│                                                     │
│  [✏ Bổ sung và nộp lại]                           │
└─────────────────────────────────────────────────────┘
```

### 6.5 Cài đặt Thanh toán

```
┌─────────────────────────────────────────────────────┐
│  Thông tin Thanh toán                               │
│  EduMart chuyển tiền vào TK này (T+3 ngày làm      │
│  việc sau khi đơn hoàn thành).                     │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ TÀI KHOẢN HIỆN TẠI                         │   │
│  │ Vietcombank                                 │   │
│  │ ****3890  ·  Nguyễn Văn Long               │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  Cập nhật Tài khoản Ngân hàng                      │
│  Ngân hàng *      [Vietcombank ▾]                  │
│  Số tài khoản *   [1234567890089]                  │
│  Tên chủ TK *     [Nguyễn Văn Long]                │
│                                                     │
│  🔒 Thông tin ngân hàng được mã hóa...             │
│                                                     │
│  [Lưu tài khoản ngân hàng]                         │
└─────────────────────────────────────────────────────┘
```

---

## 7. Yêu cầu phi chức năng

### 7.1 Hiệu năng

| Yêu cầu | Mức độ |
|---------|--------|
| Render mỗi bước form | < 200ms |
| Lưu từng bước vào localStorage | < 50ms |
| Phát hiện trạng thái hồ sơ | Tức thì (filter 1 phần tử) |

### 7.2 Bảo mật

| Quy tắc | Áp dụng |
|---------|---------|
| Escape HTML | `escHtml()` cho mọi dữ liệu seller trong `sellerAppStatus()`, `sellerDashboard()`, `sellerShopEditor()`, `sellerPaymentSettings()` |
| Mask số tài khoản | Luôn hiển thị `****XXXX` sau khi lưu — không expose số đầy đủ |
| Số CCCD | Không hiển thị số CCCD đầy đủ trong UI seller (chỉ Admin xem được) |
| Không tự thay đổi status | Seller chỉ có thể nộp `pending` — không thể tự set `approved` |

### 7.3 UX

| Yêu cầu | Chi tiết |
|---------|---------|
| Lưu tạm form | Dữ liệu từng bước lưu localStorage — không mất khi thoát trang |
| Step indicator | Progress bar 5 bước với màu / số / check rõ ràng |
| Nút điều hướng | [← Quay lại] luôn có từ bước 2 trở đi; không bắt điền lại bước đã qua |
| Trạng thái nav | Nav tabs tự cập nhật ngay khi `status` thay đổi — không cần reload |
| Empty state | Seller mới thấy Welcome screen + benefits, không thấy màn hình trống |

---

## 8. Tiêu chí chấp nhận

| # | Tiêu chí |
|---|---------|
| AC-01 | Seller với role='seller' thấy nav riêng, không thấy nav người mua |
| AC-02 | Seller chưa có hồ sơ → thấy Welcome screen → nút "Đăng ký ngay" → form bước 1 |
| AC-03 | Bước 1: bỏ trống tên shop → toast lỗi, không qua bước 2 |
| AC-04 | Bước 3: số CCCD < 9 chữ số → toast lỗi |
| AC-05 | Bước 5: nộp không tick checkbox → toast lỗi |
| AC-06 | Nộp hồ sơ thành công → `sellerApps` có entry mới, `addNotif()` được gọi |
| AC-07 | Sau khi nộp, trang chuyển sang `sellerAppStatus()` với banner vàng "Đang chờ" |
| AC-08 | App status `more-info` → hiển thị nội dung reviewNote trong banner xanh |
| AC-09 | Nộp lại → app.status = 'pending', reviewedBy/At = null |
| AC-10 | App status `rejected` → hiển thị lý do + nút "Nộp hồ sơ mới" |
| AC-11 | App status `approved` → nav thêm tab [Tổng quan][Gian hàng] |
| AC-12 | Seller đã duyệt → `sellerDashboard()` hiển thị KPI từ activeSellers |
| AC-13 | `sellerShopEditor()` chỉ hiển thị khi status='approved' |
| AC-14 | Lưu shop info → cập nhật đồng thời `sellerApps` và `activeSellers` |
| AC-15 | Số tài khoản ngân hàng hiển thị mask `****XXXX` sau khi lưu |
| AC-16 | Chưa có TK ngân hàng → banner vàng nhắc nhở trong tab Thanh toán |

---

## 9. Rủi ro và Giải pháp

| # | Rủi ro | Mức độ | Giải pháp |
|---|--------|--------|-----------|
| R-01 | Mất dữ liệu form khi thoát giữa chừng | Cao | Lưu từng bước vào localStorage (`slReg1..4`); Xóa chỉ khi nộp thành công |
| R-02 | Seller nộp nhiều hồ sơ trùng email | Trung bình | `doSubmitSellerApp()` phải kiểm tra `sellerApps.find(a=>a.email===user.email)` trước khi push |
| R-03 | Thông báo kết quả Admin không đến Seller | Cao | P1: `doApproveSellerApp/doRejectSellerApp` phải gọi `addNotif()` phía seller; Production: email thật |
| R-04 | Số CCCD, số TK bị lộ qua XSS | Trung bình | `escHtml()` + mask TK ngân hàng trong mọi màn hình hiển thị |
| R-05 | Seller tự đặt status='approved' qua DevTools | Thấp | Status chỉ được thay đổi từ admin-side functions; Bảo vệ bằng auth check server-side ở production |

---

## 10. Lộ trình phát triển

### P1 — Đã triển khai (phiên bản hiện tại)

- [x] Registration form 5 bước với validation và lưu tạm localStorage
- [x] Trang trạng thái hồ sơ (pending / more-info / approved / rejected)
- [x] Nộp lại sau `more-info`, nộp mới sau `rejected`
- [x] Thông báo nội bộ khi nộp hồ sơ (`addNotif`)
- [x] Banner trạng thái trên mọi màn hình seller
- [x] Seller dashboard (KPI từ activeSellers khi approved)
- [x] Chỉnh sửa thông tin gian hàng (mô tả, địa chỉ, SĐT, danh mục SP)
- [x] Cài đặt và cập nhật tài khoản ngân hàng (mask ****XXXX)
- [x] Nav tự cập nhật theo trạng thái hồ sơ

### P2 — Phát triển tiếp theo

- [ ] `addNotif()` phía seller khi Admin duyệt/từ chối/yêu cầu bổ sung
- [ ] Badge đỏ trên tab "Hồ sơ đăng ký" khi có `more-info` cần xử lý
- [ ] Validate không nộp hồ sơ trùng email (check trước khi push)
- [ ] Khôi phục form từ localStorage khi quay lại giữa chừng (pre-fill từ slReg1..4)
- [ ] Upload ảnh GPKD, CCCD thực tế thay text input

### P3 — Tính năng nâng cao

- [ ] Email tự động: xác nhận nộp hồ sơ, kết quả duyệt, yêu cầu bổ sung
- [ ] Kháng nghị quyết định từ chối (gửi form lý do phản biện cho Admin)
- [ ] Lịch sử thay đổi thông tin gian hàng (who changed what, when)
- [ ] Xác minh 2 bước thông tin ngân hàng (micro-deposit confirmation)

---

## 11. Demo Accounts

| Email | Mật khẩu | Trạng thái |
|-------|---------|-----------|
| `minhlong.vpp@gmail.com` | `demo123` | Seller — hồ sơ `pending` (sapp-001) |
| `edu.tech.htn@gmail.com` | `demo123` | Seller — chưa có hồ sơ (Welcome screen) |

---

*Tài liệu này mô tả nhóm chức năng Đăng ký & Xác minh Seller phía người bán. Phần Admin xét duyệt hồ sơ được mô tả trong `docs/admin-seller-management-requirements.md`.*
